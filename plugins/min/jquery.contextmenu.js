/**
 * @license ContextMenu - jQuery plugin for right-click context menus
 *
 * Author: Chris Domigan
 * Contributors: Dan G. Switzer, II
 * Parts of this plugin are inspired by Joern Zaefferer's Tooltip plugin
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Version: r2
 * Date: 16 July 2007
 *
 * For documentation visit http://www.trendskitchens.co.nz/jquery/contextmenu/
 *
 */
((n,o)=>{"function"==typeof define&&define.amd?define(["jquery"],function(e){return o(e,n.document)}):"object"==typeof module&&module.exports?module.exports=function(e,n){return void 0===n&&(n="undefined"!=typeof window?require("jquery"):require("jquery")(e||window)),o(n,e.document),n}:o(jQuery,n.document)})("undefined"!=typeof window?window:this,function(d,u){var s,l,r,c,a,o={menuStyle:{listStyle:"none",padding:"1px",margin:"0px",backgroundColor:"#fff",border:"1px solid #999",width:"100px"},itemStyle:{margin:"0px",color:"#000",display:"block",cursor:"default",padding:"3px",border:"1px solid #fff",backgroundColor:"transparent"},itemHoverStyle:{border:"1px solid #0a246a",backgroundColor:"#b6bdd2"},eventPosX:"pageX",eventPosY:"pageY",shadow:!0,onContextMenu:null,onShowMenu:null};function f(){s.hide(),l.hide()}d.fn.contextMenu=function(e,n){s=s||d('<div id="jqContextMenu"></div>').hide().css({position:"absolute",zIndex:"500"}).appendTo("body").bind("click",function(e){e.stopPropagation()}),l=l||d("<div></div>").css({backgroundColor:"#000",position:"absolute",opacity:.2,zIndex:499}).appendTo("body").hide(),(c=c||[]).push({id:e,menuStyle:d.extend({},o.menuStyle,n.menuStyle||{}),itemStyle:d.extend({},o.itemStyle,n.itemStyle||{}),itemHoverStyle:d.extend({},o.itemHoverStyle,n.itemHoverStyle||{}),bindings:n.bindings||{},shadow:(n.shadow||!1===n.shadow?n:o).shadow,onContextMenu:n.onContextMenu||o.onContextMenu,onShowMenu:n.onShowMenu||o.onShowMenu,eventPosX:n.eventPosX||o.eventPosX,eventPosY:n.eventPosY||o.eventPosY});var i=c.length-1;return d(this).bind("contextmenu",function(e){var o,n,t=!c[i].onContextMenu||c[i].onContextMenu(e);if(a=e.target,t)return o=this,t=e,n=c[i],(r=d("#"+n.id).find("ul:first").clone(!0)).css(n.menuStyle).find("li").css(n.itemStyle).hover(function(){d(this).css(n.itemHoverStyle)},function(){d(this).css(n.itemStyle)}).find("img").css({verticalAlign:"middle",paddingRight:"2px"}),s.html(r),n.onShowMenu&&(s=n.onShowMenu(t,s)),d.each(n.bindings,function(e,n){d("#"+e,s).bind("click",function(){f(),n(o,a)})}),s.css({left:t[n.eventPosX],top:t[n.eventPosY]}).show(),n.shadow&&l.css({width:s.width(),height:s.height(),left:t.pageX+2,top:t.pageY+2}).show(),d(u).one("click",f),!1}),this},d.contextMenu={defaults:function(e){d.each(e,function(e,n){"object"==typeof n&&o[e]?d.extend(o[e],n):o[e]=n})}}}),$(function(){$("div.contextMenu").hide()});
//# sourceMappingURL=jquery.contextmenu.js.map