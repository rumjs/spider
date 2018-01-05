const url   = require('url');
const Utils = require('./Utils');

/**
 * UrlConverter
 */
class UrlConverter {

    /**
     * convert addr with the host addr
     */
    static convert(addr, hostAddr) {

        let url = undefined;
        if (Utils.isBlankStr(addr)) {
            return url;
        }
        url = addr.trim().toLowerCase();

        let hostUrl = undefined;
        if (!Utils.isBlankStr(hostAddr)) {
            hostUrl = UrlConverter.cleanTail(hostAddr).toLowerCase();
        }

        if (addr.substr(0, 2) === '//') {
            url = 'http:' + addr;
        } else if (addr.substr(0, 1) == '/'
            && !Utils.isBlankStr(hostUrl)) {
            url = hostUrl + addr;
        } else if (addr.substr(0, 11) == 'javascript:') {
            url = undefined;
        }

        return UrlConverter.filter(UrlConverter.cleanTail(url));
    }

    /**
     * filter addr not link to a page
     */
    static filter(addr) {

        if (Utils.isBlankStr(addr)) {
            return undefined;
        }

        let addrPath = url.parse(addr).pathname;
        if (!Utils.isBlankStr(addrPath)
            && addrPath.indexOf('.') >= 0
            && !(/^.*(html|htm|asp|aspx|php|jsp)$/i.test(addrPath))) {
            // not a page
            return undefined;
        }

        return addr;
    }

    /**
     * clean '/' at the tail
     */
    static cleanTail(addr) {

        if (Utils.isBlankStr(addr)) {
            return undefined;
        }

        let url = addr.trim();
        let endidx = 0;
        for (let i = 0; i < url.length; ++i) {
            if (url[i] !== '/') {
                endidx = i;
            }
        }

        return url.substr(0, endidx + 1);
    }

}

module.exports = UrlConverter;