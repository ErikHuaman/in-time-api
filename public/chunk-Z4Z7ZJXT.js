import{a as ft,b as ht}from"./chunk-CWKDICKV.js";import{B as q,Ba as J,Ca as vt,F,K as W,U,aa as ut,k as lt,ka as pt,la as G,pa as dt,r as ct,s as bt,sa as $,t as L}from"./chunk-F2X7M4DW.js";import{B as k,D as z,m as st,t as rt}from"./chunk-J6775IRK.js";import{$ as p,Bb as y,Fc as C,Gb as D,Gc as at,Hb as N,Ib as S,Ic as s,Jc as ot,Lb as j,Mb as A,Rb as I,Sb as f,Ta as v,Tb as T,U as B,Ub as w,V as X,Vb as Q,W as Y,Wb as x,Xb as l,Yb as c,cb as R,fa as O,ga as V,hb as g,hc as nt,ia as h,ib as tt,jc as it,lb as m,mb as et,nb as u,ra as d,sa as Z,ua as P,vb as r,wb as M,yb as _}from"./chunk-VDH5VFWZ.js";var _t=["previcon"],yt=["nexticon"],Tt=["content"],wt=["prevButton"],xt=["nextButton"],Ct=["inkbar"],kt=["tabs"],E=["*"],$t=e=>({"p-tablist-viewport":e});function Bt(e,b){e&1&&j(0)}function Dt(e,b){if(e&1&&u(0,Bt,1,0,"ng-container",11),e&2){let t=f(2);M("ngTemplateOutlet",t.prevIconTemplate||t._prevIconTemplate)}}function It(e,b){e&1&&S(0,"ChevronLeftIcon")}function Lt(e,b){if(e&1){let t=A();D(0,"button",10,3),I("click",function(){O(t);let n=f();return V(n.onPrevButtonClick())}),u(2,Dt,1,1,"ng-container")(3,It,1,0,"ChevronLeftIcon"),N()}if(e&2){let t=f();r("aria-label",t.prevButtonAriaLabel)("tabindex",t.tabindex())("data-pc-group-section","navigator"),v(2),y(t.prevIconTemplate||t._prevIconTemplate?2:3)}}function Ft(e,b){e&1&&j(0)}function Et(e,b){if(e&1&&u(0,Ft,1,0,"ng-container",11),e&2){let t=f(2);M("ngTemplateOutlet",t.nextIconTemplate||t._nextIconTemplate)}}function Ot(e,b){e&1&&S(0,"ChevronRightIcon")}function Vt(e,b){if(e&1){let t=A();D(0,"button",12,4),I("click",function(){O(t);let n=f();return V(n.onNextButtonClick())}),u(2,Et,1,1,"ng-container")(3,Ot,1,0,"ChevronRightIcon"),N()}if(e&2){let t=f();r("aria-label",t.nextButtonAriaLabel)("tabindex",t.tabindex())("data-pc-group-section","navigator"),v(2),y(t.nextIconTemplate||t._nextIconTemplate?2:3)}}function Pt(e,b){e&1&&w(0)}var Rt=({dt:e})=>`
.p-tabs {
    display: flex;
    flex-direction: column;
}

.p-tablist {
    display: flex;
    position: relative;
}

.p-tabs-scrollable > .p-tablist {
    overflow: hidden;
}

.p-tablist-viewport {
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;
    scrollbar-width: none;
    overscroll-behavior: contain auto;
}

.p-tablist-viewport::-webkit-scrollbar {
    display: none;
}

.p-tablist-tab-list {
    position: relative;
    display: flex;
    background: ${e("tabs.tablist.background")};
    border-style: solid;
    border-color: ${e("tabs.tablist.border.color")};
    border-width: ${e("tabs.tablist.border.width")};
}

.p-tablist-content {
    flex-grow: 1;
}

.p-tablist-nav-button {
    all: unset;
    position: absolute !important;
    flex-shrink: 0;
    top: 0;
    z-index: 2;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${e("tabs.nav.button.background")};
    color: ${e("tabs.nav.button.color")};
    width: ${e("tabs.nav.button.width")};
    transition: color ${e("tabs.transition.duration")}, outline-color ${e("tabs.transition.duration")}, box-shadow ${e("tabs.transition.duration")};
    box-shadow: ${e("tabs.nav.button.shadow")};
    outline-color: transparent;
    cursor: pointer;
}

.p-tablist-nav-button:focus-visible {
    z-index: 1;
    box-shadow: ${e("tabs.nav.button.focus.ring.shadow")};
    outline: ${e("tabs.nav.button.focus.ring.width")} ${e("tabs.nav.button.focus.ring.style")} ${e("tabs.nav.button.focus.ring.color")};
    outline-offset: ${e("tabs.nav.button.focus.ring.offset")};
}

.p-tablist-nav-button:hover {
    color: ${e("tabs.nav.button.hover.color")};
}

.p-tablist-prev-button {
    left: 0;
}

.p-tablist-next-button {
    right: 0;
}

.p-tab {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    cursor: pointer;
    user-select: none;
    position: relative;
    border-style: solid;
    white-space: nowrap;
    gap: ${e("tabs.tab.gap")};
    background: ${e("tabs.tab.background")};
    border-width: ${e("tabs.tab.border.width")};
    border-color: ${e("tabs.tab.border.color")};
    color: ${e("tabs.tab.color")};
    padding: ${e("tabs.tab.padding")};
    font-weight: ${e("tabs.tab.font.weight")};
    transition: background ${e("tabs.transition.duration")}, border-color ${e("tabs.transition.duration")}, color ${e("tabs.transition.duration")}, outline-color ${e("tabs.transition.duration")}, box-shadow ${e("tabs.transition.duration")};
    margin: ${e("tabs.tab.margin")};
    outline-color: transparent;
}

.p-tab:not(.p-disabled):focus-visible {
    z-index: 1;
    box-shadow: ${e("tabs.tab.focus.ring.shadow")};
    outline: ${e("tabs.tab.focus.ring.width")} ${e("tabs.tab.focus.ring.style")} ${e("tabs.tab.focus.ring.color")};
    outline-offset: ${e("tabs.tab.focus.ring.offset")};
}

.p-tab:not(.p-tab-active):not(.p-disabled):hover {
    background: ${e("tabs.tab.hover.background")};
    border-color: ${e("tabs.tab.hover.border.color")};
    color: ${e("tabs.tab.hover.color")};
}

.p-tab-active {
    background: ${e("tabs.tab.active.background")};
    border-color: ${e("tabs.tab.active.border.color")};
    color: ${e("tabs.tab.active.color")};
}

.p-tabpanels {
    background: ${e("tabs.tabpanel.background")};
    color: ${e("tabs.tabpanel.color")};
    padding: ${e("tabs.tabpanel.padding")};
    outline: 0 none;
}

.p-tabpanel:focus-visible {
    box-shadow: ${e("tabs.tabpanel.focus.ring.shadow")};
    outline: ${e("tabs.tabpanel.focus.ring.width")} ${e("tabs.tabpanel.focus.ring.style")} ${e("tabs.tabpanel.focus.ring.color")};
    outline-offset: ${e("tabs.tabpanel.focus.ring.offset")};
}

.p-tablist-active-bar {
    z-index: 1;
    display: block;
    position: absolute;
    bottom: ${e("tabs.active.bar.bottom")};
    height: ${e("tabs.active.bar.height")};
    background: ${e("tabs.active.bar.background")};
    transition: 250ms cubic-bezier(0.35, 0, 0.25, 1);
}
`,Mt={root:({props:e})=>["p-tabs p-component",{"p-tabs-scrollable":e.scrollable}]},gt=(()=>{class e extends dt{name="tabs";theme=Rt;classes=Mt;static \u0275fac=(()=>{let t;return function(n){return(t||(t=h(e)))(n||e)}})();static \u0275prov=X({token:e,factory:e.\u0275fac})}return e})();var mt=(()=>{class e extends ${prevIconTemplate;nextIconTemplate;templates;content;prevButton;nextButton;inkbar;tabs;pcTabs=p(B(()=>K));isPrevButtonEnabled=P(!1);isNextButtonEnabled=P(!1);resizeObserver;showNavigators=s(()=>this.pcTabs.showNavigators());tabindex=s(()=>this.pcTabs.tabindex());scrollable=s(()=>this.pcTabs.scrollable());constructor(){super(),ot(()=>{this.pcTabs.value(),z(this.platformId)&&setTimeout(()=>{this.updateInkBar()})})}get prevButtonAriaLabel(){return this.config.translation.aria.previous}get nextButtonAriaLabel(){return this.config.translation.aria.next}ngAfterViewInit(){super.ngAfterViewInit(),this.showNavigators()&&z(this.platformId)&&(this.updateButtonState(),this.bindResizeObserver())}_prevIconTemplate;_nextIconTemplate;ngAfterContentInit(){this.templates.forEach(t=>{switch(t.getType()){case"previcon":this._prevIconTemplate=t.template;break;case"nexticon":this._nextIconTemplate=t.template;break}})}ngOnDestroy(){this.unbindResizeObserver(),super.ngOnDestroy()}onScroll(t){this.showNavigators()&&this.updateButtonState(),t.preventDefault()}onPrevButtonClick(){let t=this.content.nativeElement,i=F(t),n=Math.abs(t.scrollLeft)-i,a=n<=0?0:n;t.scrollLeft=W(t)?-1*a:a}onNextButtonClick(){let t=this.content.nativeElement,i=F(t)-this.getVisibleButtonWidths(),n=t.scrollLeft+i,a=t.scrollWidth-i,o=n>=a?a:n;t.scrollLeft=W(t)?-1*o:o}updateButtonState(){let t=this.content?.nativeElement,i=this.el?.nativeElement,{scrollWidth:n,offsetWidth:a}=t,o=Math.abs(t.scrollLeft),H=F(t);this.isPrevButtonEnabled.set(o!==0),this.isNextButtonEnabled.set(i.offsetWidth>=a&&o!==n-H)}updateInkBar(){let t=this.content.nativeElement,i=this.inkbar.nativeElement,n=this.tabs.nativeElement,a=ct(t,'[data-pc-name="tab"][data-p-active="true"]');i.style.width=lt(a)+"px",i.style.left=q(a).left-q(n).left+"px"}getVisibleButtonWidths(){let t=this.prevButton?.nativeElement,i=this.nextButton?.nativeElement;return[t,i].reduce((n,a)=>a?n+F(a):n,0)}bindResizeObserver(){this.resizeObserver=new ResizeObserver(()=>this.updateButtonState()),this.resizeObserver.observe(this.el.nativeElement)}unbindResizeObserver(){this.resizeObserver&&(this.resizeObserver.unobserve(this.el.nativeElement),this.resizeObserver=null)}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=g({type:e,selectors:[["p-tablist"]],contentQueries:function(i,n,a){if(i&1&&(Q(a,_t,4),Q(a,yt,4),Q(a,pt,4)),i&2){let o;l(o=c())&&(n.prevIconTemplate=o.first),l(o=c())&&(n.nextIconTemplate=o.first),l(o=c())&&(n.templates=o)}},viewQuery:function(i,n){if(i&1&&(x(Tt,5),x(wt,5),x(xt,5),x(Ct,5),x(kt,5)),i&2){let a;l(a=c())&&(n.content=a.first),l(a=c())&&(n.prevButton=a.first),l(a=c())&&(n.nextButton=a.first),l(a=c())&&(n.inkbar=a.first),l(a=c())&&(n.tabs=a.first)}},hostVars:5,hostBindings:function(i,n){i&2&&(r("data-pc-name","tablist"),_("p-tablist",!0)("p-component",!0))},features:[m],ngContentSelectors:E,decls:9,vars:6,consts:[["content",""],["tabs",""],["inkbar",""],["prevButton",""],["nextButton",""],["type","button","pRipple","",1,"p-tablist-nav-button","p-tablist-prev-button"],[1,"p-tablist-content",3,"scroll","ngClass"],["role","tablist",1,"p-tablist-tab-list"],["role","presentation",1,"p-tablist-active-bar"],["type","button","pRipple","",1,"p-tablist-nav-button","p-tablist-next-button"],["type","button","pRipple","",1,"p-tablist-nav-button","p-tablist-prev-button",3,"click"],[4,"ngTemplateOutlet"],["type","button","pRipple","",1,"p-tablist-nav-button","p-tablist-next-button",3,"click"]],template:function(i,n){if(i&1){let a=A();T(),u(0,Lt,4,4,"button",5),D(1,"div",6,0),I("scroll",function(H){return O(a),V(n.onScroll(H))}),D(3,"div",7,1),w(5),S(6,"span",8,2),N()(),u(8,Vt,4,4,"button",9)}i&2&&(y(n.showNavigators()&&n.isPrevButtonEnabled()?0:-1),v(),M("ngClass",it(4,$t,n.scrollable())),v(5),r("data-pc-section","inkbar"),v(2),y(n.showNavigators()&&n.isNextButtonEnabled()?8:-1))},dependencies:[k,st,rt,ft,ht,vt,J,G],encapsulation:2,changeDetection:0})}return e})(),Nt=(()=>{class e extends ${value=R();disabled=d(!1,{transform:C});pcTabs=p(B(()=>K));pcTabList=p(B(()=>mt));el=p(Z);ripple=s(()=>this.config.ripple());id=s(()=>`${this.pcTabs.id()}_tab_${this.value()}`);ariaControls=s(()=>`${this.pcTabs.id()}_tabpanel_${this.value()}`);active=s(()=>U(this.pcTabs.value(),this.value()));tabindex=s(()=>this.active()?this.pcTabs.tabindex():-1);mutationObserver;onFocus(t){this.pcTabs.selectOnFocus()&&this.changeActiveValue()}onClick(t){this.changeActiveValue()}onKeyDown(t){switch(t.code){case"ArrowRight":this.onArrowRightKey(t);break;case"ArrowLeft":this.onArrowLeftKey(t);break;case"Home":this.onHomeKey(t);break;case"End":this.onEndKey(t);break;case"PageDown":this.onPageDownKey(t);break;case"PageUp":this.onPageUpKey(t);break;case"Enter":case"NumpadEnter":case"Space":this.onEnterKey(t);break;default:break}t.stopPropagation()}ngAfterViewInit(){super.ngAfterViewInit(),this.bindMutationObserver()}onArrowRightKey(t){let i=this.findNextTab(t.currentTarget);i?this.changeFocusedTab(t,i):this.onHomeKey(t),t.preventDefault()}onArrowLeftKey(t){let i=this.findPrevTab(t.currentTarget);i?this.changeFocusedTab(t,i):this.onEndKey(t),t.preventDefault()}onHomeKey(t){let i=this.findFirstTab();this.changeFocusedTab(t,i),t.preventDefault()}onEndKey(t){let i=this.findLastTab();this.changeFocusedTab(t,i),t.preventDefault()}onPageDownKey(t){this.scrollInView(this.findLastTab()),t.preventDefault()}onPageUpKey(t){this.scrollInView(this.findFirstTab()),t.preventDefault()}onEnterKey(t){this.changeActiveValue(),t.preventDefault()}findNextTab(t,i=!1){let n=i?t:t.nextElementSibling;return n?L(n,"data-p-disabled")||L(n,"data-pc-section")==="inkbar"?this.findNextTab(n):n:null}findPrevTab(t,i=!1){let n=i?t:t.previousElementSibling;return n?L(n,"data-p-disabled")||L(n,"data-pc-section")==="inkbar"?this.findPrevTab(n):n:null}findFirstTab(){return this.findNextTab(this.pcTabList?.tabs?.nativeElement?.firstElementChild,!0)}findLastTab(){return this.findPrevTab(this.pcTabList?.tabs?.nativeElement?.lastElementChild,!0)}changeActiveValue(){this.pcTabs.updateValue(this.value())}changeFocusedTab(t,i){bt(i),this.scrollInView(i)}scrollInView(t){t?.scrollIntoView?.({block:"nearest"})}bindMutationObserver(){z(this.platformId)&&(this.mutationObserver=new MutationObserver(t=>{t.forEach(()=>{this.active()&&this.pcTabList?.updateInkBar()})}),this.mutationObserver.observe(this.el.nativeElement,{childList:!0,characterData:!0,subtree:!0}))}unbindMutationObserver(){this.mutationObserver.disconnect()}ngOnDestroy(){this.mutationObserver&&this.unbindMutationObserver(),super.ngOnDestroy()}static \u0275fac=(()=>{let t;return function(n){return(t||(t=h(e)))(n||e)}})();static \u0275cmp=g({type:e,selectors:[["p-tab"]],hostVars:16,hostBindings:function(i,n){i&1&&I("focus",function(o){return n.onFocus(o)})("click",function(o){return n.onClick(o)})("keydown",function(o){return n.onKeyDown(o)}),i&2&&(r("data-pc-name","tab")("id",n.id())("aria-controls",n.ariaControls())("role","tab")("aria-selected",n.active())("data-p-disabled",n.disabled())("data-p-active",n.active())("tabindex",n.tabindex()),_("p-tab",!0)("p-tab-active",n.active())("p-disabled",n.disabled())("p-component",!0))},inputs:{value:[1,"value"],disabled:[1,"disabled"]},outputs:{value:"valueChange"},features:[et([J]),m],ngContentSelectors:E,decls:1,vars:0,template:function(i,n){i&1&&(T(),w(0))},dependencies:[k,G],encapsulation:2,changeDetection:0})}return e})(),St=(()=>{class e extends ${pcTabs=p(B(()=>K));value=R(void 0);id=s(()=>`${this.pcTabs.id()}_tabpanel_${this.value()}`);ariaLabelledby=s(()=>`${this.pcTabs.id()}_tab_${this.value()}`);active=s(()=>U(this.pcTabs.value(),this.value()));static \u0275fac=(()=>{let t;return function(n){return(t||(t=h(e)))(n||e)}})();static \u0275cmp=g({type:e,selectors:[["p-tabpanel"]],hostVars:9,hostBindings:function(i,n){i&2&&(r("data-pc-name","tabpanel")("id",n.id())("role","tabpanel")("aria-labelledby",n.ariaLabelledby())("data-p-active",n.active()),_("p-tabpanel",!0)("p-component",!0))},inputs:{value:[1,"value"]},outputs:{value:"valueChange"},features:[m],ngContentSelectors:E,decls:1,vars:1,template:function(i,n){i&1&&(T(),u(0,Pt,1,0)),i&2&&y(n.active()?0:-1)},dependencies:[k],encapsulation:2,changeDetection:0})}return e})(),At=(()=>{class e extends ${static \u0275fac=(()=>{let t;return function(n){return(t||(t=h(e)))(n||e)}})();static \u0275cmp=g({type:e,selectors:[["p-tabpanels"]],hostVars:6,hostBindings:function(i,n){i&2&&(r("data-pc-name","tabpanels")("role","presentation"),_("p-tabpanels",!0)("p-component",!0))},features:[m],ngContentSelectors:E,decls:1,vars:0,template:function(i,n){i&1&&(T(),w(0))},dependencies:[k],encapsulation:2,changeDetection:0})}return e})(),K=(()=>{class e extends ${value=R(void 0);scrollable=d(!1,{transform:C});lazy=d(!1,{transform:C});selectOnFocus=d(!1,{transform:C});showNavigators=d(!0,{transform:C});tabindex=d(0,{transform:at});id=P(ut("pn_id_"));_componentStyle=p(gt);updateValue(t){this.value.update(()=>t)}static \u0275fac=(()=>{let t;return function(n){return(t||(t=h(e)))(n||e)}})();static \u0275cmp=g({type:e,selectors:[["p-tabs"]],hostVars:8,hostBindings:function(i,n){i&2&&(r("data-pc-name","tabs")("id",n.id),_("p-tabs",!0)("p-tabs-scrollable",n.scrollable())("p-component",!0))},inputs:{value:[1,"value"],scrollable:[1,"scrollable"],lazy:[1,"lazy"],selectOnFocus:[1,"selectOnFocus"],showNavigators:[1,"showNavigators"],tabindex:[1,"tabindex"]},outputs:{value:"valueChange"},features:[nt([gt]),m],ngContentSelectors:E,decls:1,vars:0,template:function(i,n){i&1&&(T(),w(0))},dependencies:[k],encapsulation:2,changeDetection:0})}return e})(),le=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=tt({type:e});static \u0275inj=Y({imports:[K,At,St,mt,Nt]})}return e})();export{mt as a,Nt as b,St as c,At as d,K as e,le as f};
