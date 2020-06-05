// ==UserScript==
// @name         ironlecture
// @namespace    name.abernier
// @version      0.1.3
// @homepage     https://github.com/abernier/ironlecture
// @description  Lecture annotations
// @author       abernier
// @include      /^https?:\/\/(preview.)?my.ironhack.com\/.*(WDPT.*201909_PAR|WDPT.*202006_PAR).*
// @require      https://cdnjs.cloudflare.com/ajax/libs/sass.js/0.11.1/sass.sync.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js
// @resource     lmscss https://codepen.io/abernier/pen/GRoKqdp.css?v12
// @resource     lecturecss https://codepen.io/abernier/pen/bGEbqYM.css?v13
// @grant        GM_getResourceText
// @grant        GM_addStyle
// ==/UserScript==

console.log('👨🏻‍🏫 ironlecture')

const lmscss = GM_getResourceText("lmscss") // see: https://codepen.io/abernier/pen/GRoKqdp?editors=0100
const lecturecss = GM_getResourceText("lecturecss") // see: https://codepen.io/abernier/pen/bGEbqYM?editors=0100
// console.log('lmscss', lmscss)
// console.log('lecturecss', lecturecss)

const scss = `
// nothing yet
`;

//
// Swipe left/right => prev/next lesson
//
const mc = new Hammer(document.body)
mc.on("swipeleft", function(ev) {
    document.querySelector('a.previous').click();
}).on("swiperight", function(ev) {
    document.querySelector('a.next').click();
});


Sass.compile(scss, function (result) {
    if (result.status !== 0) { // see https://github.com/medialize/sass.js/blob/master/docs/api.md#the-response-object
        throw new Error('Failed to compile');
    }

    const css = result.text;
    //console.log('css', css);

    // https://stackoverflow.com/a/28662118/133327
    document.body.insertAdjacentHTML("beforeend", `<style>${lmscss || ''}${lecturecss || ''}${css}</style>`)
});
