!function(){"use strict";var e={505:function(e,r,n){for(var a=n(762),t=n(62),o=[["a8","b8","c8","d8","e8","f8","g8","h8"],["a7","b7","c7","d7","e7","f7","g7","h7"],["a6","b6","c6","d6","e6","f6","g6","h6"],["a5","b5","c5","d5","e5","f5","g5","h5"],["a4","b4","c4","d4","e4","f4","g4","h4"],["a3","b3","c3","d3","e3","f3","g3","h3"],["a2","b2","c2","d2","e2","f2","g2","h2"],["a1","b1","c1","d1","e1","f1","g1","h1"]],f="abcdefgh",c=function(e){for(var r=e.map((function(e){return e.i})).sort(),n=0;n<r.length-1;n++)if(r[n+1]-r[n]>3)return!0;r=e.map((function(e){return e.j})).sort();for(var a=0;a<r.length-1;a++)if(r[a+1]-r[a]>3)return!0;return!1},i=9,u=-1,l=9,s=-1,v=function(e){i=9,u=-1,l=9,s=-1;var r,n=(0,a.Z)(e);try{for(n.s();!(r=n.n()).done;){var t=r.value,o=t.i,f=t.j;o<i&&(i=o),o>u&&(u=o),f<l&&(l=f),f>s&&(s=f)}}catch(c){n.e(c)}finally{n.f()}},h=function(e){var r,n=(0,a.Z)(e);try{for(n.s();!(r=n.n()).done;){var t=r.value,o=t.i,f=t.j;if(o>=i&&o<=u&&f>=l&&f<=s)return!0}}catch(c){n.e(c)}finally{n.f()}return!1},d=[["a1","b2","c3","d4","e5","f6","g7","h8"],["a2","b3","c4","d5","e6","f7","g8"],["a3","b4","c5","d6","e7","f8"],["a4","b5","c6","d7","e8"],["a5","b6","c7","d8"],["a6","b7","c8"],["a7","b8"],["b1","c2","d3","e4","f5","g6","h7"],["c1","d2","e3","f4","g5","h6"],["d1","e2","f3","g4","h5"],["e1","f2","g3","h4"],["f1","g2","h3"],["g1","h2"]],p=[["h1","g2","f3","e4","d5","c6","b7","a8"],["h2","g3","f4","e5","d6","c7","b8"],["h3","g4","f5","e6","d7","c8"],["h4","g5","f6","e7","d8"],["h5","g6","f7","e8"],["h6","g7","f8"],["h7","g8"],["g1","f2","e3","d4","c5","b6","a7"],["f1","e2","d3","c4","b5","a6"],["e1","d2","c3","b4","a5"],["d1","c2","b3","a4"],["c1","b2","a3"],["b1","a2"]],b={},g=0,y=["1","2","3","4","5","6","7","8"];g<y.length;g++)for(var m=y[g],O=function(){var e=k[x]+m;b[e]=[];var r,n=(0,a.Z)(d);try{for(n.s();!(r=n.n()).done;){var o,f=r.value;f.includes(e)&&(o=b[e]).push.apply(o,(0,t.Z)(f.filter((function(r){return r!==e}))))}}catch(s){n.e(s)}finally{n.f()}var c,i=(0,a.Z)(p);try{for(i.s();!(c=i.n()).done;){var u,l=c.value;l.includes(e)&&(u=b[e]).push.apply(u,(0,t.Z)(l.filter((function(r){return r!==e}))))}}catch(s){i.e(s)}finally{i.f()}},x=0,k=["a","b","c","d","e","f","g","h"];x<k.length;x++)O();for(var Z=function(e,r){for(var n=null,a=null,t=0;t<8&&(!n||!a);t++)for(var o=e[t],c=0;c<8&&(!n||!a);c++)if(o[c]){var i=o[c],u=i.type,l=i.color,s=i.square;u===r&&"w"===l?n=s:"n"===u&&"w"===l&&(a=s)}if(!a||!n)return!1;var v,h=parseInt(n.charAt(1)),d=f.indexOf(n.charAt(0)),p=parseInt(a.charAt(1)),g=f.indexOf(a.charAt(0)),y=d===g&&(2===Math.abs(h-p)||4===Math.abs(h-p))||h===p&&(2===Math.abs(d-g)||4===Math.abs(d-g));return y||(v=a,y=b[n].includes(v)),y},A={},w=function(e,r){for(var n=[],a=e-1;a<=e+1;a++)if(!(a<1||a>8))for(var t=r-1;t<=r+1;t++)t<0||a>7||a===e&&t===r||n.push(f[t]+a);return n},j=1;j<=8;j++)for(var M=0;M<8;M++)A[f[M]+j]=w(j,M);var S=function(e,r){return A[e].includes(r)},q=n(984).Chess,C=new RegExp("[#+]$"),P=new RegExp("#$"),I=[];self.onmessage=function(e){var r=JSON.parse(e.data),n=(r.action,r.pieces),i=r.indexOfBlack,u=r.lookingForFen,l=r.fromSquare,s=r.toSquare,d=r.testFen,p=[],b=new q(d||u);if(!d){var g=function(e,r,n){for(var t=[],o=[],f=0;f<8;f++){o[f]=[];for(var c=0;c<8;c++)o[f][c]=!1}var i,u=(0,a.Z)(e);try{for(u.s();!(i=u.n()).done;)for(var l=i.value,s=["K","Q","R","B","N","P"].includes(l)?"w":"b",v=l.toLowerCase(),h=!1,d=0;d<8&&!h;d++)for(var p=r[d],b=0;b<8&&!h;b++){var g=p[b];if(g){var y=g,m=y.type,O=y.color,x=y.square;if(m===v&&O===s){var k="b"===m&&!o[d][b]&&"light"===n(x);o[d][b]=!0,t.push(k),h=!0}}}}catch(Z){u.e(Z)}finally{u.f()}return t}(n,b.board(),(function(e){return b.squareColor(e)}));p.push.apply(p,(0,t.Z)(g)),b.clear()}var y=0,m=n.includes("Q")&&n.includes("N");m&&y++;var O=n.includes("B")&&n.includes("N");O&&y++;var x=n.includes("R");x&&y++;var k,A=[],w=(0,a.Z)(o);try{for(w.s();!(k=w.n()).done;){var j=k.value;A.push.apply(A,(0,t.Z)(j))}}catch(W){w.e(W)}finally{w.f()}for(var M=[],N=!1,R=0,Q=A;R<Q.length;R++){var B=Q[R];B===l?N=!0:B===s&&(M.push(B),N=!1),N&&M.push(B)}var F=function(e){return!(!m||!Z(e,"q"))||(!(!O||!Z(e,"b"))||!(!x||!function(e){for(var r=null,n=null,t=[],o=0;o<8;o++)for(var c=e[o],i=0;i<8&&(!r||!n);i++)if(c[i]){var u=c[i],l=u.type,s=u.color,v=u.square;"k"===l?"w"===s?r=v:n=v:"r"===l&&"w"===s&&t.push(v)}var h=parseInt(r.charAt(1)),d=f.indexOf(r.charAt(0)),p=parseInt(n.charAt(1)),b=f.indexOf(n.charAt(0));if(h===p&&2===Math.abs(d-b)){var g,y=(0,a.Z)(t);try{for(y.s();!(g=y.n()).done;){var m=g.value;if(f.indexOf(m.charAt(0))===b)return!0}}catch(W){y.e(W)}finally{y.f()}}else if(d===b&&2===Math.abs(h-p)){var O,x=(0,a.Z)(t);try{for(x.s();!(O=x.n()).done;){var k=O.value;if(parseInt(k.charAt(1))===p)return!0}}catch(W){x.e(W)}finally{x.f()}}return!1}(e)))},_=function(){var e,r=b.moves().filter((function(e){return!C.test(e)&&!e.includes("x")})),n=0,t=null,o=!1,f=(0,a.Z)(r);try{for(f.s();!(e=f.n()).done;){var c=e.value;b.move(c);var i=b.moves(),u=0;o=!1;var l,s=(0,a.Z)(i);try{for(s.s();!(l=s.n()).done;){var v=l.value;b.move(v);var h=b.moves().filter((function(e){return P.test(e)&&!(e.includes("=Q")||e.includes("=R"))}));if((u=h.length)>0&&y>0){var p,g=(0,a.Z)(h);try{for(g.s();!(p=g.n()).done;){var m=p.value;if(b.move(m),F(b.board())&&(o=!0),b.undo(),o)break}}catch(W){g.e(W)}finally{g.f()}}if(b.undo(),0===u)break}}catch(W){s.e(W)}finally{s.f()}u>0&&(0===y||o)&&(d&&console.log("checkmate at second move",c),n++,t=c,console.log("firstMove:",t)),b.undo()}}catch(W){f.e(W)}finally{f.f()}return d&&console.log(1===n?"Position is problem":"Position is not problem"),1===n?t:null},E=[],J=[],K=null;if(""===l)console.log("Invalid fromSquare");else if(d){console.time();var L=_(),T={fen:d,firstMove:L};self.postMessage(JSON.stringify(T)),console.timeEnd()}else!function e(r,n){var o,u=r.shift().charAt(0),l=u.toLowerCase(),s=/[RNBKQP]/.test(u)?"w":"b",d=n>=i,g="K"===u,y="k"===u,m="b"===l,O=m&&p[n],x=g?M:A,k=(0,a.Z)(x);try{for(k.s();!(o=k.n()).done;){var Z=o.value;if(!I.includes(Z)&&("p"!==l||!Z.includes("8")&&!Z.includes("1"))){var w=b.put({type:l,color:s},Z),j=!1;if(m&&(O&&"dark"===b.squareColor(Z)||!O&&"light"===b.squareColor(Z))&&(j=!0),!j&&d&&(console.assert("b"===s,"Should be black piece"),y?(S(I[0],Z)||b.isAttacked(Z,"w"))&&(j=!0):b.isCheck()&&(j=!0,["q","r","b"].includes(l)&&!S(I[0],Z)&&(j=!1))),j)b.remove(Z);else if(w){var q=!1;if(y&&(K=null,v(E)),I.push(Z),d?J.push({i:parseInt(Z.charAt(1)),j:f.indexOf(Z.charAt(0))}):E.push({i:parseInt(Z.charAt(1)),j:f.indexOf(Z.charAt(0))}),n===i&&(q=c(E)),!q)if(0===r.length){if(!c(J)&&h(J)){var C=b.fen(),P=_();null!==P&&(P===K||P.endsWith("=Q")||P.endsWith("=R")?P=null:(K=P,console.log("------",I,"---",C)));var N={fen:C,firstMove:P};self.postMessage(JSON.stringify(N))}}else e((0,t.Z)(r),n+1);I.pop(),d?J.pop():E.pop(),b.remove(Z)}}}}catch(W){k.e(W)}finally{k.f()}}((0,t.Z)(r.pieces),0)}}},r={};function n(a){var t=r[a];if(void 0!==t)return t.exports;var o=r[a]={exports:{}};return e[a](o,o.exports,n),o.exports}n.m=e,n.x=function(){var e=n.O(void 0,[777],(function(){return n(505)}));return e=n.O(e)},function(){var e=[];n.O=function(r,a,t,o){if(!a){var f=1/0;for(l=0;l<e.length;l++){a=e[l][0],t=e[l][1],o=e[l][2];for(var c=!0,i=0;i<a.length;i++)(!1&o||f>=o)&&Object.keys(n.O).every((function(e){return n.O[e](a[i])}))?a.splice(i--,1):(c=!1,o<f&&(f=o));if(c){e.splice(l--,1);var u=t();void 0!==u&&(r=u)}}return r}o=o||0;for(var l=e.length;l>0&&e[l-1][2]>o;l--)e[l]=e[l-1];e[l]=[a,t,o]}}(),n.d=function(e,r){for(var a in r)n.o(r,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:r[a]})},n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(r,a){return n.f[a](e,r),r}),[]))},n.u=function(e){return"static/js/"+e+".0e9f84b3.chunk.js"},n.miniCssF=function(e){},n.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.p="/chess-problem/",function(){var e={505:1};n.f.i=function(r,a){e[r]||importScripts(n.p+n.u(r))};var r=self.webpackChunkchess_game=self.webpackChunkchess_game||[],a=r.push.bind(r);r.push=function(r){var t=r[0],o=r[1],f=r[2];for(var c in o)n.o(o,c)&&(n.m[c]=o[c]);for(f&&f(n);t.length;)e[t.pop()]=1;a(r)}}(),function(){var e=n.x;n.x=function(){return n.e(777).then(e)}}();n.x()}();
//# sourceMappingURL=505.d2529071.chunk.js.map