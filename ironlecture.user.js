// ==UserScript==
// @name         ironlecture
// @namespace    name.abernier
// @version      0.1
// @description  Lecture annotations
// @author       abernier
// @match        https://preview.my.ironhack.com/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/sass.js/0.11.1/sass.sync.min.js
// ==/UserScript==

const lmscss = `
/*
LMS fixes
*/

/* not submitted yet */
.ih-course-container ol,
.ih-course-container ul {padding-left:40px;}
.ih-course-container p {margin-bottom:1em;}
.ih-course-container ul li {margin-bottom:initial;}
.ih-course-container .alert {margin-top:1em;margin-bottom:1em;}

/* wide youtube player
see: https://docs.google.com/document/d/1A85KWmZ2Atr4VEZaO2lgKISWieFOquCbqk0pDdkdmgs/edit#heading=h.tujhntb3h7d
*/
.youtube {padding-bottom:calc(100% * 9/16); position:relative;}
.youtube >iframe {position:absolute;left:0;top:0; width:100%;height:100%;}

/* Removing last-child margin-bottom inside .alert blocks
see: https://docs.google.com/document/d/1A85KWmZ2Atr4VEZaO2lgKISWieFOquCbqk0pDdkdmgs/edit#heading=h.i022ofgzw5mi
*/
.alert >:last-child,
.alert >:last-child,
.alert >:last-child {margin-bottom: 0;}

/* simple 'foo' codes are not styled */
:not(pre) >code {background:#f4f4f4; padding:.2em; border-radius:3px;}

/* quotes are not visible enough
see: https://docs.google.com/document/d/1A85KWmZ2Atr4VEZaO2lgKISWieFOquCbqk0pDdkdmgs/edit#heading=h.1ymwp9xhfwp0
*/
blockquote {
  margin-left:0!important; /* remove !important */
  padding:20px;padding-right:0; /* 20px from 'table' margin value */

  border-left:3px solid rgb(226, 226, 226); /* same as 'pre code' except for color which is from 'table th' background-color */
  margin-bottom:12px; /*  */
}
blockquote >:last-child {margin-bottom:0;}
`;

const scss = `
.lecture {display:block!important;}

.content-wrapper {overflow:initial;}

.alert.lecture {
  //box-shadow:0 0 0 .5rem rgba(64, 96, 85, 0.4);
  //position:relative;
  //display:none;
  border:5px solid;
}

.alert.lecture:before {
  content:"";
  display:block;margin-bottom:.5em;
  /*position:absolute; right:0; top:0;
  margin:3px;margin-right:7px;*/
  width:1em; height:1em;
  //background:url("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/male-teacher_1f468-200d-1f3eb.png");
  background:url("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/male-teacher-type-1-2_1f468-1f3fb-200d-1f3eb.png");
  background-size:contain;
  font-size: 3rem;
}

// only way of "undoing" 'img {height:auto;}' set by LMS
@for $i from 0 through 2000 {
  img[height="#{$i}"]{height:#{$i}px}
}
`;

Sass.compile(scss, function (result) {
    if (result.status !== 0) { // see https://github.com/medialize/sass.js/blob/master/docs/api.md#the-response-object
        throw new Error('Failed to compile');
    }

    const css = result.text;
    //console.log('css', css);

    // https://stackoverflow.com/a/28662118/133327
    document.body.insertAdjacentHTML("beforeend", `<style>${css}${lmscss}</style>`)
});

//alert("coucou")
