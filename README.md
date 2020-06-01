[![](https://img.shields.io/badge/tampermonkey-ironlecture.user.js-0a6b00)](https://github.com/abernier/ironlecture/raw/master/ironlecture.user.js)

`ironlecture.user.js` is a userscript that reveals MD `:::* lecture` blocks on https://my.ironhack.com plateform.

|Before|After|
|------|-----|
|![](https://assets.codepen.io/67030/Screenshot+2020-06-01+at+12.20.27.png)|![](https://assets.codepen.io/67030/Screenshot_2020-06-01_at_12_15_57.png)|

# INSTALL

Pre-requisites:
  - install the [Tampermonkey](https://www.tampermonkey.net) extension, for example for [Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo).

Go to [ironlecture.user.js](https://github.com/abernier/ironlecture/raw/master/ironlecture.user.js) and click the `Install` button:
![](https://assets.codepen.io/67030/Screenshot+2020-06-01+at+11.56.13.png)

That's it! You should now wee annotation blocks, especially on `wdpt202006par` lessons: for [students](https://my.ironhack.com/lms/courses/course-v1:IRONHACK+WDPT+202006_PAR) / [teachers](https://preview.my.ironhack.com/lms/courses/course-v1:IRONHACK+WDPT+202006_PAR)

# Usage

*example with `js-intro.md`* (demo [here](https://preview.my.ironhack.com/lms/courses/course-v1:IRONHACK+WDPT+202006_PAR/units/ironhack-course-chapter_1-sequential-vertical))

In your md lesson, add the following `<style>` tag to hide `.lecture` blocks by default:
```markdown
…

## Learning Goals

<style>.lecture {display:none;}</style>

After this lesson you will be able to:
- Explain what JavaScript is and a bit of its history
- Explain what ES6 is and how JavaScript evolves
…
```

then, simply add you annotations blocks:

```markdown
## What is JavaScript?

:::info lecture
Créé en 1995 par [Brendan Eich](https://en.wikipedia.org/wiki/Brendan_Eich) :
![](https://i.imgur.com/j3Yh0tp.png)
 en 10 jours, pour la version 2.0 beta du navigateur Netscape Navigator :
![](https://i.imgur.com/jC9F1xX.png)
:::

According to the official **MDN** (Mozilla Developer Network) documentation, **JavaScript can be defined as a *lightweight* *interpreted* programming language with *first-class functions***.
```

🙌 The above `:::info lecture` block will only display if `ironlecture` is installed.

# Nota bene

NB: Currently, this is only enabled for WDPT201909PAR and WDPT202006PAR, ie: my cohorts. But you can also enable it for you, just by updating this regex on [this line](https://github.com/abernier/ironlecture/blob/dcd1f1c5747fee483527046dc258e27da59904c2/ironlecture.user.js#L7):

```js
// @include      /^https?:\/\/(preview.)?my.ironhack.com\/.*(WDPT.*201909_PAR|WDPT.*202006_PAR).*
```

