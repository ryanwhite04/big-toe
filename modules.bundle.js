// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

var l = globalThis, p = l.ShadowRoot && (l.ShadyCSS === void 0 || l.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, f = Symbol(), E = new WeakMap, h = class {
    constructor(t, e, s){
        if (this._$cssResult$ = !0, s !== f) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
        this.cssText = t, this.t = e;
    }
    get styleSheet() {
        let t = this.o, e = this.t;
        if (p && t === void 0) {
            let s = e !== void 0 && e.length === 1;
            s && (t = E.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet).replaceSync(this.cssText), s && E.set(e, t));
        }
        return t;
    }
    toString() {
        return this.cssText;
    }
}, m = (r)=>new h(typeof r == "string" ? r : r + "", void 0, f), v = (r, ...t)=>{
    let e = r.length === 1 ? r[0] : t.reduce((s, i, o)=>s + ((n)=>{
            if (n._$cssResult$ === !0) return n.cssText;
            if (typeof n == "number") return n;
            throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
        })(i) + r[o + 1], r[0]);
    return new h(e, r, f);
}, S = (r, t)=>{
    if (p) r.adoptedStyleSheets = t.map((e)=>e instanceof CSSStyleSheet ? e : e.styleSheet);
    else for (let e of t){
        let s = document.createElement("style"), i = l.litNonce;
        i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
    }
}, d = p ? (r)=>r : (r)=>r instanceof CSSStyleSheet ? ((t)=>{
        let e = "";
        for (let s of t.cssRules)e += s.cssText;
        return m(e);
    })(r) : r;
var { is: P, defineProperty: w, getOwnPropertyDescriptor: C, getOwnPropertyNames: U, getOwnPropertySymbols: A, getPrototypeOf: O } = Object, u = globalThis, _ = u.trustedTypes, R = _ ? _.emptyScript : "", T = u.reactiveElementPolyfillSupport, c = (r, t)=>r, y = {
    toAttribute (r, t) {
        switch(t){
            case Boolean:
                r = r ? R : null;
                break;
            case Object:
            case Array:
                r = r == null ? r : JSON.stringify(r);
        }
        return r;
    },
    fromAttribute (r, t) {
        let e = r;
        switch(t){
            case Boolean:
                e = r !== null;
                break;
            case Number:
                e = r === null ? null : Number(r);
                break;
            case Object:
            case Array:
                try {
                    e = JSON.parse(r);
                } catch  {
                    e = null;
                }
        }
        return e;
    }
}, g = (r, t)=>!P(r, t), $ = {
    attribute: !0,
    type: String,
    converter: y,
    reflect: !1,
    hasChanged: g
};
Symbol.metadata ??= Symbol("metadata"), u.litPropertyMetadata ??= new WeakMap;
var a = class extends HTMLElement {
    static addInitializer(t) {
        this._$Ei(), (this.l ??= []).push(t);
    }
    static get observedAttributes() {
        return this.finalize(), this._$Eh && [
            ...this._$Eh.keys()
        ];
    }
    static createProperty(t, e = $) {
        if (e.state && (e.attribute = !1), this._$Ei(), this.elementProperties.set(t, e), !e.noAccessor) {
            let s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
            i !== void 0 && w(this.prototype, t, i);
        }
    }
    static getPropertyDescriptor(t, e, s) {
        let { get: i, set: o } = C(this.prototype, t) ?? {
            get () {
                return this[e];
            },
            set (n) {
                this[e] = n;
            }
        };
        return {
            get () {
                return i?.call(this);
            },
            set (n) {
                let b = i?.call(this);
                o.call(this, n), this.requestUpdate(t, b, s);
            },
            configurable: !0,
            enumerable: !0
        };
    }
    static getPropertyOptions(t) {
        return this.elementProperties.get(t) ?? $;
    }
    static _$Ei() {
        if (this.hasOwnProperty(c("elementProperties"))) return;
        let t = O(this);
        t.finalize(), t.l !== void 0 && (this.l = [
            ...t.l
        ]), this.elementProperties = new Map(t.elementProperties);
    }
    static finalize() {
        if (this.hasOwnProperty(c("finalized"))) return;
        if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(c("properties"))) {
            let e = this.properties, s = [
                ...U(e),
                ...A(e)
            ];
            for (let i of s)this.createProperty(i, e[i]);
        }
        let t = this[Symbol.metadata];
        if (t !== null) {
            let e = litPropertyMetadata.get(t);
            if (e !== void 0) for (let [s, i] of e)this.elementProperties.set(s, i);
        }
        this._$Eh = new Map;
        for (let [e, s] of this.elementProperties){
            let i = this._$Eu(e, s);
            i !== void 0 && this._$Eh.set(i, e);
        }
        this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(t) {
        let e = [];
        if (Array.isArray(t)) {
            let s = new Set(t.flat(1 / 0).reverse());
            for (let i of s)e.unshift(d(i));
        } else t !== void 0 && e.push(d(t));
        return e;
    }
    static _$Eu(t, e) {
        let s = e.attribute;
        return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
    }
    constructor(){
        super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
    }
    _$Ev() {
        this._$Eg = new Promise((t)=>this.enableUpdating = t), this._$AL = new Map, this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t)=>t(this));
    }
    addController(t) {
        (this._$ES ??= []).push(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
    }
    removeController(t) {
        this._$ES?.splice(this._$ES.indexOf(t) >>> 0, 1);
    }
    _$E_() {
        let t = new Map, e = this.constructor.elementProperties;
        for (let s of e.keys())this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
        t.size > 0 && (this._$Ep = t);
    }
    createRenderRoot() {
        let t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
        return S(t, this.constructor.elementStyles), t;
    }
    connectedCallback() {
        this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$ES?.forEach((t)=>t.hostConnected?.());
    }
    enableUpdating(t) {}
    disconnectedCallback() {
        this._$ES?.forEach((t)=>t.hostDisconnected?.());
    }
    attributeChangedCallback(t, e, s) {
        this._$AK(t, s);
    }
    _$EO(t, e) {
        let s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
        if (i !== void 0 && s.reflect === !0) {
            let o = (s.converter?.toAttribute !== void 0 ? s.converter : y).toAttribute(e, s.type);
            this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
        }
    }
    _$AK(t, e) {
        let s = this.constructor, i = s._$Eh.get(t);
        if (i !== void 0 && this._$Em !== i) {
            let o = s.getPropertyOptions(i), n = typeof o.converter == "function" ? {
                fromAttribute: o.converter
            } : o.converter?.fromAttribute !== void 0 ? o.converter : y;
            this._$Em = i, this[i] = n.fromAttribute(e, o.type), this._$Em = null;
        }
    }
    requestUpdate(t, e, s, i = !1, o) {
        if (t !== void 0) {
            if (s ??= this.constructor.getPropertyOptions(t), !(s.hasChanged ?? g)(i ? o : this[t], e)) return;
            this.C(t, e, s);
        }
        this.isUpdatePending === !1 && (this._$Eg = this._$EP());
    }
    C(t, e, s) {
        this._$AL.has(t) || this._$AL.set(t, e), s.reflect === !0 && this._$Em !== t && (this._$Ej ??= new Set).add(t);
    }
    async _$EP() {
        this.isUpdatePending = !0;
        try {
            await this._$Eg;
        } catch (e) {
            Promise.reject(e);
        }
        let t = this.scheduleUpdate();
        return t != null && await t, !this.isUpdatePending;
    }
    scheduleUpdate() {
        return this.performUpdate();
    }
    performUpdate() {
        if (!this.isUpdatePending) return;
        if (!this.hasUpdated) {
            if (this._$Ep) {
                for (let [i, o] of this._$Ep)this[i] = o;
                this._$Ep = void 0;
            }
            let s = this.constructor.elementProperties;
            if (s.size > 0) for (let [i, o] of s)o.wrapped !== !0 || this._$AL.has(i) || this[i] === void 0 || this.C(i, this[i], o);
        }
        let t = !1, e = this._$AL;
        try {
            t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$ES?.forEach((s)=>s.hostUpdate?.()), this.update(e)) : this._$ET();
        } catch (s) {
            throw t = !1, this._$ET(), s;
        }
        t && this._$AE(e);
    }
    willUpdate(t) {}
    _$AE(t) {
        this._$ES?.forEach((e)=>e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
    }
    _$ET() {
        this._$AL = new Map, this.isUpdatePending = !1;
    }
    get updateComplete() {
        return this.getUpdateComplete();
    }
    getUpdateComplete() {
        return this._$Eg;
    }
    shouldUpdate(t) {
        return !0;
    }
    update(t) {
        this._$Ej &&= this._$Ej.forEach((e)=>this._$EO(e, this[e])), this._$ET();
    }
    updated(t) {}
    firstUpdated(t) {}
};
a.elementStyles = [], a.shadowRootOptions = {
    mode: "open"
}, a[c("elementProperties")] = new Map, a[c("finalized")] = new Map, T?.({
    ReactiveElement: a
}), (u.reactiveElementVersions ??= []).push("2.0.1");
const mod = {
    CSSResult: h,
    ReactiveElement: a,
    adoptStyles: S,
    css: v,
    defaultConverter: y,
    getCompatibleStyle: d,
    notEqual: g,
    supportsAdoptingStyleSheets: p,
    unsafeCSS: m
};
var U1 = globalThis, M = U1.trustedTypes, L = M ? M.createPolicy("lit-html", {
    createHTML: (o)=>o
}) : void 0, O1 = "$lit$", d1 = `lit$${(Math.random() + "").slice(9)}$`, R1 = "?" + d1, K = `<${R1}>`, v1 = document, H = ()=>v1.createComment(""), N = (o)=>o === null || typeof o != "object" && typeof o != "function", z = Array.isArray, Z = (o)=>z(o) || typeof o?.[Symbol.iterator] == "function", P1 = `[ 	
\f\r]`, x = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, W = /-->/g, k = />/g, u1 = RegExp(`>|${P1}(?:([^\\s"'>=/]+)(${P1}*=${P1}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), D = /'/g, V = /"/g, q = /^(?:script|style|textarea|title)$/i, F = (o)=>(t, ...s)=>({
            _$litType$: o,
            strings: t,
            values: s
        }), X = F(1), Y = F(2), b = Symbol.for("lit-noChange"), A1 = Symbol.for("lit-nothing"), j = new WeakMap, g1 = v1.createTreeWalker(v1, 129);
function G(o, t) {
    if (!Array.isArray(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return L !== void 0 ? L.createHTML(t) : t;
}
var J = (o, t)=>{
    let s = o.length - 1, e = [], i, n = t === 2 ? "<svg>" : "", r = x;
    for(let _ = 0; _ < s; _++){
        let h = o[_], $, a, l = -1, c = 0;
        for(; c < h.length && (r.lastIndex = c, a = r.exec(h), a !== null);)c = r.lastIndex, r === x ? a[1] === "!--" ? r = W : a[1] !== void 0 ? r = k : a[2] !== void 0 ? (q.test(a[2]) && (i = RegExp("</" + a[2], "g")), r = u1) : a[3] !== void 0 && (r = u1) : r === u1 ? a[0] === ">" ? (r = i ?? x, l = -1) : a[1] === void 0 ? l = -2 : (l = r.lastIndex - a[2].length, $ = a[1], r = a[3] === void 0 ? u1 : a[3] === '"' ? V : D) : r === V || r === D ? r = u1 : r === W || r === k ? r = x : (r = u1, i = void 0);
        let p = r === u1 && o[_ + 1].startsWith("/>") ? " " : "";
        n += r === x ? h + K : l >= 0 ? (e.push($), h.slice(0, l) + O1 + h.slice(l) + d1 + p) : h + d1 + (l === -2 ? _ : p);
    }
    return [
        G(o, n + (o[s] || "<?>") + (t === 2 ? "</svg>" : "")),
        e
    ];
}, C1 = class o {
    constructor({ strings: t, _$litType$: s }, e){
        let i;
        this.parts = [];
        let n = 0, r = 0, _ = t.length - 1, h = this.parts, [$, a] = J(t, s);
        if (this.el = o.createElement($, e), g1.currentNode = this.el.content, s === 2) {
            let l = this.el.content.firstChild;
            l.replaceWith(...l.childNodes);
        }
        for(; (i = g1.nextNode()) !== null && h.length < _;){
            if (i.nodeType === 1) {
                if (i.hasAttributes()) for (let l of i.getAttributeNames())if (l.endsWith(O1)) {
                    let c = a[r++], p = i.getAttribute(l).split(d1), T = /([.?@])?(.*)/.exec(c);
                    h.push({
                        type: 1,
                        index: n,
                        name: T[2],
                        strings: p,
                        ctor: T[1] === "." ? E1 : T[1] === "?" ? S1 : T[1] === "@" ? I : m1
                    }), i.removeAttribute(l);
                } else l.startsWith(d1) && (h.push({
                    type: 6,
                    index: n
                }), i.removeAttribute(l));
                if (q.test(i.tagName)) {
                    let l = i.textContent.split(d1), c = l.length - 1;
                    if (c > 0) {
                        i.textContent = M ? M.emptyScript : "";
                        for(let p = 0; p < c; p++)i.append(l[p], H()), g1.nextNode(), h.push({
                            type: 2,
                            index: ++n
                        });
                        i.append(l[c], H());
                    }
                }
            } else if (i.nodeType === 8) if (i.data === R1) h.push({
                type: 2,
                index: n
            });
            else {
                let l = -1;
                for(; (l = i.data.indexOf(d1, l + 1)) !== -1;)h.push({
                    type: 7,
                    index: n
                }), l += d1.length - 1;
            }
            n++;
        }
    }
    static createElement(t, s) {
        let e = v1.createElement("template");
        return e.innerHTML = t, e;
    }
};
function f1(o, t, s = o, e) {
    if (t === b) return t;
    let i = e !== void 0 ? s._$Co?.[e] : s._$Cl, n = N(t) ? void 0 : t._$litDirective$;
    return i?.constructor !== n && (i?._$AO?.(!1), n === void 0 ? i = void 0 : (i = new n(o), i._$AT(o, s, e)), e !== void 0 ? (s._$Co ??= [])[e] = i : s._$Cl = i), i !== void 0 && (t = f1(o, i._$AS(o, t.values), i, e)), t;
}
var w1 = class {
    constructor(t, s){
        this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = s;
    }
    get parentNode() {
        return this._$AM.parentNode;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    u(t) {
        let { el: { content: s }, parts: e } = this._$AD, i = (t?.creationScope ?? v1).importNode(s, !0);
        g1.currentNode = i;
        let n = g1.nextNode(), r = 0, _ = 0, h = e[0];
        for(; h !== void 0;){
            if (r === h.index) {
                let $;
                h.type === 2 ? $ = new y1(n, n.nextSibling, this, t) : h.type === 1 ? $ = new h.ctor(n, h.name, h.strings, this, t) : h.type === 6 && ($ = new B(n, this, t)), this._$AV.push($), h = e[++_];
            }
            r !== h?.index && (n = g1.nextNode(), r++);
        }
        return g1.currentNode = v1, i;
    }
    p(t) {
        let s = 0;
        for (let e of this._$AV)e !== void 0 && (e.strings !== void 0 ? (e._$AI(t, e, s), s += e.strings.length - 2) : e._$AI(t[s])), s++;
    }
}, y1 = class o {
    get _$AU() {
        return this._$AM?._$AU ?? this._$Cv;
    }
    constructor(t, s, e, i){
        this.type = 2, this._$AH = A1, this._$AN = void 0, this._$AA = t, this._$AB = s, this._$AM = e, this.options = i, this._$Cv = i?.isConnected ?? !0;
    }
    get parentNode() {
        let t = this._$AA.parentNode, s = this._$AM;
        return s !== void 0 && t?.nodeType === 11 && (t = s.parentNode), t;
    }
    get startNode() {
        return this._$AA;
    }
    get endNode() {
        return this._$AB;
    }
    _$AI(t, s = this) {
        t = f1(this, t, s), N(t) ? t === A1 || t == null || t === "" ? (this._$AH !== A1 && this._$AR(), this._$AH = A1) : t !== this._$AH && t !== b && this._(t) : t._$litType$ !== void 0 ? this.g(t) : t.nodeType !== void 0 ? this.$(t) : Z(t) ? this.T(t) : this._(t);
    }
    k(t) {
        return this._$AA.parentNode.insertBefore(t, this._$AB);
    }
    $(t) {
        this._$AH !== t && (this._$AR(), this._$AH = this.k(t));
    }
    _(t) {
        this._$AH !== A1 && N(this._$AH) ? this._$AA.nextSibling.data = t : this.$(v1.createTextNode(t)), this._$AH = t;
    }
    g(t) {
        let { values: s, _$litType$: e } = t, i = typeof e == "number" ? this._$AC(t) : (e.el === void 0 && (e.el = C1.createElement(G(e.h, e.h[0]), this.options)), e);
        if (this._$AH?._$AD === i) this._$AH.p(s);
        else {
            let n = new w1(i, this), r = n.u(this.options);
            n.p(s), this.$(r), this._$AH = n;
        }
    }
    _$AC(t) {
        let s = j.get(t.strings);
        return s === void 0 && j.set(t.strings, s = new C1(t)), s;
    }
    T(t) {
        z(this._$AH) || (this._$AH = [], this._$AR());
        let s = this._$AH, e, i = 0;
        for (let n of t)i === s.length ? s.push(e = new o(this.k(H()), this.k(H()), this, this.options)) : e = s[i], e._$AI(n), i++;
        i < s.length && (this._$AR(e && e._$AB.nextSibling, i), s.length = i);
    }
    _$AR(t = this._$AA.nextSibling, s) {
        for(this._$AP?.(!1, !0, s); t && t !== this._$AB;){
            let e = t.nextSibling;
            t.remove(), t = e;
        }
    }
    setConnected(t) {
        this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
    }
}, m1 = class {
    get tagName() {
        return this.element.tagName;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    constructor(t, s, e, i, n){
        this.type = 1, this._$AH = A1, this._$AN = void 0, this.element = t, this.name = s, this._$AM = i, this.options = n, e.length > 2 || e[0] !== "" || e[1] !== "" ? (this._$AH = Array(e.length - 1).fill(new String), this.strings = e) : this._$AH = A1;
    }
    _$AI(t, s = this, e, i) {
        let n = this.strings, r = !1;
        if (n === void 0) t = f1(this, t, s, 0), r = !N(t) || t !== this._$AH && t !== b, r && (this._$AH = t);
        else {
            let _ = t, h, $;
            for(t = n[0], h = 0; h < n.length - 1; h++)$ = f1(this, _[e + h], s, h), $ === b && ($ = this._$AH[h]), r ||= !N($) || $ !== this._$AH[h], $ === A1 ? t = A1 : t !== A1 && (t += ($ ?? "") + n[h + 1]), this._$AH[h] = $;
        }
        r && !i && this.O(t);
    }
    O(t) {
        t === A1 ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
    }
}, E1 = class extends m1 {
    constructor(){
        super(...arguments), this.type = 3;
    }
    O(t) {
        this.element[this.name] = t === A1 ? void 0 : t;
    }
}, S1 = class extends m1 {
    constructor(){
        super(...arguments), this.type = 4;
    }
    O(t) {
        this.element.toggleAttribute(this.name, !!t && t !== A1);
    }
}, I = class extends m1 {
    constructor(t, s, e, i, n){
        super(t, s, e, i, n), this.type = 5;
    }
    _$AI(t, s = this) {
        if ((t = f1(this, t, s, 0) ?? A1) === b) return;
        let e = this._$AH, i = t === A1 && e !== A1 || t.capture !== e.capture || t.once !== e.once || t.passive !== e.passive, n = t !== A1 && (e === A1 || i);
        i && this.element.removeEventListener(this.name, this, e), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
    }
    handleEvent(t) {
        typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
    }
}, B = class {
    constructor(t, s, e){
        this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = e;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    _$AI(t) {
        f1(this, t);
    }
}, tt = {
    j: O1,
    P: d1,
    A: R1,
    C: 1,
    M: J,
    L: w1,
    R: Z,
    V: f1,
    D: y1,
    I: m1,
    H: S1,
    N: I,
    U: E1,
    B
}, Q = U1.litHtmlPolyfillSupport;
Q?.(C1, y1), (U1.litHtmlVersions ??= []).push("3.0.2");
var et = (o, t, s)=>{
    let e = s?.renderBefore ?? t, i = e._$litPart$;
    if (i === void 0) {
        let n = s?.renderBefore ?? null;
        e._$litPart$ = i = new y1(t.insertBefore(H(), n), n, void 0, s ?? {});
    }
    return i._$AI(o), i;
};
const mod1 = {
    _$LH: tt,
    html: X,
    noChange: b,
    nothing: A1,
    render: et,
    svg: Y
};
var a1 = Object.defineProperty;
var p1 = Object.getOwnPropertyDescriptor;
var h1 = Object.getOwnPropertyNames;
var m2 = Object.prototype.hasOwnProperty;
var u2 = (o, r)=>{
    for(var n in r)a1(o, n, {
        get: r[n],
        enumerable: !0
    });
}, d2 = (o, r, n, l)=>{
    if (r && typeof r == "object" || typeof r == "function") for (let i of h1(r))!m2.call(o, i) && i !== n && a1(o, i, {
        get: ()=>r[i],
        enumerable: !(l = p1(r, i)) || l.enumerable
    });
    return o;
}, t = (o, r, n)=>(d2(o, r, "default"), n && d2(n, r, "default"));
var e = {};
u2(e, {
    LitElement: ()=>s,
    _$LE: ()=>c1
});
t(e, mod);
t(e, mod1);
var s = class extends a {
    constructor(){
        super(...arguments), this.renderOptions = {
            host: this
        }, this._$Do = void 0;
    }
    createRenderRoot() {
        let r = super.createRenderRoot();
        return this.renderOptions.renderBefore ??= r.firstChild, r;
    }
    update(r) {
        let n = this.render();
        this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(r), this._$Do = et(n, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
        super.connectedCallback(), this._$Do?.setConnected(!0);
    }
    disconnectedCallback() {
        super.disconnectedCallback(), this._$Do?.setConnected(!1);
    }
    render() {
        return b;
    }
};
s._$litElement$ = !0, s["finalized"] = !0, globalThis.litElementHydrateSupport?.({
    LitElement: s
});
var _1 = globalThis.litElementPolyfillSupport;
_1?.({
    LitElement: s
});
var c1 = {
    _$AK: (o, r, n)=>{
        o._$AK(r, n);
    },
    _$AL: (o)=>o._$AL
};
(globalThis.litElementVersions ??= []).push("4.0.1");
export { s as LitElement, X as html, v as css };
