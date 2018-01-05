const Utils = require('./Utils');

/**
 * urlSet
 */
const urlSet = new Set();
var limitNum = 10000;

/**
 * UrlBuffer
 */
class UrlBuffer {

    static setLimitNum(num) {
        limitNum = Utils.getNum(num);
    }

    static isLimited() {
        return urlSet.size > limitNum;
    }

    static add(url) {

        if (!Utils.isBlankStr(url)) {

            if (UrlBuffer.isLimited()) {
                throw 'UrlBuffer is limited';
            }

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