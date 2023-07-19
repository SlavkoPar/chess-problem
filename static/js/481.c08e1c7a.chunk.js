!function(){"use strict";var e={481:function(e,n,r){var t=r(762),a=r(62),f=r(984),o=f.Chess,c=(f.bishop,[["a8","b8","c8","d8","e8","f8","g8","h8"],["a7","b7","c7","d7","e7","f7","g7","h7"],["a6","b6","c6","d6","e6","f6","g6","h6"],["a5","b5","c5","d5","e5","f5","g5","h5"],["a4","b4","c4","d4","e4","f4","g4","h4"],["a3","b3","c3","d3","e3","f3","g3","h3"],["a2","b2","c2","d2","e2","f2","g2","h2"],["a1","b1","c1","d1","e1","f1","g1","h1"]]),i=new RegExp("[#+]$"),s=new RegExp("#$"),l={1:"45678",2:"5678",3:"678",4:"78",5:"8"},u={a:"defgh",b:"efgh",c:"fgh",d:"gh",e:"h"},h=[];self.onmessage=function(e){var n=JSON.parse(e.data),r=n.pieces,f=n.fromSquare,d=n.nSquares,v=n.testFen,p=v?new o(v):new o;v||p.clear();var g=0,b=r.includes("Q")&&r.includes("N");b&&g++;for(var m=0,y=0;y<c.length&&-1===(m=c[y].indexOf(f));y++);for(var M=m+d,O=[],x=0;x<d-y;x++)O.push.apply(O,(0,a.Z)(c[y+x].slice(m,M)));for(var k=function(e){for(var n=e.map((function(e){return e.charAt(1)})).sort(),r=0;r<n.length-1;r++)if(!["6","7","8"].includes(n[r])&&l[n[r]].includes(n[r+1]))return!0;for(var t=e.map((function(e){return e.charAt(0)})).sort(),a=0;a<t.length-1;a++)if(!["f","g","h"].includes(t[a])&&u[t[a]].includes(t[a+1]))return!0;return!1},Z="abcdefgh",w=function(e,n){var r=Math.max.apply(Math,(0,a.Z)(e.map((function(e){return parseInt(e.charAt(1))})))),t=Math.min.apply(Math,(0,a.Z)(n.map((function(e){return parseInt(e.charAt(1))}))));if(Math.abs(r-t)>1)return!0;var f=Math.max.apply(Math,(0,a.Z)(e.map((function(e){return Z.indexOf(e.charAt(0))})))),o=Math.min.apply(Math,(0,a.Z)(n.map((function(e){return Z.indexOf(e.charAt(0))}))));return Math.abs(f-o)>1},A=[["a1","b2","c3","d4","e5","f6","g7","h8"],["a2","b3","c4","d5","e6","f7","g8"],["a3","b4","c5","d6","e7","f8"],["a4","b5","c6","d7","e8"],["a5","b6","c7","d8"],["a6","b7","c8"],["a7","b8"],["b1","c2","d3","e4","f5","g6","h7"],["c1","d2","e3","f4","g5","h6"],["d1","e2","f3","g4","h5"],["e1","f2","g3","h4"],["f1","g2","h3"],["g1","h2"]],S=[["h1","g2","f3","e4","d5","c6","b7","a8"],["h2","g3","f4","e5","d6","c7","b8"],["h3","g4","f5","e6","d7","c8"],["h4","g5","f6","e7","d8"],["h5","g6","f7","e8"],["h6","g7","f8"],["h7","g8"],["g1","f2","e3","d4","c5","b6","a7"],["f1","e2","d3","c4","b5","a6"],["e1","d2","c3","b4","a5"],["d1","c2","b3","a4"],["c1","b2","a3"],["b1","a2"]],j={},P=0,C=["1","2","3","4","5","6","7","8"];P<C.length;P++)for(var q=C[P],I=function(){var e=W[N]+q;j[e]=[];var n,r=(0,t.Z)(A);try{for(r.s();!(n=r.n()).done;){var f,o=n.value;o.includes(e)&&(f=j[e]).push.apply(f,(0,a.Z)(o.filter((function(n){return n!==e}))))}}catch(u){r.e(u)}finally{r.f()}var c,i=(0,t.Z)(S);try{for(i.s();!(c=i.n()).done;){var s,l=c.value;l.includes(e)&&(s=j[e]).push.apply(s,(0,a.Z)(l.filter((function(n){return n!==e}))))}}catch(u){i.e(u)}finally{i.f()}},N=0,W=["a","b","c","d","e","f","g","h"];N<W.length;N++)I();var _=function(e){if(b){for(var n=null,r=null,t=0;t<8&&(!n||!r);t++)for(var a=e[t],f=0;f<8&&(!n||!r);f++)if(a[f]){var o=a[f],c=o.type,i=o.color,s=o.square;"q"===c&&"w"===i?n=s:"n"===c&&"w"===i&&(r=s)}if(!r||!n)return!1;var l=parseInt(n.charAt(1)),u=Z.indexOf(n.charAt(0)),h=parseInt(r.charAt(1)),d=Z.indexOf(r.charAt(0)),v=u===d&&(2===Math.abs(l-h)||4===Math.abs(l-h))||l===h&&(2===Math.abs(u-d)||4===Math.abs(u-d));return v||(p=r,v=j[n].includes(p)),v}var p;return!1},E=function(){var e,n=p.moves().filter((function(e){return!i.test(e)&&!e.includes("x")})),r=0,a=null,f=!1,o=(0,t.Z)(n);try{for(o.s();!(e=o.n()).done;){var c=e.value;p.move(c);var l=p.moves(),u=0;f=!1;var h,d=(0,t.Z)(l);try{for(d.s();!(h=d.n()).done;){var b=h.value;p.move(b);var m=p.moves().filter((function(e){return s.test(e)}));if((u=m.length)>0&&g>0){var y,M=(0,t.Z)(m);try{for(M.s();!(y=M.n()).done;){var O=y.value;if(p.move(O),_(p.board())&&(f=!0,console.log("black:",b," white2:",O)),p.undo(),f)break}}catch(x){M.e(x)}finally{M.f()}}if(p.undo(),0===u)break}}catch(x){d.e(x)}finally{d.f()}u>0&&(0===g||f)&&(v&&console.log("checkmate at second move",c),r++,a=c,console.log("firstMove:",a)),p.undo()}}catch(x){o.e(x)}finally{o.f()}return v&&console.log(1===r?"Position is problem":"Position is not problem"),1===r?a:null},J=n.pieces.indexOf("k"),R=null;if(""===f)console.log("Invalid fromSquare");else if(v){console.time();var F=E(),Q={fen:v,firstMove:F};self.postMessage(JSON.stringify(Q)),console.timeEnd()}else!function e(n,r){var f,o=n.shift().charAt(0),c=o.toLowerCase(),i=/[RNBKQP]/.test(o)?"w":"b",s="k"===o,l=(0,t.Z)(O);try{for(l.s();!(f=l.n()).done;){var u=f.value;if(!h.includes(u)&&("p"!==c||!u.includes("8")&&!u.includes("1"))){var d=p.put({type:c,color:i},u);if(p.isCheck()||s&&(p.isAttacked(u,"w")||u.endsWith("1")||u.endsWith("8")||u.startsWith("a")||u.startsWith("h"))||"b"===i&&p.isAttacked(h[0],"b"))p.remove(u);else if(d){var v=!1,g=!1,b=!1;if(s&&(R=null),h.push(u),r>0&&r<J){var m=h.slice(0,h.length);v=k(m)}else if(r>=J){var y=h.slice(J,h.length);if(y.length>1&&(g=k(y)),!g){var M=h.slice(0,J);g=w(M,y)}r===J&&(b=p.isAttacked(u,"w"))}if(!v&&!g&&!b)if(0===n.length){var x=p.fen(),Z=E();null!==Z&&(Z===R?Z=null:(R=Z,console.log("------",h,"---",x)));var A={fen:x,firstMove:Z};self.postMessage(JSON.stringify(A))}else e((0,a.Z)(n),r+1);h.pop(),p.remove(u)}}}}catch(S){l.e(S)}finally{l.f()}}((0,a.Z)(n.pieces),0)}}},n={};function r(t){var a=n[t];if(void 0!==a)return a.exports;var f=n[t]={exports:{}};return e[t](f,f.exports,r),f.exports}r.m=e,r.x=function(){var e=r.O(void 0,[777],(function(){return r(481)}));return e=r.O(e)},function(){var e=[];r.O=function(n,t,a,f){if(!t){var o=1/0;for(l=0;l<e.length;l++){t=e[l][0],a=e[l][1],f=e[l][2];for(var c=!0,i=0;i<t.length;i++)(!1&f||o>=f)&&Object.keys(r.O).every((function(e){return r.O[e](t[i])}))?t.splice(i--,1):(c=!1,f<o&&(o=f));if(c){e.splice(l--,1);var s=a();void 0!==s&&(n=s)}}return n}f=f||0;for(var l=e.length;l>0&&e[l-1][2]>f;l--)e[l]=e[l-1];e[l]=[t,a,f]}}(),r.d=function(e,n){for(var t in n)r.o(n,t)&&!r.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},r.f={},r.e=function(e){return Promise.all(Object.keys(r.f).reduce((function(n,t){return r.f[t](e,n),n}),[]))},r.u=function(e){return"static/js/"+e+".0e9f84b3.chunk.js"},r.miniCssF=function(e){},r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.p="/chess-problem/",function(){var e={481:1};r.f.i=function(n,t){e[n]||importScripts(r.p+r.u(n))};var n=self.webpackChunkchess_game=self.webpackChunkchess_game||[],t=n.push.bind(n);n.push=function(n){var a=n[0],f=n[1],o=n[2];for(var c in f)r.o(f,c)&&(r.m[c]=f[c]);for(o&&o(r);a.length;)e[a.pop()]=1;t(n)}}(),function(){var e=r.x;r.x=function(){return r.e(777).then(e)}}();r.x()}();
//# sourceMappingURL=481.c08e1c7a.chunk.js.map