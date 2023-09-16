/*
 Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
(function(){function z(b){return CKEDITOR.env.ie?b.$.clientWidth:parseInt(b.getComputedStyle("width"),10)}function t(b,c){var a=b.getComputedStyle("border-"+c+"-width"),l={thin:"0px",medium:"1px",thick:"2px"};0>a.indexOf("px")&&(a=a in l&&"none"!=b.getComputedStyle("border-style")?l[a]:0);return parseFloat(a)}function C(b){var c=[],a={},l="rtl"===b.getComputedStyle("direction"),e=CKEDITOR.tools.array.zip((new CKEDITOR.dom.nodeList(b.$.rows)).toArray(),CKEDITOR.tools.buildTableMap(b));CKEDITOR.tools.array.forEach(e,
function(h){var f=h[0].$;h=h[1];var g=-1,d=0,e=null;f?(d=new CKEDITOR.dom.element(f),e={height:d.$.offsetHeight,position:d.getDocumentPosition()}):e=void 0;for(var f=CKEDITOR.env.ie&&!CKEDITOR.env.edge,n="collapse"===b.getComputedStyle("border-collapse"),d=e.height,e=e.position,m=0;m<h.length;m++){var k=new CKEDITOR.dom.element(h[m]),u=h[m+1]&&new CKEDITOR.dom.element(h[m+1]),p,v,q=k.getDocumentPosition().x,g=g+(k.$.colSpan||1);l?v=q+t(k,"left"):p=q+k.$.offsetWidth-t(k,"right");u?(q=u.getDocumentPosition().x,
l?p=q+u.$.offsetWidth-t(u,"right"):v=q+t(u,"left")):(q=b.getDocumentPosition().x,l?p=q:v=q+b.$.offsetWidth);k=Math.max(v-p,3);f&&n&&(p-=k,k=Math.max(v-p,3));k={table:b,index:g,x:p,y:e.y,width:k,height:d,rtl:l};a[g]=a[g]||[];a[g].push(k);k.alignedPillars=a[g];c.push(k)}});return c}function B(b){(b.data||b).preventDefault()}function E(b){function c(){y=0;d.setOpacity(0);m&&a();var b=f.table;setTimeout(function(){b.removeCustomData("_cke_table_pillars")},0);g.removeListener("dragstart",B)}function a(){for(var d=
f.rtl,l=d?p.length:u.length,a=0,e=0;e<l;e++){var g=u[e],h=p[e],c=f.table;CKEDITOR.tools.setTimeout(function(f,e,g,h,k,m){f&&f.setStyle("width",n(Math.max(e+m,1)));g&&g.setStyle("width",n(Math.max(h-m,1)));k&&c.setStyle("width",n(k+m*(d?-1:1)));++a==l&&b.fire("saveSnapshot")},0,this,[g,g&&z(g),h,h&&z(h),(!g||!h)&&z(c)+t(c,"left")+t(c,"right"),m])}}function l(l){B(l);b.fire("saveSnapshot");l=f.index;for(var a=CKEDITOR.tools.buildTableMap(f.table),c=[],k=[],n=Number.MAX_VALUE,t=n,x=f.rtl,D=0,C=a.length;D<
C;D++){var r=a[D],w=r[l+(x?1:0)],r=r[l+(x?0:1)],w=w&&new CKEDITOR.dom.element(w),r=r&&new CKEDITOR.dom.element(r);w&&r&&w.equals(r)||(w&&(n=Math.min(n,z(w))),r&&(t=Math.min(t,z(r))),c.push(w),k.push(r))}u=c;p=k;v=f.x-n;q=f.x+t;d.setOpacity(.5);A=parseInt(d.getStyle("left"),10);m=0;y=1;d.on("mousemove",h);g.on("dragstart",B);g.on("mouseup",e,this)}function e(b){b.removeListener();c()}function h(b){k(b.data.getPageOffset().x)}var f,g,d,y,A,m,k,u,p,v,q;g=b.document;d=CKEDITOR.dom.element.createFromHtml('\x3cdiv data-cke-temp\x3d1 contenteditable\x3dfalse unselectable\x3don style\x3d"position:absolute;cursor:col-resize;filter:alpha(opacity\x3d0);opacity:0;padding:0;background-color:#004;background-image:none;border:0px none;z-index:10000"\x3e\x3c/div\x3e',
g);b.on("destroy",function(){d.remove()});x||g.getDocumentElement().append(d);this.attachTo=function(b){var a,e,c;y||(x&&(g.getBody().append(d),m=0),f=b,a=f.alignedPillars[0],e=f.alignedPillars[f.alignedPillars.length-1],c=a.y,a=e.height+e.y-a.y,d.setStyles({width:n(b.width),height:n(a),left:n(b.x),top:n(c)}),x&&d.setOpacity(.25),d.on("mousedown",l,this),g.getBody().setStyle("cursor","col-resize"),d.show())};k=this.move=function(b,a){if(!f)return 0;if(!(y||b>=f.x&&b<=f.x+f.width&&a>=f.y&&a<=f.y+f.height))return f=
null,y=m=0,g.removeListener("mouseup",e),d.removeListener("mousedown",l),d.removeListener("mousemove",h),g.getBody().setStyle("cursor","auto"),x?d.remove():d.hide(),0;var c=b-Math.round(d.$.offsetWidth/2);if(y){if(c==v||c==q)return 1;c=Math.max(c,v);c=Math.min(c,q);m=c-A}d.setStyle("left",n(c));return 1}}function A(b){var c=b.data.getTarget();if("mouseout"==b.name){if(!c.is("table"))return;for(var a=new CKEDITOR.dom.element(b.data.$.relatedTarget||b.data.$.toElement);a&&a.$&&!a.equals(c)&&!a.is("body");)a=
a.getParent();if(!a||a.equals(c))return}c.getAscendant("table",1).removeCustomData("_cke_table_pillars");b.removeListener()}var n=CKEDITOR.tools.cssLength,x=CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks);CKEDITOR.plugins.add("tableresize",{requires:"tabletools",init:function(b){b.on("contentDom",function(){var c,a=b.editable();a.attachListener(a.isInline()?a:b.document,"mousemove",function(a){a=a.data;var e=a.getTarget();if(e.type==CKEDITOR.NODE_ELEMENT){var h=a.getPageOffset().x,
f=a.getPageOffset().y;if(c&&c.move(h,f))B(a);else if(e.is("table")||e.getAscendant({thead:1,tbody:1,tfoot:1},1))if(a=e.getAscendant("table",1),b.editable().contains(a)){(e=a.getCustomData("_cke_table_pillars"))||(a.setCustomData("_cke_table_pillars",e=C(a)),a.on("mouseout",A),a.on("mousedown",A));a:{a=e;for(var e=0,g=a.length;e<g;e++){var d=a[e];if(h>=d.x&&h<=d.x+d.width&&f>=d.y&&f<=d.y+d.height){h=d;break a}}h=null}h&&(!c&&(c=new E(b)),c.attachTo(h))}}})})}})})();