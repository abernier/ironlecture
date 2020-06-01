Ironlecture is a `user.js` script that reveals `:::* lecture` blocks on https://my.ironhack.com

# INSTALL

Pre-requisites:
  - install the [Tampermonkey](https://www.tampermonkey.net) extension, for example for [Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo).

Go to https://github.com/abernier/ironlecture/raw/master/ironlecture.user.js and click the `Install` button:
![](https://assets.codepen.io/67030/Screenshot+2020-06-01+at+11.56.13.png)

That's it!

--

NB: Currently, this is only enabled for WDPT201909PAR and WDPT202006PAR, ie: my cohorts. But you can also enable it for you, just by updating this regex on [this line](https://github.com/abernier/ironlecture/blob/dcd1f1c5747fee483527046dc258e27da59904c2/ironlecture.user.js#L7):

```js
// @include      /^https?:\/\/(preview.)?my.ironhack.com\/.*(WDPT.*201909_PAR|WDPT.*202006_PAR).*
```
