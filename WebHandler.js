const UrlConverter = require('./UrlConverter');
const Utils        = require('./Utils');

/**
 * WebHandler
 */
class WebHandler {

    /**
     * @interface
     * return if this handler can handle the given url
     */
    canHandle(url) {
        return true;
    }

    /**
     * @interface
     * return if this handler can handle the given url
     */
    handle(url, $, Scheduler) {

        //console.log(url);
        var self = this;

        if (!Utils.isNull($)) {
            $('*').children().each(function(i, elem) {

                let linkAttr = UrlConverter.convert($(this).attr('href'), url);
                let linkText = $(this).text();

                if (!Utils.isBlankStr(linkAttr)) {

                    if ((!Utils.isBlankStr(self.keyword) && !Utils.isBlankStr(linkText)
                            && linkText.indexOf(self.keyword) >= 0)
                        || (!Utils.isNull(self.regex) && self.regex.test(linkText))) {
                        console.log(linkText + ' => ' + linkAttr);
                    }

                    Scheduler.schedule(linkAttr);
                }
            });
        }
    }

    /**
     * setFilterRegex
     */
    setFilterRegex(regex) {
        this.regex = regex;
    }

    /**
     * setKeyword
     */
    setKeyword(keyword) {
        this.keyword = keyword;
    }
}

module.exports = WebHandler;