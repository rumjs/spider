const process      = require('process');
const UrlConverter = require('./UrlConverter');
const Scheduler    = require('./Scheduler');
const WebHandler   = require('./WebHandler');

let handler = new WebHandler();
Scheduler.register(handler);

process.argv.forEach((val, idx) => {
    if (idx === 2) {
        console.log(val);
        Scheduler.schedule(val);
    }
});
