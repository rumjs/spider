const process      = require('process');
const UrlConverter = require('./UrlConverter');
const UrlBuffer    = require('./UrlBuffer');
const Scheduler    = require('./Scheduler');
const WebHandler   = require('./WebHandler');


var handler = new WebHandler();
process.argv.forEach((val, idx) => {
    if (idx === 2) {
        console.log(val);

        setTimeout(() => {
            Scheduler.register(handler);
            Scheduler.schedule(val);
        }, 1000);
    }

    if (idx === 3) {
        console.log(val);
        handler.setKeyword(val);
    }

    if (idx === 4) {
        console.log(val);
        UrlBuffer.setLimitNum(val);
    }
});
