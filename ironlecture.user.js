// ==UserScript==
// @name         ironlecture
// @namespace    name.abernier
// @version      0.1
// @description  Lecture annotations
// @author       abernier
// @match        https://preview.my.ironhack.com/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/sass.js/0.11.1/sass.sync.min.js
// @resource     lmscss https://codepen.io/abernier/pen/GRoKqdp.css
// @grant        GM_getResourceText
// @grant        GM_addStyle
// ==/UserScript==

// see: https://codepen.io/abernier/pen/GRoKqdp?editors=0100
const lmscss = GM_getResourceText("lmscss")

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
    document.body.insertAdjacentHTML("beforeend", `<style>${css}${lmscss || ''}</style>`)
});

//alert("coucou")
