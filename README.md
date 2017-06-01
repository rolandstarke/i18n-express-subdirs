# i18n-express-subdirs
A middeware for [express](https://www.npmjs.com/package/express) that makes your app ready for internationalisation using Subdirectories with gTLDs.
It redirects `/someurl` to `/en/someurl`, `/de/someurl`, ...  using 'accept-language' header to guess language settings  and sets the locale in the module [i18n](https://www.npmjs.com/package/i18n). This URL structure is one of the ways to make your site multilingual for more information read at the [Search Console Help Center](https://support.google.com/webmasters/answer/182192)



## Install
```sh
npm install i18n-express-subdirs --save
```

## Usage

Minimal example
```js
var express = require('express');
var app = express();
var i18nSubdirs = require('i18n-express-subdirs');

app.use(i18nSubdirs({
  //for all the options take a look at the i18n module
  locales: ['en', 'de'],
  defaultLocale: 'en',
  directory: __dirname + '/locales'
}));

app.get('/*', function (req, res) {
  res.send(res.__('Hello World!'));
  //for all methods __, __n, ... take a look at the i18n module
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
```

If you already use [i18n](https://www.npmjs.com/package/i18n) at a different place in your app you can reuse the i18n object and don't need to reconfigure it again

```js
//var app; ...
var i18n = require('i18n');
var i18nSubdirs = require('i18n-express-subdirs');

i18n.configure({
  locales: ['en', 'de'],
  defaultLocale: 'en',
  directory: __dirname + '/locales'
});

app.use(i18nSubdirs(i18n));

//app.use('/', routes);
//app.listen(address);
//...
```

To tell google of your different languages you could use hreflang (read more about that at the [Search Console Help Center](https://support.google.com/webmasters/answer/189077)).

```js
app.get('/*', function (req, res) {
  //...
  res.write('<link rel="alternate" href="' + req.url + '" hreflang="x-default" />');
  res.getLocales().forEach(function (lang) {
    res.write('<link rel="alternate" href="/' + lang + req.url + '" hreflang="' + lang + '" />');
  });
  //...
  res.end();
});
```






