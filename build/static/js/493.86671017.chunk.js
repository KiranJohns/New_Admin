"use strict";(self.webpackChunkakademi=self.webpackChunkakademi||[]).push([[493],{95848:function(e,n,t){t.r(n),t.d(n,{default:function(){return _}});var o=t(1413),r=t(29439),i=t(72791),a=t(78687),s=t(57689),l=t(11087),c=t(65093),u=t(56355),d=t.p+"static/media/bg1.0368afcbc417dc41d807.png",m=(t(90289),t(68364),t.p+"static/media/pol.f84d809c5d1ad9dbcd2b.jpg"),v=t(41410),f=t(54164),h=t(81694),p=t.n(h);var g=!1;if("undefined"!==typeof window){var b={get passive(){g=!0}};window.addEventListener("testPassive",null,b),window.removeEventListener("testPassive",null,b)}var y="undefined"!==typeof window&&window.navigator&&window.navigator.platform&&(/iP(ad|hone|od)/.test(window.navigator.platform)||"MacIntel"===window.navigator.platform&&window.navigator.maxTouchPoints>1),x=[],j=!1,w=-1,N=void 0,E=void 0,k=function(e){return x.some((function(n){return!(!n.options.allowTouchMove||!n.options.allowTouchMove(e))}))},C=function(e){var n=e||window.event;return!!k(n.target)||(n.touches.length>1||(n.preventDefault&&n.preventDefault(),!1))},S=function(){void 0!==E&&(document.body.style.paddingRight=E,E=void 0),void 0!==N&&(document.body.style.overflow=N,N=void 0)},A=function(e,n){if(e){if(!x.some((function(n){return n.targetElement===e}))){var t={targetElement:e,options:n||{}};x=[].concat(function(e){if(Array.isArray(e)){for(var n=0,t=Array(e.length);n<e.length;n++)t[n]=e[n];return t}return Array.from(e)}(x),[t]),y?(e.ontouchstart=function(e){1===e.targetTouches.length&&(w=e.targetTouches[0].clientY)},e.ontouchmove=function(n){1===n.targetTouches.length&&function(e,n){var t=e.targetTouches[0].clientY-w;!k(e.target)&&(n&&0===n.scrollTop&&t>0||function(e){return!!e&&e.scrollHeight-e.scrollTop<=e.clientHeight}(n)&&t<0?C(e):e.stopPropagation())}(n,e)},j||(document.addEventListener("touchmove",C,g?{passive:!1}:void 0),j=!0)):function(e){if(void 0===E){var n=!!e&&!0===e.reserveScrollBarGap,t=window.innerWidth-document.documentElement.clientWidth;n&&t>0&&(E=document.body.style.paddingRight,document.body.style.paddingRight=t+"px")}void 0===N&&(N=document.body.style.overflow,document.body.style.overflow="hidden")}(n)}}else console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.")};function I(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{isStateful:!0},t=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,n=i.useState(e),t=(0,r.Z)(n,2),o=t[0],a=t[1],s=i.useRef({current:o}).current;return Object.defineProperty(s,"current",{get:function(){return o},set:function(e){Object.is(o,e)||(o=e,a(e))}}),s}(null),o=(0,i.useRef)(null),a=n.isStateful?t:o;return i.useEffect((function(){!e||("function"==typeof e?e(a.current):e.current=a.current)})),a}function O(){return O=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e},O.apply(this,arguments)}var P=function(e){var n=e.classes,t=e.classNames,o=e.styles,r=e.id,a=e.closeIcon,s=e.onClick;return i.createElement("button",{id:r,className:p()(n.closeButton,null==t?void 0:t.closeButton),style:null==o?void 0:o.closeButton,onClick:s,"data-testid":"close-button"},a||i.createElement("svg",{className:null==t?void 0:t.closeIcon,style:null==o?void 0:o.closeIcon,width:28,height:28,viewBox:"0 0 36 36","data-testid":"close-icon"},i.createElement("path",{d:"M28.5 9.62L26.38 7.5 18 15.88 9.62 7.5 7.5 9.62 15.88 18 7.5 26.38l2.12 2.12L18 20.12l8.38 8.38 2.12-2.12L20.12 18z"})))},T="undefined"!==typeof window,R=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'];function B(e){return null===e.offsetParent||"hidden"===getComputedStyle(e).visibility}function L(e){if("INPUT"!==e.tagName||"radio"!==e.type||!e.name)return!0;var n=(e.form||e.ownerDocument).querySelectorAll('input[type="radio"][name="'+e.name+'"]'),t=function(e,n){for(var t=0;t<e.length;t++)if(e[t].checked&&e[t].form===n)return e[t]}(n,e.form);return t===e||void 0===t&&n[0]===e}function M(e){for(var n=document.activeElement,t=e.querySelectorAll(R.join(",")),o=[],r=0;r<t.length;r++){var i=t[r];(n===i||!i.disabled&&Z(i)>-1&&!B(i)&&L(i))&&o.push(i)}return o}function Z(e){var n=parseInt(e.getAttribute("tabindex"),10);return isNaN(n)?function(e){return e.getAttribute("contentEditable")}(e)?0:e.tabIndex:n}var D=function(e){var n=e.container,t=e.initialFocusRef,o=(0,i.useRef)();return(0,i.useEffect)((function(){var e=function(e){(null==n?void 0:n.current)&&function(e,n){if(e&&"Tab"===e.key){if(!n||!n.contains)return process,!1;if(!n.contains(e.target))return!1;var t=M(n),o=t[0],r=t[t.length-1];e.shiftKey&&e.target===o?(r.focus(),e.preventDefault()):!e.shiftKey&&e.target===r&&(o.focus(),e.preventDefault())}}(e,n.current)};if(T&&document.addEventListener("keydown",e),T&&(null==n?void 0:n.current)){var r=function(){-1!==R.findIndex((function(e){var n;return null==(n=document.activeElement)?void 0:n.matches(e)}))&&(o.current=document.activeElement)};if(t)r(),requestAnimationFrame((function(){var e;null==(e=t.current)||e.focus()}));else{var i=M(n.current);i[0]&&(r(),i[0].focus())}}return function(){var n;T&&(document.removeEventListener("keydown",e),null==(n=o.current)||n.focus())}}),[n,t]),null},q=[],F=function(e){q.push(e)},U=function(e){q=q.filter((function(n){return n!==e}))},W=function(e){return!!q.length&&q[q.length-1]===e};var H=function(e,n,t,o,r){var a=(0,i.useRef)(null);(0,i.useEffect)((function(){return n&&e.current&&o&&(a.current=e.current,A(e.current,{reserveScrollBarGap:r})),function(){var e;a.current&&((e=a.current)?(x=x.filter((function(n){return n.targetElement!==e})),y?(e.ontouchstart=null,e.ontouchmove=null,j&&0===x.length&&(document.removeEventListener("touchmove",C,g?{passive:!1}:void 0),j=!1)):x.length||S()):console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices."),a.current=null)}}),[n,t,e,o,r])},K={root:"react-responsive-modal-root",overlay:"react-responsive-modal-overlay",overlayAnimationIn:"react-responsive-modal-overlay-in",overlayAnimationOut:"react-responsive-modal-overlay-out",modalContainer:"react-responsive-modal-container",modalContainerCenter:"react-responsive-modal-containerCenter",modal:"react-responsive-modal-modal",modalAnimationIn:"react-responsive-modal-modal-in",modalAnimationOut:"react-responsive-modal-modal-out",closeButton:"react-responsive-modal-closeButton"},Y=i.forwardRef((function(e,n){var t,o,r,a,s=e.open,l=e.center,c=e.blockScroll,u=void 0===c||c,d=e.closeOnEsc,m=void 0===d||d,v=e.closeOnOverlayClick,h=void 0===v||v,g=e.container,b=e.showCloseIcon,y=void 0===b||b,x=e.closeIconId,j=e.closeIcon,w=e.focusTrapped,N=void 0===w||w,E=e.initialFocusRef,k=void 0===E?void 0:E,C=e.animationDuration,S=void 0===C?300:C,A=e.classNames,R=e.styles,B=e.role,L=void 0===B?"dialog":B,M=e.ariaDescribedby,Z=e.ariaLabelledby,q=e.containerId,Y=e.modalId,G=e.onClose,z=e.onEscKeyDown,$=e.onOverlayClick,_=e.onAnimationEnd,J=e.children,Q=e.reserveScrollBarGap,V=I(n),X=(0,i.useRef)(null),ee=(0,i.useRef)(null),ne=(0,i.useRef)(null);null===ne.current&&T&&(ne.current=document.createElement("div"));var te=(0,i.useState)(!1),oe=te[0],re=te[1];!function(e,n){(0,i.useEffect)((function(){return n&&F(e),function(){U(e)}}),[n,e])}(X,s),H(X,s,oe,u,Q);var ie=function(e){27===e.keyCode&&W(X)&&(null==z||z(e),m&&G())};(0,i.useEffect)((function(){return function(){oe&&(ne.current&&!g&&document.body.contains(ne.current)&&document.body.removeChild(ne.current),document.removeEventListener("keydown",ie))}}),[oe]),(0,i.useEffect)((function(){s&&!oe&&(re(!0),!ne.current||g||document.body.contains(ne.current)||document.body.appendChild(ne.current),document.addEventListener("keydown",ie))}),[s]);var ae=function(){ee.current=!1},se=g||ne.current,le=s?null!=(t=null==A?void 0:A.overlayAnimationIn)?t:K.overlayAnimationIn:null!=(o=null==A?void 0:A.overlayAnimationOut)?o:K.overlayAnimationOut,ce=s?null!=(r=null==A?void 0:A.modalAnimationIn)?r:K.modalAnimationIn:null!=(a=null==A?void 0:A.modalAnimationOut)?a:K.modalAnimationOut;return oe&&se?f.createPortal(i.createElement("div",{className:p()(K.root,null==A?void 0:A.root),style:null==R?void 0:R.root,"data-testid":"root"},i.createElement("div",{className:p()(K.overlay,null==A?void 0:A.overlay),"data-testid":"overlay","aria-hidden":!0,style:O({animation:le+" "+S+"ms"},null==R?void 0:R.overlay)}),i.createElement("div",{ref:X,id:q,className:p()(K.modalContainer,l&&K.modalContainerCenter,null==A?void 0:A.modalContainer),style:null==R?void 0:R.modalContainer,"data-testid":"modal-container",onClick:function(e){null===ee.current&&(ee.current=!0),ee.current?(null==$||$(e),h&&G(),ee.current=null):ee.current=null}},i.createElement("div",{ref:V,className:p()(K.modal,null==A?void 0:A.modal),style:O({animation:ce+" "+S+"ms"},null==R?void 0:R.modal),onMouseDown:ae,onMouseUp:ae,onClick:ae,onAnimationEnd:function(){s||re(!1),null==_||_()},id:Y,role:L,"aria-modal":"true","aria-labelledby":Z,"aria-describedby":M,"data-testid":"modal",tabIndex:-1},N&&i.createElement(D,{container:V,initialFocusRef:k}),J,y&&i.createElement(P,{classes:K,classNames:A,styles:R,closeIcon:j,onClick:G,id:x})))),se):null})),G=t(75985),z=t(72232),$=t(80184);var _=(0,a.$j)((function(e){return{errorMessage:e.auth.errorMessage,successMessage:e.auth.successMessage,showLoading:e.auth.showLoading}}))((function(e){(0,i.useRef)();var n=(0,i.useRef)(),t=(0,i.useState)(!0),f=(0,r.Z)(t,2),h=(f[0],f[1]),p={email:"",password:""},g=(0,i.useState)(p),b=(0,r.Z)(g,2),y=b[0],x=b[1],j=(0,i.useState)(""),w=(0,r.Z)(j,2),N=w[0],E=w[1],k=(0,i.useState)(""),C=(0,r.Z)(k,2),S=C[0],A=C[1],I=(0,i.useState)(!0),O=(0,r.Z)(I,2),P=O[0],T=O[1],R=(0,i.useState)(!1),B=(0,r.Z)(R,2),L=B[0],M=B[1],Z=(0,i.useState)(!1),D=(0,r.Z)(Z,2),q=D[0],F=D[1],U=(0,i.useState)(""),W=(0,r.Z)(U,2),H=W[0],K=W[1],_=(0,i.useState)("00:00:45"),J=(0,r.Z)(_,2),Q=(J[0],J[1],(0,a.I0)()),V=(0,s.s0)(),X=(0,z.ZP)(),ee=(0,i.useState)({seconds:45}),ne=(0,r.Z)(ee,2),te=(ne[0],ne[1]),oe=function(e){e.persist(),e.preventDefault(),X("POST","/auth/validate-otp",{email:N,otp:H}).then((function(e){(0,G.Am)("OTP is Accepted"),localStorage.setItem("adminEmail",N),setTimeout((function(){var e;null===n||void 0===n||null===(e=n.current)||void 0===e||e.click()}),100)})).catch((function(e){(0,G.Am)("OTP is Incorrect")})),console.log(H)},re=document.querySelector("body").getAttribute("data-theme-version");return(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(G.Ix,{position:"top-right",autoClose:5e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0,theme:"light"}),(0,$.jsx)(l.rU,{ref:n,to:"/reset-password"}),(0,$.jsx)("div",{className:"container h-100",children:(0,$.jsx)("div",{className:"row h-100 align-items-center justify-contain-center",children:(0,$.jsx)("div",{className:"col-xl-12",children:(0,$.jsxs)("div",{className:"card",children:[q&&(0,$.jsx)(Y,{onClose:function(){console.log("hi"),F((function(e){return!e}))},open:q,styles:{closeIcon:{position:"absolute",top:"3%",right:"4%"},modal:{zIndex:"10001",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",maxWidth:"unset",minWidth:"35%",background:"#fff",padding:"unset",borderRadius:"1rem"},overlay:{background:"rgba(0, 0, 0, 0.5)"},closeButton:{background:"white"}},center:!0,children:(0,$.jsxs)("div",{className:"main p-5",children:[(0,$.jsx)("div",{className:"heading",children:(0,$.jsx)("h4",{children:"One time Password (OTP) verification"})}),(0,$.jsx)("div",{className:"info",children:"An OTP has been sent to your registered email address."}),(0,$.jsx)("div",{className:"py-3",children:(0,$.jsxs)("div",{className:"form-group",children:[(0,$.jsxs)("div",{class:"input-group mb-3",children:[(0,$.jsx)("input",{type:"text",class:"form-control",placeholder:"Email","aria-label":"Recipient's username","aria-describedby":"basic-addon2",value:N,onChange:function(e){return E(e.target.value)}}),(0,$.jsx)("div",{class:"input-group-append",children:(0,$.jsx)("button",{class:"btn btn-outline-success",type:"button",onClick:function(e){null===e||void 0===e||e.preventDefault(),X("PATCH","/auth/resend-otp",{email:N}).then((function(){te({seconds:45}),h(!0),G.Am.success("A new OTP send to your email")})).catch((function(e){(0,G.Am)(e.data.errors[0].error)}))},children:"Submit"})})]}),(0,$.jsxs)("div",{class:"input-group mb-3",children:[(0,$.jsx)("input",{type:"text",class:"form-control",placeholder:"OTP","aria-label":"Recipient's username","aria-describedby":"basic-addon2",value:H,onKeyUp:function(e){return"Enter"==e.key&&oe(e)},onChange:function(e){return K(e.target.value)}}),(0,$.jsx)("div",{class:"input-group-append",children:(0,$.jsx)("button",{class:"btn btn-outline-success",type:"button",onClick:oe,children:"Submit"})})]}),(0,$.jsx)("div",{className:"d-flex justify-content-between"})]})})]})}),(0,$.jsx)("div",{className:"card-body p-0",children:(0,$.jsxs)("div",{className:"row m-0",children:[(0,$.jsx)("div",{className:"col-xl-6 col-md-6 sign text-center sign-bg",style:{backgroundImage:"url("+m+")"},children:(0,$.jsxs)("div",{children:[(0,$.jsx)("div",{className:"text-center my-5",children:(0,$.jsx)(l.rU,{to:"#",children:(0,$.jsx)("img",{className:"logo-abbr dark-logo",width:"200",src:v,alt:""})})}),"light"===re?(0,$.jsx)("img",{src:d,className:"slideskew img-fix bitcoin-img"}):(0,$.jsx)("img",{src:d,className:" slideskew img-fix bitcoin-img "})]})}),(0,$.jsx)("div",{className:"col-xl-6 col-md-6",children:(0,$.jsxs)("div",{className:"sign-in-your px-2",children:[(0,$.jsx)("h4",{className:"fs-20 mb-4",children:"Sign in your account"}),(0,$.jsx)("span",{children:"Welcome back! Login with your data "}),(0,$.jsx)("div",{className:"login-social",style:{marginBottom:"3rem"}}),e.errorMessage&&(0,$.jsx)("div",{className:"bg-red-300 text-red-900 border border-red-900 p-1 my-2",children:e.errorMessage}),e.successMessage&&(0,$.jsx)("div",{className:"bg-green-300 text-green-900 border border-green-900 p-1 my-2",children:e.successMessage}),(0,$.jsxs)("form",{onSubmit:function(e){e.preventDefault();var n=!1,t=(0,o.Z)({},p);if(""===N&&(t.email="Email is Required",n=!0),""===S&&(t.password="Password is Required",n=!0),x(t),!n){var r="";r=P?"/sub-admin/login":"/auth/login",Q((0,c._l)(!0)),Q((0,c.y)(r,N,S,V))}},children:[(0,$.jsxs)("div",{className:"mb-3",children:[(0,$.jsx)("label",{className:"mb-1",children:(0,$.jsx)("strong",{children:"Email"})}),(0,$.jsx)("input",{type:"email",className:"form-control",value:N,onChange:function(e){return E(e.target.value)},placeholder:"Type Your Email Address"}),y.email&&(0,$.jsx)("div",{className:"text-danger fs-12",children:y.email})]}),(0,$.jsxs)("div",{className:"mb-3",style:{position:"relative"},children:[(0,$.jsx)("label",{className:"mb-1",children:(0,$.jsx)("strong",{children:"Password"})}),(0,$.jsx)("input",{type:L?"text":"password",className:"form-control",value:S,placeholder:"Type Your Password",onChange:function(e){return A(e.target.value)},onClick:function(){return M((function(e){return!e}))}}),(0,$.jsx)("div",{id:"pasToggle",style:{cursor:"pointer"},onClick:function(){return M((function(e){return!e}))},children:(0,$.jsx)(u.dSq,{style:{position:"absolute",top:"37",right:"10",font:"1.3rem"}})}),y.password&&(0,$.jsx)("div",{className:"text-danger fs-12",children:y.password})]}),(0,$.jsxs)("div",{className:"row d-flex justify-content-between mt-4 mb-2",children:[(0,$.jsx)("div",{className:"mb-3"}),(0,$.jsx)("div",{className:"form-group mb-3",children:(0,$.jsx)("div",{className:"form-check form-check-inline",children:(0,$.jsxs)("label",{className:"form-check-label",children:[(0,$.jsx)("input",{type:"checkbox",className:"form-check-input",value:P,onChange:function(e){return T((function(e){return!e}))}}),"Super-Admin"]})})})]}),(0,$.jsx)("div",{className:"text-center mb-4 ",children:(0,$.jsx)("button",{type:"submit",className:"btn btn-primary btn-block",children:"Sign Me In"})}),(0,$.jsx)("div",{className:"mb-3",onClick:function(){F((function(e){return!e}))},children:(0,$.jsx)("span",{children:"Forgot Password"})})]})]})})]})})]})})})})]})}))}}]);
//# sourceMappingURL=493.86671017.chunk.js.map