!function(){"use strict";var e={505:function(e,r,n){for(var t=n(762),a=n(62),o=[["a8","b8","c8","d8","e8","f8","g8","h8"],["a7","b7","c7","d7","e7","f7","g7","h7"],["a6","b6","c6","d6","e6","f6","g6","h6"],["a5","b5","c5","d5","e5","f5","g5","h5"],["a4","b4","c4","d4","e4","f4","g4","h4"],["a3","b3","c3","d3","e3","f3","g3","h3"],["a2","b2","c2","d2","e2","f2","g2","h2"],["a1","b1","c1","d1","e1","f1","g1","h1"]],f="abcdefgh",i=function(e){for(var r=e.map((function(e){return e.i})).sort(),n=0;n<r.length-1;n++)if(r[n+1]-r[n]>1)return!0;r=e.map((function(e){return e.j})).sort();for(var t=0;t<r.length-1;t++)if(r[t+1]-r[t]>1)return!0;return!1},c=9,u=-1,s=9,l=-1,h=function(e){c=9,u=-1,s=9,l=-1;var r,n=(0,t.Z)(e);try{for(n.s();!(r=n.n()).done;){var a=r.value,o=a.i,f=a.j;o<c&&(c=o),o>u&&(u=o),f<s&&(s=f),f>l&&(l=f)}}catch(i){n.e(i)}finally{n.f()}},v=function(e){var r,n=(0,t.Z)(e);try{for(n.s();!(r=n.n()).done;){var a=r.value,o=a.i,f=a.j;if(o>=c&&o<=u&&f>=s&&f<=l)return!0}}catch(i){n.e(i)}finally{n.f()}return!1},d=function(e,r){var n=Math.max.apply(Math,(0,a.Z)(e.map((function(e){return e.i})))),t=Math.min.apply(Math,(0,a.Z)(r.map((function(e){return e.i}))));if(Math.abs(n-t)>1)return!0;var o=Math.max.apply(Math,(0,a.Z)(e.map((function(e){return e.j})))),f=Math.min.apply(Math,(0,a.Z)(r.map((function(e){return e.j}))));return Math.abs(o-f)>1},p=[["a1","b2","c3","d4","e5","f6","g7","h8"],["a2","b3","c4","d5","e6","f7","g8"],["a3","b4","c5","d6","e7","f8"],["a4","b5","c6","d7","e8"],["a5","b6","c7","d8"],["a6","b7","c8"],["a7","b8"],["b1","c2","d3","e4","f5","g6","h7"],["c1","d2","e3","f4","g5","h6"],["d1","e2","f3","g4","h5"],["e1","f2","g3","h4"],["f1","g2","h3"],["g1","h2"]],g=[["h1","g2","f3","e4","d5","c6","b7","a8"],["h2","g3","f4","e5","d6","c7","b8"],["h3","g4","f5","e6","d7","c8"],["h4","g5","f6","e7","d8"],["h5","g6","f7","e8"],["h6","g7","f8"],["h7","g8"],["g1","f2","e3","d4","c5","b6","a7"],["f1","e2","d3","c4","b5","a6"],["e1","d2","c3","b4","a5"],["d1","c2","b3","a4"],["c1","b2","a3"],["b1","a2"]],b={},y=0,m=["1","2","3","4","5","6","7","8"];y<m.length;y++)for(var M=m[y],O=function(){var e=k[Z]+M;b[e]=[];var r,n=(0,t.Z)(p);try{for(n.s();!(r=n.n()).done;){var o,f=r.value;f.includes(e)&&(o=b[e]).push.apply(o,(0,a.Z)(f.filter((function(r){return r!==e}))))}}catch(l){n.e(l)}finally{n.f()}var i,c=(0,t.Z)(g);try{for(c.s();!(i=c.n()).done;){var u,s=i.value;s.includes(e)&&(u=b[e]).push.apply(u,(0,a.Z)(s.filter((function(r){return r!==e}))))}}catch(l){c.e(l)}finally{c.f()}},Z=0,k=["a","b","c","d","e","f","g","h"];Z<k.length;Z++)O();var x=function(e,r){for(var n=null,t=null,a=0;a<8&&(!n||!t);a++)for(var o=e[a],i=0;i<8&&(!n||!t);i++)if(o[i]){var c=o[i],u=c.type,s=c.color,l=c.square;u===r&&"w"===s?n=l:"n"===u&&"w"===s&&(t=l)}if(!t||!n)return!1;var h,v=parseInt(n.charAt(1)),d=f.indexOf(n.charAt(0)),p=parseInt(t.charAt(1)),g=f.indexOf(t.charAt(0)),y=d===g&&(2===Math.abs(v-p)||4===Math.abs(v-p))||v===p&&(2===Math.abs(d-g)||4===Math.abs(d-g));return y||(h=t,y=b[n].includes(h)),y},j=n(984).Chess,w=new RegExp("[#+]$"),S=new RegExp("#$"),A=[];self.onmessage=function(e){var r=JSON.parse(e.data),n=r.pieces,c=r.lookingForFen,u=r.fromSquare,s=r.toSquare,l=r.nSquares,p=r.testFen,g=[],b=new j(p||c);if(!p){var y=function(e,r,n){for(var a=[],o=[],f=0;f<8;f++){o[f]=[];for(var i=0;i<8;i++)o[f][i]=!1}var c,u=(0,t.Z)(e);try{for(u.s();!(c=u.n()).done;)for(var s=c.value,l=["K","Q","R","B","N","P"].includes(s)?"w":"b",h=s.toLowerCase(),v=!1,d=0;d<8&&!v;d++)for(var p=r[d],g=0;g<8&&!v;g++){var b=p[g];if(b){var y=b,m=y.type,M=y.color,O=y.square;if(m===h&&M===l){var Z="b"===m&&!o[d][g]&&"light"===n(O);o[d][g]=!0,a.push(Z),v=!0}}}}catch(k){u.e(k)}finally{u.f()}return a}(n,b.board(),(function(e){return b.squareColor(e)}));g.push.apply(g,(0,a.Z)(y)),b.clear()}var m=0,M=n.includes("Q")&&n.includes("N");M&&m++;var O=n.includes("B")&&n.includes("N");O&&m++;for(var Z=0,k=0;k<o.length&&-1===(Z=o[k].indexOf(u));k++);for(var q=Z+l,C=[],P=0;P<l-k;P++)C.push.apply(C,(0,a.Z)(o[k+P].slice(Z,q)));var N,R=[],W=!1,I=(0,t.Z)(o);try{for(I.s();!(N=I.n()).done;){var Q,F=N.value,_=(0,t.Z)(F);try{for(_.s();!(Q=_.n()).done;){var B=Q.value;B===u?W=!0:B===s&&(R.push(B),W=!1),W&&R.push(B)}}catch(G){_.e(G)}finally{_.f()}}}catch(G){I.e(G)}finally{I.f()}var E=function(e){return!(!M||!x(e,"q"))||!(!O||!x(e,"b"))},J=r.pieces.indexOf("k"),K=function(){var e,r=b.moves().filter((function(e){return!w.test(e)&&!e.includes("x")})),n=0,a=null,o=!1,f=(0,t.Z)(r);try{for(f.s();!(e=f.n()).done;){var i=e.value;b.move(i);var c=b.moves(),u=0;o=!1;var s,l=(0,t.Z)(c);try{for(l.s();!(s=l.n()).done;){var h=s.value;b.move(h);var v=b.moves().filter((function(e){return S.test(e)&&!(e.includes("=Q")||e.includes("=R"))}));if((u=v.length)>0&&m>0){var d,g=(0,t.Z)(v);try{for(g.s();!(d=g.n()).done;){var y=d.value;if(b.move(y),E(b.board())&&(o=!0,console.log("black:",h," white2:",y)),b.undo(),o)break}}catch(G){g.e(G)}finally{g.f()}}if(b.undo(),0===u)break}}catch(G){l.e(G)}finally{l.f()}u>0&&(0===m||o)&&(p&&console.log("checkmate at second move",i),n++,a=i,console.log("firstMove:",a)),b.undo()}}catch(G){f.e(G)}finally{f.f()}return p&&console.log(1===n?"Position is problem":"Position is not problem"),1===n?a:null},L=[],T=[],$=null;if(""===u)console.log("Invalid fromSquare");else if(p){console.time();var z=K(),D={fen:p,firstMove:z};self.postMessage(JSON.stringify(D)),console.timeEnd()}else!function e(r,n){var o,c=r.shift().charAt(0),u=c.toLowerCase(),s=/[RNBKQP]/.test(c)?"w":"b",l="K"===c,p="k"===c,y="b"===u,m=y&&g[n],M=(0,t.Z)(l?R:C);try{for(M.s();!(o=M.n()).done;){var O=o.value;if(!A.includes(O)&&("p"!==u||!O.includes("8")&&!O.includes("1"))){var Z=b.put({type:u,color:s},O);if(b.isCheck()||p&&(b.isAttacked(O,"w")||O.endsWith("1")||O.endsWith("8")||O.startsWith("a")||O.startsWith("h")||"b"===s&&b.isAttacked(A[0],"b"))||y&&(m&&"dark"===b.squareColor(O)||!m&&"light"===b.squareColor(O)))b.remove(O);else if(Z){var k=!1,x=!1,j=!1;if(p&&($=null,h(L)),A.push(O),n<J?L.push({i:parseInt(O.charAt(1)),j:f.indexOf(O.charAt(0))}):T.push({i:parseInt(O.charAt(1)),j:f.indexOf(O.charAt(0))}),n>0&&n<J?k=i(L):n>=J&&(T.length>1&&(x=i(T)),x||(x=d(L,T)),n===J&&(j=b.isAttacked(O,"w"))),!k&&!x&&!j)if(0===r.length){var w=b.fen();if(console.log(w),v(T)){var S=b.fen(),q=K();null!==q&&(q===$||q.endsWith("=Q")||q.endsWith("=R")?q=null:($=q,console.log("------",A,"---",S)));var P={fen:S,firstMove:q};self.postMessage(JSON.stringify(P))}}else e((0,a.Z)(r),n+1);A.pop(),n<J?L.pop():T.pop(),b.remove(O)}}}}catch(G){M.e(G)}finally{M.f()}}((0,a.Z)(r.pieces),0)}}},r={};function n(t){var a=r[t];if(void 0!==a)return a.exports;var o=r[t]={exports:{}};return e[t](o,o.exports,n),o.exports}n.m=e,n.x=function(){var e=n.O(void 0,[777],(function(){return n(505)}));return e=n.O(e)},function(){var e=[];n.O=function(r,t,a,o){if(!t){var f=1/0;for(s=0;s<e.length;s++){t=e[s][0],a=e[s][1],o=e[s][2];for(var i=!0,c=0;c<t.length;c++)(!1&o||f>=o)&&Object.keys(n.O).every((function(e){return n.O[e](t[c])}))?t.splice(c--,1):(i=!1,o<f&&(f=o));if(i){e.splice(s--,1);var u=a();void 0!==u&&(r=u)}}return r}o=o||0;for(var s=e.length;s>0&&e[s-1][2]>o;s--)e[s]=e[s-1];e[s]=[t,a,o]}}(),n.d=function(e,r){for(var t in r)n.o(r,t)&&!n.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(r,t){return n.f[t](e,r),r}),[]))},n.u=function(e){return"static/js/"+e+".0e9f84b3.chunk.js"},n.miniCssF=function(e){},n.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.p="/chess-problem/",function(){var e={505:1};n.f.i=function(r,t){e[r]||importScripts(n.p+n.u(r))};var r=self.webpackChunkchess_game=self.webpackChunkchess_game||[],t=r.push.bind(r);r.push=function(r){var a=r[0],o=r[1],f=r[2];for(var i in o)n.o(o,i)&&(n.m[i]=o[i]);for(f&&f(n);a.length;)e[a.pop()]=1;t(r)}}(),function(){var e=n.x;n.x=function(){return n.e(777).then(e)}}();n.x()}();
//# sourceMappingURL=505.c696d445.chunk.js.map