!function(){"use strict";var e={481:function(e,n,t){var r=t(762),o=t(62),a=t(984).Chess,i=[["a8","b8","c8","d8","e8","f8","g8","h8"],["a7","b7","c7","d7","e7","f7","g7","h7"],["a6","b6","c6","d6","e6","f6","g6","h6"],["a5","b5","c5","d5","e5","f5","g5","h5"],["a4","b4","c4","d4","e4","f4","g4","h4"],["a3","b3","c3","d3","e3","f3","g3","h3"],["a2","b2","c2","d2","e2","f2","g2","h2"],["a1","b1","c1","d1","e1","f1","g1","h1"]],f=new RegExp("[#+]$"),c=new RegExp("#$"),s={1:"45678",2:"5678",3:"678",4:"78",5:"8"},u={a:"defgh",b:"efgh",c:"fgh",d:"gh",e:"h"},l=[];self.onmessage=function(e){var n=JSON.parse(e.data),t=n.fromSquare,h=n.nSquares,p=n.testFen,v=p?new a(p):new a;p||v.clear();for(var d=0,g=0;g<i.length&&-1===(d=i[g].indexOf(t));g++);for(var m=d+h,b=[],y=0;y<h-g;y++)b.push.apply(b,(0,o.Z)(i[g+y].slice(d,m)));var O=function(e){for(var n=e.map((function(e){return e.charAt(1)})).sort(),t=0;t<n.length-1;t++)if(!["6","7","8"].includes(n[t])&&s[n[t]].includes(n[t+1]))return!0;for(var r=e.map((function(e){return e.charAt(0)})).sort(),o=0;o<r.length-1;o++)if(!["f","g","h"].includes(r[o])&&u[r[o]].includes(r[o+1]))return!0;return!1},x="abcdefgh",M=function(e,n){var t=Math.max.apply(Math,(0,o.Z)(e.map((function(e){return parseInt(e.charAt(1))})))),r=Math.min.apply(Math,(0,o.Z)(n.map((function(e){return parseInt(e.charAt(1))}))));if(Math.abs(t-r)>1)return!0;var a=Math.max.apply(Math,(0,o.Z)(e.map((function(e){return x.indexOf(e.charAt(0))})))),i=Math.min.apply(Math,(0,o.Z)(n.map((function(e){return x.indexOf(e.charAt(0))}))));return Math.abs(a-i)>1},k=function(){var e,n=v.moves().filter((function(e){return!f.test(e)&&!e.includes("x")})),t=0,o=null,a=(0,r.Z)(n);try{for(a.s();!(e=a.n()).done;){var i=e.value;v.move(i);var s,u=v.moves(),l=0,h=(0,r.Z)(u);try{for(h.s();!(s=h.n()).done;){var d=s.value;if(v.move(d),l=v.moves().filter((function(e){return c.test(e)})).length,v.undo(),0===l)break}}catch(g){h.e(g)}finally{h.f()}l>0&&(p&&console.log("checkmate at second move",i),t++,o=i),v.undo()}}catch(g){a.e(g)}finally{a.f()}return p&&console.log(1===t?"Position is problem":"Position is not problem"),1===t?o:null},S=n.pieces.indexOf("k"),w=null;if(""===t)console.log("Invalid fromSquare");else if(p){console.time();var A=k(),Z={fen:p,firstMove:A};self.postMessage(JSON.stringify(Z)),console.timeEnd()}else!function e(n,t){var a,i=n.shift().charAt(0),f=i.toLowerCase(),c=/[RNBKQP]/.test(i)?"w":"b",s="k"===i,u=(0,r.Z)(b);try{for(u.s();!(a=u.n()).done;){var h=a.value;if(!l.includes(h)&&("p"!==f||!h.includes("8")&&!h.includes("1"))){var p=v.put({type:f,color:c},h);if(v.isCheck()||s&&v.isAttacked(h,"w")||"b"===c&&v.isAttacked(l[0],"b"))v.remove(h);else if(p){var d=!1,g=!1,m=!1;if(s&&(w=null),l.push(h),t>0&&t<S){var y=l.slice(0,l.length);d=O(y)}else if(t>=S){var x=l.slice(S,l.length);if(x.length>1&&(g=O(x)),!g){var A=l.slice(0,S);g=M(A,x)}t===S&&(m=v.isAttacked(h,"w"))}if(!d&&!g&&!m)if(0===n.length){var Z=v.fen(),j=k();null!==j&&(j===w?j=null:(w=j,console.log("------",l,"---",Z)));var P={fen:Z,firstMove:j};self.postMessage(JSON.stringify(P))}else e((0,o.Z)(n),t+1);l.pop(),v.remove(h)}}}}catch(C){u.e(C)}finally{u.f()}}((0,o.Z)(n.pieces),0)}}},n={};function t(r){var o=n[r];if(void 0!==o)return o.exports;var a=n[r]={exports:{}};return e[r](a,a.exports,t),a.exports}t.m=e,t.x=function(){var e=t.O(void 0,[777],(function(){return t(481)}));return e=t.O(e)},function(){var e=[];t.O=function(n,r,o,a){if(!r){var i=1/0;for(u=0;u<e.length;u++){r=e[u][0],o=e[u][1],a=e[u][2];for(var f=!0,c=0;c<r.length;c++)(!1&a||i>=a)&&Object.keys(t.O).every((function(e){return t.O[e](r[c])}))?r.splice(c--,1):(f=!1,a<i&&(i=a));if(f){e.splice(u--,1);var s=o();void 0!==s&&(n=s)}}return n}a=a||0;for(var u=e.length;u>0&&e[u-1][2]>a;u--)e[u]=e[u-1];e[u]=[r,o,a]}}(),t.d=function(e,n){for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},t.f={},t.e=function(e){return Promise.all(Object.keys(t.f).reduce((function(n,r){return t.f[r](e,n),n}),[]))},t.u=function(e){return"static/js/"+e+".0e9f84b3.chunk.js"},t.miniCssF=function(e){},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.p="/chess-problem/",function(){var e={481:1};t.f.i=function(n,r){e[n]||importScripts(t.p+t.u(n))};var n=self.webpackChunkchess_game=self.webpackChunkchess_game||[],r=n.push.bind(n);n.push=function(n){var o=n[0],a=n[1],i=n[2];for(var f in a)t.o(a,f)&&(t.m[f]=a[f]);for(i&&i(t);o.length;)e[o.pop()]=1;r(n)}}(),function(){var e=t.x;t.x=function(){return t.e(777).then(e)}}();t.x()}();
//# sourceMappingURL=481.4fd30832.chunk.js.map