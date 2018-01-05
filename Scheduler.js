const UrlConverter = require('./UrlConverter');
const WebParser    = require('./WebParser');
const WebHandler   = require('./WebHandler');
const UrlBuffer    = require('./UrlBuffer');
const Utils        = require('./Utils');

/**
 * handlerSet
 */
const handlerSet = new Set();

/**
 * Scheduler
 */
class Scheduler {

    /**
     * schedule url
     */
    static schedule(addr) {

        let url = UrlConverter.convert(addr);
        if (Utils.isBlankStr(url)) {
            throw 'url is blank';
        }

        if (UrlBuffer.has(url)) {
            return;
        }

        /** find the first handler which can handle the url */
        for (let handler of handlerSet) {
            if (handler.canHandle(url)) {

                UrlBuffer.add(url);

                /** parse & handle */
                return WebParser.parse(url, ($) => {
                    handler.handle(url, $, Scheduler);
                }, Scheduler);
            }
        }

    }

    /**
     * register webhandlers for urls
     */
    static register(webhandler) {

        if (Utils.isNull(webhandler)
            || !(webhandler instanceof WebHandler)) {
            throw 'webhandler invalid';
        }

        handlerSet.add(webhandler);
    }

    /**
     * unregister webhandlers
     */
    static unregister(webhandler) {
        
        if (Utils.isNull(webhandler)
            || !(webhandler instanceof WebHandler)) {
            throw 'webhandler invalid';
        }

        handlerSet.delete(webhandler);
    }

    /**
     * unregister all
     */
    static clear() {

        handlerSet.clear();
    }

}

module.exports = Scheduler;