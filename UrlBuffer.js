const Utils = require('./Utils');

/**
 * urlSet
 */
const urlSet = new Set();

/**
 * UrlBuffer
 */
class UrlBuffer {

    static add(url) {

        if (!Utils.isBlankStr(url)) {
            urlSet.add(url);
        }
    }

    static has(url) {

        return !Utils.isBlankStr(url) && urlSet.has(url);
    }

    static delete(url) {

        if (!Utils.isBlankStr(url)) {
            urlSet.delete(url);
        }
    }

    static clear() {

        urlSet.clear();
    }

}

module.exports = UrlBuffer;