var models = require('../models/');
var datoRecolectado = models.datoRecolectado;
const { Op } = require('sequelize');
class DatosController {   

    async listarDatos(req, res) {
        try {
            const fechaInicio = new Date();
            fechaInicio.setDate(fechaInicio.getDate() - 8); // Resta 8 días
    
            const { count, rows } = await datoRecolectado.findAndCountAll({
                attributes: ['dato', 'fecha', 'hora', 'external_id', 'id_sensor'],
                where: {
                    fecha: {
                        [Op.gte]: fechaInicio.toISOString().slice(0, 10) // Últimos 8 días
                    }
                },
                order: [['fecha', 'DESC'], ['hora', 'DESC']]
            });
    
            res.json({ msg: 'OK!', code: 200, info: rows, total: count });
        } catch (error) {
            console.error('Error al listar datos:', error);
            res.status(500).json({ msg: 'Error al listar datos', code: 500 });
        }
    }    
    
    async listarTemperaturaSemana(req, res) {
        try {
            const endDate = new Date();
            const startDate = new Date(endDate);
            startDate.setDate(startDate.getDate() - 7);

            const listar = await datoRecolectado.findAll({
                attributes: ['dato', 'fecha', 'hora', 'external_id'],
                where: {
                    id_sensor: 2,
                    fecha: {
                        [Op.between]: [startDate, endDate]
                    }
                },
            });
            res.json({ msg: 'OK!', code: 200, info: listar });
        } catch (error) {
            console.error('Error al listar datos de Temperatura por semana:', error);
            res.status(500).json({ msg: 'Error al listar datos de Temperatura por semana', code: 500 });
        }
    }

    async listarTemperaturaDia(req, res) {
        try {
            const id_sensor = 2; // ID del sensor de temperatura
            const fechaActual = new Date(); // Fecha actual
            fechaActual.setDate(fechaActual.getDate() - 1); // Restar un día

            const fecha = fechaActual.toISOString().slice(0, 10); // Formato YYYY-MM-DD

            const listar = await datoRecolectado.findAll({
                attributes: ['dato', 'fecha', 'hora', 'external_id'],
                where: {
                    id_sensor,
                    fecha
                },
            });

            res.json({ msg: 'OK!', code: 200, info: listar });
        } catch (error) {
            console.error('Error al listar datos de Temperatura por día:', error);
            res.status(500).json({ msg: 'Error al listar datos de Temperatura por día', code: 500 });
        }
    }

    async listarHumedadSemana(req, res) {
        try {
            const endDate = new Date();
            const startDate = new Date(endDate);
            startDate.setDate(startDate.getDate() - 7);

            const listar = await datoRecolectado.findAll({
                attributes: ['dato', 'fecha', 'hora', 'external_id'],
                where: {
                    id_sensor: 1,
                    fecha: {
                        [Op.between]: [startDate, endDate]
                    }
                },
            });
            res.json({ msg: 'OK!', code: 200, info: listar });
        } catch (error) {
            console.error('Error al listar datos de Temperatura por semana:', error);
            res.status(500).json({ msg: 'Error al listar datos de Temperatura por semana', code: 500 });
        }
    }

    async listarHumedadDia(req, res) {
        try {
            const id_sensor = 1; // ID del sensor de temperatura
            const fechaActual = new Date(); // Fecha actual
            fechaActual.setDate(fechaActual.getDate() - 1); // Restar un día

            const fecha = fechaActual.toISOString().slice(0, 10); // Formato YYYY-MM-DD

            const listar = await datoRecolectado.findAll({
                attributes: ['dato', 'fecha', 'hora', 'external_id'],
                where: {
                    id_sensor,
                    fecha
                },
            });

            res.json({ msg: 'OK!', code: 200, info: listar });
        } catch (error) {
            console.error('Error al listar datos de Temperatura por día:', error);
            res.status(500).json({ msg: 'Error al listar datos de Temperatura por día', code: 500 });
        }
    }
    async listarCo2Semana(req, res) {
        try {
            const endDate = new Date();
            const startDate = new Date(endDate);
            startDate.setDate(startDate.getDate() - 7);

            const listar = await datoRecolectado.findAll({
                attributes: ['dato', 'fecha', 'hora', 'external_id'],
                where: {
                    id_sensor: 3,
                    fecha: {
                        [Op.between]: [startDate, endDate]
                    }
                },
            });
            res.json({ msg: 'OK!', code: 200, info: listar });
        } catch (error) {
            console.error('Error al listar datos de Temperatura por semana:', error);
            res.status(500).json({ msg: 'Error al listar datos de Temperatura por semana', code: 500 });
        }
    }

    async listarCo2Dia(req, res) {
        try {
            const id_sensor = 3; // ID del sensor de temperatura
            const fechaActual = new Date(); // Fecha actual
            fechaActual.setDate(fechaActual.getDate() - 1); // Restar un día

            const fecha = fechaActual.toISOString().slice(0, 10); // Formato YYYY-MM-DD

            const listar = await datoRecolectado.findAll({
                attributes: ['dato', 'fecha', 'hora', 'external_id'],
                where: {
                    id_sensor,
                    fecha
                },
            });

            res.json({ msg: 'OK!', code: 200, info: listar });
        } catch (error) {
            console.error('Error al listar datos de Temperatura por día:', error);
            res.status(500).json({ msg: 'Error al listar datos de Temperatura por día', code: 500 });
        }
    }

    async listarDatosBusqueda(req, res) {
        try {
            const { pagina = 1, items = 20, fecha } = req.query;
            const itemsPorPagina = items * 3; // 20 filas * 3 sensores = 60 elementos
            const offset = (pagina - 1) * itemsPorPagina;
    
            let whereCondition = {};
    
            if (fecha) {
                const startDate = new Date(fecha);
                const endDate = new Date(startDate);
                endDate.setDate(startDate.getDate() + 1); // Incrementar la fecha en un día
    
                whereCondition = {
                    fecha: {
                        [Op.gte]: startDate.toISOString().slice(0, 10),
                        [Op.lt]: endDate.toISOString().slice(0, 10)
                    }
                };
            }
    
            const { count, rows } = await datoRecolectado.findAndCountAll({
                attributes: ['dato', 'fecha', 'hora', 'external_id', 'id_sensor'],
                where: whereCondition,
                order: [['fecha', 'DESC'], ['hora', 'DESC']],
                offset: offset,
                limit: itemsPorPagina
            });
    
            res.json({ msg: 'OK!', code: 200, info: rows, total: count });
        } catch (error) {
            console.error('Error al listar datos:', error);
            res.status(500).json({ msg: 'Error al listar datos', code: 500 });
        }
    }

    // metodo para obtener los ultimos datos tanto de temperatura, humedad y co2
    // es solo el ultimo dato que se ha recolectado
    async obtenerUltimosDatos(req, res) {
        try {
            const temperatura = await datoRecolectado.findOne({
                attributes: ['dato', 'fecha', 'hora', 'external_id'],
                where: {
                    id_sensor: 2
                },
                order: [['fecha', 'DESC'], ['hora', 'DESC']]
            });

            const humedad = await datoRecolectado.findOne({
                attributes: ['dato', 'fecha', 'hora', 'external_id'],
                where: {
                    id_sensor: 1
                },
                order: [['fecha', 'DESC'], ['hora', 'DESC']]
            });

            const co2 = await datoRecolectado.findOne({
                attributes: ['dato', 'fecha', 'hora', 'external_id'],
                where: {
                    id_sensor: 3
                },
                order: [['fecha', 'DESC'], ['hora', 'DESC']]
            });

            res.json({ msg: 'OK!', code: 200, info: { temperatura, humedad, co2 } });
        } catch (error) {
            console.error('Error al obtener los ultimos datos:', error);
            res.status(500).json({ msg: 'Error al obtener los ultimos datos', code: 500 });
        }
    }

    async chatbotResponse(req, res) {
        try {
            const { message } = req.body;
            let response = "";

            // Función para verificar si el mensaje contiene ciertas palabras clave
            const contienePalabras = (msg, palabras) => palabras.some(palabra => msg.toLowerCase().includes(palabra));

            // Palabras clave para cada tipo de dato
            const palabrasTemperatura = ['temperatura', 'calor', 'frío', 'grados'];
            const palabrasHumedad = ['humedad', 'húmedo', 'seco'];
            const palabrasCO2 = ['co2', 'dióxido de carbono', 'aire'];

            if (contienePalabras(message, palabrasTemperatura)) {
                const temperatura = await this.obtenerUltimaTemperatura();
                response = `La temperatura actual es ${temperatura}°C. `;
                if (temperatura > 25) {
                    response += "Está bastante caluroso hoy.";
                } else if (temperatura < 15) {
                    response += "Hace un poco de frío hoy.";
                } else {
                    response += "La temperatura es agradable.";
                }
            } else if (contienePalabras(message, palabrasHumedad)) {
                const humedad = await this.obtenerUltimaHumedad();
                response = `La humedad actual es ${humedad}%. `;
                if (humedad > 60) {
                    response += "El ambiente está bastante húmedo.";
                } else if (humedad < 30) {
                    response += "El aire está bastante seco.";
                } else {
                    response += "La humedad está en un nivel confortable.";
                }
            } else if (contienePalabras(message, palabrasCO2)) {
                const co2 = await this.obtenerUltimoCo2();
                response = `El nivel actual de CO2 es ${co2} ppm. `;
                if (co2 > 1000) {
                    response += "Los niveles de CO2 son altos, sería recomendable ventilar el área.";
                } else if (co2 < 400) {
                    response += "Los niveles de CO2 son excelentes.";
                } else {
                    response += "Los niveles de CO2 están dentro de un rango normal.";
                }
            } else if (message.toLowerCase().includes("clima") || message.toLowerCase().includes("ambiente")) {
                const [temperatura, humedad, co2] = await Promise.all([
                    this.obtenerUltimaTemperatura(),
                    this.obtenerUltimaHumedad(),
                    this.obtenerUltimoCo2()
                ]);
                response = `Resumen del ambiente: Temperatura: ${temperatura}°C, Humedad: ${humedad}%, CO2: ${co2} ppm.`;
            } else if (message.toLowerCase().includes("ayuda") || message.toLowerCase().includes("qué puedes hacer")) {
                response = "Puedo proporcionarte información sobre la temperatura, humedad y niveles de CO2 en el ambiente. También puedo darte un resumen general del clima. ¿En qué puedo ayudarte?";
            } else if (contienePalabras(message, ['hola', 'buenos días', 'buenas tardes', 'buenas noches'])) {
                response = "¡Hola! Soy el asistente del sistema de monitoreo ambiental. ¿En qué puedo ayudarte hoy?";
            } else if (contienePalabras(message, ['gracias', 'muchas gracias', 'te lo agradezco'])) {
                response = "¡De nada! Estoy aquí para ayudarte. Si necesitas algo más, no dudes en preguntar.";
            } else if (contienePalabras(message, ['adios', 'hasta luego', 'chao'])) {
                response = "¡Hasta luego! Si necesitas más información en el futuro, estaré aquí para ayudarte.";
            } else {
                response = "Lo siento, no estoy seguro de cómo responder a eso. Puedes preguntarme sobre la temperatura, humedad, niveles de CO2 o el ambiente en general. También puedes pedirme ayuda si no estás seguro de qué preguntar.";
            }

            res.json({ msg: 'OK!', code: 200, response });
        } catch (error) {
            console.error('Error en la respuesta del chatbot:', error);
            res.status(500).json({ msg: 'Error en la respuesta del chatbot', code: 500 });
        }
    }

    async obtenerUltimaTemperatura() {
        const data = await datoRecolectado.findOne({
            attributes: ['dato'],
            where: { id_sensor: 2 },
            order: [['fecha', 'DESC'], ['hora', 'DESC']]
        });
        return data ? data.dato : 'N/A';
    }

    async obtenerUltimaHumedad() {
        const data = await datoRecolectado.findOne({
            attributes: ['dato'],
            where: { id_sensor: 1 },
            order: [['fecha', 'DESC'], ['hora', 'DESC']]
        });
        return data ? data.dato : 'N/A';
    }

    async obtenerUltimoCo2() {
        const data = await datoRecolectado.findOne({
            attributes: ['dato'],
            where: { id_sensor: 3 },
            order: [['fecha', 'DESC'], ['hora', 'DESC']]
        });
        return data ? data.dato : 'N/A';
    }


}
module.exports = DatosController;