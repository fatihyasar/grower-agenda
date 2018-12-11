var schedule    = require('node-schedule');
var mqtt        = require('mqtt');
var client      = mqtt.connect('mqtt://192.168.1.55'); //m2m.eclipse.org

client.on('connect', function () {
    console.log('Connected MQTT server');
});

//Start lights - that works every day at 08:01 
console.log('scheduling lights management on crontab');
console.log('creating light turn on task');
var task1 = schedule.scheduleJob('00 08 * * *', function(fireDate) {
    console.log('Lights turn on task started with fireDate : ' + fireDate);
    var alert = "Lights is turned ON";
    sendNotificaion(alert);
    console.log(alert);            
});


//Stop lights - that works every day at 19:01 
console.log('creating light turn off task');
var task2 = schedule.scheduleJob('00 19 * * *', function(fireDate) {
    console.log('Lights turn on task started with fireDate : ' + fireDate);
    var alert = "Lights is turned OFF";
    console.log(alert);            
    sendNotificaion(alert);
});  

//Start airfun - that works every day at 08:01 
console.log('scheduling airfun management on crontab');
console.log('creating airfun - turn on task');
var task1 = schedule.scheduleJob('0 * * * *', function(fireDate) {
    console.log('Airfun turn on task started with fireDate : ' + fireDate);
    var alert = "Airfun is turned ON";
    sendNotificaion(alert);    
    console.log(alert);    
    
    var topic = "/actuators/plugs/command/2/on";
    client.publish(topic, JSON.stringify({}));        
});


function sendNotificaion(alert) {
    console.log('sending alert notification : ' + alert);
    var topic = "/brokers/pushnotification";
    var data = {};
    data.payload = "";
    data.alert = alert;
    client.publish(topic, JSON.stringify(data));     
    
    var topic = "/actuators/plugs/command/2/off";
    client.publish(topic, JSON.stringify({}));        
    
}


