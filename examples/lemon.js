if(!window.Lemon) { // make sure execute code below once
var x = Object.defineProperty;
var T = (n, t, e) => t in n ? x(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var m = (n, t, e) => (T(n, typeof t != "symbol" ? t + "" : t, e), e);
var P = (n, t, e) => {
  if (t.has(n))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(n) : t.set(n, e);
};
function _(n, t, e) {
  return new Proxy(e, {
    set: function(o, i, r) {
      const c = JSON.parse(JSON.stringify(o)), s = o[i], a = r;
      return o[i] = r, i in n.watchers && n.watchers[t + "." + i].forEach((l) => {
        l(a, s);
      }), "this" in n.watchers && n.watchers.this.forEach((l) => {
        l(n, t + "." + i);
      }), t in n.watchers && n.watchers[t].forEach((l) => {
        l(o, c);
      }), !0;
    }
  });
}
function j(n, t, e) {
  return new Proxy(e, {
    set: function(o, i, r) {
      const c = o[i], s = r;
      return o[i] = r, i !== "length" && (i in n.watchers && n.watchers[t + "." + i].forEach((a) => {
        a(s, c);
      }), "this" in n.watchers && n.watchers.this.forEach((a) => {
        a(n, t + "." + i);
      }), t in n.watchers && n.watchers[t].forEach((a) => {
        a(o, c);
      })), !0;
    }
  });
}
function S(n) {
  return n instanceof HTMLInputElement || n instanceof HTMLTextAreaElement ? "value" : "innerText";
}
function L(n) {
  return n instanceof HTMLInputElement || n instanceof HTMLTextAreaElement ? "input" : "?";
}
function A(n) {
  let t = {};
  for (let e = 0; e < n.length; e++) {
    let o = "." + n[e];
    t[o] = n[e];
  }
  return t;
}
async function b(n, t = "html") {
  const e = {};
  let o = [];
  e.js = {}, e.css = {}, e.html = {};
  const i = Object.keys(n);
  for (let r = 0; r < i.length; r++) {
    const c = i[r], s = n[i[r]];
    for (let a = 0; a < s.length; a++) {
      let l = s[a], f = ["js", "css", "html"];
      for (let u = 0; u < f.length; u++) {
        let w = f[u];
        await new Promise((h, H) => {
          fetch(c + l + "." + w).then((p) => {
            p.status == 404 && (console.log("file " + l + "." + w + " doesn't exist!"), h()), p.text().then((E) => {
              e[w][l] = E, h();
            }).catch((E) => {
              console.log("FETCH ERR", String(E)), h();
            });
          }).catch((p) => {
            console.log("FETCH ERR", String(p)), h();
          });
        });
      }
    }
  }
  return await Promise.all(o), e[t];
}
async function M(n, t = "html") {
  let e;
  return localStorage.getItem("lemon_components") ? e = JSON.parse(localStorage.getItem("lemon_components")) : (e = await b(n, t), localStorage.setItem("lemon_components", JSON.stringify(e))), e;
}
const K = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  load: b,
  loadAndCache: M
}, Symbol.toStringTag, { value: "Module" }));
function O(n) {
  return new Proxy(n, {
    get(t, e) {
      return e === "isProxy" ? !0 : Reflect.get(...arguments);
    },
    set: function(t, e, o) {
      const i = t[e], r = o;
      t[e] = o, e in t.watchers && t.watchers[e].forEach((s) => {
        s(r, i);
      }), "this" in t.watchers && t.watchers.this.forEach((s) => {
        s(t, e);
      });
      let c = (s) => s == null ? !0 : !(typeof s == "object" || typeof s == "function");
      return t[e].isProxy || (Array.isArray(t[e]) ? t[e] = j(t, e, t[e]) : !c(t[e]) && t[e] instanceof Object && (t[e] = _(t, e, t[e]))), !0;
    }
  });
}
var d;
class V {
  constructor() {
    m(this, "watchers", {});
    m(this, "route");
    P(this, d, {});
  }
  watch(t, e) {
    t in this.watchers || (this.watchers[t] = []), this.watchers[t].push(e);
  }
  react(t = {}) {
    let e = t.inputs, o = t.outputs;
    e && this.inputs(e), o && this.outputs(o);
  }
  inputs(t) {
    const e = this;
    if (!t)
      throw new Error("lemonGlobals not defined for inputs");
    let o;
    Array.isArray(t) ? o = A(t) : o = t, Object.keys(o).forEach((r) => {
      let c = o[r], s = document.querySelector(r);
      if (s) {
        let a = L(s);
        s.addEventListener(a, () => {
          let l = s.value, f;
          if (c.split(".").length === 2) {
            let u = c.split(".");
            f = e[u[0]][u[1]], l !== f && (e[u[0]][u[1]] = l);
          } else
            l !== f && (f = e[c], l !== f && (e[c] = l));
        });
      }
      e.watch(c, () => {
        document.querySelectorAll(r).forEach((a) => {
          let l = e[c], f = S(a);
          a[f] = l;
        });
      });
    });
  }
  outputs(t) {
    const e = this;
    if (!t)
      throw new Error("lemonGlobals not defined for outputs");
    let o;
    Array.isArray(t) ? o = A(t) : o = t, Object.keys(o).forEach((r) => {
      let c = o[r];
      e.watch(c, () => {
        document.querySelectorAll(r).forEach((a) => {
          let l;
          c === "this" ? l = this : l = e[c];
          let f = S(a);
          a[f] = l;
        });
      });
    });
  }
  render(t, e, o = {}) {
    let i = document.querySelectorAll(t);
    if (i.length === 0)
      throw new Error("Parent not found: " + t);
    i.forEach((s) => {
      s.innerHTML = e;
    });
    let r = o.inputs, c = o.outputs;
    r && this.inputs(r), c && this.outputs(c);
  }
}
d = new WeakMap();
window.Lemon = O(new V());
window.LemonComponents = K;
}
