!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery","./grid.base","./jquery.fmatter","./grid.common"],t):"object"==typeof module&&module.exports?module.exports=function(e,l){return e||(e=window),void 0===l&&(l="undefined"!=typeof window?require("jquery"):require("jquery")(e)),require("./grid.base"),require("./jquery.fmatter"),require("./grid.common"),t(l),l}:t(jQuery)}(function(D){"use strict";var F=D.jgrid,M=function(){var e=D.makeArray(arguments);return e.unshift(""),e.unshift(""),e.unshift(this.p),F.feedback.apply(this,e)},N=function(e,l){var t=this.grid.fbRows;return null!=(e=null!=t&&t[0].cells.length>l?t[e.rowIndex]:e)&&null!=e.cells?D(e.cells[l]):D()};F.extend({editCell:function(I,R,S){return this.each(function(){var e,l,t,i,r=this,a=D(r),d=r.p,n=r.rows;if(r.grid&&!0===d.cellEdit&&null!=n&&null!=n[I]&&(I=parseInt(I,10),R=parseInt(R,10),!isNaN(I)&&!isNaN(R))){var o,s=n[I],c=null!=s?s.id:null,u=D(s),f=parseInt(d.iCol,10),h=parseInt(d.iRow,10),p=D(n[h]),v=d.savedRow;if(null!=c){if(d.selrow=c,d.knv||a.jqGrid("GridNav"),0<v.length&&0<p.length){if(!0===S&&I===h&&R===f)return;a.jqGrid("saveCell",v[0].id,v[0].ic)}else setTimeout(function(){D("#"+F.jqID(d.knv)).attr("tabindex","-1").focus()},1);if("subgrid"!==(e=(i=d.colModel[R]).name)&&"cb"!==e&&"rn"!==e){t=N.call(r,s,R);var m=i.editable,C="cell";D.jgrid.isFunction(m)&&(m=m.call(r,{rowid:c,iCol:R,iRow:I,cmName:e,cm:i,mode:C}));var g,j,b,w=a.jqGrid("getGuiStyles","states.select","edit-cell"),q=a.jqGrid("getGuiStyles","states.hover","selected-row");if(!0!==m||!0!==S||t.hasClass("not-editable-cell"))d.noCellSelection||(0<=f&&0<=h&&(N.call(r,p[0],f).removeClass(w),p.removeClass(q)),t.addClass(w),u.addClass(q)),l=t.html().replace(/&#160;/gi,""),M.call(r,"onSelectCell",c,e,l,I,R);else{d.noCellSelection||(0<=f&&0<=h&&(N.call(r,p[0],f).removeClass(w),p.removeClass(q)),t.addClass(w),u.addClass(q)),i.edittype||(i.edittype="text"),o=i.edittype;try{l=D.unformat.call(r,t,{rowId:c,colModel:i},R)}catch(e){l="textarea"===o?t.text():t.html()}if(d.autoEncodeOnEdit&&(l=F.oldDecodePostedData(l)),("&nbsp;"===l||"&#160;"===l||1===l.length&&160===l.charCodeAt(0))&&(l=""),D.jgrid.isFunction(d.formatCell)){var G=d.formatCell.call(r,c,e,l,I,R);void 0!==G&&(l=G)}M.call(r,"beforeEditCell",c,e,l,I,R),v.push({id:I,ic:R,name:e,v:l}),d.editingInfo[c]={mode:"cellEditing",savedRow:v[v.length-1],editable:{}},d.editingInfo[c].editable[e]=m;var y=D.extend({},i.editoptions||{},{id:I+"_"+e,name:e,rowId:c,mode:C,cm:i,iCol:R}),x=F.createEl.call(r,o,y,l,!0,D.extend({},F.ajaxOptions,d.ajaxSelectOptions||{})),k=t,E=!0===d.treeGrid&&e===d.ExpandColumn;E&&(k=t.children("span.cell-wrapperleaf,span.cell-wrapper")),k.html("").append(x).attr("tabindex","0"),E&&D(x).width(t.width()-t.children("div.tree-wrap").outerWidth()),F.bindEv.call(r,x,y),d.frozenColumns&&R<a.jqGrid("getNumberOfFrozenColumns")&&(g=D(r.rows[s.rowIndex].cells[R]),j=t.height(),b=g.height(),1<=Math.abs(b-j)&&0<j&&(g.height(j),b=g.height(),1<=Math.abs(j-b)&&g.height(j+Math.round(j-b)))),setTimeout(function(){D(x).focus()},0),D("input, select, textarea",t).on("keydown",function(e){if(27===e.keyCode&&(0<D("input.hasDatepicker",t).length?D(".ui-datepicker").is(":hidden")?a.jqGrid("restoreCell",I,R):D("input.hasDatepicker",t).datepicker("hide"):a.jqGrid("restoreCell",I,R)),13===e.keyCode&&!e.shiftKey)return a.jqGrid("saveCell",I,R),!1;if(9===e.keyCode){if(r.grid.hDiv.loading)return!1;e.shiftKey?a.jqGrid("prevCell",I,R):a.jqGrid("nextCell",I,R)}e.stopPropagation()}),M.call(r,"afterEditCell",c,e,l,I,R)}d.iCol=R,d.iRow=I}}}})},saveCell:function(E,I){return this.each(function(){var i=this,r=D(i),a=i.p,t=i.grid,d=F.info_dialog,e=F.jqID;if(t&&!0===a.cellEdit){var l=r.jqGrid("getGridRes","errors"),n=l.errcap,o=r.jqGrid("getGridRes","edit").bClose,s=a.savedRow,c=1<=s.length?0:null;if(null!==c){var u,f=i.rows[E],h=null!=f?f.id:null,p=null!=f?D(f):D(),v=a.colModel[I],m=v.name,C=N.call(i,f,I),g={},j=F.getEditedValue.call(i,C,v,g);if(j!==s[c].v){void 0!==(u=r.triggerHandler("jqGridBeforeSaveCell",[h,m,j,E,I]))&&(j=u),D.jgrid.isFunction(a.beforeSaveCell)&&void 0!==(u=a.beforeSaveCell.call(i,h,m,j,E,I))&&(j=u);var b=F.checkValues.call(i,j,I,void 0,void 0,{oldValue:s[c].v,newValue:j,cmName:m,rowid:h,iCol:I,iRow:E,cm:v,tr:f,td:C,mode:"cell"}),w=v.formatoptions||{};if(null==b||!0===b||!0===b[0]){var q=r.triggerHandler("jqGridBeforeSubmitCell",[h,m,j,E,I])||{};if(D.jgrid.isFunction(a.beforeSubmitCell)&&((q=a.beforeSubmitCell.call(i,h,m,j,E,I))||(q={})),0<D("input.hasDatepicker",C).length&&D("input.hasDatepicker",C).datepicker("hide"),"date"===v.formatter&&!0!==w.sendFormatted&&(j=D.unformat.date.call(i,j,v)),"remote"===a.cellsubmit)if(a.cellurl){var G={};G[m]=j;var y=a.prmNames,x=y.id,k=y.oper;G[x]=F.stripPref(a.idPrefix,h),G[k]=y.editoper,G=D.extend(q,G),a.autoEncodeOnEdit&&D.each(G,function(e,l){D.jgrid.isFunction(l)||(G[e]=F.oldEncodePostedData(l))}),r.jqGrid("progressBar",{method:"show",loadtype:a.loadui,htmlcontent:r.jqGrid("getGridRes","defaults.savetext")||"Saving..."}),t.hDiv.loading=!0,D.ajax(D.extend({url:D.jgrid.isFunction(a.cellurl)?a.cellurl.call(i,a.cellurl,E,I,h,j,m):a.cellurl,data:F.serializeFeedback.call(i,a.serializeCellData,"jqGridSerializeCellData",G),type:"POST",complete:function(e){if(t.endReq.call(i),(e.status<300||304===e.status)&&(0!==e.status||4!==e.readyState)){var l=r.triggerHandler("jqGridAfterSubmitCell",[i,e,G.id,m,j,E,I])||[!0,""];(!0===l||!0===l[0]&&D.jgrid.isFunction(a.afterSubmitCell))&&(l=a.afterSubmitCell.call(i,e,G.id,m,j,E,I)),null==l||!0===l||!0===l[0]?(r.jqGrid("setCell",h,I,j,!1,!1,!0),C.addClass("dirty-cell"),p.addClass("edited"),M.call(i,"afterSaveCell",h,m,j,E,I),s.splice(0,1),delete a.editingInfo[h]):(d.call(i,n,l[1],o),r.jqGrid("restoreCell",E,I))}},error:function(e,l,t){r.triggerHandler("jqGridErrorCell",[e,l,t]),D.jgrid.isFunction(a.errorCell)?a.errorCell.call(i,e,l,t):d.call(i,n,e.status+" : "+e.statusText+"<br/>"+l,o),r.jqGrid("restoreCell",E,I)}},F.ajaxOptions,a.ajaxCellOptions||{}))}else try{d.call(i,n,l.nourl,o),r.jqGrid("restoreCell",E,I)}catch(e){}if("clientArray"===a.cellsubmit){if(r.jqGrid("setCell",h,I,"select"===v.edittype&&"select"!==v.formatter?g.text:j,!1,!1,!0),C.addClass("dirty-cell"),p.addClass("edited"),M.call(i,"afterSaveCell",h,m,j,E,I),a.frozenColumns&&I<r.jqGrid("getNumberOfFrozenColumns"))try{i.rows[f.rowIndex].cells[I].style.height=""}catch(e){}s.splice(0,1),delete a.editingInfo[h]}}else try{setTimeout(function(){var e=F.getRelativeRect.call(i,C);d.call(i,n,j+" "+b[1],o,{top:e.top,left:e.left+D(i).closest(".ui-jqgrid").offset().left})},50),r.jqGrid("restoreCell",E,I)}catch(e){}}else r.jqGrid("restoreCell",E,I)}setTimeout(function(){D("#"+e(a.knv)).attr("tabindex","-1").focus()},0)}})},restoreCell:function(s,c){return this.each(function(){var e,l,t,i=this,r=i.p,a=i.rows[s],d=a.id;if(i.grid&&!0===r.cellEdit){var n=r.savedRow,o=N.call(i,a,c);if(1<=n.length){if(D.jgrid.isFunction(D.fn.datepicker))try{D("input.hasDatepicker",o).datepicker("hide")}catch(e){}if(l=r.colModel[c],!0===r.treeGrid&&null!=l&&l.name===r.ExpandColumn?o.children("span.cell-wrapperleaf,span.cell-wrapper").empty():o.empty(),o.attr("tabindex","-1"),e=n[0].v,null!=l&&(t=l.formatoptions||{},"date"===l.formatter&&!0!==t.sendFormatted&&(e=D.unformat.date.call(i,e,l)),D(i).jqGrid("setCell",d,c,e,!1,!1,!0),r.frozenColumns&&c<D(i).jqGrid("getNumberOfFrozenColumns")))try{i.rows[a.rowIndex].cells[c].style.height=""}catch(e){}M.call(i,"afterRestoreCell",d,e,s,c),n.splice(0,1),delete r.editingInfo[d]}setTimeout(function(){D("#"+r.knv).attr("tabindex","-1").focus()},0)}})},nextCell:function(o,s){return this.each(function(){var e,l,t,i=this,r=D(i),a=i.p,d=!1,n=i.rows;if(i.grid&&!0===a.cellEdit&&null!=n&&null!=n[o]){for(e=s+1;e<a.colModel.length;e++)if(l=(t=a.colModel[e]).editable,D.jgrid.isFunction(l)&&(l=l.call(i,{rowid:n[o].id,iCol:e,iRow:o,cmName:t.name,cm:t,mode:"cell"})),!0===l){d=e;break}!1!==d?r.jqGrid("editCell",o,d,!0):0<a.savedRow.length&&r.jqGrid("saveCell",o,s)}})},prevCell:function(o,s){return this.each(function(){var e,l,t,i=this,r=D(i),a=i.p,d=!1,n=i.rows;if(i.grid&&!0===a.cellEdit&&null!=n&&null!=n[o]){for(e=s-1;0<=e;e--)if(l=(t=a.colModel[e]).editable,D.jgrid.isFunction(l)&&(l=l.call(i,{rowid:n[o].id,iCol:e,iRow:o,cmName:t.name,cm:t,mode:"cell"})),!0===l){d=e;break}!1!==d?r.jqGrid("editCell",o,d,!0):0<a.savedRow.length&&r.jqGrid("saveCell",o,s)}})},GridNav:function(){return this.each(function(){var i,r,h=this,a=D(h),d=h.p,e=h.grid;if(e&&!0===d.cellEdit){var p=e.bDiv;d.knv=d.id+"_kn";var l=D("<div style='position:fixed;top:0px;width:1px;height:1px;' tabindex='0'><div tabindex='-1' style='width:1px;height:1px;' id='"+d.knv+"'></div></div>");D(l).insertBefore(e.cDiv),D("#"+d.knv).focus().keydown(function(e){var l=parseInt(d.iRow,10),t=parseInt(d.iCol,10);switch(r=e.keyCode,"rtl"===d.direction&&(37===r?r=39:39===r&&(r=37)),r){case 38:0<l-1&&(n(l-1,t,"vu"),a.jqGrid("editCell",l-1,t,!1));break;case 40:l+1<=h.rows.length-1&&(n(l+1,t,"vd"),a.jqGrid("editCell",l+1,t,!1));break;case 37:0<=t-1&&(n(l,i=o(t-1,"lft"),"h"),a.jqGrid("editCell",l,i,!1));break;case 39:t+1<=d.colModel.length-1&&(n(l,i=o(t+1,"rgt"),"h"),a.jqGrid("editCell",l,i,!1));break;case 13:0<=t&&0<=l&&a.jqGrid("editCell",l,t,!0);break;default:return!0}return!1})}function n(e,l,t){var i=h.rows[e];if("v"===t.substr(0,1)){var r=p.clientHeight,a=p.scrollTop,d=i.offsetTop+i.clientHeight,n=i.offsetTop;"vd"===t&&a+r<=d&&(p.scrollTop=p.scrollTop+i.clientHeight),"vu"===t&&n<a&&(p.scrollTop=p.scrollTop-i.clientHeight)}if("h"===t){var o=p.clientWidth,s=p.scrollLeft,c=i.cells[l],u=c.offsetLeft+c.clientWidth,f=c.offsetLeft;u>=o+parseInt(s,10)?p.scrollLeft=p.scrollLeft+c.clientWidth:f<s&&(p.scrollLeft=p.scrollLeft-c.clientWidth)}}function o(e,l){var t,i=0,r=d.colModel;if("lft"===l)for(i=e+1,t=e;0<=t;t--)if(!0!==r[t].hidden){i=t;break}if("rgt"===l)for(i=e-1,t=e;t<r.length;t++)if(!0!==r[t].hidden){i=t;break}return i}})},getChangedCells:function(u){var e=[];return u||(u="all"),this.each(function(){var n=this,o=n.p,s=F.htmlDecode,c=n.rows;n.grid&&!0===o.cellEdit&&D(c).each(function(r){var a={};if(D(this).hasClass("edited")){var d=this;D(this.cells).each(function(e){var l=o.colModel[e],t=l.name,i=N.call(n,d,e);if("cb"!==t&&"subgrid"!==t&&"rn"!==t&&("dirty"!==u||i.hasClass("dirty-cell")))try{a[t]=D.unformat.call(n,i[0],{rowId:c[r].id,colModel:l},e)}catch(e){a[t]=s(i.html())}}),a.id=this.id,e.push(a)}})}),e}})});
//# sourceMappingURL=grid.celledit.js.map