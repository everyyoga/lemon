var M = Object.defineProperty;
var _ = (n, e, t) => e in n ? M(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var p = (n, e, t) => (_(n, typeof e != "symbol" ? e + "" : e, t), t);
var j = (n, e, t) => {
  if (e.has(n))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(n) : e.set(n, t);
};
function b(n, e, t) {
  return new Proxy(t, {
    set: function(r, o, l) {
      const s = JSON.parse(JSON.stringify(r)), i = r[o], f = l;
      return r[o] = l, o in n.watchers && n.watchers[e + "." + o].forEach((c) => {
        c(f, i);
      }), "this" in n.watchers && n.watchers.this.forEach((c) => {
        c(n, e + "." + o);
      }), e in n.watchers && n.watchers[e].forEach((c) => {
        c(r, s);
      }), !0;
    }
  });
}
function y(n, e, t) {
  return new Proxy(t, {
    set: function(r, o, l) {
      const s = r[o], i = l;
      return r[o] = l, o !== "length" && (o in n.watchers && n.watchers[e + "." + o].forEach((f) => {
        f(i, s);
      }), "this" in n.watchers && n.watchers.this.forEach((f) => {
        f(n, e + "." + o);
      }), e in n.watchers && n.watchers[e].forEach((f) => {
        f(r, s);
      })), !0;
    }
  });
}
function w(n) {
  return n instanceof HTMLInputElement || n instanceof HTMLTextAreaElement ? "value" : "innerText";
}
function T(n) {
  return n instanceof HTMLInputElement || n instanceof HTMLTextAreaElement ? "input" : "?";
}
function m(n) {
  let e = {};
  for (let t = 0; t < n.length; t++) {
    let r = "." + n[t];
    e[r] = n[t];
  }
  return e;
}
const K = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  lemon_object_create: b,
  lemon_list_create: y,
  getReplaceProperty: w,
  getReactiveEventName: T,
  convertGlobalsMap: m
}, Symbol.toStringTag, { value: "Module" }));
async function P(n, e = "html") {
  const t = { html: {}, css: {}, js: {} }, r = Object.keys(n);
  for (let o = 0; o < r.length; o++) {
    const l = r[o], s = n[r[o]];
    for (let i = 0; i < s.length; i++) {
      let f = s[i], c = ["js", "css", "html"];
      for (let u = 0; u < c.length; u++) {
        let h = c[u];
        try {
          let a = await fetch(l + f + "." + h);
          t[h][f] = await a.text();
        } catch (a) {
          console.error("fetch:error", String(a));
        }
      }
    }
  }
  return new Promise((o) => {
    o(t[e]);
  });
}
async function S(n) {
  let e;
  return e = await getComponents(n), e;
}
const v = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  load: P,
  lemon_components: S
}, Symbol.toStringTag, { value: "Module" }));
function L(n) {
  return new Proxy(n, {
    get(e, t) {
      return t === "isProxy" ? !0 : Reflect.get(...arguments);
    },
    set: function(e, t, r) {
      const o = e[t], l = r;
      e[t] = r, t in e.watchers && e.watchers[t].forEach((i) => {
        i(l, o);
      }), "this" in e.watchers && e.watchers.this.forEach((i) => {
        i(e, t);
      });
      let s = (i) => i == null ? !0 : !(typeof i == "object" || typeof i == "function");
      return e[t].isProxy || (Array.isArray(e[t]) ? e[t] = y(e, t, e[t]) : !s(e[t]) && e[t] instanceof Object && (e[t] = b(e, t, e[t]))), !0;
    }
  });
}
var E;
class O {
  constructor() {
    p(this, "watchers", {});
    p(this, "route");
    j(this, E, {});
  }
  watch(e, t) {
    e in this.watchers || (this.watchers[e] = []), this.watchers[e].push(t);
  }
  react(e = {}) {
    let t = e.inputs, r = e.outputs;
    t && this.inputs(t), r && this.outputs(r);
  }
  inputs(e) {
    const t = this;
    if (!e)
      throw new Error("lemonGlobals not defined for inputs");
    let r;
    Array.isArray(e) ? r = m(e) : r = e, Object.keys(r).forEach((l) => {
      let s = r[l], i = document.querySelector(l);
      if (i) {
        let f = T(i);
        i.addEventListener(f, () => {
          let c = i.value, u;
          if (s.split(".").length === 2) {
            let h = s.split(".");
            u = t[h[0]][h[1]], c !== u && (t[h[0]][h[1]] = c);
          } else
            c !== u && (u = t[s], c !== u && (t[s] = c));
        });
      }
      t.watch(s, () => {
        document.querySelectorAll(l).forEach((f) => {
          let c = t[s], u = w(f);
          f[u] = c;
        });
      });
    });
  }
  outputs(e) {
    const t = this;
    if (!e)
      throw new Error("lemonGlobals not defined for outputs");
    let r;
    Array.isArray(e) ? r = m(e) : r = e, Object.keys(r).forEach((l) => {
      let s = r[l];
      t.watch(s, () => {
        document.querySelectorAll(l).forEach((f) => {
          let c;
          s === "this" ? c = this : c = t[s];
          let u = w(f);
          f[u] = c;
        });
      });
    });
  }
  render(e, t, r = {}) {
    let o = document.querySelectorAll(e);
    if (o.length === 0)
      throw new Error("Parent not found: " + e);
    o.forEach((i) => {
      i.innerHTML = t;
    });
    let l = r.inputs, s = r.outputs;
    l && this.inputs(l), s && this.outputs(s);
  }
}
E = new WeakMap();
const x = L(new O());
window.Lemon = x;
window.LemonComponents = v;
async function A(n, e, t, r, o, l = null, s = null) {
  e.before && e.before(t.html), document.querySelector("#app").innerHTML += '<div id="lemon-css-holder"></div><div id="lemon-js-holder"></div>', r.watch("route", async (i, f) => {
    if (i === f)
      return;
    l && l(i, f), history.pushState(null, "", r.route);
    let c = document.querySelector(n);
    if (!c)
      throw new Error("Parent element not found for router. Query selector: " + n);
    document.querySelector("#lemon-css-holder").innerHTML = "", Object.keys(t.css).forEach((a) => {
      const d = t.css[a];
      d && (document.querySelector("#lemon-css-holder").innerHTML += "<style>" + d + "</style>");
    });
    let u = o[r.route].html;
    u ? c.innerHTML = u : console.log("The .html component for this route is undefined. Have you included the component in your components.js file?");
    let h = o[r.route].controller;
    if (h) {
      let a = h.before;
      a && await a(t.html);
    }
    if (document.querySelector("#lemon-js-holder").innerHTML = "", Object.keys(t.js).forEach((a) => {
      const d = document.createElement("script");
      t.js[a] && (d.innerHTML = t.js[a], document.querySelector("#lemon-js-holder").appendChild(d));
    }), h) {
      let a = h.after;
      a && await a();
    }
    s && s(i, f);
  }), e.after && e.after(), r.route = window.location.pathname;
}
const C = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  simpleLemonRouter: A
}, Symbol.toStringTag, { value: "Module" }));

