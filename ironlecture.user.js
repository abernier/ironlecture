// ==UserScript==
// @name         ironlecture
// @version      0.1.13
// @author       abernier
// @namespace    name.abernier
// @description  Ironhack lecture annotations
// @homepage     https://github.com/abernier/ironlecture
// @updateURL    https://github.com/abernier/ironlecture/raw/master/ironlecture.user.js
// @downloadURL  https://github.com/abernier/ironlecture/raw/master/ironlecture.user.js
// @supportURL   https://github.com/abernier/ironlecture/issues
// @include      /^https?:\/\/(preview.)?my\.ironhack\.com\/.*(WDPT.*201909_PAR|WDPT.*202006_PAR).*/
// @require      https://cdnjs.cloudflare.com/ajax/libs/sass.js/0.11.1/sass.sync.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js
// @resource     lmscss https://codepen.io/abernier/pen/GRoKqdp.css?v12
// @resource     lecturecss https://codepen.io/abernier/pen/bGEbqYM.css?v13
// @grant        GM_getResourceText
// @grant        GM_addStyle
// ==/UserScript==

console.log('👨🏻‍🏫 ironlecture')

//
// Inject additional styles
//   1. `lmscss`: LMS css fixes (see https://codepen.io/abernier/pen/GRoKqdp)
//   2. `lecturecss`: lecture specific styles (see https://codepen.io/abernier/pen/bGEbqYM)
//   3. `css`: other styles (compiled from `scss` on the fly)
//

const lmscss = GM_getResourceText("lmscss") // see: https://codepen.io/abernier/pen/GRoKqdp?editors=0100
const lecturecss = GM_getResourceText("lecturecss") // see: https://codepen.io/abernier/pen/bGEbqYM?editors=0100
// console.log('lmscss', lmscss)
// console.log('lecturecss', lecturecss)
let css;

const scss = `
// nothing yet
`;

Sass.compile(scss, function (result) {
    if (result.status !== 0) { // see https://github.com/medialize/sass.js/blob/master/docs/api.md#the-response-object
        throw new Error('Failed to compile');
    }

    css = result.text;
    //console.log('css', css);

    // https://stackoverflow.com/a/28662118/133327
    document.body.insertAdjacentHTML("beforeend", `<style>${lmscss || ''}${lecturecss || ''}${css || ''}</style>`)
});

//
// Gestures: swipe left/right => next/prev lesson
//
// see: https://codepen.io/abernier/pen/NWxxxWZ?editors=0111
//

// https://stackoverflow.com/a/37896547/133327
delete Hammer.defaults.cssProps.userSelect;

const mc = new Hammer(document.body, {
  // https://hammerjs.github.io/api/#hammer-manager
  recognizers: [
    [Hammer.Swipe, {velocity: 1}]
  ]
});

mc.on("swipeleft", function (ev) {
    document.querySelector('a.next').click();
})
mc.on("swiperight", function (ev) {
    document.querySelector('a.previous').click();
});
