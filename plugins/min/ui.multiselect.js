/**
 * @license jQuery UI Multiselect
 *
 * Authors:
 *  Michael Aufreiter (quasipartikel.at)
 *  Yanick Rochon (yanick.rochon[at]gmail[dot]com)
 * 
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 * 
 * http://www.quasipartikel.at/multiselect/
 *
 * UPDATED by Oleg Kiriljuk (oleg.kiriljuk@ok-soft-gmbh.com) to support jQuery 1.6 and hight
 * (the usage of jQuery.attr and jQuery.removeAttr is replaced to the usage of jQuery.prop
 *  in case of working with selected options of select)
 * 
 * Depends:
 *	ui.core.js
 *	ui.sortable.js
 *
 * Optional:
 * localization (http://plugins.jquery.com/project/localisation)
 * scrollTo (http://plugins.jquery.com/project/ScrollTo)
 * 
 * Todo:
 *  Make batch actions faster
 *  Implement dynamic insertion through remote calls
 */
!function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery","jquery-ui/sortable"],i):"object"==typeof module&&module.exports?module.exports=function(e,t){return void 0===t&&(t="undefined"!=typeof window?require("jquery"):require("jquery")(e||window)),require("jquery-ui/sortable"),i(t),t}:i(jQuery)}(function(d){d.widget("ui.multiselect",{options:{sortable:!0,searchable:!0,doubleClickable:!0,animated:"fast",show:"slideDown",hide:"slideUp",dividerLocation:.6,availableFirst:!1,nodeComparator:function(e,t){var i=e.text(),s=t.text();return i==s?0:i<s?-1:1}},_create:function(){this.element.hide(),this.id=this.element.attr("id"),this.container=d('<div class="ui-multiselect ui-helper-clearfix ui-widget"></div>').insertAfter(this.element),this.count=0,this.selectedContainer=d('<div class="selected"></div>').appendTo(this.container),this.availableContainer=d('<div class="available"></div>')[this.options.availableFirst?"prependTo":"appendTo"](this.container),this.selectedActions=d('<div class="actions ui-widget-header ui-helper-clearfix"><span class="count">0 '+d.ui.multiselect.locale.itemsCount+'</span><a href="#" class="remove-all">'+d.ui.multiselect.locale.removeAll+"</a></div>").appendTo(this.selectedContainer),this.availableActions=d('<div class="actions ui-widget-header ui-helper-clearfix"><input type="text" class="search empty ui-widget-content ui-corner-all"></input><a href="#" class="add-all">'+d.ui.multiselect.locale.addAll+"</a></div>").appendTo(this.availableContainer),this.selectedList=d('<ul class="selected connected-list"><li class="ui-helper-hidden-accessible"></li></ul>').bind("selectstart",function(){return!1}).appendTo(this.selectedContainer),this.availableList=d('<ul class="available connected-list"><li class="ui-helper-hidden-accessible"></li></ul>').bind("selectstart",function(){return!1}).appendTo(this.availableContainer);var i=this;this.container.width(this.element.width()+1),this.selectedContainer.width(Math.floor(this.element.width()*this.options.dividerLocation)),this.availableContainer.width(Math.floor(this.element.width()*(1-this.options.dividerLocation))),this.selectedList.height(Math.max(this.element.height()-this.selectedActions.height(),1)),this.availableList.height(Math.max(this.element.height()-this.availableActions.height(),1)),this.options.animated||(this.options.show="show",this.options.hide="hide"),this._populateLists(this.element.find("option")),this.options.sortable&&this.selectedList.sortable({placeholder:"ui-state-highlight",axis:"y",update:function(e,t){i.selectedList.find("li").each(function(){d(this).data("optionLink")&&d(this).data("optionLink").remove().appendTo(i.element)})},receive:function(e,t){t.item.data("optionLink").prop("selected",!0),i.count+=1,i._updateCount(),i.selectedList.children(".ui-draggable").each(function(){d(this).removeClass("ui-draggable"),d(this).data("optionLink",t.item.data("optionLink")),d(this).data("idx",t.item.data("idx")),i._applyItemState(d(this),!0)}),setTimeout(function(){t.item.remove()},1)}}),this.options.searchable?this._registerSearchEvents(this.availableContainer.find("input.search")):d(".search").hide(),this.container.find(".remove-all").click(function(){return i._populateLists(i.element.find("option").prop("selected",!1)),!1}),this.container.find(".add-all").click(function(){var t=i.element.find("option").not(":selected");return 1<i.availableList.children("li:hidden").length?i.availableList.children("li").each(function(e){d(this).is(":visible")&&d(t[e-1]).prop("selected",!0)}):t.prop("selected",!0),i._populateLists(i.element.find("option")),!1})},destroy:function(){this.element.show(),this.container.remove(),d.Widget.prototype.destroy.apply(this,arguments)},_populateLists:function(e){this.selectedList.children(".ui-element").remove(),this.availableList.children(".ui-element").remove(),this.count=0;var s=this;d(e.map(function(e){var t=d(this).is(":selected"),i=s._getOptionNode(this).appendTo(t?s.selectedList:s.availableList).show();return t&&(s.count+=1),s._applyItemState(i,t),i.data("idx",e),i[0]}));this._updateCount(),s._filter.apply(this.availableContainer.find("input.search"),[s.availableList])},_updateCount:function(){this.element.trigger("change"),this.selectedContainer.find("span.count").text(this.count+" "+d.ui.multiselect.locale.itemsCount)},_getOptionNode:function(e){e=d(e);var t=d("<li>",{class:"ui-state-default ui-element",title:e.text(),"data-selected-value":e.val()}).append('<span class="ui-icon"></span>'+e.html()+'<a href="#" class="action"><span class="ui-corner-all ui-icon"></span></a></li>').hide();return t.data("optionLink",e),t},_cloneWithData:function(e){var t=e.clone(!1,!1);return t.data("optionLink",e.data("optionLink")),t.data("idx",e.data("idx")),t},_setSelected:function(e,t){if(e.data("optionLink").prop("selected",t),t){var i=this._cloneWithData(e);return e[this.options.hide](this.options.animated,function(){d(this).remove()}),i.appendTo(this.selectedList).hide()[this.options.show](this.options.animated),this._applyItemState(i,!0),i}var s=this.availableList.find("li"),n=this.options.nodeComparator,a=null,o=e.data("idx"),l=n(e,d(s[o]));if(l){for(;0<=o&&o<s.length;)if(0<l?o++:o--,l!=n(e,d(s[o]))){a=s[0<l?o:o+1];break}}else a=s[o];var r=this._cloneWithData(e);return a?r.insertBefore(d(a)):r.appendTo(this.availableList),e[this.options.hide](this.options.animated,function(){d(this).remove()}),r.hide()[this.options.show](this.options.animated),this._applyItemState(r,!1),r},_applyItemState:function(e,t){t?(this.options.sortable?e.children("span").addClass("ui-icon-arrowthick-2-n-s").removeClass("ui-helper-hidden").addClass("ui-icon"):e.children("span").removeClass("ui-icon-arrowthick-2-n-s").addClass("ui-helper-hidden").removeClass("ui-icon"),e.find("a.action span").addClass("ui-icon-minus").removeClass("ui-icon-plus"),this._registerRemoveEvents(e.find("a.action"))):(e.children("span").removeClass("ui-icon-arrowthick-2-n-s").addClass("ui-helper-hidden").removeClass("ui-icon"),e.find("a.action span").addClass("ui-icon-plus").removeClass("ui-icon-minus"),this._registerAddEvents(e.find("a.action"))),this._registerDoubleClickEvents(e),this._registerHoverEvents(e)},_filter:function(e){var t=d(this),i=e.children("li"),s=i.map(function(){return d(this).text().toLowerCase()}),n=d.jgrid.trim(t.val().toLowerCase()),a=[];n?(i.hide(),s.each(function(e){-1<this.indexOf(n)&&a.push(e)}),d.each(a,function(){d(i[this]).show()})):i.show()},_registerDoubleClickEvents:function(t){this.options.doubleClickable&&t.dblclick(function(e){0===d(e.target).closest(".action").length&&t.find("a.action").click()})},_registerHoverEvents:function(e){e.removeClass("ui-state-hover"),e.mouseover(function(){d(this).addClass("ui-state-hover")}),e.mouseout(function(){d(this).removeClass("ui-state-hover")})},_registerAddEvents:function(e){var t=this;e.click(function(){t._setSelected(d(this).parent(),!0);return t.count+=1,t._updateCount(),!1}),this.options.sortable&&e.each(function(){d(this).parent().draggable({connectToSortable:t.selectedList,helper:function(){var e=t._cloneWithData(d(this)).width(d(this).width()-50);return e.width(d(this).width()),e},appendTo:t.container,containment:t.container,revert:"invalid"})})},_registerRemoveEvents:function(e){var t=this;e.click(function(){return t._setSelected(d(this).parent(),!1),t.count-=1,t._updateCount(),!1})},_registerSearchEvents:function(e){var t=this;e.focus(function(){d(this).addClass("ui-state-active")}).blur(function(){d(this).removeClass("ui-state-active")}).keypress(function(e){if(13==e.keyCode)return!1}).keyup(function(){t._filter.apply(this,[t.availableList])})}}),d.extend(d.ui.multiselect,{locale:{addAll:"Add all",removeAll:"Remove all",itemsCount:"items selected"}})});
//# sourceMappingURL=ui.multiselect.js.map