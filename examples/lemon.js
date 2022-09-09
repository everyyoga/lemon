var I = Object.defineProperty;
var F = (e, t, r) => t in e ? I(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var _ = (e, t, r) => (F(e, typeof t != "symbol" ? t + "" : t, r), r);
var O = (e, t, r) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, r);
};
function C(e, t, r) {
  return new Proxy(r, {
    set: function(n, s, o) {
      const a = JSON.parse(JSON.stringify(n)), l = n[s], i = o;
      return n[s] = o, s in e.watchers && e.watchers[t + "." + s].forEach((f) => {
        f(i, l);
      }), "this" in e.watchers && e.watchers.this.forEach((f) => {
        f(e, t + "." + s);
      }), t in e.watchers && e.watchers[t].forEach((f) => {
        f(n, a);
      }), !0;
    }
  });
}
function M(e, t, r) {
  return new Proxy(r, {
    set: function(n, s, o) {
      const a = n[s], l = o;
      return n[s] = o, s !== "length" && (s in e.watchers && e.watchers[t + "." + s].forEach((i) => {
        i(l, a);
      }), "this" in e.watchers && e.watchers.this.forEach((i) => {
        i(e, t + "." + s);
      }), t in e.watchers && e.watchers[t].forEach((i) => {
        i(n, a);
      })), !0;
    }
  });
}
function S(e) {
  return e instanceof HTMLInputElement || e instanceof HTMLTextAreaElement ? "value" : "innerText";
}
function q(e) {
  return e instanceof HTMLInputElement || e instanceof HTMLTextAreaElement ? "input" : "?";
}
function j(e) {
  let t = {};
  for (let r = 0; r < e.length; r++) {
    let n = "." + e[r];
    t[n] = e[r];
  }
  return t;
}
var u = typeof globalThis < "u" && globalThis || typeof self < "u" && self || typeof u < "u" && u, h = {
  searchParams: "URLSearchParams" in u,
  iterable: "Symbol" in u && "iterator" in Symbol,
  blob: "FileReader" in u && "Blob" in u && function() {
    try {
      return new Blob(), !0;
    } catch {
      return !1;
    }
  }(),
  formData: "FormData" in u,
  arrayBuffer: "ArrayBuffer" in u
};
function V(e) {
  return e && DataView.prototype.isPrototypeOf(e);
}
if (h.arrayBuffer)
  var G = [
    "[object Int8Array]",
    "[object Uint8Array]",
    "[object Uint8ClampedArray]",
    "[object Int16Array]",
    "[object Uint16Array]",
    "[object Int32Array]",
    "[object Uint32Array]",
    "[object Float32Array]",
    "[object Float64Array]"
  ], K = ArrayBuffer.isView || function(e) {
    return e && G.indexOf(Object.prototype.toString.call(e)) > -1;
  };
function m(e) {
  if (typeof e != "string" && (e = String(e)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(e) || e === "")
    throw new TypeError('Invalid character in header field name: "' + e + '"');
  return e.toLowerCase();
}
function x(e) {
  return typeof e != "string" && (e = String(e)), e;
}
function P(e) {
  var t = {
    next: function() {
      var r = e.shift();
      return { done: r === void 0, value: r };
    }
  };
  return h.iterable && (t[Symbol.iterator] = function() {
    return t;
  }), t;
}
function c(e) {
  this.map = {}, e instanceof c ? e.forEach(function(t, r) {
    this.append(r, t);
  }, this) : Array.isArray(e) ? e.forEach(function(t) {
    this.append(t[0], t[1]);
  }, this) : e && Object.getOwnPropertyNames(e).forEach(function(t) {
    this.append(t, e[t]);
  }, this);
}
c.prototype.append = function(e, t) {
  e = m(e), t = x(t);
  var r = this.map[e];
  this.map[e] = r ? r + ", " + t : t;
};
c.prototype.delete = function(e) {
  delete this.map[m(e)];
};
c.prototype.get = function(e) {
  return e = m(e), this.has(e) ? this.map[e] : null;
};
c.prototype.has = function(e) {
  return this.map.hasOwnProperty(m(e));
};
c.prototype.set = function(e, t) {
  this.map[m(e)] = x(t);
};
c.prototype.forEach = function(e, t) {
  for (var r in this.map)
    this.map.hasOwnProperty(r) && e.call(t, this.map[r], r, this);
};
c.prototype.keys = function() {
  var e = [];
  return this.forEach(function(t, r) {
    e.push(r);
  }), P(e);
};
c.prototype.values = function() {
  var e = [];
  return this.forEach(function(t) {
    e.push(t);
  }), P(e);
};
c.prototype.entries = function() {
  var e = [];
  return this.forEach(function(t, r) {
    e.push([r, t]);
  }), P(e);
};
h.iterable && (c.prototype[Symbol.iterator] = c.prototype.entries);
function g(e) {
  if (e.bodyUsed)
    return Promise.reject(new TypeError("Already read"));
  e.bodyUsed = !0;
}
function R(e) {
  return new Promise(function(t, r) {
    e.onload = function() {
      t(e.result);
    }, e.onerror = function() {
      r(e.error);
    };
  });
}
function z(e) {
  var t = new FileReader(), r = R(t);
  return t.readAsArrayBuffer(e), r;
}
function N(e) {
  var t = new FileReader(), r = R(t);
  return t.readAsText(e), r;
}
function J(e) {
  for (var t = new Uint8Array(e), r = new Array(t.length), n = 0; n < t.length; n++)
    r[n] = String.fromCharCode(t[n]);
  return r.join("");
}
function D(e) {
  if (e.slice)
    return e.slice(0);
  var t = new Uint8Array(e.byteLength);
  return t.set(new Uint8Array(e)), t.buffer;
}
function U() {
  return this.bodyUsed = !1, this._initBody = function(e) {
    this.bodyUsed = this.bodyUsed, this._bodyInit = e, e ? typeof e == "string" ? this._bodyText = e : h.blob && Blob.prototype.isPrototypeOf(e) ? this._bodyBlob = e : h.formData && FormData.prototype.isPrototypeOf(e) ? this._bodyFormData = e : h.searchParams && URLSearchParams.prototype.isPrototypeOf(e) ? this._bodyText = e.toString() : h.arrayBuffer && h.blob && V(e) ? (this._bodyArrayBuffer = D(e.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : h.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(e) || K(e)) ? this._bodyArrayBuffer = D(e) : this._bodyText = e = Object.prototype.toString.call(e) : this._bodyText = "", this.headers.get("content-type") || (typeof e == "string" ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : h.searchParams && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
  }, h.blob && (this.blob = function() {
    var e = g(this);
    if (e)
      return e;
    if (this._bodyBlob)
      return Promise.resolve(this._bodyBlob);
    if (this._bodyArrayBuffer)
      return Promise.resolve(new Blob([this._bodyArrayBuffer]));
    if (this._bodyFormData)
      throw new Error("could not read FormData body as blob");
    return Promise.resolve(new Blob([this._bodyText]));
  }, this.arrayBuffer = function() {
    if (this._bodyArrayBuffer) {
      var e = g(this);
      return e || (ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(
        this._bodyArrayBuffer.buffer.slice(
          this._bodyArrayBuffer.byteOffset,
          this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
        )
      ) : Promise.resolve(this._bodyArrayBuffer));
    } else
      return this.blob().then(z);
  }), this.text = function() {
    var e = g(this);
    if (e)
      return e;
    if (this._bodyBlob)
      return N(this._bodyBlob);
    if (this._bodyArrayBuffer)
      return Promise.resolve(J(this._bodyArrayBuffer));
    if (this._bodyFormData)
      throw new Error("could not read FormData body as text");
    return Promise.resolve(this._bodyText);
  }, h.formData && (this.formData = function() {
    return this.text().then(W);
  }), this.json = function() {
    return this.text().then(JSON.parse);
  }, this;
}
var X = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
function $(e) {
  var t = e.toUpperCase();
  return X.indexOf(t) > -1 ? t : e;
}
function w(e, t) {
  if (!(this instanceof w))
    throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
  t = t || {};
  var r = t.body;
  if (e instanceof w) {
    if (e.bodyUsed)
      throw new TypeError("Already read");
    this.url = e.url, this.credentials = e.credentials, t.headers || (this.headers = new c(e.headers)), this.method = e.method, this.mode = e.mode, this.signal = e.signal, !r && e._bodyInit != null && (r = e._bodyInit, e.bodyUsed = !0);
  } else
    this.url = String(e);
  if (this.credentials = t.credentials || this.credentials || "same-origin", (t.headers || !this.headers) && (this.headers = new c(t.headers)), this.method = $(t.method || this.method || "GET"), this.mode = t.mode || this.mode || null, this.signal = t.signal || this.signal, this.referrer = null, (this.method === "GET" || this.method === "HEAD") && r)
    throw new TypeError("Body not allowed for GET or HEAD requests");
  if (this._initBody(r), (this.method === "GET" || this.method === "HEAD") && (t.cache === "no-store" || t.cache === "no-cache")) {
    var n = /([?&])_=[^&]*/;
    if (n.test(this.url))
      this.url = this.url.replace(n, "$1_=" + new Date().getTime());
    else {
      var s = /\?/;
      this.url += (s.test(this.url) ? "&" : "?") + "_=" + new Date().getTime();
    }
  }
}
w.prototype.clone = function() {
  return new w(this, { body: this._bodyInit });
};
function W(e) {
  var t = new FormData();
  return e.trim().split("&").forEach(function(r) {
    if (r) {
      var n = r.split("="), s = n.shift().replace(/\+/g, " "), o = n.join("=").replace(/\+/g, " ");
      t.append(decodeURIComponent(s), decodeURIComponent(o));
    }
  }), t;
}
function Y(e) {
  var t = new c(), r = e.replace(/\r?\n[\t ]+/g, " ");
  return r.split("\r").map(function(n) {
    return n.indexOf(`
`) === 0 ? n.substr(1, n.length) : n;
  }).forEach(function(n) {
    var s = n.split(":"), o = s.shift().trim();
    if (o) {
      var a = s.join(":").trim();
      t.append(o, a);
    }
  }), t;
}
U.call(w.prototype);
function p(e, t) {
  if (!(this instanceof p))
    throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
  t || (t = {}), this.type = "default", this.status = t.status === void 0 ? 200 : t.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = t.statusText === void 0 ? "" : "" + t.statusText, this.headers = new c(t.headers), this.url = t.url || "", this._initBody(e);
}
U.call(p.prototype);
p.prototype.clone = function() {
  return new p(this._bodyInit, {
    status: this.status,
    statusText: this.statusText,
    headers: new c(this.headers),
    url: this.url
  });
};
p.error = function() {
  var e = new p(null, { status: 0, statusText: "" });
  return e.type = "error", e;
};
var Z = [301, 302, 303, 307, 308];
p.redirect = function(e, t) {
  if (Z.indexOf(t) === -1)
    throw new RangeError("Invalid status code");
  return new p(null, { status: t, headers: { location: e } });
};
var b = u.DOMException;
try {
  new b();
} catch {
  b = function(t, r) {
    this.message = t, this.name = r;
    var n = Error(t);
    this.stack = n.stack;
  }, b.prototype = Object.create(Error.prototype), b.prototype.constructor = b;
}
function L(e, t) {
  return new Promise(function(r, n) {
    var s = new w(e, t);
    if (s.signal && s.signal.aborted)
      return n(new b("Aborted", "AbortError"));
    var o = new XMLHttpRequest();
    function a() {
      o.abort();
    }
    o.onload = function() {
      var i = {
        status: o.status,
        statusText: o.statusText,
        headers: Y(o.getAllResponseHeaders() || "")
      };
      i.url = "responseURL" in o ? o.responseURL : i.headers.get("X-Request-URL");
      var f = "response" in o ? o.response : o.responseText;
      setTimeout(function() {
        r(new p(f, i));
      }, 0);
    }, o.onerror = function() {
      setTimeout(function() {
        n(new TypeError("Network request failed"));
      }, 0);
    }, o.ontimeout = function() {
      setTimeout(function() {
        n(new TypeError("Network request failed"));
      }, 0);
    }, o.onabort = function() {
      setTimeout(function() {
        n(new b("Aborted", "AbortError"));
      }, 0);
    };
    function l(i) {
      try {
        return i === "" && u.location.href ? u.location.href : i;
      } catch {
        return i;
      }
    }
    o.open(s.method, l(s.url), !0), s.credentials === "include" ? o.withCredentials = !0 : s.credentials === "omit" && (o.withCredentials = !1), "responseType" in o && (h.blob ? o.responseType = "blob" : h.arrayBuffer && s.headers.get("Content-Type") && s.headers.get("Content-Type").indexOf("application/octet-stream") !== -1 && (o.responseType = "arraybuffer")), t && typeof t.headers == "object" && !(t.headers instanceof c) ? Object.getOwnPropertyNames(t.headers).forEach(function(i) {
      o.setRequestHeader(i, x(t.headers[i]));
    }) : s.headers.forEach(function(i, f) {
      o.setRequestHeader(f, i);
    }), s.signal && (s.signal.addEventListener("abort", a), o.onreadystatechange = function() {
      o.readyState === 4 && s.signal.removeEventListener("abort", a);
    }), o.send(typeof s._bodyInit > "u" ? null : s._bodyInit);
  });
}
L.polyfill = !0;
u.fetch || (u.fetch = L, u.Headers = c, u.Request = w, u.Response = p);
async function H(e, t = "html") {
  const r = {};
  let n = [];
  r.js = {}, r.css = {}, r.html = {};
  const s = Object.keys(e);
  for (let o = 0; o < s.length; o++) {
    const a = s[o], l = e[s[o]];
    for (let i = 0; i < l.length; i++) {
      let f = l[i], d = ["js", "css", "html"];
      for (let y = 0; y < d.length; y++) {
        let T = d[y];
        await new Promise((E, re) => {
          fetch(a + f + "." + T).then((A) => {
            A.status == 404 && (console.log("file " + f + "." + T + " doesn't exist!"), E()), A.text().then((v) => {
              r[T][f] = v, E();
            }).catch((v) => {
              console.log("FETCH ERR", String(v)), E();
            });
          }).catch((A) => {
            console.log("FETCH ERR", String(A)), E();
          });
        });
      }
    }
  }
  return await Promise.all(n), r[t];
}
async function Q(e, t = "html") {
  let r;
  return localStorage.getItem("lemon_components") ? r = JSON.parse(localStorage.getItem("lemon_components")) : (r = await H(e, t), localStorage.setItem("lemon_components", JSON.stringify(r))), r;
}
const k = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  load: H,
  loadAndCache: Q
}, Symbol.toStringTag, { value: "Module" }));
function ee(e) {
  return new Proxy(e, {
    get(t, r) {
      return r === "isProxy" ? !0 : Reflect.get(...arguments);
    },
    set: function(t, r, n) {
      const s = t[r], o = n;
      t[r] = n, r in t.watchers && t.watchers[r].forEach((l) => {
        l(o, s);
      }), "this" in t.watchers && t.watchers.this.forEach((l) => {
        l(t, r);
      });
      let a = (l) => l == null ? !0 : !(typeof l == "object" || typeof l == "function");
      return t[r].isProxy || (Array.isArray(t[r]) ? t[r] = M(t, r, t[r]) : !a(t[r]) && t[r] instanceof Object && (t[r] = C(t, r, t[r]))), !0;
    }
  });
}
var B;
class te {
  constructor() {
    _(this, "watchers", {});
    _(this, "route");
    O(this, B, {});
  }
  watch(t, r) {
    t in this.watchers || (this.watchers[t] = []), this.watchers[t].push(r);
  }
  react(t = {}) {
    let r = t.inputs, n = t.outputs;
    r && this.inputs(r), n && this.outputs(n);
  }
  inputs(t) {
    const r = this;
    if (!t)
      throw new Error("lemonGlobals not defined for inputs");
    let n;
    Array.isArray(t) ? n = j(t) : n = t, Object.keys(n).forEach((o) => {
      let a = n[o], l = document.querySelector(o);
      if (l) {
        let i = q(l);
        l.addEventListener(i, () => {
          let f = l.value, d;
          if (a.split(".").length === 2) {
            let y = a.split(".");
            d = r[y[0]][y[1]], f !== d && (r[y[0]][y[1]] = f);
          } else
            f !== d && (d = r[a], f !== d && (r[a] = f));
        });
      }
      r.watch(a, () => {
        document.querySelectorAll(o).forEach((i) => {
          let f = r[a], d = S(i);
          i[d] = f;
        });
      });
    });
  }
  outputs(t) {
    const r = this;
    if (!t)
      throw new Error("lemonGlobals not defined for outputs");
    let n;
    Array.isArray(t) ? n = j(t) : n = t, Object.keys(n).forEach((o) => {
      let a = n[o];
      r.watch(a, () => {
        document.querySelectorAll(o).forEach((i) => {
          let f;
          a === "this" ? f = this : f = r[a];
          let d = S(i);
          i[d] = f;
        });
      });
    });
  }
  render(t, r, n = {}) {
    let s = document.querySelectorAll(t);
    if (s.length === 0)
      throw new Error("Parent not found: " + t);
    s.forEach((l) => {
      l.innerHTML = r;
    });
    let o = n.inputs, a = n.outputs;
    o && this.inputs(o), a && this.outputs(a);
  }
}
B = new WeakMap();
window.Lemon = ee(new te());
window.LemonComponents = k;
