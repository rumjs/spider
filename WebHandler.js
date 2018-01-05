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

        if (!Utils.isNull($)) {
            $('*').children().each(function(i, elem) {

                let linkAttr = UrlConverter.convert($(this).attr('href'), url);
                let linkText = $(this).text();

                if (!Utils.isBlankStr(linkAttr)) {
                    console.log(linkText + ' => ' + linkAttr);

                    Scheduler.schedule(linkAttr);
                }
            });
        }
    }
}

module.exports = WebHandler;