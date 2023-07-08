!function(){"use strict";var e={504:function(e,n,r){var t=r(62),o=r(762),f=function(e){return e.solveProblem="solveProblem",e.findProblem="findProblem",e}({}),i=r(984).Chess,c=["a8","b8","c8","d8","e8","f8","g8","h8","a7","b7","c7","d7","e7","f7","g7","h7","a6","b6","c6","d6","e6","f6","g6","h6","a5","b5","c5","d5","e5","f5","g5","h5","a4","b4","c4","d4","e4","f4","g4","h4","a3","b3","c3","d3","e3","f3","g3","h3","a2","b2","c2","d2","e2","f2","g2","h2","a1","b1","c1","d1","e1","f1","g1","h1"],a=new RegExp("[#+]$"),u=new RegExp("#$"),s=[],l=new i;l.clear(),self.onmessage=function(e){var n=JSON.parse(e.data);if(n.action===f.findProblem&&(""===n.fromSquare||""===n.toSquare)){var r=function(){var e,n=l.moves().filter((function(e){return!a.test(e)&&!e.includes("x")})),r=0,t=null,f=(0,o.Z)(n);try{for(f.s();!(e=f.n()).done;){var i=e.value;l.move(i);var c,s=l.moves(),v=0,d=(0,o.Z)(s);try{for(d.s();!(c=d.n()).done;){var p=c.value;if(l.move(p),v=l.moves().filter((function(e){return u.test(e)})).length,l.undo(),1!==v)break}}catch(h){d.e(h)}finally{d.f()}if(1===v&&(console.log("checkmate at second move",i),r++,t=i),r>1)break;if(l.undo(),r>1)break}}catch(h){f.e(h)}finally{f.f()}return 1===r?t:null};!function e(n){var o=n.shift(),f=o.charAt(0),i=f.toLowerCase(),a=/[RNBKQP]/.test(f)?"w":"b";console.log(o);for(var u=0,v=c;u<v.length;u++){var d=v[u];if(!s.includes(d)&&("p"!==i||!d.includes("8")&&!d.includes("1"))){var p=l.put({type:i,color:a},d);if(l.isCheck()||"k"===f&&l.isAttacked(d,"w")||"b"===a&&l.isAttacked(s[0],"b"))l.remove(d);else if(p){if(s.push(d),0===n.length){var h=l.fen();console.log("------",s,"---",h);var b=r(),g={loading:!1,fen:h,isCheckmate:null!=b,firstMove:b};self.postMessage(JSON.stringify(g))}else e((0,t.Z)(n));s.pop();l.remove(d),l.fen()}}}}((0,t.Z)(n.pieces))}}}},n={};function r(t){var o=n[t];if(void 0!==o)return o.exports;var f=n[t]={exports:{}};return e[t](f,f.exports,r),f.exports}r.m=e,r.x=function(){var e=r.O(void 0,[777],(function(){return r(504)}));return e=r.O(e)},function(){var e=[];r.O=function(n,t,o,f){if(!t){var i=1/0;for(s=0;s<e.length;s++){t=e[s][0],o=e[s][1],f=e[s][2];for(var c=!0,a=0;a<t.length;a++)(!1&f||i>=f)&&Object.keys(r.O).every((function(e){return r.O[e](t[a])}))?t.splice(a--,1):(c=!1,f<i&&(i=f));if(c){e.splice(s--,1);var u=o();void 0!==u&&(n=u)}}return n}f=f||0;for(var s=e.length;s>0&&e[s-1][2]>f;s--)e[s]=e[s-1];e[s]=[t,o,f]}}(),r.d=function(e,n){for(var t in n)r.o(n,t)&&!r.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},r.f={},r.e=function(e){return Promise.all(Object.keys(r.f).reduce((function(n,t){return r.f[t](e,n),n}),[]))},r.u=function(e){return"static/js/"+e+".0e9f84b3.chunk.js"},r.miniCssF=function(e){},r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.p="/chess-problem/",function(){var e={504:1};r.f.i=function(n,t){e[n]||importScripts(r.p+r.u(n))};var n=self.webpackChunkchess_game=self.webpackChunkchess_game||[],t=n.push.bind(n);n.push=function(n){var o=n[0],f=n[1],i=n[2];for(var c in f)r.o(f,c)&&(r.m[c]=f[c]);for(i&&i(r);o.length;)e[o.pop()]=1;t(n)}}(),function(){var e=r.x;r.x=function(){return r.e(777).then(e)}}();r.x()}();
//# sourceMappingURL=504.7a45d906.chunk.js.map