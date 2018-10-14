var schedule = require('node-schedule');
var mqtt        = require('mqtt');
var client      = mqtt.connect('mqtt://m2m.eclipse.org'); //m2m.eclipse.org

client.on('connect', function () {
    console.log('Connected MQTT server');

    //Start lights - that works every day at 16:30 
    var task1 = schedule.scheduleJob('0 40 16 1/1 * ? *', function() {
        var alert = "Lights is turned ON";
        sendNotificaion(alert);
        console.log(alert);            
    });
    
    
    //Stop lights - that works every day at 16:33 
    var task2 = schedule.scheduleJob('0 43 16 1/1 * ? *', function() {
        var alert = "Lights is turned OFF";
        console.log(alert);            
        sendNotificaion(alert);
    });  
});



function sendNotificaion(alert) {
    var topic = "/brokers/pushnotification";
    var data = {};
    data.payload = "";
    data.alert = alert;
    client.publish(topic, JSON.stringify(data));        
}


