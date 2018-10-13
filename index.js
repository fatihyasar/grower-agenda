var Agenda    = require('agenda');
var mqtt        = require('mqtt');
var client      = mqtt.connect('mqtt://192.168.1.55'); //m2m.eclipse.org

const { MongoClient } = require('mongodb');

  //const db = await MongoClient.connect('mongodb://localhost:27017/agenda');
  const mongoConnectionString = 'mongodb://127.0.0.1/agenda';  
  // Agenda will use the given mongodb connection to persist data, so jobs
  // will go in the "agendatest" database's "jobs" collection.
  //const agenda = new Agenda().mongo(db, 'jobs');
  const agenda = new Agenda({db: {address: mongoConnectionString}});


  // Define a "job", an arbitrary function that agenda can execute
  agenda.define('lights', (job, done) => {
    const stateData = job.attrs.data;
    var topic = "/brokers/pushnotification";
    var data = {};
    data.payload = "";
    if(stateData.state == true) {
        data.alert = "Lights is turned ON";
        client.publish(topic, JSON.stringify(data));        
    } else if(stateData.state == false) {
        data.alert = "Lights is turned OFF";
        client.publish(topic, JSON.stringify(data));                
    }
    done();
  });



  // Wait for agenda to connect. Should never fail since connection failures
  // should happen in the `await MongoClient.connect()` call.
  //await new Promise(resolve => agenda.once('ready', resolve));


    //mqtt 
client.on('connect', function () {
    console.log('Connected MQTT server');
    (async function() {
        var startDt = new Date("Sat Oct 13 19:01:00 +03 2018");
        var endtDt = new Date("Sat Oct 13 19:02:00 +03 2018");
      
        await agenda.start();
        await agenda.schedule(startDt, 'lights', {state: true});
        await agenda.schedule(endtDt, 'lights', {state: false});
       })();
});




