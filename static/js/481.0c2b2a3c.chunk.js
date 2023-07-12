!function(){"use strict";var e={481:function(e,n,r){var t=r(762),o=r(62),i=r(984).Chess,s=[["a8","b8","c8","d8","e8","f8","g8","h8"],["a7","b7","c7","d7","e7","f7","g7","h7"],["a6","b6","c6","d6","e6","f6","g6","h6"],["a5","b5","c5","d5","e5","f5","g5","h5"],["a4","b4","c4","d4","e4","f4","g4","h4"],["a3","b3","c3","d3","e3","f3","g3","h3"],["a2","b2","c2","d2","e2","f2","g2","h2"],["a1","b1","c1","d1","e1","f1","g1","h1"]],f=new RegExp("[#+]$"),c=new RegExp("#$"),a=[];self.onmessage=function(e){var n=JSON.parse(e.data),r=n.fromSquare,l=n.nSquares,u=n.testFen,v=u?new i(u):new i;u||v.clear();for(var d=0,p=0;p<s.length&&-1===(d=s[p].indexOf(r));p++);var h=d+l,g=[].concat((0,o.Z)(s[p+0].slice(d,h)),(0,o.Z)(s[p+1].slice(d,h)),(0,o.Z)(s[p+2].slice(d,h)),(0,o.Z)(s[p+3].slice(d,h)),(0,o.Z)(s[p+4].slice(d,h))),b=function(){var e,n=v.moves().filter((function(e){return!f.test(e)&&!e.includes("x")})),r=0,o=null,i=(0,t.Z)(n);try{for(i.s();!(e=i.n()).done;){var s=e.value;v.move(s);var a,l=v.moves(),d=0,p=(0,t.Z)(l);try{for(p.s();!(a=p.n()).done;){var h=a.value;if(v.move(h),d=v.moves().filter((function(e){return c.test(e)})).length,v.undo(),0===d)break}}catch(g){p.e(g)}finally{p.f()}d>0&&(u&&console.log("checkmate at second move",s),r++,o=s),v.undo()}}catch(g){i.e(g)}finally{i.f()}return u&&console.log(1===r?"Position is problem":"Position is not problem"),1===r?o:null},m=null;if(""===r)console.log("Invalid fromSquare");else if(u){console.time();var y=b(),O={fen:u,firstMove:y};self.postMessage(JSON.stringify(O)),console.timeEnd()}else!function e(n){var r,i=n.shift().charAt(0),s=i.toLowerCase(),f=/[RNBKQP]/.test(i)?"w":"b",c=(0,t.Z)(g);try{for(c.s();!(r=c.n()).done;){var l=r.value;if(!a.includes(l)&&("p"!==s||!l.includes("8")&&!l.includes("1"))){var u=v.put({type:s,color:f},l);if(v.isCheck()||"k"===i&&v.isAttacked(l,"w")||"b"===f&&v.isAttacked(a[0],"b"))v.remove(l);else if(u){if("k"===i&&(m=null),a.push(l),0===n.length){var d=v.fen();console.log("------",a,"---",d);var p=b();null!==p&&(p===m?p=null:m=p);var h={fen:d,firstMove:p};self.postMessage(JSON.stringify(h))}else e((0,o.Z)(n));a.pop(),v.remove(l)}}}}catch(y){c.e(y)}finally{c.f()}}((0,o.Z)(n.pieces))}}},n={};function r(t){var o=n[t];if(void 0!==o)return o.exports;var i=n[t]={exports:{}};return e[t](i,i.exports,r),i.exports}r.m=e,r.x=function(){var e=r.O(void 0,[777],(function(){return r(481)}));return e=r.O(e)},function(){var e=[];r.O=function(n,t,o,i){if(!t){var s=1/0;for(l=0;l<e.length;l++){t=e[l][0],o=e[l][1],i=e[l][2];for(var f=!0,c=0;c<t.length;c++)(!1&i||s>=i)&&Object.keys(r.O).every((function(e){return r.O[e](t[c])}))?t.splice(c--,1):(f=!1,i<s&&(s=i));if(f){e.splice(l--,1);var a=o();void 0!==a&&(n=a)}}return n}i=i||0;for(var l=e.length;l>0&&e[l-1][2]>i;l--)e[l]=e[l-1];e[l]=[t,o,i]}}(),r.d=function(e,n){for(var t in n)r.o(n,t)&&!r.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},r.f={},r.e=function(e){return Promise.all(Object.keys(r.f).reduce((function(n,t){return r.f[t](e,n),n}),[]))},r.u=function(e){return"static/js/"+e+".0e9f84b3.chunk.js"},r.miniCssF=function(e){},r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.p="/chess-problem/",function(){var e={481:1};r.f.i=function(n,t){e[n]||importScripts(r.p+r.u(n))};var n=self.webpackChunkchess_game=self.webpackChunkchess_game||[],t=n.push.bind(n);n.push=function(n){var o=n[0],i=n[1],s=n[2];for(var f in i)r.o(i,f)&&(r.m[f]=i[f]);for(s&&s(r);o.length;)e[o.pop()]=1;t(n)}}(),function(){var e=r.x;r.x=function(){return r.e(777).then(e)}}();r.x()}();
//# sourceMappingURL=481.0c2b2a3c.chunk.js.map