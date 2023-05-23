#include <OneWire.h>

#include <DallasTemperature.h>

#include <DHT.h>
#include <DHT_U.h>

#include <ThingSpeak.h>
//#include<WiFi.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>

#define DHTPIN 4       // Pin connected to the DHT sensor
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);
const char* ssid = "*********";
const char* password = "********";
const char* server = "api.thingspeak.com";

WiFiClient client;
const char* api_key = "*************";
unsigned long myChannelNumber = *********; //Your Channel Number (Without


void setup() {
  Serial.begin(115200);
  delay(10);
  WiFi.begin(ssid, password);
  Serial.println("DHT11 Test...");
  dht.begin();
   ThingSpeak.begin(client);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi...");
  }

  Serial.println("Connected to WiFi");
 
}

void loop() {
   if(WiFi.status() == WL_CONNECTED)
 {
  
   float temperature = dht.readTemperature();  // Read temperature in Celsius
    float humidity = dht.readHumidity(); 
     Serial.println(temperature);
     
      Serial.println(humidity);
      Serial.println("_______________");
      
    ThingSpeak.setField(2, temperature);
    ThingSpeak.setField(3,humidity);
    ThingSpeak.writeFields(myChannelNumber, api_key);
  }
  else {
    Serial.println("Connection to ThingSpeak failed");
  }

  client.stop();
  
  delay(1000);  // Send data every 5 seconds
}
