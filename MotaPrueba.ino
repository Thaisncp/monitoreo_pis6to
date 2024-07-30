#include "DHT.h"
#include <WiFi.h>
#include <MQ135.h>
#include <ArduinoJson.h>
#include <PubSubClient.h>

#define DHTPIN 4  // Pin Señal del Dht11
#define MQPIN 34  //Pin Señal del MQ135
#define DHTTYPE DHT11
//float RZERO = 350.0;

DHT dht(DHTPIN, DHTTYPE);
MQ135 Co2 = MQ135(MQPIN);

//Variables para configuracion de Wifi
const char* ssid = "Velocity_FAMILIA_RUBIO";
const char* password = "pordefecto";

//const char* ssid = "Internet_UNL";
//const char* password = "UNL1859WiFi";

//Variable para configuracion de Broker
const char* mqtt_server = "172.206.206.82";  //Direccion ip del servidor broker
const int mqtt_port = 1883;
const char* mqtt_username = "userunl";  //Nombre del usuario MQTT configurado en el broker
const char* mqtt_password = "unl123";   //Clave del usuario MQTT configurado en el broker

WiFiClient espClient;
PubSubClient client(espClient);

//Variables de lectura de los sensores
float lastTemperatura = 0;
float lasthumedad = 0;
float lastCo2 = 0;

unsigned long startTime;
const unsigned long interval = 60 * 1000;  //1 minuto en milisegundos

void setup() {
  Serial.begin(9600);
  pinMode(MQPIN, INPUT);

  // Inicia conexión WiFi
  conexionWifi();
  // Configuración del servidor MQTT
  client.setServer(mqtt_server, mqtt_port);
  client.setKeepAlive(30);
  // Intentar conexión MQTT
  reconectarMQTT();
  actualizarDatos();
  publicar();
  startTime = millis();

  dht.begin();
}

void loop() {

  if (WiFi.status() != WL_CONNECTED) {
    conexionWifi();
  }

  if (!client.connected()) {
    client.disconnect();
    reconectarMQTT();
  }

  client.loop();
  actualizarDatos();

  unsigned long currentTime = millis();
  if (currentTime - startTime >= interval) {
    publicar();
    startTime = currentTime;
  }

  delay(1000);  // Espera 1 segundos entre cada lectura
}

void conexionWifi() {
  // Inicia la conexión WiFi
  WiFi.begin(ssid, password);

  // Espera a que se establezca la conexión
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.print("Conectado a WiFi con dirección IP: ");
  Serial.println(WiFi.localIP());
}

void reconectarMQTT() {
  // Loop hasta que estemos conectados
  while (!client.connected()) {
    Serial.print("Intentando conexión MQTT...");
    // Intentar conectarse
    if (client.connect("esp32User", mqtt_username, mqtt_password)) {
      Serial.println("Conectado!");
    } else {
      Serial.print("falló, rc=");
      Serial.print(client.state());
      Serial.println(" Intentando nuevamente en 5 segundos");
      // Esperar 5 segundos antes de volver a intentar
      delay(5000);
    }
  }
}

void publicar() {
  StaticJsonDocument<200> jsonDocument;
  jsonDocument["humedad"] = lasthumedad;
  jsonDocument["temperatura"] = lastTemperatura;
  jsonDocument["co2"] = lastCo2;
  String jsonString;

  serializeJson(jsonDocument, jsonString);

  // Envío de un mensaje al broker MQTT convirtiendo los valores numéricos a String y luego a const char*
  client.publish("esp/datos", jsonString.c_str());
}

void actualizarDatos() {
  float t = dht.readTemperature();
  float h = dht.readHumidity();
  float g = Co2.getPPM();

  if (!isnan(t)) {
    lastTemperatura = t - 1;
  } else {
    lastTemperatura = 0.0;
    Serial.print("Error temperatura: ");
    Serial.println(lastTemperatura);
  }

  if (!isnan(h)) {
    lasthumedad = h;
  } else {
    lasthumedad = 0.0;
    Serial.print("Error humedad: ");
    Serial.println(lasthumedad);
  }

  if (!isnan(g)) {
    lastCo2 = g;
  } else {
    lastCo2 = 0.0;
    Serial.print("Error humedad: ");
    Serial.println(lastCo2);
  }
}
