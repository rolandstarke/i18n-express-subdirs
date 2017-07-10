exports = module.exports = function (options) {
    var i18n;
    if (typeof options.init === 'function') {
        //if an i18n object is already passed we dont create our own
        i18n = options;
    } else {
        i18n = require('i18n');
        i18n.configure(options);
    }

    return function (req, res, next) {
        i18n.init(req, res, function () {
            var locales = req.getLocales();
            for (var i = 0; i < locales.length; i++) {
                if ((req.url + '/').indexOf('/' + locales[i] + '/') === 0) {
                    req.setLocale(locales[i]);
                    req.url = req.url.replace('/' + locales[i], '');
                    if (req.url === '') {
                        //redirect to url with trailing slash e.g. example.com/en -> example.com/en/
                        return res.redirect(301, '/' + req.getLocale() + '/');
                    } else {
                        //language was read from url
                        return next();
                    }
                }
            }
            //languae is not in url. lets add it to the url and redirect
            return res.redirect(303, '/' + req.getLocale() + req.url);
        });
    };
};