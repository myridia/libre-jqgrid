!function(r){"use strict";"function"==typeof define&&define.amd?define(["jquery","./jquery.fmatter","./grid.grouping"],r):"object"==typeof module&&module.exports?module.exports=function(e,t){return e||(e=window),void 0===t&&(t="undefined"!=typeof window?require("jquery"):require("jquery")(e)),require("./jquery.fmatter"),require("./grid.grouping"),r(t),t}:r(jQuery)}(function(se){"use strict";var ue=se.jgrid;function le(e,t,r){if(!(this instanceof le))return new le(e);this.aggregator=e,this.finilized=!1,this.context=t,this.pivotOptions=r}function ge(e,t,r,o,i){var n,a,s=o.length,u=this,l=function(e,t){var r=e,o=t;if(null==r&&(r=""),null==o&&(o=""),r=String(r),o=String(o),this.caseSensitive||(r=r.toUpperCase(),o=o.toUpperCase()),r===o){if(e===t)return 0;if(void 0===e)return-1;if(void 0===t)return 1;if(null===e)return-1;if(null===t)return 1}return r<o?-1:1},g=function(e,t){return(e=Number(e))===(t=Number(t))?0:e<t?-1:1},f=function(e,t){return(e=Math.floor(Number(e)))===(t=Math.floor(Number(t)))?0:e<t?-1:1};for(u.items=[],u.indexesOfSourceData=[],u.trimByCollect=e,u.caseSensitive=t,u.skipSort=r,u.fieldLength=s,u.fieldNames=new Array(s),u.fieldSortDirection=new Array(s),u.fieldCompare=new Array(s),n=0;n<s;n++){switch(a=o[n],u.fieldNames[n]=a[i||"dataName"],a.sorttype){case"integer":case"int":u.fieldCompare[n]=f;break;case"number":case"currency":case"float":u.fieldCompare[n]=g;break;default:u.fieldCompare[n]=se.jgrid.isFunction(a.compare)?a.compare:l}u.fieldSortDirection[n]="desc"===a.sortorder?-1:1}}le.prototype.calc=function(e,t,r,o,i){var n=this;if(void 0!==e)switch(n.result=n.result||0,e=parseFloat(e),n.aggregator){case"sum":n.result+=e;break;case"count":n.result++;break;case"avg":n.finilized?(n.count=n.count||0,n.result=(n.result*n.count+e)/(n.count+1)):(n.result+=e,n.count=n.count||0),n.count++;break;case"min":n.result=Math.min(n.result,e);break;case"max":n.result=Math.max(n.result,e);break;default:se.jgrid.isFunction(n.aggregator)&&(n.result=n.aggregator.call(n.context,{previousResult:n.result,value:e,fieldName:t,item:r,iItem:o,items:i}))}},le.prototype.getResult=function(e,t,r){var o=this;(void 0!==o.result||r)&&(r&&void 0!==o.result&&(o.result=0,o.count=0),void 0===o.result||o.finilized||"avg"!==o.aggregator||(o.result=o.result/o.count,o.finilized=!0),e[t]=o.result)},ge.prototype.compareVectorsEx=function(e,t){var r,o,i=this.fieldLength;for(r=0;r<i;r++)if(0!==(o=this.fieldCompare[r](e[r],t[r])))return{index:r,result:o};return{index:-1,result:0}},ge.prototype.getIndexOfDifferences=function(e,t){return null===t||null===e?0:this.compareVectorsEx(e,t).index},ge.prototype.compareVectors=function(e,t){var r=this.compareVectorsEx(e,t);return 0<(0<=r.index?this.fieldSortDirection[r.index]:1)?r.result:-r.result},ge.prototype.getItem=function(e){return this.items[e]},ge.prototype.getIndexLength=function(){return this.items.length},ge.prototype.getIndexesOfSourceData=function(e){return this.indexesOfSourceData[e]},ge.prototype.createDataIndex=function(e){var t,r,o,i,n,a,s,u,l,g=this,f=e.length,p=g.fieldLength,c=g.fieldNames,d=g.indexesOfSourceData,m=g.items;for(t=0;t<f;t++){for(s=e[t],r=new Array(p),i=0;i<p;i++)void 0!==(o=s[c[i]])&&("string"==typeof o&&g.trimByCollect&&(o=se.jgrid.trim(o)),r[i]=o);if(u=0,(l=m.length-1)<0)m.push(r),d.push([t]);else if(0!==(n=g.compareVectors(r,m[l])))if(1===n||g.skipSort)m.push(r),d.push([t]);else if(1!==(n=g.compareVectors(m[0],r)))if(0!==n)for(;;){if(l-u<2){m.splice(l,0,r),d.splice(l,0,[t]);break}if(a=Math.floor((u+l)/2),0===(n=g.compareVectors(m[a],r))){d[a].push(t);break}1===n?l=a:u=a}else d[0].push(t);else m.unshift(r),d.unshift([t]);else d[l].push(t)}},ue.extend({pivotSetup:function(g,r){var e,t,o,i,s,n,a,u,l,f,p,c,d,m,y,h,x,v,w,b,S,I,O,C,j,D,A,T,k,F=this[0],N=Array.isArray,R={},H={groupField:[],groupSummary:[],groupSummaryPos:[]},V={grouping:!0,groupingView:H},Y=se.extend({totals:!1,useColSpanStyle:!1,trimByCollect:!0,skipSortByX:!1,skipSortByY:!1,caseSensitive:!1,footerTotals:!1,groupSummary:!0,groupSummaryPos:"header",frozenStaticCols:!1,defaultFormatting:!0,data:g},r||{}),B=g.length,q=Y.xDimension,P=Y.yDimension,L=Y.aggregates,z=Y.totalText||Y.totals||Y.rowTotals||Y.totalHeader,M=N(q)?q.length:0,X=N(P)?P.length:0,E=N(L)?L.length:0,G=X-(1===E?1:0),U=[],Q=[],J=[],K=[],W=["pivotInfos"],Z=new Array(E),$=new Array(X),_=function(e,t,r){var o=new ge(Y.trimByCollect,Y.caseSensitive,t,e);return se.jgrid.isFunction(r)&&(o.compareVectorsEx=r),o.createDataIndex(g),o},ee=function(e,t,r,o,i){var n,a,s;switch(e){case 1:n=P[o].totalText||"{0} {1} {2}",a="y"+i+"t"+o;break;case 2:n=Y.totalText||"{0}",a="t";break;default:n=1<E?t.label||"{0}":se.jgrid.isFunction(P[o].label)?P[o].label:T.getItem(i)[o],a="y"+i}return delete(s=se.extend({},t,{name:a+(1<E?"a"+r:""),label:se.jgrid.isFunction(n)?n.call(F,2===e?{aggregate:t,iAggregate:r,pivotOptions:Y}:1===e?{yIndex:T.getItem(i),aggregate:t,iAggregate:r,yLevel:o,pivotOptions:Y}:{yData:T.getItem(i)[o],yIndex:T.getItem(i),yLevel:o,pivotOptions:Y}):ue.template.apply(F,2===e?[String(n),t.aggregator,t.member,r]:[String(n),t.aggregator,t.member,T.getItem(i)[o],o])})).member,delete s.aggregator,s},te=function(e,t,r){var o,i;for(o=0;o<E;o++)void 0===(i=L[o]).template&&void 0===i.formatter&&Y.defaultFormatting&&(i.template="count"===i.aggregator?"integer":"number"),J.push(ee(e,i,o,t,r))},re=function(e,t,r){var o,i,n,a;for(o=G-1;t<=o;o--)if(Q[o]){for(i=0;i<=o;i++)(j=U[i].groupHeaders)[j.length-1].numberOfColumns+=E;for(n=(s=P[o]).totalHeader,a=s.headerOnTop,i=o+1;i<=G-1;i++)U[i].groupHeaders.push({titleText:a&&i===o+1||!a&&i===G-1?se.jgrid.isFunction(n)?n.call(F,r,o):ue.template.call(F,String(n||""),r[o],o):"",startColumnName:"y"+(e-1)+"t"+o+(1===E?"":"a0"),numberOfColumns:E})}},oe=function(e){var t=new le("count"===L[e].aggregator?"sum":L[e].aggregator,F,r);return t.groupInfo={iRows:[],rows:[],ys:[],iYs:[]},t},ie=function(){var e,t;for(e=G-1;0<=e;e--)if(Q[e])for(null==$[e]&&($[e]=new Array(E)),t=0;t<E;t++)$[e][t]=oe(t)},ne=function(e,t,r,o){var i,n,a,s=T.getIndexOfDifferences(t,r);if(null!==r)for(s=Math.max(s,0),i=G-1;s<=i;i--)n="y"+e+"t"+i+(1<E?"a"+o:""),Q[i]&&void 0===O[n]&&((a=$[i][o]).getResult(O,n),O.pivotInfos[n]={colType:1,iA:o,a:L[o],level:i,iRows:a.groupInfo.iRows,rows:a.groupInfo.rows,ys:a.groupInfo.ys,iYs:a.groupInfo.iYs},t!==r&&($[i][o]=oe(o)))},ae=function(e,t,r,o,i,n,a){var s,u,l;if(e!==t)for(s=G-1;0<=s;s--)Q[s]&&((u=$[s][o]).calc(i[r.member],r.member,i,n,g),l=u.groupInfo,se.inArray(a,l.iYs)<0&&(l.iYs.push(a),l.ys.push(e)),se.inArray(n,l.iRows)<0&&(l.iRows.push(n),l.rows.push(i)))};if(0===M||0===E)throw"xDimension or aggregates options are not set!";for(A=_(q,Y.skipSortByX,Y.compareVectorsByX),T=_(P,Y.skipSortByY,Y.compareVectorsByY),r.xIndex=A,r.yIndex=T,t=0;t<M;t++)n={name:"x"+t,label:null!=(i=q[t]).label?se.jgrid.isFunction(i.label)?i.label.call(F,i,t,Y):i.label:i.dataName,frozen:Y.frozenStaticCols},t<M-1&&!i.skipGrouping&&!i.additionalProperty&&(H.groupField.push(n.name),H.groupSummary.push(Y.groupSummary),H.groupSummaryPos.push(Y.groupSummaryPos)),delete(n=se.extend(n,i)).dataName,delete n.footerText,i.additionalProperty?W.push(n.name):(J.push(n),V.sortname=n.name);for(M<2&&(V.grouping=!1),H.hideFirstGroupCol=!0,t=0;t<X;t++)s=P[t],Q.push(!!(s.totals||s.rowTotals||s.totalText||s.totalHeader));for(C=T.getItem(0),te(0,X-1,0),k=T.getIndexLength(),v=1;v<k;v++){for(w=T.getItem(v),t=T.getIndexOfDifferences(w,C),o=G-1;t<=o;o--)Q[o]&&te(1,o,v-1);C=w,te(0,X-1,v)}for(t=G-1;0<=t;t--)Q[t]&&te(1,t,k-1);for(z&&te(2),C=T.getItem(0),o=0;o<G;o++)U.push({useColSpanStyle:Y.useColSpanStyle,groupHeaders:[{titleText:se.jgrid.isFunction(P[o].label)?P[o].label.call(F,{yData:C[o],yIndex:C,yLevel:o,pivotOptions:Y}):C[o],startColumnName:1===E?"y0":"y0a0",numberOfColumns:E}]});for(v=1;v<k;v++){for(w=T.getItem(v),re(v,t=T.getIndexOfDifferences(w,C),C),o=G-1;t<=o;o--)U[o].groupHeaders.push({titleText:se.jgrid.isFunction(P[o].label)?P[o].label.call(F,{yData:w[o],yIndex:w,yLevel:o,pivotOptions:Y}):w[o],startColumnName:"y"+v+(1===E?"":"a0"),numberOfColumns:E});for(o=0;o<t;o++)(j=U[o].groupHeaders)[j.length-1].numberOfColumns+=E;C=w}if(re(k,0,C),z)for(t=0;t<G;t++)U[t].groupHeaders.push({titleText:t<G-1?"":Y.totalHeader||"",startColumnName:"t"+(1===E?"":"a0"),numberOfColumns:E});for(h=A.getIndexLength(),l=0;l<h;l++){for(f=A.getItem(l),O={pivotInfos:p={iX:l,x:f}},t=0;t<M;t++)O["x"+t]=f[t];if(x=A.getIndexesOfSourceData(l),z)for(o=0;o<E;o++)Z[o]=oe(o);for(C=null,ie(),v=0;v<k;v++){for(w=T.getItem(v),b=T.getIndexesOfSourceData(v),o=0;o<E;o++){for(null!==C&&ne(v-1,w,C,o),S=[],t=0;t<b.length;t++)D=b[t],0<=se.inArray(D,x)&&S.push(D);if(0<S.length){for(c=new Array(S.length),d=new le((I=L[o]).aggregator,F,r),a=0;a<S.length;a++)t=S[a],e=g[t],c[a]=e,d.calc(e[I.member],I.member,e,t,g),z&&((m=Z[o]).calc(e[I.member],I.member,e,t,g),y=m.groupInfo,se.inArray(t,y.iYs)<0&&(y.iYs.push(v),y.ys.push(w)),se.inArray(t,y.iRows)<0&&(y.iRows.push(t),y.rows.push(e))),ae(w,C,I,o,e,t,v);u="y"+v+(1===E?"":"a"+o),d.getResult(O,u),p[u]={colType:0,iY:v,y:w,iA:o,a:I,iRows:S,rows:c}}}C=w}if(null!==C)for(o=0;o<E;o++)ne(k-1,C,C,o);if(z)for(o=0;o<E;o++)u="t"+(1===E?"":"a"+o),(m=Z[o]).getResult(O,u),y=m.groupInfo,p[u]={colType:2,iA:o,a:L[o],iRows:y.iRows,rows:y.rows,iYs:y.iYs,ys:y.ys};K.push(O)}if(Y.footerTotals||Y.colTotals){for(B=K.length,t=0;t<M;t++)R["x"+t]=q[t].footerText||"";for(t=M;t<J.length;t++){for(u=J[t].name,d=new le(Y.footerAggregator||"sum",F,r),a=0;a<B;a++)O=K[a],d.calc(O[u],u,O,a,K);d.getResult(R,u)}}return r.colHeaders=U,{colModel:J,additionalProperties:W,options:r,rows:K,groupOptions:V,groupHeaders:U,summary:R}},jqPivot:function(l,g,f,r){return this.each(function(){var a=this,s=se(a),u=se.fn.jqGrid;function t(){var e,t=u.pivotSetup.call(s,l,g),r=t.groupHeaders,o=0<function(e){var t,r=0;for(t in e)e.hasOwnProperty(t)&&r++;return r}(t.summary),i=t.groupOptions.groupingView,n=ue.from.call(a,t.rows);if(!g.skipSortByX)for(e=0;e<i.groupField.length;e++)n.orderBy(i.groupField[e],null!=f&&f.groupingView&&null!=f.groupingView.groupOrder&&"desc"===f.groupingView.groupOrder[e]?"d":"a","text","");if(g.data=l,u.call(s,se.extend(!0,{datastr:se.extend(n.select(),o?{userdata:t.summary}:{}),datatype:"jsonstring",footerrow:o,userDataOnFooter:o,colModel:t.colModel,additionalProperties:t.additionalProperties,pivotOptions:t.options,viewrecords:!0,sortname:g.xDimension[0].dataName},t.groupOptions,f||{})),r.length)for(e=0;e<r.length;e++)r[e]&&r[e].groupHeaders.length&&u.setGroupHeaders.call(s,r[e]);g.frozenStaticCols&&u.setFrozenColumns.call(s)}"string"==typeof l?se.ajax(se.extend({url:l,dataType:"json",success:function(e){l=ue.getAccessor(e,r&&r.reader?r.reader:"rows"),t()}},r||{})):t()})}})});
//# sourceMappingURL=grid.pivot.js.map