const mqtt = require('mqtt');
var models = require('../models');
const { format } = require('date-fns');

var sensor = models.sensor;
var datoRecolectado = models.datoRecolectado;

const obtenerHora = function () {
    const ahora = new Date();

    const horas = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');

    return `${horas}:${minutos}`;
}

const obtenerFecha = function () {
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1;
    const anio = fechaActual.getFullYear();

    // Formatear la fecha como "YYYY-MM-DD"
    const fechaFormateada = `${anio}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
    return fechaFormateada;
};


class ConexionBroker {

    constructor() {
        // URL del broker MQTT
        this.brokerUrl = 'mqtt://192.168.1.105:1883';

        // Opciones de conexión al broker
        this.options = {
            clientId: 'backBD',
            username: 'userunl',
            password: 'unl123',
            clean: true  // Limpia la sesión anterior al conectarse
        };

        // Conexión al broker MQTT
        this.client = mqtt.connect(this.brokerUrl, this.options);

        // Configurar eventos
        this.client.on('connect', this.onConnect.bind(this));
        this.client.on('message', this.onMessage.bind(this));
        //this.client.on('send', this.onMessage.bind(this));
        this.client.on('error', this.onError.bind(this));
        this.client.on('close', this.onClose.bind(this));
        this.client.on('reconnect', this.onReconnect.bind(this));
        this.client.on('offline', this.onOffline.bind(this));

    }

    onConnect() {
        console.log('Conectado al broker MQTT');

        // Suscripción a un tema o topic
        this.client.subscribe('esp/datos', (err) => {
            if (err) {
                console.error('Error al suscribirse:', err);
            } else {
                console.log('Suscripción exitosa al tema esp/datos');
            }
        });
    }

    async onMessage(topic, message) {
        console.log(`Mensaje recibido en el tema ${topic}: ${message.toString()}`);

        let dataS = [JSON.parse(message.toString())];
        var uuid = require('uuid');
        var lista = await sensor.findAll();

        const transaction = await models.sequelize.transaction();

        try {
            for (const dato of dataS) {
                const { humedad, temperatura, co2 } = dato;
                const values = [humedad, temperatura, co2];
                let i = 0;

                for (const elemento of lista) {
                    var data = {
                        dato: values[i],
                        hora: obtenerHora(),
                        fecha: obtenerFecha(),
                        id_sensor: elemento.id,
                        external_id: uuid.v4(),
                    }

                    var result = await datoRecolectado.create(data, { transaction });

                    if (result === null) {
                        console.log("No se pudo guardar el dato.");
                    } else {
                        console.log("Dato guardado correctamente.");
                        i++;
                    }
                }
            }

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            console.error("Error al procesar y guardar datos:", error);
        }
    }


    onError(err) {
        console.error('Error en la conexión al broker MQTT:', err);
    }

    onClose() {
        console.log('Desconectado del broker MQTT');
    }

    onReconnect() {
        console.log('Reconectando al broker MQTT');
    }

    onOffline() {
        console.log('El cliente está desconectado');
    }
}


module.exports = ConexionBroker;
