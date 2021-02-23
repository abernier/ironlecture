// ==UserScript==
// @name         ironlecture
// @version      0.1.18
// @author       abernier
// @namespace    name.abernier
// @description  Ironhack lecture annotations
// @homepage     https://github.com/abernier/ironlecture
// @updateURL    https://github.com/abernier/ironlecture/raw/master/ironlecture.user.js
// @downloadURL  https://github.com/abernier/ironlecture/raw/master/ironlecture.user.js
// @supportURL   https://github.com/abernier/ironlecture/issues
// @include      /^https?:\/\/(preview.)?my\.ironhack\.com\/.*(WDPT.*201909_PAR|WDPT.*202006_PAR|WDPT.*202102_PAR).*/
// @require      https://cdnjs.cloudflare.com/ajax/libs/sass.js/0.11.1/sass.sync.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js
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

// const lmscss = GM_getResourceText("lmscss") // see: https://codepen.io/abernier/pen/GRoKqdp?editors=0100
// const lecturecss = GM_getResourceText("lecturecss") // see: https://codepen.io/abernier/pen/bGEbqYM?editors=0100

const lmsscss = `
.ih-course-container {
  // Trailing dots for headings
  h1, h2, h3, h4, h5, h6 {
    overflow:hidden; white-space:nowrap;
    &:after {content:"......................................................................................................................................................................................";}
  }
}

/*
LMS fixes

see: https://docs.google.com/document/d/1A85KWmZ2Atr4VEZaO2lgKISWieFOquCbqk0pDdkdmgs/edit
*/

/* not submitted yet */
html {overflow-x:hidden;}

.ih-course-container {
  //
  // overriding LMS actually defined styles
  //

  ol, ul {padding-left:40px;}

  p {margin-bottom:1em;}

  ul li,
  ol li {margin-bottom:initial;} // no margin-bottom for li

  .alert {margin-top:1em;margin-bottom:1em;}

  .emoji {margin-bottom:-.55rem;} // fine-tuning

  blockquote {margin-right:0;} // remove a useless margin-right on blockquote

  ul ul {margin-top:initial;margin-bottom:initial;} // no margin for nested ul
}


.alert table:not(.hljs-ln),
.alert blockquote {background-color:white;} // define a bg when inside an alert block

/*
wide youtube player

see: https://docs.google.com/document/d/1A85KWmZ2Atr4VEZaO2lgKISWieFOquCbqk0pDdkdmgs/edit#heading=h.tujhntb3h7d
*/
.youtube {padding-bottom:calc(100% * 9/16); position:relative;}
.youtube >iframe {position:absolute;left:0;top:0; width:100%;height:100%;}

/*
Removing last-child margin-bottom inside .alert blocks

see: https://docs.google.com/document/d/1A85KWmZ2Atr4VEZaO2lgKISWieFOquCbqk0pDdkdmgs/edit#heading=h.i022ofgzw5mi
*/
.alert >:last-child,
.alert >:last-child,
.alert >:last-child {margin-bottom: 0;}

/*
simple <code> are not styled
*/
:not(pre) >code {background:#f4f4f4; padding:.2em; border-radius:3px;}

/*
<blockquote> are not visible enough

see: https://docs.google.com/document/d/1A85KWmZ2Atr4VEZaO2lgKISWieFOquCbqk0pDdkdmgs/edit#heading=h.1ymwp9xhfwp0
*/
blockquote {
  margin-left:0!important; /* remove !important */
  padding:20px;padding-right:0; /* 20px from 'table' margin value */
  border-left:3px solid rgb(226, 226, 226); /* same as 'pre code' except for color which is from 'table th' background-color */
  margin-bottom:12px; /*  */
}
blockquote >:last-child {margin-bottom:0;}

/* only way of "undoing" 'img {height:auto;}' set by LMS */
@for $i from 0 through 2000 {
  img[height="#{$i}"]{height:#{$i}px}
}
`
const lecturescss = `
.lecture {display:block!important;}

.content-wrapper {overflow:initial;}

.gallery {
  display:grid;
  grid-template-columns:repeat(2, 1fr); grid-gap:1rem;
  align-items: center;
}

.lecture b {
  --color:yellow;
  font-weight:500;
  background:var(--color); box-shadow:0 0 0 .35em var(--color),0 0 0 .35em;
}

.bigemoji,
.superbigemoji {
  >img.emoji {width:1em; height:1em;}
}
.bigemoji {font-size:300%;}
.superbigemoji {font-size:600%;}

.alert.lecture {
  --shadow: 5px;
  border:5px solid; box-shadow:0 0 0 var(--shadow) rgba(64, 96, 85, 0.4);

  .ih-course-container & {margin-top:calc(1em + var(--shadow));margin-bottom:calc(1em + var(--shadow));}

  &:before {
    content:"";
    display:block;margin-bottom:.5em;
    width:1em; height:1em;
    background:url("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/male-teacher-type-1-2_1f468-1f3fb-200d-1f3eb.png");
    background-size:contain;
    font-size: 3rem;
  }
}
`
//console.log('lmscss', lmsscss)
//console.log('lecturecss', lecturescss)

function compileScss(scss) {
    return new Promise(function (resolve, reject) {
        Sass.compile(scss, function (result) {
            if (result.status !== 0) { // see https://github.com/medialize/sass.js/blob/master/docs/api.md#the-response-object
                reject(new Error('Failed to compile scss'));
            }

            const css = result.text;
            //console.log('css', css);

            resolve(css);
        });
    })
}


Promise.all([
    compileScss(lmsscss),
    compileScss(lecturescss)
]).then(function (values) {
    document.body.insertAdjacentHTML("beforeend", `<style>${values.join('')}</style>`);
}).catch(function (err) {
    throw err;
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
