var schedule = require('node-schedule');
var date = new Date("Sat Oct 13 18:54:32 +03 2018");
 
var j = schedule.scheduleJob(date, function(){
  console.log('The world is going to end today.');
});