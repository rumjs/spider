const UrlConverter = require('./UrlConverter');
const Scheduler    = require('./Scheduler');
const WebHandler   = require('./WebHandler');

const url = 'https://www.taobao.com/';

let handler = new WebHandler();
Scheduler.register(handler);

Scheduler.schedule(url);