import{a as Mt}from"./chunk-L4TL7TWU.js";import{b as ht}from"./chunk-FPYD6XJZ.js";import{b as dt,d as ge,e as $e,g as ee}from"./chunk-6R7BUVFI.js";import{d as ct}from"./chunk-HMF6RJK6.js";import{a as bt}from"./chunk-2BOM3PMI.js";import{a as It,c as Tt,e as wt,f as Ce,g as pe}from"./chunk-RVXUJXBG.js";import"./chunk-Q2HHWBKA.js";import{c as me}from"./chunk-4Q3JVAKG.js";import"./chunk-MCE4IIOZ.js";import{$ as ft,Aa as Xe,Ba as xe,Da as vt,Ea as xt,Fa as Ct,L as ke,M as _t,Q as Re,S as le,X as Ye,Y as Je,aa as ve,ha as ze,i as Be,ka as te,l as Ae,la as T,m as He,pa as ie,q as Me,r as ce,s as N,sa as Z,ua as Ke,va as gt,za as yt}from"./chunk-F2X7M4DW.js";import{c as Fe,d as be,f as Ie,h as ye}from"./chunk-WCGJ44IN.js";import{B as F,D as X,m as Q,o as he,p as $,s as J,t as se}from"./chunk-J6775IRK.js";import{$ as B,$b as E,Ab as S,Fc as C,Gb as p,Gc as j,Hb as c,Ib as g,Ic as ut,Jb as R,Jc as We,Kb as z,Lb as K,Mb as w,Pa as _e,Qa as re,Rb as y,Sb as s,Ta as m,Tb as De,U as Ee,Ub as Pe,V as U,Vb as x,W as ne,Wb as H,Xb as b,Ya as lt,Yb as I,Za as G,ac as M,bc as P,cc as Ze,fa as f,ga as h,hb as k,hc as W,ia as A,ib as ae,ic as Ve,jc as V,kb as mt,kc as Y,lb as q,nb as u,oa as v,ra as rt,sa as at,sc as Ue,tc as Ge,ua as oe,vb as d,wb as a,wc as L,ya as st,yb as pt,zb as fe}from"./chunk-VDH5VFWZ.js";import{a as de,b as Oe}from"./chunk-EQDQRRRY.js";var Qt=["start"],Nt=["end"],qt=["center"],jt=["*"];function Zt(t,r){t&1&&K(0)}function Ut(t,r){if(t&1&&(p(0,"div",4),u(1,Zt,1,0,"ng-container",5),c()),t&2){let e=s();d("data-pc-section","start"),m(),a("ngTemplateOutlet",e.startTemplate||e._startTemplate)}}function Gt(t,r){t&1&&K(0)}function Wt(t,r){if(t&1&&(p(0,"div",6),u(1,Gt,1,0,"ng-container",5),c()),t&2){let e=s();d("data-pc-section","center"),m(),a("ngTemplateOutlet",e.centerTemplate||e._centerTemplate)}}function Yt(t,r){t&1&&K(0)}function Jt(t,r){if(t&1&&(p(0,"div",7),u(1,Yt,1,0,"ng-container",5),c()),t&2){let e=s();d("data-pc-section","end"),m(),a("ngTemplateOutlet",e.endTemplate||e._endTemplate)}}var Xt=({dt:t})=>`
.p-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: ${t("toolbar.padding")};
    background: ${t("toolbar.background")};
    border: 1px solid ${t("toolbar.border.color")};
    color: ${t("toolbar.color")};
    border-radius: ${t("toolbar.border.radius")};
    gap: ${t("toolbar.gap")};
}

.p-toolbar-start,
.p-toolbar-center,
.p-toolbar-end {
    display: flex;
    align-items: center;
}
`,ei={root:"p-toolbar p-component",start:"p-toolbar-start",center:"p-toolbar-center",end:"p-toolbar-end"},kt=(()=>{class t extends ie{name="toolbar";theme=Xt;classes=ei;static \u0275fac=(()=>{let e;return function(n){return(e||(e=A(t)))(n||t)}})();static \u0275prov=U({token:t,factory:t.\u0275fac})}return t})();var et=(()=>{class t extends Z{style;styleClass;ariaLabelledBy;_componentStyle=B(kt);getBlockableElement(){return this.el.nativeElement.children[0]}startTemplate;endTemplate;centerTemplate;templates;_startTemplate;_endTemplate;_centerTemplate;ngAfterContentInit(){this.templates.forEach(e=>{switch(e.getType()){case"start":case"left":this._startTemplate=e.template;break;case"end":case"right":this._endTemplate=e.template;break;case"center":this._centerTemplate=e.template;break}})}static \u0275fac=(()=>{let e;return function(n){return(e||(e=A(t)))(n||t)}})();static \u0275cmp=k({type:t,selectors:[["p-toolbar"]],contentQueries:function(i,n,o){if(i&1&&(x(o,Qt,4),x(o,Nt,4),x(o,qt,4),x(o,te,4)),i&2){let l;b(l=I())&&(n.startTemplate=l.first),b(l=I())&&(n.endTemplate=l.first),b(l=I())&&(n.centerTemplate=l.first),b(l=I())&&(n.templates=l)}},inputs:{style:"style",styleClass:"styleClass",ariaLabelledBy:"ariaLabelledBy"},features:[W([kt]),q],ngContentSelectors:jt,decls:5,vars:9,consts:[["role","toolbar",3,"ngClass","ngStyle"],["class","p-toolbar-start",4,"ngIf"],["class","p-toolbar-center",4,"ngIf"],["class","p-toolbar-end",4,"ngIf"],[1,"p-toolbar-start"],[4,"ngTemplateOutlet"],[1,"p-toolbar-center"],[1,"p-toolbar-end"]],template:function(i,n){i&1&&(De(),p(0,"div",0),Pe(1),u(2,Ut,2,2,"div",1)(3,Wt,2,2,"div",2)(4,Jt,2,2,"div",3),c()),i&2&&(S(n.styleClass),a("ngClass","p-toolbar p-component")("ngStyle",n.style),d("aria-labelledby",n.ariaLabelledBy)("data-pc-name","toolbar"),m(2),a("ngIf",n.startTemplate||n._startTemplate),m(),a("ngIf",n.centerTemplate||n._centerTemplate),m(),a("ngIf",n.endTemplate||n._endTemplate))},dependencies:[F,Q,$,se,J,T],encapsulation:2,changeDetection:0})}return t})(),St=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=ae({type:t});static \u0275inj=ne({imports:[et,T,T]})}return t})();var ii=["sublist"],ni=(t,r)=>({"p-tieredmenu-submenu":t,"p-tieredmenu-root-list":r}),Dt=t=>({"p-tieredmenu-item-link":!0,"p-disabled":t}),oi=()=>({exact:!1}),ri=(t,r)=>({$implicit:t,hasSubmenu:r}),ai=t=>({display:t});function si(t,r){if(t&1&&g(0,"li",7),t&2){let e=s().$implicit,i=s();fe(i.getItemProp(e,"style")),a("ngClass",i.getSeparatorItemClass(e)),d("id",i.getItemId(e))("data-pc-section","separator")}}function li(t,r){if(t&1&&g(0,"span",18),t&2){let e=s(4).$implicit,i=s();a("ngClass",i.getItemProp(e,"icon"))("ngStyle",i.getItemProp(e,"iconStyle")),d("data-pc-section","icon")("tabindex",-1)}}function mi(t,r){if(t&1&&(p(0,"span",19),M(1),c()),t&2){let e=s(4).$implicit,i=s();d("data-pc-section","label"),m(),Ze(" ",i.getItemLabel(e)," ")}}function pi(t,r){if(t&1&&g(0,"span",20),t&2){let e=s(4).$implicit,i=s();a("innerHTML",i.getItemLabel(e),_e),d("data-pc-section","label")}}function ui(t,r){if(t&1&&(p(0,"span",21),M(1),c()),t&2){let e=s(4).$implicit,i=s();a("ngClass",i.getItemProp(e,"badgeStyleClass")),m(),P(i.getItemProp(e,"badge"))}}function ci(t,r){t&1&&g(0,"AngleRightIcon",24),t&2&&(a("ngClass","p-tieredmenu-submenu-icon"),d("data-pc-section","submenuicon")("aria-hidden",!0))}function di(t,r){}function _i(t,r){t&1&&u(0,di,0,0,"ng-template",25),t&2&&a("data-pc-section","submenuicon")("aria-hidden",!0)}function fi(t,r){if(t&1&&(R(0),u(1,ci,1,3,"AngleRightIcon",22)(2,_i,1,2,null,23),z()),t&2){let e=s(5);m(),a("ngIf",!e.tieredMenu.submenuIconTemplate&&!e.tieredMenu._submenuIconTemplate),m(),a("ngTemplateOutlet",e.tieredMenu.submenuIconTemplate||e.tieredMenu._submenuIconTemplate)}}function hi(t,r){if(t&1&&(p(0,"a",14),u(1,li,1,4,"span",15)(2,mi,2,2,"span",16)(3,pi,1,2,"ng-template",null,2,L)(5,ui,2,2,"span",17)(6,fi,3,2,"ng-container",10),c()),t&2){let e=E(4),i=s(3).$implicit,n=s();a("target",n.getItemProp(i,"target"))("ngClass",V(11,Dt,n.getItemProp(i,"disabled"))),d("href",n.getItemProp(i,"url"),re)("data-automationid",n.getItemProp(i,"automationId"))("data-pc-section","action")("tabindex",-1),m(),a("ngIf",n.getItemProp(i,"icon")),m(),a("ngIf",n.getItemProp(i,"escape"))("ngIfElse",e),m(3),a("ngIf",n.getItemProp(i,"badge")),m(),a("ngIf",n.isItemGroup(i))}}function gi(t,r){if(t&1&&g(0,"span",18),t&2){let e=s(4).$implicit,i=s();a("ngClass",i.getItemProp(e,"icon"))("ngStyle",i.getItemProp(e,"iconStyle")),d("data-pc-section","icon")("aria-hidden",!0)("tabindex",-1)}}function bi(t,r){if(t&1&&(p(0,"span",19),M(1),c()),t&2){let e=s(4).$implicit,i=s();d("data-pc-section","label"),m(),Ze(" ",i.getItemLabel(e)," ")}}function Ii(t,r){if(t&1&&g(0,"span",20),t&2){let e=s(4).$implicit,i=s();a("innerHTML",i.getItemLabel(e),_e),d("data-pc-section","label")}}function yi(t,r){if(t&1&&(p(0,"span",21),M(1),c()),t&2){let e=s(4).$implicit,i=s();a("ngClass",i.getItemProp(e,"badgeStyleClass")),m(),P(i.getItemProp(e,"badge"))}}function vi(t,r){t&1&&g(0,"AngleRightIcon",24),t&2&&(a("ngClass","p-tieredmenu-submenu-icon"),d("data-pc-section","submenuicon")("aria-hidden",!0))}function xi(t,r){}function Ci(t,r){t&1&&u(0,xi,0,0,"ng-template",25),t&2&&a("data-pc-section","submenuicon")("aria-hidden",!0)}function Ti(t,r){if(t&1&&(R(0),u(1,vi,1,3,"AngleRightIcon",22)(2,Ci,1,2,null,23),z()),t&2){let e=s(5);m(),a("ngIf",!e.tieredMenu.submenuIconTemplate&&!e.tieredMenu._submenuIconTemplate),m(),a("ngTemplateOutlet",e.tieredMenu.submenuIconTemplate||e.tieredMenu._submenuIconTemplate)}}function wi(t,r){if(t&1&&(p(0,"a",26),u(1,gi,1,5,"span",15)(2,bi,2,2,"span",16)(3,Ii,1,2,"ng-template",null,2,L)(5,yi,2,2,"span",17)(6,Ti,3,2,"ng-container",10),c()),t&2){let e=E(4),i=s(3).$implicit,n=s();a("routerLink",n.getItemProp(i,"routerLink"))("queryParams",n.getItemProp(i,"queryParams"))("routerLinkActive","p-tieredmenu-item-link-active")("routerLinkActiveOptions",n.getItemProp(i,"routerLinkActiveOptions")||Ve(20,oi))("target",n.getItemProp(i,"target"))("ngClass",V(21,Dt,n.getItemProp(i,"disabled")))("fragment",n.getItemProp(i,"fragment"))("queryParamsHandling",n.getItemProp(i,"queryParamsHandling"))("preserveFragment",n.getItemProp(i,"preserveFragment"))("skipLocationChange",n.getItemProp(i,"skipLocationChange"))("replaceUrl",n.getItemProp(i,"replaceUrl"))("state",n.getItemProp(i,"state")),d("data-automationid",n.getItemProp(i,"automationId"))("tabindex",-1)("data-pc-section","action"),m(),a("ngIf",n.getItemProp(i,"icon")),m(),a("ngIf",n.getItemProp(i,"escape"))("ngIfElse",e),m(3),a("ngIf",n.getItemProp(i,"badge")),m(),a("ngIf",n.isItemGroup(i))}}function Mi(t,r){if(t&1&&(R(0),u(1,hi,7,13,"a",12)(2,wi,7,23,"a",13),z()),t&2){let e=s(2).$implicit,i=s();m(),a("ngIf",!i.getItemProp(e,"routerLink")),m(),a("ngIf",i.getItemProp(e,"routerLink"))}}function ki(t,r){}function Si(t,r){t&1&&u(0,ki,0,0,"ng-template")}function Li(t,r){if(t&1&&(R(0),u(1,Si,1,0,null,27),z()),t&2){let e=s(2).$implicit,i=s();m(),a("ngTemplateOutlet",i.itemTemplate)("ngTemplateOutletContext",Y(2,ri,e.item,i.getItemProp(e,"items")))}}function Oi(t,r){if(t&1){let e=w();p(0,"p-tieredmenusub",28),y("itemClick",function(n){f(e);let o=s(3);return h(o.itemClick.emit(n))})("itemMouseEnter",function(n){f(e);let o=s(3);return h(o.onItemMouseEnter(n))}),c()}if(t&2){let e=s(2).$implicit,i=s();a("items",e.items)("itemTemplate",i.itemTemplate)("autoDisplay",i.autoDisplay)("menuId",i.menuId)("activeItemPath",i.activeItemPath())("focusedItemId",i.focusedItemId)("ariaLabelledBy",i.getItemId(e))("level",i.level+1)("inlineStyles",V(9,ai,i.isItemActive(e)?"flex":"none"))}}function Ei(t,r){if(t&1){let e=w();p(0,"li",8,1)(2,"div",9),y("click",function(n){f(e);let o=s().$implicit,l=s();return h(l.onItemClick(n,o))})("mouseenter",function(n){f(e);let o=s().$implicit,l=s();return h(l.onItemMouseEnter({$event:n,processedItem:o}))}),u(3,Mi,3,2,"ng-container",10)(4,Li,2,5,"ng-container",10),c(),u(5,Oi,1,11,"p-tieredmenusub",11),c()}if(t&2){let e=s(),i=e.$implicit,n=e.index,o=s();S(o.getItemProp(i,"styleClass")),a("ngStyle",o.getItemProp(i,"style"))("ngClass",o.getItemClass(i))("tooltipOptions",o.getItemProp(i,"tooltipOptions")),d("id",o.getItemId(i))("data-pc-section","menuitem")("data-p-highlight",o.isItemActive(i))("data-p-focused",o.isItemFocused(i))("data-p-disabled",o.isItemDisabled(i))("aria-label",o.getItemLabel(i))("aria-disabled",o.isItemDisabled(i)||void 0)("aria-haspopup",o.isItemGroup(i)&&!o.getItemProp(i,"to")?"menu":void 0)("aria-expanded",o.isItemGroup(i)?o.isItemActive(i):void 0)("aria-setsize",o.getAriaSetSize())("aria-posinset",o.getAriaPosInset(n)),m(2),d("data-pc-section","content"),m(),a("ngIf",!o.itemTemplate),m(),a("ngIf",o.itemTemplate),m(),a("ngIf",o.isItemVisible(i)&&o.isItemGroup(i))}}function Di(t,r){if(t&1&&u(0,si,1,5,"li",5)(1,Ei,6,20,"li",6),t&2){let e=r.$implicit,i=s();a("ngIf",i.isItemVisible(e)&&i.getItemProp(e,"separator")),m(),a("ngIf",i.isItemVisible(e)&&!i.getItemProp(e,"separator"))}}var Pi=["submenuicon"],Vi=["item"],$i=["rootmenu"],Fi=["container"],Bi=(t,r)=>({"p-tieredmenu p-component":!0,"p-tieredmenu-mobile":t,"p-tieredmenu-overlay":r}),Ai=(t,r)=>({showTransitionParams:t,hideTransitionParams:r}),Hi=t=>({value:"visible",params:t});function Ri(t,r){if(t&1){let e=w();p(0,"div",3,0),y("click",function(n){f(e);let o=s();return h(o.onOverlayClick(n))})("@overlayAnimation.start",function(n){f(e);let o=s();return h(o.onOverlayAnimationStart(n))})("@overlayAnimation.done",function(n){f(e);let o=s();return h(o.onOverlayAnimationEnd(n))}),p(2,"p-tieredMenuSub",4,1),y("itemClick",function(n){f(e);let o=s();return h(o.onItemClick(n))})("menuFocus",function(n){f(e);let o=s();return h(o.onMenuFocus(n))})("menuBlur",function(n){f(e);let o=s();return h(o.onMenuBlur(n))})("menuKeydown",function(n){f(e);let o=s();return h(o.onKeyDown(n))})("itemMouseEnter",function(n){f(e);let o=s();return h(o.onItemMouseEnter(n))}),c()()}if(t&2){let e=s();S(e.styleClass),a("id",e.id)("ngClass",Y(22,Bi,e.queryMatches,e.popup))("ngStyle",e.style)("@overlayAnimation",V(28,Hi,Y(25,Ai,e.showTransitionOptions,e.hideTransitionOptions)))("@.disabled",e.popup!==!0),d("data-pc-section","root")("data-pc-name","tieredmenu"),m(2),a("root",!0)("items",e.processedItems)("itemTemplate",e.itemTemplate||e._itemTemplate)("menuId",e.id)("tabindex",e.disabled?-1:e.tabindex)("ariaLabel",e.ariaLabel)("ariaLabelledBy",e.ariaLabelledBy)("baseZIndex",e.baseZIndex)("autoZIndex",e.autoZIndex)("autoDisplay",e.autoDisplay)("popup",e.popup)("focusedItemId",e.focused?e.focusedItemId:void 0)("activeItemPath",e.activeItemPath())}}var zi=({dt:t})=>`
.p-tieredmenu {
    background: ${t("tieredmenu.background")};
    color: ${t("tieredmenu.color")};
    border: 1px solid ${t("tieredmenu.border.color")};
    border-radius: ${t("tieredmenu.border.radius")};
    min-width: 12.5rem;
}

.p-tieredmenu-root-list,
.p-tieredmenu-submenu {
    margin: 0;
    padding: ${t("tieredmenu.list.padding")};
    list-style: none;
    outline: 0 none;
    display: flex;
    flex-direction: column;
    gap: ${t("tieredmenu.list.gap")};
}

.p-tieredmenu-submenu {
    position: absolute;
    min-width: 100%;
    z-index: 1;
    background: ${t("tieredmenu.background")};
    color: ${t("tieredmenu.color")};
    border: 1px solid ${t("tieredmenu.border.color")};
    border-radius: ${t("tieredmenu.border.radius")};
    box-shadow: ${t("tieredmenu.shadow")};
}

.p-tieredmenu-item {
    position: relative;
}

.p-tieredmenu-item-content {
    transition: background ${t("tieredmenu.transition.duration")}, color ${t("tieredmenu.transition.duration")};
    border-radius: ${t("tieredmenu.item.border.radius")};
    color: ${t("tieredmenu.item.color")};
}

.p-tieredmenu-item-link {
    cursor: pointer;
    display: flex;
    align-items: center;
    text-decoration: none;
    overflow: hidden;
    position: relative;
    color: inherit;
    padding: ${t("tieredmenu.item.padding")};
    gap: ${t("tieredmenu.item.gap")};
    user-select: none;
    outline: 0 none;
}

.p-tieredmenu-item-label {
    line-height: 1;
}

.p-tieredmenu-item-icon {
    color: ${t("tieredmenu.item.icon.color")};
}

.p-tieredmenu-submenu-icon {
    color: ${t("tieredmenu.submenu.icon.color")};
    margin-left: auto;
    font-size: ${t("tieredmenu.submenu.icon.size")};
    width: ${t("tieredmenu.submenu.icon.size")};
    height: ${t("tieredmenu.submenu.icon.size")};
}

.p-tieredmenu-submenu-icon:dir(rtl) {
    margin-left: 0;
    margin-right: auto;
}

.p-tieredmenu-item.p-focus > .p-tieredmenu-item-content {
    color: ${t("tieredmenu.item.focus.color")};
    background: ${t("tieredmenu.item.focus.background")};
}

.p-tieredmenu-item.p-focus > .p-tieredmenu-item-content .p-tieredmenu-item-icon {
    color: ${t("tieredmenu.item.icon.focus.color")};
}

.p-tieredmenu-item.p-focus > .p-tieredmenu-item-content .p-tieredmenu-submenu-icon {
    color: ${t("tieredmenu.submenu.icon.focus.color")};
}

.p-tieredmenu-item:not(.p-disabled) > .p-tieredmenu-item-content:hover {
    color: ${t("tieredmenu.item.focus.color")};
    background: ${t("tieredmenu.item.focus.background")};
}

.p-tieredmenu-item:not(.p-disabled) > .p-tieredmenu-item-content:hover .p-tieredmenu-item-icon {
    color: ${t("tieredmenu.item.icon.focus.color")};
}

.p-tieredmenu-item:not(.p-disabled) > .p-tieredmenu-item-content:hover .p-tieredmenu-submenu-icon {
    color: ${t("tieredmenu.submenu.icon.focus.color")};
}

.p-tieredmenu-item-active > .p-tieredmenu-item-content {
    color: ${t("tieredmenu.item.active.color")};
    background: ${t("tieredmenu.item.active.background")};
}

.p-tieredmenu-item-active > .p-tieredmenu-item-content .p-tieredmenu-item-icon {
    color: ${t("tieredmenu.item.icon.active.color")};
}

.p-tieredmenu-item-active > .p-tieredmenu-item-content .p-tieredmenu-submenu-icon {
    color: ${t("tieredmenu.submenu.icon.active.color")};
}

.p-tieredmenu-separator {
    border-top: 1px solid ${t("tieredmenu.separator.border.color")};
}

.p-tieredmenu-overlay {
    position: absolute;
    box-shadow: ${t("tieredmenu.shadow")};
}

.p-tieredmenu-enter-from,
.p-tieredmenu-leave-active {
    opacity: 0;
}

.p-tieredmenu-enter-active {
    transition: opacity 250ms;
}
    .p-tieredmenu-mobile {
    position: relative;
}

.p-tieredmenu-mobile .p-tieredmenu-button {
    display: flex;
}

.p-tieredmenu-mobile .p-tieredmenu-root-list > .p-tieredmenu-item > .p-tieredmenu-item-content > .p-tieredmenu-item-link {
    padding: ${t("tieredmenu.item.padding")};
}

.p-tieredmenu-mobile .p-tieredmenu-root-list .p-tieredmenu-separator {
    border-top: 1px solid ${t("tieredmenu.separator.border.color")};
}

.p-tieredmenu-mobile .p-tieredmenu-root-list > .p-tieredmenu-item > .p-tieredmenu-item-content .p-tieredmenu-submenu-icon {
    margin-left: auto;
    transition: transform 0.2s;
}

.p-tieredmenu-mobile .p-tieredmenu-root-list > .p-tieredmenu-item-active > .p-tieredmenu-item-content .p-tieredmenu-submenu-icon {
    transform: rotate(-90deg);
}

.p-tieredmenu-mobile .p-tieredmenu-submenu .p-tieredmenu-submenu-icon {
    transition: transform 0.2s;
    transform: rotate(90deg);
}

.p-tieredmenu-mobile  .p-tieredmenu-item-active > .p-tieredmenu-item-content .p-tieredmenu-submenu-icon {
    transform: rotate(-90deg);
}

.p-tieredmenu-mobile .p-tieredmenu-submenu {
    position: static;
    box-shadow: none;
    border: 0 none;
    padding-left: ${t("tieredmenu.submenu.mobile.indent")};
}
`;var Ki={root:({instance:t,props:r})=>["p-tieredmenu p-component",{"p-tieredmenu-overlay":r.popup}],start:"p-tieredmenu-start",rootList:"p-tieredmenu-root-list",item:({instance:t,processedItem:r})=>["p-tieredmenu-item",{"p-tieredmenu-item-active":t.isItemActive(r),"p-focus":t.isItemFocused(r),"p-disabled":t.isItemDisabled(r)}],itemContent:"p-tieredmenu-item-content",itemLink:"p-tieredmenu-item-link",itemIcon:"p-tieredmenu-item-icon",itemLabel:"p-tieredmenu-item-label",submenuIcon:"p-tieredmenu-submenu-icon",submenu:"p-tieredmenu-submenu",separator:"p-tieredmenu-separator",end:"p-tieredmenu-end"},Lt=(()=>{class t extends ie{name="tieredmenu";theme=zi;classes=Ki;static \u0275fac=(()=>{let e;return function(n){return(e||(e=A(t)))(n||t)}})();static \u0275prov=U({token:t,factory:t.\u0275fac})}return t})();var Qi=(()=>{class t extends Z{el;renderer;tieredMenu;items;itemTemplate;root=!1;autoDisplay;autoZIndex=!0;baseZIndex=0;popup;menuId;ariaLabel;ariaLabelledBy;level=0;focusedItemId;activeItemPath=rt([]);tabindex=0;inlineStyles;itemClick=new v;itemMouseEnter=new v;menuFocus=new v;menuBlur=new v;menuKeydown=new v;sublistViewChild;constructor(e,i,n){super(),this.el=e,this.renderer=i,this.tieredMenu=n,We(()=>{let o=this.activeItemPath();le(o)&&this.positionSubmenu()})}positionSubmenu(){if(X(this.tieredMenu.platformId)){let e=this.sublistViewChild&&this.sublistViewChild.nativeElement;e&&_t(e,this.level)}}getItemProp(e,i,n=null){return e&&e.item?Je(e.item[i],n):void 0}getItemId(e){return e.item?.id??`${this.menuId}_${e.key}`}getItemKey(e){return this.getItemId(e)}getItemClass(e){return Oe(de({},this.getItemProp(e,"class")),{"p-tieredmenu-item":!0,"p-tieredmenu-item-active":this.isItemActive(e),"p-focus":this.isItemFocused(e),"p-disabled":this.isItemDisabled(e)})}getItemLabel(e){return this.getItemProp(e,"label")}getSeparatorItemClass(e){return Oe(de({},this.getItemProp(e,"class")),{"p-tieredmenu-separator":!0})}getAriaSetSize(){return this.items.filter(e=>this.isItemVisible(e)&&!this.getItemProp(e,"separator")).length}getAriaPosInset(e){return e-this.items.slice(0,e).filter(i=>{let n=this.isItemVisible(i),o=n&&this.getItemProp(i,"separator");return!n||o}).length+1}isItemVisible(e){return this.getItemProp(e,"visible")!==!1}isItemActive(e){if(this.activeItemPath())return this.activeItemPath().some(i=>i.key===e.key)}isItemDisabled(e){return this.getItemProp(e,"disabled")}isItemFocused(e){return this.focusedItemId===this.getItemId(e)}isItemGroup(e){return le(e.items)}onItemMouseEnter(e){if(this.autoDisplay){let{event:i,processedItem:n}=e;this.itemMouseEnter.emit({originalEvent:i,processedItem:n})}}onItemClick(e,i){this.getItemProp(i,"command",{originalEvent:e,item:i.item}),this.itemClick.emit({originalEvent:e,processedItem:i,isFocus:!0})}static \u0275fac=function(i){return new(i||t)(G(at),G(lt),G(Ee(()=>it)))};static \u0275cmp=k({type:t,selectors:[["p-tieredMenuSub"],["p-tieredmenusub"]],viewQuery:function(i,n){if(i&1&&H(ii,7),i&2){let o;b(o=I())&&(n.sublistViewChild=o.first)}},inputs:{items:"items",itemTemplate:"itemTemplate",root:[2,"root","root",C],autoDisplay:[2,"autoDisplay","autoDisplay",C],autoZIndex:[2,"autoZIndex","autoZIndex",C],baseZIndex:[2,"baseZIndex","baseZIndex",j],popup:[2,"popup","popup",C],menuId:"menuId",ariaLabel:"ariaLabel",ariaLabelledBy:"ariaLabelledBy",level:[2,"level","level",j],focusedItemId:"focusedItemId",activeItemPath:[1,"activeItemPath"],tabindex:[2,"tabindex","tabindex",j],inlineStyles:"inlineStyles"},outputs:{itemClick:"itemClick",itemMouseEnter:"itemMouseEnter",menuFocus:"menuFocus",menuBlur:"menuBlur",menuKeydown:"menuKeydown"},features:[q],decls:3,vars:13,consts:[["sublist",""],["listItem",""],["htmlLabel",""],["role","menu",3,"keydown","focus","blur","ngClass","id","tabindex","ngStyle"],["ngFor","",3,"ngForOf"],["role","separator",3,"style","ngClass",4,"ngIf"],["role","menuitem","pTooltip","",3,"ngStyle","ngClass","class","tooltipOptions",4,"ngIf"],["role","separator",3,"ngClass"],["role","menuitem","pTooltip","",3,"ngStyle","ngClass","tooltipOptions"],[1,"p-tieredmenu-item-content",3,"click","mouseenter"],[4,"ngIf"],[3,"items","itemTemplate","autoDisplay","menuId","activeItemPath","focusedItemId","ariaLabelledBy","level","inlineStyles","itemClick","itemMouseEnter",4,"ngIf"],["pRipple","",3,"target","ngClass",4,"ngIf"],["pRipple","",3,"routerLink","queryParams","routerLinkActive","routerLinkActiveOptions","target","ngClass","fragment","queryParamsHandling","preserveFragment","skipLocationChange","replaceUrl","state",4,"ngIf"],["pRipple","",3,"target","ngClass"],["class","p-tieredmenu-item-icon",3,"ngClass","ngStyle",4,"ngIf"],["class","p-tieredmenu-item-label",4,"ngIf","ngIfElse"],["class","p-menuitem-badge",3,"ngClass",4,"ngIf"],[1,"p-tieredmenu-item-icon",3,"ngClass","ngStyle"],[1,"p-tieredmenu-item-label"],[1,"p-tieredmenu-item-label",3,"innerHTML"],[1,"p-menuitem-badge",3,"ngClass"],[3,"ngClass",4,"ngIf"],[4,"ngTemplateOutlet"],[3,"ngClass"],[3,"data-pc-section","aria-hidden"],["pRipple","",3,"routerLink","queryParams","routerLinkActive","routerLinkActiveOptions","target","ngClass","fragment","queryParamsHandling","preserveFragment","skipLocationChange","replaceUrl","state"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[3,"itemClick","itemMouseEnter","items","itemTemplate","autoDisplay","menuId","activeItemPath","focusedItemId","ariaLabelledBy","level","inlineStyles"]],template:function(i,n){if(i&1){let o=w();p(0,"ul",3,0),y("keydown",function(_){return f(o),h(n.menuKeydown.emit(_))})("focus",function(_){return f(o),h(n.menuFocus.emit(_))})("blur",function(_){return f(o),h(n.menuBlur.emit(_))}),u(2,Di,2,2,"ng-template",4),c()}i&2&&(a("ngClass",Y(10,ni,!n.root,n.root))("id",n.menuId+"_list")("tabindex",n.tabindex)("ngStyle",n.inlineStyles),d("aria-label",n.ariaLabel)("aria-labelledBy",n.ariaLabelledBy)("aria-activedescendant",n.focusedItemId)("aria-orientation","vertical")("data-pc-section","menu"),m(2),a("ngForOf",n.items))},dependencies:[t,F,Q,he,$,se,J,ee,ge,$e,xe,pe,Ce,bt,T],encapsulation:2})}return t})(),it=(()=>{class t extends Z{overlayService;set model(e){this._model=e,this._processedItems=this.createProcessedItems(this._model||[])}get model(){return this._model}popup;style;styleClass;appendTo;breakpoint="960px";autoZIndex=!0;baseZIndex=0;autoDisplay=!0;showTransitionOptions=".12s cubic-bezier(0, 0, 0.2, 1)";hideTransitionOptions=".1s linear";id;ariaLabel;ariaLabelledBy;disabled=!1;tabindex=0;onShow=new v;onHide=new v;rootmenu;containerViewChild;submenuIconTemplate;itemTemplate;templates;container;outsideClickListener;resizeListener;scrollHandler;target;relatedTarget;visible;relativeAlign;dirty=!1;focused=!1;activeItemPath=oe([]);number=oe(0);focusedItemInfo=oe({index:-1,level:0,parentKey:"",item:null});searchValue="";searchTimeout;_processedItems;_model;_componentStyle=B(Lt);matchMediaListener;query;queryMatches;_submenuIconTemplate;_itemTemplate;get visibleItems(){let e=this.activeItemPath().find(i=>i.key===this.focusedItemInfo().parentKey);return e?e.items:this.processedItems}get processedItems(){return(!this._processedItems||!this._processedItems.length)&&(this._processedItems=this.createProcessedItems(this.model||[])),this._processedItems}get focusedItemId(){let e=this.focusedItemInfo();return e.item?.id?e.item.id:e.index!==-1?`${this.id}${le(e.parentKey)?"_"+e.parentKey:""}_${e.index}`:null}constructor(e){super(),this.overlayService=e,We(()=>{let i=this.activeItemPath();le(i)?(this.bindOutsideClickListener(),this.bindResizeListener()):(this.unbindOutsideClickListener(),this.unbindResizeListener())})}ngOnInit(){super.ngOnInit(),this.bindMatchMediaListener(),this.id=this.id||ve("pn_id_")}ngAfterContentInit(){this.templates?.forEach(e=>{switch(e.getType()){case"submenuicon":this._submenuIconTemplate=e.template;break;case"item":this._itemTemplate=e.template;break;default:this._itemTemplate=e.template;break}})}bindMatchMediaListener(){if(X(this.platformId)&&!this.matchMediaListener){let e=window.matchMedia(`(max-width: ${this.breakpoint})`);this.query=e,this.queryMatches=e.matches,this.matchMediaListener=()=>{this.queryMatches=e.matches},e.addEventListener("change",this.matchMediaListener)}}unbindMatchMediaListener(){this.matchMediaListener&&(this.query.removeEventListener("change",this.matchMediaListener),this.matchMediaListener=null)}createProcessedItems(e,i=0,n={},o=""){let l=[];return e&&e.forEach((_,O)=>{let D=(o!==""?o+"_":"")+O,ue={item:_,index:O,level:i,key:D,parent:n,parentKey:o};ue.items=this.createProcessedItems(_.items,i+1,ue,D),l.push(ue)}),l}getItemProp(e,i){return e?Je(e[i]):void 0}getProccessedItemLabel(e){return e?this.getItemLabel(e.item):void 0}getItemLabel(e){return this.getItemProp(e,"label")}isProcessedItemGroup(e){return e&&le(e.items)}isSelected(e){return this.activeItemPath().some(i=>i.key===e.key)}isValidSelectedItem(e){return this.isValidItem(e)&&this.isSelected(e)}isValidItem(e){return!!e&&!this.isItemDisabled(e.item)&&!this.isItemSeparator(e.item)&&this.isItemVisible(e.item)}isItemDisabled(e){return this.getItemProp(e,"disabled")}isItemVisible(e){return this.getItemProp(e,"visible")!==!1}isItemSeparator(e){return this.getItemProp(e,"separator")}isItemMatched(e){return this.isValidItem(e)&&this.getProccessedItemLabel(e).toLocaleLowerCase().startsWith(this.searchValue.toLocaleLowerCase())}isProccessedItemGroup(e){return e&&le(e.items)}onOverlayClick(e){this.popup&&this.overlayService.add({originalEvent:e,target:this.el.nativeElement})}onItemClick(e){let{originalEvent:i,processedItem:n}=e,o=this.isProcessedItemGroup(n),l=Re(n.parent);if(this.isSelected(n)){let{index:O,key:D,level:ue,parentKey:je,item:Le}=n;this.activeItemPath.set(this.activeItemPath().filter(we=>D!==we.key&&D.startsWith(we.key))),this.focusedItemInfo.set({index:O,level:ue,parentKey:je,item:Le}),this.dirty=!0,N(this.rootmenu.sublistViewChild.nativeElement)}else if(o)this.onItemChange(e);else{let O=l?n:this.activeItemPath().find(D=>D.parentKey==="");this.hide(i),this.changeFocusedItemIndex(i,O?O.index:-1),N(this.rootmenu.sublistViewChild.nativeElement)}}onItemMouseEnter(e){ke()?this.onItemChange({event:e,processedItem:e.processedItem,focus:this.autoDisplay},"hover"):this.dirty&&this.onItemChange(e,"hover")}onKeyDown(e){let i=e.metaKey||e.ctrlKey;switch(e.code){case"ArrowDown":this.onArrowDownKey(e);break;case"ArrowUp":this.onArrowUpKey(e);break;case"ArrowLeft":this.onArrowLeftKey(e);break;case"ArrowRight":this.onArrowRightKey(e);break;case"Home":this.onHomeKey(e);break;case"End":this.onEndKey(e);break;case"Space":this.onSpaceKey(e);break;case"Enter":this.onEnterKey(e);break;case"Escape":this.onEscapeKey(e);break;case"Tab":this.onTabKey(e);break;case"PageDown":case"PageUp":case"Backspace":case"ShiftLeft":case"ShiftRight":break;default:!i&&ft(e.key)&&this.searchItems(e,e.key);break}}onArrowDownKey(e){let i=this.focusedItemInfo().index!==-1?this.findNextItemIndex(this.focusedItemInfo().index):this.findFirstFocusedItemIndex();this.changeFocusedItemIndex(e,i),e.preventDefault()}onArrowRightKey(e){let i=this.visibleItems[this.focusedItemInfo().index],n=this.isProccessedItemGroup(i),o=i?.item;n&&(this.onItemChange({originalEvent:e,processedItem:i}),this.focusedItemInfo.set({index:-1,parentKey:i.key,item:o}),this.searchValue="",this.onArrowDownKey(e)),e.preventDefault()}onArrowUpKey(e){if(e.altKey){if(this.focusedItemInfo().index!==-1){let i=this.visibleItems[this.focusedItemInfo().index];!this.isProccessedItemGroup(i)&&this.onItemChange({originalEvent:e,processedItem:i})}this.popup&&this.hide(e,!0),e.preventDefault()}else{let i=this.focusedItemInfo().index!==-1?this.findPrevItemIndex(this.focusedItemInfo().index):this.findLastFocusedItemIndex();this.changeFocusedItemIndex(e,i),e.preventDefault()}}onArrowLeftKey(e){let i=this.visibleItems[this.focusedItemInfo().index],n=this.activeItemPath().find(_=>_.key===i.parentKey);Re(i.parent)||(this.focusedItemInfo.set({index:-1,parentKey:n?n.parentKey:"",item:i.item}),this.searchValue="",this.onArrowDownKey(e));let l=this.activeItemPath().filter(_=>_.parentKey!==this.focusedItemInfo().parentKey);this.activeItemPath.set(l),e.preventDefault()}onHomeKey(e){this.changeFocusedItemIndex(e,this.findFirstItemIndex()),e.preventDefault()}onEndKey(e){this.changeFocusedItemIndex(e,this.findLastItemIndex()),e.preventDefault()}onSpaceKey(e){this.onEnterKey(e)}onEscapeKey(e){this.hide(e,!0),this.focusedItemInfo().index=this.findFirstFocusedItemIndex(),e.preventDefault()}onTabKey(e){if(this.focusedItemInfo().index!==-1){let i=this.visibleItems[this.focusedItemInfo().index];!this.isProccessedItemGroup(i)&&this.onItemChange({originalEvent:e,processedItem:i})}this.hide()}onEnterKey(e){if(this.focusedItemInfo().index!==-1){let i=ce(this.rootmenu.el.nativeElement,`li[id="${`${this.focusedItemId}`}"]`),n=i&&ce(i,'a[data-pc-section="action"]');if(n?n.click():i&&i.click(),!this.popup){let o=this.visibleItems[this.focusedItemInfo().index];!this.isProccessedItemGroup(o)&&(this.focusedItemInfo().index=this.findFirstFocusedItemIndex())}}e.preventDefault()}onItemChange(e,i){let{processedItem:n,isFocus:o}=e;if(Re(n))return;let{index:l,key:_,level:O,parentKey:D,items:ue,item:je}=n,Le=le(ue),we=this.activeItemPath().filter(ot=>ot.parentKey!==D&&ot.parentKey!==_);Le&&we.push(n),this.focusedItemInfo.set({index:l,level:O,parentKey:D,item:je}),Le&&(this.dirty=!0),o&&N(this.rootmenu.sublistViewChild.nativeElement),!(i==="hover"&&this.queryMatches)&&this.activeItemPath.set(we)}onMenuFocus(e){this.focused=!0,this.focusedItemInfo().index===-1&&this.popup}onMenuBlur(e){this.focused=!1,this.focusedItemInfo.set({index:-1,level:0,parentKey:"",item:null}),this.searchValue="",this.dirty=!1}onOverlayAnimationStart(e){switch(e.toState){case"visible":this.popup&&(this.container=e.element,this.moveOnTop(),this.onShow.emit({}),this.appendOverlay(),this.alignOverlay(),this.bindOutsideClickListener(),this.bindResizeListener(),this.bindScrollListener(),N(this.rootmenu.sublistViewChild.nativeElement),this.scrollInView());break;case"void":this.onOverlayHide(),this.onHide.emit({});break}}alignOverlay(){this.relativeAlign?Ae(this.container,this.target):Be(this.container,this.target)}onOverlayAnimationEnd(e){switch(e.toState){case"void":me.clear(e.element);break}}appendOverlay(){this.appendTo&&(this.appendTo==="body"?this.renderer.appendChild(this.document.body,this.container):He(this.appendTo,this.container))}restoreOverlayAppend(){this.container&&this.appendTo&&this.renderer.appendChild(this.el.nativeElement,this.container)}moveOnTop(){this.autoZIndex&&me.set("menu",this.container,this.baseZIndex+this.config.zIndex.menu)}hide(e,i){this.popup&&(this.onHide.emit({}),this.visible=!1),this.activeItemPath.set([]),this.focusedItemInfo.set({index:-1,level:0,parentKey:""}),i&&N(this.relatedTarget||this.target||this.rootmenu.sublistViewChild.nativeElement),this.dirty=!1}toggle(e){this.visible?this.hide(e,!0):this.show(e)}show(e,i){this.popup&&(this.visible=!0,this.target=this.target||e.currentTarget,this.relatedTarget=e.relatedTarget||null,this.relativeAlign=e?.relativeAlign||null),this.focusedItemInfo.set({index:-1,level:0,parentKey:""}),i&&N(this.rootmenu.sublistViewChild.nativeElement),this.cd.markForCheck()}searchItems(e,i){this.searchValue=(this.searchValue||"")+i;let n=-1,o=!1;return this.focusedItemInfo().index!==-1?(n=this.visibleItems.slice(this.focusedItemInfo().index).findIndex(l=>this.isItemMatched(l)),n=n===-1?this.visibleItems.slice(0,this.focusedItemInfo().index).findIndex(l=>this.isItemMatched(l)):n+this.focusedItemInfo().index):n=this.visibleItems.findIndex(l=>this.isItemMatched(l)),n!==-1&&(o=!0),n===-1&&this.focusedItemInfo().index===-1&&(n=this.findFirstFocusedItemIndex()),n!==-1&&this.changeFocusedItemIndex(e,n),this.searchTimeout&&clearTimeout(this.searchTimeout),this.searchTimeout=setTimeout(()=>{this.searchValue="",this.searchTimeout=null},500),o}findLastFocusedItemIndex(){let e=this.findSelectedItemIndex();return e<0?this.findLastItemIndex():e}findLastItemIndex(){return Ye(this.visibleItems,e=>this.isValidItem(e))}findPrevItemIndex(e){let i=e>0?Ye(this.visibleItems.slice(0,e),n=>this.isValidItem(n)):-1;return i>-1?i:e}findNextItemIndex(e){let i=e<this.visibleItems.length-1?this.visibleItems.slice(e+1).findIndex(n=>this.isValidItem(n)):-1;return i>-1?i+e+1:e}findFirstFocusedItemIndex(){let e=this.findSelectedItemIndex();return e<0?this.findFirstItemIndex():e}findFirstItemIndex(){return this.visibleItems.findIndex(e=>this.isValidItem(e))}findSelectedItemIndex(){return this.visibleItems.findIndex(e=>this.isValidSelectedItem(e))}changeFocusedItemIndex(e,i){if(this.focusedItemInfo().index!==i){let n=this.focusedItemInfo();this.focusedItemInfo.set(Oe(de({},n),{item:this.visibleItems[i].item,index:i})),this.scrollInView()}}scrollInView(e=-1){let i=e!==-1?`${this.id}_${e}`:this.focusedItemId,n=ce(this.rootmenu.el.nativeElement,`li[id="${i}"]`);n&&n.scrollIntoView&&n.scrollIntoView({block:"nearest",inline:"nearest"})}bindScrollListener(){this.scrollHandler||(this.scrollHandler=new Ke(this.target,e=>{this.visible&&this.hide(e,!0)})),this.scrollHandler.bindScrollListener()}unbindScrollListener(){this.scrollHandler&&(this.scrollHandler.unbindScrollListener(),this.scrollHandler=null)}bindResizeListener(){X(this.platformId)&&(this.resizeListener||(this.resizeListener=this.renderer.listen(this.document.defaultView,"resize",e=>{ke()||this.hide(e,!0)})))}bindOutsideClickListener(){X(this.platformId)&&(this.outsideClickListener||(this.outsideClickListener=this.renderer.listen(this.document,"click",e=>{let i=this.containerViewChild&&!this.containerViewChild.nativeElement.contains(e.target),n=this.popup?!(this.target&&(this.target===e.target||this.target.contains(e.target))):!0;i&&n&&this.hide()})))}unbindOutsideClickListener(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener),this.outsideClickListener=null)}unbindResizeListener(){this.resizeListener&&(this.resizeListener(),this.resizeListener=null)}onOverlayHide(){this.unbindOutsideClickListener(),this.unbindResizeListener(),this.unbindScrollListener(),this.cd.destroyed||(this.target=null)}ngOnDestroy(){this.popup&&(this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.container&&this.autoZIndex&&me.clear(this.container),this.restoreOverlayAppend(),this.onOverlayHide()),this.unbindMatchMediaListener(),super.ngOnDestroy()}static \u0275fac=function(i){return new(i||t)(G(ze))};static \u0275cmp=k({type:t,selectors:[["p-tieredMenu"],["p-tieredmenu"],["p-tiered-menu"]],contentQueries:function(i,n,o){if(i&1&&(x(o,Pi,4),x(o,Vi,4),x(o,te,4)),i&2){let l;b(l=I())&&(n.submenuIconTemplate=l.first),b(l=I())&&(n.itemTemplate=l.first),b(l=I())&&(n.templates=l)}},viewQuery:function(i,n){if(i&1&&(H($i,5),H(Fi,5)),i&2){let o;b(o=I())&&(n.rootmenu=o.first),b(o=I())&&(n.containerViewChild=o.first)}},inputs:{model:"model",popup:[2,"popup","popup",C],style:"style",styleClass:"styleClass",appendTo:"appendTo",breakpoint:"breakpoint",autoZIndex:[2,"autoZIndex","autoZIndex",C],baseZIndex:[2,"baseZIndex","baseZIndex",j],autoDisplay:[2,"autoDisplay","autoDisplay",C],showTransitionOptions:"showTransitionOptions",hideTransitionOptions:"hideTransitionOptions",id:"id",ariaLabel:"ariaLabel",ariaLabelledBy:"ariaLabelledBy",disabled:[2,"disabled","disabled",C],tabindex:[2,"tabindex","tabindex",j]},outputs:{onShow:"onShow",onHide:"onHide"},features:[W([Lt]),q],decls:1,vars:1,consts:[["container",""],["rootmenu",""],[3,"id","ngClass","class","ngStyle","click",4,"ngIf"],[3,"click","id","ngClass","ngStyle"],[3,"itemClick","menuFocus","menuBlur","menuKeydown","itemMouseEnter","root","items","itemTemplate","menuId","tabindex","ariaLabel","ariaLabelledBy","baseZIndex","autoZIndex","autoDisplay","popup","focusedItemId","activeItemPath"]],template:function(i,n){i&1&&u(0,Ri,4,30,"div",2),i&2&&a("ngIf",!n.popup||n.visible)},dependencies:[F,Q,$,J,Qi,ee,pe,T],encapsulation:2,data:{animation:[Fe("overlayAnimation",[ye(":enter",[Ie({opacity:0,transform:"scaleY(0.8)"}),be("{{showTransitionParams}}")]),ye(":leave",[be("{{hideTransitionParams}}",Ie({opacity:0}))])])]},changeDetection:0})}return t})();var Ni=["content"],qi=["dropdownicon"],ji=["container"],Zi=["defaultbtn"],Ui=["menu"];function Gi(t,r){t&1&&K(0)}function Wi(t,r){if(t&1){let e=w();R(0),p(1,"button",10),y("click",function(n){f(e);let o=s();return h(o.onDefaultButtonClick(n))}),u(2,Gi,1,0,"ng-container",11),c(),z()}if(t&2){let e=s();m(),a("severity",e.severity)("text",e.text)("outlined",e.outlined)("size",e.size)("icon",e.icon)("iconPos",e.iconPos)("disabled",e.disabled)("pAutoFocus",e.autofocus)("pTooltip",e.tooltip)("tooltipOptions",e.tooltipOptions),d("tabindex",e.tabindex)("aria-label",(e.buttonProps==null?null:e.buttonProps.ariaLabel)||e.label),m(),a("ngTemplateOutlet",e.contentTemplate||e._contentTemplate)}}function Yi(t,r){if(t&1){let e=w();p(0,"button",12,3),y("click",function(n){f(e);let o=s();return h(o.onDefaultButtonClick(n))}),c()}if(t&2){let e=s();a("severity",e.severity)("text",e.text)("outlined",e.outlined)("size",e.size)("icon",e.icon)("iconPos",e.iconPos)("label",e.label)("disabled",e.buttonDisabled)("pAutoFocus",e.autofocus)("pTooltip",e.tooltip)("tooltipOptions",e.tooltipOptions),d("tabindex",e.tabindex)("aria-label",e.buttonProps==null?null:e.buttonProps.ariaLabel)}}function Ji(t,r){if(t&1&&g(0,"span"),t&2){let e=s();S(e.dropdownIcon)}}function Xi(t,r){t&1&&g(0,"ChevronDownIcon")}function en(t,r){}function tn(t,r){t&1&&u(0,en,0,0,"ng-template")}function nn(t,r){if(t&1&&(R(0),u(1,Xi,1,0,"ChevronDownIcon",8)(2,tn,1,0,null,11),z()),t&2){let e=s();m(),a("ngIf",!e.dropdownIconTemplate&&!e._dropdownIconTemplate),m(),a("ngTemplateOutlet",e.dropdownIconTemplate||e._dropdownIconTemplate)}}var on=({dt:t})=>`
.p-splitbutton {
    display: inline-flex;
    position: relative;
    border-radius: ${t("splitbutton.border.radius")};
}

.p-splitbutton-button.p-button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
    border-right: 0 none;
}

.p-splitbutton-button.p-button:focus-visible,
.p-splitbutton-dropdown.p-button:focus-visible {
    z-index: 1;
}

.p-splitbutton-button.p-button:not(:disabled):hover,
.p-splitbutton-button.p-button:not(:disabled):active {
    border-right: 0 none;
}

.p-splitbutton-dropdown.p-button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
}

.p-splitbutton .p-menu {
    min-width: 100%;
}

.p-splitbutton-fluid {
    display: flex;
}

.p-splitbutton-rounded .p-splitbutton-dropdown {
    border-start-end-radius: ${t("splitbutton.rounded.border.radius")};
    border-end-end-radius: ${t("splitbutton.rounded.border.radius")};
}

.p-splitbutton-rounded > .p-splitbutton-button {
    border-start-start-radius: ${t("splitbutton.rounded.border.radius")};
    border-end-start-radius: ${t("splitbutton.rounded.border.radius")};
}

.p-splitbutton-raised {
    box-shadow: ${t("splitbutton.raised.shadow")};
}
`,rn={root:({props:t})=>["p-splitbutton p-component",{"p-splitbutton-raised":t.raised,"p-splitbutton-rounded":t.rounded,"p-splitbutton-fluid":t.fluid}],pcButton:"p-splitbutton-button",pcDropdown:"p-splitbutton-dropdown"},Pt=(()=>{class t extends ie{name="splitbutton";theme=on;classes=rn;static \u0275fac=(()=>{let e;return function(n){return(e||(e=A(t)))(n||t)}})();static \u0275prov=U({token:t,factory:t.\u0275fac})}return t})();var an=(()=>{class t extends Z{model;severity;raised=!1;rounded=!1;text=!1;outlined=!1;size=null;plain=!1;icon;iconPos="left";label;tooltip;tooltipOptions;style;styleClass;menuStyle;menuStyleClass;dropdownIcon;appendTo;dir;expandAriaLabel;showTransitionOptions=".12s cubic-bezier(0, 0, 0.2, 1)";hideTransitionOptions=".1s linear";buttonProps;menuButtonProps;autofocus;set disabled(e){this._disabled=e,this._buttonDisabled=e,this.menuButtonDisabled=e}get disabled(){return this._disabled}tabindex;set menuButtonDisabled(e){this.disabled?this._menuButtonDisabled=this.disabled:this._menuButtonDisabled=e}get menuButtonDisabled(){return this._menuButtonDisabled}set buttonDisabled(e){this.disabled?this.buttonDisabled=this.disabled:this._buttonDisabled=e}get buttonDisabled(){return this._buttonDisabled}onClick=new v;onMenuHide=new v;onMenuShow=new v;onDropdownClick=new v;containerViewChild;buttonViewChild;menu;contentTemplate;dropdownIconTemplate;templates;ariaId;isExpanded=oe(!1);_disabled;_buttonDisabled;_menuButtonDisabled;_componentStyle=B(Pt);_contentTemplate;_dropdownIconTemplate;ngOnInit(){super.ngOnInit(),this.ariaId=ve("pn_id_")}ngAfterContentInit(){this.templates?.forEach(e=>{switch(e.getType()){case"content":this._contentTemplate=e.template;break;case"dropdownicon":this._dropdownIconTemplate=e.template;break;default:this._contentTemplate=e.template;break}})}get containerClass(){let e={"p-splitbutton p-component":!0,"p-splitbutton-raised":this.raised,"p-splitbutton-rounded":this.rounded,"p-splitbutton-outlined":this.outlined,"p-splitbutton-text":this.text,[`p-splitbutton-${this.size==="small"?"sm":"lg"}`]:this.size};return de({},e)}onDefaultButtonClick(e){this.onClick.emit(e),this.menu.hide()}onDropdownButtonClick(e){this.onDropdownClick.emit(e),this.menu?.toggle({currentTarget:this.containerViewChild?.nativeElement,relativeAlign:this.appendTo==null})}onDropdownButtonKeydown(e){(e.code==="ArrowDown"||e.code==="ArrowUp")&&(this.onDropdownButtonClick(),e.preventDefault())}onHide(){this.isExpanded.set(!1),this.onMenuHide.emit()}onShow(){this.isExpanded.set(!0),this.onMenuShow.emit()}static \u0275fac=(()=>{let e;return function(n){return(e||(e=A(t)))(n||t)}})();static \u0275cmp=k({type:t,selectors:[["p-splitbutton"],["p-splitButton"],["p-split-button"]],contentQueries:function(i,n,o){if(i&1&&(x(o,Ni,4),x(o,qi,4),x(o,te,4)),i&2){let l;b(l=I())&&(n.contentTemplate=l.first),b(l=I())&&(n.dropdownIconTemplate=l.first),b(l=I())&&(n.templates=l)}},viewQuery:function(i,n){if(i&1&&(H(ji,5),H(Zi,5),H(Ui,5)),i&2){let o;b(o=I())&&(n.containerViewChild=o.first),b(o=I())&&(n.buttonViewChild=o.first),b(o=I())&&(n.menu=o.first)}},inputs:{model:"model",severity:"severity",raised:[2,"raised","raised",C],rounded:[2,"rounded","rounded",C],text:[2,"text","text",C],outlined:[2,"outlined","outlined",C],size:"size",plain:[2,"plain","plain",C],icon:"icon",iconPos:"iconPos",label:"label",tooltip:"tooltip",tooltipOptions:"tooltipOptions",style:"style",styleClass:"styleClass",menuStyle:"menuStyle",menuStyleClass:"menuStyleClass",dropdownIcon:"dropdownIcon",appendTo:"appendTo",dir:"dir",expandAriaLabel:"expandAriaLabel",showTransitionOptions:"showTransitionOptions",hideTransitionOptions:"hideTransitionOptions",buttonProps:"buttonProps",menuButtonProps:"menuButtonProps",autofocus:[2,"autofocus","autofocus",C],disabled:[2,"disabled","disabled",C],tabindex:[2,"tabindex","tabindex",j],menuButtonDisabled:"menuButtonDisabled",buttonDisabled:"buttonDisabled"},outputs:{onClick:"onClick",onMenuHide:"onMenuHide",onMenuShow:"onMenuShow",onDropdownClick:"onDropdownClick"},features:[W([Pt]),q],decls:10,vars:26,consts:[["container",""],["defaultButton",""],["menu",""],["defaultbtn",""],[3,"ngClass","ngStyle"],[4,"ngIf","ngIfElse"],["type","button","pButton","","pRipple","",1,"p-splitbutton-dropdown","p-button-icon-only",3,"click","keydown","size","severity","text","outlined","disabled"],[3,"class",4,"ngIf"],[4,"ngIf"],[3,"onHide","onShow","id","popup","model","styleClass","appendTo","showTransitionOptions","hideTransitionOptions"],["type","button","pButton","","pRipple","",1,"p-splitbutton-button",3,"click","severity","text","outlined","size","icon","iconPos","disabled","pAutoFocus","pTooltip","tooltipOptions"],[4,"ngTemplateOutlet"],["type","button","pButton","","pRipple","",1,"p-splitbutton-button",3,"click","severity","text","outlined","size","icon","iconPos","label","disabled","pAutoFocus","pTooltip","tooltipOptions"]],template:function(i,n){if(i&1){let o=w();p(0,"div",4,0),u(2,Wi,3,13,"ng-container",5)(3,Yi,2,13,"ng-template",null,1,L),p(5,"button",6),y("click",function(_){return f(o),h(n.onDropdownButtonClick(_))})("keydown",function(_){return f(o),h(n.onDropdownButtonKeydown(_))}),u(6,Ji,1,2,"span",7)(7,nn,3,2,"ng-container",8),c(),p(8,"p-tieredMenu",9,2),y("onHide",function(){return f(o),h(n.onHide())})("onShow",function(){return f(o),h(n.onShow())}),c()()}if(i&2){let o=E(4);S(n.styleClass),a("ngClass",n.containerClass)("ngStyle",n.style),m(2),a("ngIf",n.contentTemplate||n._contentTemplate)("ngIfElse",o),m(3),a("size",n.size)("severity",n.severity)("text",n.text)("outlined",n.outlined)("disabled",n.menuButtonDisabled),d("aria-label",(n.menuButtonProps==null?null:n.menuButtonProps.ariaLabel)||n.expandAriaLabel)("aria-haspopup",(n.menuButtonProps==null?null:n.menuButtonProps.ariaHasPopup)||!0)("aria-expanded",(n.menuButtonProps==null?null:n.menuButtonProps.ariaExpanded)||n.isExpanded())("aria-controls",(n.menuButtonProps==null?null:n.menuButtonProps.ariaControls)||n.ariaId),m(),a("ngIf",n.dropdownIcon),m(),a("ngIf",!n.dropdownIcon),m(),fe(n.menuStyle),a("id",n.ariaId)("popup",!0)("model",n.model)("styleClass",n.menuStyleClass)("appendTo",n.appendTo)("showTransitionOptions",n.showTransitionOptions)("hideTransitionOptions",n.hideTransitionOptions)}},dependencies:[F,Q,$,se,J,vt,it,gt,It,xe,pe,Ce,T],encapsulation:2,changeDetection:0})}return t})(),Vt=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=ae({type:t});static \u0275inj=ne({imports:[an,T,T]})}return t})();var sn=["pMenuItemContent",""],Ft=t=>({"p-disabled":t}),Qe=t=>({$implicit:t}),ln=()=>({exact:!1});function mn(t,r){t&1&&K(0)}function pn(t,r){if(t&1&&(p(0,"a",6),u(1,mn,1,0,"ng-container",7),c()),t&2){let e=s(2),i=E(4);a("target",e.item.target)("ngClass",V(9,Ft,e.item.disabled)),d("title",e.item.title)("href",e.item.url||null,re)("data-automationid",e.item.automationId)("tabindex",-1)("data-pc-section","action"),m(),a("ngTemplateOutlet",i)("ngTemplateOutletContext",V(11,Qe,e.item))}}function un(t,r){t&1&&K(0)}function cn(t,r){if(t&1&&(p(0,"a",8),u(1,un,1,0,"ng-container",7),c()),t&2){let e=s(2),i=E(4);a("routerLink",e.item.routerLink)("queryParams",e.item.queryParams)("routerLinkActiveOptions",e.item.routerLinkActiveOptions||Ve(17,ln))("target",e.item.target)("ngClass",V(18,Ft,e.item.disabled))("fragment",e.item.fragment)("queryParamsHandling",e.item.queryParamsHandling)("preserveFragment",e.item.preserveFragment)("skipLocationChange",e.item.skipLocationChange)("replaceUrl",e.item.replaceUrl)("state",e.item.state),d("data-automationid",e.item.automationId)("tabindex",-1)("data-pc-section","action")("title",e.item.title),m(),a("ngTemplateOutlet",i)("ngTemplateOutletContext",V(20,Qe,e.item))}}function dn(t,r){if(t&1&&(R(0),u(1,pn,2,13,"a",4)(2,cn,2,22,"a",5),z()),t&2){let e=s();m(),a("ngIf",!(e.item!=null&&e.item.routerLink)),m(),a("ngIf",e.item==null?null:e.item.routerLink)}}function _n(t,r){}function fn(t,r){t&1&&u(0,_n,0,0,"ng-template")}function hn(t,r){if(t&1&&(R(0),u(1,fn,1,0,null,7),z()),t&2){let e=s();m(),a("ngTemplateOutlet",e.itemTemplate)("ngTemplateOutletContext",V(2,Qe,e.item))}}function gn(t,r){if(t&1&&g(0,"span",12),t&2){let e=s(2);S(e.item.iconClass),a("ngClass",e.item.icon)("ngStyle",e.item.iconStyle)}}function bn(t,r){if(t&1&&(p(0,"span",13),M(1),c()),t&2){let e=s(2);m(),P(e.item.label)}}function In(t,r){if(t&1&&(g(0,"span",14),Ue(1,"safeHtml")),t&2){let e=s(2);a("innerHTML",Ge(1,1,e.item.label),_e)}}function yn(t,r){if(t&1&&g(0,"p-badge",15),t&2){let e=s(2);a("styleClass",e.item.badgeStyleClass)("value",e.item.badge)}}function vn(t,r){if(t&1&&u(0,gn,1,4,"span",9)(1,bn,2,1,"span",10)(2,In,2,3,"ng-template",null,1,L)(4,yn,1,2,"p-badge",11),t&2){let e=E(3),i=s();a("ngIf",i.item.icon),m(),a("ngIf",i.item.escape!==!1)("ngIfElse",e),m(3),a("ngIf",i.item.badge)}}var xn=["start"],Cn=["end"],Tn=["header"],wn=["item"],Mn=["submenuheader"],kn=["list"],Sn=["container"],Ln=t=>({"p-menu p-component":!0,"p-menu-overlay":t}),On=(t,r)=>({showTransitionParams:t,hideTransitionParams:r}),En=t=>({value:"visible",params:t}),Dn=(t,r)=>({"p-hidden":t,flex:r}),Bt=(t,r)=>({"p-focus":t,"p-disabled":r});function Pn(t,r){t&1&&K(0)}function Vn(t,r){if(t&1&&(p(0,"div",9),u(1,Pn,1,0,"ng-container",10),c()),t&2){let e,i=s(2);d("data-pc-section","start"),m(),a("ngTemplateOutlet",(e=i.startTemplate)!==null&&e!==void 0?e:i._startTemplate)}}function $n(t,r){t&1&&g(0,"li",14)}function Fn(t,r){if(t&1&&(p(0,"span"),M(1),c()),t&2){let e=s(3).$implicit;m(),P(e.label)}}function Bn(t,r){if(t&1&&(g(0,"span",18),Ue(1,"safeHtml")),t&2){let e=s(3).$implicit;a("innerHTML",Ge(1,1,e.label),_e)}}function An(t,r){if(t&1&&(R(0),u(1,Fn,2,1,"span",17)(2,Bn,2,3,"ng-template",null,2,L),z()),t&2){let e=E(3),i=s(2).$implicit;m(),a("ngIf",i.escape!==!1)("ngIfElse",e)}}function Hn(t,r){t&1&&K(0)}function Rn(t,r){if(t&1&&(p(0,"li",15),u(1,An,4,2,"ng-container",7)(2,Hn,1,0,"ng-container",16),c()),t&2){let e,i=s(),n=i.$implicit,o=i.index,l=s(3);a("ngClass",Y(7,Dn,n.visible===!1,n.visible))("tooltipOptions",n.tooltipOptions),d("data-automationid",n.automationId)("id",l.menuitemId(n,l.id,o)),m(),a("ngIf",!l.submenuHeaderTemplate&&!l._submenuHeaderTemplate),m(),a("ngTemplateOutlet",(e=l.submenuHeaderTemplate)!==null&&e!==void 0?e:l._submenuHeaderTemplate)("ngTemplateOutletContext",V(10,Qe,n))}}function zn(t,r){t&1&&g(0,"li",14)}function Kn(t,r){if(t&1){let e=w();p(0,"li",20),y("onMenuItemClick",function(n){f(e);let o=s(),l=o.$implicit,_=o.index,O=s().index,D=s(3);return h(D.itemClick(n,D.menuitemId(l,D.id,O,_)))}),c()}if(t&2){let e,i=s(),n=i.$implicit,o=i.index,l=s().index,_=s(3);S(n.styleClass),a("pMenuItemContent",n)("itemTemplate",(e=_.itemTemplate)!==null&&e!==void 0?e:_._itemTemplate)("ngClass",Y(13,Bt,_.focusedOptionId()&&_.menuitemId(n,_.id,l,o)===_.focusedOptionId(),_.disabled(n.disabled)))("ngStyle",n.style)("tooltipOptions",n.tooltipOptions),d("data-pc-section","menuitem")("aria-label",_.label(n.label))("data-p-focused",_.isItemFocused(_.menuitemId(n,_.id,l,o)))("data-p-disabled",_.disabled(n.disabled))("aria-disabled",_.disabled(n.disabled))("id",_.menuitemId(n,_.id,l,o))}}function Qn(t,r){if(t&1&&u(0,zn,1,0,"li",12)(1,Kn,1,16,"li",19),t&2){let e=r.$implicit,i=s().$implicit;a("ngIf",e.separator&&(e.visible!==!1||i.visible!==!1)),m(),a("ngIf",!e.separator&&e.visible!==!1&&(e.visible!==void 0||i.visible!==!1))}}function Nn(t,r){if(t&1&&u(0,$n,1,0,"li",12)(1,Rn,3,12,"li",13)(2,Qn,2,2,"ng-template",11),t&2){let e=r.$implicit;a("ngIf",e.separator&&e.visible!==!1),m(),a("ngIf",!e.separator),m(),a("ngForOf",e.items)}}function qn(t,r){if(t&1&&u(0,Nn,3,3,"ng-template",11),t&2){let e=s(2);a("ngForOf",e.model)}}function jn(t,r){t&1&&g(0,"li",14)}function Zn(t,r){if(t&1){let e=w();p(0,"li",20),y("onMenuItemClick",function(n){f(e);let o=s(),l=o.$implicit,_=o.index,O=s(3);return h(O.itemClick(n,O.menuitemId(l,O.id,_)))}),c()}if(t&2){let e,i=s(),n=i.$implicit,o=i.index,l=s(3);S(n.styleClass),a("pMenuItemContent",n)("itemTemplate",(e=l.itemTemplate)!==null&&e!==void 0?e:l._itemTemplate)("ngClass",Y(13,Bt,l.focusedOptionId()&&l.menuitemId(n,l.id,o)===l.focusedOptionId(),l.disabled(n.disabled)))("ngStyle",n.style)("tooltipOptions",n.tooltipOptions),d("data-pc-section","menuitem")("aria-label",l.label(n.label))("data-p-focused",l.isItemFocused(l.menuitemId(n,l.id,o)))("data-p-disabled",l.disabled(n.disabled))("aria-disabled",l.disabled(n.disabled))("id",l.menuitemId(n,l.id,o))}}function Un(t,r){if(t&1&&u(0,jn,1,0,"li",12)(1,Zn,1,16,"li",19),t&2){let e=r.$implicit;a("ngIf",e.separator&&e.visible!==!1),m(),a("ngIf",!e.separator&&e.visible!==!1)}}function Gn(t,r){if(t&1&&u(0,Un,2,2,"ng-template",11),t&2){let e=s(2);a("ngForOf",e.model)}}function Wn(t,r){t&1&&K(0)}function Yn(t,r){if(t&1&&(p(0,"div",21),u(1,Wn,1,0,"ng-container",10),c()),t&2){let e,i=s(2);d("data-pc-section","end"),m(),a("ngTemplateOutlet",(e=i.endTemplate)!==null&&e!==void 0?e:i._endTemplate)}}function Jn(t,r){if(t&1){let e=w();p(0,"div",4,0),y("click",function(n){f(e);let o=s();return h(o.onOverlayClick(n))})("@overlayAnimation.start",function(n){f(e);let o=s();return h(o.onOverlayAnimationStart(n))})("@overlayAnimation.done",function(n){f(e);let o=s();return h(o.onOverlayAnimationEnd(n))}),u(2,Vn,2,2,"div",5),p(3,"ul",6,1),y("focus",function(n){f(e);let o=s();return h(o.onListFocus(n))})("blur",function(n){f(e);let o=s();return h(o.onListBlur(n))})("keydown",function(n){f(e);let o=s();return h(o.onListKeyDown(n))}),u(5,qn,1,1,null,7)(6,Gn,1,1,null,7),c(),u(7,Yn,2,2,"div",8),c()}if(t&2){let e,i,n=s();S(n.styleClass),a("ngClass",V(18,Ln,n.popup))("ngStyle",n.style)("@overlayAnimation",V(23,En,Y(20,On,n.showTransitionOptions,n.hideTransitionOptions)))("@.disabled",n.popup!==!0),d("data-pc-name","menu")("id",n.id),m(2),a("ngIf",(e=n.startTemplate)!==null&&e!==void 0?e:n._startTemplate),m(),d("id",n.id+"_list")("tabindex",n.getTabIndexValue())("data-pc-section","menu")("aria-activedescendant",n.activedescendant())("aria-label",n.ariaLabel)("aria-labelledBy",n.ariaLabelledBy),m(2),a("ngIf",n.hasSubMenu()),m(),a("ngIf",!n.hasSubMenu()),m(),a("ngIf",(i=n.endTemplate)!==null&&i!==void 0?i:n._endTemplate)}}var Xn=({dt:t})=>`
.p-menu {
    background: ${t("menu.background")};
    color: ${t("menu.color")};
    border: 1px solid ${t("menu.border.color")};
    border-radius: ${t("menu.border.radius")};
    min-width: 12.5rem;
}

.p-menu-list {
    margin: 0;
    padding: ${t("menu.list.padding")};
    outline: 0 none;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: ${t("menu.list.gap")};
}

.p-menu-item-content {
    transition: background ${t("menu.transition.duration")}, color ${t("menu.transition.duration")};
    border-radius: ${t("menu.item.border.radius")};
    color: ${t("menu.item.color")};
}

.p-menu-item-link {
    cursor: pointer;
    display: flex;
    align-items: center;
    text-decoration: none;
    overflow: hidden;
    position: relative;
    color: inherit;
    padding: ${t("menu.item.padding")};
    gap: ${t("menu.item.gap")};
    user-select: none;
    outline: 0 none;
}

.p-menu-item-label {
    line-height: 1;
}

.p-menu-item-icon {
    color: ${t("menu.item.icon.color")};
}

.p-menu-item.p-focus .p-menu-item-content {
    color: ${t("menu.item.focus.color")};
    background: ${t("menu.item.focus.background")};
}

.p-menu-item.p-focus .p-menu-item-icon {
    color: ${t("menu.item.icon.focus.color")};
}

.p-menu-item:not(.p-disabled) .p-menu-item-content:hover {
    color: ${t("menu.item.focus.color")};
    background: ${t("menu.item.focus.background")};
}

.p-menu-item:not(.p-disabled) .p-menu-item-content:hover .p-menu-item-icon {
    color: ${t("menu.item.icon.focus.color")};
}

.p-menu-overlay {
    box-shadow: ${t("menu.shadow")};
}

.p-menu-submenu-label {
    background: ${t("menu.submenu.label.background")};
    padding: ${t("menu.submenu.label.padding")};
    color: ${t("menu.submenu.label.color")};
    font-weight: ${t("menu.submenu.label.font.weight")};
}

.p-menu-separator {
    border-top: 1px solid ${t("menu.separator.border.color")};
}

/* For PrimeNG */
.p-menu-overlay {
    position: absolute;
}
`,eo={root:({props:t})=>["p-menu p-component",{"p-menu-overlay":t.popup}],start:"p-menu-start",list:"p-menu-list",submenuLabel:"p-menu-submenu-label",separator:"p-menu-separator",end:"p-menu-end",item:({instance:t})=>["p-menu-item",{"p-focus":t.id===t.focusedOptionId,"p-disabled":t.disabled()}],itemContent:"p-menu-item-content",itemLink:"p-menu-item-link",itemIcon:"p-menu-item-icon",itemLabel:"p-menu-item-label"},$t=(()=>{class t extends ie{name="menu";theme=Xn;classes=eo;static \u0275fac=(()=>{let e;return function(n){return(e||(e=A(t)))(n||t)}})();static \u0275prov=U({token:t,factory:t.\u0275fac})}return t})();var At=(()=>{class t{platformId;sanitizer;constructor(e,i){this.platformId=e,this.sanitizer=i}transform(e){return!e||!X(this.platformId)?e:this.sanitizer.bypassSecurityTrustHtml(e)}static \u0275fac=function(i){return new(i||t)(G(st,16),G(ct,16))};static \u0275pipe=mt({name:"safeHtml",type:t,pure:!0})}return t})(),to=(()=>{class t{item;itemTemplate;onMenuItemClick=new v;menu;constructor(e){this.menu=e}onItemClick(e,i){this.onMenuItemClick.emit({originalEvent:e,item:i})}static \u0275fac=function(i){return new(i||t)(G(Ee(()=>Ne)))};static \u0275cmp=k({type:t,selectors:[["","pMenuItemContent",""]],inputs:{item:[0,"pMenuItemContent","item"],itemTemplate:"itemTemplate"},outputs:{onMenuItemClick:"onMenuItemClick"},attrs:sn,decls:5,vars:3,consts:[["itemContent",""],["htmlLabel",""],[1,"p-menu-item-content",3,"click"],[4,"ngIf"],["class","p-menu-item-link","pRipple","",3,"target","ngClass",4,"ngIf"],["routerLinkActive","p-menu-item-link-active","class","p-menu-item-link","pRipple","",3,"routerLink","queryParams","routerLinkActiveOptions","target","ngClass","fragment","queryParamsHandling","preserveFragment","skipLocationChange","replaceUrl","state",4,"ngIf"],["pRipple","",1,"p-menu-item-link",3,"target","ngClass"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["routerLinkActive","p-menu-item-link-active","pRipple","",1,"p-menu-item-link",3,"routerLink","queryParams","routerLinkActiveOptions","target","ngClass","fragment","queryParamsHandling","preserveFragment","skipLocationChange","replaceUrl","state"],["class","p-menu-item-icon",3,"ngClass","class","ngStyle",4,"ngIf"],["class","p-menu-item-label",4,"ngIf","ngIfElse"],[3,"styleClass","value",4,"ngIf"],[1,"p-menu-item-icon",3,"ngClass","ngStyle"],[1,"p-menu-item-label"],[1,"p-menu-item-label",3,"innerHTML"],[3,"styleClass","value"]],template:function(i,n){if(i&1){let o=w();p(0,"div",2),y("click",function(_){return f(o),h(n.onItemClick(_,n.item))}),u(1,dn,3,2,"ng-container",3)(2,hn,2,4,"ng-container",3)(3,vn,5,4,"ng-template",null,0,L),c()}i&2&&(d("data-pc-section","content"),m(),a("ngIf",!n.itemTemplate),m(),a("ngIf",n.itemTemplate))},dependencies:[F,Q,$,se,J,ee,ge,$e,xe,pe,Xe,yt,T,At],encapsulation:2})}return t})(),Ne=(()=>{class t extends Z{overlayService;model;popup;style;styleClass;appendTo;autoZIndex=!0;baseZIndex=0;showTransitionOptions=".12s cubic-bezier(0, 0, 0.2, 1)";hideTransitionOptions=".1s linear";ariaLabel;ariaLabelledBy;id;tabindex=0;onShow=new v;onHide=new v;onBlur=new v;onFocus=new v;listViewChild;containerViewChild;container;scrollHandler;documentClickListener;documentResizeListener;preventDocumentDefault;target;visible;focusedOptionId=ut(()=>this.focusedOptionIndex()!==-1?this.focusedOptionIndex():null);focusedOptionIndex=oe(-1);selectedOptionIndex=oe(-1);focused=!1;overlayVisible=!1;relativeAlign;_componentStyle=B($t);constructor(e){super(),this.overlayService=e,this.id=this.id||ve("pn_id_")}toggle(e){this.visible?this.hide():this.show(e),this.preventDocumentDefault=!0}show(e){this.target=e.currentTarget,this.relativeAlign=e.relativeAlign,this.visible=!0,this.preventDocumentDefault=!0,this.overlayVisible=!0,this.cd.markForCheck()}ngOnInit(){super.ngOnInit(),this.popup||this.bindDocumentClickListener()}startTemplate;_startTemplate;endTemplate;_endTemplate;headerTemplate;_headerTemplate;itemTemplate;_itemTemplate;submenuHeaderTemplate;_submenuHeaderTemplate;templates;ngAfterContentInit(){this.templates?.forEach(e=>{switch(e.getType()){case"start":this._startTemplate=e.template;break;case"end":this._endTemplate=e.template;break;case"item":this._itemTemplate=e.template;break;case"submenuheader":this._submenuHeaderTemplate=e.template;break;default:this._itemTemplate=e.template;break}})}getTabIndexValue(){return this.tabindex!==void 0?this.tabindex.toString():null}onOverlayAnimationStart(e){switch(e.toState){case"visible":this.popup&&(this.container=e.element,this.moveOnTop(),this.onShow.emit({}),this.appendOverlay(),this.alignOverlay(),this.bindDocumentClickListener(),this.bindDocumentResizeListener(),this.bindScrollListener(),N(this.listViewChild.nativeElement));break;case"void":this.onOverlayHide(),this.onHide.emit({});break}}onOverlayAnimationEnd(e){switch(e.toState){case"void":this.autoZIndex&&me.clear(e.element);break}}alignOverlay(){this.relativeAlign?Ae(this.container,this.target):Be(this.container,this.target)}appendOverlay(){this.appendTo&&(this.appendTo==="body"?this.renderer.appendChild(this.document.body,this.container):He(this.appendTo,this.container))}restoreOverlayAppend(){this.container&&this.appendTo&&this.renderer.appendChild(this.el.nativeElement,this.container)}moveOnTop(){this.autoZIndex&&me.set("menu",this.container,this.baseZIndex+this.config.zIndex.menu)}hide(){this.visible=!1,this.relativeAlign=!1,this.cd.markForCheck()}onWindowResize(){this.visible&&!ke()&&this.hide()}menuitemId(e,i,n,o){return e?.id??`${i}_${n}${o!==void 0?"_"+o:""}`}isItemFocused(e){return this.focusedOptionId()===e}label(e){return typeof e=="function"?e():e}disabled(e){return typeof e=="function"?e():typeof e>"u"?!1:e}activedescendant(){return this.focused?this.focusedOptionId():void 0}onListFocus(e){this.focused||(this.focused=!0,this.onFocus.emit(e))}onListBlur(e){this.focused&&(this.focused=!1,this.changeFocusedOptionIndex(-1),this.selectedOptionIndex.set(-1),this.focusedOptionIndex.set(-1),this.onBlur.emit(e))}onListKeyDown(e){switch(e.code){case"ArrowDown":this.onArrowDownKey(e);break;case"ArrowUp":this.onArrowUpKey(e);break;case"Home":this.onHomeKey(e);break;case"End":this.onEndKey(e);break;case"Enter":this.onEnterKey(e);break;case"NumpadEnter":this.onEnterKey(e);break;case"Space":this.onSpaceKey(e);break;case"Escape":case"Tab":this.popup&&(N(this.target),this.hide()),this.overlayVisible&&this.hide();break;default:break}}onArrowDownKey(e){let i=this.findNextOptionIndex(this.focusedOptionIndex());this.changeFocusedOptionIndex(i),e.preventDefault()}onArrowUpKey(e){if(e.altKey&&this.popup)N(this.target),this.hide(),e.preventDefault();else{let i=this.findPrevOptionIndex(this.focusedOptionIndex());this.changeFocusedOptionIndex(i),e.preventDefault()}}onHomeKey(e){this.changeFocusedOptionIndex(0),e.preventDefault()}onEndKey(e){this.changeFocusedOptionIndex(Me(this.containerViewChild.nativeElement,'li[data-pc-section="menuitem"][data-p-disabled="false"]').length-1),e.preventDefault()}onEnterKey(e){let i=ce(this.containerViewChild.nativeElement,`li[id="${`${this.focusedOptionIndex()}`}"]`),n=i&&ce(i,'a[data-pc-section="action"]');this.popup&&N(this.target),n?n.click():i&&i.click(),e.preventDefault()}onSpaceKey(e){this.onEnterKey(e)}findNextOptionIndex(e){let n=[...Me(this.containerViewChild.nativeElement,'li[data-pc-section="menuitem"][data-p-disabled="false"]')].findIndex(o=>o.id===e);return n>-1?n+1:0}findPrevOptionIndex(e){let n=[...Me(this.containerViewChild.nativeElement,'li[data-pc-section="menuitem"][data-p-disabled="false"]')].findIndex(o=>o.id===e);return n>-1?n-1:0}changeFocusedOptionIndex(e){let i=Me(this.containerViewChild.nativeElement,'li[data-pc-section="menuitem"][data-p-disabled="false"]');if(i.length>0){let n=e>=i.length?i.length-1:e<0?0:e;n>-1&&this.focusedOptionIndex.set(i[n].getAttribute("id"))}}itemClick(e,i){let{originalEvent:n,item:o}=e;if(this.focused||(this.focused=!0,this.onFocus.emit()),o.disabled){n.preventDefault();return}!o.url&&!o.routerLink&&n.preventDefault(),o.command&&o.command({originalEvent:n,item:o}),this.popup&&this.hide(),!this.popup&&this.focusedOptionIndex()!==i&&this.focusedOptionIndex.set(i)}onOverlayClick(e){this.popup&&this.overlayService.add({originalEvent:e,target:this.el.nativeElement}),this.preventDocumentDefault=!0}bindDocumentClickListener(){if(!this.documentClickListener&&X(this.platformId)){let e=this.el?this.el.nativeElement.ownerDocument:"document";this.documentClickListener=this.renderer.listen(e,"click",i=>{let n=this.containerViewChild?.nativeElement&&!this.containerViewChild?.nativeElement.contains(i.target),o=!(this.target&&(this.target===i.target||this.target.contains(i.target)));!this.popup&&n&&o&&this.onListBlur(i),this.preventDocumentDefault&&this.overlayVisible&&n&&o&&(this.hide(),this.preventDocumentDefault=!1)})}}unbindDocumentClickListener(){this.documentClickListener&&(this.documentClickListener(),this.documentClickListener=null)}bindDocumentResizeListener(){if(!this.documentResizeListener&&X(this.platformId)){let e=this.document.defaultView;this.documentResizeListener=this.renderer.listen(e,"resize",this.onWindowResize.bind(this))}}unbindDocumentResizeListener(){this.documentResizeListener&&(this.documentResizeListener(),this.documentResizeListener=null)}bindScrollListener(){!this.scrollHandler&&X(this.platformId)&&(this.scrollHandler=new Ke(this.target,()=>{this.visible&&this.hide()})),this.scrollHandler?.bindScrollListener()}unbindScrollListener(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()}onOverlayHide(){this.unbindDocumentClickListener(),this.unbindDocumentResizeListener(),this.unbindScrollListener(),this.preventDocumentDefault=!1,this.cd.destroyed||(this.target=null)}ngOnDestroy(){this.popup&&(this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.container&&this.autoZIndex&&me.clear(this.container),this.restoreOverlayAppend(),this.onOverlayHide()),this.popup||this.unbindDocumentClickListener(),super.ngOnDestroy()}hasSubMenu(){return this.model?.some(e=>e.items)??!1}isItemHidden(e){return e.separator?e.visible===!1||e.items&&e.items.some(i=>i.visible!==!1):e.visible===!1}static \u0275fac=function(i){return new(i||t)(G(ze))};static \u0275cmp=k({type:t,selectors:[["p-menu"]],contentQueries:function(i,n,o){if(i&1&&(x(o,xn,4),x(o,Cn,4),x(o,Tn,4),x(o,wn,4),x(o,Mn,4),x(o,te,4)),i&2){let l;b(l=I())&&(n.startTemplate=l.first),b(l=I())&&(n.endTemplate=l.first),b(l=I())&&(n.headerTemplate=l.first),b(l=I())&&(n.itemTemplate=l.first),b(l=I())&&(n.submenuHeaderTemplate=l.first),b(l=I())&&(n.templates=l)}},viewQuery:function(i,n){if(i&1&&(H(kn,5),H(Sn,5)),i&2){let o;b(o=I())&&(n.listViewChild=o.first),b(o=I())&&(n.containerViewChild=o.first)}},inputs:{model:"model",popup:[2,"popup","popup",C],style:"style",styleClass:"styleClass",appendTo:"appendTo",autoZIndex:[2,"autoZIndex","autoZIndex",C],baseZIndex:[2,"baseZIndex","baseZIndex",j],showTransitionOptions:"showTransitionOptions",hideTransitionOptions:"hideTransitionOptions",ariaLabel:"ariaLabel",ariaLabelledBy:"ariaLabelledBy",id:"id",tabindex:[2,"tabindex","tabindex",j]},outputs:{onShow:"onShow",onHide:"onHide",onBlur:"onBlur",onFocus:"onFocus"},features:[W([$t]),q],decls:1,vars:1,consts:[["container",""],["list",""],["htmlSubmenuLabel",""],[3,"ngClass","class","ngStyle","click",4,"ngIf"],[3,"click","ngClass","ngStyle"],["class","p-menu-start",4,"ngIf"],["role","menu",1,"p-menu-list","p-reset",3,"focus","blur","keydown"],[4,"ngIf"],["class","p-menu-end",4,"ngIf"],[1,"p-menu-start"],[4,"ngTemplateOutlet"],["ngFor","",3,"ngForOf"],["class","p-menu-separator","role","separator",4,"ngIf"],["class","p-menu-submenu-label","pTooltip","","role","none",3,"ngClass","tooltipOptions",4,"ngIf"],["role","separator",1,"p-menu-separator"],["pTooltip","","role","none",1,"p-menu-submenu-label",3,"ngClass","tooltipOptions"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[4,"ngIf","ngIfElse"],[3,"innerHTML"],["class","p-menu-item","pTooltip","","role","menuitem",3,"pMenuItemContent","itemTemplate","ngClass","ngStyle","class","tooltipOptions","onMenuItemClick",4,"ngIf"],["pTooltip","","role","menuitem",1,"p-menu-item",3,"onMenuItemClick","pMenuItemContent","itemTemplate","ngClass","ngStyle","tooltipOptions"],[1,"p-menu-end"]],template:function(i,n){i&1&&u(0,Jn,8,25,"div",3),i&2&&a("ngIf",!n.popup||n.visible)},dependencies:[F,Q,he,$,se,J,ee,to,pe,Ce,Xe,T,At],encapsulation:2,data:{animation:[Fe("overlayAnimation",[ye(":enter",[Ie({opacity:0,transform:"scaleY(0.8)"}),be("{{showTransitionParams}}")]),ye(":leave",[be("{{hideTransitionParams}}",Ie({opacity:0}))])])]},changeDetection:0})}return t})(),Ht=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=ae({type:t});static \u0275inj=ne({imports:[Ne,T,T]})}return t})();var no=["*"];function oo(t,r){if(t&1&&(p(0,"span",3),M(1),c()),t&2){let e=s();m(),P(e.label)}}function ro(t,r){if(t&1&&g(0,"span",5),t&2){let e=s(2);S(e.icon),a("ngClass","p-avatar-icon")}}function ao(t,r){if(t&1&&u(0,ro,1,3,"span",4),t&2){let e=s(),i=E(5);a("ngIf",e.icon)("ngIfElse",i)}}function so(t,r){if(t&1){let e=w();p(0,"img",7),y("error",function(n){f(e);let o=s(2);return h(o.imageError(n))}),c()}if(t&2){let e=s(2);a("src",e.image,re),d("aria-label",e.ariaLabel)}}function lo(t,r){if(t&1&&u(0,so,1,2,"img",6),t&2){let e=s();a("ngIf",e.image)}}var mo=({dt:t})=>`
.p-avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: ${t("avatar.width")};
    height: ${t("avatar.height")};
    font-size: ${t("avatar.font.size")};
    color: ${t("avatar.color")};
    background: ${t("avatar.background")};
    border-radius: ${t("avatar.border.radius")};
}

.p-avatar-image {
    background: transparent;
}

.p-avatar-circle {
    border-radius: 50%;
}

.p-avatar-circle img {
    border-radius: 50%;
}

.p-avatar-icon {
    font-size: ${t("avatar.icon.size")};
    width: ${t("avatar.icon.size")};
    height: ${t("avatar.icon.size")};
}

.p-avatar img {
    width: 100%;
    height: 100%;
}

.p-avatar-lg {
    width: ${t("avatar.lg.width")};
    height: ${t("avatar.lg.width")};
    font-size: ${t("avatar.lg.font.size")};
}

.p-avatar-lg .p-avatar-icon {
    font-size: ${t("avatar.lg.icon.size")};
    width: ${t("avatar.lg.icon.size")};
    height: ${t("avatar.lg.icon.size")};
}

.p-avatar-xl {
    width: ${t("avatar.xl.width")};
    height: ${t("avatar.xl.width")};
    font-size: ${t("avatar.xl.font.size")};
}

.p-avatar-xl .p-avatar-icon {
    font-size: ${t("avatar.xl.font.size")};
    width: ${t("avatar.xl.icon.size")};
    height: ${t("avatar.xl.icon.size")};
}

.p-avatar-group {
    display: flex;
    align-items: center;
}

.p-avatar-group .p-avatar + .p-avatar {
    margin-inline-start: ${t("avatar.group.offset")};
}

.p-avatar-group .p-avatar {
    border: 2px solid ${t("avatar.group.border.color")};
}

.p-avatar-group .p-avatar-lg + .p-avatar-lg {
    margin-inline-start: ${t("avatar.lg.group.offset")};
}

.p-avatar-group .p-avatar-xl + .p-avatar-xl {
    margin-inline-start: ${t("avatar.xl.group.offset")};
}
`,po={root:({props:t})=>["p-avatar p-component",{"p-avatar-image":t.image!=null,"p-avatar-circle":t.shape==="circle","p-avatar-lg":t.size==="large","p-avatar-xl":t.size==="xlarge"}],label:"p-avatar-label",icon:"p-avatar-icon"},Rt=(()=>{class t extends ie{name="avatar";theme=mo;classes=po;static \u0275fac=(()=>{let e;return function(n){return(e||(e=A(t)))(n||t)}})();static \u0275prov=U({token:t,factory:t.\u0275fac})}return t})();var nt=(()=>{class t extends Z{label;icon;image;size="normal";shape="square";style;styleClass;ariaLabel;ariaLabelledBy;onImageError=new v;_componentStyle=B(Rt);imageError(e){this.onImageError.emit(e)}get hostClass(){return this.styleClass}static \u0275fac=(()=>{let e;return function(n){return(e||(e=A(t)))(n||t)}})();static \u0275cmp=k({type:t,selectors:[["p-avatar"]],hostVars:19,hostBindings:function(i,n){i&2&&(d("data-pc-name","avatar")("aria-label",n.ariaLabel)("aria-labelledby",n.ariaLabelledBy),fe(n.style),S(n.hostClass),pt("p-avatar",!0)("p-component",!0)("p-avatar-circle",n.shape==="circle")("p-avatar-lg",n.size==="large")("p-avatar-xl",n.size==="xlarge")("p-avatar-image",n.image!=null))},inputs:{label:"label",icon:"icon",image:"image",size:"size",shape:"shape",style:"style",styleClass:"styleClass",ariaLabel:"ariaLabel",ariaLabelledBy:"ariaLabelledBy"},outputs:{onImageError:"onImageError"},features:[W([Rt]),q],ngContentSelectors:no,decls:6,vars:2,consts:[["iconTemplate",""],["imageTemplate",""],["class","p-avatar-text",4,"ngIf","ngIfElse"],[1,"p-avatar-text"],[3,"class","ngClass",4,"ngIf","ngIfElse"],[3,"ngClass"],[3,"src","error",4,"ngIf"],[3,"error","src"]],template:function(i,n){if(i&1&&(De(),Pe(0),u(1,oo,2,1,"span",2)(2,ao,1,2,"ng-template",null,0,L)(4,lo,1,1,"ng-template",null,1,L)),i&2){let o=E(3);m(),a("ngIf",n.label)("ngIfElse",o)}},dependencies:[F,Q,$,T],encapsulation:2,changeDetection:0})}return t})(),zt=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=ae({type:t});static \u0275inj=ne({imports:[nt,T,T]})}return t})();var _o=["menu"];function fo(t,r){if(t&1){let e=w();p(0,"p-button",11),y("click",function(n){let o=f(e).$implicit,l=s(2);return h(l.toggleMenu(n,o.menu))}),p(1,"div",12)(2,"div"),M(3),c(),g(4,"i",13),c()()}if(t&2){let e=r.$implicit;m(3),P(e.label)}}function ho(t,r){if(t&1&&(p(0,"div",7)(1,"a",8),M(2,"inTime"),c(),p(3,"div",9),u(4,fo,5,1,"p-button",10),c()()),t&2){let e=s();m(4),a("ngForOf",e.listaMenu)}}function go(t,r){if(t&1&&g(0,"img",21),t&2){let e=s(2);a("src",e.profileImage,re)}}function bo(t,r){t&1&&(p(0,"div",22),g(1,"i",23),c())}function Io(t,r){if(t&1){let e=w();p(0,"div",14)(1,"p-button",15)(2,"div",16),g(3,"i",17),c()(),p(4,"p-button",18),y("click",function(n){f(e),s();let o=E(9);return h(o.toggle(n))}),p(5,"div",16),u(6,go,1,1,"img",19)(7,bo,2,0,"div",20),c()()()}if(t&2){let e=s();m(6),a("ngIf",e.profileImage),m(),a("ngIf",!e.profileImage)}}function yo(t,r){if(t&1&&(p(0,"div",24)(1,"a",25),g(2,"i",26),p(3,"span"),M(4),c()()()),t&2){let e=r.$implicit;m(),a("routerLink",e.routerLink),m(),d("data-icon",e.icon),m(2),P(e.label)}}function vo(t,r){if(t&1&&g(0,"img",35),t&2){let e=s(2);a("src",e.profileImage,re)}}function xo(t,r){t&1&&(p(0,"div",36),g(1,"i",37),c())}function Co(t,r){if(t&1&&(p(0,"div",27)(1,"p-avatar",28),u(2,vo,1,1,"img",29)(3,xo,2,0,"div",30),c(),p(4,"div",31)(5,"p",32),M(6),c(),p(7,"p",33),M(8),c()()(),g(9,"div",34)),t&2){let e=s();m(2),a("ngIf",e.profileImage),m(),a("ngIf",!e.profileImage),m(3),P(e.fullName),m(2),P(e.rolNombre)}}function To(t,r){if(t&1&&(p(0,"div",38)(1,"a",39),g(2,"i",26),p(3,"span"),M(4),c()()()),t&2){let e=r.$implicit;m(2),d("data-icon",e.icon),m(2),P(e.label)}}var qe=class t{menu;store=B(ht);rolService=B(Mt);listaMenu=[];menuItems=[];profileMenuItems=[{label:"Perfil",icon:"material-symbols:person-edit-outline-rounded",command:()=>{console.log("Perfil")}},{label:"Configuraci\xF3n",icon:"material-symbols:settings-outline-rounded",command:()=>{console.log("Configuraci\xF3n")}},{label:"Cerrar sesi\xF3n",icon:"material-symbols:logout",command:()=>{this.store.logout()}}];get profileImage(){return null}get username(){return this.store.user()?.username}get name(){return this.store.user()?.nombre}get rolNombre(){return this.store.user()?.rol?.nombre}get idRol(){return this.store.user()?.rol?.id}get fullName(){return`${this.store.user()?.nombre} ${this.store.user()?.apellido}`}get initials(){return this.store.user()?.nombre.charAt(0)}ngOnInit(){this.cargarGrupoModulo()}toggleMenu(r,e){this.menuItems=e,this.menu.toggle(r)}cargarGrupoModulo(){this.idRol&&this.rolService.findAllModulesByIdRol(this.idRol).subscribe({next:r=>{this.listaMenu=r.map(e=>({label:e.nombre,menu:e.modulos.map(i=>({label:i.nombre,icon:i.icono,routerLink:i.url}))}))}})}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=k({type:t,selectors:[["app-header"]],viewQuery:function(e,i){if(e&1&&H(_o,5),e&2){let n;b(n=I())&&(i.menu=n.first)}},decls:13,vars:4,consts:[["start",""],["end",""],["menu",""],["profileMenu",""],["styleClass","!px-6"],["appendTo","body","styleClass","overflow-hidden",3,"model","popup"],["pTemplate","item"],[1,"h-full","flex","items-center","gap-8"],["routerLink","/",1,"text-3xl","font-bold","text-orange-400"],[1,"flex","items-center","gap-4"],["text","","severity","secondary","rounded","","size","small",3,"click",4,"ngFor","ngForOf"],["text","","severity","secondary","rounded","","size","small",3,"click"],[1,"flex","justify-center","items-center","gap-3"],["data-icon","bx:bxs-chevron-down","data-inline","false",1,"iconify","icon","text-md"],[1,"flex","justify-center","items-center","gap-4"],["severity","secondary","rounded","","size","small","styleClass","!p-0"],[1,"w-8","h-8","flex","justify-center","items-center"],["data-icon","material-symbols:question-mark-rounded","data-inline","false",1,"iconify","icon","text-xl"],["severity","secondary","rounded","","size","small","styleClass","!p-0",3,"click"],["alt","Imagen de perfil",3,"src",4,"ngIf"],["class","w-8 h-8 flex items-center justify-center",4,"ngIf"],["alt","Imagen de perfil",3,"src"],[1,"w-8","h-8","flex","items-center","justify-center"],["data-icon","material-symbols:person-rounded","data-inline","false",1,"iconify","icon","text-xl"],[1,"px-2"],["pRipple","",1,"flex","items-center","gap-3","p-menuitem-link","py-1","cursor-pointer",3,"routerLink"],["data-inline","false",1,"iconify","icon","font-bold"],[1,"flex","items-center","gap-2","py-2","px-2"],["shape","circle","size","large","styleClass","!w-10 !h-10 shadow-lg"],["alt","imagen de perfil",3,"src",4,"ngIf"],["class","flex items-center justify-center",4,"ngIf"],[1,"flex","flex-col"],[1,"text-sm","font-medium"],[1,"text-xs","font-light","capitalize"],[1,"w-full","h-[1px]","bg-slate-300","dark:bg-slate-500"],["alt","imagen de perfil",3,"src"],[1,"flex","items-center","justify-center"],["data-icon","material-symbols:person-rounded","data-inline","false",1,"iconify","icon","font-bold","text-xl"],[1,"px-2","bg-slate-50","dark:bg-slate-900"],["pRipple","",1,"flex","items-center","gap-2","p-menuitem-link","py-1","cursor-pointer"]],template:function(e,i){e&1&&(p(0,"p-toolbar",4),u(1,ho,5,1,"ng-template",null,0,L)(3,Io,8,2,"ng-template",null,1,L),c(),p(5,"p-menu",5,2),u(7,yo,5,3,"ng-template",6),c(),p(8,"p-menu",5,3),u(10,Co,10,4,"ng-template",null,0,L)(12,To,5,2,"ng-template",6),c()),e&2&&(m(5),a("model",i.menuItems)("popup",!0),m(3),a("model",i.profileMenuItems)("popup",!0))},dependencies:[F,he,$,ee,ge,St,et,te,Ct,xt,Tt,wt,Vt,zt,nt,Ht,Ne],encapsulation:2})};var Kt=class t{static \u0275fac=function(e){return new(e||t)};static \u0275cmp=k({type:t,selectors:[["app-main"]],decls:6,vars:0,consts:[[1,"flex","flex-col","!h-screen"],[1,"h-16"],[1,"h-[calc(100vh-4rem)]","bg-slate-50"],[1,"h-full","overflow-y-hidden"]],template:function(e,i){e&1&&(p(0,"div",0)(1,"section",1),g(2,"app-header"),c(),p(3,"section",2)(4,"div",3),g(5,"router-outlet"),c()()())},dependencies:[ee,dt,qe],encapsulation:2})};export{Kt as MainComponent};
