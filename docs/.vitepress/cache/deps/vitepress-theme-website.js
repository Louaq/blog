import {
  useDebounceFn,
  useEventListener,
  useNow,
  useScriptTag,
  useStorage,
  useStyleTag
} from "./chunk-BIG7MHHI.js";
import {
  Fragment,
  computed,
  createApp,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createTextVNode,
  createVNode,
  defineComponent,
  h,
  inject,
  isRef,
  nextTick,
  normalizeClass,
  normalizeStyle,
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  openBlock,
  provide,
  reactive,
  ref,
  renderList,
  resolveComponent,
  toDisplayString,
  unref,
  vModelDynamic,
  vModelText,
  vShow,
  watch,
  watchEffect,
  withDirectives
} from "./chunk-D4D2XWKF.js";
import {
  __commonJS,
  __privateAdd,
  __privateMethod,
  __publicField,
  __toESM
} from "./chunk-LEFUMAU3.js";

// node_modules/.pnpm/recaptcha-v3@1.10.0/node_modules/recaptcha-v3/dist/ReCaptchaInstance.js
var require_ReCaptchaInstance = __commonJS({
  "node_modules/.pnpm/recaptcha-v3@1.10.0/node_modules/recaptcha-v3/dist/ReCaptchaInstance.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e2) {
            reject(e2);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e2) {
            reject(e2);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t2[0] & 1)
          throw t2[1];
        return t2[1];
      }, trys: [], ops: [] }, f2, y2, t2, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n2) {
        return function(v2) {
          return step([n2, v2]);
        };
      }
      function step(op) {
        if (f2)
          throw new TypeError("Generator is already executing.");
        while (_)
          try {
            if (f2 = 1, y2 && (t2 = op[0] & 2 ? y2["return"] : op[0] ? y2["throw"] || ((t2 = y2["return"]) && t2.call(y2), 0) : y2.next) && !(t2 = t2.call(y2, op[1])).done)
              return t2;
            if (y2 = 0, t2)
              op = [op[0] & 2, t2.value];
            switch (op[0]) {
              case 0:
              case 1:
                t2 = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y2 = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t2 = _.trys, t2 = t2.length > 0 && t2[t2.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t2 || op[1] > t2[0] && op[1] < t2[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t2[1]) {
                  _.label = t2[1];
                  t2 = op;
                  break;
                }
                if (t2 && _.label < t2[2]) {
                  _.label = t2[2];
                  _.ops.push(op);
                  break;
                }
                if (t2[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e2) {
            op = [6, e2];
            y2 = 0;
          } finally {
            f2 = t2 = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ReCaptchaInstance = void 0;
    var ReCaptchaInstance = function() {
      function ReCaptchaInstance2(siteKey, recaptchaID, recaptcha) {
        this.siteKey = siteKey;
        this.recaptchaID = recaptchaID;
        this.recaptcha = recaptcha;
        this.styleContainer = null;
      }
      ReCaptchaInstance2.prototype.execute = function(action) {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a2) {
            return [2, this.recaptcha.enterprise ? this.recaptcha.enterprise.execute(this.recaptchaID, { action }) : this.recaptcha.execute(this.recaptchaID, { action })];
          });
        });
      };
      ReCaptchaInstance2.prototype.getSiteKey = function() {
        return this.siteKey;
      };
      ReCaptchaInstance2.prototype.hideBadge = function() {
        if (this.styleContainer !== null) {
          return;
        }
        this.styleContainer = document.createElement("style");
        this.styleContainer.innerHTML = ".grecaptcha-badge{visibility:hidden !important;}";
        document.head.appendChild(this.styleContainer);
      };
      ReCaptchaInstance2.prototype.showBadge = function() {
        if (this.styleContainer === null) {
          return;
        }
        document.head.removeChild(this.styleContainer);
        this.styleContainer = null;
      };
      return ReCaptchaInstance2;
    }();
    exports.ReCaptchaInstance = ReCaptchaInstance;
  }
});

// node_modules/.pnpm/recaptcha-v3@1.10.0/node_modules/recaptcha-v3/dist/ReCaptchaLoader.js
var require_ReCaptchaLoader = __commonJS({
  "node_modules/.pnpm/recaptcha-v3@1.10.0/node_modules/recaptcha-v3/dist/ReCaptchaLoader.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getInstance = exports.load = void 0;
    var ReCaptchaInstance_1 = require_ReCaptchaInstance();
    var ELoadingState;
    (function(ELoadingState2) {
      ELoadingState2[ELoadingState2["NOT_LOADED"] = 0] = "NOT_LOADED";
      ELoadingState2[ELoadingState2["LOADING"] = 1] = "LOADING";
      ELoadingState2[ELoadingState2["LOADED"] = 2] = "LOADED";
    })(ELoadingState || (ELoadingState = {}));
    var ReCaptchaLoader = function() {
      function ReCaptchaLoader2() {
      }
      ReCaptchaLoader2.load = function(siteKey, options2) {
        if (options2 === void 0) {
          options2 = {};
        }
        if (typeof document === "undefined") {
          return Promise.reject(new Error("This is a library for the browser!"));
        }
        if (ReCaptchaLoader2.getLoadingState() === ELoadingState.LOADED) {
          if (ReCaptchaLoader2.instance.getSiteKey() === siteKey) {
            return Promise.resolve(ReCaptchaLoader2.instance);
          } else {
            return Promise.reject(new Error("reCAPTCHA already loaded with different site key!"));
          }
        }
        if (ReCaptchaLoader2.getLoadingState() === ELoadingState.LOADING) {
          if (siteKey !== ReCaptchaLoader2.instanceSiteKey) {
            return Promise.reject(new Error("reCAPTCHA already loaded with different site key!"));
          }
          return new Promise(function(resolve, reject) {
            ReCaptchaLoader2.successfulLoadingConsumers.push(function(instance) {
              return resolve(instance);
            });
            ReCaptchaLoader2.errorLoadingRunnable.push(function(reason) {
              return reject(reason);
            });
          });
        }
        ReCaptchaLoader2.instanceSiteKey = siteKey;
        ReCaptchaLoader2.setLoadingState(ELoadingState.LOADING);
        var loader = new ReCaptchaLoader2();
        return new Promise(function(resolve, reject) {
          loader.loadScript(siteKey, options2.useRecaptchaNet || false, options2.useEnterprise || false, options2.renderParameters ? options2.renderParameters : {}, options2.customUrl).then(function() {
            ReCaptchaLoader2.setLoadingState(ELoadingState.LOADED);
            var widgetID = loader.doExplicitRender(grecaptcha, siteKey, options2.explicitRenderParameters ? options2.explicitRenderParameters : {}, options2.useEnterprise || false);
            var instance = new ReCaptchaInstance_1.ReCaptchaInstance(siteKey, widgetID, grecaptcha);
            ReCaptchaLoader2.successfulLoadingConsumers.forEach(function(v2) {
              return v2(instance);
            });
            ReCaptchaLoader2.successfulLoadingConsumers = [];
            if (options2.autoHideBadge) {
              instance.hideBadge();
            }
            ReCaptchaLoader2.instance = instance;
            resolve(instance);
          }).catch(function(error) {
            ReCaptchaLoader2.errorLoadingRunnable.forEach(function(v2) {
              return v2(error);
            });
            ReCaptchaLoader2.errorLoadingRunnable = [];
            reject(error);
          });
        });
      };
      ReCaptchaLoader2.getInstance = function() {
        return ReCaptchaLoader2.instance;
      };
      ReCaptchaLoader2.setLoadingState = function(state) {
        ReCaptchaLoader2.loadingState = state;
      };
      ReCaptchaLoader2.getLoadingState = function() {
        if (ReCaptchaLoader2.loadingState === null) {
          return ELoadingState.NOT_LOADED;
        } else {
          return ReCaptchaLoader2.loadingState;
        }
      };
      ReCaptchaLoader2.prototype.loadScript = function(siteKey, useRecaptchaNet, useEnterprise, renderParameters, customUrl) {
        var _this = this;
        if (useRecaptchaNet === void 0) {
          useRecaptchaNet = false;
        }
        if (useEnterprise === void 0) {
          useEnterprise = false;
        }
        if (renderParameters === void 0) {
          renderParameters = {};
        }
        if (customUrl === void 0) {
          customUrl = "";
        }
        var scriptElement = document.createElement("script");
        scriptElement.setAttribute("recaptcha-v3-script", "");
        var scriptBase = "https://www.google.com/recaptcha/api.js";
        if (useRecaptchaNet) {
          if (useEnterprise) {
            scriptBase = "https://recaptcha.net/recaptcha/enterprise.js";
          } else {
            scriptBase = "https://recaptcha.net/recaptcha/api.js";
          }
        }
        if (useEnterprise) {
          scriptBase = "https://www.google.com/recaptcha/enterprise.js";
        }
        if (customUrl) {
          scriptBase = customUrl;
        }
        if (renderParameters.render) {
          renderParameters.render = void 0;
        }
        var parametersQuery = this.buildQueryString(renderParameters);
        scriptElement.src = scriptBase + "?render=explicit" + parametersQuery;
        return new Promise(function(resolve, reject) {
          scriptElement.addEventListener("load", _this.waitForScriptToLoad(function() {
            resolve(scriptElement);
          }, useEnterprise), false);
          scriptElement.onerror = function(error) {
            ReCaptchaLoader2.setLoadingState(ELoadingState.NOT_LOADED);
            reject(error);
          };
          document.head.appendChild(scriptElement);
        });
      };
      ReCaptchaLoader2.prototype.buildQueryString = function(parameters) {
        var parameterKeys = Object.keys(parameters);
        if (parameterKeys.length < 1) {
          return "";
        }
        return "&" + Object.keys(parameters).filter(function(parameterKey) {
          return !!parameters[parameterKey];
        }).map(function(parameterKey) {
          return parameterKey + "=" + parameters[parameterKey];
        }).join("&");
      };
      ReCaptchaLoader2.prototype.waitForScriptToLoad = function(callback, useEnterprise) {
        var _this = this;
        return function() {
          if (window.grecaptcha === void 0) {
            setTimeout(function() {
              _this.waitForScriptToLoad(callback, useEnterprise);
            }, ReCaptchaLoader2.SCRIPT_LOAD_DELAY);
          } else {
            if (useEnterprise) {
              window.grecaptcha.enterprise.ready(function() {
                callback();
              });
            } else {
              window.grecaptcha.ready(function() {
                callback();
              });
            }
          }
        };
      };
      ReCaptchaLoader2.prototype.doExplicitRender = function(grecaptcha2, siteKey, parameters, isEnterprise) {
        var augmentedParameters = {
          sitekey: siteKey,
          badge: parameters.badge,
          size: parameters.size,
          tabindex: parameters.tabindex
        };
        if (parameters.container) {
          if (isEnterprise) {
            return grecaptcha2.enterprise.render(parameters.container, augmentedParameters);
          } else {
            return grecaptcha2.render(parameters.container, augmentedParameters);
          }
        } else {
          if (isEnterprise) {
            return grecaptcha2.enterprise.render(augmentedParameters);
          } else {
            return grecaptcha2.render(augmentedParameters);
          }
        }
      };
      ReCaptchaLoader2.loadingState = null;
      ReCaptchaLoader2.instance = null;
      ReCaptchaLoader2.instanceSiteKey = null;
      ReCaptchaLoader2.successfulLoadingConsumers = [];
      ReCaptchaLoader2.errorLoadingRunnable = [];
      ReCaptchaLoader2.SCRIPT_LOAD_DELAY = 25;
      return ReCaptchaLoader2;
    }();
    exports.load = ReCaptchaLoader.load;
    exports.getInstance = ReCaptchaLoader.getInstance;
  }
});

// node_modules/.pnpm/recaptcha-v3@1.10.0/node_modules/recaptcha-v3/dist/ReCaptcha.js
var require_ReCaptcha = __commonJS({
  "node_modules/.pnpm/recaptcha-v3@1.10.0/node_modules/recaptcha-v3/dist/ReCaptcha.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ReCaptchaInstance = exports.getInstance = exports.load = void 0;
    var ReCaptchaLoader_1 = require_ReCaptchaLoader();
    Object.defineProperty(exports, "load", { enumerable: true, get: function() {
      return ReCaptchaLoader_1.load;
    } });
    Object.defineProperty(exports, "getInstance", { enumerable: true, get: function() {
      return ReCaptchaLoader_1.getInstance;
    } });
    var ReCaptchaInstance_1 = require_ReCaptchaInstance();
    Object.defineProperty(exports, "ReCaptchaInstance", { enumerable: true, get: function() {
      return ReCaptchaInstance_1.ReCaptchaInstance;
    } });
  }
});

// node_modules/.pnpm/vitepress-theme-website@1.0.8/node_modules/vitepress-theme-website/dist/waline/index.mjs
import { useRoute } from "vitepress";

// node_modules/.pnpm/@waline+api@1.0.0-alpha.7/node_modules/@waline/api/dist/api.js
var m = { "Content-Type": "application/json" };
var s = (e2) => `${e2.replace(/\/?$/, "/")}api/`;
var c = (e2, n2 = "") => {
  if (typeof e2 == "object" && e2.errno)
    throw new TypeError(`${n2} failed with ${e2.errno}: ${e2.errmsg}`);
  return e2;
};
var p = ({ serverURL: e2, lang: n2, paths: o2, type: a, signal: t2 }) => fetch(`${s(e2)}article?path=${encodeURIComponent(o2.join(","))}&type=${encodeURIComponent(a.join(","))}&lang=${n2}`, { signal: t2 }).then((r2) => r2.json()).then((r2) => c(r2, "Get counter").data);
var d = ({ serverURL: e2, lang: n2, path: o2, type: a, action: t2 }) => fetch(`${s(e2)}article?lang=${n2}`, { method: "POST", headers: m, body: JSON.stringify({ path: o2, type: a, action: t2 }) }).then((r2) => r2.json()).then((r2) => c(r2, "Update counter").data);
var $ = ({ serverURL: e2, lang: n2, path: o2, page: a, pageSize: t2, sortBy: r2, signal: h2, token: i }) => {
  const l = {};
  return i && (l.Authorization = `Bearer ${i}`), fetch(`${s(e2)}comment?path=${encodeURIComponent(o2)}&pageSize=${t2}&page=${a}&lang=${n2}&sortBy=${r2}`, { signal: h2, headers: l }).then((g) => g.json()).then((g) => c(g, "Get comment data").data);
};
var u = ({ serverURL: e2, lang: n2, token: o2, comment: a }) => {
  const t2 = { "Content-Type": "application/json" };
  return o2 && (t2.Authorization = `Bearer ${o2}`), fetch(`${s(e2)}comment?lang=${n2}`, { method: "POST", headers: t2, body: JSON.stringify(a) }).then((r2) => r2.json());
};
var y = ({ serverURL: e2, lang: n2, token: o2, objectId: a }) => fetch(`${s(e2)}comment/${a}?lang=${n2}`, { method: "DELETE", headers: { Authorization: `Bearer ${o2}` } }).then((t2) => t2.json()).then((t2) => c(t2, "Delete comment"));
var U = ({ serverURL: e2, lang: n2, token: o2, objectId: a, comment: t2 }) => fetch(`${s(e2)}comment/${a}?lang=${n2}`, { method: "PUT", headers: { ...m, Authorization: `Bearer ${o2}` }, body: JSON.stringify(t2) }).then((r2) => r2.json()).then((r2) => c(r2, "Update comment"));
var f = ({ serverURL: e2, lang: n2, paths: o2, signal: a }) => fetch(`${s(e2)}comment?type=count&url=${encodeURIComponent(o2.join(","))}&lang=${n2}`, { signal: a }).then((t2) => t2.json()).then((t2) => c(t2, "Get comment count").data);
var R = ({ lang: e2, serverURL: n2 }) => {
  const o2 = (window.innerWidth - 450) / 2, a = (window.innerHeight - 450) / 2, t2 = window.open(`${n2.replace(/\/$/, "")}/ui/login?lng=${encodeURIComponent(e2)}`, "_blank", `width=450,height=450,left=${o2},top=${a},scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no`);
  return t2 == null ? void 0 : t2.postMessage({ type: "TOKEN", data: null }, "*"), new Promise((r2) => {
    const h2 = ({ data: i }) => {
      !i || typeof i != "object" || i.type !== "userInfo" || i.data.token && (t2 == null ? void 0 : t2.close(), window.removeEventListener("message", h2), r2(i.data));
    };
    window.addEventListener("message", h2);
  });
};
var j = ({ serverURL: e2, lang: n2, paths: o2, signal: a }) => p({ serverURL: e2, lang: n2, paths: o2, type: ["time"], signal: a });
var v = (e2) => d({ ...e2, type: "time", action: "inc" });

// node_modules/.pnpm/autosize@6.0.1/node_modules/autosize/dist/autosize.esm.js
var e = /* @__PURE__ */ new Map();
function t(t2) {
  var o2 = e.get(t2);
  o2 && o2.destroy();
}
function o(t2) {
  var o2 = e.get(t2);
  o2 && o2.update();
}
var r = null;
"undefined" == typeof window ? ((r = function(e2) {
  return e2;
}).destroy = function(e2) {
  return e2;
}, r.update = function(e2) {
  return e2;
}) : ((r = function(t2, o2) {
  return t2 && Array.prototype.forEach.call(t2.length ? t2 : [t2], function(t3) {
    return function(t4) {
      if (t4 && t4.nodeName && "TEXTAREA" === t4.nodeName && !e.has(t4)) {
        var o3, r2 = null, n2 = window.getComputedStyle(t4), i = (o3 = t4.value, function() {
          a({ testForHeightReduction: "" === o3 || !t4.value.startsWith(o3), restoreTextAlign: null }), o3 = t4.value;
        }), l = (function(o4) {
          t4.removeEventListener("autosize:destroy", l), t4.removeEventListener("autosize:update", s2), t4.removeEventListener("input", i), window.removeEventListener("resize", s2), Object.keys(o4).forEach(function(e2) {
            return t4.style[e2] = o4[e2];
          }), e.delete(t4);
        }).bind(t4, { height: t4.style.height, resize: t4.style.resize, textAlign: t4.style.textAlign, overflowY: t4.style.overflowY, overflowX: t4.style.overflowX, wordWrap: t4.style.wordWrap });
        t4.addEventListener("autosize:destroy", l), t4.addEventListener("autosize:update", s2), t4.addEventListener("input", i), window.addEventListener("resize", s2), t4.style.overflowX = "hidden", t4.style.wordWrap = "break-word", e.set(t4, { destroy: l, update: s2 }), s2();
      }
      function a(e2) {
        var o4, i2, l2 = e2.restoreTextAlign, s3 = void 0 === l2 ? null : l2, d2 = e2.testForHeightReduction, u2 = void 0 === d2 || d2, c2 = n2.overflowY;
        if (0 !== t4.scrollHeight && ("vertical" === n2.resize ? t4.style.resize = "none" : "both" === n2.resize && (t4.style.resize = "horizontal"), u2 && (o4 = function(e3) {
          for (var t5 = []; e3 && e3.parentNode && e3.parentNode instanceof Element; )
            e3.parentNode.scrollTop && t5.push([e3.parentNode, e3.parentNode.scrollTop]), e3 = e3.parentNode;
          return function() {
            return t5.forEach(function(e4) {
              var t6 = e4[0], o5 = e4[1];
              t6.style.scrollBehavior = "auto", t6.scrollTop = o5, t6.style.scrollBehavior = null;
            });
          };
        }(t4), t4.style.height = ""), i2 = "content-box" === n2.boxSizing ? t4.scrollHeight - (parseFloat(n2.paddingTop) + parseFloat(n2.paddingBottom)) : t4.scrollHeight + parseFloat(n2.borderTopWidth) + parseFloat(n2.borderBottomWidth), "none" !== n2.maxHeight && i2 > parseFloat(n2.maxHeight) ? ("hidden" === n2.overflowY && (t4.style.overflow = "scroll"), i2 = parseFloat(n2.maxHeight)) : "hidden" !== n2.overflowY && (t4.style.overflow = "hidden"), t4.style.height = i2 + "px", s3 && (t4.style.textAlign = s3), o4 && o4(), r2 !== i2 && (t4.dispatchEvent(new Event("autosize:resized", { bubbles: true })), r2 = i2), c2 !== n2.overflow && !s3)) {
          var v2 = n2.textAlign;
          "hidden" === n2.overflow && (t4.style.textAlign = "start" === v2 ? "end" : "start"), a({ restoreTextAlign: v2, testForHeightReduction: true });
        }
      }
      function s2() {
        a({ testForHeightReduction: true, restoreTextAlign: null });
      }
    }(t3);
  }), t2;
}).destroy = function(e2) {
  return e2 && Array.prototype.forEach.call(e2.length ? e2 : [e2], t), e2;
}, r.update = function(e2) {
  return e2 && Array.prototype.forEach.call(e2.length ? e2 : [e2], o), e2;
});
var n = r;
var autosize_esm_default = n;

// node_modules/.pnpm/marked@12.0.2/node_modules/marked/lib/marked.esm.js
function _getDefaults() {
  return {
    async: false,
    breaks: false,
    extensions: null,
    gfm: true,
    hooks: null,
    pedantic: false,
    renderer: null,
    silent: false,
    tokenizer: null,
    walkTokens: null
  };
}
var _defaults = _getDefaults();
function changeDefaults(newDefaults) {
  _defaults = newDefaults;
}
var escapeTest = /[&<>"']/;
var escapeReplace = new RegExp(escapeTest.source, "g");
var escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
var escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, "g");
var escapeReplacements = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
var getEscapeReplacement = (ch) => escapeReplacements[ch];
function escape$1(html2, encode) {
  if (encode) {
    if (escapeTest.test(html2)) {
      return html2.replace(escapeReplace, getEscapeReplacement);
    }
  } else {
    if (escapeTestNoEncode.test(html2)) {
      return html2.replace(escapeReplaceNoEncode, getEscapeReplacement);
    }
  }
  return html2;
}
var unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
function unescape(html2) {
  return html2.replace(unescapeTest, (_, n2) => {
    n2 = n2.toLowerCase();
    if (n2 === "colon")
      return ":";
    if (n2.charAt(0) === "#") {
      return n2.charAt(1) === "x" ? String.fromCharCode(parseInt(n2.substring(2), 16)) : String.fromCharCode(+n2.substring(1));
    }
    return "";
  });
}
var caret = /(^|[^\[])\^/g;
function edit(regex, opt) {
  let source = typeof regex === "string" ? regex : regex.source;
  opt = opt || "";
  const obj = {
    replace: (name, val) => {
      let valSource = typeof val === "string" ? val : val.source;
      valSource = valSource.replace(caret, "$1");
      source = source.replace(name, valSource);
      return obj;
    },
    getRegex: () => {
      return new RegExp(source, opt);
    }
  };
  return obj;
}
function cleanUrl(href) {
  try {
    href = encodeURI(href).replace(/%25/g, "%");
  } catch (e2) {
    return null;
  }
  return href;
}
var noopTest = { exec: () => null };
function splitCells(tableRow, count) {
  const row = tableRow.replace(/\|/g, (match, offset, str) => {
    let escaped = false;
    let curr = offset;
    while (--curr >= 0 && str[curr] === "\\")
      escaped = !escaped;
    if (escaped) {
      return "|";
    } else {
      return " |";
    }
  }), cells = row.split(/ \|/);
  let i = 0;
  if (!cells[0].trim()) {
    cells.shift();
  }
  if (cells.length > 0 && !cells[cells.length - 1].trim()) {
    cells.pop();
  }
  if (count) {
    if (cells.length > count) {
      cells.splice(count);
    } else {
      while (cells.length < count)
        cells.push("");
    }
  }
  for (; i < cells.length; i++) {
    cells[i] = cells[i].trim().replace(/\\\|/g, "|");
  }
  return cells;
}
function rtrim(str, c2, invert) {
  const l = str.length;
  if (l === 0) {
    return "";
  }
  let suffLen = 0;
  while (suffLen < l) {
    const currChar = str.charAt(l - suffLen - 1);
    if (currChar === c2 && !invert) {
      suffLen++;
    } else if (currChar !== c2 && invert) {
      suffLen++;
    } else {
      break;
    }
  }
  return str.slice(0, l - suffLen);
}
function findClosingBracket(str, b) {
  if (str.indexOf(b[1]) === -1) {
    return -1;
  }
  let level = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "\\") {
      i++;
    } else if (str[i] === b[0]) {
      level++;
    } else if (str[i] === b[1]) {
      level--;
      if (level < 0) {
        return i;
      }
    }
  }
  return -1;
}
function outputLink(cap, link2, raw, lexer2) {
  const href = link2.href;
  const title = link2.title ? escape$1(link2.title) : null;
  const text = cap[1].replace(/\\([\[\]])/g, "$1");
  if (cap[0].charAt(0) !== "!") {
    lexer2.state.inLink = true;
    const token = {
      type: "link",
      raw,
      href,
      title,
      text,
      tokens: lexer2.inlineTokens(text)
    };
    lexer2.state.inLink = false;
    return token;
  }
  return {
    type: "image",
    raw,
    href,
    title,
    text: escape$1(text)
  };
}
function indentCodeCompensation(raw, text) {
  const matchIndentToCode = raw.match(/^(\s+)(?:```)/);
  if (matchIndentToCode === null) {
    return text;
  }
  const indentToCode = matchIndentToCode[1];
  return text.split("\n").map((node) => {
    const matchIndentInNode = node.match(/^\s+/);
    if (matchIndentInNode === null) {
      return node;
    }
    const [indentInNode] = matchIndentInNode;
    if (indentInNode.length >= indentToCode.length) {
      return node.slice(indentToCode.length);
    }
    return node;
  }).join("\n");
}
var _Tokenizer = class {
  // set by the lexer
  constructor(options2) {
    __publicField(this, "options");
    __publicField(this, "rules");
    // set by the lexer
    __publicField(this, "lexer");
    this.options = options2 || _defaults;
  }
  space(src) {
    const cap = this.rules.block.newline.exec(src);
    if (cap && cap[0].length > 0) {
      return {
        type: "space",
        raw: cap[0]
      };
    }
  }
  code(src) {
    const cap = this.rules.block.code.exec(src);
    if (cap) {
      const text = cap[0].replace(/^ {1,4}/gm, "");
      return {
        type: "code",
        raw: cap[0],
        codeBlockStyle: "indented",
        text: !this.options.pedantic ? rtrim(text, "\n") : text
      };
    }
  }
  fences(src) {
    const cap = this.rules.block.fences.exec(src);
    if (cap) {
      const raw = cap[0];
      const text = indentCodeCompensation(raw, cap[3] || "");
      return {
        type: "code",
        raw,
        lang: cap[2] ? cap[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : cap[2],
        text
      };
    }
  }
  heading(src) {
    const cap = this.rules.block.heading.exec(src);
    if (cap) {
      let text = cap[2].trim();
      if (/#$/.test(text)) {
        const trimmed = rtrim(text, "#");
        if (this.options.pedantic) {
          text = trimmed.trim();
        } else if (!trimmed || / $/.test(trimmed)) {
          text = trimmed.trim();
        }
      }
      return {
        type: "heading",
        raw: cap[0],
        depth: cap[1].length,
        text,
        tokens: this.lexer.inline(text)
      };
    }
  }
  hr(src) {
    const cap = this.rules.block.hr.exec(src);
    if (cap) {
      return {
        type: "hr",
        raw: cap[0]
      };
    }
  }
  blockquote(src) {
    const cap = this.rules.block.blockquote.exec(src);
    if (cap) {
      let text = cap[0].replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g, "\n    $1");
      text = rtrim(text.replace(/^ *>[ \t]?/gm, ""), "\n");
      const top = this.lexer.state.top;
      this.lexer.state.top = true;
      const tokens = this.lexer.blockTokens(text);
      this.lexer.state.top = top;
      return {
        type: "blockquote",
        raw: cap[0],
        tokens,
        text
      };
    }
  }
  list(src) {
    let cap = this.rules.block.list.exec(src);
    if (cap) {
      let bull = cap[1].trim();
      const isordered = bull.length > 1;
      const list2 = {
        type: "list",
        raw: "",
        ordered: isordered,
        start: isordered ? +bull.slice(0, -1) : "",
        loose: false,
        items: []
      };
      bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;
      if (this.options.pedantic) {
        bull = isordered ? bull : "[*+-]";
      }
      const itemRegex = new RegExp(`^( {0,3}${bull})((?:[	 ][^\\n]*)?(?:\\n|$))`);
      let raw = "";
      let itemContents = "";
      let endsWithBlankLine = false;
      while (src) {
        let endEarly = false;
        if (!(cap = itemRegex.exec(src))) {
          break;
        }
        if (this.rules.block.hr.test(src)) {
          break;
        }
        raw = cap[0];
        src = src.substring(raw.length);
        let line = cap[2].split("\n", 1)[0].replace(/^\t+/, (t2) => " ".repeat(3 * t2.length));
        let nextLine = src.split("\n", 1)[0];
        let indent = 0;
        if (this.options.pedantic) {
          indent = 2;
          itemContents = line.trimStart();
        } else {
          indent = cap[2].search(/[^ ]/);
          indent = indent > 4 ? 1 : indent;
          itemContents = line.slice(indent);
          indent += cap[1].length;
        }
        let blankLine = false;
        if (!line && /^ *$/.test(nextLine)) {
          raw += nextLine + "\n";
          src = src.substring(nextLine.length + 1);
          endEarly = true;
        }
        if (!endEarly) {
          const nextBulletRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`);
          const hrRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`);
          const fencesBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:\`\`\`|~~~)`);
          const headingBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}#`);
          while (src) {
            const rawLine = src.split("\n", 1)[0];
            nextLine = rawLine;
            if (this.options.pedantic) {
              nextLine = nextLine.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ");
            }
            if (fencesBeginRegex.test(nextLine)) {
              break;
            }
            if (headingBeginRegex.test(nextLine)) {
              break;
            }
            if (nextBulletRegex.test(nextLine)) {
              break;
            }
            if (hrRegex.test(src)) {
              break;
            }
            if (nextLine.search(/[^ ]/) >= indent || !nextLine.trim()) {
              itemContents += "\n" + nextLine.slice(indent);
            } else {
              if (blankLine) {
                break;
              }
              if (line.search(/[^ ]/) >= 4) {
                break;
              }
              if (fencesBeginRegex.test(line)) {
                break;
              }
              if (headingBeginRegex.test(line)) {
                break;
              }
              if (hrRegex.test(line)) {
                break;
              }
              itemContents += "\n" + nextLine;
            }
            if (!blankLine && !nextLine.trim()) {
              blankLine = true;
            }
            raw += rawLine + "\n";
            src = src.substring(rawLine.length + 1);
            line = nextLine.slice(indent);
          }
        }
        if (!list2.loose) {
          if (endsWithBlankLine) {
            list2.loose = true;
          } else if (/\n *\n *$/.test(raw)) {
            endsWithBlankLine = true;
          }
        }
        let istask = null;
        let ischecked;
        if (this.options.gfm) {
          istask = /^\[[ xX]\] /.exec(itemContents);
          if (istask) {
            ischecked = istask[0] !== "[ ] ";
            itemContents = itemContents.replace(/^\[[ xX]\] +/, "");
          }
        }
        list2.items.push({
          type: "list_item",
          raw,
          task: !!istask,
          checked: ischecked,
          loose: false,
          text: itemContents,
          tokens: []
        });
        list2.raw += raw;
      }
      list2.items[list2.items.length - 1].raw = raw.trimEnd();
      list2.items[list2.items.length - 1].text = itemContents.trimEnd();
      list2.raw = list2.raw.trimEnd();
      for (let i = 0; i < list2.items.length; i++) {
        this.lexer.state.top = false;
        list2.items[i].tokens = this.lexer.blockTokens(list2.items[i].text, []);
        if (!list2.loose) {
          const spacers = list2.items[i].tokens.filter((t2) => t2.type === "space");
          const hasMultipleLineBreaks = spacers.length > 0 && spacers.some((t2) => /\n.*\n/.test(t2.raw));
          list2.loose = hasMultipleLineBreaks;
        }
      }
      if (list2.loose) {
        for (let i = 0; i < list2.items.length; i++) {
          list2.items[i].loose = true;
        }
      }
      return list2;
    }
  }
  html(src) {
    const cap = this.rules.block.html.exec(src);
    if (cap) {
      const token = {
        type: "html",
        block: true,
        raw: cap[0],
        pre: cap[1] === "pre" || cap[1] === "script" || cap[1] === "style",
        text: cap[0]
      };
      return token;
    }
  }
  def(src) {
    const cap = this.rules.block.def.exec(src);
    if (cap) {
      const tag2 = cap[1].toLowerCase().replace(/\s+/g, " ");
      const href = cap[2] ? cap[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "";
      const title = cap[3] ? cap[3].substring(1, cap[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : cap[3];
      return {
        type: "def",
        tag: tag2,
        raw: cap[0],
        href,
        title
      };
    }
  }
  table(src) {
    const cap = this.rules.block.table.exec(src);
    if (!cap) {
      return;
    }
    if (!/[:|]/.test(cap[2])) {
      return;
    }
    const headers = splitCells(cap[1]);
    const aligns = cap[2].replace(/^\||\| *$/g, "").split("|");
    const rows = cap[3] && cap[3].trim() ? cap[3].replace(/\n[ \t]*$/, "").split("\n") : [];
    const item = {
      type: "table",
      raw: cap[0],
      header: [],
      align: [],
      rows: []
    };
    if (headers.length !== aligns.length) {
      return;
    }
    for (const align of aligns) {
      if (/^ *-+: *$/.test(align)) {
        item.align.push("right");
      } else if (/^ *:-+: *$/.test(align)) {
        item.align.push("center");
      } else if (/^ *:-+ *$/.test(align)) {
        item.align.push("left");
      } else {
        item.align.push(null);
      }
    }
    for (const header of headers) {
      item.header.push({
        text: header,
        tokens: this.lexer.inline(header)
      });
    }
    for (const row of rows) {
      item.rows.push(splitCells(row, item.header.length).map((cell) => {
        return {
          text: cell,
          tokens: this.lexer.inline(cell)
        };
      }));
    }
    return item;
  }
  lheading(src) {
    const cap = this.rules.block.lheading.exec(src);
    if (cap) {
      return {
        type: "heading",
        raw: cap[0],
        depth: cap[2].charAt(0) === "=" ? 1 : 2,
        text: cap[1],
        tokens: this.lexer.inline(cap[1])
      };
    }
  }
  paragraph(src) {
    const cap = this.rules.block.paragraph.exec(src);
    if (cap) {
      const text = cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1];
      return {
        type: "paragraph",
        raw: cap[0],
        text,
        tokens: this.lexer.inline(text)
      };
    }
  }
  text(src) {
    const cap = this.rules.block.text.exec(src);
    if (cap) {
      return {
        type: "text",
        raw: cap[0],
        text: cap[0],
        tokens: this.lexer.inline(cap[0])
      };
    }
  }
  escape(src) {
    const cap = this.rules.inline.escape.exec(src);
    if (cap) {
      return {
        type: "escape",
        raw: cap[0],
        text: escape$1(cap[1])
      };
    }
  }
  tag(src) {
    const cap = this.rules.inline.tag.exec(src);
    if (cap) {
      if (!this.lexer.state.inLink && /^<a /i.test(cap[0])) {
        this.lexer.state.inLink = true;
      } else if (this.lexer.state.inLink && /^<\/a>/i.test(cap[0])) {
        this.lexer.state.inLink = false;
      }
      if (!this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.lexer.state.inRawBlock = true;
      } else if (this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.lexer.state.inRawBlock = false;
      }
      return {
        type: "html",
        raw: cap[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        block: false,
        text: cap[0]
      };
    }
  }
  link(src) {
    const cap = this.rules.inline.link.exec(src);
    if (cap) {
      const trimmedUrl = cap[2].trim();
      if (!this.options.pedantic && /^</.test(trimmedUrl)) {
        if (!/>$/.test(trimmedUrl)) {
          return;
        }
        const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), "\\");
        if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
          return;
        }
      } else {
        const lastParenIndex = findClosingBracket(cap[2], "()");
        if (lastParenIndex > -1) {
          const start = cap[0].indexOf("!") === 0 ? 5 : 4;
          const linkLen = start + cap[1].length + lastParenIndex;
          cap[2] = cap[2].substring(0, lastParenIndex);
          cap[0] = cap[0].substring(0, linkLen).trim();
          cap[3] = "";
        }
      }
      let href = cap[2];
      let title = "";
      if (this.options.pedantic) {
        const link2 = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);
        if (link2) {
          href = link2[1];
          title = link2[3];
        }
      } else {
        title = cap[3] ? cap[3].slice(1, -1) : "";
      }
      href = href.trim();
      if (/^</.test(href)) {
        if (this.options.pedantic && !/>$/.test(trimmedUrl)) {
          href = href.slice(1);
        } else {
          href = href.slice(1, -1);
        }
      }
      return outputLink(cap, {
        href: href ? href.replace(this.rules.inline.anyPunctuation, "$1") : href,
        title: title ? title.replace(this.rules.inline.anyPunctuation, "$1") : title
      }, cap[0], this.lexer);
    }
  }
  reflink(src, links) {
    let cap;
    if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
      const linkString = (cap[2] || cap[1]).replace(/\s+/g, " ");
      const link2 = links[linkString.toLowerCase()];
      if (!link2) {
        const text = cap[0].charAt(0);
        return {
          type: "text",
          raw: text,
          text
        };
      }
      return outputLink(cap, link2, cap[0], this.lexer);
    }
  }
  emStrong(src, maskedSrc, prevChar = "") {
    let match = this.rules.inline.emStrongLDelim.exec(src);
    if (!match)
      return;
    if (match[3] && prevChar.match(/[\p{L}\p{N}]/u))
      return;
    const nextChar = match[1] || match[2] || "";
    if (!nextChar || !prevChar || this.rules.inline.punctuation.exec(prevChar)) {
      const lLength = [...match[0]].length - 1;
      let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;
      const endReg = match[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      endReg.lastIndex = 0;
      maskedSrc = maskedSrc.slice(-1 * src.length + lLength);
      while ((match = endReg.exec(maskedSrc)) != null) {
        rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
        if (!rDelim)
          continue;
        rLength = [...rDelim].length;
        if (match[3] || match[4]) {
          delimTotal += rLength;
          continue;
        } else if (match[5] || match[6]) {
          if (lLength % 3 && !((lLength + rLength) % 3)) {
            midDelimTotal += rLength;
            continue;
          }
        }
        delimTotal -= rLength;
        if (delimTotal > 0)
          continue;
        rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
        const lastCharLength = [...match[0]][0].length;
        const raw = src.slice(0, lLength + match.index + lastCharLength + rLength);
        if (Math.min(lLength, rLength) % 2) {
          const text2 = raw.slice(1, -1);
          return {
            type: "em",
            raw,
            text: text2,
            tokens: this.lexer.inlineTokens(text2)
          };
        }
        const text = raw.slice(2, -2);
        return {
          type: "strong",
          raw,
          text,
          tokens: this.lexer.inlineTokens(text)
        };
      }
    }
  }
  codespan(src) {
    const cap = this.rules.inline.code.exec(src);
    if (cap) {
      let text = cap[2].replace(/\n/g, " ");
      const hasNonSpaceChars = /[^ ]/.test(text);
      const hasSpaceCharsOnBothEnds = /^ /.test(text) && / $/.test(text);
      if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
        text = text.substring(1, text.length - 1);
      }
      text = escape$1(text, true);
      return {
        type: "codespan",
        raw: cap[0],
        text
      };
    }
  }
  br(src) {
    const cap = this.rules.inline.br.exec(src);
    if (cap) {
      return {
        type: "br",
        raw: cap[0]
      };
    }
  }
  del(src) {
    const cap = this.rules.inline.del.exec(src);
    if (cap) {
      return {
        type: "del",
        raw: cap[0],
        text: cap[2],
        tokens: this.lexer.inlineTokens(cap[2])
      };
    }
  }
  autolink(src) {
    const cap = this.rules.inline.autolink.exec(src);
    if (cap) {
      let text, href;
      if (cap[2] === "@") {
        text = escape$1(cap[1]);
        href = "mailto:" + text;
      } else {
        text = escape$1(cap[1]);
        href = text;
      }
      return {
        type: "link",
        raw: cap[0],
        text,
        href,
        tokens: [
          {
            type: "text",
            raw: text,
            text
          }
        ]
      };
    }
  }
  url(src) {
    var _a2;
    let cap;
    if (cap = this.rules.inline.url.exec(src)) {
      let text, href;
      if (cap[2] === "@") {
        text = escape$1(cap[0]);
        href = "mailto:" + text;
      } else {
        let prevCapZero;
        do {
          prevCapZero = cap[0];
          cap[0] = ((_a2 = this.rules.inline._backpedal.exec(cap[0])) == null ? void 0 : _a2[0]) ?? "";
        } while (prevCapZero !== cap[0]);
        text = escape$1(cap[0]);
        if (cap[1] === "www.") {
          href = "http://" + cap[0];
        } else {
          href = cap[0];
        }
      }
      return {
        type: "link",
        raw: cap[0],
        text,
        href,
        tokens: [
          {
            type: "text",
            raw: text,
            text
          }
        ]
      };
    }
  }
  inlineText(src) {
    const cap = this.rules.inline.text.exec(src);
    if (cap) {
      let text;
      if (this.lexer.state.inRawBlock) {
        text = cap[0];
      } else {
        text = escape$1(cap[0]);
      }
      return {
        type: "text",
        raw: cap[0],
        text
      };
    }
  }
};
var newline = /^(?: *(?:\n|$))+/;
var blockCode = /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/;
var fences = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
var hr = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
var heading = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
var bullet = /(?:[*+-]|\d{1,9}[.)])/;
var lheading = edit(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g, bullet).replace(/blockCode/g, / {4}/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).getRegex();
var _paragraph = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/;
var blockText = /^[^\n]+/;
var _blockLabel = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
var def = edit(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/).replace("label", _blockLabel).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex();
var list = edit(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, bullet).getRegex();
var _tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
var _comment = /<!--(?:-?>|[\s\S]*?(?:-->|$))/;
var html = edit("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))", "i").replace("comment", _comment).replace("tag", _tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
var paragraph = edit(_paragraph).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex();
var blockquote = edit(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", paragraph).getRegex();
var blockNormal = {
  blockquote,
  code: blockCode,
  def,
  fences,
  heading,
  hr,
  html,
  lheading,
  list,
  newline,
  paragraph,
  table: noopTest,
  text: blockText
};
var gfmTable = edit("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex();
var blockGfm = {
  ...blockNormal,
  table: gfmTable,
  paragraph: edit(_paragraph).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", gfmTable).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex()
};
var blockPedantic = {
  ...blockNormal,
  html: edit(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", _comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: noopTest,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: edit(_paragraph).replace("hr", hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", lheading).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
};
var escape = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
var inlineCode = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
var br = /^( {2,}|\\)\n(?!\s*$)/;
var inlineText = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
var _punctuation = "\\p{P}\\p{S}";
var punctuation = edit(/^((?![*_])[\spunctuation])/, "u").replace(/punctuation/g, _punctuation).getRegex();
var blockSkip = /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g;
var emStrongLDelim = edit(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/, "u").replace(/punct/g, _punctuation).getRegex();
var emStrongRDelimAst = edit("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])", "gu").replace(/punct/g, _punctuation).getRegex();
var emStrongRDelimUnd = edit("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])", "gu").replace(/punct/g, _punctuation).getRegex();
var anyPunctuation = edit(/\\([punct])/, "gu").replace(/punct/g, _punctuation).getRegex();
var autolink = edit(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex();
var _inlineComment = edit(_comment).replace("(?:-->|$)", "-->").getRegex();
var tag = edit("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", _inlineComment).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex();
var _inlineLabel = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
var link = edit(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label", _inlineLabel).replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex();
var reflink = edit(/^!?\[(label)\]\[(ref)\]/).replace("label", _inlineLabel).replace("ref", _blockLabel).getRegex();
var nolink = edit(/^!?\[(ref)\](?:\[\])?/).replace("ref", _blockLabel).getRegex();
var reflinkSearch = edit("reflink|nolink(?!\\()", "g").replace("reflink", reflink).replace("nolink", nolink).getRegex();
var inlineNormal = {
  _backpedal: noopTest,
  // only used for GFM url
  anyPunctuation,
  autolink,
  blockSkip,
  br,
  code: inlineCode,
  del: noopTest,
  emStrongLDelim,
  emStrongRDelimAst,
  emStrongRDelimUnd,
  escape,
  link,
  nolink,
  punctuation,
  reflink,
  reflinkSearch,
  tag,
  text: inlineText,
  url: noopTest
};
var inlinePedantic = {
  ...inlineNormal,
  link: edit(/^!?\[(label)\]\((.*?)\)/).replace("label", _inlineLabel).getRegex(),
  reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", _inlineLabel).getRegex()
};
var inlineGfm = {
  ...inlineNormal,
  escape: edit(escape).replace("])", "~|])").getRegex(),
  url: edit(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
};
var inlineBreaks = {
  ...inlineGfm,
  br: edit(br).replace("{2,}", "*").getRegex(),
  text: edit(inlineGfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
};
var block = {
  normal: blockNormal,
  gfm: blockGfm,
  pedantic: blockPedantic
};
var inline = {
  normal: inlineNormal,
  gfm: inlineGfm,
  breaks: inlineBreaks,
  pedantic: inlinePedantic
};
var _Lexer = class __Lexer {
  constructor(options2) {
    __publicField(this, "tokens");
    __publicField(this, "options");
    __publicField(this, "state");
    __publicField(this, "tokenizer");
    __publicField(this, "inlineQueue");
    this.tokens = [];
    this.tokens.links = /* @__PURE__ */ Object.create(null);
    this.options = options2 || _defaults;
    this.options.tokenizer = this.options.tokenizer || new _Tokenizer();
    this.tokenizer = this.options.tokenizer;
    this.tokenizer.options = this.options;
    this.tokenizer.lexer = this;
    this.inlineQueue = [];
    this.state = {
      inLink: false,
      inRawBlock: false,
      top: true
    };
    const rules = {
      block: block.normal,
      inline: inline.normal
    };
    if (this.options.pedantic) {
      rules.block = block.pedantic;
      rules.inline = inline.pedantic;
    } else if (this.options.gfm) {
      rules.block = block.gfm;
      if (this.options.breaks) {
        rules.inline = inline.breaks;
      } else {
        rules.inline = inline.gfm;
      }
    }
    this.tokenizer.rules = rules;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block,
      inline
    };
  }
  /**
   * Static Lex Method
   */
  static lex(src, options2) {
    const lexer2 = new __Lexer(options2);
    return lexer2.lex(src);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(src, options2) {
    const lexer2 = new __Lexer(options2);
    return lexer2.inlineTokens(src);
  }
  /**
   * Preprocessing
   */
  lex(src) {
    src = src.replace(/\r\n|\r/g, "\n");
    this.blockTokens(src, this.tokens);
    for (let i = 0; i < this.inlineQueue.length; i++) {
      const next = this.inlineQueue[i];
      this.inlineTokens(next.src, next.tokens);
    }
    this.inlineQueue = [];
    return this.tokens;
  }
  blockTokens(src, tokens = []) {
    if (this.options.pedantic) {
      src = src.replace(/\t/g, "    ").replace(/^ +$/gm, "");
    } else {
      src = src.replace(/^( *)(\t+)/gm, (_, leading, tabs) => {
        return leading + "    ".repeat(tabs.length);
      });
    }
    let token;
    let lastToken;
    let cutSrc;
    let lastParagraphClipped;
    while (src) {
      if (this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((extTokenizer) => {
        if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return true;
        }
        return false;
      })) {
        continue;
      }
      if (token = this.tokenizer.space(src)) {
        src = src.substring(token.raw.length);
        if (token.raw.length === 1 && tokens.length > 0) {
          tokens[tokens.length - 1].raw += "\n";
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.code(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.fences(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.heading(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.hr(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.blockquote(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.list(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.html(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.def(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.raw;
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else if (!this.tokens.links[token.tag]) {
          this.tokens.links[token.tag] = {
            href: token.href,
            title: token.title
          };
        }
        continue;
      }
      if (token = this.tokenizer.table(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.lheading(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      cutSrc = src;
      if (this.options.extensions && this.options.extensions.startBlock) {
        let startIndex = Infinity;
        const tempSrc = src.slice(1);
        let tempStart;
        this.options.extensions.startBlock.forEach((getStartIndex) => {
          tempStart = getStartIndex.call({ lexer: this }, tempSrc);
          if (typeof tempStart === "number" && tempStart >= 0) {
            startIndex = Math.min(startIndex, tempStart);
          }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src.substring(0, startIndex + 1);
        }
      }
      if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
        lastToken = tokens[tokens.length - 1];
        if (lastParagraphClipped && lastToken.type === "paragraph") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue.pop();
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        lastParagraphClipped = cutSrc.length !== src.length;
        src = src.substring(token.raw.length);
        continue;
      }
      if (token = this.tokenizer.text(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && lastToken.type === "text") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue.pop();
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (src) {
        const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }
    this.state.top = true;
    return tokens;
  }
  inline(src, tokens = []) {
    this.inlineQueue.push({ src, tokens });
    return tokens;
  }
  /**
   * Lexing/Compiling
   */
  inlineTokens(src, tokens = []) {
    let token, lastToken, cutSrc;
    let maskedSrc = src;
    let match;
    let keepPrevChar, prevChar;
    if (this.tokens.links) {
      const links = Object.keys(this.tokens.links);
      if (links.length > 0) {
        while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
          if (links.includes(match[0].slice(match[0].lastIndexOf("[") + 1, -1))) {
            maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
          }
        }
      }
    }
    while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    }
    while ((match = this.tokenizer.rules.inline.anyPunctuation.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index) + "++" + maskedSrc.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    }
    while (src) {
      if (!keepPrevChar) {
        prevChar = "";
      }
      keepPrevChar = false;
      if (this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((extTokenizer) => {
        if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return true;
        }
        return false;
      })) {
        continue;
      }
      if (token = this.tokenizer.escape(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.tag(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && token.type === "text" && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.link(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.reflink(src, this.tokens.links)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && token.type === "text" && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.codespan(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.br(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.del(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.autolink(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (!this.state.inLink && (token = this.tokenizer.url(src))) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      cutSrc = src;
      if (this.options.extensions && this.options.extensions.startInline) {
        let startIndex = Infinity;
        const tempSrc = src.slice(1);
        let tempStart;
        this.options.extensions.startInline.forEach((getStartIndex) => {
          tempStart = getStartIndex.call({ lexer: this }, tempSrc);
          if (typeof tempStart === "number" && tempStart >= 0) {
            startIndex = Math.min(startIndex, tempStart);
          }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src.substring(0, startIndex + 1);
        }
      }
      if (token = this.tokenizer.inlineText(cutSrc)) {
        src = src.substring(token.raw.length);
        if (token.raw.slice(-1) !== "_") {
          prevChar = token.raw.slice(-1);
        }
        keepPrevChar = true;
        lastToken = tokens[tokens.length - 1];
        if (lastToken && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (src) {
        const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }
    return tokens;
  }
};
var _Renderer = class {
  constructor(options2) {
    __publicField(this, "options");
    this.options = options2 || _defaults;
  }
  code(code, infostring, escaped) {
    var _a2;
    const lang = (_a2 = (infostring || "").match(/^\S*/)) == null ? void 0 : _a2[0];
    code = code.replace(/\n$/, "") + "\n";
    if (!lang) {
      return "<pre><code>" + (escaped ? code : escape$1(code, true)) + "</code></pre>\n";
    }
    return '<pre><code class="language-' + escape$1(lang) + '">' + (escaped ? code : escape$1(code, true)) + "</code></pre>\n";
  }
  blockquote(quote) {
    return `<blockquote>
${quote}</blockquote>
`;
  }
  html(html2, block2) {
    return html2;
  }
  heading(text, level, raw) {
    return `<h${level}>${text}</h${level}>
`;
  }
  hr() {
    return "<hr>\n";
  }
  list(body, ordered, start) {
    const type = ordered ? "ol" : "ul";
    const startatt = ordered && start !== 1 ? ' start="' + start + '"' : "";
    return "<" + type + startatt + ">\n" + body + "</" + type + ">\n";
  }
  listitem(text, task, checked) {
    return `<li>${text}</li>
`;
  }
  checkbox(checked) {
    return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
  }
  paragraph(text) {
    return `<p>${text}</p>
`;
  }
  table(header, body) {
    if (body)
      body = `<tbody>${body}</tbody>`;
    return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
  }
  tablerow(content) {
    return `<tr>
${content}</tr>
`;
  }
  tablecell(content, flags) {
    const type = flags.header ? "th" : "td";
    const tag2 = flags.align ? `<${type} align="${flags.align}">` : `<${type}>`;
    return tag2 + content + `</${type}>
`;
  }
  /**
   * span level renderer
   */
  strong(text) {
    return `<strong>${text}</strong>`;
  }
  em(text) {
    return `<em>${text}</em>`;
  }
  codespan(text) {
    return `<code>${text}</code>`;
  }
  br() {
    return "<br>";
  }
  del(text) {
    return `<del>${text}</del>`;
  }
  link(href, title, text) {
    const cleanHref = cleanUrl(href);
    if (cleanHref === null) {
      return text;
    }
    href = cleanHref;
    let out = '<a href="' + href + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += ">" + text + "</a>";
    return out;
  }
  image(href, title, text) {
    const cleanHref = cleanUrl(href);
    if (cleanHref === null) {
      return text;
    }
    href = cleanHref;
    let out = `<img src="${href}" alt="${text}"`;
    if (title) {
      out += ` title="${title}"`;
    }
    out += ">";
    return out;
  }
  text(text) {
    return text;
  }
};
var _TextRenderer = class {
  // no need for block level renderers
  strong(text) {
    return text;
  }
  em(text) {
    return text;
  }
  codespan(text) {
    return text;
  }
  del(text) {
    return text;
  }
  html(text) {
    return text;
  }
  text(text) {
    return text;
  }
  link(href, title, text) {
    return "" + text;
  }
  image(href, title, text) {
    return "" + text;
  }
  br() {
    return "";
  }
};
var _Parser = class __Parser {
  constructor(options2) {
    __publicField(this, "options");
    __publicField(this, "renderer");
    __publicField(this, "textRenderer");
    this.options = options2 || _defaults;
    this.options.renderer = this.options.renderer || new _Renderer();
    this.renderer = this.options.renderer;
    this.renderer.options = this.options;
    this.textRenderer = new _TextRenderer();
  }
  /**
   * Static Parse Method
   */
  static parse(tokens, options2) {
    const parser2 = new __Parser(options2);
    return parser2.parse(tokens);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(tokens, options2) {
    const parser2 = new __Parser(options2);
    return parser2.parseInline(tokens);
  }
  /**
   * Parse Loop
   */
  parse(tokens, top = true) {
    let out = "";
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
        const genericToken = token;
        const ret = this.options.extensions.renderers[genericToken.type].call({ parser: this }, genericToken);
        if (ret !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(genericToken.type)) {
          out += ret || "";
          continue;
        }
      }
      switch (token.type) {
        case "space": {
          continue;
        }
        case "hr": {
          out += this.renderer.hr();
          continue;
        }
        case "heading": {
          const headingToken = token;
          out += this.renderer.heading(this.parseInline(headingToken.tokens), headingToken.depth, unescape(this.parseInline(headingToken.tokens, this.textRenderer)));
          continue;
        }
        case "code": {
          const codeToken = token;
          out += this.renderer.code(codeToken.text, codeToken.lang, !!codeToken.escaped);
          continue;
        }
        case "table": {
          const tableToken = token;
          let header = "";
          let cell = "";
          for (let j2 = 0; j2 < tableToken.header.length; j2++) {
            cell += this.renderer.tablecell(this.parseInline(tableToken.header[j2].tokens), { header: true, align: tableToken.align[j2] });
          }
          header += this.renderer.tablerow(cell);
          let body = "";
          for (let j2 = 0; j2 < tableToken.rows.length; j2++) {
            const row = tableToken.rows[j2];
            cell = "";
            for (let k = 0; k < row.length; k++) {
              cell += this.renderer.tablecell(this.parseInline(row[k].tokens), { header: false, align: tableToken.align[k] });
            }
            body += this.renderer.tablerow(cell);
          }
          out += this.renderer.table(header, body);
          continue;
        }
        case "blockquote": {
          const blockquoteToken = token;
          const body = this.parse(blockquoteToken.tokens);
          out += this.renderer.blockquote(body);
          continue;
        }
        case "list": {
          const listToken = token;
          const ordered = listToken.ordered;
          const start = listToken.start;
          const loose = listToken.loose;
          let body = "";
          for (let j2 = 0; j2 < listToken.items.length; j2++) {
            const item = listToken.items[j2];
            const checked = item.checked;
            const task = item.task;
            let itemBody = "";
            if (item.task) {
              const checkbox = this.renderer.checkbox(!!checked);
              if (loose) {
                if (item.tokens.length > 0 && item.tokens[0].type === "paragraph") {
                  item.tokens[0].text = checkbox + " " + item.tokens[0].text;
                  if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === "text") {
                    item.tokens[0].tokens[0].text = checkbox + " " + item.tokens[0].tokens[0].text;
                  }
                } else {
                  item.tokens.unshift({
                    type: "text",
                    text: checkbox + " "
                  });
                }
              } else {
                itemBody += checkbox + " ";
              }
            }
            itemBody += this.parse(item.tokens, loose);
            body += this.renderer.listitem(itemBody, task, !!checked);
          }
          out += this.renderer.list(body, ordered, start);
          continue;
        }
        case "html": {
          const htmlToken = token;
          out += this.renderer.html(htmlToken.text, htmlToken.block);
          continue;
        }
        case "paragraph": {
          const paragraphToken = token;
          out += this.renderer.paragraph(this.parseInline(paragraphToken.tokens));
          continue;
        }
        case "text": {
          let textToken = token;
          let body = textToken.tokens ? this.parseInline(textToken.tokens) : textToken.text;
          while (i + 1 < tokens.length && tokens[i + 1].type === "text") {
            textToken = tokens[++i];
            body += "\n" + (textToken.tokens ? this.parseInline(textToken.tokens) : textToken.text);
          }
          out += top ? this.renderer.paragraph(body) : body;
          continue;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return "";
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
  /**
   * Parse Inline Tokens
   */
  parseInline(tokens, renderer) {
    renderer = renderer || this.renderer;
    let out = "";
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
        const ret = this.options.extensions.renderers[token.type].call({ parser: this }, token);
        if (ret !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(token.type)) {
          out += ret || "";
          continue;
        }
      }
      switch (token.type) {
        case "escape": {
          const escapeToken = token;
          out += renderer.text(escapeToken.text);
          break;
        }
        case "html": {
          const tagToken = token;
          out += renderer.html(tagToken.text);
          break;
        }
        case "link": {
          const linkToken = token;
          out += renderer.link(linkToken.href, linkToken.title, this.parseInline(linkToken.tokens, renderer));
          break;
        }
        case "image": {
          const imageToken = token;
          out += renderer.image(imageToken.href, imageToken.title, imageToken.text);
          break;
        }
        case "strong": {
          const strongToken = token;
          out += renderer.strong(this.parseInline(strongToken.tokens, renderer));
          break;
        }
        case "em": {
          const emToken = token;
          out += renderer.em(this.parseInline(emToken.tokens, renderer));
          break;
        }
        case "codespan": {
          const codespanToken = token;
          out += renderer.codespan(codespanToken.text);
          break;
        }
        case "br": {
          out += renderer.br();
          break;
        }
        case "del": {
          const delToken = token;
          out += renderer.del(this.parseInline(delToken.tokens, renderer));
          break;
        }
        case "text": {
          const textToken = token;
          out += renderer.text(textToken.text);
          break;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return "";
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
};
var _Hooks = class {
  constructor(options2) {
    __publicField(this, "options");
    this.options = options2 || _defaults;
  }
  /**
   * Process markdown before marked
   */
  preprocess(markdown) {
    return markdown;
  }
  /**
   * Process HTML after marked is finished
   */
  postprocess(html2) {
    return html2;
  }
  /**
   * Process all tokens before walk tokens
   */
  processAllTokens(tokens) {
    return tokens;
  }
};
__publicField(_Hooks, "passThroughHooks", /* @__PURE__ */ new Set([
  "preprocess",
  "postprocess",
  "processAllTokens"
]));
var _parseMarkdown, parseMarkdown_fn, _onError, onError_fn;
var Marked = class {
  constructor(...args) {
    __privateAdd(this, _parseMarkdown);
    __privateAdd(this, _onError);
    __publicField(this, "defaults", _getDefaults());
    __publicField(this, "options", this.setOptions);
    __publicField(this, "parse", __privateMethod(this, _parseMarkdown, parseMarkdown_fn).call(this, _Lexer.lex, _Parser.parse));
    __publicField(this, "parseInline", __privateMethod(this, _parseMarkdown, parseMarkdown_fn).call(this, _Lexer.lexInline, _Parser.parseInline));
    __publicField(this, "Parser", _Parser);
    __publicField(this, "Renderer", _Renderer);
    __publicField(this, "TextRenderer", _TextRenderer);
    __publicField(this, "Lexer", _Lexer);
    __publicField(this, "Tokenizer", _Tokenizer);
    __publicField(this, "Hooks", _Hooks);
    this.use(...args);
  }
  /**
   * Run callback for every token
   */
  walkTokens(tokens, callback) {
    var _a2, _b;
    let values = [];
    for (const token of tokens) {
      values = values.concat(callback.call(this, token));
      switch (token.type) {
        case "table": {
          const tableToken = token;
          for (const cell of tableToken.header) {
            values = values.concat(this.walkTokens(cell.tokens, callback));
          }
          for (const row of tableToken.rows) {
            for (const cell of row) {
              values = values.concat(this.walkTokens(cell.tokens, callback));
            }
          }
          break;
        }
        case "list": {
          const listToken = token;
          values = values.concat(this.walkTokens(listToken.items, callback));
          break;
        }
        default: {
          const genericToken = token;
          if ((_b = (_a2 = this.defaults.extensions) == null ? void 0 : _a2.childTokens) == null ? void 0 : _b[genericToken.type]) {
            this.defaults.extensions.childTokens[genericToken.type].forEach((childTokens) => {
              const tokens2 = genericToken[childTokens].flat(Infinity);
              values = values.concat(this.walkTokens(tokens2, callback));
            });
          } else if (genericToken.tokens) {
            values = values.concat(this.walkTokens(genericToken.tokens, callback));
          }
        }
      }
    }
    return values;
  }
  use(...args) {
    const extensions = this.defaults.extensions || { renderers: {}, childTokens: {} };
    args.forEach((pack) => {
      const opts = { ...pack };
      opts.async = this.defaults.async || opts.async || false;
      if (pack.extensions) {
        pack.extensions.forEach((ext) => {
          if (!ext.name) {
            throw new Error("extension name required");
          }
          if ("renderer" in ext) {
            const prevRenderer = extensions.renderers[ext.name];
            if (prevRenderer) {
              extensions.renderers[ext.name] = function(...args2) {
                let ret = ext.renderer.apply(this, args2);
                if (ret === false) {
                  ret = prevRenderer.apply(this, args2);
                }
                return ret;
              };
            } else {
              extensions.renderers[ext.name] = ext.renderer;
            }
          }
          if ("tokenizer" in ext) {
            if (!ext.level || ext.level !== "block" && ext.level !== "inline") {
              throw new Error("extension level must be 'block' or 'inline'");
            }
            const extLevel = extensions[ext.level];
            if (extLevel) {
              extLevel.unshift(ext.tokenizer);
            } else {
              extensions[ext.level] = [ext.tokenizer];
            }
            if (ext.start) {
              if (ext.level === "block") {
                if (extensions.startBlock) {
                  extensions.startBlock.push(ext.start);
                } else {
                  extensions.startBlock = [ext.start];
                }
              } else if (ext.level === "inline") {
                if (extensions.startInline) {
                  extensions.startInline.push(ext.start);
                } else {
                  extensions.startInline = [ext.start];
                }
              }
            }
          }
          if ("childTokens" in ext && ext.childTokens) {
            extensions.childTokens[ext.name] = ext.childTokens;
          }
        });
        opts.extensions = extensions;
      }
      if (pack.renderer) {
        const renderer = this.defaults.renderer || new _Renderer(this.defaults);
        for (const prop in pack.renderer) {
          if (!(prop in renderer)) {
            throw new Error(`renderer '${prop}' does not exist`);
          }
          if (prop === "options") {
            continue;
          }
          const rendererProp = prop;
          const rendererFunc = pack.renderer[rendererProp];
          const prevRenderer = renderer[rendererProp];
          renderer[rendererProp] = (...args2) => {
            let ret = rendererFunc.apply(renderer, args2);
            if (ret === false) {
              ret = prevRenderer.apply(renderer, args2);
            }
            return ret || "";
          };
        }
        opts.renderer = renderer;
      }
      if (pack.tokenizer) {
        const tokenizer = this.defaults.tokenizer || new _Tokenizer(this.defaults);
        for (const prop in pack.tokenizer) {
          if (!(prop in tokenizer)) {
            throw new Error(`tokenizer '${prop}' does not exist`);
          }
          if (["options", "rules", "lexer"].includes(prop)) {
            continue;
          }
          const tokenizerProp = prop;
          const tokenizerFunc = pack.tokenizer[tokenizerProp];
          const prevTokenizer = tokenizer[tokenizerProp];
          tokenizer[tokenizerProp] = (...args2) => {
            let ret = tokenizerFunc.apply(tokenizer, args2);
            if (ret === false) {
              ret = prevTokenizer.apply(tokenizer, args2);
            }
            return ret;
          };
        }
        opts.tokenizer = tokenizer;
      }
      if (pack.hooks) {
        const hooks = this.defaults.hooks || new _Hooks();
        for (const prop in pack.hooks) {
          if (!(prop in hooks)) {
            throw new Error(`hook '${prop}' does not exist`);
          }
          if (prop === "options") {
            continue;
          }
          const hooksProp = prop;
          const hooksFunc = pack.hooks[hooksProp];
          const prevHook = hooks[hooksProp];
          if (_Hooks.passThroughHooks.has(prop)) {
            hooks[hooksProp] = (arg) => {
              if (this.defaults.async) {
                return Promise.resolve(hooksFunc.call(hooks, arg)).then((ret2) => {
                  return prevHook.call(hooks, ret2);
                });
              }
              const ret = hooksFunc.call(hooks, arg);
              return prevHook.call(hooks, ret);
            };
          } else {
            hooks[hooksProp] = (...args2) => {
              let ret = hooksFunc.apply(hooks, args2);
              if (ret === false) {
                ret = prevHook.apply(hooks, args2);
              }
              return ret;
            };
          }
        }
        opts.hooks = hooks;
      }
      if (pack.walkTokens) {
        const walkTokens2 = this.defaults.walkTokens;
        const packWalktokens = pack.walkTokens;
        opts.walkTokens = function(token) {
          let values = [];
          values.push(packWalktokens.call(this, token));
          if (walkTokens2) {
            values = values.concat(walkTokens2.call(this, token));
          }
          return values;
        };
      }
      this.defaults = { ...this.defaults, ...opts };
    });
    return this;
  }
  setOptions(opt) {
    this.defaults = { ...this.defaults, ...opt };
    return this;
  }
  lexer(src, options2) {
    return _Lexer.lex(src, options2 ?? this.defaults);
  }
  parser(tokens, options2) {
    return _Parser.parse(tokens, options2 ?? this.defaults);
  }
};
_parseMarkdown = new WeakSet();
parseMarkdown_fn = function(lexer2, parser2) {
  return (src, options2) => {
    const origOpt = { ...options2 };
    const opt = { ...this.defaults, ...origOpt };
    if (this.defaults.async === true && origOpt.async === false) {
      if (!opt.silent) {
        console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored.");
      }
      opt.async = true;
    }
    const throwError = __privateMethod(this, _onError, onError_fn).call(this, !!opt.silent, !!opt.async);
    if (typeof src === "undefined" || src === null) {
      return throwError(new Error("marked(): input parameter is undefined or null"));
    }
    if (typeof src !== "string") {
      return throwError(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected"));
    }
    if (opt.hooks) {
      opt.hooks.options = opt;
    }
    if (opt.async) {
      return Promise.resolve(opt.hooks ? opt.hooks.preprocess(src) : src).then((src2) => lexer2(src2, opt)).then((tokens) => opt.hooks ? opt.hooks.processAllTokens(tokens) : tokens).then((tokens) => opt.walkTokens ? Promise.all(this.walkTokens(tokens, opt.walkTokens)).then(() => tokens) : tokens).then((tokens) => parser2(tokens, opt)).then((html2) => opt.hooks ? opt.hooks.postprocess(html2) : html2).catch(throwError);
    }
    try {
      if (opt.hooks) {
        src = opt.hooks.preprocess(src);
      }
      let tokens = lexer2(src, opt);
      if (opt.hooks) {
        tokens = opt.hooks.processAllTokens(tokens);
      }
      if (opt.walkTokens) {
        this.walkTokens(tokens, opt.walkTokens);
      }
      let html2 = parser2(tokens, opt);
      if (opt.hooks) {
        html2 = opt.hooks.postprocess(html2);
      }
      return html2;
    } catch (e2) {
      return throwError(e2);
    }
  };
};
_onError = new WeakSet();
onError_fn = function(silent, async) {
  return (e2) => {
    e2.message += "\nPlease report this to https://github.com/markedjs/marked.";
    if (silent) {
      const msg = "<p>An error occurred:</p><pre>" + escape$1(e2.message + "", true) + "</pre>";
      if (async) {
        return Promise.resolve(msg);
      }
      return msg;
    }
    if (async) {
      return Promise.reject(e2);
    }
    throw e2;
  };
};
var markedInstance = new Marked();
function marked(src, opt) {
  return markedInstance.parse(src, opt);
}
marked.options = marked.setOptions = function(options2) {
  markedInstance.setOptions(options2);
  marked.defaults = markedInstance.defaults;
  changeDefaults(marked.defaults);
  return marked;
};
marked.getDefaults = _getDefaults;
marked.defaults = _defaults;
marked.use = function(...args) {
  markedInstance.use(...args);
  marked.defaults = markedInstance.defaults;
  changeDefaults(marked.defaults);
  return marked;
};
marked.walkTokens = function(tokens, callback) {
  return markedInstance.walkTokens(tokens, callback);
};
marked.parseInline = markedInstance.parseInline;
marked.Parser = _Parser;
marked.parser = _Parser.parse;
marked.Renderer = _Renderer;
marked.TextRenderer = _TextRenderer;
marked.Lexer = _Lexer;
marked.lexer = _Lexer.lex;
marked.Tokenizer = _Tokenizer;
marked.Hooks = _Hooks;
marked.parse = marked;
var options = marked.options;
var setOptions = marked.setOptions;
var use = marked.use;
var walkTokens = marked.walkTokens;
var parseInline = marked.parseInline;
var parser = _Parser.parse;
var lexer = _Lexer.lex;

// node_modules/.pnpm/marked-highlight@2.1.1_marked@12.0.2/node_modules/marked-highlight/src/index.js
function markedHighlight(options2) {
  if (typeof options2 === "function") {
    options2 = {
      highlight: options2
    };
  }
  if (!options2 || typeof options2.highlight !== "function") {
    throw new Error("Must provide highlight function");
  }
  if (typeof options2.langPrefix !== "string") {
    options2.langPrefix = "language-";
  }
  return {
    async: !!options2.async,
    walkTokens(token) {
      if (token.type !== "code") {
        return;
      }
      const lang = getLang(token.lang);
      if (options2.async) {
        return Promise.resolve(options2.highlight(token.text, lang, token.lang || "")).then(updateToken(token));
      }
      const code = options2.highlight(token.text, lang, token.lang || "");
      if (code instanceof Promise) {
        throw new Error("markedHighlight is not set to async but the highlight function is async. Set the async option to true on markedHighlight to await the async highlight function.");
      }
      updateToken(token)(code);
    },
    renderer: {
      code(code, infoString, escaped) {
        const lang = getLang(infoString);
        const classAttr = lang ? ` class="${options2.langPrefix}${escape2(lang)}"` : "";
        code = code.replace(/\n$/, "");
        return `<pre><code${classAttr}>${escaped ? code : escape2(code, true)}
</code></pre>`;
      }
    }
  };
}
function getLang(lang) {
  return (lang || "").match(/\S*/)[0];
}
function updateToken(token) {
  return (code) => {
    if (typeof code === "string" && code !== token.text) {
      token.escaped = true;
      token.text = code;
    }
  };
}
var escapeTest2 = /[&<>"']/;
var escapeReplace2 = new RegExp(escapeTest2.source, "g");
var escapeTestNoEncode2 = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
var escapeReplaceNoEncode2 = new RegExp(escapeTestNoEncode2.source, "g");
var escapeReplacements2 = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
var getEscapeReplacement2 = (ch) => escapeReplacements2[ch];
function escape2(html2, encode) {
  if (encode) {
    if (escapeTest2.test(html2)) {
      return html2.replace(escapeReplace2, getEscapeReplacement2);
    }
  } else {
    if (escapeTestNoEncode2.test(html2)) {
      return html2.replace(escapeReplaceNoEncode2, getEscapeReplacement2);
    }
  }
  return html2;
}

// node_modules/.pnpm/@waline+client@3.2.0/node_modules/@waline/client/dist/slim.js
var import_recaptcha_v3 = __toESM(require_ReCaptcha());
var Jt = ["nick", "mail", "link"];
var Ge = (e2) => e2.filter((n2) => Jt.includes(n2));
var Ke = ["//unpkg.com/@waline/emojis@1.1.0/weibo"];
var Yt = ["//unpkg.com/@waline/emojis/tieba/tieba_agree.png", "//unpkg.com/@waline/emojis/tieba/tieba_look_down.png", "//unpkg.com/@waline/emojis/tieba/tieba_sunglasses.png", "//unpkg.com/@waline/emojis/tieba/tieba_pick_nose.png", "//unpkg.com/@waline/emojis/tieba/tieba_awkward.png", "//unpkg.com/@waline/emojis/tieba/tieba_sleep.png"];
var Qt = (e2) => new Promise((n2, t2) => {
  if (e2.size > 128e3)
    return t2(new Error("File too large! File size limit 128KB"));
  const l = new FileReader();
  l.readAsDataURL(e2), l.onload = () => {
    var a;
    return n2(((a = l.result) == null ? void 0 : a.toString()) ?? "");
  }, l.onerror = t2;
});
var el = (e2) => e2 === true ? '<p class="wl-tex">TeX is not available in preview</p>' : '<span class="wl-tex">TeX is not available in preview</span>';
var tl = (e2) => {
  const n2 = async (t2, l = {}) => fetch(`https://api.giphy.com/v1/gifs/${t2}?${new URLSearchParams({ lang: e2, limit: "20", rating: "g", api_key: "6CIMLkNMMOhRcXPoMCPkFy4Ybk2XUiMp", ...l }).toString()}`).then((a) => a.json()).then(({ data: a }) => a.map((i) => ({ title: i.title, src: i.images.downsized_medium.url })));
  return { search: (t2) => n2("search", { q: t2, offset: "0" }), default: () => n2("trending", {}), more: (t2, l = 0) => n2("search", { q: t2, offset: l.toString() }) };
};
var ll = /[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|\w+/;
var al = /</;
var nl = /(?:^|\s)\/\/(.+?)$/gm;
var ol = /\/\*([\S\s]*?)\*\//gm;
var il = new RegExp(`(${ll.source}|${al.source})|((?:${nl.source})|(?:${ol.source}))`, "gmi");
var Ze = ["23AC69", "91C132", "F19726", "E8552D", "1AAB8E", "E1147F", "2980C1", "1BA1E6", "9FA0A0", "F19726", "E30B20", "E30B20", "A3338B"];
var Ee = {};
var rl = (e2) => {
  let n2 = 0;
  return e2.replace(il, (t2, l, a) => {
    if (a)
      return `<span style="color: slategray">${a}</span>`;
    if (l === "<")
      return "&lt;";
    let i;
    Ee[l] ? i = Ee[l] : (i = Ze[n2], Ee[l] = i);
    const h2 = `<span style="color: #${i}">${l}</span>`;
    return n2 = ++n2 % Ze.length, h2;
  });
};
var sl = ["nick", "nickError", "mail", "mailError", "link", "optional", "placeholder", "sofa", "submit", "like", "cancelLike", "reply", "cancelReply", "comment", "refresh", "more", "preview", "emoji", "uploadImage", "seconds", "minutes", "hours", "days", "now", "uploading", "login", "logout", "admin", "sticky", "word", "wordHint", "anonymous", "level0", "level1", "level2", "level3", "level4", "level5", "gif", "gifSearchPlaceholder", "profile", "approved", "waiting", "spam", "unsticky", "oldest", "latest", "hottest", "reactionTitle"];
var oe = (e2) => Object.fromEntries(e2.map((n2, t2) => [sl[t2], n2]));
var Xe = oe(["NickName", "NickName cannot be less than 3 bytes.", "E-Mail", "Please confirm your email address.", "Website", "Optional", "Comment here...", "No comment yet.", "Submit", "Like", "Cancel like", "Reply", "Cancel reply", "Comments", "Refresh", "Load More...", "Preview", "Emoji", "Upload Image", "seconds ago", "minutes ago", "hours ago", "days ago", "just now", "Uploading", "Login", "logout", "Admin", "Sticky", "Words", `Please input comments between $0 and $1 words!
 Current word number: $2`, "Anonymous", "Dwarves", "Hobbits", "Ents", "Wizards", "Elves", "Maiar", "GIF", "Search GIF", "Profile", "Approved", "Waiting", "Spam", "Unsticky", "Oldest", "Latest", "Hottest", "What do you think?"]);
var Je = oe(["Pseudo", "Le pseudo ne peut pas faire moins de 3 octets.", "E-mail", "Veuillez confirmer votre adresse e-mail.", "Site Web", "Optionnel", "Commentez ici...", "Aucun commentaire pour l'instant.", "Envoyer", "J'aime", "Annuler le j'aime", "Répondre", "Annuler la réponse", "Commentaires", "Actualiser", "Charger plus...", "Aperçu", "Emoji", "Télécharger une image", "Il y a quelques secondes", "Il y a quelques minutes", "Il y a quelques heures", "Il y a quelques jours", "À l'instant", "Téléchargement en cours", "Connexion", "Déconnexion", "Admin", "Épinglé", "Mots", `Veuillez saisir des commentaires entre $0 et $1 mots !
 Nombre actuel de mots : $2`, "Anonyme", "Nains", "Hobbits", "Ents", "Mages", "Elfes", "Maïar", "GIF", "Rechercher un GIF", "Profil", "Approuvé", "En attente", "Indésirable", "Détacher", "Le plus ancien", "Dernier", "Le plus populaire", "Qu'en pensez-vous ?"]);
var Ye = oe(["ニックネーム", "3バイト以上のニックネームをご入力ください.", "メールアドレス", "メールアドレスをご確認ください.", "サイト", "オプション", "ここにコメント", "コメントしましょう~", "提出する", "Like", "Cancel like", "返信する", "キャンセル", "コメント", "更新", "さらに読み込む", "プレビュー", "絵文字", "画像をアップロード", "秒前", "分前", "時間前", "日前", "たっだ今", "アップロード", "ログインする", "ログアウト", "管理者", "トップに置く", "ワード", `コメントは $0 から $1 ワードの間でなければなりません!
 現在の単語番号: $2`, "匿名", "うえにん", "なかにん", "しもおし", "特にしもおし", "かげ", "なぬし", "GIF", "探す GIF", "個人情報", "承認済み", "待っている", "スパム", "べたつかない", "逆順", "正順", "人気順", "どう思いますか？"]);
var cl = oe(["Apelido", "Apelido não pode ser menor que 3 bytes.", "E-Mail", "Por favor, confirme seu endereço de e-mail.", "Website", "Opcional", "Comente aqui...", "Nenhum comentário, ainda.", "Enviar", "Like", "Cancel like", "Responder", "Cancelar resposta", "Comentários", "Refrescar", "Carregar Mais...", "Visualizar", "Emoji", "Enviar Imagem", "segundos atrás", "minutos atrás", "horas atrás", "dias atrás", "agora mesmo", "Enviando", "Entrar", "Sair", "Admin", "Sticky", "Palavras", `Favor enviar comentário com $0 a $1 palavras!
 Número de palavras atuais: $2`, "Anônimo", "Dwarves", "Hobbits", "Ents", "Wizards", "Elves", "Maiar", "GIF", "Pesquisar GIF", "informação pessoal", "Aprovado", "Espera", "Spam", "Unsticky", "Mais velho", "Mais recentes", "Mais quente", "O que você acha?"]);
var Qe = oe(["Псевдоним", "Никнейм не может быть меньше 3 байт.", "Эл. адрес", "Пожалуйста, подтвердите адрес вашей электронной почты.", "Веб-сайт", "Необязательный", "Комментарий здесь...", "Пока нет комментариев.", "Отправить", "Like", "Cancel like", "Отвечать", "Отменить ответ", "Комментарии", "Обновить", "Загрузи больше...", "Превью", "эмодзи", "Загрузить изображение", "секунд назад", "несколько минут назад", "несколько часов назад", "дней назад", "прямо сейчас", "Загрузка", "Авторизоваться", "Выход из системы", "Админ", "Липкий", "Слова", `Пожалуйста, введите комментарии от $0 до $1 слов!
Номер текущего слова: $2`, "Анонимный", "Dwarves", "Hobbits", "Ents", "Wizards", "Elves", "Maiar", "GIF", "Поиск GIF", "Персональные данные", "Одобренный", "Ожидающий", "Спам", "Нелипкий", "самый старый", "последний", "самый горячий", "Что вы думаете?"]);
var et = oe(["Tên", "Tên không được nhỏ hơn 3 ký tự.", "E-Mail", "Vui lòng xác nhập địa chỉ email của bạn.", "Website", "Tùy chọn", "Hãy bình luận có văn hoá!", "Chưa có bình luận", "Gửi", "Thích", "Bỏ thích", "Trả lời", "Hủy bỏ", "bình luận", "Làm mới", "Tải thêm...", "Xem trước", "Emoji", "Tải lên hình ảnh", "giây trước", "phút trước", "giờ trước", "ngày trước", "Vừa xong", "Đang tải lên", "Đăng nhập", "đăng xuất", "Quản trị viên", "Dính", "từ", `Bình luận phải có độ dài giữa $0 và $1 từ!
 Số từ hiện tại: $2`, "Vô danh", "Người lùn", "Người tí hon", "Thần rừng", "Pháp sư", "Tiên tộc", "Maiar", "Ảnh GIF", "Tìm kiếm ảnh GIF", "thông tin cá nhân", "Đã được phê duyệt", "Đang chờ đợi", "Thư rác", "Không dính", "lâu đời nhất", "muộn nhất", "nóng nhất", "What do you think?"]);
var tt = oe(["昵称", "昵称不能少于3个字符", "邮箱", "请填写正确的邮件地址", "网址", "可选", "欢迎评论", "来发评论吧~", "提交", "喜欢", "取消喜欢", "回复", "取消回复", "评论", "刷新", "加载更多...", "预览", "表情", "上传图片", "秒前", "分钟前", "小时前", "天前", "刚刚", "正在上传", "登录", "退出", "博主", "置顶", "字", `评论字数应在 $0 到 $1 字之间！
当前字数：$2`, "匿名", "潜水", "冒泡", "吐槽", "活跃", "话痨", "传说", "表情包", "搜索表情包", "个人资料", "通过", "待审核", "垃圾", "取消置顶", "按倒序", "按正序", "按热度", "你认为这篇文章怎么样？"]);
var ul = oe(["暱稱", "暱稱不能少於3個字元", "郵箱", "請填寫正確的郵件地址", "網址", "可選", "歡迎留言", "來發留言吧~", "送出", "喜歡", "取消喜歡", "回覆", "取消回覆", "留言", "重整", "載入更多...", "預覽", "表情", "上傳圖片", "秒前", "分鐘前", "小時前", "天前", "剛剛", "正在上傳", "登入", "登出", "管理者", "置頂", "字", `留言字數應在 $0 到 $1 字之間！
目前字數：$2`, "匿名", "潛水", "冒泡", "吐槽", "活躍", "多話", "傳說", "表情包", "搜尋表情包", "個人資料", "通過", "待審核", "垃圾", "取消置頂", "最早", "最新", "熱門", "你認為這篇文章怎麼樣？"]);
var lt = "en-US";
var ke = { zh: tt, "zh-cn": tt, "zh-tw": ul, en: Xe, "en-us": Xe, fr: Je, "fr-fr": Je, jp: Ye, "jp-jp": Ye, "pt-br": cl, ru: Qe, "ru-ru": Qe, vi: et, "vi-vn": et };
var at = (e2) => ke[e2.toLowerCase()] || ke[lt];
var vl = (e2) => Object.keys(ke).includes(e2.toLowerCase()) ? e2 : lt;
var nt = (e2) => {
  try {
    e2 = decodeURI(e2);
  } catch {
  }
  return e2;
};
var ot = (e2 = "") => e2.replace(/\/$/u, "");
var it = (e2) => /^(https?:)?\/\//.test(e2);
var be = (e2) => {
  const n2 = ot(e2);
  return it(n2) ? n2 : `https://${n2}`;
};
var ml = (e2) => Array.isArray(e2) ? e2 : e2 ? [0, e2] : false;
var xe = (e2, n2) => typeof e2 == "function" ? e2 : e2 === false ? false : n2;
var dl = ({ serverURL: e2, path: n2 = location.pathname, lang: t2 = typeof navigator > "u" ? "en-US" : navigator.language, locale: l, emoji: a = Ke, meta: i = ["nick", "mail", "link"], requiredMeta: h2 = [], dark: c2 = false, pageSize: C2 = 10, wordLimit: u2, imageUploader: w2, highlighter: S, texRenderer: g, copyright: _ = true, login: M = "enable", search: $2, reaction: y2, recaptchaV3Key: o2 = "", turnstileKey: f2 = "", commentSorting: F = "latest", ...q }) => ({ serverURL: be(e2), path: nt(n2), lang: vl(t2), locale: { ...at(t2), ...typeof l == "object" ? l : {} }, wordLimit: ml(u2), meta: Ge(i), requiredMeta: Ge(h2), imageUploader: xe(w2, Qt), highlighter: xe(S, rl), texRenderer: xe(g, el), dark: c2, emoji: typeof a == "boolean" ? a ? Ke : [] : a, pageSize: C2, login: M, copyright: _, search: $2 === false ? false : typeof $2 == "object" ? $2 : tl(t2), recaptchaV3Key: o2, turnstileKey: f2, reaction: Array.isArray(y2) ? y2 : y2 === true ? Yt : [], commentSorting: F, ...q });
var re = (e2) => typeof e2 == "string";
var Re = "{--waline-white:#000;--waline-light-grey:#666;--waline-dark-grey:#999;--waline-color:#888;--waline-bg-color:#1e1e1e;--waline-bg-color-light:#272727;--waline-bg-color-hover: #444;--waline-border-color:#333;--waline-disable-bg-color:#444;--waline-disable-color:#272727;--waline-bq-color:#272727;--waline-info-bg-color:#272727;--waline-info-color:#666}";
var pl = (e2) => re(e2) ? e2 === "auto" ? `@media(prefers-color-scheme:dark){body${Re}}` : `${e2}${Re}` : e2 === true ? `:root${Re}` : "";
var Ae = (e2, n2) => {
  let t2 = e2.toString();
  for (; t2.length < n2; )
    t2 = "0" + t2;
  return t2;
};
var gl = (e2) => {
  const n2 = Ae(e2.getDate(), 2), t2 = Ae(e2.getMonth() + 1, 2);
  return `${Ae(e2.getFullYear(), 2)}-${t2}-${n2}`;
};
var hl = (e2, n2, t2) => {
  if (!e2)
    return "";
  const l = re(e2) ? new Date(e2.indexOf(" ") !== -1 ? e2.replace(/-/g, "/") : e2) : e2, a = n2.getTime() - l.getTime(), i = Math.floor(a / (24 * 3600 * 1e3));
  if (i === 0) {
    const h2 = a % 864e5, c2 = Math.floor(h2 / (3600 * 1e3));
    if (c2 === 0) {
      const C2 = h2 % 36e5, u2 = Math.floor(C2 / (60 * 1e3));
      if (u2 === 0) {
        const w2 = C2 % 6e4;
        return `${Math.round(w2 / 1e3)} ${t2.seconds}`;
      }
      return `${u2} ${t2.minutes}`;
    }
    return `${c2} ${t2.hours}`;
  }
  return i < 0 ? t2.now : i < 8 ? `${i} ${t2.days}` : gl(l);
};
var fl = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var wl = (e2) => fl.test(e2);
var yl = (e2) => !!/@[0-9]+\.[0-9]+\.[0-9]+/.test(e2);
var kl = (e2) => {
  const n2 = useStorage("WALINE_EMOJI", {}), t2 = yl(e2);
  if (t2) {
    const l = n2.value[e2];
    if (l)
      return Promise.resolve(l);
  }
  return fetch(`${e2}/info.json`).then((l) => l.json()).then((l) => {
    const a = { folder: e2, ...l };
    return t2 && (n2.value[e2] = a), a;
  });
};
var rt = (e2, n2 = "", t2 = "", l = "") => `${n2 ? `${n2}/` : ""}${t2}${e2}${l ? `.${l}` : ""}`;
var bl = (e2) => Promise.all(e2.map((n2) => re(n2) ? kl(ot(n2)) : Promise.resolve(n2))).then((n2) => {
  const t2 = { tabs: [], map: {} };
  return n2.forEach((l) => {
    const { name: a, folder: i, icon: h2, prefix: c2 = "", type: C2, items: u2 } = l;
    t2.tabs.push({ name: a, icon: rt(h2, i, c2, C2), items: u2.map((w2) => {
      const S = `${c2}${w2}`;
      return t2.map[S] = rt(w2, i, c2, C2), S;
    }) });
  }), t2;
});
var st = (e2) => {
  e2.name !== "AbortError" && console.error(e2.message);
};
var _e = (e2) => e2 instanceof HTMLElement ? e2 : re(e2) ? document.querySelector(e2) : null;
var Cl = (e2) => e2.type.includes("image");
var ct = (e2) => {
  const n2 = Array.from(e2).find(Cl);
  return n2 ? n2.getAsFile() : null;
};
var $l = /\$.*?\$/;
var Ll = /^\$(.*?)\$/;
var Il = /^(?:\s{0,3})\$\$((?:[^\n]|\n[^\n])+?)\n{0,1}\$\$/;
var El = (e2) => [{ name: "blockMath", level: "block", tokenizer(n2) {
  const t2 = Il.exec(n2);
  if (t2 !== null)
    return { type: "html", raw: t2[0], text: e2(true, t2[1]) };
} }, { name: "inlineMath", level: "inline", start(n2) {
  const t2 = n2.search($l);
  return t2 !== -1 ? t2 : n2.length;
}, tokenizer(n2) {
  const t2 = Ll.exec(n2);
  if (t2 !== null)
    return { type: "html", raw: t2[0], text: e2(false, t2[1]) };
} }];
var ut = (e2 = "", n2 = {}) => e2.replace(/:(.+?):/g, (t2, l) => n2[l] ? `<img class="wl-emoji" src="${n2[l]}" alt="${l}">` : t2);
var xl = (e2, { emojiMap: n2, highlighter: t2, texRenderer: l }) => {
  const a = new Marked();
  if (a.setOptions({ breaks: true }), t2 && a.use(markedHighlight({ highlight: t2 })), l) {
    const i = El(l);
    a.use({ extensions: i });
  }
  return a.parse(ut(e2, n2));
};
var Me = (e2) => e2.dataset.path ?? null;
var Rl = (e2) => e2.match(/[\w\d\s,.\u00C0-\u024F\u0400-\u04FF]+/giu);
var Al = (e2) => e2.match(/[\u4E00-\u9FD5]/gu);
var _l = (e2) => {
  var n2, t2;
  return (((n2 = Rl(e2)) == null ? void 0 : n2.reduce((l, a) => l + (["", ",", "."].includes(a.trim()) ? 0 : a.trim().split(/\s+/u).length), 0)) ?? 0) + (((t2 = Al(e2)) == null ? void 0 : t2.length) ?? 0);
};
var Ml = async () => {
  if (!navigator)
    return "";
  const { userAgentData: e2 } = navigator;
  let n2 = navigator.userAgent;
  if (!e2 || e2.platform !== "Windows")
    return n2;
  const { platformVersion: t2 } = await e2.getHighEntropyValues(["platformVersion"]);
  return t2 && parseInt(t2.split(".")[0]) >= 13 && (n2 = n2.replace("Windows NT 10.0", "Windows NT 11.0")), n2;
};
var vt = ({ serverURL: e2, path: n2 = window.location.pathname, selector: t2 = ".waline-comment-count", lang: l = navigator.language }) => {
  const a = new AbortController(), i = document.querySelectorAll(t2);
  return i.length && f({ serverURL: be(e2), paths: Array.from(i).map((h2) => nt(Me(h2) ?? n2)), lang: l, signal: a.signal }).then((h2) => {
    i.forEach((c2, C2) => {
      c2.innerText = h2[C2].toString();
    });
  }).catch(st), a.abort.bind(a);
};
var mt = ({ size: e2 }) => h("svg", { class: "wl-close-icon", viewBox: "0 0 1024 1024", width: e2, height: e2 }, [h("path", { d: "M697.173 85.333h-369.92c-144.64 0-241.92 101.547-241.92 252.587v348.587c0 150.613 97.28 252.16 241.92 252.16h369.92c144.64 0 241.494-101.547 241.494-252.16V337.92c0-151.04-96.854-252.587-241.494-252.587z", fill: "currentColor" }), h("path", { d: "m640.683 587.52-75.947-75.861 75.904-75.862a37.29 37.29 0 0 0 0-52.778 37.205 37.205 0 0 0-52.779 0l-75.946 75.818-75.862-75.946a37.419 37.419 0 0 0-52.821 0 37.419 37.419 0 0 0 0 52.821l75.947 75.947-75.776 75.733a37.29 37.29 0 1 0 52.778 52.821l75.776-75.776 75.947 75.947a37.376 37.376 0 0 0 52.779-52.821z", fill: "#888" })]);
var Sl = () => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, h("path", { d: "m341.013 394.667 27.755 393.45h271.83l27.733-393.45h64.106l-28.01 397.952a64 64 0 0 1-63.83 59.498H368.768a64 64 0 0 1-63.83-59.52l-28.053-397.93h64.128zm139.307 19.818v298.667h-64V414.485h64zm117.013 0v298.667h-64V414.485h64zM181.333 288h640v64h-640v-64zm453.483-106.667v64h-256v-64h256z", fill: "red" }));
var Ul = () => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, h("path", { d: "M563.2 463.3 677 540c1.7 1.2 3.7 1.8 5.8 1.8.7 0 1.4-.1 2-.2 2.7-.5 5.1-2.1 6.6-4.4l25.3-37.8c1.5-2.3 2.1-5.1 1.6-7.8s-2.1-5.1-4.4-6.6l-73.6-49.1 73.6-49.1c2.3-1.5 3.9-3.9 4.4-6.6.5-2.7 0-5.5-1.6-7.8l-25.3-37.8a10.1 10.1 0 0 0-6.6-4.4c-.7-.1-1.3-.2-2-.2-2.1 0-4.1.6-5.8 1.8l-113.8 76.6c-9.2 6.2-14.7 16.4-14.7 27.5.1 11 5.5 21.3 14.7 27.4zM387 348.8h-45.5c-5.7 0-10.4 4.7-10.4 10.4v153.3c0 5.7 4.7 10.4 10.4 10.4H387c5.7 0 10.4-4.7 10.4-10.4V359.2c0-5.7-4.7-10.4-10.4-10.4zm333.8 241.3-41-20a10.3 10.3 0 0 0-8.1-.5c-2.6.9-4.8 2.9-5.9 5.4-30.1 64.9-93.1 109.1-164.4 115.2-5.7.5-9.9 5.5-9.5 11.2l3.9 45.5c.5 5.3 5 9.5 10.3 9.5h.9c94.8-8 178.5-66.5 218.6-152.7 2.4-5 .3-11.2-4.8-13.6zm186-186.1c-11.9-42-30.5-81.4-55.2-117.1-24.1-34.9-53.5-65.6-87.5-91.2-33.9-25.6-71.5-45.5-111.6-59.2-41.2-14-84.1-21.1-127.8-21.1h-1.2c-75.4 0-148.8 21.4-212.5 61.7-63.7 40.3-114.3 97.6-146.5 165.8-32.2 68.1-44.3 143.6-35.1 218.4 9.3 74.8 39.4 145 87.3 203.3.1.2.3.3.4.5l36.2 38.4c1.1 1.2 2.5 2.1 3.9 2.6 73.3 66.7 168.2 103.5 267.5 103.5 73.3 0 145.2-20.3 207.7-58.7 37.3-22.9 70.3-51.5 98.1-85 27.1-32.7 48.7-69.5 64.2-109.1 15.5-39.7 24.4-81.3 26.6-123.8 2.4-43.6-2.5-87-14.5-129zm-60.5 181.1c-8.3 37-22.8 72-43 104-19.7 31.1-44.3 58.6-73.1 81.7-28.8 23.1-61 41-95.7 53.4-35.6 12.7-72.9 19.1-110.9 19.1-82.6 0-161.7-30.6-222.8-86.2l-34.1-35.8c-23.9-29.3-42.4-62.2-55.1-97.7-12.4-34.7-18.8-71-19.2-107.9-.4-36.9 5.4-73.3 17.1-108.2 12-35.8 30-69.2 53.4-99.1 31.7-40.4 71.1-72 117.2-94.1 44.5-21.3 94-32.6 143.4-32.6 49.3 0 97 10.8 141.8 32 34.3 16.3 65.3 38.1 92 64.8 26.1 26 47.5 56 63.6 89.2 16.2 33.2 26.6 68.5 31 105.1 4.6 37.5 2.7 75.3-5.6 112.3z", fill: "currentColor" }));
var jl = () => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, [h("path", { d: "M784 112H240c-88 0-160 72-160 160v480c0 88 72 160 160 160h544c88 0 160-72 160-160V272c0-88-72-160-160-160zm96 640c0 52.8-43.2 96-96 96H240c-52.8 0-96-43.2-96-96V272c0-52.8 43.2-96 96-96h544c52.8 0 96 43.2 96 96v480z", fill: "currentColor" }), h("path", { d: "M352 480c52.8 0 96-43.2 96-96s-43.2-96-96-96-96 43.2-96 96 43.2 96 96 96zm0-128c17.6 0 32 14.4 32 32s-14.4 32-32 32-32-14.4-32-32 14.4-32 32-32zm462.4 379.2-3.2-3.2-177.6-177.6c-25.6-25.6-65.6-25.6-91.2 0l-80 80-36.8-36.8c-25.6-25.6-65.6-25.6-91.2 0L200 728c-4.8 6.4-8 14.4-8 24 0 17.6 14.4 32 32 32 9.6 0 16-3.2 22.4-9.6L380.8 640l134.4 134.4c6.4 6.4 14.4 9.6 24 9.6 17.6 0 32-14.4 32-32 0-9.6-4.8-17.6-9.6-24l-52.8-52.8 80-80L769.6 776c6.4 4.8 12.8 8 20.8 8 17.6 0 32-14.4 32-32 0-8-3.2-16-8-20.8z", fill: "currentColor" })]);
var zl = ({ active: e2 = false }) => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, [h("path", { d: `M850.654 323.804c-11.042-25.625-26.862-48.532-46.885-68.225-20.022-19.61-43.258-34.936-69.213-45.73-26.78-11.124-55.124-16.727-84.375-16.727-40.622 0-80.256 11.123-114.698 32.135A214.79 214.79 0 0 0 512 241.819a214.79 214.79 0 0 0-23.483-16.562c-34.442-21.012-74.076-32.135-114.698-32.135-29.25 0-57.595 5.603-84.375 16.727-25.872 10.711-49.19 26.12-69.213 45.73-20.105 19.693-35.843 42.6-46.885 68.225-11.453 26.615-17.303 54.877-17.303 83.963 0 27.439 5.603 56.03 16.727 85.117 9.31 24.307 22.659 49.52 39.715 74.981 27.027 40.293 64.188 82.316 110.33 124.915 76.465 70.615 152.189 119.394 155.402 121.371l19.528 12.525c8.652 5.52 19.776 5.52 28.427 0l19.529-12.525c3.213-2.06 78.854-50.756 155.401-121.371 46.143-42.6 83.304-84.622 110.33-124.915 17.057-25.46 30.487-50.674 39.716-74.981 11.124-29.087 16.727-57.678 16.727-85.117.082-29.086-5.768-57.348-17.221-83.963z${e2 ? "" : "M512 761.5S218.665 573.55 218.665 407.767c0-83.963 69.461-152.023 155.154-152.023 60.233 0 112.473 33.618 138.181 82.727 25.708-49.109 77.948-82.727 138.18-82.727 85.694 0 155.155 68.06 155.155 152.023C805.335 573.551 512 761.5 512 761.5z"}`, fill: e2 ? "red" : "currentColor" })]);
var Vl = () => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, [h("path", { d: "M710.816 654.301c70.323-96.639 61.084-230.578-23.705-314.843-46.098-46.098-107.183-71.109-172.28-71.109-65.008 0-126.092 25.444-172.28 71.109-45.227 46.098-70.756 107.183-70.756 172.106 0 64.923 25.444 126.007 71.194 172.106 46.099 46.098 107.184 71.109 172.28 71.109 51.414 0 100.648-16.212 142.824-47.404l126.53 126.006c7.058 7.06 16.297 10.979 26.406 10.979 10.105 0 19.343-3.919 26.402-10.979 14.467-14.467 14.467-38.172 0-52.723L710.816 654.301zm-315.107-23.265c-65.88-65.88-65.88-172.54 0-238.42 32.069-32.07 74.245-49.149 119.471-49.149 45.227 0 87.407 17.603 119.472 49.149 65.88 65.879 65.88 172.539 0 238.42-63.612 63.178-175.242 63.178-238.943 0zm0 0", fill: "currentColor" }), h("path", { d: "M703.319 121.603H321.03c-109.8 0-199.469 89.146-199.469 199.38v382.034c0 109.796 89.236 199.38 199.469 199.38h207.397c20.653 0 37.384-16.645 37.384-37.299 0-20.649-16.731-37.296-37.384-37.296H321.03c-68.582 0-124.352-55.77-124.352-124.267V321.421c0-68.496 55.77-124.267 124.352-124.267h382.289c68.582 0 124.352 55.771 124.352 124.267V524.72c0 20.654 16.736 37.299 37.385 37.299 20.654 0 37.384-16.645 37.384-37.299V320.549c-.085-109.8-89.321-198.946-199.121-198.946zm0 0", fill: "currentColor" })]);
var Hl = () => h("svg", { width: "16", height: "16", ariaHidden: "true" }, h("path", { d: "M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z", fill: "currentColor" }));
var Tl = () => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, h("path", { d: "M810.667 213.333a64 64 0 0 1 64 64V704a64 64 0 0 1-64 64H478.336l-146.645 96.107a21.333 21.333 0 0 1-33.024-17.856V768h-85.334a64 64 0 0 1-64-64V277.333a64 64 0 0 1 64-64h597.334zm0 64H213.333V704h149.334v63.296L459.243 704h351.424V277.333zm-271.36 213.334v64h-176.64v-64h176.64zm122.026-128v64H362.667v-64h298.666z", fill: "currentColor" }));
var Fl = () => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, h("path", { d: "M813.039 318.772L480.53 651.278H360.718V531.463L693.227 198.961C697.904 194.284 704.027 192 710.157 192C716.302 192 722.436 194.284 727.114 198.961L813.039 284.88C817.72 289.561 820 295.684 820 301.825C820 307.95 817.72 314.093 813.039 318.772ZM710.172 261.888L420.624 551.431V591.376H460.561L750.109 301.825L710.172 261.888ZM490.517 291.845H240.906V771.09H720.156V521.479C720.156 504.947 733.559 491.529 750.109 491.529C766.653 491.529 780.063 504.947 780.063 521.479V791.059C780.063 813.118 762.18 831 740.125 831H220.937C198.882 831 181 813.118 181 791.059V271.872C181 249.817 198.882 231.935 220.937 231.935H490.517C507.06 231.935 520.47 245.352 520.47 261.888C520.47 278.424 507.06 291.845 490.517 291.845Z", fill: "currentColor" }));
var Nl = () => h("svg", { class: "verified-icon", viewBox: "0 0 1024 1024", width: "14", height: "14" }, h("path", { d: "m894.4 461.56-54.4-63.2c-10.4-12-18.8-34.4-18.8-50.4v-68c0-42.4-34.8-77.2-77.2-77.2h-68c-15.6 0-38.4-8.4-50.4-18.8l-63.2-54.4c-27.6-23.6-72.8-23.6-100.8 0l-62.8 54.8c-12 10-34.8 18.4-50.4 18.4h-69.2c-42.4 0-77.2 34.8-77.2 77.2v68.4c0 15.6-8.4 38-18.4 50l-54 63.6c-23.2 27.6-23.2 72.4 0 100l54 63.6c10 12 18.4 34.4 18.4 50v68.4c0 42.4 34.8 77.2 77.2 77.2h69.2c15.6 0 38.4 8.4 50.4 18.8l63.2 54.4c27.6 23.6 72.8 23.6 100.8 0l63.2-54.4c12-10.4 34.4-18.8 50.4-18.8h68c42.4 0 77.2-34.8 77.2-77.2v-68c0-15.6 8.4-38.4 18.8-50.4l54.4-63.2c23.2-27.6 23.2-73.2-.4-100.8zm-216-25.2-193.2 193.2a30 30 0 0 1-42.4 0l-96.8-96.8a30.16 30.16 0 0 1 0-42.4c11.6-11.6 30.8-11.6 42.4 0l75.6 75.6 172-172c11.6-11.6 30.8-11.6 42.4 0 11.6 11.6 11.6 30.8 0 42.4z", fill: "#27ae60" }));
var ve = ({ size: e2 = 100 }) => h("svg", { width: e2, height: e2, viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid" }, h("circle", { cx: 50, cy: 50, fill: "none", stroke: "currentColor", strokeWidth: "4", r: "40", "stroke-dasharray": "85 30" }, h("animateTransform", { attributeName: "transform", type: "rotate", repeatCount: "indefinite", dur: "1s", values: "0 50 50;360 50 50", keyTimes: "0;1" })));
var Wl = () => h("svg", { width: 24, height: 24, fill: "currentcolor", viewBox: "0 0 24 24" }, [h("path", { style: "transform: translateY(0.5px)", d: "M18.968 10.5H15.968V11.484H17.984V12.984H15.968V15H14.468V9H18.968V10.5V10.5ZM8.984 9C9.26533 9 9.49967 9.09367 9.687 9.281C9.87433 9.46833 9.968 9.70267 9.968 9.984V10.5H6.499V13.5H8.468V12H9.968V14.016C9.968 14.2973 9.87433 14.5317 9.687 14.719C9.49967 14.9063 9.26533 15 8.984 15H5.984C5.70267 15 5.46833 14.9063 5.281 14.719C5.09367 14.5317 5 14.2973 5 14.016V9.985C5 9.70367 5.09367 9.46933 5.281 9.282C5.46833 9.09467 5.70267 9.001 5.984 9.001H8.984V9ZM11.468 9H12.968V15H11.468V9V9Z" }), h("path", { d: "M18.5 3H5.75C3.6875 3 2 4.6875 2 6.75V18C2 20.0625 3.6875 21.75 5.75 21.75H18.5C20.5625 21.75 22.25 20.0625 22.25 18V6.75C22.25 4.6875 20.5625 3 18.5 3ZM20.75 18C20.75 19.2375 19.7375 20.25 18.5 20.25H5.75C4.5125 20.25 3.5 19.2375 3.5 18V6.75C3.5 5.5125 4.5125 4.5 5.75 4.5H18.5C19.7375 4.5 20.75 5.5125 20.75 6.75V18Z" })]);
var Pl = () => useStorage("WALINE_USER_META", { nick: "", mail: "", link: "" });
var Dl = () => useStorage("WALINE_COMMENT_BOX_EDITOR", "");
var Bl = "WALINE_LIKE";
var dt = null;
var pt = () => dt ?? (dt = useStorage(Bl, []));
var Ol = "WALINE_REACTION";
var gt = null;
var ql = () => gt ?? (gt = useStorage(Ol, {}));
var ht = {};
var Gl = (e2) => {
  const n2 = ht[e2] ?? (ht[e2] = (0, import_recaptcha_v3.load)(e2, { useRecaptchaNet: true, autoHideBadge: true }));
  return { execute: (t2) => n2.then((l) => l.execute(t2)) };
};
var Kl = (e2) => ({ execute: async (n2) => {
  const { load: t2 } = useScriptTag("https://challenges.cloudflare.com/turnstile/v0/api.js", void 0, { async: false });
  await t2();
  const l = window == null ? void 0 : window.turnstile;
  return new Promise((a) => {
    l == null || l.ready(() => {
      l == null || l.render(".wl-captcha-container", { sitekey: e2, action: n2, size: "compact", callback: a });
    });
  });
} });
var Zl = "WALINE_USER";
var ft = null;
var Ce = () => ft ?? (ft = useStorage(Zl, {}));
var Xl = { key: 0, class: "wl-reaction" };
var Jl = ["textContent"];
var Yl = { class: "wl-reaction-list" };
var Ql = ["onClick"];
var ea = { class: "wl-reaction-img" };
var ta = ["src", "alt"];
var la = ["textContent"];
var aa = ["textContent"];
var na = defineComponent({ __name: "ArticleReaction", setup(e2, { expose: n2 }) {
  n2();
  const t2 = ql(), l = inject("config"), a = ref(-1), i = ref([]), h2 = computed(() => l.value.locale), c2 = computed(() => l.value.reaction.length > 0), C2 = computed(() => {
    const { reaction: g, path: _ } = l.value;
    return g.map((M, $2) => ({ icon: M, desc: h2.value[`reaction${$2}`], active: t2.value[_] === $2 }));
  });
  let u2;
  const w2 = async () => {
    if (!c2.value)
      return;
    const { serverURL: g, lang: _, path: M, reaction: $2 } = l.value, y2 = new AbortController();
    u2 = y2.abort.bind(y2);
    const o2 = await p({ serverURL: g, lang: _, paths: [M], type: $2.map((f2, F) => `reaction${F}`), signal: y2.signal });
    i.value = $2.map((f2, F) => o2[0][`reaction${F}`]);
  }, S = async (g) => {
    if (a.value === -1) {
      const { serverURL: _, lang: M, path: $2 } = l.value, y2 = t2.value[$2];
      a.value = g, y2 !== void 0 && (await d({ serverURL: _, lang: M, path: $2, type: `reaction${y2}`, action: "desc" }), i.value[y2] = Math.max(i.value[y2] - 1, 0)), y2 !== g && (await d({ serverURL: _, lang: M, path: $2, type: `reaction${g}` }), i.value[g] = (i.value[g] || 0) + 1), y2 === g ? delete t2.value[$2] : t2.value[$2] = g, a.value = -1;
    }
  };
  return onMounted(() => {
    watch(() => [l.value.serverURL, l.value.path], () => {
      w2();
    }, { immediate: true });
  }), onUnmounted(() => u2 == null ? void 0 : u2()), (g, _) => C2.value.length ? (openBlock(), createElementBlock("div", Xl, [createBaseVNode("div", { class: "wl-reaction-title", textContent: toDisplayString(h2.value.reactionTitle) }, null, 8, Jl), createBaseVNode("ul", Yl, [(openBlock(true), createElementBlock(Fragment, null, renderList(C2.value, ({ active: M, icon: $2, desc: y2 }, o2) => (openBlock(), createElementBlock("li", { key: o2, class: normalizeClass(["wl-reaction-item", { active: M }]), onClick: (f2) => S(o2) }, [createBaseVNode("div", ea, [createBaseVNode("img", { src: $2, alt: y2 }, null, 8, ta), a.value === o2 ? (openBlock(), createBlock(unref(ve), { key: 0, class: "wl-reaction-loading" })) : (openBlock(), createElementBlock("div", { key: 1, class: "wl-reaction-votes", textContent: toDisplayString(i.value[o2] || 0) }, null, 8, la))]), createBaseVNode("div", { class: "wl-reaction-text", textContent: toDisplayString(y2) }, null, 8, aa)], 10, Ql))), 128))])])) : createCommentVNode("v-if", true);
} });
var me = (e2, n2) => {
  const t2 = e2.__vccOpts || e2;
  for (const [l, a] of n2)
    t2[l] = a;
  return t2;
};
var oa = me(na, [["__file", "ArticleReaction.vue"]]);
var ia = ["data-index"];
var ra = ["src", "title", "onClick"];
var sa = defineComponent({ __name: "ImageWall", props: { items: { default: () => [] }, columnWidth: { default: 300 }, gap: { default: 0 } }, emits: ["insert"], setup(e2, { expose: n2 }) {
  const t2 = e2;
  n2();
  let l = null;
  const a = ref(null), i = ref({}), h2 = ref([]), c2 = () => {
    const g = Math.floor((a.value.getBoundingClientRect().width + t2.gap) / (t2.columnWidth + t2.gap));
    return g > 0 ? g : 1;
  }, C2 = (g) => new Array(g).fill(null).map(() => []), u2 = async (g) => {
    var _;
    if (g >= t2.items.length)
      return;
    await nextTick();
    const M = Array.from(((_ = a.value) == null ? void 0 : _.children) ?? []).reduce(($2, y2) => y2.getBoundingClientRect().height < $2.getBoundingClientRect().height ? y2 : $2);
    h2.value[Number(M.dataset.index)].push(g), await u2(g + 1);
  }, w2 = async (g = false) => {
    if (h2.value.length === c2() && !g)
      return;
    h2.value = C2(c2());
    const _ = window.scrollY;
    await u2(0), window.scrollTo({ top: _ });
  }, S = (g) => {
    i.value[g.target.src] = true;
  };
  return onMounted(() => {
    w2(true), l = new ResizeObserver(() => {
      w2();
    }), l.observe(a.value), watch(() => [t2.items], () => {
      i.value = {}, w2(true);
    }), watch(() => [t2.columnWidth, t2.gap], () => {
      w2();
    });
  }), onBeforeUnmount(() => l.unobserve(a.value)), (g, _) => (openBlock(), createElementBlock("div", { ref_key: "wall", ref: a, class: "wl-gallery", style: normalizeStyle({ gap: `${g.gap}px` }) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(h2.value, (M, $2) => (openBlock(), createElementBlock("div", { key: $2, class: "wl-gallery-column", "data-index": $2, style: normalizeStyle({ gap: `${g.gap}px` }) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(M, (y2) => (openBlock(), createElementBlock(Fragment, { key: y2 }, [i.value[g.items[y2].src] ? createCommentVNode("v-if", true) : (openBlock(), createBlock(unref(ve), { key: 0, size: 36, style: { margin: "20px auto" } })), createBaseVNode("img", { class: "wl-gallery-item", src: g.items[y2].src, title: g.items[y2].title, loading: "lazy", onLoad: S, onClick: (o2) => g.$emit("insert", `![](${g.items[y2].src})`) }, null, 40, ra)], 64))), 128))], 12, ia))), 128))], 4));
} });
var ca = me(sa, [["__file", "ImageWall.vue"]]);
var ua = { class: "wl-comment" };
var va = { key: 0, class: "wl-login-info" };
var ma = { class: "wl-avatar" };
var da = ["title"];
var pa = ["title"];
var ga = ["src"];
var ha = ["title", "textContent"];
var fa = { class: "wl-panel" };
var wa = ["for", "textContent"];
var ya = ["id", "onUpdate:modelValue", "name", "type"];
var ka = ["placeholder"];
var ba = { class: "wl-preview" };
var Ca = createBaseVNode("hr", null, null, -1);
var $a = ["innerHTML"];
var La = { class: "wl-footer" };
var Ia = { class: "wl-actions" };
var Ea = { href: "https://guides.github.com/features/mastering-markdown/", title: "Markdown Guide", "aria-label": "Markdown is supported", class: "wl-action", target: "_blank", rel: "noopener noreferrer" };
var xa = ["title"];
var Ra = ["title"];
var Aa = ["title"];
var _a = ["title"];
var Ma = { class: "wl-info" };
var Sa = createBaseVNode("div", { class: "wl-captcha-container" }, null, -1);
var Ua = { class: "wl-text-number" };
var ja = { key: 0 };
var za = ["textContent"];
var Va = ["textContent"];
var Ha = ["disabled"];
var Ta = ["placeholder"];
var Fa = { key: 1, class: "wl-loading" };
var Na = { key: 0, class: "wl-tab-wrapper" };
var Wa = ["title", "onClick"];
var Pa = ["src", "alt"];
var Da = { key: 0, class: "wl-tabs" };
var Ba = ["onClick"];
var Oa = ["src", "alt", "title"];
var qa = ["title"];
var Ga = defineComponent({ __name: "CommentBox", props: { edit: { default: null }, rootId: { default: "" }, replyId: { default: "" }, replyUser: { default: "" } }, emits: ["log", "cancelEdit", "cancelReply", "submit"], setup(e2, { emit: n2 }) {
  const t2 = e2, l = n2, a = inject("config"), i = Dl(), h2 = Pl(), c2 = Ce(), C2 = ref({}), u2 = ref(null), w2 = ref(null), S = ref(null), g = ref(null), _ = ref(null), M = ref(null), $2 = ref(null), y2 = ref({ tabs: [], map: {} }), o2 = ref(0), f2 = ref(false), F = ref(false), q = ref(false), x = ref(""), z = ref(0), H = reactive({ loading: true, list: [] }), ee = ref(0), te = ref(false), de = ref(""), Y = ref(false), se = ref(false), d2 = computed(() => a.value.locale), U2 = computed(() => {
    var m2;
    return !!((m2 = c2.value) != null && m2.token);
  }), j2 = computed(() => a.value.imageUploader !== false), G = (m2) => {
    const s2 = u2.value, k = s2.selectionStart, V = s2.selectionEnd || 0, b = s2.scrollTop;
    i.value = s2.value.substring(0, k) + m2 + s2.value.substring(V, s2.value.length), s2.focus(), s2.selectionStart = k + m2.length, s2.selectionEnd = k + m2.length, s2.scrollTop = b;
  }, K = (m2) => {
    const s2 = m2.key;
    (m2.ctrlKey || m2.metaKey) && s2 === "Enter" && pe();
  }, Z = (m2) => {
    const s2 = `![${a.value.locale.uploading} ${m2.name}]()`;
    return G(s2), Y.value = true, Promise.resolve().then(() => a.value.imageUploader(m2)).then((k) => {
      i.value = i.value.replace(s2, `\r
![${m2.name}](${k})`);
    }).catch((k) => {
      alert(k.message), i.value = i.value.replace(s2, "");
    }).then(() => {
      Y.value = false;
    });
  }, X = (m2) => {
    var s2;
    if ((s2 = m2.dataTransfer) != null && s2.items) {
      const k = ct(m2.dataTransfer.items);
      k && j2.value && (Z(k), m2.preventDefault());
    }
  }, ce = (m2) => {
    if (m2.clipboardData) {
      const s2 = ct(m2.clipboardData.items);
      s2 && j2.value && Z(s2);
    }
  }, Se = () => {
    const m2 = w2.value;
    m2.files && j2.value && Z(m2.files[0]).then(() => {
      m2.value = "";
    });
  }, pe = async () => {
    var m2, s2, k, V, b, D;
    const { serverURL: N, lang: Q, login: ge, wordLimit: Ve, requiredMeta: He, recaptchaV3Key: Te, turnstileKey: Fe } = a.value, It = await Ml(), T = { comment: de.value, nick: h2.value.nick, mail: h2.value.mail, link: h2.value.link, url: a.value.path, ua: It };
    if ((m2 = c2.value) != null && m2.token && !t2.edit)
      T.nick = c2.value.display_name, T.mail = c2.value.email, T.link = c2.value.url;
    else {
      if (ge === "force")
        return;
      if (He.indexOf("nick") > -1 && !T.nick)
        return (s2 = C2.value.nick) == null || s2.focus(), alert(d2.value.nickError);
      if (He.indexOf("mail") > -1 && !T.mail || T.mail && !wl(T.mail))
        return (k = C2.value.mail) == null || k.focus(), alert(d2.value.mailError);
      T.nick || (T.nick = d2.value.anonymous);
    }
    if (!T.comment) {
      (V = u2.value) == null || V.focus();
      return;
    }
    if (!te.value)
      return alert(d2.value.wordHint.replace("$0", Ve[0].toString()).replace("$1", Ve[1].toString()).replace("$2", z.value.toString()));
    T.comment = ut(T.comment, y2.value.map), t2.replyId && t2.rootId && (T.pid = t2.replyId, T.rid = t2.rootId, T.at = t2.replyUser), Y.value = true;
    try {
      Te && (T.recaptchaV3 = await Gl(Te).execute("social")), Fe && (T.turnstile = await Kl(Fe).execute("social"));
      const he = { serverURL: N, lang: Q, token: (b = c2.value) == null ? void 0 : b.token, comment: T }, $e = await (t2.edit ? U({ objectId: t2.edit.objectId, ...he }) : u(he));
      if (Y.value = false, $e.errmsg)
        return alert($e.errmsg);
      l("submit", $e.data), i.value = "", x.value = "", t2.replyId && l("cancelReply"), (D = t2.edit) != null && D.objectId && l("cancelEdit");
    } catch (he) {
      Y.value = false, alert(he.message);
    }
  }, Ct = (m2) => {
    m2.preventDefault();
    const { lang: s2, serverURL: k } = a.value;
    R({ serverURL: k, lang: s2 }).then((V) => {
      c2.value = V, (V.remember ? localStorage : sessionStorage).setItem("WALINE_USER", JSON.stringify(V)), l("log");
    });
  }, $t = () => {
    c2.value = {}, localStorage.setItem("WALINE_USER", "null"), sessionStorage.setItem("WALINE_USER", "null"), l("log");
  }, Ue = (m2) => {
    m2.preventDefault();
    const { lang: s2, serverURL: k } = a.value, V = 800, b = 800, D = (window.innerWidth - V) / 2, N = (window.innerHeight - b) / 2, Q = new URLSearchParams({ lng: s2, token: c2.value.token }), ge = window.open(`${k}/ui/profile?${Q.toString()}`, "_blank", `width=${V},height=${b},left=${D},top=${N},scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no`);
    ge == null || ge.postMessage({ type: "TOKEN", data: c2.value.token }, "*");
  }, Lt = (m2) => {
    var s2, k, V, b;
    !((s2 = S.value) != null && s2.contains(m2.target)) && !((k = g.value) != null && k.contains(m2.target)) && (f2.value = false), !((V = _.value) != null && V.contains(m2.target)) && !((b = M.value) != null && b.contains(m2.target)) && (F.value = false);
  }, je = async (m2) => {
    var s2;
    const { scrollTop: k, clientHeight: V, scrollHeight: b } = m2.target, D = (V + k) / b, N = a.value.search, Q = ((s2 = $2.value) == null ? void 0 : s2.value) ?? "";
    D < 0.9 || H.loading || se.value || (H.loading = true, (N.more && H.list.length ? await N.more(Q, H.list.length) : await N.search(Q)).length ? H.list = [...H.list, ...N.more && H.list.length ? await N.more(Q, H.list.length) : await N.search(Q)] : se.value = true, H.loading = false, setTimeout(() => {
      m2.target.scrollTop = k;
    }, 50));
  }, ze = useDebounceFn((m2) => {
    H.list = [], se.value = false, je(m2);
  }, 300);
  return watch([a, z], ([m2, s2]) => {
    const { wordLimit: k } = m2;
    k ? s2 < k[0] && k[0] !== 0 ? (ee.value = k[0], te.value = false) : s2 > k[1] ? (ee.value = k[1], te.value = false) : (ee.value = k[1], te.value = true) : (ee.value = 0, te.value = true);
  }, { immediate: true }), useEventListener("click", Lt), useEventListener("message", ({ data: m2 }) => {
    !m2 || m2.type !== "profile" || (c2.value = { ...c2.value, ...m2.data }, [localStorage, sessionStorage].filter((s2) => s2.getItem("WALINE_USER")).forEach((s2) => s2.setItem("WALINE_USER", JSON.stringify(c2))));
  }), watch(F, async (m2) => {
    var s2;
    if (!m2)
      return;
    const k = a.value.search;
    $2.value && ($2.value.value = ""), H.loading = true, H.list = await (((s2 = k.default) == null ? void 0 : s2.call(k)) ?? k.search("")), H.loading = false;
  }), onMounted(() => {
    var m2;
    (m2 = t2.edit) != null && m2.objectId && (i.value = t2.edit.orig), watch(() => i.value, (s2) => {
      const { highlighter: k, texRenderer: V } = a.value;
      de.value = s2, x.value = xl(s2, { emojiMap: y2.value.map, highlighter: k, texRenderer: V }), z.value = _l(s2), s2 ? autosize_esm_default(u2.value) : autosize_esm_default.destroy(u2.value);
    }, { immediate: true }), watch(() => a.value.emoji, (s2) => bl(s2).then((k) => {
      y2.value = k;
    }), { immediate: true });
  }), (m2, s2) => {
    var k, V;
    return openBlock(), createElementBlock("div", ua, [unref(a).login !== "disable" && U2.value && !((k = m2.edit) != null && k.objectId) ? (openBlock(), createElementBlock("div", va, [createBaseVNode("div", ma, [createBaseVNode("button", { type: "submit", class: "wl-logout-btn", title: d2.value.logout, onClick: $t }, [createVNode(unref(mt), { size: 14 })], 8, da), createBaseVNode("a", { href: "#", class: "wl-login-nick", "aria-label": "Profile", title: d2.value.profile, onClick: Ue }, [createBaseVNode("img", { src: unref(c2).avatar, alt: "avatar" }, null, 8, ga)], 8, pa)]), createBaseVNode("a", { href: "#", class: "wl-login-nick", "aria-label": "Profile", title: d2.value.profile, onClick: Ue, textContent: toDisplayString(unref(c2).display_name) }, null, 8, ha)])) : createCommentVNode("v-if", true), createBaseVNode("div", fa, [unref(a).login !== "force" && unref(a).meta.length && !U2.value ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(["wl-header", `item${unref(a).meta.length}`]) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(a).meta, (b) => (openBlock(), createElementBlock("div", { key: b, class: "wl-header-item" }, [createBaseVNode("label", { for: `wl-${b}`, textContent: toDisplayString(d2.value[b] + (unref(a).requiredMeta.includes(b) || !unref(a).requiredMeta.length ? "" : `(${d2.value.optional})`)) }, null, 8, wa), withDirectives(createBaseVNode("input", { id: `wl-${b}`, ref_for: true, ref: (D) => {
      D && (C2.value[b] = D);
    }, "onUpdate:modelValue": (D) => unref(h2)[b] = D, class: normalizeClass(["wl-input", `wl-${b}`]), name: b, type: b === "mail" ? "email" : "text" }, null, 10, ya), [[vModelDynamic, unref(h2)[b]]])]))), 128))], 2)) : createCommentVNode("v-if", true), withDirectives(createBaseVNode("textarea", { id: "wl-edit", ref_key: "editorRef", ref: u2, "onUpdate:modelValue": s2[0] || (s2[0] = (b) => isRef(i) ? i.value = b : null), class: "wl-editor", placeholder: m2.replyUser ? `@${m2.replyUser}` : d2.value.placeholder, onKeydown: K, onDrop: X, onPaste: ce }, null, 40, ka), [[vModelText, unref(i)]]), withDirectives(createBaseVNode("div", ba, [Ca, createBaseVNode("h4", null, toDisplayString(d2.value.preview) + ":", 1), createBaseVNode("div", { class: "wl-content", innerHTML: x.value }, null, 8, $a)], 512), [[vShow, q.value]]), createBaseVNode("div", La, [createBaseVNode("div", Ia, [createBaseVNode("a", Ea, [createVNode(unref(Hl))]), withDirectives(createBaseVNode("button", { ref_key: "emojiButtonRef", ref: S, type: "button", class: normalizeClass(["wl-action", { active: f2.value }]), title: d2.value.emoji, onClick: s2[1] || (s2[1] = (b) => f2.value = !f2.value) }, [createVNode(unref(Ul))], 10, xa), [[vShow, y2.value.tabs.length]]), unref(a).search ? (openBlock(), createElementBlock("button", { key: 0, ref_key: "gifButtonRef", ref: _, type: "button", class: normalizeClass(["wl-action", { active: F.value }]), title: d2.value.gif, onClick: s2[2] || (s2[2] = (b) => F.value = !F.value) }, [createVNode(unref(Wl))], 10, Ra)) : createCommentVNode("v-if", true), createBaseVNode("input", { id: "wl-image-upload", ref_key: "imageUploadRef", ref: w2, class: "upload", type: "file", accept: ".png,.jpg,.jpeg,.webp,.bmp,.gif", onChange: Se }, null, 544), j2.value ? (openBlock(), createElementBlock("label", { key: 1, for: "wl-image-upload", class: "wl-action", title: d2.value.uploadImage }, [createVNode(unref(jl))], 8, Aa)) : createCommentVNode("v-if", true), createBaseVNode("button", { type: "button", class: normalizeClass(["wl-action", { active: q.value }]), title: d2.value.preview, onClick: s2[3] || (s2[3] = (b) => q.value = !q.value) }, [createVNode(unref(Vl))], 10, _a)]), createBaseVNode("div", Ma, [Sa, createBaseVNode("div", Ua, [createTextVNode(toDisplayString(z.value) + " ", 1), unref(a).wordLimit ? (openBlock(), createElementBlock("span", ja, [createTextVNode("  /  "), createBaseVNode("span", { class: normalizeClass({ illegal: !te.value }), textContent: toDisplayString(ee.value) }, null, 10, za)])) : createCommentVNode("v-if", true), createTextVNode("  " + toDisplayString(d2.value.word), 1)]), unref(a).login !== "disable" && !U2.value ? (openBlock(), createElementBlock("button", { key: 0, type: "button", class: "wl-btn", onClick: Ct, textContent: toDisplayString(d2.value.login) }, null, 8, Va)) : createCommentVNode("v-if", true), unref(a).login !== "force" || U2.value ? (openBlock(), createElementBlock("button", { key: 1, type: "submit", class: "primary wl-btn", title: "Cmd|Ctrl + Enter", disabled: Y.value, onClick: pe }, [Y.value ? (openBlock(), createBlock(unref(ve), { key: 0, size: 16 })) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [createTextVNode(toDisplayString(d2.value.submit), 1)], 64))], 8, Ha)) : createCommentVNode("v-if", true)]), createBaseVNode("div", { ref_key: "gifPopupRef", ref: M, class: normalizeClass(["wl-gif-popup", { display: F.value }]) }, [createBaseVNode("input", { ref_key: "gifSearchInputRef", ref: $2, type: "text", placeholder: d2.value.gifSearchPlaceholder, onInput: s2[4] || (s2[4] = (...b) => unref(ze) && unref(ze)(...b)) }, null, 40, Ta), H.list.length ? (openBlock(), createBlock(ca, { key: 0, items: H.list, "column-width": 200, gap: 6, onInsert: s2[5] || (s2[5] = (b) => G(b)), onScroll: je }, null, 8, ["items"])) : createCommentVNode("v-if", true), H.loading ? (openBlock(), createElementBlock("div", Fa, [createVNode(unref(ve), { size: 30 })])) : createCommentVNode("v-if", true)], 2), createBaseVNode("div", { ref_key: "emojiPopupRef", ref: g, class: normalizeClass(["wl-emoji-popup", { display: f2.value }]) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(y2.value.tabs, (b, D) => (openBlock(), createElementBlock(Fragment, { key: b.name }, [D === o2.value ? (openBlock(), createElementBlock("div", Na, [(openBlock(true), createElementBlock(Fragment, null, renderList(b.items, (N) => (openBlock(), createElementBlock("button", { key: N, type: "button", title: N, onClick: (Q) => G(`:${N}:`) }, [f2.value ? (openBlock(), createElementBlock("img", { key: 0, class: "wl-emoji", src: y2.value.map[N], alt: N, loading: "lazy", referrerPolicy: "no-referrer" }, null, 8, Pa)) : createCommentVNode("v-if", true)], 8, Wa))), 128))])) : createCommentVNode("v-if", true)], 64))), 128)), y2.value.tabs.length > 1 ? (openBlock(), createElementBlock("div", Da, [(openBlock(true), createElementBlock(Fragment, null, renderList(y2.value.tabs, (b, D) => (openBlock(), createElementBlock("button", { key: b.name, type: "button", class: normalizeClass(["wl-tab", { active: o2.value === D }]), onClick: (N) => o2.value = D }, [createBaseVNode("img", { class: "wl-emoji", src: b.icon, alt: b.name, title: b.name, loading: "lazy", referrerPolicy: "no-referrer" }, null, 8, Oa)], 10, Ba))), 128))])) : createCommentVNode("v-if", true)], 2)])]), m2.replyId || (V = m2.edit) != null && V.objectId ? (openBlock(), createElementBlock("button", { key: 1, type: "button", class: "wl-close", title: d2.value.cancelReply, onClick: s2[6] || (s2[6] = (b) => m2.replyId ? l("cancelReply") : l("cancelEdit")) }, [createVNode(unref(mt), { size: 24 })], 8, qa)) : createCommentVNode("v-if", true)]);
  };
} });
var wt = me(Ga, [["__file", "CommentBox.vue"]]);
var Ka = ["id"];
var Za = { class: "wl-user", "aria-hidden": "true" };
var Xa = ["src"];
var Ja = { class: "wl-card" };
var Ya = { class: "wl-head" };
var Qa = ["href"];
var en = { key: 1, class: "wl-nick" };
var tn = ["textContent"];
var ln = ["textContent"];
var an = ["textContent"];
var nn = ["textContent"];
var on = ["textContent"];
var rn = { class: "wl-comment-actions" };
var sn = ["title"];
var cn = ["title"];
var un = { class: "wl-meta", "aria-hidden": "true" };
var vn = ["data-value", "textContent"];
var mn = { key: 0, class: "wl-content" };
var dn = { key: 0 };
var pn = ["href"];
var gn = createBaseVNode("span", null, ": ", -1);
var hn = ["innerHTML"];
var fn = { key: 1, class: "wl-admin-actions" };
var wn = { class: "wl-comment-status" };
var yn = ["disabled", "onClick", "textContent"];
var kn = { key: 3, class: "wl-quote" };
var bn = defineComponent({ __name: "CommentCard", props: { comment: {}, edit: { default: null }, rootId: {}, reply: { default: null } }, emits: ["log", "submit", "delete", "edit", "like", "status", "sticky", "reply"], setup(e2, { emit: n2 }) {
  const t2 = e2, l = n2, a = ["approved", "waiting", "spam"], i = inject("config"), h2 = pt(), c2 = useNow(), C2 = Ce(), u2 = computed(() => i.value.locale), w2 = computed(() => {
    const { link: o2 } = t2.comment;
    return o2 ? it(o2) ? o2 : `https://${o2}` : "";
  }), S = computed(() => h2.value.includes(t2.comment.objectId)), g = computed(() => hl(new Date(t2.comment.time), c2.value, u2.value)), _ = computed(() => C2.value.type === "administrator"), M = computed(() => t2.comment.user_id && C2.value.objectId === t2.comment.user_id), $2 = computed(() => {
    var o2;
    return t2.comment.objectId === ((o2 = t2.reply) == null ? void 0 : o2.objectId);
  }), y2 = computed(() => {
    var o2;
    return t2.comment.objectId === ((o2 = t2.edit) == null ? void 0 : o2.objectId);
  });
  return (o2, f2) => {
    var F;
    const q = resolveComponent("CommentCard", true);
    return openBlock(), createElementBlock("div", { id: o2.comment.objectId, class: "wl-card-item" }, [createBaseVNode("div", Za, [o2.comment.avatar ? (openBlock(), createElementBlock("img", { key: 0, class: "wl-user-avatar", src: o2.comment.avatar }, null, 8, Xa)) : createCommentVNode("v-if", true), o2.comment.type ? (openBlock(), createBlock(unref(Nl), { key: 1 })) : createCommentVNode("v-if", true)]), createBaseVNode("div", Ja, [createBaseVNode("div", Ya, [w2.value ? (openBlock(), createElementBlock("a", { key: 0, class: "wl-nick", href: w2.value, target: "_blank", rel: "nofollow noopener noreferrer" }, toDisplayString(o2.comment.nick), 9, Qa)) : (openBlock(), createElementBlock("span", en, toDisplayString(o2.comment.nick), 1)), o2.comment.type === "administrator" ? (openBlock(), createElementBlock("span", { key: 2, class: "wl-badge", textContent: toDisplayString(u2.value.admin) }, null, 8, tn)) : createCommentVNode("v-if", true), o2.comment.label ? (openBlock(), createElementBlock("span", { key: 3, class: "wl-badge", textContent: toDisplayString(o2.comment.label) }, null, 8, ln)) : createCommentVNode("v-if", true), o2.comment.sticky ? (openBlock(), createElementBlock("span", { key: 4, class: "wl-badge", textContent: toDisplayString(u2.value.sticky) }, null, 8, an)) : createCommentVNode("v-if", true), typeof o2.comment.level == "number" ? (openBlock(), createElementBlock("span", { key: 5, class: normalizeClass(`wl-badge level${o2.comment.level}`), textContent: toDisplayString(u2.value[`level${o2.comment.level}`] || `Level ${o2.comment.level}`) }, null, 10, nn)) : createCommentVNode("v-if", true), createBaseVNode("span", { class: "wl-time", textContent: toDisplayString(g.value) }, null, 8, on), createBaseVNode("div", rn, [_.value || M.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createBaseVNode("button", { type: "button", class: "wl-edit", onClick: f2[0] || (f2[0] = (x) => l("edit", o2.comment)) }, [createVNode(unref(Fl))]), createBaseVNode("button", { type: "button", class: "wl-delete", onClick: f2[1] || (f2[1] = (x) => l("delete", o2.comment)) }, [createVNode(unref(Sl))])], 64)) : createCommentVNode("v-if", true), createBaseVNode("button", { type: "button", class: "wl-like", title: S.value ? u2.value.cancelLike : u2.value.like, onClick: f2[2] || (f2[2] = (x) => l("like", o2.comment)) }, [createVNode(unref(zl), { active: S.value }, null, 8, ["active"]), createTextVNode(" " + toDisplayString("like" in o2.comment ? o2.comment.like : ""), 1)], 8, sn), createBaseVNode("button", { type: "button", class: normalizeClass(["wl-reply", { active: $2.value }]), title: $2.value ? u2.value.cancelReply : u2.value.reply, onClick: f2[3] || (f2[3] = (x) => l("reply", $2.value ? null : o2.comment)) }, [createVNode(unref(Tl))], 10, cn)])]), createBaseVNode("div", un, [(openBlock(), createElementBlock(Fragment, null, renderList(["addr", "browser", "os"], (x) => (openBlock(), createElementBlock(Fragment, null, [o2.comment[x] ? (openBlock(), createElementBlock("span", { key: x, class: normalizeClass(`wl-${x}`), "data-value": o2.comment[x], textContent: toDisplayString(o2.comment[x]) }, null, 10, vn)) : createCommentVNode("v-if", true)], 64))), 64))]), y2.value ? createCommentVNode("v-if", true) : (openBlock(), createElementBlock("div", mn, [o2.comment.reply_user ? (openBlock(), createElementBlock("p", dn, [createBaseVNode("a", { href: "#" + o2.comment.pid }, "@" + toDisplayString(o2.comment.reply_user.nick), 9, pn), gn])) : createCommentVNode("v-if", true), createBaseVNode("div", { innerHTML: o2.comment.comment }, null, 8, hn)])), _.value && !y2.value ? (openBlock(), createElementBlock("div", fn, [createBaseVNode("span", wn, [(openBlock(), createElementBlock(Fragment, null, renderList(a, (x) => createBaseVNode("button", { key: x, type: "submit", class: normalizeClass(`wl-btn wl-${x}`), disabled: o2.comment.status === x, onClick: (z) => l("status", { status: x, comment: o2.comment }), textContent: toDisplayString(u2.value[x]) }, null, 10, yn)), 64))]), _.value && !("rid" in o2.comment) ? (openBlock(), createElementBlock("button", { key: 0, type: "submit", class: "wl-btn wl-sticky", onClick: f2[4] || (f2[4] = (x) => l("sticky", o2.comment)) }, toDisplayString(o2.comment.sticky ? u2.value.unsticky : u2.value.sticky), 1)) : createCommentVNode("v-if", true)])) : createCommentVNode("v-if", true), $2.value || y2.value ? (openBlock(), createElementBlock("div", { key: 2, class: normalizeClass({ "wl-reply-wrapper": $2.value, "wl-edit-wrapper": y2.value }) }, [createVNode(wt, { edit: o2.edit, "reply-id": (F = o2.reply) == null ? void 0 : F.objectId, "reply-user": o2.comment.nick, "root-id": o2.rootId, onLog: f2[5] || (f2[5] = (x) => l("log")), onCancelReply: f2[6] || (f2[6] = (x) => l("reply", null)), onCancelEdit: f2[7] || (f2[7] = (x) => l("edit", null)), onSubmit: f2[8] || (f2[8] = (x) => l("submit", x)) }, null, 8, ["edit", "reply-id", "reply-user", "root-id"])], 2)) : createCommentVNode("v-if", true), "children" in o2.comment ? (openBlock(), createElementBlock("div", kn, [(openBlock(true), createElementBlock(Fragment, null, renderList(o2.comment.children, (x) => (openBlock(), createBlock(q, { key: x.objectId, comment: x, reply: o2.reply, edit: o2.edit, "root-id": o2.rootId, onLog: f2[9] || (f2[9] = (z) => l("log")), onDelete: f2[10] || (f2[10] = (z) => l("delete", z)), onEdit: f2[11] || (f2[11] = (z) => l("edit", z)), onLike: f2[12] || (f2[12] = (z) => l("like", z)), onReply: f2[13] || (f2[13] = (z) => l("reply", z)), onStatus: f2[14] || (f2[14] = (z) => l("status", z)), onSticky: f2[15] || (f2[15] = (z) => l("sticky", z)), onSubmit: f2[16] || (f2[16] = (z) => l("submit", z)) }, null, 8, ["comment", "reply", "edit", "root-id"]))), 128))])) : createCommentVNode("v-if", true)])], 8, Ka);
  };
} });
var Cn = me(bn, [["__file", "CommentCard.vue"]]);
var yt = "3.2.0";
var $n = { "data-waline": "" };
var Ln = { class: "wl-meta-head" };
var In = { class: "wl-count" };
var En = ["textContent"];
var xn = { class: "wl-sort" };
var Rn = ["onClick"];
var An = { class: "wl-cards" };
var _n = { key: 1, class: "wl-operation" };
var Mn = ["textContent"];
var Sn = { key: 2, class: "wl-loading" };
var Un = ["textContent"];
var jn = { key: 4, class: "wl-operation" };
var zn = ["textContent"];
var Vn = { key: 5, class: "wl-power" };
var Hn = createBaseVNode("a", { href: "https://github.com/walinejs/waline", target: "_blank", rel: "noopener noreferrer" }, " Waline ", -1);
var Tn = defineComponent({ __name: "WalineComment", props: ["serverURL", "path", "meta", "requiredMeta", "dark", "commentSorting", "lang", "locale", "pageSize", "wordLimit", "emoji", "login", "highlighter", "texRenderer", "imageUploader", "search", "copyright", "recaptchaV3Key", "turnstileKey", "reaction"], setup(e2) {
  const n2 = e2, t2 = { latest: "insertedAt_desc", oldest: "insertedAt_asc", hottest: "like_desc" }, l = Object.keys(t2), a = Ce(), i = pt(), h2 = ref("loading"), c2 = ref(0), C2 = ref(1), u2 = ref(0), w2 = computed(() => dl(n2)), S = ref(w2.value.commentSorting), g = ref([]), _ = ref(null), M = ref(null), $2 = computed(() => pl(w2.value.dark)), y2 = computed(() => w2.value.locale);
  useStyleTag($2, { id: "waline-darkmode" });
  let o2;
  const f2 = (d2) => {
    var U2;
    const { serverURL: j2, path: G, pageSize: K } = w2.value, Z = new AbortController();
    h2.value = "loading", o2 == null || o2(), $({ serverURL: j2, lang: w2.value.lang, path: G, pageSize: K, sortBy: t2[S.value], page: d2, signal: Z.signal, token: (U2 = a.value) == null ? void 0 : U2.token }).then((X) => {
      h2.value = "success", c2.value = X.count, g.value.push(...X.data), C2.value = d2, u2.value = X.totalPages;
    }).catch((X) => {
      X.name !== "AbortError" && (console.error(X.message), h2.value = "error");
    }), o2 = Z.abort.bind(Z);
  }, F = () => f2(C2.value + 1), q = () => {
    c2.value = 0, g.value = [], f2(1);
  }, x = (d2) => {
    S.value !== d2 && (S.value = d2, q());
  }, z = (d2) => {
    _.value = d2;
  }, H = (d2) => {
    M.value = d2;
  }, ee = (d2) => {
    if (M.value)
      M.value.comment = d2.comment, M.value.orig = d2.orig;
    else if ("rid" in d2) {
      const U2 = g.value.find(({ objectId: j2 }) => j2 === d2.rid);
      if (!U2)
        return;
      Array.isArray(U2.children) || (U2.children = []), U2.children.push(d2);
    } else
      g.value.unshift(d2), c2.value += 1;
  }, te = async ({ comment: d2, status: U2 }) => {
    var j2;
    if (d2.status === U2)
      return;
    const { serverURL: G, lang: K } = w2.value;
    await U({ serverURL: G, lang: K, token: (j2 = a.value) == null ? void 0 : j2.token, objectId: d2.objectId, comment: { status: U2 } }), d2.status = U2;
  }, de = async (d2) => {
    var U2;
    if ("rid" in d2)
      return;
    const { serverURL: j2, lang: G } = w2.value;
    await U({ serverURL: j2, lang: G, token: (U2 = a.value) == null ? void 0 : U2.token, objectId: d2.objectId, comment: { sticky: d2.sticky ? 0 : 1 } }), d2.sticky = !d2.sticky;
  }, Y = async ({ objectId: d2 }) => {
    var U2;
    if (!confirm("Are you sure you want to delete this comment?"))
      return;
    const { serverURL: j2, lang: G } = w2.value;
    await y({ serverURL: j2, lang: G, token: (U2 = a.value) == null ? void 0 : U2.token, objectId: d2 }), g.value.some((K, Z) => K.objectId === d2 ? (g.value = g.value.filter((X, ce) => ce !== Z), true) : K.children.some((X, ce) => X.objectId === d2 ? (g.value[Z].children = K.children.filter((Se, pe) => pe !== ce), true) : false));
  }, se = async (d2) => {
    var U2;
    const { serverURL: j2, lang: G } = w2.value, { objectId: K } = d2, Z = i.value.includes(K);
    await U({ serverURL: j2, lang: G, objectId: K, token: (U2 = a.value) == null ? void 0 : U2.token, comment: { like: !Z } }), Z ? i.value = i.value.filter((X) => X !== K) : (i.value = [...i.value, K], i.value.length > 50 && (i.value = i.value.slice(-50))), d2.like = (d2.like || 0) + (Z ? -1 : 1);
  };
  return provide("config", w2), onMounted(() => {
    watch(() => [n2.serverURL, n2.path], () => q(), { immediate: true });
  }), onUnmounted(() => o2 == null ? void 0 : o2()), (d2, U2) => (openBlock(), createElementBlock("div", $n, [createVNode(oa), _.value ? createCommentVNode("v-if", true) : (openBlock(), createBlock(wt, { key: 0, onLog: q, onSubmit: ee })), createBaseVNode("div", Ln, [createBaseVNode("div", In, [c2.value ? (openBlock(), createElementBlock("span", { key: 0, class: "wl-num", textContent: toDisplayString(c2.value) }, null, 8, En)) : createCommentVNode("v-if", true), createTextVNode(" " + toDisplayString(y2.value.comment), 1)]), createBaseVNode("ul", xn, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(l), (j2) => (openBlock(), createElementBlock("li", { key: j2, class: normalizeClass([j2 === S.value ? "active" : ""]), onClick: (G) => x(j2) }, toDisplayString(y2.value[j2]), 11, Rn))), 128))])]), createBaseVNode("div", An, [(openBlock(true), createElementBlock(Fragment, null, renderList(g.value, (j2) => (openBlock(), createBlock(Cn, { key: j2.objectId, "root-id": j2.objectId, comment: j2, reply: _.value, edit: M.value, onLog: q, onReply: z, onEdit: H, onSubmit: ee, onStatus: te, onDelete: Y, onSticky: de, onLike: se }, null, 8, ["root-id", "comment", "reply", "edit"]))), 128))]), h2.value === "error" ? (openBlock(), createElementBlock("div", _n, [createBaseVNode("button", { type: "button", class: "wl-btn", onClick: q, textContent: toDisplayString(y2.value.refresh) }, null, 8, Mn)])) : h2.value === "loading" ? (openBlock(), createElementBlock("div", Sn, [createVNode(unref(ve), { size: 30 })])) : g.value.length ? C2.value < u2.value ? (openBlock(), createElementBlock("div", jn, [createBaseVNode("button", { type: "button", class: "wl-btn", onClick: F, textContent: toDisplayString(y2.value.more) }, null, 8, zn)])) : createCommentVNode("v-if", true) : (openBlock(), createElementBlock("div", { key: 3, class: "wl-empty", textContent: toDisplayString(y2.value.sofa) }, null, 8, Un)), w2.value.copyright ? (openBlock(), createElementBlock("div", Vn, [createTextVNode(" Powered by "), Hn, createTextVNode(" v" + toDisplayString(unref(yt)), 1)])) : createCommentVNode("v-if", true)]));
} });
var Fn = me(Tn, [["__file", "WalineComment.vue"]]);
var kt = (e2, n2) => {
  n2.forEach((t2, l) => {
    const a = e2[l].time;
    typeof a == "number" && (t2.innerText = a.toString());
  });
};
var bt = ({ serverURL: e2, path: n2 = window.location.pathname, selector: t2 = ".waline-pageview-count", update: l = true, lang: a = navigator.language }) => {
  const i = new AbortController(), h2 = Array.from(document.querySelectorAll(t2)), c2 = (u2) => {
    const w2 = Me(u2);
    return w2 !== null && n2 !== w2;
  }, C2 = (u2) => j({ serverURL: be(e2), paths: u2.map((w2) => Me(w2) ?? n2), lang: a, signal: i.signal }).then((w2) => kt(w2, u2)).catch(st);
  if (l) {
    const u2 = h2.filter((S) => !c2(S)), w2 = h2.filter(c2);
    v({ serverURL: be(e2), path: n2, lang: a }).then((S) => kt(S, u2)), w2.length && C2(w2);
  } else
    C2(h2);
  return i.abort.bind(i);
};
var Nn = ({ el: e2 = "#waline", path: n2 = window.location.pathname, comment: t2 = false, pageview: l = false, ...a }) => {
  const i = e2 ? _e(e2) : null;
  if (e2 && !i)
    throw new Error("Option 'el' do not match any domElement!");
  if (!a.serverURL)
    throw new Error("Option 'serverURL' is missing!");
  const h2 = reactive({ ...a }), c2 = reactive({ comment: t2, pageview: l, path: n2 }), C2 = () => {
    c2.comment && vt({ serverURL: h2.serverURL, path: c2.path, ...re(c2.comment) ? { selector: c2.comment } : {} });
  }, u2 = () => {
    c2.pageview && bt({ serverURL: h2.serverURL, path: c2.path, ...re(c2.pageview) ? { selector: c2.pageview } : {} });
  }, w2 = i ? createApp(() => h(Fn, { path: c2.path, ...h2 })) : null;
  w2 && w2.mount(i);
  const S = watchEffect(C2), g = watchEffect(u2);
  return { el: i, update: ({ comment: _, pageview: M, path: $2 = window.location.pathname, ...y2 } = {}) => {
    Object.entries(y2).forEach(([o2, f2]) => {
      h2[o2] = f2;
    }), c2.path = $2, _ !== void 0 && (c2.comment = _), M !== void 0 && (c2.pageview = M);
  }, destroy: () => {
    w2 == null || w2.unmount(), S(), g();
  } };
};

// node_modules/.pnpm/vitepress-theme-website@1.0.8/node_modules/vitepress-theme-website/dist/waline/components/Waline.mjs
import "D:/Downloads/blog/node_modules/.pnpm/@waline+client@3.2.0/node_modules/@waline/client/dist/waline.css";
var WalineComponent = defineComponent({
  name: "WalineComment",
  props: {
    walineOptions: { type: Object, default: () => ({}) }
  },
  setup(props) {
    const walineRef = ref();
    onMounted(() => {
      Nn({
        el: "#waline",
        serverURL: props.walineOptions.serverURL,
        login: props.walineOptions.login || "force"
      });
    });
    return () => h("div", { id: "waline", ref: (el2) => walineRef.value = el2 });
  }
});
WalineComponent.newInstance = (props) => {
  const { selector = ".VPDoc .content-container" } = props.walineOptions;
  const container = document.createElement("div");
  container.classList.add("waline-wrap");
  container.style.paddingTop = "48px";
  const parent = document.querySelector(selector);
  if (!parent)
    return;
  parent.appendChild(container);
  const app = createApp({
    render() {
      return h(WalineComponent, {
        ...props
      });
    }
  });
  app.mount(container);
  return {
    destroy() {
      app.unmount();
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
    }
  };
};
var Waline_default = WalineComponent;

// node_modules/.pnpm/vitepress-theme-website@1.0.8/node_modules/vitepress-theme-website/dist/waline/index.mjs
var useWaline = (walineOptions) => {
  let waline;
  const route = useRoute();
  onMounted(() => {
    updateWaline();
  });
  onBeforeUnmount(() => waline == null ? void 0 : waline.destroy());
  function updateWaline() {
    if (waline) {
      waline == null ? void 0 : waline.destroy();
    }
    setTimeout(() => {
      if (!document)
        return;
      waline = Waline_default.newInstance({ walineOptions });
    }, 500);
  }
  watch(() => route.path, updateWaline);
};

// node_modules/.pnpm/vitepress-theme-website@1.0.8/node_modules/vitepress-theme-website/dist/live2d/components/live2d.mjs
import Live2d from "D:/Downloads/blog/node_modules/.pnpm/vitepress-theme-website@1.0.8/node_modules/vitepress-theme-website/dist/live2d/components/Live2dComponent.vue";
Live2d.init = (props) => {
  const container = document.createElement("div");
  container.classList.add("live2d-wrap");
  const parent = document.querySelector("#app");
  if (!parent)
    return;
  parent.appendChild(container);
  const app = createApp({
    render() {
      return h(Live2d, {
        ...props
      });
    }
  });
  app.mount(container);
  return {
    destroy() {
      app.unmount();
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
    }
  };
};
var live2d_default = Live2d;

// node_modules/.pnpm/vitepress-theme-website@1.0.8/node_modules/vitepress-theme-website/dist/live2d/index.mjs
import { useRoute as useRoute2 } from "vitepress";
var defaultLive2dOptions = {
  enable: true,
  model: {
    url: "https://raw.githubusercontent.com/iCharlesZ/vscode-live2d-models/master/model-library/hibiki/hibiki.model.json"
  },
  display: {
    position: "right",
    width: "135px",
    height: "300px",
    xOffset: "35px",
    yOffset: "5px"
  },
  mobile: {
    show: true
  },
  react: {
    opacity: 0.8
  }
};
var useLive2d = (live2dOptions = {}) => {
  let live2d;
  const route = useRoute2();
  onMounted(() => {
    init();
  });
  onBeforeUnmount(() => live2d == null ? void 0 : live2d.destroy());
  function init() {
    if (live2d)
      return;
    setTimeout(() => {
      if (!document)
        return;
      live2d = live2d_default.init({ live2dOptions: { ...defaultLive2dOptions, ...live2dOptions } });
    }, 500);
  }
  watch(() => route.path, init);
};
export {
  useLive2d,
  useWaline
};
//# sourceMappingURL=vitepress-theme-website.js.map
