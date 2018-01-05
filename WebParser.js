const http         = require('http');
const https        = require('https');
const cheerio      = require('cheerio');
const Utils        = require('./Utils');
const UrlConverter = require('./UrlConverter');

/**
 * WebParser
 */
class WebParser {

    static parse(url, callback, Scheduler) {

        if (Utils.isBlankStr(url)) {
            throw 'url is blank';
        }

        /**
         * get the right protocol
         */
        let webProtocol = undefined;
        if (url.substr(0, 7) === 'http://') {
            webProtocol = http;
        } else if (url.substr(0, 8) === 'https://') {
            webProtocol = https;
        } else {
            throw 'protocol unsupported:' + url;
        }

        console.log("++++++++++++++++ => " + url);

        /**
         * get dom from the given url
         */
        try {

            webProtocol.get(url, (res) => {
                const { statusCode } = res;

                if (statusCode === 301 || statusCode === 302) {
                    /**
                     * redirect
                     * schedule the redirectUrl
                     */
                    res.resume();
                    Scheduler.schedule(
                        UrlConverter.convert(url, res.headers.location),
                        callback);
                    return;
                } else if (statusCode !== 200) {
                    /**
                     * error status
                     */
                    console.error('statusCode:' + statusCode);
                    res.resume();
                    return;
                }

                /**
                 * receive rawData
                 */
                res.setEncoding('utf-8');
                let rawData = '';
                res.on('data', (chunk) => { rawData += chunk; });
                res.on('end', () => {
                    try {
                        // console.log(rawData);
                        callback(cheerio.load(rawData));
                    } catch (e) {
                        console.error(e.message);
                    }
                });
            }).on('error', (e) => {
                console.error(e.message);
            });

        } catch (e) {
            console.error(e.message);
        }
    }

}

module.exports = WebParser;