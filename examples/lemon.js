if(!window.Lemon) {
  var ue = Object.defineProperty;
  var le = (e, t, r) => t in e ? ue(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
  var X = (e, t, r) => (le(e, typeof t != "symbol" ? t + "" : t, r), r);
  var te = (e, t, r) => {
    if (t.has(e))
      throw TypeError("Cannot add the same private member more than once");
    t instanceof WeakSet ? t.add(e) : t.set(e, r);
  };
  function he(e, t, r) {
    return new Proxy(r, {
      set: function(c, h, u) {
        const _ = JSON.parse(JSON.stringify(c)), m = c[h], w = u;
        return c[h] = u, h in e.watchers && e.watchers[t + "." + h].forEach((n) => {
          n(w, m);
        }), "this" in e.watchers && e.watchers.this.forEach((n) => {
          n(e, t + "." + h);
        }), t in e.watchers && e.watchers[t].forEach((n) => {
          n(c, _);
        }), !0;
      }
    });
  }
  function de(e, t, r) {
    return new Proxy(r, {
      set: function(c, h, u) {
        const _ = c[h], m = u;
        return c[h] = u, h !== "length" && (h in e.watchers && e.watchers[t + "." + h].forEach((w) => {
          w(m, _);
        }), "this" in e.watchers && e.watchers.this.forEach((w) => {
          w(e, t + "." + h);
        }), t in e.watchers && e.watchers[t].forEach((w) => {
          w(c, _);
        })), !0;
      }
    });
  }
  function re(e) {
    return e instanceof HTMLInputElement || e instanceof HTMLTextAreaElement ? "value" : "innerText";
  }
  function pe(e) {
    return e instanceof HTMLInputElement || e instanceof HTMLTextAreaElement ? "input" : "?";
  }
  function ne(e) {
    let t = {};
    for (let r = 0; r < e.length; r++) {
      let c = "." + e[r];
      t[c] = e[r];
    }
    return t;
  }
  var O = typeof globalThis < "u" && globalThis || typeof self < "u" && self || typeof O < "u" && O, j = {
    searchParams: "URLSearchParams" in O,
    iterable: "Symbol" in O && "iterator" in Symbol,
    blob: "FileReader" in O && "Blob" in O && function() {
      try {
        return new Blob(), !0;
      } catch {
        return !1;
      }
    }(),
    formData: "FormData" in O,
    arrayBuffer: "ArrayBuffer" in O
  };
  function ye(e) {
    return e && DataView.prototype.isPrototypeOf(e);
  }
  if (j.arrayBuffer)
    var ve = [
      "[object Int8Array]",
      "[object Uint8Array]",
      "[object Uint8ClampedArray]",
      "[object Int16Array]",
      "[object Uint16Array]",
      "[object Int32Array]",
      "[object Uint32Array]",
      "[object Float32Array]",
      "[object Float64Array]"
    ], we = ArrayBuffer.isView || function(e) {
      return e && ve.indexOf(Object.prototype.toString.call(e)) > -1;
    };
  function z(e) {
    if (typeof e != "string" && (e = String(e)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(e) || e === "")
      throw new TypeError('Invalid character in header field name: "' + e + '"');
    return e.toLowerCase();
  }
  function k(e) {
    return typeof e != "string" && (e = String(e)), e;
  }
  function ee(e) {
    var t = {
      next: function() {
        var r = e.shift();
        return { done: r === void 0, value: r };
      }
    };
    return j.iterable && (t[Symbol.iterator] = function() {
      return t;
    }), t;
  }
  function S(e) {
    this.map = {}, e instanceof S ? e.forEach(function(t, r) {
      this.append(r, t);
    }, this) : Array.isArray(e) ? e.forEach(function(t) {
      this.append(t[0], t[1]);
    }, this) : e && Object.getOwnPropertyNames(e).forEach(function(t) {
      this.append(t, e[t]);
    }, this);
  }
  S.prototype.append = function(e, t) {
    e = z(e), t = k(t);
    var r = this.map[e];
    this.map[e] = r ? r + ", " + t : t;
  };
  S.prototype.delete = function(e) {
    delete this.map[z(e)];
  };
  S.prototype.get = function(e) {
    return e = z(e), this.has(e) ? this.map[e] : null;
  };
  S.prototype.has = function(e) {
    return this.map.hasOwnProperty(z(e));
  };
  S.prototype.set = function(e, t) {
    this.map[z(e)] = k(t);
  };
  S.prototype.forEach = function(e, t) {
    for (var r in this.map)
      this.map.hasOwnProperty(r) && e.call(t, this.map[r], r, this);
  };
  S.prototype.keys = function() {
    var e = [];
    return this.forEach(function(t, r) {
      e.push(r);
    }), ee(e);
  };
  S.prototype.values = function() {
    var e = [];
    return this.forEach(function(t) {
      e.push(t);
    }), ee(e);
  };
  S.prototype.entries = function() {
    var e = [];
    return this.forEach(function(t, r) {
      e.push([r, t]);
    }), ee(e);
  };
  j.iterable && (S.prototype[Symbol.iterator] = S.prototype.entries);
  function Y(e) {
    if (e.bodyUsed)
      return Promise.reject(new TypeError("Already read"));
    e.bodyUsed = !0;
  }
  function se(e) {
    return new Promise(function(t, r) {
      e.onload = function() {
        t(e.result);
      }, e.onerror = function() {
        r(e.error);
      };
    });
  }
  function be(e) {
    var t = new FileReader(), r = se(t);
    return t.readAsArrayBuffer(e), r;
  }
  function me(e) {
    var t = new FileReader(), r = se(t);
    return t.readAsText(e), r;
  }
  function _e(e) {
    for (var t = new Uint8Array(e), r = new Array(t.length), c = 0; c < t.length; c++)
      r[c] = String.fromCharCode(t[c]);
    return r.join("");
  }
  function oe(e) {
    if (e.slice)
      return e.slice(0);
    var t = new Uint8Array(e.byteLength);
    return t.set(new Uint8Array(e)), t.buffer;
  }
  function ae() {
    return this.bodyUsed = !1, this._initBody = function(e) {
      this.bodyUsed = this.bodyUsed, this._bodyInit = e, e ? typeof e == "string" ? this._bodyText = e : j.blob && Blob.prototype.isPrototypeOf(e) ? this._bodyBlob = e : j.formData && FormData.prototype.isPrototypeOf(e) ? this._bodyFormData = e : j.searchParams && URLSearchParams.prototype.isPrototypeOf(e) ? this._bodyText = e.toString() : j.arrayBuffer && j.blob && ye(e) ? (this._bodyArrayBuffer = oe(e.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : j.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(e) || we(e)) ? this._bodyArrayBuffer = oe(e) : this._bodyText = e = Object.prototype.toString.call(e) : this._bodyText = "", this.headers.get("content-type") || (typeof e == "string" ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : j.searchParams && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
    }, j.blob && (this.blob = function() {
      var e = Y(this);
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
        var e = Y(this);
        return e || (ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(
          this._bodyArrayBuffer.buffer.slice(
            this._bodyArrayBuffer.byteOffset,
            this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
          )
        ) : Promise.resolve(this._bodyArrayBuffer));
      } else
        return this.blob().then(be);
    }), this.text = function() {
      var e = Y(this);
      if (e)
        return e;
      if (this._bodyBlob)
        return me(this._bodyBlob);
      if (this._bodyArrayBuffer)
        return Promise.resolve(_e(this._bodyArrayBuffer));
      if (this._bodyFormData)
        throw new Error("could not read FormData body as text");
      return Promise.resolve(this._bodyText);
    }, j.formData && (this.formData = function() {
      return this.text().then(Be);
    }), this.json = function() {
      return this.text().then(JSON.parse);
    }, this;
  }
  var ge = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
  function xe(e) {
    var t = e.toUpperCase();
    return ge.indexOf(t) > -1 ? t : e;
  }
  function F(e, t) {
    if (!(this instanceof F))
      throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
    t = t || {};
    var r = t.body;
    if (e instanceof F) {
      if (e.bodyUsed)
        throw new TypeError("Already read");
      this.url = e.url, this.credentials = e.credentials, t.headers || (this.headers = new S(e.headers)), this.method = e.method, this.mode = e.mode, this.signal = e.signal, !r && e._bodyInit != null && (r = e._bodyInit, e.bodyUsed = !0);
    } else
      this.url = String(e);
    if (this.credentials = t.credentials || this.credentials || "same-origin", (t.headers || !this.headers) && (this.headers = new S(t.headers)), this.method = xe(t.method || this.method || "GET"), this.mode = t.mode || this.mode || null, this.signal = t.signal || this.signal, this.referrer = null, (this.method === "GET" || this.method === "HEAD") && r)
      throw new TypeError("Body not allowed for GET or HEAD requests");
    if (this._initBody(r), (this.method === "GET" || this.method === "HEAD") && (t.cache === "no-store" || t.cache === "no-cache")) {
      var c = /([?&])_=[^&]*/;
      if (c.test(this.url))
        this.url = this.url.replace(c, "$1_=" + new Date().getTime());
      else {
        var h = /\?/;
        this.url += (h.test(this.url) ? "&" : "?") + "_=" + new Date().getTime();
      }
    }
  }
  F.prototype.clone = function() {
    return new F(this, { body: this._bodyInit });
  };
  function Be(e) {
    var t = new FormData();
    return e.trim().split("&").forEach(function(r) {
      if (r) {
        var c = r.split("="), h = c.shift().replace(/\+/g, " "), u = c.join("=").replace(/\+/g, " ");
        t.append(decodeURIComponent(h), decodeURIComponent(u));
      }
    }), t;
  }
  function Ee(e) {
    var t = new S(), r = e.replace(/\r?\n[\t ]+/g, " ");
    return r.split("\r").map(function(c) {
      return c.indexOf(`
  `) === 0 ? c.substr(1, c.length) : c;
    }).forEach(function(c) {
      var h = c.split(":"), u = h.shift().trim();
      if (u) {
        var _ = h.join(":").trim();
        t.append(u, _);
      }
    }), t;
  }
  ae.call(F.prototype);
  function C(e, t) {
    if (!(this instanceof C))
      throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
    t || (t = {}), this.type = "default", this.status = t.status === void 0 ? 200 : t.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = t.statusText === void 0 ? "" : "" + t.statusText, this.headers = new S(t.headers), this.url = t.url || "", this._initBody(e);
  }
  ae.call(C.prototype);
  C.prototype.clone = function() {
    return new C(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new S(this.headers),
      url: this.url
    });
  };
  C.error = function() {
    var e = new C(null, { status: 0, statusText: "" });
    return e.type = "error", e;
  };
  var Te = [301, 302, 303, 307, 308];
  C.redirect = function(e, t) {
    if (Te.indexOf(t) === -1)
      throw new RangeError("Invalid status code");
    return new C(null, { status: t, headers: { location: e } });
  };
  var L = O.DOMException;
  try {
    new L();
  } catch {
    L = function(t, r) {
      this.message = t, this.name = r;
      var c = Error(t);
      this.stack = c.stack;
    }, L.prototype = Object.create(Error.prototype), L.prototype.constructor = L;
  }
  function fe(e, t) {
    return new Promise(function(r, c) {
      var h = new F(e, t);
      if (h.signal && h.signal.aborted)
        return c(new L("Aborted", "AbortError"));
      var u = new XMLHttpRequest();
      function _() {
        u.abort();
      }
      u.onload = function() {
        var w = {
          status: u.status,
          statusText: u.statusText,
          headers: Ee(u.getAllResponseHeaders() || "")
        };
        w.url = "responseURL" in u ? u.responseURL : w.headers.get("X-Request-URL");
        var n = "response" in u ? u.response : u.responseText;
        setTimeout(function() {
          r(new C(n, w));
        }, 0);
      }, u.onerror = function() {
        setTimeout(function() {
          c(new TypeError("Network request failed"));
        }, 0);
      }, u.ontimeout = function() {
        setTimeout(function() {
          c(new TypeError("Network request failed"));
        }, 0);
      }, u.onabort = function() {
        setTimeout(function() {
          c(new L("Aborted", "AbortError"));
        }, 0);
      };
      function m(w) {
        try {
          return w === "" && O.location.href ? O.location.href : w;
        } catch {
          return w;
        }
      }
      u.open(h.method, m(h.url), !0), h.credentials === "include" ? u.withCredentials = !0 : h.credentials === "omit" && (u.withCredentials = !1), "responseType" in u && (j.blob ? u.responseType = "blob" : j.arrayBuffer && h.headers.get("Content-Type") && h.headers.get("Content-Type").indexOf("application/octet-stream") !== -1 && (u.responseType = "arraybuffer")), t && typeof t.headers == "object" && !(t.headers instanceof S) ? Object.getOwnPropertyNames(t.headers).forEach(function(w) {
        u.setRequestHeader(w, k(t.headers[w]));
      }) : h.headers.forEach(function(w, n) {
        u.setRequestHeader(n, w);
      }), h.signal && (h.signal.addEventListener("abort", _), u.onreadystatechange = function() {
        u.readyState === 4 && h.signal.removeEventListener("abort", _);
      }), u.send(typeof h._bodyInit > "u" ? null : h._bodyInit);
    });
  }
  fe.polyfill = !0;
  O.fetch || (O.fetch = fe, O.Headers = S, O.Request = F, O.Response = C);
  var q = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
  function Ae(e) {
    var t = e.default;
    if (typeof t == "function") {
      var r = function() {
        return t.apply(this, arguments);
      };
      r.prototype = t.prototype;
    } else
      r = {};
    return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(e).forEach(function(c) {
      var h = Object.getOwnPropertyDescriptor(e, c);
      Object.defineProperty(r, c, h.get ? h : {
        enumerable: !0,
        get: function() {
          return e[c];
        }
      });
    }), r;
  }
  var ce = { exports: {} };
  function Pe(e) {
    throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
  }
  var Z = { exports: {} };
  const Se = {}, Oe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: Se
  }, Symbol.toStringTag, { value: "Module" })), Re = /* @__PURE__ */ Ae(Oe);
  var ie;
  function je() {
    return ie || (ie = 1, function(e, t) {
      (function(r, c) {
        e.exports = c();
      })(q, function() {
        var r = r || function(c, h) {
          var u;
          if (typeof window < "u" && window.crypto && (u = window.crypto), typeof self < "u" && self.crypto && (u = self.crypto), typeof globalThis < "u" && globalThis.crypto && (u = globalThis.crypto), !u && typeof window < "u" && window.msCrypto && (u = window.msCrypto), !u && typeof q < "u" && q.crypto && (u = q.crypto), !u && typeof Pe == "function")
            try {
              u = Re;
            } catch {
            }
          var _ = function() {
            if (u) {
              if (typeof u.getRandomValues == "function")
                try {
                  return u.getRandomValues(new Uint32Array(1))[0];
                } catch {
                }
              if (typeof u.randomBytes == "function")
                try {
                  return u.randomBytes(4).readInt32LE();
                } catch {
                }
            }
            throw new Error("Native crypto module could not be used to get secure random number.");
          }, m = Object.create || function() {
            function o() {
            }
            return function(l) {
              var d;
              return o.prototype = l, d = new o(), o.prototype = null, d;
            };
          }(), w = {}, n = w.lib = {}, T = n.Base = function() {
            return {
              extend: function(o) {
                var l = m(this);
                return o && l.mixIn(o), (!l.hasOwnProperty("init") || this.init === l.init) && (l.init = function() {
                  l.$super.init.apply(this, arguments);
                }), l.init.prototype = l, l.$super = this, l;
              },
              create: function() {
                var o = this.extend();
                return o.init.apply(o, arguments), o;
              },
              init: function() {
              },
              mixIn: function(o) {
                for (var l in o)
                  o.hasOwnProperty(l) && (this[l] = o[l]);
                o.hasOwnProperty("toString") && (this.toString = o.toString);
              },
              clone: function() {
                return this.init.prototype.extend(this);
              }
            };
          }(), g = n.WordArray = T.extend({
            init: function(o, l) {
              o = this.words = o || [], l != h ? this.sigBytes = l : this.sigBytes = o.length * 4;
            },
            toString: function(o) {
              return (o || A).stringify(this);
            },
            concat: function(o) {
              var l = this.words, d = o.words, y = this.sigBytes, b = o.sigBytes;
              if (this.clamp(), y % 4)
                for (var x = 0; x < b; x++) {
                  var D = d[x >>> 2] >>> 24 - x % 4 * 8 & 255;
                  l[y + x >>> 2] |= D << 24 - (y + x) % 4 * 8;
                }
              else
                for (var R = 0; R < b; R += 4)
                  l[y + R >>> 2] = d[R >>> 2];
              return this.sigBytes += b, this;
            },
            clamp: function() {
              var o = this.words, l = this.sigBytes;
              o[l >>> 2] &= 4294967295 << 32 - l % 4 * 8, o.length = c.ceil(l / 4);
            },
            clone: function() {
              var o = T.clone.call(this);
              return o.words = this.words.slice(0), o;
            },
            random: function(o) {
              for (var l = [], d = 0; d < o; d += 4)
                l.push(_());
              return new g.init(l, o);
            }
          }), B = w.enc = {}, A = B.Hex = {
            stringify: function(o) {
              for (var l = o.words, d = o.sigBytes, y = [], b = 0; b < d; b++) {
                var x = l[b >>> 2] >>> 24 - b % 4 * 8 & 255;
                y.push((x >>> 4).toString(16)), y.push((x & 15).toString(16));
              }
              return y.join("");
            },
            parse: function(o) {
              for (var l = o.length, d = [], y = 0; y < l; y += 2)
                d[y >>> 3] |= parseInt(o.substr(y, 2), 16) << 24 - y % 8 * 4;
              return new g.init(d, l / 2);
            }
          }, E = B.Latin1 = {
            stringify: function(o) {
              for (var l = o.words, d = o.sigBytes, y = [], b = 0; b < d; b++) {
                var x = l[b >>> 2] >>> 24 - b % 4 * 8 & 255;
                y.push(String.fromCharCode(x));
              }
              return y.join("");
            },
            parse: function(o) {
              for (var l = o.length, d = [], y = 0; y < l; y++)
                d[y >>> 2] |= (o.charCodeAt(y) & 255) << 24 - y % 4 * 8;
              return new g.init(d, l);
            }
          }, p = B.Utf8 = {
            stringify: function(o) {
              try {
                return decodeURIComponent(escape(E.stringify(o)));
              } catch {
                throw new Error("Malformed UTF-8 data");
              }
            },
            parse: function(o) {
              return E.parse(unescape(encodeURIComponent(o)));
            }
          }, v = n.BufferedBlockAlgorithm = T.extend({
            reset: function() {
              this._data = new g.init(), this._nDataBytes = 0;
            },
            _append: function(o) {
              typeof o == "string" && (o = p.parse(o)), this._data.concat(o), this._nDataBytes += o.sigBytes;
            },
            _process: function(o) {
              var l, d = this._data, y = d.words, b = d.sigBytes, x = this.blockSize, D = x * 4, R = b / D;
              o ? R = c.ceil(R) : R = c.max((R | 0) - this._minBufferSize, 0);
              var H = R * x, U = c.min(H * 4, b);
              if (H) {
                for (var I = 0; I < H; I += x)
                  this._doProcessBlock(y, I);
                l = y.splice(0, H), d.sigBytes -= U;
              }
              return new g.init(l, U);
            },
            clone: function() {
              var o = T.clone.call(this);
              return o._data = this._data.clone(), o;
            },
            _minBufferSize: 0
          });
          n.Hasher = v.extend({
            cfg: T.extend(),
            init: function(o) {
              this.cfg = this.cfg.extend(o), this.reset();
            },
            reset: function() {
              v.reset.call(this), this._doReset();
            },
            update: function(o) {
              return this._append(o), this._process(), this;
            },
            finalize: function(o) {
              o && this._append(o);
              var l = this._doFinalize();
              return l;
            },
            blockSize: 16,
            _createHelper: function(o) {
              return function(l, d) {
                return new o.init(d).finalize(l);
              };
            },
            _createHmacHelper: function(o) {
              return function(l, d) {
                return new P.HMAC.init(o, d).finalize(l);
              };
            }
          });
          var P = w.algo = {};
          return w;
        }(Math);
        return r;
      });
    }(Z)), Z.exports;
  }
  (function(e, t) {
    (function(r, c) {
      e.exports = c(je());
    })(q, function(r) {
      return function(c) {
        var h = r, u = h.lib, _ = u.WordArray, m = u.Hasher, w = h.algo, n = [];
        (function() {
          for (var p = 0; p < 64; p++)
            n[p] = c.abs(c.sin(p + 1)) * 4294967296 | 0;
        })();
        var T = w.MD5 = m.extend({
          _doReset: function() {
            this._hash = new _.init([
              1732584193,
              4023233417,
              2562383102,
              271733878
            ]);
          },
          _doProcessBlock: function(p, v) {
            for (var P = 0; P < 16; P++) {
              var o = v + P, l = p[o];
              p[o] = (l << 8 | l >>> 24) & 16711935 | (l << 24 | l >>> 8) & 4278255360;
            }
            var d = this._hash.words, y = p[v + 0], b = p[v + 1], x = p[v + 2], D = p[v + 3], R = p[v + 4], H = p[v + 5], U = p[v + 6], I = p[v + 7], M = p[v + 8], V = p[v + 9], G = p[v + 10], W = p[v + 11], N = p[v + 12], $ = p[v + 13], K = p[v + 14], J = p[v + 15], i = d[0], s = d[1], a = d[2], f = d[3];
            i = g(i, s, a, f, y, 7, n[0]), f = g(f, i, s, a, b, 12, n[1]), a = g(a, f, i, s, x, 17, n[2]), s = g(s, a, f, i, D, 22, n[3]), i = g(i, s, a, f, R, 7, n[4]), f = g(f, i, s, a, H, 12, n[5]), a = g(a, f, i, s, U, 17, n[6]), s = g(s, a, f, i, I, 22, n[7]), i = g(i, s, a, f, M, 7, n[8]), f = g(f, i, s, a, V, 12, n[9]), a = g(a, f, i, s, G, 17, n[10]), s = g(s, a, f, i, W, 22, n[11]), i = g(i, s, a, f, N, 7, n[12]), f = g(f, i, s, a, $, 12, n[13]), a = g(a, f, i, s, K, 17, n[14]), s = g(s, a, f, i, J, 22, n[15]), i = B(i, s, a, f, b, 5, n[16]), f = B(f, i, s, a, U, 9, n[17]), a = B(a, f, i, s, W, 14, n[18]), s = B(s, a, f, i, y, 20, n[19]), i = B(i, s, a, f, H, 5, n[20]), f = B(f, i, s, a, G, 9, n[21]), a = B(a, f, i, s, J, 14, n[22]), s = B(s, a, f, i, R, 20, n[23]), i = B(i, s, a, f, V, 5, n[24]), f = B(f, i, s, a, K, 9, n[25]), a = B(a, f, i, s, D, 14, n[26]), s = B(s, a, f, i, M, 20, n[27]), i = B(i, s, a, f, $, 5, n[28]), f = B(f, i, s, a, x, 9, n[29]), a = B(a, f, i, s, I, 14, n[30]), s = B(s, a, f, i, N, 20, n[31]), i = A(i, s, a, f, H, 4, n[32]), f = A(f, i, s, a, M, 11, n[33]), a = A(a, f, i, s, W, 16, n[34]), s = A(s, a, f, i, K, 23, n[35]), i = A(i, s, a, f, b, 4, n[36]), f = A(f, i, s, a, R, 11, n[37]), a = A(a, f, i, s, I, 16, n[38]), s = A(s, a, f, i, G, 23, n[39]), i = A(i, s, a, f, $, 4, n[40]), f = A(f, i, s, a, y, 11, n[41]), a = A(a, f, i, s, D, 16, n[42]), s = A(s, a, f, i, U, 23, n[43]), i = A(i, s, a, f, V, 4, n[44]), f = A(f, i, s, a, N, 11, n[45]), a = A(a, f, i, s, J, 16, n[46]), s = A(s, a, f, i, x, 23, n[47]), i = E(i, s, a, f, y, 6, n[48]), f = E(f, i, s, a, I, 10, n[49]), a = E(a, f, i, s, K, 15, n[50]), s = E(s, a, f, i, H, 21, n[51]), i = E(i, s, a, f, N, 6, n[52]), f = E(f, i, s, a, D, 10, n[53]), a = E(a, f, i, s, G, 15, n[54]), s = E(s, a, f, i, b, 21, n[55]), i = E(i, s, a, f, M, 6, n[56]), f = E(f, i, s, a, J, 10, n[57]), a = E(a, f, i, s, U, 15, n[58]), s = E(s, a, f, i, $, 21, n[59]), i = E(i, s, a, f, R, 6, n[60]), f = E(f, i, s, a, W, 10, n[61]), a = E(a, f, i, s, x, 15, n[62]), s = E(s, a, f, i, V, 21, n[63]), d[0] = d[0] + i | 0, d[1] = d[1] + s | 0, d[2] = d[2] + a | 0, d[3] = d[3] + f | 0;
          },
          _doFinalize: function() {
            var p = this._data, v = p.words, P = this._nDataBytes * 8, o = p.sigBytes * 8;
            v[o >>> 5] |= 128 << 24 - o % 32;
            var l = c.floor(P / 4294967296), d = P;
            v[(o + 64 >>> 9 << 4) + 15] = (l << 8 | l >>> 24) & 16711935 | (l << 24 | l >>> 8) & 4278255360, v[(o + 64 >>> 9 << 4) + 14] = (d << 8 | d >>> 24) & 16711935 | (d << 24 | d >>> 8) & 4278255360, p.sigBytes = (v.length + 1) * 4, this._process();
            for (var y = this._hash, b = y.words, x = 0; x < 4; x++) {
              var D = b[x];
              b[x] = (D << 8 | D >>> 24) & 16711935 | (D << 24 | D >>> 8) & 4278255360;
            }
            return y;
          },
          clone: function() {
            var p = m.clone.call(this);
            return p._hash = this._hash.clone(), p;
          }
        });
        function g(p, v, P, o, l, d, y) {
          var b = p + (v & P | ~v & o) + l + y;
          return (b << d | b >>> 32 - d) + v;
        }
        function B(p, v, P, o, l, d, y) {
          var b = p + (v & o | P & ~o) + l + y;
          return (b << d | b >>> 32 - d) + v;
        }
        function A(p, v, P, o, l, d, y) {
          var b = p + (v ^ P ^ o) + l + y;
          return (b << d | b >>> 32 - d) + v;
        }
        function E(p, v, P, o, l, d, y) {
          var b = p + (P ^ (v | ~o)) + l + y;
          return (b << d | b >>> 32 - d) + v;
        }
        h.MD5 = m._createHelper(T), h.HmacMD5 = m._createHmacHelper(T);
      }(Math), r.MD5;
    });
  })(ce);
  const De = ce.exports;
  async function Ce(e, t = !1, r = "html") {
    let c = De(JSON.stringify(e)).toString();
    if (console.log("cacheId", c), t && localStorage.getItem("lemon_" + c))
      return r === "all" ? JSON.parse(localStorage.getItem("lemon_" + c)) : JSON.parse(localStorage.getItem("lemon_" + c))[r];
    const h = {};
    let u = [];
    h.js = {}, h.css = {}, h.html = {};
    const _ = Object.keys(e);
    for (let m = 0; m < _.length; m++) {
      const w = _[m], n = e[_[m]];
      for (let T = 0; T < n.length; T++) {
        let g = n[T], B = ["js", "css", "html"];
        for (let A = 0; A < B.length; A++) {
          let E = B[A];
          await new Promise((p, v) => {
            fetch(w + g + "." + E).then((P) => {
              P.status == 404 && (console.log("file " + g + "." + E + " doesn't exist!"), p()), P.text().then((o) => {
                h[E][g] = o, p();
              }).catch((o) => {
                console.log("FETCH ERR", String(o)), p();
              });
            }).catch((P) => {
              console.log("FETCH ERR", String(P)), p();
            });
          });
        }
      }
    }
    return await Promise.all(u), t && localStorage.setItem("lemon_" + c, JSON.stringify(h)), r === "all" ? h : h[r];
  }
  const He = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    load: Ce
  }, Symbol.toStringTag, { value: "Module" }));
  function Ie(e) {
    return new Proxy(e, {
      get(t, r) {
        return r === "isProxy" ? !0 : Reflect.get(...arguments);
      },
      set: function(t, r, c) {
        const h = t[r], u = c;
        t[r] = c, r in t.watchers && t.watchers[r].forEach((m) => {
          m(u, h);
        }), "this" in t.watchers && t.watchers.this.forEach((m) => {
          m(t, r);
        });
        let _ = (m) => m == null ? !0 : !(typeof m == "object" || typeof m == "function");
        return t[r].isProxy || (Array.isArray(t[r]) ? t[r] = de(t, r, t[r]) : !_(t[r]) && t[r] instanceof Object && (t[r] = he(t, r, t[r]))), !0;
      }
    });
  }
  var Q;
  class Ue {
    constructor() {
      X(this, "watchers", {});
      X(this, "route");
      te(this, Q, {});
    }
    watch(t, r) {
      t in this.watchers || (this.watchers[t] = []), this.watchers[t].push(r);
    }
    react(t = {}) {
      let r = t.inputs, c = t.outputs;
      r && this.inputs(r), c && this.outputs(c);
    }
    inputs(t) {
      const r = this;
      if (!t)
        throw new Error("lemonGlobals not defined for inputs");
      let c;
      Array.isArray(t) ? c = ne(t) : c = t, Object.keys(c).forEach((u) => {
        let _ = c[u], m = document.querySelector(u);
        if (m) {
          let w = pe(m);
          m.addEventListener(w, () => {
            let n = m.value, T;
            if (_.split(".").length === 2) {
              let g = _.split(".");
              T = r[g[0]][g[1]], n !== T && (r[g[0]][g[1]] = n);
            } else
              n !== T && (T = r[_], n !== T && (r[_] = n));
          });
        }
        r.watch(_, () => {
          document.querySelectorAll(u).forEach((w) => {
            let n = r[_], T = re(w);
            w[T] = n;
          });
        });
      });
    }
    outputs(t) {
      const r = this;
      if (!t)
        throw new Error("lemonGlobals not defined for outputs");
      let c;
      Array.isArray(t) ? c = ne(t) : c = t, Object.keys(c).forEach((u) => {
        let _ = c[u];
        r.watch(_, () => {
          document.querySelectorAll(u).forEach((w) => {
            let n;
            _ === "this" ? n = this : n = r[_];
            let T = re(w);
            w[T] = n;
          });
        });
      });
    }
    render(t, r, c = null) {
      return new Promise((h, u) => {
        setTimeout(async () => {
          let _ = document.querySelectorAll(t);
          if (_.length === 0) {
            u("Parent not found: " + t);
            return;
          } else
            _.forEach((m) => {
              m.innerHTML = r;
            });
          c && await c(), h();
        }, 0);
      });
    }
  }
  Q = new WeakMap();
  window.Lemon = Ie(new Ue());
  window.LemonComponents = He;
}
