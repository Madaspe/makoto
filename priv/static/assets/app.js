(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // vendor/topbar.js
  var require_topbar = __commonJS({
    "vendor/topbar.js"(exports, module) {
      (function(window2, document2) {
        "use strict";
        (function() {
          var lastTime = 0;
          var vendors = ["ms", "moz", "webkit", "o"];
          for (var x = 0; x < vendors.length && !window2.requestAnimationFrame; ++x) {
            window2.requestAnimationFrame = window2[vendors[x] + "RequestAnimationFrame"];
            window2.cancelAnimationFrame = window2[vendors[x] + "CancelAnimationFrame"] || window2[vendors[x] + "CancelRequestAnimationFrame"];
          }
          if (!window2.requestAnimationFrame)
            window2.requestAnimationFrame = function(callback, element) {
              var currTime = new Date().getTime();
              var timeToCall = Math.max(0, 16 - (currTime - lastTime));
              var id = window2.setTimeout(function() {
                callback(currTime + timeToCall);
              }, timeToCall);
              lastTime = currTime + timeToCall;
              return id;
            };
          if (!window2.cancelAnimationFrame)
            window2.cancelAnimationFrame = function(id) {
              clearTimeout(id);
            };
        })();
        var canvas, progressTimerId, fadeTimerId, currentProgress, showing, addEvent = function(elem, type, handler) {
          if (elem.addEventListener)
            elem.addEventListener(type, handler, false);
          else if (elem.attachEvent)
            elem.attachEvent("on" + type, handler);
          else
            elem["on" + type] = handler;
        }, options = {
          autoRun: true,
          barThickness: 3,
          barColors: {
            0: "rgba(26,  188, 156, .9)",
            ".25": "rgba(52,  152, 219, .9)",
            ".50": "rgba(241, 196, 15,  .9)",
            ".75": "rgba(230, 126, 34,  .9)",
            "1.0": "rgba(211, 84,  0,   .9)"
          },
          shadowBlur: 10,
          shadowColor: "rgba(0,   0,   0,   .6)",
          className: null
        }, repaint = function() {
          canvas.width = window2.innerWidth;
          canvas.height = options.barThickness * 5;
          var ctx = canvas.getContext("2d");
          ctx.shadowBlur = options.shadowBlur;
          ctx.shadowColor = options.shadowColor;
          var lineGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
          for (var stop in options.barColors)
            lineGradient.addColorStop(stop, options.barColors[stop]);
          ctx.lineWidth = options.barThickness;
          ctx.beginPath();
          ctx.moveTo(0, options.barThickness / 2);
          ctx.lineTo(Math.ceil(currentProgress * canvas.width), options.barThickness / 2);
          ctx.strokeStyle = lineGradient;
          ctx.stroke();
        }, createCanvas = function() {
          canvas = document2.createElement("canvas");
          var style = canvas.style;
          style.position = "fixed";
          style.top = style.left = style.right = style.margin = style.padding = 0;
          style.zIndex = 100001;
          style.display = "none";
          if (options.className)
            canvas.classList.add(options.className);
          document2.body.appendChild(canvas);
          addEvent(window2, "resize", repaint);
        }, topbar2 = {
          config: function(opts) {
            for (var key in opts)
              if (options.hasOwnProperty(key))
                options[key] = opts[key];
          },
          show: function() {
            if (showing)
              return;
            showing = true;
            if (fadeTimerId !== null)
              window2.cancelAnimationFrame(fadeTimerId);
            if (!canvas)
              createCanvas();
            canvas.style.opacity = 1;
            canvas.style.display = "block";
            topbar2.progress(0);
            if (options.autoRun) {
              (function loop() {
                progressTimerId = window2.requestAnimationFrame(loop);
                topbar2.progress("+" + 0.05 * Math.pow(1 - Math.sqrt(currentProgress), 2));
              })();
            }
          },
          progress: function(to) {
            if (typeof to === "undefined")
              return currentProgress;
            if (typeof to === "string") {
              to = (to.indexOf("+") >= 0 || to.indexOf("-") >= 0 ? currentProgress : 0) + parseFloat(to);
            }
            currentProgress = to > 1 ? 1 : to;
            repaint();
            return currentProgress;
          },
          hide: function() {
            if (!showing)
              return;
            showing = false;
            if (progressTimerId != null) {
              window2.cancelAnimationFrame(progressTimerId);
              progressTimerId = null;
            }
            (function loop() {
              if (topbar2.progress("+.1") >= 1) {
                canvas.style.opacity -= 0.05;
                if (canvas.style.opacity <= 0.05) {
                  canvas.style.display = "none";
                  fadeTimerId = null;
                  return;
                }
              }
              fadeTimerId = window2.requestAnimationFrame(loop);
            })();
          }
        };
        if (typeof module === "object" && typeof module.exports === "object") {
          module.exports = topbar2;
        } else if (typeof define === "function" && define.amd) {
          define(function() {
            return topbar2;
          });
        } else {
          this.topbar = topbar2;
        }
      }).call(exports, window, document);
    }
  });

  // ../deps/phoenix_html/priv/static/phoenix_html.js
  "use strict";
  (function() {
    var PolyfillEvent = eventConstructor();
    function eventConstructor() {
      if (typeof window.CustomEvent === "function")
        return window.CustomEvent;
      function CustomEvent2(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: void 0 };
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
      }
      CustomEvent2.prototype = window.Event.prototype;
      return CustomEvent2;
    }
    function buildHiddenInput(name, value) {
      var input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      return input;
    }
    function handleClick(element, targetModifierKey) {
      var to = element.getAttribute("data-to"), method = buildHiddenInput("_method", element.getAttribute("data-method")), csrf = buildHiddenInput("_csrf_token", element.getAttribute("data-csrf")), form = document.createElement("form"), target = element.getAttribute("target");
      form.method = element.getAttribute("data-method") === "get" ? "get" : "post";
      form.action = to;
      form.style.display = "hidden";
      if (target)
        form.target = target;
      else if (targetModifierKey)
        form.target = "_blank";
      form.appendChild(csrf);
      form.appendChild(method);
      document.body.appendChild(form);
      form.submit();
    }
    window.addEventListener("click", function(e) {
      var element = e.target;
      if (e.defaultPrevented)
        return;
      while (element && element.getAttribute) {
        var phoenixLinkEvent = new PolyfillEvent("phoenix.link.click", {
          "bubbles": true,
          "cancelable": true
        });
        if (!element.dispatchEvent(phoenixLinkEvent)) {
          e.preventDefault();
          e.stopImmediatePropagation();
          return false;
        }
        if (element.getAttribute("data-method")) {
          handleClick(element, e.metaKey || e.shiftKey);
          e.preventDefault();
          return false;
        } else {
          element = element.parentNode;
        }
      }
    }, false);
    window.addEventListener("phoenix.link.click", function(e) {
      var message = e.target.getAttribute("data-confirm");
      if (message && !window.confirm(message)) {
        e.preventDefault();
      }
    }, false);
  })();

  // ../deps/phoenix/priv/static/phoenix.esm.js
  var closure = (value) => {
    if (typeof value === "function") {
      return value;
    } else {
      let closure22 = function() {
        return value;
      };
      return closure22;
    }
  };
  var globalSelf = typeof self !== "undefined" ? self : null;
  var phxWindow = typeof window !== "undefined" ? window : null;
  var global = globalSelf || phxWindow || void 0;
  var DEFAULT_VSN = "2.0.0";
  var SOCKET_STATES = { connecting: 0, open: 1, closing: 2, closed: 3 };
  var DEFAULT_TIMEOUT = 1e4;
  var WS_CLOSE_NORMAL = 1e3;
  var CHANNEL_STATES = {
    closed: "closed",
    errored: "errored",
    joined: "joined",
    joining: "joining",
    leaving: "leaving"
  };
  var CHANNEL_EVENTS = {
    close: "phx_close",
    error: "phx_error",
    join: "phx_join",
    reply: "phx_reply",
    leave: "phx_leave"
  };
  var TRANSPORTS = {
    longpoll: "longpoll",
    websocket: "websocket"
  };
  var XHR_STATES = {
    complete: 4
  };
  var Push = class {
    constructor(channel, event, payload, timeout) {
      this.channel = channel;
      this.event = event;
      this.payload = payload || function() {
        return {};
      };
      this.receivedResp = null;
      this.timeout = timeout;
      this.timeoutTimer = null;
      this.recHooks = [];
      this.sent = false;
    }
    resend(timeout) {
      this.timeout = timeout;
      this.reset();
      this.send();
    }
    send() {
      if (this.hasReceived("timeout")) {
        return;
      }
      this.startTimeout();
      this.sent = true;
      this.channel.socket.push({
        topic: this.channel.topic,
        event: this.event,
        payload: this.payload(),
        ref: this.ref,
        join_ref: this.channel.joinRef()
      });
    }
    receive(status, callback) {
      if (this.hasReceived(status)) {
        callback(this.receivedResp.response);
      }
      this.recHooks.push({ status, callback });
      return this;
    }
    reset() {
      this.cancelRefEvent();
      this.ref = null;
      this.refEvent = null;
      this.receivedResp = null;
      this.sent = false;
    }
    matchReceive({ status, response, _ref }) {
      this.recHooks.filter((h) => h.status === status).forEach((h) => h.callback(response));
    }
    cancelRefEvent() {
      if (!this.refEvent) {
        return;
      }
      this.channel.off(this.refEvent);
    }
    cancelTimeout() {
      clearTimeout(this.timeoutTimer);
      this.timeoutTimer = null;
    }
    startTimeout() {
      if (this.timeoutTimer) {
        this.cancelTimeout();
      }
      this.ref = this.channel.socket.makeRef();
      this.refEvent = this.channel.replyEventName(this.ref);
      this.channel.on(this.refEvent, (payload) => {
        this.cancelRefEvent();
        this.cancelTimeout();
        this.receivedResp = payload;
        this.matchReceive(payload);
      });
      this.timeoutTimer = setTimeout(() => {
        this.trigger("timeout", {});
      }, this.timeout);
    }
    hasReceived(status) {
      return this.receivedResp && this.receivedResp.status === status;
    }
    trigger(status, response) {
      this.channel.trigger(this.refEvent, { status, response });
    }
  };
  var Timer = class {
    constructor(callback, timerCalc) {
      this.callback = callback;
      this.timerCalc = timerCalc;
      this.timer = null;
      this.tries = 0;
    }
    reset() {
      this.tries = 0;
      clearTimeout(this.timer);
    }
    scheduleTimeout() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.tries = this.tries + 1;
        this.callback();
      }, this.timerCalc(this.tries + 1));
    }
  };
  var Channel = class {
    constructor(topic, params, socket) {
      this.state = CHANNEL_STATES.closed;
      this.topic = topic;
      this.params = closure(params || {});
      this.socket = socket;
      this.bindings = [];
      this.bindingRef = 0;
      this.timeout = this.socket.timeout;
      this.joinedOnce = false;
      this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout);
      this.pushBuffer = [];
      this.stateChangeRefs = [];
      this.rejoinTimer = new Timer(() => {
        if (this.socket.isConnected()) {
          this.rejoin();
        }
      }, this.socket.rejoinAfterMs);
      this.stateChangeRefs.push(this.socket.onError(() => this.rejoinTimer.reset()));
      this.stateChangeRefs.push(this.socket.onOpen(() => {
        this.rejoinTimer.reset();
        if (this.isErrored()) {
          this.rejoin();
        }
      }));
      this.joinPush.receive("ok", () => {
        this.state = CHANNEL_STATES.joined;
        this.rejoinTimer.reset();
        this.pushBuffer.forEach((pushEvent) => pushEvent.send());
        this.pushBuffer = [];
      });
      this.joinPush.receive("error", () => {
        this.state = CHANNEL_STATES.errored;
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.onClose(() => {
        this.rejoinTimer.reset();
        if (this.socket.hasLogger())
          this.socket.log("channel", `close ${this.topic} ${this.joinRef()}`);
        this.state = CHANNEL_STATES.closed;
        this.socket.remove(this);
      });
      this.onError((reason) => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `error ${this.topic}`, reason);
        if (this.isJoining()) {
          this.joinPush.reset();
        }
        this.state = CHANNEL_STATES.errored;
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.joinPush.receive("timeout", () => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `timeout ${this.topic} (${this.joinRef()})`, this.joinPush.timeout);
        let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), this.timeout);
        leavePush.send();
        this.state = CHANNEL_STATES.errored;
        this.joinPush.reset();
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.on(CHANNEL_EVENTS.reply, (payload, ref) => {
        this.trigger(this.replyEventName(ref), payload);
      });
    }
    join(timeout = this.timeout) {
      if (this.joinedOnce) {
        throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");
      } else {
        this.timeout = timeout;
        this.joinedOnce = true;
        this.rejoin();
        return this.joinPush;
      }
    }
    onClose(callback) {
      this.on(CHANNEL_EVENTS.close, callback);
    }
    onError(callback) {
      return this.on(CHANNEL_EVENTS.error, (reason) => callback(reason));
    }
    on(event, callback) {
      let ref = this.bindingRef++;
      this.bindings.push({ event, ref, callback });
      return ref;
    }
    off(event, ref) {
      this.bindings = this.bindings.filter((bind) => {
        return !(bind.event === event && (typeof ref === "undefined" || ref === bind.ref));
      });
    }
    canPush() {
      return this.socket.isConnected() && this.isJoined();
    }
    push(event, payload, timeout = this.timeout) {
      payload = payload || {};
      if (!this.joinedOnce) {
        throw new Error(`tried to push '${event}' to '${this.topic}' before joining. Use channel.join() before pushing events`);
      }
      let pushEvent = new Push(this, event, function() {
        return payload;
      }, timeout);
      if (this.canPush()) {
        pushEvent.send();
      } else {
        pushEvent.startTimeout();
        this.pushBuffer.push(pushEvent);
      }
      return pushEvent;
    }
    leave(timeout = this.timeout) {
      this.rejoinTimer.reset();
      this.joinPush.cancelTimeout();
      this.state = CHANNEL_STATES.leaving;
      let onClose = () => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `leave ${this.topic}`);
        this.trigger(CHANNEL_EVENTS.close, "leave");
      };
      let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), timeout);
      leavePush.receive("ok", () => onClose()).receive("timeout", () => onClose());
      leavePush.send();
      if (!this.canPush()) {
        leavePush.trigger("ok", {});
      }
      return leavePush;
    }
    onMessage(_event, payload, _ref) {
      return payload;
    }
    isMember(topic, event, payload, joinRef) {
      if (this.topic !== topic) {
        return false;
      }
      if (joinRef && joinRef !== this.joinRef()) {
        if (this.socket.hasLogger())
          this.socket.log("channel", "dropping outdated message", { topic, event, payload, joinRef });
        return false;
      } else {
        return true;
      }
    }
    joinRef() {
      return this.joinPush.ref;
    }
    rejoin(timeout = this.timeout) {
      if (this.isLeaving()) {
        return;
      }
      this.socket.leaveOpenTopic(this.topic);
      this.state = CHANNEL_STATES.joining;
      this.joinPush.resend(timeout);
    }
    trigger(event, payload, ref, joinRef) {
      let handledPayload = this.onMessage(event, payload, ref, joinRef);
      if (payload && !handledPayload) {
        throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");
      }
      let eventBindings = this.bindings.filter((bind) => bind.event === event);
      for (let i = 0; i < eventBindings.length; i++) {
        let bind = eventBindings[i];
        bind.callback(handledPayload, ref, joinRef || this.joinRef());
      }
    }
    replyEventName(ref) {
      return `chan_reply_${ref}`;
    }
    isClosed() {
      return this.state === CHANNEL_STATES.closed;
    }
    isErrored() {
      return this.state === CHANNEL_STATES.errored;
    }
    isJoined() {
      return this.state === CHANNEL_STATES.joined;
    }
    isJoining() {
      return this.state === CHANNEL_STATES.joining;
    }
    isLeaving() {
      return this.state === CHANNEL_STATES.leaving;
    }
  };
  var Ajax = class {
    static request(method, endPoint, accept, body, timeout, ontimeout, callback) {
      if (global.XDomainRequest) {
        let req = new global.XDomainRequest();
        this.xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback);
      } else {
        let req = new global.XMLHttpRequest();
        this.xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback);
      }
    }
    static xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback) {
      req.timeout = timeout;
      req.open(method, endPoint);
      req.onload = () => {
        let response = this.parseJSON(req.responseText);
        callback && callback(response);
      };
      if (ontimeout) {
        req.ontimeout = ontimeout;
      }
      req.onprogress = () => {
      };
      req.send(body);
    }
    static xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback) {
      req.open(method, endPoint, true);
      req.timeout = timeout;
      req.setRequestHeader("Content-Type", accept);
      req.onerror = () => {
        callback && callback(null);
      };
      req.onreadystatechange = () => {
        if (req.readyState === XHR_STATES.complete && callback) {
          let response = this.parseJSON(req.responseText);
          callback(response);
        }
      };
      if (ontimeout) {
        req.ontimeout = ontimeout;
      }
      req.send(body);
    }
    static parseJSON(resp) {
      if (!resp || resp === "") {
        return null;
      }
      try {
        return JSON.parse(resp);
      } catch (e) {
        console && console.log("failed to parse JSON response", resp);
        return null;
      }
    }
    static serialize(obj, parentKey) {
      let queryStr = [];
      for (var key in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, key)) {
          continue;
        }
        let paramKey = parentKey ? `${parentKey}[${key}]` : key;
        let paramVal = obj[key];
        if (typeof paramVal === "object") {
          queryStr.push(this.serialize(paramVal, paramKey));
        } else {
          queryStr.push(encodeURIComponent(paramKey) + "=" + encodeURIComponent(paramVal));
        }
      }
      return queryStr.join("&");
    }
    static appendParams(url, params) {
      if (Object.keys(params).length === 0) {
        return url;
      }
      let prefix = url.match(/\?/) ? "&" : "?";
      return `${url}${prefix}${this.serialize(params)}`;
    }
  };
  var LongPoll = class {
    constructor(endPoint) {
      this.endPoint = null;
      this.token = null;
      this.skipHeartbeat = true;
      this.onopen = function() {
      };
      this.onerror = function() {
      };
      this.onmessage = function() {
      };
      this.onclose = function() {
      };
      this.pollEndpoint = this.normalizeEndpoint(endPoint);
      this.readyState = SOCKET_STATES.connecting;
      this.poll();
    }
    normalizeEndpoint(endPoint) {
      return endPoint.replace("ws://", "http://").replace("wss://", "https://").replace(new RegExp("(.*)/" + TRANSPORTS.websocket), "$1/" + TRANSPORTS.longpoll);
    }
    endpointURL() {
      return Ajax.appendParams(this.pollEndpoint, { token: this.token });
    }
    closeAndRetry() {
      this.close();
      this.readyState = SOCKET_STATES.connecting;
    }
    ontimeout() {
      this.onerror("timeout");
      this.closeAndRetry();
    }
    poll() {
      if (!(this.readyState === SOCKET_STATES.open || this.readyState === SOCKET_STATES.connecting)) {
        return;
      }
      Ajax.request("GET", this.endpointURL(), "application/json", null, this.timeout, this.ontimeout.bind(this), (resp) => {
        if (resp) {
          var { status, token, messages } = resp;
          this.token = token;
        } else {
          status = 0;
        }
        switch (status) {
          case 200:
            messages.forEach((msg) => {
              setTimeout(() => {
                this.onmessage({ data: msg });
              }, 0);
            });
            this.poll();
            break;
          case 204:
            this.poll();
            break;
          case 410:
            this.readyState = SOCKET_STATES.open;
            this.onopen();
            this.poll();
            break;
          case 403:
            this.onerror();
            this.close();
            break;
          case 0:
          case 500:
            this.onerror();
            this.closeAndRetry();
            break;
          default:
            throw new Error(`unhandled poll status ${status}`);
        }
      });
    }
    send(body) {
      Ajax.request("POST", this.endpointURL(), "application/json", body, this.timeout, this.onerror.bind(this, "timeout"), (resp) => {
        if (!resp || resp.status !== 200) {
          this.onerror(resp && resp.status);
          this.closeAndRetry();
        }
      });
    }
    close(_code, _reason) {
      this.readyState = SOCKET_STATES.closed;
      this.onclose();
    }
  };
  var serializer_default = {
    HEADER_LENGTH: 1,
    META_LENGTH: 4,
    KINDS: { push: 0, reply: 1, broadcast: 2 },
    encode(msg, callback) {
      if (msg.payload.constructor === ArrayBuffer) {
        return callback(this.binaryEncode(msg));
      } else {
        let payload = [msg.join_ref, msg.ref, msg.topic, msg.event, msg.payload];
        return callback(JSON.stringify(payload));
      }
    },
    decode(rawPayload, callback) {
      if (rawPayload.constructor === ArrayBuffer) {
        return callback(this.binaryDecode(rawPayload));
      } else {
        let [join_ref, ref, topic, event, payload] = JSON.parse(rawPayload);
        return callback({ join_ref, ref, topic, event, payload });
      }
    },
    binaryEncode(message) {
      let { join_ref, ref, event, topic, payload } = message;
      let metaLength = this.META_LENGTH + join_ref.length + ref.length + topic.length + event.length;
      let header = new ArrayBuffer(this.HEADER_LENGTH + metaLength);
      let view = new DataView(header);
      let offset = 0;
      view.setUint8(offset++, this.KINDS.push);
      view.setUint8(offset++, join_ref.length);
      view.setUint8(offset++, ref.length);
      view.setUint8(offset++, topic.length);
      view.setUint8(offset++, event.length);
      Array.from(join_ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(topic, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(event, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      var combined = new Uint8Array(header.byteLength + payload.byteLength);
      combined.set(new Uint8Array(header), 0);
      combined.set(new Uint8Array(payload), header.byteLength);
      return combined.buffer;
    },
    binaryDecode(buffer) {
      let view = new DataView(buffer);
      let kind = view.getUint8(0);
      let decoder = new TextDecoder();
      switch (kind) {
        case this.KINDS.push:
          return this.decodePush(buffer, view, decoder);
        case this.KINDS.reply:
          return this.decodeReply(buffer, view, decoder);
        case this.KINDS.broadcast:
          return this.decodeBroadcast(buffer, view, decoder);
      }
    },
    decodePush(buffer, view, decoder) {
      let joinRefSize = view.getUint8(1);
      let topicSize = view.getUint8(2);
      let eventSize = view.getUint8(3);
      let offset = this.HEADER_LENGTH + this.META_LENGTH - 1;
      let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
      offset = offset + joinRefSize;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      return { join_ref: joinRef, ref: null, topic, event, payload: data };
    },
    decodeReply(buffer, view, decoder) {
      let joinRefSize = view.getUint8(1);
      let refSize = view.getUint8(2);
      let topicSize = view.getUint8(3);
      let eventSize = view.getUint8(4);
      let offset = this.HEADER_LENGTH + this.META_LENGTH;
      let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
      offset = offset + joinRefSize;
      let ref = decoder.decode(buffer.slice(offset, offset + refSize));
      offset = offset + refSize;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      let payload = { status: event, response: data };
      return { join_ref: joinRef, ref, topic, event: CHANNEL_EVENTS.reply, payload };
    },
    decodeBroadcast(buffer, view, decoder) {
      let topicSize = view.getUint8(1);
      let eventSize = view.getUint8(2);
      let offset = this.HEADER_LENGTH + 2;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      return { join_ref: null, ref: null, topic, event, payload: data };
    }
  };
  var Socket = class {
    constructor(endPoint, opts = {}) {
      this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] };
      this.channels = [];
      this.sendBuffer = [];
      this.ref = 0;
      this.timeout = opts.timeout || DEFAULT_TIMEOUT;
      this.transport = opts.transport || global.WebSocket || LongPoll;
      this.establishedConnections = 0;
      this.defaultEncoder = serializer_default.encode.bind(serializer_default);
      this.defaultDecoder = serializer_default.decode.bind(serializer_default);
      this.closeWasClean = false;
      this.binaryType = opts.binaryType || "arraybuffer";
      this.connectClock = 1;
      if (this.transport !== LongPoll) {
        this.encode = opts.encode || this.defaultEncoder;
        this.decode = opts.decode || this.defaultDecoder;
      } else {
        this.encode = this.defaultEncoder;
        this.decode = this.defaultDecoder;
      }
      let awaitingConnectionOnPageShow = null;
      if (phxWindow && phxWindow.addEventListener) {
        phxWindow.addEventListener("pagehide", (_e) => {
          if (this.conn) {
            this.disconnect();
            awaitingConnectionOnPageShow = this.connectClock;
          }
        });
        phxWindow.addEventListener("pageshow", (_e) => {
          if (awaitingConnectionOnPageShow === this.connectClock) {
            awaitingConnectionOnPageShow = null;
            this.connect();
          }
        });
      }
      this.heartbeatIntervalMs = opts.heartbeatIntervalMs || 3e4;
      this.rejoinAfterMs = (tries) => {
        if (opts.rejoinAfterMs) {
          return opts.rejoinAfterMs(tries);
        } else {
          return [1e3, 2e3, 5e3][tries - 1] || 1e4;
        }
      };
      this.reconnectAfterMs = (tries) => {
        if (opts.reconnectAfterMs) {
          return opts.reconnectAfterMs(tries);
        } else {
          return [10, 50, 100, 150, 200, 250, 500, 1e3, 2e3][tries - 1] || 5e3;
        }
      };
      this.logger = opts.logger || null;
      this.longpollerTimeout = opts.longpollerTimeout || 2e4;
      this.params = closure(opts.params || {});
      this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
      this.vsn = opts.vsn || DEFAULT_VSN;
      this.heartbeatTimer = null;
      this.pendingHeartbeatRef = null;
      this.reconnectTimer = new Timer(() => {
        this.teardown(() => this.connect());
      }, this.reconnectAfterMs);
    }
    replaceTransport(newTransport) {
      this.disconnect();
      this.transport = newTransport;
    }
    protocol() {
      return location.protocol.match(/^https/) ? "wss" : "ws";
    }
    endPointURL() {
      let uri = Ajax.appendParams(Ajax.appendParams(this.endPoint, this.params()), { vsn: this.vsn });
      if (uri.charAt(0) !== "/") {
        return uri;
      }
      if (uri.charAt(1) === "/") {
        return `${this.protocol()}:${uri}`;
      }
      return `${this.protocol()}://${location.host}${uri}`;
    }
    disconnect(callback, code, reason) {
      this.connectClock++;
      this.closeWasClean = true;
      this.reconnectTimer.reset();
      this.teardown(callback, code, reason);
    }
    connect(params) {
      this.connectClock++;
      if (params) {
        console && console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor");
        this.params = closure(params);
      }
      if (this.conn) {
        return;
      }
      this.closeWasClean = false;
      this.conn = new this.transport(this.endPointURL());
      this.conn.binaryType = this.binaryType;
      this.conn.timeout = this.longpollerTimeout;
      this.conn.onopen = () => this.onConnOpen();
      this.conn.onerror = (error) => this.onConnError(error);
      this.conn.onmessage = (event) => this.onConnMessage(event);
      this.conn.onclose = (event) => this.onConnClose(event);
    }
    log(kind, msg, data) {
      this.logger(kind, msg, data);
    }
    hasLogger() {
      return this.logger !== null;
    }
    onOpen(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.open.push([ref, callback]);
      return ref;
    }
    onClose(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.close.push([ref, callback]);
      return ref;
    }
    onError(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.error.push([ref, callback]);
      return ref;
    }
    onMessage(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.message.push([ref, callback]);
      return ref;
    }
    onConnOpen() {
      if (this.hasLogger())
        this.log("transport", `connected to ${this.endPointURL()}`);
      this.closeWasClean = false;
      this.establishedConnections++;
      this.flushSendBuffer();
      this.reconnectTimer.reset();
      this.resetHeartbeat();
      this.stateChangeCallbacks.open.forEach(([, callback]) => callback());
    }
    heartbeatTimeout() {
      if (this.pendingHeartbeatRef) {
        this.pendingHeartbeatRef = null;
        if (this.hasLogger()) {
          this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
        }
        this.abnormalClose("heartbeat timeout");
      }
    }
    resetHeartbeat() {
      if (this.conn && this.conn.skipHeartbeat) {
        return;
      }
      this.pendingHeartbeatRef = null;
      clearTimeout(this.heartbeatTimer);
      setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
    }
    teardown(callback, code, reason) {
      if (!this.conn) {
        return callback && callback();
      }
      this.waitForBufferDone(() => {
        if (this.conn) {
          if (code) {
            this.conn.close(code, reason || "");
          } else {
            this.conn.close();
          }
        }
        this.waitForSocketClosed(() => {
          if (this.conn) {
            this.conn.onclose = function() {
            };
            this.conn = null;
          }
          callback && callback();
        });
      });
    }
    waitForBufferDone(callback, tries = 1) {
      if (tries === 5 || !this.conn || !this.conn.bufferedAmount) {
        callback();
        return;
      }
      setTimeout(() => {
        this.waitForBufferDone(callback, tries + 1);
      }, 150 * tries);
    }
    waitForSocketClosed(callback, tries = 1) {
      if (tries === 5 || !this.conn || this.conn.readyState === SOCKET_STATES.closed) {
        callback();
        return;
      }
      setTimeout(() => {
        this.waitForSocketClosed(callback, tries + 1);
      }, 150 * tries);
    }
    onConnClose(event) {
      let closeCode = event && event.code;
      if (this.hasLogger())
        this.log("transport", "close", event);
      this.triggerChanError();
      clearTimeout(this.heartbeatTimer);
      if (!this.closeWasClean && closeCode !== 1e3) {
        this.reconnectTimer.scheduleTimeout();
      }
      this.stateChangeCallbacks.close.forEach(([, callback]) => callback(event));
    }
    onConnError(error) {
      if (this.hasLogger())
        this.log("transport", error);
      let transportBefore = this.transport;
      let establishedBefore = this.establishedConnections;
      this.stateChangeCallbacks.error.forEach(([, callback]) => {
        callback(error, transportBefore, establishedBefore);
      });
      if (transportBefore === this.transport || establishedBefore > 0) {
        this.triggerChanError();
      }
    }
    triggerChanError() {
      this.channels.forEach((channel) => {
        if (!(channel.isErrored() || channel.isLeaving() || channel.isClosed())) {
          channel.trigger(CHANNEL_EVENTS.error);
        }
      });
    }
    connectionState() {
      switch (this.conn && this.conn.readyState) {
        case SOCKET_STATES.connecting:
          return "connecting";
        case SOCKET_STATES.open:
          return "open";
        case SOCKET_STATES.closing:
          return "closing";
        default:
          return "closed";
      }
    }
    isConnected() {
      return this.connectionState() === "open";
    }
    remove(channel) {
      this.off(channel.stateChangeRefs);
      this.channels = this.channels.filter((c) => c.joinRef() !== channel.joinRef());
    }
    off(refs) {
      for (let key in this.stateChangeCallbacks) {
        this.stateChangeCallbacks[key] = this.stateChangeCallbacks[key].filter(([ref]) => {
          return refs.indexOf(ref) === -1;
        });
      }
    }
    channel(topic, chanParams = {}) {
      let chan = new Channel(topic, chanParams, this);
      this.channels.push(chan);
      return chan;
    }
    push(data) {
      if (this.hasLogger()) {
        let { topic, event, payload, ref, join_ref } = data;
        this.log("push", `${topic} ${event} (${join_ref}, ${ref})`, payload);
      }
      if (this.isConnected()) {
        this.encode(data, (result) => this.conn.send(result));
      } else {
        this.sendBuffer.push(() => this.encode(data, (result) => this.conn.send(result)));
      }
    }
    makeRef() {
      let newRef = this.ref + 1;
      if (newRef === this.ref) {
        this.ref = 0;
      } else {
        this.ref = newRef;
      }
      return this.ref.toString();
    }
    sendHeartbeat() {
      if (this.pendingHeartbeatRef && !this.isConnected()) {
        return;
      }
      this.pendingHeartbeatRef = this.makeRef();
      this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: this.pendingHeartbeatRef });
      this.heartbeatTimer = setTimeout(() => this.heartbeatTimeout(), this.heartbeatIntervalMs);
    }
    abnormalClose(reason) {
      this.closeWasClean = false;
      if (this.isConnected()) {
        this.conn.close(WS_CLOSE_NORMAL, reason);
      }
    }
    flushSendBuffer() {
      if (this.isConnected() && this.sendBuffer.length > 0) {
        this.sendBuffer.forEach((callback) => callback());
        this.sendBuffer = [];
      }
    }
    onConnMessage(rawMessage) {
      this.decode(rawMessage.data, (msg) => {
        let { topic, event, payload, ref, join_ref } = msg;
        if (ref && ref === this.pendingHeartbeatRef) {
          clearTimeout(this.heartbeatTimer);
          this.pendingHeartbeatRef = null;
          setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
        }
        if (this.hasLogger())
          this.log("receive", `${payload.status || ""} ${topic} ${event} ${ref && "(" + ref + ")" || ""}`, payload);
        for (let i = 0; i < this.channels.length; i++) {
          const channel = this.channels[i];
          if (!channel.isMember(topic, event, payload, join_ref)) {
            continue;
          }
          channel.trigger(event, payload, ref, join_ref);
        }
        for (let i = 0; i < this.stateChangeCallbacks.message.length; i++) {
          let [, callback] = this.stateChangeCallbacks.message[i];
          callback(msg);
        }
      });
    }
    leaveOpenTopic(topic) {
      let dupChannel = this.channels.find((c) => c.topic === topic && (c.isJoined() || c.isJoining()));
      if (dupChannel) {
        if (this.hasLogger())
          this.log("transport", `leaving duplicate topic "${topic}"`);
        dupChannel.leave();
      }
    }
  };

  // ../deps/phoenix_live_view/priv/static/phoenix_live_view.esm.js
  var CONSECUTIVE_RELOADS = "consecutive-reloads";
  var MAX_RELOADS = 10;
  var RELOAD_JITTER = [1e3, 3e3];
  var FAILSAFE_JITTER = 3e4;
  var PHX_EVENT_CLASSES = [
    "phx-click-loading",
    "phx-change-loading",
    "phx-submit-loading",
    "phx-keydown-loading",
    "phx-keyup-loading",
    "phx-blur-loading",
    "phx-focus-loading"
  ];
  var PHX_COMPONENT = "data-phx-component";
  var PHX_LIVE_LINK = "data-phx-link";
  var PHX_TRACK_STATIC = "track-static";
  var PHX_LINK_STATE = "data-phx-link-state";
  var PHX_REF = "data-phx-ref";
  var PHX_TRACK_UPLOADS = "track-uploads";
  var PHX_UPLOAD_REF = "data-phx-upload-ref";
  var PHX_PREFLIGHTED_REFS = "data-phx-preflighted-refs";
  var PHX_DONE_REFS = "data-phx-done-refs";
  var PHX_DROP_TARGET = "drop-target";
  var PHX_ACTIVE_ENTRY_REFS = "data-phx-active-refs";
  var PHX_LIVE_FILE_UPDATED = "phx:live-file:updated";
  var PHX_SKIP = "data-phx-skip";
  var PHX_REMOVE = "data-phx-remove";
  var PHX_PAGE_LOADING = "page-loading";
  var PHX_CONNECTED_CLASS = "phx-connected";
  var PHX_DISCONNECTED_CLASS = "phx-disconnected";
  var PHX_NO_FEEDBACK_CLASS = "phx-no-feedback";
  var PHX_ERROR_CLASS = "phx-error";
  var PHX_PARENT_ID = "data-phx-parent-id";
  var PHX_MAIN = "data-phx-main";
  var PHX_ROOT_ID = "data-phx-root-id";
  var PHX_TRIGGER_ACTION = "trigger-action";
  var PHX_FEEDBACK_FOR = "feedback-for";
  var PHX_HAS_FOCUSED = "phx-has-focused";
  var FOCUSABLE_INPUTS = ["text", "textarea", "number", "email", "password", "search", "tel", "url", "date", "time"];
  var CHECKABLE_INPUTS = ["checkbox", "radio"];
  var PHX_HAS_SUBMITTED = "phx-has-submitted";
  var PHX_SESSION = "data-phx-session";
  var PHX_VIEW_SELECTOR = `[${PHX_SESSION}]`;
  var PHX_STATIC = "data-phx-static";
  var PHX_READONLY = "data-phx-readonly";
  var PHX_DISABLED = "data-phx-disabled";
  var PHX_DISABLE_WITH = "disable-with";
  var PHX_DISABLE_WITH_RESTORE = "data-phx-disable-with-restore";
  var PHX_HOOK = "hook";
  var PHX_DEBOUNCE = "debounce";
  var PHX_THROTTLE = "throttle";
  var PHX_UPDATE = "update";
  var PHX_KEY = "key";
  var PHX_PRIVATE = "phxPrivate";
  var PHX_AUTO_RECOVER = "auto-recover";
  var PHX_LV_DEBUG = "phx:live-socket:debug";
  var PHX_LV_PROFILE = "phx:live-socket:profiling";
  var PHX_LV_LATENCY_SIM = "phx:live-socket:latency-sim";
  var PHX_PROGRESS = "progress";
  var LOADER_TIMEOUT = 1;
  var BEFORE_UNLOAD_LOADER_TIMEOUT = 200;
  var BINDING_PREFIX = "phx-";
  var PUSH_TIMEOUT = 3e4;
  var DEBOUNCE_TRIGGER = "debounce-trigger";
  var THROTTLED = "throttled";
  var DEBOUNCE_PREV_KEY = "debounce-prev-key";
  var DEFAULTS = {
    debounce: 300,
    throttle: 300
  };
  var DYNAMICS = "d";
  var STATIC = "s";
  var COMPONENTS = "c";
  var EVENTS = "e";
  var REPLY = "r";
  var TITLE = "t";
  var EntryUploader = class {
    constructor(entry, chunkSize, liveSocket2) {
      this.liveSocket = liveSocket2;
      this.entry = entry;
      this.offset = 0;
      this.chunkSize = chunkSize;
      this.chunkTimer = null;
      this.uploadChannel = liveSocket2.channel(`lvu:${entry.ref}`, { token: entry.metadata() });
    }
    error(reason) {
      clearTimeout(this.chunkTimer);
      this.uploadChannel.leave();
      this.entry.error(reason);
    }
    upload() {
      this.uploadChannel.onError((reason) => this.error(reason));
      this.uploadChannel.join().receive("ok", (_data) => this.readNextChunk()).receive("error", (reason) => this.error(reason));
    }
    isDone() {
      return this.offset >= this.entry.file.size;
    }
    readNextChunk() {
      let reader = new window.FileReader();
      let blob = this.entry.file.slice(this.offset, this.chunkSize + this.offset);
      reader.onload = (e) => {
        if (e.target.error === null) {
          this.offset += e.target.result.byteLength;
          this.pushChunk(e.target.result);
        } else {
          return logError("Read error: " + e.target.error);
        }
      };
      reader.readAsArrayBuffer(blob);
    }
    pushChunk(chunk) {
      if (!this.uploadChannel.isJoined()) {
        return;
      }
      this.uploadChannel.push("chunk", chunk).receive("ok", () => {
        this.entry.progress(this.offset / this.entry.file.size * 100);
        if (!this.isDone()) {
          this.chunkTimer = setTimeout(() => this.readNextChunk(), this.liveSocket.getLatencySim() || 0);
        }
      });
    }
  };
  var logError = (msg, obj) => console.error && console.error(msg, obj);
  var isCid = (cid) => typeof cid === "number";
  function detectDuplicateIds() {
    let ids = /* @__PURE__ */ new Set();
    let elems = document.querySelectorAll("*[id]");
    for (let i = 0, len = elems.length; i < len; i++) {
      if (ids.has(elems[i].id)) {
        console.error(`Multiple IDs detected: ${elems[i].id}. Ensure unique element ids.`);
      } else {
        ids.add(elems[i].id);
      }
    }
  }
  var debug = (view, kind, msg, obj) => {
    if (view.liveSocket.isDebugEnabled()) {
      console.log(`${view.id} ${kind}: ${msg} - `, obj);
    }
  };
  var closure2 = (val) => typeof val === "function" ? val : function() {
    return val;
  };
  var clone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  };
  var closestPhxBinding = (el, binding, borderEl) => {
    do {
      if (el.matches(`[${binding}]`)) {
        return el;
      }
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1 && !(borderEl && borderEl.isSameNode(el) || el.matches(PHX_VIEW_SELECTOR)));
    return null;
  };
  var isObject = (obj) => {
    return obj !== null && typeof obj === "object" && !(obj instanceof Array);
  };
  var isEqualObj = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);
  var isEmpty = (obj) => {
    for (let x in obj) {
      return false;
    }
    return true;
  };
  var maybe = (el, callback) => el && callback(el);
  var channelUploader = function(entries, onError, resp, liveSocket2) {
    entries.forEach((entry) => {
      let entryUploader = new EntryUploader(entry, resp.config.chunk_size, liveSocket2);
      entryUploader.upload();
    });
  };
  var Browser = {
    canPushState() {
      return typeof history.pushState !== "undefined";
    },
    dropLocal(localStorage, namespace, subkey) {
      return localStorage.removeItem(this.localKey(namespace, subkey));
    },
    updateLocal(localStorage, namespace, subkey, initial, func) {
      let current = this.getLocal(localStorage, namespace, subkey);
      let key = this.localKey(namespace, subkey);
      let newVal = current === null ? initial : func(current);
      localStorage.setItem(key, JSON.stringify(newVal));
      return newVal;
    },
    getLocal(localStorage, namespace, subkey) {
      return JSON.parse(localStorage.getItem(this.localKey(namespace, subkey)));
    },
    updateCurrentState(callback) {
      if (!this.canPushState()) {
        return;
      }
      history.replaceState(callback(history.state || {}), "", window.location.href);
    },
    pushState(kind, meta, to) {
      if (this.canPushState()) {
        if (to !== window.location.href) {
          if (meta.type == "redirect" && meta.scroll) {
            let currentState = history.state || {};
            currentState.scroll = meta.scroll;
            history.replaceState(currentState, "", window.location.href);
          }
          delete meta.scroll;
          history[kind + "State"](meta, "", to || null);
          let hashEl = this.getHashTargetEl(window.location.hash);
          if (hashEl) {
            hashEl.scrollIntoView();
          } else if (meta.type === "redirect") {
            window.scroll(0, 0);
          }
        }
      } else {
        this.redirect(to);
      }
    },
    setCookie(name, value) {
      document.cookie = `${name}=${value}`;
    },
    getCookie(name) {
      return document.cookie.replace(new RegExp(`(?:(?:^|.*;s*)${name}s*=s*([^;]*).*$)|^.*$`), "$1");
    },
    redirect(toURL, flash) {
      if (flash) {
        Browser.setCookie("__phoenix_flash__", flash + "; max-age=60000; path=/");
      }
      window.location = toURL;
    },
    localKey(namespace, subkey) {
      return `${namespace}-${subkey}`;
    },
    getHashTargetEl(maybeHash) {
      let hash = maybeHash.toString().substring(1);
      if (hash === "") {
        return;
      }
      return document.getElementById(hash) || document.querySelector(`a[name="${hash}"]`);
    }
  };
  var browser_default = Browser;
  var DOM = {
    byId(id) {
      return document.getElementById(id) || logError(`no id found for ${id}`);
    },
    removeClass(el, className) {
      el.classList.remove(className);
      if (el.classList.length === 0) {
        el.removeAttribute("class");
      }
    },
    all(node, query, callback) {
      if (!node) {
        return [];
      }
      let array = Array.from(node.querySelectorAll(query));
      return callback ? array.forEach(callback) : array;
    },
    childNodeLength(html) {
      let template = document.createElement("template");
      template.innerHTML = html;
      return template.content.childElementCount;
    },
    isUploadInput(el) {
      return el.type === "file" && el.getAttribute(PHX_UPLOAD_REF) !== null;
    },
    findUploadInputs(node) {
      return this.all(node, `input[type="file"][${PHX_UPLOAD_REF}]`);
    },
    findComponentNodeList(node, cid) {
      return this.filterWithinSameLiveView(this.all(node, `[${PHX_COMPONENT}="${cid}"]`), node);
    },
    isPhxDestroyed(node) {
      return node.id && DOM.private(node, "destroyed") ? true : false;
    },
    markPhxChildDestroyed(el) {
      el.setAttribute(PHX_SESSION, "");
      this.putPrivate(el, "destroyed", true);
    },
    findPhxChildrenInFragment(html, parentId) {
      let template = document.createElement("template");
      template.innerHTML = html;
      return this.findPhxChildren(template.content, parentId);
    },
    isIgnored(el, phxUpdate) {
      return (el.getAttribute(phxUpdate) || el.getAttribute("data-phx-update")) === "ignore";
    },
    isPhxUpdate(el, phxUpdate, updateTypes) {
      return el.getAttribute && updateTypes.indexOf(el.getAttribute(phxUpdate)) >= 0;
    },
    findPhxChildren(el, parentId) {
      return this.all(el, `${PHX_VIEW_SELECTOR}[${PHX_PARENT_ID}="${parentId}"]`);
    },
    findParentCIDs(node, cids) {
      let initial = new Set(cids);
      return cids.reduce((acc, cid) => {
        let selector = `[${PHX_COMPONENT}="${cid}"] [${PHX_COMPONENT}]`;
        this.filterWithinSameLiveView(this.all(node, selector), node).map((el) => parseInt(el.getAttribute(PHX_COMPONENT))).forEach((childCID) => acc.delete(childCID));
        return acc;
      }, initial);
    },
    filterWithinSameLiveView(nodes, parent) {
      if (parent.querySelector(PHX_VIEW_SELECTOR)) {
        return nodes.filter((el) => this.withinSameLiveView(el, parent));
      } else {
        return nodes;
      }
    },
    withinSameLiveView(node, parent) {
      while (node = node.parentNode) {
        if (node.isSameNode(parent)) {
          return true;
        }
        if (node.getAttribute(PHX_SESSION) !== null) {
          return false;
        }
      }
    },
    private(el, key) {
      return el[PHX_PRIVATE] && el[PHX_PRIVATE][key];
    },
    deletePrivate(el, key) {
      el[PHX_PRIVATE] && delete el[PHX_PRIVATE][key];
    },
    putPrivate(el, key, value) {
      if (!el[PHX_PRIVATE]) {
        el[PHX_PRIVATE] = {};
      }
      el[PHX_PRIVATE][key] = value;
    },
    copyPrivates(target, source) {
      if (source[PHX_PRIVATE]) {
        target[PHX_PRIVATE] = clone(source[PHX_PRIVATE]);
      }
    },
    putTitle(str) {
      let titleEl = document.querySelector("title");
      let { prefix, suffix } = titleEl.dataset;
      document.title = `${prefix || ""}${str}${suffix || ""}`;
    },
    debounce(el, event, phxDebounce, defaultDebounce, phxThrottle, defaultThrottle, callback) {
      let debounce = el.getAttribute(phxDebounce);
      let throttle = el.getAttribute(phxThrottle);
      if (debounce === "") {
        debounce = defaultDebounce;
      }
      if (throttle === "") {
        throttle = defaultThrottle;
      }
      let value = debounce || throttle;
      switch (value) {
        case null:
          return callback();
        case "blur":
          if (this.once(el, "debounce-blur")) {
            el.addEventListener("blur", () => callback());
          }
          return;
        default:
          let timeout = parseInt(value);
          let trigger = () => throttle ? this.deletePrivate(el, THROTTLED) : callback();
          let currentCycle = this.incCycle(el, DEBOUNCE_TRIGGER, trigger);
          if (isNaN(timeout)) {
            return logError(`invalid throttle/debounce value: ${value}`);
          }
          if (throttle) {
            let newKeyDown = false;
            if (event.type === "keydown") {
              let prevKey = this.private(el, DEBOUNCE_PREV_KEY);
              this.putPrivate(el, DEBOUNCE_PREV_KEY, event.key);
              newKeyDown = prevKey !== event.key;
            }
            if (!newKeyDown && this.private(el, THROTTLED)) {
              return false;
            } else {
              callback();
              this.putPrivate(el, THROTTLED, true);
              setTimeout(() => this.triggerCycle(el, DEBOUNCE_TRIGGER), timeout);
            }
          } else {
            setTimeout(() => this.triggerCycle(el, DEBOUNCE_TRIGGER, currentCycle), timeout);
          }
          let form = el.form;
          if (form && this.once(form, "bind-debounce")) {
            form.addEventListener("submit", () => {
              Array.from(new FormData(form).entries(), ([name]) => {
                let input = form.querySelector(`[name="${name}"]`);
                this.incCycle(input, DEBOUNCE_TRIGGER);
                this.deletePrivate(input, THROTTLED);
              });
            });
          }
          if (this.once(el, "bind-debounce")) {
            el.addEventListener("blur", () => this.triggerCycle(el, DEBOUNCE_TRIGGER));
          }
      }
    },
    triggerCycle(el, key, currentCycle) {
      let [cycle, trigger] = this.private(el, key);
      if (!currentCycle) {
        currentCycle = cycle;
      }
      if (currentCycle === cycle) {
        this.incCycle(el, key);
        trigger();
      }
    },
    once(el, key) {
      if (this.private(el, key) === true) {
        return false;
      }
      this.putPrivate(el, key, true);
      return true;
    },
    incCycle(el, key, trigger = function() {
    }) {
      let [currentCycle] = this.private(el, key) || [0, trigger];
      currentCycle++;
      this.putPrivate(el, key, [currentCycle, trigger]);
      return currentCycle;
    },
    discardError(container, el, phxFeedbackFor) {
      let field = el.getAttribute && el.getAttribute(phxFeedbackFor);
      let input = field && container.querySelector(`[id="${field}"], [name="${field}"]`);
      if (!input) {
        return;
      }
      if (!(this.private(input, PHX_HAS_FOCUSED) || this.private(input.form, PHX_HAS_SUBMITTED))) {
        el.classList.add(PHX_NO_FEEDBACK_CLASS);
      }
    },
    showError(inputEl, phxFeedbackFor) {
      if (inputEl.id || inputEl.name) {
        this.all(inputEl.form, `[${phxFeedbackFor}="${inputEl.id}"], [${phxFeedbackFor}="${inputEl.name}"]`, (el) => {
          this.removeClass(el, PHX_NO_FEEDBACK_CLASS);
        });
      }
    },
    isPhxChild(node) {
      return node.getAttribute && node.getAttribute(PHX_PARENT_ID);
    },
    dispatchEvent(target, eventString, detail = {}) {
      let event = new CustomEvent(eventString, { bubbles: true, cancelable: true, detail });
      target.dispatchEvent(event);
    },
    cloneNode(node, html) {
      if (typeof html === "undefined") {
        return node.cloneNode(true);
      } else {
        let cloned = node.cloneNode(false);
        cloned.innerHTML = html;
        return cloned;
      }
    },
    mergeAttrs(target, source, opts = {}) {
      let exclude = opts.exclude || [];
      let isIgnored = opts.isIgnored;
      let sourceAttrs = source.attributes;
      for (let i = sourceAttrs.length - 1; i >= 0; i--) {
        let name = sourceAttrs[i].name;
        if (exclude.indexOf(name) < 0) {
          target.setAttribute(name, source.getAttribute(name));
        }
      }
      let targetAttrs = target.attributes;
      for (let i = targetAttrs.length - 1; i >= 0; i--) {
        let name = targetAttrs[i].name;
        if (isIgnored) {
          if (name.startsWith("data-") && !source.hasAttribute(name)) {
            target.removeAttribute(name);
          }
        } else {
          if (!source.hasAttribute(name)) {
            target.removeAttribute(name);
          }
        }
      }
    },
    mergeFocusedInput(target, source) {
      if (!(target instanceof HTMLSelectElement)) {
        DOM.mergeAttrs(target, source, { except: ["value"] });
      }
      if (source.readOnly) {
        target.setAttribute("readonly", true);
      } else {
        target.removeAttribute("readonly");
      }
    },
    hasSelectionRange(el) {
      return el.setSelectionRange && (el.type === "text" || el.type === "textarea");
    },
    restoreFocus(focused, selectionStart, selectionEnd) {
      if (!DOM.isTextualInput(focused)) {
        return;
      }
      let wasFocused = focused.matches(":focus");
      if (focused.readOnly) {
        focused.blur();
      }
      if (!wasFocused) {
        focused.focus();
      }
      if (this.hasSelectionRange(focused)) {
        focused.setSelectionRange(selectionStart, selectionEnd);
      }
    },
    isFormInput(el) {
      return /^(?:input|select|textarea)$/i.test(el.tagName) && el.type !== "button";
    },
    syncAttrsToProps(el) {
      if (el instanceof HTMLInputElement && CHECKABLE_INPUTS.indexOf(el.type.toLocaleLowerCase()) >= 0) {
        el.checked = el.getAttribute("checked") !== null;
      }
    },
    syncPropsToAttrs(el) {
      if (el instanceof HTMLSelectElement) {
        let selectedItem = el.options.item(el.selectedIndex);
        if (selectedItem && selectedItem.getAttribute("selected") === null) {
          selectedItem.setAttribute("selected", "");
        }
      }
    },
    isTextualInput(el) {
      return FOCUSABLE_INPUTS.indexOf(el.type) >= 0;
    },
    isNowTriggerFormExternal(el, phxTriggerExternal) {
      return el.getAttribute && el.getAttribute(phxTriggerExternal) !== null;
    },
    syncPendingRef(fromEl, toEl, disableWith) {
      let ref = fromEl.getAttribute(PHX_REF);
      if (ref === null) {
        return true;
      }
      if (DOM.isFormInput(fromEl) || fromEl.getAttribute(disableWith) !== null) {
        if (DOM.isUploadInput(fromEl)) {
          DOM.mergeAttrs(fromEl, toEl, { isIgnored: true });
        }
        DOM.putPrivate(fromEl, PHX_REF, toEl);
        return false;
      } else {
        PHX_EVENT_CLASSES.forEach((className) => {
          fromEl.classList.contains(className) && toEl.classList.add(className);
        });
        toEl.setAttribute(PHX_REF, ref);
        return true;
      }
    },
    cleanChildNodes(container, phxUpdate) {
      if (DOM.isPhxUpdate(container, phxUpdate, ["append", "prepend"])) {
        let toRemove = [];
        container.childNodes.forEach((childNode) => {
          if (!childNode.id) {
            let isEmptyTextNode = childNode.nodeType === Node.TEXT_NODE && childNode.nodeValue.trim() === "";
            if (!isEmptyTextNode) {
              logError(`only HTML element tags with an id are allowed inside containers with phx-update.

removing illegal node: "${(childNode.outerHTML || childNode.nodeValue).trim()}"

`);
            }
            toRemove.push(childNode);
          }
        });
        toRemove.forEach((childNode) => childNode.remove());
      }
    },
    replaceRootContainer(container, tagName, attrs) {
      let retainedAttrs = /* @__PURE__ */ new Set(["id", PHX_SESSION, PHX_STATIC, PHX_MAIN]);
      if (container.tagName.toLowerCase() === tagName.toLowerCase()) {
        Array.from(container.attributes).filter((attr) => !retainedAttrs.has(attr.name.toLowerCase())).forEach((attr) => container.removeAttribute(attr.name));
        Object.keys(attrs).filter((name) => !retainedAttrs.has(name.toLowerCase())).forEach((attr) => container.setAttribute(attr, attrs[attr]));
        return container;
      } else {
        let newContainer = document.createElement(tagName);
        Object.keys(attrs).forEach((attr) => newContainer.setAttribute(attr, attrs[attr]));
        retainedAttrs.forEach((attr) => newContainer.setAttribute(attr, container.getAttribute(attr)));
        newContainer.innerHTML = container.innerHTML;
        container.replaceWith(newContainer);
        return newContainer;
      }
    }
  };
  var dom_default = DOM;
  var UploadEntry = class {
    static isActive(fileEl, file) {
      let isNew = file._phxRef === void 0;
      let activeRefs = fileEl.getAttribute(PHX_ACTIVE_ENTRY_REFS).split(",");
      let isActive = activeRefs.indexOf(LiveUploader.genFileRef(file)) >= 0;
      return file.size > 0 && (isNew || isActive);
    }
    static isPreflighted(fileEl, file) {
      let preflightedRefs = fileEl.getAttribute(PHX_PREFLIGHTED_REFS).split(",");
      let isPreflighted = preflightedRefs.indexOf(LiveUploader.genFileRef(file)) >= 0;
      return isPreflighted && this.isActive(fileEl, file);
    }
    constructor(fileEl, file, view) {
      this.ref = LiveUploader.genFileRef(file);
      this.fileEl = fileEl;
      this.file = file;
      this.view = view;
      this.meta = null;
      this._isCancelled = false;
      this._isDone = false;
      this._progress = 0;
      this._lastProgressSent = -1;
      this._onDone = function() {
      };
      this._onElUpdated = this.onElUpdated.bind(this);
      this.fileEl.addEventListener(PHX_LIVE_FILE_UPDATED, this._onElUpdated);
    }
    metadata() {
      return this.meta;
    }
    progress(progress) {
      this._progress = Math.floor(progress);
      if (this._progress > this._lastProgressSent) {
        if (this._progress >= 100) {
          this._progress = 100;
          this._lastProgressSent = 100;
          this._isDone = true;
          this.view.pushFileProgress(this.fileEl, this.ref, 100, () => {
            LiveUploader.untrackFile(this.fileEl, this.file);
            this._onDone();
          });
        } else {
          this._lastProgressSent = this._progress;
          this.view.pushFileProgress(this.fileEl, this.ref, this._progress);
        }
      }
    }
    cancel() {
      this._isCancelled = true;
      this._isDone = true;
      this._onDone();
    }
    isDone() {
      return this._isDone;
    }
    error(reason = "failed") {
      this.view.pushFileProgress(this.fileEl, this.ref, { error: reason });
      LiveUploader.clearFiles(this.fileEl);
    }
    onDone(callback) {
      this._onDone = () => {
        this.fileEl.removeEventListener(PHX_LIVE_FILE_UPDATED, this._onElUpdated);
        callback();
      };
    }
    onElUpdated() {
      let activeRefs = this.fileEl.getAttribute(PHX_ACTIVE_ENTRY_REFS).split(",");
      if (activeRefs.indexOf(this.ref) === -1) {
        this.cancel();
      }
    }
    toPreflightPayload() {
      return {
        last_modified: this.file.lastModified,
        name: this.file.name,
        size: this.file.size,
        type: this.file.type,
        ref: this.ref
      };
    }
    uploader(uploaders) {
      if (this.meta.uploader) {
        let callback = uploaders[this.meta.uploader] || logError(`no uploader configured for ${this.meta.uploader}`);
        return { name: this.meta.uploader, callback };
      } else {
        return { name: "channel", callback: channelUploader };
      }
    }
    zipPostFlight(resp) {
      this.meta = resp.entries[this.ref];
      if (!this.meta) {
        logError(`no preflight upload response returned with ref ${this.ref}`, { input: this.fileEl, response: resp });
      }
    }
  };
  var liveUploaderFileRef = 0;
  var LiveUploader = class {
    static genFileRef(file) {
      let ref = file._phxRef;
      if (ref !== void 0) {
        return ref;
      } else {
        file._phxRef = (liveUploaderFileRef++).toString();
        return file._phxRef;
      }
    }
    static getEntryDataURL(inputEl, ref, callback) {
      let file = this.activeFiles(inputEl).find((file2) => this.genFileRef(file2) === ref);
      callback(URL.createObjectURL(file));
    }
    static hasUploadsInProgress(formEl) {
      let active = 0;
      dom_default.findUploadInputs(formEl).forEach((input) => {
        if (input.getAttribute(PHX_PREFLIGHTED_REFS) !== input.getAttribute(PHX_DONE_REFS)) {
          active++;
        }
      });
      return active > 0;
    }
    static serializeUploads(inputEl) {
      let files = this.activeFiles(inputEl);
      let fileData = {};
      files.forEach((file) => {
        let entry = { path: inputEl.name };
        let uploadRef = inputEl.getAttribute(PHX_UPLOAD_REF);
        fileData[uploadRef] = fileData[uploadRef] || [];
        entry.ref = this.genFileRef(file);
        entry.name = file.name || entry.ref;
        entry.type = file.type;
        entry.size = file.size;
        fileData[uploadRef].push(entry);
      });
      return fileData;
    }
    static clearFiles(inputEl) {
      inputEl.value = null;
      inputEl.removeAttribute(PHX_UPLOAD_REF);
      dom_default.putPrivate(inputEl, "files", []);
    }
    static untrackFile(inputEl, file) {
      dom_default.putPrivate(inputEl, "files", dom_default.private(inputEl, "files").filter((f) => !Object.is(f, file)));
    }
    static trackFiles(inputEl, files) {
      if (inputEl.getAttribute("multiple") !== null) {
        let newFiles = files.filter((file) => !this.activeFiles(inputEl).find((f) => Object.is(f, file)));
        dom_default.putPrivate(inputEl, "files", this.activeFiles(inputEl).concat(newFiles));
        inputEl.value = null;
      } else {
        dom_default.putPrivate(inputEl, "files", files);
      }
    }
    static activeFileInputs(formEl) {
      let fileInputs = dom_default.findUploadInputs(formEl);
      return Array.from(fileInputs).filter((el) => el.files && this.activeFiles(el).length > 0);
    }
    static activeFiles(input) {
      return (dom_default.private(input, "files") || []).filter((f) => UploadEntry.isActive(input, f));
    }
    static inputsAwaitingPreflight(formEl) {
      let fileInputs = dom_default.findUploadInputs(formEl);
      return Array.from(fileInputs).filter((input) => this.filesAwaitingPreflight(input).length > 0);
    }
    static filesAwaitingPreflight(input) {
      return this.activeFiles(input).filter((f) => !UploadEntry.isPreflighted(input, f));
    }
    constructor(inputEl, view, onComplete) {
      this.view = view;
      this.onComplete = onComplete;
      this._entries = Array.from(LiveUploader.filesAwaitingPreflight(inputEl) || []).map((file) => new UploadEntry(inputEl, file, view));
      this.numEntriesInProgress = this._entries.length;
    }
    entries() {
      return this._entries;
    }
    initAdapterUpload(resp, onError, liveSocket2) {
      this._entries = this._entries.map((entry) => {
        entry.zipPostFlight(resp);
        entry.onDone(() => {
          this.numEntriesInProgress--;
          if (this.numEntriesInProgress === 0) {
            this.onComplete();
          }
        });
        return entry;
      });
      let groupedEntries = this._entries.reduce((acc, entry) => {
        let { name, callback } = entry.uploader(liveSocket2.uploaders);
        acc[name] = acc[name] || { callback, entries: [] };
        acc[name].entries.push(entry);
        return acc;
      }, {});
      for (let name in groupedEntries) {
        let { callback, entries } = groupedEntries[name];
        callback(entries, onError, resp, liveSocket2);
      }
    }
  };
  var Hooks = {
    LiveFileUpload: {
      activeRefs() {
        return this.el.getAttribute(PHX_ACTIVE_ENTRY_REFS);
      },
      preflightedRefs() {
        return this.el.getAttribute(PHX_PREFLIGHTED_REFS);
      },
      mounted() {
        this.preflightedWas = this.preflightedRefs();
      },
      updated() {
        let newPreflights = this.preflightedRefs();
        if (this.preflightedWas !== newPreflights) {
          this.preflightedWas = newPreflights;
          if (newPreflights === "") {
            this.__view.cancelSubmit(this.el.form);
          }
        }
        if (this.activeRefs() === "") {
          this.el.value = null;
        }
        this.el.dispatchEvent(new CustomEvent(PHX_LIVE_FILE_UPDATED));
      }
    },
    LiveImgPreview: {
      mounted() {
        this.ref = this.el.getAttribute("data-phx-entry-ref");
        this.inputEl = document.getElementById(this.el.getAttribute(PHX_UPLOAD_REF));
        LiveUploader.getEntryDataURL(this.inputEl, this.ref, (url) => {
          this.url = url;
          this.el.src = url;
        });
      },
      destroyed() {
        URL.revokeObjectURL(this.url);
      }
    }
  };
  var hooks_default = Hooks;
  var DOMPostMorphRestorer = class {
    constructor(containerBefore, containerAfter, updateType) {
      let idsBefore = /* @__PURE__ */ new Set();
      let idsAfter = new Set([...containerAfter.children].map((child) => child.id));
      let elementsToModify = [];
      Array.from(containerBefore.children).forEach((child) => {
        if (child.id) {
          idsBefore.add(child.id);
          if (idsAfter.has(child.id)) {
            let previousElementId = child.previousElementSibling && child.previousElementSibling.id;
            elementsToModify.push({ elementId: child.id, previousElementId });
          }
        }
      });
      this.containerId = containerAfter.id;
      this.updateType = updateType;
      this.elementsToModify = elementsToModify;
      this.elementIdsToAdd = [...idsAfter].filter((id) => !idsBefore.has(id));
    }
    perform() {
      let container = dom_default.byId(this.containerId);
      this.elementsToModify.forEach((elementToModify) => {
        if (elementToModify.previousElementId) {
          maybe(document.getElementById(elementToModify.previousElementId), (previousElem) => {
            maybe(document.getElementById(elementToModify.elementId), (elem) => {
              let isInRightPlace = elem.previousElementSibling && elem.previousElementSibling.id == previousElem.id;
              if (!isInRightPlace) {
                previousElem.insertAdjacentElement("afterend", elem);
              }
            });
          });
        } else {
          maybe(document.getElementById(elementToModify.elementId), (elem) => {
            let isInRightPlace = elem.previousElementSibling == null;
            if (!isInRightPlace) {
              container.insertAdjacentElement("afterbegin", elem);
            }
          });
        }
      });
      if (this.updateType == "prepend") {
        this.elementIdsToAdd.reverse().forEach((elemId) => {
          maybe(document.getElementById(elemId), (elem) => container.insertAdjacentElement("afterbegin", elem));
        });
      }
    }
  };
  var DOCUMENT_FRAGMENT_NODE = 11;
  function morphAttrs(fromNode, toNode) {
    var toNodeAttrs = toNode.attributes;
    var attr;
    var attrName;
    var attrNamespaceURI;
    var attrValue;
    var fromValue;
    if (toNode.nodeType === DOCUMENT_FRAGMENT_NODE || fromNode.nodeType === DOCUMENT_FRAGMENT_NODE) {
      return;
    }
    for (var i = toNodeAttrs.length - 1; i >= 0; i--) {
      attr = toNodeAttrs[i];
      attrName = attr.name;
      attrNamespaceURI = attr.namespaceURI;
      attrValue = attr.value;
      if (attrNamespaceURI) {
        attrName = attr.localName || attrName;
        fromValue = fromNode.getAttributeNS(attrNamespaceURI, attrName);
        if (fromValue !== attrValue) {
          if (attr.prefix === "xmlns") {
            attrName = attr.name;
          }
          fromNode.setAttributeNS(attrNamespaceURI, attrName, attrValue);
        }
      } else {
        fromValue = fromNode.getAttribute(attrName);
        if (fromValue !== attrValue) {
          fromNode.setAttribute(attrName, attrValue);
        }
      }
    }
    var fromNodeAttrs = fromNode.attributes;
    for (var d = fromNodeAttrs.length - 1; d >= 0; d--) {
      attr = fromNodeAttrs[d];
      attrName = attr.name;
      attrNamespaceURI = attr.namespaceURI;
      if (attrNamespaceURI) {
        attrName = attr.localName || attrName;
        if (!toNode.hasAttributeNS(attrNamespaceURI, attrName)) {
          fromNode.removeAttributeNS(attrNamespaceURI, attrName);
        }
      } else {
        if (!toNode.hasAttribute(attrName)) {
          fromNode.removeAttribute(attrName);
        }
      }
    }
  }
  var range;
  var NS_XHTML = "http://www.w3.org/1999/xhtml";
  var doc = typeof document === "undefined" ? void 0 : document;
  var HAS_TEMPLATE_SUPPORT = !!doc && "content" in doc.createElement("template");
  var HAS_RANGE_SUPPORT = !!doc && doc.createRange && "createContextualFragment" in doc.createRange();
  function createFragmentFromTemplate(str) {
    var template = doc.createElement("template");
    template.innerHTML = str;
    return template.content.childNodes[0];
  }
  function createFragmentFromRange(str) {
    if (!range) {
      range = doc.createRange();
      range.selectNode(doc.body);
    }
    var fragment = range.createContextualFragment(str);
    return fragment.childNodes[0];
  }
  function createFragmentFromWrap(str) {
    var fragment = doc.createElement("body");
    fragment.innerHTML = str;
    return fragment.childNodes[0];
  }
  function toElement(str) {
    str = str.trim();
    if (HAS_TEMPLATE_SUPPORT) {
      return createFragmentFromTemplate(str);
    } else if (HAS_RANGE_SUPPORT) {
      return createFragmentFromRange(str);
    }
    return createFragmentFromWrap(str);
  }
  function compareNodeNames(fromEl, toEl) {
    var fromNodeName = fromEl.nodeName;
    var toNodeName = toEl.nodeName;
    var fromCodeStart, toCodeStart;
    if (fromNodeName === toNodeName) {
      return true;
    }
    fromCodeStart = fromNodeName.charCodeAt(0);
    toCodeStart = toNodeName.charCodeAt(0);
    if (fromCodeStart <= 90 && toCodeStart >= 97) {
      return fromNodeName === toNodeName.toUpperCase();
    } else if (toCodeStart <= 90 && fromCodeStart >= 97) {
      return toNodeName === fromNodeName.toUpperCase();
    } else {
      return false;
    }
  }
  function createElementNS(name, namespaceURI) {
    return !namespaceURI || namespaceURI === NS_XHTML ? doc.createElement(name) : doc.createElementNS(namespaceURI, name);
  }
  function moveChildren(fromEl, toEl) {
    var curChild = fromEl.firstChild;
    while (curChild) {
      var nextChild = curChild.nextSibling;
      toEl.appendChild(curChild);
      curChild = nextChild;
    }
    return toEl;
  }
  function syncBooleanAttrProp(fromEl, toEl, name) {
    if (fromEl[name] !== toEl[name]) {
      fromEl[name] = toEl[name];
      if (fromEl[name]) {
        fromEl.setAttribute(name, "");
      } else {
        fromEl.removeAttribute(name);
      }
    }
  }
  var specialElHandlers = {
    OPTION: function(fromEl, toEl) {
      var parentNode = fromEl.parentNode;
      if (parentNode) {
        var parentName = parentNode.nodeName.toUpperCase();
        if (parentName === "OPTGROUP") {
          parentNode = parentNode.parentNode;
          parentName = parentNode && parentNode.nodeName.toUpperCase();
        }
        if (parentName === "SELECT" && !parentNode.hasAttribute("multiple")) {
          if (fromEl.hasAttribute("selected") && !toEl.selected) {
            fromEl.setAttribute("selected", "selected");
            fromEl.removeAttribute("selected");
          }
          parentNode.selectedIndex = -1;
        }
      }
      syncBooleanAttrProp(fromEl, toEl, "selected");
    },
    INPUT: function(fromEl, toEl) {
      syncBooleanAttrProp(fromEl, toEl, "checked");
      syncBooleanAttrProp(fromEl, toEl, "disabled");
      if (fromEl.value !== toEl.value) {
        fromEl.value = toEl.value;
      }
      if (!toEl.hasAttribute("value")) {
        fromEl.removeAttribute("value");
      }
    },
    TEXTAREA: function(fromEl, toEl) {
      var newValue = toEl.value;
      if (fromEl.value !== newValue) {
        fromEl.value = newValue;
      }
      var firstChild = fromEl.firstChild;
      if (firstChild) {
        var oldValue = firstChild.nodeValue;
        if (oldValue == newValue || !newValue && oldValue == fromEl.placeholder) {
          return;
        }
        firstChild.nodeValue = newValue;
      }
    },
    SELECT: function(fromEl, toEl) {
      if (!toEl.hasAttribute("multiple")) {
        var selectedIndex = -1;
        var i = 0;
        var curChild = fromEl.firstChild;
        var optgroup;
        var nodeName;
        while (curChild) {
          nodeName = curChild.nodeName && curChild.nodeName.toUpperCase();
          if (nodeName === "OPTGROUP") {
            optgroup = curChild;
            curChild = optgroup.firstChild;
          } else {
            if (nodeName === "OPTION") {
              if (curChild.hasAttribute("selected")) {
                selectedIndex = i;
                break;
              }
              i++;
            }
            curChild = curChild.nextSibling;
            if (!curChild && optgroup) {
              curChild = optgroup.nextSibling;
              optgroup = null;
            }
          }
        }
        fromEl.selectedIndex = selectedIndex;
      }
    }
  };
  var ELEMENT_NODE = 1;
  var DOCUMENT_FRAGMENT_NODE$1 = 11;
  var TEXT_NODE = 3;
  var COMMENT_NODE = 8;
  function noop() {
  }
  function defaultGetNodeKey(node) {
    if (node) {
      return node.getAttribute && node.getAttribute("id") || node.id;
    }
  }
  function morphdomFactory(morphAttrs2) {
    return function morphdom2(fromNode, toNode, options) {
      if (!options) {
        options = {};
      }
      if (typeof toNode === "string") {
        if (fromNode.nodeName === "#document" || fromNode.nodeName === "HTML" || fromNode.nodeName === "BODY") {
          var toNodeHtml = toNode;
          toNode = doc.createElement("html");
          toNode.innerHTML = toNodeHtml;
        } else {
          toNode = toElement(toNode);
        }
      }
      var getNodeKey = options.getNodeKey || defaultGetNodeKey;
      var onBeforeNodeAdded = options.onBeforeNodeAdded || noop;
      var onNodeAdded = options.onNodeAdded || noop;
      var onBeforeElUpdated = options.onBeforeElUpdated || noop;
      var onElUpdated = options.onElUpdated || noop;
      var onBeforeNodeDiscarded = options.onBeforeNodeDiscarded || noop;
      var onNodeDiscarded = options.onNodeDiscarded || noop;
      var onBeforeElChildrenUpdated = options.onBeforeElChildrenUpdated || noop;
      var childrenOnly = options.childrenOnly === true;
      var fromNodesLookup = Object.create(null);
      var keyedRemovalList = [];
      function addKeyedRemoval(key) {
        keyedRemovalList.push(key);
      }
      function walkDiscardedChildNodes(node, skipKeyedNodes) {
        if (node.nodeType === ELEMENT_NODE) {
          var curChild = node.firstChild;
          while (curChild) {
            var key = void 0;
            if (skipKeyedNodes && (key = getNodeKey(curChild))) {
              addKeyedRemoval(key);
            } else {
              onNodeDiscarded(curChild);
              if (curChild.firstChild) {
                walkDiscardedChildNodes(curChild, skipKeyedNodes);
              }
            }
            curChild = curChild.nextSibling;
          }
        }
      }
      function removeNode(node, parentNode, skipKeyedNodes) {
        if (onBeforeNodeDiscarded(node) === false) {
          return;
        }
        if (parentNode) {
          parentNode.removeChild(node);
        }
        onNodeDiscarded(node);
        walkDiscardedChildNodes(node, skipKeyedNodes);
      }
      function indexTree(node) {
        if (node.nodeType === ELEMENT_NODE || node.nodeType === DOCUMENT_FRAGMENT_NODE$1) {
          var curChild = node.firstChild;
          while (curChild) {
            var key = getNodeKey(curChild);
            if (key) {
              fromNodesLookup[key] = curChild;
            }
            indexTree(curChild);
            curChild = curChild.nextSibling;
          }
        }
      }
      indexTree(fromNode);
      function handleNodeAdded(el) {
        onNodeAdded(el);
        var curChild = el.firstChild;
        while (curChild) {
          var nextSibling = curChild.nextSibling;
          var key = getNodeKey(curChild);
          if (key) {
            var unmatchedFromEl = fromNodesLookup[key];
            if (unmatchedFromEl && compareNodeNames(curChild, unmatchedFromEl)) {
              curChild.parentNode.replaceChild(unmatchedFromEl, curChild);
              morphEl(unmatchedFromEl, curChild);
            } else {
              handleNodeAdded(curChild);
            }
          } else {
            handleNodeAdded(curChild);
          }
          curChild = nextSibling;
        }
      }
      function cleanupFromEl(fromEl, curFromNodeChild, curFromNodeKey) {
        while (curFromNodeChild) {
          var fromNextSibling = curFromNodeChild.nextSibling;
          if (curFromNodeKey = getNodeKey(curFromNodeChild)) {
            addKeyedRemoval(curFromNodeKey);
          } else {
            removeNode(curFromNodeChild, fromEl, true);
          }
          curFromNodeChild = fromNextSibling;
        }
      }
      function morphEl(fromEl, toEl, childrenOnly2) {
        var toElKey = getNodeKey(toEl);
        if (toElKey) {
          delete fromNodesLookup[toElKey];
        }
        if (!childrenOnly2) {
          if (onBeforeElUpdated(fromEl, toEl) === false) {
            return;
          }
          morphAttrs2(fromEl, toEl);
          onElUpdated(fromEl);
          if (onBeforeElChildrenUpdated(fromEl, toEl) === false) {
            return;
          }
        }
        if (fromEl.nodeName !== "TEXTAREA") {
          morphChildren(fromEl, toEl);
        } else {
          specialElHandlers.TEXTAREA(fromEl, toEl);
        }
      }
      function morphChildren(fromEl, toEl) {
        var curToNodeChild = toEl.firstChild;
        var curFromNodeChild = fromEl.firstChild;
        var curToNodeKey;
        var curFromNodeKey;
        var fromNextSibling;
        var toNextSibling;
        var matchingFromEl;
        outer:
          while (curToNodeChild) {
            toNextSibling = curToNodeChild.nextSibling;
            curToNodeKey = getNodeKey(curToNodeChild);
            while (curFromNodeChild) {
              fromNextSibling = curFromNodeChild.nextSibling;
              if (curToNodeChild.isSameNode && curToNodeChild.isSameNode(curFromNodeChild)) {
                curToNodeChild = toNextSibling;
                curFromNodeChild = fromNextSibling;
                continue outer;
              }
              curFromNodeKey = getNodeKey(curFromNodeChild);
              var curFromNodeType = curFromNodeChild.nodeType;
              var isCompatible = void 0;
              if (curFromNodeType === curToNodeChild.nodeType) {
                if (curFromNodeType === ELEMENT_NODE) {
                  if (curToNodeKey) {
                    if (curToNodeKey !== curFromNodeKey) {
                      if (matchingFromEl = fromNodesLookup[curToNodeKey]) {
                        if (fromNextSibling === matchingFromEl) {
                          isCompatible = false;
                        } else {
                          fromEl.insertBefore(matchingFromEl, curFromNodeChild);
                          if (curFromNodeKey) {
                            addKeyedRemoval(curFromNodeKey);
                          } else {
                            removeNode(curFromNodeChild, fromEl, true);
                          }
                          curFromNodeChild = matchingFromEl;
                        }
                      } else {
                        isCompatible = false;
                      }
                    }
                  } else if (curFromNodeKey) {
                    isCompatible = false;
                  }
                  isCompatible = isCompatible !== false && compareNodeNames(curFromNodeChild, curToNodeChild);
                  if (isCompatible) {
                    morphEl(curFromNodeChild, curToNodeChild);
                  }
                } else if (curFromNodeType === TEXT_NODE || curFromNodeType == COMMENT_NODE) {
                  isCompatible = true;
                  if (curFromNodeChild.nodeValue !== curToNodeChild.nodeValue) {
                    curFromNodeChild.nodeValue = curToNodeChild.nodeValue;
                  }
                }
              }
              if (isCompatible) {
                curToNodeChild = toNextSibling;
                curFromNodeChild = fromNextSibling;
                continue outer;
              }
              if (curFromNodeKey) {
                addKeyedRemoval(curFromNodeKey);
              } else {
                removeNode(curFromNodeChild, fromEl, true);
              }
              curFromNodeChild = fromNextSibling;
            }
            if (curToNodeKey && (matchingFromEl = fromNodesLookup[curToNodeKey]) && compareNodeNames(matchingFromEl, curToNodeChild)) {
              fromEl.appendChild(matchingFromEl);
              morphEl(matchingFromEl, curToNodeChild);
            } else {
              var onBeforeNodeAddedResult = onBeforeNodeAdded(curToNodeChild);
              if (onBeforeNodeAddedResult !== false) {
                if (onBeforeNodeAddedResult) {
                  curToNodeChild = onBeforeNodeAddedResult;
                }
                if (curToNodeChild.actualize) {
                  curToNodeChild = curToNodeChild.actualize(fromEl.ownerDocument || doc);
                }
                fromEl.appendChild(curToNodeChild);
                handleNodeAdded(curToNodeChild);
              }
            }
            curToNodeChild = toNextSibling;
            curFromNodeChild = fromNextSibling;
          }
        cleanupFromEl(fromEl, curFromNodeChild, curFromNodeKey);
        var specialElHandler = specialElHandlers[fromEl.nodeName];
        if (specialElHandler) {
          specialElHandler(fromEl, toEl);
        }
      }
      var morphedNode = fromNode;
      var morphedNodeType = morphedNode.nodeType;
      var toNodeType = toNode.nodeType;
      if (!childrenOnly) {
        if (morphedNodeType === ELEMENT_NODE) {
          if (toNodeType === ELEMENT_NODE) {
            if (!compareNodeNames(fromNode, toNode)) {
              onNodeDiscarded(fromNode);
              morphedNode = moveChildren(fromNode, createElementNS(toNode.nodeName, toNode.namespaceURI));
            }
          } else {
            morphedNode = toNode;
          }
        } else if (morphedNodeType === TEXT_NODE || morphedNodeType === COMMENT_NODE) {
          if (toNodeType === morphedNodeType) {
            if (morphedNode.nodeValue !== toNode.nodeValue) {
              morphedNode.nodeValue = toNode.nodeValue;
            }
            return morphedNode;
          } else {
            morphedNode = toNode;
          }
        }
      }
      if (morphedNode === toNode) {
        onNodeDiscarded(fromNode);
      } else {
        if (toNode.isSameNode && toNode.isSameNode(morphedNode)) {
          return;
        }
        morphEl(morphedNode, toNode, childrenOnly);
        if (keyedRemovalList) {
          for (var i = 0, len = keyedRemovalList.length; i < len; i++) {
            var elToRemove = fromNodesLookup[keyedRemovalList[i]];
            if (elToRemove) {
              removeNode(elToRemove, elToRemove.parentNode, false);
            }
          }
        }
      }
      if (!childrenOnly && morphedNode !== fromNode && fromNode.parentNode) {
        if (morphedNode.actualize) {
          morphedNode = morphedNode.actualize(fromNode.ownerDocument || doc);
        }
        fromNode.parentNode.replaceChild(morphedNode, fromNode);
      }
      return morphedNode;
    };
  }
  var morphdom = morphdomFactory(morphAttrs);
  var morphdom_esm_default = morphdom;
  var DOMPatch = class {
    static patchEl(fromEl, toEl, activeElement) {
      morphdom_esm_default(fromEl, toEl, {
        childrenOnly: false,
        onBeforeElUpdated: (fromEl2, toEl2) => {
          if (activeElement && activeElement.isSameNode(fromEl2) && dom_default.isFormInput(fromEl2)) {
            dom_default.mergeFocusedInput(fromEl2, toEl2);
            return false;
          }
        }
      });
    }
    constructor(view, container, id, html, targetCID) {
      this.view = view;
      this.liveSocket = view.liveSocket;
      this.container = container;
      this.id = id;
      this.rootID = view.root.id;
      this.html = html;
      this.targetCID = targetCID;
      this.cidPatch = isCid(this.targetCID);
      this.callbacks = {
        beforeadded: [],
        beforeupdated: [],
        beforephxChildAdded: [],
        afteradded: [],
        afterupdated: [],
        afterdiscarded: [],
        afterphxChildAdded: []
      };
    }
    before(kind, callback) {
      this.callbacks[`before${kind}`].push(callback);
    }
    after(kind, callback) {
      this.callbacks[`after${kind}`].push(callback);
    }
    trackBefore(kind, ...args) {
      this.callbacks[`before${kind}`].forEach((callback) => callback(...args));
    }
    trackAfter(kind, ...args) {
      this.callbacks[`after${kind}`].forEach((callback) => callback(...args));
    }
    markPrunableContentForRemoval() {
      dom_default.all(this.container, "[phx-update=append] > *, [phx-update=prepend] > *", (el) => {
        el.setAttribute(PHX_REMOVE, "");
      });
    }
    perform() {
      let { view, liveSocket: liveSocket2, container, html } = this;
      let targetContainer = this.isCIDPatch() ? this.targetCIDContainer(html) : container;
      if (this.isCIDPatch() && !targetContainer) {
        return;
      }
      let focused = liveSocket2.getActiveElement();
      let { selectionStart, selectionEnd } = focused && dom_default.hasSelectionRange(focused) ? focused : {};
      let phxUpdate = liveSocket2.binding(PHX_UPDATE);
      let phxFeedbackFor = liveSocket2.binding(PHX_FEEDBACK_FOR);
      let disableWith = liveSocket2.binding(PHX_DISABLE_WITH);
      let phxTriggerExternal = liveSocket2.binding(PHX_TRIGGER_ACTION);
      let added = [];
      let updates = [];
      let appendPrependUpdates = [];
      let externalFormTriggered = null;
      let diffHTML = liveSocket2.time("premorph container prep", () => {
        return this.buildDiffHTML(container, html, phxUpdate, targetContainer);
      });
      this.trackBefore("added", container);
      this.trackBefore("updated", container, container);
      liveSocket2.time("morphdom", () => {
        morphdom_esm_default(targetContainer, diffHTML, {
          childrenOnly: targetContainer.getAttribute(PHX_COMPONENT) === null,
          getNodeKey: (node) => {
            return dom_default.isPhxDestroyed(node) ? null : node.id;
          },
          onBeforeNodeAdded: (el) => {
            this.trackBefore("added", el);
            return el;
          },
          onNodeAdded: (el) => {
            if (dom_default.isNowTriggerFormExternal(el, phxTriggerExternal)) {
              externalFormTriggered = el;
            }
            dom_default.discardError(targetContainer, el, phxFeedbackFor);
            if (dom_default.isPhxChild(el) && view.ownsElement(el)) {
              this.trackAfter("phxChildAdded", el);
            }
            added.push(el);
          },
          onNodeDiscarded: (el) => {
            if (dom_default.isPhxChild(el)) {
              liveSocket2.destroyViewByEl(el);
            }
            this.trackAfter("discarded", el);
          },
          onBeforeNodeDiscarded: (el) => {
            if (el.getAttribute && el.getAttribute(PHX_REMOVE) !== null) {
              return true;
            }
            if (el.parentNode !== null && dom_default.isPhxUpdate(el.parentNode, phxUpdate, ["append", "prepend"]) && el.id) {
              return false;
            }
            if (this.skipCIDSibling(el)) {
              return false;
            }
            return true;
          },
          onElUpdated: (el) => {
            if (dom_default.isNowTriggerFormExternal(el, phxTriggerExternal)) {
              externalFormTriggered = el;
            }
            updates.push(el);
          },
          onBeforeElUpdated: (fromEl, toEl) => {
            dom_default.cleanChildNodes(toEl, phxUpdate);
            if (this.skipCIDSibling(toEl)) {
              return false;
            }
            if (dom_default.isIgnored(fromEl, phxUpdate)) {
              this.trackBefore("updated", fromEl, toEl);
              dom_default.mergeAttrs(fromEl, toEl, { isIgnored: true });
              updates.push(fromEl);
              return false;
            }
            if (fromEl.type === "number" && (fromEl.validity && fromEl.validity.badInput)) {
              return false;
            }
            if (!dom_default.syncPendingRef(fromEl, toEl, disableWith)) {
              if (dom_default.isUploadInput(fromEl)) {
                this.trackBefore("updated", fromEl, toEl);
                updates.push(fromEl);
              }
              return false;
            }
            if (dom_default.isPhxChild(toEl)) {
              let prevSession = fromEl.getAttribute(PHX_SESSION);
              dom_default.mergeAttrs(fromEl, toEl, { exclude: [PHX_STATIC] });
              if (prevSession !== "") {
                fromEl.setAttribute(PHX_SESSION, prevSession);
              }
              fromEl.setAttribute(PHX_ROOT_ID, this.rootID);
              return false;
            }
            dom_default.copyPrivates(toEl, fromEl);
            dom_default.discardError(targetContainer, toEl, phxFeedbackFor);
            dom_default.syncPropsToAttrs(toEl);
            let isFocusedFormEl = focused && fromEl.isSameNode(focused) && dom_default.isFormInput(fromEl);
            if (isFocusedFormEl && !this.forceFocusedSelectUpdate(fromEl, toEl)) {
              this.trackBefore("updated", fromEl, toEl);
              dom_default.mergeFocusedInput(fromEl, toEl);
              dom_default.syncAttrsToProps(fromEl);
              updates.push(fromEl);
              return false;
            } else {
              if (dom_default.isPhxUpdate(toEl, phxUpdate, ["append", "prepend"])) {
                appendPrependUpdates.push(new DOMPostMorphRestorer(fromEl, toEl, toEl.getAttribute(phxUpdate)));
              }
              dom_default.syncAttrsToProps(toEl);
              this.trackBefore("updated", fromEl, toEl);
              return true;
            }
          }
        });
      });
      if (liveSocket2.isDebugEnabled()) {
        detectDuplicateIds();
      }
      if (appendPrependUpdates.length > 0) {
        liveSocket2.time("post-morph append/prepend restoration", () => {
          appendPrependUpdates.forEach((update) => update.perform());
        });
      }
      liveSocket2.silenceEvents(() => dom_default.restoreFocus(focused, selectionStart, selectionEnd));
      dom_default.dispatchEvent(document, "phx:update");
      added.forEach((el) => this.trackAfter("added", el));
      updates.forEach((el) => this.trackAfter("updated", el));
      if (externalFormTriggered) {
        liveSocket2.disconnect();
        externalFormTriggered.submit();
      }
      return true;
    }
    forceFocusedSelectUpdate(fromEl, toEl) {
      let isSelect = ["select", "select-one", "select-multiple"].find((t) => t === fromEl.type);
      return fromEl.multiple === true || isSelect && fromEl.innerHTML != toEl.innerHTML;
    }
    isCIDPatch() {
      return this.cidPatch;
    }
    skipCIDSibling(el) {
      return el.nodeType === Node.ELEMENT_NODE && el.getAttribute(PHX_SKIP) !== null;
    }
    targetCIDContainer(html) {
      if (!this.isCIDPatch()) {
        return;
      }
      let [first, ...rest] = dom_default.findComponentNodeList(this.container, this.targetCID);
      if (rest.length === 0 && dom_default.childNodeLength(html) === 1) {
        return first;
      } else {
        return first && first.parentNode;
      }
    }
    buildDiffHTML(container, html, phxUpdate, targetContainer) {
      let isCIDPatch = this.isCIDPatch();
      let isCIDWithSingleRoot = isCIDPatch && targetContainer.getAttribute(PHX_COMPONENT) === this.targetCID.toString();
      if (!isCIDPatch || isCIDWithSingleRoot) {
        return html;
      } else {
        let diffContainer = null;
        let template = document.createElement("template");
        diffContainer = dom_default.cloneNode(targetContainer);
        let [firstComponent, ...rest] = dom_default.findComponentNodeList(diffContainer, this.targetCID);
        template.innerHTML = html;
        rest.forEach((el) => el.remove());
        Array.from(diffContainer.childNodes).forEach((child) => {
          if (child.id && child.nodeType === Node.ELEMENT_NODE && child.getAttribute(PHX_COMPONENT) !== this.targetCID.toString()) {
            child.setAttribute(PHX_SKIP, "");
            child.innerHTML = "";
          }
        });
        Array.from(template.content.childNodes).forEach((el) => diffContainer.insertBefore(el, firstComponent));
        firstComponent.remove();
        return diffContainer.outerHTML;
      }
    }
  };
  var Rendered = class {
    static extract(diff) {
      let { [REPLY]: reply, [EVENTS]: events, [TITLE]: title } = diff;
      delete diff[REPLY];
      delete diff[EVENTS];
      delete diff[TITLE];
      return { diff, title, reply: reply || null, events: events || [] };
    }
    constructor(viewId, rendered) {
      this.viewId = viewId;
      this.rendered = {};
      this.mergeDiff(rendered);
    }
    parentViewId() {
      return this.viewId;
    }
    toString(onlyCids) {
      return this.recursiveToString(this.rendered, this.rendered[COMPONENTS], onlyCids);
    }
    recursiveToString(rendered, components = rendered[COMPONENTS], onlyCids) {
      onlyCids = onlyCids ? new Set(onlyCids) : null;
      let output = { buffer: "", components, onlyCids };
      this.toOutputBuffer(rendered, output);
      return output.buffer;
    }
    componentCIDs(diff) {
      return Object.keys(diff[COMPONENTS] || {}).map((i) => parseInt(i));
    }
    isComponentOnlyDiff(diff) {
      if (!diff[COMPONENTS]) {
        return false;
      }
      return Object.keys(diff).length === 1;
    }
    getComponent(diff, cid) {
      return diff[COMPONENTS][cid];
    }
    mergeDiff(diff) {
      let newc = diff[COMPONENTS];
      let cache = {};
      delete diff[COMPONENTS];
      this.rendered = this.mutableMerge(this.rendered, diff);
      this.rendered[COMPONENTS] = this.rendered[COMPONENTS] || {};
      if (newc) {
        let oldc = this.rendered[COMPONENTS];
        for (let cid in newc) {
          newc[cid] = this.cachedFindComponent(cid, newc[cid], oldc, newc, cache);
        }
        for (var key in newc) {
          oldc[key] = newc[key];
        }
        diff[COMPONENTS] = newc;
      }
    }
    cachedFindComponent(cid, cdiff, oldc, newc, cache) {
      if (cache[cid]) {
        return cache[cid];
      } else {
        let ndiff, stat, scid = cdiff[STATIC];
        if (isCid(scid)) {
          let tdiff;
          if (scid > 0) {
            tdiff = this.cachedFindComponent(scid, newc[scid], oldc, newc, cache);
          } else {
            tdiff = oldc[-scid];
          }
          stat = tdiff[STATIC];
          ndiff = this.cloneMerge(tdiff, cdiff);
          ndiff[STATIC] = stat;
        } else {
          ndiff = cdiff[STATIC] !== void 0 ? cdiff : this.cloneMerge(oldc[cid] || {}, cdiff);
        }
        cache[cid] = ndiff;
        return ndiff;
      }
    }
    mutableMerge(target, source) {
      if (source[STATIC] !== void 0) {
        return source;
      } else {
        this.doMutableMerge(target, source);
        return target;
      }
    }
    doMutableMerge(target, source) {
      for (let key in source) {
        let val = source[key];
        let targetVal = target[key];
        if (isObject(val) && val[STATIC] === void 0 && isObject(targetVal)) {
          this.doMutableMerge(targetVal, val);
        } else {
          target[key] = val;
        }
      }
    }
    cloneMerge(target, source) {
      let merged = __spreadValues(__spreadValues({}, target), source);
      for (let key in merged) {
        let val = source[key];
        let targetVal = target[key];
        if (isObject(val) && val[STATIC] === void 0 && isObject(targetVal)) {
          merged[key] = this.cloneMerge(targetVal, val);
        }
      }
      return merged;
    }
    componentToString(cid) {
      return this.recursiveCIDToString(this.rendered[COMPONENTS], cid);
    }
    pruneCIDs(cids) {
      cids.forEach((cid) => delete this.rendered[COMPONENTS][cid]);
    }
    get() {
      return this.rendered;
    }
    isNewFingerprint(diff = {}) {
      return !!diff[STATIC];
    }
    toOutputBuffer(rendered, output) {
      if (rendered[DYNAMICS]) {
        return this.comprehensionToBuffer(rendered, output);
      }
      let { [STATIC]: statics } = rendered;
      output.buffer += statics[0];
      for (let i = 1; i < statics.length; i++) {
        this.dynamicToBuffer(rendered[i - 1], output);
        output.buffer += statics[i];
      }
    }
    comprehensionToBuffer(rendered, output) {
      let { [DYNAMICS]: dynamics, [STATIC]: statics } = rendered;
      for (let d = 0; d < dynamics.length; d++) {
        let dynamic = dynamics[d];
        output.buffer += statics[0];
        for (let i = 1; i < statics.length; i++) {
          this.dynamicToBuffer(dynamic[i - 1], output);
          output.buffer += statics[i];
        }
      }
    }
    dynamicToBuffer(rendered, output) {
      if (typeof rendered === "number") {
        output.buffer += this.recursiveCIDToString(output.components, rendered, output.onlyCids);
      } else if (isObject(rendered)) {
        this.toOutputBuffer(rendered, output);
      } else {
        output.buffer += rendered;
      }
    }
    recursiveCIDToString(components, cid, onlyCids) {
      let component = components[cid] || logError(`no component for CID ${cid}`, components);
      let template = document.createElement("template");
      template.innerHTML = this.recursiveToString(component, components, onlyCids);
      let container = template.content;
      let skip = onlyCids && !onlyCids.has(cid);
      let [hasChildNodes, hasChildComponents] = Array.from(container.childNodes).reduce(([hasNodes, hasComponents], child, i) => {
        if (child.nodeType === Node.ELEMENT_NODE) {
          if (child.getAttribute(PHX_COMPONENT)) {
            return [hasNodes, true];
          }
          child.setAttribute(PHX_COMPONENT, cid);
          if (!child.id) {
            child.id = `${this.parentViewId()}-${cid}-${i}`;
          }
          if (skip) {
            child.setAttribute(PHX_SKIP, "");
            child.innerHTML = "";
          }
          return [true, hasComponents];
        } else {
          if (child.nodeValue.trim() !== "") {
            logError(`only HTML element tags are allowed at the root of components.

got: "${child.nodeValue.trim()}"

within:
`, template.innerHTML.trim());
            child.replaceWith(this.createSpan(child.nodeValue, cid));
            return [true, hasComponents];
          } else {
            child.remove();
            return [hasNodes, hasComponents];
          }
        }
      }, [false, false]);
      if (!hasChildNodes && !hasChildComponents) {
        logError("expected at least one HTML element tag inside a component, but the component is empty:\n", template.innerHTML.trim());
        return this.createSpan("", cid).outerHTML;
      } else if (!hasChildNodes && hasChildComponents) {
        logError("expected at least one HTML element tag directly inside a component, but only subcomponents were found. A component must render at least one HTML tag directly inside itself.", template.innerHTML.trim());
        return template.innerHTML;
      } else {
        return template.innerHTML;
      }
    }
    createSpan(text, cid) {
      let span = document.createElement("span");
      span.innerText = text;
      span.setAttribute(PHX_COMPONENT, cid);
      return span;
    }
  };
  var viewHookID = 1;
  var ViewHook = class {
    static makeID() {
      return viewHookID++;
    }
    static elementID(el) {
      return el.phxHookId;
    }
    constructor(view, el, callbacks) {
      this.__view = view;
      this.__liveSocket = view.liveSocket;
      this.__callbacks = callbacks;
      this.__listeners = /* @__PURE__ */ new Set();
      this.__isDisconnected = false;
      this.el = el;
      this.el.phxHookId = this.constructor.makeID();
      for (let key in this.__callbacks) {
        this[key] = this.__callbacks[key];
      }
    }
    __mounted() {
      this.mounted && this.mounted();
    }
    __updated() {
      this.updated && this.updated();
    }
    __beforeUpdate() {
      this.beforeUpdate && this.beforeUpdate();
    }
    __destroyed() {
      this.destroyed && this.destroyed();
    }
    __reconnected() {
      if (this.__isDisconnected) {
        this.__isDisconnected = false;
        this.reconnected && this.reconnected();
      }
    }
    __disconnected() {
      this.__isDisconnected = true;
      this.disconnected && this.disconnected();
    }
    pushEvent(event, payload = {}, onReply = function() {
    }) {
      return this.__view.pushHookEvent(null, event, payload, onReply);
    }
    pushEventTo(phxTarget, event, payload = {}, onReply = function() {
    }) {
      return this.__view.withinTargets(phxTarget, (view, targetCtx) => {
        return view.pushHookEvent(targetCtx, event, payload, onReply);
      });
    }
    handleEvent(event, callback) {
      let callbackRef = (customEvent, bypass) => bypass ? event : callback(customEvent.detail);
      window.addEventListener(`phx:hook:${event}`, callbackRef);
      this.__listeners.add(callbackRef);
      return callbackRef;
    }
    removeHandleEvent(callbackRef) {
      let event = callbackRef(null, true);
      window.removeEventListener(`phx:hook:${event}`, callbackRef);
      this.__listeners.delete(callbackRef);
    }
    upload(name, files) {
      return this.__view.dispatchUploads(name, files);
    }
    uploadTo(phxTarget, name, files) {
      return this.__view.withinTargets(phxTarget, (view) => view.dispatchUploads(name, files));
    }
    __cleanup__() {
      this.__listeners.forEach((callbackRef) => this.removeHandleEvent(callbackRef));
    }
  };
  var serializeForm = (form, meta = {}) => {
    let formData = new FormData(form);
    let toRemove = [];
    formData.forEach((val, key, _index) => {
      if (val instanceof File) {
        toRemove.push(key);
      }
    });
    toRemove.forEach((key) => formData.delete(key));
    let params = new URLSearchParams();
    for (let [key, val] of formData.entries()) {
      params.append(key, val);
    }
    for (let metaKey in meta) {
      params.append(metaKey, meta[metaKey]);
    }
    return params.toString();
  };
  var View = class {
    constructor(el, liveSocket2, parentView, flash) {
      this.liveSocket = liveSocket2;
      this.flash = flash;
      this.parent = parentView;
      this.root = parentView ? parentView.root : this;
      this.el = el;
      this.id = this.el.id;
      this.ref = 0;
      this.childJoins = 0;
      this.loaderTimer = null;
      this.pendingDiffs = [];
      this.pruningCIDs = [];
      this.redirect = false;
      this.href = null;
      this.joinCount = this.parent ? this.parent.joinCount - 1 : 0;
      this.joinPending = true;
      this.destroyed = false;
      this.joinCallback = function() {
      };
      this.stopCallback = function() {
      };
      this.pendingJoinOps = this.parent ? null : [];
      this.viewHooks = {};
      this.uploaders = {};
      this.formSubmits = [];
      this.children = this.parent ? null : {};
      this.root.children[this.id] = {};
      this.channel = this.liveSocket.channel(`lv:${this.id}`, () => {
        return {
          redirect: this.redirect ? this.href : void 0,
          url: this.redirect ? void 0 : this.href || void 0,
          params: this.connectParams(),
          session: this.getSession(),
          static: this.getStatic(),
          flash: this.flash
        };
      });
      this.showLoader(this.liveSocket.loaderTimeout);
      this.bindChannel();
    }
    setHref(href) {
      this.href = href;
    }
    setRedirect(href) {
      this.redirect = true;
      this.href = href;
    }
    isMain() {
      return this.liveSocket.main === this;
    }
    connectParams() {
      let params = this.liveSocket.params(this.el);
      let manifest = dom_default.all(document, `[${this.binding(PHX_TRACK_STATIC)}]`).map((node) => node.src || node.href).filter((url) => typeof url === "string");
      if (manifest.length > 0) {
        params["_track_static"] = manifest;
      }
      params["_mounts"] = this.joinCount;
      return params;
    }
    isConnected() {
      return this.channel.canPush();
    }
    getSession() {
      return this.el.getAttribute(PHX_SESSION);
    }
    getStatic() {
      let val = this.el.getAttribute(PHX_STATIC);
      return val === "" ? null : val;
    }
    destroy(callback = function() {
    }) {
      this.destroyAllChildren();
      this.destroyed = true;
      delete this.root.children[this.id];
      if (this.parent) {
        delete this.root.children[this.parent.id][this.id];
      }
      clearTimeout(this.loaderTimer);
      let onFinished = () => {
        callback();
        for (let id in this.viewHooks) {
          this.destroyHook(this.viewHooks[id]);
        }
      };
      dom_default.markPhxChildDestroyed(this.el);
      this.log("destroyed", () => ["the child has been removed from the parent"]);
      this.channel.leave().receive("ok", onFinished).receive("error", onFinished).receive("timeout", onFinished);
    }
    setContainerClasses(...classes) {
      this.el.classList.remove(PHX_CONNECTED_CLASS, PHX_DISCONNECTED_CLASS, PHX_ERROR_CLASS);
      this.el.classList.add(...classes);
    }
    isLoading() {
      return this.el.classList.contains(PHX_DISCONNECTED_CLASS);
    }
    showLoader(timeout) {
      clearTimeout(this.loaderTimer);
      if (timeout) {
        this.loaderTimer = setTimeout(() => this.showLoader(), timeout);
      } else {
        for (let id in this.viewHooks) {
          this.viewHooks[id].__disconnected();
        }
        this.setContainerClasses(PHX_DISCONNECTED_CLASS);
      }
    }
    hideLoader() {
      clearTimeout(this.loaderTimer);
      this.setContainerClasses(PHX_CONNECTED_CLASS);
    }
    triggerReconnected() {
      for (let id in this.viewHooks) {
        this.viewHooks[id].__reconnected();
      }
    }
    log(kind, msgCallback) {
      this.liveSocket.log(this, kind, msgCallback);
    }
    withinTargets(phxTarget, callback) {
      if (phxTarget instanceof HTMLElement) {
        return this.liveSocket.owner(phxTarget, (view) => callback(view, phxTarget));
      }
      if (/^(0|[1-9]\d*)$/.test(phxTarget)) {
        let targets = dom_default.findComponentNodeList(this.el, phxTarget);
        if (targets.length === 0) {
          logError(`no component found matching phx-target of ${phxTarget}`);
        } else {
          callback(this, targets[0]);
        }
      } else {
        let targets = Array.from(document.querySelectorAll(phxTarget));
        if (targets.length === 0) {
          logError(`nothing found matching the phx-target selector "${phxTarget}"`);
        }
        targets.forEach((target) => this.liveSocket.owner(target, (view) => callback(view, target)));
      }
    }
    applyDiff(type, rawDiff, callback) {
      this.log(type, () => ["", clone(rawDiff)]);
      let { diff, reply, events, title } = Rendered.extract(rawDiff);
      if (title) {
        dom_default.putTitle(title);
      }
      callback({ diff, reply, events });
      return reply;
    }
    onJoin(resp) {
      let { rendered, container } = resp;
      if (container) {
        let [tag, attrs] = container;
        this.el = dom_default.replaceRootContainer(this.el, tag, attrs);
      }
      this.childJoins = 0;
      this.joinPending = true;
      this.flash = null;
      browser_default.dropLocal(this.liveSocket.localStorage, window.location.pathname, CONSECUTIVE_RELOADS);
      this.applyDiff("mount", rendered, ({ diff, events }) => {
        this.rendered = new Rendered(this.id, diff);
        let html = this.renderContainer(null, "join");
        this.dropPendingRefs();
        let forms = this.formsForRecovery(html);
        this.joinCount++;
        if (forms.length > 0) {
          forms.forEach(([form, newForm, newCid], i) => {
            this.pushFormRecovery(form, newCid, (resp2) => {
              if (i === forms.length - 1) {
                this.onJoinComplete(resp2, html, events);
              }
            });
          });
        } else {
          this.onJoinComplete(resp, html, events);
        }
      });
    }
    dropPendingRefs() {
      dom_default.all(this.el, `[${PHX_REF}]`, (el) => el.removeAttribute(PHX_REF));
    }
    onJoinComplete({ live_patch }, html, events) {
      if (this.joinCount > 1 || this.parent && !this.parent.isJoinPending()) {
        return this.applyJoinPatch(live_patch, html, events);
      }
      let newChildren = dom_default.findPhxChildrenInFragment(html, this.id).filter((toEl) => {
        let fromEl = toEl.id && this.el.querySelector(`[id="${toEl.id}"]`);
        let phxStatic = fromEl && fromEl.getAttribute(PHX_STATIC);
        if (phxStatic) {
          toEl.setAttribute(PHX_STATIC, phxStatic);
        }
        return this.joinChild(toEl);
      });
      if (newChildren.length === 0) {
        if (this.parent) {
          this.root.pendingJoinOps.push([this, () => this.applyJoinPatch(live_patch, html, events)]);
          this.parent.ackJoin(this);
        } else {
          this.onAllChildJoinsComplete();
          this.applyJoinPatch(live_patch, html, events);
        }
      } else {
        this.root.pendingJoinOps.push([this, () => this.applyJoinPatch(live_patch, html, events)]);
      }
    }
    attachTrueDocEl() {
      this.el = dom_default.byId(this.id);
      this.el.setAttribute(PHX_ROOT_ID, this.root.id);
    }
    dispatchEvents(events) {
      events.forEach(([event, payload]) => {
        window.dispatchEvent(new CustomEvent(`phx:hook:${event}`, { detail: payload }));
      });
    }
    applyJoinPatch(live_patch, html, events) {
      this.attachTrueDocEl();
      let patch = new DOMPatch(this, this.el, this.id, html, null);
      patch.markPrunableContentForRemoval();
      this.performPatch(patch, false);
      this.joinNewChildren();
      dom_default.all(this.el, `[${this.binding(PHX_HOOK)}], [data-phx-${PHX_HOOK}]`, (hookEl) => {
        let hook = this.addHook(hookEl);
        if (hook) {
          hook.__mounted();
        }
      });
      this.joinPending = false;
      this.dispatchEvents(events);
      this.applyPendingUpdates();
      if (live_patch) {
        let { kind, to } = live_patch;
        this.liveSocket.historyPatch(to, kind);
      }
      this.hideLoader();
      if (this.joinCount > 1) {
        this.triggerReconnected();
      }
      this.stopCallback();
    }
    triggerBeforeUpdateHook(fromEl, toEl) {
      this.liveSocket.triggerDOM("onBeforeElUpdated", [fromEl, toEl]);
      let hook = this.getHook(fromEl);
      let isIgnored = hook && dom_default.isIgnored(fromEl, this.binding(PHX_UPDATE));
      if (hook && !fromEl.isEqualNode(toEl) && !(isIgnored && isEqualObj(fromEl.dataset, toEl.dataset))) {
        hook.__beforeUpdate();
        return hook;
      }
    }
    performPatch(patch, pruneCids) {
      let destroyedCIDs = [];
      let phxChildrenAdded = false;
      let updatedHookIds = /* @__PURE__ */ new Set();
      patch.after("added", (el) => {
        this.liveSocket.triggerDOM("onNodeAdded", [el]);
        let newHook = this.addHook(el);
        if (newHook) {
          newHook.__mounted();
        }
      });
      patch.after("phxChildAdded", (_el) => phxChildrenAdded = true);
      patch.before("updated", (fromEl, toEl) => {
        let hook = this.triggerBeforeUpdateHook(fromEl, toEl);
        if (hook) {
          updatedHookIds.add(fromEl.id);
        }
      });
      patch.after("updated", (el) => {
        if (updatedHookIds.has(el.id)) {
          this.getHook(el).__updated();
        }
      });
      patch.after("discarded", (el) => {
        let cid = this.componentID(el);
        if (isCid(cid) && destroyedCIDs.indexOf(cid) === -1) {
          destroyedCIDs.push(cid);
        }
        let hook = this.getHook(el);
        hook && this.destroyHook(hook);
      });
      patch.perform();
      if (pruneCids) {
        this.maybePushComponentsDestroyed(destroyedCIDs);
      }
      return phxChildrenAdded;
    }
    joinNewChildren() {
      dom_default.findPhxChildren(this.el, this.id).forEach((el) => this.joinChild(el));
    }
    getChildById(id) {
      return this.root.children[this.id][id];
    }
    getDescendentByEl(el) {
      if (el.id === this.id) {
        return this;
      } else {
        return this.children[el.getAttribute(PHX_PARENT_ID)][el.id];
      }
    }
    destroyDescendent(id) {
      for (let parentId in this.root.children) {
        for (let childId in this.root.children[parentId]) {
          if (childId === id) {
            return this.root.children[parentId][childId].destroy();
          }
        }
      }
    }
    joinChild(el) {
      let child = this.getChildById(el.id);
      if (!child) {
        let view = new View(el, this.liveSocket, this);
        this.root.children[this.id][view.id] = view;
        view.join();
        this.childJoins++;
        return true;
      }
    }
    isJoinPending() {
      return this.joinPending;
    }
    ackJoin(_child) {
      this.childJoins--;
      if (this.childJoins === 0) {
        if (this.parent) {
          this.parent.ackJoin(this);
        } else {
          this.onAllChildJoinsComplete();
        }
      }
    }
    onAllChildJoinsComplete() {
      this.joinCallback();
      this.pendingJoinOps.forEach(([view, op]) => {
        if (!view.isDestroyed()) {
          op();
        }
      });
      this.pendingJoinOps = [];
    }
    update(diff, events) {
      if (this.isJoinPending() || this.liveSocket.hasPendingLink()) {
        return this.pendingDiffs.push({ diff, events });
      }
      this.rendered.mergeDiff(diff);
      let phxChildrenAdded = false;
      if (this.rendered.isComponentOnlyDiff(diff)) {
        this.liveSocket.time("component patch complete", () => {
          let parentCids = dom_default.findParentCIDs(this.el, this.rendered.componentCIDs(diff));
          parentCids.forEach((parentCID) => {
            if (this.componentPatch(this.rendered.getComponent(diff, parentCID), parentCID)) {
              phxChildrenAdded = true;
            }
          });
        });
      } else if (!isEmpty(diff)) {
        this.liveSocket.time("full patch complete", () => {
          let html = this.renderContainer(diff, "update");
          let patch = new DOMPatch(this, this.el, this.id, html, null);
          phxChildrenAdded = this.performPatch(patch, true);
        });
      }
      this.dispatchEvents(events);
      if (phxChildrenAdded) {
        this.joinNewChildren();
      }
    }
    renderContainer(diff, kind) {
      return this.liveSocket.time(`toString diff (${kind})`, () => {
        let tag = this.el.tagName;
        let cids = diff ? this.rendered.componentCIDs(diff).concat(this.pruningCIDs) : null;
        let html = this.rendered.toString(cids);
        return `<${tag}>${html}</${tag}>`;
      });
    }
    componentPatch(diff, cid) {
      if (isEmpty(diff))
        return false;
      let html = this.rendered.componentToString(cid);
      let patch = new DOMPatch(this, this.el, this.id, html, cid);
      let childrenAdded = this.performPatch(patch, true);
      return childrenAdded;
    }
    getHook(el) {
      return this.viewHooks[ViewHook.elementID(el)];
    }
    addHook(el) {
      if (ViewHook.elementID(el) || !el.getAttribute) {
        return;
      }
      let hookName = el.getAttribute(`data-phx-${PHX_HOOK}`) || el.getAttribute(this.binding(PHX_HOOK));
      if (hookName && !this.ownsElement(el)) {
        return;
      }
      let callbacks = this.liveSocket.getHookCallbacks(hookName);
      if (callbacks) {
        if (!el.id) {
          logError(`no DOM ID for hook "${hookName}". Hooks require a unique ID on each element.`, el);
        }
        let hook = new ViewHook(this, el, callbacks);
        this.viewHooks[ViewHook.elementID(hook.el)] = hook;
        return hook;
      } else if (hookName !== null) {
        logError(`unknown hook found for "${hookName}"`, el);
      }
    }
    destroyHook(hook) {
      hook.__destroyed();
      hook.__cleanup__();
      delete this.viewHooks[ViewHook.elementID(hook.el)];
    }
    applyPendingUpdates() {
      this.pendingDiffs.forEach(({ diff, events }) => this.update(diff, events));
      this.pendingDiffs = [];
    }
    onChannel(event, cb) {
      this.liveSocket.onChannel(this.channel, event, (resp) => {
        if (this.isJoinPending()) {
          this.root.pendingJoinOps.push([this, () => cb(resp)]);
        } else {
          cb(resp);
        }
      });
    }
    bindChannel() {
      this.liveSocket.onChannel(this.channel, "diff", (rawDiff) => {
        this.applyDiff("update", rawDiff, ({ diff, events }) => this.update(diff, events));
      });
      this.onChannel("redirect", ({ to, flash }) => this.onRedirect({ to, flash }));
      this.onChannel("live_patch", (redir) => this.onLivePatch(redir));
      this.onChannel("live_redirect", (redir) => this.onLiveRedirect(redir));
      this.channel.onError((reason) => this.onError(reason));
      this.channel.onClose((reason) => this.onClose(reason));
    }
    destroyAllChildren() {
      for (let id in this.root.children[this.id]) {
        this.getChildById(id).destroy();
      }
    }
    onLiveRedirect(redir) {
      let { to, kind, flash } = redir;
      let url = this.expandURL(to);
      this.liveSocket.historyRedirect(url, kind, flash);
    }
    onLivePatch(redir) {
      let { to, kind } = redir;
      this.href = this.expandURL(to);
      this.liveSocket.historyPatch(to, kind);
    }
    expandURL(to) {
      return to.startsWith("/") ? `${window.location.protocol}//${window.location.host}${to}` : to;
    }
    onRedirect({ to, flash }) {
      this.liveSocket.redirect(to, flash);
    }
    isDestroyed() {
      return this.destroyed;
    }
    join(callback) {
      if (!this.parent) {
        this.stopCallback = this.liveSocket.withPageLoading({ to: this.href, kind: "initial" });
      }
      this.joinCallback = () => callback && callback(this.joinCount);
      this.liveSocket.wrapPush(this, { timeout: false }, () => {
        return this.channel.join().receive("ok", (data) => !this.isDestroyed() && this.onJoin(data)).receive("error", (resp) => !this.isDestroyed() && this.onJoinError(resp)).receive("timeout", () => !this.isDestroyed() && this.onJoinError({ reason: "timeout" }));
      });
    }
    onJoinError(resp) {
      if (resp.reason === "unauthorized" || resp.reason === "stale") {
        this.log("error", () => ["unauthorized live_redirect. Falling back to page request", resp]);
        return this.onRedirect({ to: this.href });
      }
      if (resp.redirect || resp.live_redirect) {
        this.joinPending = false;
        this.channel.leave();
      }
      if (resp.redirect) {
        return this.onRedirect(resp.redirect);
      }
      if (resp.live_redirect) {
        return this.onLiveRedirect(resp.live_redirect);
      }
      this.log("error", () => ["unable to join", resp]);
      return this.liveSocket.reloadWithJitter(this);
    }
    onClose(reason) {
      if (this.isDestroyed()) {
        return;
      }
      if (this.isJoinPending() && document.visibilityState !== "hidden" || this.liveSocket.hasPendingLink() && reason !== "leave") {
        return this.liveSocket.reloadWithJitter(this);
      }
      this.destroyAllChildren();
      this.liveSocket.dropActiveElement(this);
      if (document.activeElement) {
        document.activeElement.blur();
      }
      if (this.liveSocket.isUnloaded()) {
        this.showLoader(BEFORE_UNLOAD_LOADER_TIMEOUT);
      }
    }
    onError(reason) {
      this.onClose(reason);
      this.log("error", () => ["view crashed", reason]);
      if (!this.liveSocket.isUnloaded()) {
        this.displayError();
      }
    }
    displayError() {
      if (this.isMain()) {
        dom_default.dispatchEvent(window, "phx:page-loading-start", { to: this.href, kind: "error" });
      }
      this.showLoader();
      this.setContainerClasses(PHX_DISCONNECTED_CLASS, PHX_ERROR_CLASS);
    }
    pushWithReply(refGenerator, event, payload, onReply = function() {
    }) {
      if (!this.isConnected()) {
        return;
      }
      let [ref, [el]] = refGenerator ? refGenerator() : [null, []];
      let onLoadingDone = function() {
      };
      if (el && el.getAttribute(this.binding(PHX_PAGE_LOADING)) !== null) {
        onLoadingDone = this.liveSocket.withPageLoading({ kind: "element", target: el });
      }
      if (typeof payload.cid !== "number") {
        delete payload.cid;
      }
      return this.liveSocket.wrapPush(this, { timeout: true }, () => {
        return this.channel.push(event, payload, PUSH_TIMEOUT).receive("ok", (resp) => {
          let hookReply = null;
          if (ref !== null) {
            this.undoRefs(ref);
          }
          if (resp.diff) {
            hookReply = this.applyDiff("update", resp.diff, ({ diff, events }) => {
              this.update(diff, events);
            });
          }
          if (resp.redirect) {
            this.onRedirect(resp.redirect);
          }
          if (resp.live_patch) {
            this.onLivePatch(resp.live_patch);
          }
          if (resp.live_redirect) {
            this.onLiveRedirect(resp.live_redirect);
          }
          onLoadingDone();
          onReply(resp, hookReply);
        });
      });
    }
    undoRefs(ref) {
      dom_default.all(this.el, `[${PHX_REF}="${ref}"]`, (el) => {
        let disabledVal = el.getAttribute(PHX_DISABLED);
        el.removeAttribute(PHX_REF);
        if (el.getAttribute(PHX_READONLY) !== null) {
          el.readOnly = false;
          el.removeAttribute(PHX_READONLY);
        }
        if (disabledVal !== null) {
          el.disabled = disabledVal === "true" ? true : false;
          el.removeAttribute(PHX_DISABLED);
        }
        PHX_EVENT_CLASSES.forEach((className) => dom_default.removeClass(el, className));
        let disableRestore = el.getAttribute(PHX_DISABLE_WITH_RESTORE);
        if (disableRestore !== null) {
          el.innerText = disableRestore;
          el.removeAttribute(PHX_DISABLE_WITH_RESTORE);
        }
        let toEl = dom_default.private(el, PHX_REF);
        if (toEl) {
          let hook = this.triggerBeforeUpdateHook(el, toEl);
          DOMPatch.patchEl(el, toEl, this.liveSocket.getActiveElement());
          if (hook) {
            hook.__updated();
          }
          dom_default.deletePrivate(el, PHX_REF);
        }
      });
    }
    putRef(elements, event) {
      let newRef = this.ref++;
      let disableWith = this.binding(PHX_DISABLE_WITH);
      elements.forEach((el) => {
        el.classList.add(`phx-${event}-loading`);
        el.setAttribute(PHX_REF, newRef);
        let disableText = el.getAttribute(disableWith);
        if (disableText !== null) {
          if (!el.getAttribute(PHX_DISABLE_WITH_RESTORE)) {
            el.setAttribute(PHX_DISABLE_WITH_RESTORE, el.innerText);
          }
          el.innerText = disableText;
        }
      });
      return [newRef, elements];
    }
    componentID(el) {
      let cid = el.getAttribute && el.getAttribute(PHX_COMPONENT);
      return cid ? parseInt(cid) : null;
    }
    targetComponentID(target, targetCtx) {
      if (target.getAttribute(this.binding("target"))) {
        return this.closestComponentID(targetCtx);
      } else {
        return null;
      }
    }
    closestComponentID(targetCtx) {
      if (targetCtx) {
        return maybe(targetCtx.closest(`[${PHX_COMPONENT}]`), (el) => this.ownsElement(el) && this.componentID(el));
      } else {
        return null;
      }
    }
    pushHookEvent(targetCtx, event, payload, onReply) {
      if (!this.isConnected()) {
        this.log("hook", () => ["unable to push hook event. LiveView not connected", event, payload]);
        return false;
      }
      let [ref, els] = this.putRef([], "hook");
      this.pushWithReply(() => [ref, els], "event", {
        type: "hook",
        event,
        value: payload,
        cid: this.closestComponentID(targetCtx)
      }, (resp, reply) => onReply(reply, ref));
      return ref;
    }
    extractMeta(el, meta) {
      let prefix = this.binding("value-");
      for (let i = 0; i < el.attributes.length; i++) {
        let name = el.attributes[i].name;
        if (name.startsWith(prefix)) {
          meta[name.replace(prefix, "")] = el.getAttribute(name);
        }
      }
      if (el.value !== void 0) {
        meta.value = el.value;
        if (el.tagName === "INPUT" && CHECKABLE_INPUTS.indexOf(el.type) >= 0 && !el.checked) {
          delete meta.value;
        }
      }
      return meta;
    }
    pushEvent(type, el, targetCtx, phxEvent, meta) {
      this.pushWithReply(() => this.putRef([el], type), "event", {
        type,
        event: phxEvent,
        value: this.extractMeta(el, meta),
        cid: this.targetComponentID(el, targetCtx)
      });
    }
    pushKey(keyElement, targetCtx, kind, phxEvent, meta) {
      this.pushWithReply(() => this.putRef([keyElement], kind), "event", {
        type: kind,
        event: phxEvent,
        value: this.extractMeta(keyElement, meta),
        cid: this.targetComponentID(keyElement, targetCtx)
      });
    }
    pushFileProgress(fileEl, entryRef, progress, onReply = function() {
    }) {
      this.liveSocket.withinOwners(fileEl.form, (view, targetCtx) => {
        view.pushWithReply(null, "progress", {
          event: fileEl.getAttribute(view.binding(PHX_PROGRESS)),
          ref: fileEl.getAttribute(PHX_UPLOAD_REF),
          entry_ref: entryRef,
          progress,
          cid: view.targetComponentID(fileEl.form, targetCtx)
        }, onReply);
      });
    }
    pushInput(inputEl, targetCtx, forceCid, phxEvent, eventTarget, callback) {
      let uploads;
      let cid = isCid(forceCid) ? forceCid : this.targetComponentID(inputEl.form, targetCtx);
      let refGenerator = () => this.putRef([inputEl, inputEl.form], "change");
      let formData = serializeForm(inputEl.form, { _target: eventTarget.name });
      if (inputEl.files && inputEl.files.length > 0) {
        LiveUploader.trackFiles(inputEl, Array.from(inputEl.files));
      }
      uploads = LiveUploader.serializeUploads(inputEl);
      let event = {
        type: "form",
        event: phxEvent,
        value: formData,
        uploads,
        cid
      };
      this.pushWithReply(refGenerator, "event", event, (resp) => {
        dom_default.showError(inputEl, this.liveSocket.binding(PHX_FEEDBACK_FOR));
        if (dom_default.isUploadInput(inputEl) && inputEl.getAttribute("data-phx-auto-upload") !== null) {
          if (LiveUploader.filesAwaitingPreflight(inputEl).length > 0) {
            let [ref, _els] = refGenerator();
            this.uploadFiles(inputEl.form, targetCtx, ref, cid, (_uploads) => {
              callback && callback(resp);
              this.triggerAwaitingSubmit(inputEl.form);
            });
          }
        } else {
          callback && callback(resp);
        }
      });
    }
    triggerAwaitingSubmit(formEl) {
      let awaitingSubmit = this.getScheduledSubmit(formEl);
      if (awaitingSubmit) {
        let [_el, _ref, callback] = awaitingSubmit;
        this.cancelSubmit(formEl);
        callback();
      }
    }
    getScheduledSubmit(formEl) {
      return this.formSubmits.find(([el, _callback]) => el.isSameNode(formEl));
    }
    scheduleSubmit(formEl, ref, callback) {
      if (this.getScheduledSubmit(formEl)) {
        return true;
      }
      this.formSubmits.push([formEl, ref, callback]);
    }
    cancelSubmit(formEl) {
      this.formSubmits = this.formSubmits.filter(([el, ref, _callback]) => {
        if (el.isSameNode(formEl)) {
          this.undoRefs(ref);
          return false;
        } else {
          return true;
        }
      });
    }
    pushFormSubmit(formEl, targetCtx, phxEvent, onReply) {
      let filterIgnored = (el) => {
        let userIgnored = closestPhxBinding(el, `${this.binding(PHX_UPDATE)}=ignore`, el.form);
        return !(userIgnored || closestPhxBinding(el, "data-phx-update=ignore", el.form));
      };
      let filterDisables = (el) => {
        return el.hasAttribute(this.binding(PHX_DISABLE_WITH));
      };
      let filterButton = (el) => el.tagName == "BUTTON";
      let filterInput = (el) => ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName);
      let refGenerator = () => {
        let formElements = Array.from(formEl.elements);
        let disables = formElements.filter(filterDisables);
        let buttons = formElements.filter(filterButton).filter(filterIgnored);
        let inputs = formElements.filter(filterInput).filter(filterIgnored);
        buttons.forEach((button) => {
          button.setAttribute(PHX_DISABLED, button.disabled);
          button.disabled = true;
        });
        inputs.forEach((input) => {
          input.setAttribute(PHX_READONLY, input.readOnly);
          input.readOnly = true;
          if (input.files) {
            input.setAttribute(PHX_DISABLED, input.disabled);
            input.disabled = true;
          }
        });
        formEl.setAttribute(this.binding(PHX_PAGE_LOADING), "");
        return this.putRef([formEl].concat(disables).concat(buttons).concat(inputs), "submit");
      };
      let cid = this.targetComponentID(formEl, targetCtx);
      if (LiveUploader.hasUploadsInProgress(formEl)) {
        let [ref, _els] = refGenerator();
        return this.scheduleSubmit(formEl, ref, () => this.pushFormSubmit(formEl, targetCtx, phxEvent, onReply));
      } else if (LiveUploader.inputsAwaitingPreflight(formEl).length > 0) {
        let [ref, els] = refGenerator();
        let proxyRefGen = () => [ref, els];
        this.uploadFiles(formEl, targetCtx, ref, cid, (_uploads) => {
          let formData = serializeForm(formEl, {});
          this.pushWithReply(proxyRefGen, "event", {
            type: "form",
            event: phxEvent,
            value: formData,
            cid
          }, onReply);
        });
      } else {
        let formData = serializeForm(formEl);
        this.pushWithReply(refGenerator, "event", {
          type: "form",
          event: phxEvent,
          value: formData,
          cid
        }, onReply);
      }
    }
    uploadFiles(formEl, targetCtx, ref, cid, onComplete) {
      let joinCountAtUpload = this.joinCount;
      let inputEls = LiveUploader.activeFileInputs(formEl);
      let numFileInputsInProgress = inputEls.length;
      inputEls.forEach((inputEl) => {
        let uploader = new LiveUploader(inputEl, this, () => {
          numFileInputsInProgress--;
          if (numFileInputsInProgress === 0) {
            onComplete();
          }
        });
        this.uploaders[inputEl] = uploader;
        let entries = uploader.entries().map((entry) => entry.toPreflightPayload());
        let payload = {
          ref: inputEl.getAttribute(PHX_UPLOAD_REF),
          entries,
          cid: this.targetComponentID(inputEl.form, targetCtx)
        };
        this.log("upload", () => ["sending preflight request", payload]);
        this.pushWithReply(null, "allow_upload", payload, (resp) => {
          this.log("upload", () => ["got preflight response", resp]);
          if (resp.error) {
            this.undoRefs(ref);
            let [entry_ref, reason] = resp.error;
            this.log("upload", () => [`error for entry ${entry_ref}`, reason]);
          } else {
            let onError = (callback) => {
              this.channel.onError(() => {
                if (this.joinCount === joinCountAtUpload) {
                  callback();
                }
              });
            };
            uploader.initAdapterUpload(resp, onError, this.liveSocket);
          }
        });
      });
    }
    dispatchUploads(name, filesOrBlobs) {
      let inputs = dom_default.findUploadInputs(this.el).filter((el) => el.name === name);
      if (inputs.length === 0) {
        logError(`no live file inputs found matching the name "${name}"`);
      } else if (inputs.length > 1) {
        logError(`duplicate live file inputs found matching the name "${name}"`);
      } else {
        dom_default.dispatchEvent(inputs[0], PHX_TRACK_UPLOADS, { files: filesOrBlobs });
      }
    }
    pushFormRecovery(form, newCid, callback) {
      this.liveSocket.withinOwners(form, (view, targetCtx) => {
        let input = form.elements[0];
        let phxEvent = form.getAttribute(this.binding(PHX_AUTO_RECOVER)) || form.getAttribute(this.binding("change"));
        view.pushInput(input, targetCtx, newCid, phxEvent, input, callback);
      });
    }
    pushLinkPatch(href, targetEl, callback) {
      let linkRef = this.liveSocket.setPendingLink(href);
      let refGen = targetEl ? () => this.putRef([targetEl], "click") : null;
      this.pushWithReply(refGen, "live_patch", { url: href }, (resp) => {
        if (resp.link_redirect) {
          this.liveSocket.replaceMain(href, null, callback, linkRef);
        } else {
          if (this.liveSocket.commitPendingLink(linkRef)) {
            this.href = href;
          }
          this.applyPendingUpdates();
          callback && callback(linkRef);
        }
      }).receive("timeout", () => this.liveSocket.redirect(window.location.href));
    }
    formsForRecovery(html) {
      if (this.joinCount === 0) {
        return [];
      }
      let phxChange = this.binding("change");
      let template = document.createElement("template");
      template.innerHTML = html;
      return dom_default.all(this.el, `form[${phxChange}]`).filter((form) => form.id && this.ownsElement(form)).filter((form) => form.elements.length > 0).filter((form) => form.getAttribute(this.binding(PHX_AUTO_RECOVER)) !== "ignore").map((form) => {
        let newForm = template.content.querySelector(`form[id="${form.id}"][${phxChange}="${form.getAttribute(phxChange)}"]`);
        if (newForm) {
          return [form, newForm, this.componentID(newForm)];
        } else {
          return [form, null, null];
        }
      }).filter(([form, newForm, newCid]) => newForm);
    }
    maybePushComponentsDestroyed(destroyedCIDs) {
      let willDestroyCIDs = destroyedCIDs.filter((cid) => {
        return dom_default.findComponentNodeList(this.el, cid).length === 0;
      });
      if (willDestroyCIDs.length > 0) {
        this.pruningCIDs.push(...willDestroyCIDs);
        this.pushWithReply(null, "cids_will_destroy", { cids: willDestroyCIDs }, () => {
          this.pruningCIDs = this.pruningCIDs.filter((cid) => willDestroyCIDs.indexOf(cid) !== -1);
          let completelyDestroyCIDs = willDestroyCIDs.filter((cid) => {
            return dom_default.findComponentNodeList(this.el, cid).length === 0;
          });
          if (completelyDestroyCIDs.length > 0) {
            this.pushWithReply(null, "cids_destroyed", { cids: completelyDestroyCIDs }, (resp) => {
              this.rendered.pruneCIDs(resp.cids);
            });
          }
        });
      }
    }
    ownsElement(el) {
      return el.getAttribute(PHX_PARENT_ID) === this.id || maybe(el.closest(PHX_VIEW_SELECTOR), (node) => node.id) === this.id;
    }
    submitForm(form, targetCtx, phxEvent) {
      dom_default.putPrivate(form, PHX_HAS_SUBMITTED, true);
      this.liveSocket.blurActiveElement(this);
      this.pushFormSubmit(form, targetCtx, phxEvent, () => {
        this.liveSocket.restorePreviouslyActiveFocus();
      });
    }
    binding(kind) {
      return this.liveSocket.binding(kind);
    }
  };
  var LiveSocket = class {
    constructor(url, phxSocket, opts = {}) {
      this.unloaded = false;
      if (!phxSocket || phxSocket.constructor.name === "Object") {
        throw new Error(`
      a phoenix Socket must be provided as the second argument to the LiveSocket constructor. For example:

          import {Socket} from "phoenix"
          import LiveSocket from "phoenix_live_view"
          let liveSocket = new LiveSocket("/live", Socket, {...})
      `);
      }
      this.socket = new phxSocket(url, opts);
      this.bindingPrefix = opts.bindingPrefix || BINDING_PREFIX;
      this.opts = opts;
      this.params = closure2(opts.params || {});
      this.viewLogger = opts.viewLogger;
      this.metadataCallbacks = opts.metadata || {};
      this.defaults = Object.assign(clone(DEFAULTS), opts.defaults || {});
      this.activeElement = null;
      this.prevActive = null;
      this.silenced = false;
      this.main = null;
      this.linkRef = 1;
      this.roots = {};
      this.href = window.location.href;
      this.pendingLink = null;
      this.currentLocation = clone(window.location);
      this.hooks = opts.hooks || {};
      this.uploaders = opts.uploaders || {};
      this.loaderTimeout = opts.loaderTimeout || LOADER_TIMEOUT;
      this.localStorage = opts.localStorage || window.localStorage;
      this.sessionStorage = opts.sessionStorage || window.sessionStorage;
      this.boundTopLevelEvents = false;
      this.domCallbacks = Object.assign({ onNodeAdded: closure2(), onBeforeElUpdated: closure2() }, opts.dom || {});
      window.addEventListener("pagehide", (_e) => {
        this.unloaded = true;
      });
      this.socket.onOpen(() => {
        if (this.isUnloaded()) {
          window.location.reload();
        }
      });
    }
    isProfileEnabled() {
      return this.sessionStorage.getItem(PHX_LV_PROFILE) === "true";
    }
    isDebugEnabled() {
      return this.sessionStorage.getItem(PHX_LV_DEBUG) === "true";
    }
    enableDebug() {
      this.sessionStorage.setItem(PHX_LV_DEBUG, "true");
    }
    enableProfiling() {
      this.sessionStorage.setItem(PHX_LV_PROFILE, "true");
    }
    disableDebug() {
      this.sessionStorage.removeItem(PHX_LV_DEBUG);
    }
    disableProfiling() {
      this.sessionStorage.removeItem(PHX_LV_PROFILE);
    }
    enableLatencySim(upperBoundMs) {
      this.enableDebug();
      console.log("latency simulator enabled for the duration of this browser session. Call disableLatencySim() to disable");
      this.sessionStorage.setItem(PHX_LV_LATENCY_SIM, upperBoundMs);
    }
    disableLatencySim() {
      this.sessionStorage.removeItem(PHX_LV_LATENCY_SIM);
    }
    getLatencySim() {
      let str = this.sessionStorage.getItem(PHX_LV_LATENCY_SIM);
      return str ? parseInt(str) : null;
    }
    getSocket() {
      return this.socket;
    }
    connect() {
      let doConnect = () => {
        if (this.joinRootViews()) {
          this.bindTopLevelEvents();
          this.socket.connect();
        }
      };
      if (["complete", "loaded", "interactive"].indexOf(document.readyState) >= 0) {
        doConnect();
      } else {
        document.addEventListener("DOMContentLoaded", () => doConnect());
      }
    }
    disconnect(callback) {
      this.socket.disconnect(callback);
    }
    triggerDOM(kind, args) {
      this.domCallbacks[kind](...args);
    }
    time(name, func) {
      if (!this.isProfileEnabled() || !console.time) {
        return func();
      }
      console.time(name);
      let result = func();
      console.timeEnd(name);
      return result;
    }
    log(view, kind, msgCallback) {
      if (this.viewLogger) {
        let [msg, obj] = msgCallback();
        this.viewLogger(view, kind, msg, obj);
      } else if (this.isDebugEnabled()) {
        let [msg, obj] = msgCallback();
        debug(view, kind, msg, obj);
      }
    }
    onChannel(channel, event, cb) {
      channel.on(event, (data) => {
        let latency = this.getLatencySim();
        if (!latency) {
          cb(data);
        } else {
          console.log(`simulating ${latency}ms of latency from server to client`);
          setTimeout(() => cb(data), latency);
        }
      });
    }
    wrapPush(view, opts, push) {
      let latency = this.getLatencySim();
      let oldJoinCount = view.joinCount;
      if (!latency) {
        if (opts.timeout) {
          return push().receive("timeout", () => {
            if (view.joinCount === oldJoinCount && !view.isDestroyed()) {
              this.reloadWithJitter(view, () => {
                this.log(view, "timeout", () => ["received timeout while communicating with server. Falling back to hard refresh for recovery"]);
              });
            }
          });
        } else {
          return push();
        }
      }
      console.log(`simulating ${latency}ms of latency from client to server`);
      let fakePush = {
        receives: [],
        receive(kind, cb) {
          this.receives.push([kind, cb]);
        }
      };
      setTimeout(() => {
        if (view.isDestroyed()) {
          return;
        }
        fakePush.receives.reduce((acc, [kind, cb]) => acc.receive(kind, cb), push());
      }, latency);
      return fakePush;
    }
    reloadWithJitter(view, log) {
      view.destroy();
      this.disconnect();
      let [minMs, maxMs] = RELOAD_JITTER;
      let afterMs = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
      let tries = browser_default.updateLocal(this.localStorage, window.location.pathname, CONSECUTIVE_RELOADS, 0, (count) => count + 1);
      log ? log() : this.log(view, "join", () => [`encountered ${tries} consecutive reloads`]);
      if (tries > MAX_RELOADS) {
        this.log(view, "join", () => [`exceeded ${MAX_RELOADS} consecutive reloads. Entering failsafe mode`]);
        afterMs = FAILSAFE_JITTER;
      }
      setTimeout(() => {
        if (this.hasPendingLink()) {
          window.location = this.pendingLink;
        } else {
          window.location.reload();
        }
      }, afterMs);
    }
    getHookCallbacks(name) {
      return name && name.startsWith("Phoenix.") ? hooks_default[name.split(".")[1]] : this.hooks[name];
    }
    isUnloaded() {
      return this.unloaded;
    }
    isConnected() {
      return this.socket.isConnected();
    }
    getBindingPrefix() {
      return this.bindingPrefix;
    }
    binding(kind) {
      return `${this.getBindingPrefix()}${kind}`;
    }
    channel(topic, params) {
      return this.socket.channel(topic, params);
    }
    joinRootViews() {
      let rootsFound = false;
      dom_default.all(document, `${PHX_VIEW_SELECTOR}:not([${PHX_PARENT_ID}])`, (rootEl) => {
        if (!this.getRootById(rootEl.id)) {
          let view = this.newRootView(rootEl);
          view.setHref(this.getHref());
          view.join();
          if (rootEl.getAttribute(PHX_MAIN)) {
            this.main = view;
          }
        }
        rootsFound = true;
      });
      return rootsFound;
    }
    redirect(to, flash) {
      this.disconnect();
      browser_default.redirect(to, flash);
    }
    replaceMain(href, flash, callback = null, linkRef = this.setPendingLink(href)) {
      let oldMainEl = this.main.el;
      let newMainEl = dom_default.cloneNode(oldMainEl, "");
      this.main.showLoader(this.loaderTimeout);
      this.main.destroy();
      this.main = this.newRootView(newMainEl, flash);
      this.main.setRedirect(href);
      this.main.join((joinCount) => {
        if (joinCount === 1 && this.commitPendingLink(linkRef)) {
          oldMainEl.replaceWith(newMainEl);
          callback && callback();
        }
      });
    }
    isPhxView(el) {
      return el.getAttribute && el.getAttribute(PHX_SESSION) !== null;
    }
    newRootView(el, flash) {
      let view = new View(el, this, null, flash);
      this.roots[view.id] = view;
      return view;
    }
    owner(childEl, callback) {
      let view = maybe(childEl.closest(PHX_VIEW_SELECTOR), (el) => this.getViewByEl(el));
      if (view) {
        callback(view);
      }
    }
    withinOwners(childEl, callback) {
      this.owner(childEl, (view) => {
        let phxTarget = childEl.getAttribute(this.binding("target"));
        if (phxTarget === null) {
          callback(view, childEl);
        } else {
          view.withinTargets(phxTarget, callback);
        }
      });
    }
    getViewByEl(el) {
      let rootId = el.getAttribute(PHX_ROOT_ID);
      return maybe(this.getRootById(rootId), (root) => root.getDescendentByEl(el));
    }
    getRootById(id) {
      return this.roots[id];
    }
    destroyAllViews() {
      for (let id in this.roots) {
        this.roots[id].destroy();
        delete this.roots[id];
      }
    }
    destroyViewByEl(el) {
      let root = this.getRootById(el.getAttribute(PHX_ROOT_ID));
      if (root) {
        root.destroyDescendent(el.id);
      }
    }
    setActiveElement(target) {
      if (this.activeElement === target) {
        return;
      }
      this.activeElement = target;
      let cancel = () => {
        if (target === this.activeElement) {
          this.activeElement = null;
        }
        target.removeEventListener("mouseup", this);
        target.removeEventListener("touchend", this);
      };
      target.addEventListener("mouseup", cancel);
      target.addEventListener("touchend", cancel);
    }
    getActiveElement() {
      if (document.activeElement === document.body) {
        return this.activeElement || document.activeElement;
      } else {
        return document.activeElement || document.body;
      }
    }
    dropActiveElement(view) {
      if (this.prevActive && view.ownsElement(this.prevActive)) {
        this.prevActive = null;
      }
    }
    restorePreviouslyActiveFocus() {
      if (this.prevActive && this.prevActive !== document.body) {
        this.prevActive.focus();
      }
    }
    blurActiveElement() {
      this.prevActive = this.getActiveElement();
      if (this.prevActive !== document.body) {
        this.prevActive.blur();
      }
    }
    bindTopLevelEvents() {
      if (this.boundTopLevelEvents) {
        return;
      }
      this.boundTopLevelEvents = true;
      document.body.addEventListener("click", function() {
      });
      window.addEventListener("pageshow", (e) => {
        if (e.persisted) {
          this.getSocket().disconnect();
          this.withPageLoading({ to: window.location.href, kind: "redirect" });
          window.location.reload();
        }
      }, true);
      this.bindNav();
      this.bindClicks();
      this.bindForms();
      this.bind({ keyup: "keyup", keydown: "keydown" }, (e, type, view, target, targetCtx, phxEvent, _phxTarget) => {
        let matchKey = target.getAttribute(this.binding(PHX_KEY));
        let pressedKey = e.key && e.key.toLowerCase();
        if (matchKey && matchKey.toLowerCase() !== pressedKey) {
          return;
        }
        view.pushKey(target, targetCtx, type, phxEvent, __spreadValues({ key: e.key }, this.eventMeta(type, e, target)));
      });
      this.bind({ blur: "focusout", focus: "focusin" }, (e, type, view, targetEl, targetCtx, phxEvent, phxTarget) => {
        if (!phxTarget) {
          view.pushEvent(type, targetEl, targetCtx, phxEvent, this.eventMeta(type, e, targetEl));
        }
      });
      this.bind({ blur: "blur", focus: "focus" }, (e, type, view, targetEl, targetCtx, phxEvent, phxTarget) => {
        if (phxTarget && !phxTarget !== "window") {
          view.pushEvent(type, targetEl, targetCtx, phxEvent, this.eventMeta(type, e, targetEl));
        }
      });
      window.addEventListener("dragover", (e) => e.preventDefault());
      window.addEventListener("drop", (e) => {
        e.preventDefault();
        let dropTargetId = maybe(closestPhxBinding(e.target, this.binding(PHX_DROP_TARGET)), (trueTarget) => {
          return trueTarget.getAttribute(this.binding(PHX_DROP_TARGET));
        });
        let dropTarget = dropTargetId && document.getElementById(dropTargetId);
        let files = Array.from(e.dataTransfer.files || []);
        if (!dropTarget || dropTarget.disabled || files.length === 0 || !(dropTarget.files instanceof FileList)) {
          return;
        }
        LiveUploader.trackFiles(dropTarget, files);
        dropTarget.dispatchEvent(new Event("input", { bubbles: true }));
      });
      this.on(PHX_TRACK_UPLOADS, (e) => {
        let uploadTarget = e.target;
        if (!dom_default.isUploadInput(uploadTarget)) {
          return;
        }
        let files = Array.from(e.detail.files || []).filter((f) => f instanceof File || f instanceof Blob);
        LiveUploader.trackFiles(uploadTarget, files);
        uploadTarget.dispatchEvent(new Event("input", { bubbles: true }));
      });
    }
    eventMeta(eventName, e, targetEl) {
      let callback = this.metadataCallbacks[eventName];
      return callback ? callback(e, targetEl) : {};
    }
    setPendingLink(href) {
      this.linkRef++;
      this.pendingLink = href;
      return this.linkRef;
    }
    commitPendingLink(linkRef) {
      if (this.linkRef !== linkRef) {
        return false;
      } else {
        this.href = this.pendingLink;
        this.pendingLink = null;
        return true;
      }
    }
    getHref() {
      return this.href;
    }
    hasPendingLink() {
      return !!this.pendingLink;
    }
    bind(events, callback) {
      for (let event in events) {
        let browserEventName = events[event];
        this.on(browserEventName, (e) => {
          let binding = this.binding(event);
          let windowBinding = this.binding(`window-${event}`);
          let targetPhxEvent = e.target.getAttribute && e.target.getAttribute(binding);
          if (targetPhxEvent) {
            this.debounce(e.target, e, () => {
              this.withinOwners(e.target, (view, targetCtx) => {
                callback(e, event, view, e.target, targetCtx, targetPhxEvent, null);
              });
            });
          } else {
            dom_default.all(document, `[${windowBinding}]`, (el) => {
              let phxEvent = el.getAttribute(windowBinding);
              this.debounce(el, e, () => {
                this.withinOwners(el, (view, targetCtx) => {
                  callback(e, event, view, el, targetCtx, phxEvent, "window");
                });
              });
            });
          }
        });
      }
    }
    bindClicks() {
      this.bindClick("click", "click", false);
      this.bindClick("mousedown", "capture-click", true);
    }
    bindClick(eventName, bindingName, capture) {
      let click = this.binding(bindingName);
      window.addEventListener(eventName, (e) => {
        if (!this.isConnected()) {
          return;
        }
        let target = null;
        if (capture) {
          target = e.target.matches(`[${click}]`) ? e.target : e.target.querySelector(`[${click}]`);
        } else {
          target = closestPhxBinding(e.target, click);
        }
        let phxEvent = target && target.getAttribute(click);
        if (!phxEvent) {
          return;
        }
        if (target.getAttribute("href") === "#") {
          e.preventDefault();
        }
        this.debounce(target, e, () => {
          this.withinOwners(target, (view, targetCtx) => {
            view.pushEvent("click", target, targetCtx, phxEvent, this.eventMeta("click", e, target));
          });
        });
      }, capture);
    }
    bindNav() {
      if (!browser_default.canPushState()) {
        return;
      }
      if (history.scrollRestoration) {
        history.scrollRestoration = "manual";
      }
      let scrollTimer = null;
      window.addEventListener("scroll", (_e) => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          browser_default.updateCurrentState((state) => Object.assign(state, { scroll: window.scrollY }));
        }, 100);
      });
      window.addEventListener("popstate", (event) => {
        if (!this.registerNewLocation(window.location)) {
          return;
        }
        let { type, id, root, scroll } = event.state || {};
        let href = window.location.href;
        if (this.main.isConnected() && (type === "patch" && id === this.main.id)) {
          this.main.pushLinkPatch(href, null);
        } else {
          this.replaceMain(href, null, () => {
            if (root) {
              this.replaceRootHistory();
            }
            if (typeof scroll === "number") {
              setTimeout(() => {
                window.scrollTo(0, scroll);
              }, 0);
            }
          });
        }
      }, false);
      window.addEventListener("click", (e) => {
        let target = closestPhxBinding(e.target, PHX_LIVE_LINK);
        let type = target && target.getAttribute(PHX_LIVE_LINK);
        let wantsNewTab = e.metaKey || e.ctrlKey || e.button === 1;
        if (!type || !this.isConnected() || !this.main || wantsNewTab) {
          return;
        }
        let href = target.href;
        let linkState = target.getAttribute(PHX_LINK_STATE);
        e.preventDefault();
        if (this.pendingLink === href) {
          return;
        }
        if (type === "patch") {
          this.pushHistoryPatch(href, linkState, target);
        } else if (type === "redirect") {
          this.historyRedirect(href, linkState);
        } else {
          throw new Error(`expected ${PHX_LIVE_LINK} to be "patch" or "redirect", got: ${type}`);
        }
      }, false);
    }
    withPageLoading(info, callback) {
      dom_default.dispatchEvent(window, "phx:page-loading-start", info);
      let done = () => dom_default.dispatchEvent(window, "phx:page-loading-stop", info);
      return callback ? callback(done) : done;
    }
    pushHistoryPatch(href, linkState, targetEl) {
      this.withPageLoading({ to: href, kind: "patch" }, (done) => {
        this.main.pushLinkPatch(href, targetEl, (linkRef) => {
          this.historyPatch(href, linkState, linkRef);
          done();
        });
      });
    }
    historyPatch(href, linkState, linkRef = this.setPendingLink(href)) {
      if (!this.commitPendingLink(linkRef)) {
        return;
      }
      browser_default.pushState(linkState, { type: "patch", id: this.main.id }, href);
      this.registerNewLocation(window.location);
    }
    historyRedirect(href, linkState, flash) {
      let scroll = window.scrollY;
      this.withPageLoading({ to: href, kind: "redirect" }, (done) => {
        this.replaceMain(href, flash, () => {
          browser_default.pushState(linkState, { type: "redirect", id: this.main.id, scroll }, href);
          this.registerNewLocation(window.location);
          done();
        });
      });
    }
    replaceRootHistory() {
      browser_default.pushState("replace", { root: true, type: "patch", id: this.main.id });
    }
    registerNewLocation(newLocation) {
      let { pathname, search } = this.currentLocation;
      if (pathname + search === newLocation.pathname + newLocation.search) {
        return false;
      } else {
        this.currentLocation = clone(newLocation);
        return true;
      }
    }
    bindForms() {
      let iterations = 0;
      this.on("submit", (e) => {
        let phxEvent = e.target.getAttribute(this.binding("submit"));
        if (!phxEvent) {
          return;
        }
        e.preventDefault();
        e.target.disabled = true;
        this.withinOwners(e.target, (view, targetCtx) => view.submitForm(e.target, targetCtx, phxEvent));
      }, false);
      for (let type of ["change", "input"]) {
        this.on(type, (e) => {
          let input = e.target;
          let phxEvent = input.form && input.form.getAttribute(this.binding("change"));
          if (!phxEvent) {
            return;
          }
          if (input.type === "number" && input.validity && input.validity.badInput) {
            return;
          }
          let currentIterations = iterations;
          iterations++;
          let { at, type: lastType } = dom_default.private(input, "prev-iteration") || {};
          if (at === currentIterations - 1 && type !== lastType) {
            return;
          }
          dom_default.putPrivate(input, "prev-iteration", { at: currentIterations, type });
          this.debounce(input, e, () => {
            this.withinOwners(input.form, (view, targetCtx) => {
              dom_default.putPrivate(input, PHX_HAS_FOCUSED, true);
              if (!dom_default.isTextualInput(input)) {
                this.setActiveElement(input);
              }
              view.pushInput(input, targetCtx, null, phxEvent, e.target);
            });
          });
        }, false);
      }
    }
    debounce(el, event, callback) {
      let phxDebounce = this.binding(PHX_DEBOUNCE);
      let phxThrottle = this.binding(PHX_THROTTLE);
      let defaultDebounce = this.defaults.debounce.toString();
      let defaultThrottle = this.defaults.throttle.toString();
      dom_default.debounce(el, event, phxDebounce, defaultDebounce, phxThrottle, defaultThrottle, callback);
    }
    silenceEvents(callback) {
      this.silenced = true;
      callback();
      this.silenced = false;
    }
    on(event, callback) {
      window.addEventListener(event, (e) => {
        if (!this.silenced) {
          callback(e);
        }
      });
    }
  };

  // js/app.js
  var import_topbar = __toModule(require_topbar());
  var csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");
  var Hooks2 = {};
  Hooks2.mainSkinCanvasHook = {
    mounted() {
      skinViewer = new skinview3d.SkinViewer({
        canvas: this.el,
        width: 230,
        height: 400,
        skin: this.el.getAttribute("skin_url"),
        cape: this.el.getAttribute("cloak_url")
      });
      let control = skinview3d.createOrbitControls(skinViewer);
      control.enableRotate = true;
      skinViewer.playerObject.rotation.y = 7;
      skinViewer.animations.add(skinview3d.WalkingAnimation);
      skinViewer.animations.speed = 1;
    }
  };
  Hooks2.viewSettingsFrontSkin = {
    mounted() {
      skinViewer = new skinview3d.SkinViewer({
        canvas: this.el,
        width: 230,
        height: 400,
        skin: this.el.getAttribute("skin_url"),
        cape: this.el.getAttribute("cloak_url")
      });
    }
  };
  Hooks2.viewSettingsBackSkin = {
    mounted() {
      skinViewer = new skinview3d.SkinViewer({
        canvas: this.el,
        width: 230,
        height: 400,
        skin: this.el.getAttribute("skin_url"),
        cape: this.el.getAttribute("cloak_url")
      });
      skinViewer.playerObject.rotation.y = 3.14;
    }
  };
  Hooks2.prefix = {
    mounted() {
      var nick_color = {
        "\u0427\u0435\u0440\u043D\u044B\u0439": "&0",
        "\u0422\u0435\u043C\u043D\u043E-\u0441\u0438\u043D\u0438\u0439": "&1",
        "\u0422\u0435\u043C\u043D\u043E-\u0437\u0435\u043B\u0435\u043D\u044B\u0439": "&2",
        "\u0411\u0438\u0440\u0438\u0437\u043E\u0432\u044B\u0439": "&3",
        "\u0422\u0435\u043C\u043D\u043E-\u043A\u0440\u0430\u0441\u043D\u044B\u0439": "&4",
        "\u0422\u0435\u043C\u043D\u043E-\u0444\u0438\u043E\u043B\u0435\u0442\u043E\u0432\u044B\u0439": "&5",
        "\u0417\u043E\u043B\u043E\u0442\u043E\u0439": "&6",
        "\u0421\u0435\u0440\u044B\u0439": "&7",
        "\u0422\u0435\u043C\u043D\u043E-\u0441\u0435\u0440\u044B\u0439": "&8",
        "\u0421\u0438\u043D\u0438\u0439": "&9",
        "\u0417\u0435\u043B\u0435\u043D\u044B\u0439": "&a",
        "\u0421\u0438\u043D\u0435-\u0437\u0435\u043B\u0435\u043D\u044B\u0439": "&b",
        "\u041A\u0440\u0430\u0441\u043D\u044B\u0439": "&c",
        "\u0424\u0438\u043E\u043B\u0435\u0442\u043E\u0432\u044B\u0439": "&d",
        "\u0416\u0435\u043B\u0442\u044B\u0439": "&e",
        "\u0411\u0435\u043B\u044B\u0439": "&f"
      };
      var color = {
        "1": "blue",
        "2": "green",
        "3": "darkaqua",
        "4": "red",
        "5": "purple",
        "6": "orange",
        "7": "gray",
        "8": "darkgray",
        "9": "lightblue",
        "0": "black",
        "a": "lime",
        "b": "aqua",
        "c": "lightred",
        "d": "pink",
        "e": "yellow",
        "f": "white"
      };
      var input = $("#input");
      var output = $("#output");
      var select = document.getElementById("user_nick_color");
      select.addEventListener("change", function() {
        render(input.val());
      });
      var append;
      input.keyup(function() {
        render($(this).val());
      });
      function render(string) {
        append = "";
        output.html(replacers(string));
      }
      function replacers_input(string) {
        replaced = string.replace(/&k/gi, "").replace(/&l/gi, "").replace(/&m/gi, "").replace(/&n/gi, "").replace(/&o/gi, "").replace(/&r/gi, "").replace(/\\n/gi, "");
        return replaced;
      }
      function replacers(string) {
        string = "&7[&6L&7] &7[" + string + "&7] " + nick_color[select.value] + document.getElementById("output").getAttribute("nickname") + "&7: Hello world";
        replaced = string.replace(/&([a-f0-9])/gi, setColor).replace(/&k/gi, "").replace(/&l/gi, "").replace(/&m/gi, "").replace(/&n/gi, "").replace(/&o/gi, "").replace(/&r/gi, "").replace(/\\n/gi, "");
        return replaced;
      }
      function setColor(match) {
        var value = color[match.substr(1, match.length)];
        addClose;
        return '<span class="' + value + '">';
      }
      function addClose() {
        append = "</span>" + append;
      }
      render(input.val());
    }
  };
  var liveSocket = new LiveSocket("/live", Socket, { hooks: Hooks2, params: { _csrf_token: csrfToken, _host: window.location.hostname } });
  import_topbar.default.config({ barColors: { 0: "#29d" }, shadowColor: "rgba(0, 0, 0, .3)" });
  window.addEventListener("phx:page-loading-start", (info) => {
    import_topbar.default.show();
  });
  window.addEventListener("phx:page-loading-stop", (info) => import_topbar.default.hide());
  liveSocket.connect();
  window.liveSocket = liveSocket;
})();
/**
 * @license MIT
 * topbar 1.0.0, 2021-01-06
 * http://buunguyen.github.io/topbar
 * Copyright (c) 2021 Buu Nguyen
 */
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vYXNzZXRzL3ZlbmRvci90b3BiYXIuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2h0bWwvcHJpdi9zdGF0aWMvcGhvZW5peF9odG1sLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC91dGlscy5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvY29uc3RhbnRzLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC9wdXNoLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC90aW1lci5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvY2hhbm5lbC5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvYWpheC5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvbG9uZ3BvbGwuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4L2Fzc2V0cy9qcy9waG9lbml4L3ByZXNlbmNlLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC9zZXJpYWxpemVyLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC9zb2NrZXQuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvY29uc3RhbnRzLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2VudHJ5X3VwbG9hZGVyLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L3V0aWxzLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2Jyb3dzZXIuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvZG9tLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L3VwbG9hZF9lbnRyeS5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXhfbGl2ZV92aWV3L2Fzc2V0cy9qcy9waG9lbml4X2xpdmVfdmlldy9saXZlX3VwbG9hZGVyLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2hvb2tzLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2RvbV9wb3N0X21vcnBoX3Jlc3RvcmVyLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL25vZGVfbW9kdWxlcy9tb3JwaGRvbS9kaXN0L21vcnBoZG9tLWVzbS5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXhfbGl2ZV92aWV3L2Fzc2V0cy9qcy9waG9lbml4X2xpdmVfdmlldy9kb21fcGF0Y2guanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvcmVuZGVyZWQuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvdmlld19ob29rLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L3ZpZXcuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvbGl2ZV9zb2NrZXQuanMiLCAiLi4vLi4vLi4vYXNzZXRzL2pzL2FwcC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqXG4gKiBAbGljZW5zZSBNSVRcbiAqIHRvcGJhciAxLjAuMCwgMjAyMS0wMS0wNlxuICogaHR0cDovL2J1dW5ndXllbi5naXRodWIuaW8vdG9wYmFyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjEgQnV1IE5ndXllblxuICovXG4oZnVuY3Rpb24gKHdpbmRvdywgZG9jdW1lbnQpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgLy8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vcGF1bGlyaXNoLzE1Nzk2NzFcbiAgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbGFzdFRpbWUgPSAwO1xuICAgIHZhciB2ZW5kb3JzID0gW1wibXNcIiwgXCJtb3pcIiwgXCJ3ZWJraXRcIiwgXCJvXCJdO1xuICAgIGZvciAodmFyIHggPSAwOyB4IDwgdmVuZG9ycy5sZW5ndGggJiYgIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7ICsreCkge1xuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9XG4gICAgICAgIHdpbmRvd1t2ZW5kb3JzW3hdICsgXCJSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcIl07XG4gICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPVxuICAgICAgICB3aW5kb3dbdmVuZG9yc1t4XSArIFwiQ2FuY2VsQW5pbWF0aW9uRnJhbWVcIl0gfHxcbiAgICAgICAgd2luZG93W3ZlbmRvcnNbeF0gKyBcIkNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZVwiXTtcbiAgICB9XG4gICAgaWYgKCF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKVxuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uIChjYWxsYmFjaywgZWxlbWVudCkge1xuICAgICAgICB2YXIgY3VyclRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdmFyIHRpbWVUb0NhbGwgPSBNYXRoLm1heCgwLCAxNiAtIChjdXJyVGltZSAtIGxhc3RUaW1lKSk7XG4gICAgICAgIHZhciBpZCA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjYWxsYmFjayhjdXJyVGltZSArIHRpbWVUb0NhbGwpO1xuICAgICAgICB9LCB0aW1lVG9DYWxsKTtcbiAgICAgICAgbGFzdFRpbWUgPSBjdXJyVGltZSArIHRpbWVUb0NhbGw7XG4gICAgICAgIHJldHVybiBpZDtcbiAgICAgIH07XG4gICAgaWYgKCF3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUpXG4gICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGlkKTtcbiAgICAgIH07XG4gIH0pKCk7XG5cbiAgdmFyIGNhbnZhcyxcbiAgICBwcm9ncmVzc1RpbWVySWQsXG4gICAgZmFkZVRpbWVySWQsXG4gICAgY3VycmVudFByb2dyZXNzLFxuICAgIHNob3dpbmcsXG4gICAgYWRkRXZlbnQgPSBmdW5jdGlvbiAoZWxlbSwgdHlwZSwgaGFuZGxlcikge1xuICAgICAgaWYgKGVsZW0uYWRkRXZlbnRMaXN0ZW5lcikgZWxlbS5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIGZhbHNlKTtcbiAgICAgIGVsc2UgaWYgKGVsZW0uYXR0YWNoRXZlbnQpIGVsZW0uYXR0YWNoRXZlbnQoXCJvblwiICsgdHlwZSwgaGFuZGxlcik7XG4gICAgICBlbHNlIGVsZW1bXCJvblwiICsgdHlwZV0gPSBoYW5kbGVyO1xuICAgIH0sXG4gICAgb3B0aW9ucyA9IHtcbiAgICAgIGF1dG9SdW46IHRydWUsXG4gICAgICBiYXJUaGlja25lc3M6IDMsXG4gICAgICBiYXJDb2xvcnM6IHtcbiAgICAgICAgMDogXCJyZ2JhKDI2LCAgMTg4LCAxNTYsIC45KVwiLFxuICAgICAgICBcIi4yNVwiOiBcInJnYmEoNTIsICAxNTIsIDIxOSwgLjkpXCIsXG4gICAgICAgIFwiLjUwXCI6IFwicmdiYSgyNDEsIDE5NiwgMTUsICAuOSlcIixcbiAgICAgICAgXCIuNzVcIjogXCJyZ2JhKDIzMCwgMTI2LCAzNCwgIC45KVwiLFxuICAgICAgICBcIjEuMFwiOiBcInJnYmEoMjExLCA4NCwgIDAsICAgLjkpXCIsXG4gICAgICB9LFxuICAgICAgc2hhZG93Qmx1cjogMTAsXG4gICAgICBzaGFkb3dDb2xvcjogXCJyZ2JhKDAsICAgMCwgICAwLCAgIC42KVwiLFxuICAgICAgY2xhc3NOYW1lOiBudWxsLFxuICAgIH0sXG4gICAgcmVwYWludCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgY2FudmFzLmhlaWdodCA9IG9wdGlvbnMuYmFyVGhpY2tuZXNzICogNTsgLy8gbmVlZCBzcGFjZSBmb3Igc2hhZG93XG5cbiAgICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgY3R4LnNoYWRvd0JsdXIgPSBvcHRpb25zLnNoYWRvd0JsdXI7XG4gICAgICBjdHguc2hhZG93Q29sb3IgPSBvcHRpb25zLnNoYWRvd0NvbG9yO1xuXG4gICAgICB2YXIgbGluZUdyYWRpZW50ID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KDAsIDAsIGNhbnZhcy53aWR0aCwgMCk7XG4gICAgICBmb3IgKHZhciBzdG9wIGluIG9wdGlvbnMuYmFyQ29sb3JzKVxuICAgICAgICBsaW5lR3JhZGllbnQuYWRkQ29sb3JTdG9wKHN0b3AsIG9wdGlvbnMuYmFyQ29sb3JzW3N0b3BdKTtcbiAgICAgIGN0eC5saW5lV2lkdGggPSBvcHRpb25zLmJhclRoaWNrbmVzcztcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5tb3ZlVG8oMCwgb3B0aW9ucy5iYXJUaGlja25lc3MgLyAyKTtcbiAgICAgIGN0eC5saW5lVG8oXG4gICAgICAgIE1hdGguY2VpbChjdXJyZW50UHJvZ3Jlc3MgKiBjYW52YXMud2lkdGgpLFxuICAgICAgICBvcHRpb25zLmJhclRoaWNrbmVzcyAvIDJcbiAgICAgICk7XG4gICAgICBjdHguc3Ryb2tlU3R5bGUgPSBsaW5lR3JhZGllbnQ7XG4gICAgICBjdHguc3Ryb2tlKCk7XG4gICAgfSxcbiAgICBjcmVhdGVDYW52YXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgdmFyIHN0eWxlID0gY2FudmFzLnN0eWxlO1xuICAgICAgc3R5bGUucG9zaXRpb24gPSBcImZpeGVkXCI7XG4gICAgICBzdHlsZS50b3AgPSBzdHlsZS5sZWZ0ID0gc3R5bGUucmlnaHQgPSBzdHlsZS5tYXJnaW4gPSBzdHlsZS5wYWRkaW5nID0gMDtcbiAgICAgIHN0eWxlLnpJbmRleCA9IDEwMDAwMTtcbiAgICAgIHN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIGlmIChvcHRpb25zLmNsYXNzTmFtZSkgY2FudmFzLmNsYXNzTGlzdC5hZGQob3B0aW9ucy5jbGFzc05hbWUpO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjYW52YXMpO1xuICAgICAgYWRkRXZlbnQod2luZG93LCBcInJlc2l6ZVwiLCByZXBhaW50KTtcbiAgICB9LFxuICAgIHRvcGJhciA9IHtcbiAgICAgIGNvbmZpZzogZnVuY3Rpb24gKG9wdHMpIHtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9wdHMpXG4gICAgICAgICAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSkgb3B0aW9uc1trZXldID0gb3B0c1trZXldO1xuICAgICAgfSxcbiAgICAgIHNob3c6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHNob3dpbmcpIHJldHVybjtcbiAgICAgICAgc2hvd2luZyA9IHRydWU7XG4gICAgICAgIGlmIChmYWRlVGltZXJJZCAhPT0gbnVsbCkgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKGZhZGVUaW1lcklkKTtcbiAgICAgICAgaWYgKCFjYW52YXMpIGNyZWF0ZUNhbnZhcygpO1xuICAgICAgICBjYW52YXMuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICAgIGNhbnZhcy5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICB0b3BiYXIucHJvZ3Jlc3MoMCk7XG4gICAgICAgIGlmIChvcHRpb25zLmF1dG9SdW4pIHtcbiAgICAgICAgICAoZnVuY3Rpb24gbG9vcCgpIHtcbiAgICAgICAgICAgIHByb2dyZXNzVGltZXJJZCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG4gICAgICAgICAgICB0b3BiYXIucHJvZ3Jlc3MoXG4gICAgICAgICAgICAgIFwiK1wiICsgMC4wNSAqIE1hdGgucG93KDEgLSBNYXRoLnNxcnQoY3VycmVudFByb2dyZXNzKSwgMilcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHByb2dyZXNzOiBmdW5jdGlvbiAodG8pIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0byA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIGN1cnJlbnRQcm9ncmVzcztcbiAgICAgICAgaWYgKHR5cGVvZiB0byA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgIHRvID1cbiAgICAgICAgICAgICh0by5pbmRleE9mKFwiK1wiKSA+PSAwIHx8IHRvLmluZGV4T2YoXCItXCIpID49IDBcbiAgICAgICAgICAgICAgPyBjdXJyZW50UHJvZ3Jlc3NcbiAgICAgICAgICAgICAgOiAwKSArIHBhcnNlRmxvYXQodG8pO1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnRQcm9ncmVzcyA9IHRvID4gMSA/IDEgOiB0bztcbiAgICAgICAgcmVwYWludCgpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb2dyZXNzO1xuICAgICAgfSxcbiAgICAgIGhpZGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFzaG93aW5nKSByZXR1cm47XG4gICAgICAgIHNob3dpbmcgPSBmYWxzZTtcbiAgICAgICAgaWYgKHByb2dyZXNzVGltZXJJZCAhPSBudWxsKSB7XG4gICAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKHByb2dyZXNzVGltZXJJZCk7XG4gICAgICAgICAgcHJvZ3Jlc3NUaW1lcklkID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICAoZnVuY3Rpb24gbG9vcCgpIHtcbiAgICAgICAgICBpZiAodG9wYmFyLnByb2dyZXNzKFwiKy4xXCIpID49IDEpIHtcbiAgICAgICAgICAgIGNhbnZhcy5zdHlsZS5vcGFjaXR5IC09IDAuMDU7XG4gICAgICAgICAgICBpZiAoY2FudmFzLnN0eWxlLm9wYWNpdHkgPD0gMC4wNSkge1xuICAgICAgICAgICAgICBjYW52YXMuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICBmYWRlVGltZXJJZCA9IG51bGw7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZmFkZVRpbWVySWQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuICAgICAgICB9KSgpO1xuICAgICAgfSxcbiAgICB9O1xuXG4gIGlmICh0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gdG9wYmFyO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0b3BiYXI7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy50b3BiYXIgPSB0b3BiYXI7XG4gIH1cbn0uY2FsbCh0aGlzLCB3aW5kb3csIGRvY3VtZW50KSk7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbigpIHtcbiAgdmFyIFBvbHlmaWxsRXZlbnQgPSBldmVudENvbnN0cnVjdG9yKCk7XG5cbiAgZnVuY3Rpb24gZXZlbnRDb25zdHJ1Y3RvcigpIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdy5DdXN0b21FdmVudCA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gd2luZG93LkN1c3RvbUV2ZW50O1xuICAgIC8vIElFPD05IFN1cHBvcnRcbiAgICBmdW5jdGlvbiBDdXN0b21FdmVudChldmVudCwgcGFyYW1zKSB7XG4gICAgICBwYXJhbXMgPSBwYXJhbXMgfHwge2J1YmJsZXM6IGZhbHNlLCBjYW5jZWxhYmxlOiBmYWxzZSwgZGV0YWlsOiB1bmRlZmluZWR9O1xuICAgICAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgICAgZXZ0LmluaXRDdXN0b21FdmVudChldmVudCwgcGFyYW1zLmJ1YmJsZXMsIHBhcmFtcy5jYW5jZWxhYmxlLCBwYXJhbXMuZGV0YWlsKTtcbiAgICAgIHJldHVybiBldnQ7XG4gICAgfVxuICAgIEN1c3RvbUV2ZW50LnByb3RvdHlwZSA9IHdpbmRvdy5FdmVudC5wcm90b3R5cGU7XG4gICAgcmV0dXJuIEN1c3RvbUV2ZW50O1xuICB9XG5cbiAgZnVuY3Rpb24gYnVpbGRIaWRkZW5JbnB1dChuYW1lLCB2YWx1ZSkge1xuICAgIHZhciBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBpbnB1dC50eXBlID0gXCJoaWRkZW5cIjtcbiAgICBpbnB1dC5uYW1lID0gbmFtZTtcbiAgICBpbnB1dC52YWx1ZSA9IHZhbHVlO1xuICAgIHJldHVybiBpbnB1dDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUNsaWNrKGVsZW1lbnQsIHRhcmdldE1vZGlmaWVyS2V5KSB7XG4gICAgdmFyIHRvID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRvXCIpLFxuICAgICAgICBtZXRob2QgPSBidWlsZEhpZGRlbklucHV0KFwiX21ldGhvZFwiLCBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtbWV0aG9kXCIpKSxcbiAgICAgICAgY3NyZiA9IGJ1aWxkSGlkZGVuSW5wdXQoXCJfY3NyZl90b2tlblwiLCBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtY3NyZlwiKSksXG4gICAgICAgIGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKSxcbiAgICAgICAgdGFyZ2V0ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJ0YXJnZXRcIik7XG5cbiAgICBmb3JtLm1ldGhvZCA9IChlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtbWV0aG9kXCIpID09PSBcImdldFwiKSA/IFwiZ2V0XCIgOiBcInBvc3RcIjtcbiAgICBmb3JtLmFjdGlvbiA9IHRvO1xuICAgIGZvcm0uc3R5bGUuZGlzcGxheSA9IFwiaGlkZGVuXCI7XG5cbiAgICBpZiAodGFyZ2V0KSBmb3JtLnRhcmdldCA9IHRhcmdldDtcbiAgICBlbHNlIGlmICh0YXJnZXRNb2RpZmllcktleSkgZm9ybS50YXJnZXQgPSBcIl9ibGFua1wiO1xuXG4gICAgZm9ybS5hcHBlbmRDaGlsZChjc3JmKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKG1ldGhvZCk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmb3JtKTtcbiAgICBmb3JtLnN1Ym1pdCgpO1xuICB9XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBlLnRhcmdldDtcbiAgICBpZiAoZS5kZWZhdWx0UHJldmVudGVkKSByZXR1cm47XG5cbiAgICB3aGlsZSAoZWxlbWVudCAmJiBlbGVtZW50LmdldEF0dHJpYnV0ZSkge1xuICAgICAgdmFyIHBob2VuaXhMaW5rRXZlbnQgPSBuZXcgUG9seWZpbGxFdmVudCgncGhvZW5peC5saW5rLmNsaWNrJywge1xuICAgICAgICBcImJ1YmJsZXNcIjogdHJ1ZSwgXCJjYW5jZWxhYmxlXCI6IHRydWVcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIWVsZW1lbnQuZGlzcGF0Y2hFdmVudChwaG9lbml4TGlua0V2ZW50KSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1tZXRob2RcIikpIHtcbiAgICAgICAgaGFuZGxlQ2xpY2soZWxlbWVudCwgZS5tZXRhS2V5IHx8IGUuc2hpZnRLZXkpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGU7XG4gICAgICB9XG4gICAgfVxuICB9LCBmYWxzZSk7XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Bob2VuaXgubGluay5jbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIG1lc3NhZ2UgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbmZpcm1cIik7XG4gICAgaWYobWVzc2FnZSAmJiAhd2luZG93LmNvbmZpcm0obWVzc2FnZSkpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH0sIGZhbHNlKTtcbn0pKCk7XG4iLCAiLy8gd3JhcHMgdmFsdWUgaW4gY2xvc3VyZSBvciByZXR1cm5zIGNsb3N1cmVcbmV4cG9ydCBsZXQgY2xvc3VyZSA9ICh2YWx1ZSkgPT4ge1xuICBpZih0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIil7XG4gICAgcmV0dXJuIHZhbHVlXG4gIH0gZWxzZSB7XG4gICAgbGV0IGNsb3N1cmUgPSBmdW5jdGlvbiAoKXsgcmV0dXJuIHZhbHVlIH1cbiAgICByZXR1cm4gY2xvc3VyZVxuICB9XG59XG4iLCAiZXhwb3J0IGNvbnN0IGdsb2JhbFNlbGYgPSB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiBudWxsXG5leHBvcnQgY29uc3QgcGh4V2luZG93ID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IG51bGxcbmV4cG9ydCBjb25zdCBnbG9iYWwgPSBnbG9iYWxTZWxmIHx8IHBoeFdpbmRvdyB8fCB0aGlzXG5leHBvcnQgY29uc3QgREVGQVVMVF9WU04gPSBcIjIuMC4wXCJcbmV4cG9ydCBjb25zdCBTT0NLRVRfU1RBVEVTID0ge2Nvbm5lY3Rpbmc6IDAsIG9wZW46IDEsIGNsb3Npbmc6IDIsIGNsb3NlZDogM31cbmV4cG9ydCBjb25zdCBERUZBVUxUX1RJTUVPVVQgPSAxMDAwMFxuZXhwb3J0IGNvbnN0IFdTX0NMT1NFX05PUk1BTCA9IDEwMDBcbmV4cG9ydCBjb25zdCBDSEFOTkVMX1NUQVRFUyA9IHtcbiAgY2xvc2VkOiBcImNsb3NlZFwiLFxuICBlcnJvcmVkOiBcImVycm9yZWRcIixcbiAgam9pbmVkOiBcImpvaW5lZFwiLFxuICBqb2luaW5nOiBcImpvaW5pbmdcIixcbiAgbGVhdmluZzogXCJsZWF2aW5nXCIsXG59XG5leHBvcnQgY29uc3QgQ0hBTk5FTF9FVkVOVFMgPSB7XG4gIGNsb3NlOiBcInBoeF9jbG9zZVwiLFxuICBlcnJvcjogXCJwaHhfZXJyb3JcIixcbiAgam9pbjogXCJwaHhfam9pblwiLFxuICByZXBseTogXCJwaHhfcmVwbHlcIixcbiAgbGVhdmU6IFwicGh4X2xlYXZlXCJcbn1cblxuZXhwb3J0IGNvbnN0IFRSQU5TUE9SVFMgPSB7XG4gIGxvbmdwb2xsOiBcImxvbmdwb2xsXCIsXG4gIHdlYnNvY2tldDogXCJ3ZWJzb2NrZXRcIlxufVxuZXhwb3J0IGNvbnN0IFhIUl9TVEFURVMgPSB7XG4gIGNvbXBsZXRlOiA0XG59XG4iLCAiLyoqXG4gKiBJbml0aWFsaXplcyB0aGUgUHVzaFxuICogQHBhcmFtIHtDaGFubmVsfSBjaGFubmVsIC0gVGhlIENoYW5uZWxcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCAtIFRoZSBldmVudCwgZm9yIGV4YW1wbGUgYFwicGh4X2pvaW5cImBcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYXlsb2FkIC0gVGhlIHBheWxvYWQsIGZvciBleGFtcGxlIGB7dXNlcl9pZDogMTIzfWBcbiAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lb3V0IC0gVGhlIHB1c2ggdGltZW91dCBpbiBtaWxsaXNlY29uZHNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHVzaCB7XG4gIGNvbnN0cnVjdG9yKGNoYW5uZWwsIGV2ZW50LCBwYXlsb2FkLCB0aW1lb3V0KXtcbiAgICB0aGlzLmNoYW5uZWwgPSBjaGFubmVsXG4gICAgdGhpcy5ldmVudCA9IGV2ZW50XG4gICAgdGhpcy5wYXlsb2FkID0gcGF5bG9hZCB8fCBmdW5jdGlvbiAoKXsgcmV0dXJuIHt9IH1cbiAgICB0aGlzLnJlY2VpdmVkUmVzcCA9IG51bGxcbiAgICB0aGlzLnRpbWVvdXQgPSB0aW1lb3V0XG4gICAgdGhpcy50aW1lb3V0VGltZXIgPSBudWxsXG4gICAgdGhpcy5yZWNIb29rcyA9IFtdXG4gICAgdGhpcy5zZW50ID0gZmFsc2VcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gdGltZW91dFxuICAgKi9cbiAgcmVzZW5kKHRpbWVvdXQpe1xuICAgIHRoaXMudGltZW91dCA9IHRpbWVvdXRcbiAgICB0aGlzLnJlc2V0KClcbiAgICB0aGlzLnNlbmQoKVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBzZW5kKCl7XG4gICAgaWYodGhpcy5oYXNSZWNlaXZlZChcInRpbWVvdXRcIikpeyByZXR1cm4gfVxuICAgIHRoaXMuc3RhcnRUaW1lb3V0KClcbiAgICB0aGlzLnNlbnQgPSB0cnVlXG4gICAgdGhpcy5jaGFubmVsLnNvY2tldC5wdXNoKHtcbiAgICAgIHRvcGljOiB0aGlzLmNoYW5uZWwudG9waWMsXG4gICAgICBldmVudDogdGhpcy5ldmVudCxcbiAgICAgIHBheWxvYWQ6IHRoaXMucGF5bG9hZCgpLFxuICAgICAgcmVmOiB0aGlzLnJlZixcbiAgICAgIGpvaW5fcmVmOiB0aGlzLmNoYW5uZWwuam9pblJlZigpXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0geyp9IHN0YXR1c1xuICAgKiBAcGFyYW0geyp9IGNhbGxiYWNrXG4gICAqL1xuICByZWNlaXZlKHN0YXR1cywgY2FsbGJhY2spe1xuICAgIGlmKHRoaXMuaGFzUmVjZWl2ZWQoc3RhdHVzKSl7XG4gICAgICBjYWxsYmFjayh0aGlzLnJlY2VpdmVkUmVzcC5yZXNwb25zZSlcbiAgICB9XG5cbiAgICB0aGlzLnJlY0hvb2tzLnB1c2goe3N0YXR1cywgY2FsbGJhY2t9KVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHJlc2V0KCl7XG4gICAgdGhpcy5jYW5jZWxSZWZFdmVudCgpXG4gICAgdGhpcy5yZWYgPSBudWxsXG4gICAgdGhpcy5yZWZFdmVudCA9IG51bGxcbiAgICB0aGlzLnJlY2VpdmVkUmVzcCA9IG51bGxcbiAgICB0aGlzLnNlbnQgPSBmYWxzZVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBtYXRjaFJlY2VpdmUoe3N0YXR1cywgcmVzcG9uc2UsIF9yZWZ9KXtcbiAgICB0aGlzLnJlY0hvb2tzLmZpbHRlcihoID0+IGguc3RhdHVzID09PSBzdGF0dXMpXG4gICAgICAuZm9yRWFjaChoID0+IGguY2FsbGJhY2socmVzcG9uc2UpKVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBjYW5jZWxSZWZFdmVudCgpe1xuICAgIGlmKCF0aGlzLnJlZkV2ZW50KXsgcmV0dXJuIH1cbiAgICB0aGlzLmNoYW5uZWwub2ZmKHRoaXMucmVmRXZlbnQpXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGNhbmNlbFRpbWVvdXQoKXtcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0VGltZXIpXG4gICAgdGhpcy50aW1lb3V0VGltZXIgPSBudWxsXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHN0YXJ0VGltZW91dCgpe1xuICAgIGlmKHRoaXMudGltZW91dFRpbWVyKXsgdGhpcy5jYW5jZWxUaW1lb3V0KCkgfVxuICAgIHRoaXMucmVmID0gdGhpcy5jaGFubmVsLnNvY2tldC5tYWtlUmVmKClcbiAgICB0aGlzLnJlZkV2ZW50ID0gdGhpcy5jaGFubmVsLnJlcGx5RXZlbnROYW1lKHRoaXMucmVmKVxuXG4gICAgdGhpcy5jaGFubmVsLm9uKHRoaXMucmVmRXZlbnQsIHBheWxvYWQgPT4ge1xuICAgICAgdGhpcy5jYW5jZWxSZWZFdmVudCgpXG4gICAgICB0aGlzLmNhbmNlbFRpbWVvdXQoKVxuICAgICAgdGhpcy5yZWNlaXZlZFJlc3AgPSBwYXlsb2FkXG4gICAgICB0aGlzLm1hdGNoUmVjZWl2ZShwYXlsb2FkKVxuICAgIH0pXG5cbiAgICB0aGlzLnRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy50cmlnZ2VyKFwidGltZW91dFwiLCB7fSlcbiAgICB9LCB0aGlzLnRpbWVvdXQpXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGhhc1JlY2VpdmVkKHN0YXR1cyl7XG4gICAgcmV0dXJuIHRoaXMucmVjZWl2ZWRSZXNwICYmIHRoaXMucmVjZWl2ZWRSZXNwLnN0YXR1cyA9PT0gc3RhdHVzXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRyaWdnZXIoc3RhdHVzLCByZXNwb25zZSl7XG4gICAgdGhpcy5jaGFubmVsLnRyaWdnZXIodGhpcy5yZWZFdmVudCwge3N0YXR1cywgcmVzcG9uc2V9KVxuICB9XG59XG4iLCAiLyoqXG4gKlxuICogQ3JlYXRlcyBhIHRpbWVyIHRoYXQgYWNjZXB0cyBhIGB0aW1lckNhbGNgIGZ1bmN0aW9uIHRvIHBlcmZvcm1cbiAqIGNhbGN1bGF0ZWQgdGltZW91dCByZXRyaWVzLCBzdWNoIGFzIGV4cG9uZW50aWFsIGJhY2tvZmYuXG4gKlxuICogQGV4YW1wbGVcbiAqIGxldCByZWNvbm5lY3RUaW1lciA9IG5ldyBUaW1lcigoKSA9PiB0aGlzLmNvbm5lY3QoKSwgZnVuY3Rpb24odHJpZXMpe1xuICogICByZXR1cm4gWzEwMDAsIDUwMDAsIDEwMDAwXVt0cmllcyAtIDFdIHx8IDEwMDAwXG4gKiB9KVxuICogcmVjb25uZWN0VGltZXIuc2NoZWR1bGVUaW1lb3V0KCkgLy8gZmlyZXMgYWZ0ZXIgMTAwMFxuICogcmVjb25uZWN0VGltZXIuc2NoZWR1bGVUaW1lb3V0KCkgLy8gZmlyZXMgYWZ0ZXIgNTAwMFxuICogcmVjb25uZWN0VGltZXIucmVzZXQoKVxuICogcmVjb25uZWN0VGltZXIuc2NoZWR1bGVUaW1lb3V0KCkgLy8gZmlyZXMgYWZ0ZXIgMTAwMFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0aW1lckNhbGNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZXIge1xuICBjb25zdHJ1Y3RvcihjYWxsYmFjaywgdGltZXJDYWxjKXtcbiAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2tcbiAgICB0aGlzLnRpbWVyQ2FsYyA9IHRpbWVyQ2FsY1xuICAgIHRoaXMudGltZXIgPSBudWxsXG4gICAgdGhpcy50cmllcyA9IDBcbiAgfVxuXG4gIHJlc2V0KCl7XG4gICAgdGhpcy50cmllcyA9IDBcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcilcbiAgfVxuXG4gIC8qKlxuICAgKiBDYW5jZWxzIGFueSBwcmV2aW91cyBzY2hlZHVsZVRpbWVvdXQgYW5kIHNjaGVkdWxlcyBjYWxsYmFja1xuICAgKi9cbiAgc2NoZWR1bGVUaW1lb3V0KCl7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpXG5cbiAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnRyaWVzID0gdGhpcy50cmllcyArIDFcbiAgICAgIHRoaXMuY2FsbGJhY2soKVxuICAgIH0sIHRoaXMudGltZXJDYWxjKHRoaXMudHJpZXMgKyAxKSlcbiAgfVxufVxuIiwgImltcG9ydCB7Y2xvc3VyZX0gZnJvbSBcIi4vdXRpbHNcIlxuaW1wb3J0IHtcbiAgQ0hBTk5FTF9FVkVOVFMsXG4gIENIQU5ORUxfU1RBVEVTLFxufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQgUHVzaCBmcm9tIFwiLi9wdXNoXCJcbmltcG9ydCBUaW1lciBmcm9tIFwiLi90aW1lclwiXG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0b3BpY1xuICogQHBhcmFtIHsoT2JqZWN0fGZ1bmN0aW9uKX0gcGFyYW1zXG4gKiBAcGFyYW0ge1NvY2tldH0gc29ja2V0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYW5uZWwge1xuICBjb25zdHJ1Y3Rvcih0b3BpYywgcGFyYW1zLCBzb2NrZXQpe1xuICAgIHRoaXMuc3RhdGUgPSBDSEFOTkVMX1NUQVRFUy5jbG9zZWRcbiAgICB0aGlzLnRvcGljID0gdG9waWNcbiAgICB0aGlzLnBhcmFtcyA9IGNsb3N1cmUocGFyYW1zIHx8IHt9KVxuICAgIHRoaXMuc29ja2V0ID0gc29ja2V0XG4gICAgdGhpcy5iaW5kaW5ncyA9IFtdXG4gICAgdGhpcy5iaW5kaW5nUmVmID0gMFxuICAgIHRoaXMudGltZW91dCA9IHRoaXMuc29ja2V0LnRpbWVvdXRcbiAgICB0aGlzLmpvaW5lZE9uY2UgPSBmYWxzZVxuICAgIHRoaXMuam9pblB1c2ggPSBuZXcgUHVzaCh0aGlzLCBDSEFOTkVMX0VWRU5UUy5qb2luLCB0aGlzLnBhcmFtcywgdGhpcy50aW1lb3V0KVxuICAgIHRoaXMucHVzaEJ1ZmZlciA9IFtdXG4gICAgdGhpcy5zdGF0ZUNoYW5nZVJlZnMgPSBbXVxuXG4gICAgdGhpcy5yZWpvaW5UaW1lciA9IG5ldyBUaW1lcigoKSA9PiB7XG4gICAgICBpZih0aGlzLnNvY2tldC5pc0Nvbm5lY3RlZCgpKXsgdGhpcy5yZWpvaW4oKSB9XG4gICAgfSwgdGhpcy5zb2NrZXQucmVqb2luQWZ0ZXJNcylcbiAgICB0aGlzLnN0YXRlQ2hhbmdlUmVmcy5wdXNoKHRoaXMuc29ja2V0Lm9uRXJyb3IoKCkgPT4gdGhpcy5yZWpvaW5UaW1lci5yZXNldCgpKSlcbiAgICB0aGlzLnN0YXRlQ2hhbmdlUmVmcy5wdXNoKHRoaXMuc29ja2V0Lm9uT3BlbigoKSA9PiB7XG4gICAgICB0aGlzLnJlam9pblRpbWVyLnJlc2V0KClcbiAgICAgIGlmKHRoaXMuaXNFcnJvcmVkKCkpeyB0aGlzLnJlam9pbigpIH1cbiAgICB9KVxuICAgIClcbiAgICB0aGlzLmpvaW5QdXNoLnJlY2VpdmUoXCJva1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMuam9pbmVkXG4gICAgICB0aGlzLnJlam9pblRpbWVyLnJlc2V0KClcbiAgICAgIHRoaXMucHVzaEJ1ZmZlci5mb3JFYWNoKHB1c2hFdmVudCA9PiBwdXNoRXZlbnQuc2VuZCgpKVxuICAgICAgdGhpcy5wdXNoQnVmZmVyID0gW11cbiAgICB9KVxuICAgIHRoaXMuam9pblB1c2gucmVjZWl2ZShcImVycm9yXCIsICgpID0+IHtcbiAgICAgIHRoaXMuc3RhdGUgPSBDSEFOTkVMX1NUQVRFUy5lcnJvcmVkXG4gICAgICBpZih0aGlzLnNvY2tldC5pc0Nvbm5lY3RlZCgpKXsgdGhpcy5yZWpvaW5UaW1lci5zY2hlZHVsZVRpbWVvdXQoKSB9XG4gICAgfSlcbiAgICB0aGlzLm9uQ2xvc2UoKCkgPT4ge1xuICAgICAgdGhpcy5yZWpvaW5UaW1lci5yZXNldCgpXG4gICAgICBpZih0aGlzLnNvY2tldC5oYXNMb2dnZXIoKSkgdGhpcy5zb2NrZXQubG9nKFwiY2hhbm5lbFwiLCBgY2xvc2UgJHt0aGlzLnRvcGljfSAke3RoaXMuam9pblJlZigpfWApXG4gICAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMuY2xvc2VkXG4gICAgICB0aGlzLnNvY2tldC5yZW1vdmUodGhpcylcbiAgICB9KVxuICAgIHRoaXMub25FcnJvcihyZWFzb24gPT4ge1xuICAgICAgaWYodGhpcy5zb2NrZXQuaGFzTG9nZ2VyKCkpIHRoaXMuc29ja2V0LmxvZyhcImNoYW5uZWxcIiwgYGVycm9yICR7dGhpcy50b3BpY31gLCByZWFzb24pXG4gICAgICBpZih0aGlzLmlzSm9pbmluZygpKXsgdGhpcy5qb2luUHVzaC5yZXNldCgpIH1cbiAgICAgIHRoaXMuc3RhdGUgPSBDSEFOTkVMX1NUQVRFUy5lcnJvcmVkXG4gICAgICBpZih0aGlzLnNvY2tldC5pc0Nvbm5lY3RlZCgpKXsgdGhpcy5yZWpvaW5UaW1lci5zY2hlZHVsZVRpbWVvdXQoKSB9XG4gICAgfSlcbiAgICB0aGlzLmpvaW5QdXNoLnJlY2VpdmUoXCJ0aW1lb3V0XCIsICgpID0+IHtcbiAgICAgIGlmKHRoaXMuc29ja2V0Lmhhc0xvZ2dlcigpKSB0aGlzLnNvY2tldC5sb2coXCJjaGFubmVsXCIsIGB0aW1lb3V0ICR7dGhpcy50b3BpY30gKCR7dGhpcy5qb2luUmVmKCl9KWAsIHRoaXMuam9pblB1c2gudGltZW91dClcbiAgICAgIGxldCBsZWF2ZVB1c2ggPSBuZXcgUHVzaCh0aGlzLCBDSEFOTkVMX0VWRU5UUy5sZWF2ZSwgY2xvc3VyZSh7fSksIHRoaXMudGltZW91dClcbiAgICAgIGxlYXZlUHVzaC5zZW5kKClcbiAgICAgIHRoaXMuc3RhdGUgPSBDSEFOTkVMX1NUQVRFUy5lcnJvcmVkXG4gICAgICB0aGlzLmpvaW5QdXNoLnJlc2V0KClcbiAgICAgIGlmKHRoaXMuc29ja2V0LmlzQ29ubmVjdGVkKCkpeyB0aGlzLnJlam9pblRpbWVyLnNjaGVkdWxlVGltZW91dCgpIH1cbiAgICB9KVxuICAgIHRoaXMub24oQ0hBTk5FTF9FVkVOVFMucmVwbHksIChwYXlsb2FkLCByZWYpID0+IHtcbiAgICAgIHRoaXMudHJpZ2dlcih0aGlzLnJlcGx5RXZlbnROYW1lKHJlZiksIHBheWxvYWQpXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBKb2luIHRoZSBjaGFubmVsXG4gICAqIEBwYXJhbSB7aW50ZWdlcn0gdGltZW91dFxuICAgKiBAcmV0dXJucyB7UHVzaH1cbiAgICovXG4gIGpvaW4odGltZW91dCA9IHRoaXMudGltZW91dCl7XG4gICAgaWYodGhpcy5qb2luZWRPbmNlKXtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcInRyaWVkIHRvIGpvaW4gbXVsdGlwbGUgdGltZXMuICdqb2luJyBjYW4gb25seSBiZSBjYWxsZWQgYSBzaW5nbGUgdGltZSBwZXIgY2hhbm5lbCBpbnN0YW5jZVwiKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRpbWVvdXQgPSB0aW1lb3V0XG4gICAgICB0aGlzLmpvaW5lZE9uY2UgPSB0cnVlXG4gICAgICB0aGlzLnJlam9pbigpXG4gICAgICByZXR1cm4gdGhpcy5qb2luUHVzaFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIb29rIGludG8gY2hhbm5lbCBjbG9zZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKi9cbiAgb25DbG9zZShjYWxsYmFjayl7XG4gICAgdGhpcy5vbihDSEFOTkVMX0VWRU5UUy5jbG9zZSwgY2FsbGJhY2spXG4gIH1cblxuICAvKipcbiAgICogSG9vayBpbnRvIGNoYW5uZWwgZXJyb3JzXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAqL1xuICBvbkVycm9yKGNhbGxiYWNrKXtcbiAgICByZXR1cm4gdGhpcy5vbihDSEFOTkVMX0VWRU5UUy5lcnJvciwgcmVhc29uID0+IGNhbGxiYWNrKHJlYXNvbikpXG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaWJlcyBvbiBjaGFubmVsIGV2ZW50c1xuICAgKlxuICAgKiBTdWJzY3JpcHRpb24gcmV0dXJucyBhIHJlZiBjb3VudGVyLCB3aGljaCBjYW4gYmUgdXNlZCBsYXRlciB0b1xuICAgKiB1bnN1YnNjcmliZSB0aGUgZXhhY3QgZXZlbnQgbGlzdGVuZXJcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY29uc3QgcmVmMSA9IGNoYW5uZWwub24oXCJldmVudFwiLCBkb19zdHVmZilcbiAgICogY29uc3QgcmVmMiA9IGNoYW5uZWwub24oXCJldmVudFwiLCBkb19vdGhlcl9zdHVmZilcbiAgICogY2hhbm5lbC5vZmYoXCJldmVudFwiLCByZWYxKVxuICAgKiAvLyBTaW5jZSB1bnN1YnNjcmlwdGlvbiwgZG9fc3R1ZmYgd29uJ3QgZmlyZSxcbiAgICogLy8gd2hpbGUgZG9fb3RoZXJfc3R1ZmYgd2lsbCBrZWVwIGZpcmluZyBvbiB0aGUgXCJldmVudFwiXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKiBAcmV0dXJucyB7aW50ZWdlcn0gcmVmXG4gICAqL1xuICBvbihldmVudCwgY2FsbGJhY2spe1xuICAgIGxldCByZWYgPSB0aGlzLmJpbmRpbmdSZWYrK1xuICAgIHRoaXMuYmluZGluZ3MucHVzaCh7ZXZlbnQsIHJlZiwgY2FsbGJhY2t9KVxuICAgIHJldHVybiByZWZcbiAgfVxuXG4gIC8qKlxuICAgKiBVbnN1YnNjcmliZXMgb2ZmIG9mIGNoYW5uZWwgZXZlbnRzXG4gICAqXG4gICAqIFVzZSB0aGUgcmVmIHJldHVybmVkIGZyb20gYSBjaGFubmVsLm9uKCkgdG8gdW5zdWJzY3JpYmUgb25lXG4gICAqIGhhbmRsZXIsIG9yIHBhc3Mgbm90aGluZyBmb3IgdGhlIHJlZiB0byB1bnN1YnNjcmliZSBhbGxcbiAgICogaGFuZGxlcnMgZm9yIHRoZSBnaXZlbiBldmVudC5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogLy8gVW5zdWJzY3JpYmUgdGhlIGRvX3N0dWZmIGhhbmRsZXJcbiAgICogY29uc3QgcmVmMSA9IGNoYW5uZWwub24oXCJldmVudFwiLCBkb19zdHVmZilcbiAgICogY2hhbm5lbC5vZmYoXCJldmVudFwiLCByZWYxKVxuICAgKlxuICAgKiAvLyBVbnN1YnNjcmliZSBhbGwgaGFuZGxlcnMgZnJvbSBldmVudFxuICAgKiBjaGFubmVsLm9mZihcImV2ZW50XCIpXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFxuICAgKiBAcGFyYW0ge2ludGVnZXJ9IHJlZlxuICAgKi9cbiAgb2ZmKGV2ZW50LCByZWYpe1xuICAgIHRoaXMuYmluZGluZ3MgPSB0aGlzLmJpbmRpbmdzLmZpbHRlcigoYmluZCkgPT4ge1xuICAgICAgcmV0dXJuICEoYmluZC5ldmVudCA9PT0gZXZlbnQgJiYgKHR5cGVvZiByZWYgPT09IFwidW5kZWZpbmVkXCIgfHwgcmVmID09PSBiaW5kLnJlZikpXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY2FuUHVzaCgpeyByZXR1cm4gdGhpcy5zb2NrZXQuaXNDb25uZWN0ZWQoKSAmJiB0aGlzLmlzSm9pbmVkKCkgfVxuXG4gIC8qKlxuICAgKiBTZW5kcyBhIG1lc3NhZ2UgYGV2ZW50YCB0byBwaG9lbml4IHdpdGggdGhlIHBheWxvYWQgYHBheWxvYWRgLlxuICAgKiBQaG9lbml4IHJlY2VpdmVzIHRoaXMgaW4gdGhlIGBoYW5kbGVfaW4oZXZlbnQsIHBheWxvYWQsIHNvY2tldClgXG4gICAqIGZ1bmN0aW9uLiBpZiBwaG9lbml4IHJlcGxpZXMgb3IgaXQgdGltZXMgb3V0IChkZWZhdWx0IDEwMDAwbXMpLFxuICAgKiB0aGVuIG9wdGlvbmFsbHkgdGhlIHJlcGx5IGNhbiBiZSByZWNlaXZlZC5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY2hhbm5lbC5wdXNoKFwiZXZlbnRcIilcbiAgICogICAucmVjZWl2ZShcIm9rXCIsIHBheWxvYWQgPT4gY29uc29sZS5sb2coXCJwaG9lbml4IHJlcGxpZWQ6XCIsIHBheWxvYWQpKVxuICAgKiAgIC5yZWNlaXZlKFwiZXJyb3JcIiwgZXJyID0+IGNvbnNvbGUubG9nKFwicGhvZW5peCBlcnJvcmVkXCIsIGVycikpXG4gICAqICAgLnJlY2VpdmUoXCJ0aW1lb3V0XCIsICgpID0+IGNvbnNvbGUubG9nKFwidGltZWQgb3V0IHB1c2hpbmdcIikpXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gcGF5bG9hZFxuICAgKiBAcGFyYW0ge251bWJlcn0gW3RpbWVvdXRdXG4gICAqIEByZXR1cm5zIHtQdXNofVxuICAgKi9cbiAgcHVzaChldmVudCwgcGF5bG9hZCwgdGltZW91dCA9IHRoaXMudGltZW91dCl7XG4gICAgcGF5bG9hZCA9IHBheWxvYWQgfHwge31cbiAgICBpZighdGhpcy5qb2luZWRPbmNlKXtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdHJpZWQgdG8gcHVzaCAnJHtldmVudH0nIHRvICcke3RoaXMudG9waWN9JyBiZWZvcmUgam9pbmluZy4gVXNlIGNoYW5uZWwuam9pbigpIGJlZm9yZSBwdXNoaW5nIGV2ZW50c2ApXG4gICAgfVxuICAgIGxldCBwdXNoRXZlbnQgPSBuZXcgUHVzaCh0aGlzLCBldmVudCwgZnVuY3Rpb24gKCl7IHJldHVybiBwYXlsb2FkIH0sIHRpbWVvdXQpXG4gICAgaWYodGhpcy5jYW5QdXNoKCkpe1xuICAgICAgcHVzaEV2ZW50LnNlbmQoKVxuICAgIH0gZWxzZSB7XG4gICAgICBwdXNoRXZlbnQuc3RhcnRUaW1lb3V0KClcbiAgICAgIHRoaXMucHVzaEJ1ZmZlci5wdXNoKHB1c2hFdmVudClcbiAgICB9XG5cbiAgICByZXR1cm4gcHVzaEV2ZW50XG4gIH1cblxuICAvKiogTGVhdmVzIHRoZSBjaGFubmVsXG4gICAqXG4gICAqIFVuc3Vic2NyaWJlcyBmcm9tIHNlcnZlciBldmVudHMsIGFuZFxuICAgKiBpbnN0cnVjdHMgY2hhbm5lbCB0byB0ZXJtaW5hdGUgb24gc2VydmVyXG4gICAqXG4gICAqIFRyaWdnZXJzIG9uQ2xvc2UoKSBob29rc1xuICAgKlxuICAgKiBUbyByZWNlaXZlIGxlYXZlIGFja25vd2xlZGdlbWVudHMsIHVzZSB0aGUgYHJlY2VpdmVgXG4gICAqIGhvb2sgdG8gYmluZCB0byB0aGUgc2VydmVyIGFjaywgaWU6XG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNoYW5uZWwubGVhdmUoKS5yZWNlaXZlKFwib2tcIiwgKCkgPT4gYWxlcnQoXCJsZWZ0IVwiKSApXG4gICAqXG4gICAqIEBwYXJhbSB7aW50ZWdlcn0gdGltZW91dFxuICAgKiBAcmV0dXJucyB7UHVzaH1cbiAgICovXG4gIGxlYXZlKHRpbWVvdXQgPSB0aGlzLnRpbWVvdXQpe1xuICAgIHRoaXMucmVqb2luVGltZXIucmVzZXQoKVxuICAgIHRoaXMuam9pblB1c2guY2FuY2VsVGltZW91dCgpXG5cbiAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMubGVhdmluZ1xuICAgIGxldCBvbkNsb3NlID0gKCkgPT4ge1xuICAgICAgaWYodGhpcy5zb2NrZXQuaGFzTG9nZ2VyKCkpIHRoaXMuc29ja2V0LmxvZyhcImNoYW5uZWxcIiwgYGxlYXZlICR7dGhpcy50b3BpY31gKVxuICAgICAgdGhpcy50cmlnZ2VyKENIQU5ORUxfRVZFTlRTLmNsb3NlLCBcImxlYXZlXCIpXG4gICAgfVxuICAgIGxldCBsZWF2ZVB1c2ggPSBuZXcgUHVzaCh0aGlzLCBDSEFOTkVMX0VWRU5UUy5sZWF2ZSwgY2xvc3VyZSh7fSksIHRpbWVvdXQpXG4gICAgbGVhdmVQdXNoLnJlY2VpdmUoXCJva1wiLCAoKSA9PiBvbkNsb3NlKCkpXG4gICAgICAucmVjZWl2ZShcInRpbWVvdXRcIiwgKCkgPT4gb25DbG9zZSgpKVxuICAgIGxlYXZlUHVzaC5zZW5kKClcbiAgICBpZighdGhpcy5jYW5QdXNoKCkpeyBsZWF2ZVB1c2gudHJpZ2dlcihcIm9rXCIsIHt9KSB9XG5cbiAgICByZXR1cm4gbGVhdmVQdXNoXG4gIH1cblxuICAvKipcbiAgICogT3ZlcnJpZGFibGUgbWVzc2FnZSBob29rXG4gICAqXG4gICAqIFJlY2VpdmVzIGFsbCBldmVudHMgZm9yIHNwZWNpYWxpemVkIG1lc3NhZ2UgaGFuZGxpbmdcbiAgICogYmVmb3JlIGRpc3BhdGNoaW5nIHRvIHRoZSBjaGFubmVsIGNhbGxiYWNrcy5cbiAgICpcbiAgICogTXVzdCByZXR1cm4gdGhlIHBheWxvYWQsIG1vZGlmaWVkIG9yIHVubW9kaWZpZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXlsb2FkXG4gICAqIEBwYXJhbSB7aW50ZWdlcn0gcmVmXG4gICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAqL1xuICBvbk1lc3NhZ2UoX2V2ZW50LCBwYXlsb2FkLCBfcmVmKXsgcmV0dXJuIHBheWxvYWQgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaXNNZW1iZXIodG9waWMsIGV2ZW50LCBwYXlsb2FkLCBqb2luUmVmKXtcbiAgICBpZih0aGlzLnRvcGljICE9PSB0b3BpYyl7IHJldHVybiBmYWxzZSB9XG5cbiAgICBpZihqb2luUmVmICYmIGpvaW5SZWYgIT09IHRoaXMuam9pblJlZigpKXtcbiAgICAgIGlmKHRoaXMuc29ja2V0Lmhhc0xvZ2dlcigpKSB0aGlzLnNvY2tldC5sb2coXCJjaGFubmVsXCIsIFwiZHJvcHBpbmcgb3V0ZGF0ZWQgbWVzc2FnZVwiLCB7dG9waWMsIGV2ZW50LCBwYXlsb2FkLCBqb2luUmVmfSlcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgam9pblJlZigpeyByZXR1cm4gdGhpcy5qb2luUHVzaC5yZWYgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcmVqb2luKHRpbWVvdXQgPSB0aGlzLnRpbWVvdXQpe1xuICAgIGlmKHRoaXMuaXNMZWF2aW5nKCkpeyByZXR1cm4gfVxuICAgIHRoaXMuc29ja2V0LmxlYXZlT3BlblRvcGljKHRoaXMudG9waWMpXG4gICAgdGhpcy5zdGF0ZSA9IENIQU5ORUxfU1RBVEVTLmpvaW5pbmdcbiAgICB0aGlzLmpvaW5QdXNoLnJlc2VuZCh0aW1lb3V0KVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0cmlnZ2VyKGV2ZW50LCBwYXlsb2FkLCByZWYsIGpvaW5SZWYpe1xuICAgIGxldCBoYW5kbGVkUGF5bG9hZCA9IHRoaXMub25NZXNzYWdlKGV2ZW50LCBwYXlsb2FkLCByZWYsIGpvaW5SZWYpXG4gICAgaWYocGF5bG9hZCAmJiAhaGFuZGxlZFBheWxvYWQpeyB0aHJvdyBuZXcgRXJyb3IoXCJjaGFubmVsIG9uTWVzc2FnZSBjYWxsYmFja3MgbXVzdCByZXR1cm4gdGhlIHBheWxvYWQsIG1vZGlmaWVkIG9yIHVubW9kaWZpZWRcIikgfVxuXG4gICAgbGV0IGV2ZW50QmluZGluZ3MgPSB0aGlzLmJpbmRpbmdzLmZpbHRlcihiaW5kID0+IGJpbmQuZXZlbnQgPT09IGV2ZW50KVxuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGV2ZW50QmluZGluZ3MubGVuZ3RoOyBpKyspe1xuICAgICAgbGV0IGJpbmQgPSBldmVudEJpbmRpbmdzW2ldXG4gICAgICBiaW5kLmNhbGxiYWNrKGhhbmRsZWRQYXlsb2FkLCByZWYsIGpvaW5SZWYgfHwgdGhpcy5qb2luUmVmKCkpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICByZXBseUV2ZW50TmFtZShyZWYpeyByZXR1cm4gYGNoYW5fcmVwbHlfJHtyZWZ9YCB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpc0Nsb3NlZCgpeyByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gQ0hBTk5FTF9TVEFURVMuY2xvc2VkIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGlzRXJyb3JlZCgpeyByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gQ0hBTk5FTF9TVEFURVMuZXJyb3JlZCB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpc0pvaW5lZCgpeyByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gQ0hBTk5FTF9TVEFURVMuam9pbmVkIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGlzSm9pbmluZygpeyByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gQ0hBTk5FTF9TVEFURVMuam9pbmluZyB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpc0xlYXZpbmcoKXsgcmV0dXJuIHRoaXMuc3RhdGUgPT09IENIQU5ORUxfU1RBVEVTLmxlYXZpbmcgfVxufVxuIiwgImltcG9ydCB7XG4gIGdsb2JhbCxcbiAgWEhSX1NUQVRFU1xufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBamF4IHtcblxuICBzdGF0aWMgcmVxdWVzdChtZXRob2QsIGVuZFBvaW50LCBhY2NlcHQsIGJvZHksIHRpbWVvdXQsIG9udGltZW91dCwgY2FsbGJhY2spe1xuICAgIGlmKGdsb2JhbC5YRG9tYWluUmVxdWVzdCl7XG4gICAgICBsZXQgcmVxID0gbmV3IGdsb2JhbC5YRG9tYWluUmVxdWVzdCgpIC8vIElFOCwgSUU5XG4gICAgICB0aGlzLnhkb21haW5SZXF1ZXN0KHJlcSwgbWV0aG9kLCBlbmRQb2ludCwgYm9keSwgdGltZW91dCwgb250aW1lb3V0LCBjYWxsYmFjaylcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHJlcSA9IG5ldyBnbG9iYWwuWE1MSHR0cFJlcXVlc3QoKSAvLyBJRTcrLCBGaXJlZm94LCBDaHJvbWUsIE9wZXJhLCBTYWZhcmlcbiAgICAgIHRoaXMueGhyUmVxdWVzdChyZXEsIG1ldGhvZCwgZW5kUG9pbnQsIGFjY2VwdCwgYm9keSwgdGltZW91dCwgb250aW1lb3V0LCBjYWxsYmFjaylcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgeGRvbWFpblJlcXVlc3QocmVxLCBtZXRob2QsIGVuZFBvaW50LCBib2R5LCB0aW1lb3V0LCBvbnRpbWVvdXQsIGNhbGxiYWNrKXtcbiAgICByZXEudGltZW91dCA9IHRpbWVvdXRcbiAgICByZXEub3BlbihtZXRob2QsIGVuZFBvaW50KVxuICAgIHJlcS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICBsZXQgcmVzcG9uc2UgPSB0aGlzLnBhcnNlSlNPTihyZXEucmVzcG9uc2VUZXh0KVxuICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2socmVzcG9uc2UpXG4gICAgfVxuICAgIGlmKG9udGltZW91dCl7IHJlcS5vbnRpbWVvdXQgPSBvbnRpbWVvdXQgfVxuXG4gICAgLy8gV29yayBhcm91bmQgYnVnIGluIElFOSB0aGF0IHJlcXVpcmVzIGFuIGF0dGFjaGVkIG9ucHJvZ3Jlc3MgaGFuZGxlclxuICAgIHJlcS5vbnByb2dyZXNzID0gKCkgPT4geyB9XG5cbiAgICByZXEuc2VuZChib2R5KVxuICB9XG5cbiAgc3RhdGljIHhoclJlcXVlc3QocmVxLCBtZXRob2QsIGVuZFBvaW50LCBhY2NlcHQsIGJvZHksIHRpbWVvdXQsIG9udGltZW91dCwgY2FsbGJhY2spe1xuICAgIHJlcS5vcGVuKG1ldGhvZCwgZW5kUG9pbnQsIHRydWUpXG4gICAgcmVxLnRpbWVvdXQgPSB0aW1lb3V0XG4gICAgcmVxLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgYWNjZXB0KVxuICAgIHJlcS5vbmVycm9yID0gKCkgPT4geyBjYWxsYmFjayAmJiBjYWxsYmFjayhudWxsKSB9XG4gICAgcmVxLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcbiAgICAgIGlmKHJlcS5yZWFkeVN0YXRlID09PSBYSFJfU1RBVEVTLmNvbXBsZXRlICYmIGNhbGxiYWNrKXtcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gdGhpcy5wYXJzZUpTT04ocmVxLnJlc3BvbnNlVGV4dClcbiAgICAgICAgY2FsbGJhY2socmVzcG9uc2UpXG4gICAgICB9XG4gICAgfVxuICAgIGlmKG9udGltZW91dCl7IHJlcS5vbnRpbWVvdXQgPSBvbnRpbWVvdXQgfVxuXG4gICAgcmVxLnNlbmQoYm9keSlcbiAgfVxuXG4gIHN0YXRpYyBwYXJzZUpTT04ocmVzcCl7XG4gICAgaWYoIXJlc3AgfHwgcmVzcCA9PT0gXCJcIil7IHJldHVybiBudWxsIH1cblxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXNwKVxuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgY29uc29sZSAmJiBjb25zb2xlLmxvZyhcImZhaWxlZCB0byBwYXJzZSBKU09OIHJlc3BvbnNlXCIsIHJlc3ApXG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBzZXJpYWxpemUob2JqLCBwYXJlbnRLZXkpe1xuICAgIGxldCBxdWVyeVN0ciA9IFtdXG4gICAgZm9yKHZhciBrZXkgaW4gb2JqKXtcbiAgICAgIGlmKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKXsgY29udGludWUgfVxuICAgICAgbGV0IHBhcmFtS2V5ID0gcGFyZW50S2V5ID8gYCR7cGFyZW50S2V5fVske2tleX1dYCA6IGtleVxuICAgICAgbGV0IHBhcmFtVmFsID0gb2JqW2tleV1cbiAgICAgIGlmKHR5cGVvZiBwYXJhbVZhbCA9PT0gXCJvYmplY3RcIil7XG4gICAgICAgIHF1ZXJ5U3RyLnB1c2godGhpcy5zZXJpYWxpemUocGFyYW1WYWwsIHBhcmFtS2V5KSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXJ5U3RyLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtS2V5KSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtVmFsKSlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHF1ZXJ5U3RyLmpvaW4oXCImXCIpXG4gIH1cblxuICBzdGF0aWMgYXBwZW5kUGFyYW1zKHVybCwgcGFyYW1zKXtcbiAgICBpZihPYmplY3Qua2V5cyhwYXJhbXMpLmxlbmd0aCA9PT0gMCl7IHJldHVybiB1cmwgfVxuXG4gICAgbGV0IHByZWZpeCA9IHVybC5tYXRjaCgvXFw/LykgPyBcIiZcIiA6IFwiP1wiXG4gICAgcmV0dXJuIGAke3VybH0ke3ByZWZpeH0ke3RoaXMuc2VyaWFsaXplKHBhcmFtcyl9YFxuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgU09DS0VUX1NUQVRFUyxcbiAgVFJBTlNQT1JUU1xufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQgQWpheCBmcm9tIFwiLi9hamF4XCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9uZ1BvbGwge1xuXG4gIGNvbnN0cnVjdG9yKGVuZFBvaW50KXtcbiAgICB0aGlzLmVuZFBvaW50ID0gbnVsbFxuICAgIHRoaXMudG9rZW4gPSBudWxsXG4gICAgdGhpcy5za2lwSGVhcnRiZWF0ID0gdHJ1ZVxuICAgIHRoaXMub25vcGVuID0gZnVuY3Rpb24gKCl7IH0gLy8gbm9vcFxuICAgIHRoaXMub25lcnJvciA9IGZ1bmN0aW9uICgpeyB9IC8vIG5vb3BcbiAgICB0aGlzLm9ubWVzc2FnZSA9IGZ1bmN0aW9uICgpeyB9IC8vIG5vb3BcbiAgICB0aGlzLm9uY2xvc2UgPSBmdW5jdGlvbiAoKXsgfSAvLyBub29wXG4gICAgdGhpcy5wb2xsRW5kcG9pbnQgPSB0aGlzLm5vcm1hbGl6ZUVuZHBvaW50KGVuZFBvaW50KVxuICAgIHRoaXMucmVhZHlTdGF0ZSA9IFNPQ0tFVF9TVEFURVMuY29ubmVjdGluZ1xuXG4gICAgdGhpcy5wb2xsKClcbiAgfVxuXG4gIG5vcm1hbGl6ZUVuZHBvaW50KGVuZFBvaW50KXtcbiAgICByZXR1cm4gKGVuZFBvaW50XG4gICAgICAucmVwbGFjZShcIndzOi8vXCIsIFwiaHR0cDovL1wiKVxuICAgICAgLnJlcGxhY2UoXCJ3c3M6Ly9cIiwgXCJodHRwczovL1wiKVxuICAgICAgLnJlcGxhY2UobmV3IFJlZ0V4cChcIiguKilcXC9cIiArIFRSQU5TUE9SVFMud2Vic29ja2V0KSwgXCIkMS9cIiArIFRSQU5TUE9SVFMubG9uZ3BvbGwpKVxuICB9XG5cbiAgZW5kcG9pbnRVUkwoKXtcbiAgICByZXR1cm4gQWpheC5hcHBlbmRQYXJhbXModGhpcy5wb2xsRW5kcG9pbnQsIHt0b2tlbjogdGhpcy50b2tlbn0pXG4gIH1cblxuICBjbG9zZUFuZFJldHJ5KCl7XG4gICAgdGhpcy5jbG9zZSgpXG4gICAgdGhpcy5yZWFkeVN0YXRlID0gU09DS0VUX1NUQVRFUy5jb25uZWN0aW5nXG4gIH1cblxuICBvbnRpbWVvdXQoKXtcbiAgICB0aGlzLm9uZXJyb3IoXCJ0aW1lb3V0XCIpXG4gICAgdGhpcy5jbG9zZUFuZFJldHJ5KClcbiAgfVxuXG4gIHBvbGwoKXtcbiAgICBpZighKHRoaXMucmVhZHlTdGF0ZSA9PT0gU09DS0VUX1NUQVRFUy5vcGVuIHx8IHRoaXMucmVhZHlTdGF0ZSA9PT0gU09DS0VUX1NUQVRFUy5jb25uZWN0aW5nKSl7IHJldHVybiB9XG5cbiAgICBBamF4LnJlcXVlc3QoXCJHRVRcIiwgdGhpcy5lbmRwb2ludFVSTCgpLCBcImFwcGxpY2F0aW9uL2pzb25cIiwgbnVsbCwgdGhpcy50aW1lb3V0LCB0aGlzLm9udGltZW91dC5iaW5kKHRoaXMpLCAocmVzcCkgPT4ge1xuICAgICAgaWYocmVzcCl7XG4gICAgICAgIHZhciB7c3RhdHVzLCB0b2tlbiwgbWVzc2FnZXN9ID0gcmVzcFxuICAgICAgICB0aGlzLnRva2VuID0gdG9rZW5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXR1cyA9IDBcbiAgICAgIH1cblxuICAgICAgc3dpdGNoKHN0YXR1cyl7XG4gICAgICAgIGNhc2UgMjAwOlxuICAgICAgICAgIG1lc3NhZ2VzLmZvckVhY2gobXNnID0+IHtcbiAgICAgICAgICAgIC8vIFRhc2tzIGFyZSB3aGF0IHRoaW5ncyBsaWtlIGV2ZW50IGhhbmRsZXJzLCBzZXRUaW1lb3V0IGNhbGxiYWNrcyxcbiAgICAgICAgICAgIC8vIHByb21pc2UgcmVzb2x2ZXMgYW5kIG1vcmUgYXJlIHJ1biB3aXRoaW4uXG4gICAgICAgICAgICAvLyBJbiBtb2Rlcm4gYnJvd3NlcnMsIHRoZXJlIGFyZSB0d28gZGlmZmVyZW50IGtpbmRzIG9mIHRhc2tzLFxuICAgICAgICAgICAgLy8gbWljcm90YXNrcyBhbmQgbWFjcm90YXNrcy5cbiAgICAgICAgICAgIC8vIE1pY3JvdGFza3MgYXJlIG1haW5seSB1c2VkIGZvciBQcm9taXNlcywgd2hpbGUgbWFjcm90YXNrcyBhcmVcbiAgICAgICAgICAgIC8vIHVzZWQgZm9yIGV2ZXJ5dGhpbmcgZWxzZS5cbiAgICAgICAgICAgIC8vIE1pY3JvdGFza3MgYWx3YXlzIGhhdmUgcHJpb3JpdHkgb3ZlciBtYWNyb3Rhc2tzLiBJZiB0aGUgSlMgZW5naW5lXG4gICAgICAgICAgICAvLyBpcyBsb29raW5nIGZvciBhIHRhc2sgdG8gcnVuLCBpdCB3aWxsIGFsd2F5cyB0cnkgdG8gZW1wdHkgdGhlXG4gICAgICAgICAgICAvLyBtaWNyb3Rhc2sgcXVldWUgYmVmb3JlIGF0dGVtcHRpbmcgdG8gcnVuIGFueXRoaW5nIGZyb20gdGhlXG4gICAgICAgICAgICAvLyBtYWNyb3Rhc2sgcXVldWUuXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gRm9yIHRoZSBXZWJTb2NrZXQgdHJhbnNwb3J0LCBtZXNzYWdlcyBhbHdheXMgYXJyaXZlIGluIHRoZWlyIG93blxuICAgICAgICAgICAgLy8gZXZlbnQuIFRoaXMgbWVhbnMgdGhhdCBpZiBhbnkgcHJvbWlzZXMgYXJlIHJlc29sdmVkIGZyb20gd2l0aGluLFxuICAgICAgICAgICAgLy8gdGhlaXIgY2FsbGJhY2tzIHdpbGwgYWx3YXlzIGZpbmlzaCBleGVjdXRpb24gYnkgdGhlIHRpbWUgdGhlXG4gICAgICAgICAgICAvLyBuZXh0IG1lc3NhZ2UgZXZlbnQgaGFuZGxlciBpcyBydW4uXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gSW4gb3JkZXIgdG8gZW11bGF0ZSB0aGlzIGJlaGF2aW91ciwgd2UgbmVlZCB0byBtYWtlIHN1cmUgZWFjaFxuICAgICAgICAgICAgLy8gb25tZXNzYWdlIGhhbmRsZXIgaXMgcnVuIHdpdGhpbiBpdCdzIG93biBtYWNyb3Rhc2suXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5vbm1lc3NhZ2Uoe2RhdGE6IG1zZ30pXG4gICAgICAgICAgICB9LCAwKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgdGhpcy5wb2xsKClcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDIwNDpcbiAgICAgICAgICB0aGlzLnBvbGwoKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgNDEwOlxuICAgICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFNPQ0tFVF9TVEFURVMub3BlblxuICAgICAgICAgIHRoaXMub25vcGVuKClcbiAgICAgICAgICB0aGlzLnBvbGwoKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgNDAzOlxuICAgICAgICAgIHRoaXMub25lcnJvcigpXG4gICAgICAgICAgdGhpcy5jbG9zZSgpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICBjYXNlIDUwMDpcbiAgICAgICAgICB0aGlzLm9uZXJyb3IoKVxuICAgICAgICAgIHRoaXMuY2xvc2VBbmRSZXRyeSgpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKGB1bmhhbmRsZWQgcG9sbCBzdGF0dXMgJHtzdGF0dXN9YClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgc2VuZChib2R5KXtcbiAgICBBamF4LnJlcXVlc3QoXCJQT1NUXCIsIHRoaXMuZW5kcG9pbnRVUkwoKSwgXCJhcHBsaWNhdGlvbi9qc29uXCIsIGJvZHksIHRoaXMudGltZW91dCwgdGhpcy5vbmVycm9yLmJpbmQodGhpcywgXCJ0aW1lb3V0XCIpLCAocmVzcCkgPT4ge1xuICAgICAgaWYoIXJlc3AgfHwgcmVzcC5zdGF0dXMgIT09IDIwMCl7XG4gICAgICAgIHRoaXMub25lcnJvcihyZXNwICYmIHJlc3Auc3RhdHVzKVxuICAgICAgICB0aGlzLmNsb3NlQW5kUmV0cnkoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBjbG9zZShfY29kZSwgX3JlYXNvbil7XG4gICAgdGhpcy5yZWFkeVN0YXRlID0gU09DS0VUX1NUQVRFUy5jbG9zZWRcbiAgICB0aGlzLm9uY2xvc2UoKVxuICB9XG59XG4iLCAiLyoqXG4gKiBJbml0aWFsaXplcyB0aGUgUHJlc2VuY2VcbiAqIEBwYXJhbSB7Q2hhbm5lbH0gY2hhbm5lbCAtIFRoZSBDaGFubmVsXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIFRoZSBvcHRpb25zLFxuICogICAgICAgIGZvciBleGFtcGxlIGB7ZXZlbnRzOiB7c3RhdGU6IFwic3RhdGVcIiwgZGlmZjogXCJkaWZmXCJ9fWBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJlc2VuY2Uge1xuXG4gIGNvbnN0cnVjdG9yKGNoYW5uZWwsIG9wdHMgPSB7fSl7XG4gICAgbGV0IGV2ZW50cyA9IG9wdHMuZXZlbnRzIHx8IHtzdGF0ZTogXCJwcmVzZW5jZV9zdGF0ZVwiLCBkaWZmOiBcInByZXNlbmNlX2RpZmZcIn1cbiAgICB0aGlzLnN0YXRlID0ge31cbiAgICB0aGlzLnBlbmRpbmdEaWZmcyA9IFtdXG4gICAgdGhpcy5jaGFubmVsID0gY2hhbm5lbFxuICAgIHRoaXMuam9pblJlZiA9IG51bGxcbiAgICB0aGlzLmNhbGxlciA9IHtcbiAgICAgIG9uSm9pbjogZnVuY3Rpb24gKCl7IH0sXG4gICAgICBvbkxlYXZlOiBmdW5jdGlvbiAoKXsgfSxcbiAgICAgIG9uU3luYzogZnVuY3Rpb24gKCl7IH1cbiAgICB9XG5cbiAgICB0aGlzLmNoYW5uZWwub24oZXZlbnRzLnN0YXRlLCBuZXdTdGF0ZSA9PiB7XG4gICAgICBsZXQge29uSm9pbiwgb25MZWF2ZSwgb25TeW5jfSA9IHRoaXMuY2FsbGVyXG5cbiAgICAgIHRoaXMuam9pblJlZiA9IHRoaXMuY2hhbm5lbC5qb2luUmVmKClcbiAgICAgIHRoaXMuc3RhdGUgPSBQcmVzZW5jZS5zeW5jU3RhdGUodGhpcy5zdGF0ZSwgbmV3U3RhdGUsIG9uSm9pbiwgb25MZWF2ZSlcblxuICAgICAgdGhpcy5wZW5kaW5nRGlmZnMuZm9yRWFjaChkaWZmID0+IHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFByZXNlbmNlLnN5bmNEaWZmKHRoaXMuc3RhdGUsIGRpZmYsIG9uSm9pbiwgb25MZWF2ZSlcbiAgICAgIH0pXG4gICAgICB0aGlzLnBlbmRpbmdEaWZmcyA9IFtdXG4gICAgICBvblN5bmMoKVxuICAgIH0pXG5cbiAgICB0aGlzLmNoYW5uZWwub24oZXZlbnRzLmRpZmYsIGRpZmYgPT4ge1xuICAgICAgbGV0IHtvbkpvaW4sIG9uTGVhdmUsIG9uU3luY30gPSB0aGlzLmNhbGxlclxuXG4gICAgICBpZih0aGlzLmluUGVuZGluZ1N5bmNTdGF0ZSgpKXtcbiAgICAgICAgdGhpcy5wZW5kaW5nRGlmZnMucHVzaChkaWZmKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFByZXNlbmNlLnN5bmNEaWZmKHRoaXMuc3RhdGUsIGRpZmYsIG9uSm9pbiwgb25MZWF2ZSlcbiAgICAgICAgb25TeW5jKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgb25Kb2luKGNhbGxiYWNrKXsgdGhpcy5jYWxsZXIub25Kb2luID0gY2FsbGJhY2sgfVxuXG4gIG9uTGVhdmUoY2FsbGJhY2speyB0aGlzLmNhbGxlci5vbkxlYXZlID0gY2FsbGJhY2sgfVxuXG4gIG9uU3luYyhjYWxsYmFjayl7IHRoaXMuY2FsbGVyLm9uU3luYyA9IGNhbGxiYWNrIH1cblxuICBsaXN0KGJ5KXsgcmV0dXJuIFByZXNlbmNlLmxpc3QodGhpcy5zdGF0ZSwgYnkpIH1cblxuICBpblBlbmRpbmdTeW5jU3RhdGUoKXtcbiAgICByZXR1cm4gIXRoaXMuam9pblJlZiB8fCAodGhpcy5qb2luUmVmICE9PSB0aGlzLmNoYW5uZWwuam9pblJlZigpKVxuICB9XG5cbiAgLy8gbG93ZXItbGV2ZWwgcHVibGljIHN0YXRpYyBBUElcblxuICAvKipcbiAgICogVXNlZCB0byBzeW5jIHRoZSBsaXN0IG9mIHByZXNlbmNlcyBvbiB0aGUgc2VydmVyXG4gICAqIHdpdGggdGhlIGNsaWVudCdzIHN0YXRlLiBBbiBvcHRpb25hbCBgb25Kb2luYCBhbmQgYG9uTGVhdmVgIGNhbGxiYWNrIGNhblxuICAgKiBiZSBwcm92aWRlZCB0byByZWFjdCB0byBjaGFuZ2VzIGluIHRoZSBjbGllbnQncyBsb2NhbCBwcmVzZW5jZXMgYWNyb3NzXG4gICAqIGRpc2Nvbm5lY3RzIGFuZCByZWNvbm5lY3RzIHdpdGggdGhlIHNlcnZlci5cbiAgICpcbiAgICogQHJldHVybnMge1ByZXNlbmNlfVxuICAgKi9cbiAgc3RhdGljIHN5bmNTdGF0ZShjdXJyZW50U3RhdGUsIG5ld1N0YXRlLCBvbkpvaW4sIG9uTGVhdmUpe1xuICAgIGxldCBzdGF0ZSA9IHRoaXMuY2xvbmUoY3VycmVudFN0YXRlKVxuICAgIGxldCBqb2lucyA9IHt9XG4gICAgbGV0IGxlYXZlcyA9IHt9XG5cbiAgICB0aGlzLm1hcChzdGF0ZSwgKGtleSwgcHJlc2VuY2UpID0+IHtcbiAgICAgIGlmKCFuZXdTdGF0ZVtrZXldKXtcbiAgICAgICAgbGVhdmVzW2tleV0gPSBwcmVzZW5jZVxuICAgICAgfVxuICAgIH0pXG4gICAgdGhpcy5tYXAobmV3U3RhdGUsIChrZXksIG5ld1ByZXNlbmNlKSA9PiB7XG4gICAgICBsZXQgY3VycmVudFByZXNlbmNlID0gc3RhdGVba2V5XVxuICAgICAgaWYoY3VycmVudFByZXNlbmNlKXtcbiAgICAgICAgbGV0IG5ld1JlZnMgPSBuZXdQcmVzZW5jZS5tZXRhcy5tYXAobSA9PiBtLnBoeF9yZWYpXG4gICAgICAgIGxldCBjdXJSZWZzID0gY3VycmVudFByZXNlbmNlLm1ldGFzLm1hcChtID0+IG0ucGh4X3JlZilcbiAgICAgICAgbGV0IGpvaW5lZE1ldGFzID0gbmV3UHJlc2VuY2UubWV0YXMuZmlsdGVyKG0gPT4gY3VyUmVmcy5pbmRleE9mKG0ucGh4X3JlZikgPCAwKVxuICAgICAgICBsZXQgbGVmdE1ldGFzID0gY3VycmVudFByZXNlbmNlLm1ldGFzLmZpbHRlcihtID0+IG5ld1JlZnMuaW5kZXhPZihtLnBoeF9yZWYpIDwgMClcbiAgICAgICAgaWYoam9pbmVkTWV0YXMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgam9pbnNba2V5XSA9IG5ld1ByZXNlbmNlXG4gICAgICAgICAgam9pbnNba2V5XS5tZXRhcyA9IGpvaW5lZE1ldGFzXG4gICAgICAgIH1cbiAgICAgICAgaWYobGVmdE1ldGFzLmxlbmd0aCA+IDApe1xuICAgICAgICAgIGxlYXZlc1trZXldID0gdGhpcy5jbG9uZShjdXJyZW50UHJlc2VuY2UpXG4gICAgICAgICAgbGVhdmVzW2tleV0ubWV0YXMgPSBsZWZ0TWV0YXNcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgam9pbnNba2V5XSA9IG5ld1ByZXNlbmNlXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gdGhpcy5zeW5jRGlmZihzdGF0ZSwge2pvaW5zOiBqb2lucywgbGVhdmVzOiBsZWF2ZXN9LCBvbkpvaW4sIG9uTGVhdmUpXG4gIH1cblxuICAvKipcbiAgICpcbiAgICogVXNlZCB0byBzeW5jIGEgZGlmZiBvZiBwcmVzZW5jZSBqb2luIGFuZCBsZWF2ZVxuICAgKiBldmVudHMgZnJvbSB0aGUgc2VydmVyLCBhcyB0aGV5IGhhcHBlbi4gTGlrZSBgc3luY1N0YXRlYCwgYHN5bmNEaWZmYFxuICAgKiBhY2NlcHRzIG9wdGlvbmFsIGBvbkpvaW5gIGFuZCBgb25MZWF2ZWAgY2FsbGJhY2tzIHRvIHJlYWN0IHRvIGEgdXNlclxuICAgKiBqb2luaW5nIG9yIGxlYXZpbmcgZnJvbSBhIGRldmljZS5cbiAgICpcbiAgICogQHJldHVybnMge1ByZXNlbmNlfVxuICAgKi9cbiAgc3RhdGljIHN5bmNEaWZmKHN0YXRlLCBkaWZmLCBvbkpvaW4sIG9uTGVhdmUpe1xuICAgIGxldCB7am9pbnMsIGxlYXZlc30gPSB0aGlzLmNsb25lKGRpZmYpXG4gICAgaWYoIW9uSm9pbil7IG9uSm9pbiA9IGZ1bmN0aW9uICgpeyB9IH1cbiAgICBpZighb25MZWF2ZSl7IG9uTGVhdmUgPSBmdW5jdGlvbiAoKXsgfSB9XG5cbiAgICB0aGlzLm1hcChqb2lucywgKGtleSwgbmV3UHJlc2VuY2UpID0+IHtcbiAgICAgIGxldCBjdXJyZW50UHJlc2VuY2UgPSBzdGF0ZVtrZXldXG4gICAgICBzdGF0ZVtrZXldID0gdGhpcy5jbG9uZShuZXdQcmVzZW5jZSlcbiAgICAgIGlmKGN1cnJlbnRQcmVzZW5jZSl7XG4gICAgICAgIGxldCBqb2luZWRSZWZzID0gc3RhdGVba2V5XS5tZXRhcy5tYXAobSA9PiBtLnBoeF9yZWYpXG4gICAgICAgIGxldCBjdXJNZXRhcyA9IGN1cnJlbnRQcmVzZW5jZS5tZXRhcy5maWx0ZXIobSA9PiBqb2luZWRSZWZzLmluZGV4T2YobS5waHhfcmVmKSA8IDApXG4gICAgICAgIHN0YXRlW2tleV0ubWV0YXMudW5zaGlmdCguLi5jdXJNZXRhcylcbiAgICAgIH1cbiAgICAgIG9uSm9pbihrZXksIGN1cnJlbnRQcmVzZW5jZSwgbmV3UHJlc2VuY2UpXG4gICAgfSlcbiAgICB0aGlzLm1hcChsZWF2ZXMsIChrZXksIGxlZnRQcmVzZW5jZSkgPT4ge1xuICAgICAgbGV0IGN1cnJlbnRQcmVzZW5jZSA9IHN0YXRlW2tleV1cbiAgICAgIGlmKCFjdXJyZW50UHJlc2VuY2UpeyByZXR1cm4gfVxuICAgICAgbGV0IHJlZnNUb1JlbW92ZSA9IGxlZnRQcmVzZW5jZS5tZXRhcy5tYXAobSA9PiBtLnBoeF9yZWYpXG4gICAgICBjdXJyZW50UHJlc2VuY2UubWV0YXMgPSBjdXJyZW50UHJlc2VuY2UubWV0YXMuZmlsdGVyKHAgPT4ge1xuICAgICAgICByZXR1cm4gcmVmc1RvUmVtb3ZlLmluZGV4T2YocC5waHhfcmVmKSA8IDBcbiAgICAgIH0pXG4gICAgICBvbkxlYXZlKGtleSwgY3VycmVudFByZXNlbmNlLCBsZWZ0UHJlc2VuY2UpXG4gICAgICBpZihjdXJyZW50UHJlc2VuY2UubWV0YXMubGVuZ3RoID09PSAwKXtcbiAgICAgICAgZGVsZXRlIHN0YXRlW2tleV1cbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBzdGF0ZVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGFycmF5IG9mIHByZXNlbmNlcywgd2l0aCBzZWxlY3RlZCBtZXRhZGF0YS5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByZXNlbmNlc1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjaG9vc2VyXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcmVzZW5jZX1cbiAgICovXG4gIHN0YXRpYyBsaXN0KHByZXNlbmNlcywgY2hvb3Nlcil7XG4gICAgaWYoIWNob29zZXIpeyBjaG9vc2VyID0gZnVuY3Rpb24gKGtleSwgcHJlcyl7IHJldHVybiBwcmVzIH0gfVxuXG4gICAgcmV0dXJuIHRoaXMubWFwKHByZXNlbmNlcywgKGtleSwgcHJlc2VuY2UpID0+IHtcbiAgICAgIHJldHVybiBjaG9vc2VyKGtleSwgcHJlc2VuY2UpXG4gICAgfSlcbiAgfVxuXG4gIC8vIHByaXZhdGVcblxuICBzdGF0aWMgbWFwKG9iaiwgZnVuYyl7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikubWFwKGtleSA9PiBmdW5jKGtleSwgb2JqW2tleV0pKVxuICB9XG5cbiAgc3RhdGljIGNsb25lKG9iail7IHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpIH1cbn1cbiIsICIvKiBUaGUgZGVmYXVsdCBzZXJpYWxpemVyIGZvciBlbmNvZGluZyBhbmQgZGVjb2RpbmcgbWVzc2FnZXMgKi9cbmltcG9ydCB7XG4gIENIQU5ORUxfRVZFTlRTXG59IGZyb20gXCIuL2NvbnN0YW50c1wiXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgSEVBREVSX0xFTkdUSDogMSxcbiAgTUVUQV9MRU5HVEg6IDQsXG4gIEtJTkRTOiB7cHVzaDogMCwgcmVwbHk6IDEsIGJyb2FkY2FzdDogMn0sXG5cbiAgZW5jb2RlKG1zZywgY2FsbGJhY2spe1xuICAgIGlmKG1zZy5wYXlsb2FkLmNvbnN0cnVjdG9yID09PSBBcnJheUJ1ZmZlcil7XG4gICAgICByZXR1cm4gY2FsbGJhY2sodGhpcy5iaW5hcnlFbmNvZGUobXNnKSlcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHBheWxvYWQgPSBbbXNnLmpvaW5fcmVmLCBtc2cucmVmLCBtc2cudG9waWMsIG1zZy5ldmVudCwgbXNnLnBheWxvYWRdXG4gICAgICByZXR1cm4gY2FsbGJhY2soSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpXG4gICAgfVxuICB9LFxuXG4gIGRlY29kZShyYXdQYXlsb2FkLCBjYWxsYmFjayl7XG4gICAgaWYocmF3UGF5bG9hZC5jb25zdHJ1Y3RvciA9PT0gQXJyYXlCdWZmZXIpe1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKHRoaXMuYmluYXJ5RGVjb2RlKHJhd1BheWxvYWQpKVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgW2pvaW5fcmVmLCByZWYsIHRvcGljLCBldmVudCwgcGF5bG9hZF0gPSBKU09OLnBhcnNlKHJhd1BheWxvYWQpXG4gICAgICByZXR1cm4gY2FsbGJhY2soe2pvaW5fcmVmLCByZWYsIHRvcGljLCBldmVudCwgcGF5bG9hZH0pXG4gICAgfVxuICB9LFxuXG4gIC8vIHByaXZhdGVcblxuICBiaW5hcnlFbmNvZGUobWVzc2FnZSl7XG4gICAgbGV0IHtqb2luX3JlZiwgcmVmLCBldmVudCwgdG9waWMsIHBheWxvYWR9ID0gbWVzc2FnZVxuICAgIGxldCBtZXRhTGVuZ3RoID0gdGhpcy5NRVRBX0xFTkdUSCArIGpvaW5fcmVmLmxlbmd0aCArIHJlZi5sZW5ndGggKyB0b3BpYy5sZW5ndGggKyBldmVudC5sZW5ndGhcbiAgICBsZXQgaGVhZGVyID0gbmV3IEFycmF5QnVmZmVyKHRoaXMuSEVBREVSX0xFTkdUSCArIG1ldGFMZW5ndGgpXG4gICAgbGV0IHZpZXcgPSBuZXcgRGF0YVZpZXcoaGVhZGVyKVxuICAgIGxldCBvZmZzZXQgPSAwXG5cbiAgICB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCB0aGlzLktJTkRTLnB1c2gpIC8vIGtpbmRcbiAgICB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCBqb2luX3JlZi5sZW5ndGgpXG4gICAgdmlldy5zZXRVaW50OChvZmZzZXQrKywgcmVmLmxlbmd0aClcbiAgICB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCB0b3BpYy5sZW5ndGgpXG4gICAgdmlldy5zZXRVaW50OChvZmZzZXQrKywgZXZlbnQubGVuZ3RoKVxuICAgIEFycmF5LmZyb20oam9pbl9yZWYsIGNoYXIgPT4gdmlldy5zZXRVaW50OChvZmZzZXQrKywgY2hhci5jaGFyQ29kZUF0KDApKSlcbiAgICBBcnJheS5mcm9tKHJlZiwgY2hhciA9PiB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCBjaGFyLmNoYXJDb2RlQXQoMCkpKVxuICAgIEFycmF5LmZyb20odG9waWMsIGNoYXIgPT4gdmlldy5zZXRVaW50OChvZmZzZXQrKywgY2hhci5jaGFyQ29kZUF0KDApKSlcbiAgICBBcnJheS5mcm9tKGV2ZW50LCBjaGFyID0+IHZpZXcuc2V0VWludDgob2Zmc2V0KyssIGNoYXIuY2hhckNvZGVBdCgwKSkpXG5cbiAgICB2YXIgY29tYmluZWQgPSBuZXcgVWludDhBcnJheShoZWFkZXIuYnl0ZUxlbmd0aCArIHBheWxvYWQuYnl0ZUxlbmd0aClcbiAgICBjb21iaW5lZC5zZXQobmV3IFVpbnQ4QXJyYXkoaGVhZGVyKSwgMClcbiAgICBjb21iaW5lZC5zZXQobmV3IFVpbnQ4QXJyYXkocGF5bG9hZCksIGhlYWRlci5ieXRlTGVuZ3RoKVxuXG4gICAgcmV0dXJuIGNvbWJpbmVkLmJ1ZmZlclxuICB9LFxuXG4gIGJpbmFyeURlY29kZShidWZmZXIpe1xuICAgIGxldCB2aWV3ID0gbmV3IERhdGFWaWV3KGJ1ZmZlcilcbiAgICBsZXQga2luZCA9IHZpZXcuZ2V0VWludDgoMClcbiAgICBsZXQgZGVjb2RlciA9IG5ldyBUZXh0RGVjb2RlcigpXG4gICAgc3dpdGNoKGtpbmQpe1xuICAgICAgY2FzZSB0aGlzLktJTkRTLnB1c2g6IHJldHVybiB0aGlzLmRlY29kZVB1c2goYnVmZmVyLCB2aWV3LCBkZWNvZGVyKVxuICAgICAgY2FzZSB0aGlzLktJTkRTLnJlcGx5OiByZXR1cm4gdGhpcy5kZWNvZGVSZXBseShidWZmZXIsIHZpZXcsIGRlY29kZXIpXG4gICAgICBjYXNlIHRoaXMuS0lORFMuYnJvYWRjYXN0OiByZXR1cm4gdGhpcy5kZWNvZGVCcm9hZGNhc3QoYnVmZmVyLCB2aWV3LCBkZWNvZGVyKVxuICAgIH1cbiAgfSxcblxuICBkZWNvZGVQdXNoKGJ1ZmZlciwgdmlldywgZGVjb2Rlcil7XG4gICAgbGV0IGpvaW5SZWZTaXplID0gdmlldy5nZXRVaW50OCgxKVxuICAgIGxldCB0b3BpY1NpemUgPSB2aWV3LmdldFVpbnQ4KDIpXG4gICAgbGV0IGV2ZW50U2l6ZSA9IHZpZXcuZ2V0VWludDgoMylcbiAgICBsZXQgb2Zmc2V0ID0gdGhpcy5IRUFERVJfTEVOR1RIICsgdGhpcy5NRVRBX0xFTkdUSCAtIDEgLy8gcHVzaGVzIGhhdmUgbm8gcmVmXG4gICAgbGV0IGpvaW5SZWYgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBqb2luUmVmU2l6ZSkpXG4gICAgb2Zmc2V0ID0gb2Zmc2V0ICsgam9pblJlZlNpemVcbiAgICBsZXQgdG9waWMgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyB0b3BpY1NpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIHRvcGljU2l6ZVxuICAgIGxldCBldmVudCA9IGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIG9mZnNldCArIGV2ZW50U2l6ZSkpXG4gICAgb2Zmc2V0ID0gb2Zmc2V0ICsgZXZlbnRTaXplXG4gICAgbGV0IGRhdGEgPSBidWZmZXIuc2xpY2Uob2Zmc2V0LCBidWZmZXIuYnl0ZUxlbmd0aClcbiAgICByZXR1cm4ge2pvaW5fcmVmOiBqb2luUmVmLCByZWY6IG51bGwsIHRvcGljOiB0b3BpYywgZXZlbnQ6IGV2ZW50LCBwYXlsb2FkOiBkYXRhfVxuICB9LFxuXG4gIGRlY29kZVJlcGx5KGJ1ZmZlciwgdmlldywgZGVjb2Rlcil7XG4gICAgbGV0IGpvaW5SZWZTaXplID0gdmlldy5nZXRVaW50OCgxKVxuICAgIGxldCByZWZTaXplID0gdmlldy5nZXRVaW50OCgyKVxuICAgIGxldCB0b3BpY1NpemUgPSB2aWV3LmdldFVpbnQ4KDMpXG4gICAgbGV0IGV2ZW50U2l6ZSA9IHZpZXcuZ2V0VWludDgoNClcbiAgICBsZXQgb2Zmc2V0ID0gdGhpcy5IRUFERVJfTEVOR1RIICsgdGhpcy5NRVRBX0xFTkdUSFxuICAgIGxldCBqb2luUmVmID0gZGVjb2Rlci5kZWNvZGUoYnVmZmVyLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgam9pblJlZlNpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIGpvaW5SZWZTaXplXG4gICAgbGV0IHJlZiA9IGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIG9mZnNldCArIHJlZlNpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIHJlZlNpemVcbiAgICBsZXQgdG9waWMgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyB0b3BpY1NpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIHRvcGljU2l6ZVxuICAgIGxldCBldmVudCA9IGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIG9mZnNldCArIGV2ZW50U2l6ZSkpXG4gICAgb2Zmc2V0ID0gb2Zmc2V0ICsgZXZlbnRTaXplXG4gICAgbGV0IGRhdGEgPSBidWZmZXIuc2xpY2Uob2Zmc2V0LCBidWZmZXIuYnl0ZUxlbmd0aClcbiAgICBsZXQgcGF5bG9hZCA9IHtzdGF0dXM6IGV2ZW50LCByZXNwb25zZTogZGF0YX1cbiAgICByZXR1cm4ge2pvaW5fcmVmOiBqb2luUmVmLCByZWY6IHJlZiwgdG9waWM6IHRvcGljLCBldmVudDogQ0hBTk5FTF9FVkVOVFMucmVwbHksIHBheWxvYWQ6IHBheWxvYWR9XG4gIH0sXG5cbiAgZGVjb2RlQnJvYWRjYXN0KGJ1ZmZlciwgdmlldywgZGVjb2Rlcil7XG4gICAgbGV0IHRvcGljU2l6ZSA9IHZpZXcuZ2V0VWludDgoMSlcbiAgICBsZXQgZXZlbnRTaXplID0gdmlldy5nZXRVaW50OCgyKVxuICAgIGxldCBvZmZzZXQgPSB0aGlzLkhFQURFUl9MRU5HVEggKyAyXG4gICAgbGV0IHRvcGljID0gZGVjb2Rlci5kZWNvZGUoYnVmZmVyLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgdG9waWNTaXplKSlcbiAgICBvZmZzZXQgPSBvZmZzZXQgKyB0b3BpY1NpemVcbiAgICBsZXQgZXZlbnQgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBldmVudFNpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIGV2ZW50U2l6ZVxuICAgIGxldCBkYXRhID0gYnVmZmVyLnNsaWNlKG9mZnNldCwgYnVmZmVyLmJ5dGVMZW5ndGgpXG5cbiAgICByZXR1cm4ge2pvaW5fcmVmOiBudWxsLCByZWY6IG51bGwsIHRvcGljOiB0b3BpYywgZXZlbnQ6IGV2ZW50LCBwYXlsb2FkOiBkYXRhfVxuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgZ2xvYmFsLFxuICBwaHhXaW5kb3csXG4gIENIQU5ORUxfRVZFTlRTLFxuICBERUZBVUxUX1RJTUVPVVQsXG4gIERFRkFVTFRfVlNOLFxuICBTT0NLRVRfU1RBVEVTLFxuICBUUkFOU1BPUlRTLFxuICBXU19DTE9TRV9OT1JNQUxcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IHtcbiAgY2xvc3VyZVxufSBmcm9tIFwiLi91dGlsc1wiXG5cbmltcG9ydCBBamF4IGZyb20gXCIuL2FqYXhcIlxuaW1wb3J0IENoYW5uZWwgZnJvbSBcIi4vY2hhbm5lbFwiXG5pbXBvcnQgTG9uZ1BvbGwgZnJvbSBcIi4vbG9uZ3BvbGxcIlxuaW1wb3J0IFNlcmlhbGl6ZXIgZnJvbSBcIi4vc2VyaWFsaXplclwiXG5pbXBvcnQgVGltZXIgZnJvbSBcIi4vdGltZXJcIlxuXG4vKiogSW5pdGlhbGl6ZXMgdGhlIFNvY2tldCAqXG4gKlxuICogRm9yIElFOCBzdXBwb3J0IHVzZSBhbiBFUzUtc2hpbSAoaHR0cHM6Ly9naXRodWIuY29tL2VzLXNoaW1zL2VzNS1zaGltKVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbmRQb2ludCAtIFRoZSBzdHJpbmcgV2ViU29ja2V0IGVuZHBvaW50LCBpZSwgYFwid3M6Ly9leGFtcGxlLmNvbS9zb2NrZXRcImAsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYFwid3NzOi8vZXhhbXBsZS5jb21cImBcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgXCIvc29ja2V0XCJgIChpbmhlcml0ZWQgaG9zdCAmIHByb3RvY29sKVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRzXSAtIE9wdGlvbmFsIGNvbmZpZ3VyYXRpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRzLnRyYW5zcG9ydF0gLSBUaGUgV2Vic29ja2V0IFRyYW5zcG9ydCwgZm9yIGV4YW1wbGUgV2ViU29ja2V0IG9yIFBob2VuaXguTG9uZ1BvbGwuXG4gKlxuICogRGVmYXVsdHMgdG8gV2ViU29ja2V0IHdpdGggYXV0b21hdGljIExvbmdQb2xsIGZhbGxiYWNrLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdHMuZW5jb2RlXSAtIFRoZSBmdW5jdGlvbiB0byBlbmNvZGUgb3V0Z29pbmcgbWVzc2FnZXMuXG4gKlxuICogRGVmYXVsdHMgdG8gSlNPTiBlbmNvZGVyLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRzLmRlY29kZV0gLSBUaGUgZnVuY3Rpb24gdG8gZGVjb2RlIGluY29taW5nIG1lc3NhZ2VzLlxuICpcbiAqIERlZmF1bHRzIHRvIEpTT046XG4gKlxuICogYGBgamF2YXNjcmlwdFxuICogKHBheWxvYWQsIGNhbGxiYWNrKSA9PiBjYWxsYmFjayhKU09OLnBhcnNlKHBheWxvYWQpKVxuICogYGBgXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRzLnRpbWVvdXRdIC0gVGhlIGRlZmF1bHQgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gdHJpZ2dlciBwdXNoIHRpbWVvdXRzLlxuICpcbiAqIERlZmF1bHRzIGBERUZBVUxUX1RJTUVPVVRgXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdHMuaGVhcnRiZWF0SW50ZXJ2YWxNc10gLSBUaGUgbWlsbGlzZWMgaW50ZXJ2YWwgdG8gc2VuZCBhIGhlYXJ0YmVhdCBtZXNzYWdlXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdHMucmVjb25uZWN0QWZ0ZXJNc10gLSBUaGUgb3B0aW9uYWwgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBtaWxsc2VjXG4gKiBzb2NrZXQgcmVjb25uZWN0IGludGVydmFsLlxuICpcbiAqIERlZmF1bHRzIHRvIHN0ZXBwZWQgYmFja29mZiBvZjpcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBmdW5jdGlvbih0cmllcyl7XG4gKiAgIHJldHVybiBbMTAsIDUwLCAxMDAsIDE1MCwgMjAwLCAyNTAsIDUwMCwgMTAwMCwgMjAwMF1bdHJpZXMgLSAxXSB8fCA1MDAwXG4gKiB9XG4gKiBgYGBgXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRzLnJlam9pbkFmdGVyTXNdIC0gVGhlIG9wdGlvbmFsIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgbWlsbHNlY1xuICogcmVqb2luIGludGVydmFsIGZvciBpbmRpdmlkdWFsIGNoYW5uZWxzLlxuICpcbiAqIGBgYGphdmFzY3JpcHRcbiAqIGZ1bmN0aW9uKHRyaWVzKXtcbiAqICAgcmV0dXJuIFsxMDAwLCAyMDAwLCA1MDAwXVt0cmllcyAtIDFdIHx8IDEwMDAwXG4gKiB9XG4gKiBgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdHMubG9nZ2VyXSAtIFRoZSBvcHRpb25hbCBmdW5jdGlvbiBmb3Igc3BlY2lhbGl6ZWQgbG9nZ2luZywgaWU6XG4gKlxuICogYGBgamF2YXNjcmlwdFxuICogZnVuY3Rpb24oa2luZCwgbXNnLCBkYXRhKSB7XG4gKiAgIGNvbnNvbGUubG9nKGAke2tpbmR9OiAke21zZ31gLCBkYXRhKVxuICogfVxuICogYGBgXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRzLmxvbmdwb2xsZXJUaW1lb3V0XSAtIFRoZSBtYXhpbXVtIHRpbWVvdXQgb2YgYSBsb25nIHBvbGwgQUpBWCByZXF1ZXN0LlxuICpcbiAqIERlZmF1bHRzIHRvIDIwcyAoZG91YmxlIHRoZSBzZXJ2ZXIgbG9uZyBwb2xsIHRpbWVyKS5cbiAqXG4gKiBAcGFyYW0geyhPYmplY3R8ZnVuY3Rpb24pfSBbb3B0cy5wYXJhbXNdIC0gVGhlIG9wdGlvbmFsIHBhcmFtcyB0byBwYXNzIHdoZW4gY29ubmVjdGluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtvcHRzLmJpbmFyeVR5cGVdIC0gVGhlIGJpbmFyeSB0eXBlIHRvIHVzZSBmb3IgYmluYXJ5IFdlYlNvY2tldCBmcmFtZXMuXG4gKlxuICogRGVmYXVsdHMgdG8gXCJhcnJheWJ1ZmZlclwiXG4gKlxuICogQHBhcmFtIHt2c259IFtvcHRzLnZzbl0gLSBUaGUgc2VyaWFsaXplcidzIHByb3RvY29sIHZlcnNpb24gdG8gc2VuZCBvbiBjb25uZWN0LlxuICpcbiAqIERlZmF1bHRzIHRvIERFRkFVTFRfVlNOLlxuKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNvY2tldCB7XG4gIGNvbnN0cnVjdG9yKGVuZFBvaW50LCBvcHRzID0ge30pe1xuICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MgPSB7b3BlbjogW10sIGNsb3NlOiBbXSwgZXJyb3I6IFtdLCBtZXNzYWdlOiBbXX1cbiAgICB0aGlzLmNoYW5uZWxzID0gW11cbiAgICB0aGlzLnNlbmRCdWZmZXIgPSBbXVxuICAgIHRoaXMucmVmID0gMFxuICAgIHRoaXMudGltZW91dCA9IG9wdHMudGltZW91dCB8fCBERUZBVUxUX1RJTUVPVVRcbiAgICB0aGlzLnRyYW5zcG9ydCA9IG9wdHMudHJhbnNwb3J0IHx8IGdsb2JhbC5XZWJTb2NrZXQgfHwgTG9uZ1BvbGxcbiAgICB0aGlzLmVzdGFibGlzaGVkQ29ubmVjdGlvbnMgPSAwXG4gICAgdGhpcy5kZWZhdWx0RW5jb2RlciA9IFNlcmlhbGl6ZXIuZW5jb2RlLmJpbmQoU2VyaWFsaXplcilcbiAgICB0aGlzLmRlZmF1bHREZWNvZGVyID0gU2VyaWFsaXplci5kZWNvZGUuYmluZChTZXJpYWxpemVyKVxuICAgIHRoaXMuY2xvc2VXYXNDbGVhbiA9IGZhbHNlXG4gICAgdGhpcy5iaW5hcnlUeXBlID0gb3B0cy5iaW5hcnlUeXBlIHx8IFwiYXJyYXlidWZmZXJcIlxuICAgIHRoaXMuY29ubmVjdENsb2NrID0gMVxuICAgIGlmKHRoaXMudHJhbnNwb3J0ICE9PSBMb25nUG9sbCl7XG4gICAgICB0aGlzLmVuY29kZSA9IG9wdHMuZW5jb2RlIHx8IHRoaXMuZGVmYXVsdEVuY29kZXJcbiAgICAgIHRoaXMuZGVjb2RlID0gb3B0cy5kZWNvZGUgfHwgdGhpcy5kZWZhdWx0RGVjb2RlclxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVuY29kZSA9IHRoaXMuZGVmYXVsdEVuY29kZXJcbiAgICAgIHRoaXMuZGVjb2RlID0gdGhpcy5kZWZhdWx0RGVjb2RlclxuICAgIH1cbiAgICBsZXQgYXdhaXRpbmdDb25uZWN0aW9uT25QYWdlU2hvdyA9IG51bGxcbiAgICBpZihwaHhXaW5kb3cgJiYgcGh4V2luZG93LmFkZEV2ZW50TGlzdGVuZXIpe1xuICAgICAgcGh4V2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlaGlkZVwiLCBfZSA9PiB7XG4gICAgICAgIGlmKHRoaXMuY29ubil7XG4gICAgICAgICAgdGhpcy5kaXNjb25uZWN0KClcbiAgICAgICAgICBhd2FpdGluZ0Nvbm5lY3Rpb25PblBhZ2VTaG93ID0gdGhpcy5jb25uZWN0Q2xvY2tcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHBoeFdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgX2UgPT4ge1xuICAgICAgICBpZihhd2FpdGluZ0Nvbm5lY3Rpb25PblBhZ2VTaG93ID09PSB0aGlzLmNvbm5lY3RDbG9jayl7XG4gICAgICAgICAgYXdhaXRpbmdDb25uZWN0aW9uT25QYWdlU2hvdyA9IG51bGxcbiAgICAgICAgICB0aGlzLmNvbm5lY3QoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICB0aGlzLmhlYXJ0YmVhdEludGVydmFsTXMgPSBvcHRzLmhlYXJ0YmVhdEludGVydmFsTXMgfHwgMzAwMDBcbiAgICB0aGlzLnJlam9pbkFmdGVyTXMgPSAodHJpZXMpID0+IHtcbiAgICAgIGlmKG9wdHMucmVqb2luQWZ0ZXJNcyl7XG4gICAgICAgIHJldHVybiBvcHRzLnJlam9pbkFmdGVyTXModHJpZXMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gWzEwMDAsIDIwMDAsIDUwMDBdW3RyaWVzIC0gMV0gfHwgMTAwMDBcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5yZWNvbm5lY3RBZnRlck1zID0gKHRyaWVzKSA9PiB7XG4gICAgICBpZihvcHRzLnJlY29ubmVjdEFmdGVyTXMpe1xuICAgICAgICByZXR1cm4gb3B0cy5yZWNvbm5lY3RBZnRlck1zKHRyaWVzKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFsxMCwgNTAsIDEwMCwgMTUwLCAyMDAsIDI1MCwgNTAwLCAxMDAwLCAyMDAwXVt0cmllcyAtIDFdIHx8IDUwMDBcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5sb2dnZXIgPSBvcHRzLmxvZ2dlciB8fCBudWxsXG4gICAgdGhpcy5sb25ncG9sbGVyVGltZW91dCA9IG9wdHMubG9uZ3BvbGxlclRpbWVvdXQgfHwgMjAwMDBcbiAgICB0aGlzLnBhcmFtcyA9IGNsb3N1cmUob3B0cy5wYXJhbXMgfHwge30pXG4gICAgdGhpcy5lbmRQb2ludCA9IGAke2VuZFBvaW50fS8ke1RSQU5TUE9SVFMud2Vic29ja2V0fWBcbiAgICB0aGlzLnZzbiA9IG9wdHMudnNuIHx8IERFRkFVTFRfVlNOXG4gICAgdGhpcy5oZWFydGJlYXRUaW1lciA9IG51bGxcbiAgICB0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYgPSBudWxsXG4gICAgdGhpcy5yZWNvbm5lY3RUaW1lciA9IG5ldyBUaW1lcigoKSA9PiB7XG4gICAgICB0aGlzLnRlYXJkb3duKCgpID0+IHRoaXMuY29ubmVjdCgpKVxuICAgIH0sIHRoaXMucmVjb25uZWN0QWZ0ZXJNcylcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNjb25uZWN0cyBhbmQgcmVwbGFjZXMgdGhlIGFjdGl2ZSB0cmFuc3BvcnRcbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbmV3VHJhbnNwb3J0IC0gVGhlIG5ldyB0cmFuc3BvcnQgY2xhc3MgdG8gaW5zdGFudGlhdGVcbiAgICpcbiAgICovXG4gIHJlcGxhY2VUcmFuc3BvcnQobmV3VHJhbnNwb3J0KXtcbiAgICB0aGlzLmRpc2Nvbm5lY3QoKVxuICAgIHRoaXMudHJhbnNwb3J0ID0gbmV3VHJhbnNwb3J0XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgc29ja2V0IHByb3RvY29sXG4gICAqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBwcm90b2NvbCgpeyByZXR1cm4gbG9jYXRpb24ucHJvdG9jb2wubWF0Y2goL15odHRwcy8pID8gXCJ3c3NcIiA6IFwid3NcIiB9XG5cbiAgLyoqXG4gICAqIFRoZSBmdWxseSBxdWFsaWZlZCBzb2NrZXQgdXJsXG4gICAqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBlbmRQb2ludFVSTCgpe1xuICAgIGxldCB1cmkgPSBBamF4LmFwcGVuZFBhcmFtcyhcbiAgICAgIEFqYXguYXBwZW5kUGFyYW1zKHRoaXMuZW5kUG9pbnQsIHRoaXMucGFyYW1zKCkpLCB7dnNuOiB0aGlzLnZzbn0pXG4gICAgaWYodXJpLmNoYXJBdCgwKSAhPT0gXCIvXCIpeyByZXR1cm4gdXJpIH1cbiAgICBpZih1cmkuY2hhckF0KDEpID09PSBcIi9cIil7IHJldHVybiBgJHt0aGlzLnByb3RvY29sKCl9OiR7dXJpfWAgfVxuXG4gICAgcmV0dXJuIGAke3RoaXMucHJvdG9jb2woKX06Ly8ke2xvY2F0aW9uLmhvc3R9JHt1cml9YFxuICB9XG5cbiAgLyoqXG4gICAqIERpc2Nvbm5lY3RzIHRoZSBzb2NrZXRcbiAgICpcbiAgICogU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9DbG9zZUV2ZW50I1N0YXR1c19jb2RlcyBmb3IgdmFsaWQgc3RhdHVzIGNvZGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIE9wdGlvbmFsIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCBhZnRlciBzb2NrZXQgaXMgZGlzY29ubmVjdGVkLlxuICAgKiBAcGFyYW0ge2ludGVnZXJ9IGNvZGUgLSBBIHN0YXR1cyBjb2RlIGZvciBkaXNjb25uZWN0aW9uIChPcHRpb25hbCkuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWFzb24gLSBBIHRleHR1YWwgZGVzY3JpcHRpb24gb2YgdGhlIHJlYXNvbiB0byBkaXNjb25uZWN0LiAoT3B0aW9uYWwpXG4gICAqL1xuICBkaXNjb25uZWN0KGNhbGxiYWNrLCBjb2RlLCByZWFzb24pe1xuICAgIHRoaXMuY29ubmVjdENsb2NrKytcbiAgICB0aGlzLmNsb3NlV2FzQ2xlYW4gPSB0cnVlXG4gICAgdGhpcy5yZWNvbm5lY3RUaW1lci5yZXNldCgpXG4gICAgdGhpcy50ZWFyZG93bihjYWxsYmFjaywgY29kZSwgcmVhc29uKVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgLSBUaGUgcGFyYW1zIHRvIHNlbmQgd2hlbiBjb25uZWN0aW5nLCBmb3IgZXhhbXBsZSBge3VzZXJfaWQ6IHVzZXJUb2tlbn1gXG4gICAqXG4gICAqIFBhc3NpbmcgcGFyYW1zIHRvIGNvbm5lY3QgaXMgZGVwcmVjYXRlZDsgcGFzcyB0aGVtIGluIHRoZSBTb2NrZXQgY29uc3RydWN0b3IgaW5zdGVhZDpcbiAgICogYG5ldyBTb2NrZXQoXCIvc29ja2V0XCIsIHtwYXJhbXM6IHt1c2VyX2lkOiB1c2VyVG9rZW59fSlgLlxuICAgKi9cbiAgY29ubmVjdChwYXJhbXMpe1xuICAgIHRoaXMuY29ubmVjdENsb2NrKytcbiAgICBpZihwYXJhbXMpe1xuICAgICAgY29uc29sZSAmJiBjb25zb2xlLmxvZyhcInBhc3NpbmcgcGFyYW1zIHRvIGNvbm5lY3QgaXMgZGVwcmVjYXRlZC4gSW5zdGVhZCBwYXNzIDpwYXJhbXMgdG8gdGhlIFNvY2tldCBjb25zdHJ1Y3RvclwiKVxuICAgICAgdGhpcy5wYXJhbXMgPSBjbG9zdXJlKHBhcmFtcylcbiAgICB9XG4gICAgaWYodGhpcy5jb25uKXsgcmV0dXJuIH1cbiAgICB0aGlzLmNsb3NlV2FzQ2xlYW4gPSBmYWxzZVxuICAgIHRoaXMuY29ubiA9IG5ldyB0aGlzLnRyYW5zcG9ydCh0aGlzLmVuZFBvaW50VVJMKCkpXG4gICAgdGhpcy5jb25uLmJpbmFyeVR5cGUgPSB0aGlzLmJpbmFyeVR5cGVcbiAgICB0aGlzLmNvbm4udGltZW91dCA9IHRoaXMubG9uZ3BvbGxlclRpbWVvdXRcbiAgICB0aGlzLmNvbm4ub25vcGVuID0gKCkgPT4gdGhpcy5vbkNvbm5PcGVuKClcbiAgICB0aGlzLmNvbm4ub25lcnJvciA9IGVycm9yID0+IHRoaXMub25Db25uRXJyb3IoZXJyb3IpXG4gICAgdGhpcy5jb25uLm9ubWVzc2FnZSA9IGV2ZW50ID0+IHRoaXMub25Db25uTWVzc2FnZShldmVudClcbiAgICB0aGlzLmNvbm4ub25jbG9zZSA9IGV2ZW50ID0+IHRoaXMub25Db25uQ2xvc2UoZXZlbnQpXG4gIH1cblxuICAvKipcbiAgICogTG9ncyB0aGUgbWVzc2FnZS4gT3ZlcnJpZGUgYHRoaXMubG9nZ2VyYCBmb3Igc3BlY2lhbGl6ZWQgbG9nZ2luZy4gbm9vcHMgYnkgZGVmYXVsdFxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2luZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gbXNnXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAqL1xuICBsb2coa2luZCwgbXNnLCBkYXRhKXsgdGhpcy5sb2dnZXIoa2luZCwgbXNnLCBkYXRhKSB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiBhIGxvZ2dlciBoYXMgYmVlbiBzZXQgb24gdGhpcyBzb2NrZXQuXG4gICAqL1xuICBoYXNMb2dnZXIoKXsgcmV0dXJuIHRoaXMubG9nZ2VyICE9PSBudWxsIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGNhbGxiYWNrcyBmb3IgY29ubmVjdGlvbiBvcGVuIGV2ZW50c1xuICAgKlxuICAgKiBAZXhhbXBsZSBzb2NrZXQub25PcGVuKGZ1bmN0aW9uKCl7IGNvbnNvbGUuaW5mbyhcInRoZSBzb2NrZXQgd2FzIG9wZW5lZFwiKSB9KVxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKi9cbiAgb25PcGVuKGNhbGxiYWNrKXtcbiAgICBsZXQgcmVmID0gdGhpcy5tYWtlUmVmKClcbiAgICB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzLm9wZW4ucHVzaChbcmVmLCBjYWxsYmFja10pXG4gICAgcmV0dXJuIHJlZlxuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBjYWxsYmFja3MgZm9yIGNvbm5lY3Rpb24gY2xvc2UgZXZlbnRzXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAqL1xuICBvbkNsb3NlKGNhbGxiYWNrKXtcbiAgICBsZXQgcmVmID0gdGhpcy5tYWtlUmVmKClcbiAgICB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzLmNsb3NlLnB1c2goW3JlZiwgY2FsbGJhY2tdKVxuICAgIHJldHVybiByZWZcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgY2FsbGJhY2tzIGZvciBjb25uZWN0aW9uIGVycm9yIGV2ZW50c1xuICAgKlxuICAgKiBAZXhhbXBsZSBzb2NrZXQub25FcnJvcihmdW5jdGlvbihlcnJvcil7IGFsZXJ0KFwiQW4gZXJyb3Igb2NjdXJyZWRcIikgfSlcbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICovXG4gIG9uRXJyb3IoY2FsbGJhY2spe1xuICAgIGxldCByZWYgPSB0aGlzLm1ha2VSZWYoKVxuICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MuZXJyb3IucHVzaChbcmVmLCBjYWxsYmFja10pXG4gICAgcmV0dXJuIHJlZlxuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBjYWxsYmFja3MgZm9yIGNvbm5lY3Rpb24gbWVzc2FnZSBldmVudHNcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICovXG4gIG9uTWVzc2FnZShjYWxsYmFjayl7XG4gICAgbGV0IHJlZiA9IHRoaXMubWFrZVJlZigpXG4gICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5tZXNzYWdlLnB1c2goW3JlZiwgY2FsbGJhY2tdKVxuICAgIHJldHVybiByZWZcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgb25Db25uT3Blbigpe1xuICAgIGlmKHRoaXMuaGFzTG9nZ2VyKCkpIHRoaXMubG9nKFwidHJhbnNwb3J0XCIsIGBjb25uZWN0ZWQgdG8gJHt0aGlzLmVuZFBvaW50VVJMKCl9YClcbiAgICB0aGlzLmNsb3NlV2FzQ2xlYW4gPSBmYWxzZVxuICAgIHRoaXMuZXN0YWJsaXNoZWRDb25uZWN0aW9ucysrXG4gICAgdGhpcy5mbHVzaFNlbmRCdWZmZXIoKVxuICAgIHRoaXMucmVjb25uZWN0VGltZXIucmVzZXQoKVxuICAgIHRoaXMucmVzZXRIZWFydGJlYXQoKVxuICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3Mub3Blbi5mb3JFYWNoKChbLCBjYWxsYmFja10pID0+IGNhbGxiYWNrKCkpXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG5cbiAgaGVhcnRiZWF0VGltZW91dCgpe1xuICAgIGlmKHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZil7XG4gICAgICB0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYgPSBudWxsXG4gICAgICBpZih0aGlzLmhhc0xvZ2dlcigpKXsgdGhpcy5sb2coXCJ0cmFuc3BvcnRcIiwgXCJoZWFydGJlYXQgdGltZW91dC4gQXR0ZW1wdGluZyB0byByZS1lc3RhYmxpc2ggY29ubmVjdGlvblwiKSB9XG4gICAgICB0aGlzLmFibm9ybWFsQ2xvc2UoXCJoZWFydGJlYXQgdGltZW91dFwiKVxuICAgIH1cbiAgfVxuXG4gIHJlc2V0SGVhcnRiZWF0KCl7XG4gICAgaWYodGhpcy5jb25uICYmIHRoaXMuY29ubi5za2lwSGVhcnRiZWF0KXsgcmV0dXJuIH1cbiAgICB0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYgPSBudWxsXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuaGVhcnRiZWF0VGltZXIpXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnNlbmRIZWFydGJlYXQoKSwgdGhpcy5oZWFydGJlYXRJbnRlcnZhbE1zKVxuICB9XG5cbiAgdGVhcmRvd24oY2FsbGJhY2ssIGNvZGUsIHJlYXNvbil7XG4gICAgaWYoIXRoaXMuY29ubil7XG4gICAgICByZXR1cm4gY2FsbGJhY2sgJiYgY2FsbGJhY2soKVxuICAgIH1cblxuICAgIHRoaXMud2FpdEZvckJ1ZmZlckRvbmUoKCkgPT4ge1xuICAgICAgaWYodGhpcy5jb25uKXtcbiAgICAgICAgaWYoY29kZSl7IHRoaXMuY29ubi5jbG9zZShjb2RlLCByZWFzb24gfHwgXCJcIikgfSBlbHNlIHsgdGhpcy5jb25uLmNsb3NlKCkgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLndhaXRGb3JTb2NrZXRDbG9zZWQoKCkgPT4ge1xuICAgICAgICBpZih0aGlzLmNvbm4pe1xuICAgICAgICAgIHRoaXMuY29ubi5vbmNsb3NlID0gZnVuY3Rpb24gKCl7IH0gLy8gbm9vcFxuICAgICAgICAgIHRoaXMuY29ubiA9IG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKClcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHdhaXRGb3JCdWZmZXJEb25lKGNhbGxiYWNrLCB0cmllcyA9IDEpe1xuICAgIGlmKHRyaWVzID09PSA1IHx8ICF0aGlzLmNvbm4gfHwgIXRoaXMuY29ubi5idWZmZXJlZEFtb3VudCl7XG4gICAgICBjYWxsYmFjaygpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMud2FpdEZvckJ1ZmZlckRvbmUoY2FsbGJhY2ssIHRyaWVzICsgMSlcbiAgICB9LCAxNTAgKiB0cmllcylcbiAgfVxuXG4gIHdhaXRGb3JTb2NrZXRDbG9zZWQoY2FsbGJhY2ssIHRyaWVzID0gMSl7XG4gICAgaWYodHJpZXMgPT09IDUgfHwgIXRoaXMuY29ubiB8fCB0aGlzLmNvbm4ucmVhZHlTdGF0ZSA9PT0gU09DS0VUX1NUQVRFUy5jbG9zZWQpe1xuICAgICAgY2FsbGJhY2soKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLndhaXRGb3JTb2NrZXRDbG9zZWQoY2FsbGJhY2ssIHRyaWVzICsgMSlcbiAgICB9LCAxNTAgKiB0cmllcylcbiAgfVxuXG4gIG9uQ29ubkNsb3NlKGV2ZW50KXtcbiAgICBsZXQgY2xvc2VDb2RlID0gZXZlbnQgJiYgZXZlbnQuY29kZVxuICAgIGlmKHRoaXMuaGFzTG9nZ2VyKCkpIHRoaXMubG9nKFwidHJhbnNwb3J0XCIsIFwiY2xvc2VcIiwgZXZlbnQpXG4gICAgdGhpcy50cmlnZ2VyQ2hhbkVycm9yKClcbiAgICBjbGVhclRpbWVvdXQodGhpcy5oZWFydGJlYXRUaW1lcilcbiAgICBpZighdGhpcy5jbG9zZVdhc0NsZWFuICYmIGNsb3NlQ29kZSAhPT0gMTAwMCl7XG4gICAgICB0aGlzLnJlY29ubmVjdFRpbWVyLnNjaGVkdWxlVGltZW91dCgpXG4gICAgfVxuICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MuY2xvc2UuZm9yRWFjaCgoWywgY2FsbGJhY2tdKSA9PiBjYWxsYmFjayhldmVudCkpXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIG9uQ29ubkVycm9yKGVycm9yKXtcbiAgICBpZih0aGlzLmhhc0xvZ2dlcigpKSB0aGlzLmxvZyhcInRyYW5zcG9ydFwiLCBlcnJvcilcbiAgICBsZXQgdHJhbnNwb3J0QmVmb3JlID0gdGhpcy50cmFuc3BvcnRcbiAgICBsZXQgZXN0YWJsaXNoZWRCZWZvcmUgPSB0aGlzLmVzdGFibGlzaGVkQ29ubmVjdGlvbnNcbiAgICB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzLmVycm9yLmZvckVhY2goKFssIGNhbGxiYWNrXSkgPT4ge1xuICAgICAgY2FsbGJhY2soZXJyb3IsIHRyYW5zcG9ydEJlZm9yZSwgZXN0YWJsaXNoZWRCZWZvcmUpXG4gICAgfSlcbiAgICBpZih0cmFuc3BvcnRCZWZvcmUgPT09IHRoaXMudHJhbnNwb3J0IHx8IGVzdGFibGlzaGVkQmVmb3JlID4gMCl7XG4gICAgICB0aGlzLnRyaWdnZXJDaGFuRXJyb3IoKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdHJpZ2dlckNoYW5FcnJvcigpe1xuICAgIHRoaXMuY2hhbm5lbHMuZm9yRWFjaChjaGFubmVsID0+IHtcbiAgICAgIGlmKCEoY2hhbm5lbC5pc0Vycm9yZWQoKSB8fCBjaGFubmVsLmlzTGVhdmluZygpIHx8IGNoYW5uZWwuaXNDbG9zZWQoKSkpe1xuICAgICAgICBjaGFubmVsLnRyaWdnZXIoQ0hBTk5FTF9FVkVOVFMuZXJyb3IpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgY29ubmVjdGlvblN0YXRlKCl7XG4gICAgc3dpdGNoKHRoaXMuY29ubiAmJiB0aGlzLmNvbm4ucmVhZHlTdGF0ZSl7XG4gICAgICBjYXNlIFNPQ0tFVF9TVEFURVMuY29ubmVjdGluZzogcmV0dXJuIFwiY29ubmVjdGluZ1wiXG4gICAgICBjYXNlIFNPQ0tFVF9TVEFURVMub3BlbjogcmV0dXJuIFwib3BlblwiXG4gICAgICBjYXNlIFNPQ0tFVF9TVEFURVMuY2xvc2luZzogcmV0dXJuIFwiY2xvc2luZ1wiXG4gICAgICBkZWZhdWx0OiByZXR1cm4gXCJjbG9zZWRcIlxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGlzQ29ubmVjdGVkKCl7IHJldHVybiB0aGlzLmNvbm5lY3Rpb25TdGF0ZSgpID09PSBcIm9wZW5cIiB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqXG4gICAqIEBwYXJhbSB7Q2hhbm5lbH1cbiAgICovXG4gIHJlbW92ZShjaGFubmVsKXtcbiAgICB0aGlzLm9mZihjaGFubmVsLnN0YXRlQ2hhbmdlUmVmcylcbiAgICB0aGlzLmNoYW5uZWxzID0gdGhpcy5jaGFubmVscy5maWx0ZXIoYyA9PiBjLmpvaW5SZWYoKSAhPT0gY2hhbm5lbC5qb2luUmVmKCkpXG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBgb25PcGVuYCwgYG9uQ2xvc2VgLCBgb25FcnJvcixgIGFuZCBgb25NZXNzYWdlYCByZWdpc3RyYXRpb25zLlxuICAgKlxuICAgKiBAcGFyYW0ge3JlZnN9IC0gbGlzdCBvZiByZWZzIHJldHVybmVkIGJ5IGNhbGxzIHRvXG4gICAqICAgICAgICAgICAgICAgICBgb25PcGVuYCwgYG9uQ2xvc2VgLCBgb25FcnJvcixgIGFuZCBgb25NZXNzYWdlYFxuICAgKi9cbiAgb2ZmKHJlZnMpe1xuICAgIGZvcihsZXQga2V5IGluIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3Mpe1xuICAgICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrc1trZXldID0gdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrc1trZXldLmZpbHRlcigoW3JlZl0pID0+IHtcbiAgICAgICAgcmV0dXJuIHJlZnMuaW5kZXhPZihyZWYpID09PSAtMVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhdGVzIGEgbmV3IGNoYW5uZWwgZm9yIHRoZSBnaXZlbiB0b3BpY1xuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdG9waWNcbiAgICogQHBhcmFtIHtPYmplY3R9IGNoYW5QYXJhbXMgLSBQYXJhbWV0ZXJzIGZvciB0aGUgY2hhbm5lbFxuICAgKiBAcmV0dXJucyB7Q2hhbm5lbH1cbiAgICovXG4gIGNoYW5uZWwodG9waWMsIGNoYW5QYXJhbXMgPSB7fSl7XG4gICAgbGV0IGNoYW4gPSBuZXcgQ2hhbm5lbCh0b3BpYywgY2hhblBhcmFtcywgdGhpcylcbiAgICB0aGlzLmNoYW5uZWxzLnB1c2goY2hhbilcbiAgICByZXR1cm4gY2hhblxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAqL1xuICBwdXNoKGRhdGEpe1xuICAgIGlmKHRoaXMuaGFzTG9nZ2VyKCkpe1xuICAgICAgbGV0IHt0b3BpYywgZXZlbnQsIHBheWxvYWQsIHJlZiwgam9pbl9yZWZ9ID0gZGF0YVxuICAgICAgdGhpcy5sb2coXCJwdXNoXCIsIGAke3RvcGljfSAke2V2ZW50fSAoJHtqb2luX3JlZn0sICR7cmVmfSlgLCBwYXlsb2FkKVxuICAgIH1cblxuICAgIGlmKHRoaXMuaXNDb25uZWN0ZWQoKSl7XG4gICAgICB0aGlzLmVuY29kZShkYXRhLCByZXN1bHQgPT4gdGhpcy5jb25uLnNlbmQocmVzdWx0KSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZW5kQnVmZmVyLnB1c2goKCkgPT4gdGhpcy5lbmNvZGUoZGF0YSwgcmVzdWx0ID0+IHRoaXMuY29ubi5zZW5kKHJlc3VsdCkpKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIG5leHQgbWVzc2FnZSByZWYsIGFjY291bnRpbmcgZm9yIG92ZXJmbG93c1xuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgbWFrZVJlZigpe1xuICAgIGxldCBuZXdSZWYgPSB0aGlzLnJlZiArIDFcbiAgICBpZihuZXdSZWYgPT09IHRoaXMucmVmKXsgdGhpcy5yZWYgPSAwIH0gZWxzZSB7IHRoaXMucmVmID0gbmV3UmVmIH1cblxuICAgIHJldHVybiB0aGlzLnJlZi50b1N0cmluZygpXG4gIH1cblxuICBzZW5kSGVhcnRiZWF0KCl7XG4gICAgaWYodGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmICYmICF0aGlzLmlzQ29ubmVjdGVkKCkpeyByZXR1cm4gfVxuICAgIHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZiA9IHRoaXMubWFrZVJlZigpXG4gICAgdGhpcy5wdXNoKHt0b3BpYzogXCJwaG9lbml4XCIsIGV2ZW50OiBcImhlYXJ0YmVhdFwiLCBwYXlsb2FkOiB7fSwgcmVmOiB0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWZ9KVxuICAgIHRoaXMuaGVhcnRiZWF0VGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaGVhcnRiZWF0VGltZW91dCgpLCB0aGlzLmhlYXJ0YmVhdEludGVydmFsTXMpXG4gIH1cblxuICBhYm5vcm1hbENsb3NlKHJlYXNvbil7XG4gICAgdGhpcy5jbG9zZVdhc0NsZWFuID0gZmFsc2VcbiAgICBpZih0aGlzLmlzQ29ubmVjdGVkKCkpeyB0aGlzLmNvbm4uY2xvc2UoV1NfQ0xPU0VfTk9STUFMLCByZWFzb24pIH1cbiAgfVxuXG4gIGZsdXNoU2VuZEJ1ZmZlcigpe1xuICAgIGlmKHRoaXMuaXNDb25uZWN0ZWQoKSAmJiB0aGlzLnNlbmRCdWZmZXIubGVuZ3RoID4gMCl7XG4gICAgICB0aGlzLnNlbmRCdWZmZXIuZm9yRWFjaChjYWxsYmFjayA9PiBjYWxsYmFjaygpKVxuICAgICAgdGhpcy5zZW5kQnVmZmVyID0gW11cbiAgICB9XG4gIH1cblxuICBvbkNvbm5NZXNzYWdlKHJhd01lc3NhZ2Upe1xuICAgIHRoaXMuZGVjb2RlKHJhd01lc3NhZ2UuZGF0YSwgbXNnID0+IHtcbiAgICAgIGxldCB7dG9waWMsIGV2ZW50LCBwYXlsb2FkLCByZWYsIGpvaW5fcmVmfSA9IG1zZ1xuICAgICAgaWYocmVmICYmIHJlZiA9PT0gdGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmKXtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuaGVhcnRiZWF0VGltZXIpXG4gICAgICAgIHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZiA9IG51bGxcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnNlbmRIZWFydGJlYXQoKSwgdGhpcy5oZWFydGJlYXRJbnRlcnZhbE1zKVxuICAgICAgfVxuXG4gICAgICBpZih0aGlzLmhhc0xvZ2dlcigpKSB0aGlzLmxvZyhcInJlY2VpdmVcIiwgYCR7cGF5bG9hZC5zdGF0dXMgfHwgXCJcIn0gJHt0b3BpY30gJHtldmVudH0gJHtyZWYgJiYgXCIoXCIgKyByZWYgKyBcIilcIiB8fCBcIlwifWAsIHBheWxvYWQpXG5cbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoYW5uZWxzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgY29uc3QgY2hhbm5lbCA9IHRoaXMuY2hhbm5lbHNbaV1cbiAgICAgICAgaWYoIWNoYW5uZWwuaXNNZW1iZXIodG9waWMsIGV2ZW50LCBwYXlsb2FkLCBqb2luX3JlZikpeyBjb250aW51ZSB9XG4gICAgICAgIGNoYW5uZWwudHJpZ2dlcihldmVudCwgcGF5bG9hZCwgcmVmLCBqb2luX3JlZilcbiAgICAgIH1cblxuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MubWVzc2FnZS5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGxldCBbLCBjYWxsYmFja10gPSB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzLm1lc3NhZ2VbaV1cbiAgICAgICAgY2FsbGJhY2sobXNnKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBsZWF2ZU9wZW5Ub3BpYyh0b3BpYyl7XG4gICAgbGV0IGR1cENoYW5uZWwgPSB0aGlzLmNoYW5uZWxzLmZpbmQoYyA9PiBjLnRvcGljID09PSB0b3BpYyAmJiAoYy5pc0pvaW5lZCgpIHx8IGMuaXNKb2luaW5nKCkpKVxuICAgIGlmKGR1cENoYW5uZWwpe1xuICAgICAgaWYodGhpcy5oYXNMb2dnZXIoKSkgdGhpcy5sb2coXCJ0cmFuc3BvcnRcIiwgYGxlYXZpbmcgZHVwbGljYXRlIHRvcGljIFwiJHt0b3BpY31cImApXG4gICAgICBkdXBDaGFubmVsLmxlYXZlKClcbiAgICB9XG4gIH1cbn1cbiIsICJcbmV4cG9ydCBjb25zdCBDT05TRUNVVElWRV9SRUxPQURTID0gXCJjb25zZWN1dGl2ZS1yZWxvYWRzXCJcbmV4cG9ydCBjb25zdCBNQVhfUkVMT0FEUyA9IDEwXG5leHBvcnQgY29uc3QgUkVMT0FEX0pJVFRFUiA9IFsxMDAwLCAzMDAwXVxuZXhwb3J0IGNvbnN0IEZBSUxTQUZFX0pJVFRFUiA9IDMwMDAwXG5leHBvcnQgY29uc3QgUEhYX0VWRU5UX0NMQVNTRVMgPSBbXG4gIFwicGh4LWNsaWNrLWxvYWRpbmdcIiwgXCJwaHgtY2hhbmdlLWxvYWRpbmdcIiwgXCJwaHgtc3VibWl0LWxvYWRpbmdcIixcbiAgXCJwaHgta2V5ZG93bi1sb2FkaW5nXCIsIFwicGh4LWtleXVwLWxvYWRpbmdcIiwgXCJwaHgtYmx1ci1sb2FkaW5nXCIsIFwicGh4LWZvY3VzLWxvYWRpbmdcIlxuXVxuZXhwb3J0IGNvbnN0IFBIWF9DT01QT05FTlQgPSBcImRhdGEtcGh4LWNvbXBvbmVudFwiXG5leHBvcnQgY29uc3QgUEhYX0xJVkVfTElOSyA9IFwiZGF0YS1waHgtbGlua1wiXG5leHBvcnQgY29uc3QgUEhYX1RSQUNLX1NUQVRJQyA9IFwidHJhY2stc3RhdGljXCJcbmV4cG9ydCBjb25zdCBQSFhfTElOS19TVEFURSA9IFwiZGF0YS1waHgtbGluay1zdGF0ZVwiXG5leHBvcnQgY29uc3QgUEhYX1JFRiA9IFwiZGF0YS1waHgtcmVmXCJcbmV4cG9ydCBjb25zdCBQSFhfVFJBQ0tfVVBMT0FEUyA9IFwidHJhY2stdXBsb2Fkc1wiXG5leHBvcnQgY29uc3QgUEhYX1VQTE9BRF9SRUYgPSBcImRhdGEtcGh4LXVwbG9hZC1yZWZcIlxuZXhwb3J0IGNvbnN0IFBIWF9QUkVGTElHSFRFRF9SRUZTID0gXCJkYXRhLXBoeC1wcmVmbGlnaHRlZC1yZWZzXCJcbmV4cG9ydCBjb25zdCBQSFhfRE9ORV9SRUZTID0gXCJkYXRhLXBoeC1kb25lLXJlZnNcIlxuZXhwb3J0IGNvbnN0IFBIWF9EUk9QX1RBUkdFVCA9IFwiZHJvcC10YXJnZXRcIlxuZXhwb3J0IGNvbnN0IFBIWF9BQ1RJVkVfRU5UUllfUkVGUyA9IFwiZGF0YS1waHgtYWN0aXZlLXJlZnNcIlxuZXhwb3J0IGNvbnN0IFBIWF9MSVZFX0ZJTEVfVVBEQVRFRCA9IFwicGh4OmxpdmUtZmlsZTp1cGRhdGVkXCJcbmV4cG9ydCBjb25zdCBQSFhfU0tJUCA9IFwiZGF0YS1waHgtc2tpcFwiXG5leHBvcnQgY29uc3QgUEhYX1JFTU9WRSA9IFwiZGF0YS1waHgtcmVtb3ZlXCJcbmV4cG9ydCBjb25zdCBQSFhfUEFHRV9MT0FESU5HID0gXCJwYWdlLWxvYWRpbmdcIlxuZXhwb3J0IGNvbnN0IFBIWF9DT05ORUNURURfQ0xBU1MgPSBcInBoeC1jb25uZWN0ZWRcIlxuZXhwb3J0IGNvbnN0IFBIWF9ESVNDT05ORUNURURfQ0xBU1MgPSBcInBoeC1kaXNjb25uZWN0ZWRcIlxuZXhwb3J0IGNvbnN0IFBIWF9OT19GRUVEQkFDS19DTEFTUyA9IFwicGh4LW5vLWZlZWRiYWNrXCJcbmV4cG9ydCBjb25zdCBQSFhfRVJST1JfQ0xBU1MgPSBcInBoeC1lcnJvclwiXG5leHBvcnQgY29uc3QgUEhYX1BBUkVOVF9JRCA9IFwiZGF0YS1waHgtcGFyZW50LWlkXCJcbmV4cG9ydCBjb25zdCBQSFhfTUFJTiA9IFwiZGF0YS1waHgtbWFpblwiXG5leHBvcnQgY29uc3QgUEhYX1JPT1RfSUQgPSBcImRhdGEtcGh4LXJvb3QtaWRcIlxuZXhwb3J0IGNvbnN0IFBIWF9UUklHR0VSX0FDVElPTiA9IFwidHJpZ2dlci1hY3Rpb25cIlxuZXhwb3J0IGNvbnN0IFBIWF9GRUVEQkFDS19GT1IgPSBcImZlZWRiYWNrLWZvclwiXG5leHBvcnQgY29uc3QgUEhYX0hBU19GT0NVU0VEID0gXCJwaHgtaGFzLWZvY3VzZWRcIlxuZXhwb3J0IGNvbnN0IEZPQ1VTQUJMRV9JTlBVVFMgPSBbXCJ0ZXh0XCIsIFwidGV4dGFyZWFcIiwgXCJudW1iZXJcIiwgXCJlbWFpbFwiLCBcInBhc3N3b3JkXCIsIFwic2VhcmNoXCIsIFwidGVsXCIsIFwidXJsXCIsIFwiZGF0ZVwiLCBcInRpbWVcIl1cbmV4cG9ydCBjb25zdCBDSEVDS0FCTEVfSU5QVVRTID0gW1wiY2hlY2tib3hcIiwgXCJyYWRpb1wiXVxuZXhwb3J0IGNvbnN0IFBIWF9IQVNfU1VCTUlUVEVEID0gXCJwaHgtaGFzLXN1Ym1pdHRlZFwiXG5leHBvcnQgY29uc3QgUEhYX1NFU1NJT04gPSBcImRhdGEtcGh4LXNlc3Npb25cIlxuZXhwb3J0IGNvbnN0IFBIWF9WSUVXX1NFTEVDVE9SID0gYFske1BIWF9TRVNTSU9OfV1gXG5leHBvcnQgY29uc3QgUEhYX1NUQVRJQyA9IFwiZGF0YS1waHgtc3RhdGljXCJcbmV4cG9ydCBjb25zdCBQSFhfUkVBRE9OTFkgPSBcImRhdGEtcGh4LXJlYWRvbmx5XCJcbmV4cG9ydCBjb25zdCBQSFhfRElTQUJMRUQgPSBcImRhdGEtcGh4LWRpc2FibGVkXCJcbmV4cG9ydCBjb25zdCBQSFhfRElTQUJMRV9XSVRIID0gXCJkaXNhYmxlLXdpdGhcIlxuZXhwb3J0IGNvbnN0IFBIWF9ESVNBQkxFX1dJVEhfUkVTVE9SRSA9IFwiZGF0YS1waHgtZGlzYWJsZS13aXRoLXJlc3RvcmVcIlxuZXhwb3J0IGNvbnN0IFBIWF9IT09LID0gXCJob29rXCJcbmV4cG9ydCBjb25zdCBQSFhfREVCT1VOQ0UgPSBcImRlYm91bmNlXCJcbmV4cG9ydCBjb25zdCBQSFhfVEhST1RUTEUgPSBcInRocm90dGxlXCJcbmV4cG9ydCBjb25zdCBQSFhfVVBEQVRFID0gXCJ1cGRhdGVcIlxuZXhwb3J0IGNvbnN0IFBIWF9LRVkgPSBcImtleVwiXG5leHBvcnQgY29uc3QgUEhYX1BSSVZBVEUgPSBcInBoeFByaXZhdGVcIlxuZXhwb3J0IGNvbnN0IFBIWF9BVVRPX1JFQ09WRVIgPSBcImF1dG8tcmVjb3ZlclwiXG5leHBvcnQgY29uc3QgUEhYX0xWX0RFQlVHID0gXCJwaHg6bGl2ZS1zb2NrZXQ6ZGVidWdcIlxuZXhwb3J0IGNvbnN0IFBIWF9MVl9QUk9GSUxFID0gXCJwaHg6bGl2ZS1zb2NrZXQ6cHJvZmlsaW5nXCJcbmV4cG9ydCBjb25zdCBQSFhfTFZfTEFURU5DWV9TSU0gPSBcInBoeDpsaXZlLXNvY2tldDpsYXRlbmN5LXNpbVwiXG5leHBvcnQgY29uc3QgUEhYX1BST0dSRVNTID0gXCJwcm9ncmVzc1wiXG5leHBvcnQgY29uc3QgTE9BREVSX1RJTUVPVVQgPSAxXG5leHBvcnQgY29uc3QgQkVGT1JFX1VOTE9BRF9MT0FERVJfVElNRU9VVCA9IDIwMFxuZXhwb3J0IGNvbnN0IEJJTkRJTkdfUFJFRklYID0gXCJwaHgtXCJcbmV4cG9ydCBjb25zdCBQVVNIX1RJTUVPVVQgPSAzMDAwMFxuZXhwb3J0IGNvbnN0IExJTktfSEVBREVSID0gXCJ4LXJlcXVlc3RlZC13aXRoXCJcbmV4cG9ydCBjb25zdCBSRVNQT05TRV9VUkxfSEVBREVSID0gXCJ4LXJlc3BvbnNlLXVybFwiXG5leHBvcnQgY29uc3QgREVCT1VOQ0VfVFJJR0dFUiA9IFwiZGVib3VuY2UtdHJpZ2dlclwiXG5leHBvcnQgY29uc3QgVEhST1RUTEVEID0gXCJ0aHJvdHRsZWRcIlxuZXhwb3J0IGNvbnN0IERFQk9VTkNFX1BSRVZfS0VZID0gXCJkZWJvdW5jZS1wcmV2LWtleVwiXG5leHBvcnQgY29uc3QgREVGQVVMVFMgPSB7XG4gIGRlYm91bmNlOiAzMDAsXG4gIHRocm90dGxlOiAzMDBcbn1cblxuLy8gUmVuZGVyZWRcbmV4cG9ydCBjb25zdCBEWU5BTUlDUyA9IFwiZFwiXG5leHBvcnQgY29uc3QgU1RBVElDID0gXCJzXCJcbmV4cG9ydCBjb25zdCBDT01QT05FTlRTID0gXCJjXCJcbmV4cG9ydCBjb25zdCBFVkVOVFMgPSBcImVcIlxuZXhwb3J0IGNvbnN0IFJFUExZID0gXCJyXCJcbmV4cG9ydCBjb25zdCBUSVRMRSA9IFwidFwiXG4iLCAiaW1wb3J0IHtcbiAgbG9nRXJyb3Jcbn0gZnJvbSBcIi4vdXRpbHNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbnRyeVVwbG9hZGVyIHtcbiAgY29uc3RydWN0b3IoZW50cnksIGNodW5rU2l6ZSwgbGl2ZVNvY2tldCl7XG4gICAgdGhpcy5saXZlU29ja2V0ID0gbGl2ZVNvY2tldFxuICAgIHRoaXMuZW50cnkgPSBlbnRyeVxuICAgIHRoaXMub2Zmc2V0ID0gMFxuICAgIHRoaXMuY2h1bmtTaXplID0gY2h1bmtTaXplXG4gICAgdGhpcy5jaHVua1RpbWVyID0gbnVsbFxuICAgIHRoaXMudXBsb2FkQ2hhbm5lbCA9IGxpdmVTb2NrZXQuY2hhbm5lbChgbHZ1OiR7ZW50cnkucmVmfWAsIHt0b2tlbjogZW50cnkubWV0YWRhdGEoKX0pXG4gIH1cblxuICBlcnJvcihyZWFzb24pe1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmNodW5rVGltZXIpXG4gICAgdGhpcy51cGxvYWRDaGFubmVsLmxlYXZlKClcbiAgICB0aGlzLmVudHJ5LmVycm9yKHJlYXNvbilcbiAgfVxuXG4gIHVwbG9hZCgpe1xuICAgIHRoaXMudXBsb2FkQ2hhbm5lbC5vbkVycm9yKHJlYXNvbiA9PiB0aGlzLmVycm9yKHJlYXNvbikpXG4gICAgdGhpcy51cGxvYWRDaGFubmVsLmpvaW4oKVxuICAgICAgLnJlY2VpdmUoXCJva1wiLCBfZGF0YSA9PiB0aGlzLnJlYWROZXh0Q2h1bmsoKSlcbiAgICAgIC5yZWNlaXZlKFwiZXJyb3JcIiwgcmVhc29uID0+IHRoaXMuZXJyb3IocmVhc29uKSlcbiAgfVxuXG4gIGlzRG9uZSgpeyByZXR1cm4gdGhpcy5vZmZzZXQgPj0gdGhpcy5lbnRyeS5maWxlLnNpemUgfVxuXG4gIHJlYWROZXh0Q2h1bmsoKXtcbiAgICBsZXQgcmVhZGVyID0gbmV3IHdpbmRvdy5GaWxlUmVhZGVyKClcbiAgICBsZXQgYmxvYiA9IHRoaXMuZW50cnkuZmlsZS5zbGljZSh0aGlzLm9mZnNldCwgdGhpcy5jaHVua1NpemUgKyB0aGlzLm9mZnNldClcbiAgICByZWFkZXIub25sb2FkID0gKGUpID0+IHtcbiAgICAgIGlmKGUudGFyZ2V0LmVycm9yID09PSBudWxsKXtcbiAgICAgICAgdGhpcy5vZmZzZXQgKz0gZS50YXJnZXQucmVzdWx0LmJ5dGVMZW5ndGhcbiAgICAgICAgdGhpcy5wdXNoQ2h1bmsoZS50YXJnZXQucmVzdWx0KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGxvZ0Vycm9yKFwiUmVhZCBlcnJvcjogXCIgKyBlLnRhcmdldC5lcnJvcilcbiAgICAgIH1cbiAgICB9XG4gICAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGJsb2IpXG4gIH1cblxuICBwdXNoQ2h1bmsoY2h1bmspe1xuICAgIGlmKCF0aGlzLnVwbG9hZENoYW5uZWwuaXNKb2luZWQoKSl7IHJldHVybiB9XG4gICAgdGhpcy51cGxvYWRDaGFubmVsLnB1c2goXCJjaHVua1wiLCBjaHVuaylcbiAgICAgIC5yZWNlaXZlKFwib2tcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLmVudHJ5LnByb2dyZXNzKCh0aGlzLm9mZnNldCAvIHRoaXMuZW50cnkuZmlsZS5zaXplKSAqIDEwMClcbiAgICAgICAgaWYoIXRoaXMuaXNEb25lKCkpe1xuICAgICAgICAgIHRoaXMuY2h1bmtUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5yZWFkTmV4dENodW5rKCksIHRoaXMubGl2ZVNvY2tldC5nZXRMYXRlbmN5U2ltKCkgfHwgMClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgfVxufVxuIiwgImltcG9ydCB7XG4gIFBIWF9WSUVXX1NFTEVDVE9SXG59IGZyb20gXCIuL2NvbnN0YW50c1wiXG5cbmltcG9ydCBFbnRyeVVwbG9hZGVyIGZyb20gXCIuL2VudHJ5X3VwbG9hZGVyXCJcblxuZXhwb3J0IGxldCBsb2dFcnJvciA9IChtc2csIG9iaikgPT4gY29uc29sZS5lcnJvciAmJiBjb25zb2xlLmVycm9yKG1zZywgb2JqKVxuXG5leHBvcnQgbGV0IGlzQ2lkID0gKGNpZCkgPT4gdHlwZW9mKGNpZCkgPT09IFwibnVtYmVyXCJcblxuZXhwb3J0IGZ1bmN0aW9uIGRldGVjdER1cGxpY2F0ZUlkcygpe1xuICBsZXQgaWRzID0gbmV3IFNldCgpXG4gIGxldCBlbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIqW2lkXVwiKVxuICBmb3IobGV0IGkgPSAwLCBsZW4gPSBlbGVtcy5sZW5ndGg7IGkgPCBsZW47IGkrKyl7XG4gICAgaWYoaWRzLmhhcyhlbGVtc1tpXS5pZCkpe1xuICAgICAgY29uc29sZS5lcnJvcihgTXVsdGlwbGUgSURzIGRldGVjdGVkOiAke2VsZW1zW2ldLmlkfS4gRW5zdXJlIHVuaXF1ZSBlbGVtZW50IGlkcy5gKVxuICAgIH0gZWxzZSB7XG4gICAgICBpZHMuYWRkKGVsZW1zW2ldLmlkKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgbGV0IGRlYnVnID0gKHZpZXcsIGtpbmQsIG1zZywgb2JqKSA9PiB7XG4gIGlmKHZpZXcubGl2ZVNvY2tldC5pc0RlYnVnRW5hYmxlZCgpKXtcbiAgICBjb25zb2xlLmxvZyhgJHt2aWV3LmlkfSAke2tpbmR9OiAke21zZ30gLSBgLCBvYmopXG4gIH1cbn1cblxuLy8gd3JhcHMgdmFsdWUgaW4gY2xvc3VyZSBvciByZXR1cm5zIGNsb3N1cmVcbmV4cG9ydCBsZXQgY2xvc3VyZSA9ICh2YWwpID0+IHR5cGVvZiB2YWwgPT09IFwiZnVuY3Rpb25cIiA/IHZhbCA6IGZ1bmN0aW9uICgpeyByZXR1cm4gdmFsIH1cblxuZXhwb3J0IGxldCBjbG9uZSA9IChvYmopID0+IHsgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSkgfVxuXG5leHBvcnQgbGV0IGNsb3Nlc3RQaHhCaW5kaW5nID0gKGVsLCBiaW5kaW5nLCBib3JkZXJFbCkgPT4ge1xuICBkbyB7XG4gICAgaWYoZWwubWF0Y2hlcyhgWyR7YmluZGluZ31dYCkpeyByZXR1cm4gZWwgfVxuICAgIGVsID0gZWwucGFyZW50RWxlbWVudCB8fCBlbC5wYXJlbnROb2RlXG4gIH0gd2hpbGUoZWwgIT09IG51bGwgJiYgZWwubm9kZVR5cGUgPT09IDEgJiYgISgoYm9yZGVyRWwgJiYgYm9yZGVyRWwuaXNTYW1lTm9kZShlbCkpIHx8IGVsLm1hdGNoZXMoUEhYX1ZJRVdfU0VMRUNUT1IpKSlcbiAgcmV0dXJuIG51bGxcbn1cblxuZXhwb3J0IGxldCBpc09iamVjdCA9IChvYmopID0+IHtcbiAgcmV0dXJuIG9iaiAhPT0gbnVsbCAmJiB0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiICYmICEob2JqIGluc3RhbmNlb2YgQXJyYXkpXG59XG5cbmV4cG9ydCBsZXQgaXNFcXVhbE9iaiA9IChvYmoxLCBvYmoyKSA9PiBKU09OLnN0cmluZ2lmeShvYmoxKSA9PT0gSlNPTi5zdHJpbmdpZnkob2JqMilcblxuZXhwb3J0IGxldCBpc0VtcHR5ID0gKG9iaikgPT4ge1xuICBmb3IobGV0IHggaW4gb2JqKXsgcmV0dXJuIGZhbHNlIH1cbiAgcmV0dXJuIHRydWVcbn1cblxuZXhwb3J0IGxldCBtYXliZSA9IChlbCwgY2FsbGJhY2spID0+IGVsICYmIGNhbGxiYWNrKGVsKVxuXG5leHBvcnQgbGV0IGNoYW5uZWxVcGxvYWRlciA9IGZ1bmN0aW9uIChlbnRyaWVzLCBvbkVycm9yLCByZXNwLCBsaXZlU29ja2V0KXtcbiAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICBsZXQgZW50cnlVcGxvYWRlciA9IG5ldyBFbnRyeVVwbG9hZGVyKGVudHJ5LCByZXNwLmNvbmZpZy5jaHVua19zaXplLCBsaXZlU29ja2V0KVxuICAgIGVudHJ5VXBsb2FkZXIudXBsb2FkKClcbiAgfSlcbn1cbiIsICJsZXQgQnJvd3NlciA9IHtcbiAgY2FuUHVzaFN0YXRlKCl7IHJldHVybiAodHlwZW9mIChoaXN0b3J5LnB1c2hTdGF0ZSkgIT09IFwidW5kZWZpbmVkXCIpIH0sXG5cbiAgZHJvcExvY2FsKGxvY2FsU3RvcmFnZSwgbmFtZXNwYWNlLCBzdWJrZXkpe1xuICAgIHJldHVybiBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLmxvY2FsS2V5KG5hbWVzcGFjZSwgc3Via2V5KSlcbiAgfSxcblxuICB1cGRhdGVMb2NhbChsb2NhbFN0b3JhZ2UsIG5hbWVzcGFjZSwgc3Via2V5LCBpbml0aWFsLCBmdW5jKXtcbiAgICBsZXQgY3VycmVudCA9IHRoaXMuZ2V0TG9jYWwobG9jYWxTdG9yYWdlLCBuYW1lc3BhY2UsIHN1YmtleSlcbiAgICBsZXQga2V5ID0gdGhpcy5sb2NhbEtleShuYW1lc3BhY2UsIHN1YmtleSlcbiAgICBsZXQgbmV3VmFsID0gY3VycmVudCA9PT0gbnVsbCA/IGluaXRpYWwgOiBmdW5jKGN1cnJlbnQpXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeShuZXdWYWwpKVxuICAgIHJldHVybiBuZXdWYWxcbiAgfSxcblxuICBnZXRMb2NhbChsb2NhbFN0b3JhZ2UsIG5hbWVzcGFjZSwgc3Via2V5KXtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmxvY2FsS2V5KG5hbWVzcGFjZSwgc3Via2V5KSkpXG4gIH0sXG5cbiAgdXBkYXRlQ3VycmVudFN0YXRlKGNhbGxiYWNrKXtcbiAgICBpZighdGhpcy5jYW5QdXNoU3RhdGUoKSl7IHJldHVybiB9XG4gICAgaGlzdG9yeS5yZXBsYWNlU3RhdGUoY2FsbGJhY2soaGlzdG9yeS5zdGF0ZSB8fCB7fSksIFwiXCIsIHdpbmRvdy5sb2NhdGlvbi5ocmVmKVxuICB9LFxuXG4gIHB1c2hTdGF0ZShraW5kLCBtZXRhLCB0byl7XG4gICAgaWYodGhpcy5jYW5QdXNoU3RhdGUoKSl7XG4gICAgICBpZih0byAhPT0gd2luZG93LmxvY2F0aW9uLmhyZWYpe1xuICAgICAgICBpZihtZXRhLnR5cGUgPT0gXCJyZWRpcmVjdFwiICYmIG1ldGEuc2Nyb2xsKXtcbiAgICAgICAgICAvLyBJZiB3ZSdyZSByZWRpcmVjdGluZyBzdG9yZSB0aGUgY3VycmVudCBzY3JvbGxZIGZvciB0aGUgY3VycmVudCBoaXN0b3J5IHN0YXRlLlxuICAgICAgICAgIGxldCBjdXJyZW50U3RhdGUgPSBoaXN0b3J5LnN0YXRlIHx8IHt9XG4gICAgICAgICAgY3VycmVudFN0YXRlLnNjcm9sbCA9IG1ldGEuc2Nyb2xsXG4gICAgICAgICAgaGlzdG9yeS5yZXBsYWNlU3RhdGUoY3VycmVudFN0YXRlLCBcIlwiLCB3aW5kb3cubG9jYXRpb24uaHJlZilcbiAgICAgICAgfVxuXG4gICAgICAgIGRlbGV0ZSBtZXRhLnNjcm9sbCAvLyBPbmx5IHN0b3JlIHRoZSBzY3JvbGwgaW4gdGhlIHJlZGlyZWN0IGNhc2UuXG4gICAgICAgIGhpc3Rvcnlba2luZCArIFwiU3RhdGVcIl0obWV0YSwgXCJcIiwgdG8gfHwgbnVsbCkgLy8gSUUgd2lsbCBjb2VyY2UgdW5kZWZpbmVkIHRvIHN0cmluZ1xuICAgICAgICBsZXQgaGFzaEVsID0gdGhpcy5nZXRIYXNoVGFyZ2V0RWwod2luZG93LmxvY2F0aW9uLmhhc2gpXG5cbiAgICAgICAgaWYoaGFzaEVsKXtcbiAgICAgICAgICBoYXNoRWwuc2Nyb2xsSW50b1ZpZXcoKVxuICAgICAgICB9IGVsc2UgaWYobWV0YS50eXBlID09PSBcInJlZGlyZWN0XCIpe1xuICAgICAgICAgIHdpbmRvdy5zY3JvbGwoMCwgMClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlZGlyZWN0KHRvKVxuICAgIH1cbiAgfSxcblxuICBzZXRDb29raWUobmFtZSwgdmFsdWUpe1xuICAgIGRvY3VtZW50LmNvb2tpZSA9IGAke25hbWV9PSR7dmFsdWV9YFxuICB9LFxuXG4gIGdldENvb2tpZShuYW1lKXtcbiAgICByZXR1cm4gZG9jdW1lbnQuY29va2llLnJlcGxhY2UobmV3IFJlZ0V4cChgKD86KD86XnwuKjtcXHMqKSR7bmFtZX1cXHMqXFw9XFxzKihbXjtdKikuKiQpfF4uKiRgKSwgXCIkMVwiKVxuICB9LFxuXG4gIHJlZGlyZWN0KHRvVVJMLCBmbGFzaCl7XG4gICAgaWYoZmxhc2gpeyBCcm93c2VyLnNldENvb2tpZShcIl9fcGhvZW5peF9mbGFzaF9fXCIsIGZsYXNoICsgXCI7IG1heC1hZ2U9NjAwMDA7IHBhdGg9L1wiKSB9XG4gICAgd2luZG93LmxvY2F0aW9uID0gdG9VUkxcbiAgfSxcblxuICBsb2NhbEtleShuYW1lc3BhY2UsIHN1YmtleSl7IHJldHVybiBgJHtuYW1lc3BhY2V9LSR7c3Via2V5fWAgfSxcblxuICBnZXRIYXNoVGFyZ2V0RWwobWF5YmVIYXNoKXtcbiAgICBsZXQgaGFzaCA9IG1heWJlSGFzaC50b1N0cmluZygpLnN1YnN0cmluZygxKVxuICAgIGlmKGhhc2ggPT09IFwiXCIpeyByZXR1cm4gfVxuICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChoYXNoKSB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBhW25hbWU9XCIke2hhc2h9XCJdYClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCcm93c2VyXG4iLCAiaW1wb3J0IHtcbiAgQ0hFQ0tBQkxFX0lOUFVUUyxcbiAgREVCT1VOQ0VfUFJFVl9LRVksXG4gIERFQk9VTkNFX1RSSUdHRVIsXG4gIEZPQ1VTQUJMRV9JTlBVVFMsXG4gIFBIWF9DT01QT05FTlQsXG4gIFBIWF9FVkVOVF9DTEFTU0VTLFxuICBQSFhfSEFTX0ZPQ1VTRUQsXG4gIFBIWF9IQVNfU1VCTUlUVEVELFxuICBQSFhfTUFJTixcbiAgUEhYX05PX0ZFRURCQUNLX0NMQVNTLFxuICBQSFhfUEFSRU5UX0lELFxuICBQSFhfUFJJVkFURSxcbiAgUEhYX1JFRixcbiAgUEhYX1NFU1NJT04sXG4gIFBIWF9TVEFUSUMsXG4gIFBIWF9VUExPQURfUkVGLFxuICBQSFhfVklFV19TRUxFQ1RPUixcbiAgVEhST1RUTEVEXG59IGZyb20gXCIuL2NvbnN0YW50c1wiXG5cbmltcG9ydCB7XG4gIGNsb25lLFxuICBsb2dFcnJvclxufSBmcm9tIFwiLi91dGlsc1wiXG5cbmxldCBET00gPSB7XG4gIGJ5SWQoaWQpeyByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpIHx8IGxvZ0Vycm9yKGBubyBpZCBmb3VuZCBmb3IgJHtpZH1gKSB9LFxuXG4gIHJlbW92ZUNsYXNzKGVsLCBjbGFzc05hbWUpe1xuICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKVxuICAgIGlmKGVsLmNsYXNzTGlzdC5sZW5ndGggPT09IDApeyBlbC5yZW1vdmVBdHRyaWJ1dGUoXCJjbGFzc1wiKSB9XG4gIH0sXG5cbiAgYWxsKG5vZGUsIHF1ZXJ5LCBjYWxsYmFjayl7XG4gICAgaWYoIW5vZGUpeyByZXR1cm4gW10gfVxuICAgIGxldCBhcnJheSA9IEFycmF5LmZyb20obm9kZS5xdWVyeVNlbGVjdG9yQWxsKHF1ZXJ5KSlcbiAgICByZXR1cm4gY2FsbGJhY2sgPyBhcnJheS5mb3JFYWNoKGNhbGxiYWNrKSA6IGFycmF5XG4gIH0sXG5cbiAgY2hpbGROb2RlTGVuZ3RoKGh0bWwpe1xuICAgIGxldCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKVxuICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IGh0bWxcbiAgICByZXR1cm4gdGVtcGxhdGUuY29udGVudC5jaGlsZEVsZW1lbnRDb3VudFxuICB9LFxuXG4gIGlzVXBsb2FkSW5wdXQoZWwpeyByZXR1cm4gZWwudHlwZSA9PT0gXCJmaWxlXCIgJiYgZWwuZ2V0QXR0cmlidXRlKFBIWF9VUExPQURfUkVGKSAhPT0gbnVsbCB9LFxuXG4gIGZpbmRVcGxvYWRJbnB1dHMobm9kZSl7IHJldHVybiB0aGlzLmFsbChub2RlLCBgaW5wdXRbdHlwZT1cImZpbGVcIl1bJHtQSFhfVVBMT0FEX1JFRn1dYCkgfSxcblxuICBmaW5kQ29tcG9uZW50Tm9kZUxpc3Qobm9kZSwgY2lkKXtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXJXaXRoaW5TYW1lTGl2ZVZpZXcodGhpcy5hbGwobm9kZSwgYFske1BIWF9DT01QT05FTlR9PVwiJHtjaWR9XCJdYCksIG5vZGUpXG4gIH0sXG5cbiAgaXNQaHhEZXN0cm95ZWQobm9kZSl7XG4gICAgcmV0dXJuIG5vZGUuaWQgJiYgRE9NLnByaXZhdGUobm9kZSwgXCJkZXN0cm95ZWRcIikgPyB0cnVlIDogZmFsc2VcbiAgfSxcblxuICBtYXJrUGh4Q2hpbGREZXN0cm95ZWQoZWwpe1xuICAgIGVsLnNldEF0dHJpYnV0ZShQSFhfU0VTU0lPTiwgXCJcIilcbiAgICB0aGlzLnB1dFByaXZhdGUoZWwsIFwiZGVzdHJveWVkXCIsIHRydWUpXG4gIH0sXG5cbiAgZmluZFBoeENoaWxkcmVuSW5GcmFnbWVudChodG1sLCBwYXJlbnRJZCl7XG4gICAgbGV0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpXG4gICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gaHRtbFxuICAgIHJldHVybiB0aGlzLmZpbmRQaHhDaGlsZHJlbih0ZW1wbGF0ZS5jb250ZW50LCBwYXJlbnRJZClcbiAgfSxcblxuICBpc0lnbm9yZWQoZWwsIHBoeFVwZGF0ZSl7XG4gICAgcmV0dXJuIChlbC5nZXRBdHRyaWJ1dGUocGh4VXBkYXRlKSB8fCBlbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBoeC11cGRhdGVcIikpID09PSBcImlnbm9yZVwiXG4gIH0sXG5cbiAgaXNQaHhVcGRhdGUoZWwsIHBoeFVwZGF0ZSwgdXBkYXRlVHlwZXMpe1xuICAgIHJldHVybiBlbC5nZXRBdHRyaWJ1dGUgJiYgdXBkYXRlVHlwZXMuaW5kZXhPZihlbC5nZXRBdHRyaWJ1dGUocGh4VXBkYXRlKSkgPj0gMFxuICB9LFxuXG4gIGZpbmRQaHhDaGlsZHJlbihlbCwgcGFyZW50SWQpe1xuICAgIHJldHVybiB0aGlzLmFsbChlbCwgYCR7UEhYX1ZJRVdfU0VMRUNUT1J9WyR7UEhYX1BBUkVOVF9JRH09XCIke3BhcmVudElkfVwiXWApXG4gIH0sXG5cbiAgZmluZFBhcmVudENJRHMobm9kZSwgY2lkcyl7XG4gICAgbGV0IGluaXRpYWwgPSBuZXcgU2V0KGNpZHMpXG4gICAgcmV0dXJuIGNpZHMucmVkdWNlKChhY2MsIGNpZCkgPT4ge1xuICAgICAgbGV0IHNlbGVjdG9yID0gYFske1BIWF9DT01QT05FTlR9PVwiJHtjaWR9XCJdIFske1BIWF9DT01QT05FTlR9XWBcblxuICAgICAgdGhpcy5maWx0ZXJXaXRoaW5TYW1lTGl2ZVZpZXcodGhpcy5hbGwobm9kZSwgc2VsZWN0b3IpLCBub2RlKVxuICAgICAgICAubWFwKGVsID0+IHBhcnNlSW50KGVsLmdldEF0dHJpYnV0ZShQSFhfQ09NUE9ORU5UKSkpXG4gICAgICAgIC5mb3JFYWNoKGNoaWxkQ0lEID0+IGFjYy5kZWxldGUoY2hpbGRDSUQpKVxuXG4gICAgICByZXR1cm4gYWNjXG4gICAgfSwgaW5pdGlhbClcbiAgfSxcblxuICBmaWx0ZXJXaXRoaW5TYW1lTGl2ZVZpZXcobm9kZXMsIHBhcmVudCl7XG4gICAgaWYocGFyZW50LnF1ZXJ5U2VsZWN0b3IoUEhYX1ZJRVdfU0VMRUNUT1IpKXtcbiAgICAgIHJldHVybiBub2Rlcy5maWx0ZXIoZWwgPT4gdGhpcy53aXRoaW5TYW1lTGl2ZVZpZXcoZWwsIHBhcmVudCkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBub2Rlc1xuICAgIH1cbiAgfSxcblxuICB3aXRoaW5TYW1lTGl2ZVZpZXcobm9kZSwgcGFyZW50KXtcbiAgICB3aGlsZShub2RlID0gbm9kZS5wYXJlbnROb2RlKXtcbiAgICAgIGlmKG5vZGUuaXNTYW1lTm9kZShwYXJlbnQpKXsgcmV0dXJuIHRydWUgfVxuICAgICAgaWYobm9kZS5nZXRBdHRyaWJ1dGUoUEhYX1NFU1NJT04pICE9PSBudWxsKXsgcmV0dXJuIGZhbHNlIH1cbiAgICB9XG4gIH0sXG5cbiAgcHJpdmF0ZShlbCwga2V5KXsgcmV0dXJuIGVsW1BIWF9QUklWQVRFXSAmJiBlbFtQSFhfUFJJVkFURV1ba2V5XSB9LFxuXG4gIGRlbGV0ZVByaXZhdGUoZWwsIGtleSl7IGVsW1BIWF9QUklWQVRFXSAmJiBkZWxldGUgKGVsW1BIWF9QUklWQVRFXVtrZXldKSB9LFxuXG4gIHB1dFByaXZhdGUoZWwsIGtleSwgdmFsdWUpe1xuICAgIGlmKCFlbFtQSFhfUFJJVkFURV0peyBlbFtQSFhfUFJJVkFURV0gPSB7fSB9XG4gICAgZWxbUEhYX1BSSVZBVEVdW2tleV0gPSB2YWx1ZVxuICB9LFxuXG4gIGNvcHlQcml2YXRlcyh0YXJnZXQsIHNvdXJjZSl7XG4gICAgaWYoc291cmNlW1BIWF9QUklWQVRFXSl7XG4gICAgICB0YXJnZXRbUEhYX1BSSVZBVEVdID0gY2xvbmUoc291cmNlW1BIWF9QUklWQVRFXSlcbiAgICB9XG4gIH0sXG5cbiAgcHV0VGl0bGUoc3RyKXtcbiAgICBsZXQgdGl0bGVFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ0aXRsZVwiKVxuICAgIGxldCB7cHJlZml4LCBzdWZmaXh9ID0gdGl0bGVFbC5kYXRhc2V0XG4gICAgZG9jdW1lbnQudGl0bGUgPSBgJHtwcmVmaXggfHwgXCJcIn0ke3N0cn0ke3N1ZmZpeCB8fCBcIlwifWBcbiAgfSxcblxuICBkZWJvdW5jZShlbCwgZXZlbnQsIHBoeERlYm91bmNlLCBkZWZhdWx0RGVib3VuY2UsIHBoeFRocm90dGxlLCBkZWZhdWx0VGhyb3R0bGUsIGNhbGxiYWNrKXtcbiAgICBsZXQgZGVib3VuY2UgPSBlbC5nZXRBdHRyaWJ1dGUocGh4RGVib3VuY2UpXG4gICAgbGV0IHRocm90dGxlID0gZWwuZ2V0QXR0cmlidXRlKHBoeFRocm90dGxlKVxuICAgIGlmKGRlYm91bmNlID09PSBcIlwiKXsgZGVib3VuY2UgPSBkZWZhdWx0RGVib3VuY2UgfVxuICAgIGlmKHRocm90dGxlID09PSBcIlwiKXsgdGhyb3R0bGUgPSBkZWZhdWx0VGhyb3R0bGUgfVxuICAgIGxldCB2YWx1ZSA9IGRlYm91bmNlIHx8IHRocm90dGxlXG4gICAgc3dpdGNoKHZhbHVlKXtcbiAgICAgIGNhc2UgbnVsbDogcmV0dXJuIGNhbGxiYWNrKClcblxuICAgICAgY2FzZSBcImJsdXJcIjpcbiAgICAgICAgaWYodGhpcy5vbmNlKGVsLCBcImRlYm91bmNlLWJsdXJcIikpe1xuICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsICgpID0+IGNhbGxiYWNrKCkpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxldCB0aW1lb3V0ID0gcGFyc2VJbnQodmFsdWUpXG4gICAgICAgIGxldCB0cmlnZ2VyID0gKCkgPT4gdGhyb3R0bGUgPyB0aGlzLmRlbGV0ZVByaXZhdGUoZWwsIFRIUk9UVExFRCkgOiBjYWxsYmFjaygpXG4gICAgICAgIGxldCBjdXJyZW50Q3ljbGUgPSB0aGlzLmluY0N5Y2xlKGVsLCBERUJPVU5DRV9UUklHR0VSLCB0cmlnZ2VyKVxuICAgICAgICBpZihpc05hTih0aW1lb3V0KSl7IHJldHVybiBsb2dFcnJvcihgaW52YWxpZCB0aHJvdHRsZS9kZWJvdW5jZSB2YWx1ZTogJHt2YWx1ZX1gKSB9XG4gICAgICAgIGlmKHRocm90dGxlKXtcbiAgICAgICAgICBsZXQgbmV3S2V5RG93biA9IGZhbHNlXG4gICAgICAgICAgaWYoZXZlbnQudHlwZSA9PT0gXCJrZXlkb3duXCIpe1xuICAgICAgICAgICAgbGV0IHByZXZLZXkgPSB0aGlzLnByaXZhdGUoZWwsIERFQk9VTkNFX1BSRVZfS0VZKVxuICAgICAgICAgICAgdGhpcy5wdXRQcml2YXRlKGVsLCBERUJPVU5DRV9QUkVWX0tFWSwgZXZlbnQua2V5KVxuICAgICAgICAgICAgbmV3S2V5RG93biA9IHByZXZLZXkgIT09IGV2ZW50LmtleVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmKCFuZXdLZXlEb3duICYmIHRoaXMucHJpdmF0ZShlbCwgVEhST1RUTEVEKSl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FsbGJhY2soKVxuICAgICAgICAgICAgdGhpcy5wdXRQcml2YXRlKGVsLCBUSFJPVFRMRUQsIHRydWUpXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudHJpZ2dlckN5Y2xlKGVsLCBERUJPVU5DRV9UUklHR0VSKSwgdGltZW91dClcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnRyaWdnZXJDeWNsZShlbCwgREVCT1VOQ0VfVFJJR0dFUiwgY3VycmVudEN5Y2xlKSwgdGltZW91dClcbiAgICAgICAgfVxuXG5cbiAgICAgICAgbGV0IGZvcm0gPSBlbC5mb3JtXG4gICAgICAgIGlmKGZvcm0gJiYgdGhpcy5vbmNlKGZvcm0sIFwiYmluZC1kZWJvdW5jZVwiKSl7XG4gICAgICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsICgpID0+IHtcbiAgICAgICAgICAgIEFycmF5LmZyb20oKG5ldyBGb3JtRGF0YShmb3JtKSkuZW50cmllcygpLCAoW25hbWVdKSA9PiB7XG4gICAgICAgICAgICAgIGxldCBpbnB1dCA9IGZvcm0ucXVlcnlTZWxlY3RvcihgW25hbWU9XCIke25hbWV9XCJdYClcbiAgICAgICAgICAgICAgdGhpcy5pbmNDeWNsZShpbnB1dCwgREVCT1VOQ0VfVFJJR0dFUilcbiAgICAgICAgICAgICAgdGhpcy5kZWxldGVQcml2YXRlKGlucHV0LCBUSFJPVFRMRUQpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5vbmNlKGVsLCBcImJpbmQtZGVib3VuY2VcIikpe1xuICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsICgpID0+IHRoaXMudHJpZ2dlckN5Y2xlKGVsLCBERUJPVU5DRV9UUklHR0VSKSlcbiAgICAgICAgfVxuICAgIH1cbiAgfSxcblxuICB0cmlnZ2VyQ3ljbGUoZWwsIGtleSwgY3VycmVudEN5Y2xlKXtcbiAgICBsZXQgW2N5Y2xlLCB0cmlnZ2VyXSA9IHRoaXMucHJpdmF0ZShlbCwga2V5KVxuICAgIGlmKCFjdXJyZW50Q3ljbGUpeyBjdXJyZW50Q3ljbGUgPSBjeWNsZSB9XG4gICAgaWYoY3VycmVudEN5Y2xlID09PSBjeWNsZSl7XG4gICAgICB0aGlzLmluY0N5Y2xlKGVsLCBrZXkpXG4gICAgICB0cmlnZ2VyKClcbiAgICB9XG4gIH0sXG5cbiAgb25jZShlbCwga2V5KXtcbiAgICBpZih0aGlzLnByaXZhdGUoZWwsIGtleSkgPT09IHRydWUpeyByZXR1cm4gZmFsc2UgfVxuICAgIHRoaXMucHV0UHJpdmF0ZShlbCwga2V5LCB0cnVlKVxuICAgIHJldHVybiB0cnVlXG4gIH0sXG5cbiAgaW5jQ3ljbGUoZWwsIGtleSwgdHJpZ2dlciA9IGZ1bmN0aW9uICgpeyB9KXtcbiAgICBsZXQgW2N1cnJlbnRDeWNsZV0gPSB0aGlzLnByaXZhdGUoZWwsIGtleSkgfHwgWzAsIHRyaWdnZXJdXG4gICAgY3VycmVudEN5Y2xlKytcbiAgICB0aGlzLnB1dFByaXZhdGUoZWwsIGtleSwgW2N1cnJlbnRDeWNsZSwgdHJpZ2dlcl0pXG4gICAgcmV0dXJuIGN1cnJlbnRDeWNsZVxuICB9LFxuXG4gIGRpc2NhcmRFcnJvcihjb250YWluZXIsIGVsLCBwaHhGZWVkYmFja0Zvcil7XG4gICAgbGV0IGZpZWxkID0gZWwuZ2V0QXR0cmlidXRlICYmIGVsLmdldEF0dHJpYnV0ZShwaHhGZWVkYmFja0ZvcilcbiAgICAvLyBUT0RPOiBSZW1vdmUgaWQgbG9va3VwIGFmdGVyIHdlIHVwZGF0ZSBQaG9lbml4IHRvIHVzZSBpbnB1dF9uYW1lIGluc3RlYWQgb2YgaW5wdXRfaWRcbiAgICBsZXQgaW5wdXQgPSBmaWVsZCAmJiBjb250YWluZXIucXVlcnlTZWxlY3RvcihgW2lkPVwiJHtmaWVsZH1cIl0sIFtuYW1lPVwiJHtmaWVsZH1cIl1gKVxuICAgIGlmKCFpbnB1dCl7IHJldHVybiB9XG5cbiAgICBpZighKHRoaXMucHJpdmF0ZShpbnB1dCwgUEhYX0hBU19GT0NVU0VEKSB8fCB0aGlzLnByaXZhdGUoaW5wdXQuZm9ybSwgUEhYX0hBU19TVUJNSVRURUQpKSl7XG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKFBIWF9OT19GRUVEQkFDS19DTEFTUylcbiAgICB9XG4gIH0sXG5cbiAgc2hvd0Vycm9yKGlucHV0RWwsIHBoeEZlZWRiYWNrRm9yKXtcbiAgICBpZihpbnB1dEVsLmlkIHx8IGlucHV0RWwubmFtZSl7XG4gICAgICB0aGlzLmFsbChpbnB1dEVsLmZvcm0sIGBbJHtwaHhGZWVkYmFja0Zvcn09XCIke2lucHV0RWwuaWR9XCJdLCBbJHtwaHhGZWVkYmFja0Zvcn09XCIke2lucHV0RWwubmFtZX1cIl1gLCAoZWwpID0+IHtcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcyhlbCwgUEhYX05PX0ZFRURCQUNLX0NMQVNTKVxuICAgICAgfSlcbiAgICB9XG4gIH0sXG5cbiAgaXNQaHhDaGlsZChub2RlKXtcbiAgICByZXR1cm4gbm9kZS5nZXRBdHRyaWJ1dGUgJiYgbm9kZS5nZXRBdHRyaWJ1dGUoUEhYX1BBUkVOVF9JRClcbiAgfSxcblxuICBkaXNwYXRjaEV2ZW50KHRhcmdldCwgZXZlbnRTdHJpbmcsIGRldGFpbCA9IHt9KXtcbiAgICBsZXQgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZlbnRTdHJpbmcsIHtidWJibGVzOiB0cnVlLCBjYW5jZWxhYmxlOiB0cnVlLCBkZXRhaWw6IGRldGFpbH0pXG4gICAgdGFyZ2V0LmRpc3BhdGNoRXZlbnQoZXZlbnQpXG4gIH0sXG5cbiAgY2xvbmVOb2RlKG5vZGUsIGh0bWwpe1xuICAgIGlmKHR5cGVvZiAoaHRtbCkgPT09IFwidW5kZWZpbmVkXCIpe1xuICAgICAgcmV0dXJuIG5vZGUuY2xvbmVOb2RlKHRydWUpXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBjbG9uZWQgPSBub2RlLmNsb25lTm9kZShmYWxzZSlcbiAgICAgIGNsb25lZC5pbm5lckhUTUwgPSBodG1sXG4gICAgICByZXR1cm4gY2xvbmVkXG4gICAgfVxuICB9LFxuXG4gIG1lcmdlQXR0cnModGFyZ2V0LCBzb3VyY2UsIG9wdHMgPSB7fSl7XG4gICAgbGV0IGV4Y2x1ZGUgPSBvcHRzLmV4Y2x1ZGUgfHwgW11cbiAgICBsZXQgaXNJZ25vcmVkID0gb3B0cy5pc0lnbm9yZWRcbiAgICBsZXQgc291cmNlQXR0cnMgPSBzb3VyY2UuYXR0cmlidXRlc1xuICAgIGZvcihsZXQgaSA9IHNvdXJjZUF0dHJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKXtcbiAgICAgIGxldCBuYW1lID0gc291cmNlQXR0cnNbaV0ubmFtZVxuICAgICAgaWYoZXhjbHVkZS5pbmRleE9mKG5hbWUpIDwgMCl7IHRhcmdldC5zZXRBdHRyaWJ1dGUobmFtZSwgc291cmNlLmdldEF0dHJpYnV0ZShuYW1lKSkgfVxuICAgIH1cblxuICAgIGxldCB0YXJnZXRBdHRycyA9IHRhcmdldC5hdHRyaWJ1dGVzXG4gICAgZm9yKGxldCBpID0gdGFyZ2V0QXR0cnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pe1xuICAgICAgbGV0IG5hbWUgPSB0YXJnZXRBdHRyc1tpXS5uYW1lXG4gICAgICBpZihpc0lnbm9yZWQpe1xuICAgICAgICBpZihuYW1lLnN0YXJ0c1dpdGgoXCJkYXRhLVwiKSAmJiAhc291cmNlLmhhc0F0dHJpYnV0ZShuYW1lKSl7IHRhcmdldC5yZW1vdmVBdHRyaWJ1dGUobmFtZSkgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYoIXNvdXJjZS5oYXNBdHRyaWJ1dGUobmFtZSkpeyB0YXJnZXQucmVtb3ZlQXR0cmlidXRlKG5hbWUpIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgbWVyZ2VGb2N1c2VkSW5wdXQodGFyZ2V0LCBzb3VyY2Upe1xuICAgIC8vIHNraXAgc2VsZWN0cyBiZWNhdXNlIEZGIHdpbGwgcmVzZXQgaGlnaGxpZ2h0ZWQgaW5kZXggZm9yIGFueSBzZXRBdHRyaWJ1dGVcbiAgICBpZighKHRhcmdldCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50KSl7IERPTS5tZXJnZUF0dHJzKHRhcmdldCwgc291cmNlLCB7ZXhjZXB0OiBbXCJ2YWx1ZVwiXX0pIH1cbiAgICBpZihzb3VyY2UucmVhZE9ubHkpe1xuICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZShcInJlYWRvbmx5XCIsIHRydWUpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRhcmdldC5yZW1vdmVBdHRyaWJ1dGUoXCJyZWFkb25seVwiKVxuICAgIH1cbiAgfSxcblxuICBoYXNTZWxlY3Rpb25SYW5nZShlbCl7XG4gICAgcmV0dXJuIGVsLnNldFNlbGVjdGlvblJhbmdlICYmIChlbC50eXBlID09PSBcInRleHRcIiB8fCBlbC50eXBlID09PSBcInRleHRhcmVhXCIpXG4gIH0sXG5cbiAgcmVzdG9yZUZvY3VzKGZvY3VzZWQsIHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQpe1xuICAgIGlmKCFET00uaXNUZXh0dWFsSW5wdXQoZm9jdXNlZCkpeyByZXR1cm4gfVxuICAgIGxldCB3YXNGb2N1c2VkID0gZm9jdXNlZC5tYXRjaGVzKFwiOmZvY3VzXCIpXG4gICAgaWYoZm9jdXNlZC5yZWFkT25seSl7IGZvY3VzZWQuYmx1cigpIH1cbiAgICBpZighd2FzRm9jdXNlZCl7IGZvY3VzZWQuZm9jdXMoKSB9XG4gICAgaWYodGhpcy5oYXNTZWxlY3Rpb25SYW5nZShmb2N1c2VkKSl7XG4gICAgICBmb2N1c2VkLnNldFNlbGVjdGlvblJhbmdlKHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQpXG4gICAgfVxuICB9LFxuXG4gIGlzRm9ybUlucHV0KGVsKXsgcmV0dXJuIC9eKD86aW5wdXR8c2VsZWN0fHRleHRhcmVhKSQvaS50ZXN0KGVsLnRhZ05hbWUpICYmIGVsLnR5cGUgIT09IFwiYnV0dG9uXCIgfSxcblxuICBzeW5jQXR0cnNUb1Byb3BzKGVsKXtcbiAgICBpZihlbCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiYgQ0hFQ0tBQkxFX0lOUFVUUy5pbmRleE9mKGVsLnR5cGUudG9Mb2NhbGVMb3dlckNhc2UoKSkgPj0gMCl7XG4gICAgICBlbC5jaGVja2VkID0gZWwuZ2V0QXR0cmlidXRlKFwiY2hlY2tlZFwiKSAhPT0gbnVsbFxuICAgIH1cbiAgfSxcblxuICBzeW5jUHJvcHNUb0F0dHJzKGVsKXtcbiAgICBpZihlbCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50KXtcbiAgICAgIGxldCBzZWxlY3RlZEl0ZW0gPSBlbC5vcHRpb25zLml0ZW0oZWwuc2VsZWN0ZWRJbmRleClcbiAgICAgIGlmKHNlbGVjdGVkSXRlbSAmJiBzZWxlY3RlZEl0ZW0uZ2V0QXR0cmlidXRlKFwic2VsZWN0ZWRcIikgPT09IG51bGwpe1xuICAgICAgICBzZWxlY3RlZEl0ZW0uc2V0QXR0cmlidXRlKFwic2VsZWN0ZWRcIiwgXCJcIilcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgaXNUZXh0dWFsSW5wdXQoZWwpeyByZXR1cm4gRk9DVVNBQkxFX0lOUFVUUy5pbmRleE9mKGVsLnR5cGUpID49IDAgfSxcblxuICBpc05vd1RyaWdnZXJGb3JtRXh0ZXJuYWwoZWwsIHBoeFRyaWdnZXJFeHRlcm5hbCl7XG4gICAgcmV0dXJuIGVsLmdldEF0dHJpYnV0ZSAmJiBlbC5nZXRBdHRyaWJ1dGUocGh4VHJpZ2dlckV4dGVybmFsKSAhPT0gbnVsbFxuICB9LFxuXG4gIHN5bmNQZW5kaW5nUmVmKGZyb21FbCwgdG9FbCwgZGlzYWJsZVdpdGgpe1xuICAgIGxldCByZWYgPSBmcm9tRWwuZ2V0QXR0cmlidXRlKFBIWF9SRUYpXG4gICAgaWYocmVmID09PSBudWxsKXsgcmV0dXJuIHRydWUgfVxuXG4gICAgaWYoRE9NLmlzRm9ybUlucHV0KGZyb21FbCkgfHwgZnJvbUVsLmdldEF0dHJpYnV0ZShkaXNhYmxlV2l0aCkgIT09IG51bGwpe1xuICAgICAgaWYoRE9NLmlzVXBsb2FkSW5wdXQoZnJvbUVsKSl7IERPTS5tZXJnZUF0dHJzKGZyb21FbCwgdG9FbCwge2lzSWdub3JlZDogdHJ1ZX0pIH1cbiAgICAgIERPTS5wdXRQcml2YXRlKGZyb21FbCwgUEhYX1JFRiwgdG9FbClcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH0gZWxzZSB7XG4gICAgICBQSFhfRVZFTlRfQ0xBU1NFUy5mb3JFYWNoKGNsYXNzTmFtZSA9PiB7XG4gICAgICAgIGZyb21FbC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSAmJiB0b0VsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKVxuICAgICAgfSlcbiAgICAgIHRvRWwuc2V0QXR0cmlidXRlKFBIWF9SRUYsIHJlZilcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9LFxuXG4gIGNsZWFuQ2hpbGROb2Rlcyhjb250YWluZXIsIHBoeFVwZGF0ZSl7XG4gICAgaWYoRE9NLmlzUGh4VXBkYXRlKGNvbnRhaW5lciwgcGh4VXBkYXRlLCBbXCJhcHBlbmRcIiwgXCJwcmVwZW5kXCJdKSl7XG4gICAgICBsZXQgdG9SZW1vdmUgPSBbXVxuICAgICAgY29udGFpbmVyLmNoaWxkTm9kZXMuZm9yRWFjaChjaGlsZE5vZGUgPT4ge1xuICAgICAgICBpZighY2hpbGROb2RlLmlkKXtcbiAgICAgICAgICAvLyBTa2lwIHdhcm5pbmcgaWYgaXQncyBhbiBlbXB0eSB0ZXh0IG5vZGUgKGUuZy4gYSBuZXctbGluZSlcbiAgICAgICAgICBsZXQgaXNFbXB0eVRleHROb2RlID0gY2hpbGROb2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSAmJiBjaGlsZE5vZGUubm9kZVZhbHVlLnRyaW0oKSA9PT0gXCJcIlxuICAgICAgICAgIGlmKCFpc0VtcHR5VGV4dE5vZGUpe1xuICAgICAgICAgICAgbG9nRXJyb3IoXCJvbmx5IEhUTUwgZWxlbWVudCB0YWdzIHdpdGggYW4gaWQgYXJlIGFsbG93ZWQgaW5zaWRlIGNvbnRhaW5lcnMgd2l0aCBwaHgtdXBkYXRlLlxcblxcblwiICtcbiAgICAgICAgICAgICAgYHJlbW92aW5nIGlsbGVnYWwgbm9kZTogXCIkeyhjaGlsZE5vZGUub3V0ZXJIVE1MIHx8IGNoaWxkTm9kZS5ub2RlVmFsdWUpLnRyaW0oKX1cIlxcblxcbmApXG4gICAgICAgICAgfVxuICAgICAgICAgIHRvUmVtb3ZlLnB1c2goY2hpbGROb2RlKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdG9SZW1vdmUuZm9yRWFjaChjaGlsZE5vZGUgPT4gY2hpbGROb2RlLnJlbW92ZSgpKVxuICAgIH1cbiAgfSxcblxuICByZXBsYWNlUm9vdENvbnRhaW5lcihjb250YWluZXIsIHRhZ05hbWUsIGF0dHJzKXtcbiAgICBsZXQgcmV0YWluZWRBdHRycyA9IG5ldyBTZXQoW1wiaWRcIiwgUEhYX1NFU1NJT04sIFBIWF9TVEFUSUMsIFBIWF9NQUlOXSlcbiAgICBpZihjb250YWluZXIudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSB0YWdOYW1lLnRvTG93ZXJDYXNlKCkpe1xuICAgICAgQXJyYXkuZnJvbShjb250YWluZXIuYXR0cmlidXRlcylcbiAgICAgICAgLmZpbHRlcihhdHRyID0+ICFyZXRhaW5lZEF0dHJzLmhhcyhhdHRyLm5hbWUudG9Mb3dlckNhc2UoKSkpXG4gICAgICAgIC5mb3JFYWNoKGF0dHIgPT4gY29udGFpbmVyLnJlbW92ZUF0dHJpYnV0ZShhdHRyLm5hbWUpKVxuXG4gICAgICBPYmplY3Qua2V5cyhhdHRycylcbiAgICAgICAgLmZpbHRlcihuYW1lID0+ICFyZXRhaW5lZEF0dHJzLmhhcyhuYW1lLnRvTG93ZXJDYXNlKCkpKVxuICAgICAgICAuZm9yRWFjaChhdHRyID0+IGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoYXR0ciwgYXR0cnNbYXR0cl0pKVxuXG4gICAgICByZXR1cm4gY29udGFpbmVyXG5cbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IG5ld0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSlcbiAgICAgIE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGF0dHIgPT4gbmV3Q29udGFpbmVyLnNldEF0dHJpYnV0ZShhdHRyLCBhdHRyc1thdHRyXSkpXG4gICAgICByZXRhaW5lZEF0dHJzLmZvckVhY2goYXR0ciA9PiBuZXdDb250YWluZXIuc2V0QXR0cmlidXRlKGF0dHIsIGNvbnRhaW5lci5nZXRBdHRyaWJ1dGUoYXR0cikpKVxuICAgICAgbmV3Q29udGFpbmVyLmlubmVySFRNTCA9IGNvbnRhaW5lci5pbm5lckhUTUxcbiAgICAgIGNvbnRhaW5lci5yZXBsYWNlV2l0aChuZXdDb250YWluZXIpXG4gICAgICByZXR1cm4gbmV3Q29udGFpbmVyXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERPTVxuIiwgImltcG9ydCB7XG4gIFBIWF9BQ1RJVkVfRU5UUllfUkVGUyxcbiAgUEhYX0xJVkVfRklMRV9VUERBVEVELFxuICBQSFhfUFJFRkxJR0hURURfUkVGU1xufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQge1xuICBjaGFubmVsVXBsb2FkZXIsXG4gIGxvZ0Vycm9yXG59IGZyb20gXCIuL3V0aWxzXCJcblxuaW1wb3J0IExpdmVVcGxvYWRlciBmcm9tIFwiLi9saXZlX3VwbG9hZGVyXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXBsb2FkRW50cnkge1xuICBzdGF0aWMgaXNBY3RpdmUoZmlsZUVsLCBmaWxlKXtcbiAgICBsZXQgaXNOZXcgPSBmaWxlLl9waHhSZWYgPT09IHVuZGVmaW5lZFxuICAgIGxldCBhY3RpdmVSZWZzID0gZmlsZUVsLmdldEF0dHJpYnV0ZShQSFhfQUNUSVZFX0VOVFJZX1JFRlMpLnNwbGl0KFwiLFwiKVxuICAgIGxldCBpc0FjdGl2ZSA9IGFjdGl2ZVJlZnMuaW5kZXhPZihMaXZlVXBsb2FkZXIuZ2VuRmlsZVJlZihmaWxlKSkgPj0gMFxuICAgIHJldHVybiBmaWxlLnNpemUgPiAwICYmIChpc05ldyB8fCBpc0FjdGl2ZSlcbiAgfVxuXG4gIHN0YXRpYyBpc1ByZWZsaWdodGVkKGZpbGVFbCwgZmlsZSl7XG4gICAgbGV0IHByZWZsaWdodGVkUmVmcyA9IGZpbGVFbC5nZXRBdHRyaWJ1dGUoUEhYX1BSRUZMSUdIVEVEX1JFRlMpLnNwbGl0KFwiLFwiKVxuICAgIGxldCBpc1ByZWZsaWdodGVkID0gcHJlZmxpZ2h0ZWRSZWZzLmluZGV4T2YoTGl2ZVVwbG9hZGVyLmdlbkZpbGVSZWYoZmlsZSkpID49IDBcbiAgICByZXR1cm4gaXNQcmVmbGlnaHRlZCAmJiB0aGlzLmlzQWN0aXZlKGZpbGVFbCwgZmlsZSlcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGZpbGVFbCwgZmlsZSwgdmlldyl7XG4gICAgdGhpcy5yZWYgPSBMaXZlVXBsb2FkZXIuZ2VuRmlsZVJlZihmaWxlKVxuICAgIHRoaXMuZmlsZUVsID0gZmlsZUVsXG4gICAgdGhpcy5maWxlID0gZmlsZVxuICAgIHRoaXMudmlldyA9IHZpZXdcbiAgICB0aGlzLm1ldGEgPSBudWxsXG4gICAgdGhpcy5faXNDYW5jZWxsZWQgPSBmYWxzZVxuICAgIHRoaXMuX2lzRG9uZSA9IGZhbHNlXG4gICAgdGhpcy5fcHJvZ3Jlc3MgPSAwXG4gICAgdGhpcy5fbGFzdFByb2dyZXNzU2VudCA9IC0xXG4gICAgdGhpcy5fb25Eb25lID0gZnVuY3Rpb24gKCl7IH1cbiAgICB0aGlzLl9vbkVsVXBkYXRlZCA9IHRoaXMub25FbFVwZGF0ZWQuYmluZCh0aGlzKVxuICAgIHRoaXMuZmlsZUVsLmFkZEV2ZW50TGlzdGVuZXIoUEhYX0xJVkVfRklMRV9VUERBVEVELCB0aGlzLl9vbkVsVXBkYXRlZClcbiAgfVxuXG4gIG1ldGFkYXRhKCl7IHJldHVybiB0aGlzLm1ldGEgfVxuXG4gIHByb2dyZXNzKHByb2dyZXNzKXtcbiAgICB0aGlzLl9wcm9ncmVzcyA9IE1hdGguZmxvb3IocHJvZ3Jlc3MpXG4gICAgaWYodGhpcy5fcHJvZ3Jlc3MgPiB0aGlzLl9sYXN0UHJvZ3Jlc3NTZW50KXtcbiAgICAgIGlmKHRoaXMuX3Byb2dyZXNzID49IDEwMCl7XG4gICAgICAgIHRoaXMuX3Byb2dyZXNzID0gMTAwXG4gICAgICAgIHRoaXMuX2xhc3RQcm9ncmVzc1NlbnQgPSAxMDBcbiAgICAgICAgdGhpcy5faXNEb25lID0gdHJ1ZVxuICAgICAgICB0aGlzLnZpZXcucHVzaEZpbGVQcm9ncmVzcyh0aGlzLmZpbGVFbCwgdGhpcy5yZWYsIDEwMCwgKCkgPT4ge1xuICAgICAgICAgIExpdmVVcGxvYWRlci51bnRyYWNrRmlsZSh0aGlzLmZpbGVFbCwgdGhpcy5maWxlKVxuICAgICAgICAgIHRoaXMuX29uRG9uZSgpXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9sYXN0UHJvZ3Jlc3NTZW50ID0gdGhpcy5fcHJvZ3Jlc3NcbiAgICAgICAgdGhpcy52aWV3LnB1c2hGaWxlUHJvZ3Jlc3ModGhpcy5maWxlRWwsIHRoaXMucmVmLCB0aGlzLl9wcm9ncmVzcylcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjYW5jZWwoKXtcbiAgICB0aGlzLl9pc0NhbmNlbGxlZCA9IHRydWVcbiAgICB0aGlzLl9pc0RvbmUgPSB0cnVlXG4gICAgdGhpcy5fb25Eb25lKClcbiAgfVxuXG4gIGlzRG9uZSgpeyByZXR1cm4gdGhpcy5faXNEb25lIH1cblxuICBlcnJvcihyZWFzb24gPSBcImZhaWxlZFwiKXtcbiAgICB0aGlzLnZpZXcucHVzaEZpbGVQcm9ncmVzcyh0aGlzLmZpbGVFbCwgdGhpcy5yZWYsIHtlcnJvcjogcmVhc29ufSlcbiAgICBMaXZlVXBsb2FkZXIuY2xlYXJGaWxlcyh0aGlzLmZpbGVFbClcbiAgfVxuXG4gIC8vcHJpdmF0ZVxuXG4gIG9uRG9uZShjYWxsYmFjayl7XG4gICAgdGhpcy5fb25Eb25lID0gKCkgPT4ge1xuICAgICAgdGhpcy5maWxlRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihQSFhfTElWRV9GSUxFX1VQREFURUQsIHRoaXMuX29uRWxVcGRhdGVkKVxuICAgICAgY2FsbGJhY2soKVxuICAgIH1cbiAgfVxuXG4gIG9uRWxVcGRhdGVkKCl7XG4gICAgbGV0IGFjdGl2ZVJlZnMgPSB0aGlzLmZpbGVFbC5nZXRBdHRyaWJ1dGUoUEhYX0FDVElWRV9FTlRSWV9SRUZTKS5zcGxpdChcIixcIilcbiAgICBpZihhY3RpdmVSZWZzLmluZGV4T2YodGhpcy5yZWYpID09PSAtMSl7IHRoaXMuY2FuY2VsKCkgfVxuICB9XG5cbiAgdG9QcmVmbGlnaHRQYXlsb2FkKCl7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxhc3RfbW9kaWZpZWQ6IHRoaXMuZmlsZS5sYXN0TW9kaWZpZWQsXG4gICAgICBuYW1lOiB0aGlzLmZpbGUubmFtZSxcbiAgICAgIHNpemU6IHRoaXMuZmlsZS5zaXplLFxuICAgICAgdHlwZTogdGhpcy5maWxlLnR5cGUsXG4gICAgICByZWY6IHRoaXMucmVmXG4gICAgfVxuICB9XG5cbiAgdXBsb2FkZXIodXBsb2FkZXJzKXtcbiAgICBpZih0aGlzLm1ldGEudXBsb2FkZXIpe1xuICAgICAgbGV0IGNhbGxiYWNrID0gdXBsb2FkZXJzW3RoaXMubWV0YS51cGxvYWRlcl0gfHwgbG9nRXJyb3IoYG5vIHVwbG9hZGVyIGNvbmZpZ3VyZWQgZm9yICR7dGhpcy5tZXRhLnVwbG9hZGVyfWApXG4gICAgICByZXR1cm4ge25hbWU6IHRoaXMubWV0YS51cGxvYWRlciwgY2FsbGJhY2s6IGNhbGxiYWNrfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge25hbWU6IFwiY2hhbm5lbFwiLCBjYWxsYmFjazogY2hhbm5lbFVwbG9hZGVyfVxuICAgIH1cbiAgfVxuXG4gIHppcFBvc3RGbGlnaHQocmVzcCl7XG4gICAgdGhpcy5tZXRhID0gcmVzcC5lbnRyaWVzW3RoaXMucmVmXVxuICAgIGlmKCF0aGlzLm1ldGEpeyBsb2dFcnJvcihgbm8gcHJlZmxpZ2h0IHVwbG9hZCByZXNwb25zZSByZXR1cm5lZCB3aXRoIHJlZiAke3RoaXMucmVmfWAsIHtpbnB1dDogdGhpcy5maWxlRWwsIHJlc3BvbnNlOiByZXNwfSkgfVxuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgUEhYX0RPTkVfUkVGUyxcbiAgUEhYX1BSRUZMSUdIVEVEX1JFRlMsXG4gIFBIWF9VUExPQURfUkVGXG59IGZyb20gXCIuL2NvbnN0YW50c1wiXG5cbmltcG9ydCB7XG59IGZyb20gXCIuL3V0aWxzXCJcblxuaW1wb3J0IERPTSBmcm9tIFwiLi9kb21cIlxuaW1wb3J0IFVwbG9hZEVudHJ5IGZyb20gXCIuL3VwbG9hZF9lbnRyeVwiXG5cbmxldCBsaXZlVXBsb2FkZXJGaWxlUmVmID0gMFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXZlVXBsb2FkZXIge1xuICBzdGF0aWMgZ2VuRmlsZVJlZihmaWxlKXtcbiAgICBsZXQgcmVmID0gZmlsZS5fcGh4UmVmXG4gICAgaWYocmVmICE9PSB1bmRlZmluZWQpe1xuICAgICAgcmV0dXJuIHJlZlxuICAgIH0gZWxzZSB7XG4gICAgICBmaWxlLl9waHhSZWYgPSAobGl2ZVVwbG9hZGVyRmlsZVJlZisrKS50b1N0cmluZygpXG4gICAgICByZXR1cm4gZmlsZS5fcGh4UmVmXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldEVudHJ5RGF0YVVSTChpbnB1dEVsLCByZWYsIGNhbGxiYWNrKXtcbiAgICBsZXQgZmlsZSA9IHRoaXMuYWN0aXZlRmlsZXMoaW5wdXRFbCkuZmluZChmaWxlID0+IHRoaXMuZ2VuRmlsZVJlZihmaWxlKSA9PT0gcmVmKVxuICAgIGNhbGxiYWNrKFVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSkpXG4gIH1cblxuICBzdGF0aWMgaGFzVXBsb2Fkc0luUHJvZ3Jlc3MoZm9ybUVsKXtcbiAgICBsZXQgYWN0aXZlID0gMFxuICAgIERPTS5maW5kVXBsb2FkSW5wdXRzKGZvcm1FbCkuZm9yRWFjaChpbnB1dCA9PiB7XG4gICAgICBpZihpbnB1dC5nZXRBdHRyaWJ1dGUoUEhYX1BSRUZMSUdIVEVEX1JFRlMpICE9PSBpbnB1dC5nZXRBdHRyaWJ1dGUoUEhYX0RPTkVfUkVGUykpe1xuICAgICAgICBhY3RpdmUrK1xuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGFjdGl2ZSA+IDBcbiAgfVxuXG4gIHN0YXRpYyBzZXJpYWxpemVVcGxvYWRzKGlucHV0RWwpe1xuICAgIGxldCBmaWxlcyA9IHRoaXMuYWN0aXZlRmlsZXMoaW5wdXRFbClcbiAgICBsZXQgZmlsZURhdGEgPSB7fVxuICAgIGZpbGVzLmZvckVhY2goZmlsZSA9PiB7XG4gICAgICBsZXQgZW50cnkgPSB7cGF0aDogaW5wdXRFbC5uYW1lfVxuICAgICAgbGV0IHVwbG9hZFJlZiA9IGlucHV0RWwuZ2V0QXR0cmlidXRlKFBIWF9VUExPQURfUkVGKVxuICAgICAgZmlsZURhdGFbdXBsb2FkUmVmXSA9IGZpbGVEYXRhW3VwbG9hZFJlZl0gfHwgW11cbiAgICAgIGVudHJ5LnJlZiA9IHRoaXMuZ2VuRmlsZVJlZihmaWxlKVxuICAgICAgZW50cnkubmFtZSA9IGZpbGUubmFtZSB8fCBlbnRyeS5yZWZcbiAgICAgIGVudHJ5LnR5cGUgPSBmaWxlLnR5cGVcbiAgICAgIGVudHJ5LnNpemUgPSBmaWxlLnNpemVcbiAgICAgIGZpbGVEYXRhW3VwbG9hZFJlZl0ucHVzaChlbnRyeSlcbiAgICB9KVxuICAgIHJldHVybiBmaWxlRGF0YVxuICB9XG5cbiAgc3RhdGljIGNsZWFyRmlsZXMoaW5wdXRFbCl7XG4gICAgaW5wdXRFbC52YWx1ZSA9IG51bGxcbiAgICBpbnB1dEVsLnJlbW92ZUF0dHJpYnV0ZShQSFhfVVBMT0FEX1JFRilcbiAgICBET00ucHV0UHJpdmF0ZShpbnB1dEVsLCBcImZpbGVzXCIsIFtdKVxuICB9XG5cbiAgc3RhdGljIHVudHJhY2tGaWxlKGlucHV0RWwsIGZpbGUpe1xuICAgIERPTS5wdXRQcml2YXRlKGlucHV0RWwsIFwiZmlsZXNcIiwgRE9NLnByaXZhdGUoaW5wdXRFbCwgXCJmaWxlc1wiKS5maWx0ZXIoZiA9PiAhT2JqZWN0LmlzKGYsIGZpbGUpKSlcbiAgfVxuXG4gIHN0YXRpYyB0cmFja0ZpbGVzKGlucHV0RWwsIGZpbGVzKXtcbiAgICBpZihpbnB1dEVsLmdldEF0dHJpYnV0ZShcIm11bHRpcGxlXCIpICE9PSBudWxsKXtcbiAgICAgIGxldCBuZXdGaWxlcyA9IGZpbGVzLmZpbHRlcihmaWxlID0+ICF0aGlzLmFjdGl2ZUZpbGVzKGlucHV0RWwpLmZpbmQoZiA9PiBPYmplY3QuaXMoZiwgZmlsZSkpKVxuICAgICAgRE9NLnB1dFByaXZhdGUoaW5wdXRFbCwgXCJmaWxlc1wiLCB0aGlzLmFjdGl2ZUZpbGVzKGlucHV0RWwpLmNvbmNhdChuZXdGaWxlcykpXG4gICAgICBpbnB1dEVsLnZhbHVlID0gbnVsbFxuICAgIH0gZWxzZSB7XG4gICAgICBET00ucHV0UHJpdmF0ZShpbnB1dEVsLCBcImZpbGVzXCIsIGZpbGVzKVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBhY3RpdmVGaWxlSW5wdXRzKGZvcm1FbCl7XG4gICAgbGV0IGZpbGVJbnB1dHMgPSBET00uZmluZFVwbG9hZElucHV0cyhmb3JtRWwpXG4gICAgcmV0dXJuIEFycmF5LmZyb20oZmlsZUlucHV0cykuZmlsdGVyKGVsID0+IGVsLmZpbGVzICYmIHRoaXMuYWN0aXZlRmlsZXMoZWwpLmxlbmd0aCA+IDApXG4gIH1cblxuICBzdGF0aWMgYWN0aXZlRmlsZXMoaW5wdXQpe1xuICAgIHJldHVybiAoRE9NLnByaXZhdGUoaW5wdXQsIFwiZmlsZXNcIikgfHwgW10pLmZpbHRlcihmID0+IFVwbG9hZEVudHJ5LmlzQWN0aXZlKGlucHV0LCBmKSlcbiAgfVxuXG4gIHN0YXRpYyBpbnB1dHNBd2FpdGluZ1ByZWZsaWdodChmb3JtRWwpe1xuICAgIGxldCBmaWxlSW5wdXRzID0gRE9NLmZpbmRVcGxvYWRJbnB1dHMoZm9ybUVsKVxuICAgIHJldHVybiBBcnJheS5mcm9tKGZpbGVJbnB1dHMpLmZpbHRlcihpbnB1dCA9PiB0aGlzLmZpbGVzQXdhaXRpbmdQcmVmbGlnaHQoaW5wdXQpLmxlbmd0aCA+IDApXG4gIH1cblxuICBzdGF0aWMgZmlsZXNBd2FpdGluZ1ByZWZsaWdodChpbnB1dCl7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlRmlsZXMoaW5wdXQpLmZpbHRlcihmID0+ICFVcGxvYWRFbnRyeS5pc1ByZWZsaWdodGVkKGlucHV0LCBmKSlcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGlucHV0RWwsIHZpZXcsIG9uQ29tcGxldGUpe1xuICAgIHRoaXMudmlldyA9IHZpZXdcbiAgICB0aGlzLm9uQ29tcGxldGUgPSBvbkNvbXBsZXRlXG4gICAgdGhpcy5fZW50cmllcyA9XG4gICAgICBBcnJheS5mcm9tKExpdmVVcGxvYWRlci5maWxlc0F3YWl0aW5nUHJlZmxpZ2h0KGlucHV0RWwpIHx8IFtdKVxuICAgICAgICAubWFwKGZpbGUgPT4gbmV3IFVwbG9hZEVudHJ5KGlucHV0RWwsIGZpbGUsIHZpZXcpKVxuXG4gICAgdGhpcy5udW1FbnRyaWVzSW5Qcm9ncmVzcyA9IHRoaXMuX2VudHJpZXMubGVuZ3RoXG4gIH1cblxuICBlbnRyaWVzKCl7IHJldHVybiB0aGlzLl9lbnRyaWVzIH1cblxuICBpbml0QWRhcHRlclVwbG9hZChyZXNwLCBvbkVycm9yLCBsaXZlU29ja2V0KXtcbiAgICB0aGlzLl9lbnRyaWVzID1cbiAgICAgIHRoaXMuX2VudHJpZXMubWFwKGVudHJ5ID0+IHtcbiAgICAgICAgZW50cnkuemlwUG9zdEZsaWdodChyZXNwKVxuICAgICAgICBlbnRyeS5vbkRvbmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMubnVtRW50cmllc0luUHJvZ3Jlc3MtLVxuICAgICAgICAgIGlmKHRoaXMubnVtRW50cmllc0luUHJvZ3Jlc3MgPT09IDApeyB0aGlzLm9uQ29tcGxldGUoKSB9XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBlbnRyeVxuICAgICAgfSlcblxuICAgIGxldCBncm91cGVkRW50cmllcyA9IHRoaXMuX2VudHJpZXMucmVkdWNlKChhY2MsIGVudHJ5KSA9PiB7XG4gICAgICBsZXQge25hbWUsIGNhbGxiYWNrfSA9IGVudHJ5LnVwbG9hZGVyKGxpdmVTb2NrZXQudXBsb2FkZXJzKVxuICAgICAgYWNjW25hbWVdID0gYWNjW25hbWVdIHx8IHtjYWxsYmFjazogY2FsbGJhY2ssIGVudHJpZXM6IFtdfVxuICAgICAgYWNjW25hbWVdLmVudHJpZXMucHVzaChlbnRyeSlcbiAgICAgIHJldHVybiBhY2NcbiAgICB9LCB7fSlcblxuICAgIGZvcihsZXQgbmFtZSBpbiBncm91cGVkRW50cmllcyl7XG4gICAgICBsZXQge2NhbGxiYWNrLCBlbnRyaWVzfSA9IGdyb3VwZWRFbnRyaWVzW25hbWVdXG4gICAgICBjYWxsYmFjayhlbnRyaWVzLCBvbkVycm9yLCByZXNwLCBsaXZlU29ja2V0KVxuICAgIH1cbiAgfVxufVxuIiwgImltcG9ydCB7XG4gIFBIWF9BQ1RJVkVfRU5UUllfUkVGUyxcbiAgUEhYX0xJVkVfRklMRV9VUERBVEVELFxuICBQSFhfUFJFRkxJR0hURURfUkVGUyxcbiAgUEhYX1VQTE9BRF9SRUZcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IExpdmVVcGxvYWRlciBmcm9tIFwiLi9saXZlX3VwbG9hZGVyXCJcblxubGV0IEhvb2tzID0ge1xuICBMaXZlRmlsZVVwbG9hZDoge1xuICAgIGFjdGl2ZVJlZnMoKXsgcmV0dXJuIHRoaXMuZWwuZ2V0QXR0cmlidXRlKFBIWF9BQ1RJVkVfRU5UUllfUkVGUykgfSxcblxuICAgIHByZWZsaWdodGVkUmVmcygpeyByZXR1cm4gdGhpcy5lbC5nZXRBdHRyaWJ1dGUoUEhYX1BSRUZMSUdIVEVEX1JFRlMpIH0sXG5cbiAgICBtb3VudGVkKCl7IHRoaXMucHJlZmxpZ2h0ZWRXYXMgPSB0aGlzLnByZWZsaWdodGVkUmVmcygpIH0sXG5cbiAgICB1cGRhdGVkKCl7XG4gICAgICBsZXQgbmV3UHJlZmxpZ2h0cyA9IHRoaXMucHJlZmxpZ2h0ZWRSZWZzKClcbiAgICAgIGlmKHRoaXMucHJlZmxpZ2h0ZWRXYXMgIT09IG5ld1ByZWZsaWdodHMpe1xuICAgICAgICB0aGlzLnByZWZsaWdodGVkV2FzID0gbmV3UHJlZmxpZ2h0c1xuICAgICAgICBpZihuZXdQcmVmbGlnaHRzID09PSBcIlwiKXtcbiAgICAgICAgICB0aGlzLl9fdmlldy5jYW5jZWxTdWJtaXQodGhpcy5lbC5mb3JtKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmKHRoaXMuYWN0aXZlUmVmcygpID09PSBcIlwiKXsgdGhpcy5lbC52YWx1ZSA9IG51bGwgfVxuICAgICAgdGhpcy5lbC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChQSFhfTElWRV9GSUxFX1VQREFURUQpKVxuICAgIH1cbiAgfSxcblxuICBMaXZlSW1nUHJldmlldzoge1xuICAgIG1vdW50ZWQoKXtcbiAgICAgIHRoaXMucmVmID0gdGhpcy5lbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBoeC1lbnRyeS1yZWZcIilcbiAgICAgIHRoaXMuaW5wdXRFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZWwuZ2V0QXR0cmlidXRlKFBIWF9VUExPQURfUkVGKSlcbiAgICAgIExpdmVVcGxvYWRlci5nZXRFbnRyeURhdGFVUkwodGhpcy5pbnB1dEVsLCB0aGlzLnJlZiwgdXJsID0+IHtcbiAgICAgICAgdGhpcy51cmwgPSB1cmxcbiAgICAgICAgdGhpcy5lbC5zcmMgPSB1cmxcbiAgICAgIH0pXG4gICAgfSxcbiAgICBkZXN0cm95ZWQoKXtcbiAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwodGhpcy51cmwpXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEhvb2tzXG4iLCAiaW1wb3J0IHtcbiAgbWF5YmVcbn0gZnJvbSBcIi4vdXRpbHNcIlxuXG5pbXBvcnQgRE9NIGZyb20gXCIuL2RvbVwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERPTVBvc3RNb3JwaFJlc3RvcmVyIHtcbiAgY29uc3RydWN0b3IoY29udGFpbmVyQmVmb3JlLCBjb250YWluZXJBZnRlciwgdXBkYXRlVHlwZSl7XG4gICAgbGV0IGlkc0JlZm9yZSA9IG5ldyBTZXQoKVxuICAgIGxldCBpZHNBZnRlciA9IG5ldyBTZXQoWy4uLmNvbnRhaW5lckFmdGVyLmNoaWxkcmVuXS5tYXAoY2hpbGQgPT4gY2hpbGQuaWQpKVxuXG4gICAgbGV0IGVsZW1lbnRzVG9Nb2RpZnkgPSBbXVxuXG4gICAgQXJyYXkuZnJvbShjb250YWluZXJCZWZvcmUuY2hpbGRyZW4pLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgaWYoY2hpbGQuaWQpeyAvLyBhbGwgb2Ygb3VyIGNoaWxkcmVuIHNob3VsZCBiZSBlbGVtZW50cyB3aXRoIGlkc1xuICAgICAgICBpZHNCZWZvcmUuYWRkKGNoaWxkLmlkKVxuICAgICAgICBpZihpZHNBZnRlci5oYXMoY2hpbGQuaWQpKXtcbiAgICAgICAgICBsZXQgcHJldmlvdXNFbGVtZW50SWQgPSBjaGlsZC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nICYmIGNoaWxkLnByZXZpb3VzRWxlbWVudFNpYmxpbmcuaWRcbiAgICAgICAgICBlbGVtZW50c1RvTW9kaWZ5LnB1c2goe2VsZW1lbnRJZDogY2hpbGQuaWQsIHByZXZpb3VzRWxlbWVudElkOiBwcmV2aW91c0VsZW1lbnRJZH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgdGhpcy5jb250YWluZXJJZCA9IGNvbnRhaW5lckFmdGVyLmlkXG4gICAgdGhpcy51cGRhdGVUeXBlID0gdXBkYXRlVHlwZVxuICAgIHRoaXMuZWxlbWVudHNUb01vZGlmeSA9IGVsZW1lbnRzVG9Nb2RpZnlcbiAgICB0aGlzLmVsZW1lbnRJZHNUb0FkZCA9IFsuLi5pZHNBZnRlcl0uZmlsdGVyKGlkID0+ICFpZHNCZWZvcmUuaGFzKGlkKSlcbiAgfVxuXG4gIC8vIFdlIGRvIHRoZSBmb2xsb3dpbmcgdG8gb3B0aW1pemUgYXBwZW5kL3ByZXBlbmQgb3BlcmF0aW9uczpcbiAgLy8gICAxKSBUcmFjayBpZHMgb2YgbW9kaWZpZWQgZWxlbWVudHMgJiBvZiBuZXcgZWxlbWVudHNcbiAgLy8gICAyKSBBbGwgdGhlIG1vZGlmaWVkIGVsZW1lbnRzIGFyZSBwdXQgYmFjayBpbiB0aGUgY29ycmVjdCBwb3NpdGlvbiBpbiB0aGUgRE9NIHRyZWVcbiAgLy8gICAgICBieSBzdG9yaW5nIHRoZSBpZCBvZiB0aGVpciBwcmV2aW91cyBzaWJsaW5nXG4gIC8vICAgMykgTmV3IGVsZW1lbnRzIGFyZSBnb2luZyB0byBiZSBwdXQgaW4gdGhlIHJpZ2h0IHBsYWNlIGJ5IG1vcnBoZG9tIGR1cmluZyBhcHBlbmQuXG4gIC8vICAgICAgRm9yIHByZXBlbmQsIHdlIG1vdmUgdGhlbSB0byB0aGUgZmlyc3QgcG9zaXRpb24gaW4gdGhlIGNvbnRhaW5lclxuICBwZXJmb3JtKCl7XG4gICAgbGV0IGNvbnRhaW5lciA9IERPTS5ieUlkKHRoaXMuY29udGFpbmVySWQpXG4gICAgdGhpcy5lbGVtZW50c1RvTW9kaWZ5LmZvckVhY2goZWxlbWVudFRvTW9kaWZ5ID0+IHtcbiAgICAgIGlmKGVsZW1lbnRUb01vZGlmeS5wcmV2aW91c0VsZW1lbnRJZCl7XG4gICAgICAgIG1heWJlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRUb01vZGlmeS5wcmV2aW91c0VsZW1lbnRJZCksIHByZXZpb3VzRWxlbSA9PiB7XG4gICAgICAgICAgbWF5YmUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudFRvTW9kaWZ5LmVsZW1lbnRJZCksIGVsZW0gPT4ge1xuICAgICAgICAgICAgbGV0IGlzSW5SaWdodFBsYWNlID0gZWxlbS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nICYmIGVsZW0ucHJldmlvdXNFbGVtZW50U2libGluZy5pZCA9PSBwcmV2aW91c0VsZW0uaWRcbiAgICAgICAgICAgIGlmKCFpc0luUmlnaHRQbGFjZSl7XG4gICAgICAgICAgICAgIHByZXZpb3VzRWxlbS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmVuZFwiLCBlbGVtKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBUaGlzIGlzIHRoZSBmaXJzdCBlbGVtZW50IGluIHRoZSBjb250YWluZXJcbiAgICAgICAgbWF5YmUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudFRvTW9kaWZ5LmVsZW1lbnRJZCksIGVsZW0gPT4ge1xuICAgICAgICAgIGxldCBpc0luUmlnaHRQbGFjZSA9IGVsZW0ucHJldmlvdXNFbGVtZW50U2libGluZyA9PSBudWxsXG4gICAgICAgICAgaWYoIWlzSW5SaWdodFBsYWNlKXtcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmJlZ2luXCIsIGVsZW0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBpZih0aGlzLnVwZGF0ZVR5cGUgPT0gXCJwcmVwZW5kXCIpe1xuICAgICAgdGhpcy5lbGVtZW50SWRzVG9BZGQucmV2ZXJzZSgpLmZvckVhY2goZWxlbUlkID0+IHtcbiAgICAgICAgbWF5YmUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbUlkKSwgZWxlbSA9PiBjb250YWluZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJiZWdpblwiLCBlbGVtKSlcbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG4iLCAidmFyIERPQ1VNRU5UX0ZSQUdNRU5UX05PREUgPSAxMTtcblxuZnVuY3Rpb24gbW9ycGhBdHRycyhmcm9tTm9kZSwgdG9Ob2RlKSB7XG4gICAgdmFyIHRvTm9kZUF0dHJzID0gdG9Ob2RlLmF0dHJpYnV0ZXM7XG4gICAgdmFyIGF0dHI7XG4gICAgdmFyIGF0dHJOYW1lO1xuICAgIHZhciBhdHRyTmFtZXNwYWNlVVJJO1xuICAgIHZhciBhdHRyVmFsdWU7XG4gICAgdmFyIGZyb21WYWx1ZTtcblxuICAgIC8vIGRvY3VtZW50LWZyYWdtZW50cyBkb250IGhhdmUgYXR0cmlidXRlcyBzbyBsZXRzIG5vdCBkbyBhbnl0aGluZ1xuICAgIGlmICh0b05vZGUubm9kZVR5cGUgPT09IERPQ1VNRU5UX0ZSQUdNRU5UX05PREUgfHwgZnJvbU5vZGUubm9kZVR5cGUgPT09IERPQ1VNRU5UX0ZSQUdNRU5UX05PREUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgYXR0cmlidXRlcyBvbiBvcmlnaW5hbCBET00gZWxlbWVudFxuICAgIGZvciAodmFyIGkgPSB0b05vZGVBdHRycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBhdHRyID0gdG9Ob2RlQXR0cnNbaV07XG4gICAgICAgIGF0dHJOYW1lID0gYXR0ci5uYW1lO1xuICAgICAgICBhdHRyTmFtZXNwYWNlVVJJID0gYXR0ci5uYW1lc3BhY2VVUkk7XG4gICAgICAgIGF0dHJWYWx1ZSA9IGF0dHIudmFsdWU7XG5cbiAgICAgICAgaWYgKGF0dHJOYW1lc3BhY2VVUkkpIHtcbiAgICAgICAgICAgIGF0dHJOYW1lID0gYXR0ci5sb2NhbE5hbWUgfHwgYXR0ck5hbWU7XG4gICAgICAgICAgICBmcm9tVmFsdWUgPSBmcm9tTm9kZS5nZXRBdHRyaWJ1dGVOUyhhdHRyTmFtZXNwYWNlVVJJLCBhdHRyTmFtZSk7XG5cbiAgICAgICAgICAgIGlmIChmcm9tVmFsdWUgIT09IGF0dHJWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChhdHRyLnByZWZpeCA9PT0gJ3htbG5zJyl7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJOYW1lID0gYXR0ci5uYW1lOyAvLyBJdCdzIG5vdCBhbGxvd2VkIHRvIHNldCBhbiBhdHRyaWJ1dGUgd2l0aCB0aGUgWE1MTlMgbmFtZXNwYWNlIHdpdGhvdXQgc3BlY2lmeWluZyB0aGUgYHhtbG5zYCBwcmVmaXhcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnJvbU5vZGUuc2V0QXR0cmlidXRlTlMoYXR0ck5hbWVzcGFjZVVSSSwgYXR0ck5hbWUsIGF0dHJWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmcm9tVmFsdWUgPSBmcm9tTm9kZS5nZXRBdHRyaWJ1dGUoYXR0ck5hbWUpO1xuXG4gICAgICAgICAgICBpZiAoZnJvbVZhbHVlICE9PSBhdHRyVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBmcm9tTm9kZS5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIGF0dHJWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgYW55IGV4dHJhIGF0dHJpYnV0ZXMgZm91bmQgb24gdGhlIG9yaWdpbmFsIERPTSBlbGVtZW50IHRoYXRcbiAgICAvLyB3ZXJlbid0IGZvdW5kIG9uIHRoZSB0YXJnZXQgZWxlbWVudC5cbiAgICB2YXIgZnJvbU5vZGVBdHRycyA9IGZyb21Ob2RlLmF0dHJpYnV0ZXM7XG5cbiAgICBmb3IgKHZhciBkID0gZnJvbU5vZGVBdHRycy5sZW5ndGggLSAxOyBkID49IDA7IGQtLSkge1xuICAgICAgICBhdHRyID0gZnJvbU5vZGVBdHRyc1tkXTtcbiAgICAgICAgYXR0ck5hbWUgPSBhdHRyLm5hbWU7XG4gICAgICAgIGF0dHJOYW1lc3BhY2VVUkkgPSBhdHRyLm5hbWVzcGFjZVVSSTtcblxuICAgICAgICBpZiAoYXR0ck5hbWVzcGFjZVVSSSkge1xuICAgICAgICAgICAgYXR0ck5hbWUgPSBhdHRyLmxvY2FsTmFtZSB8fCBhdHRyTmFtZTtcblxuICAgICAgICAgICAgaWYgKCF0b05vZGUuaGFzQXR0cmlidXRlTlMoYXR0ck5hbWVzcGFjZVVSSSwgYXR0ck5hbWUpKSB7XG4gICAgICAgICAgICAgICAgZnJvbU5vZGUucmVtb3ZlQXR0cmlidXRlTlMoYXR0ck5hbWVzcGFjZVVSSSwgYXR0ck5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCF0b05vZGUuaGFzQXR0cmlidXRlKGF0dHJOYW1lKSkge1xuICAgICAgICAgICAgICAgIGZyb21Ob2RlLnJlbW92ZUF0dHJpYnV0ZShhdHRyTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbnZhciByYW5nZTsgLy8gQ3JlYXRlIGEgcmFuZ2Ugb2JqZWN0IGZvciBlZmZpY2VudGx5IHJlbmRlcmluZyBzdHJpbmdzIHRvIGVsZW1lbnRzLlxudmFyIE5TX1hIVE1MID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnO1xuXG52YXIgZG9jID0gdHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IGRvY3VtZW50O1xudmFyIEhBU19URU1QTEFURV9TVVBQT1JUID0gISFkb2MgJiYgJ2NvbnRlbnQnIGluIGRvYy5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xudmFyIEhBU19SQU5HRV9TVVBQT1JUID0gISFkb2MgJiYgZG9jLmNyZWF0ZVJhbmdlICYmICdjcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQnIGluIGRvYy5jcmVhdGVSYW5nZSgpO1xuXG5mdW5jdGlvbiBjcmVhdGVGcmFnbWVudEZyb21UZW1wbGF0ZShzdHIpIHtcbiAgICB2YXIgdGVtcGxhdGUgPSBkb2MuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbiAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSBzdHI7XG4gICAgcmV0dXJuIHRlbXBsYXRlLmNvbnRlbnQuY2hpbGROb2Rlc1swXTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRnJhZ21lbnRGcm9tUmFuZ2Uoc3RyKSB7XG4gICAgaWYgKCFyYW5nZSkge1xuICAgICAgICByYW5nZSA9IGRvYy5jcmVhdGVSYW5nZSgpO1xuICAgICAgICByYW5nZS5zZWxlY3ROb2RlKGRvYy5ib2R5KTtcbiAgICB9XG5cbiAgICB2YXIgZnJhZ21lbnQgPSByYW5nZS5jcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQoc3RyKTtcbiAgICByZXR1cm4gZnJhZ21lbnQuY2hpbGROb2Rlc1swXTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRnJhZ21lbnRGcm9tV3JhcChzdHIpIHtcbiAgICB2YXIgZnJhZ21lbnQgPSBkb2MuY3JlYXRlRWxlbWVudCgnYm9keScpO1xuICAgIGZyYWdtZW50LmlubmVySFRNTCA9IHN0cjtcbiAgICByZXR1cm4gZnJhZ21lbnQuY2hpbGROb2Rlc1swXTtcbn1cblxuLyoqXG4gKiBUaGlzIGlzIGFib3V0IHRoZSBzYW1lXG4gKiB2YXIgaHRtbCA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoc3RyLCAndGV4dC9odG1sJyk7XG4gKiByZXR1cm4gaHRtbC5ib2R5LmZpcnN0Q2hpbGQ7XG4gKlxuICogQG1ldGhvZCB0b0VsZW1lbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqL1xuZnVuY3Rpb24gdG9FbGVtZW50KHN0cikge1xuICAgIHN0ciA9IHN0ci50cmltKCk7XG4gICAgaWYgKEhBU19URU1QTEFURV9TVVBQT1JUKSB7XG4gICAgICAvLyBhdm9pZCByZXN0cmljdGlvbnMgb24gY29udGVudCBmb3IgdGhpbmdzIGxpa2UgYDx0cj48dGg+SGk8L3RoPjwvdHI+YCB3aGljaFxuICAgICAgLy8gY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50IGRvZXNuJ3Qgc3VwcG9ydFxuICAgICAgLy8gPHRlbXBsYXRlPiBzdXBwb3J0IG5vdCBhdmFpbGFibGUgaW4gSUVcbiAgICAgIHJldHVybiBjcmVhdGVGcmFnbWVudEZyb21UZW1wbGF0ZShzdHIpO1xuICAgIH0gZWxzZSBpZiAoSEFTX1JBTkdFX1NVUFBPUlQpIHtcbiAgICAgIHJldHVybiBjcmVhdGVGcmFnbWVudEZyb21SYW5nZShzdHIpO1xuICAgIH1cblxuICAgIHJldHVybiBjcmVhdGVGcmFnbWVudEZyb21XcmFwKHN0cik7XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHR3byBub2RlJ3MgbmFtZXMgYXJlIHRoZSBzYW1lLlxuICpcbiAqIE5PVEU6IFdlIGRvbid0IGJvdGhlciBjaGVja2luZyBgbmFtZXNwYWNlVVJJYCBiZWNhdXNlIHlvdSB3aWxsIG5ldmVyIGZpbmQgdHdvIEhUTUwgZWxlbWVudHMgd2l0aCB0aGUgc2FtZVxuICogICAgICAgbm9kZU5hbWUgYW5kIGRpZmZlcmVudCBuYW1lc3BhY2UgVVJJcy5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGFcbiAqIEBwYXJhbSB7RWxlbWVudH0gYiBUaGUgdGFyZ2V0IGVsZW1lbnRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGNvbXBhcmVOb2RlTmFtZXMoZnJvbUVsLCB0b0VsKSB7XG4gICAgdmFyIGZyb21Ob2RlTmFtZSA9IGZyb21FbC5ub2RlTmFtZTtcbiAgICB2YXIgdG9Ob2RlTmFtZSA9IHRvRWwubm9kZU5hbWU7XG4gICAgdmFyIGZyb21Db2RlU3RhcnQsIHRvQ29kZVN0YXJ0O1xuXG4gICAgaWYgKGZyb21Ob2RlTmFtZSA9PT0gdG9Ob2RlTmFtZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBmcm9tQ29kZVN0YXJ0ID0gZnJvbU5vZGVOYW1lLmNoYXJDb2RlQXQoMCk7XG4gICAgdG9Db2RlU3RhcnQgPSB0b05vZGVOYW1lLmNoYXJDb2RlQXQoMCk7XG5cbiAgICAvLyBJZiB0aGUgdGFyZ2V0IGVsZW1lbnQgaXMgYSB2aXJ0dWFsIERPTSBub2RlIG9yIFNWRyBub2RlIHRoZW4gd2UgbWF5XG4gICAgLy8gbmVlZCB0byBub3JtYWxpemUgdGhlIHRhZyBuYW1lIGJlZm9yZSBjb21wYXJpbmcuIE5vcm1hbCBIVE1MIGVsZW1lbnRzIHRoYXQgYXJlXG4gICAgLy8gaW4gdGhlIFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiXG4gICAgLy8gYXJlIGNvbnZlcnRlZCB0byB1cHBlciBjYXNlXG4gICAgaWYgKGZyb21Db2RlU3RhcnQgPD0gOTAgJiYgdG9Db2RlU3RhcnQgPj0gOTcpIHsgLy8gZnJvbSBpcyB1cHBlciBhbmQgdG8gaXMgbG93ZXJcbiAgICAgICAgcmV0dXJuIGZyb21Ob2RlTmFtZSA9PT0gdG9Ob2RlTmFtZS50b1VwcGVyQ2FzZSgpO1xuICAgIH0gZWxzZSBpZiAodG9Db2RlU3RhcnQgPD0gOTAgJiYgZnJvbUNvZGVTdGFydCA+PSA5NykgeyAvLyB0byBpcyB1cHBlciBhbmQgZnJvbSBpcyBsb3dlclxuICAgICAgICByZXR1cm4gdG9Ob2RlTmFtZSA9PT0gZnJvbU5vZGVOYW1lLnRvVXBwZXJDYXNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuLyoqXG4gKiBDcmVhdGUgYW4gZWxlbWVudCwgb3B0aW9uYWxseSB3aXRoIGEga25vd24gbmFtZXNwYWNlIFVSSS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSB0aGUgZWxlbWVudCBuYW1lLCBlLmcuICdkaXYnIG9yICdzdmcnXG4gKiBAcGFyYW0ge3N0cmluZ30gW25hbWVzcGFjZVVSSV0gdGhlIGVsZW1lbnQncyBuYW1lc3BhY2UgVVJJLCBpLmUuIHRoZSB2YWx1ZSBvZlxuICogaXRzIGB4bWxuc2AgYXR0cmlidXRlIG9yIGl0cyBpbmZlcnJlZCBuYW1lc3BhY2UuXG4gKlxuICogQHJldHVybiB7RWxlbWVudH1cbiAqL1xuZnVuY3Rpb24gY3JlYXRlRWxlbWVudE5TKG5hbWUsIG5hbWVzcGFjZVVSSSkge1xuICAgIHJldHVybiAhbmFtZXNwYWNlVVJJIHx8IG5hbWVzcGFjZVVSSSA9PT0gTlNfWEhUTUwgP1xuICAgICAgICBkb2MuY3JlYXRlRWxlbWVudChuYW1lKSA6XG4gICAgICAgIGRvYy5jcmVhdGVFbGVtZW50TlMobmFtZXNwYWNlVVJJLCBuYW1lKTtcbn1cblxuLyoqXG4gKiBDb3BpZXMgdGhlIGNoaWxkcmVuIG9mIG9uZSBET00gZWxlbWVudCB0byBhbm90aGVyIERPTSBlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIG1vdmVDaGlsZHJlbihmcm9tRWwsIHRvRWwpIHtcbiAgICB2YXIgY3VyQ2hpbGQgPSBmcm9tRWwuZmlyc3RDaGlsZDtcbiAgICB3aGlsZSAoY3VyQ2hpbGQpIHtcbiAgICAgICAgdmFyIG5leHRDaGlsZCA9IGN1ckNoaWxkLm5leHRTaWJsaW5nO1xuICAgICAgICB0b0VsLmFwcGVuZENoaWxkKGN1ckNoaWxkKTtcbiAgICAgICAgY3VyQ2hpbGQgPSBuZXh0Q2hpbGQ7XG4gICAgfVxuICAgIHJldHVybiB0b0VsO1xufVxuXG5mdW5jdGlvbiBzeW5jQm9vbGVhbkF0dHJQcm9wKGZyb21FbCwgdG9FbCwgbmFtZSkge1xuICAgIGlmIChmcm9tRWxbbmFtZV0gIT09IHRvRWxbbmFtZV0pIHtcbiAgICAgICAgZnJvbUVsW25hbWVdID0gdG9FbFtuYW1lXTtcbiAgICAgICAgaWYgKGZyb21FbFtuYW1lXSkge1xuICAgICAgICAgICAgZnJvbUVsLnNldEF0dHJpYnV0ZShuYW1lLCAnJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmcm9tRWwucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG52YXIgc3BlY2lhbEVsSGFuZGxlcnMgPSB7XG4gICAgT1BUSU9OOiBmdW5jdGlvbihmcm9tRWwsIHRvRWwpIHtcbiAgICAgICAgdmFyIHBhcmVudE5vZGUgPSBmcm9tRWwucGFyZW50Tm9kZTtcbiAgICAgICAgaWYgKHBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIHZhciBwYXJlbnROYW1lID0gcGFyZW50Tm9kZS5ub2RlTmFtZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgaWYgKHBhcmVudE5hbWUgPT09ICdPUFRHUk9VUCcpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnROb2RlID0gcGFyZW50Tm9kZS5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgIHBhcmVudE5hbWUgPSBwYXJlbnROb2RlICYmIHBhcmVudE5vZGUubm9kZU5hbWUudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYXJlbnROYW1lID09PSAnU0VMRUNUJyAmJiAhcGFyZW50Tm9kZS5oYXNBdHRyaWJ1dGUoJ211bHRpcGxlJykpIHtcbiAgICAgICAgICAgICAgICBpZiAoZnJvbUVsLmhhc0F0dHJpYnV0ZSgnc2VsZWN0ZWQnKSAmJiAhdG9FbC5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBXb3JrYXJvdW5kIGZvciBNUyBFZGdlIGJ1ZyB3aGVyZSB0aGUgJ3NlbGVjdGVkJyBhdHRyaWJ1dGUgY2FuIG9ubHkgYmVcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlZCBpZiBzZXQgdG8gYSBub24tZW1wdHkgdmFsdWU6XG4gICAgICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1pY3Jvc29mdC5jb20vZW4tdXMvbWljcm9zb2Z0LWVkZ2UvcGxhdGZvcm0vaXNzdWVzLzEyMDg3Njc5L1xuICAgICAgICAgICAgICAgICAgICBmcm9tRWwuc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsICdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgICAgICBmcm9tRWwucmVtb3ZlQXR0cmlidXRlKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBXZSBoYXZlIHRvIHJlc2V0IHNlbGVjdCBlbGVtZW50J3Mgc2VsZWN0ZWRJbmRleCB0byAtMSwgb3RoZXJ3aXNlIHNldHRpbmdcbiAgICAgICAgICAgICAgICAvLyBmcm9tRWwuc2VsZWN0ZWQgdXNpbmcgdGhlIHN5bmNCb29sZWFuQXR0clByb3AgYmVsb3cgaGFzIG5vIGVmZmVjdC5cbiAgICAgICAgICAgICAgICAvLyBUaGUgY29ycmVjdCBzZWxlY3RlZEluZGV4IHdpbGwgYmUgc2V0IGluIHRoZSBTRUxFQ1Qgc3BlY2lhbCBoYW5kbGVyIGJlbG93LlxuICAgICAgICAgICAgICAgIHBhcmVudE5vZGUuc2VsZWN0ZWRJbmRleCA9IC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN5bmNCb29sZWFuQXR0clByb3AoZnJvbUVsLCB0b0VsLCAnc2VsZWN0ZWQnKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIFRoZSBcInZhbHVlXCIgYXR0cmlidXRlIGlzIHNwZWNpYWwgZm9yIHRoZSA8aW5wdXQ+IGVsZW1lbnQgc2luY2UgaXQgc2V0c1xuICAgICAqIHRoZSBpbml0aWFsIHZhbHVlLiBDaGFuZ2luZyB0aGUgXCJ2YWx1ZVwiIGF0dHJpYnV0ZSB3aXRob3V0IGNoYW5naW5nIHRoZVxuICAgICAqIFwidmFsdWVcIiBwcm9wZXJ0eSB3aWxsIGhhdmUgbm8gZWZmZWN0IHNpbmNlIGl0IGlzIG9ubHkgdXNlZCB0byB0aGUgc2V0IHRoZVxuICAgICAqIGluaXRpYWwgdmFsdWUuICBTaW1pbGFyIGZvciB0aGUgXCJjaGVja2VkXCIgYXR0cmlidXRlLCBhbmQgXCJkaXNhYmxlZFwiLlxuICAgICAqL1xuICAgIElOUFVUOiBmdW5jdGlvbihmcm9tRWwsIHRvRWwpIHtcbiAgICAgICAgc3luY0Jvb2xlYW5BdHRyUHJvcChmcm9tRWwsIHRvRWwsICdjaGVja2VkJyk7XG4gICAgICAgIHN5bmNCb29sZWFuQXR0clByb3AoZnJvbUVsLCB0b0VsLCAnZGlzYWJsZWQnKTtcblxuICAgICAgICBpZiAoZnJvbUVsLnZhbHVlICE9PSB0b0VsLnZhbHVlKSB7XG4gICAgICAgICAgICBmcm9tRWwudmFsdWUgPSB0b0VsLnZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0b0VsLmhhc0F0dHJpYnV0ZSgndmFsdWUnKSkge1xuICAgICAgICAgICAgZnJvbUVsLnJlbW92ZUF0dHJpYnV0ZSgndmFsdWUnKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBURVhUQVJFQTogZnVuY3Rpb24oZnJvbUVsLCB0b0VsKSB7XG4gICAgICAgIHZhciBuZXdWYWx1ZSA9IHRvRWwudmFsdWU7XG4gICAgICAgIGlmIChmcm9tRWwudmFsdWUgIT09IG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICBmcm9tRWwudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBmaXJzdENoaWxkID0gZnJvbUVsLmZpcnN0Q2hpbGQ7XG4gICAgICAgIGlmIChmaXJzdENoaWxkKSB7XG4gICAgICAgICAgICAvLyBOZWVkZWQgZm9yIElFLiBBcHBhcmVudGx5IElFIHNldHMgdGhlIHBsYWNlaG9sZGVyIGFzIHRoZVxuICAgICAgICAgICAgLy8gbm9kZSB2YWx1ZSBhbmQgdmlzZSB2ZXJzYS4gVGhpcyBpZ25vcmVzIGFuIGVtcHR5IHVwZGF0ZS5cbiAgICAgICAgICAgIHZhciBvbGRWYWx1ZSA9IGZpcnN0Q2hpbGQubm9kZVZhbHVlO1xuXG4gICAgICAgICAgICBpZiAob2xkVmFsdWUgPT0gbmV3VmFsdWUgfHwgKCFuZXdWYWx1ZSAmJiBvbGRWYWx1ZSA9PSBmcm9tRWwucGxhY2Vob2xkZXIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmaXJzdENoaWxkLm5vZGVWYWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBTRUxFQ1Q6IGZ1bmN0aW9uKGZyb21FbCwgdG9FbCkge1xuICAgICAgICBpZiAoIXRvRWwuaGFzQXR0cmlidXRlKCdtdWx0aXBsZScpKSB7XG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWRJbmRleCA9IC0xO1xuICAgICAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICAgICAgLy8gV2UgaGF2ZSB0byBsb29wIHRocm91Z2ggY2hpbGRyZW4gb2YgZnJvbUVsLCBub3QgdG9FbCBzaW5jZSBub2RlcyBjYW4gYmUgbW92ZWRcbiAgICAgICAgICAgIC8vIGZyb20gdG9FbCB0byBmcm9tRWwgZGlyZWN0bHkgd2hlbiBtb3JwaGluZy5cbiAgICAgICAgICAgIC8vIEF0IHRoZSB0aW1lIHRoaXMgc3BlY2lhbCBoYW5kbGVyIGlzIGludm9rZWQsIGFsbCBjaGlsZHJlbiBoYXZlIGFscmVhZHkgYmVlbiBtb3JwaGVkXG4gICAgICAgICAgICAvLyBhbmQgYXBwZW5kZWQgdG8gLyByZW1vdmVkIGZyb20gZnJvbUVsLCBzbyB1c2luZyBmcm9tRWwgaGVyZSBpcyBzYWZlIGFuZCBjb3JyZWN0LlxuICAgICAgICAgICAgdmFyIGN1ckNoaWxkID0gZnJvbUVsLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICB2YXIgb3B0Z3JvdXA7XG4gICAgICAgICAgICB2YXIgbm9kZU5hbWU7XG4gICAgICAgICAgICB3aGlsZShjdXJDaGlsZCkge1xuICAgICAgICAgICAgICAgIG5vZGVOYW1lID0gY3VyQ2hpbGQubm9kZU5hbWUgJiYgY3VyQ2hpbGQubm9kZU5hbWUudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAobm9kZU5hbWUgPT09ICdPUFRHUk9VUCcpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0Z3JvdXAgPSBjdXJDaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgY3VyQ2hpbGQgPSBvcHRncm91cC5maXJzdENoaWxkO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlTmFtZSA9PT0gJ09QVElPTicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJDaGlsZC5oYXNBdHRyaWJ1dGUoJ3NlbGVjdGVkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjdXJDaGlsZCA9IGN1ckNoaWxkLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWN1ckNoaWxkICYmIG9wdGdyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJDaGlsZCA9IG9wdGdyb3VwLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0Z3JvdXAgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmcm9tRWwuc2VsZWN0ZWRJbmRleCA9IHNlbGVjdGVkSW5kZXg7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG52YXIgRUxFTUVOVF9OT0RFID0gMTtcbnZhciBET0NVTUVOVF9GUkFHTUVOVF9OT0RFJDEgPSAxMTtcbnZhciBURVhUX05PREUgPSAzO1xudmFyIENPTU1FTlRfTk9ERSA9IDg7XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5mdW5jdGlvbiBkZWZhdWx0R2V0Tm9kZUtleShub2RlKSB7XG4gIGlmIChub2RlKSB7XG4gICAgICByZXR1cm4gKG5vZGUuZ2V0QXR0cmlidXRlICYmIG5vZGUuZ2V0QXR0cmlidXRlKCdpZCcpKSB8fCBub2RlLmlkO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1vcnBoZG9tRmFjdG9yeShtb3JwaEF0dHJzKSB7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbW9ycGhkb20oZnJvbU5vZGUsIHRvTm9kZSwgb3B0aW9ucykge1xuICAgICAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdG9Ob2RlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaWYgKGZyb21Ob2RlLm5vZGVOYW1lID09PSAnI2RvY3VtZW50JyB8fCBmcm9tTm9kZS5ub2RlTmFtZSA9PT0gJ0hUTUwnIHx8IGZyb21Ob2RlLm5vZGVOYW1lID09PSAnQk9EWScpIHtcbiAgICAgICAgICAgICAgICB2YXIgdG9Ob2RlSHRtbCA9IHRvTm9kZTtcbiAgICAgICAgICAgICAgICB0b05vZGUgPSBkb2MuY3JlYXRlRWxlbWVudCgnaHRtbCcpO1xuICAgICAgICAgICAgICAgIHRvTm9kZS5pbm5lckhUTUwgPSB0b05vZGVIdG1sO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0b05vZGUgPSB0b0VsZW1lbnQodG9Ob2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBnZXROb2RlS2V5ID0gb3B0aW9ucy5nZXROb2RlS2V5IHx8IGRlZmF1bHRHZXROb2RlS2V5O1xuICAgICAgICB2YXIgb25CZWZvcmVOb2RlQWRkZWQgPSBvcHRpb25zLm9uQmVmb3JlTm9kZUFkZGVkIHx8IG5vb3A7XG4gICAgICAgIHZhciBvbk5vZGVBZGRlZCA9IG9wdGlvbnMub25Ob2RlQWRkZWQgfHwgbm9vcDtcbiAgICAgICAgdmFyIG9uQmVmb3JlRWxVcGRhdGVkID0gb3B0aW9ucy5vbkJlZm9yZUVsVXBkYXRlZCB8fCBub29wO1xuICAgICAgICB2YXIgb25FbFVwZGF0ZWQgPSBvcHRpb25zLm9uRWxVcGRhdGVkIHx8IG5vb3A7XG4gICAgICAgIHZhciBvbkJlZm9yZU5vZGVEaXNjYXJkZWQgPSBvcHRpb25zLm9uQmVmb3JlTm9kZURpc2NhcmRlZCB8fCBub29wO1xuICAgICAgICB2YXIgb25Ob2RlRGlzY2FyZGVkID0gb3B0aW9ucy5vbk5vZGVEaXNjYXJkZWQgfHwgbm9vcDtcbiAgICAgICAgdmFyIG9uQmVmb3JlRWxDaGlsZHJlblVwZGF0ZWQgPSBvcHRpb25zLm9uQmVmb3JlRWxDaGlsZHJlblVwZGF0ZWQgfHwgbm9vcDtcbiAgICAgICAgdmFyIGNoaWxkcmVuT25seSA9IG9wdGlvbnMuY2hpbGRyZW5Pbmx5ID09PSB0cnVlO1xuXG4gICAgICAgIC8vIFRoaXMgb2JqZWN0IGlzIHVzZWQgYXMgYSBsb29rdXAgdG8gcXVpY2tseSBmaW5kIGFsbCBrZXllZCBlbGVtZW50cyBpbiB0aGUgb3JpZ2luYWwgRE9NIHRyZWUuXG4gICAgICAgIHZhciBmcm9tTm9kZXNMb29rdXAgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB2YXIga2V5ZWRSZW1vdmFsTGlzdCA9IFtdO1xuXG4gICAgICAgIGZ1bmN0aW9uIGFkZEtleWVkUmVtb3ZhbChrZXkpIHtcbiAgICAgICAgICAgIGtleWVkUmVtb3ZhbExpc3QucHVzaChrZXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gd2Fsa0Rpc2NhcmRlZENoaWxkTm9kZXMobm9kZSwgc2tpcEtleWVkTm9kZXMpIHtcbiAgICAgICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBFTEVNRU5UX05PREUpIHtcbiAgICAgICAgICAgICAgICB2YXIgY3VyQ2hpbGQgPSBub2RlLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGN1ckNoaWxkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGtleSA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc2tpcEtleWVkTm9kZXMgJiYgKGtleSA9IGdldE5vZGVLZXkoY3VyQ2hpbGQpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UgYXJlIHNraXBwaW5nIGtleWVkIG5vZGVzIHRoZW4gd2UgYWRkIHRoZSBrZXlcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvIGEgbGlzdCBzbyB0aGF0IGl0IGNhbiBiZSBoYW5kbGVkIGF0IHRoZSB2ZXJ5IGVuZC5cbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZEtleWVkUmVtb3ZhbChrZXkpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gT25seSByZXBvcnQgdGhlIG5vZGUgYXMgZGlzY2FyZGVkIGlmIGl0IGlzIG5vdCBrZXllZC4gV2UgZG8gdGhpcyBiZWNhdXNlXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhdCB0aGUgZW5kIHdlIGxvb3AgdGhyb3VnaCBhbGwga2V5ZWQgZWxlbWVudHMgdGhhdCB3ZXJlIHVubWF0Y2hlZFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYW5kIHRoZW4gZGlzY2FyZCB0aGVtIGluIG9uZSBmaW5hbCBwYXNzLlxuICAgICAgICAgICAgICAgICAgICAgICAgb25Ob2RlRGlzY2FyZGVkKGN1ckNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJDaGlsZC5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2Fsa0Rpc2NhcmRlZENoaWxkTm9kZXMoY3VyQ2hpbGQsIHNraXBLZXllZE5vZGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGN1ckNoaWxkID0gY3VyQ2hpbGQubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbW92ZXMgYSBET00gbm9kZSBvdXQgb2YgdGhlIG9yaWdpbmFsIERPTVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gIHtOb2RlfSBub2RlIFRoZSBub2RlIHRvIHJlbW92ZVxuICAgICAgICAgKiBAcGFyYW0gIHtOb2RlfSBwYXJlbnROb2RlIFRoZSBub2RlcyBwYXJlbnRcbiAgICAgICAgICogQHBhcmFtICB7Qm9vbGVhbn0gc2tpcEtleWVkTm9kZXMgSWYgdHJ1ZSB0aGVuIGVsZW1lbnRzIHdpdGgga2V5cyB3aWxsIGJlIHNraXBwZWQgYW5kIG5vdCBkaXNjYXJkZWQuXG4gICAgICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIHJlbW92ZU5vZGUobm9kZSwgcGFyZW50Tm9kZSwgc2tpcEtleWVkTm9kZXMpIHtcbiAgICAgICAgICAgIGlmIChvbkJlZm9yZU5vZGVEaXNjYXJkZWQobm9kZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgICAgIHBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG9uTm9kZURpc2NhcmRlZChub2RlKTtcbiAgICAgICAgICAgIHdhbGtEaXNjYXJkZWRDaGlsZE5vZGVzKG5vZGUsIHNraXBLZXllZE5vZGVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIC8vIFRyZWVXYWxrZXIgaW1wbGVtZW50YXRpb24gaXMgbm8gZmFzdGVyLCBidXQga2VlcGluZyB0aGlzIGFyb3VuZCBpbiBjYXNlIHRoaXMgY2hhbmdlcyBpbiB0aGUgZnV0dXJlXG4gICAgICAgIC8vIGZ1bmN0aW9uIGluZGV4VHJlZShyb290KSB7XG4gICAgICAgIC8vICAgICB2YXIgdHJlZVdhbGtlciA9IGRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIoXG4gICAgICAgIC8vICAgICAgICAgcm9vdCxcbiAgICAgICAgLy8gICAgICAgICBOb2RlRmlsdGVyLlNIT1dfRUxFTUVOVCk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICB2YXIgZWw7XG4gICAgICAgIC8vICAgICB3aGlsZSgoZWwgPSB0cmVlV2Fsa2VyLm5leHROb2RlKCkpKSB7XG4gICAgICAgIC8vICAgICAgICAgdmFyIGtleSA9IGdldE5vZGVLZXkoZWwpO1xuICAgICAgICAvLyAgICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgZnJvbU5vZGVzTG9va3VwW2tleV0gPSBlbDtcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cblxuICAgICAgICAvLyAvLyBOb2RlSXRlcmF0b3IgaW1wbGVtZW50YXRpb24gaXMgbm8gZmFzdGVyLCBidXQga2VlcGluZyB0aGlzIGFyb3VuZCBpbiBjYXNlIHRoaXMgY2hhbmdlcyBpbiB0aGUgZnV0dXJlXG4gICAgICAgIC8vXG4gICAgICAgIC8vIGZ1bmN0aW9uIGluZGV4VHJlZShub2RlKSB7XG4gICAgICAgIC8vICAgICB2YXIgbm9kZUl0ZXJhdG9yID0gZG9jdW1lbnQuY3JlYXRlTm9kZUl0ZXJhdG9yKG5vZGUsIE5vZGVGaWx0ZXIuU0hPV19FTEVNRU5UKTtcbiAgICAgICAgLy8gICAgIHZhciBlbDtcbiAgICAgICAgLy8gICAgIHdoaWxlKChlbCA9IG5vZGVJdGVyYXRvci5uZXh0Tm9kZSgpKSkge1xuICAgICAgICAvLyAgICAgICAgIHZhciBrZXkgPSBnZXROb2RlS2V5KGVsKTtcbiAgICAgICAgLy8gICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGZyb21Ob2Rlc0xvb2t1cFtrZXldID0gZWw7XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG5cbiAgICAgICAgZnVuY3Rpb24gaW5kZXhUcmVlKG5vZGUpIHtcbiAgICAgICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBFTEVNRU5UX05PREUgfHwgbm9kZS5ub2RlVHlwZSA9PT0gRE9DVU1FTlRfRlJBR01FTlRfTk9ERSQxKSB7XG4gICAgICAgICAgICAgICAgdmFyIGN1ckNoaWxkID0gbm9kZS5maXJzdENoaWxkO1xuICAgICAgICAgICAgICAgIHdoaWxlIChjdXJDaGlsZCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIga2V5ID0gZ2V0Tm9kZUtleShjdXJDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyb21Ob2Rlc0xvb2t1cFtrZXldID0gY3VyQ2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBXYWxrIHJlY3Vyc2l2ZWx5XG4gICAgICAgICAgICAgICAgICAgIGluZGV4VHJlZShjdXJDaGlsZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY3VyQ2hpbGQgPSBjdXJDaGlsZC5uZXh0U2libGluZztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpbmRleFRyZWUoZnJvbU5vZGUpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZU5vZGVBZGRlZChlbCkge1xuICAgICAgICAgICAgb25Ob2RlQWRkZWQoZWwpO1xuXG4gICAgICAgICAgICB2YXIgY3VyQ2hpbGQgPSBlbC5maXJzdENoaWxkO1xuICAgICAgICAgICAgd2hpbGUgKGN1ckNoaWxkKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5leHRTaWJsaW5nID0gY3VyQ2hpbGQubmV4dFNpYmxpbmc7XG5cbiAgICAgICAgICAgICAgICB2YXIga2V5ID0gZ2V0Tm9kZUtleShjdXJDaGlsZCk7XG4gICAgICAgICAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdW5tYXRjaGVkRnJvbUVsID0gZnJvbU5vZGVzTG9va3VwW2tleV07XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHdlIGZpbmQgYSBkdXBsaWNhdGUgI2lkIG5vZGUgaW4gY2FjaGUsIHJlcGxhY2UgYGVsYCB3aXRoIGNhY2hlIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIC8vIGFuZCBtb3JwaCBpdCB0byB0aGUgY2hpbGQgbm9kZS5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHVubWF0Y2hlZEZyb21FbCAmJiBjb21wYXJlTm9kZU5hbWVzKGN1ckNoaWxkLCB1bm1hdGNoZWRGcm9tRWwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJDaGlsZC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZCh1bm1hdGNoZWRGcm9tRWwsIGN1ckNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vcnBoRWwodW5tYXRjaGVkRnJvbUVsLCBjdXJDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgaGFuZGxlTm9kZUFkZGVkKGN1ckNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAvLyByZWN1cnNpdmVseSBjYWxsIGZvciBjdXJDaGlsZCBhbmQgaXQncyBjaGlsZHJlbiB0byBzZWUgaWYgd2UgZmluZCBzb21ldGhpbmcgaW5cbiAgICAgICAgICAgICAgICAgIC8vIGZyb21Ob2Rlc0xvb2t1cFxuICAgICAgICAgICAgICAgICAgaGFuZGxlTm9kZUFkZGVkKGN1ckNoaWxkKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjdXJDaGlsZCA9IG5leHRTaWJsaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY2xlYW51cEZyb21FbChmcm9tRWwsIGN1ckZyb21Ob2RlQ2hpbGQsIGN1ckZyb21Ob2RlS2V5KSB7XG4gICAgICAgICAgICAvLyBXZSBoYXZlIHByb2Nlc3NlZCBhbGwgb2YgdGhlIFwidG8gbm9kZXNcIi4gSWYgY3VyRnJvbU5vZGVDaGlsZCBpc1xuICAgICAgICAgICAgLy8gbm9uLW51bGwgdGhlbiB3ZSBzdGlsbCBoYXZlIHNvbWUgZnJvbSBub2RlcyBsZWZ0IG92ZXIgdGhhdCBuZWVkXG4gICAgICAgICAgICAvLyB0byBiZSByZW1vdmVkXG4gICAgICAgICAgICB3aGlsZSAoY3VyRnJvbU5vZGVDaGlsZCkge1xuICAgICAgICAgICAgICAgIHZhciBmcm9tTmV4dFNpYmxpbmcgPSBjdXJGcm9tTm9kZUNoaWxkLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIGlmICgoY3VyRnJvbU5vZGVLZXkgPSBnZXROb2RlS2V5KGN1ckZyb21Ob2RlQ2hpbGQpKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBTaW5jZSB0aGUgbm9kZSBpcyBrZXllZCBpdCBtaWdodCBiZSBtYXRjaGVkIHVwIGxhdGVyIHNvIHdlIGRlZmVyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZSBhY3R1YWwgcmVtb3ZhbCB0byBsYXRlclxuICAgICAgICAgICAgICAgICAgICBhZGRLZXllZFJlbW92YWwoY3VyRnJvbU5vZGVLZXkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE5PVEU6IHdlIHNraXAgbmVzdGVkIGtleWVkIG5vZGVzIGZyb20gYmVpbmcgcmVtb3ZlZCBzaW5jZSB0aGVyZSBpc1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICBzdGlsbCBhIGNoYW5jZSB0aGV5IHdpbGwgYmUgbWF0Y2hlZCB1cCBsYXRlclxuICAgICAgICAgICAgICAgICAgICByZW1vdmVOb2RlKGN1ckZyb21Ob2RlQ2hpbGQsIGZyb21FbCwgdHJ1ZSAvKiBza2lwIGtleWVkIG5vZGVzICovKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY3VyRnJvbU5vZGVDaGlsZCA9IGZyb21OZXh0U2libGluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG1vcnBoRWwoZnJvbUVsLCB0b0VsLCBjaGlsZHJlbk9ubHkpIHtcbiAgICAgICAgICAgIHZhciB0b0VsS2V5ID0gZ2V0Tm9kZUtleSh0b0VsKTtcblxuICAgICAgICAgICAgaWYgKHRvRWxLZXkpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBhbiBlbGVtZW50IHdpdGggYW4gSUQgaXMgYmVpbmcgbW9ycGhlZCB0aGVuIGl0IHdpbGwgYmUgaW4gdGhlIGZpbmFsXG4gICAgICAgICAgICAgICAgLy8gRE9NIHNvIGNsZWFyIGl0IG91dCBvZiB0aGUgc2F2ZWQgZWxlbWVudHMgY29sbGVjdGlvblxuICAgICAgICAgICAgICAgIGRlbGV0ZSBmcm9tTm9kZXNMb29rdXBbdG9FbEtleV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghY2hpbGRyZW5Pbmx5KSB7XG4gICAgICAgICAgICAgICAgLy8gb3B0aW9uYWxcbiAgICAgICAgICAgICAgICBpZiAob25CZWZvcmVFbFVwZGF0ZWQoZnJvbUVsLCB0b0VsKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBhdHRyaWJ1dGVzIG9uIG9yaWdpbmFsIERPTSBlbGVtZW50IGZpcnN0XG4gICAgICAgICAgICAgICAgbW9ycGhBdHRycyhmcm9tRWwsIHRvRWwpO1xuICAgICAgICAgICAgICAgIC8vIG9wdGlvbmFsXG4gICAgICAgICAgICAgICAgb25FbFVwZGF0ZWQoZnJvbUVsKTtcblxuICAgICAgICAgICAgICAgIGlmIChvbkJlZm9yZUVsQ2hpbGRyZW5VcGRhdGVkKGZyb21FbCwgdG9FbCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChmcm9tRWwubm9kZU5hbWUgIT09ICdURVhUQVJFQScpIHtcbiAgICAgICAgICAgICAgbW9ycGhDaGlsZHJlbihmcm9tRWwsIHRvRWwpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc3BlY2lhbEVsSGFuZGxlcnMuVEVYVEFSRUEoZnJvbUVsLCB0b0VsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG1vcnBoQ2hpbGRyZW4oZnJvbUVsLCB0b0VsKSB7XG4gICAgICAgICAgICB2YXIgY3VyVG9Ob2RlQ2hpbGQgPSB0b0VsLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICB2YXIgY3VyRnJvbU5vZGVDaGlsZCA9IGZyb21FbC5maXJzdENoaWxkO1xuICAgICAgICAgICAgdmFyIGN1clRvTm9kZUtleTtcbiAgICAgICAgICAgIHZhciBjdXJGcm9tTm9kZUtleTtcblxuICAgICAgICAgICAgdmFyIGZyb21OZXh0U2libGluZztcbiAgICAgICAgICAgIHZhciB0b05leHRTaWJsaW5nO1xuICAgICAgICAgICAgdmFyIG1hdGNoaW5nRnJvbUVsO1xuXG4gICAgICAgICAgICAvLyB3YWxrIHRoZSBjaGlsZHJlblxuICAgICAgICAgICAgb3V0ZXI6IHdoaWxlIChjdXJUb05vZGVDaGlsZCkge1xuICAgICAgICAgICAgICAgIHRvTmV4dFNpYmxpbmcgPSBjdXJUb05vZGVDaGlsZC5uZXh0U2libGluZztcbiAgICAgICAgICAgICAgICBjdXJUb05vZGVLZXkgPSBnZXROb2RlS2V5KGN1clRvTm9kZUNoaWxkKTtcblxuICAgICAgICAgICAgICAgIC8vIHdhbGsgdGhlIGZyb21Ob2RlIGNoaWxkcmVuIGFsbCB0aGUgd2F5IHRocm91Z2hcbiAgICAgICAgICAgICAgICB3aGlsZSAoY3VyRnJvbU5vZGVDaGlsZCkge1xuICAgICAgICAgICAgICAgICAgICBmcm9tTmV4dFNpYmxpbmcgPSBjdXJGcm9tTm9kZUNoaWxkLm5leHRTaWJsaW5nO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJUb05vZGVDaGlsZC5pc1NhbWVOb2RlICYmIGN1clRvTm9kZUNoaWxkLmlzU2FtZU5vZGUoY3VyRnJvbU5vZGVDaGlsZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1clRvTm9kZUNoaWxkID0gdG9OZXh0U2libGluZztcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ckZyb21Ob2RlQ2hpbGQgPSBmcm9tTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZSBvdXRlcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGN1ckZyb21Ob2RlS2V5ID0gZ2V0Tm9kZUtleShjdXJGcm9tTm9kZUNoaWxkKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgY3VyRnJvbU5vZGVUeXBlID0gY3VyRnJvbU5vZGVDaGlsZC5ub2RlVHlwZTtcblxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIG1lYW5zIGlmIHRoZSBjdXJGcm9tTm9kZUNoaWxkIGRvZXNudCBoYXZlIGEgbWF0Y2ggd2l0aCB0aGUgY3VyVG9Ob2RlQ2hpbGRcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlzQ29tcGF0aWJsZSA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VyRnJvbU5vZGVUeXBlID09PSBjdXJUb05vZGVDaGlsZC5ub2RlVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckZyb21Ob2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQm90aCBub2RlcyBiZWluZyBjb21wYXJlZCBhcmUgRWxlbWVudCBub2Rlc1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1clRvTm9kZUtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgdGFyZ2V0IG5vZGUgaGFzIGEga2V5IHNvIHdlIHdhbnQgdG8gbWF0Y2ggaXQgdXAgd2l0aCB0aGUgY29ycmVjdCBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGluIHRoZSBvcmlnaW5hbCBET00gdHJlZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyVG9Ob2RlS2V5ICE9PSBjdXJGcm9tTm9kZUtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIGN1cnJlbnQgZWxlbWVudCBpbiB0aGUgb3JpZ2luYWwgRE9NIHRyZWUgZG9lcyBub3QgaGF2ZSBhIG1hdGNoaW5nIGtleSBzb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGV0J3MgY2hlY2sgb3VyIGxvb2t1cCB0byBzZWUgaWYgdGhlcmUgaXMgYSBtYXRjaGluZyBlbGVtZW50IGluIHRoZSBvcmlnaW5hbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRE9NIHRyZWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgobWF0Y2hpbmdGcm9tRWwgPSBmcm9tTm9kZXNMb29rdXBbY3VyVG9Ob2RlS2V5XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZnJvbU5leHRTaWJsaW5nID09PSBtYXRjaGluZ0Zyb21FbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTcGVjaWFsIGNhc2UgZm9yIHNpbmdsZSBlbGVtZW50IHJlbW92YWxzLiBUbyBhdm9pZCByZW1vdmluZyB0aGUgb3JpZ2luYWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRE9NIG5vZGUgb3V0IG9mIHRoZSB0cmVlIChzaW5jZSB0aGF0IGNhbiBicmVhayBDU1MgdHJhbnNpdGlvbnMsIGV0Yy4pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3ZSB3aWxsIGluc3RlYWQgZGlzY2FyZCB0aGUgY3VycmVudCBub2RlIGFuZCB3YWl0IHVudGlsIHRoZSBuZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGl0ZXJhdGlvbiB0byBwcm9wZXJseSBtYXRjaCB1cCB0aGUga2V5ZWQgdGFyZ2V0IGVsZW1lbnQgd2l0aCBpdHMgbWF0Y2hpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZWxlbWVudCBpbiB0aGUgb3JpZ2luYWwgdHJlZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0NvbXBhdGlibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBmb3VuZCBhIG1hdGNoaW5nIGtleWVkIGVsZW1lbnQgc29tZXdoZXJlIGluIHRoZSBvcmlnaW5hbCBET00gdHJlZS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTGV0J3MgbW92ZSB0aGUgb3JpZ2luYWwgRE9NIG5vZGUgaW50byB0aGUgY3VycmVudCBwb3NpdGlvbiBhbmQgbW9ycGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaXQuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTk9URTogV2UgdXNlIGluc2VydEJlZm9yZSBpbnN0ZWFkIG9mIHJlcGxhY2VDaGlsZCBiZWNhdXNlIHdlIHdhbnQgdG8gZ28gdGhyb3VnaFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgYHJlbW92ZU5vZGUoKWAgZnVuY3Rpb24gZm9yIHRoZSBub2RlIHRoYXQgaXMgYmVpbmcgZGlzY2FyZGVkIHNvIHRoYXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWxsIGxpZmVjeWNsZSBob29rcyBhcmUgY29ycmVjdGx5IGludm9rZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbUVsLmluc2VydEJlZm9yZShtYXRjaGluZ0Zyb21FbCwgY3VyRnJvbU5vZGVDaGlsZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZnJvbU5leHRTaWJsaW5nID0gY3VyRnJvbU5vZGVDaGlsZC5uZXh0U2libGluZztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyRnJvbU5vZGVLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNpbmNlIHRoZSBub2RlIGlzIGtleWVkIGl0IG1pZ2h0IGJlIG1hdGNoZWQgdXAgbGF0ZXIgc28gd2UgZGVmZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSBhY3R1YWwgcmVtb3ZhbCB0byBsYXRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkS2V5ZWRSZW1vdmFsKGN1ckZyb21Ob2RlS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5PVEU6IHdlIHNraXAgbmVzdGVkIGtleWVkIG5vZGVzIGZyb20gYmVpbmcgcmVtb3ZlZCBzaW5jZSB0aGVyZSBpc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgc3RpbGwgYSBjaGFuY2UgdGhleSB3aWxsIGJlIG1hdGNoZWQgdXAgbGF0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZU5vZGUoY3VyRnJvbU5vZGVDaGlsZCwgZnJvbUVsLCB0cnVlIC8qIHNraXAga2V5ZWQgbm9kZXMgKi8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VyRnJvbU5vZGVDaGlsZCA9IG1hdGNoaW5nRnJvbUVsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIG5vZGVzIGFyZSBub3QgY29tcGF0aWJsZSBzaW5jZSB0aGUgXCJ0b1wiIG5vZGUgaGFzIGEga2V5IGFuZCB0aGVyZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlzIG5vIG1hdGNoaW5nIGtleWVkIG5vZGUgaW4gdGhlIHNvdXJjZSB0cmVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDb21wYXRpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGN1ckZyb21Ob2RlS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSBvcmlnaW5hbCBoYXMgYSBrZXlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDb21wYXRpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDb21wYXRpYmxlID0gaXNDb21wYXRpYmxlICE9PSBmYWxzZSAmJiBjb21wYXJlTm9kZU5hbWVzKGN1ckZyb21Ob2RlQ2hpbGQsIGN1clRvTm9kZUNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNDb21wYXRpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIGZvdW5kIGNvbXBhdGlibGUgRE9NIGVsZW1lbnRzIHNvIHRyYW5zZm9ybVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgY3VycmVudCBcImZyb21cIiBub2RlIHRvIG1hdGNoIHRoZSBjdXJyZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRhcmdldCBET00gbm9kZS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTU9SUEhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9ycGhFbChjdXJGcm9tTm9kZUNoaWxkLCBjdXJUb05vZGVDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGN1ckZyb21Ob2RlVHlwZSA9PT0gVEVYVF9OT0RFIHx8IGN1ckZyb21Ob2RlVHlwZSA9PSBDT01NRU5UX05PREUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBCb3RoIG5vZGVzIGJlaW5nIGNvbXBhcmVkIGFyZSBUZXh0IG9yIENvbW1lbnQgbm9kZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0NvbXBhdGlibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNpbXBseSB1cGRhdGUgbm9kZVZhbHVlIG9uIHRoZSBvcmlnaW5hbCBub2RlIHRvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2hhbmdlIHRoZSB0ZXh0IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckZyb21Ob2RlQ2hpbGQubm9kZVZhbHVlICE9PSBjdXJUb05vZGVDaGlsZC5ub2RlVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VyRnJvbU5vZGVDaGlsZC5ub2RlVmFsdWUgPSBjdXJUb05vZGVDaGlsZC5ub2RlVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNDb21wYXRpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBZHZhbmNlIGJvdGggdGhlIFwidG9cIiBjaGlsZCBhbmQgdGhlIFwiZnJvbVwiIGNoaWxkIHNpbmNlIHdlIGZvdW5kIGEgbWF0Y2hcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5vdGhpbmcgZWxzZSB0byBkbyBhcyB3ZSBhbHJlYWR5IHJlY3Vyc2l2ZWx5IGNhbGxlZCBtb3JwaENoaWxkcmVuIGFib3ZlXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJUb05vZGVDaGlsZCA9IHRvTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJGcm9tTm9kZUNoaWxkID0gZnJvbU5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWUgb3V0ZXI7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBObyBjb21wYXRpYmxlIG1hdGNoIHNvIHJlbW92ZSB0aGUgb2xkIG5vZGUgZnJvbSB0aGUgRE9NIGFuZCBjb250aW51ZSB0cnlpbmcgdG8gZmluZCBhXG4gICAgICAgICAgICAgICAgICAgIC8vIG1hdGNoIGluIHRoZSBvcmlnaW5hbCBET00uIEhvd2V2ZXIsIHdlIG9ubHkgZG8gdGhpcyBpZiB0aGUgZnJvbSBub2RlIGlzIG5vdCBrZXllZFxuICAgICAgICAgICAgICAgICAgICAvLyBzaW5jZSBpdCBpcyBwb3NzaWJsZSB0aGF0IGEga2V5ZWQgbm9kZSBtaWdodCBtYXRjaCB1cCB3aXRoIGEgbm9kZSBzb21ld2hlcmUgZWxzZSBpbiB0aGVcbiAgICAgICAgICAgICAgICAgICAgLy8gdGFyZ2V0IHRyZWUgYW5kIHdlIGRvbid0IHdhbnQgdG8gZGlzY2FyZCBpdCBqdXN0IHlldCBzaW5jZSBpdCBzdGlsbCBtaWdodCBmaW5kIGFcbiAgICAgICAgICAgICAgICAgICAgLy8gaG9tZSBpbiB0aGUgZmluYWwgRE9NIHRyZWUuIEFmdGVyIGV2ZXJ5dGhpbmcgaXMgZG9uZSB3ZSB3aWxsIHJlbW92ZSBhbnkga2V5ZWQgbm9kZXNcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhhdCBkaWRuJ3QgZmluZCBhIGhvbWVcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckZyb21Ob2RlS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTaW5jZSB0aGUgbm9kZSBpcyBrZXllZCBpdCBtaWdodCBiZSBtYXRjaGVkIHVwIGxhdGVyIHNvIHdlIGRlZmVyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgYWN0dWFsIHJlbW92YWwgdG8gbGF0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZEtleWVkUmVtb3ZhbChjdXJGcm9tTm9kZUtleSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBOT1RFOiB3ZSBza2lwIG5lc3RlZCBrZXllZCBub2RlcyBmcm9tIGJlaW5nIHJlbW92ZWQgc2luY2UgdGhlcmUgaXNcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgIHN0aWxsIGEgY2hhbmNlIHRoZXkgd2lsbCBiZSBtYXRjaGVkIHVwIGxhdGVyXG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVOb2RlKGN1ckZyb21Ob2RlQ2hpbGQsIGZyb21FbCwgdHJ1ZSAvKiBza2lwIGtleWVkIG5vZGVzICovKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGN1ckZyb21Ob2RlQ2hpbGQgPSBmcm9tTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgfSAvLyBFTkQ6IHdoaWxlKGN1ckZyb21Ob2RlQ2hpbGQpIHt9XG5cbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSBnb3QgdGhpcyBmYXIgdGhlbiB3ZSBkaWQgbm90IGZpbmQgYSBjYW5kaWRhdGUgbWF0Y2ggZm9yXG4gICAgICAgICAgICAgICAgLy8gb3VyIFwidG8gbm9kZVwiIGFuZCB3ZSBleGhhdXN0ZWQgYWxsIG9mIHRoZSBjaGlsZHJlbiBcImZyb21cIlxuICAgICAgICAgICAgICAgIC8vIG5vZGVzLiBUaGVyZWZvcmUsIHdlIHdpbGwganVzdCBhcHBlbmQgdGhlIGN1cnJlbnQgXCJ0b1wiIG5vZGVcbiAgICAgICAgICAgICAgICAvLyB0byB0aGUgZW5kXG4gICAgICAgICAgICAgICAgaWYgKGN1clRvTm9kZUtleSAmJiAobWF0Y2hpbmdGcm9tRWwgPSBmcm9tTm9kZXNMb29rdXBbY3VyVG9Ob2RlS2V5XSkgJiYgY29tcGFyZU5vZGVOYW1lcyhtYXRjaGluZ0Zyb21FbCwgY3VyVG9Ob2RlQ2hpbGQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZyb21FbC5hcHBlbmRDaGlsZChtYXRjaGluZ0Zyb21FbCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIE1PUlBIXG4gICAgICAgICAgICAgICAgICAgIG1vcnBoRWwobWF0Y2hpbmdGcm9tRWwsIGN1clRvTm9kZUNoaWxkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgb25CZWZvcmVOb2RlQWRkZWRSZXN1bHQgPSBvbkJlZm9yZU5vZGVBZGRlZChjdXJUb05vZGVDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvbkJlZm9yZU5vZGVBZGRlZFJlc3VsdCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbkJlZm9yZU5vZGVBZGRlZFJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1clRvTm9kZUNoaWxkID0gb25CZWZvcmVOb2RlQWRkZWRSZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJUb05vZGVDaGlsZC5hY3R1YWxpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJUb05vZGVDaGlsZCA9IGN1clRvTm9kZUNoaWxkLmFjdHVhbGl6ZShmcm9tRWwub3duZXJEb2N1bWVudCB8fCBkb2MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZnJvbUVsLmFwcGVuZENoaWxkKGN1clRvTm9kZUNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZU5vZGVBZGRlZChjdXJUb05vZGVDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjdXJUb05vZGVDaGlsZCA9IHRvTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgY3VyRnJvbU5vZGVDaGlsZCA9IGZyb21OZXh0U2libGluZztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2xlYW51cEZyb21FbChmcm9tRWwsIGN1ckZyb21Ob2RlQ2hpbGQsIGN1ckZyb21Ob2RlS2V5KTtcblxuICAgICAgICAgICAgdmFyIHNwZWNpYWxFbEhhbmRsZXIgPSBzcGVjaWFsRWxIYW5kbGVyc1tmcm9tRWwubm9kZU5hbWVdO1xuICAgICAgICAgICAgaWYgKHNwZWNpYWxFbEhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBzcGVjaWFsRWxIYW5kbGVyKGZyb21FbCwgdG9FbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gLy8gRU5EOiBtb3JwaENoaWxkcmVuKC4uLilcblxuICAgICAgICB2YXIgbW9ycGhlZE5vZGUgPSBmcm9tTm9kZTtcbiAgICAgICAgdmFyIG1vcnBoZWROb2RlVHlwZSA9IG1vcnBoZWROb2RlLm5vZGVUeXBlO1xuICAgICAgICB2YXIgdG9Ob2RlVHlwZSA9IHRvTm9kZS5ub2RlVHlwZTtcblxuICAgICAgICBpZiAoIWNoaWxkcmVuT25seSkge1xuICAgICAgICAgICAgLy8gSGFuZGxlIHRoZSBjYXNlIHdoZXJlIHdlIGFyZSBnaXZlbiB0d28gRE9NIG5vZGVzIHRoYXQgYXJlIG5vdFxuICAgICAgICAgICAgLy8gY29tcGF0aWJsZSAoZS5nLiA8ZGl2PiAtLT4gPHNwYW4+IG9yIDxkaXY+IC0tPiBURVhUKVxuICAgICAgICAgICAgaWYgKG1vcnBoZWROb2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRvTm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWNvbXBhcmVOb2RlTmFtZXMoZnJvbU5vZGUsIHRvTm9kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uTm9kZURpc2NhcmRlZChmcm9tTm9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb3JwaGVkTm9kZSA9IG1vdmVDaGlsZHJlbihmcm9tTm9kZSwgY3JlYXRlRWxlbWVudE5TKHRvTm9kZS5ub2RlTmFtZSwgdG9Ob2RlLm5hbWVzcGFjZVVSSSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gR29pbmcgZnJvbSBhbiBlbGVtZW50IG5vZGUgdG8gYSB0ZXh0IG5vZGVcbiAgICAgICAgICAgICAgICAgICAgbW9ycGhlZE5vZGUgPSB0b05vZGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChtb3JwaGVkTm9kZVR5cGUgPT09IFRFWFRfTk9ERSB8fCBtb3JwaGVkTm9kZVR5cGUgPT09IENPTU1FTlRfTk9ERSkgeyAvLyBUZXh0IG9yIGNvbW1lbnQgbm9kZVxuICAgICAgICAgICAgICAgIGlmICh0b05vZGVUeXBlID09PSBtb3JwaGVkTm9kZVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vcnBoZWROb2RlLm5vZGVWYWx1ZSAhPT0gdG9Ob2RlLm5vZGVWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9ycGhlZE5vZGUubm9kZVZhbHVlID0gdG9Ob2RlLm5vZGVWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtb3JwaGVkTm9kZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBUZXh0IG5vZGUgdG8gc29tZXRoaW5nIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgbW9ycGhlZE5vZGUgPSB0b05vZGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1vcnBoZWROb2RlID09PSB0b05vZGUpIHtcbiAgICAgICAgICAgIC8vIFRoZSBcInRvIG5vZGVcIiB3YXMgbm90IGNvbXBhdGlibGUgd2l0aCB0aGUgXCJmcm9tIG5vZGVcIiBzbyB3ZSBoYWQgdG9cbiAgICAgICAgICAgIC8vIHRvc3Mgb3V0IHRoZSBcImZyb20gbm9kZVwiIGFuZCB1c2UgdGhlIFwidG8gbm9kZVwiXG4gICAgICAgICAgICBvbk5vZGVEaXNjYXJkZWQoZnJvbU5vZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRvTm9kZS5pc1NhbWVOb2RlICYmIHRvTm9kZS5pc1NhbWVOb2RlKG1vcnBoZWROb2RlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbW9ycGhFbChtb3JwaGVkTm9kZSwgdG9Ob2RlLCBjaGlsZHJlbk9ubHkpO1xuXG4gICAgICAgICAgICAvLyBXZSBub3cgbmVlZCB0byBsb29wIG92ZXIgYW55IGtleWVkIG5vZGVzIHRoYXQgbWlnaHQgbmVlZCB0byBiZVxuICAgICAgICAgICAgLy8gcmVtb3ZlZC4gV2Ugb25seSBkbyB0aGUgcmVtb3ZhbCBpZiB3ZSBrbm93IHRoYXQgdGhlIGtleWVkIG5vZGVcbiAgICAgICAgICAgIC8vIG5ldmVyIGZvdW5kIGEgbWF0Y2guIFdoZW4gYSBrZXllZCBub2RlIGlzIG1hdGNoZWQgdXAgd2UgcmVtb3ZlXG4gICAgICAgICAgICAvLyBpdCBvdXQgb2YgZnJvbU5vZGVzTG9va3VwIGFuZCB3ZSB1c2UgZnJvbU5vZGVzTG9va3VwIHRvIGRldGVybWluZVxuICAgICAgICAgICAgLy8gaWYgYSBrZXllZCBub2RlIGhhcyBiZWVuIG1hdGNoZWQgdXAgb3Igbm90XG4gICAgICAgICAgICBpZiAoa2V5ZWRSZW1vdmFsTGlzdCkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGk9MCwgbGVuPWtleWVkUmVtb3ZhbExpc3QubGVuZ3RoOyBpPGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlbFRvUmVtb3ZlID0gZnJvbU5vZGVzTG9va3VwW2tleWVkUmVtb3ZhbExpc3RbaV1dO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWxUb1JlbW92ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlTm9kZShlbFRvUmVtb3ZlLCBlbFRvUmVtb3ZlLnBhcmVudE5vZGUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghY2hpbGRyZW5Pbmx5ICYmIG1vcnBoZWROb2RlICE9PSBmcm9tTm9kZSAmJiBmcm9tTm9kZS5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICBpZiAobW9ycGhlZE5vZGUuYWN0dWFsaXplKSB7XG4gICAgICAgICAgICAgICAgbW9ycGhlZE5vZGUgPSBtb3JwaGVkTm9kZS5hY3R1YWxpemUoZnJvbU5vZGUub3duZXJEb2N1bWVudCB8fCBkb2MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSWYgd2UgaGFkIHRvIHN3YXAgb3V0IHRoZSBmcm9tIG5vZGUgd2l0aCBhIG5ldyBub2RlIGJlY2F1c2UgdGhlIG9sZFxuICAgICAgICAgICAgLy8gbm9kZSB3YXMgbm90IGNvbXBhdGlibGUgd2l0aCB0aGUgdGFyZ2V0IG5vZGUgdGhlbiB3ZSBuZWVkIHRvXG4gICAgICAgICAgICAvLyByZXBsYWNlIHRoZSBvbGQgRE9NIG5vZGUgaW4gdGhlIG9yaWdpbmFsIERPTSB0cmVlLiBUaGlzIGlzIG9ubHlcbiAgICAgICAgICAgIC8vIHBvc3NpYmxlIGlmIHRoZSBvcmlnaW5hbCBET00gbm9kZSB3YXMgcGFydCBvZiBhIERPTSB0cmVlIHdoaWNoXG4gICAgICAgICAgICAvLyB3ZSBrbm93IGlzIHRoZSBjYXNlIGlmIGl0IGhhcyBhIHBhcmVudCBub2RlLlxuICAgICAgICAgICAgZnJvbU5vZGUucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQobW9ycGhlZE5vZGUsIGZyb21Ob2RlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtb3JwaGVkTm9kZTtcbiAgICB9O1xufVxuXG52YXIgbW9ycGhkb20gPSBtb3JwaGRvbUZhY3RvcnkobW9ycGhBdHRycyk7XG5cbmV4cG9ydCBkZWZhdWx0IG1vcnBoZG9tO1xuIiwgImltcG9ydCB7XG4gIFBIWF9DT01QT05FTlQsXG4gIFBIWF9ESVNBQkxFX1dJVEgsXG4gIFBIWF9GRUVEQkFDS19GT1IsXG4gIFBIWF9SRU1PVkUsXG4gIFBIWF9ST09UX0lELFxuICBQSFhfU0VTU0lPTixcbiAgUEhYX1NLSVAsXG4gIFBIWF9TVEFUSUMsXG4gIFBIWF9UUklHR0VSX0FDVElPTixcbiAgUEhYX1VQREFURVxufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQge1xuICBkZXRlY3REdXBsaWNhdGVJZHMsXG4gIGlzQ2lkXG59IGZyb20gXCIuL3V0aWxzXCJcblxuaW1wb3J0IERPTSBmcm9tIFwiLi9kb21cIlxuaW1wb3J0IERPTVBvc3RNb3JwaFJlc3RvcmVyIGZyb20gXCIuL2RvbV9wb3N0X21vcnBoX3Jlc3RvcmVyXCJcbmltcG9ydCBtb3JwaGRvbSBmcm9tIFwibW9ycGhkb21cIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBET01QYXRjaCB7XG4gIHN0YXRpYyBwYXRjaEVsKGZyb21FbCwgdG9FbCwgYWN0aXZlRWxlbWVudCl7XG4gICAgbW9ycGhkb20oZnJvbUVsLCB0b0VsLCB7XG4gICAgICBjaGlsZHJlbk9ubHk6IGZhbHNlLFxuICAgICAgb25CZWZvcmVFbFVwZGF0ZWQ6IChmcm9tRWwsIHRvRWwpID0+IHtcbiAgICAgICAgaWYoYWN0aXZlRWxlbWVudCAmJiBhY3RpdmVFbGVtZW50LmlzU2FtZU5vZGUoZnJvbUVsKSAmJiBET00uaXNGb3JtSW5wdXQoZnJvbUVsKSl7XG4gICAgICAgICAgRE9NLm1lcmdlRm9jdXNlZElucHV0KGZyb21FbCwgdG9FbClcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBjb25zdHJ1Y3Rvcih2aWV3LCBjb250YWluZXIsIGlkLCBodG1sLCB0YXJnZXRDSUQpe1xuICAgIHRoaXMudmlldyA9IHZpZXdcbiAgICB0aGlzLmxpdmVTb2NrZXQgPSB2aWV3LmxpdmVTb2NrZXRcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lclxuICAgIHRoaXMuaWQgPSBpZFxuICAgIHRoaXMucm9vdElEID0gdmlldy5yb290LmlkXG4gICAgdGhpcy5odG1sID0gaHRtbFxuICAgIHRoaXMudGFyZ2V0Q0lEID0gdGFyZ2V0Q0lEXG4gICAgdGhpcy5jaWRQYXRjaCA9IGlzQ2lkKHRoaXMudGFyZ2V0Q0lEKVxuICAgIHRoaXMuY2FsbGJhY2tzID0ge1xuICAgICAgYmVmb3JlYWRkZWQ6IFtdLCBiZWZvcmV1cGRhdGVkOiBbXSwgYmVmb3JlcGh4Q2hpbGRBZGRlZDogW10sXG4gICAgICBhZnRlcmFkZGVkOiBbXSwgYWZ0ZXJ1cGRhdGVkOiBbXSwgYWZ0ZXJkaXNjYXJkZWQ6IFtdLCBhZnRlcnBoeENoaWxkQWRkZWQ6IFtdXG4gICAgfVxuICB9XG5cbiAgYmVmb3JlKGtpbmQsIGNhbGxiYWNrKXsgdGhpcy5jYWxsYmFja3NbYGJlZm9yZSR7a2luZH1gXS5wdXNoKGNhbGxiYWNrKSB9XG4gIGFmdGVyKGtpbmQsIGNhbGxiYWNrKXsgdGhpcy5jYWxsYmFja3NbYGFmdGVyJHtraW5kfWBdLnB1c2goY2FsbGJhY2spIH1cblxuICB0cmFja0JlZm9yZShraW5kLCAuLi5hcmdzKXtcbiAgICB0aGlzLmNhbGxiYWNrc1tgYmVmb3JlJHtraW5kfWBdLmZvckVhY2goY2FsbGJhY2sgPT4gY2FsbGJhY2soLi4uYXJncykpXG4gIH1cblxuICB0cmFja0FmdGVyKGtpbmQsIC4uLmFyZ3Mpe1xuICAgIHRoaXMuY2FsbGJhY2tzW2BhZnRlciR7a2luZH1gXS5mb3JFYWNoKGNhbGxiYWNrID0+IGNhbGxiYWNrKC4uLmFyZ3MpKVxuICB9XG5cbiAgbWFya1BydW5hYmxlQ29udGVudEZvclJlbW92YWwoKXtcbiAgICBET00uYWxsKHRoaXMuY29udGFpbmVyLCBcIltwaHgtdXBkYXRlPWFwcGVuZF0gPiAqLCBbcGh4LXVwZGF0ZT1wcmVwZW5kXSA+ICpcIiwgZWwgPT4ge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKFBIWF9SRU1PVkUsIFwiXCIpXG4gICAgfSlcbiAgfVxuXG4gIHBlcmZvcm0oKXtcbiAgICBsZXQge3ZpZXcsIGxpdmVTb2NrZXQsIGNvbnRhaW5lciwgaHRtbH0gPSB0aGlzXG4gICAgbGV0IHRhcmdldENvbnRhaW5lciA9IHRoaXMuaXNDSURQYXRjaCgpID8gdGhpcy50YXJnZXRDSURDb250YWluZXIoaHRtbCkgOiBjb250YWluZXJcbiAgICBpZih0aGlzLmlzQ0lEUGF0Y2goKSAmJiAhdGFyZ2V0Q29udGFpbmVyKXsgcmV0dXJuIH1cblxuICAgIGxldCBmb2N1c2VkID0gbGl2ZVNvY2tldC5nZXRBY3RpdmVFbGVtZW50KClcbiAgICBsZXQge3NlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmR9ID0gZm9jdXNlZCAmJiBET00uaGFzU2VsZWN0aW9uUmFuZ2UoZm9jdXNlZCkgPyBmb2N1c2VkIDoge31cbiAgICBsZXQgcGh4VXBkYXRlID0gbGl2ZVNvY2tldC5iaW5kaW5nKFBIWF9VUERBVEUpXG4gICAgbGV0IHBoeEZlZWRiYWNrRm9yID0gbGl2ZVNvY2tldC5iaW5kaW5nKFBIWF9GRUVEQkFDS19GT1IpXG4gICAgbGV0IGRpc2FibGVXaXRoID0gbGl2ZVNvY2tldC5iaW5kaW5nKFBIWF9ESVNBQkxFX1dJVEgpXG4gICAgbGV0IHBoeFRyaWdnZXJFeHRlcm5hbCA9IGxpdmVTb2NrZXQuYmluZGluZyhQSFhfVFJJR0dFUl9BQ1RJT04pXG4gICAgbGV0IGFkZGVkID0gW11cbiAgICBsZXQgdXBkYXRlcyA9IFtdXG4gICAgbGV0IGFwcGVuZFByZXBlbmRVcGRhdGVzID0gW11cbiAgICBsZXQgZXh0ZXJuYWxGb3JtVHJpZ2dlcmVkID0gbnVsbFxuXG4gICAgbGV0IGRpZmZIVE1MID0gbGl2ZVNvY2tldC50aW1lKFwicHJlbW9ycGggY29udGFpbmVyIHByZXBcIiwgKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuYnVpbGREaWZmSFRNTChjb250YWluZXIsIGh0bWwsIHBoeFVwZGF0ZSwgdGFyZ2V0Q29udGFpbmVyKVxuICAgIH0pXG5cbiAgICB0aGlzLnRyYWNrQmVmb3JlKFwiYWRkZWRcIiwgY29udGFpbmVyKVxuICAgIHRoaXMudHJhY2tCZWZvcmUoXCJ1cGRhdGVkXCIsIGNvbnRhaW5lciwgY29udGFpbmVyKVxuXG4gICAgbGl2ZVNvY2tldC50aW1lKFwibW9ycGhkb21cIiwgKCkgPT4ge1xuICAgICAgbW9ycGhkb20odGFyZ2V0Q29udGFpbmVyLCBkaWZmSFRNTCwge1xuICAgICAgICBjaGlsZHJlbk9ubHk6IHRhcmdldENvbnRhaW5lci5nZXRBdHRyaWJ1dGUoUEhYX0NPTVBPTkVOVCkgPT09IG51bGwsXG4gICAgICAgIGdldE5vZGVLZXk6IChub2RlKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIERPTS5pc1BoeERlc3Ryb3llZChub2RlKSA/IG51bGwgOiBub2RlLmlkXG4gICAgICAgIH0sXG4gICAgICAgIG9uQmVmb3JlTm9kZUFkZGVkOiAoZWwpID0+IHtcbiAgICAgICAgICB0aGlzLnRyYWNrQmVmb3JlKFwiYWRkZWRcIiwgZWwpXG4gICAgICAgICAgcmV0dXJuIGVsXG4gICAgICAgIH0sXG4gICAgICAgIG9uTm9kZUFkZGVkOiAoZWwpID0+IHtcbiAgICAgICAgICBpZihET00uaXNOb3dUcmlnZ2VyRm9ybUV4dGVybmFsKGVsLCBwaHhUcmlnZ2VyRXh0ZXJuYWwpKXtcbiAgICAgICAgICAgIGV4dGVybmFsRm9ybVRyaWdnZXJlZCA9IGVsXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vaW5wdXQgaGFuZGxpbmdcbiAgICAgICAgICBET00uZGlzY2FyZEVycm9yKHRhcmdldENvbnRhaW5lciwgZWwsIHBoeEZlZWRiYWNrRm9yKVxuICAgICAgICAgIC8vIG5lc3RlZCB2aWV3IGhhbmRsaW5nXG4gICAgICAgICAgaWYoRE9NLmlzUGh4Q2hpbGQoZWwpICYmIHZpZXcub3duc0VsZW1lbnQoZWwpKXtcbiAgICAgICAgICAgIHRoaXMudHJhY2tBZnRlcihcInBoeENoaWxkQWRkZWRcIiwgZWwpXG4gICAgICAgICAgfVxuICAgICAgICAgIGFkZGVkLnB1c2goZWwpXG4gICAgICAgIH0sXG4gICAgICAgIG9uTm9kZURpc2NhcmRlZDogKGVsKSA9PiB7XG4gICAgICAgICAgLy8gbmVzdGVkIHZpZXcgaGFuZGxpbmdcbiAgICAgICAgICBpZihET00uaXNQaHhDaGlsZChlbCkpeyBsaXZlU29ja2V0LmRlc3Ryb3lWaWV3QnlFbChlbCkgfVxuICAgICAgICAgIHRoaXMudHJhY2tBZnRlcihcImRpc2NhcmRlZFwiLCBlbClcbiAgICAgICAgfSxcbiAgICAgICAgb25CZWZvcmVOb2RlRGlzY2FyZGVkOiAoZWwpID0+IHtcbiAgICAgICAgICBpZihlbC5nZXRBdHRyaWJ1dGUgJiYgZWwuZ2V0QXR0cmlidXRlKFBIWF9SRU1PVkUpICE9PSBudWxsKXsgcmV0dXJuIHRydWUgfVxuICAgICAgICAgIGlmKGVsLnBhcmVudE5vZGUgIT09IG51bGwgJiYgRE9NLmlzUGh4VXBkYXRlKGVsLnBhcmVudE5vZGUsIHBoeFVwZGF0ZSwgW1wiYXBwZW5kXCIsIFwicHJlcGVuZFwiXSkgJiYgZWwuaWQpeyByZXR1cm4gZmFsc2UgfVxuICAgICAgICAgIGlmKHRoaXMuc2tpcENJRFNpYmxpbmcoZWwpKXsgcmV0dXJuIGZhbHNlIH1cbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBvbkVsVXBkYXRlZDogKGVsKSA9PiB7XG4gICAgICAgICAgaWYoRE9NLmlzTm93VHJpZ2dlckZvcm1FeHRlcm5hbChlbCwgcGh4VHJpZ2dlckV4dGVybmFsKSl7XG4gICAgICAgICAgICBleHRlcm5hbEZvcm1UcmlnZ2VyZWQgPSBlbFxuICAgICAgICAgIH1cbiAgICAgICAgICB1cGRhdGVzLnB1c2goZWwpXG4gICAgICAgIH0sXG4gICAgICAgIG9uQmVmb3JlRWxVcGRhdGVkOiAoZnJvbUVsLCB0b0VsKSA9PiB7XG4gICAgICAgICAgRE9NLmNsZWFuQ2hpbGROb2Rlcyh0b0VsLCBwaHhVcGRhdGUpXG4gICAgICAgICAgaWYodGhpcy5za2lwQ0lEU2libGluZyh0b0VsKSl7IHJldHVybiBmYWxzZSB9XG4gICAgICAgICAgaWYoRE9NLmlzSWdub3JlZChmcm9tRWwsIHBoeFVwZGF0ZSkpe1xuICAgICAgICAgICAgdGhpcy50cmFja0JlZm9yZShcInVwZGF0ZWRcIiwgZnJvbUVsLCB0b0VsKVxuICAgICAgICAgICAgRE9NLm1lcmdlQXR0cnMoZnJvbUVsLCB0b0VsLCB7aXNJZ25vcmVkOiB0cnVlfSlcbiAgICAgICAgICAgIHVwZGF0ZXMucHVzaChmcm9tRWwpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYoZnJvbUVsLnR5cGUgPT09IFwibnVtYmVyXCIgJiYgKGZyb21FbC52YWxpZGl0eSAmJiBmcm9tRWwudmFsaWRpdHkuYmFkSW5wdXQpKXsgcmV0dXJuIGZhbHNlIH1cbiAgICAgICAgICBpZighRE9NLnN5bmNQZW5kaW5nUmVmKGZyb21FbCwgdG9FbCwgZGlzYWJsZVdpdGgpKXtcbiAgICAgICAgICAgIGlmKERPTS5pc1VwbG9hZElucHV0KGZyb21FbCkpe1xuICAgICAgICAgICAgICB0aGlzLnRyYWNrQmVmb3JlKFwidXBkYXRlZFwiLCBmcm9tRWwsIHRvRWwpXG4gICAgICAgICAgICAgIHVwZGF0ZXMucHVzaChmcm9tRWwpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBuZXN0ZWQgdmlldyBoYW5kbGluZ1xuICAgICAgICAgIGlmKERPTS5pc1BoeENoaWxkKHRvRWwpKXtcbiAgICAgICAgICAgIGxldCBwcmV2U2Vzc2lvbiA9IGZyb21FbC5nZXRBdHRyaWJ1dGUoUEhYX1NFU1NJT04pXG4gICAgICAgICAgICBET00ubWVyZ2VBdHRycyhmcm9tRWwsIHRvRWwsIHtleGNsdWRlOiBbUEhYX1NUQVRJQ119KVxuICAgICAgICAgICAgaWYocHJldlNlc3Npb24gIT09IFwiXCIpeyBmcm9tRWwuc2V0QXR0cmlidXRlKFBIWF9TRVNTSU9OLCBwcmV2U2Vzc2lvbikgfVxuICAgICAgICAgICAgZnJvbUVsLnNldEF0dHJpYnV0ZShQSFhfUk9PVF9JRCwgdGhpcy5yb290SUQpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBpbnB1dCBoYW5kbGluZ1xuICAgICAgICAgIERPTS5jb3B5UHJpdmF0ZXModG9FbCwgZnJvbUVsKVxuICAgICAgICAgIERPTS5kaXNjYXJkRXJyb3IodGFyZ2V0Q29udGFpbmVyLCB0b0VsLCBwaHhGZWVkYmFja0ZvcilcbiAgICAgICAgICBET00uc3luY1Byb3BzVG9BdHRycyh0b0VsKVxuXG4gICAgICAgICAgbGV0IGlzRm9jdXNlZEZvcm1FbCA9IGZvY3VzZWQgJiYgZnJvbUVsLmlzU2FtZU5vZGUoZm9jdXNlZCkgJiYgRE9NLmlzRm9ybUlucHV0KGZyb21FbClcbiAgICAgICAgICBpZihpc0ZvY3VzZWRGb3JtRWwgJiYgIXRoaXMuZm9yY2VGb2N1c2VkU2VsZWN0VXBkYXRlKGZyb21FbCwgdG9FbCkpe1xuICAgICAgICAgICAgdGhpcy50cmFja0JlZm9yZShcInVwZGF0ZWRcIiwgZnJvbUVsLCB0b0VsKVxuICAgICAgICAgICAgRE9NLm1lcmdlRm9jdXNlZElucHV0KGZyb21FbCwgdG9FbClcbiAgICAgICAgICAgIERPTS5zeW5jQXR0cnNUb1Byb3BzKGZyb21FbClcbiAgICAgICAgICAgIHVwZGF0ZXMucHVzaChmcm9tRWwpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYoRE9NLmlzUGh4VXBkYXRlKHRvRWwsIHBoeFVwZGF0ZSwgW1wiYXBwZW5kXCIsIFwicHJlcGVuZFwiXSkpe1xuICAgICAgICAgICAgICBhcHBlbmRQcmVwZW5kVXBkYXRlcy5wdXNoKG5ldyBET01Qb3N0TW9ycGhSZXN0b3Jlcihmcm9tRWwsIHRvRWwsIHRvRWwuZ2V0QXR0cmlidXRlKHBoeFVwZGF0ZSkpKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgRE9NLnN5bmNBdHRyc1RvUHJvcHModG9FbClcbiAgICAgICAgICAgIHRoaXMudHJhY2tCZWZvcmUoXCJ1cGRhdGVkXCIsIGZyb21FbCwgdG9FbClcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG5cbiAgICBpZihsaXZlU29ja2V0LmlzRGVidWdFbmFibGVkKCkpeyBkZXRlY3REdXBsaWNhdGVJZHMoKSB9XG5cbiAgICBpZihhcHBlbmRQcmVwZW5kVXBkYXRlcy5sZW5ndGggPiAwKXtcbiAgICAgIGxpdmVTb2NrZXQudGltZShcInBvc3QtbW9ycGggYXBwZW5kL3ByZXBlbmQgcmVzdG9yYXRpb25cIiwgKCkgPT4ge1xuICAgICAgICBhcHBlbmRQcmVwZW5kVXBkYXRlcy5mb3JFYWNoKHVwZGF0ZSA9PiB1cGRhdGUucGVyZm9ybSgpKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBsaXZlU29ja2V0LnNpbGVuY2VFdmVudHMoKCkgPT4gRE9NLnJlc3RvcmVGb2N1cyhmb2N1c2VkLCBzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kKSlcbiAgICBET00uZGlzcGF0Y2hFdmVudChkb2N1bWVudCwgXCJwaHg6dXBkYXRlXCIpXG4gICAgYWRkZWQuZm9yRWFjaChlbCA9PiB0aGlzLnRyYWNrQWZ0ZXIoXCJhZGRlZFwiLCBlbCkpXG4gICAgdXBkYXRlcy5mb3JFYWNoKGVsID0+IHRoaXMudHJhY2tBZnRlcihcInVwZGF0ZWRcIiwgZWwpKVxuXG4gICAgaWYoZXh0ZXJuYWxGb3JtVHJpZ2dlcmVkKXtcbiAgICAgIGxpdmVTb2NrZXQuZGlzY29ubmVjdCgpXG4gICAgICBleHRlcm5hbEZvcm1UcmlnZ2VyZWQuc3VibWl0KClcbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGZvcmNlRm9jdXNlZFNlbGVjdFVwZGF0ZShmcm9tRWwsIHRvRWwpe1xuICAgIGxldCBpc1NlbGVjdCA9IFtcInNlbGVjdFwiLCBcInNlbGVjdC1vbmVcIiwgXCJzZWxlY3QtbXVsdGlwbGVcIl0uZmluZCgodCkgPT4gdCA9PT0gZnJvbUVsLnR5cGUpXG4gICAgcmV0dXJuIGZyb21FbC5tdWx0aXBsZSA9PT0gdHJ1ZSB8fCAoaXNTZWxlY3QgJiYgZnJvbUVsLmlubmVySFRNTCAhPSB0b0VsLmlubmVySFRNTClcbiAgfVxuXG4gIGlzQ0lEUGF0Y2goKXsgcmV0dXJuIHRoaXMuY2lkUGF0Y2ggfVxuXG4gIHNraXBDSURTaWJsaW5nKGVsKXtcbiAgICByZXR1cm4gZWwubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFICYmIGVsLmdldEF0dHJpYnV0ZShQSFhfU0tJUCkgIT09IG51bGxcbiAgfVxuXG4gIHRhcmdldENJRENvbnRhaW5lcihodG1sKXtcbiAgICBpZighdGhpcy5pc0NJRFBhdGNoKCkpeyByZXR1cm4gfVxuICAgIGxldCBbZmlyc3QsIC4uLnJlc3RdID0gRE9NLmZpbmRDb21wb25lbnROb2RlTGlzdCh0aGlzLmNvbnRhaW5lciwgdGhpcy50YXJnZXRDSUQpXG4gICAgaWYocmVzdC5sZW5ndGggPT09IDAgJiYgRE9NLmNoaWxkTm9kZUxlbmd0aChodG1sKSA9PT0gMSl7XG4gICAgICByZXR1cm4gZmlyc3RcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZpcnN0ICYmIGZpcnN0LnBhcmVudE5vZGVcbiAgICB9XG4gIH1cblxuICAvLyBidWlsZHMgSFRNTCBmb3IgbW9ycGhkb20gcGF0Y2hcbiAgLy8gLSBmb3IgZnVsbCBwYXRjaGVzIG9mIExpdmVWaWV3IG9yIGEgY29tcG9uZW50IHdpdGggYSBzaW5nbGVcbiAgLy8gICByb290IG5vZGUsIHNpbXBseSByZXR1cm5zIHRoZSBIVE1MXG4gIC8vIC0gZm9yIHBhdGNoZXMgb2YgYSBjb21wb25lbnQgd2l0aCBtdWx0aXBsZSByb290IG5vZGVzLCB0aGVcbiAgLy8gICBwYXJlbnQgbm9kZSBiZWNvbWVzIHRoZSB0YXJnZXQgY29udGFpbmVyIGFuZCBub24tY29tcG9uZW50XG4gIC8vICAgc2libGluZ3MgYXJlIG1hcmtlZCBhcyBza2lwLlxuICBidWlsZERpZmZIVE1MKGNvbnRhaW5lciwgaHRtbCwgcGh4VXBkYXRlLCB0YXJnZXRDb250YWluZXIpe1xuICAgIGxldCBpc0NJRFBhdGNoID0gdGhpcy5pc0NJRFBhdGNoKClcbiAgICBsZXQgaXNDSURXaXRoU2luZ2xlUm9vdCA9IGlzQ0lEUGF0Y2ggJiYgdGFyZ2V0Q29udGFpbmVyLmdldEF0dHJpYnV0ZShQSFhfQ09NUE9ORU5UKSA9PT0gdGhpcy50YXJnZXRDSUQudG9TdHJpbmcoKVxuICAgIGlmKCFpc0NJRFBhdGNoIHx8IGlzQ0lEV2l0aFNpbmdsZVJvb3Qpe1xuICAgICAgcmV0dXJuIGh0bWxcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gY29tcG9uZW50IHBhdGNoIHdpdGggbXVsdGlwbGUgQ0lEIHJvb3RzXG4gICAgICBsZXQgZGlmZkNvbnRhaW5lciA9IG51bGxcbiAgICAgIGxldCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKVxuICAgICAgZGlmZkNvbnRhaW5lciA9IERPTS5jbG9uZU5vZGUodGFyZ2V0Q29udGFpbmVyKVxuICAgICAgbGV0IFtmaXJzdENvbXBvbmVudCwgLi4ucmVzdF0gPSBET00uZmluZENvbXBvbmVudE5vZGVMaXN0KGRpZmZDb250YWluZXIsIHRoaXMudGFyZ2V0Q0lEKVxuICAgICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gaHRtbFxuICAgICAgcmVzdC5mb3JFYWNoKGVsID0+IGVsLnJlbW92ZSgpKVxuICAgICAgQXJyYXkuZnJvbShkaWZmQ29udGFpbmVyLmNoaWxkTm9kZXMpLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAvLyB3ZSBjYW4gb25seSBza2lwIHRyYWNrYWJsZSBub2RlcyB3aXRoIGFuIElEXG4gICAgICAgIGlmKGNoaWxkLmlkICYmIGNoaWxkLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSAmJiBjaGlsZC5nZXRBdHRyaWJ1dGUoUEhYX0NPTVBPTkVOVCkgIT09IHRoaXMudGFyZ2V0Q0lELnRvU3RyaW5nKCkpe1xuICAgICAgICAgIGNoaWxkLnNldEF0dHJpYnV0ZShQSFhfU0tJUCwgXCJcIilcbiAgICAgICAgICBjaGlsZC5pbm5lckhUTUwgPSBcIlwiXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBBcnJheS5mcm9tKHRlbXBsYXRlLmNvbnRlbnQuY2hpbGROb2RlcykuZm9yRWFjaChlbCA9PiBkaWZmQ29udGFpbmVyLmluc2VydEJlZm9yZShlbCwgZmlyc3RDb21wb25lbnQpKVxuICAgICAgZmlyc3RDb21wb25lbnQucmVtb3ZlKClcbiAgICAgIHJldHVybiBkaWZmQ29udGFpbmVyLm91dGVySFRNTFxuICAgIH1cbiAgfVxufVxuIiwgImltcG9ydCB7XG4gIENPTVBPTkVOVFMsXG4gIERZTkFNSUNTLFxuICBFVkVOVFMsXG4gIFBIWF9DT01QT05FTlQsXG4gIFBIWF9TS0lQLFxuICBSRVBMWSxcbiAgU1RBVElDLFxuICBUSVRMRVxufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQge1xuICBpc09iamVjdCxcbiAgbG9nRXJyb3IsXG4gIGlzQ2lkLFxufSBmcm9tIFwiLi91dGlsc1wiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbmRlcmVkIHtcbiAgc3RhdGljIGV4dHJhY3QoZGlmZil7XG4gICAgbGV0IHtbUkVQTFldOiByZXBseSwgW0VWRU5UU106IGV2ZW50cywgW1RJVExFXTogdGl0bGV9ID0gZGlmZlxuICAgIGRlbGV0ZSBkaWZmW1JFUExZXVxuICAgIGRlbGV0ZSBkaWZmW0VWRU5UU11cbiAgICBkZWxldGUgZGlmZltUSVRMRV1cbiAgICByZXR1cm4ge2RpZmYsIHRpdGxlLCByZXBseTogcmVwbHkgfHwgbnVsbCwgZXZlbnRzOiBldmVudHMgfHwgW119XG4gIH1cblxuICBjb25zdHJ1Y3Rvcih2aWV3SWQsIHJlbmRlcmVkKXtcbiAgICB0aGlzLnZpZXdJZCA9IHZpZXdJZFxuICAgIHRoaXMucmVuZGVyZWQgPSB7fVxuICAgIHRoaXMubWVyZ2VEaWZmKHJlbmRlcmVkKVxuICB9XG5cbiAgcGFyZW50Vmlld0lkKCl7IHJldHVybiB0aGlzLnZpZXdJZCB9XG5cbiAgdG9TdHJpbmcob25seUNpZHMpe1xuICAgIHJldHVybiB0aGlzLnJlY3Vyc2l2ZVRvU3RyaW5nKHRoaXMucmVuZGVyZWQsIHRoaXMucmVuZGVyZWRbQ09NUE9ORU5UU10sIG9ubHlDaWRzKVxuICB9XG5cbiAgcmVjdXJzaXZlVG9TdHJpbmcocmVuZGVyZWQsIGNvbXBvbmVudHMgPSByZW5kZXJlZFtDT01QT05FTlRTXSwgb25seUNpZHMpe1xuICAgIG9ubHlDaWRzID0gb25seUNpZHMgPyBuZXcgU2V0KG9ubHlDaWRzKSA6IG51bGxcbiAgICBsZXQgb3V0cHV0ID0ge2J1ZmZlcjogXCJcIiwgY29tcG9uZW50czogY29tcG9uZW50cywgb25seUNpZHM6IG9ubHlDaWRzfVxuICAgIHRoaXMudG9PdXRwdXRCdWZmZXIocmVuZGVyZWQsIG91dHB1dClcbiAgICByZXR1cm4gb3V0cHV0LmJ1ZmZlclxuICB9XG5cbiAgY29tcG9uZW50Q0lEcyhkaWZmKXsgcmV0dXJuIE9iamVjdC5rZXlzKGRpZmZbQ09NUE9ORU5UU10gfHwge30pLm1hcChpID0+IHBhcnNlSW50KGkpKSB9XG5cbiAgaXNDb21wb25lbnRPbmx5RGlmZihkaWZmKXtcbiAgICBpZighZGlmZltDT01QT05FTlRTXSl7IHJldHVybiBmYWxzZSB9XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGRpZmYpLmxlbmd0aCA9PT0gMVxuICB9XG5cbiAgZ2V0Q29tcG9uZW50KGRpZmYsIGNpZCl7IHJldHVybiBkaWZmW0NPTVBPTkVOVFNdW2NpZF0gfVxuXG4gIG1lcmdlRGlmZihkaWZmKXtcbiAgICBsZXQgbmV3YyA9IGRpZmZbQ09NUE9ORU5UU11cbiAgICBsZXQgY2FjaGUgPSB7fVxuICAgIGRlbGV0ZSBkaWZmW0NPTVBPTkVOVFNdXG4gICAgdGhpcy5yZW5kZXJlZCA9IHRoaXMubXV0YWJsZU1lcmdlKHRoaXMucmVuZGVyZWQsIGRpZmYpXG4gICAgdGhpcy5yZW5kZXJlZFtDT01QT05FTlRTXSA9IHRoaXMucmVuZGVyZWRbQ09NUE9ORU5UU10gfHwge31cblxuICAgIGlmKG5ld2Mpe1xuICAgICAgbGV0IG9sZGMgPSB0aGlzLnJlbmRlcmVkW0NPTVBPTkVOVFNdXG5cbiAgICAgIGZvcihsZXQgY2lkIGluIG5ld2Mpe1xuICAgICAgICBuZXdjW2NpZF0gPSB0aGlzLmNhY2hlZEZpbmRDb21wb25lbnQoY2lkLCBuZXdjW2NpZF0sIG9sZGMsIG5ld2MsIGNhY2hlKVxuICAgICAgfVxuXG4gICAgICBmb3IodmFyIGtleSBpbiBuZXdjKXsgb2xkY1trZXldID0gbmV3Y1trZXldIH1cbiAgICAgIGRpZmZbQ09NUE9ORU5UU10gPSBuZXdjXG4gICAgfVxuICB9XG5cbiAgY2FjaGVkRmluZENvbXBvbmVudChjaWQsIGNkaWZmLCBvbGRjLCBuZXdjLCBjYWNoZSl7XG4gICAgaWYoY2FjaGVbY2lkXSl7XG4gICAgICByZXR1cm4gY2FjaGVbY2lkXVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgbmRpZmYsIHN0YXQsIHNjaWQgPSBjZGlmZltTVEFUSUNdXG5cbiAgICAgIGlmKGlzQ2lkKHNjaWQpKXtcbiAgICAgICAgbGV0IHRkaWZmXG5cbiAgICAgICAgaWYoc2NpZCA+IDApe1xuICAgICAgICAgIHRkaWZmID0gdGhpcy5jYWNoZWRGaW5kQ29tcG9uZW50KHNjaWQsIG5ld2Nbc2NpZF0sIG9sZGMsIG5ld2MsIGNhY2hlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRkaWZmID0gb2xkY1stc2NpZF1cbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXQgPSB0ZGlmZltTVEFUSUNdXG4gICAgICAgIG5kaWZmID0gdGhpcy5jbG9uZU1lcmdlKHRkaWZmLCBjZGlmZilcbiAgICAgICAgbmRpZmZbU1RBVElDXSA9IHN0YXRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5kaWZmID0gY2RpZmZbU1RBVElDXSAhPT0gdW5kZWZpbmVkID8gY2RpZmYgOiB0aGlzLmNsb25lTWVyZ2Uob2xkY1tjaWRdIHx8IHt9LCBjZGlmZilcbiAgICAgIH1cblxuICAgICAgY2FjaGVbY2lkXSA9IG5kaWZmXG4gICAgICByZXR1cm4gbmRpZmZcbiAgICB9XG4gIH1cblxuICBtdXRhYmxlTWVyZ2UodGFyZ2V0LCBzb3VyY2Upe1xuICAgIGlmKHNvdXJjZVtTVEFUSUNdICE9PSB1bmRlZmluZWQpe1xuICAgICAgcmV0dXJuIHNvdXJjZVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRvTXV0YWJsZU1lcmdlKHRhcmdldCwgc291cmNlKVxuICAgICAgcmV0dXJuIHRhcmdldFxuICAgIH1cbiAgfVxuXG4gIGRvTXV0YWJsZU1lcmdlKHRhcmdldCwgc291cmNlKXtcbiAgICBmb3IobGV0IGtleSBpbiBzb3VyY2Upe1xuICAgICAgbGV0IHZhbCA9IHNvdXJjZVtrZXldXG4gICAgICBsZXQgdGFyZ2V0VmFsID0gdGFyZ2V0W2tleV1cbiAgICAgIGlmKGlzT2JqZWN0KHZhbCkgJiYgdmFsW1NUQVRJQ10gPT09IHVuZGVmaW5lZCAmJiBpc09iamVjdCh0YXJnZXRWYWwpKXtcbiAgICAgICAgdGhpcy5kb011dGFibGVNZXJnZSh0YXJnZXRWYWwsIHZhbClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gdmFsXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY2xvbmVNZXJnZSh0YXJnZXQsIHNvdXJjZSl7XG4gICAgbGV0IG1lcmdlZCA9IHsuLi50YXJnZXQsIC4uLnNvdXJjZX1cbiAgICBmb3IobGV0IGtleSBpbiBtZXJnZWQpe1xuICAgICAgbGV0IHZhbCA9IHNvdXJjZVtrZXldXG4gICAgICBsZXQgdGFyZ2V0VmFsID0gdGFyZ2V0W2tleV1cbiAgICAgIGlmKGlzT2JqZWN0KHZhbCkgJiYgdmFsW1NUQVRJQ10gPT09IHVuZGVmaW5lZCAmJiBpc09iamVjdCh0YXJnZXRWYWwpKXtcbiAgICAgICAgbWVyZ2VkW2tleV0gPSB0aGlzLmNsb25lTWVyZ2UodGFyZ2V0VmFsLCB2YWwpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtZXJnZWRcbiAgfVxuXG4gIGNvbXBvbmVudFRvU3RyaW5nKGNpZCl7IHJldHVybiB0aGlzLnJlY3Vyc2l2ZUNJRFRvU3RyaW5nKHRoaXMucmVuZGVyZWRbQ09NUE9ORU5UU10sIGNpZCkgfVxuXG4gIHBydW5lQ0lEcyhjaWRzKXtcbiAgICBjaWRzLmZvckVhY2goY2lkID0+IGRlbGV0ZSB0aGlzLnJlbmRlcmVkW0NPTVBPTkVOVFNdW2NpZF0pXG4gIH1cblxuICAvLyBwcml2YXRlXG5cbiAgZ2V0KCl7IHJldHVybiB0aGlzLnJlbmRlcmVkIH1cblxuICBpc05ld0ZpbmdlcnByaW50KGRpZmYgPSB7fSl7IHJldHVybiAhIWRpZmZbU1RBVElDXSB9XG5cbiAgdG9PdXRwdXRCdWZmZXIocmVuZGVyZWQsIG91dHB1dCl7XG4gICAgaWYocmVuZGVyZWRbRFlOQU1JQ1NdKXsgcmV0dXJuIHRoaXMuY29tcHJlaGVuc2lvblRvQnVmZmVyKHJlbmRlcmVkLCBvdXRwdXQpIH1cbiAgICBsZXQge1tTVEFUSUNdOiBzdGF0aWNzfSA9IHJlbmRlcmVkXG5cbiAgICBvdXRwdXQuYnVmZmVyICs9IHN0YXRpY3NbMF1cbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgc3RhdGljcy5sZW5ndGg7IGkrKyl7XG4gICAgICB0aGlzLmR5bmFtaWNUb0J1ZmZlcihyZW5kZXJlZFtpIC0gMV0sIG91dHB1dClcbiAgICAgIG91dHB1dC5idWZmZXIgKz0gc3RhdGljc1tpXVxuICAgIH1cbiAgfVxuXG4gIGNvbXByZWhlbnNpb25Ub0J1ZmZlcihyZW5kZXJlZCwgb3V0cHV0KXtcbiAgICBsZXQge1tEWU5BTUlDU106IGR5bmFtaWNzLCBbU1RBVElDXTogc3RhdGljc30gPSByZW5kZXJlZFxuXG4gICAgZm9yKGxldCBkID0gMDsgZCA8IGR5bmFtaWNzLmxlbmd0aDsgZCsrKXtcbiAgICAgIGxldCBkeW5hbWljID0gZHluYW1pY3NbZF1cbiAgICAgIG91dHB1dC5idWZmZXIgKz0gc3RhdGljc1swXVxuICAgICAgZm9yKGxldCBpID0gMTsgaSA8IHN0YXRpY3MubGVuZ3RoOyBpKyspe1xuICAgICAgICB0aGlzLmR5bmFtaWNUb0J1ZmZlcihkeW5hbWljW2kgLSAxXSwgb3V0cHV0KVxuICAgICAgICBvdXRwdXQuYnVmZmVyICs9IHN0YXRpY3NbaV1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkeW5hbWljVG9CdWZmZXIocmVuZGVyZWQsIG91dHB1dCl7XG4gICAgaWYodHlwZW9mIChyZW5kZXJlZCkgPT09IFwibnVtYmVyXCIpe1xuICAgICAgb3V0cHV0LmJ1ZmZlciArPSB0aGlzLnJlY3Vyc2l2ZUNJRFRvU3RyaW5nKG91dHB1dC5jb21wb25lbnRzLCByZW5kZXJlZCwgb3V0cHV0Lm9ubHlDaWRzKVxuICAgIH0gZWxzZSBpZihpc09iamVjdChyZW5kZXJlZCkpe1xuICAgICAgdGhpcy50b091dHB1dEJ1ZmZlcihyZW5kZXJlZCwgb3V0cHV0KVxuICAgIH0gZWxzZSB7XG4gICAgICBvdXRwdXQuYnVmZmVyICs9IHJlbmRlcmVkXG4gICAgfVxuICB9XG5cbiAgcmVjdXJzaXZlQ0lEVG9TdHJpbmcoY29tcG9uZW50cywgY2lkLCBvbmx5Q2lkcyl7XG4gICAgbGV0IGNvbXBvbmVudCA9IGNvbXBvbmVudHNbY2lkXSB8fCBsb2dFcnJvcihgbm8gY29tcG9uZW50IGZvciBDSUQgJHtjaWR9YCwgY29tcG9uZW50cylcbiAgICBsZXQgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIilcbiAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSB0aGlzLnJlY3Vyc2l2ZVRvU3RyaW5nKGNvbXBvbmVudCwgY29tcG9uZW50cywgb25seUNpZHMpXG4gICAgbGV0IGNvbnRhaW5lciA9IHRlbXBsYXRlLmNvbnRlbnRcbiAgICBsZXQgc2tpcCA9IG9ubHlDaWRzICYmICFvbmx5Q2lkcy5oYXMoY2lkKVxuXG4gICAgbGV0IFtoYXNDaGlsZE5vZGVzLCBoYXNDaGlsZENvbXBvbmVudHNdID1cbiAgICAgIEFycmF5LmZyb20oY29udGFpbmVyLmNoaWxkTm9kZXMpLnJlZHVjZSgoW2hhc05vZGVzLCBoYXNDb21wb25lbnRzXSwgY2hpbGQsIGkpID0+IHtcbiAgICAgICAgaWYoY2hpbGQubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKXtcbiAgICAgICAgICBpZihjaGlsZC5nZXRBdHRyaWJ1dGUoUEhYX0NPTVBPTkVOVCkpe1xuICAgICAgICAgICAgcmV0dXJuIFtoYXNOb2RlcywgdHJ1ZV1cbiAgICAgICAgICB9XG4gICAgICAgICAgY2hpbGQuc2V0QXR0cmlidXRlKFBIWF9DT01QT05FTlQsIGNpZClcbiAgICAgICAgICBpZighY2hpbGQuaWQpeyBjaGlsZC5pZCA9IGAke3RoaXMucGFyZW50Vmlld0lkKCl9LSR7Y2lkfS0ke2l9YCB9XG4gICAgICAgICAgaWYoc2tpcCl7XG4gICAgICAgICAgICBjaGlsZC5zZXRBdHRyaWJ1dGUoUEhYX1NLSVAsIFwiXCIpXG4gICAgICAgICAgICBjaGlsZC5pbm5lckhUTUwgPSBcIlwiXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBbdHJ1ZSwgaGFzQ29tcG9uZW50c11cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZihjaGlsZC5ub2RlVmFsdWUudHJpbSgpICE9PSBcIlwiKXtcbiAgICAgICAgICAgIGxvZ0Vycm9yKFwib25seSBIVE1MIGVsZW1lbnQgdGFncyBhcmUgYWxsb3dlZCBhdCB0aGUgcm9vdCBvZiBjb21wb25lbnRzLlxcblxcblwiICtcbiAgICAgICAgICAgICAgYGdvdDogXCIke2NoaWxkLm5vZGVWYWx1ZS50cmltKCl9XCJcXG5cXG5gICtcbiAgICAgICAgICAgICAgXCJ3aXRoaW46XFxuXCIsIHRlbXBsYXRlLmlubmVySFRNTC50cmltKCkpXG4gICAgICAgICAgICBjaGlsZC5yZXBsYWNlV2l0aCh0aGlzLmNyZWF0ZVNwYW4oY2hpbGQubm9kZVZhbHVlLCBjaWQpKVxuICAgICAgICAgICAgcmV0dXJuIFt0cnVlLCBoYXNDb21wb25lbnRzXVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjaGlsZC5yZW1vdmUoKVxuICAgICAgICAgICAgcmV0dXJuIFtoYXNOb2RlcywgaGFzQ29tcG9uZW50c11cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIFtmYWxzZSwgZmFsc2VdKVxuXG4gICAgaWYoIWhhc0NoaWxkTm9kZXMgJiYgIWhhc0NoaWxkQ29tcG9uZW50cyl7XG4gICAgICBsb2dFcnJvcihcImV4cGVjdGVkIGF0IGxlYXN0IG9uZSBIVE1MIGVsZW1lbnQgdGFnIGluc2lkZSBhIGNvbXBvbmVudCwgYnV0IHRoZSBjb21wb25lbnQgaXMgZW1wdHk6XFxuXCIsXG4gICAgICAgIHRlbXBsYXRlLmlubmVySFRNTC50cmltKCkpXG4gICAgICByZXR1cm4gdGhpcy5jcmVhdGVTcGFuKFwiXCIsIGNpZCkub3V0ZXJIVE1MXG4gICAgfSBlbHNlIGlmKCFoYXNDaGlsZE5vZGVzICYmIGhhc0NoaWxkQ29tcG9uZW50cyl7XG4gICAgICBsb2dFcnJvcihcImV4cGVjdGVkIGF0IGxlYXN0IG9uZSBIVE1MIGVsZW1lbnQgdGFnIGRpcmVjdGx5IGluc2lkZSBhIGNvbXBvbmVudCwgYnV0IG9ubHkgc3ViY29tcG9uZW50cyB3ZXJlIGZvdW5kLiBBIGNvbXBvbmVudCBtdXN0IHJlbmRlciBhdCBsZWFzdCBvbmUgSFRNTCB0YWcgZGlyZWN0bHkgaW5zaWRlIGl0c2VsZi5cIixcbiAgICAgICAgdGVtcGxhdGUuaW5uZXJIVE1MLnRyaW0oKSlcbiAgICAgIHJldHVybiB0ZW1wbGF0ZS5pbm5lckhUTUxcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRlbXBsYXRlLmlubmVySFRNTFxuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZVNwYW4odGV4dCwgY2lkKXtcbiAgICBsZXQgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXG4gICAgc3Bhbi5pbm5lclRleHQgPSB0ZXh0XG4gICAgc3Bhbi5zZXRBdHRyaWJ1dGUoUEhYX0NPTVBPTkVOVCwgY2lkKVxuICAgIHJldHVybiBzcGFuXG4gIH1cbn1cbiIsICJsZXQgdmlld0hvb2tJRCA9IDFcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdIb29rIHtcbiAgc3RhdGljIG1ha2VJRCgpeyByZXR1cm4gdmlld0hvb2tJRCsrIH1cbiAgc3RhdGljIGVsZW1lbnRJRChlbCl7IHJldHVybiBlbC5waHhIb29rSWQgfVxuXG4gIGNvbnN0cnVjdG9yKHZpZXcsIGVsLCBjYWxsYmFja3Mpe1xuICAgIHRoaXMuX192aWV3ID0gdmlld1xuICAgIHRoaXMuX19saXZlU29ja2V0ID0gdmlldy5saXZlU29ja2V0XG4gICAgdGhpcy5fX2NhbGxiYWNrcyA9IGNhbGxiYWNrc1xuICAgIHRoaXMuX19saXN0ZW5lcnMgPSBuZXcgU2V0KClcbiAgICB0aGlzLl9faXNEaXNjb25uZWN0ZWQgPSBmYWxzZVxuICAgIHRoaXMuZWwgPSBlbFxuICAgIHRoaXMuZWwucGh4SG9va0lkID0gdGhpcy5jb25zdHJ1Y3Rvci5tYWtlSUQoKVxuICAgIGZvcihsZXQga2V5IGluIHRoaXMuX19jYWxsYmFja3MpeyB0aGlzW2tleV0gPSB0aGlzLl9fY2FsbGJhY2tzW2tleV0gfVxuICB9XG5cbiAgX19tb3VudGVkKCl7IHRoaXMubW91bnRlZCAmJiB0aGlzLm1vdW50ZWQoKSB9XG4gIF9fdXBkYXRlZCgpeyB0aGlzLnVwZGF0ZWQgJiYgdGhpcy51cGRhdGVkKCkgfVxuICBfX2JlZm9yZVVwZGF0ZSgpeyB0aGlzLmJlZm9yZVVwZGF0ZSAmJiB0aGlzLmJlZm9yZVVwZGF0ZSgpIH1cbiAgX19kZXN0cm95ZWQoKXsgdGhpcy5kZXN0cm95ZWQgJiYgdGhpcy5kZXN0cm95ZWQoKSB9XG4gIF9fcmVjb25uZWN0ZWQoKXtcbiAgICBpZih0aGlzLl9faXNEaXNjb25uZWN0ZWQpe1xuICAgICAgdGhpcy5fX2lzRGlzY29ubmVjdGVkID0gZmFsc2VcbiAgICAgIHRoaXMucmVjb25uZWN0ZWQgJiYgdGhpcy5yZWNvbm5lY3RlZCgpXG4gICAgfVxuICB9XG4gIF9fZGlzY29ubmVjdGVkKCl7XG4gICAgdGhpcy5fX2lzRGlzY29ubmVjdGVkID0gdHJ1ZVxuICAgIHRoaXMuZGlzY29ubmVjdGVkICYmIHRoaXMuZGlzY29ubmVjdGVkKClcbiAgfVxuXG4gIHB1c2hFdmVudChldmVudCwgcGF5bG9hZCA9IHt9LCBvblJlcGx5ID0gZnVuY3Rpb24gKCl7IH0pe1xuICAgIHJldHVybiB0aGlzLl9fdmlldy5wdXNoSG9va0V2ZW50KG51bGwsIGV2ZW50LCBwYXlsb2FkLCBvblJlcGx5KVxuICB9XG5cbiAgcHVzaEV2ZW50VG8ocGh4VGFyZ2V0LCBldmVudCwgcGF5bG9hZCA9IHt9LCBvblJlcGx5ID0gZnVuY3Rpb24gKCl7IH0pe1xuICAgIHJldHVybiB0aGlzLl9fdmlldy53aXRoaW5UYXJnZXRzKHBoeFRhcmdldCwgKHZpZXcsIHRhcmdldEN0eCkgPT4ge1xuICAgICAgcmV0dXJuIHZpZXcucHVzaEhvb2tFdmVudCh0YXJnZXRDdHgsIGV2ZW50LCBwYXlsb2FkLCBvblJlcGx5KVxuICAgIH0pXG4gIH1cblxuICBoYW5kbGVFdmVudChldmVudCwgY2FsbGJhY2spe1xuICAgIGxldCBjYWxsYmFja1JlZiA9IChjdXN0b21FdmVudCwgYnlwYXNzKSA9PiBieXBhc3MgPyBldmVudCA6IGNhbGxiYWNrKGN1c3RvbUV2ZW50LmRldGFpbClcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihgcGh4Omhvb2s6JHtldmVudH1gLCBjYWxsYmFja1JlZilcbiAgICB0aGlzLl9fbGlzdGVuZXJzLmFkZChjYWxsYmFja1JlZilcbiAgICByZXR1cm4gY2FsbGJhY2tSZWZcbiAgfVxuXG4gIHJlbW92ZUhhbmRsZUV2ZW50KGNhbGxiYWNrUmVmKXtcbiAgICBsZXQgZXZlbnQgPSBjYWxsYmFja1JlZihudWxsLCB0cnVlKVxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGBwaHg6aG9vazoke2V2ZW50fWAsIGNhbGxiYWNrUmVmKVxuICAgIHRoaXMuX19saXN0ZW5lcnMuZGVsZXRlKGNhbGxiYWNrUmVmKVxuICB9XG5cbiAgdXBsb2FkKG5hbWUsIGZpbGVzKXtcbiAgICByZXR1cm4gdGhpcy5fX3ZpZXcuZGlzcGF0Y2hVcGxvYWRzKG5hbWUsIGZpbGVzKVxuICB9XG5cbiAgdXBsb2FkVG8ocGh4VGFyZ2V0LCBuYW1lLCBmaWxlcyl7XG4gICAgcmV0dXJuIHRoaXMuX192aWV3LndpdGhpblRhcmdldHMocGh4VGFyZ2V0LCB2aWV3ID0+IHZpZXcuZGlzcGF0Y2hVcGxvYWRzKG5hbWUsIGZpbGVzKSlcbiAgfVxuXG4gIF9fY2xlYW51cF9fKCl7XG4gICAgdGhpcy5fX2xpc3RlbmVycy5mb3JFYWNoKGNhbGxiYWNrUmVmID0+IHRoaXMucmVtb3ZlSGFuZGxlRXZlbnQoY2FsbGJhY2tSZWYpKVxuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgQkVGT1JFX1VOTE9BRF9MT0FERVJfVElNRU9VVCxcbiAgQ0hFQ0tBQkxFX0lOUFVUUyxcbiAgQ09OU0VDVVRJVkVfUkVMT0FEUyxcbiAgUEhYX0FVVE9fUkVDT1ZFUixcbiAgUEhYX0NPTVBPTkVOVCxcbiAgUEhYX0NPTk5FQ1RFRF9DTEFTUyxcbiAgUEhYX0RJU0FCTEVfV0lUSCxcbiAgUEhYX0RJU0FCTEVfV0lUSF9SRVNUT1JFLFxuICBQSFhfRElTQUJMRUQsXG4gIFBIWF9ESVNDT05ORUNURURfQ0xBU1MsXG4gIFBIWF9FVkVOVF9DTEFTU0VTLFxuICBQSFhfRVJST1JfQ0xBU1MsXG4gIFBIWF9GRUVEQkFDS19GT1IsXG4gIFBIWF9IQVNfU1VCTUlUVEVELFxuICBQSFhfSE9PSyxcbiAgUEhYX1BBR0VfTE9BRElORyxcbiAgUEhYX1BBUkVOVF9JRCxcbiAgUEhYX1BST0dSRVNTLFxuICBQSFhfUkVBRE9OTFksXG4gIFBIWF9SRUYsXG4gIFBIWF9ST09UX0lELFxuICBQSFhfU0VTU0lPTixcbiAgUEhYX1NUQVRJQyxcbiAgUEhYX1RSQUNLX1NUQVRJQyxcbiAgUEhYX1RSQUNLX1VQTE9BRFMsXG4gIFBIWF9VUERBVEUsXG4gIFBIWF9VUExPQURfUkVGLFxuICBQSFhfVklFV19TRUxFQ1RPUixcbiAgUFVTSF9USU1FT1VULFxufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQge1xuICBjbG9uZSxcbiAgY2xvc2VzdFBoeEJpbmRpbmcsXG4gIGlzRW1wdHksXG4gIGlzRXF1YWxPYmosXG4gIGxvZ0Vycm9yLFxuICBtYXliZSxcbiAgaXNDaWQsXG59IGZyb20gXCIuL3V0aWxzXCJcblxuaW1wb3J0IEJyb3dzZXIgZnJvbSBcIi4vYnJvd3NlclwiXG5pbXBvcnQgRE9NIGZyb20gXCIuL2RvbVwiXG5pbXBvcnQgRE9NUGF0Y2ggZnJvbSBcIi4vZG9tX3BhdGNoXCJcbmltcG9ydCBMaXZlVXBsb2FkZXIgZnJvbSBcIi4vbGl2ZV91cGxvYWRlclwiXG5pbXBvcnQgUmVuZGVyZWQgZnJvbSBcIi4vcmVuZGVyZWRcIlxuaW1wb3J0IFZpZXdIb29rIGZyb20gXCIuL3ZpZXdfaG9va1wiXG5cbmxldCBzZXJpYWxpemVGb3JtID0gKGZvcm0sIG1ldGEgPSB7fSkgPT4ge1xuICBsZXQgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSlcbiAgbGV0IHRvUmVtb3ZlID0gW11cblxuICBmb3JtRGF0YS5mb3JFYWNoKCh2YWwsIGtleSwgX2luZGV4KSA9PiB7XG4gICAgaWYodmFsIGluc3RhbmNlb2YgRmlsZSl7IHRvUmVtb3ZlLnB1c2goa2V5KSB9XG4gIH0pXG5cbiAgLy8gQ2xlYW51cCBhZnRlciBidWlsZGluZyBmaWxlRGF0YVxuICB0b1JlbW92ZS5mb3JFYWNoKGtleSA9PiBmb3JtRGF0YS5kZWxldGUoa2V5KSlcblxuICBsZXQgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpXG4gIGZvcihsZXQgW2tleSwgdmFsXSBvZiBmb3JtRGF0YS5lbnRyaWVzKCkpeyBwYXJhbXMuYXBwZW5kKGtleSwgdmFsKSB9XG4gIGZvcihsZXQgbWV0YUtleSBpbiBtZXRhKXsgcGFyYW1zLmFwcGVuZChtZXRhS2V5LCBtZXRhW21ldGFLZXldKSB9XG5cbiAgcmV0dXJuIHBhcmFtcy50b1N0cmluZygpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXcge1xuICBjb25zdHJ1Y3RvcihlbCwgbGl2ZVNvY2tldCwgcGFyZW50VmlldywgZmxhc2gpe1xuICAgIHRoaXMubGl2ZVNvY2tldCA9IGxpdmVTb2NrZXRcbiAgICB0aGlzLmZsYXNoID0gZmxhc2hcbiAgICB0aGlzLnBhcmVudCA9IHBhcmVudFZpZXdcbiAgICB0aGlzLnJvb3QgPSBwYXJlbnRWaWV3ID8gcGFyZW50Vmlldy5yb290IDogdGhpc1xuICAgIHRoaXMuZWwgPSBlbFxuICAgIHRoaXMuaWQgPSB0aGlzLmVsLmlkXG4gICAgdGhpcy5yZWYgPSAwXG4gICAgdGhpcy5jaGlsZEpvaW5zID0gMFxuICAgIHRoaXMubG9hZGVyVGltZXIgPSBudWxsXG4gICAgdGhpcy5wZW5kaW5nRGlmZnMgPSBbXVxuICAgIHRoaXMucHJ1bmluZ0NJRHMgPSBbXVxuICAgIHRoaXMucmVkaXJlY3QgPSBmYWxzZVxuICAgIHRoaXMuaHJlZiA9IG51bGxcbiAgICB0aGlzLmpvaW5Db3VudCA9IHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQuam9pbkNvdW50IC0gMSA6IDBcbiAgICB0aGlzLmpvaW5QZW5kaW5nID0gdHJ1ZVxuICAgIHRoaXMuZGVzdHJveWVkID0gZmFsc2VcbiAgICB0aGlzLmpvaW5DYWxsYmFjayA9IGZ1bmN0aW9uICgpeyB9XG4gICAgdGhpcy5zdG9wQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKXsgfVxuICAgIHRoaXMucGVuZGluZ0pvaW5PcHMgPSB0aGlzLnBhcmVudCA/IG51bGwgOiBbXVxuICAgIHRoaXMudmlld0hvb2tzID0ge31cbiAgICB0aGlzLnVwbG9hZGVycyA9IHt9XG4gICAgdGhpcy5mb3JtU3VibWl0cyA9IFtdXG4gICAgdGhpcy5jaGlsZHJlbiA9IHRoaXMucGFyZW50ID8gbnVsbCA6IHt9XG4gICAgdGhpcy5yb290LmNoaWxkcmVuW3RoaXMuaWRdID0ge31cbiAgICB0aGlzLmNoYW5uZWwgPSB0aGlzLmxpdmVTb2NrZXQuY2hhbm5lbChgbHY6JHt0aGlzLmlkfWAsICgpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlZGlyZWN0OiB0aGlzLnJlZGlyZWN0ID8gdGhpcy5ocmVmIDogdW5kZWZpbmVkLFxuICAgICAgICB1cmw6IHRoaXMucmVkaXJlY3QgPyB1bmRlZmluZWQgOiB0aGlzLmhyZWYgfHwgdW5kZWZpbmVkLFxuICAgICAgICBwYXJhbXM6IHRoaXMuY29ubmVjdFBhcmFtcygpLFxuICAgICAgICBzZXNzaW9uOiB0aGlzLmdldFNlc3Npb24oKSxcbiAgICAgICAgc3RhdGljOiB0aGlzLmdldFN0YXRpYygpLFxuICAgICAgICBmbGFzaDogdGhpcy5mbGFzaFxuICAgICAgfVxuICAgIH0pXG4gICAgdGhpcy5zaG93TG9hZGVyKHRoaXMubGl2ZVNvY2tldC5sb2FkZXJUaW1lb3V0KVxuICAgIHRoaXMuYmluZENoYW5uZWwoKVxuICB9XG5cbiAgc2V0SHJlZihocmVmKXsgdGhpcy5ocmVmID0gaHJlZiB9XG5cbiAgc2V0UmVkaXJlY3QoaHJlZil7XG4gICAgdGhpcy5yZWRpcmVjdCA9IHRydWVcbiAgICB0aGlzLmhyZWYgPSBocmVmXG4gIH1cblxuICBpc01haW4oKXsgcmV0dXJuIHRoaXMubGl2ZVNvY2tldC5tYWluID09PSB0aGlzIH1cblxuICBjb25uZWN0UGFyYW1zKCl7XG4gICAgbGV0IHBhcmFtcyA9IHRoaXMubGl2ZVNvY2tldC5wYXJhbXModGhpcy5lbClcbiAgICBsZXQgbWFuaWZlc3QgPVxuICAgICAgRE9NLmFsbChkb2N1bWVudCwgYFske3RoaXMuYmluZGluZyhQSFhfVFJBQ0tfU1RBVElDKX1dYClcbiAgICAgICAgLm1hcChub2RlID0+IG5vZGUuc3JjIHx8IG5vZGUuaHJlZikuZmlsdGVyKHVybCA9PiB0eXBlb2YgKHVybCkgPT09IFwic3RyaW5nXCIpXG5cbiAgICBpZihtYW5pZmVzdC5sZW5ndGggPiAwKXsgcGFyYW1zW1wiX3RyYWNrX3N0YXRpY1wiXSA9IG1hbmlmZXN0IH1cbiAgICBwYXJhbXNbXCJfbW91bnRzXCJdID0gdGhpcy5qb2luQ291bnRcblxuICAgIHJldHVybiBwYXJhbXNcbiAgfVxuXG4gIGlzQ29ubmVjdGVkKCl7IHJldHVybiB0aGlzLmNoYW5uZWwuY2FuUHVzaCgpIH1cblxuICBnZXRTZXNzaW9uKCl7IHJldHVybiB0aGlzLmVsLmdldEF0dHJpYnV0ZShQSFhfU0VTU0lPTikgfVxuXG4gIGdldFN0YXRpYygpe1xuICAgIGxldCB2YWwgPSB0aGlzLmVsLmdldEF0dHJpYnV0ZShQSFhfU1RBVElDKVxuICAgIHJldHVybiB2YWwgPT09IFwiXCIgPyBudWxsIDogdmFsXG4gIH1cblxuICBkZXN0cm95KGNhbGxiYWNrID0gZnVuY3Rpb24gKCl7IH0pe1xuICAgIHRoaXMuZGVzdHJveUFsbENoaWxkcmVuKClcbiAgICB0aGlzLmRlc3Ryb3llZCA9IHRydWVcbiAgICBkZWxldGUgdGhpcy5yb290LmNoaWxkcmVuW3RoaXMuaWRdXG4gICAgaWYodGhpcy5wYXJlbnQpeyBkZWxldGUgdGhpcy5yb290LmNoaWxkcmVuW3RoaXMucGFyZW50LmlkXVt0aGlzLmlkXSB9XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMubG9hZGVyVGltZXIpXG4gICAgbGV0IG9uRmluaXNoZWQgPSAoKSA9PiB7XG4gICAgICBjYWxsYmFjaygpXG4gICAgICBmb3IobGV0IGlkIGluIHRoaXMudmlld0hvb2tzKXtcbiAgICAgICAgdGhpcy5kZXN0cm95SG9vayh0aGlzLnZpZXdIb29rc1tpZF0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgRE9NLm1hcmtQaHhDaGlsZERlc3Ryb3llZCh0aGlzLmVsKVxuXG4gICAgdGhpcy5sb2coXCJkZXN0cm95ZWRcIiwgKCkgPT4gW1widGhlIGNoaWxkIGhhcyBiZWVuIHJlbW92ZWQgZnJvbSB0aGUgcGFyZW50XCJdKVxuICAgIHRoaXMuY2hhbm5lbC5sZWF2ZSgpXG4gICAgICAucmVjZWl2ZShcIm9rXCIsIG9uRmluaXNoZWQpXG4gICAgICAucmVjZWl2ZShcImVycm9yXCIsIG9uRmluaXNoZWQpXG4gICAgICAucmVjZWl2ZShcInRpbWVvdXRcIiwgb25GaW5pc2hlZClcbiAgfVxuXG4gIHNldENvbnRhaW5lckNsYXNzZXMoLi4uY2xhc3Nlcyl7XG4gICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKFxuICAgICAgUEhYX0NPTk5FQ1RFRF9DTEFTUyxcbiAgICAgIFBIWF9ESVNDT05ORUNURURfQ0xBU1MsXG4gICAgICBQSFhfRVJST1JfQ0xBU1NcbiAgICApXG4gICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXMpXG4gIH1cblxuICBpc0xvYWRpbmcoKXsgcmV0dXJuIHRoaXMuZWwuY2xhc3NMaXN0LmNvbnRhaW5zKFBIWF9ESVNDT05ORUNURURfQ0xBU1MpIH1cblxuICBzaG93TG9hZGVyKHRpbWVvdXQpe1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmxvYWRlclRpbWVyKVxuICAgIGlmKHRpbWVvdXQpe1xuICAgICAgdGhpcy5sb2FkZXJUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5zaG93TG9hZGVyKCksIHRpbWVvdXQpXG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcihsZXQgaWQgaW4gdGhpcy52aWV3SG9va3MpeyB0aGlzLnZpZXdIb29rc1tpZF0uX19kaXNjb25uZWN0ZWQoKSB9XG4gICAgICB0aGlzLnNldENvbnRhaW5lckNsYXNzZXMoUEhYX0RJU0NPTk5FQ1RFRF9DTEFTUylcbiAgICB9XG4gIH1cblxuICBoaWRlTG9hZGVyKCl7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMubG9hZGVyVGltZXIpXG4gICAgdGhpcy5zZXRDb250YWluZXJDbGFzc2VzKFBIWF9DT05ORUNURURfQ0xBU1MpXG4gIH1cblxuICB0cmlnZ2VyUmVjb25uZWN0ZWQoKXtcbiAgICBmb3IobGV0IGlkIGluIHRoaXMudmlld0hvb2tzKXsgdGhpcy52aWV3SG9va3NbaWRdLl9fcmVjb25uZWN0ZWQoKSB9XG4gIH1cblxuICBsb2coa2luZCwgbXNnQ2FsbGJhY2spe1xuICAgIHRoaXMubGl2ZVNvY2tldC5sb2codGhpcywga2luZCwgbXNnQ2FsbGJhY2spXG4gIH1cblxuICB3aXRoaW5UYXJnZXRzKHBoeFRhcmdldCwgY2FsbGJhY2spe1xuICAgIGlmKHBoeFRhcmdldCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KXtcbiAgICAgIHJldHVybiB0aGlzLmxpdmVTb2NrZXQub3duZXIocGh4VGFyZ2V0LCB2aWV3ID0+IGNhbGxiYWNrKHZpZXcsIHBoeFRhcmdldCkpXG4gICAgfVxuXG4gICAgaWYoL14oMHxbMS05XVxcZCopJC8udGVzdChwaHhUYXJnZXQpKXtcbiAgICAgIGxldCB0YXJnZXRzID0gRE9NLmZpbmRDb21wb25lbnROb2RlTGlzdCh0aGlzLmVsLCBwaHhUYXJnZXQpXG4gICAgICBpZih0YXJnZXRzLmxlbmd0aCA9PT0gMCl7XG4gICAgICAgIGxvZ0Vycm9yKGBubyBjb21wb25lbnQgZm91bmQgbWF0Y2hpbmcgcGh4LXRhcmdldCBvZiAke3BoeFRhcmdldH1gKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2sodGhpcywgdGFyZ2V0c1swXSlcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHRhcmdldHMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocGh4VGFyZ2V0KSlcbiAgICAgIGlmKHRhcmdldHMubGVuZ3RoID09PSAwKXsgbG9nRXJyb3IoYG5vdGhpbmcgZm91bmQgbWF0Y2hpbmcgdGhlIHBoeC10YXJnZXQgc2VsZWN0b3IgXCIke3BoeFRhcmdldH1cImApIH1cbiAgICAgIHRhcmdldHMuZm9yRWFjaCh0YXJnZXQgPT4gdGhpcy5saXZlU29ja2V0Lm93bmVyKHRhcmdldCwgdmlldyA9PiBjYWxsYmFjayh2aWV3LCB0YXJnZXQpKSlcbiAgICB9XG4gIH1cblxuICBhcHBseURpZmYodHlwZSwgcmF3RGlmZiwgY2FsbGJhY2spe1xuICAgIHRoaXMubG9nKHR5cGUsICgpID0+IFtcIlwiLCBjbG9uZShyYXdEaWZmKV0pXG4gICAgbGV0IHtkaWZmLCByZXBseSwgZXZlbnRzLCB0aXRsZX0gPSBSZW5kZXJlZC5leHRyYWN0KHJhd0RpZmYpXG4gICAgaWYodGl0bGUpeyBET00ucHV0VGl0bGUodGl0bGUpIH1cblxuICAgIGNhbGxiYWNrKHtkaWZmLCByZXBseSwgZXZlbnRzfSlcbiAgICByZXR1cm4gcmVwbHlcbiAgfVxuXG4gIG9uSm9pbihyZXNwKXtcbiAgICBsZXQge3JlbmRlcmVkLCBjb250YWluZXJ9ID0gcmVzcFxuICAgIGlmKGNvbnRhaW5lcil7XG4gICAgICBsZXQgW3RhZywgYXR0cnNdID0gY29udGFpbmVyXG4gICAgICB0aGlzLmVsID0gRE9NLnJlcGxhY2VSb290Q29udGFpbmVyKHRoaXMuZWwsIHRhZywgYXR0cnMpXG4gICAgfVxuICAgIHRoaXMuY2hpbGRKb2lucyA9IDBcbiAgICB0aGlzLmpvaW5QZW5kaW5nID0gdHJ1ZVxuICAgIHRoaXMuZmxhc2ggPSBudWxsXG5cbiAgICBCcm93c2VyLmRyb3BMb2NhbCh0aGlzLmxpdmVTb2NrZXQubG9jYWxTdG9yYWdlLCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsIENPTlNFQ1VUSVZFX1JFTE9BRFMpXG4gICAgdGhpcy5hcHBseURpZmYoXCJtb3VudFwiLCByZW5kZXJlZCwgKHtkaWZmLCBldmVudHN9KSA9PiB7XG4gICAgICB0aGlzLnJlbmRlcmVkID0gbmV3IFJlbmRlcmVkKHRoaXMuaWQsIGRpZmYpXG4gICAgICBsZXQgaHRtbCA9IHRoaXMucmVuZGVyQ29udGFpbmVyKG51bGwsIFwiam9pblwiKVxuICAgICAgdGhpcy5kcm9wUGVuZGluZ1JlZnMoKVxuICAgICAgbGV0IGZvcm1zID0gdGhpcy5mb3Jtc0ZvclJlY292ZXJ5KGh0bWwpXG4gICAgICB0aGlzLmpvaW5Db3VudCsrXG5cbiAgICAgIGlmKGZvcm1zLmxlbmd0aCA+IDApe1xuICAgICAgICBmb3Jtcy5mb3JFYWNoKChbZm9ybSwgbmV3Rm9ybSwgbmV3Q2lkXSwgaSkgPT4ge1xuICAgICAgICAgIHRoaXMucHVzaEZvcm1SZWNvdmVyeShmb3JtLCBuZXdDaWQsIHJlc3AgPT4ge1xuICAgICAgICAgICAgaWYoaSA9PT0gZm9ybXMubGVuZ3RoIC0gMSl7XG4gICAgICAgICAgICAgIHRoaXMub25Kb2luQ29tcGxldGUocmVzcCwgaHRtbCwgZXZlbnRzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9uSm9pbkNvbXBsZXRlKHJlc3AsIGh0bWwsIGV2ZW50cylcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZHJvcFBlbmRpbmdSZWZzKCl7IERPTS5hbGwodGhpcy5lbCwgYFske1BIWF9SRUZ9XWAsIGVsID0+IGVsLnJlbW92ZUF0dHJpYnV0ZShQSFhfUkVGKSkgfVxuXG4gIG9uSm9pbkNvbXBsZXRlKHtsaXZlX3BhdGNofSwgaHRtbCwgZXZlbnRzKXtcbiAgICAvLyBJbiBvcmRlciB0byBwcm92aWRlIGEgYmV0dGVyIGV4cGVyaWVuY2UsIHdlIHdhbnQgdG8gam9pblxuICAgIC8vIGFsbCBMaXZlVmlld3MgZmlyc3QgYW5kIG9ubHkgdGhlbiBhcHBseSB0aGVpciBwYXRjaGVzLlxuICAgIGlmKHRoaXMuam9pbkNvdW50ID4gMSB8fCAodGhpcy5wYXJlbnQgJiYgIXRoaXMucGFyZW50LmlzSm9pblBlbmRpbmcoKSkpe1xuICAgICAgcmV0dXJuIHRoaXMuYXBwbHlKb2luUGF0Y2gobGl2ZV9wYXRjaCwgaHRtbCwgZXZlbnRzKVxuICAgIH1cblxuICAgIC8vIE9uZSBkb3duc2lkZSBvZiB0aGlzIGFwcHJvYWNoIGlzIHRoYXQgd2UgbmVlZCB0byBmaW5kIHBoeENoaWxkcmVuXG4gICAgLy8gaW4gdGhlIGh0bWwgZnJhZ21lbnQsIGluc3RlYWQgb2YgZGlyZWN0bHkgb24gdGhlIERPTS4gVGhlIGZyYWdtZW50XG4gICAgLy8gYWxzbyBkb2VzIG5vdCBpbmNsdWRlIFBIWF9TVEFUSUMsIHNvIHdlIG5lZWQgdG8gY29weSBpdCBvdmVyIGZyb21cbiAgICAvLyB0aGUgRE9NLlxuICAgIGxldCBuZXdDaGlsZHJlbiA9IERPTS5maW5kUGh4Q2hpbGRyZW5JbkZyYWdtZW50KGh0bWwsIHRoaXMuaWQpLmZpbHRlcih0b0VsID0+IHtcbiAgICAgIGxldCBmcm9tRWwgPSB0b0VsLmlkICYmIHRoaXMuZWwucXVlcnlTZWxlY3RvcihgW2lkPVwiJHt0b0VsLmlkfVwiXWApXG4gICAgICBsZXQgcGh4U3RhdGljID0gZnJvbUVsICYmIGZyb21FbC5nZXRBdHRyaWJ1dGUoUEhYX1NUQVRJQylcbiAgICAgIGlmKHBoeFN0YXRpYyl7IHRvRWwuc2V0QXR0cmlidXRlKFBIWF9TVEFUSUMsIHBoeFN0YXRpYykgfVxuICAgICAgcmV0dXJuIHRoaXMuam9pbkNoaWxkKHRvRWwpXG4gICAgfSlcblxuICAgIGlmKG5ld0NoaWxkcmVuLmxlbmd0aCA9PT0gMCl7XG4gICAgICBpZih0aGlzLnBhcmVudCl7XG4gICAgICAgIHRoaXMucm9vdC5wZW5kaW5nSm9pbk9wcy5wdXNoKFt0aGlzLCAoKSA9PiB0aGlzLmFwcGx5Sm9pblBhdGNoKGxpdmVfcGF0Y2gsIGh0bWwsIGV2ZW50cyldKVxuICAgICAgICB0aGlzLnBhcmVudC5hY2tKb2luKHRoaXMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9uQWxsQ2hpbGRKb2luc0NvbXBsZXRlKClcbiAgICAgICAgdGhpcy5hcHBseUpvaW5QYXRjaChsaXZlX3BhdGNoLCBodG1sLCBldmVudHMpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucm9vdC5wZW5kaW5nSm9pbk9wcy5wdXNoKFt0aGlzLCAoKSA9PiB0aGlzLmFwcGx5Sm9pblBhdGNoKGxpdmVfcGF0Y2gsIGh0bWwsIGV2ZW50cyldKVxuICAgIH1cbiAgfVxuXG4gIGF0dGFjaFRydWVEb2NFbCgpe1xuICAgIHRoaXMuZWwgPSBET00uYnlJZCh0aGlzLmlkKVxuICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKFBIWF9ST09UX0lELCB0aGlzLnJvb3QuaWQpXG4gIH1cblxuICBkaXNwYXRjaEV2ZW50cyhldmVudHMpe1xuICAgIGV2ZW50cy5mb3JFYWNoKChbZXZlbnQsIHBheWxvYWRdKSA9PiB7XG4gICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoYHBoeDpob29rOiR7ZXZlbnR9YCwge2RldGFpbDogcGF5bG9hZH0pKVxuICAgIH0pXG4gIH1cblxuICBhcHBseUpvaW5QYXRjaChsaXZlX3BhdGNoLCBodG1sLCBldmVudHMpe1xuICAgIHRoaXMuYXR0YWNoVHJ1ZURvY0VsKClcbiAgICBsZXQgcGF0Y2ggPSBuZXcgRE9NUGF0Y2godGhpcywgdGhpcy5lbCwgdGhpcy5pZCwgaHRtbCwgbnVsbClcbiAgICBwYXRjaC5tYXJrUHJ1bmFibGVDb250ZW50Rm9yUmVtb3ZhbCgpXG4gICAgdGhpcy5wZXJmb3JtUGF0Y2gocGF0Y2gsIGZhbHNlKVxuICAgIHRoaXMuam9pbk5ld0NoaWxkcmVuKClcbiAgICBET00uYWxsKHRoaXMuZWwsIGBbJHt0aGlzLmJpbmRpbmcoUEhYX0hPT0spfV0sIFtkYXRhLXBoeC0ke1BIWF9IT09LfV1gLCBob29rRWwgPT4ge1xuICAgICAgbGV0IGhvb2sgPSB0aGlzLmFkZEhvb2soaG9va0VsKVxuICAgICAgaWYoaG9vayl7IGhvb2suX19tb3VudGVkKCkgfVxuICAgIH0pXG5cbiAgICB0aGlzLmpvaW5QZW5kaW5nID0gZmFsc2VcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnRzKGV2ZW50cylcbiAgICB0aGlzLmFwcGx5UGVuZGluZ1VwZGF0ZXMoKVxuXG4gICAgaWYobGl2ZV9wYXRjaCl7XG4gICAgICBsZXQge2tpbmQsIHRvfSA9IGxpdmVfcGF0Y2hcbiAgICAgIHRoaXMubGl2ZVNvY2tldC5oaXN0b3J5UGF0Y2godG8sIGtpbmQpXG4gICAgfVxuICAgIHRoaXMuaGlkZUxvYWRlcigpXG4gICAgaWYodGhpcy5qb2luQ291bnQgPiAxKXsgdGhpcy50cmlnZ2VyUmVjb25uZWN0ZWQoKSB9XG4gICAgdGhpcy5zdG9wQ2FsbGJhY2soKVxuICB9XG5cbiAgdHJpZ2dlckJlZm9yZVVwZGF0ZUhvb2soZnJvbUVsLCB0b0VsKXtcbiAgICB0aGlzLmxpdmVTb2NrZXQudHJpZ2dlckRPTShcIm9uQmVmb3JlRWxVcGRhdGVkXCIsIFtmcm9tRWwsIHRvRWxdKVxuICAgIGxldCBob29rID0gdGhpcy5nZXRIb29rKGZyb21FbClcbiAgICBsZXQgaXNJZ25vcmVkID0gaG9vayAmJiBET00uaXNJZ25vcmVkKGZyb21FbCwgdGhpcy5iaW5kaW5nKFBIWF9VUERBVEUpKVxuICAgIGlmKGhvb2sgJiYgIWZyb21FbC5pc0VxdWFsTm9kZSh0b0VsKSAmJiAhKGlzSWdub3JlZCAmJiBpc0VxdWFsT2JqKGZyb21FbC5kYXRhc2V0LCB0b0VsLmRhdGFzZXQpKSl7XG4gICAgICBob29rLl9fYmVmb3JlVXBkYXRlKClcbiAgICAgIHJldHVybiBob29rXG4gICAgfVxuICB9XG5cbiAgcGVyZm9ybVBhdGNoKHBhdGNoLCBwcnVuZUNpZHMpe1xuICAgIGxldCBkZXN0cm95ZWRDSURzID0gW11cbiAgICBsZXQgcGh4Q2hpbGRyZW5BZGRlZCA9IGZhbHNlXG4gICAgbGV0IHVwZGF0ZWRIb29rSWRzID0gbmV3IFNldCgpXG5cbiAgICBwYXRjaC5hZnRlcihcImFkZGVkXCIsIGVsID0+IHtcbiAgICAgIHRoaXMubGl2ZVNvY2tldC50cmlnZ2VyRE9NKFwib25Ob2RlQWRkZWRcIiwgW2VsXSlcblxuICAgICAgbGV0IG5ld0hvb2sgPSB0aGlzLmFkZEhvb2soZWwpXG4gICAgICBpZihuZXdIb29rKXsgbmV3SG9vay5fX21vdW50ZWQoKSB9XG4gICAgfSlcblxuICAgIHBhdGNoLmFmdGVyKFwicGh4Q2hpbGRBZGRlZFwiLCBfZWwgPT4gcGh4Q2hpbGRyZW5BZGRlZCA9IHRydWUpXG5cbiAgICBwYXRjaC5iZWZvcmUoXCJ1cGRhdGVkXCIsIChmcm9tRWwsIHRvRWwpID0+IHtcbiAgICAgIGxldCBob29rID0gdGhpcy50cmlnZ2VyQmVmb3JlVXBkYXRlSG9vayhmcm9tRWwsIHRvRWwpXG4gICAgICBpZihob29rKXsgdXBkYXRlZEhvb2tJZHMuYWRkKGZyb21FbC5pZCkgfVxuICAgIH0pXG5cbiAgICBwYXRjaC5hZnRlcihcInVwZGF0ZWRcIiwgZWwgPT4ge1xuICAgICAgaWYodXBkYXRlZEhvb2tJZHMuaGFzKGVsLmlkKSl7IHRoaXMuZ2V0SG9vayhlbCkuX191cGRhdGVkKCkgfVxuICAgIH0pXG5cbiAgICBwYXRjaC5hZnRlcihcImRpc2NhcmRlZFwiLCAoZWwpID0+IHtcbiAgICAgIGxldCBjaWQgPSB0aGlzLmNvbXBvbmVudElEKGVsKVxuICAgICAgaWYoaXNDaWQoY2lkKSAmJiBkZXN0cm95ZWRDSURzLmluZGV4T2YoY2lkKSA9PT0gLTEpeyBkZXN0cm95ZWRDSURzLnB1c2goY2lkKSB9XG4gICAgICBsZXQgaG9vayA9IHRoaXMuZ2V0SG9vayhlbClcbiAgICAgIGhvb2sgJiYgdGhpcy5kZXN0cm95SG9vayhob29rKVxuICAgIH0pXG5cbiAgICBwYXRjaC5wZXJmb3JtKClcblxuICAgIC8vIFdlIHNob3VsZCBub3QgcHJ1bmVDaWRzIG9uIGpvaW5zLiBPdGhlcndpc2UsIGluIGNhc2Ugb2ZcbiAgICAvLyByZWpvaW5zLCB3ZSBtYXkgbm90aWZ5IGNpZHMgdGhhdCBubyBsb25nZXIgYmVsb25nIHRvIHRoZVxuICAgIC8vIGN1cnJlbnQgTGl2ZVZpZXcgdG8gYmUgcmVtb3ZlZC5cbiAgICBpZihwcnVuZUNpZHMpe1xuICAgICAgdGhpcy5tYXliZVB1c2hDb21wb25lbnRzRGVzdHJveWVkKGRlc3Ryb3llZENJRHMpXG4gICAgfVxuXG4gICAgcmV0dXJuIHBoeENoaWxkcmVuQWRkZWRcbiAgfVxuXG4gIGpvaW5OZXdDaGlsZHJlbigpe1xuICAgIERPTS5maW5kUGh4Q2hpbGRyZW4odGhpcy5lbCwgdGhpcy5pZCkuZm9yRWFjaChlbCA9PiB0aGlzLmpvaW5DaGlsZChlbCkpXG4gIH1cblxuICBnZXRDaGlsZEJ5SWQoaWQpeyByZXR1cm4gdGhpcy5yb290LmNoaWxkcmVuW3RoaXMuaWRdW2lkXSB9XG5cbiAgZ2V0RGVzY2VuZGVudEJ5RWwoZWwpe1xuICAgIGlmKGVsLmlkID09PSB0aGlzLmlkKXtcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuW2VsLmdldEF0dHJpYnV0ZShQSFhfUEFSRU5UX0lEKV1bZWwuaWRdXG4gICAgfVxuICB9XG5cbiAgZGVzdHJveURlc2NlbmRlbnQoaWQpe1xuICAgIGZvcihsZXQgcGFyZW50SWQgaW4gdGhpcy5yb290LmNoaWxkcmVuKXtcbiAgICAgIGZvcihsZXQgY2hpbGRJZCBpbiB0aGlzLnJvb3QuY2hpbGRyZW5bcGFyZW50SWRdKXtcbiAgICAgICAgaWYoY2hpbGRJZCA9PT0gaWQpeyByZXR1cm4gdGhpcy5yb290LmNoaWxkcmVuW3BhcmVudElkXVtjaGlsZElkXS5kZXN0cm95KCkgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGpvaW5DaGlsZChlbCl7XG4gICAgbGV0IGNoaWxkID0gdGhpcy5nZXRDaGlsZEJ5SWQoZWwuaWQpXG4gICAgaWYoIWNoaWxkKXtcbiAgICAgIGxldCB2aWV3ID0gbmV3IFZpZXcoZWwsIHRoaXMubGl2ZVNvY2tldCwgdGhpcylcbiAgICAgIHRoaXMucm9vdC5jaGlsZHJlblt0aGlzLmlkXVt2aWV3LmlkXSA9IHZpZXdcbiAgICAgIHZpZXcuam9pbigpXG4gICAgICB0aGlzLmNoaWxkSm9pbnMrK1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cblxuICBpc0pvaW5QZW5kaW5nKCl7IHJldHVybiB0aGlzLmpvaW5QZW5kaW5nIH1cblxuICBhY2tKb2luKF9jaGlsZCl7XG4gICAgdGhpcy5jaGlsZEpvaW5zLS1cblxuICAgIGlmKHRoaXMuY2hpbGRKb2lucyA9PT0gMCl7XG4gICAgICBpZih0aGlzLnBhcmVudCl7XG4gICAgICAgIHRoaXMucGFyZW50LmFja0pvaW4odGhpcylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub25BbGxDaGlsZEpvaW5zQ29tcGxldGUoKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uQWxsQ2hpbGRKb2luc0NvbXBsZXRlKCl7XG4gICAgdGhpcy5qb2luQ2FsbGJhY2soKVxuICAgIHRoaXMucGVuZGluZ0pvaW5PcHMuZm9yRWFjaCgoW3ZpZXcsIG9wXSkgPT4ge1xuICAgICAgaWYoIXZpZXcuaXNEZXN0cm95ZWQoKSl7IG9wKCkgfVxuICAgIH0pXG4gICAgdGhpcy5wZW5kaW5nSm9pbk9wcyA9IFtdXG4gIH1cblxuICB1cGRhdGUoZGlmZiwgZXZlbnRzKXtcbiAgICBpZih0aGlzLmlzSm9pblBlbmRpbmcoKSB8fCB0aGlzLmxpdmVTb2NrZXQuaGFzUGVuZGluZ0xpbmsoKSl7XG4gICAgICByZXR1cm4gdGhpcy5wZW5kaW5nRGlmZnMucHVzaCh7ZGlmZiwgZXZlbnRzfSlcbiAgICB9XG5cbiAgICB0aGlzLnJlbmRlcmVkLm1lcmdlRGlmZihkaWZmKVxuICAgIGxldCBwaHhDaGlsZHJlbkFkZGVkID0gZmFsc2VcblxuICAgIC8vIFdoZW4gdGhlIGRpZmYgb25seSBjb250YWlucyBjb21wb25lbnQgZGlmZnMsIHRoZW4gd2FsayBjb21wb25lbnRzXG4gICAgLy8gYW5kIHBhdGNoIG9ubHkgdGhlIHBhcmVudCBjb21wb25lbnQgY29udGFpbmVycyBmb3VuZCBpbiB0aGUgZGlmZi5cbiAgICAvLyBPdGhlcndpc2UsIHBhdGNoIGVudGlyZSBMViBjb250YWluZXIuXG4gICAgaWYodGhpcy5yZW5kZXJlZC5pc0NvbXBvbmVudE9ubHlEaWZmKGRpZmYpKXtcbiAgICAgIHRoaXMubGl2ZVNvY2tldC50aW1lKFwiY29tcG9uZW50IHBhdGNoIGNvbXBsZXRlXCIsICgpID0+IHtcbiAgICAgICAgbGV0IHBhcmVudENpZHMgPSBET00uZmluZFBhcmVudENJRHModGhpcy5lbCwgdGhpcy5yZW5kZXJlZC5jb21wb25lbnRDSURzKGRpZmYpKVxuICAgICAgICBwYXJlbnRDaWRzLmZvckVhY2gocGFyZW50Q0lEID0+IHtcbiAgICAgICAgICBpZih0aGlzLmNvbXBvbmVudFBhdGNoKHRoaXMucmVuZGVyZWQuZ2V0Q29tcG9uZW50KGRpZmYsIHBhcmVudENJRCksIHBhcmVudENJRCkpeyBwaHhDaGlsZHJlbkFkZGVkID0gdHJ1ZSB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0gZWxzZSBpZighaXNFbXB0eShkaWZmKSl7XG4gICAgICB0aGlzLmxpdmVTb2NrZXQudGltZShcImZ1bGwgcGF0Y2ggY29tcGxldGVcIiwgKCkgPT4ge1xuICAgICAgICBsZXQgaHRtbCA9IHRoaXMucmVuZGVyQ29udGFpbmVyKGRpZmYsIFwidXBkYXRlXCIpXG4gICAgICAgIGxldCBwYXRjaCA9IG5ldyBET01QYXRjaCh0aGlzLCB0aGlzLmVsLCB0aGlzLmlkLCBodG1sLCBudWxsKVxuICAgICAgICBwaHhDaGlsZHJlbkFkZGVkID0gdGhpcy5wZXJmb3JtUGF0Y2gocGF0Y2gsIHRydWUpXG4gICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMuZGlzcGF0Y2hFdmVudHMoZXZlbnRzKVxuICAgIGlmKHBoeENoaWxkcmVuQWRkZWQpeyB0aGlzLmpvaW5OZXdDaGlsZHJlbigpIH1cbiAgfVxuXG4gIHJlbmRlckNvbnRhaW5lcihkaWZmLCBraW5kKXtcbiAgICByZXR1cm4gdGhpcy5saXZlU29ja2V0LnRpbWUoYHRvU3RyaW5nIGRpZmYgKCR7a2luZH0pYCwgKCkgPT4ge1xuICAgICAgbGV0IHRhZyA9IHRoaXMuZWwudGFnTmFtZVxuICAgICAgLy8gRG9uJ3Qgc2tpcCBhbnkgY29tcG9uZW50IGluIHRoZSBkaWZmIG5vciBhbnkgbWFya2VkIGFzIHBydW5lZFxuICAgICAgLy8gKGFzIHRoZXkgbWF5IGhhdmUgYmVlbiBhZGRlZCBiYWNrKVxuICAgICAgbGV0IGNpZHMgPSBkaWZmID8gdGhpcy5yZW5kZXJlZC5jb21wb25lbnRDSURzKGRpZmYpLmNvbmNhdCh0aGlzLnBydW5pbmdDSURzKSA6IG51bGxcbiAgICAgIGxldCBodG1sID0gdGhpcy5yZW5kZXJlZC50b1N0cmluZyhjaWRzKVxuICAgICAgcmV0dXJuIGA8JHt0YWd9PiR7aHRtbH08LyR7dGFnfT5gXG4gICAgfSlcbiAgfVxuXG4gIGNvbXBvbmVudFBhdGNoKGRpZmYsIGNpZCl7XG4gICAgaWYoaXNFbXB0eShkaWZmKSkgcmV0dXJuIGZhbHNlXG4gICAgbGV0IGh0bWwgPSB0aGlzLnJlbmRlcmVkLmNvbXBvbmVudFRvU3RyaW5nKGNpZClcbiAgICBsZXQgcGF0Y2ggPSBuZXcgRE9NUGF0Y2godGhpcywgdGhpcy5lbCwgdGhpcy5pZCwgaHRtbCwgY2lkKVxuICAgIGxldCBjaGlsZHJlbkFkZGVkID0gdGhpcy5wZXJmb3JtUGF0Y2gocGF0Y2gsIHRydWUpXG4gICAgcmV0dXJuIGNoaWxkcmVuQWRkZWRcbiAgfVxuXG4gIGdldEhvb2soZWwpeyByZXR1cm4gdGhpcy52aWV3SG9va3NbVmlld0hvb2suZWxlbWVudElEKGVsKV0gfVxuXG4gIGFkZEhvb2soZWwpe1xuICAgIGlmKFZpZXdIb29rLmVsZW1lbnRJRChlbCkgfHwgIWVsLmdldEF0dHJpYnV0ZSl7IHJldHVybiB9XG4gICAgbGV0IGhvb2tOYW1lID0gZWwuZ2V0QXR0cmlidXRlKGBkYXRhLXBoeC0ke1BIWF9IT09LfWApIHx8IGVsLmdldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoUEhYX0hPT0spKVxuICAgIGlmKGhvb2tOYW1lICYmICF0aGlzLm93bnNFbGVtZW50KGVsKSl7IHJldHVybiB9XG4gICAgbGV0IGNhbGxiYWNrcyA9IHRoaXMubGl2ZVNvY2tldC5nZXRIb29rQ2FsbGJhY2tzKGhvb2tOYW1lKVxuXG4gICAgaWYoY2FsbGJhY2tzKXtcbiAgICAgIGlmKCFlbC5pZCl7IGxvZ0Vycm9yKGBubyBET00gSUQgZm9yIGhvb2sgXCIke2hvb2tOYW1lfVwiLiBIb29rcyByZXF1aXJlIGEgdW5pcXVlIElEIG9uIGVhY2ggZWxlbWVudC5gLCBlbCkgfVxuICAgICAgbGV0IGhvb2sgPSBuZXcgVmlld0hvb2sodGhpcywgZWwsIGNhbGxiYWNrcylcbiAgICAgIHRoaXMudmlld0hvb2tzW1ZpZXdIb29rLmVsZW1lbnRJRChob29rLmVsKV0gPSBob29rXG4gICAgICByZXR1cm4gaG9va1xuICAgIH0gZWxzZSBpZihob29rTmFtZSAhPT0gbnVsbCl7XG4gICAgICBsb2dFcnJvcihgdW5rbm93biBob29rIGZvdW5kIGZvciBcIiR7aG9va05hbWV9XCJgLCBlbClcbiAgICB9XG4gIH1cblxuICBkZXN0cm95SG9vayhob29rKXtcbiAgICBob29rLl9fZGVzdHJveWVkKClcbiAgICBob29rLl9fY2xlYW51cF9fKClcbiAgICBkZWxldGUgdGhpcy52aWV3SG9va3NbVmlld0hvb2suZWxlbWVudElEKGhvb2suZWwpXVxuICB9XG5cbiAgYXBwbHlQZW5kaW5nVXBkYXRlcygpe1xuICAgIHRoaXMucGVuZGluZ0RpZmZzLmZvckVhY2goKHtkaWZmLCBldmVudHN9KSA9PiB0aGlzLnVwZGF0ZShkaWZmLCBldmVudHMpKVxuICAgIHRoaXMucGVuZGluZ0RpZmZzID0gW11cbiAgfVxuXG4gIG9uQ2hhbm5lbChldmVudCwgY2Ipe1xuICAgIHRoaXMubGl2ZVNvY2tldC5vbkNoYW5uZWwodGhpcy5jaGFubmVsLCBldmVudCwgcmVzcCA9PiB7XG4gICAgICBpZih0aGlzLmlzSm9pblBlbmRpbmcoKSl7XG4gICAgICAgIHRoaXMucm9vdC5wZW5kaW5nSm9pbk9wcy5wdXNoKFt0aGlzLCAoKSA9PiBjYihyZXNwKV0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYihyZXNwKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBiaW5kQ2hhbm5lbCgpe1xuICAgIC8vIFRoZSBkaWZmIGV2ZW50IHNob3VsZCBiZSBoYW5kbGVkIGJ5IHRoZSByZWd1bGFyIHVwZGF0ZSBvcGVyYXRpb25zLlxuICAgIC8vIEFsbCBvdGhlciBvcGVyYXRpb25zIGFyZSBxdWV1ZWQgdG8gYmUgYXBwbGllZCBvbmx5IGFmdGVyIGpvaW4uXG4gICAgdGhpcy5saXZlU29ja2V0Lm9uQ2hhbm5lbCh0aGlzLmNoYW5uZWwsIFwiZGlmZlwiLCAocmF3RGlmZikgPT4ge1xuICAgICAgdGhpcy5hcHBseURpZmYoXCJ1cGRhdGVcIiwgcmF3RGlmZiwgKHtkaWZmLCBldmVudHN9KSA9PiB0aGlzLnVwZGF0ZShkaWZmLCBldmVudHMpKVxuICAgIH0pXG4gICAgdGhpcy5vbkNoYW5uZWwoXCJyZWRpcmVjdFwiLCAoe3RvLCBmbGFzaH0pID0+IHRoaXMub25SZWRpcmVjdCh7dG8sIGZsYXNofSkpXG4gICAgdGhpcy5vbkNoYW5uZWwoXCJsaXZlX3BhdGNoXCIsIChyZWRpcikgPT4gdGhpcy5vbkxpdmVQYXRjaChyZWRpcikpXG4gICAgdGhpcy5vbkNoYW5uZWwoXCJsaXZlX3JlZGlyZWN0XCIsIChyZWRpcikgPT4gdGhpcy5vbkxpdmVSZWRpcmVjdChyZWRpcikpXG4gICAgdGhpcy5jaGFubmVsLm9uRXJyb3IocmVhc29uID0+IHRoaXMub25FcnJvcihyZWFzb24pKVxuICAgIHRoaXMuY2hhbm5lbC5vbkNsb3NlKHJlYXNvbiA9PiB0aGlzLm9uQ2xvc2UocmVhc29uKSlcbiAgfVxuXG4gIGRlc3Ryb3lBbGxDaGlsZHJlbigpe1xuICAgIGZvcihsZXQgaWQgaW4gdGhpcy5yb290LmNoaWxkcmVuW3RoaXMuaWRdKXtcbiAgICAgIHRoaXMuZ2V0Q2hpbGRCeUlkKGlkKS5kZXN0cm95KClcbiAgICB9XG4gIH1cblxuICBvbkxpdmVSZWRpcmVjdChyZWRpcil7XG4gICAgbGV0IHt0bywga2luZCwgZmxhc2h9ID0gcmVkaXJcbiAgICBsZXQgdXJsID0gdGhpcy5leHBhbmRVUkwodG8pXG4gICAgdGhpcy5saXZlU29ja2V0Lmhpc3RvcnlSZWRpcmVjdCh1cmwsIGtpbmQsIGZsYXNoKVxuICB9XG5cbiAgb25MaXZlUGF0Y2gocmVkaXIpe1xuICAgIGxldCB7dG8sIGtpbmR9ID0gcmVkaXJcbiAgICB0aGlzLmhyZWYgPSB0aGlzLmV4cGFuZFVSTCh0bylcbiAgICB0aGlzLmxpdmVTb2NrZXQuaGlzdG9yeVBhdGNoKHRvLCBraW5kKVxuICB9XG5cbiAgZXhwYW5kVVJMKHRvKXtcbiAgICByZXR1cm4gdG8uc3RhcnRzV2l0aChcIi9cIikgPyBgJHt3aW5kb3cubG9jYXRpb24ucHJvdG9jb2x9Ly8ke3dpbmRvdy5sb2NhdGlvbi5ob3N0fSR7dG99YCA6IHRvXG4gIH1cblxuICBvblJlZGlyZWN0KHt0bywgZmxhc2h9KXsgdGhpcy5saXZlU29ja2V0LnJlZGlyZWN0KHRvLCBmbGFzaCkgfVxuXG4gIGlzRGVzdHJveWVkKCl7IHJldHVybiB0aGlzLmRlc3Ryb3llZCB9XG5cbiAgam9pbihjYWxsYmFjayl7XG4gICAgaWYoIXRoaXMucGFyZW50KXtcbiAgICAgIHRoaXMuc3RvcENhbGxiYWNrID0gdGhpcy5saXZlU29ja2V0LndpdGhQYWdlTG9hZGluZyh7dG86IHRoaXMuaHJlZiwga2luZDogXCJpbml0aWFsXCJ9KVxuICAgIH1cbiAgICB0aGlzLmpvaW5DYWxsYmFjayA9ICgpID0+IGNhbGxiYWNrICYmIGNhbGxiYWNrKHRoaXMuam9pbkNvdW50KVxuICAgIHRoaXMubGl2ZVNvY2tldC53cmFwUHVzaCh0aGlzLCB7dGltZW91dDogZmFsc2V9LCAoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5jaGFubmVsLmpvaW4oKVxuICAgICAgICAucmVjZWl2ZShcIm9rXCIsIGRhdGEgPT4gIXRoaXMuaXNEZXN0cm95ZWQoKSAmJiB0aGlzLm9uSm9pbihkYXRhKSlcbiAgICAgICAgLnJlY2VpdmUoXCJlcnJvclwiLCByZXNwID0+ICF0aGlzLmlzRGVzdHJveWVkKCkgJiYgdGhpcy5vbkpvaW5FcnJvcihyZXNwKSlcbiAgICAgICAgLnJlY2VpdmUoXCJ0aW1lb3V0XCIsICgpID0+ICF0aGlzLmlzRGVzdHJveWVkKCkgJiYgdGhpcy5vbkpvaW5FcnJvcih7cmVhc29uOiBcInRpbWVvdXRcIn0pKVxuICAgIH0pXG4gIH1cblxuICBvbkpvaW5FcnJvcihyZXNwKXtcbiAgICBpZihyZXNwLnJlYXNvbiA9PT0gXCJ1bmF1dGhvcml6ZWRcIiB8fCByZXNwLnJlYXNvbiA9PT0gXCJzdGFsZVwiKXtcbiAgICAgIHRoaXMubG9nKFwiZXJyb3JcIiwgKCkgPT4gW1widW5hdXRob3JpemVkIGxpdmVfcmVkaXJlY3QuIEZhbGxpbmcgYmFjayB0byBwYWdlIHJlcXVlc3RcIiwgcmVzcF0pXG4gICAgICByZXR1cm4gdGhpcy5vblJlZGlyZWN0KHt0bzogdGhpcy5ocmVmfSlcbiAgICB9XG4gICAgaWYocmVzcC5yZWRpcmVjdCB8fCByZXNwLmxpdmVfcmVkaXJlY3Qpe1xuICAgICAgdGhpcy5qb2luUGVuZGluZyA9IGZhbHNlXG4gICAgICB0aGlzLmNoYW5uZWwubGVhdmUoKVxuICAgIH1cbiAgICBpZihyZXNwLnJlZGlyZWN0KXsgcmV0dXJuIHRoaXMub25SZWRpcmVjdChyZXNwLnJlZGlyZWN0KSB9XG4gICAgaWYocmVzcC5saXZlX3JlZGlyZWN0KXsgcmV0dXJuIHRoaXMub25MaXZlUmVkaXJlY3QocmVzcC5saXZlX3JlZGlyZWN0KSB9XG4gICAgdGhpcy5sb2coXCJlcnJvclwiLCAoKSA9PiBbXCJ1bmFibGUgdG8gam9pblwiLCByZXNwXSlcbiAgICByZXR1cm4gdGhpcy5saXZlU29ja2V0LnJlbG9hZFdpdGhKaXR0ZXIodGhpcylcbiAgfVxuXG4gIG9uQ2xvc2UocmVhc29uKXtcbiAgICBpZih0aGlzLmlzRGVzdHJveWVkKCkpeyByZXR1cm4gfVxuICAgIGlmKCh0aGlzLmlzSm9pblBlbmRpbmcoKSAmJiBkb2N1bWVudC52aXNpYmlsaXR5U3RhdGUgIT09IFwiaGlkZGVuXCIpIHx8XG4gICAgICAodGhpcy5saXZlU29ja2V0Lmhhc1BlbmRpbmdMaW5rKCkgJiYgcmVhc29uICE9PSBcImxlYXZlXCIpKXtcblxuICAgICAgcmV0dXJuIHRoaXMubGl2ZVNvY2tldC5yZWxvYWRXaXRoSml0dGVyKHRoaXMpXG4gICAgfVxuICAgIHRoaXMuZGVzdHJveUFsbENoaWxkcmVuKClcbiAgICB0aGlzLmxpdmVTb2NrZXQuZHJvcEFjdGl2ZUVsZW1lbnQodGhpcylcbiAgICAvLyBkb2N1bWVudC5hY3RpdmVFbGVtZW50IGNhbiBiZSBudWxsIGluIEludGVybmV0IEV4cGxvcmVyIDExXG4gICAgaWYoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCl7IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpIH1cbiAgICBpZih0aGlzLmxpdmVTb2NrZXQuaXNVbmxvYWRlZCgpKXtcbiAgICAgIHRoaXMuc2hvd0xvYWRlcihCRUZPUkVfVU5MT0FEX0xPQURFUl9USU1FT1VUKVxuICAgIH1cbiAgfVxuXG4gIG9uRXJyb3IocmVhc29uKXtcbiAgICB0aGlzLm9uQ2xvc2UocmVhc29uKVxuICAgIHRoaXMubG9nKFwiZXJyb3JcIiwgKCkgPT4gW1widmlldyBjcmFzaGVkXCIsIHJlYXNvbl0pXG4gICAgaWYoIXRoaXMubGl2ZVNvY2tldC5pc1VubG9hZGVkKCkpeyB0aGlzLmRpc3BsYXlFcnJvcigpIH1cbiAgfVxuXG4gIGRpc3BsYXlFcnJvcigpe1xuICAgIGlmKHRoaXMuaXNNYWluKCkpeyBET00uZGlzcGF0Y2hFdmVudCh3aW5kb3csIFwicGh4OnBhZ2UtbG9hZGluZy1zdGFydFwiLCB7dG86IHRoaXMuaHJlZiwga2luZDogXCJlcnJvclwifSkgfVxuICAgIHRoaXMuc2hvd0xvYWRlcigpXG4gICAgdGhpcy5zZXRDb250YWluZXJDbGFzc2VzKFBIWF9ESVNDT05ORUNURURfQ0xBU1MsIFBIWF9FUlJPUl9DTEFTUylcbiAgfVxuXG4gIHB1c2hXaXRoUmVwbHkocmVmR2VuZXJhdG9yLCBldmVudCwgcGF5bG9hZCwgb25SZXBseSA9IGZ1bmN0aW9uICgpeyB9KXtcbiAgICBpZighdGhpcy5pc0Nvbm5lY3RlZCgpKXsgcmV0dXJuIH1cblxuICAgIGxldCBbcmVmLCBbZWxdXSA9IHJlZkdlbmVyYXRvciA/IHJlZkdlbmVyYXRvcigpIDogW251bGwsIFtdXVxuICAgIGxldCBvbkxvYWRpbmdEb25lID0gZnVuY3Rpb24gKCl7IH1cbiAgICBpZihlbCAmJiAoZWwuZ2V0QXR0cmlidXRlKHRoaXMuYmluZGluZyhQSFhfUEFHRV9MT0FESU5HKSkgIT09IG51bGwpKXtcbiAgICAgIG9uTG9hZGluZ0RvbmUgPSB0aGlzLmxpdmVTb2NrZXQud2l0aFBhZ2VMb2FkaW5nKHtraW5kOiBcImVsZW1lbnRcIiwgdGFyZ2V0OiBlbH0pXG4gICAgfVxuXG4gICAgaWYodHlwZW9mIChwYXlsb2FkLmNpZCkgIT09IFwibnVtYmVyXCIpeyBkZWxldGUgcGF5bG9hZC5jaWQgfVxuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmxpdmVTb2NrZXQud3JhcFB1c2godGhpcywge3RpbWVvdXQ6IHRydWV9LCAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoYW5uZWwucHVzaChldmVudCwgcGF5bG9hZCwgUFVTSF9USU1FT1VUKS5yZWNlaXZlKFwib2tcIiwgcmVzcCA9PiB7XG4gICAgICAgICAgbGV0IGhvb2tSZXBseSA9IG51bGxcbiAgICAgICAgICBpZihyZWYgIT09IG51bGwpeyB0aGlzLnVuZG9SZWZzKHJlZikgfVxuICAgICAgICAgIGlmKHJlc3AuZGlmZil7XG4gICAgICAgICAgICBob29rUmVwbHkgPSB0aGlzLmFwcGx5RGlmZihcInVwZGF0ZVwiLCByZXNwLmRpZmYsICh7ZGlmZiwgZXZlbnRzfSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnVwZGF0ZShkaWZmLCBldmVudHMpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZihyZXNwLnJlZGlyZWN0KXsgdGhpcy5vblJlZGlyZWN0KHJlc3AucmVkaXJlY3QpIH1cbiAgICAgICAgICBpZihyZXNwLmxpdmVfcGF0Y2gpeyB0aGlzLm9uTGl2ZVBhdGNoKHJlc3AubGl2ZV9wYXRjaCkgfVxuICAgICAgICAgIGlmKHJlc3AubGl2ZV9yZWRpcmVjdCl7IHRoaXMub25MaXZlUmVkaXJlY3QocmVzcC5saXZlX3JlZGlyZWN0KSB9XG4gICAgICAgICAgb25Mb2FkaW5nRG9uZSgpXG4gICAgICAgICAgb25SZXBseShyZXNwLCBob29rUmVwbHkpXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIClcbiAgfVxuXG4gIHVuZG9SZWZzKHJlZil7XG4gICAgRE9NLmFsbCh0aGlzLmVsLCBgWyR7UEhYX1JFRn09XCIke3JlZn1cIl1gLCBlbCA9PiB7XG4gICAgICBsZXQgZGlzYWJsZWRWYWwgPSBlbC5nZXRBdHRyaWJ1dGUoUEhYX0RJU0FCTEVEKVxuICAgICAgLy8gcmVtb3ZlIHJlZnNcbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShQSFhfUkVGKVxuICAgICAgLy8gcmVzdG9yZSBpbnB1dHNcbiAgICAgIGlmKGVsLmdldEF0dHJpYnV0ZShQSFhfUkVBRE9OTFkpICE9PSBudWxsKXtcbiAgICAgICAgZWwucmVhZE9ubHkgPSBmYWxzZVxuICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoUEhYX1JFQURPTkxZKVxuICAgICAgfVxuICAgICAgaWYoZGlzYWJsZWRWYWwgIT09IG51bGwpe1xuICAgICAgICBlbC5kaXNhYmxlZCA9IGRpc2FibGVkVmFsID09PSBcInRydWVcIiA/IHRydWUgOiBmYWxzZVxuICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoUEhYX0RJU0FCTEVEKVxuICAgICAgfVxuICAgICAgLy8gcmVtb3ZlIGNsYXNzZXNcbiAgICAgIFBIWF9FVkVOVF9DTEFTU0VTLmZvckVhY2goY2xhc3NOYW1lID0+IERPTS5yZW1vdmVDbGFzcyhlbCwgY2xhc3NOYW1lKSlcbiAgICAgIC8vIHJlc3RvcmUgZGlzYWJsZXNcbiAgICAgIGxldCBkaXNhYmxlUmVzdG9yZSA9IGVsLmdldEF0dHJpYnV0ZShQSFhfRElTQUJMRV9XSVRIX1JFU1RPUkUpXG4gICAgICBpZihkaXNhYmxlUmVzdG9yZSAhPT0gbnVsbCl7XG4gICAgICAgIGVsLmlubmVyVGV4dCA9IGRpc2FibGVSZXN0b3JlXG4gICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShQSFhfRElTQUJMRV9XSVRIX1JFU1RPUkUpXG4gICAgICB9XG4gICAgICBsZXQgdG9FbCA9IERPTS5wcml2YXRlKGVsLCBQSFhfUkVGKVxuICAgICAgaWYodG9FbCl7XG4gICAgICAgIGxldCBob29rID0gdGhpcy50cmlnZ2VyQmVmb3JlVXBkYXRlSG9vayhlbCwgdG9FbClcbiAgICAgICAgRE9NUGF0Y2gucGF0Y2hFbChlbCwgdG9FbCwgdGhpcy5saXZlU29ja2V0LmdldEFjdGl2ZUVsZW1lbnQoKSlcbiAgICAgICAgaWYoaG9vayl7IGhvb2suX191cGRhdGVkKCkgfVxuICAgICAgICBET00uZGVsZXRlUHJpdmF0ZShlbCwgUEhYX1JFRilcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgcHV0UmVmKGVsZW1lbnRzLCBldmVudCl7XG4gICAgbGV0IG5ld1JlZiA9IHRoaXMucmVmKytcbiAgICBsZXQgZGlzYWJsZVdpdGggPSB0aGlzLmJpbmRpbmcoUEhYX0RJU0FCTEVfV0lUSClcblxuICAgIGVsZW1lbnRzLmZvckVhY2goZWwgPT4ge1xuICAgICAgZWwuY2xhc3NMaXN0LmFkZChgcGh4LSR7ZXZlbnR9LWxvYWRpbmdgKVxuICAgICAgZWwuc2V0QXR0cmlidXRlKFBIWF9SRUYsIG5ld1JlZilcbiAgICAgIGxldCBkaXNhYmxlVGV4dCA9IGVsLmdldEF0dHJpYnV0ZShkaXNhYmxlV2l0aClcbiAgICAgIGlmKGRpc2FibGVUZXh0ICE9PSBudWxsKXtcbiAgICAgICAgaWYoIWVsLmdldEF0dHJpYnV0ZShQSFhfRElTQUJMRV9XSVRIX1JFU1RPUkUpKXtcbiAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoUEhYX0RJU0FCTEVfV0lUSF9SRVNUT1JFLCBlbC5pbm5lclRleHQpXG4gICAgICAgIH1cbiAgICAgICAgZWwuaW5uZXJUZXh0ID0gZGlzYWJsZVRleHRcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBbbmV3UmVmLCBlbGVtZW50c11cbiAgfVxuXG4gIGNvbXBvbmVudElEKGVsKXtcbiAgICBsZXQgY2lkID0gZWwuZ2V0QXR0cmlidXRlICYmIGVsLmdldEF0dHJpYnV0ZShQSFhfQ09NUE9ORU5UKVxuICAgIHJldHVybiBjaWQgPyBwYXJzZUludChjaWQpIDogbnVsbFxuICB9XG5cbiAgdGFyZ2V0Q29tcG9uZW50SUQodGFyZ2V0LCB0YXJnZXRDdHgpe1xuICAgIGlmKHRhcmdldC5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFwidGFyZ2V0XCIpKSl7XG4gICAgICByZXR1cm4gdGhpcy5jbG9zZXN0Q29tcG9uZW50SUQodGFyZ2V0Q3R4KVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfVxuXG4gIGNsb3Nlc3RDb21wb25lbnRJRCh0YXJnZXRDdHgpe1xuICAgIGlmKHRhcmdldEN0eCl7XG4gICAgICByZXR1cm4gbWF5YmUodGFyZ2V0Q3R4LmNsb3Nlc3QoYFske1BIWF9DT01QT05FTlR9XWApLCBlbCA9PiB0aGlzLm93bnNFbGVtZW50KGVsKSAmJiB0aGlzLmNvbXBvbmVudElEKGVsKSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH1cblxuICBwdXNoSG9va0V2ZW50KHRhcmdldEN0eCwgZXZlbnQsIHBheWxvYWQsIG9uUmVwbHkpe1xuICAgIGlmKCF0aGlzLmlzQ29ubmVjdGVkKCkpe1xuICAgICAgdGhpcy5sb2coXCJob29rXCIsICgpID0+IFtcInVuYWJsZSB0byBwdXNoIGhvb2sgZXZlbnQuIExpdmVWaWV3IG5vdCBjb25uZWN0ZWRcIiwgZXZlbnQsIHBheWxvYWRdKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGxldCBbcmVmLCBlbHNdID0gdGhpcy5wdXRSZWYoW10sIFwiaG9va1wiKVxuICAgIHRoaXMucHVzaFdpdGhSZXBseSgoKSA9PiBbcmVmLCBlbHNdLCBcImV2ZW50XCIsIHtcbiAgICAgIHR5cGU6IFwiaG9va1wiLFxuICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgdmFsdWU6IHBheWxvYWQsXG4gICAgICBjaWQ6IHRoaXMuY2xvc2VzdENvbXBvbmVudElEKHRhcmdldEN0eClcbiAgICB9LCAocmVzcCwgcmVwbHkpID0+IG9uUmVwbHkocmVwbHksIHJlZikpXG5cbiAgICByZXR1cm4gcmVmXG4gIH1cblxuICBleHRyYWN0TWV0YShlbCwgbWV0YSl7XG4gICAgbGV0IHByZWZpeCA9IHRoaXMuYmluZGluZyhcInZhbHVlLVwiKVxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBlbC5hdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKXtcbiAgICAgIGxldCBuYW1lID0gZWwuYXR0cmlidXRlc1tpXS5uYW1lXG4gICAgICBpZihuYW1lLnN0YXJ0c1dpdGgocHJlZml4KSl7IG1ldGFbbmFtZS5yZXBsYWNlKHByZWZpeCwgXCJcIildID0gZWwuZ2V0QXR0cmlidXRlKG5hbWUpIH1cbiAgICB9XG4gICAgaWYoZWwudmFsdWUgIT09IHVuZGVmaW5lZCl7XG4gICAgICBtZXRhLnZhbHVlID0gZWwudmFsdWVcblxuICAgICAgaWYoZWwudGFnTmFtZSA9PT0gXCJJTlBVVFwiICYmIENIRUNLQUJMRV9JTlBVVFMuaW5kZXhPZihlbC50eXBlKSA+PSAwICYmICFlbC5jaGVja2VkKXtcbiAgICAgICAgZGVsZXRlIG1ldGEudmFsdWVcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1ldGFcbiAgfVxuXG4gIHB1c2hFdmVudCh0eXBlLCBlbCwgdGFyZ2V0Q3R4LCBwaHhFdmVudCwgbWV0YSl7XG4gICAgdGhpcy5wdXNoV2l0aFJlcGx5KCgpID0+IHRoaXMucHV0UmVmKFtlbF0sIHR5cGUpLCBcImV2ZW50XCIsIHtcbiAgICAgIHR5cGU6IHR5cGUsXG4gICAgICBldmVudDogcGh4RXZlbnQsXG4gICAgICB2YWx1ZTogdGhpcy5leHRyYWN0TWV0YShlbCwgbWV0YSksXG4gICAgICBjaWQ6IHRoaXMudGFyZ2V0Q29tcG9uZW50SUQoZWwsIHRhcmdldEN0eClcbiAgICB9KVxuICB9XG5cbiAgcHVzaEtleShrZXlFbGVtZW50LCB0YXJnZXRDdHgsIGtpbmQsIHBoeEV2ZW50LCBtZXRhKXtcbiAgICB0aGlzLnB1c2hXaXRoUmVwbHkoKCkgPT4gdGhpcy5wdXRSZWYoW2tleUVsZW1lbnRdLCBraW5kKSwgXCJldmVudFwiLCB7XG4gICAgICB0eXBlOiBraW5kLFxuICAgICAgZXZlbnQ6IHBoeEV2ZW50LFxuICAgICAgdmFsdWU6IHRoaXMuZXh0cmFjdE1ldGEoa2V5RWxlbWVudCwgbWV0YSksXG4gICAgICBjaWQ6IHRoaXMudGFyZ2V0Q29tcG9uZW50SUQoa2V5RWxlbWVudCwgdGFyZ2V0Q3R4KVxuICAgIH0pXG4gIH1cblxuICBwdXNoRmlsZVByb2dyZXNzKGZpbGVFbCwgZW50cnlSZWYsIHByb2dyZXNzLCBvblJlcGx5ID0gZnVuY3Rpb24gKCl7IH0pe1xuICAgIHRoaXMubGl2ZVNvY2tldC53aXRoaW5Pd25lcnMoZmlsZUVsLmZvcm0sICh2aWV3LCB0YXJnZXRDdHgpID0+IHtcbiAgICAgIHZpZXcucHVzaFdpdGhSZXBseShudWxsLCBcInByb2dyZXNzXCIsIHtcbiAgICAgICAgZXZlbnQ6IGZpbGVFbC5nZXRBdHRyaWJ1dGUodmlldy5iaW5kaW5nKFBIWF9QUk9HUkVTUykpLFxuICAgICAgICByZWY6IGZpbGVFbC5nZXRBdHRyaWJ1dGUoUEhYX1VQTE9BRF9SRUYpLFxuICAgICAgICBlbnRyeV9yZWY6IGVudHJ5UmVmLFxuICAgICAgICBwcm9ncmVzczogcHJvZ3Jlc3MsXG4gICAgICAgIGNpZDogdmlldy50YXJnZXRDb21wb25lbnRJRChmaWxlRWwuZm9ybSwgdGFyZ2V0Q3R4KVxuICAgICAgfSwgb25SZXBseSlcbiAgICB9KVxuICB9XG5cbiAgcHVzaElucHV0KGlucHV0RWwsIHRhcmdldEN0eCwgZm9yY2VDaWQsIHBoeEV2ZW50LCBldmVudFRhcmdldCwgY2FsbGJhY2spe1xuICAgIGxldCB1cGxvYWRzXG4gICAgbGV0IGNpZCA9IGlzQ2lkKGZvcmNlQ2lkKSA/IGZvcmNlQ2lkIDogdGhpcy50YXJnZXRDb21wb25lbnRJRChpbnB1dEVsLmZvcm0sIHRhcmdldEN0eClcbiAgICBsZXQgcmVmR2VuZXJhdG9yID0gKCkgPT4gdGhpcy5wdXRSZWYoW2lucHV0RWwsIGlucHV0RWwuZm9ybV0sIFwiY2hhbmdlXCIpXG4gICAgbGV0IGZvcm1EYXRhID0gc2VyaWFsaXplRm9ybShpbnB1dEVsLmZvcm0sIHtfdGFyZ2V0OiBldmVudFRhcmdldC5uYW1lfSlcbiAgICBpZihpbnB1dEVsLmZpbGVzICYmIGlucHV0RWwuZmlsZXMubGVuZ3RoID4gMCl7XG4gICAgICBMaXZlVXBsb2FkZXIudHJhY2tGaWxlcyhpbnB1dEVsLCBBcnJheS5mcm9tKGlucHV0RWwuZmlsZXMpKVxuICAgIH1cbiAgICB1cGxvYWRzID0gTGl2ZVVwbG9hZGVyLnNlcmlhbGl6ZVVwbG9hZHMoaW5wdXRFbClcbiAgICBsZXQgZXZlbnQgPSB7XG4gICAgICB0eXBlOiBcImZvcm1cIixcbiAgICAgIGV2ZW50OiBwaHhFdmVudCxcbiAgICAgIHZhbHVlOiBmb3JtRGF0YSxcbiAgICAgIHVwbG9hZHM6IHVwbG9hZHMsXG4gICAgICBjaWQ6IGNpZFxuICAgIH1cbiAgICB0aGlzLnB1c2hXaXRoUmVwbHkocmVmR2VuZXJhdG9yLCBcImV2ZW50XCIsIGV2ZW50LCByZXNwID0+IHtcbiAgICAgIERPTS5zaG93RXJyb3IoaW5wdXRFbCwgdGhpcy5saXZlU29ja2V0LmJpbmRpbmcoUEhYX0ZFRURCQUNLX0ZPUikpXG4gICAgICBpZihET00uaXNVcGxvYWRJbnB1dChpbnB1dEVsKSAmJiBpbnB1dEVsLmdldEF0dHJpYnV0ZShcImRhdGEtcGh4LWF1dG8tdXBsb2FkXCIpICE9PSBudWxsKXtcbiAgICAgICAgaWYoTGl2ZVVwbG9hZGVyLmZpbGVzQXdhaXRpbmdQcmVmbGlnaHQoaW5wdXRFbCkubGVuZ3RoID4gMCl7XG4gICAgICAgICAgbGV0IFtyZWYsIF9lbHNdID0gcmVmR2VuZXJhdG9yKClcbiAgICAgICAgICB0aGlzLnVwbG9hZEZpbGVzKGlucHV0RWwuZm9ybSwgdGFyZ2V0Q3R4LCByZWYsIGNpZCwgKF91cGxvYWRzKSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhyZXNwKVxuICAgICAgICAgICAgdGhpcy50cmlnZ2VyQXdhaXRpbmdTdWJtaXQoaW5wdXRFbC5mb3JtKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKHJlc3ApXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHRyaWdnZXJBd2FpdGluZ1N1Ym1pdChmb3JtRWwpe1xuICAgIGxldCBhd2FpdGluZ1N1Ym1pdCA9IHRoaXMuZ2V0U2NoZWR1bGVkU3VibWl0KGZvcm1FbClcbiAgICBpZihhd2FpdGluZ1N1Ym1pdCl7XG4gICAgICBsZXQgW19lbCwgX3JlZiwgY2FsbGJhY2tdID0gYXdhaXRpbmdTdWJtaXRcbiAgICAgIHRoaXMuY2FuY2VsU3VibWl0KGZvcm1FbClcbiAgICAgIGNhbGxiYWNrKClcbiAgICB9XG4gIH1cblxuICBnZXRTY2hlZHVsZWRTdWJtaXQoZm9ybUVsKXtcbiAgICByZXR1cm4gdGhpcy5mb3JtU3VibWl0cy5maW5kKChbZWwsIF9jYWxsYmFja10pID0+IGVsLmlzU2FtZU5vZGUoZm9ybUVsKSlcbiAgfVxuXG4gIHNjaGVkdWxlU3VibWl0KGZvcm1FbCwgcmVmLCBjYWxsYmFjayl7XG4gICAgaWYodGhpcy5nZXRTY2hlZHVsZWRTdWJtaXQoZm9ybUVsKSl7IHJldHVybiB0cnVlIH1cbiAgICB0aGlzLmZvcm1TdWJtaXRzLnB1c2goW2Zvcm1FbCwgcmVmLCBjYWxsYmFja10pXG4gIH1cblxuICBjYW5jZWxTdWJtaXQoZm9ybUVsKXtcbiAgICB0aGlzLmZvcm1TdWJtaXRzID0gdGhpcy5mb3JtU3VibWl0cy5maWx0ZXIoKFtlbCwgcmVmLCBfY2FsbGJhY2tdKSA9PiB7XG4gICAgICBpZihlbC5pc1NhbWVOb2RlKGZvcm1FbCkpe1xuICAgICAgICB0aGlzLnVuZG9SZWZzKHJlZilcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBwdXNoRm9ybVN1Ym1pdChmb3JtRWwsIHRhcmdldEN0eCwgcGh4RXZlbnQsIG9uUmVwbHkpe1xuICAgIGxldCBmaWx0ZXJJZ25vcmVkID0gZWwgPT4ge1xuICAgICAgbGV0IHVzZXJJZ25vcmVkID0gY2xvc2VzdFBoeEJpbmRpbmcoZWwsIGAke3RoaXMuYmluZGluZyhQSFhfVVBEQVRFKX09aWdub3JlYCwgZWwuZm9ybSlcbiAgICAgIHJldHVybiAhKHVzZXJJZ25vcmVkIHx8IGNsb3Nlc3RQaHhCaW5kaW5nKGVsLCBcImRhdGEtcGh4LXVwZGF0ZT1pZ25vcmVcIiwgZWwuZm9ybSkpXG4gICAgfVxuICAgIGxldCBmaWx0ZXJEaXNhYmxlcyA9IGVsID0+IHtcbiAgICAgIHJldHVybiBlbC5oYXNBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFBIWF9ESVNBQkxFX1dJVEgpKVxuICAgIH1cbiAgICBsZXQgZmlsdGVyQnV0dG9uID0gZWwgPT4gZWwudGFnTmFtZSA9PSBcIkJVVFRPTlwiXG5cbiAgICBsZXQgZmlsdGVySW5wdXQgPSBlbCA9PiBbXCJJTlBVVFwiLCBcIlRFWFRBUkVBXCIsIFwiU0VMRUNUXCJdLmluY2x1ZGVzKGVsLnRhZ05hbWUpXG5cbiAgICBsZXQgcmVmR2VuZXJhdG9yID0gKCkgPT4ge1xuICAgICAgbGV0IGZvcm1FbGVtZW50cyA9IEFycmF5LmZyb20oZm9ybUVsLmVsZW1lbnRzKVxuICAgICAgbGV0IGRpc2FibGVzID0gZm9ybUVsZW1lbnRzLmZpbHRlcihmaWx0ZXJEaXNhYmxlcylcbiAgICAgIGxldCBidXR0b25zID0gZm9ybUVsZW1lbnRzLmZpbHRlcihmaWx0ZXJCdXR0b24pLmZpbHRlcihmaWx0ZXJJZ25vcmVkKVxuICAgICAgbGV0IGlucHV0cyA9IGZvcm1FbGVtZW50cy5maWx0ZXIoZmlsdGVySW5wdXQpLmZpbHRlcihmaWx0ZXJJZ25vcmVkKVxuXG4gICAgICBidXR0b25zLmZvckVhY2goYnV0dG9uID0+IHtcbiAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZShQSFhfRElTQUJMRUQsIGJ1dHRvbi5kaXNhYmxlZClcbiAgICAgICAgYnV0dG9uLmRpc2FibGVkID0gdHJ1ZVxuICAgICAgfSlcbiAgICAgIGlucHV0cy5mb3JFYWNoKGlucHV0ID0+IHtcbiAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKFBIWF9SRUFET05MWSwgaW5wdXQucmVhZE9ubHkpXG4gICAgICAgIGlucHV0LnJlYWRPbmx5ID0gdHJ1ZVxuICAgICAgICBpZihpbnB1dC5maWxlcyl7XG4gICAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKFBIWF9ESVNBQkxFRCwgaW5wdXQuZGlzYWJsZWQpXG4gICAgICAgICAgaW5wdXQuZGlzYWJsZWQgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBmb3JtRWwuc2V0QXR0cmlidXRlKHRoaXMuYmluZGluZyhQSFhfUEFHRV9MT0FESU5HKSwgXCJcIilcbiAgICAgIHJldHVybiB0aGlzLnB1dFJlZihbZm9ybUVsXS5jb25jYXQoZGlzYWJsZXMpLmNvbmNhdChidXR0b25zKS5jb25jYXQoaW5wdXRzKSwgXCJzdWJtaXRcIilcbiAgICB9XG5cbiAgICBsZXQgY2lkID0gdGhpcy50YXJnZXRDb21wb25lbnRJRChmb3JtRWwsIHRhcmdldEN0eClcbiAgICBpZihMaXZlVXBsb2FkZXIuaGFzVXBsb2Fkc0luUHJvZ3Jlc3MoZm9ybUVsKSl7XG4gICAgICBsZXQgW3JlZiwgX2Vsc10gPSByZWZHZW5lcmF0b3IoKVxuICAgICAgcmV0dXJuIHRoaXMuc2NoZWR1bGVTdWJtaXQoZm9ybUVsLCByZWYsICgpID0+IHRoaXMucHVzaEZvcm1TdWJtaXQoZm9ybUVsLCB0YXJnZXRDdHgsIHBoeEV2ZW50LCBvblJlcGx5KSlcbiAgICB9IGVsc2UgaWYoTGl2ZVVwbG9hZGVyLmlucHV0c0F3YWl0aW5nUHJlZmxpZ2h0KGZvcm1FbCkubGVuZ3RoID4gMCl7XG4gICAgICBsZXQgW3JlZiwgZWxzXSA9IHJlZkdlbmVyYXRvcigpXG4gICAgICBsZXQgcHJveHlSZWZHZW4gPSAoKSA9PiBbcmVmLCBlbHNdXG4gICAgICB0aGlzLnVwbG9hZEZpbGVzKGZvcm1FbCwgdGFyZ2V0Q3R4LCByZWYsIGNpZCwgKF91cGxvYWRzKSA9PiB7XG4gICAgICAgIGxldCBmb3JtRGF0YSA9IHNlcmlhbGl6ZUZvcm0oZm9ybUVsLCB7fSlcbiAgICAgICAgdGhpcy5wdXNoV2l0aFJlcGx5KHByb3h5UmVmR2VuLCBcImV2ZW50XCIsIHtcbiAgICAgICAgICB0eXBlOiBcImZvcm1cIixcbiAgICAgICAgICBldmVudDogcGh4RXZlbnQsXG4gICAgICAgICAgdmFsdWU6IGZvcm1EYXRhLFxuICAgICAgICAgIGNpZDogY2lkXG4gICAgICAgIH0sIG9uUmVwbHkpXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgZm9ybURhdGEgPSBzZXJpYWxpemVGb3JtKGZvcm1FbClcbiAgICAgIHRoaXMucHVzaFdpdGhSZXBseShyZWZHZW5lcmF0b3IsIFwiZXZlbnRcIiwge1xuICAgICAgICB0eXBlOiBcImZvcm1cIixcbiAgICAgICAgZXZlbnQ6IHBoeEV2ZW50LFxuICAgICAgICB2YWx1ZTogZm9ybURhdGEsXG4gICAgICAgIGNpZDogY2lkXG4gICAgICB9LCBvblJlcGx5KVxuICAgIH1cbiAgfVxuXG4gIHVwbG9hZEZpbGVzKGZvcm1FbCwgdGFyZ2V0Q3R4LCByZWYsIGNpZCwgb25Db21wbGV0ZSl7XG4gICAgbGV0IGpvaW5Db3VudEF0VXBsb2FkID0gdGhpcy5qb2luQ291bnRcbiAgICBsZXQgaW5wdXRFbHMgPSBMaXZlVXBsb2FkZXIuYWN0aXZlRmlsZUlucHV0cyhmb3JtRWwpXG4gICAgbGV0IG51bUZpbGVJbnB1dHNJblByb2dyZXNzID0gaW5wdXRFbHMubGVuZ3RoXG5cbiAgICAvLyBnZXQgZWFjaCBmaWxlIGlucHV0XG4gICAgaW5wdXRFbHMuZm9yRWFjaChpbnB1dEVsID0+IHtcbiAgICAgIGxldCB1cGxvYWRlciA9IG5ldyBMaXZlVXBsb2FkZXIoaW5wdXRFbCwgdGhpcywgKCkgPT4ge1xuICAgICAgICBudW1GaWxlSW5wdXRzSW5Qcm9ncmVzcy0tXG4gICAgICAgIGlmKG51bUZpbGVJbnB1dHNJblByb2dyZXNzID09PSAwKXsgb25Db21wbGV0ZSgpIH1cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnVwbG9hZGVyc1tpbnB1dEVsXSA9IHVwbG9hZGVyXG4gICAgICBsZXQgZW50cmllcyA9IHVwbG9hZGVyLmVudHJpZXMoKS5tYXAoZW50cnkgPT4gZW50cnkudG9QcmVmbGlnaHRQYXlsb2FkKCkpXG5cbiAgICAgIGxldCBwYXlsb2FkID0ge1xuICAgICAgICByZWY6IGlucHV0RWwuZ2V0QXR0cmlidXRlKFBIWF9VUExPQURfUkVGKSxcbiAgICAgICAgZW50cmllczogZW50cmllcyxcbiAgICAgICAgY2lkOiB0aGlzLnRhcmdldENvbXBvbmVudElEKGlucHV0RWwuZm9ybSwgdGFyZ2V0Q3R4KVxuICAgICAgfVxuXG4gICAgICB0aGlzLmxvZyhcInVwbG9hZFwiLCAoKSA9PiBbXCJzZW5kaW5nIHByZWZsaWdodCByZXF1ZXN0XCIsIHBheWxvYWRdKVxuXG4gICAgICB0aGlzLnB1c2hXaXRoUmVwbHkobnVsbCwgXCJhbGxvd191cGxvYWRcIiwgcGF5bG9hZCwgcmVzcCA9PiB7XG4gICAgICAgIHRoaXMubG9nKFwidXBsb2FkXCIsICgpID0+IFtcImdvdCBwcmVmbGlnaHQgcmVzcG9uc2VcIiwgcmVzcF0pXG4gICAgICAgIGlmKHJlc3AuZXJyb3Ipe1xuICAgICAgICAgIHRoaXMudW5kb1JlZnMocmVmKVxuICAgICAgICAgIGxldCBbZW50cnlfcmVmLCByZWFzb25dID0gcmVzcC5lcnJvclxuICAgICAgICAgIHRoaXMubG9nKFwidXBsb2FkXCIsICgpID0+IFtgZXJyb3IgZm9yIGVudHJ5ICR7ZW50cnlfcmVmfWAsIHJlYXNvbl0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGV0IG9uRXJyb3IgPSAoY2FsbGJhY2spID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hhbm5lbC5vbkVycm9yKCgpID0+IHtcbiAgICAgICAgICAgICAgaWYodGhpcy5qb2luQ291bnQgPT09IGpvaW5Db3VudEF0VXBsb2FkKXsgY2FsbGJhY2soKSB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgICB1cGxvYWRlci5pbml0QWRhcHRlclVwbG9hZChyZXNwLCBvbkVycm9yLCB0aGlzLmxpdmVTb2NrZXQpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIGRpc3BhdGNoVXBsb2FkcyhuYW1lLCBmaWxlc09yQmxvYnMpe1xuICAgIGxldCBpbnB1dHMgPSBET00uZmluZFVwbG9hZElucHV0cyh0aGlzLmVsKS5maWx0ZXIoZWwgPT4gZWwubmFtZSA9PT0gbmFtZSlcbiAgICBpZihpbnB1dHMubGVuZ3RoID09PSAwKXsgbG9nRXJyb3IoYG5vIGxpdmUgZmlsZSBpbnB1dHMgZm91bmQgbWF0Y2hpbmcgdGhlIG5hbWUgXCIke25hbWV9XCJgKSB9XG4gICAgZWxzZSBpZihpbnB1dHMubGVuZ3RoID4gMSl7IGxvZ0Vycm9yKGBkdXBsaWNhdGUgbGl2ZSBmaWxlIGlucHV0cyBmb3VuZCBtYXRjaGluZyB0aGUgbmFtZSBcIiR7bmFtZX1cImApIH1cbiAgICBlbHNlIHsgRE9NLmRpc3BhdGNoRXZlbnQoaW5wdXRzWzBdLCBQSFhfVFJBQ0tfVVBMT0FEUywge2ZpbGVzOiBmaWxlc09yQmxvYnN9KSB9XG4gIH1cblxuICBwdXNoRm9ybVJlY292ZXJ5KGZvcm0sIG5ld0NpZCwgY2FsbGJhY2spe1xuICAgIHRoaXMubGl2ZVNvY2tldC53aXRoaW5Pd25lcnMoZm9ybSwgKHZpZXcsIHRhcmdldEN0eCkgPT4ge1xuICAgICAgbGV0IGlucHV0ID0gZm9ybS5lbGVtZW50c1swXVxuICAgICAgbGV0IHBoeEV2ZW50ID0gZm9ybS5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFBIWF9BVVRPX1JFQ09WRVIpKSB8fCBmb3JtLmdldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoXCJjaGFuZ2VcIikpXG4gICAgICB2aWV3LnB1c2hJbnB1dChpbnB1dCwgdGFyZ2V0Q3R4LCBuZXdDaWQsIHBoeEV2ZW50LCBpbnB1dCwgY2FsbGJhY2spXG4gICAgfSlcbiAgfVxuXG4gIHB1c2hMaW5rUGF0Y2goaHJlZiwgdGFyZ2V0RWwsIGNhbGxiYWNrKXtcbiAgICBsZXQgbGlua1JlZiA9IHRoaXMubGl2ZVNvY2tldC5zZXRQZW5kaW5nTGluayhocmVmKVxuICAgIGxldCByZWZHZW4gPSB0YXJnZXRFbCA/ICgpID0+IHRoaXMucHV0UmVmKFt0YXJnZXRFbF0sIFwiY2xpY2tcIikgOiBudWxsXG5cbiAgICB0aGlzLnB1c2hXaXRoUmVwbHkocmVmR2VuLCBcImxpdmVfcGF0Y2hcIiwge3VybDogaHJlZn0sIHJlc3AgPT4ge1xuICAgICAgaWYocmVzcC5saW5rX3JlZGlyZWN0KXtcbiAgICAgICAgdGhpcy5saXZlU29ja2V0LnJlcGxhY2VNYWluKGhyZWYsIG51bGwsIGNhbGxiYWNrLCBsaW5rUmVmKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYodGhpcy5saXZlU29ja2V0LmNvbW1pdFBlbmRpbmdMaW5rKGxpbmtSZWYpKXtcbiAgICAgICAgICB0aGlzLmhyZWYgPSBocmVmXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hcHBseVBlbmRpbmdVcGRhdGVzKClcbiAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2sobGlua1JlZilcbiAgICAgIH1cbiAgICB9KS5yZWNlaXZlKFwidGltZW91dFwiLCAoKSA9PiB0aGlzLmxpdmVTb2NrZXQucmVkaXJlY3Qod2luZG93LmxvY2F0aW9uLmhyZWYpKVxuICB9XG5cbiAgZm9ybXNGb3JSZWNvdmVyeShodG1sKXtcbiAgICBpZih0aGlzLmpvaW5Db3VudCA9PT0gMCl7IHJldHVybiBbXSB9XG5cbiAgICBsZXQgcGh4Q2hhbmdlID0gdGhpcy5iaW5kaW5nKFwiY2hhbmdlXCIpXG4gICAgbGV0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpXG4gICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gaHRtbFxuXG4gICAgcmV0dXJuIChcbiAgICAgIERPTS5hbGwodGhpcy5lbCwgYGZvcm1bJHtwaHhDaGFuZ2V9XWApXG4gICAgICAgIC5maWx0ZXIoZm9ybSA9PiBmb3JtLmlkICYmIHRoaXMub3duc0VsZW1lbnQoZm9ybSkpXG4gICAgICAgIC5maWx0ZXIoZm9ybSA9PiBmb3JtLmVsZW1lbnRzLmxlbmd0aCA+IDApXG4gICAgICAgIC5maWx0ZXIoZm9ybSA9PiBmb3JtLmdldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoUEhYX0FVVE9fUkVDT1ZFUikpICE9PSBcImlnbm9yZVwiKVxuICAgICAgICAubWFwKGZvcm0gPT4ge1xuICAgICAgICAgIGxldCBuZXdGb3JtID0gdGVtcGxhdGUuY29udGVudC5xdWVyeVNlbGVjdG9yKGBmb3JtW2lkPVwiJHtmb3JtLmlkfVwiXVske3BoeENoYW5nZX09XCIke2Zvcm0uZ2V0QXR0cmlidXRlKHBoeENoYW5nZSl9XCJdYClcbiAgICAgICAgICBpZihuZXdGb3JtKXtcbiAgICAgICAgICAgIHJldHVybiBbZm9ybSwgbmV3Rm9ybSwgdGhpcy5jb21wb25lbnRJRChuZXdGb3JtKV1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFtmb3JtLCBudWxsLCBudWxsXVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmZpbHRlcigoW2Zvcm0sIG5ld0Zvcm0sIG5ld0NpZF0pID0+IG5ld0Zvcm0pXG4gICAgKVxuICB9XG5cbiAgbWF5YmVQdXNoQ29tcG9uZW50c0Rlc3Ryb3llZChkZXN0cm95ZWRDSURzKXtcbiAgICBsZXQgd2lsbERlc3Ryb3lDSURzID0gZGVzdHJveWVkQ0lEcy5maWx0ZXIoY2lkID0+IHtcbiAgICAgIHJldHVybiBET00uZmluZENvbXBvbmVudE5vZGVMaXN0KHRoaXMuZWwsIGNpZCkubGVuZ3RoID09PSAwXG4gICAgfSlcbiAgICBpZih3aWxsRGVzdHJveUNJRHMubGVuZ3RoID4gMCl7XG4gICAgICB0aGlzLnBydW5pbmdDSURzLnB1c2goLi4ud2lsbERlc3Ryb3lDSURzKVxuXG4gICAgICB0aGlzLnB1c2hXaXRoUmVwbHkobnVsbCwgXCJjaWRzX3dpbGxfZGVzdHJveVwiLCB7Y2lkczogd2lsbERlc3Ryb3lDSURzfSwgKCkgPT4ge1xuICAgICAgICAvLyBUaGUgY2lkcyBhcmUgZWl0aGVyIGJhY2sgb24gdGhlIHBhZ2Ugb3IgdGhleSB3aWxsIGJlIGZ1bGx5IHJlbW92ZWQsXG4gICAgICAgIC8vIHNvIHdlIGNhbiByZW1vdmUgdGhlbSBmcm9tIHRoZSBwcnVuaW5nQ0lEcy5cbiAgICAgICAgdGhpcy5wcnVuaW5nQ0lEcyA9IHRoaXMucHJ1bmluZ0NJRHMuZmlsdGVyKGNpZCA9PiB3aWxsRGVzdHJveUNJRHMuaW5kZXhPZihjaWQpICE9PSAtMSlcblxuICAgICAgICAvLyBTZWUgaWYgYW55IG9mIHRoZSBjaWRzIHdlIHdhbnRlZCB0byBkZXN0cm95IHdlcmUgYWRkZWQgYmFjayxcbiAgICAgICAgLy8gaWYgdGhleSB3ZXJlIGFkZGVkIGJhY2ssIHdlIGRvbid0IGFjdHVhbGx5IGRlc3Ryb3kgdGhlbS5cbiAgICAgICAgbGV0IGNvbXBsZXRlbHlEZXN0cm95Q0lEcyA9IHdpbGxEZXN0cm95Q0lEcy5maWx0ZXIoY2lkID0+IHtcbiAgICAgICAgICByZXR1cm4gRE9NLmZpbmRDb21wb25lbnROb2RlTGlzdCh0aGlzLmVsLCBjaWQpLmxlbmd0aCA9PT0gMFxuICAgICAgICB9KVxuXG4gICAgICAgIGlmKGNvbXBsZXRlbHlEZXN0cm95Q0lEcy5sZW5ndGggPiAwKXtcbiAgICAgICAgICB0aGlzLnB1c2hXaXRoUmVwbHkobnVsbCwgXCJjaWRzX2Rlc3Ryb3llZFwiLCB7Y2lkczogY29tcGxldGVseURlc3Ryb3lDSURzfSwgKHJlc3ApID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZWQucHJ1bmVDSURzKHJlc3AuY2lkcylcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIG93bnNFbGVtZW50KGVsKXtcbiAgICByZXR1cm4gZWwuZ2V0QXR0cmlidXRlKFBIWF9QQVJFTlRfSUQpID09PSB0aGlzLmlkIHx8XG4gICAgICBtYXliZShlbC5jbG9zZXN0KFBIWF9WSUVXX1NFTEVDVE9SKSwgbm9kZSA9PiBub2RlLmlkKSA9PT0gdGhpcy5pZFxuICB9XG5cbiAgc3VibWl0Rm9ybShmb3JtLCB0YXJnZXRDdHgsIHBoeEV2ZW50KXtcbiAgICBET00ucHV0UHJpdmF0ZShmb3JtLCBQSFhfSEFTX1NVQk1JVFRFRCwgdHJ1ZSlcbiAgICB0aGlzLmxpdmVTb2NrZXQuYmx1ckFjdGl2ZUVsZW1lbnQodGhpcylcbiAgICB0aGlzLnB1c2hGb3JtU3VibWl0KGZvcm0sIHRhcmdldEN0eCwgcGh4RXZlbnQsICgpID0+IHtcbiAgICAgIHRoaXMubGl2ZVNvY2tldC5yZXN0b3JlUHJldmlvdXNseUFjdGl2ZUZvY3VzKClcbiAgICB9KVxuICB9XG5cbiAgYmluZGluZyhraW5kKXsgcmV0dXJuIHRoaXMubGl2ZVNvY2tldC5iaW5kaW5nKGtpbmQpIH1cbn1cbiIsICIvKiogSW5pdGlhbGl6ZXMgdGhlIExpdmVTb2NrZXRcbiAqXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGVuZFBvaW50IC0gVGhlIHN0cmluZyBXZWJTb2NrZXQgZW5kcG9pbnQsIGllLCBgXCJ3c3M6Ly9leGFtcGxlLmNvbS9saXZlXCJgLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBcIi9saXZlXCJgIChpbmhlcml0ZWQgaG9zdCAmIHByb3RvY29sKVxuICogQHBhcmFtIHtQaG9lbml4LlNvY2tldH0gc29ja2V0IC0gdGhlIHJlcXVpcmVkIFBob2VuaXggU29ja2V0IGNsYXNzIGltcG9ydGVkIGZyb20gXCJwaG9lbml4XCIuIEZvciBleGFtcGxlOlxuICpcbiAqICAgICBpbXBvcnQge1NvY2tldH0gZnJvbSBcInBob2VuaXhcIlxuICogICAgIGltcG9ydCB7TGl2ZVNvY2tldH0gZnJvbSBcInBob2VuaXhfbGl2ZV92aWV3XCJcbiAqICAgICBsZXQgbGl2ZVNvY2tldCA9IG5ldyBMaXZlU29ja2V0KFwiL2xpdmVcIiwgU29ja2V0LCB7Li4ufSlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdHNdIC0gT3B0aW9uYWwgY29uZmlndXJhdGlvbi4gT3V0c2lkZSBvZiBrZXlzIGxpc3RlZCBiZWxvdywgYWxsXG4gKiBjb25maWd1cmF0aW9uIGlzIHBhc3NlZCBkaXJlY3RseSB0byB0aGUgUGhvZW5peCBTb2NrZXQgY29uc3RydWN0b3IuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdHMuZGVmYXVsdHNdIC0gVGhlIG9wdGlvbmFsIGRlZmF1bHRzIHRvIHVzZSBmb3IgdmFyaW91cyBiaW5kaW5ncyxcbiAqIHN1Y2ggYXMgYHBoeC1kZWJvdW5jZWAuIFN1cHBvcnRzIHRoZSBmb2xsb3dpbmcga2V5czpcbiAqXG4gKiAgIC0gZGVib3VuY2UgLSB0aGUgbWlsbGlzZWNvbmQgcGh4LWRlYm91bmNlIHRpbWUuIERlZmF1bHRzIDMwMFxuICogICAtIHRocm90dGxlIC0gdGhlIG1pbGxpc2Vjb25kIHBoeC10aHJvdHRsZSB0aW1lLiBEZWZhdWx0cyAzMDBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0cy5wYXJhbXNdIC0gVGhlIG9wdGlvbmFsIGZ1bmN0aW9uIGZvciBwYXNzaW5nIGNvbm5lY3QgcGFyYW1zLlxuICogVGhlIGZ1bmN0aW9uIHJlY2VpdmVzIHRoZSBlbGVtZW50IGFzc29jaWF0ZWQgd2l0aCBhIGdpdmVuIExpdmVWaWV3LiBGb3IgZXhhbXBsZTpcbiAqXG4gKiAgICAgKGVsKSA9PiB7dmlldzogZWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1teS12aWV3LW5hbWVcIiwgdG9rZW46IHdpbmRvdy5teVRva2VufVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0cy5iaW5kaW5nUHJlZml4XSAtIFRoZSBvcHRpb25hbCBwcmVmaXggdG8gdXNlIGZvciBhbGwgcGh4IERPTSBhbm5vdGF0aW9ucy5cbiAqIERlZmF1bHRzIHRvIFwicGh4LVwiLlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRzLmhvb2tzXSAtIFRoZSBvcHRpb25hbCBvYmplY3QgZm9yIHJlZmVyZW5jaW5nIExpdmVWaWV3IGhvb2sgY2FsbGJhY2tzLlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRzLnVwbG9hZGVyc10gLSBUaGUgb3B0aW9uYWwgb2JqZWN0IGZvciByZWZlcmVuY2luZyBMaXZlVmlldyB1cGxvYWRlciBjYWxsYmFja3MuXG4gKiBAcGFyYW0ge2ludGVnZXJ9IFtvcHRzLmxvYWRlclRpbWVvdXRdIC0gVGhlIG9wdGlvbmFsIGRlbGF5IGluIG1pbGxpc2Vjb25kcyB0byB3YWl0IGJlZm9yZSBhcHBseVxuICogbG9hZGluZyBzdGF0ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0cy52aWV3TG9nZ2VyXSAtIFRoZSBvcHRpb25hbCBmdW5jdGlvbiB0byBsb2cgZGVidWcgaW5mb3JtYXRpb24uIEZvciBleGFtcGxlOlxuICpcbiAqICAgICAodmlldywga2luZCwgbXNnLCBvYmopID0+IGNvbnNvbGUubG9nKGAke3ZpZXcuaWR9ICR7a2luZH06ICR7bXNnfSAtIGAsIG9iailcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdHMubWV0YWRhdGFdIC0gVGhlIG9wdGlvbmFsIG9iamVjdCBtYXBwaW5nIGV2ZW50IG5hbWVzIHRvIGZ1bmN0aW9ucyBmb3JcbiAqIHBvcHVsYXRpbmcgZXZlbnQgbWV0YWRhdGEuIEZvciBleGFtcGxlOlxuICpcbiAqICAgICBtZXRhZGF0YToge1xuICogICAgICAgY2xpY2s6IChlLCBlbCkgPT4ge1xuICogICAgICAgICByZXR1cm4ge1xuICogICAgICAgICAgIGN0cmxLZXk6IGUuY3RybEtleSxcbiAqICAgICAgICAgICBtZXRhS2V5OiBlLm1ldGFLZXksXG4gKiAgICAgICAgICAgZGV0YWlsOiBlLmRldGFpbCB8fCAxLFxuICogICAgICAgICB9XG4gKiAgICAgICB9LFxuICogICAgICAga2V5ZG93bjogKGUsIGVsKSA9PiB7XG4gKiAgICAgICAgIHJldHVybiB7XG4gKiAgICAgICAgICAga2V5OiBlLmtleSxcbiAqICAgICAgICAgICBjdHJsS2V5OiBlLmN0cmxLZXksXG4gKiAgICAgICAgICAgbWV0YUtleTogZS5tZXRhS2V5LFxuICogICAgICAgICAgIHNoaWZ0S2V5OiBlLnNoaWZ0S2V5XG4gKiAgICAgICAgIH1cbiAqICAgICAgIH1cbiAqICAgICB9XG4gKiBAcGFyYW0ge09iamVjdH0gW29wdHMuc2Vzc2lvblN0b3JhZ2VdIC0gQW4gb3B0aW9uYWwgU3RvcmFnZSBjb21wYXRpYmxlIG9iamVjdFxuICogVXNlZnVsIHdoZW4gTGl2ZVZpZXcgd29uJ3QgaGF2ZSBhY2Nlc3MgdG8gYHNlc3Npb25TdG9yYWdlYC4gIEZvciBleGFtcGxlLCBUaGlzIGNvdWxkXG4gKiBoYXBwZW4gaWYgYSBzaXRlIGxvYWRzIGEgY3Jvc3MtZG9tYWluIExpdmVWaWV3IGluIGFuIGlmcmFtZS4gIEV4YW1wbGUgdXNhZ2U6XG4gKlxuICogICAgIGNsYXNzIEluTWVtb3J5U3RvcmFnZSB7XG4gKiAgICAgICBjb25zdHJ1Y3RvcigpIHsgdGhpcy5zdG9yYWdlID0ge30gfVxuICogICAgICAgZ2V0SXRlbShrZXlOYW1lKSB7IHJldHVybiB0aGlzLnN0b3JhZ2Vba2V5TmFtZV0gfVxuICogICAgICAgcmVtb3ZlSXRlbShrZXlOYW1lKSB7IGRlbGV0ZSB0aGlzLnN0b3JhZ2Vba2V5TmFtZV0gfVxuICogICAgICAgc2V0SXRlbShrZXlOYW1lLCBrZXlWYWx1ZSkgeyB0aGlzLnN0b3JhZ2Vba2V5TmFtZV0gPSBrZXlWYWx1ZSB9XG4gKiAgICAgfVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cy5sb2NhbFN0b3JhZ2VdIC0gQW4gb3B0aW9uYWwgU3RvcmFnZSBjb21wYXRpYmxlIG9iamVjdFxuICogVXNlZnVsIGZvciB3aGVuIExpdmVWaWV3IHdvbid0IGhhdmUgYWNjZXNzIHRvIGBsb2NhbFN0b3JhZ2VgLlxuICogU2VlIGBvcHRzLnNlc3Npb25TdG9yYWdlYCBmb3IgZXhhbXBsZXMuXG4qL1xuXG5pbXBvcnQge1xuICBCSU5ESU5HX1BSRUZJWCxcbiAgQ09OU0VDVVRJVkVfUkVMT0FEUyxcbiAgREVGQVVMVFMsXG4gIEZBSUxTQUZFX0pJVFRFUixcbiAgTE9BREVSX1RJTUVPVVQsXG4gIE1BWF9SRUxPQURTLFxuICBQSFhfREVCT1VOQ0UsXG4gIFBIWF9EUk9QX1RBUkdFVCxcbiAgUEhYX0hBU19GT0NVU0VELFxuICBQSFhfS0VZLFxuICBQSFhfTElOS19TVEFURSxcbiAgUEhYX0xJVkVfTElOSyxcbiAgUEhYX0xWX0RFQlVHLFxuICBQSFhfTFZfTEFURU5DWV9TSU0sXG4gIFBIWF9MVl9QUk9GSUxFLFxuICBQSFhfTUFJTixcbiAgUEhYX1BBUkVOVF9JRCxcbiAgUEhYX1ZJRVdfU0VMRUNUT1IsXG4gIFBIWF9ST09UX0lELFxuICBQSFhfVEhST1RUTEUsXG4gIFBIWF9UUkFDS19VUExPQURTLFxuICBSRUxPQURfSklUVEVSXG5cbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IHtcbiAgY2xvbmUsXG4gIGNsb3Nlc3RQaHhCaW5kaW5nLFxuICBjbG9zdXJlLFxuICBkZWJ1ZyxcbiAgbWF5YmVcbn0gZnJvbSBcIi4vdXRpbHNcIlxuXG5pbXBvcnQgQnJvd3NlciBmcm9tIFwiLi9icm93c2VyXCJcbmltcG9ydCBET00gZnJvbSBcIi4vZG9tXCJcbmltcG9ydCBIb29rcyBmcm9tIFwiLi9ob29rc1wiXG5pbXBvcnQgTGl2ZVVwbG9hZGVyIGZyb20gXCIuL2xpdmVfdXBsb2FkZXJcIlxuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlld1wiXG5pbXBvcnQge1BIWF9TRVNTSU9OfSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXZlU29ja2V0IHtcbiAgY29uc3RydWN0b3IodXJsLCBwaHhTb2NrZXQsIG9wdHMgPSB7fSl7XG4gICAgdGhpcy51bmxvYWRlZCA9IGZhbHNlXG4gICAgaWYoIXBoeFNvY2tldCB8fCBwaHhTb2NrZXQuY29uc3RydWN0b3IubmFtZSA9PT0gXCJPYmplY3RcIil7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFxuICAgICAgYSBwaG9lbml4IFNvY2tldCBtdXN0IGJlIHByb3ZpZGVkIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gdGhlIExpdmVTb2NrZXQgY29uc3RydWN0b3IuIEZvciBleGFtcGxlOlxuXG4gICAgICAgICAgaW1wb3J0IHtTb2NrZXR9IGZyb20gXCJwaG9lbml4XCJcbiAgICAgICAgICBpbXBvcnQgTGl2ZVNvY2tldCBmcm9tIFwicGhvZW5peF9saXZlX3ZpZXdcIlxuICAgICAgICAgIGxldCBsaXZlU29ja2V0ID0gbmV3IExpdmVTb2NrZXQoXCIvbGl2ZVwiLCBTb2NrZXQsIHsuLi59KVxuICAgICAgYClcbiAgICB9XG4gICAgdGhpcy5zb2NrZXQgPSBuZXcgcGh4U29ja2V0KHVybCwgb3B0cylcbiAgICB0aGlzLmJpbmRpbmdQcmVmaXggPSBvcHRzLmJpbmRpbmdQcmVmaXggfHwgQklORElOR19QUkVGSVhcbiAgICB0aGlzLm9wdHMgPSBvcHRzXG4gICAgdGhpcy5wYXJhbXMgPSBjbG9zdXJlKG9wdHMucGFyYW1zIHx8IHt9KVxuICAgIHRoaXMudmlld0xvZ2dlciA9IG9wdHMudmlld0xvZ2dlclxuICAgIHRoaXMubWV0YWRhdGFDYWxsYmFja3MgPSBvcHRzLm1ldGFkYXRhIHx8IHt9XG4gICAgdGhpcy5kZWZhdWx0cyA9IE9iamVjdC5hc3NpZ24oY2xvbmUoREVGQVVMVFMpLCBvcHRzLmRlZmF1bHRzIHx8IHt9KVxuICAgIHRoaXMuYWN0aXZlRWxlbWVudCA9IG51bGxcbiAgICB0aGlzLnByZXZBY3RpdmUgPSBudWxsXG4gICAgdGhpcy5zaWxlbmNlZCA9IGZhbHNlXG4gICAgdGhpcy5tYWluID0gbnVsbFxuICAgIHRoaXMubGlua1JlZiA9IDFcbiAgICB0aGlzLnJvb3RzID0ge31cbiAgICB0aGlzLmhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZlxuICAgIHRoaXMucGVuZGluZ0xpbmsgPSBudWxsXG4gICAgdGhpcy5jdXJyZW50TG9jYXRpb24gPSBjbG9uZSh3aW5kb3cubG9jYXRpb24pXG4gICAgdGhpcy5ob29rcyA9IG9wdHMuaG9va3MgfHwge31cbiAgICB0aGlzLnVwbG9hZGVycyA9IG9wdHMudXBsb2FkZXJzIHx8IHt9XG4gICAgdGhpcy5sb2FkZXJUaW1lb3V0ID0gb3B0cy5sb2FkZXJUaW1lb3V0IHx8IExPQURFUl9USU1FT1VUXG4gICAgdGhpcy5sb2NhbFN0b3JhZ2UgPSBvcHRzLmxvY2FsU3RvcmFnZSB8fCB3aW5kb3cubG9jYWxTdG9yYWdlXG4gICAgdGhpcy5zZXNzaW9uU3RvcmFnZSA9IG9wdHMuc2Vzc2lvblN0b3JhZ2UgfHwgd2luZG93LnNlc3Npb25TdG9yYWdlXG4gICAgdGhpcy5ib3VuZFRvcExldmVsRXZlbnRzID0gZmFsc2VcbiAgICB0aGlzLmRvbUNhbGxiYWNrcyA9IE9iamVjdC5hc3NpZ24oe29uTm9kZUFkZGVkOiBjbG9zdXJlKCksIG9uQmVmb3JlRWxVcGRhdGVkOiBjbG9zdXJlKCl9LCBvcHRzLmRvbSB8fCB7fSlcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VoaWRlXCIsIF9lID0+IHtcbiAgICAgIHRoaXMudW5sb2FkZWQgPSB0cnVlXG4gICAgfSlcbiAgICB0aGlzLnNvY2tldC5vbk9wZW4oKCkgPT4ge1xuICAgICAgaWYodGhpcy5pc1VubG9hZGVkKCkpe1xuICAgICAgICAvLyByZWxvYWQgcGFnZSBpZiBiZWluZyByZXN0b3JlZCBmcm9tIGJhY2svZm9yd2FyZCBjYWNoZSBhbmQgYnJvd3NlciBkb2VzIG5vdCBlbWl0IFwicGFnZXNob3dcIlxuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLy8gcHVibGljXG5cbiAgaXNQcm9maWxlRW5hYmxlZCgpeyByZXR1cm4gdGhpcy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFBIWF9MVl9QUk9GSUxFKSA9PT0gXCJ0cnVlXCIgfVxuXG4gIGlzRGVidWdFbmFibGVkKCl7IHJldHVybiB0aGlzLnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oUEhYX0xWX0RFQlVHKSA9PT0gXCJ0cnVlXCIgfVxuXG4gIGVuYWJsZURlYnVnKCl7IHRoaXMuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShQSFhfTFZfREVCVUcsIFwidHJ1ZVwiKSB9XG5cbiAgZW5hYmxlUHJvZmlsaW5nKCl7IHRoaXMuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShQSFhfTFZfUFJPRklMRSwgXCJ0cnVlXCIpIH1cblxuICBkaXNhYmxlRGVidWcoKXsgdGhpcy5zZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFBIWF9MVl9ERUJVRykgfVxuXG4gIGRpc2FibGVQcm9maWxpbmcoKXsgdGhpcy5zZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFBIWF9MVl9QUk9GSUxFKSB9XG5cbiAgZW5hYmxlTGF0ZW5jeVNpbSh1cHBlckJvdW5kTXMpe1xuICAgIHRoaXMuZW5hYmxlRGVidWcoKVxuICAgIGNvbnNvbGUubG9nKFwibGF0ZW5jeSBzaW11bGF0b3IgZW5hYmxlZCBmb3IgdGhlIGR1cmF0aW9uIG9mIHRoaXMgYnJvd3NlciBzZXNzaW9uLiBDYWxsIGRpc2FibGVMYXRlbmN5U2ltKCkgdG8gZGlzYWJsZVwiKVxuICAgIHRoaXMuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShQSFhfTFZfTEFURU5DWV9TSU0sIHVwcGVyQm91bmRNcylcbiAgfVxuXG4gIGRpc2FibGVMYXRlbmN5U2ltKCl7IHRoaXMuc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShQSFhfTFZfTEFURU5DWV9TSU0pIH1cblxuICBnZXRMYXRlbmN5U2ltKCl7XG4gICAgbGV0IHN0ciA9IHRoaXMuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShQSFhfTFZfTEFURU5DWV9TSU0pXG4gICAgcmV0dXJuIHN0ciA/IHBhcnNlSW50KHN0cikgOiBudWxsXG4gIH1cblxuICBnZXRTb2NrZXQoKXsgcmV0dXJuIHRoaXMuc29ja2V0IH1cblxuICBjb25uZWN0KCl7XG4gICAgbGV0IGRvQ29ubmVjdCA9ICgpID0+IHtcbiAgICAgIGlmKHRoaXMuam9pblJvb3RWaWV3cygpKXtcbiAgICAgICAgdGhpcy5iaW5kVG9wTGV2ZWxFdmVudHMoKVxuICAgICAgICB0aGlzLnNvY2tldC5jb25uZWN0KClcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoW1wiY29tcGxldGVcIiwgXCJsb2FkZWRcIiwgXCJpbnRlcmFjdGl2ZVwiXS5pbmRleE9mKGRvY3VtZW50LnJlYWR5U3RhdGUpID49IDApe1xuICAgICAgZG9Db25uZWN0KClcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4gZG9Db25uZWN0KCkpXG4gICAgfVxuICB9XG5cbiAgZGlzY29ubmVjdChjYWxsYmFjayl7IHRoaXMuc29ja2V0LmRpc2Nvbm5lY3QoY2FsbGJhY2spIH1cblxuICAvLyBwcml2YXRlXG5cbiAgdHJpZ2dlckRPTShraW5kLCBhcmdzKXsgdGhpcy5kb21DYWxsYmFja3Nba2luZF0oLi4uYXJncykgfVxuXG4gIHRpbWUobmFtZSwgZnVuYyl7XG4gICAgaWYoIXRoaXMuaXNQcm9maWxlRW5hYmxlZCgpIHx8ICFjb25zb2xlLnRpbWUpeyByZXR1cm4gZnVuYygpIH1cbiAgICBjb25zb2xlLnRpbWUobmFtZSlcbiAgICBsZXQgcmVzdWx0ID0gZnVuYygpXG4gICAgY29uc29sZS50aW1lRW5kKG5hbWUpXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgbG9nKHZpZXcsIGtpbmQsIG1zZ0NhbGxiYWNrKXtcbiAgICBpZih0aGlzLnZpZXdMb2dnZXIpe1xuICAgICAgbGV0IFttc2csIG9ial0gPSBtc2dDYWxsYmFjaygpXG4gICAgICB0aGlzLnZpZXdMb2dnZXIodmlldywga2luZCwgbXNnLCBvYmopXG4gICAgfSBlbHNlIGlmKHRoaXMuaXNEZWJ1Z0VuYWJsZWQoKSl7XG4gICAgICBsZXQgW21zZywgb2JqXSA9IG1zZ0NhbGxiYWNrKClcbiAgICAgIGRlYnVnKHZpZXcsIGtpbmQsIG1zZywgb2JqKVxuICAgIH1cbiAgfVxuXG4gIG9uQ2hhbm5lbChjaGFubmVsLCBldmVudCwgY2Ipe1xuICAgIGNoYW5uZWwub24oZXZlbnQsIGRhdGEgPT4ge1xuICAgICAgbGV0IGxhdGVuY3kgPSB0aGlzLmdldExhdGVuY3lTaW0oKVxuICAgICAgaWYoIWxhdGVuY3kpe1xuICAgICAgICBjYihkYXRhKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coYHNpbXVsYXRpbmcgJHtsYXRlbmN5fW1zIG9mIGxhdGVuY3kgZnJvbSBzZXJ2ZXIgdG8gY2xpZW50YClcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBjYihkYXRhKSwgbGF0ZW5jeSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgd3JhcFB1c2godmlldywgb3B0cywgcHVzaCl7XG4gICAgbGV0IGxhdGVuY3kgPSB0aGlzLmdldExhdGVuY3lTaW0oKVxuICAgIGxldCBvbGRKb2luQ291bnQgPSB2aWV3LmpvaW5Db3VudFxuICAgIGlmKCFsYXRlbmN5KXtcbiAgICAgIGlmKG9wdHMudGltZW91dCl7XG4gICAgICAgIHJldHVybiBwdXNoKCkucmVjZWl2ZShcInRpbWVvdXRcIiwgKCkgPT4ge1xuICAgICAgICAgIGlmKHZpZXcuam9pbkNvdW50ID09PSBvbGRKb2luQ291bnQgJiYgIXZpZXcuaXNEZXN0cm95ZWQoKSl7XG4gICAgICAgICAgICB0aGlzLnJlbG9hZFdpdGhKaXR0ZXIodmlldywgKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmxvZyh2aWV3LCBcInRpbWVvdXRcIiwgKCkgPT4gW1wicmVjZWl2ZWQgdGltZW91dCB3aGlsZSBjb21tdW5pY2F0aW5nIHdpdGggc2VydmVyLiBGYWxsaW5nIGJhY2sgdG8gaGFyZCByZWZyZXNoIGZvciByZWNvdmVyeVwiXSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHB1c2goKVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKGBzaW11bGF0aW5nICR7bGF0ZW5jeX1tcyBvZiBsYXRlbmN5IGZyb20gY2xpZW50IHRvIHNlcnZlcmApXG4gICAgbGV0IGZha2VQdXNoID0ge1xuICAgICAgcmVjZWl2ZXM6IFtdLFxuICAgICAgcmVjZWl2ZShraW5kLCBjYil7IHRoaXMucmVjZWl2ZXMucHVzaChba2luZCwgY2JdKSB9XG4gICAgfVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYodmlldy5pc0Rlc3Ryb3llZCgpKXsgcmV0dXJuIH1cbiAgICAgIGZha2VQdXNoLnJlY2VpdmVzLnJlZHVjZSgoYWNjLCBba2luZCwgY2JdKSA9PiBhY2MucmVjZWl2ZShraW5kLCBjYiksIHB1c2goKSlcbiAgICB9LCBsYXRlbmN5KVxuICAgIHJldHVybiBmYWtlUHVzaFxuICB9XG5cbiAgcmVsb2FkV2l0aEppdHRlcih2aWV3LCBsb2cpe1xuICAgIHZpZXcuZGVzdHJveSgpXG4gICAgdGhpcy5kaXNjb25uZWN0KClcbiAgICBsZXQgW21pbk1zLCBtYXhNc10gPSBSRUxPQURfSklUVEVSXG4gICAgbGV0IGFmdGVyTXMgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4TXMgLSBtaW5NcyArIDEpKSArIG1pbk1zXG4gICAgbGV0IHRyaWVzID0gQnJvd3Nlci51cGRhdGVMb2NhbCh0aGlzLmxvY2FsU3RvcmFnZSwgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLCBDT05TRUNVVElWRV9SRUxPQURTLCAwLCBjb3VudCA9PiBjb3VudCArIDEpXG4gICAgbG9nID8gbG9nKCkgOiB0aGlzLmxvZyh2aWV3LCBcImpvaW5cIiwgKCkgPT4gW2BlbmNvdW50ZXJlZCAke3RyaWVzfSBjb25zZWN1dGl2ZSByZWxvYWRzYF0pXG4gICAgaWYodHJpZXMgPiBNQVhfUkVMT0FEUyl7XG4gICAgICB0aGlzLmxvZyh2aWV3LCBcImpvaW5cIiwgKCkgPT4gW2BleGNlZWRlZCAke01BWF9SRUxPQURTfSBjb25zZWN1dGl2ZSByZWxvYWRzLiBFbnRlcmluZyBmYWlsc2FmZSBtb2RlYF0pXG4gICAgICBhZnRlck1zID0gRkFJTFNBRkVfSklUVEVSXG4gICAgfVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYodGhpcy5oYXNQZW5kaW5nTGluaygpKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gdGhpcy5wZW5kaW5nTGlua1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpXG4gICAgICB9XG4gICAgfSwgYWZ0ZXJNcylcbiAgfVxuXG4gIGdldEhvb2tDYWxsYmFja3MobmFtZSl7XG4gICAgcmV0dXJuIG5hbWUgJiYgbmFtZS5zdGFydHNXaXRoKFwiUGhvZW5peC5cIikgPyBIb29rc1tuYW1lLnNwbGl0KFwiLlwiKVsxXV0gOiB0aGlzLmhvb2tzW25hbWVdXG4gIH1cblxuICBpc1VubG9hZGVkKCl7IHJldHVybiB0aGlzLnVubG9hZGVkIH1cblxuICBpc0Nvbm5lY3RlZCgpeyByZXR1cm4gdGhpcy5zb2NrZXQuaXNDb25uZWN0ZWQoKSB9XG5cbiAgZ2V0QmluZGluZ1ByZWZpeCgpeyByZXR1cm4gdGhpcy5iaW5kaW5nUHJlZml4IH1cblxuICBiaW5kaW5nKGtpbmQpeyByZXR1cm4gYCR7dGhpcy5nZXRCaW5kaW5nUHJlZml4KCl9JHtraW5kfWAgfVxuXG4gIGNoYW5uZWwodG9waWMsIHBhcmFtcyl7IHJldHVybiB0aGlzLnNvY2tldC5jaGFubmVsKHRvcGljLCBwYXJhbXMpIH1cblxuICBqb2luUm9vdFZpZXdzKCl7XG4gICAgbGV0IHJvb3RzRm91bmQgPSBmYWxzZVxuICAgIERPTS5hbGwoZG9jdW1lbnQsIGAke1BIWF9WSUVXX1NFTEVDVE9SfTpub3QoWyR7UEhYX1BBUkVOVF9JRH1dKWAsIHJvb3RFbCA9PiB7XG4gICAgICBpZighdGhpcy5nZXRSb290QnlJZChyb290RWwuaWQpKXtcbiAgICAgICAgbGV0IHZpZXcgPSB0aGlzLm5ld1Jvb3RWaWV3KHJvb3RFbClcbiAgICAgICAgdmlldy5zZXRIcmVmKHRoaXMuZ2V0SHJlZigpKVxuICAgICAgICB2aWV3LmpvaW4oKVxuICAgICAgICBpZihyb290RWwuZ2V0QXR0cmlidXRlKFBIWF9NQUlOKSl7IHRoaXMubWFpbiA9IHZpZXcgfVxuICAgICAgfVxuICAgICAgcm9vdHNGb3VuZCA9IHRydWVcbiAgICB9KVxuICAgIHJldHVybiByb290c0ZvdW5kXG4gIH1cblxuICByZWRpcmVjdCh0bywgZmxhc2gpe1xuICAgIHRoaXMuZGlzY29ubmVjdCgpXG4gICAgQnJvd3Nlci5yZWRpcmVjdCh0bywgZmxhc2gpXG4gIH1cblxuICByZXBsYWNlTWFpbihocmVmLCBmbGFzaCwgY2FsbGJhY2sgPSBudWxsLCBsaW5rUmVmID0gdGhpcy5zZXRQZW5kaW5nTGluayhocmVmKSl7XG4gICAgbGV0IG9sZE1haW5FbCA9IHRoaXMubWFpbi5lbFxuICAgIGxldCBuZXdNYWluRWwgPSBET00uY2xvbmVOb2RlKG9sZE1haW5FbCwgXCJcIilcbiAgICB0aGlzLm1haW4uc2hvd0xvYWRlcih0aGlzLmxvYWRlclRpbWVvdXQpXG4gICAgdGhpcy5tYWluLmRlc3Ryb3koKVxuXG4gICAgdGhpcy5tYWluID0gdGhpcy5uZXdSb290VmlldyhuZXdNYWluRWwsIGZsYXNoKVxuICAgIHRoaXMubWFpbi5zZXRSZWRpcmVjdChocmVmKVxuICAgIHRoaXMubWFpbi5qb2luKGpvaW5Db3VudCA9PiB7XG4gICAgICBpZihqb2luQ291bnQgPT09IDEgJiYgdGhpcy5jb21taXRQZW5kaW5nTGluayhsaW5rUmVmKSl7XG4gICAgICAgIG9sZE1haW5FbC5yZXBsYWNlV2l0aChuZXdNYWluRWwpXG4gICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgaXNQaHhWaWV3KGVsKXsgcmV0dXJuIGVsLmdldEF0dHJpYnV0ZSAmJiBlbC5nZXRBdHRyaWJ1dGUoUEhYX1NFU1NJT04pICE9PSBudWxsIH1cblxuICBuZXdSb290VmlldyhlbCwgZmxhc2gpe1xuICAgIGxldCB2aWV3ID0gbmV3IFZpZXcoZWwsIHRoaXMsIG51bGwsIGZsYXNoKVxuICAgIHRoaXMucm9vdHNbdmlldy5pZF0gPSB2aWV3XG4gICAgcmV0dXJuIHZpZXdcbiAgfVxuXG4gIG93bmVyKGNoaWxkRWwsIGNhbGxiYWNrKXtcbiAgICBsZXQgdmlldyA9IG1heWJlKGNoaWxkRWwuY2xvc2VzdChQSFhfVklFV19TRUxFQ1RPUiksIGVsID0+IHRoaXMuZ2V0Vmlld0J5RWwoZWwpKVxuICAgIGlmKHZpZXcpeyBjYWxsYmFjayh2aWV3KSB9XG4gIH1cblxuICB3aXRoaW5Pd25lcnMoY2hpbGRFbCwgY2FsbGJhY2spe1xuICAgIHRoaXMub3duZXIoY2hpbGRFbCwgdmlldyA9PiB7XG4gICAgICBsZXQgcGh4VGFyZ2V0ID0gY2hpbGRFbC5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFwidGFyZ2V0XCIpKVxuICAgICAgaWYocGh4VGFyZ2V0ID09PSBudWxsKXtcbiAgICAgICAgY2FsbGJhY2sodmlldywgY2hpbGRFbClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZpZXcud2l0aGluVGFyZ2V0cyhwaHhUYXJnZXQsIGNhbGxiYWNrKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBnZXRWaWV3QnlFbChlbCl7XG4gICAgbGV0IHJvb3RJZCA9IGVsLmdldEF0dHJpYnV0ZShQSFhfUk9PVF9JRClcbiAgICByZXR1cm4gbWF5YmUodGhpcy5nZXRSb290QnlJZChyb290SWQpLCByb290ID0+IHJvb3QuZ2V0RGVzY2VuZGVudEJ5RWwoZWwpKVxuICB9XG5cbiAgZ2V0Um9vdEJ5SWQoaWQpeyByZXR1cm4gdGhpcy5yb290c1tpZF0gfVxuXG4gIGRlc3Ryb3lBbGxWaWV3cygpe1xuICAgIGZvcihsZXQgaWQgaW4gdGhpcy5yb290cyl7XG4gICAgICB0aGlzLnJvb3RzW2lkXS5kZXN0cm95KClcbiAgICAgIGRlbGV0ZSB0aGlzLnJvb3RzW2lkXVxuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3lWaWV3QnlFbChlbCl7XG4gICAgbGV0IHJvb3QgPSB0aGlzLmdldFJvb3RCeUlkKGVsLmdldEF0dHJpYnV0ZShQSFhfUk9PVF9JRCkpXG4gICAgaWYocm9vdCl7IHJvb3QuZGVzdHJveURlc2NlbmRlbnQoZWwuaWQpIH1cbiAgfVxuXG4gIHNldEFjdGl2ZUVsZW1lbnQodGFyZ2V0KXtcbiAgICBpZih0aGlzLmFjdGl2ZUVsZW1lbnQgPT09IHRhcmdldCl7IHJldHVybiB9XG4gICAgdGhpcy5hY3RpdmVFbGVtZW50ID0gdGFyZ2V0XG4gICAgbGV0IGNhbmNlbCA9ICgpID0+IHtcbiAgICAgIGlmKHRhcmdldCA9PT0gdGhpcy5hY3RpdmVFbGVtZW50KXsgdGhpcy5hY3RpdmVFbGVtZW50ID0gbnVsbCB9XG4gICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcylcbiAgICAgIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgdGhpcylcbiAgICB9XG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGNhbmNlbClcbiAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGNhbmNlbClcbiAgfVxuXG4gIGdldEFjdGl2ZUVsZW1lbnQoKXtcbiAgICBpZihkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBkb2N1bWVudC5ib2R5KXtcbiAgICAgIHJldHVybiB0aGlzLmFjdGl2ZUVsZW1lbnQgfHwgZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBkb2N1bWVudC5hY3RpdmVFbGVtZW50IGNhbiBiZSBudWxsIGluIEludGVybmV0IEV4cGxvcmVyIDExXG4gICAgICByZXR1cm4gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCB8fCBkb2N1bWVudC5ib2R5XG4gICAgfVxuICB9XG5cbiAgZHJvcEFjdGl2ZUVsZW1lbnQodmlldyl7XG4gICAgaWYodGhpcy5wcmV2QWN0aXZlICYmIHZpZXcub3duc0VsZW1lbnQodGhpcy5wcmV2QWN0aXZlKSl7XG4gICAgICB0aGlzLnByZXZBY3RpdmUgPSBudWxsXG4gICAgfVxuICB9XG5cbiAgcmVzdG9yZVByZXZpb3VzbHlBY3RpdmVGb2N1cygpe1xuICAgIGlmKHRoaXMucHJldkFjdGl2ZSAmJiB0aGlzLnByZXZBY3RpdmUgIT09IGRvY3VtZW50LmJvZHkpe1xuICAgICAgdGhpcy5wcmV2QWN0aXZlLmZvY3VzKClcbiAgICB9XG4gIH1cblxuICBibHVyQWN0aXZlRWxlbWVudCgpe1xuICAgIHRoaXMucHJldkFjdGl2ZSA9IHRoaXMuZ2V0QWN0aXZlRWxlbWVudCgpXG4gICAgaWYodGhpcy5wcmV2QWN0aXZlICE9PSBkb2N1bWVudC5ib2R5KXsgdGhpcy5wcmV2QWN0aXZlLmJsdXIoKSB9XG4gIH1cblxuICBiaW5kVG9wTGV2ZWxFdmVudHMoKXtcbiAgICBpZih0aGlzLmJvdW5kVG9wTGV2ZWxFdmVudHMpeyByZXR1cm4gfVxuXG4gICAgdGhpcy5ib3VuZFRvcExldmVsRXZlbnRzID0gdHJ1ZVxuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpeyB9KSAvLyBlbnN1cmUgYWxsIGNsaWNrIGV2ZW50cyBidWJibGUgZm9yIG1vYmlsZSBTYWZhcmlcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VzaG93XCIsIGUgPT4ge1xuICAgICAgaWYoZS5wZXJzaXN0ZWQpeyAvLyByZWxvYWQgcGFnZSBpZiBiZWluZyByZXN0b3JlZCBmcm9tIGJhY2svZm9yd2FyZCBjYWNoZVxuICAgICAgICB0aGlzLmdldFNvY2tldCgpLmRpc2Nvbm5lY3QoKVxuICAgICAgICB0aGlzLndpdGhQYWdlTG9hZGluZyh7dG86IHdpbmRvdy5sb2NhdGlvbi5ocmVmLCBraW5kOiBcInJlZGlyZWN0XCJ9KVxuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKClcbiAgICAgIH1cbiAgICB9LCB0cnVlKVxuICAgIHRoaXMuYmluZE5hdigpXG4gICAgdGhpcy5iaW5kQ2xpY2tzKClcbiAgICB0aGlzLmJpbmRGb3JtcygpXG4gICAgdGhpcy5iaW5kKHtrZXl1cDogXCJrZXl1cFwiLCBrZXlkb3duOiBcImtleWRvd25cIn0sIChlLCB0eXBlLCB2aWV3LCB0YXJnZXQsIHRhcmdldEN0eCwgcGh4RXZlbnQsIF9waHhUYXJnZXQpID0+IHtcbiAgICAgIGxldCBtYXRjaEtleSA9IHRhcmdldC5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFBIWF9LRVkpKVxuICAgICAgbGV0IHByZXNzZWRLZXkgPSBlLmtleSAmJiBlLmtleS50b0xvd2VyQ2FzZSgpIC8vIGNocm9tZSBjbGlja2VkIGF1dG9jb21wbGV0ZXMgc2VuZCBhIGtleWRvd24gd2l0aG91dCBrZXlcbiAgICAgIGlmKG1hdGNoS2V5ICYmIG1hdGNoS2V5LnRvTG93ZXJDYXNlKCkgIT09IHByZXNzZWRLZXkpeyByZXR1cm4gfVxuXG4gICAgICB2aWV3LnB1c2hLZXkodGFyZ2V0LCB0YXJnZXRDdHgsIHR5cGUsIHBoeEV2ZW50LCB7a2V5OiBlLmtleSwgLi4udGhpcy5ldmVudE1ldGEodHlwZSwgZSwgdGFyZ2V0KX0pXG4gICAgfSlcbiAgICB0aGlzLmJpbmQoe2JsdXI6IFwiZm9jdXNvdXRcIiwgZm9jdXM6IFwiZm9jdXNpblwifSwgKGUsIHR5cGUsIHZpZXcsIHRhcmdldEVsLCB0YXJnZXRDdHgsIHBoeEV2ZW50LCBwaHhUYXJnZXQpID0+IHtcbiAgICAgIGlmKCFwaHhUYXJnZXQpe1xuICAgICAgICB2aWV3LnB1c2hFdmVudCh0eXBlLCB0YXJnZXRFbCwgdGFyZ2V0Q3R4LCBwaHhFdmVudCwgdGhpcy5ldmVudE1ldGEodHlwZSwgZSwgdGFyZ2V0RWwpKVxuICAgICAgfVxuICAgIH0pXG4gICAgdGhpcy5iaW5kKHtibHVyOiBcImJsdXJcIiwgZm9jdXM6IFwiZm9jdXNcIn0sIChlLCB0eXBlLCB2aWV3LCB0YXJnZXRFbCwgdGFyZ2V0Q3R4LCBwaHhFdmVudCwgcGh4VGFyZ2V0KSA9PiB7XG4gICAgICAvLyBibHVyIGFuZCBmb2N1cyBhcmUgdHJpZ2dlcmVkIG9uIGRvY3VtZW50IGFuZCB3aW5kb3cuIERpc2NhcmQgb25lIHRvIGF2b2lkIGR1cHNcbiAgICAgIGlmKHBoeFRhcmdldCAmJiAhcGh4VGFyZ2V0ICE9PSBcIndpbmRvd1wiKXtcbiAgICAgICAgdmlldy5wdXNoRXZlbnQodHlwZSwgdGFyZ2V0RWwsIHRhcmdldEN0eCwgcGh4RXZlbnQsIHRoaXMuZXZlbnRNZXRhKHR5cGUsIGUsIHRhcmdldEVsKSlcbiAgICAgIH1cbiAgICB9KVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgZSA9PiBlLnByZXZlbnREZWZhdWx0KCkpXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIGUgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBsZXQgZHJvcFRhcmdldElkID0gbWF5YmUoY2xvc2VzdFBoeEJpbmRpbmcoZS50YXJnZXQsIHRoaXMuYmluZGluZyhQSFhfRFJPUF9UQVJHRVQpKSwgdHJ1ZVRhcmdldCA9PiB7XG4gICAgICAgIHJldHVybiB0cnVlVGFyZ2V0LmdldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoUEhYX0RST1BfVEFSR0VUKSlcbiAgICAgIH0pXG4gICAgICBsZXQgZHJvcFRhcmdldCA9IGRyb3BUYXJnZXRJZCAmJiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkcm9wVGFyZ2V0SWQpXG4gICAgICBsZXQgZmlsZXMgPSBBcnJheS5mcm9tKGUuZGF0YVRyYW5zZmVyLmZpbGVzIHx8IFtdKVxuICAgICAgaWYoIWRyb3BUYXJnZXQgfHwgZHJvcFRhcmdldC5kaXNhYmxlZCB8fCBmaWxlcy5sZW5ndGggPT09IDAgfHwgIShkcm9wVGFyZ2V0LmZpbGVzIGluc3RhbmNlb2YgRmlsZUxpc3QpKXsgcmV0dXJuIH1cblxuICAgICAgTGl2ZVVwbG9hZGVyLnRyYWNrRmlsZXMoZHJvcFRhcmdldCwgZmlsZXMpXG4gICAgICBkcm9wVGFyZ2V0LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwiaW5wdXRcIiwge2J1YmJsZXM6IHRydWV9KSlcbiAgICB9KVxuICAgIHRoaXMub24oUEhYX1RSQUNLX1VQTE9BRFMsIGUgPT4ge1xuICAgICAgbGV0IHVwbG9hZFRhcmdldCA9IGUudGFyZ2V0XG4gICAgICBpZighRE9NLmlzVXBsb2FkSW5wdXQodXBsb2FkVGFyZ2V0KSl7IHJldHVybiB9XG4gICAgICBsZXQgZmlsZXMgPSBBcnJheS5mcm9tKGUuZGV0YWlsLmZpbGVzIHx8IFtdKS5maWx0ZXIoZiA9PiBmIGluc3RhbmNlb2YgRmlsZSB8fCBmIGluc3RhbmNlb2YgQmxvYilcbiAgICAgIExpdmVVcGxvYWRlci50cmFja0ZpbGVzKHVwbG9hZFRhcmdldCwgZmlsZXMpXG4gICAgICB1cGxvYWRUYXJnZXQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJpbnB1dFwiLCB7YnViYmxlczogdHJ1ZX0pKVxuICAgIH0pXG4gIH1cblxuICBldmVudE1ldGEoZXZlbnROYW1lLCBlLCB0YXJnZXRFbCl7XG4gICAgbGV0IGNhbGxiYWNrID0gdGhpcy5tZXRhZGF0YUNhbGxiYWNrc1tldmVudE5hbWVdXG4gICAgcmV0dXJuIGNhbGxiYWNrID8gY2FsbGJhY2soZSwgdGFyZ2V0RWwpIDoge31cbiAgfVxuXG4gIHNldFBlbmRpbmdMaW5rKGhyZWYpe1xuICAgIHRoaXMubGlua1JlZisrXG4gICAgdGhpcy5wZW5kaW5nTGluayA9IGhyZWZcbiAgICByZXR1cm4gdGhpcy5saW5rUmVmXG4gIH1cblxuICBjb21taXRQZW5kaW5nTGluayhsaW5rUmVmKXtcbiAgICBpZih0aGlzLmxpbmtSZWYgIT09IGxpbmtSZWYpe1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaHJlZiA9IHRoaXMucGVuZGluZ0xpbmtcbiAgICAgIHRoaXMucGVuZGluZ0xpbmsgPSBudWxsXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIGdldEhyZWYoKXsgcmV0dXJuIHRoaXMuaHJlZiB9XG5cbiAgaGFzUGVuZGluZ0xpbmsoKXsgcmV0dXJuICEhdGhpcy5wZW5kaW5nTGluayB9XG5cbiAgYmluZChldmVudHMsIGNhbGxiYWNrKXtcbiAgICBmb3IobGV0IGV2ZW50IGluIGV2ZW50cyl7XG4gICAgICBsZXQgYnJvd3NlckV2ZW50TmFtZSA9IGV2ZW50c1tldmVudF1cblxuICAgICAgdGhpcy5vbihicm93c2VyRXZlbnROYW1lLCBlID0+IHtcbiAgICAgICAgbGV0IGJpbmRpbmcgPSB0aGlzLmJpbmRpbmcoZXZlbnQpXG4gICAgICAgIGxldCB3aW5kb3dCaW5kaW5nID0gdGhpcy5iaW5kaW5nKGB3aW5kb3ctJHtldmVudH1gKVxuICAgICAgICBsZXQgdGFyZ2V0UGh4RXZlbnQgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUgJiYgZS50YXJnZXQuZ2V0QXR0cmlidXRlKGJpbmRpbmcpXG4gICAgICAgIGlmKHRhcmdldFBoeEV2ZW50KXtcbiAgICAgICAgICB0aGlzLmRlYm91bmNlKGUudGFyZ2V0LCBlLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLndpdGhpbk93bmVycyhlLnRhcmdldCwgKHZpZXcsIHRhcmdldEN0eCkgPT4ge1xuICAgICAgICAgICAgICBjYWxsYmFjayhlLCBldmVudCwgdmlldywgZS50YXJnZXQsIHRhcmdldEN0eCwgdGFyZ2V0UGh4RXZlbnQsIG51bGwpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgRE9NLmFsbChkb2N1bWVudCwgYFske3dpbmRvd0JpbmRpbmd9XWAsIGVsID0+IHtcbiAgICAgICAgICAgIGxldCBwaHhFdmVudCA9IGVsLmdldEF0dHJpYnV0ZSh3aW5kb3dCaW5kaW5nKVxuICAgICAgICAgICAgdGhpcy5kZWJvdW5jZShlbCwgZSwgKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLndpdGhpbk93bmVycyhlbCwgKHZpZXcsIHRhcmdldEN0eCkgPT4ge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGUsIGV2ZW50LCB2aWV3LCBlbCwgdGFyZ2V0Q3R4LCBwaHhFdmVudCwgXCJ3aW5kb3dcIilcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBiaW5kQ2xpY2tzKCl7XG4gICAgdGhpcy5iaW5kQ2xpY2soXCJjbGlja1wiLCBcImNsaWNrXCIsIGZhbHNlKVxuICAgIHRoaXMuYmluZENsaWNrKFwibW91c2Vkb3duXCIsIFwiY2FwdHVyZS1jbGlja1wiLCB0cnVlKVxuICB9XG5cbiAgYmluZENsaWNrKGV2ZW50TmFtZSwgYmluZGluZ05hbWUsIGNhcHR1cmUpe1xuICAgIGxldCBjbGljayA9IHRoaXMuYmluZGluZyhiaW5kaW5nTmFtZSlcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGUgPT4ge1xuICAgICAgaWYoIXRoaXMuaXNDb25uZWN0ZWQoKSl7IHJldHVybiB9XG4gICAgICBsZXQgdGFyZ2V0ID0gbnVsbFxuICAgICAgaWYoY2FwdHVyZSl7XG4gICAgICAgIHRhcmdldCA9IGUudGFyZ2V0Lm1hdGNoZXMoYFske2NsaWNrfV1gKSA/IGUudGFyZ2V0IDogZS50YXJnZXQucXVlcnlTZWxlY3RvcihgWyR7Y2xpY2t9XWApXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXQgPSBjbG9zZXN0UGh4QmluZGluZyhlLnRhcmdldCwgY2xpY2spXG4gICAgICB9XG4gICAgICBsZXQgcGh4RXZlbnQgPSB0YXJnZXQgJiYgdGFyZ2V0LmdldEF0dHJpYnV0ZShjbGljaylcbiAgICAgIGlmKCFwaHhFdmVudCl7IHJldHVybiB9XG4gICAgICBpZih0YXJnZXQuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKSA9PT0gXCIjXCIpeyBlLnByZXZlbnREZWZhdWx0KCkgfVxuXG4gICAgICB0aGlzLmRlYm91bmNlKHRhcmdldCwgZSwgKCkgPT4ge1xuICAgICAgICB0aGlzLndpdGhpbk93bmVycyh0YXJnZXQsICh2aWV3LCB0YXJnZXRDdHgpID0+IHtcbiAgICAgICAgICB2aWV3LnB1c2hFdmVudChcImNsaWNrXCIsIHRhcmdldCwgdGFyZ2V0Q3R4LCBwaHhFdmVudCwgdGhpcy5ldmVudE1ldGEoXCJjbGlja1wiLCBlLCB0YXJnZXQpKVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9LCBjYXB0dXJlKVxuICB9XG5cbiAgYmluZE5hdigpe1xuICAgIGlmKCFCcm93c2VyLmNhblB1c2hTdGF0ZSgpKXsgcmV0dXJuIH1cbiAgICBpZihoaXN0b3J5LnNjcm9sbFJlc3RvcmF0aW9uKXsgaGlzdG9yeS5zY3JvbGxSZXN0b3JhdGlvbiA9IFwibWFudWFsXCIgfVxuICAgIGxldCBzY3JvbGxUaW1lciA9IG51bGxcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBfZSA9PiB7XG4gICAgICBjbGVhclRpbWVvdXQoc2Nyb2xsVGltZXIpXG4gICAgICBzY3JvbGxUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBCcm93c2VyLnVwZGF0ZUN1cnJlbnRTdGF0ZShzdGF0ZSA9PiBPYmplY3QuYXNzaWduKHN0YXRlLCB7c2Nyb2xsOiB3aW5kb3cuc2Nyb2xsWX0pKVxuICAgICAgfSwgMTAwKVxuICAgIH0pXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBldmVudCA9PiB7XG4gICAgICBpZighdGhpcy5yZWdpc3Rlck5ld0xvY2F0aW9uKHdpbmRvdy5sb2NhdGlvbikpeyByZXR1cm4gfVxuICAgICAgbGV0IHt0eXBlLCBpZCwgcm9vdCwgc2Nyb2xsfSA9IGV2ZW50LnN0YXRlIHx8IHt9XG4gICAgICBsZXQgaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmXG5cbiAgICAgIGlmKHRoaXMubWFpbi5pc0Nvbm5lY3RlZCgpICYmICh0eXBlID09PSBcInBhdGNoXCIgJiYgaWQgPT09IHRoaXMubWFpbi5pZCkpe1xuICAgICAgICB0aGlzLm1haW4ucHVzaExpbmtQYXRjaChocmVmLCBudWxsKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZXBsYWNlTWFpbihocmVmLCBudWxsLCAoKSA9PiB7XG4gICAgICAgICAgaWYocm9vdCl7IHRoaXMucmVwbGFjZVJvb3RIaXN0b3J5KCkgfVxuICAgICAgICAgIGlmKHR5cGVvZihzY3JvbGwpID09PSBcIm51bWJlclwiKXtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgc2Nyb2xsKVxuICAgICAgICAgICAgfSwgMCkgLy8gdGhlIGJvZHkgbmVlZHMgdG8gcmVuZGVyIGJlZm9yZSB3ZSBzY3JvbGwuXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0sIGZhbHNlKVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICBsZXQgdGFyZ2V0ID0gY2xvc2VzdFBoeEJpbmRpbmcoZS50YXJnZXQsIFBIWF9MSVZFX0xJTkspXG4gICAgICBsZXQgdHlwZSA9IHRhcmdldCAmJiB0YXJnZXQuZ2V0QXR0cmlidXRlKFBIWF9MSVZFX0xJTkspXG4gICAgICBsZXQgd2FudHNOZXdUYWIgPSBlLm1ldGFLZXkgfHwgZS5jdHJsS2V5IHx8IGUuYnV0dG9uID09PSAxXG4gICAgICBpZighdHlwZSB8fCAhdGhpcy5pc0Nvbm5lY3RlZCgpIHx8ICF0aGlzLm1haW4gfHwgd2FudHNOZXdUYWIpeyByZXR1cm4gfVxuICAgICAgbGV0IGhyZWYgPSB0YXJnZXQuaHJlZlxuICAgICAgbGV0IGxpbmtTdGF0ZSA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoUEhYX0xJTktfU1RBVEUpXG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIGlmKHRoaXMucGVuZGluZ0xpbmsgPT09IGhyZWYpeyByZXR1cm4gfVxuXG4gICAgICBpZih0eXBlID09PSBcInBhdGNoXCIpe1xuICAgICAgICB0aGlzLnB1c2hIaXN0b3J5UGF0Y2goaHJlZiwgbGlua1N0YXRlLCB0YXJnZXQpXG4gICAgICB9IGVsc2UgaWYodHlwZSA9PT0gXCJyZWRpcmVjdFwiKXtcbiAgICAgICAgdGhpcy5oaXN0b3J5UmVkaXJlY3QoaHJlZiwgbGlua1N0YXRlKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBleHBlY3RlZCAke1BIWF9MSVZFX0xJTkt9IHRvIGJlIFwicGF0Y2hcIiBvciBcInJlZGlyZWN0XCIsIGdvdDogJHt0eXBlfWApXG4gICAgICB9XG4gICAgfSwgZmFsc2UpXG4gIH1cblxuICB3aXRoUGFnZUxvYWRpbmcoaW5mbywgY2FsbGJhY2spe1xuICAgIERPTS5kaXNwYXRjaEV2ZW50KHdpbmRvdywgXCJwaHg6cGFnZS1sb2FkaW5nLXN0YXJ0XCIsIGluZm8pXG4gICAgbGV0IGRvbmUgPSAoKSA9PiBET00uZGlzcGF0Y2hFdmVudCh3aW5kb3csIFwicGh4OnBhZ2UtbG9hZGluZy1zdG9wXCIsIGluZm8pXG4gICAgcmV0dXJuIGNhbGxiYWNrID8gY2FsbGJhY2soZG9uZSkgOiBkb25lXG4gIH1cblxuICBwdXNoSGlzdG9yeVBhdGNoKGhyZWYsIGxpbmtTdGF0ZSwgdGFyZ2V0RWwpe1xuICAgIHRoaXMud2l0aFBhZ2VMb2FkaW5nKHt0bzogaHJlZiwga2luZDogXCJwYXRjaFwifSwgZG9uZSA9PiB7XG4gICAgICB0aGlzLm1haW4ucHVzaExpbmtQYXRjaChocmVmLCB0YXJnZXRFbCwgbGlua1JlZiA9PiB7XG4gICAgICAgIHRoaXMuaGlzdG9yeVBhdGNoKGhyZWYsIGxpbmtTdGF0ZSwgbGlua1JlZilcbiAgICAgICAgZG9uZSgpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBoaXN0b3J5UGF0Y2goaHJlZiwgbGlua1N0YXRlLCBsaW5rUmVmID0gdGhpcy5zZXRQZW5kaW5nTGluayhocmVmKSl7XG4gICAgaWYoIXRoaXMuY29tbWl0UGVuZGluZ0xpbmsobGlua1JlZikpeyByZXR1cm4gfVxuXG4gICAgQnJvd3Nlci5wdXNoU3RhdGUobGlua1N0YXRlLCB7dHlwZTogXCJwYXRjaFwiLCBpZDogdGhpcy5tYWluLmlkfSwgaHJlZilcbiAgICB0aGlzLnJlZ2lzdGVyTmV3TG9jYXRpb24od2luZG93LmxvY2F0aW9uKVxuICB9XG5cbiAgaGlzdG9yeVJlZGlyZWN0KGhyZWYsIGxpbmtTdGF0ZSwgZmxhc2gpe1xuICAgIGxldCBzY3JvbGwgPSB3aW5kb3cuc2Nyb2xsWVxuICAgIHRoaXMud2l0aFBhZ2VMb2FkaW5nKHt0bzogaHJlZiwga2luZDogXCJyZWRpcmVjdFwifSwgZG9uZSA9PiB7XG4gICAgICB0aGlzLnJlcGxhY2VNYWluKGhyZWYsIGZsYXNoLCAoKSA9PiB7XG4gICAgICAgIEJyb3dzZXIucHVzaFN0YXRlKGxpbmtTdGF0ZSwge3R5cGU6IFwicmVkaXJlY3RcIiwgaWQ6IHRoaXMubWFpbi5pZCwgc2Nyb2xsOiBzY3JvbGx9LCBocmVmKVxuICAgICAgICB0aGlzLnJlZ2lzdGVyTmV3TG9jYXRpb24od2luZG93LmxvY2F0aW9uKVxuICAgICAgICBkb25lKClcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHJlcGxhY2VSb290SGlzdG9yeSgpe1xuICAgIEJyb3dzZXIucHVzaFN0YXRlKFwicmVwbGFjZVwiLCB7cm9vdDogdHJ1ZSwgdHlwZTogXCJwYXRjaFwiLCBpZDogdGhpcy5tYWluLmlkfSlcbiAgfVxuXG4gIHJlZ2lzdGVyTmV3TG9jYXRpb24obmV3TG9jYXRpb24pe1xuICAgIGxldCB7cGF0aG5hbWUsIHNlYXJjaH0gPSB0aGlzLmN1cnJlbnRMb2NhdGlvblxuICAgIGlmKHBhdGhuYW1lICsgc2VhcmNoID09PSBuZXdMb2NhdGlvbi5wYXRobmFtZSArIG5ld0xvY2F0aW9uLnNlYXJjaCl7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jdXJyZW50TG9jYXRpb24gPSBjbG9uZShuZXdMb2NhdGlvbilcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG5cbiAgYmluZEZvcm1zKCl7XG4gICAgbGV0IGl0ZXJhdGlvbnMgPSAwXG4gICAgdGhpcy5vbihcInN1Ym1pdFwiLCBlID0+IHtcbiAgICAgIGxldCBwaHhFdmVudCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoXCJzdWJtaXRcIikpXG4gICAgICBpZighcGh4RXZlbnQpeyByZXR1cm4gfVxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBlLnRhcmdldC5kaXNhYmxlZCA9IHRydWVcbiAgICAgIHRoaXMud2l0aGluT3duZXJzKGUudGFyZ2V0LCAodmlldywgdGFyZ2V0Q3R4KSA9PiB2aWV3LnN1Ym1pdEZvcm0oZS50YXJnZXQsIHRhcmdldEN0eCwgcGh4RXZlbnQpKVxuICAgIH0sIGZhbHNlKVxuXG4gICAgZm9yKGxldCB0eXBlIG9mIFtcImNoYW5nZVwiLCBcImlucHV0XCJdKXtcbiAgICAgIHRoaXMub24odHlwZSwgZSA9PiB7XG4gICAgICAgIGxldCBpbnB1dCA9IGUudGFyZ2V0XG4gICAgICAgIGxldCBwaHhFdmVudCA9IGlucHV0LmZvcm0gJiYgaW5wdXQuZm9ybS5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFwiY2hhbmdlXCIpKVxuICAgICAgICBpZighcGh4RXZlbnQpeyByZXR1cm4gfVxuICAgICAgICBpZihpbnB1dC50eXBlID09PSBcIm51bWJlclwiICYmIGlucHV0LnZhbGlkaXR5ICYmIGlucHV0LnZhbGlkaXR5LmJhZElucHV0KXsgcmV0dXJuIH1cbiAgICAgICAgbGV0IGN1cnJlbnRJdGVyYXRpb25zID0gaXRlcmF0aW9uc1xuICAgICAgICBpdGVyYXRpb25zKytcbiAgICAgICAgbGV0IHthdDogYXQsIHR5cGU6IGxhc3RUeXBlfSA9IERPTS5wcml2YXRlKGlucHV0LCBcInByZXYtaXRlcmF0aW9uXCIpIHx8IHt9XG4gICAgICAgIC8vIGRldGVjdCBkdXAgYmVjYXVzZSBzb21lIGJyb3dzZXJzIGRpc3BhdGNoIGJvdGggXCJpbnB1dFwiIGFuZCBcImNoYW5nZVwiXG4gICAgICAgIGlmKGF0ID09PSBjdXJyZW50SXRlcmF0aW9ucyAtIDEgJiYgdHlwZSAhPT0gbGFzdFR5cGUpeyByZXR1cm4gfVxuXG4gICAgICAgIERPTS5wdXRQcml2YXRlKGlucHV0LCBcInByZXYtaXRlcmF0aW9uXCIsIHthdDogY3VycmVudEl0ZXJhdGlvbnMsIHR5cGU6IHR5cGV9KVxuXG4gICAgICAgIHRoaXMuZGVib3VuY2UoaW5wdXQsIGUsICgpID0+IHtcbiAgICAgICAgICB0aGlzLndpdGhpbk93bmVycyhpbnB1dC5mb3JtLCAodmlldywgdGFyZ2V0Q3R4KSA9PiB7XG4gICAgICAgICAgICBET00ucHV0UHJpdmF0ZShpbnB1dCwgUEhYX0hBU19GT0NVU0VELCB0cnVlKVxuICAgICAgICAgICAgaWYoIURPTS5pc1RleHR1YWxJbnB1dChpbnB1dCkpe1xuICAgICAgICAgICAgICB0aGlzLnNldEFjdGl2ZUVsZW1lbnQoaW5wdXQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2aWV3LnB1c2hJbnB1dChpbnB1dCwgdGFyZ2V0Q3R4LCBudWxsLCBwaHhFdmVudCwgZS50YXJnZXQpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH0sIGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIGRlYm91bmNlKGVsLCBldmVudCwgY2FsbGJhY2spe1xuICAgIGxldCBwaHhEZWJvdW5jZSA9IHRoaXMuYmluZGluZyhQSFhfREVCT1VOQ0UpXG4gICAgbGV0IHBoeFRocm90dGxlID0gdGhpcy5iaW5kaW5nKFBIWF9USFJPVFRMRSlcbiAgICBsZXQgZGVmYXVsdERlYm91bmNlID0gdGhpcy5kZWZhdWx0cy5kZWJvdW5jZS50b1N0cmluZygpXG4gICAgbGV0IGRlZmF1bHRUaHJvdHRsZSA9IHRoaXMuZGVmYXVsdHMudGhyb3R0bGUudG9TdHJpbmcoKVxuICAgIERPTS5kZWJvdW5jZShlbCwgZXZlbnQsIHBoeERlYm91bmNlLCBkZWZhdWx0RGVib3VuY2UsIHBoeFRocm90dGxlLCBkZWZhdWx0VGhyb3R0bGUsIGNhbGxiYWNrKVxuICB9XG5cbiAgc2lsZW5jZUV2ZW50cyhjYWxsYmFjayl7XG4gICAgdGhpcy5zaWxlbmNlZCA9IHRydWVcbiAgICBjYWxsYmFjaygpXG4gICAgdGhpcy5zaWxlbmNlZCA9IGZhbHNlXG4gIH1cblxuICBvbihldmVudCwgY2FsbGJhY2spe1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBlID0+IHtcbiAgICAgIGlmKCF0aGlzLnNpbGVuY2VkKXsgY2FsbGJhY2soZSkgfVxuICAgIH0pXG4gIH1cbn1cbiIsICIvLyBXZSBpbXBvcnQgdGhlIENTUyB3aGljaCBpcyBleHRyYWN0ZWQgdG8gaXRzIG93biBmaWxlIGJ5IGVzYnVpbGQuXG5cbi8vIElmIHlvdSB3YW50IHRvIHVzZSBQaG9lbml4IGNoYW5uZWxzLCBydW4gYG1peCBoZWxwIHBoeC5nZW4uY2hhbm5lbGBcbi8vIHRvIGdldCBzdGFydGVkIGFuZCB0aGVuIHVuY29tbWVudCB0aGUgbGluZSBiZWxvdy5cbi8vIGltcG9ydCBcIi4vdXNlcl9zb2NrZXQuanNcIlxuXG4vLyBZb3UgY2FuIGluY2x1ZGUgZGVwZW5kZW5jaWVzIGluIHR3byB3YXlzLlxuLy9cbi8vIFRoZSBzaW1wbGVzdCBvcHRpb24gaXMgdG8gcHV0IHRoZW0gaW4gYXNzZXRzL3ZlbmRvciBhbmRcbi8vIGltcG9ydCB0aGVtIHVzaW5nIHJlbGF0aXZlIHBhdGhzOlxuLy9cbi8vICAgICBpbXBvcnQgXCIuL3ZlbmRvci9zb21lLXBhY2thZ2UuanNcIlxuLy9cbi8vIEFsdGVybmF0aXZlbHksIHlvdSBjYW4gYG5wbSBpbnN0YWxsIHNvbWUtcGFja2FnZWAgYW5kIGltcG9ydFxuLy8gdGhlbSB1c2luZyBhIHBhdGggc3RhcnRpbmcgd2l0aCB0aGUgcGFja2FnZSBuYW1lOlxuLy9cbi8vICAgICBpbXBvcnQgXCJzb21lLXBhY2thZ2VcIlxuLy9cblxuLy8gSW5jbHVkZSBwaG9lbml4X2h0bWwgdG8gaGFuZGxlIG1ldGhvZD1QVVQvREVMRVRFIGluIGZvcm1zIGFuZCBidXR0b25zLlxuaW1wb3J0IFwicGhvZW5peF9odG1sXCJcbi8vIEVzdGFibGlzaCBQaG9lbml4IFNvY2tldCBhbmQgTGl2ZVZpZXcgY29uZmlndXJhdGlvbi5cbmltcG9ydCB7IFNvY2tldCB9IGZyb20gXCJwaG9lbml4XCJcbmltcG9ydCB7IExpdmVTb2NrZXQgfSBmcm9tIFwicGhvZW5peF9saXZlX3ZpZXdcIlxuaW1wb3J0IHRvcGJhciBmcm9tIFwiLi4vdmVuZG9yL3RvcGJhclwiXG5pbXBvcnQgXCIuL3ByZWZpeFwiXG5cbmxldCBjc3JmVG9rZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWV0YVtuYW1lPSdjc3JmLXRva2VuJ11cIikuZ2V0QXR0cmlidXRlKFwiY29udGVudFwiKVxuXG5cbmxldCBIb29rcyA9IHt9O1xuSG9va3MubWFpblNraW5DYW52YXNIb29rID0ge1xuICAgIG1vdW50ZWQoKSB7XG4gICAgICAgIHNraW5WaWV3ZXIgPSBuZXcgc2tpbnZpZXczZC5Ta2luVmlld2VyKHtcbiAgICAgICAgICAgIGNhbnZhczogdGhpcy5lbCxcbiAgICAgICAgICAgIHdpZHRoOiAyMzAsXG4gICAgICAgICAgICBoZWlnaHQ6IDQwMCxcbiAgICAgICAgICAgIHNraW46IHRoaXMuZWwuZ2V0QXR0cmlidXRlKFwic2tpbl91cmxcIiksXG4gICAgICAgICAgICBjYXBlOiB0aGlzLmVsLmdldEF0dHJpYnV0ZShcImNsb2FrX3VybFwiKVxuICAgICAgICB9KVxuICAgICAgICBsZXQgY29udHJvbCA9IHNraW52aWV3M2QuY3JlYXRlT3JiaXRDb250cm9scyhza2luVmlld2VyKTtcbiAgICAgICAgY29udHJvbC5lbmFibGVSb3RhdGUgPSB0cnVlO1xuXG5cbiAgICAgICAgc2tpblZpZXdlci5wbGF5ZXJPYmplY3Qucm90YXRpb24ueSA9IDc7XG4gICAgICAgIHNraW5WaWV3ZXIuYW5pbWF0aW9ucy5hZGQoc2tpbnZpZXczZC5XYWxraW5nQW5pbWF0aW9uKTtcbiAgICAgICAgc2tpblZpZXdlci5hbmltYXRpb25zLnNwZWVkID0gMTtcbiAgICB9XG59XG5cbkhvb2tzLnZpZXdTZXR0aW5nc0Zyb250U2tpbiA9IHtcbiAgICBtb3VudGVkKCkge1xuICAgICAgICBza2luVmlld2VyID0gbmV3IHNraW52aWV3M2QuU2tpblZpZXdlcih7XG4gICAgICAgICAgICBjYW52YXM6IHRoaXMuZWwsXG4gICAgICAgICAgICB3aWR0aDogMjMwLFxuICAgICAgICAgICAgaGVpZ2h0OiA0MDAsXG4gICAgICAgICAgICBza2luOiB0aGlzLmVsLmdldEF0dHJpYnV0ZShcInNraW5fdXJsXCIpLFxuICAgICAgICAgICAgY2FwZTogdGhpcy5lbC5nZXRBdHRyaWJ1dGUoXCJjbG9ha191cmxcIilcbiAgICAgICAgfSlcbiAgICB9XG59XG5cbkhvb2tzLnZpZXdTZXR0aW5nc0JhY2tTa2luID0ge1xuICAgIG1vdW50ZWQoKSB7XG4gICAgICAgIHNraW5WaWV3ZXIgPSBuZXcgc2tpbnZpZXczZC5Ta2luVmlld2VyKHtcbiAgICAgICAgICAgIGNhbnZhczogdGhpcy5lbCxcbiAgICAgICAgICAgIHdpZHRoOiAyMzAsXG4gICAgICAgICAgICBoZWlnaHQ6IDQwMCxcbiAgICAgICAgICAgIHNraW46IHRoaXMuZWwuZ2V0QXR0cmlidXRlKFwic2tpbl91cmxcIiksXG4gICAgICAgICAgICBjYXBlOiB0aGlzLmVsLmdldEF0dHJpYnV0ZShcImNsb2FrX3VybFwiKVxuICAgICAgICB9KVxuICAgICAgICBza2luVmlld2VyLnBsYXllck9iamVjdC5yb3RhdGlvbi55ID0gMy4xNDtcbiAgICB9XG59XG5cbkhvb2tzLnByZWZpeCA9IHtcbiAgICBtb3VudGVkKCkge1xuICAgICAgICB2YXIgbmlja19jb2xvciA9IHtcbiAgICAgICAgICAgIFwiXHUwNDI3XHUwNDM1XHUwNDQwXHUwNDNEXHUwNDRCXHUwNDM5XCI6IFwiJjBcIixcbiAgICAgICAgICAgIFwiXHUwNDIyXHUwNDM1XHUwNDNDXHUwNDNEXHUwNDNFLVx1MDQ0MVx1MDQzOFx1MDQzRFx1MDQzOFx1MDQzOVwiOiBcIiYxXCIsXG4gICAgICAgICAgICBcIlx1MDQyMlx1MDQzNVx1MDQzQ1x1MDQzRFx1MDQzRS1cdTA0MzdcdTA0MzVcdTA0M0JcdTA0MzVcdTA0M0RcdTA0NEJcdTA0MzlcIjogXCImMlwiLFxuICAgICAgICAgICAgXCJcdTA0MTFcdTA0MzhcdTA0NDBcdTA0MzhcdTA0MzdcdTA0M0VcdTA0MzJcdTA0NEJcdTA0MzlcIjogXCImM1wiLFxuICAgICAgICAgICAgXCJcdTA0MjJcdTA0MzVcdTA0M0NcdTA0M0RcdTA0M0UtXHUwNDNBXHUwNDQwXHUwNDMwXHUwNDQxXHUwNDNEXHUwNDRCXHUwNDM5XCI6IFwiJjRcIixcbiAgICAgICAgICAgIFwiXHUwNDIyXHUwNDM1XHUwNDNDXHUwNDNEXHUwNDNFLVx1MDQ0NFx1MDQzOFx1MDQzRVx1MDQzQlx1MDQzNVx1MDQ0Mlx1MDQzRVx1MDQzMlx1MDQ0Qlx1MDQzOVwiOiBcIiY1XCIsXG4gICAgICAgICAgICBcIlx1MDQxN1x1MDQzRVx1MDQzQlx1MDQzRVx1MDQ0Mlx1MDQzRVx1MDQzOVwiOiBcIiY2XCIsXG4gICAgICAgICAgICBcIlx1MDQyMVx1MDQzNVx1MDQ0MFx1MDQ0Qlx1MDQzOVwiOiBcIiY3XCIsXG4gICAgICAgICAgICBcIlx1MDQyMlx1MDQzNVx1MDQzQ1x1MDQzRFx1MDQzRS1cdTA0NDFcdTA0MzVcdTA0NDBcdTA0NEJcdTA0MzlcIjogXCImOFwiLFxuICAgICAgICAgICAgXCJcdTA0MjFcdTA0MzhcdTA0M0RcdTA0MzhcdTA0MzlcIjogXCImOVwiLFxuICAgICAgICAgICAgXCJcdTA0MTdcdTA0MzVcdTA0M0JcdTA0MzVcdTA0M0RcdTA0NEJcdTA0MzlcIjogXCImYVwiLFxuICAgICAgICAgICAgXCJcdTA0MjFcdTA0MzhcdTA0M0RcdTA0MzUtXHUwNDM3XHUwNDM1XHUwNDNCXHUwNDM1XHUwNDNEXHUwNDRCXHUwNDM5XCI6IFwiJmJcIixcbiAgICAgICAgICAgIFwiXHUwNDFBXHUwNDQwXHUwNDMwXHUwNDQxXHUwNDNEXHUwNDRCXHUwNDM5XCI6IFwiJmNcIixcbiAgICAgICAgICAgIFwiXHUwNDI0XHUwNDM4XHUwNDNFXHUwNDNCXHUwNDM1XHUwNDQyXHUwNDNFXHUwNDMyXHUwNDRCXHUwNDM5XCI6IFwiJmRcIixcbiAgICAgICAgICAgIFwiXHUwNDE2XHUwNDM1XHUwNDNCXHUwNDQyXHUwNDRCXHUwNDM5XCI6IFwiJmVcIixcbiAgICAgICAgICAgIFwiXHUwNDExXHUwNDM1XHUwNDNCXHUwNDRCXHUwNDM5XCI6IFwiJmZcIlxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGNvbG9yID0ge1xuICAgICAgICAgICAgJzEnOiAnYmx1ZScsXG4gICAgICAgICAgICAnMic6ICdncmVlbicsXG4gICAgICAgICAgICAnMyc6ICdkYXJrYXF1YScsXG4gICAgICAgICAgICAnNCc6ICdyZWQnLFxuICAgICAgICAgICAgJzUnOiAncHVycGxlJyxcbiAgICAgICAgICAgICc2JzogJ29yYW5nZScsXG4gICAgICAgICAgICAnNyc6ICdncmF5JyxcbiAgICAgICAgICAgICc4JzogJ2RhcmtncmF5JyxcbiAgICAgICAgICAgICc5JzogJ2xpZ2h0Ymx1ZScsXG4gICAgICAgICAgICAnMCc6ICdibGFjaycsXG4gICAgICAgICAgICAnYSc6ICdsaW1lJyxcbiAgICAgICAgICAgICdiJzogJ2FxdWEnLFxuICAgICAgICAgICAgJ2MnOiAnbGlnaHRyZWQnLFxuICAgICAgICAgICAgJ2QnOiAncGluaycsXG4gICAgICAgICAgICAnZSc6ICd5ZWxsb3cnLFxuICAgICAgICAgICAgJ2YnOiAnd2hpdGUnXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGlucHV0ID0gJCgnI2lucHV0Jyk7XG4gICAgICAgIHZhciBvdXRwdXQgPSAkKCcjb3V0cHV0Jyk7XG4gICAgICAgIHZhciBzZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVzZXJfbmlja19jb2xvclwiKTtcblxuICAgICAgICBzZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmVuZGVyKGlucHV0LnZhbCgpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIGFwcGVuZDtcblxuICAgICAgICBpbnB1dC5rZXl1cChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZW5kZXIoJCh0aGlzKS52YWwoKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIHJlbmRlcihzdHJpbmcpIHtcbiAgICAgICAgICAgIGFwcGVuZCA9ICcnO1xuICAgICAgICAgICAgb3V0cHV0Lmh0bWwocmVwbGFjZXJzKHN0cmluZykpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHJlcGxhY2Vyc19pbnB1dChzdHJpbmcpIHtcbiAgICAgICAgICAgIHJlcGxhY2VkID0gc3RyaW5nXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoLyZrL2dpLCAnJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvJmwvZ2ksICcnKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8mbS9naSwgJycpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoLyZuL2dpLCAnJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvJm8vZ2ksICcnKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8mci9naSwgJycpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcXFxuL2dpLCAnJyk7XG4gICAgICAgICAgICByZXR1cm4gcmVwbGFjZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiByZXBsYWNlcnMoc3RyaW5nKSB7XG4gICAgICAgICAgICBzdHJpbmcgPSAnJjdbJjZMJjddICcgKyBcIiY3W1wiICsgc3RyaW5nICsgXCImN10gXCIgKyBuaWNrX2NvbG9yW3NlbGVjdC52YWx1ZV0gKyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm91dHB1dFwiKS5nZXRBdHRyaWJ1dGUoXCJuaWNrbmFtZVwiKSArIFwiJjc6XCIgKyBcIiBIZWxsbyB3b3JsZFwiXG5cbiAgICAgICAgICAgIHJlcGxhY2VkID0gc3RyaW5nXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoLyYoW2EtZjAtOV0pL2dpLCBzZXRDb2xvcilcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvJmsvZ2ksICcnKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8mbC9naSwgJycpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoLyZtL2dpLCAnJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvJm4vZ2ksICcnKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8mby9naSwgJycpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoLyZyL2dpLCAnJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxcXG4vZ2ksICcnKTtcbiAgICAgICAgICAgIHJldHVybiByZXBsYWNlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHNldENvbG9yKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBjb2xvclttYXRjaC5zdWJzdHIoMSwgbWF0Y2gubGVuZ3RoKV07XG4gICAgICAgICAgICBhZGRDbG9zZTtcbiAgICAgICAgICAgIHJldHVybiAnPHNwYW4gY2xhc3M9XCInICsgdmFsdWUgKyAnXCI+JztcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZnVuY3Rpb24gYWRkQ2xvc2UoKSB7XG4gICAgICAgICAgICBhcHBlbmQgPSAnPC9zcGFuPicgKyBhcHBlbmQ7XG4gICAgICAgIH1cbiAgICAgICAgcmVuZGVyKGlucHV0LnZhbCgpKTtcbiAgICB9XG59XG5cblxubGV0IGxpdmVTb2NrZXQgPSBuZXcgTGl2ZVNvY2tldChcIi9saXZlXCIsIFNvY2tldCwgeyBob29rczogSG9va3MsIHBhcmFtczogeyBfY3NyZl90b2tlbjogY3NyZlRva2VuLCBfaG9zdDogd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lIH0gfSlcblxuLy8gU2hvdyBwcm9ncmVzcyBiYXIgb24gbGl2ZSBuYXZpZ2F0aW9uIGFuZCBmb3JtIHN1Ym1pdHNcbnRvcGJhci5jb25maWcoeyBiYXJDb2xvcnM6IHsgMDogXCIjMjlkXCIgfSwgc2hhZG93Q29sb3I6IFwicmdiYSgwLCAwLCAwLCAuMylcIiB9KVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBoeDpwYWdlLWxvYWRpbmctc3RhcnRcIiwgaW5mbyA9PiB7XG4gICAgdG9wYmFyLnNob3coKVxufSlcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGh4OnBhZ2UtbG9hZGluZy1zdG9wXCIsIGluZm8gPT4gdG9wYmFyLmhpZGUoKSlcblxuLy8gY29ubmVjdCBpZiB0aGVyZSBhcmUgYW55IExpdmVWaWV3cyBvbiB0aGUgcGFnZVxubGl2ZVNvY2tldC5jb25uZWN0KClcblxuLy8gZXhwb3NlIGxpdmVTb2NrZXQgb24gd2luZG93IGZvciB3ZWIgY29uc29sZSBkZWJ1ZyBsb2dzIGFuZCBsYXRlbmN5IHNpbXVsYXRpb246XG4vLyA+PiBsaXZlU29ja2V0LmVuYWJsZURlYnVnKClcbi8vID4+IGxpdmVTb2NrZXQuZW5hYmxlTGF0ZW5jeVNpbSgxMDAwKSAgLy8gZW5hYmxlZCBmb3IgZHVyYXRpb24gb2YgYnJvd3NlciBzZXNzaW9uXG4vLyA+PiBsaXZlU29ja2V0LmRpc2FibGVMYXRlbmN5U2ltKClcbndpbmRvdy5saXZlU29ja2V0ID0gbGl2ZVNvY2tldFxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBTUEsTUFBQyxVQUFVLFNBQVEsV0FBVTtBQUMzQjtBQUdBLFFBQUMsWUFBWTtBQUNYLGNBQUksV0FBVztBQUNmLGNBQUksVUFBVSxDQUFDLE1BQU0sT0FBTyxVQUFVO0FBQ3RDLG1CQUFTLElBQUksR0FBRyxJQUFJLFFBQVEsVUFBVSxDQUFDLFFBQU8sdUJBQXVCLEVBQUUsR0FBRztBQUN4RSxvQkFBTyx3QkFDTCxRQUFPLFFBQVEsS0FBSztBQUN0QixvQkFBTyx1QkFDTCxRQUFPLFFBQVEsS0FBSywyQkFDcEIsUUFBTyxRQUFRLEtBQUs7QUFBQTtBQUV4QixjQUFJLENBQUMsUUFBTztBQUNWLG9CQUFPLHdCQUF3QixTQUFVLFVBQVUsU0FBUztBQUMxRCxrQkFBSSxXQUFXLElBQUksT0FBTztBQUMxQixrQkFBSSxhQUFhLEtBQUssSUFBSSxHQUFHLEtBQU0sWUFBVztBQUM5QyxrQkFBSSxLQUFLLFFBQU8sV0FBVyxXQUFZO0FBQ3JDLHlCQUFTLFdBQVc7QUFBQSxpQkFDbkI7QUFDSCx5QkFBVyxXQUFXO0FBQ3RCLHFCQUFPO0FBQUE7QUFFWCxjQUFJLENBQUMsUUFBTztBQUNWLG9CQUFPLHVCQUF1QixTQUFVLElBQUk7QUFDMUMsMkJBQWE7QUFBQTtBQUFBO0FBSW5CLFlBQUksUUFDRixpQkFDQSxhQUNBLGlCQUNBLFNBQ0EsV0FBVyxTQUFVLE1BQU0sTUFBTSxTQUFTO0FBQ3hDLGNBQUksS0FBSztBQUFrQixpQkFBSyxpQkFBaUIsTUFBTSxTQUFTO0FBQUEsbUJBQ3ZELEtBQUs7QUFBYSxpQkFBSyxZQUFZLE9BQU8sTUFBTTtBQUFBO0FBQ3BELGlCQUFLLE9BQU8sUUFBUTtBQUFBLFdBRTNCLFVBQVU7QUFBQSxVQUNSLFNBQVM7QUFBQSxVQUNULGNBQWM7QUFBQSxVQUNkLFdBQVc7QUFBQSxZQUNULEdBQUc7QUFBQSxZQUNILE9BQU87QUFBQSxZQUNQLE9BQU87QUFBQSxZQUNQLE9BQU87QUFBQSxZQUNQLE9BQU87QUFBQTtBQUFBLFVBRVQsWUFBWTtBQUFBLFVBQ1osYUFBYTtBQUFBLFVBQ2IsV0FBVztBQUFBLFdBRWIsVUFBVSxXQUFZO0FBQ3BCLGlCQUFPLFFBQVEsUUFBTztBQUN0QixpQkFBTyxTQUFTLFFBQVEsZUFBZTtBQUV2QyxjQUFJLE1BQU0sT0FBTyxXQUFXO0FBQzVCLGNBQUksYUFBYSxRQUFRO0FBQ3pCLGNBQUksY0FBYyxRQUFRO0FBRTFCLGNBQUksZUFBZSxJQUFJLHFCQUFxQixHQUFHLEdBQUcsT0FBTyxPQUFPO0FBQ2hFLG1CQUFTLFFBQVEsUUFBUTtBQUN2Qix5QkFBYSxhQUFhLE1BQU0sUUFBUSxVQUFVO0FBQ3BELGNBQUksWUFBWSxRQUFRO0FBQ3hCLGNBQUk7QUFDSixjQUFJLE9BQU8sR0FBRyxRQUFRLGVBQWU7QUFDckMsY0FBSSxPQUNGLEtBQUssS0FBSyxrQkFBa0IsT0FBTyxRQUNuQyxRQUFRLGVBQWU7QUFFekIsY0FBSSxjQUFjO0FBQ2xCLGNBQUk7QUFBQSxXQUVOLGVBQWUsV0FBWTtBQUN6QixtQkFBUyxVQUFTLGNBQWM7QUFDaEMsY0FBSSxRQUFRLE9BQU87QUFDbkIsZ0JBQU0sV0FBVztBQUNqQixnQkFBTSxNQUFNLE1BQU0sT0FBTyxNQUFNLFFBQVEsTUFBTSxTQUFTLE1BQU0sVUFBVTtBQUN0RSxnQkFBTSxTQUFTO0FBQ2YsZ0JBQU0sVUFBVTtBQUNoQixjQUFJLFFBQVE7QUFBVyxtQkFBTyxVQUFVLElBQUksUUFBUTtBQUNwRCxvQkFBUyxLQUFLLFlBQVk7QUFDMUIsbUJBQVMsU0FBUSxVQUFVO0FBQUEsV0FFN0IsVUFBUztBQUFBLFVBQ1AsUUFBUSxTQUFVLE1BQU07QUFDdEIscUJBQVMsT0FBTztBQUNkLGtCQUFJLFFBQVEsZUFBZTtBQUFNLHdCQUFRLE9BQU8sS0FBSztBQUFBO0FBQUEsVUFFekQsTUFBTSxXQUFZO0FBQ2hCLGdCQUFJO0FBQVM7QUFDYixzQkFBVTtBQUNWLGdCQUFJLGdCQUFnQjtBQUFNLHNCQUFPLHFCQUFxQjtBQUN0RCxnQkFBSSxDQUFDO0FBQVE7QUFDYixtQkFBTyxNQUFNLFVBQVU7QUFDdkIsbUJBQU8sTUFBTSxVQUFVO0FBQ3ZCLG9CQUFPLFNBQVM7QUFDaEIsZ0JBQUksUUFBUSxTQUFTO0FBQ25CLGNBQUMsaUJBQWdCO0FBQ2Ysa0NBQWtCLFFBQU8sc0JBQXNCO0FBQy9DLHdCQUFPLFNBQ0wsTUFBTSxPQUFPLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxrQkFBa0I7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQUs5RCxVQUFVLFNBQVUsSUFBSTtBQUN0QixnQkFBSSxPQUFPLE9BQU87QUFBYSxxQkFBTztBQUN0QyxnQkFBSSxPQUFPLE9BQU8sVUFBVTtBQUMxQixtQkFDRyxJQUFHLFFBQVEsUUFBUSxLQUFLLEdBQUcsUUFBUSxRQUFRLElBQ3hDLGtCQUNBLEtBQUssV0FBVztBQUFBO0FBRXhCLDhCQUFrQixLQUFLLElBQUksSUFBSTtBQUMvQjtBQUNBLG1CQUFPO0FBQUE7QUFBQSxVQUVULE1BQU0sV0FBWTtBQUNoQixnQkFBSSxDQUFDO0FBQVM7QUFDZCxzQkFBVTtBQUNWLGdCQUFJLG1CQUFtQixNQUFNO0FBQzNCLHNCQUFPLHFCQUFxQjtBQUM1QixnQ0FBa0I7QUFBQTtBQUVwQixZQUFDLGlCQUFnQjtBQUNmLGtCQUFJLFFBQU8sU0FBUyxVQUFVLEdBQUc7QUFDL0IsdUJBQU8sTUFBTSxXQUFXO0FBQ3hCLG9CQUFJLE9BQU8sTUFBTSxXQUFXLE1BQU07QUFDaEMseUJBQU8sTUFBTSxVQUFVO0FBQ3ZCLGdDQUFjO0FBQ2Q7QUFBQTtBQUFBO0FBR0osNEJBQWMsUUFBTyxzQkFBc0I7QUFBQTtBQUFBO0FBQUE7QUFLbkQsWUFBSSxPQUFPLFdBQVcsWUFBWSxPQUFPLE9BQU8sWUFBWSxVQUFVO0FBQ3BFLGlCQUFPLFVBQVU7QUFBQSxtQkFDUixPQUFPLFdBQVcsY0FBYyxPQUFPLEtBQUs7QUFDckQsaUJBQU8sV0FBWTtBQUNqQixtQkFBTztBQUFBO0FBQUEsZUFFSjtBQUNMLGVBQUssU0FBUztBQUFBO0FBQUEsU0FFaEIsS0FBSyxTQUFNLFFBQVE7QUFBQTtBQUFBOzs7QUM1SnJCO0FBRUEsRUFBQyxZQUFXO0FBQ1YsUUFBSSxnQkFBZ0I7QUFFcEIsZ0NBQTRCO0FBQzFCLFVBQUksT0FBTyxPQUFPLGdCQUFnQjtBQUFZLGVBQU8sT0FBTztBQUU1RCw0QkFBcUIsT0FBTyxRQUFRO0FBQ2xDLGlCQUFTLFVBQVUsRUFBQyxTQUFTLE9BQU8sWUFBWSxPQUFPLFFBQVE7QUFDL0QsWUFBSSxNQUFNLFNBQVMsWUFBWTtBQUMvQixZQUFJLGdCQUFnQixPQUFPLE9BQU8sU0FBUyxPQUFPLFlBQVksT0FBTztBQUNyRSxlQUFPO0FBQUE7QUFFVCxtQkFBWSxZQUFZLE9BQU8sTUFBTTtBQUNyQyxhQUFPO0FBQUE7QUFHVCw4QkFBMEIsTUFBTSxPQUFPO0FBQ3JDLFVBQUksUUFBUSxTQUFTLGNBQWM7QUFDbkMsWUFBTSxPQUFPO0FBQ2IsWUFBTSxPQUFPO0FBQ2IsWUFBTSxRQUFRO0FBQ2QsYUFBTztBQUFBO0FBR1QseUJBQXFCLFNBQVMsbUJBQW1CO0FBQy9DLFVBQUksS0FBSyxRQUFRLGFBQWEsWUFDMUIsU0FBUyxpQkFBaUIsV0FBVyxRQUFRLGFBQWEsaUJBQzFELE9BQU8saUJBQWlCLGVBQWUsUUFBUSxhQUFhLGVBQzVELE9BQU8sU0FBUyxjQUFjLFNBQzlCLFNBQVMsUUFBUSxhQUFhO0FBRWxDLFdBQUssU0FBVSxRQUFRLGFBQWEsbUJBQW1CLFFBQVMsUUFBUTtBQUN4RSxXQUFLLFNBQVM7QUFDZCxXQUFLLE1BQU0sVUFBVTtBQUVyQixVQUFJO0FBQVEsYUFBSyxTQUFTO0FBQUEsZUFDakI7QUFBbUIsYUFBSyxTQUFTO0FBRTFDLFdBQUssWUFBWTtBQUNqQixXQUFLLFlBQVk7QUFDakIsZUFBUyxLQUFLLFlBQVk7QUFDMUIsV0FBSztBQUFBO0FBR1AsV0FBTyxpQkFBaUIsU0FBUyxTQUFTLEdBQUc7QUFDM0MsVUFBSSxVQUFVLEVBQUU7QUFDaEIsVUFBSSxFQUFFO0FBQWtCO0FBRXhCLGFBQU8sV0FBVyxRQUFRLGNBQWM7QUFDdEMsWUFBSSxtQkFBbUIsSUFBSSxjQUFjLHNCQUFzQjtBQUFBLFVBQzdELFdBQVc7QUFBQSxVQUFNLGNBQWM7QUFBQTtBQUdqQyxZQUFJLENBQUMsUUFBUSxjQUFjLG1CQUFtQjtBQUM1QyxZQUFFO0FBQ0YsWUFBRTtBQUNGLGlCQUFPO0FBQUE7QUFHVCxZQUFJLFFBQVEsYUFBYSxnQkFBZ0I7QUFDdkMsc0JBQVksU0FBUyxFQUFFLFdBQVcsRUFBRTtBQUNwQyxZQUFFO0FBQ0YsaUJBQU87QUFBQSxlQUNGO0FBQ0wsb0JBQVUsUUFBUTtBQUFBO0FBQUE7QUFBQSxPQUdyQjtBQUVILFdBQU8saUJBQWlCLHNCQUFzQixTQUFVLEdBQUc7QUFDekQsVUFBSSxVQUFVLEVBQUUsT0FBTyxhQUFhO0FBQ3BDLFVBQUcsV0FBVyxDQUFDLE9BQU8sUUFBUSxVQUFVO0FBQ3RDLFVBQUU7QUFBQTtBQUFBLE9BRUg7QUFBQTs7O0FDM0VFLE1BQUksVUFBVSxDQUFDLFVBQVU7QUFDOUIsUUFBRyxPQUFPLFVBQVUsWUFBVztBQUM3QixhQUFPO1dBQ0Y7QUFDTCxVQUFJLFlBQVUsV0FBVztBQUFFLGVBQU87O0FBQ2xDLGFBQU87OztBQ05KLE1BQU0sYUFBYSxPQUFPLFNBQVMsY0FBYyxPQUFPO0FBQ3hELE1BQU0sWUFBWSxPQUFPLFdBQVcsY0FBYyxTQUFTO0FBQzNELE1BQU0sU0FBUyxjQUFjLGFBQWE7QUFDMUMsTUFBTSxjQUFjO0FBQ3BCLE1BQU0sZ0JBQWdCLEVBQUMsWUFBWSxHQUFHLE1BQU0sR0FBRyxTQUFTLEdBQUcsUUFBUTtBQUNuRSxNQUFNLGtCQUFrQjtBQUN4QixNQUFNLGtCQUFrQjtBQUN4QixNQUFNLGlCQUFpQjtJQUM1QixRQUFRO0lBQ1IsU0FBUztJQUNULFFBQVE7SUFDUixTQUFTO0lBQ1QsU0FBUzs7QUFFSixNQUFNLGlCQUFpQjtJQUM1QixPQUFPO0lBQ1AsT0FBTztJQUNQLE1BQU07SUFDTixPQUFPO0lBQ1AsT0FBTzs7QUFHRixNQUFNLGFBQWE7SUFDeEIsVUFBVTtJQUNWLFdBQVc7O0FBRU4sTUFBTSxhQUFhO0lBQ3hCLFVBQVU7O0FDcEJaLE1BQUEsT0FBQSxNQUEwQjtJQUN4QixZQUFZLFNBQVMsT0FBTyxTQUFTLFNBQVE7QUFDM0MsV0FBSyxVQUFVO0FBQ2YsV0FBSyxRQUFRO0FBQ2IsV0FBSyxVQUFVLFdBQVcsV0FBVztBQUFFLGVBQU87O0FBQzlDLFdBQUssZUFBZTtBQUNwQixXQUFLLFVBQVU7QUFDZixXQUFLLGVBQWU7QUFDcEIsV0FBSyxXQUFXO0FBQ2hCLFdBQUssT0FBTzs7SUFPZCxPQUFPLFNBQVE7QUFDYixXQUFLLFVBQVU7QUFDZixXQUFLO0FBQ0wsV0FBSzs7SUFNUCxPQUFNO0FBQ0osVUFBRyxLQUFLLFlBQVksWUFBVztBQUFFOztBQUNqQyxXQUFLO0FBQ0wsV0FBSyxPQUFPO0FBQ1osV0FBSyxRQUFRLE9BQU8sS0FBSztRQUN2QixPQUFPLEtBQUssUUFBUTtRQUNwQixPQUFPLEtBQUs7UUFDWixTQUFTLEtBQUs7UUFDZCxLQUFLLEtBQUs7UUFDVixVQUFVLEtBQUssUUFBUTs7O0lBUzNCLFFBQVEsUUFBUSxVQUFTO0FBQ3ZCLFVBQUcsS0FBSyxZQUFZLFNBQVE7QUFDMUIsaUJBQVMsS0FBSyxhQUFhOztBQUc3QixXQUFLLFNBQVMsS0FBSyxFQUFDLFFBQVE7QUFDNUIsYUFBTzs7SUFNVCxRQUFPO0FBQ0wsV0FBSztBQUNMLFdBQUssTUFBTTtBQUNYLFdBQUssV0FBVztBQUNoQixXQUFLLGVBQWU7QUFDcEIsV0FBSyxPQUFPOztJQU1kLGFBQWEsRUFBQyxRQUFRLFVBQVUsUUFBTTtBQUNwQyxXQUFLLFNBQVMsT0FBTyxDQUFBLE1BQUssRUFBRSxXQUFXLFFBQ3BDLFFBQVEsQ0FBQSxNQUFLLEVBQUUsU0FBUzs7SUFNN0IsaUJBQWdCO0FBQ2QsVUFBRyxDQUFDLEtBQUssVUFBUztBQUFFOztBQUNwQixXQUFLLFFBQVEsSUFBSSxLQUFLOztJQU14QixnQkFBZTtBQUNiLG1CQUFhLEtBQUs7QUFDbEIsV0FBSyxlQUFlOztJQU10QixlQUFjO0FBQ1osVUFBRyxLQUFLLGNBQWE7QUFBRSxhQUFLOztBQUM1QixXQUFLLE1BQU0sS0FBSyxRQUFRLE9BQU87QUFDL0IsV0FBSyxXQUFXLEtBQUssUUFBUSxlQUFlLEtBQUs7QUFFakQsV0FBSyxRQUFRLEdBQUcsS0FBSyxVQUFVLENBQUEsWUFBVztBQUN4QyxhQUFLO0FBQ0wsYUFBSztBQUNMLGFBQUssZUFBZTtBQUNwQixhQUFLLGFBQWE7O0FBR3BCLFdBQUssZUFBZSxXQUFXLE1BQU07QUFDbkMsYUFBSyxRQUFRLFdBQVc7U0FDdkIsS0FBSzs7SUFNVixZQUFZLFFBQU87QUFDakIsYUFBTyxLQUFLLGdCQUFnQixLQUFLLGFBQWEsV0FBVzs7SUFNM0QsUUFBUSxRQUFRLFVBQVM7QUFDdkIsV0FBSyxRQUFRLFFBQVEsS0FBSyxVQUFVLEVBQUMsUUFBUTs7O0FDNUdqRCxNQUFBLFFBQUEsTUFBMkI7SUFDekIsWUFBWSxVQUFVLFdBQVU7QUFDOUIsV0FBSyxXQUFXO0FBQ2hCLFdBQUssWUFBWTtBQUNqQixXQUFLLFFBQVE7QUFDYixXQUFLLFFBQVE7O0lBR2YsUUFBTztBQUNMLFdBQUssUUFBUTtBQUNiLG1CQUFhLEtBQUs7O0lBTXBCLGtCQUFpQjtBQUNmLG1CQUFhLEtBQUs7QUFFbEIsV0FBSyxRQUFRLFdBQVcsTUFBTTtBQUM1QixhQUFLLFFBQVEsS0FBSyxRQUFRO0FBQzFCLGFBQUs7U0FDSixLQUFLLFVBQVUsS0FBSyxRQUFROzs7QUN4Qm5DLE1BQUEsVUFBQSxNQUE2QjtJQUMzQixZQUFZLE9BQU8sUUFBUSxRQUFPO0FBQ2hDLFdBQUssUUFBUSxlQUFlO0FBQzVCLFdBQUssUUFBUTtBQUNiLFdBQUssU0FBUyxRQUFRLFVBQVU7QUFDaEMsV0FBSyxTQUFTO0FBQ2QsV0FBSyxXQUFXO0FBQ2hCLFdBQUssYUFBYTtBQUNsQixXQUFLLFVBQVUsS0FBSyxPQUFPO0FBQzNCLFdBQUssYUFBYTtBQUNsQixXQUFLLFdBQVcsSUFBSSxLQUFLLE1BQU0sZUFBZSxNQUFNLEtBQUssUUFBUSxLQUFLO0FBQ3RFLFdBQUssYUFBYTtBQUNsQixXQUFLLGtCQUFrQjtBQUV2QixXQUFLLGNBQWMsSUFBSSxNQUFNLE1BQU07QUFDakMsWUFBRyxLQUFLLE9BQU8sZUFBYztBQUFFLGVBQUs7O1NBQ25DLEtBQUssT0FBTztBQUNmLFdBQUssZ0JBQWdCLEtBQUssS0FBSyxPQUFPLFFBQVEsTUFBTSxLQUFLLFlBQVk7QUFDckUsV0FBSyxnQkFBZ0IsS0FBSyxLQUFLLE9BQU8sT0FBTyxNQUFNO0FBQ2pELGFBQUssWUFBWTtBQUNqQixZQUFHLEtBQUssYUFBWTtBQUFFLGVBQUs7OztBQUc3QixXQUFLLFNBQVMsUUFBUSxNQUFNLE1BQU07QUFDaEMsYUFBSyxRQUFRLGVBQWU7QUFDNUIsYUFBSyxZQUFZO0FBQ2pCLGFBQUssV0FBVyxRQUFRLENBQUEsY0FBYSxVQUFVO0FBQy9DLGFBQUssYUFBYTs7QUFFcEIsV0FBSyxTQUFTLFFBQVEsU0FBUyxNQUFNO0FBQ25DLGFBQUssUUFBUSxlQUFlO0FBQzVCLFlBQUcsS0FBSyxPQUFPLGVBQWM7QUFBRSxlQUFLLFlBQVk7OztBQUVsRCxXQUFLLFFBQVEsTUFBTTtBQUNqQixhQUFLLFlBQVk7QUFDakIsWUFBRyxLQUFLLE9BQU87QUFBYSxlQUFLLE9BQU8sSUFBSSxXQUFXLFNBQVMsS0FBSyxTQUFTLEtBQUs7QUFDbkYsYUFBSyxRQUFRLGVBQWU7QUFDNUIsYUFBSyxPQUFPLE9BQU87O0FBRXJCLFdBQUssUUFBUSxDQUFBLFdBQVU7QUFDckIsWUFBRyxLQUFLLE9BQU87QUFBYSxlQUFLLE9BQU8sSUFBSSxXQUFXLFNBQVMsS0FBSyxTQUFTO0FBQzlFLFlBQUcsS0FBSyxhQUFZO0FBQUUsZUFBSyxTQUFTOztBQUNwQyxhQUFLLFFBQVEsZUFBZTtBQUM1QixZQUFHLEtBQUssT0FBTyxlQUFjO0FBQUUsZUFBSyxZQUFZOzs7QUFFbEQsV0FBSyxTQUFTLFFBQVEsV0FBVyxNQUFNO0FBQ3JDLFlBQUcsS0FBSyxPQUFPO0FBQWEsZUFBSyxPQUFPLElBQUksV0FBVyxXQUFXLEtBQUssVUFBVSxLQUFLLGNBQWMsS0FBSyxTQUFTO0FBQ2xILFlBQUksWUFBWSxJQUFJLEtBQUssTUFBTSxlQUFlLE9BQU8sUUFBUSxLQUFLLEtBQUs7QUFDdkUsa0JBQVU7QUFDVixhQUFLLFFBQVEsZUFBZTtBQUM1QixhQUFLLFNBQVM7QUFDZCxZQUFHLEtBQUssT0FBTyxlQUFjO0FBQUUsZUFBSyxZQUFZOzs7QUFFbEQsV0FBSyxHQUFHLGVBQWUsT0FBTyxDQUFDLFNBQVMsUUFBUTtBQUM5QyxhQUFLLFFBQVEsS0FBSyxlQUFlLE1BQU07OztJQVMzQyxLQUFLLFVBQVUsS0FBSyxTQUFRO0FBQzFCLFVBQUcsS0FBSyxZQUFXO0FBQ2pCLGNBQU0sSUFBSSxNQUFNO2FBQ1g7QUFDTCxhQUFLLFVBQVU7QUFDZixhQUFLLGFBQWE7QUFDbEIsYUFBSztBQUNMLGVBQU8sS0FBSzs7O0lBUWhCLFFBQVEsVUFBUztBQUNmLFdBQUssR0FBRyxlQUFlLE9BQU87O0lBT2hDLFFBQVEsVUFBUztBQUNmLGFBQU8sS0FBSyxHQUFHLGVBQWUsT0FBTyxDQUFBLFdBQVUsU0FBUzs7SUFvQjFELEdBQUcsT0FBTyxVQUFTO0FBQ2pCLFVBQUksTUFBTSxLQUFLO0FBQ2YsV0FBSyxTQUFTLEtBQUssRUFBQyxPQUFPLEtBQUs7QUFDaEMsYUFBTzs7SUFxQlQsSUFBSSxPQUFPLEtBQUk7QUFDYixXQUFLLFdBQVcsS0FBSyxTQUFTLE9BQU8sQ0FBQyxTQUFTO0FBQzdDLGVBQU8sQ0FBRSxNQUFLLFVBQVUsU0FBVSxRQUFPLFFBQVEsZUFBZSxRQUFRLEtBQUs7OztJQU9qRixVQUFTO0FBQUUsYUFBTyxLQUFLLE9BQU8saUJBQWlCLEtBQUs7O0lBa0JwRCxLQUFLLE9BQU8sU0FBUyxVQUFVLEtBQUssU0FBUTtBQUMxQyxnQkFBVSxXQUFXO0FBQ3JCLFVBQUcsQ0FBQyxLQUFLLFlBQVc7QUFDbEIsY0FBTSxJQUFJLE1BQU0sa0JBQWtCLGNBQWMsS0FBSzs7QUFFdkQsVUFBSSxZQUFZLElBQUksS0FBSyxNQUFNLE9BQU8sV0FBVztBQUFFLGVBQU87U0FBVztBQUNyRSxVQUFHLEtBQUssV0FBVTtBQUNoQixrQkFBVTthQUNMO0FBQ0wsa0JBQVU7QUFDVixhQUFLLFdBQVcsS0FBSzs7QUFHdkIsYUFBTzs7SUFtQlQsTUFBTSxVQUFVLEtBQUssU0FBUTtBQUMzQixXQUFLLFlBQVk7QUFDakIsV0FBSyxTQUFTO0FBRWQsV0FBSyxRQUFRLGVBQWU7QUFDNUIsVUFBSSxVQUFVLE1BQU07QUFDbEIsWUFBRyxLQUFLLE9BQU87QUFBYSxlQUFLLE9BQU8sSUFBSSxXQUFXLFNBQVMsS0FBSztBQUNyRSxhQUFLLFFBQVEsZUFBZSxPQUFPOztBQUVyQyxVQUFJLFlBQVksSUFBSSxLQUFLLE1BQU0sZUFBZSxPQUFPLFFBQVEsS0FBSztBQUNsRSxnQkFBVSxRQUFRLE1BQU0sTUFBTSxXQUMzQixRQUFRLFdBQVcsTUFBTTtBQUM1QixnQkFBVTtBQUNWLFVBQUcsQ0FBQyxLQUFLLFdBQVU7QUFBRSxrQkFBVSxRQUFRLE1BQU07O0FBRTdDLGFBQU87O0lBZVQsVUFBVSxRQUFRLFNBQVMsTUFBSztBQUFFLGFBQU87O0lBS3pDLFNBQVMsT0FBTyxPQUFPLFNBQVMsU0FBUTtBQUN0QyxVQUFHLEtBQUssVUFBVSxPQUFNO0FBQUUsZUFBTzs7QUFFakMsVUFBRyxXQUFXLFlBQVksS0FBSyxXQUFVO0FBQ3ZDLFlBQUcsS0FBSyxPQUFPO0FBQWEsZUFBSyxPQUFPLElBQUksV0FBVyw2QkFBNkIsRUFBQyxPQUFPLE9BQU8sU0FBUztBQUM1RyxlQUFPO2FBQ0Y7QUFDTCxlQUFPOzs7SUFPWCxVQUFTO0FBQUUsYUFBTyxLQUFLLFNBQVM7O0lBS2hDLE9BQU8sVUFBVSxLQUFLLFNBQVE7QUFDNUIsVUFBRyxLQUFLLGFBQVk7QUFBRTs7QUFDdEIsV0FBSyxPQUFPLGVBQWUsS0FBSztBQUNoQyxXQUFLLFFBQVEsZUFBZTtBQUM1QixXQUFLLFNBQVMsT0FBTzs7SUFNdkIsUUFBUSxPQUFPLFNBQVMsS0FBSyxTQUFRO0FBQ25DLFVBQUksaUJBQWlCLEtBQUssVUFBVSxPQUFPLFNBQVMsS0FBSztBQUN6RCxVQUFHLFdBQVcsQ0FBQyxnQkFBZTtBQUFFLGNBQU0sSUFBSSxNQUFNOztBQUVoRCxVQUFJLGdCQUFnQixLQUFLLFNBQVMsT0FBTyxDQUFBLFNBQVEsS0FBSyxVQUFVO0FBRWhFLGVBQVEsSUFBSSxHQUFHLElBQUksY0FBYyxRQUFRLEtBQUk7QUFDM0MsWUFBSSxPQUFPLGNBQWM7QUFDekIsYUFBSyxTQUFTLGdCQUFnQixLQUFLLFdBQVcsS0FBSzs7O0lBT3ZELGVBQWUsS0FBSTtBQUFFLGFBQU8sY0FBYzs7SUFLMUMsV0FBVTtBQUFFLGFBQU8sS0FBSyxVQUFVLGVBQWU7O0lBS2pELFlBQVc7QUFBRSxhQUFPLEtBQUssVUFBVSxlQUFlOztJQUtsRCxXQUFVO0FBQUUsYUFBTyxLQUFLLFVBQVUsZUFBZTs7SUFLakQsWUFBVztBQUFFLGFBQU8sS0FBSyxVQUFVLGVBQWU7O0lBS2xELFlBQVc7QUFBRSxhQUFPLEtBQUssVUFBVSxlQUFlOzs7QUNoVHBELE1BQUEsT0FBQSxNQUEwQjtXQUVqQixRQUFRLFFBQVEsVUFBVSxRQUFRLE1BQU0sU0FBUyxXQUFXLFVBQVM7QUFDMUUsVUFBRyxPQUFPLGdCQUFlO0FBQ3ZCLFlBQUksTUFBTSxJQUFJLE9BQU87QUFDckIsYUFBSyxlQUFlLEtBQUssUUFBUSxVQUFVLE1BQU0sU0FBUyxXQUFXO2FBQ2hFO0FBQ0wsWUFBSSxNQUFNLElBQUksT0FBTztBQUNyQixhQUFLLFdBQVcsS0FBSyxRQUFRLFVBQVUsUUFBUSxNQUFNLFNBQVMsV0FBVzs7O1dBSXRFLGVBQWUsS0FBSyxRQUFRLFVBQVUsTUFBTSxTQUFTLFdBQVcsVUFBUztBQUM5RSxVQUFJLFVBQVU7QUFDZCxVQUFJLEtBQUssUUFBUTtBQUNqQixVQUFJLFNBQVMsTUFBTTtBQUNqQixZQUFJLFdBQVcsS0FBSyxVQUFVLElBQUk7QUFDbEMsb0JBQVksU0FBUzs7QUFFdkIsVUFBRyxXQUFVO0FBQUUsWUFBSSxZQUFZOztBQUcvQixVQUFJLGFBQWEsTUFBTTs7QUFFdkIsVUFBSSxLQUFLOztXQUdKLFdBQVcsS0FBSyxRQUFRLFVBQVUsUUFBUSxNQUFNLFNBQVMsV0FBVyxVQUFTO0FBQ2xGLFVBQUksS0FBSyxRQUFRLFVBQVU7QUFDM0IsVUFBSSxVQUFVO0FBQ2QsVUFBSSxpQkFBaUIsZ0JBQWdCO0FBQ3JDLFVBQUksVUFBVSxNQUFNO0FBQUUsb0JBQVksU0FBUzs7QUFDM0MsVUFBSSxxQkFBcUIsTUFBTTtBQUM3QixZQUFHLElBQUksZUFBZSxXQUFXLFlBQVksVUFBUztBQUNwRCxjQUFJLFdBQVcsS0FBSyxVQUFVLElBQUk7QUFDbEMsbUJBQVM7OztBQUdiLFVBQUcsV0FBVTtBQUFFLFlBQUksWUFBWTs7QUFFL0IsVUFBSSxLQUFLOztXQUdKLFVBQVUsTUFBSztBQUNwQixVQUFHLENBQUMsUUFBUSxTQUFTLElBQUc7QUFBRSxlQUFPOztBQUVqQyxVQUFJO0FBQ0YsZUFBTyxLQUFLLE1BQU07ZUFDWCxHQURXO0FBRWxCLG1CQUFXLFFBQVEsSUFBSSxpQ0FBaUM7QUFDeEQsZUFBTzs7O1dBSUosVUFBVSxLQUFLLFdBQVU7QUFDOUIsVUFBSSxXQUFXO0FBQ2YsZUFBUSxPQUFPLEtBQUk7QUFDakIsWUFBRyxDQUFDLE9BQU8sVUFBVSxlQUFlLEtBQUssS0FBSyxNQUFLO0FBQUU7O0FBQ3JELFlBQUksV0FBVyxZQUFZLEdBQUcsYUFBYSxTQUFTO0FBQ3BELFlBQUksV0FBVyxJQUFJO0FBQ25CLFlBQUcsT0FBTyxhQUFhLFVBQVM7QUFDOUIsbUJBQVMsS0FBSyxLQUFLLFVBQVUsVUFBVTtlQUNsQztBQUNMLG1CQUFTLEtBQUssbUJBQW1CLFlBQVksTUFBTSxtQkFBbUI7OztBQUcxRSxhQUFPLFNBQVMsS0FBSzs7V0FHaEIsYUFBYSxLQUFLLFFBQU87QUFDOUIsVUFBRyxPQUFPLEtBQUssUUFBUSxXQUFXLEdBQUU7QUFBRSxlQUFPOztBQUU3QyxVQUFJLFNBQVMsSUFBSSxNQUFNLFFBQVEsTUFBTTtBQUNyQyxhQUFPLEdBQUcsTUFBTSxTQUFTLEtBQUssVUFBVTs7O0FDdkU1QyxNQUFBLFdBQUEsTUFBOEI7SUFFNUIsWUFBWSxVQUFTO0FBQ25CLFdBQUssV0FBVztBQUNoQixXQUFLLFFBQVE7QUFDYixXQUFLLGdCQUFnQjtBQUNyQixXQUFLLFNBQVMsV0FBVzs7QUFDekIsV0FBSyxVQUFVLFdBQVc7O0FBQzFCLFdBQUssWUFBWSxXQUFXOztBQUM1QixXQUFLLFVBQVUsV0FBVzs7QUFDMUIsV0FBSyxlQUFlLEtBQUssa0JBQWtCO0FBQzNDLFdBQUssYUFBYSxjQUFjO0FBRWhDLFdBQUs7O0lBR1Asa0JBQWtCLFVBQVM7QUFDekIsYUFBUSxTQUNMLFFBQVEsU0FBUyxXQUNqQixRQUFRLFVBQVUsWUFDbEIsUUFBUSxJQUFJLE9BQU8sVUFBVyxXQUFXLFlBQVksUUFBUSxXQUFXOztJQUc3RSxjQUFhO0FBQ1gsYUFBTyxLQUFLLGFBQWEsS0FBSyxjQUFjLEVBQUMsT0FBTyxLQUFLOztJQUczRCxnQkFBZTtBQUNiLFdBQUs7QUFDTCxXQUFLLGFBQWEsY0FBYzs7SUFHbEMsWUFBVztBQUNULFdBQUssUUFBUTtBQUNiLFdBQUs7O0lBR1AsT0FBTTtBQUNKLFVBQUcsQ0FBRSxNQUFLLGVBQWUsY0FBYyxRQUFRLEtBQUssZUFBZSxjQUFjLGFBQVk7QUFBRTs7QUFFL0YsV0FBSyxRQUFRLE9BQU8sS0FBSyxlQUFlLG9CQUFvQixNQUFNLEtBQUssU0FBUyxLQUFLLFVBQVUsS0FBSyxPQUFPLENBQUMsU0FBUztBQUNuSCxZQUFHLE1BQUs7QUFDTixjQUFJLEVBQUMsUUFBUSxPQUFPLGFBQVk7QUFDaEMsZUFBSyxRQUFRO2VBQ1I7QUFDTCxtQkFBUzs7QUFHWCxnQkFBTztlQUNBO0FBQ0gscUJBQVMsUUFBUSxDQUFBLFFBQU87QUFtQnRCLHlCQUFXLE1BQU07QUFDZixxQkFBSyxVQUFVLEVBQUMsTUFBTTtpQkFDckI7O0FBRUwsaUJBQUs7QUFDTDtlQUNHO0FBQ0gsaUJBQUs7QUFDTDtlQUNHO0FBQ0gsaUJBQUssYUFBYSxjQUFjO0FBQ2hDLGlCQUFLO0FBQ0wsaUJBQUs7QUFDTDtlQUNHO0FBQ0gsaUJBQUs7QUFDTCxpQkFBSztBQUNMO2VBQ0c7ZUFDQTtBQUNILGlCQUFLO0FBQ0wsaUJBQUs7QUFDTDs7QUFDTyxrQkFBTSxJQUFJLE1BQU0seUJBQXlCOzs7O0lBS3hELEtBQUssTUFBSztBQUNSLFdBQUssUUFBUSxRQUFRLEtBQUssZUFBZSxvQkFBb0IsTUFBTSxLQUFLLFNBQVMsS0FBSyxRQUFRLEtBQUssTUFBTSxZQUFZLENBQUMsU0FBUztBQUM3SCxZQUFHLENBQUMsUUFBUSxLQUFLLFdBQVcsS0FBSTtBQUM5QixlQUFLLFFBQVEsUUFBUSxLQUFLO0FBQzFCLGVBQUs7Ozs7SUFLWCxNQUFNLE9BQU8sU0FBUTtBQUNuQixXQUFLLGFBQWEsY0FBYztBQUNoQyxXQUFLOzs7QUU5R1QsTUFBTyxxQkFBUTtJQUNiLGVBQWU7SUFDZixhQUFhO0lBQ2IsT0FBTyxFQUFDLE1BQU0sR0FBRyxPQUFPLEdBQUcsV0FBVztJQUV0QyxPQUFPLEtBQUssVUFBUztBQUNuQixVQUFHLElBQUksUUFBUSxnQkFBZ0IsYUFBWTtBQUN6QyxlQUFPLFNBQVMsS0FBSyxhQUFhO2FBQzdCO0FBQ0wsWUFBSSxVQUFVLENBQUMsSUFBSSxVQUFVLElBQUksS0FBSyxJQUFJLE9BQU8sSUFBSSxPQUFPLElBQUk7QUFDaEUsZUFBTyxTQUFTLEtBQUssVUFBVTs7O0lBSW5DLE9BQU8sWUFBWSxVQUFTO0FBQzFCLFVBQUcsV0FBVyxnQkFBZ0IsYUFBWTtBQUN4QyxlQUFPLFNBQVMsS0FBSyxhQUFhO2FBQzdCO0FBQ0wsWUFBSSxDQUFDLFVBQVUsS0FBSyxPQUFPLE9BQU8sV0FBVyxLQUFLLE1BQU07QUFDeEQsZUFBTyxTQUFTLEVBQUMsVUFBVSxLQUFLLE9BQU8sT0FBTzs7O0lBTWxELGFBQWEsU0FBUTtBQUNuQixVQUFJLEVBQUMsVUFBVSxLQUFLLE9BQU8sT0FBTyxZQUFXO0FBQzdDLFVBQUksYUFBYSxLQUFLLGNBQWMsU0FBUyxTQUFTLElBQUksU0FBUyxNQUFNLFNBQVMsTUFBTTtBQUN4RixVQUFJLFNBQVMsSUFBSSxZQUFZLEtBQUssZ0JBQWdCO0FBQ2xELFVBQUksT0FBTyxJQUFJLFNBQVM7QUFDeEIsVUFBSSxTQUFTO0FBRWIsV0FBSyxTQUFTLFVBQVUsS0FBSyxNQUFNO0FBQ25DLFdBQUssU0FBUyxVQUFVLFNBQVM7QUFDakMsV0FBSyxTQUFTLFVBQVUsSUFBSTtBQUM1QixXQUFLLFNBQVMsVUFBVSxNQUFNO0FBQzlCLFdBQUssU0FBUyxVQUFVLE1BQU07QUFDOUIsWUFBTSxLQUFLLFVBQVUsQ0FBQSxTQUFRLEtBQUssU0FBUyxVQUFVLEtBQUssV0FBVztBQUNyRSxZQUFNLEtBQUssS0FBSyxDQUFBLFNBQVEsS0FBSyxTQUFTLFVBQVUsS0FBSyxXQUFXO0FBQ2hFLFlBQU0sS0FBSyxPQUFPLENBQUEsU0FBUSxLQUFLLFNBQVMsVUFBVSxLQUFLLFdBQVc7QUFDbEUsWUFBTSxLQUFLLE9BQU8sQ0FBQSxTQUFRLEtBQUssU0FBUyxVQUFVLEtBQUssV0FBVztBQUVsRSxVQUFJLFdBQVcsSUFBSSxXQUFXLE9BQU8sYUFBYSxRQUFRO0FBQzFELGVBQVMsSUFBSSxJQUFJLFdBQVcsU0FBUztBQUNyQyxlQUFTLElBQUksSUFBSSxXQUFXLFVBQVUsT0FBTztBQUU3QyxhQUFPLFNBQVM7O0lBR2xCLGFBQWEsUUFBTztBQUNsQixVQUFJLE9BQU8sSUFBSSxTQUFTO0FBQ3hCLFVBQUksT0FBTyxLQUFLLFNBQVM7QUFDekIsVUFBSSxVQUFVLElBQUk7QUFDbEIsY0FBTzthQUNBLEtBQUssTUFBTTtBQUFNLGlCQUFPLEtBQUssV0FBVyxRQUFRLE1BQU07YUFDdEQsS0FBSyxNQUFNO0FBQU8saUJBQU8sS0FBSyxZQUFZLFFBQVEsTUFBTTthQUN4RCxLQUFLLE1BQU07QUFBVyxpQkFBTyxLQUFLLGdCQUFnQixRQUFRLE1BQU07OztJQUl6RSxXQUFXLFFBQVEsTUFBTSxTQUFRO0FBQy9CLFVBQUksY0FBYyxLQUFLLFNBQVM7QUFDaEMsVUFBSSxZQUFZLEtBQUssU0FBUztBQUM5QixVQUFJLFlBQVksS0FBSyxTQUFTO0FBQzlCLFVBQUksU0FBUyxLQUFLLGdCQUFnQixLQUFLLGNBQWM7QUFDckQsVUFBSSxVQUFVLFFBQVEsT0FBTyxPQUFPLE1BQU0sUUFBUSxTQUFTO0FBQzNELGVBQVMsU0FBUztBQUNsQixVQUFJLFFBQVEsUUFBUSxPQUFPLE9BQU8sTUFBTSxRQUFRLFNBQVM7QUFDekQsZUFBUyxTQUFTO0FBQ2xCLFVBQUksUUFBUSxRQUFRLE9BQU8sT0FBTyxNQUFNLFFBQVEsU0FBUztBQUN6RCxlQUFTLFNBQVM7QUFDbEIsVUFBSSxPQUFPLE9BQU8sTUFBTSxRQUFRLE9BQU87QUFDdkMsYUFBTyxFQUFDLFVBQVUsU0FBUyxLQUFLLE1BQU0sT0FBYyxPQUFjLFNBQVM7O0lBRzdFLFlBQVksUUFBUSxNQUFNLFNBQVE7QUFDaEMsVUFBSSxjQUFjLEtBQUssU0FBUztBQUNoQyxVQUFJLFVBQVUsS0FBSyxTQUFTO0FBQzVCLFVBQUksWUFBWSxLQUFLLFNBQVM7QUFDOUIsVUFBSSxZQUFZLEtBQUssU0FBUztBQUM5QixVQUFJLFNBQVMsS0FBSyxnQkFBZ0IsS0FBSztBQUN2QyxVQUFJLFVBQVUsUUFBUSxPQUFPLE9BQU8sTUFBTSxRQUFRLFNBQVM7QUFDM0QsZUFBUyxTQUFTO0FBQ2xCLFVBQUksTUFBTSxRQUFRLE9BQU8sT0FBTyxNQUFNLFFBQVEsU0FBUztBQUN2RCxlQUFTLFNBQVM7QUFDbEIsVUFBSSxRQUFRLFFBQVEsT0FBTyxPQUFPLE1BQU0sUUFBUSxTQUFTO0FBQ3pELGVBQVMsU0FBUztBQUNsQixVQUFJLFFBQVEsUUFBUSxPQUFPLE9BQU8sTUFBTSxRQUFRLFNBQVM7QUFDekQsZUFBUyxTQUFTO0FBQ2xCLFVBQUksT0FBTyxPQUFPLE1BQU0sUUFBUSxPQUFPO0FBQ3ZDLFVBQUksVUFBVSxFQUFDLFFBQVEsT0FBTyxVQUFVO0FBQ3hDLGFBQU8sRUFBQyxVQUFVLFNBQVMsS0FBVSxPQUFjLE9BQU8sZUFBZSxPQUFPOztJQUdsRixnQkFBZ0IsUUFBUSxNQUFNLFNBQVE7QUFDcEMsVUFBSSxZQUFZLEtBQUssU0FBUztBQUM5QixVQUFJLFlBQVksS0FBSyxTQUFTO0FBQzlCLFVBQUksU0FBUyxLQUFLLGdCQUFnQjtBQUNsQyxVQUFJLFFBQVEsUUFBUSxPQUFPLE9BQU8sTUFBTSxRQUFRLFNBQVM7QUFDekQsZUFBUyxTQUFTO0FBQ2xCLFVBQUksUUFBUSxRQUFRLE9BQU8sT0FBTyxNQUFNLFFBQVEsU0FBUztBQUN6RCxlQUFTLFNBQVM7QUFDbEIsVUFBSSxPQUFPLE9BQU8sTUFBTSxRQUFRLE9BQU87QUFFdkMsYUFBTyxFQUFDLFVBQVUsTUFBTSxLQUFLLE1BQU0sT0FBYyxPQUFjLFNBQVM7OztBQ3BCNUUsTUFBQSxTQUFBLE1BQTRCO0lBQzFCLFlBQVksVUFBVSxPQUFPLElBQUc7QUFDOUIsV0FBSyx1QkFBdUIsRUFBQyxNQUFNLElBQUksT0FBTyxJQUFJLE9BQU8sSUFBSSxTQUFTO0FBQ3RFLFdBQUssV0FBVztBQUNoQixXQUFLLGFBQWE7QUFDbEIsV0FBSyxNQUFNO0FBQ1gsV0FBSyxVQUFVLEtBQUssV0FBVztBQUMvQixXQUFLLFlBQVksS0FBSyxhQUFhLE9BQU8sYUFBYTtBQUN2RCxXQUFLLHlCQUF5QjtBQUM5QixXQUFLLGlCQUFpQixtQkFBVyxPQUFPLEtBQUs7QUFDN0MsV0FBSyxpQkFBaUIsbUJBQVcsT0FBTyxLQUFLO0FBQzdDLFdBQUssZ0JBQWdCO0FBQ3JCLFdBQUssYUFBYSxLQUFLLGNBQWM7QUFDckMsV0FBSyxlQUFlO0FBQ3BCLFVBQUcsS0FBSyxjQUFjLFVBQVM7QUFDN0IsYUFBSyxTQUFTLEtBQUssVUFBVSxLQUFLO0FBQ2xDLGFBQUssU0FBUyxLQUFLLFVBQVUsS0FBSzthQUM3QjtBQUNMLGFBQUssU0FBUyxLQUFLO0FBQ25CLGFBQUssU0FBUyxLQUFLOztBQUVyQixVQUFJLCtCQUErQjtBQUNuQyxVQUFHLGFBQWEsVUFBVSxrQkFBaUI7QUFDekMsa0JBQVUsaUJBQWlCLFlBQVksQ0FBQSxPQUFNO0FBQzNDLGNBQUcsS0FBSyxNQUFLO0FBQ1gsaUJBQUs7QUFDTCwyQ0FBK0IsS0FBSzs7O0FBR3hDLGtCQUFVLGlCQUFpQixZQUFZLENBQUEsT0FBTTtBQUMzQyxjQUFHLGlDQUFpQyxLQUFLLGNBQWE7QUFDcEQsMkNBQStCO0FBQy9CLGlCQUFLOzs7O0FBSVgsV0FBSyxzQkFBc0IsS0FBSyx1QkFBdUI7QUFDdkQsV0FBSyxnQkFBZ0IsQ0FBQyxVQUFVO0FBQzlCLFlBQUcsS0FBSyxlQUFjO0FBQ3BCLGlCQUFPLEtBQUssY0FBYztlQUNyQjtBQUNMLGlCQUFPLENBQUMsS0FBTSxLQUFNLEtBQU0sUUFBUSxNQUFNOzs7QUFHNUMsV0FBSyxtQkFBbUIsQ0FBQyxVQUFVO0FBQ2pDLFlBQUcsS0FBSyxrQkFBaUI7QUFDdkIsaUJBQU8sS0FBSyxpQkFBaUI7ZUFDeEI7QUFDTCxpQkFBTyxDQUFDLElBQUksSUFBSSxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBTSxLQUFNLFFBQVEsTUFBTTs7O0FBR3ZFLFdBQUssU0FBUyxLQUFLLFVBQVU7QUFDN0IsV0FBSyxvQkFBb0IsS0FBSyxxQkFBcUI7QUFDbkQsV0FBSyxTQUFTLFFBQVEsS0FBSyxVQUFVO0FBQ3JDLFdBQUssV0FBVyxHQUFHLFlBQVksV0FBVztBQUMxQyxXQUFLLE1BQU0sS0FBSyxPQUFPO0FBQ3ZCLFdBQUssaUJBQWlCO0FBQ3RCLFdBQUssc0JBQXNCO0FBQzNCLFdBQUssaUJBQWlCLElBQUksTUFBTSxNQUFNO0FBQ3BDLGFBQUssU0FBUyxNQUFNLEtBQUs7U0FDeEIsS0FBSzs7SUFTVixpQkFBaUIsY0FBYTtBQUM1QixXQUFLO0FBQ0wsV0FBSyxZQUFZOztJQVFuQixXQUFVO0FBQUUsYUFBTyxTQUFTLFNBQVMsTUFBTSxZQUFZLFFBQVE7O0lBTy9ELGNBQWE7QUFDWCxVQUFJLE1BQU0sS0FBSyxhQUNiLEtBQUssYUFBYSxLQUFLLFVBQVUsS0FBSyxXQUFXLEVBQUMsS0FBSyxLQUFLO0FBQzlELFVBQUcsSUFBSSxPQUFPLE9BQU8sS0FBSTtBQUFFLGVBQU87O0FBQ2xDLFVBQUcsSUFBSSxPQUFPLE9BQU8sS0FBSTtBQUFFLGVBQU8sR0FBRyxLQUFLLGNBQWM7O0FBRXhELGFBQU8sR0FBRyxLQUFLLGdCQUFnQixTQUFTLE9BQU87O0lBWWpELFdBQVcsVUFBVSxNQUFNLFFBQU87QUFDaEMsV0FBSztBQUNMLFdBQUssZ0JBQWdCO0FBQ3JCLFdBQUssZUFBZTtBQUNwQixXQUFLLFNBQVMsVUFBVSxNQUFNOztJQVVoQyxRQUFRLFFBQU87QUFDYixXQUFLO0FBQ0wsVUFBRyxRQUFPO0FBQ1IsbUJBQVcsUUFBUSxJQUFJO0FBQ3ZCLGFBQUssU0FBUyxRQUFROztBQUV4QixVQUFHLEtBQUssTUFBSztBQUFFOztBQUNmLFdBQUssZ0JBQWdCO0FBQ3JCLFdBQUssT0FBTyxJQUFJLEtBQUssVUFBVSxLQUFLO0FBQ3BDLFdBQUssS0FBSyxhQUFhLEtBQUs7QUFDNUIsV0FBSyxLQUFLLFVBQVUsS0FBSztBQUN6QixXQUFLLEtBQUssU0FBUyxNQUFNLEtBQUs7QUFDOUIsV0FBSyxLQUFLLFVBQVUsQ0FBQSxVQUFTLEtBQUssWUFBWTtBQUM5QyxXQUFLLEtBQUssWUFBWSxDQUFBLFVBQVMsS0FBSyxjQUFjO0FBQ2xELFdBQUssS0FBSyxVQUFVLENBQUEsVUFBUyxLQUFLLFlBQVk7O0lBU2hELElBQUksTUFBTSxLQUFLLE1BQUs7QUFBRSxXQUFLLE9BQU8sTUFBTSxLQUFLOztJQUs3QyxZQUFXO0FBQUUsYUFBTyxLQUFLLFdBQVc7O0lBU3BDLE9BQU8sVUFBUztBQUNkLFVBQUksTUFBTSxLQUFLO0FBQ2YsV0FBSyxxQkFBcUIsS0FBSyxLQUFLLENBQUMsS0FBSztBQUMxQyxhQUFPOztJQU9ULFFBQVEsVUFBUztBQUNmLFVBQUksTUFBTSxLQUFLO0FBQ2YsV0FBSyxxQkFBcUIsTUFBTSxLQUFLLENBQUMsS0FBSztBQUMzQyxhQUFPOztJQVVULFFBQVEsVUFBUztBQUNmLFVBQUksTUFBTSxLQUFLO0FBQ2YsV0FBSyxxQkFBcUIsTUFBTSxLQUFLLENBQUMsS0FBSztBQUMzQyxhQUFPOztJQU9ULFVBQVUsVUFBUztBQUNqQixVQUFJLE1BQU0sS0FBSztBQUNmLFdBQUsscUJBQXFCLFFBQVEsS0FBSyxDQUFDLEtBQUs7QUFDN0MsYUFBTzs7SUFNVCxhQUFZO0FBQ1YsVUFBRyxLQUFLO0FBQWEsYUFBSyxJQUFJLGFBQWEsZ0JBQWdCLEtBQUs7QUFDaEUsV0FBSyxnQkFBZ0I7QUFDckIsV0FBSztBQUNMLFdBQUs7QUFDTCxXQUFLLGVBQWU7QUFDcEIsV0FBSztBQUNMLFdBQUsscUJBQXFCLEtBQUssUUFBUSxDQUFDLENBQUMsRUFBRSxjQUFjOztJQU8zRCxtQkFBa0I7QUFDaEIsVUFBRyxLQUFLLHFCQUFvQjtBQUMxQixhQUFLLHNCQUFzQjtBQUMzQixZQUFHLEtBQUssYUFBWTtBQUFFLGVBQUssSUFBSSxhQUFhOztBQUM1QyxhQUFLLGNBQWM7OztJQUl2QixpQkFBZ0I7QUFDZCxVQUFHLEtBQUssUUFBUSxLQUFLLEtBQUssZUFBYztBQUFFOztBQUMxQyxXQUFLLHNCQUFzQjtBQUMzQixtQkFBYSxLQUFLO0FBQ2xCLGlCQUFXLE1BQU0sS0FBSyxpQkFBaUIsS0FBSzs7SUFHOUMsU0FBUyxVQUFVLE1BQU0sUUFBTztBQUM5QixVQUFHLENBQUMsS0FBSyxNQUFLO0FBQ1osZUFBTyxZQUFZOztBQUdyQixXQUFLLGtCQUFrQixNQUFNO0FBQzNCLFlBQUcsS0FBSyxNQUFLO0FBQ1gsY0FBRyxNQUFLO0FBQUUsaUJBQUssS0FBSyxNQUFNLE1BQU0sVUFBVTtpQkFBVztBQUFFLGlCQUFLLEtBQUs7OztBQUduRSxhQUFLLG9CQUFvQixNQUFNO0FBQzdCLGNBQUcsS0FBSyxNQUFLO0FBQ1gsaUJBQUssS0FBSyxVQUFVLFdBQVc7O0FBQy9CLGlCQUFLLE9BQU87O0FBR2Qsc0JBQVk7Ozs7SUFLbEIsa0JBQWtCLFVBQVUsUUFBUSxHQUFFO0FBQ3BDLFVBQUcsVUFBVSxLQUFLLENBQUMsS0FBSyxRQUFRLENBQUMsS0FBSyxLQUFLLGdCQUFlO0FBQ3hEO0FBQ0E7O0FBR0YsaUJBQVcsTUFBTTtBQUNmLGFBQUssa0JBQWtCLFVBQVUsUUFBUTtTQUN4QyxNQUFNOztJQUdYLG9CQUFvQixVQUFVLFFBQVEsR0FBRTtBQUN0QyxVQUFHLFVBQVUsS0FBSyxDQUFDLEtBQUssUUFBUSxLQUFLLEtBQUssZUFBZSxjQUFjLFFBQU87QUFDNUU7QUFDQTs7QUFHRixpQkFBVyxNQUFNO0FBQ2YsYUFBSyxvQkFBb0IsVUFBVSxRQUFRO1NBQzFDLE1BQU07O0lBR1gsWUFBWSxPQUFNO0FBQ2hCLFVBQUksWUFBWSxTQUFTLE1BQU07QUFDL0IsVUFBRyxLQUFLO0FBQWEsYUFBSyxJQUFJLGFBQWEsU0FBUztBQUNwRCxXQUFLO0FBQ0wsbUJBQWEsS0FBSztBQUNsQixVQUFHLENBQUMsS0FBSyxpQkFBaUIsY0FBYyxLQUFLO0FBQzNDLGFBQUssZUFBZTs7QUFFdEIsV0FBSyxxQkFBcUIsTUFBTSxRQUFRLENBQUMsQ0FBQyxFQUFFLGNBQWMsU0FBUzs7SUFNckUsWUFBWSxPQUFNO0FBQ2hCLFVBQUcsS0FBSztBQUFhLGFBQUssSUFBSSxhQUFhO0FBQzNDLFVBQUksa0JBQWtCLEtBQUs7QUFDM0IsVUFBSSxvQkFBb0IsS0FBSztBQUM3QixXQUFLLHFCQUFxQixNQUFNLFFBQVEsQ0FBQyxDQUFDLEVBQUUsY0FBYztBQUN4RCxpQkFBUyxPQUFPLGlCQUFpQjs7QUFFbkMsVUFBRyxvQkFBb0IsS0FBSyxhQUFhLG9CQUFvQixHQUFFO0FBQzdELGFBQUs7OztJQU9ULG1CQUFrQjtBQUNoQixXQUFLLFNBQVMsUUFBUSxDQUFBLFlBQVc7QUFDL0IsWUFBRyxDQUFFLFNBQVEsZUFBZSxRQUFRLGVBQWUsUUFBUSxhQUFZO0FBQ3JFLGtCQUFRLFFBQVEsZUFBZTs7OztJQVFyQyxrQkFBaUI7QUFDZixjQUFPLEtBQUssUUFBUSxLQUFLLEtBQUs7YUFDdkIsY0FBYztBQUFZLGlCQUFPO2FBQ2pDLGNBQWM7QUFBTSxpQkFBTzthQUMzQixjQUFjO0FBQVMsaUJBQU87O0FBQzFCLGlCQUFPOzs7SUFPcEIsY0FBYTtBQUFFLGFBQU8sS0FBSyxzQkFBc0I7O0lBT2pELE9BQU8sU0FBUTtBQUNiLFdBQUssSUFBSSxRQUFRO0FBQ2pCLFdBQUssV0FBVyxLQUFLLFNBQVMsT0FBTyxDQUFBLE1BQUssRUFBRSxjQUFjLFFBQVE7O0lBU3BFLElBQUksTUFBSztBQUNQLGVBQVEsT0FBTyxLQUFLLHNCQUFxQjtBQUN2QyxhQUFLLHFCQUFxQixPQUFPLEtBQUsscUJBQXFCLEtBQUssT0FBTyxDQUFDLENBQUMsU0FBUztBQUNoRixpQkFBTyxLQUFLLFFBQVEsU0FBUzs7OztJQVluQyxRQUFRLE9BQU8sYUFBYSxJQUFHO0FBQzdCLFVBQUksT0FBTyxJQUFJLFFBQVEsT0FBTyxZQUFZO0FBQzFDLFdBQUssU0FBUyxLQUFLO0FBQ25CLGFBQU87O0lBTVQsS0FBSyxNQUFLO0FBQ1IsVUFBRyxLQUFLLGFBQVk7QUFDbEIsWUFBSSxFQUFDLE9BQU8sT0FBTyxTQUFTLEtBQUssYUFBWTtBQUM3QyxhQUFLLElBQUksUUFBUSxHQUFHLFNBQVMsVUFBVSxhQUFhLFFBQVE7O0FBRzlELFVBQUcsS0FBSyxlQUFjO0FBQ3BCLGFBQUssT0FBTyxNQUFNLENBQUEsV0FBVSxLQUFLLEtBQUssS0FBSzthQUN0QztBQUNMLGFBQUssV0FBVyxLQUFLLE1BQU0sS0FBSyxPQUFPLE1BQU0sQ0FBQSxXQUFVLEtBQUssS0FBSyxLQUFLOzs7SUFRMUUsVUFBUztBQUNQLFVBQUksU0FBUyxLQUFLLE1BQU07QUFDeEIsVUFBRyxXQUFXLEtBQUssS0FBSTtBQUFFLGFBQUssTUFBTTthQUFTO0FBQUUsYUFBSyxNQUFNOztBQUUxRCxhQUFPLEtBQUssSUFBSTs7SUFHbEIsZ0JBQWU7QUFDYixVQUFHLEtBQUssdUJBQXVCLENBQUMsS0FBSyxlQUFjO0FBQUU7O0FBQ3JELFdBQUssc0JBQXNCLEtBQUs7QUFDaEMsV0FBSyxLQUFLLEVBQUMsT0FBTyxXQUFXLE9BQU8sYUFBYSxTQUFTLElBQUksS0FBSyxLQUFLO0FBQ3hFLFdBQUssaUJBQWlCLFdBQVcsTUFBTSxLQUFLLG9CQUFvQixLQUFLOztJQUd2RSxjQUFjLFFBQU87QUFDbkIsV0FBSyxnQkFBZ0I7QUFDckIsVUFBRyxLQUFLLGVBQWM7QUFBRSxhQUFLLEtBQUssTUFBTSxpQkFBaUI7OztJQUczRCxrQkFBaUI7QUFDZixVQUFHLEtBQUssaUJBQWlCLEtBQUssV0FBVyxTQUFTLEdBQUU7QUFDbEQsYUFBSyxXQUFXLFFBQVEsQ0FBQSxhQUFZO0FBQ3BDLGFBQUssYUFBYTs7O0lBSXRCLGNBQWMsWUFBVztBQUN2QixXQUFLLE9BQU8sV0FBVyxNQUFNLENBQUEsUUFBTztBQUNsQyxZQUFJLEVBQUMsT0FBTyxPQUFPLFNBQVMsS0FBSyxhQUFZO0FBQzdDLFlBQUcsT0FBTyxRQUFRLEtBQUsscUJBQW9CO0FBQ3pDLHVCQUFhLEtBQUs7QUFDbEIsZUFBSyxzQkFBc0I7QUFDM0IscUJBQVcsTUFBTSxLQUFLLGlCQUFpQixLQUFLOztBQUc5QyxZQUFHLEtBQUs7QUFBYSxlQUFLLElBQUksV0FBVyxHQUFHLFFBQVEsVUFBVSxNQUFNLFNBQVMsU0FBUyxPQUFPLE1BQU0sTUFBTSxPQUFPLE1BQU07QUFFdEgsaUJBQVEsSUFBSSxHQUFHLElBQUksS0FBSyxTQUFTLFFBQVEsS0FBSTtBQUMzQyxnQkFBTSxVQUFVLEtBQUssU0FBUztBQUM5QixjQUFHLENBQUMsUUFBUSxTQUFTLE9BQU8sT0FBTyxTQUFTLFdBQVU7QUFBRTs7QUFDeEQsa0JBQVEsUUFBUSxPQUFPLFNBQVMsS0FBSzs7QUFHdkMsaUJBQVEsSUFBSSxHQUFHLElBQUksS0FBSyxxQkFBcUIsUUFBUSxRQUFRLEtBQUk7QUFDL0QsY0FBSSxDQUFDLEVBQUUsWUFBWSxLQUFLLHFCQUFxQixRQUFRO0FBQ3JELG1CQUFTOzs7O0lBS2YsZUFBZSxPQUFNO0FBQ25CLFVBQUksYUFBYSxLQUFLLFNBQVMsS0FBSyxDQUFBLE1BQUssRUFBRSxVQUFVLFNBQVUsR0FBRSxjQUFjLEVBQUU7QUFDakYsVUFBRyxZQUFXO0FBQ1osWUFBRyxLQUFLO0FBQWEsZUFBSyxJQUFJLGFBQWEsNEJBQTRCO0FBQ3ZFLG1CQUFXOzs7Ozs7QUMxZ0JWLE1BQU0sc0JBQXNCO0FBQzVCLE1BQU0sY0FBYztBQUNwQixNQUFNLGdCQUFnQixDQUFDLEtBQU07QUFDN0IsTUFBTSxrQkFBa0I7QUFDeEIsTUFBTSxvQkFBb0I7SUFDL0I7SUFBcUI7SUFBc0I7SUFDM0M7SUFBdUI7SUFBcUI7SUFBb0I7O0FBRTNELE1BQU0sZ0JBQWdCO0FBQ3RCLE1BQU0sZ0JBQWdCO0FBQ3RCLE1BQU0sbUJBQW1CO0FBQ3pCLE1BQU0saUJBQWlCO0FBQ3ZCLE1BQU0sVUFBVTtBQUNoQixNQUFNLG9CQUFvQjtBQUMxQixNQUFNLGlCQUFpQjtBQUN2QixNQUFNLHVCQUF1QjtBQUM3QixNQUFNLGdCQUFnQjtBQUN0QixNQUFNLGtCQUFrQjtBQUN4QixNQUFNLHdCQUF3QjtBQUM5QixNQUFNLHdCQUF3QjtBQUM5QixNQUFNLFdBQVc7QUFDakIsTUFBTSxhQUFhO0FBQ25CLE1BQU0sbUJBQW1CO0FBQ3pCLE1BQU0sc0JBQXNCO0FBQzVCLE1BQU0seUJBQXlCO0FBQy9CLE1BQU0sd0JBQXdCO0FBQzlCLE1BQU0sa0JBQWtCO0FBQ3hCLE1BQU0sZ0JBQWdCO0FBQ3RCLE1BQU0sV0FBVztBQUNqQixNQUFNLGNBQWM7QUFDcEIsTUFBTSxxQkFBcUI7QUFDM0IsTUFBTSxtQkFBbUI7QUFDekIsTUFBTSxrQkFBa0I7QUFDeEIsTUFBTSxtQkFBbUIsQ0FBQyxRQUFRLFlBQVksVUFBVSxTQUFTLFlBQVksVUFBVSxPQUFPLE9BQU8sUUFBUTtBQUM3RyxNQUFNLG1CQUFtQixDQUFDLFlBQVk7QUFDdEMsTUFBTSxvQkFBb0I7QUFDMUIsTUFBTSxjQUFjO0FBQ3BCLE1BQU0sb0JBQW9CLElBQUk7QUFDOUIsTUFBTSxhQUFhO0FBQ25CLE1BQU0sZUFBZTtBQUNyQixNQUFNLGVBQWU7QUFDckIsTUFBTSxtQkFBbUI7QUFDekIsTUFBTSwyQkFBMkI7QUFDakMsTUFBTSxXQUFXO0FBQ2pCLE1BQU0sZUFBZTtBQUNyQixNQUFNLGVBQWU7QUFDckIsTUFBTSxhQUFhO0FBQ25CLE1BQU0sVUFBVTtBQUNoQixNQUFNLGNBQWM7QUFDcEIsTUFBTSxtQkFBbUI7QUFDekIsTUFBTSxlQUFlO0FBQ3JCLE1BQU0saUJBQWlCO0FBQ3ZCLE1BQU0scUJBQXFCO0FBQzNCLE1BQU0sZUFBZTtBQUNyQixNQUFNLGlCQUFpQjtBQUN2QixNQUFNLCtCQUErQjtBQUNyQyxNQUFNLGlCQUFpQjtBQUN2QixNQUFNLGVBQWU7QUFHckIsTUFBTSxtQkFBbUI7QUFDekIsTUFBTSxZQUFZO0FBQ2xCLE1BQU0sb0JBQW9CO0FBQzFCLE1BQU0sV0FBVztJQUN0QixVQUFVO0lBQ1YsVUFBVTs7QUFJTCxNQUFNLFdBQVc7QUFDakIsTUFBTSxTQUFTO0FBQ2YsTUFBTSxhQUFhO0FBQ25CLE1BQU0sU0FBUztBQUNmLE1BQU0sUUFBUTtBQUNkLE1BQU0sUUFBUTtBQ3ZFckIsTUFBQSxnQkFBQSxNQUFtQztJQUNqQyxZQUFZLE9BQU8sV0FBVyxhQUFXO0FBQ3ZDLFdBQUssYUFBYTtBQUNsQixXQUFLLFFBQVE7QUFDYixXQUFLLFNBQVM7QUFDZCxXQUFLLFlBQVk7QUFDakIsV0FBSyxhQUFhO0FBQ2xCLFdBQUssZ0JBQWdCLFlBQVcsUUFBUSxPQUFPLE1BQU0sT0FBTyxFQUFDLE9BQU8sTUFBTTs7SUFHNUUsTUFBTSxRQUFPO0FBQ1gsbUJBQWEsS0FBSztBQUNsQixXQUFLLGNBQWM7QUFDbkIsV0FBSyxNQUFNLE1BQU07O0lBR25CLFNBQVE7QUFDTixXQUFLLGNBQWMsUUFBUSxDQUFBLFdBQVUsS0FBSyxNQUFNO0FBQ2hELFdBQUssY0FBYyxPQUNoQixRQUFRLE1BQU0sQ0FBQSxVQUFTLEtBQUssaUJBQzVCLFFBQVEsU0FBUyxDQUFBLFdBQVUsS0FBSyxNQUFNOztJQUczQyxTQUFRO0FBQUUsYUFBTyxLQUFLLFVBQVUsS0FBSyxNQUFNLEtBQUs7O0lBRWhELGdCQUFlO0FBQ2IsVUFBSSxTQUFTLElBQUksT0FBTztBQUN4QixVQUFJLE9BQU8sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLLFFBQVEsS0FBSyxZQUFZLEtBQUs7QUFDcEUsYUFBTyxTQUFTLENBQUMsTUFBTTtBQUNyQixZQUFHLEVBQUUsT0FBTyxVQUFVLE1BQUs7QUFDekIsZUFBSyxVQUFVLEVBQUUsT0FBTyxPQUFPO0FBQy9CLGVBQUssVUFBVSxFQUFFLE9BQU87ZUFDbkI7QUFDTCxpQkFBTyxTQUFTLGlCQUFpQixFQUFFLE9BQU87OztBQUc5QyxhQUFPLGtCQUFrQjs7SUFHM0IsVUFBVSxPQUFNO0FBQ2QsVUFBRyxDQUFDLEtBQUssY0FBYyxZQUFXO0FBQUU7O0FBQ3BDLFdBQUssY0FBYyxLQUFLLFNBQVMsT0FDOUIsUUFBUSxNQUFNLE1BQU07QUFDbkIsYUFBSyxNQUFNLFNBQVUsS0FBSyxTQUFTLEtBQUssTUFBTSxLQUFLLE9BQVE7QUFDM0QsWUFBRyxDQUFDLEtBQUssVUFBUztBQUNoQixlQUFLLGFBQWEsV0FBVyxNQUFNLEtBQUssaUJBQWlCLEtBQUssV0FBVyxtQkFBbUI7Ozs7O0FDM0MvRixNQUFJLFdBQVcsQ0FBQyxLQUFLLFFBQVEsUUFBUSxTQUFTLFFBQVEsTUFBTSxLQUFLO0FBRWpFLE1BQUksUUFBUSxDQUFDLFFBQVEsT0FBTyxRQUFTO0FBRXJDLGdDQUE2QjtBQUNsQyxRQUFJLE1BQU0sb0JBQUk7QUFDZCxRQUFJLFFBQVEsU0FBUyxpQkFBaUI7QUFDdEMsYUFBUSxJQUFJLEdBQUcsTUFBTSxNQUFNLFFBQVEsSUFBSSxLQUFLLEtBQUk7QUFDOUMsVUFBRyxJQUFJLElBQUksTUFBTSxHQUFHLEtBQUk7QUFDdEIsZ0JBQVEsTUFBTSwwQkFBMEIsTUFBTSxHQUFHO2FBQzVDO0FBQ0wsWUFBSSxJQUFJLE1BQU0sR0FBRzs7OztBQUtoQixNQUFJLFFBQVEsQ0FBQyxNQUFNLE1BQU0sS0FBSyxRQUFRO0FBQzNDLFFBQUcsS0FBSyxXQUFXLGtCQUFpQjtBQUNsQyxjQUFRLElBQUksR0FBRyxLQUFLLE1BQU0sU0FBUyxVQUFVOzs7QUFLMUMsTUFBSSxXQUFVLENBQUMsUUFBUSxPQUFPLFFBQVEsYUFBYSxNQUFNLFdBQVc7QUFBRSxXQUFPOztBQUU3RSxNQUFJLFFBQVEsQ0FBQyxRQUFRO0FBQUUsV0FBTyxLQUFLLE1BQU0sS0FBSyxVQUFVOztBQUV4RCxNQUFJLG9CQUFvQixDQUFDLElBQUksU0FBUyxhQUFhO0FBQ3hELE9BQUc7QUFDRCxVQUFHLEdBQUcsUUFBUSxJQUFJLGFBQVk7QUFBRSxlQUFPOztBQUN2QyxXQUFLLEdBQUcsaUJBQWlCLEdBQUc7YUFDdEIsT0FBTyxRQUFRLEdBQUcsYUFBYSxLQUFLLENBQUcsYUFBWSxTQUFTLFdBQVcsT0FBUSxHQUFHLFFBQVE7QUFDbEcsV0FBTzs7QUFHRixNQUFJLFdBQVcsQ0FBQyxRQUFRO0FBQzdCLFdBQU8sUUFBUSxRQUFRLE9BQU8sUUFBUSxZQUFZLENBQUUsZ0JBQWU7O0FBRzlELE1BQUksYUFBYSxDQUFDLE1BQU0sU0FBUyxLQUFLLFVBQVUsVUFBVSxLQUFLLFVBQVU7QUFFekUsTUFBSSxVQUFVLENBQUMsUUFBUTtBQUM1QixhQUFRLEtBQUssS0FBSTtBQUFFLGFBQU87O0FBQzFCLFdBQU87O0FBR0YsTUFBSSxRQUFRLENBQUMsSUFBSSxhQUFhLE1BQU0sU0FBUztBQUU3QyxNQUFJLGtCQUFrQixTQUFVLFNBQVMsU0FBUyxNQUFNLGFBQVc7QUFDeEUsWUFBUSxRQUFRLENBQUEsVUFBUztBQUN2QixVQUFJLGdCQUFnQixJQUFJLGNBQWMsT0FBTyxLQUFLLE9BQU8sWUFBWTtBQUNyRSxvQkFBYzs7O0FDekRsQixNQUFJLFVBQVU7SUFDWixlQUFjO0FBQUUsYUFBUSxPQUFRLFFBQVEsY0FBZTs7SUFFdkQsVUFBVSxjQUFjLFdBQVcsUUFBTztBQUN4QyxhQUFPLGFBQWEsV0FBVyxLQUFLLFNBQVMsV0FBVzs7SUFHMUQsWUFBWSxjQUFjLFdBQVcsUUFBUSxTQUFTLE1BQUs7QUFDekQsVUFBSSxVQUFVLEtBQUssU0FBUyxjQUFjLFdBQVc7QUFDckQsVUFBSSxNQUFNLEtBQUssU0FBUyxXQUFXO0FBQ25DLFVBQUksU0FBUyxZQUFZLE9BQU8sVUFBVSxLQUFLO0FBQy9DLG1CQUFhLFFBQVEsS0FBSyxLQUFLLFVBQVU7QUFDekMsYUFBTzs7SUFHVCxTQUFTLGNBQWMsV0FBVyxRQUFPO0FBQ3ZDLGFBQU8sS0FBSyxNQUFNLGFBQWEsUUFBUSxLQUFLLFNBQVMsV0FBVzs7SUFHbEUsbUJBQW1CLFVBQVM7QUFDMUIsVUFBRyxDQUFDLEtBQUssZ0JBQWU7QUFBRTs7QUFDMUIsY0FBUSxhQUFhLFNBQVMsUUFBUSxTQUFTLEtBQUssSUFBSSxPQUFPLFNBQVM7O0lBRzFFLFVBQVUsTUFBTSxNQUFNLElBQUc7QUFDdkIsVUFBRyxLQUFLLGdCQUFlO0FBQ3JCLFlBQUcsT0FBTyxPQUFPLFNBQVMsTUFBSztBQUM3QixjQUFHLEtBQUssUUFBUSxjQUFjLEtBQUssUUFBTztBQUV4QyxnQkFBSSxlQUFlLFFBQVEsU0FBUztBQUNwQyx5QkFBYSxTQUFTLEtBQUs7QUFDM0Isb0JBQVEsYUFBYSxjQUFjLElBQUksT0FBTyxTQUFTOztBQUd6RCxpQkFBTyxLQUFLO0FBQ1osa0JBQVEsT0FBTyxTQUFTLE1BQU0sSUFBSSxNQUFNO0FBQ3hDLGNBQUksU0FBUyxLQUFLLGdCQUFnQixPQUFPLFNBQVM7QUFFbEQsY0FBRyxRQUFPO0FBQ1IsbUJBQU87cUJBQ0MsS0FBSyxTQUFTLFlBQVc7QUFDakMsbUJBQU8sT0FBTyxHQUFHOzs7YUFHaEI7QUFDTCxhQUFLLFNBQVM7OztJQUlsQixVQUFVLE1BQU0sT0FBTTtBQUNwQixlQUFTLFNBQVMsR0FBRyxRQUFROztJQUcvQixVQUFVLE1BQUs7QUFDYixhQUFPLFNBQVMsT0FBTyxRQUFRLElBQUksT0FBTyxpQkFBa0IsOEJBQWlDOztJQUcvRixTQUFTLE9BQU8sT0FBTTtBQUNwQixVQUFHLE9BQU07QUFBRSxnQkFBUSxVQUFVLHFCQUFxQixRQUFROztBQUMxRCxhQUFPLFdBQVc7O0lBR3BCLFNBQVMsV0FBVyxRQUFPO0FBQUUsYUFBTyxHQUFHLGFBQWE7O0lBRXBELGdCQUFnQixXQUFVO0FBQ3hCLFVBQUksT0FBTyxVQUFVLFdBQVcsVUFBVTtBQUMxQyxVQUFHLFNBQVMsSUFBRztBQUFFOztBQUNqQixhQUFPLFNBQVMsZUFBZSxTQUFTLFNBQVMsY0FBYyxXQUFXOzs7QUFJOUUsTUFBTyxrQkFBUTtBQzdDZixNQUFJLE1BQU07SUFDUixLQUFLLElBQUc7QUFBRSxhQUFPLFNBQVMsZUFBZSxPQUFPLFNBQVMsbUJBQW1COztJQUU1RSxZQUFZLElBQUksV0FBVTtBQUN4QixTQUFHLFVBQVUsT0FBTztBQUNwQixVQUFHLEdBQUcsVUFBVSxXQUFXLEdBQUU7QUFBRSxXQUFHLGdCQUFnQjs7O0lBR3BELElBQUksTUFBTSxPQUFPLFVBQVM7QUFDeEIsVUFBRyxDQUFDLE1BQUs7QUFBRSxlQUFPOztBQUNsQixVQUFJLFFBQVEsTUFBTSxLQUFLLEtBQUssaUJBQWlCO0FBQzdDLGFBQU8sV0FBVyxNQUFNLFFBQVEsWUFBWTs7SUFHOUMsZ0JBQWdCLE1BQUs7QUFDbkIsVUFBSSxXQUFXLFNBQVMsY0FBYztBQUN0QyxlQUFTLFlBQVk7QUFDckIsYUFBTyxTQUFTLFFBQVE7O0lBRzFCLGNBQWMsSUFBRztBQUFFLGFBQU8sR0FBRyxTQUFTLFVBQVUsR0FBRyxhQUFhLG9CQUFvQjs7SUFFcEYsaUJBQWlCLE1BQUs7QUFBRSxhQUFPLEtBQUssSUFBSSxNQUFNLHNCQUFzQjs7SUFFcEUsc0JBQXNCLE1BQU0sS0FBSTtBQUM5QixhQUFPLEtBQUsseUJBQXlCLEtBQUssSUFBSSxNQUFNLElBQUksa0JBQWtCLFVBQVU7O0lBR3RGLGVBQWUsTUFBSztBQUNsQixhQUFPLEtBQUssTUFBTSxJQUFJLFFBQVEsTUFBTSxlQUFlLE9BQU87O0lBRzVELHNCQUFzQixJQUFHO0FBQ3ZCLFNBQUcsYUFBYSxhQUFhO0FBQzdCLFdBQUssV0FBVyxJQUFJLGFBQWE7O0lBR25DLDBCQUEwQixNQUFNLFVBQVM7QUFDdkMsVUFBSSxXQUFXLFNBQVMsY0FBYztBQUN0QyxlQUFTLFlBQVk7QUFDckIsYUFBTyxLQUFLLGdCQUFnQixTQUFTLFNBQVM7O0lBR2hELFVBQVUsSUFBSSxXQUFVO0FBQ3RCLGFBQVEsSUFBRyxhQUFhLGNBQWMsR0FBRyxhQUFhLHdCQUF3Qjs7SUFHaEYsWUFBWSxJQUFJLFdBQVcsYUFBWTtBQUNyQyxhQUFPLEdBQUcsZ0JBQWdCLFlBQVksUUFBUSxHQUFHLGFBQWEsZUFBZTs7SUFHL0UsZ0JBQWdCLElBQUksVUFBUztBQUMzQixhQUFPLEtBQUssSUFBSSxJQUFJLEdBQUcscUJBQXFCLGtCQUFrQjs7SUFHaEUsZUFBZSxNQUFNLE1BQUs7QUFDeEIsVUFBSSxVQUFVLElBQUksSUFBSTtBQUN0QixhQUFPLEtBQUssT0FBTyxDQUFDLEtBQUssUUFBUTtBQUMvQixZQUFJLFdBQVcsSUFBSSxrQkFBa0IsVUFBVTtBQUUvQyxhQUFLLHlCQUF5QixLQUFLLElBQUksTUFBTSxXQUFXLE1BQ3JELElBQUksQ0FBQSxPQUFNLFNBQVMsR0FBRyxhQUFhLGlCQUNuQyxRQUFRLENBQUEsYUFBWSxJQUFJLE9BQU87QUFFbEMsZUFBTztTQUNOOztJQUdMLHlCQUF5QixPQUFPLFFBQU87QUFDckMsVUFBRyxPQUFPLGNBQWMsb0JBQW1CO0FBQ3pDLGVBQU8sTUFBTSxPQUFPLENBQUEsT0FBTSxLQUFLLG1CQUFtQixJQUFJO2FBQ2pEO0FBQ0wsZUFBTzs7O0lBSVgsbUJBQW1CLE1BQU0sUUFBTztBQUM5QixhQUFNLE9BQU8sS0FBSyxZQUFXO0FBQzNCLFlBQUcsS0FBSyxXQUFXLFNBQVE7QUFBRSxpQkFBTzs7QUFDcEMsWUFBRyxLQUFLLGFBQWEsaUJBQWlCLE1BQUs7QUFBRSxpQkFBTzs7OztJQUl4RCxRQUFRLElBQUksS0FBSTtBQUFFLGFBQU8sR0FBRyxnQkFBZ0IsR0FBRyxhQUFhOztJQUU1RCxjQUFjLElBQUksS0FBSTtBQUFFLFNBQUcsZ0JBQWdCLE9BQVEsR0FBRyxhQUFhOztJQUVuRSxXQUFXLElBQUksS0FBSyxPQUFNO0FBQ3hCLFVBQUcsQ0FBQyxHQUFHLGNBQWE7QUFBRSxXQUFHLGVBQWU7O0FBQ3hDLFNBQUcsYUFBYSxPQUFPOztJQUd6QixhQUFhLFFBQVEsUUFBTztBQUMxQixVQUFHLE9BQU8sY0FBYTtBQUNyQixlQUFPLGVBQWUsTUFBTSxPQUFPOzs7SUFJdkMsU0FBUyxLQUFJO0FBQ1gsVUFBSSxVQUFVLFNBQVMsY0FBYztBQUNyQyxVQUFJLEVBQUMsUUFBUSxXQUFVLFFBQVE7QUFDL0IsZUFBUyxRQUFRLEdBQUcsVUFBVSxLQUFLLE1BQU0sVUFBVTs7SUFHckQsU0FBUyxJQUFJLE9BQU8sYUFBYSxpQkFBaUIsYUFBYSxpQkFBaUIsVUFBUztBQUN2RixVQUFJLFdBQVcsR0FBRyxhQUFhO0FBQy9CLFVBQUksV0FBVyxHQUFHLGFBQWE7QUFDL0IsVUFBRyxhQUFhLElBQUc7QUFBRSxtQkFBVzs7QUFDaEMsVUFBRyxhQUFhLElBQUc7QUFBRSxtQkFBVzs7QUFDaEMsVUFBSSxRQUFRLFlBQVk7QUFDeEIsY0FBTzthQUNBO0FBQU0saUJBQU87YUFFYjtBQUNILGNBQUcsS0FBSyxLQUFLLElBQUksa0JBQWlCO0FBQ2hDLGVBQUcsaUJBQWlCLFFBQVEsTUFBTTs7QUFFcEM7O0FBR0EsY0FBSSxVQUFVLFNBQVM7QUFDdkIsY0FBSSxVQUFVLE1BQU0sV0FBVyxLQUFLLGNBQWMsSUFBSSxhQUFhO0FBQ25FLGNBQUksZUFBZSxLQUFLLFNBQVMsSUFBSSxrQkFBa0I7QUFDdkQsY0FBRyxNQUFNLFVBQVM7QUFBRSxtQkFBTyxTQUFTLG9DQUFvQzs7QUFDeEUsY0FBRyxVQUFTO0FBQ1YsZ0JBQUksYUFBYTtBQUNqQixnQkFBRyxNQUFNLFNBQVMsV0FBVTtBQUMxQixrQkFBSSxVQUFVLEtBQUssUUFBUSxJQUFJO0FBQy9CLG1CQUFLLFdBQVcsSUFBSSxtQkFBbUIsTUFBTTtBQUM3QywyQkFBYSxZQUFZLE1BQU07O0FBR2pDLGdCQUFHLENBQUMsY0FBYyxLQUFLLFFBQVEsSUFBSSxZQUFXO0FBQzVDLHFCQUFPO21CQUNGO0FBQ0w7QUFDQSxtQkFBSyxXQUFXLElBQUksV0FBVztBQUMvQix5QkFBVyxNQUFNLEtBQUssYUFBYSxJQUFJLG1CQUFtQjs7aUJBRXZEO0FBQ0wsdUJBQVcsTUFBTSxLQUFLLGFBQWEsSUFBSSxrQkFBa0IsZUFBZTs7QUFJMUUsY0FBSSxPQUFPLEdBQUc7QUFDZCxjQUFHLFFBQVEsS0FBSyxLQUFLLE1BQU0sa0JBQWlCO0FBQzFDLGlCQUFLLGlCQUFpQixVQUFVLE1BQU07QUFDcEMsb0JBQU0sS0FBTSxJQUFJLFNBQVMsTUFBTyxXQUFXLENBQUMsQ0FBQyxVQUFVO0FBQ3JELG9CQUFJLFFBQVEsS0FBSyxjQUFjLFVBQVU7QUFDekMscUJBQUssU0FBUyxPQUFPO0FBQ3JCLHFCQUFLLGNBQWMsT0FBTzs7OztBQUloQyxjQUFHLEtBQUssS0FBSyxJQUFJLGtCQUFpQjtBQUNoQyxlQUFHLGlCQUFpQixRQUFRLE1BQU0sS0FBSyxhQUFhLElBQUk7Ozs7SUFLaEUsYUFBYSxJQUFJLEtBQUssY0FBYTtBQUNqQyxVQUFJLENBQUMsT0FBTyxXQUFXLEtBQUssUUFBUSxJQUFJO0FBQ3hDLFVBQUcsQ0FBQyxjQUFhO0FBQUUsdUJBQWU7O0FBQ2xDLFVBQUcsaUJBQWlCLE9BQU07QUFDeEIsYUFBSyxTQUFTLElBQUk7QUFDbEI7OztJQUlKLEtBQUssSUFBSSxLQUFJO0FBQ1gsVUFBRyxLQUFLLFFBQVEsSUFBSSxTQUFTLE1BQUs7QUFBRSxlQUFPOztBQUMzQyxXQUFLLFdBQVcsSUFBSSxLQUFLO0FBQ3pCLGFBQU87O0lBR1QsU0FBUyxJQUFJLEtBQUssVUFBVSxXQUFXO09BQUk7QUFDekMsVUFBSSxDQUFDLGdCQUFnQixLQUFLLFFBQVEsSUFBSSxRQUFRLENBQUMsR0FBRztBQUNsRDtBQUNBLFdBQUssV0FBVyxJQUFJLEtBQUssQ0FBQyxjQUFjO0FBQ3hDLGFBQU87O0lBR1QsYUFBYSxXQUFXLElBQUksZ0JBQWU7QUFDekMsVUFBSSxRQUFRLEdBQUcsZ0JBQWdCLEdBQUcsYUFBYTtBQUUvQyxVQUFJLFFBQVEsU0FBUyxVQUFVLGNBQWMsUUFBUSxtQkFBbUI7QUFDeEUsVUFBRyxDQUFDLE9BQU07QUFBRTs7QUFFWixVQUFHLENBQUUsTUFBSyxRQUFRLE9BQU8sb0JBQW9CLEtBQUssUUFBUSxNQUFNLE1BQU0scUJBQW9CO0FBQ3hGLFdBQUcsVUFBVSxJQUFJOzs7SUFJckIsVUFBVSxTQUFTLGdCQUFlO0FBQ2hDLFVBQUcsUUFBUSxNQUFNLFFBQVEsTUFBSztBQUM1QixhQUFLLElBQUksUUFBUSxNQUFNLElBQUksbUJBQW1CLFFBQVEsVUFBVSxtQkFBbUIsUUFBUSxVQUFVLENBQUMsT0FBTztBQUMzRyxlQUFLLFlBQVksSUFBSTs7OztJQUszQixXQUFXLE1BQUs7QUFDZCxhQUFPLEtBQUssZ0JBQWdCLEtBQUssYUFBYTs7SUFHaEQsY0FBYyxRQUFRLGFBQWEsU0FBUyxJQUFHO0FBQzdDLFVBQUksUUFBUSxJQUFJLFlBQVksYUFBYSxFQUFDLFNBQVMsTUFBTSxZQUFZLE1BQU07QUFDM0UsYUFBTyxjQUFjOztJQUd2QixVQUFVLE1BQU0sTUFBSztBQUNuQixVQUFHLE9BQVEsU0FBVSxhQUFZO0FBQy9CLGVBQU8sS0FBSyxVQUFVO2FBQ2pCO0FBQ0wsWUFBSSxTQUFTLEtBQUssVUFBVTtBQUM1QixlQUFPLFlBQVk7QUFDbkIsZUFBTzs7O0lBSVgsV0FBVyxRQUFRLFFBQVEsT0FBTyxJQUFHO0FBQ25DLFVBQUksVUFBVSxLQUFLLFdBQVc7QUFDOUIsVUFBSSxZQUFZLEtBQUs7QUFDckIsVUFBSSxjQUFjLE9BQU87QUFDekIsZUFBUSxJQUFJLFlBQVksU0FBUyxHQUFHLEtBQUssR0FBRyxLQUFJO0FBQzlDLFlBQUksT0FBTyxZQUFZLEdBQUc7QUFDMUIsWUFBRyxRQUFRLFFBQVEsUUFBUSxHQUFFO0FBQUUsaUJBQU8sYUFBYSxNQUFNLE9BQU8sYUFBYTs7O0FBRy9FLFVBQUksY0FBYyxPQUFPO0FBQ3pCLGVBQVEsSUFBSSxZQUFZLFNBQVMsR0FBRyxLQUFLLEdBQUcsS0FBSTtBQUM5QyxZQUFJLE9BQU8sWUFBWSxHQUFHO0FBQzFCLFlBQUcsV0FBVTtBQUNYLGNBQUcsS0FBSyxXQUFXLFlBQVksQ0FBQyxPQUFPLGFBQWEsT0FBTTtBQUFFLG1CQUFPLGdCQUFnQjs7ZUFDOUU7QUFDTCxjQUFHLENBQUMsT0FBTyxhQUFhLE9BQU07QUFBRSxtQkFBTyxnQkFBZ0I7Ozs7O0lBSzdELGtCQUFrQixRQUFRLFFBQU87QUFFL0IsVUFBRyxDQUFFLG1CQUFrQixvQkFBbUI7QUFBRSxZQUFJLFdBQVcsUUFBUSxRQUFRLEVBQUMsUUFBUSxDQUFDOztBQUNyRixVQUFHLE9BQU8sVUFBUztBQUNqQixlQUFPLGFBQWEsWUFBWTthQUMzQjtBQUNMLGVBQU8sZ0JBQWdCOzs7SUFJM0Isa0JBQWtCLElBQUc7QUFDbkIsYUFBTyxHQUFHLHFCQUFzQixJQUFHLFNBQVMsVUFBVSxHQUFHLFNBQVM7O0lBR3BFLGFBQWEsU0FBUyxnQkFBZ0IsY0FBYTtBQUNqRCxVQUFHLENBQUMsSUFBSSxlQUFlLFVBQVM7QUFBRTs7QUFDbEMsVUFBSSxhQUFhLFFBQVEsUUFBUTtBQUNqQyxVQUFHLFFBQVEsVUFBUztBQUFFLGdCQUFROztBQUM5QixVQUFHLENBQUMsWUFBVztBQUFFLGdCQUFROztBQUN6QixVQUFHLEtBQUssa0JBQWtCLFVBQVM7QUFDakMsZ0JBQVEsa0JBQWtCLGdCQUFnQjs7O0lBSTlDLFlBQVksSUFBRztBQUFFLGFBQU8sK0JBQStCLEtBQUssR0FBRyxZQUFZLEdBQUcsU0FBUzs7SUFFdkYsaUJBQWlCLElBQUc7QUFDbEIsVUFBRyxjQUFjLG9CQUFvQixpQkFBaUIsUUFBUSxHQUFHLEtBQUssd0JBQXdCLEdBQUU7QUFDOUYsV0FBRyxVQUFVLEdBQUcsYUFBYSxlQUFlOzs7SUFJaEQsaUJBQWlCLElBQUc7QUFDbEIsVUFBRyxjQUFjLG1CQUFrQjtBQUNqQyxZQUFJLGVBQWUsR0FBRyxRQUFRLEtBQUssR0FBRztBQUN0QyxZQUFHLGdCQUFnQixhQUFhLGFBQWEsZ0JBQWdCLE1BQUs7QUFDaEUsdUJBQWEsYUFBYSxZQUFZOzs7O0lBSzVDLGVBQWUsSUFBRztBQUFFLGFBQU8saUJBQWlCLFFBQVEsR0FBRyxTQUFTOztJQUVoRSx5QkFBeUIsSUFBSSxvQkFBbUI7QUFDOUMsYUFBTyxHQUFHLGdCQUFnQixHQUFHLGFBQWEsd0JBQXdCOztJQUdwRSxlQUFlLFFBQVEsTUFBTSxhQUFZO0FBQ3ZDLFVBQUksTUFBTSxPQUFPLGFBQWE7QUFDOUIsVUFBRyxRQUFRLE1BQUs7QUFBRSxlQUFPOztBQUV6QixVQUFHLElBQUksWUFBWSxXQUFXLE9BQU8sYUFBYSxpQkFBaUIsTUFBSztBQUN0RSxZQUFHLElBQUksY0FBYyxTQUFRO0FBQUUsY0FBSSxXQUFXLFFBQVEsTUFBTSxFQUFDLFdBQVc7O0FBQ3hFLFlBQUksV0FBVyxRQUFRLFNBQVM7QUFDaEMsZUFBTzthQUNGO0FBQ0wsMEJBQWtCLFFBQVEsQ0FBQSxjQUFhO0FBQ3JDLGlCQUFPLFVBQVUsU0FBUyxjQUFjLEtBQUssVUFBVSxJQUFJOztBQUU3RCxhQUFLLGFBQWEsU0FBUztBQUMzQixlQUFPOzs7SUFJWCxnQkFBZ0IsV0FBVyxXQUFVO0FBQ25DLFVBQUcsSUFBSSxZQUFZLFdBQVcsV0FBVyxDQUFDLFVBQVUsYUFBWTtBQUM5RCxZQUFJLFdBQVc7QUFDZixrQkFBVSxXQUFXLFFBQVEsQ0FBQSxjQUFhO0FBQ3hDLGNBQUcsQ0FBQyxVQUFVLElBQUc7QUFFZixnQkFBSSxrQkFBa0IsVUFBVSxhQUFhLEtBQUssYUFBYSxVQUFVLFVBQVUsV0FBVztBQUM5RixnQkFBRyxDQUFDLGlCQUFnQjtBQUNsQix1QkFBUzs7MEJBQ3FCLFdBQVUsYUFBYSxVQUFVLFdBQVc7Ozs7QUFFNUUscUJBQVMsS0FBSzs7O0FBR2xCLGlCQUFTLFFBQVEsQ0FBQSxjQUFhLFVBQVU7OztJQUk1QyxxQkFBcUIsV0FBVyxTQUFTLE9BQU07QUFDN0MsVUFBSSxnQkFBZ0Isb0JBQUksSUFBSSxDQUFDLE1BQU0sYUFBYSxZQUFZO0FBQzVELFVBQUcsVUFBVSxRQUFRLGtCQUFrQixRQUFRLGVBQWM7QUFDM0QsY0FBTSxLQUFLLFVBQVUsWUFDbEIsT0FBTyxDQUFBLFNBQVEsQ0FBQyxjQUFjLElBQUksS0FBSyxLQUFLLGdCQUM1QyxRQUFRLENBQUEsU0FBUSxVQUFVLGdCQUFnQixLQUFLO0FBRWxELGVBQU8sS0FBSyxPQUNULE9BQU8sQ0FBQSxTQUFRLENBQUMsY0FBYyxJQUFJLEtBQUssZ0JBQ3ZDLFFBQVEsQ0FBQSxTQUFRLFVBQVUsYUFBYSxNQUFNLE1BQU07QUFFdEQsZUFBTzthQUVGO0FBQ0wsWUFBSSxlQUFlLFNBQVMsY0FBYztBQUMxQyxlQUFPLEtBQUssT0FBTyxRQUFRLENBQUEsU0FBUSxhQUFhLGFBQWEsTUFBTSxNQUFNO0FBQ3pFLHNCQUFjLFFBQVEsQ0FBQSxTQUFRLGFBQWEsYUFBYSxNQUFNLFVBQVUsYUFBYTtBQUNyRixxQkFBYSxZQUFZLFVBQVU7QUFDbkMsa0JBQVUsWUFBWTtBQUN0QixlQUFPOzs7O0FBS2IsTUFBTyxjQUFRO0FDdldmLE1BQUEsY0FBQSxNQUFpQztXQUN4QixTQUFTLFFBQVEsTUFBSztBQUMzQixVQUFJLFFBQVEsS0FBSyxZQUFZO0FBQzdCLFVBQUksYUFBYSxPQUFPLGFBQWEsdUJBQXVCLE1BQU07QUFDbEUsVUFBSSxXQUFXLFdBQVcsUUFBUSxhQUFhLFdBQVcsVUFBVTtBQUNwRSxhQUFPLEtBQUssT0FBTyxLQUFNLFVBQVM7O1dBRzdCLGNBQWMsUUFBUSxNQUFLO0FBQ2hDLFVBQUksa0JBQWtCLE9BQU8sYUFBYSxzQkFBc0IsTUFBTTtBQUN0RSxVQUFJLGdCQUFnQixnQkFBZ0IsUUFBUSxhQUFhLFdBQVcsVUFBVTtBQUM5RSxhQUFPLGlCQUFpQixLQUFLLFNBQVMsUUFBUTs7SUFHaEQsWUFBWSxRQUFRLE1BQU0sTUFBSztBQUM3QixXQUFLLE1BQU0sYUFBYSxXQUFXO0FBQ25DLFdBQUssU0FBUztBQUNkLFdBQUssT0FBTztBQUNaLFdBQUssT0FBTztBQUNaLFdBQUssT0FBTztBQUNaLFdBQUssZUFBZTtBQUNwQixXQUFLLFVBQVU7QUFDZixXQUFLLFlBQVk7QUFDakIsV0FBSyxvQkFBb0I7QUFDekIsV0FBSyxVQUFVLFdBQVc7O0FBQzFCLFdBQUssZUFBZSxLQUFLLFlBQVksS0FBSztBQUMxQyxXQUFLLE9BQU8saUJBQWlCLHVCQUF1QixLQUFLOztJQUczRCxXQUFVO0FBQUUsYUFBTyxLQUFLOztJQUV4QixTQUFTLFVBQVM7QUFDaEIsV0FBSyxZQUFZLEtBQUssTUFBTTtBQUM1QixVQUFHLEtBQUssWUFBWSxLQUFLLG1CQUFrQjtBQUN6QyxZQUFHLEtBQUssYUFBYSxLQUFJO0FBQ3ZCLGVBQUssWUFBWTtBQUNqQixlQUFLLG9CQUFvQjtBQUN6QixlQUFLLFVBQVU7QUFDZixlQUFLLEtBQUssaUJBQWlCLEtBQUssUUFBUSxLQUFLLEtBQUssS0FBSyxNQUFNO0FBQzNELHlCQUFhLFlBQVksS0FBSyxRQUFRLEtBQUs7QUFDM0MsaUJBQUs7O2VBRUY7QUFDTCxlQUFLLG9CQUFvQixLQUFLO0FBQzlCLGVBQUssS0FBSyxpQkFBaUIsS0FBSyxRQUFRLEtBQUssS0FBSyxLQUFLOzs7O0lBSzdELFNBQVE7QUFDTixXQUFLLGVBQWU7QUFDcEIsV0FBSyxVQUFVO0FBQ2YsV0FBSzs7SUFHUCxTQUFRO0FBQUUsYUFBTyxLQUFLOztJQUV0QixNQUFNLFNBQVMsVUFBUztBQUN0QixXQUFLLEtBQUssaUJBQWlCLEtBQUssUUFBUSxLQUFLLEtBQUssRUFBQyxPQUFPO0FBQzFELG1CQUFhLFdBQVcsS0FBSzs7SUFLL0IsT0FBTyxVQUFTO0FBQ2QsV0FBSyxVQUFVLE1BQU07QUFDbkIsYUFBSyxPQUFPLG9CQUFvQix1QkFBdUIsS0FBSztBQUM1RDs7O0lBSUosY0FBYTtBQUNYLFVBQUksYUFBYSxLQUFLLE9BQU8sYUFBYSx1QkFBdUIsTUFBTTtBQUN2RSxVQUFHLFdBQVcsUUFBUSxLQUFLLFNBQVMsSUFBRztBQUFFLGFBQUs7OztJQUdoRCxxQkFBb0I7QUFDbEIsYUFBTztRQUNMLGVBQWUsS0FBSyxLQUFLO1FBQ3pCLE1BQU0sS0FBSyxLQUFLO1FBQ2hCLE1BQU0sS0FBSyxLQUFLO1FBQ2hCLE1BQU0sS0FBSyxLQUFLO1FBQ2hCLEtBQUssS0FBSzs7O0lBSWQsU0FBUyxXQUFVO0FBQ2pCLFVBQUcsS0FBSyxLQUFLLFVBQVM7QUFDcEIsWUFBSSxXQUFXLFVBQVUsS0FBSyxLQUFLLGFBQWEsU0FBUyw4QkFBOEIsS0FBSyxLQUFLO0FBQ2pHLGVBQU8sRUFBQyxNQUFNLEtBQUssS0FBSyxVQUFVO2FBQzdCO0FBQ0wsZUFBTyxFQUFDLE1BQU0sV0FBVyxVQUFVOzs7SUFJdkMsY0FBYyxNQUFLO0FBQ2pCLFdBQUssT0FBTyxLQUFLLFFBQVEsS0FBSztBQUM5QixVQUFHLENBQUMsS0FBSyxNQUFLO0FBQUUsaUJBQVMsa0RBQWtELEtBQUssT0FBTyxFQUFDLE9BQU8sS0FBSyxRQUFRLFVBQVU7Ozs7QUNsRzFILE1BQUksc0JBQXNCO0FBRTFCLE1BQUEsZUFBQSxNQUFrQztXQUN6QixXQUFXLE1BQUs7QUFDckIsVUFBSSxNQUFNLEtBQUs7QUFDZixVQUFHLFFBQVEsUUFBVTtBQUNuQixlQUFPO2FBQ0Y7QUFDTCxhQUFLLFVBQVcsd0JBQXVCO0FBQ3ZDLGVBQU8sS0FBSzs7O1dBSVQsZ0JBQWdCLFNBQVMsS0FBSyxVQUFTO0FBQzVDLFVBQUksT0FBTyxLQUFLLFlBQVksU0FBUyxLQUFLLENBQUEsVUFBUSxLQUFLLFdBQVcsV0FBVTtBQUM1RSxlQUFTLElBQUksZ0JBQWdCOztXQUd4QixxQkFBcUIsUUFBTztBQUNqQyxVQUFJLFNBQVM7QUFDYixrQkFBSSxpQkFBaUIsUUFBUSxRQUFRLENBQUEsVUFBUztBQUM1QyxZQUFHLE1BQU0sYUFBYSwwQkFBMEIsTUFBTSxhQUFhLGdCQUFlO0FBQ2hGOzs7QUFHSixhQUFPLFNBQVM7O1dBR1gsaUJBQWlCLFNBQVE7QUFDOUIsVUFBSSxRQUFRLEtBQUssWUFBWTtBQUM3QixVQUFJLFdBQVc7QUFDZixZQUFNLFFBQVEsQ0FBQSxTQUFRO0FBQ3BCLFlBQUksUUFBUSxFQUFDLE1BQU0sUUFBUTtBQUMzQixZQUFJLFlBQVksUUFBUSxhQUFhO0FBQ3JDLGlCQUFTLGFBQWEsU0FBUyxjQUFjO0FBQzdDLGNBQU0sTUFBTSxLQUFLLFdBQVc7QUFDNUIsY0FBTSxPQUFPLEtBQUssUUFBUSxNQUFNO0FBQ2hDLGNBQU0sT0FBTyxLQUFLO0FBQ2xCLGNBQU0sT0FBTyxLQUFLO0FBQ2xCLGlCQUFTLFdBQVcsS0FBSzs7QUFFM0IsYUFBTzs7V0FHRixXQUFXLFNBQVE7QUFDeEIsY0FBUSxRQUFRO0FBQ2hCLGNBQVEsZ0JBQWdCO0FBQ3hCLGtCQUFJLFdBQVcsU0FBUyxTQUFTOztXQUc1QixZQUFZLFNBQVMsTUFBSztBQUMvQixrQkFBSSxXQUFXLFNBQVMsU0FBUyxZQUFJLFFBQVEsU0FBUyxTQUFTLE9BQU8sQ0FBQSxNQUFLLENBQUMsT0FBTyxHQUFHLEdBQUc7O1dBR3BGLFdBQVcsU0FBUyxPQUFNO0FBQy9CLFVBQUcsUUFBUSxhQUFhLGdCQUFnQixNQUFLO0FBQzNDLFlBQUksV0FBVyxNQUFNLE9BQU8sQ0FBQSxTQUFRLENBQUMsS0FBSyxZQUFZLFNBQVMsS0FBSyxDQUFBLE1BQUssT0FBTyxHQUFHLEdBQUc7QUFDdEYsb0JBQUksV0FBVyxTQUFTLFNBQVMsS0FBSyxZQUFZLFNBQVMsT0FBTztBQUNsRSxnQkFBUSxRQUFRO2FBQ1g7QUFDTCxvQkFBSSxXQUFXLFNBQVMsU0FBUzs7O1dBSTlCLGlCQUFpQixRQUFPO0FBQzdCLFVBQUksYUFBYSxZQUFJLGlCQUFpQjtBQUN0QyxhQUFPLE1BQU0sS0FBSyxZQUFZLE9BQU8sQ0FBQSxPQUFNLEdBQUcsU0FBUyxLQUFLLFlBQVksSUFBSSxTQUFTOztXQUdoRixZQUFZLE9BQU07QUFDdkIsYUFBUSxhQUFJLFFBQVEsT0FBTyxZQUFZLElBQUksT0FBTyxDQUFBLE1BQUssWUFBWSxTQUFTLE9BQU87O1dBRzlFLHdCQUF3QixRQUFPO0FBQ3BDLFVBQUksYUFBYSxZQUFJLGlCQUFpQjtBQUN0QyxhQUFPLE1BQU0sS0FBSyxZQUFZLE9BQU8sQ0FBQSxVQUFTLEtBQUssdUJBQXVCLE9BQU8sU0FBUzs7V0FHckYsdUJBQXVCLE9BQU07QUFDbEMsYUFBTyxLQUFLLFlBQVksT0FBTyxPQUFPLENBQUEsTUFBSyxDQUFDLFlBQVksY0FBYyxPQUFPOztJQUcvRSxZQUFZLFNBQVMsTUFBTSxZQUFXO0FBQ3BDLFdBQUssT0FBTztBQUNaLFdBQUssYUFBYTtBQUNsQixXQUFLLFdBQ0gsTUFBTSxLQUFLLGFBQWEsdUJBQXVCLFlBQVksSUFDeEQsSUFBSSxDQUFBLFNBQVEsSUFBSSxZQUFZLFNBQVMsTUFBTTtBQUVoRCxXQUFLLHVCQUF1QixLQUFLLFNBQVM7O0lBRzVDLFVBQVM7QUFBRSxhQUFPLEtBQUs7O0lBRXZCLGtCQUFrQixNQUFNLFNBQVMsYUFBVztBQUMxQyxXQUFLLFdBQ0gsS0FBSyxTQUFTLElBQUksQ0FBQSxVQUFTO0FBQ3pCLGNBQU0sY0FBYztBQUNwQixjQUFNLE9BQU8sTUFBTTtBQUNqQixlQUFLO0FBQ0wsY0FBRyxLQUFLLHlCQUF5QixHQUFFO0FBQUUsaUJBQUs7OztBQUU1QyxlQUFPOztBQUdYLFVBQUksaUJBQWlCLEtBQUssU0FBUyxPQUFPLENBQUMsS0FBSyxVQUFVO0FBQ3hELFlBQUksRUFBQyxNQUFNLGFBQVksTUFBTSxTQUFTLFlBQVc7QUFDakQsWUFBSSxRQUFRLElBQUksU0FBUyxFQUFDLFVBQW9CLFNBQVM7QUFDdkQsWUFBSSxNQUFNLFFBQVEsS0FBSztBQUN2QixlQUFPO1NBQ047QUFFSCxlQUFRLFFBQVEsZ0JBQWU7QUFDN0IsWUFBSSxFQUFDLFVBQVUsWUFBVyxlQUFlO0FBQ3pDLGlCQUFTLFNBQVMsU0FBUyxNQUFNOzs7O0FDckh2QyxNQUFJLFFBQVE7SUFDVixnQkFBZ0I7TUFDZCxhQUFZO0FBQUUsZUFBTyxLQUFLLEdBQUcsYUFBYTs7TUFFMUMsa0JBQWlCO0FBQUUsZUFBTyxLQUFLLEdBQUcsYUFBYTs7TUFFL0MsVUFBUztBQUFFLGFBQUssaUJBQWlCLEtBQUs7O01BRXRDLFVBQVM7QUFDUCxZQUFJLGdCQUFnQixLQUFLO0FBQ3pCLFlBQUcsS0FBSyxtQkFBbUIsZUFBYztBQUN2QyxlQUFLLGlCQUFpQjtBQUN0QixjQUFHLGtCQUFrQixJQUFHO0FBQ3RCLGlCQUFLLE9BQU8sYUFBYSxLQUFLLEdBQUc7OztBQUlyQyxZQUFHLEtBQUssaUJBQWlCLElBQUc7QUFBRSxlQUFLLEdBQUcsUUFBUTs7QUFDOUMsYUFBSyxHQUFHLGNBQWMsSUFBSSxZQUFZOzs7SUFJMUMsZ0JBQWdCO01BQ2QsVUFBUztBQUNQLGFBQUssTUFBTSxLQUFLLEdBQUcsYUFBYTtBQUNoQyxhQUFLLFVBQVUsU0FBUyxlQUFlLEtBQUssR0FBRyxhQUFhO0FBQzVELHFCQUFhLGdCQUFnQixLQUFLLFNBQVMsS0FBSyxLQUFLLENBQUEsUUFBTztBQUMxRCxlQUFLLE1BQU07QUFDWCxlQUFLLEdBQUcsTUFBTTs7O01BR2xCLFlBQVc7QUFDVCxZQUFJLGdCQUFnQixLQUFLOzs7O0FBSy9CLE1BQU8sZ0JBQVE7QUN4Q2YsTUFBQSx1QkFBQSxNQUEwQztJQUN4QyxZQUFZLGlCQUFpQixnQkFBZ0IsWUFBVztBQUN0RCxVQUFJLFlBQVksb0JBQUk7QUFDcEIsVUFBSSxXQUFXLElBQUksSUFBSSxDQUFDLEdBQUcsZUFBZSxVQUFVLElBQUksQ0FBQSxVQUFTLE1BQU07QUFFdkUsVUFBSSxtQkFBbUI7QUFFdkIsWUFBTSxLQUFLLGdCQUFnQixVQUFVLFFBQVEsQ0FBQSxVQUFTO0FBQ3BELFlBQUcsTUFBTSxJQUFHO0FBQ1Ysb0JBQVUsSUFBSSxNQUFNO0FBQ3BCLGNBQUcsU0FBUyxJQUFJLE1BQU0sS0FBSTtBQUN4QixnQkFBSSxvQkFBb0IsTUFBTSwwQkFBMEIsTUFBTSx1QkFBdUI7QUFDckYsNkJBQWlCLEtBQUssRUFBQyxXQUFXLE1BQU0sSUFBSTs7OztBQUtsRCxXQUFLLGNBQWMsZUFBZTtBQUNsQyxXQUFLLGFBQWE7QUFDbEIsV0FBSyxtQkFBbUI7QUFDeEIsV0FBSyxrQkFBa0IsQ0FBQyxHQUFHLFVBQVUsT0FBTyxDQUFBLE9BQU0sQ0FBQyxVQUFVLElBQUk7O0lBU25FLFVBQVM7QUFDUCxVQUFJLFlBQVksWUFBSSxLQUFLLEtBQUs7QUFDOUIsV0FBSyxpQkFBaUIsUUFBUSxDQUFBLG9CQUFtQjtBQUMvQyxZQUFHLGdCQUFnQixtQkFBa0I7QUFDbkMsZ0JBQU0sU0FBUyxlQUFlLGdCQUFnQixvQkFBb0IsQ0FBQSxpQkFBZ0I7QUFDaEYsa0JBQU0sU0FBUyxlQUFlLGdCQUFnQixZQUFZLENBQUEsU0FBUTtBQUNoRSxrQkFBSSxpQkFBaUIsS0FBSywwQkFBMEIsS0FBSyx1QkFBdUIsTUFBTSxhQUFhO0FBQ25HLGtCQUFHLENBQUMsZ0JBQWU7QUFDakIsNkJBQWEsc0JBQXNCLFlBQVk7Ozs7ZUFJaEQ7QUFFTCxnQkFBTSxTQUFTLGVBQWUsZ0JBQWdCLFlBQVksQ0FBQSxTQUFRO0FBQ2hFLGdCQUFJLGlCQUFpQixLQUFLLDBCQUEwQjtBQUNwRCxnQkFBRyxDQUFDLGdCQUFlO0FBQ2pCLHdCQUFVLHNCQUFzQixjQUFjOzs7OztBQU10RCxVQUFHLEtBQUssY0FBYyxXQUFVO0FBQzlCLGFBQUssZ0JBQWdCLFVBQVUsUUFBUSxDQUFBLFdBQVU7QUFDL0MsZ0JBQU0sU0FBUyxlQUFlLFNBQVMsQ0FBQSxTQUFRLFVBQVUsc0JBQXNCLGNBQWM7Ozs7O0FDNURyRyxNQUFJLHlCQUF5QjtBQUU3QixzQkFBb0IsVUFBVSxRQUFRO0FBQ2xDLFFBQUksY0FBYyxPQUFPO0FBQ3pCLFFBQUk7QUFDSixRQUFJO0FBQ0osUUFBSTtBQUNKLFFBQUk7QUFDSixRQUFJO0FBR0osUUFBSSxPQUFPLGFBQWEsMEJBQTBCLFNBQVMsYUFBYSx3QkFBd0I7QUFDOUY7O0FBSUYsYUFBUyxJQUFJLFlBQVksU0FBUyxHQUFHLEtBQUssR0FBRyxLQUFLO0FBQzlDLGFBQU8sWUFBWTtBQUNuQixpQkFBVyxLQUFLO0FBQ2hCLHlCQUFtQixLQUFLO0FBQ3hCLGtCQUFZLEtBQUs7QUFFakIsVUFBSSxrQkFBa0I7QUFDbEIsbUJBQVcsS0FBSyxhQUFhO0FBQzdCLG9CQUFZLFNBQVMsZUFBZSxrQkFBa0I7QUFFdEQsWUFBSSxjQUFjLFdBQVc7QUFDekIsY0FBSSxLQUFLLFdBQVcsU0FBUTtBQUN4Qix1QkFBVyxLQUFLOztBQUVwQixtQkFBUyxlQUFlLGtCQUFrQixVQUFVOzthQUVyRDtBQUNILG9CQUFZLFNBQVMsYUFBYTtBQUVsQyxZQUFJLGNBQWMsV0FBVztBQUN6QixtQkFBUyxhQUFhLFVBQVU7Ozs7QUFPNUMsUUFBSSxnQkFBZ0IsU0FBUztBQUU3QixhQUFTLElBQUksY0FBYyxTQUFTLEdBQUcsS0FBSyxHQUFHLEtBQUs7QUFDaEQsYUFBTyxjQUFjO0FBQ3JCLGlCQUFXLEtBQUs7QUFDaEIseUJBQW1CLEtBQUs7QUFFeEIsVUFBSSxrQkFBa0I7QUFDbEIsbUJBQVcsS0FBSyxhQUFhO0FBRTdCLFlBQUksQ0FBQyxPQUFPLGVBQWUsa0JBQWtCLFdBQVc7QUFDcEQsbUJBQVMsa0JBQWtCLGtCQUFrQjs7YUFFOUM7QUFDSCxZQUFJLENBQUMsT0FBTyxhQUFhLFdBQVc7QUFDaEMsbUJBQVMsZ0JBQWdCOzs7OztBQU16QyxNQUFJO0FBQ0osTUFBSSxXQUFXO0FBRWYsTUFBSSxNQUFNLE9BQU8sYUFBYSxjQUFjLFNBQVk7QUFDeEQsTUFBSSx1QkFBdUIsQ0FBQyxDQUFDLE9BQU8sYUFBYSxJQUFJLGNBQWM7QUFDbkUsTUFBSSxvQkFBb0IsQ0FBQyxDQUFDLE9BQU8sSUFBSSxlQUFlLDhCQUE4QixJQUFJO0FBRXRGLHNDQUFvQyxLQUFLO0FBQ3JDLFFBQUksV0FBVyxJQUFJLGNBQWM7QUFDakMsYUFBUyxZQUFZO0FBQ3JCLFdBQU8sU0FBUyxRQUFRLFdBQVc7O0FBR3ZDLG1DQUFpQyxLQUFLO0FBQ2xDLFFBQUksQ0FBQyxPQUFPO0FBQ1IsY0FBUSxJQUFJO0FBQ1osWUFBTSxXQUFXLElBQUk7O0FBR3pCLFFBQUksV0FBVyxNQUFNLHlCQUF5QjtBQUM5QyxXQUFPLFNBQVMsV0FBVzs7QUFHL0Isa0NBQWdDLEtBQUs7QUFDakMsUUFBSSxXQUFXLElBQUksY0FBYztBQUNqQyxhQUFTLFlBQVk7QUFDckIsV0FBTyxTQUFTLFdBQVc7O0FBVy9CLHFCQUFtQixLQUFLO0FBQ3BCLFVBQU0sSUFBSTtBQUNWLFFBQUksc0JBQXNCO0FBSXhCLGFBQU8sMkJBQTJCO2VBQ3pCLG1CQUFtQjtBQUM1QixhQUFPLHdCQUF3Qjs7QUFHakMsV0FBTyx1QkFBdUI7O0FBYWxDLDRCQUEwQixRQUFRLE1BQU07QUFDcEMsUUFBSSxlQUFlLE9BQU87QUFDMUIsUUFBSSxhQUFhLEtBQUs7QUFDdEIsUUFBSSxlQUFlO0FBRW5CLFFBQUksaUJBQWlCLFlBQVk7QUFDN0IsYUFBTzs7QUFHWCxvQkFBZ0IsYUFBYSxXQUFXO0FBQ3hDLGtCQUFjLFdBQVcsV0FBVztBQU1wQyxRQUFJLGlCQUFpQixNQUFNLGVBQWUsSUFBSTtBQUMxQyxhQUFPLGlCQUFpQixXQUFXO2VBQzVCLGVBQWUsTUFBTSxpQkFBaUIsSUFBSTtBQUNqRCxhQUFPLGVBQWUsYUFBYTtXQUNoQztBQUNILGFBQU87OztBQWFmLDJCQUF5QixNQUFNLGNBQWM7QUFDekMsV0FBTyxDQUFDLGdCQUFnQixpQkFBaUIsV0FDckMsSUFBSSxjQUFjLFFBQ2xCLElBQUksZ0JBQWdCLGNBQWM7O0FBTTFDLHdCQUFzQixRQUFRLE1BQU07QUFDaEMsUUFBSSxXQUFXLE9BQU87QUFDdEIsV0FBTyxVQUFVO0FBQ2IsVUFBSSxZQUFZLFNBQVM7QUFDekIsV0FBSyxZQUFZO0FBQ2pCLGlCQUFXOztBQUVmLFdBQU87O0FBR1gsK0JBQTZCLFFBQVEsTUFBTSxNQUFNO0FBQzdDLFFBQUksT0FBTyxVQUFVLEtBQUssT0FBTztBQUM3QixhQUFPLFFBQVEsS0FBSztBQUNwQixVQUFJLE9BQU8sT0FBTztBQUNkLGVBQU8sYUFBYSxNQUFNO2FBQ3ZCO0FBQ0gsZUFBTyxnQkFBZ0I7Ozs7QUFLbkMsTUFBSSxvQkFBb0I7SUFDcEIsUUFBUSxTQUFTLFFBQVEsTUFBTTtBQUMzQixVQUFJLGFBQWEsT0FBTztBQUN4QixVQUFJLFlBQVk7QUFDWixZQUFJLGFBQWEsV0FBVyxTQUFTO0FBQ3JDLFlBQUksZUFBZSxZQUFZO0FBQzNCLHVCQUFhLFdBQVc7QUFDeEIsdUJBQWEsY0FBYyxXQUFXLFNBQVM7O0FBRW5ELFlBQUksZUFBZSxZQUFZLENBQUMsV0FBVyxhQUFhLGFBQWE7QUFDakUsY0FBSSxPQUFPLGFBQWEsZUFBZSxDQUFDLEtBQUssVUFBVTtBQUluRCxtQkFBTyxhQUFhLFlBQVk7QUFDaEMsbUJBQU8sZ0JBQWdCOztBQUszQixxQkFBVyxnQkFBZ0I7OztBQUduQywwQkFBb0IsUUFBUSxNQUFNOztJQVF0QyxPQUFPLFNBQVMsUUFBUSxNQUFNO0FBQzFCLDBCQUFvQixRQUFRLE1BQU07QUFDbEMsMEJBQW9CLFFBQVEsTUFBTTtBQUVsQyxVQUFJLE9BQU8sVUFBVSxLQUFLLE9BQU87QUFDN0IsZUFBTyxRQUFRLEtBQUs7O0FBR3hCLFVBQUksQ0FBQyxLQUFLLGFBQWEsVUFBVTtBQUM3QixlQUFPLGdCQUFnQjs7O0lBSS9CLFVBQVUsU0FBUyxRQUFRLE1BQU07QUFDN0IsVUFBSSxXQUFXLEtBQUs7QUFDcEIsVUFBSSxPQUFPLFVBQVUsVUFBVTtBQUMzQixlQUFPLFFBQVE7O0FBR25CLFVBQUksYUFBYSxPQUFPO0FBQ3hCLFVBQUksWUFBWTtBQUdaLFlBQUksV0FBVyxXQUFXO0FBRTFCLFlBQUksWUFBWSxZQUFhLENBQUMsWUFBWSxZQUFZLE9BQU8sYUFBYztBQUN2RTs7QUFHSixtQkFBVyxZQUFZOzs7SUFHL0IsUUFBUSxTQUFTLFFBQVEsTUFBTTtBQUMzQixVQUFJLENBQUMsS0FBSyxhQUFhLGFBQWE7QUFDaEMsWUFBSSxnQkFBZ0I7QUFDcEIsWUFBSSxJQUFJO0FBS1IsWUFBSSxXQUFXLE9BQU87QUFDdEIsWUFBSTtBQUNKLFlBQUk7QUFDSixlQUFNLFVBQVU7QUFDWixxQkFBVyxTQUFTLFlBQVksU0FBUyxTQUFTO0FBQ2xELGNBQUksYUFBYSxZQUFZO0FBQ3pCLHVCQUFXO0FBQ1gsdUJBQVcsU0FBUztpQkFDakI7QUFDSCxnQkFBSSxhQUFhLFVBQVU7QUFDdkIsa0JBQUksU0FBUyxhQUFhLGFBQWE7QUFDbkMsZ0NBQWdCO0FBQ2hCOztBQUVKOztBQUVKLHVCQUFXLFNBQVM7QUFDcEIsZ0JBQUksQ0FBQyxZQUFZLFVBQVU7QUFDdkIseUJBQVcsU0FBUztBQUNwQix5QkFBVzs7OztBQUt2QixlQUFPLGdCQUFnQjs7OztBQUtuQyxNQUFJLGVBQWU7QUFDbkIsTUFBSSwyQkFBMkI7QUFDL0IsTUFBSSxZQUFZO0FBQ2hCLE1BQUksZUFBZTtBQUVuQixrQkFBZ0I7O0FBRWhCLDZCQUEyQixNQUFNO0FBQy9CLFFBQUksTUFBTTtBQUNOLGFBQVEsS0FBSyxnQkFBZ0IsS0FBSyxhQUFhLFNBQVUsS0FBSzs7O0FBSXBFLDJCQUF5QixhQUFZO0FBRWpDLFdBQU8sbUJBQWtCLFVBQVUsUUFBUSxTQUFTO0FBQ2hELFVBQUksQ0FBQyxTQUFTO0FBQ1Ysa0JBQVU7O0FBR2QsVUFBSSxPQUFPLFdBQVcsVUFBVTtBQUM1QixZQUFJLFNBQVMsYUFBYSxlQUFlLFNBQVMsYUFBYSxVQUFVLFNBQVMsYUFBYSxRQUFRO0FBQ25HLGNBQUksYUFBYTtBQUNqQixtQkFBUyxJQUFJLGNBQWM7QUFDM0IsaUJBQU8sWUFBWTtlQUNoQjtBQUNILG1CQUFTLFVBQVU7OztBQUkzQixVQUFJLGFBQWEsUUFBUSxjQUFjO0FBQ3ZDLFVBQUksb0JBQW9CLFFBQVEscUJBQXFCO0FBQ3JELFVBQUksY0FBYyxRQUFRLGVBQWU7QUFDekMsVUFBSSxvQkFBb0IsUUFBUSxxQkFBcUI7QUFDckQsVUFBSSxjQUFjLFFBQVEsZUFBZTtBQUN6QyxVQUFJLHdCQUF3QixRQUFRLHlCQUF5QjtBQUM3RCxVQUFJLGtCQUFrQixRQUFRLG1CQUFtQjtBQUNqRCxVQUFJLDRCQUE0QixRQUFRLDZCQUE2QjtBQUNyRSxVQUFJLGVBQWUsUUFBUSxpQkFBaUI7QUFHNUMsVUFBSSxrQkFBa0IsT0FBTyxPQUFPO0FBQ3BDLFVBQUksbUJBQW1CO0FBRXZCLCtCQUF5QixLQUFLO0FBQzFCLHlCQUFpQixLQUFLOztBQUcxQix1Q0FBaUMsTUFBTSxnQkFBZ0I7QUFDbkQsWUFBSSxLQUFLLGFBQWEsY0FBYztBQUNoQyxjQUFJLFdBQVcsS0FBSztBQUNwQixpQkFBTyxVQUFVO0FBRWIsZ0JBQUksTUFBTTtBQUVWLGdCQUFJLGtCQUFtQixPQUFNLFdBQVcsWUFBWTtBQUdoRCw4QkFBZ0I7bUJBQ2I7QUFJSCw4QkFBZ0I7QUFDaEIsa0JBQUksU0FBUyxZQUFZO0FBQ3JCLHdDQUF3QixVQUFVOzs7QUFJMUMsdUJBQVcsU0FBUzs7OztBQWFoQywwQkFBb0IsTUFBTSxZQUFZLGdCQUFnQjtBQUNsRCxZQUFJLHNCQUFzQixVQUFVLE9BQU87QUFDdkM7O0FBR0osWUFBSSxZQUFZO0FBQ1oscUJBQVcsWUFBWTs7QUFHM0Isd0JBQWdCO0FBQ2hCLGdDQUF3QixNQUFNOztBQStCbEMseUJBQW1CLE1BQU07QUFDckIsWUFBSSxLQUFLLGFBQWEsZ0JBQWdCLEtBQUssYUFBYSwwQkFBMEI7QUFDOUUsY0FBSSxXQUFXLEtBQUs7QUFDcEIsaUJBQU8sVUFBVTtBQUNiLGdCQUFJLE1BQU0sV0FBVztBQUNyQixnQkFBSSxLQUFLO0FBQ0wsOEJBQWdCLE9BQU87O0FBSTNCLHNCQUFVO0FBRVYsdUJBQVcsU0FBUzs7OztBQUtoQyxnQkFBVTtBQUVWLCtCQUF5QixJQUFJO0FBQ3pCLG9CQUFZO0FBRVosWUFBSSxXQUFXLEdBQUc7QUFDbEIsZUFBTyxVQUFVO0FBQ2IsY0FBSSxjQUFjLFNBQVM7QUFFM0IsY0FBSSxNQUFNLFdBQVc7QUFDckIsY0FBSSxLQUFLO0FBQ0wsZ0JBQUksa0JBQWtCLGdCQUFnQjtBQUd0QyxnQkFBSSxtQkFBbUIsaUJBQWlCLFVBQVUsa0JBQWtCO0FBQ2hFLHVCQUFTLFdBQVcsYUFBYSxpQkFBaUI7QUFDbEQsc0JBQVEsaUJBQWlCO21CQUN0QjtBQUNMLDhCQUFnQjs7aUJBRWY7QUFHTCw0QkFBZ0I7O0FBR2xCLHFCQUFXOzs7QUFJbkIsNkJBQXVCLFFBQVEsa0JBQWtCLGdCQUFnQjtBQUk3RCxlQUFPLGtCQUFrQjtBQUNyQixjQUFJLGtCQUFrQixpQkFBaUI7QUFDdkMsY0FBSyxpQkFBaUIsV0FBVyxtQkFBb0I7QUFHakQsNEJBQWdCO2lCQUNiO0FBR0gsdUJBQVcsa0JBQWtCLFFBQVE7O0FBRXpDLDZCQUFtQjs7O0FBSTNCLHVCQUFpQixRQUFRLE1BQU0sZUFBYztBQUN6QyxZQUFJLFVBQVUsV0FBVztBQUV6QixZQUFJLFNBQVM7QUFHVCxpQkFBTyxnQkFBZ0I7O0FBRzNCLFlBQUksQ0FBQyxlQUFjO0FBRWYsY0FBSSxrQkFBa0IsUUFBUSxVQUFVLE9BQU87QUFDM0M7O0FBSUosc0JBQVcsUUFBUTtBQUVuQixzQkFBWTtBQUVaLGNBQUksMEJBQTBCLFFBQVEsVUFBVSxPQUFPO0FBQ25EOzs7QUFJUixZQUFJLE9BQU8sYUFBYSxZQUFZO0FBQ2xDLHdCQUFjLFFBQVE7ZUFDakI7QUFDTCw0QkFBa0IsU0FBUyxRQUFROzs7QUFJekMsNkJBQXVCLFFBQVEsTUFBTTtBQUNqQyxZQUFJLGlCQUFpQixLQUFLO0FBQzFCLFlBQUksbUJBQW1CLE9BQU87QUFDOUIsWUFBSTtBQUNKLFlBQUk7QUFFSixZQUFJO0FBQ0osWUFBSTtBQUNKLFlBQUk7QUFHSjtBQUFPLGlCQUFPLGdCQUFnQjtBQUMxQiw0QkFBZ0IsZUFBZTtBQUMvQiwyQkFBZSxXQUFXO0FBRzFCLG1CQUFPLGtCQUFrQjtBQUNyQixnQ0FBa0IsaUJBQWlCO0FBRW5DLGtCQUFJLGVBQWUsY0FBYyxlQUFlLFdBQVcsbUJBQW1CO0FBQzFFLGlDQUFpQjtBQUNqQixtQ0FBbUI7QUFDbkI7O0FBR0osK0JBQWlCLFdBQVc7QUFFNUIsa0JBQUksa0JBQWtCLGlCQUFpQjtBQUd2QyxrQkFBSSxlQUFlO0FBRW5CLGtCQUFJLG9CQUFvQixlQUFlLFVBQVU7QUFDN0Msb0JBQUksb0JBQW9CLGNBQWM7QUFHbEMsc0JBQUksY0FBYztBQUdkLHdCQUFJLGlCQUFpQixnQkFBZ0I7QUFJakMsMEJBQUssaUJBQWlCLGdCQUFnQixlQUFnQjtBQUNsRCw0QkFBSSxvQkFBb0IsZ0JBQWdCO0FBTXBDLHlDQUFlOytCQUNaO0FBUUgsaUNBQU8sYUFBYSxnQkFBZ0I7QUFJcEMsOEJBQUksZ0JBQWdCO0FBR2hCLDRDQUFnQjtpQ0FDYjtBQUdILHVDQUFXLGtCQUFrQixRQUFROztBQUd6Qyw2Q0FBbUI7OzZCQUVwQjtBQUdILHVDQUFlOzs7NkJBR2hCLGdCQUFnQjtBQUV2QixtQ0FBZTs7QUFHbkIsaUNBQWUsaUJBQWlCLFNBQVMsaUJBQWlCLGtCQUFrQjtBQUM1RSxzQkFBSSxjQUFjO0FBS2QsNEJBQVEsa0JBQWtCOzsyQkFHdkIsb0JBQW9CLGFBQWEsbUJBQW1CLGNBQWM7QUFFekUsaUNBQWU7QUFHZixzQkFBSSxpQkFBaUIsY0FBYyxlQUFlLFdBQVc7QUFDekQscUNBQWlCLFlBQVksZUFBZTs7OztBQU14RCxrQkFBSSxjQUFjO0FBR2QsaUNBQWlCO0FBQ2pCLG1DQUFtQjtBQUNuQjs7QUFTSixrQkFBSSxnQkFBZ0I7QUFHaEIsZ0NBQWdCO3FCQUNiO0FBR0gsMkJBQVcsa0JBQWtCLFFBQVE7O0FBR3pDLGlDQUFtQjs7QUFPdkIsZ0JBQUksZ0JBQWlCLGtCQUFpQixnQkFBZ0Isa0JBQWtCLGlCQUFpQixnQkFBZ0IsaUJBQWlCO0FBQ3RILHFCQUFPLFlBQVk7QUFFbkIsc0JBQVEsZ0JBQWdCO21CQUNyQjtBQUNILGtCQUFJLDBCQUEwQixrQkFBa0I7QUFDaEQsa0JBQUksNEJBQTRCLE9BQU87QUFDbkMsb0JBQUkseUJBQXlCO0FBQ3pCLG1DQUFpQjs7QUFHckIsb0JBQUksZUFBZSxXQUFXO0FBQzFCLG1DQUFpQixlQUFlLFVBQVUsT0FBTyxpQkFBaUI7O0FBRXRFLHVCQUFPLFlBQVk7QUFDbkIsZ0NBQWdCOzs7QUFJeEIsNkJBQWlCO0FBQ2pCLCtCQUFtQjs7QUFHdkIsc0JBQWMsUUFBUSxrQkFBa0I7QUFFeEMsWUFBSSxtQkFBbUIsa0JBQWtCLE9BQU87QUFDaEQsWUFBSSxrQkFBa0I7QUFDbEIsMkJBQWlCLFFBQVE7OztBQUlqQyxVQUFJLGNBQWM7QUFDbEIsVUFBSSxrQkFBa0IsWUFBWTtBQUNsQyxVQUFJLGFBQWEsT0FBTztBQUV4QixVQUFJLENBQUMsY0FBYztBQUdmLFlBQUksb0JBQW9CLGNBQWM7QUFDbEMsY0FBSSxlQUFlLGNBQWM7QUFDN0IsZ0JBQUksQ0FBQyxpQkFBaUIsVUFBVSxTQUFTO0FBQ3JDLDhCQUFnQjtBQUNoQiw0QkFBYyxhQUFhLFVBQVUsZ0JBQWdCLE9BQU8sVUFBVSxPQUFPOztpQkFFOUU7QUFFSCwwQkFBYzs7bUJBRVgsb0JBQW9CLGFBQWEsb0JBQW9CLGNBQWM7QUFDMUUsY0FBSSxlQUFlLGlCQUFpQjtBQUNoQyxnQkFBSSxZQUFZLGNBQWMsT0FBTyxXQUFXO0FBQzVDLDBCQUFZLFlBQVksT0FBTzs7QUFHbkMsbUJBQU87aUJBQ0o7QUFFSCwwQkFBYzs7OztBQUsxQixVQUFJLGdCQUFnQixRQUFRO0FBR3hCLHdCQUFnQjthQUNiO0FBQ0gsWUFBSSxPQUFPLGNBQWMsT0FBTyxXQUFXLGNBQWM7QUFDckQ7O0FBR0osZ0JBQVEsYUFBYSxRQUFRO0FBTzdCLFlBQUksa0JBQWtCO0FBQ2xCLG1CQUFTLElBQUUsR0FBRyxNQUFJLGlCQUFpQixRQUFRLElBQUUsS0FBSyxLQUFLO0FBQ25ELGdCQUFJLGFBQWEsZ0JBQWdCLGlCQUFpQjtBQUNsRCxnQkFBSSxZQUFZO0FBQ1oseUJBQVcsWUFBWSxXQUFXLFlBQVk7Ozs7O0FBTTlELFVBQUksQ0FBQyxnQkFBZ0IsZ0JBQWdCLFlBQVksU0FBUyxZQUFZO0FBQ2xFLFlBQUksWUFBWSxXQUFXO0FBQ3ZCLHdCQUFjLFlBQVksVUFBVSxTQUFTLGlCQUFpQjs7QUFPbEUsaUJBQVMsV0FBVyxhQUFhLGFBQWE7O0FBR2xELGFBQU87OztBQUlmLE1BQUksV0FBVyxnQkFBZ0I7QUFFL0IsTUFBTyx1QkFBUTtBQzV0QmYsTUFBQSxXQUFBLE1BQThCO1dBQ3JCLFFBQVEsUUFBUSxNQUFNLGVBQWM7QUFDekMsMkJBQVMsUUFBUSxNQUFNO1FBQ3JCLGNBQWM7UUFDZCxtQkFBbUIsQ0FBQyxTQUFRLFVBQVM7QUFDbkMsY0FBRyxpQkFBaUIsY0FBYyxXQUFXLFlBQVcsWUFBSSxZQUFZLFVBQVE7QUFDOUUsd0JBQUksa0JBQWtCLFNBQVE7QUFDOUIsbUJBQU87Ozs7O0lBTWYsWUFBWSxNQUFNLFdBQVcsSUFBSSxNQUFNLFdBQVU7QUFDL0MsV0FBSyxPQUFPO0FBQ1osV0FBSyxhQUFhLEtBQUs7QUFDdkIsV0FBSyxZQUFZO0FBQ2pCLFdBQUssS0FBSztBQUNWLFdBQUssU0FBUyxLQUFLLEtBQUs7QUFDeEIsV0FBSyxPQUFPO0FBQ1osV0FBSyxZQUFZO0FBQ2pCLFdBQUssV0FBVyxNQUFNLEtBQUs7QUFDM0IsV0FBSyxZQUFZO1FBQ2YsYUFBYTtRQUFJLGVBQWU7UUFBSSxxQkFBcUI7UUFDekQsWUFBWTtRQUFJLGNBQWM7UUFBSSxnQkFBZ0I7UUFBSSxvQkFBb0I7OztJQUk5RSxPQUFPLE1BQU0sVUFBUztBQUFFLFdBQUssVUFBVSxTQUFTLFFBQVEsS0FBSzs7SUFDN0QsTUFBTSxNQUFNLFVBQVM7QUFBRSxXQUFLLFVBQVUsUUFBUSxRQUFRLEtBQUs7O0lBRTNELFlBQVksU0FBUyxNQUFLO0FBQ3hCLFdBQUssVUFBVSxTQUFTLFFBQVEsUUFBUSxDQUFBLGFBQVksU0FBUyxHQUFHOztJQUdsRSxXQUFXLFNBQVMsTUFBSztBQUN2QixXQUFLLFVBQVUsUUFBUSxRQUFRLFFBQVEsQ0FBQSxhQUFZLFNBQVMsR0FBRzs7SUFHakUsZ0NBQStCO0FBQzdCLGtCQUFJLElBQUksS0FBSyxXQUFXLHFEQUFxRCxDQUFBLE9BQU07QUFDakYsV0FBRyxhQUFhLFlBQVk7OztJQUloQyxVQUFTO0FBQ1AsVUFBSSxFQUFDLE1BQU0seUJBQVksV0FBVyxTQUFRO0FBQzFDLFVBQUksa0JBQWtCLEtBQUssZUFBZSxLQUFLLG1CQUFtQixRQUFRO0FBQzFFLFVBQUcsS0FBSyxnQkFBZ0IsQ0FBQyxpQkFBZ0I7QUFBRTs7QUFFM0MsVUFBSSxVQUFVLFlBQVc7QUFDekIsVUFBSSxFQUFDLGdCQUFnQixpQkFBZ0IsV0FBVyxZQUFJLGtCQUFrQixXQUFXLFVBQVU7QUFDM0YsVUFBSSxZQUFZLFlBQVcsUUFBUTtBQUNuQyxVQUFJLGlCQUFpQixZQUFXLFFBQVE7QUFDeEMsVUFBSSxjQUFjLFlBQVcsUUFBUTtBQUNyQyxVQUFJLHFCQUFxQixZQUFXLFFBQVE7QUFDNUMsVUFBSSxRQUFRO0FBQ1osVUFBSSxVQUFVO0FBQ2QsVUFBSSx1QkFBdUI7QUFDM0IsVUFBSSx3QkFBd0I7QUFFNUIsVUFBSSxXQUFXLFlBQVcsS0FBSywyQkFBMkIsTUFBTTtBQUM5RCxlQUFPLEtBQUssY0FBYyxXQUFXLE1BQU0sV0FBVzs7QUFHeEQsV0FBSyxZQUFZLFNBQVM7QUFDMUIsV0FBSyxZQUFZLFdBQVcsV0FBVztBQUV2QyxrQkFBVyxLQUFLLFlBQVksTUFBTTtBQUNoQyw2QkFBUyxpQkFBaUIsVUFBVTtVQUNsQyxjQUFjLGdCQUFnQixhQUFhLG1CQUFtQjtVQUM5RCxZQUFZLENBQUMsU0FBUztBQUNwQixtQkFBTyxZQUFJLGVBQWUsUUFBUSxPQUFPLEtBQUs7O1VBRWhELG1CQUFtQixDQUFDLE9BQU87QUFDekIsaUJBQUssWUFBWSxTQUFTO0FBQzFCLG1CQUFPOztVQUVULGFBQWEsQ0FBQyxPQUFPO0FBQ25CLGdCQUFHLFlBQUkseUJBQXlCLElBQUkscUJBQW9CO0FBQ3RELHNDQUF3Qjs7QUFHMUIsd0JBQUksYUFBYSxpQkFBaUIsSUFBSTtBQUV0QyxnQkFBRyxZQUFJLFdBQVcsT0FBTyxLQUFLLFlBQVksS0FBSTtBQUM1QyxtQkFBSyxXQUFXLGlCQUFpQjs7QUFFbkMsa0JBQU0sS0FBSzs7VUFFYixpQkFBaUIsQ0FBQyxPQUFPO0FBRXZCLGdCQUFHLFlBQUksV0FBVyxLQUFJO0FBQUUsMEJBQVcsZ0JBQWdCOztBQUNuRCxpQkFBSyxXQUFXLGFBQWE7O1VBRS9CLHVCQUF1QixDQUFDLE9BQU87QUFDN0IsZ0JBQUcsR0FBRyxnQkFBZ0IsR0FBRyxhQUFhLGdCQUFnQixNQUFLO0FBQUUscUJBQU87O0FBQ3BFLGdCQUFHLEdBQUcsZUFBZSxRQUFRLFlBQUksWUFBWSxHQUFHLFlBQVksV0FBVyxDQUFDLFVBQVUsZUFBZSxHQUFHLElBQUc7QUFBRSxxQkFBTzs7QUFDaEgsZ0JBQUcsS0FBSyxlQUFlLEtBQUk7QUFBRSxxQkFBTzs7QUFDcEMsbUJBQU87O1VBRVQsYUFBYSxDQUFDLE9BQU87QUFDbkIsZ0JBQUcsWUFBSSx5QkFBeUIsSUFBSSxxQkFBb0I7QUFDdEQsc0NBQXdCOztBQUUxQixvQkFBUSxLQUFLOztVQUVmLG1CQUFtQixDQUFDLFFBQVEsU0FBUztBQUNuQyx3QkFBSSxnQkFBZ0IsTUFBTTtBQUMxQixnQkFBRyxLQUFLLGVBQWUsT0FBTTtBQUFFLHFCQUFPOztBQUN0QyxnQkFBRyxZQUFJLFVBQVUsUUFBUSxZQUFXO0FBQ2xDLG1CQUFLLFlBQVksV0FBVyxRQUFRO0FBQ3BDLDBCQUFJLFdBQVcsUUFBUSxNQUFNLEVBQUMsV0FBVztBQUN6QyxzQkFBUSxLQUFLO0FBQ2IscUJBQU87O0FBRVQsZ0JBQUcsT0FBTyxTQUFTLFlBQWEsUUFBTyxZQUFZLE9BQU8sU0FBUyxXQUFVO0FBQUUscUJBQU87O0FBQ3RGLGdCQUFHLENBQUMsWUFBSSxlQUFlLFFBQVEsTUFBTSxjQUFhO0FBQ2hELGtCQUFHLFlBQUksY0FBYyxTQUFRO0FBQzNCLHFCQUFLLFlBQVksV0FBVyxRQUFRO0FBQ3BDLHdCQUFRLEtBQUs7O0FBRWYscUJBQU87O0FBSVQsZ0JBQUcsWUFBSSxXQUFXLE9BQU07QUFDdEIsa0JBQUksY0FBYyxPQUFPLGFBQWE7QUFDdEMsMEJBQUksV0FBVyxRQUFRLE1BQU0sRUFBQyxTQUFTLENBQUM7QUFDeEMsa0JBQUcsZ0JBQWdCLElBQUc7QUFBRSx1QkFBTyxhQUFhLGFBQWE7O0FBQ3pELHFCQUFPLGFBQWEsYUFBYSxLQUFLO0FBQ3RDLHFCQUFPOztBQUlULHdCQUFJLGFBQWEsTUFBTTtBQUN2Qix3QkFBSSxhQUFhLGlCQUFpQixNQUFNO0FBQ3hDLHdCQUFJLGlCQUFpQjtBQUVyQixnQkFBSSxrQkFBa0IsV0FBVyxPQUFPLFdBQVcsWUFBWSxZQUFJLFlBQVk7QUFDL0UsZ0JBQUcsbUJBQW1CLENBQUMsS0FBSyx5QkFBeUIsUUFBUSxPQUFNO0FBQ2pFLG1CQUFLLFlBQVksV0FBVyxRQUFRO0FBQ3BDLDBCQUFJLGtCQUFrQixRQUFRO0FBQzlCLDBCQUFJLGlCQUFpQjtBQUNyQixzQkFBUSxLQUFLO0FBQ2IscUJBQU87bUJBQ0Y7QUFDTCxrQkFBRyxZQUFJLFlBQVksTUFBTSxXQUFXLENBQUMsVUFBVSxhQUFZO0FBQ3pELHFDQUFxQixLQUFLLElBQUkscUJBQXFCLFFBQVEsTUFBTSxLQUFLLGFBQWE7O0FBRXJGLDBCQUFJLGlCQUFpQjtBQUNyQixtQkFBSyxZQUFZLFdBQVcsUUFBUTtBQUNwQyxxQkFBTzs7Ozs7QUFNZixVQUFHLFlBQVcsa0JBQWlCO0FBQUU7O0FBRWpDLFVBQUcscUJBQXFCLFNBQVMsR0FBRTtBQUNqQyxvQkFBVyxLQUFLLHlDQUF5QyxNQUFNO0FBQzdELCtCQUFxQixRQUFRLENBQUEsV0FBVSxPQUFPOzs7QUFJbEQsa0JBQVcsY0FBYyxNQUFNLFlBQUksYUFBYSxTQUFTLGdCQUFnQjtBQUN6RSxrQkFBSSxjQUFjLFVBQVU7QUFDNUIsWUFBTSxRQUFRLENBQUEsT0FBTSxLQUFLLFdBQVcsU0FBUztBQUM3QyxjQUFRLFFBQVEsQ0FBQSxPQUFNLEtBQUssV0FBVyxXQUFXO0FBRWpELFVBQUcsdUJBQXNCO0FBQ3ZCLG9CQUFXO0FBQ1gsOEJBQXNCOztBQUV4QixhQUFPOztJQUdULHlCQUF5QixRQUFRLE1BQUs7QUFDcEMsVUFBSSxXQUFXLENBQUMsVUFBVSxjQUFjLG1CQUFtQixLQUFLLENBQUMsTUFBTSxNQUFNLE9BQU87QUFDcEYsYUFBTyxPQUFPLGFBQWEsUUFBUyxZQUFZLE9BQU8sYUFBYSxLQUFLOztJQUczRSxhQUFZO0FBQUUsYUFBTyxLQUFLOztJQUUxQixlQUFlLElBQUc7QUFDaEIsYUFBTyxHQUFHLGFBQWEsS0FBSyxnQkFBZ0IsR0FBRyxhQUFhLGNBQWM7O0lBRzVFLG1CQUFtQixNQUFLO0FBQ3RCLFVBQUcsQ0FBQyxLQUFLLGNBQWE7QUFBRTs7QUFDeEIsVUFBSSxDQUFDLFVBQVUsUUFBUSxZQUFJLHNCQUFzQixLQUFLLFdBQVcsS0FBSztBQUN0RSxVQUFHLEtBQUssV0FBVyxLQUFLLFlBQUksZ0JBQWdCLFVBQVUsR0FBRTtBQUN0RCxlQUFPO2FBQ0Y7QUFDTCxlQUFPLFNBQVMsTUFBTTs7O0lBVTFCLGNBQWMsV0FBVyxNQUFNLFdBQVcsaUJBQWdCO0FBQ3hELFVBQUksYUFBYSxLQUFLO0FBQ3RCLFVBQUksc0JBQXNCLGNBQWMsZ0JBQWdCLGFBQWEsbUJBQW1CLEtBQUssVUFBVTtBQUN2RyxVQUFHLENBQUMsY0FBYyxxQkFBb0I7QUFDcEMsZUFBTzthQUNGO0FBRUwsWUFBSSxnQkFBZ0I7QUFDcEIsWUFBSSxXQUFXLFNBQVMsY0FBYztBQUN0Qyx3QkFBZ0IsWUFBSSxVQUFVO0FBQzlCLFlBQUksQ0FBQyxtQkFBbUIsUUFBUSxZQUFJLHNCQUFzQixlQUFlLEtBQUs7QUFDOUUsaUJBQVMsWUFBWTtBQUNyQixhQUFLLFFBQVEsQ0FBQSxPQUFNLEdBQUc7QUFDdEIsY0FBTSxLQUFLLGNBQWMsWUFBWSxRQUFRLENBQUEsVUFBUztBQUVwRCxjQUFHLE1BQU0sTUFBTSxNQUFNLGFBQWEsS0FBSyxnQkFBZ0IsTUFBTSxhQUFhLG1CQUFtQixLQUFLLFVBQVUsWUFBVztBQUNySCxrQkFBTSxhQUFhLFVBQVU7QUFDN0Isa0JBQU0sWUFBWTs7O0FBR3RCLGNBQU0sS0FBSyxTQUFTLFFBQVEsWUFBWSxRQUFRLENBQUEsT0FBTSxjQUFjLGFBQWEsSUFBSTtBQUNyRix1QkFBZTtBQUNmLGVBQU8sY0FBYzs7OztBQ3hPM0IsTUFBQSxXQUFBLE1BQThCO1dBQ3JCLFFBQVEsTUFBSztBQUNsQixVQUFJLEdBQUUsUUFBUSxRQUFRLFNBQVMsU0FBUyxRQUFRLFVBQVM7QUFDekQsYUFBTyxLQUFLO0FBQ1osYUFBTyxLQUFLO0FBQ1osYUFBTyxLQUFLO0FBQ1osYUFBTyxFQUFDLE1BQU0sT0FBTyxPQUFPLFNBQVMsTUFBTSxRQUFRLFVBQVU7O0lBRy9ELFlBQVksUUFBUSxVQUFTO0FBQzNCLFdBQUssU0FBUztBQUNkLFdBQUssV0FBVztBQUNoQixXQUFLLFVBQVU7O0lBR2pCLGVBQWM7QUFBRSxhQUFPLEtBQUs7O0lBRTVCLFNBQVMsVUFBUztBQUNoQixhQUFPLEtBQUssa0JBQWtCLEtBQUssVUFBVSxLQUFLLFNBQVMsYUFBYTs7SUFHMUUsa0JBQWtCLFVBQVUsYUFBYSxTQUFTLGFBQWEsVUFBUztBQUN0RSxpQkFBVyxXQUFXLElBQUksSUFBSSxZQUFZO0FBQzFDLFVBQUksU0FBUyxFQUFDLFFBQVEsSUFBSSxZQUF3QjtBQUNsRCxXQUFLLGVBQWUsVUFBVTtBQUM5QixhQUFPLE9BQU87O0lBR2hCLGNBQWMsTUFBSztBQUFFLGFBQU8sT0FBTyxLQUFLLEtBQUssZUFBZSxJQUFJLElBQUksQ0FBQSxNQUFLLFNBQVM7O0lBRWxGLG9CQUFvQixNQUFLO0FBQ3ZCLFVBQUcsQ0FBQyxLQUFLLGFBQVk7QUFBRSxlQUFPOztBQUM5QixhQUFPLE9BQU8sS0FBSyxNQUFNLFdBQVc7O0lBR3RDLGFBQWEsTUFBTSxLQUFJO0FBQUUsYUFBTyxLQUFLLFlBQVk7O0lBRWpELFVBQVUsTUFBSztBQUNiLFVBQUksT0FBTyxLQUFLO0FBQ2hCLFVBQUksUUFBUTtBQUNaLGFBQU8sS0FBSztBQUNaLFdBQUssV0FBVyxLQUFLLGFBQWEsS0FBSyxVQUFVO0FBQ2pELFdBQUssU0FBUyxjQUFjLEtBQUssU0FBUyxlQUFlO0FBRXpELFVBQUcsTUFBSztBQUNOLFlBQUksT0FBTyxLQUFLLFNBQVM7QUFFekIsaUJBQVEsT0FBTyxNQUFLO0FBQ2xCLGVBQUssT0FBTyxLQUFLLG9CQUFvQixLQUFLLEtBQUssTUFBTSxNQUFNLE1BQU07O0FBR25FLGlCQUFRLE9BQU8sTUFBSztBQUFFLGVBQUssT0FBTyxLQUFLOztBQUN2QyxhQUFLLGNBQWM7OztJQUl2QixvQkFBb0IsS0FBSyxPQUFPLE1BQU0sTUFBTSxPQUFNO0FBQ2hELFVBQUcsTUFBTSxNQUFLO0FBQ1osZUFBTyxNQUFNO2FBQ1I7QUFDTCxZQUFJLE9BQU8sTUFBTSxPQUFPLE1BQU07QUFFOUIsWUFBRyxNQUFNLE9BQU07QUFDYixjQUFJO0FBRUosY0FBRyxPQUFPLEdBQUU7QUFDVixvQkFBUSxLQUFLLG9CQUFvQixNQUFNLEtBQUssT0FBTyxNQUFNLE1BQU07aUJBQzFEO0FBQ0wsb0JBQVEsS0FBSyxDQUFDOztBQUdoQixpQkFBTyxNQUFNO0FBQ2Isa0JBQVEsS0FBSyxXQUFXLE9BQU87QUFDL0IsZ0JBQU0sVUFBVTtlQUNYO0FBQ0wsa0JBQVEsTUFBTSxZQUFZLFNBQVksUUFBUSxLQUFLLFdBQVcsS0FBSyxRQUFRLElBQUk7O0FBR2pGLGNBQU0sT0FBTztBQUNiLGVBQU87OztJQUlYLGFBQWEsUUFBUSxRQUFPO0FBQzFCLFVBQUcsT0FBTyxZQUFZLFFBQVU7QUFDOUIsZUFBTzthQUNGO0FBQ0wsYUFBSyxlQUFlLFFBQVE7QUFDNUIsZUFBTzs7O0lBSVgsZUFBZSxRQUFRLFFBQU87QUFDNUIsZUFBUSxPQUFPLFFBQU87QUFDcEIsWUFBSSxNQUFNLE9BQU87QUFDakIsWUFBSSxZQUFZLE9BQU87QUFDdkIsWUFBRyxTQUFTLFFBQVEsSUFBSSxZQUFZLFVBQWEsU0FBUyxZQUFXO0FBQ25FLGVBQUssZUFBZSxXQUFXO2VBQzFCO0FBQ0wsaUJBQU8sT0FBTzs7OztJQUtwQixXQUFXLFFBQVEsUUFBTztBQUN4QixVQUFJLFNBQVMsa0NBQUksU0FBVztBQUM1QixlQUFRLE9BQU8sUUFBTztBQUNwQixZQUFJLE1BQU0sT0FBTztBQUNqQixZQUFJLFlBQVksT0FBTztBQUN2QixZQUFHLFNBQVMsUUFBUSxJQUFJLFlBQVksVUFBYSxTQUFTLFlBQVc7QUFDbkUsaUJBQU8sT0FBTyxLQUFLLFdBQVcsV0FBVzs7O0FBRzdDLGFBQU87O0lBR1Qsa0JBQWtCLEtBQUk7QUFBRSxhQUFPLEtBQUsscUJBQXFCLEtBQUssU0FBUyxhQUFhOztJQUVwRixVQUFVLE1BQUs7QUFDYixXQUFLLFFBQVEsQ0FBQSxRQUFPLE9BQU8sS0FBSyxTQUFTLFlBQVk7O0lBS3ZELE1BQUs7QUFBRSxhQUFPLEtBQUs7O0lBRW5CLGlCQUFpQixPQUFPLElBQUc7QUFBRSxhQUFPLENBQUMsQ0FBQyxLQUFLOztJQUUzQyxlQUFlLFVBQVUsUUFBTztBQUM5QixVQUFHLFNBQVMsV0FBVTtBQUFFLGVBQU8sS0FBSyxzQkFBc0IsVUFBVTs7QUFDcEUsVUFBSSxHQUFFLFNBQVMsWUFBVztBQUUxQixhQUFPLFVBQVUsUUFBUTtBQUN6QixlQUFRLElBQUksR0FBRyxJQUFJLFFBQVEsUUFBUSxLQUFJO0FBQ3JDLGFBQUssZ0JBQWdCLFNBQVMsSUFBSSxJQUFJO0FBQ3RDLGVBQU8sVUFBVSxRQUFROzs7SUFJN0Isc0JBQXNCLFVBQVUsUUFBTztBQUNyQyxVQUFJLEdBQUUsV0FBVyxXQUFXLFNBQVMsWUFBVztBQUVoRCxlQUFRLElBQUksR0FBRyxJQUFJLFNBQVMsUUFBUSxLQUFJO0FBQ3RDLFlBQUksVUFBVSxTQUFTO0FBQ3ZCLGVBQU8sVUFBVSxRQUFRO0FBQ3pCLGlCQUFRLElBQUksR0FBRyxJQUFJLFFBQVEsUUFBUSxLQUFJO0FBQ3JDLGVBQUssZ0JBQWdCLFFBQVEsSUFBSSxJQUFJO0FBQ3JDLGlCQUFPLFVBQVUsUUFBUTs7OztJQUsvQixnQkFBZ0IsVUFBVSxRQUFPO0FBQy9CLFVBQUcsT0FBUSxhQUFjLFVBQVM7QUFDaEMsZUFBTyxVQUFVLEtBQUsscUJBQXFCLE9BQU8sWUFBWSxVQUFVLE9BQU87aUJBQ3ZFLFNBQVMsV0FBVTtBQUMzQixhQUFLLGVBQWUsVUFBVTthQUN6QjtBQUNMLGVBQU8sVUFBVTs7O0lBSXJCLHFCQUFxQixZQUFZLEtBQUssVUFBUztBQUM3QyxVQUFJLFlBQVksV0FBVyxRQUFRLFNBQVMsd0JBQXdCLE9BQU87QUFDM0UsVUFBSSxXQUFXLFNBQVMsY0FBYztBQUN0QyxlQUFTLFlBQVksS0FBSyxrQkFBa0IsV0FBVyxZQUFZO0FBQ25FLFVBQUksWUFBWSxTQUFTO0FBQ3pCLFVBQUksT0FBTyxZQUFZLENBQUMsU0FBUyxJQUFJO0FBRXJDLFVBQUksQ0FBQyxlQUFlLHNCQUNsQixNQUFNLEtBQUssVUFBVSxZQUFZLE9BQU8sQ0FBQyxDQUFDLFVBQVUsZ0JBQWdCLE9BQU8sTUFBTTtBQUMvRSxZQUFHLE1BQU0sYUFBYSxLQUFLLGNBQWE7QUFDdEMsY0FBRyxNQUFNLGFBQWEsZ0JBQWU7QUFDbkMsbUJBQU8sQ0FBQyxVQUFVOztBQUVwQixnQkFBTSxhQUFhLGVBQWU7QUFDbEMsY0FBRyxDQUFDLE1BQU0sSUFBRztBQUFFLGtCQUFNLEtBQUssR0FBRyxLQUFLLGtCQUFrQixPQUFPOztBQUMzRCxjQUFHLE1BQUs7QUFDTixrQkFBTSxhQUFhLFVBQVU7QUFDN0Isa0JBQU0sWUFBWTs7QUFFcEIsaUJBQU8sQ0FBQyxNQUFNO2VBQ1Q7QUFDTCxjQUFHLE1BQU0sVUFBVSxXQUFXLElBQUc7QUFDL0IscUJBQVM7O1FBQ0UsTUFBTSxVQUFVOzs7R0FDWixTQUFTLFVBQVU7QUFDbEMsa0JBQU0sWUFBWSxLQUFLLFdBQVcsTUFBTSxXQUFXO0FBQ25ELG1CQUFPLENBQUMsTUFBTTtpQkFDVDtBQUNMLGtCQUFNO0FBQ04sbUJBQU8sQ0FBQyxVQUFVOzs7U0FHckIsQ0FBQyxPQUFPO0FBRWIsVUFBRyxDQUFDLGlCQUFpQixDQUFDLG9CQUFtQjtBQUN2QyxpQkFBUyw0RkFDUCxTQUFTLFVBQVU7QUFDckIsZUFBTyxLQUFLLFdBQVcsSUFBSSxLQUFLO2lCQUN4QixDQUFDLGlCQUFpQixvQkFBbUI7QUFDN0MsaUJBQVMsZ0xBQ1AsU0FBUyxVQUFVO0FBQ3JCLGVBQU8sU0FBUzthQUNYO0FBQ0wsZUFBTyxTQUFTOzs7SUFJcEIsV0FBVyxNQUFNLEtBQUk7QUFDbkIsVUFBSSxPQUFPLFNBQVMsY0FBYztBQUNsQyxXQUFLLFlBQVk7QUFDakIsV0FBSyxhQUFhLGVBQWU7QUFDakMsYUFBTzs7O0FDdE9YLE1BQUksYUFBYTtBQUNqQixNQUFBLFdBQUEsTUFBOEI7V0FDckIsU0FBUTtBQUFFLGFBQU87O1dBQ2pCLFVBQVUsSUFBRztBQUFFLGFBQU8sR0FBRzs7SUFFaEMsWUFBWSxNQUFNLElBQUksV0FBVTtBQUM5QixXQUFLLFNBQVM7QUFDZCxXQUFLLGVBQWUsS0FBSztBQUN6QixXQUFLLGNBQWM7QUFDbkIsV0FBSyxjQUFjLG9CQUFJO0FBQ3ZCLFdBQUssbUJBQW1CO0FBQ3hCLFdBQUssS0FBSztBQUNWLFdBQUssR0FBRyxZQUFZLEtBQUssWUFBWTtBQUNyQyxlQUFRLE9BQU8sS0FBSyxhQUFZO0FBQUUsYUFBSyxPQUFPLEtBQUssWUFBWTs7O0lBR2pFLFlBQVc7QUFBRSxXQUFLLFdBQVcsS0FBSzs7SUFDbEMsWUFBVztBQUFFLFdBQUssV0FBVyxLQUFLOztJQUNsQyxpQkFBZ0I7QUFBRSxXQUFLLGdCQUFnQixLQUFLOztJQUM1QyxjQUFhO0FBQUUsV0FBSyxhQUFhLEtBQUs7O0lBQ3RDLGdCQUFlO0FBQ2IsVUFBRyxLQUFLLGtCQUFpQjtBQUN2QixhQUFLLG1CQUFtQjtBQUN4QixhQUFLLGVBQWUsS0FBSzs7O0lBRzdCLGlCQUFnQjtBQUNkLFdBQUssbUJBQW1CO0FBQ3hCLFdBQUssZ0JBQWdCLEtBQUs7O0lBRzVCLFVBQVUsT0FBTyxVQUFVLElBQUksVUFBVSxXQUFXO09BQUk7QUFDdEQsYUFBTyxLQUFLLE9BQU8sY0FBYyxNQUFNLE9BQU8sU0FBUzs7SUFHekQsWUFBWSxXQUFXLE9BQU8sVUFBVSxJQUFJLFVBQVUsV0FBVztPQUFJO0FBQ25FLGFBQU8sS0FBSyxPQUFPLGNBQWMsV0FBVyxDQUFDLE1BQU0sY0FBYztBQUMvRCxlQUFPLEtBQUssY0FBYyxXQUFXLE9BQU8sU0FBUzs7O0lBSXpELFlBQVksT0FBTyxVQUFTO0FBQzFCLFVBQUksY0FBYyxDQUFDLGFBQWEsV0FBVyxTQUFTLFFBQVEsU0FBUyxZQUFZO0FBQ2pGLGFBQU8saUJBQWlCLFlBQVksU0FBUztBQUM3QyxXQUFLLFlBQVksSUFBSTtBQUNyQixhQUFPOztJQUdULGtCQUFrQixhQUFZO0FBQzVCLFVBQUksUUFBUSxZQUFZLE1BQU07QUFDOUIsYUFBTyxvQkFBb0IsWUFBWSxTQUFTO0FBQ2hELFdBQUssWUFBWSxPQUFPOztJQUcxQixPQUFPLE1BQU0sT0FBTTtBQUNqQixhQUFPLEtBQUssT0FBTyxnQkFBZ0IsTUFBTTs7SUFHM0MsU0FBUyxXQUFXLE1BQU0sT0FBTTtBQUM5QixhQUFPLEtBQUssT0FBTyxjQUFjLFdBQVcsQ0FBQSxTQUFRLEtBQUssZ0JBQWdCLE1BQU07O0lBR2pGLGNBQWE7QUFDWCxXQUFLLFlBQVksUUFBUSxDQUFBLGdCQUFlLEtBQUssa0JBQWtCOzs7QUNkbkUsTUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLE9BQU8sT0FBTztBQUN2QyxRQUFJLFdBQVcsSUFBSSxTQUFTO0FBQzVCLFFBQUksV0FBVztBQUVmLGFBQVMsUUFBUSxDQUFDLEtBQUssS0FBSyxXQUFXO0FBQ3JDLFVBQUcsZUFBZSxNQUFLO0FBQUUsaUJBQVMsS0FBSzs7O0FBSXpDLGFBQVMsUUFBUSxDQUFBLFFBQU8sU0FBUyxPQUFPO0FBRXhDLFFBQUksU0FBUyxJQUFJO0FBQ2pCLGFBQVEsQ0FBQyxLQUFLLFFBQVEsU0FBUyxXQUFVO0FBQUUsYUFBTyxPQUFPLEtBQUs7O0FBQzlELGFBQVEsV0FBVyxNQUFLO0FBQUUsYUFBTyxPQUFPLFNBQVMsS0FBSzs7QUFFdEQsV0FBTyxPQUFPOztBQUdoQixNQUFBLE9BQUEsTUFBMEI7SUFDeEIsWUFBWSxJQUFJLGFBQVksWUFBWSxPQUFNO0FBQzVDLFdBQUssYUFBYTtBQUNsQixXQUFLLFFBQVE7QUFDYixXQUFLLFNBQVM7QUFDZCxXQUFLLE9BQU8sYUFBYSxXQUFXLE9BQU87QUFDM0MsV0FBSyxLQUFLO0FBQ1YsV0FBSyxLQUFLLEtBQUssR0FBRztBQUNsQixXQUFLLE1BQU07QUFDWCxXQUFLLGFBQWE7QUFDbEIsV0FBSyxjQUFjO0FBQ25CLFdBQUssZUFBZTtBQUNwQixXQUFLLGNBQWM7QUFDbkIsV0FBSyxXQUFXO0FBQ2hCLFdBQUssT0FBTztBQUNaLFdBQUssWUFBWSxLQUFLLFNBQVMsS0FBSyxPQUFPLFlBQVksSUFBSTtBQUMzRCxXQUFLLGNBQWM7QUFDbkIsV0FBSyxZQUFZO0FBQ2pCLFdBQUssZUFBZSxXQUFXOztBQUMvQixXQUFLLGVBQWUsV0FBVzs7QUFDL0IsV0FBSyxpQkFBaUIsS0FBSyxTQUFTLE9BQU87QUFDM0MsV0FBSyxZQUFZO0FBQ2pCLFdBQUssWUFBWTtBQUNqQixXQUFLLGNBQWM7QUFDbkIsV0FBSyxXQUFXLEtBQUssU0FBUyxPQUFPO0FBQ3JDLFdBQUssS0FBSyxTQUFTLEtBQUssTUFBTTtBQUM5QixXQUFLLFVBQVUsS0FBSyxXQUFXLFFBQVEsTUFBTSxLQUFLLE1BQU0sTUFBTTtBQUM1RCxlQUFPO1VBQ0wsVUFBVSxLQUFLLFdBQVcsS0FBSyxPQUFPO1VBQ3RDLEtBQUssS0FBSyxXQUFXLFNBQVksS0FBSyxRQUFRO1VBQzlDLFFBQVEsS0FBSztVQUNiLFNBQVMsS0FBSztVQUNkLFFBQVEsS0FBSztVQUNiLE9BQU8sS0FBSzs7O0FBR2hCLFdBQUssV0FBVyxLQUFLLFdBQVc7QUFDaEMsV0FBSzs7SUFHUCxRQUFRLE1BQUs7QUFBRSxXQUFLLE9BQU87O0lBRTNCLFlBQVksTUFBSztBQUNmLFdBQUssV0FBVztBQUNoQixXQUFLLE9BQU87O0lBR2QsU0FBUTtBQUFFLGFBQU8sS0FBSyxXQUFXLFNBQVM7O0lBRTFDLGdCQUFlO0FBQ2IsVUFBSSxTQUFTLEtBQUssV0FBVyxPQUFPLEtBQUs7QUFDekMsVUFBSSxXQUNGLFlBQUksSUFBSSxVQUFVLElBQUksS0FBSyxRQUFRLHNCQUNoQyxJQUFJLENBQUEsU0FBUSxLQUFLLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQSxRQUFPLE9BQVEsUUFBUztBQUV2RSxVQUFHLFNBQVMsU0FBUyxHQUFFO0FBQUUsZUFBTyxtQkFBbUI7O0FBQ25ELGFBQU8sYUFBYSxLQUFLO0FBRXpCLGFBQU87O0lBR1QsY0FBYTtBQUFFLGFBQU8sS0FBSyxRQUFROztJQUVuQyxhQUFZO0FBQUUsYUFBTyxLQUFLLEdBQUcsYUFBYTs7SUFFMUMsWUFBVztBQUNULFVBQUksTUFBTSxLQUFLLEdBQUcsYUFBYTtBQUMvQixhQUFPLFFBQVEsS0FBSyxPQUFPOztJQUc3QixRQUFRLFdBQVcsV0FBVztPQUFJO0FBQ2hDLFdBQUs7QUFDTCxXQUFLLFlBQVk7QUFDakIsYUFBTyxLQUFLLEtBQUssU0FBUyxLQUFLO0FBQy9CLFVBQUcsS0FBSyxRQUFPO0FBQUUsZUFBTyxLQUFLLEtBQUssU0FBUyxLQUFLLE9BQU8sSUFBSSxLQUFLOztBQUNoRSxtQkFBYSxLQUFLO0FBQ2xCLFVBQUksYUFBYSxNQUFNO0FBQ3JCO0FBQ0EsaUJBQVEsTUFBTSxLQUFLLFdBQVU7QUFDM0IsZUFBSyxZQUFZLEtBQUssVUFBVTs7O0FBSXBDLGtCQUFJLHNCQUFzQixLQUFLO0FBRS9CLFdBQUssSUFBSSxhQUFhLE1BQU0sQ0FBQztBQUM3QixXQUFLLFFBQVEsUUFDVixRQUFRLE1BQU0sWUFDZCxRQUFRLFNBQVMsWUFDakIsUUFBUSxXQUFXOztJQUd4Qix1QkFBdUIsU0FBUTtBQUM3QixXQUFLLEdBQUcsVUFBVSxPQUNoQixxQkFDQSx3QkFDQTtBQUVGLFdBQUssR0FBRyxVQUFVLElBQUksR0FBRzs7SUFHM0IsWUFBVztBQUFFLGFBQU8sS0FBSyxHQUFHLFVBQVUsU0FBUzs7SUFFL0MsV0FBVyxTQUFRO0FBQ2pCLG1CQUFhLEtBQUs7QUFDbEIsVUFBRyxTQUFRO0FBQ1QsYUFBSyxjQUFjLFdBQVcsTUFBTSxLQUFLLGNBQWM7YUFDbEQ7QUFDTCxpQkFBUSxNQUFNLEtBQUssV0FBVTtBQUFFLGVBQUssVUFBVSxJQUFJOztBQUNsRCxhQUFLLG9CQUFvQjs7O0lBSTdCLGFBQVk7QUFDVixtQkFBYSxLQUFLO0FBQ2xCLFdBQUssb0JBQW9COztJQUczQixxQkFBb0I7QUFDbEIsZUFBUSxNQUFNLEtBQUssV0FBVTtBQUFFLGFBQUssVUFBVSxJQUFJOzs7SUFHcEQsSUFBSSxNQUFNLGFBQVk7QUFDcEIsV0FBSyxXQUFXLElBQUksTUFBTSxNQUFNOztJQUdsQyxjQUFjLFdBQVcsVUFBUztBQUNoQyxVQUFHLHFCQUFxQixhQUFZO0FBQ2xDLGVBQU8sS0FBSyxXQUFXLE1BQU0sV0FBVyxDQUFBLFNBQVEsU0FBUyxNQUFNOztBQUdqRSxVQUFHLGlCQUFpQixLQUFLLFlBQVc7QUFDbEMsWUFBSSxVQUFVLFlBQUksc0JBQXNCLEtBQUssSUFBSTtBQUNqRCxZQUFHLFFBQVEsV0FBVyxHQUFFO0FBQ3RCLG1CQUFTLDZDQUE2QztlQUNqRDtBQUNMLG1CQUFTLE1BQU0sUUFBUTs7YUFFcEI7QUFDTCxZQUFJLFVBQVUsTUFBTSxLQUFLLFNBQVMsaUJBQWlCO0FBQ25ELFlBQUcsUUFBUSxXQUFXLEdBQUU7QUFBRSxtQkFBUyxtREFBbUQ7O0FBQ3RGLGdCQUFRLFFBQVEsQ0FBQSxXQUFVLEtBQUssV0FBVyxNQUFNLFFBQVEsQ0FBQSxTQUFRLFNBQVMsTUFBTTs7O0lBSW5GLFVBQVUsTUFBTSxTQUFTLFVBQVM7QUFDaEMsV0FBSyxJQUFJLE1BQU0sTUFBTSxDQUFDLElBQUksTUFBTTtBQUNoQyxVQUFJLEVBQUMsTUFBTSxPQUFPLFFBQVEsVUFBUyxTQUFTLFFBQVE7QUFDcEQsVUFBRyxPQUFNO0FBQUUsb0JBQUksU0FBUzs7QUFFeEIsZUFBUyxFQUFDLE1BQU0sT0FBTztBQUN2QixhQUFPOztJQUdULE9BQU8sTUFBSztBQUNWLFVBQUksRUFBQyxVQUFVLGNBQWE7QUFDNUIsVUFBRyxXQUFVO0FBQ1gsWUFBSSxDQUFDLEtBQUssU0FBUztBQUNuQixhQUFLLEtBQUssWUFBSSxxQkFBcUIsS0FBSyxJQUFJLEtBQUs7O0FBRW5ELFdBQUssYUFBYTtBQUNsQixXQUFLLGNBQWM7QUFDbkIsV0FBSyxRQUFRO0FBRWIsc0JBQVEsVUFBVSxLQUFLLFdBQVcsY0FBYyxPQUFPLFNBQVMsVUFBVTtBQUMxRSxXQUFLLFVBQVUsU0FBUyxVQUFVLENBQUMsRUFBQyxNQUFNLGFBQVk7QUFDcEQsYUFBSyxXQUFXLElBQUksU0FBUyxLQUFLLElBQUk7QUFDdEMsWUFBSSxPQUFPLEtBQUssZ0JBQWdCLE1BQU07QUFDdEMsYUFBSztBQUNMLFlBQUksUUFBUSxLQUFLLGlCQUFpQjtBQUNsQyxhQUFLO0FBRUwsWUFBRyxNQUFNLFNBQVMsR0FBRTtBQUNsQixnQkFBTSxRQUFRLENBQUMsQ0FBQyxNQUFNLFNBQVMsU0FBUyxNQUFNO0FBQzVDLGlCQUFLLGlCQUFpQixNQUFNLFFBQVEsQ0FBQSxVQUFRO0FBQzFDLGtCQUFHLE1BQU0sTUFBTSxTQUFTLEdBQUU7QUFDeEIscUJBQUssZUFBZSxPQUFNLE1BQU07Ozs7ZUFJakM7QUFDTCxlQUFLLGVBQWUsTUFBTSxNQUFNOzs7O0lBS3RDLGtCQUFpQjtBQUFFLGtCQUFJLElBQUksS0FBSyxJQUFJLElBQUksWUFBWSxDQUFBLE9BQU0sR0FBRyxnQkFBZ0I7O0lBRTdFLGVBQWUsRUFBQyxjQUFhLE1BQU0sUUFBTztBQUd4QyxVQUFHLEtBQUssWUFBWSxLQUFNLEtBQUssVUFBVSxDQUFDLEtBQUssT0FBTyxpQkFBaUI7QUFDckUsZUFBTyxLQUFLLGVBQWUsWUFBWSxNQUFNOztBQU8vQyxVQUFJLGNBQWMsWUFBSSwwQkFBMEIsTUFBTSxLQUFLLElBQUksT0FBTyxDQUFBLFNBQVE7QUFDNUUsWUFBSSxTQUFTLEtBQUssTUFBTSxLQUFLLEdBQUcsY0FBYyxRQUFRLEtBQUs7QUFDM0QsWUFBSSxZQUFZLFVBQVUsT0FBTyxhQUFhO0FBQzlDLFlBQUcsV0FBVTtBQUFFLGVBQUssYUFBYSxZQUFZOztBQUM3QyxlQUFPLEtBQUssVUFBVTs7QUFHeEIsVUFBRyxZQUFZLFdBQVcsR0FBRTtBQUMxQixZQUFHLEtBQUssUUFBTztBQUNiLGVBQUssS0FBSyxlQUFlLEtBQUssQ0FBQyxNQUFNLE1BQU0sS0FBSyxlQUFlLFlBQVksTUFBTTtBQUNqRixlQUFLLE9BQU8sUUFBUTtlQUNmO0FBQ0wsZUFBSztBQUNMLGVBQUssZUFBZSxZQUFZLE1BQU07O2FBRW5DO0FBQ0wsYUFBSyxLQUFLLGVBQWUsS0FBSyxDQUFDLE1BQU0sTUFBTSxLQUFLLGVBQWUsWUFBWSxNQUFNOzs7SUFJckYsa0JBQWlCO0FBQ2YsV0FBSyxLQUFLLFlBQUksS0FBSyxLQUFLO0FBQ3hCLFdBQUssR0FBRyxhQUFhLGFBQWEsS0FBSyxLQUFLOztJQUc5QyxlQUFlLFFBQU87QUFDcEIsYUFBTyxRQUFRLENBQUMsQ0FBQyxPQUFPLGFBQWE7QUFDbkMsZUFBTyxjQUFjLElBQUksWUFBWSxZQUFZLFNBQVMsRUFBQyxRQUFROzs7SUFJdkUsZUFBZSxZQUFZLE1BQU0sUUFBTztBQUN0QyxXQUFLO0FBQ0wsVUFBSSxRQUFRLElBQUksU0FBUyxNQUFNLEtBQUssSUFBSSxLQUFLLElBQUksTUFBTTtBQUN2RCxZQUFNO0FBQ04sV0FBSyxhQUFhLE9BQU87QUFDekIsV0FBSztBQUNMLGtCQUFJLElBQUksS0FBSyxJQUFJLElBQUksS0FBSyxRQUFRLHlCQUF5QixhQUFhLENBQUEsV0FBVTtBQUNoRixZQUFJLE9BQU8sS0FBSyxRQUFRO0FBQ3hCLFlBQUcsTUFBSztBQUFFLGVBQUs7OztBQUdqQixXQUFLLGNBQWM7QUFDbkIsV0FBSyxlQUFlO0FBQ3BCLFdBQUs7QUFFTCxVQUFHLFlBQVc7QUFDWixZQUFJLEVBQUMsTUFBTSxPQUFNO0FBQ2pCLGFBQUssV0FBVyxhQUFhLElBQUk7O0FBRW5DLFdBQUs7QUFDTCxVQUFHLEtBQUssWUFBWSxHQUFFO0FBQUUsYUFBSzs7QUFDN0IsV0FBSzs7SUFHUCx3QkFBd0IsUUFBUSxNQUFLO0FBQ25DLFdBQUssV0FBVyxXQUFXLHFCQUFxQixDQUFDLFFBQVE7QUFDekQsVUFBSSxPQUFPLEtBQUssUUFBUTtBQUN4QixVQUFJLFlBQVksUUFBUSxZQUFJLFVBQVUsUUFBUSxLQUFLLFFBQVE7QUFDM0QsVUFBRyxRQUFRLENBQUMsT0FBTyxZQUFZLFNBQVMsQ0FBRSxjQUFhLFdBQVcsT0FBTyxTQUFTLEtBQUssV0FBVTtBQUMvRixhQUFLO0FBQ0wsZUFBTzs7O0lBSVgsYUFBYSxPQUFPLFdBQVU7QUFDNUIsVUFBSSxnQkFBZ0I7QUFDcEIsVUFBSSxtQkFBbUI7QUFDdkIsVUFBSSxpQkFBaUIsb0JBQUk7QUFFekIsWUFBTSxNQUFNLFNBQVMsQ0FBQSxPQUFNO0FBQ3pCLGFBQUssV0FBVyxXQUFXLGVBQWUsQ0FBQztBQUUzQyxZQUFJLFVBQVUsS0FBSyxRQUFRO0FBQzNCLFlBQUcsU0FBUTtBQUFFLGtCQUFROzs7QUFHdkIsWUFBTSxNQUFNLGlCQUFpQixDQUFBLFFBQU8sbUJBQW1CO0FBRXZELFlBQU0sT0FBTyxXQUFXLENBQUMsUUFBUSxTQUFTO0FBQ3hDLFlBQUksT0FBTyxLQUFLLHdCQUF3QixRQUFRO0FBQ2hELFlBQUcsTUFBSztBQUFFLHlCQUFlLElBQUksT0FBTzs7O0FBR3RDLFlBQU0sTUFBTSxXQUFXLENBQUEsT0FBTTtBQUMzQixZQUFHLGVBQWUsSUFBSSxHQUFHLEtBQUk7QUFBRSxlQUFLLFFBQVEsSUFBSTs7O0FBR2xELFlBQU0sTUFBTSxhQUFhLENBQUMsT0FBTztBQUMvQixZQUFJLE1BQU0sS0FBSyxZQUFZO0FBQzNCLFlBQUcsTUFBTSxRQUFRLGNBQWMsUUFBUSxTQUFTLElBQUc7QUFBRSx3QkFBYyxLQUFLOztBQUN4RSxZQUFJLE9BQU8sS0FBSyxRQUFRO0FBQ3hCLGdCQUFRLEtBQUssWUFBWTs7QUFHM0IsWUFBTTtBQUtOLFVBQUcsV0FBVTtBQUNYLGFBQUssNkJBQTZCOztBQUdwQyxhQUFPOztJQUdULGtCQUFpQjtBQUNmLGtCQUFJLGdCQUFnQixLQUFLLElBQUksS0FBSyxJQUFJLFFBQVEsQ0FBQSxPQUFNLEtBQUssVUFBVTs7SUFHckUsYUFBYSxJQUFHO0FBQUUsYUFBTyxLQUFLLEtBQUssU0FBUyxLQUFLLElBQUk7O0lBRXJELGtCQUFrQixJQUFHO0FBQ25CLFVBQUcsR0FBRyxPQUFPLEtBQUssSUFBRztBQUNuQixlQUFPO2FBQ0Y7QUFDTCxlQUFPLEtBQUssU0FBUyxHQUFHLGFBQWEsZ0JBQWdCLEdBQUc7OztJQUk1RCxrQkFBa0IsSUFBRztBQUNuQixlQUFRLFlBQVksS0FBSyxLQUFLLFVBQVM7QUFDckMsaUJBQVEsV0FBVyxLQUFLLEtBQUssU0FBUyxXQUFVO0FBQzlDLGNBQUcsWUFBWSxJQUFHO0FBQUUsbUJBQU8sS0FBSyxLQUFLLFNBQVMsVUFBVSxTQUFTOzs7OztJQUt2RSxVQUFVLElBQUc7QUFDWCxVQUFJLFFBQVEsS0FBSyxhQUFhLEdBQUc7QUFDakMsVUFBRyxDQUFDLE9BQU07QUFDUixZQUFJLE9BQU8sSUFBSSxLQUFLLElBQUksS0FBSyxZQUFZO0FBQ3pDLGFBQUssS0FBSyxTQUFTLEtBQUssSUFBSSxLQUFLLE1BQU07QUFDdkMsYUFBSztBQUNMLGFBQUs7QUFDTCxlQUFPOzs7SUFJWCxnQkFBZTtBQUFFLGFBQU8sS0FBSzs7SUFFN0IsUUFBUSxRQUFPO0FBQ2IsV0FBSztBQUVMLFVBQUcsS0FBSyxlQUFlLEdBQUU7QUFDdkIsWUFBRyxLQUFLLFFBQU87QUFDYixlQUFLLE9BQU8sUUFBUTtlQUNmO0FBQ0wsZUFBSzs7OztJQUtYLDBCQUF5QjtBQUN2QixXQUFLO0FBQ0wsV0FBSyxlQUFlLFFBQVEsQ0FBQyxDQUFDLE1BQU0sUUFBUTtBQUMxQyxZQUFHLENBQUMsS0FBSyxlQUFjO0FBQUU7OztBQUUzQixXQUFLLGlCQUFpQjs7SUFHeEIsT0FBTyxNQUFNLFFBQU87QUFDbEIsVUFBRyxLQUFLLG1CQUFtQixLQUFLLFdBQVcsa0JBQWlCO0FBQzFELGVBQU8sS0FBSyxhQUFhLEtBQUssRUFBQyxNQUFNOztBQUd2QyxXQUFLLFNBQVMsVUFBVTtBQUN4QixVQUFJLG1CQUFtQjtBQUt2QixVQUFHLEtBQUssU0FBUyxvQkFBb0IsT0FBTTtBQUN6QyxhQUFLLFdBQVcsS0FBSyw0QkFBNEIsTUFBTTtBQUNyRCxjQUFJLGFBQWEsWUFBSSxlQUFlLEtBQUssSUFBSSxLQUFLLFNBQVMsY0FBYztBQUN6RSxxQkFBVyxRQUFRLENBQUEsY0FBYTtBQUM5QixnQkFBRyxLQUFLLGVBQWUsS0FBSyxTQUFTLGFBQWEsTUFBTSxZQUFZLFlBQVc7QUFBRSxpQ0FBbUI7Ozs7aUJBR2hHLENBQUMsUUFBUSxPQUFNO0FBQ3ZCLGFBQUssV0FBVyxLQUFLLHVCQUF1QixNQUFNO0FBQ2hELGNBQUksT0FBTyxLQUFLLGdCQUFnQixNQUFNO0FBQ3RDLGNBQUksUUFBUSxJQUFJLFNBQVMsTUFBTSxLQUFLLElBQUksS0FBSyxJQUFJLE1BQU07QUFDdkQsNkJBQW1CLEtBQUssYUFBYSxPQUFPOzs7QUFJaEQsV0FBSyxlQUFlO0FBQ3BCLFVBQUcsa0JBQWlCO0FBQUUsYUFBSzs7O0lBRzdCLGdCQUFnQixNQUFNLE1BQUs7QUFDekIsYUFBTyxLQUFLLFdBQVcsS0FBSyxrQkFBa0IsU0FBUyxNQUFNO0FBQzNELFlBQUksTUFBTSxLQUFLLEdBQUc7QUFHbEIsWUFBSSxPQUFPLE9BQU8sS0FBSyxTQUFTLGNBQWMsTUFBTSxPQUFPLEtBQUssZUFBZTtBQUMvRSxZQUFJLE9BQU8sS0FBSyxTQUFTLFNBQVM7QUFDbEMsZUFBTyxJQUFJLE9BQU8sU0FBUzs7O0lBSS9CLGVBQWUsTUFBTSxLQUFJO0FBQ3ZCLFVBQUcsUUFBUTtBQUFPLGVBQU87QUFDekIsVUFBSSxPQUFPLEtBQUssU0FBUyxrQkFBa0I7QUFDM0MsVUFBSSxRQUFRLElBQUksU0FBUyxNQUFNLEtBQUssSUFBSSxLQUFLLElBQUksTUFBTTtBQUN2RCxVQUFJLGdCQUFnQixLQUFLLGFBQWEsT0FBTztBQUM3QyxhQUFPOztJQUdULFFBQVEsSUFBRztBQUFFLGFBQU8sS0FBSyxVQUFVLFNBQVMsVUFBVTs7SUFFdEQsUUFBUSxJQUFHO0FBQ1QsVUFBRyxTQUFTLFVBQVUsT0FBTyxDQUFDLEdBQUcsY0FBYTtBQUFFOztBQUNoRCxVQUFJLFdBQVcsR0FBRyxhQUFhLFlBQVksZUFBZSxHQUFHLGFBQWEsS0FBSyxRQUFRO0FBQ3ZGLFVBQUcsWUFBWSxDQUFDLEtBQUssWUFBWSxLQUFJO0FBQUU7O0FBQ3ZDLFVBQUksWUFBWSxLQUFLLFdBQVcsaUJBQWlCO0FBRWpELFVBQUcsV0FBVTtBQUNYLFlBQUcsQ0FBQyxHQUFHLElBQUc7QUFBRSxtQkFBUyx1QkFBdUIseURBQXlEOztBQUNyRyxZQUFJLE9BQU8sSUFBSSxTQUFTLE1BQU0sSUFBSTtBQUNsQyxhQUFLLFVBQVUsU0FBUyxVQUFVLEtBQUssT0FBTztBQUM5QyxlQUFPO2lCQUNDLGFBQWEsTUFBSztBQUMxQixpQkFBUywyQkFBMkIsYUFBYTs7O0lBSXJELFlBQVksTUFBSztBQUNmLFdBQUs7QUFDTCxXQUFLO0FBQ0wsYUFBTyxLQUFLLFVBQVUsU0FBUyxVQUFVLEtBQUs7O0lBR2hELHNCQUFxQjtBQUNuQixXQUFLLGFBQWEsUUFBUSxDQUFDLEVBQUMsTUFBTSxhQUFZLEtBQUssT0FBTyxNQUFNO0FBQ2hFLFdBQUssZUFBZTs7SUFHdEIsVUFBVSxPQUFPLElBQUc7QUFDbEIsV0FBSyxXQUFXLFVBQVUsS0FBSyxTQUFTLE9BQU8sQ0FBQSxTQUFRO0FBQ3JELFlBQUcsS0FBSyxpQkFBZ0I7QUFDdEIsZUFBSyxLQUFLLGVBQWUsS0FBSyxDQUFDLE1BQU0sTUFBTSxHQUFHO2VBQ3pDO0FBQ0wsYUFBRzs7OztJQUtULGNBQWE7QUFHWCxXQUFLLFdBQVcsVUFBVSxLQUFLLFNBQVMsUUFBUSxDQUFDLFlBQVk7QUFDM0QsYUFBSyxVQUFVLFVBQVUsU0FBUyxDQUFDLEVBQUMsTUFBTSxhQUFZLEtBQUssT0FBTyxNQUFNOztBQUUxRSxXQUFLLFVBQVUsWUFBWSxDQUFDLEVBQUMsSUFBSSxZQUFXLEtBQUssV0FBVyxFQUFDLElBQUk7QUFDakUsV0FBSyxVQUFVLGNBQWMsQ0FBQyxVQUFVLEtBQUssWUFBWTtBQUN6RCxXQUFLLFVBQVUsaUJBQWlCLENBQUMsVUFBVSxLQUFLLGVBQWU7QUFDL0QsV0FBSyxRQUFRLFFBQVEsQ0FBQSxXQUFVLEtBQUssUUFBUTtBQUM1QyxXQUFLLFFBQVEsUUFBUSxDQUFBLFdBQVUsS0FBSyxRQUFROztJQUc5QyxxQkFBb0I7QUFDbEIsZUFBUSxNQUFNLEtBQUssS0FBSyxTQUFTLEtBQUssS0FBSTtBQUN4QyxhQUFLLGFBQWEsSUFBSTs7O0lBSTFCLGVBQWUsT0FBTTtBQUNuQixVQUFJLEVBQUMsSUFBSSxNQUFNLFVBQVM7QUFDeEIsVUFBSSxNQUFNLEtBQUssVUFBVTtBQUN6QixXQUFLLFdBQVcsZ0JBQWdCLEtBQUssTUFBTTs7SUFHN0MsWUFBWSxPQUFNO0FBQ2hCLFVBQUksRUFBQyxJQUFJLFNBQVE7QUFDakIsV0FBSyxPQUFPLEtBQUssVUFBVTtBQUMzQixXQUFLLFdBQVcsYUFBYSxJQUFJOztJQUduQyxVQUFVLElBQUc7QUFDWCxhQUFPLEdBQUcsV0FBVyxPQUFPLEdBQUcsT0FBTyxTQUFTLGFBQWEsT0FBTyxTQUFTLE9BQU8sT0FBTzs7SUFHNUYsV0FBVyxFQUFDLElBQUksU0FBTztBQUFFLFdBQUssV0FBVyxTQUFTLElBQUk7O0lBRXRELGNBQWE7QUFBRSxhQUFPLEtBQUs7O0lBRTNCLEtBQUssVUFBUztBQUNaLFVBQUcsQ0FBQyxLQUFLLFFBQU87QUFDZCxhQUFLLGVBQWUsS0FBSyxXQUFXLGdCQUFnQixFQUFDLElBQUksS0FBSyxNQUFNLE1BQU07O0FBRTVFLFdBQUssZUFBZSxNQUFNLFlBQVksU0FBUyxLQUFLO0FBQ3BELFdBQUssV0FBVyxTQUFTLE1BQU0sRUFBQyxTQUFTLFNBQVEsTUFBTTtBQUNyRCxlQUFPLEtBQUssUUFBUSxPQUNqQixRQUFRLE1BQU0sQ0FBQSxTQUFRLENBQUMsS0FBSyxpQkFBaUIsS0FBSyxPQUFPLE9BQ3pELFFBQVEsU0FBUyxDQUFBLFNBQVEsQ0FBQyxLQUFLLGlCQUFpQixLQUFLLFlBQVksT0FDakUsUUFBUSxXQUFXLE1BQU0sQ0FBQyxLQUFLLGlCQUFpQixLQUFLLFlBQVksRUFBQyxRQUFROzs7SUFJakYsWUFBWSxNQUFLO0FBQ2YsVUFBRyxLQUFLLFdBQVcsa0JBQWtCLEtBQUssV0FBVyxTQUFRO0FBQzNELGFBQUssSUFBSSxTQUFTLE1BQU0sQ0FBQyw0REFBNEQ7QUFDckYsZUFBTyxLQUFLLFdBQVcsRUFBQyxJQUFJLEtBQUs7O0FBRW5DLFVBQUcsS0FBSyxZQUFZLEtBQUssZUFBYztBQUNyQyxhQUFLLGNBQWM7QUFDbkIsYUFBSyxRQUFROztBQUVmLFVBQUcsS0FBSyxVQUFTO0FBQUUsZUFBTyxLQUFLLFdBQVcsS0FBSzs7QUFDL0MsVUFBRyxLQUFLLGVBQWM7QUFBRSxlQUFPLEtBQUssZUFBZSxLQUFLOztBQUN4RCxXQUFLLElBQUksU0FBUyxNQUFNLENBQUMsa0JBQWtCO0FBQzNDLGFBQU8sS0FBSyxXQUFXLGlCQUFpQjs7SUFHMUMsUUFBUSxRQUFPO0FBQ2IsVUFBRyxLQUFLLGVBQWM7QUFBRTs7QUFDeEIsVUFBSSxLQUFLLG1CQUFtQixTQUFTLG9CQUFvQixZQUN0RCxLQUFLLFdBQVcsb0JBQW9CLFdBQVcsU0FBUztBQUV6RCxlQUFPLEtBQUssV0FBVyxpQkFBaUI7O0FBRTFDLFdBQUs7QUFDTCxXQUFLLFdBQVcsa0JBQWtCO0FBRWxDLFVBQUcsU0FBUyxlQUFjO0FBQUUsaUJBQVMsY0FBYzs7QUFDbkQsVUFBRyxLQUFLLFdBQVcsY0FBYTtBQUM5QixhQUFLLFdBQVc7OztJQUlwQixRQUFRLFFBQU87QUFDYixXQUFLLFFBQVE7QUFDYixXQUFLLElBQUksU0FBUyxNQUFNLENBQUMsZ0JBQWdCO0FBQ3pDLFVBQUcsQ0FBQyxLQUFLLFdBQVcsY0FBYTtBQUFFLGFBQUs7OztJQUcxQyxlQUFjO0FBQ1osVUFBRyxLQUFLLFVBQVM7QUFBRSxvQkFBSSxjQUFjLFFBQVEsMEJBQTBCLEVBQUMsSUFBSSxLQUFLLE1BQU0sTUFBTTs7QUFDN0YsV0FBSztBQUNMLFdBQUssb0JBQW9CLHdCQUF3Qjs7SUFHbkQsY0FBYyxjQUFjLE9BQU8sU0FBUyxVQUFVLFdBQVc7T0FBSTtBQUNuRSxVQUFHLENBQUMsS0FBSyxlQUFjO0FBQUU7O0FBRXpCLFVBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxlQUFlLGlCQUFpQixDQUFDLE1BQU07QUFDekQsVUFBSSxnQkFBZ0IsV0FBVzs7QUFDL0IsVUFBRyxNQUFPLEdBQUcsYUFBYSxLQUFLLFFBQVEsdUJBQXVCLE1BQU07QUFDbEUsd0JBQWdCLEtBQUssV0FBVyxnQkFBZ0IsRUFBQyxNQUFNLFdBQVcsUUFBUTs7QUFHNUUsVUFBRyxPQUFRLFFBQVEsUUFBUyxVQUFTO0FBQUUsZUFBTyxRQUFROztBQUN0RCxhQUNFLEtBQUssV0FBVyxTQUFTLE1BQU0sRUFBQyxTQUFTLFFBQU8sTUFBTTtBQUNwRCxlQUFPLEtBQUssUUFBUSxLQUFLLE9BQU8sU0FBUyxjQUFjLFFBQVEsTUFBTSxDQUFBLFNBQVE7QUFDM0UsY0FBSSxZQUFZO0FBQ2hCLGNBQUcsUUFBUSxNQUFLO0FBQUUsaUJBQUssU0FBUzs7QUFDaEMsY0FBRyxLQUFLLE1BQUs7QUFDWCx3QkFBWSxLQUFLLFVBQVUsVUFBVSxLQUFLLE1BQU0sQ0FBQyxFQUFDLE1BQU0sYUFBWTtBQUNsRSxtQkFBSyxPQUFPLE1BQU07OztBQUd0QixjQUFHLEtBQUssVUFBUztBQUFFLGlCQUFLLFdBQVcsS0FBSzs7QUFDeEMsY0FBRyxLQUFLLFlBQVc7QUFBRSxpQkFBSyxZQUFZLEtBQUs7O0FBQzNDLGNBQUcsS0FBSyxlQUFjO0FBQUUsaUJBQUssZUFBZSxLQUFLOztBQUNqRDtBQUNBLGtCQUFRLE1BQU07Ozs7SUFNdEIsU0FBUyxLQUFJO0FBQ1gsa0JBQUksSUFBSSxLQUFLLElBQUksSUFBSSxZQUFZLFNBQVMsQ0FBQSxPQUFNO0FBQzlDLFlBQUksY0FBYyxHQUFHLGFBQWE7QUFFbEMsV0FBRyxnQkFBZ0I7QUFFbkIsWUFBRyxHQUFHLGFBQWEsa0JBQWtCLE1BQUs7QUFDeEMsYUFBRyxXQUFXO0FBQ2QsYUFBRyxnQkFBZ0I7O0FBRXJCLFlBQUcsZ0JBQWdCLE1BQUs7QUFDdEIsYUFBRyxXQUFXLGdCQUFnQixTQUFTLE9BQU87QUFDOUMsYUFBRyxnQkFBZ0I7O0FBR3JCLDBCQUFrQixRQUFRLENBQUEsY0FBYSxZQUFJLFlBQVksSUFBSTtBQUUzRCxZQUFJLGlCQUFpQixHQUFHLGFBQWE7QUFDckMsWUFBRyxtQkFBbUIsTUFBSztBQUN6QixhQUFHLFlBQVk7QUFDZixhQUFHLGdCQUFnQjs7QUFFckIsWUFBSSxPQUFPLFlBQUksUUFBUSxJQUFJO0FBQzNCLFlBQUcsTUFBSztBQUNOLGNBQUksT0FBTyxLQUFLLHdCQUF3QixJQUFJO0FBQzVDLG1CQUFTLFFBQVEsSUFBSSxNQUFNLEtBQUssV0FBVztBQUMzQyxjQUFHLE1BQUs7QUFBRSxpQkFBSzs7QUFDZixzQkFBSSxjQUFjLElBQUk7Ozs7SUFLNUIsT0FBTyxVQUFVLE9BQU07QUFDckIsVUFBSSxTQUFTLEtBQUs7QUFDbEIsVUFBSSxjQUFjLEtBQUssUUFBUTtBQUUvQixlQUFTLFFBQVEsQ0FBQSxPQUFNO0FBQ3JCLFdBQUcsVUFBVSxJQUFJLE9BQU87QUFDeEIsV0FBRyxhQUFhLFNBQVM7QUFDekIsWUFBSSxjQUFjLEdBQUcsYUFBYTtBQUNsQyxZQUFHLGdCQUFnQixNQUFLO0FBQ3RCLGNBQUcsQ0FBQyxHQUFHLGFBQWEsMkJBQTBCO0FBQzVDLGVBQUcsYUFBYSwwQkFBMEIsR0FBRzs7QUFFL0MsYUFBRyxZQUFZOzs7QUFHbkIsYUFBTyxDQUFDLFFBQVE7O0lBR2xCLFlBQVksSUFBRztBQUNiLFVBQUksTUFBTSxHQUFHLGdCQUFnQixHQUFHLGFBQWE7QUFDN0MsYUFBTyxNQUFNLFNBQVMsT0FBTzs7SUFHL0Isa0JBQWtCLFFBQVEsV0FBVTtBQUNsQyxVQUFHLE9BQU8sYUFBYSxLQUFLLFFBQVEsWUFBVztBQUM3QyxlQUFPLEtBQUssbUJBQW1CO2FBQzFCO0FBQ0wsZUFBTzs7O0lBSVgsbUJBQW1CLFdBQVU7QUFDM0IsVUFBRyxXQUFVO0FBQ1gsZUFBTyxNQUFNLFVBQVUsUUFBUSxJQUFJLG1CQUFtQixDQUFBLE9BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZO2FBQ2hHO0FBQ0wsZUFBTzs7O0lBSVgsY0FBYyxXQUFXLE9BQU8sU0FBUyxTQUFRO0FBQy9DLFVBQUcsQ0FBQyxLQUFLLGVBQWM7QUFDckIsYUFBSyxJQUFJLFFBQVEsTUFBTSxDQUFDLHFEQUFxRCxPQUFPO0FBQ3BGLGVBQU87O0FBRVQsVUFBSSxDQUFDLEtBQUssT0FBTyxLQUFLLE9BQU8sSUFBSTtBQUNqQyxXQUFLLGNBQWMsTUFBTSxDQUFDLEtBQUssTUFBTSxTQUFTO1FBQzVDLE1BQU07UUFDTjtRQUNBLE9BQU87UUFDUCxLQUFLLEtBQUssbUJBQW1CO1NBQzVCLENBQUMsTUFBTSxVQUFVLFFBQVEsT0FBTztBQUVuQyxhQUFPOztJQUdULFlBQVksSUFBSSxNQUFLO0FBQ25CLFVBQUksU0FBUyxLQUFLLFFBQVE7QUFDMUIsZUFBUSxJQUFJLEdBQUcsSUFBSSxHQUFHLFdBQVcsUUFBUSxLQUFJO0FBQzNDLFlBQUksT0FBTyxHQUFHLFdBQVcsR0FBRztBQUM1QixZQUFHLEtBQUssV0FBVyxTQUFRO0FBQUUsZUFBSyxLQUFLLFFBQVEsUUFBUSxPQUFPLEdBQUcsYUFBYTs7O0FBRWhGLFVBQUcsR0FBRyxVQUFVLFFBQVU7QUFDeEIsYUFBSyxRQUFRLEdBQUc7QUFFaEIsWUFBRyxHQUFHLFlBQVksV0FBVyxpQkFBaUIsUUFBUSxHQUFHLFNBQVMsS0FBSyxDQUFDLEdBQUcsU0FBUTtBQUNqRixpQkFBTyxLQUFLOzs7QUFHaEIsYUFBTzs7SUFHVCxVQUFVLE1BQU0sSUFBSSxXQUFXLFVBQVUsTUFBSztBQUM1QyxXQUFLLGNBQWMsTUFBTSxLQUFLLE9BQU8sQ0FBQyxLQUFLLE9BQU8sU0FBUztRQUN6RDtRQUNBLE9BQU87UUFDUCxPQUFPLEtBQUssWUFBWSxJQUFJO1FBQzVCLEtBQUssS0FBSyxrQkFBa0IsSUFBSTs7O0lBSXBDLFFBQVEsWUFBWSxXQUFXLE1BQU0sVUFBVSxNQUFLO0FBQ2xELFdBQUssY0FBYyxNQUFNLEtBQUssT0FBTyxDQUFDLGFBQWEsT0FBTyxTQUFTO1FBQ2pFLE1BQU07UUFDTixPQUFPO1FBQ1AsT0FBTyxLQUFLLFlBQVksWUFBWTtRQUNwQyxLQUFLLEtBQUssa0JBQWtCLFlBQVk7OztJQUk1QyxpQkFBaUIsUUFBUSxVQUFVLFVBQVUsVUFBVSxXQUFXO09BQUk7QUFDcEUsV0FBSyxXQUFXLGFBQWEsT0FBTyxNQUFNLENBQUMsTUFBTSxjQUFjO0FBQzdELGFBQUssY0FBYyxNQUFNLFlBQVk7VUFDbkMsT0FBTyxPQUFPLGFBQWEsS0FBSyxRQUFRO1VBQ3hDLEtBQUssT0FBTyxhQUFhO1VBQ3pCLFdBQVc7VUFDWDtVQUNBLEtBQUssS0FBSyxrQkFBa0IsT0FBTyxNQUFNO1dBQ3hDOzs7SUFJUCxVQUFVLFNBQVMsV0FBVyxVQUFVLFVBQVUsYUFBYSxVQUFTO0FBQ3RFLFVBQUk7QUFDSixVQUFJLE1BQU0sTUFBTSxZQUFZLFdBQVcsS0FBSyxrQkFBa0IsUUFBUSxNQUFNO0FBQzVFLFVBQUksZUFBZSxNQUFNLEtBQUssT0FBTyxDQUFDLFNBQVMsUUFBUSxPQUFPO0FBQzlELFVBQUksV0FBVyxjQUFjLFFBQVEsTUFBTSxFQUFDLFNBQVMsWUFBWTtBQUNqRSxVQUFHLFFBQVEsU0FBUyxRQUFRLE1BQU0sU0FBUyxHQUFFO0FBQzNDLHFCQUFhLFdBQVcsU0FBUyxNQUFNLEtBQUssUUFBUTs7QUFFdEQsZ0JBQVUsYUFBYSxpQkFBaUI7QUFDeEMsVUFBSSxRQUFRO1FBQ1YsTUFBTTtRQUNOLE9BQU87UUFDUCxPQUFPO1FBQ1A7UUFDQTs7QUFFRixXQUFLLGNBQWMsY0FBYyxTQUFTLE9BQU8sQ0FBQSxTQUFRO0FBQ3ZELG9CQUFJLFVBQVUsU0FBUyxLQUFLLFdBQVcsUUFBUTtBQUMvQyxZQUFHLFlBQUksY0FBYyxZQUFZLFFBQVEsYUFBYSw0QkFBNEIsTUFBSztBQUNyRixjQUFHLGFBQWEsdUJBQXVCLFNBQVMsU0FBUyxHQUFFO0FBQ3pELGdCQUFJLENBQUMsS0FBSyxRQUFRO0FBQ2xCLGlCQUFLLFlBQVksUUFBUSxNQUFNLFdBQVcsS0FBSyxLQUFLLENBQUMsYUFBYTtBQUNoRSwwQkFBWSxTQUFTO0FBQ3JCLG1CQUFLLHNCQUFzQixRQUFROzs7ZUFHbEM7QUFDTCxzQkFBWSxTQUFTOzs7O0lBSzNCLHNCQUFzQixRQUFPO0FBQzNCLFVBQUksaUJBQWlCLEtBQUssbUJBQW1CO0FBQzdDLFVBQUcsZ0JBQWU7QUFDaEIsWUFBSSxDQUFDLEtBQUssTUFBTSxZQUFZO0FBQzVCLGFBQUssYUFBYTtBQUNsQjs7O0lBSUosbUJBQW1CLFFBQU87QUFDeEIsYUFBTyxLQUFLLFlBQVksS0FBSyxDQUFDLENBQUMsSUFBSSxlQUFlLEdBQUcsV0FBVzs7SUFHbEUsZUFBZSxRQUFRLEtBQUssVUFBUztBQUNuQyxVQUFHLEtBQUssbUJBQW1CLFNBQVE7QUFBRSxlQUFPOztBQUM1QyxXQUFLLFlBQVksS0FBSyxDQUFDLFFBQVEsS0FBSzs7SUFHdEMsYUFBYSxRQUFPO0FBQ2xCLFdBQUssY0FBYyxLQUFLLFlBQVksT0FBTyxDQUFDLENBQUMsSUFBSSxLQUFLLGVBQWU7QUFDbkUsWUFBRyxHQUFHLFdBQVcsU0FBUTtBQUN2QixlQUFLLFNBQVM7QUFDZCxpQkFBTztlQUNGO0FBQ0wsaUJBQU87Ozs7SUFLYixlQUFlLFFBQVEsV0FBVyxVQUFVLFNBQVE7QUFDbEQsVUFBSSxnQkFBZ0IsQ0FBQSxPQUFNO0FBQ3hCLFlBQUksY0FBYyxrQkFBa0IsSUFBSSxHQUFHLEtBQUssUUFBUSxzQkFBc0IsR0FBRztBQUNqRixlQUFPLENBQUUsZ0JBQWUsa0JBQWtCLElBQUksMEJBQTBCLEdBQUc7O0FBRTdFLFVBQUksaUJBQWlCLENBQUEsT0FBTTtBQUN6QixlQUFPLEdBQUcsYUFBYSxLQUFLLFFBQVE7O0FBRXRDLFVBQUksZUFBZSxDQUFBLE9BQU0sR0FBRyxXQUFXO0FBRXZDLFVBQUksY0FBYyxDQUFBLE9BQU0sQ0FBQyxTQUFTLFlBQVksVUFBVSxTQUFTLEdBQUc7QUFFcEUsVUFBSSxlQUFlLE1BQU07QUFDdkIsWUFBSSxlQUFlLE1BQU0sS0FBSyxPQUFPO0FBQ3JDLFlBQUksV0FBVyxhQUFhLE9BQU87QUFDbkMsWUFBSSxVQUFVLGFBQWEsT0FBTyxjQUFjLE9BQU87QUFDdkQsWUFBSSxTQUFTLGFBQWEsT0FBTyxhQUFhLE9BQU87QUFFckQsZ0JBQVEsUUFBUSxDQUFBLFdBQVU7QUFDeEIsaUJBQU8sYUFBYSxjQUFjLE9BQU87QUFDekMsaUJBQU8sV0FBVzs7QUFFcEIsZUFBTyxRQUFRLENBQUEsVUFBUztBQUN0QixnQkFBTSxhQUFhLGNBQWMsTUFBTTtBQUN2QyxnQkFBTSxXQUFXO0FBQ2pCLGNBQUcsTUFBTSxPQUFNO0FBQ2Isa0JBQU0sYUFBYSxjQUFjLE1BQU07QUFDdkMsa0JBQU0sV0FBVzs7O0FBR3JCLGVBQU8sYUFBYSxLQUFLLFFBQVEsbUJBQW1CO0FBQ3BELGVBQU8sS0FBSyxPQUFPLENBQUMsUUFBUSxPQUFPLFVBQVUsT0FBTyxTQUFTLE9BQU8sU0FBUzs7QUFHL0UsVUFBSSxNQUFNLEtBQUssa0JBQWtCLFFBQVE7QUFDekMsVUFBRyxhQUFhLHFCQUFxQixTQUFRO0FBQzNDLFlBQUksQ0FBQyxLQUFLLFFBQVE7QUFDbEIsZUFBTyxLQUFLLGVBQWUsUUFBUSxLQUFLLE1BQU0sS0FBSyxlQUFlLFFBQVEsV0FBVyxVQUFVO2lCQUN2RixhQUFhLHdCQUF3QixRQUFRLFNBQVMsR0FBRTtBQUNoRSxZQUFJLENBQUMsS0FBSyxPQUFPO0FBQ2pCLFlBQUksY0FBYyxNQUFNLENBQUMsS0FBSztBQUM5QixhQUFLLFlBQVksUUFBUSxXQUFXLEtBQUssS0FBSyxDQUFDLGFBQWE7QUFDMUQsY0FBSSxXQUFXLGNBQWMsUUFBUTtBQUNyQyxlQUFLLGNBQWMsYUFBYSxTQUFTO1lBQ3ZDLE1BQU07WUFDTixPQUFPO1lBQ1AsT0FBTztZQUNQO2FBQ0M7O2FBRUE7QUFDTCxZQUFJLFdBQVcsY0FBYztBQUM3QixhQUFLLGNBQWMsY0FBYyxTQUFTO1VBQ3hDLE1BQU07VUFDTixPQUFPO1VBQ1AsT0FBTztVQUNQO1dBQ0M7OztJQUlQLFlBQVksUUFBUSxXQUFXLEtBQUssS0FBSyxZQUFXO0FBQ2xELFVBQUksb0JBQW9CLEtBQUs7QUFDN0IsVUFBSSxXQUFXLGFBQWEsaUJBQWlCO0FBQzdDLFVBQUksMEJBQTBCLFNBQVM7QUFHdkMsZUFBUyxRQUFRLENBQUEsWUFBVztBQUMxQixZQUFJLFdBQVcsSUFBSSxhQUFhLFNBQVMsTUFBTSxNQUFNO0FBQ25EO0FBQ0EsY0FBRyw0QkFBNEIsR0FBRTtBQUFFOzs7QUFHckMsYUFBSyxVQUFVLFdBQVc7QUFDMUIsWUFBSSxVQUFVLFNBQVMsVUFBVSxJQUFJLENBQUEsVUFBUyxNQUFNO0FBRXBELFlBQUksVUFBVTtVQUNaLEtBQUssUUFBUSxhQUFhO1VBQzFCO1VBQ0EsS0FBSyxLQUFLLGtCQUFrQixRQUFRLE1BQU07O0FBRzVDLGFBQUssSUFBSSxVQUFVLE1BQU0sQ0FBQyw2QkFBNkI7QUFFdkQsYUFBSyxjQUFjLE1BQU0sZ0JBQWdCLFNBQVMsQ0FBQSxTQUFRO0FBQ3hELGVBQUssSUFBSSxVQUFVLE1BQU0sQ0FBQywwQkFBMEI7QUFDcEQsY0FBRyxLQUFLLE9BQU07QUFDWixpQkFBSyxTQUFTO0FBQ2QsZ0JBQUksQ0FBQyxXQUFXLFVBQVUsS0FBSztBQUMvQixpQkFBSyxJQUFJLFVBQVUsTUFBTSxDQUFDLG1CQUFtQixhQUFhO2lCQUNyRDtBQUNMLGdCQUFJLFVBQVUsQ0FBQyxhQUFhO0FBQzFCLG1CQUFLLFFBQVEsUUFBUSxNQUFNO0FBQ3pCLG9CQUFHLEtBQUssY0FBYyxtQkFBa0I7QUFBRTs7OztBQUc5QyxxQkFBUyxrQkFBa0IsTUFBTSxTQUFTLEtBQUs7Ozs7O0lBTXZELGdCQUFnQixNQUFNLGNBQWE7QUFDakMsVUFBSSxTQUFTLFlBQUksaUJBQWlCLEtBQUssSUFBSSxPQUFPLENBQUEsT0FBTSxHQUFHLFNBQVM7QUFDcEUsVUFBRyxPQUFPLFdBQVcsR0FBRTtBQUFFLGlCQUFTLGdEQUFnRDtpQkFDMUUsT0FBTyxTQUFTLEdBQUU7QUFBRSxpQkFBUyx1REFBdUQ7YUFDdkY7QUFBRSxvQkFBSSxjQUFjLE9BQU8sSUFBSSxtQkFBbUIsRUFBQyxPQUFPOzs7SUFHakUsaUJBQWlCLE1BQU0sUUFBUSxVQUFTO0FBQ3RDLFdBQUssV0FBVyxhQUFhLE1BQU0sQ0FBQyxNQUFNLGNBQWM7QUFDdEQsWUFBSSxRQUFRLEtBQUssU0FBUztBQUMxQixZQUFJLFdBQVcsS0FBSyxhQUFhLEtBQUssUUFBUSxzQkFBc0IsS0FBSyxhQUFhLEtBQUssUUFBUTtBQUNuRyxhQUFLLFVBQVUsT0FBTyxXQUFXLFFBQVEsVUFBVSxPQUFPOzs7SUFJOUQsY0FBYyxNQUFNLFVBQVUsVUFBUztBQUNyQyxVQUFJLFVBQVUsS0FBSyxXQUFXLGVBQWU7QUFDN0MsVUFBSSxTQUFTLFdBQVcsTUFBTSxLQUFLLE9BQU8sQ0FBQyxXQUFXLFdBQVc7QUFFakUsV0FBSyxjQUFjLFFBQVEsY0FBYyxFQUFDLEtBQUssUUFBTyxDQUFBLFNBQVE7QUFDNUQsWUFBRyxLQUFLLGVBQWM7QUFDcEIsZUFBSyxXQUFXLFlBQVksTUFBTSxNQUFNLFVBQVU7ZUFDN0M7QUFDTCxjQUFHLEtBQUssV0FBVyxrQkFBa0IsVUFBUztBQUM1QyxpQkFBSyxPQUFPOztBQUVkLGVBQUs7QUFDTCxzQkFBWSxTQUFTOztTQUV0QixRQUFRLFdBQVcsTUFBTSxLQUFLLFdBQVcsU0FBUyxPQUFPLFNBQVM7O0lBR3ZFLGlCQUFpQixNQUFLO0FBQ3BCLFVBQUcsS0FBSyxjQUFjLEdBQUU7QUFBRSxlQUFPOztBQUVqQyxVQUFJLFlBQVksS0FBSyxRQUFRO0FBQzdCLFVBQUksV0FBVyxTQUFTLGNBQWM7QUFDdEMsZUFBUyxZQUFZO0FBRXJCLGFBQ0UsWUFBSSxJQUFJLEtBQUssSUFBSSxRQUFRLGNBQ3RCLE9BQU8sQ0FBQSxTQUFRLEtBQUssTUFBTSxLQUFLLFlBQVksT0FDM0MsT0FBTyxDQUFBLFNBQVEsS0FBSyxTQUFTLFNBQVMsR0FDdEMsT0FBTyxDQUFBLFNBQVEsS0FBSyxhQUFhLEtBQUssUUFBUSx1QkFBdUIsVUFDckUsSUFBSSxDQUFBLFNBQVE7QUFDWCxZQUFJLFVBQVUsU0FBUyxRQUFRLGNBQWMsWUFBWSxLQUFLLFFBQVEsY0FBYyxLQUFLLGFBQWE7QUFDdEcsWUFBRyxTQUFRO0FBQ1QsaUJBQU8sQ0FBQyxNQUFNLFNBQVMsS0FBSyxZQUFZO2VBQ25DO0FBQ0wsaUJBQU8sQ0FBQyxNQUFNLE1BQU07O1NBR3ZCLE9BQU8sQ0FBQyxDQUFDLE1BQU0sU0FBUyxZQUFZOztJQUkzQyw2QkFBNkIsZUFBYztBQUN6QyxVQUFJLGtCQUFrQixjQUFjLE9BQU8sQ0FBQSxRQUFPO0FBQ2hELGVBQU8sWUFBSSxzQkFBc0IsS0FBSyxJQUFJLEtBQUssV0FBVzs7QUFFNUQsVUFBRyxnQkFBZ0IsU0FBUyxHQUFFO0FBQzVCLGFBQUssWUFBWSxLQUFLLEdBQUc7QUFFekIsYUFBSyxjQUFjLE1BQU0scUJBQXFCLEVBQUMsTUFBTSxtQkFBa0IsTUFBTTtBQUczRSxlQUFLLGNBQWMsS0FBSyxZQUFZLE9BQU8sQ0FBQSxRQUFPLGdCQUFnQixRQUFRLFNBQVM7QUFJbkYsY0FBSSx3QkFBd0IsZ0JBQWdCLE9BQU8sQ0FBQSxRQUFPO0FBQ3hELG1CQUFPLFlBQUksc0JBQXNCLEtBQUssSUFBSSxLQUFLLFdBQVc7O0FBRzVELGNBQUcsc0JBQXNCLFNBQVMsR0FBRTtBQUNsQyxpQkFBSyxjQUFjLE1BQU0sa0JBQWtCLEVBQUMsTUFBTSx5QkFBd0IsQ0FBQyxTQUFTO0FBQ2xGLG1CQUFLLFNBQVMsVUFBVSxLQUFLOzs7Ozs7SUFPdkMsWUFBWSxJQUFHO0FBQ2IsYUFBTyxHQUFHLGFBQWEsbUJBQW1CLEtBQUssTUFDN0MsTUFBTSxHQUFHLFFBQVEsb0JBQW9CLENBQUEsU0FBUSxLQUFLLFFBQVEsS0FBSzs7SUFHbkUsV0FBVyxNQUFNLFdBQVcsVUFBUztBQUNuQyxrQkFBSSxXQUFXLE1BQU0sbUJBQW1CO0FBQ3hDLFdBQUssV0FBVyxrQkFBa0I7QUFDbEMsV0FBSyxlQUFlLE1BQU0sV0FBVyxVQUFVLE1BQU07QUFDbkQsYUFBSyxXQUFXOzs7SUFJcEIsUUFBUSxNQUFLO0FBQUUsYUFBTyxLQUFLLFdBQVcsUUFBUTs7O0FDMTVCaEQsTUFBQSxhQUFBLE1BQWdDO0lBQzlCLFlBQVksS0FBSyxXQUFXLE9BQU8sSUFBRztBQUNwQyxXQUFLLFdBQVc7QUFDaEIsVUFBRyxDQUFDLGFBQWEsVUFBVSxZQUFZLFNBQVMsVUFBUztBQUN2RCxjQUFNLElBQUksTUFBTTs7Ozs7Ozs7QUFRbEIsV0FBSyxTQUFTLElBQUksVUFBVSxLQUFLO0FBQ2pDLFdBQUssZ0JBQWdCLEtBQUssaUJBQWlCO0FBQzNDLFdBQUssT0FBTztBQUNaLFdBQUssU0FBUyxTQUFRLEtBQUssVUFBVTtBQUNyQyxXQUFLLGFBQWEsS0FBSztBQUN2QixXQUFLLG9CQUFvQixLQUFLLFlBQVk7QUFDMUMsV0FBSyxXQUFXLE9BQU8sT0FBTyxNQUFNLFdBQVcsS0FBSyxZQUFZO0FBQ2hFLFdBQUssZ0JBQWdCO0FBQ3JCLFdBQUssYUFBYTtBQUNsQixXQUFLLFdBQVc7QUFDaEIsV0FBSyxPQUFPO0FBQ1osV0FBSyxVQUFVO0FBQ2YsV0FBSyxRQUFRO0FBQ2IsV0FBSyxPQUFPLE9BQU8sU0FBUztBQUM1QixXQUFLLGNBQWM7QUFDbkIsV0FBSyxrQkFBa0IsTUFBTSxPQUFPO0FBQ3BDLFdBQUssUUFBUSxLQUFLLFNBQVM7QUFDM0IsV0FBSyxZQUFZLEtBQUssYUFBYTtBQUNuQyxXQUFLLGdCQUFnQixLQUFLLGlCQUFpQjtBQUMzQyxXQUFLLGVBQWUsS0FBSyxnQkFBZ0IsT0FBTztBQUNoRCxXQUFLLGlCQUFpQixLQUFLLGtCQUFrQixPQUFPO0FBQ3BELFdBQUssc0JBQXNCO0FBQzNCLFdBQUssZUFBZSxPQUFPLE9BQU8sRUFBQyxhQUFhLFlBQVcsbUJBQW1CLGNBQVksS0FBSyxPQUFPO0FBQ3RHLGFBQU8saUJBQWlCLFlBQVksQ0FBQSxPQUFNO0FBQ3hDLGFBQUssV0FBVzs7QUFFbEIsV0FBSyxPQUFPLE9BQU8sTUFBTTtBQUN2QixZQUFHLEtBQUssY0FBYTtBQUVuQixpQkFBTyxTQUFTOzs7O0lBT3RCLG1CQUFrQjtBQUFFLGFBQU8sS0FBSyxlQUFlLFFBQVEsb0JBQW9COztJQUUzRSxpQkFBZ0I7QUFBRSxhQUFPLEtBQUssZUFBZSxRQUFRLGtCQUFrQjs7SUFFdkUsY0FBYTtBQUFFLFdBQUssZUFBZSxRQUFRLGNBQWM7O0lBRXpELGtCQUFpQjtBQUFFLFdBQUssZUFBZSxRQUFRLGdCQUFnQjs7SUFFL0QsZUFBYztBQUFFLFdBQUssZUFBZSxXQUFXOztJQUUvQyxtQkFBa0I7QUFBRSxXQUFLLGVBQWUsV0FBVzs7SUFFbkQsaUJBQWlCLGNBQWE7QUFDNUIsV0FBSztBQUNMLGNBQVEsSUFBSTtBQUNaLFdBQUssZUFBZSxRQUFRLG9CQUFvQjs7SUFHbEQsb0JBQW1CO0FBQUUsV0FBSyxlQUFlLFdBQVc7O0lBRXBELGdCQUFlO0FBQ2IsVUFBSSxNQUFNLEtBQUssZUFBZSxRQUFRO0FBQ3RDLGFBQU8sTUFBTSxTQUFTLE9BQU87O0lBRy9CLFlBQVc7QUFBRSxhQUFPLEtBQUs7O0lBRXpCLFVBQVM7QUFDUCxVQUFJLFlBQVksTUFBTTtBQUNwQixZQUFHLEtBQUssaUJBQWdCO0FBQ3RCLGVBQUs7QUFDTCxlQUFLLE9BQU87OztBQUdoQixVQUFHLENBQUMsWUFBWSxVQUFVLGVBQWUsUUFBUSxTQUFTLGVBQWUsR0FBRTtBQUN6RTthQUNLO0FBQ0wsaUJBQVMsaUJBQWlCLG9CQUFvQixNQUFNOzs7SUFJeEQsV0FBVyxVQUFTO0FBQUUsV0FBSyxPQUFPLFdBQVc7O0lBSTdDLFdBQVcsTUFBTSxNQUFLO0FBQUUsV0FBSyxhQUFhLE1BQU0sR0FBRzs7SUFFbkQsS0FBSyxNQUFNLE1BQUs7QUFDZCxVQUFHLENBQUMsS0FBSyxzQkFBc0IsQ0FBQyxRQUFRLE1BQUs7QUFBRSxlQUFPOztBQUN0RCxjQUFRLEtBQUs7QUFDYixVQUFJLFNBQVM7QUFDYixjQUFRLFFBQVE7QUFDaEIsYUFBTzs7SUFHVCxJQUFJLE1BQU0sTUFBTSxhQUFZO0FBQzFCLFVBQUcsS0FBSyxZQUFXO0FBQ2pCLFlBQUksQ0FBQyxLQUFLLE9BQU87QUFDakIsYUFBSyxXQUFXLE1BQU0sTUFBTSxLQUFLO2lCQUN6QixLQUFLLGtCQUFpQjtBQUM5QixZQUFJLENBQUMsS0FBSyxPQUFPO0FBQ2pCLGNBQU0sTUFBTSxNQUFNLEtBQUs7OztJQUkzQixVQUFVLFNBQVMsT0FBTyxJQUFHO0FBQzNCLGNBQVEsR0FBRyxPQUFPLENBQUEsU0FBUTtBQUN4QixZQUFJLFVBQVUsS0FBSztBQUNuQixZQUFHLENBQUMsU0FBUTtBQUNWLGFBQUc7ZUFDRTtBQUNMLGtCQUFRLElBQUksY0FBYztBQUMxQixxQkFBVyxNQUFNLEdBQUcsT0FBTzs7OztJQUtqQyxTQUFTLE1BQU0sTUFBTSxNQUFLO0FBQ3hCLFVBQUksVUFBVSxLQUFLO0FBQ25CLFVBQUksZUFBZSxLQUFLO0FBQ3hCLFVBQUcsQ0FBQyxTQUFRO0FBQ1YsWUFBRyxLQUFLLFNBQVE7QUFDZCxpQkFBTyxPQUFPLFFBQVEsV0FBVyxNQUFNO0FBQ3JDLGdCQUFHLEtBQUssY0FBYyxnQkFBZ0IsQ0FBQyxLQUFLLGVBQWM7QUFDeEQsbUJBQUssaUJBQWlCLE1BQU0sTUFBTTtBQUNoQyxxQkFBSyxJQUFJLE1BQU0sV0FBVyxNQUFNLENBQUM7Ozs7ZUFJbEM7QUFDTCxpQkFBTzs7O0FBSVgsY0FBUSxJQUFJLGNBQWM7QUFDMUIsVUFBSSxXQUFXO1FBQ2IsVUFBVTtRQUNWLFFBQVEsTUFBTSxJQUFHO0FBQUUsZUFBSyxTQUFTLEtBQUssQ0FBQyxNQUFNOzs7QUFFL0MsaUJBQVcsTUFBTTtBQUNmLFlBQUcsS0FBSyxlQUFjO0FBQUU7O0FBQ3hCLGlCQUFTLFNBQVMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLFFBQVEsSUFBSSxRQUFRLE1BQU0sS0FBSztTQUNwRTtBQUNILGFBQU87O0lBR1QsaUJBQWlCLE1BQU0sS0FBSTtBQUN6QixXQUFLO0FBQ0wsV0FBSztBQUNMLFVBQUksQ0FBQyxPQUFPLFNBQVM7QUFDckIsVUFBSSxVQUFVLEtBQUssTUFBTSxLQUFLLFdBQVksU0FBUSxRQUFRLE1BQU07QUFDaEUsVUFBSSxRQUFRLGdCQUFRLFlBQVksS0FBSyxjQUFjLE9BQU8sU0FBUyxVQUFVLHFCQUFxQixHQUFHLENBQUEsVUFBUyxRQUFRO0FBQ3RILFlBQU0sUUFBUSxLQUFLLElBQUksTUFBTSxRQUFRLE1BQU0sQ0FBQyxlQUFlO0FBQzNELFVBQUcsUUFBUSxhQUFZO0FBQ3JCLGFBQUssSUFBSSxNQUFNLFFBQVEsTUFBTSxDQUFDLFlBQVk7QUFDMUMsa0JBQVU7O0FBRVosaUJBQVcsTUFBTTtBQUNmLFlBQUcsS0FBSyxrQkFBaUI7QUFDdkIsaUJBQU8sV0FBVyxLQUFLO2VBQ2xCO0FBQ0wsaUJBQU8sU0FBUzs7U0FFakI7O0lBR0wsaUJBQWlCLE1BQUs7QUFDcEIsYUFBTyxRQUFRLEtBQUssV0FBVyxjQUFjLGNBQU0sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLLE1BQU07O0lBR3RGLGFBQVk7QUFBRSxhQUFPLEtBQUs7O0lBRTFCLGNBQWE7QUFBRSxhQUFPLEtBQUssT0FBTzs7SUFFbEMsbUJBQWtCO0FBQUUsYUFBTyxLQUFLOztJQUVoQyxRQUFRLE1BQUs7QUFBRSxhQUFPLEdBQUcsS0FBSyxxQkFBcUI7O0lBRW5ELFFBQVEsT0FBTyxRQUFPO0FBQUUsYUFBTyxLQUFLLE9BQU8sUUFBUSxPQUFPOztJQUUxRCxnQkFBZTtBQUNiLFVBQUksYUFBYTtBQUNqQixrQkFBSSxJQUFJLFVBQVUsR0FBRywwQkFBMEIsbUJBQW1CLENBQUEsV0FBVTtBQUMxRSxZQUFHLENBQUMsS0FBSyxZQUFZLE9BQU8sS0FBSTtBQUM5QixjQUFJLE9BQU8sS0FBSyxZQUFZO0FBQzVCLGVBQUssUUFBUSxLQUFLO0FBQ2xCLGVBQUs7QUFDTCxjQUFHLE9BQU8sYUFBYSxXQUFVO0FBQUUsaUJBQUssT0FBTzs7O0FBRWpELHFCQUFhOztBQUVmLGFBQU87O0lBR1QsU0FBUyxJQUFJLE9BQU07QUFDakIsV0FBSztBQUNMLHNCQUFRLFNBQVMsSUFBSTs7SUFHdkIsWUFBWSxNQUFNLE9BQU8sV0FBVyxNQUFNLFVBQVUsS0FBSyxlQUFlLE9BQU07QUFDNUUsVUFBSSxZQUFZLEtBQUssS0FBSztBQUMxQixVQUFJLFlBQVksWUFBSSxVQUFVLFdBQVc7QUFDekMsV0FBSyxLQUFLLFdBQVcsS0FBSztBQUMxQixXQUFLLEtBQUs7QUFFVixXQUFLLE9BQU8sS0FBSyxZQUFZLFdBQVc7QUFDeEMsV0FBSyxLQUFLLFlBQVk7QUFDdEIsV0FBSyxLQUFLLEtBQUssQ0FBQSxjQUFhO0FBQzFCLFlBQUcsY0FBYyxLQUFLLEtBQUssa0JBQWtCLFVBQVM7QUFDcEQsb0JBQVUsWUFBWTtBQUN0QixzQkFBWTs7OztJQUtsQixVQUFVLElBQUc7QUFBRSxhQUFPLEdBQUcsZ0JBQWdCLEdBQUcsYUFBYSxpQkFBaUI7O0lBRTFFLFlBQVksSUFBSSxPQUFNO0FBQ3BCLFVBQUksT0FBTyxJQUFJLEtBQUssSUFBSSxNQUFNLE1BQU07QUFDcEMsV0FBSyxNQUFNLEtBQUssTUFBTTtBQUN0QixhQUFPOztJQUdULE1BQU0sU0FBUyxVQUFTO0FBQ3RCLFVBQUksT0FBTyxNQUFNLFFBQVEsUUFBUSxvQkFBb0IsQ0FBQSxPQUFNLEtBQUssWUFBWTtBQUM1RSxVQUFHLE1BQUs7QUFBRSxpQkFBUzs7O0lBR3JCLGFBQWEsU0FBUyxVQUFTO0FBQzdCLFdBQUssTUFBTSxTQUFTLENBQUEsU0FBUTtBQUMxQixZQUFJLFlBQVksUUFBUSxhQUFhLEtBQUssUUFBUTtBQUNsRCxZQUFHLGNBQWMsTUFBSztBQUNwQixtQkFBUyxNQUFNO2VBQ1Y7QUFDTCxlQUFLLGNBQWMsV0FBVzs7OztJQUtwQyxZQUFZLElBQUc7QUFDYixVQUFJLFNBQVMsR0FBRyxhQUFhO0FBQzdCLGFBQU8sTUFBTSxLQUFLLFlBQVksU0FBUyxDQUFBLFNBQVEsS0FBSyxrQkFBa0I7O0lBR3hFLFlBQVksSUFBRztBQUFFLGFBQU8sS0FBSyxNQUFNOztJQUVuQyxrQkFBaUI7QUFDZixlQUFRLE1BQU0sS0FBSyxPQUFNO0FBQ3ZCLGFBQUssTUFBTSxJQUFJO0FBQ2YsZUFBTyxLQUFLLE1BQU07OztJQUl0QixnQkFBZ0IsSUFBRztBQUNqQixVQUFJLE9BQU8sS0FBSyxZQUFZLEdBQUcsYUFBYTtBQUM1QyxVQUFHLE1BQUs7QUFBRSxhQUFLLGtCQUFrQixHQUFHOzs7SUFHdEMsaUJBQWlCLFFBQU87QUFDdEIsVUFBRyxLQUFLLGtCQUFrQixRQUFPO0FBQUU7O0FBQ25DLFdBQUssZ0JBQWdCO0FBQ3JCLFVBQUksU0FBUyxNQUFNO0FBQ2pCLFlBQUcsV0FBVyxLQUFLLGVBQWM7QUFBRSxlQUFLLGdCQUFnQjs7QUFDeEQsZUFBTyxvQkFBb0IsV0FBVztBQUN0QyxlQUFPLG9CQUFvQixZQUFZOztBQUV6QyxhQUFPLGlCQUFpQixXQUFXO0FBQ25DLGFBQU8saUJBQWlCLFlBQVk7O0lBR3RDLG1CQUFrQjtBQUNoQixVQUFHLFNBQVMsa0JBQWtCLFNBQVMsTUFBSztBQUMxQyxlQUFPLEtBQUssaUJBQWlCLFNBQVM7YUFDakM7QUFFTCxlQUFPLFNBQVMsaUJBQWlCLFNBQVM7OztJQUk5QyxrQkFBa0IsTUFBSztBQUNyQixVQUFHLEtBQUssY0FBYyxLQUFLLFlBQVksS0FBSyxhQUFZO0FBQ3RELGFBQUssYUFBYTs7O0lBSXRCLCtCQUE4QjtBQUM1QixVQUFHLEtBQUssY0FBYyxLQUFLLGVBQWUsU0FBUyxNQUFLO0FBQ3RELGFBQUssV0FBVzs7O0lBSXBCLG9CQUFtQjtBQUNqQixXQUFLLGFBQWEsS0FBSztBQUN2QixVQUFHLEtBQUssZUFBZSxTQUFTLE1BQUs7QUFBRSxhQUFLLFdBQVc7OztJQUd6RCxxQkFBb0I7QUFDbEIsVUFBRyxLQUFLLHFCQUFvQjtBQUFFOztBQUU5QixXQUFLLHNCQUFzQjtBQUMzQixlQUFTLEtBQUssaUJBQWlCLFNBQVMsV0FBVzs7QUFDbkQsYUFBTyxpQkFBaUIsWUFBWSxDQUFBLE1BQUs7QUFDdkMsWUFBRyxFQUFFLFdBQVU7QUFDYixlQUFLLFlBQVk7QUFDakIsZUFBSyxnQkFBZ0IsRUFBQyxJQUFJLE9BQU8sU0FBUyxNQUFNLE1BQU07QUFDdEQsaUJBQU8sU0FBUzs7U0FFakI7QUFDSCxXQUFLO0FBQ0wsV0FBSztBQUNMLFdBQUs7QUFDTCxXQUFLLEtBQUssRUFBQyxPQUFPLFNBQVMsU0FBUyxhQUFZLENBQUMsR0FBRyxNQUFNLE1BQU0sUUFBUSxXQUFXLFVBQVUsZUFBZTtBQUMxRyxZQUFJLFdBQVcsT0FBTyxhQUFhLEtBQUssUUFBUTtBQUNoRCxZQUFJLGFBQWEsRUFBRSxPQUFPLEVBQUUsSUFBSTtBQUNoQyxZQUFHLFlBQVksU0FBUyxrQkFBa0IsWUFBVztBQUFFOztBQUV2RCxhQUFLLFFBQVEsUUFBUSxXQUFXLE1BQU0sVUFBVSxpQkFBQyxLQUFLLEVBQUUsT0FBUSxLQUFLLFVBQVUsTUFBTSxHQUFHOztBQUUxRixXQUFLLEtBQUssRUFBQyxNQUFNLFlBQVksT0FBTyxhQUFZLENBQUMsR0FBRyxNQUFNLE1BQU0sVUFBVSxXQUFXLFVBQVUsY0FBYztBQUMzRyxZQUFHLENBQUMsV0FBVTtBQUNaLGVBQUssVUFBVSxNQUFNLFVBQVUsV0FBVyxVQUFVLEtBQUssVUFBVSxNQUFNLEdBQUc7OztBQUdoRixXQUFLLEtBQUssRUFBQyxNQUFNLFFBQVEsT0FBTyxXQUFVLENBQUMsR0FBRyxNQUFNLE1BQU0sVUFBVSxXQUFXLFVBQVUsY0FBYztBQUVyRyxZQUFHLGFBQWEsQ0FBQyxjQUFjLFVBQVM7QUFDdEMsZUFBSyxVQUFVLE1BQU0sVUFBVSxXQUFXLFVBQVUsS0FBSyxVQUFVLE1BQU0sR0FBRzs7O0FBR2hGLGFBQU8saUJBQWlCLFlBQVksQ0FBQSxNQUFLLEVBQUU7QUFDM0MsYUFBTyxpQkFBaUIsUUFBUSxDQUFBLE1BQUs7QUFDbkMsVUFBRTtBQUNGLFlBQUksZUFBZSxNQUFNLGtCQUFrQixFQUFFLFFBQVEsS0FBSyxRQUFRLG1CQUFtQixDQUFBLGVBQWM7QUFDakcsaUJBQU8sV0FBVyxhQUFhLEtBQUssUUFBUTs7QUFFOUMsWUFBSSxhQUFhLGdCQUFnQixTQUFTLGVBQWU7QUFDekQsWUFBSSxRQUFRLE1BQU0sS0FBSyxFQUFFLGFBQWEsU0FBUztBQUMvQyxZQUFHLENBQUMsY0FBYyxXQUFXLFlBQVksTUFBTSxXQUFXLEtBQUssQ0FBRSxZQUFXLGlCQUFpQixXQUFVO0FBQUU7O0FBRXpHLHFCQUFhLFdBQVcsWUFBWTtBQUNwQyxtQkFBVyxjQUFjLElBQUksTUFBTSxTQUFTLEVBQUMsU0FBUzs7QUFFeEQsV0FBSyxHQUFHLG1CQUFtQixDQUFBLE1BQUs7QUFDOUIsWUFBSSxlQUFlLEVBQUU7QUFDckIsWUFBRyxDQUFDLFlBQUksY0FBYyxlQUFjO0FBQUU7O0FBQ3RDLFlBQUksUUFBUSxNQUFNLEtBQUssRUFBRSxPQUFPLFNBQVMsSUFBSSxPQUFPLENBQUEsTUFBSyxhQUFhLFFBQVEsYUFBYTtBQUMzRixxQkFBYSxXQUFXLGNBQWM7QUFDdEMscUJBQWEsY0FBYyxJQUFJLE1BQU0sU0FBUyxFQUFDLFNBQVM7OztJQUk1RCxVQUFVLFdBQVcsR0FBRyxVQUFTO0FBQy9CLFVBQUksV0FBVyxLQUFLLGtCQUFrQjtBQUN0QyxhQUFPLFdBQVcsU0FBUyxHQUFHLFlBQVk7O0lBRzVDLGVBQWUsTUFBSztBQUNsQixXQUFLO0FBQ0wsV0FBSyxjQUFjO0FBQ25CLGFBQU8sS0FBSzs7SUFHZCxrQkFBa0IsU0FBUTtBQUN4QixVQUFHLEtBQUssWUFBWSxTQUFRO0FBQzFCLGVBQU87YUFDRjtBQUNMLGFBQUssT0FBTyxLQUFLO0FBQ2pCLGFBQUssY0FBYztBQUNuQixlQUFPOzs7SUFJWCxVQUFTO0FBQUUsYUFBTyxLQUFLOztJQUV2QixpQkFBZ0I7QUFBRSxhQUFPLENBQUMsQ0FBQyxLQUFLOztJQUVoQyxLQUFLLFFBQVEsVUFBUztBQUNwQixlQUFRLFNBQVMsUUFBTztBQUN0QixZQUFJLG1CQUFtQixPQUFPO0FBRTlCLGFBQUssR0FBRyxrQkFBa0IsQ0FBQSxNQUFLO0FBQzdCLGNBQUksVUFBVSxLQUFLLFFBQVE7QUFDM0IsY0FBSSxnQkFBZ0IsS0FBSyxRQUFRLFVBQVU7QUFDM0MsY0FBSSxpQkFBaUIsRUFBRSxPQUFPLGdCQUFnQixFQUFFLE9BQU8sYUFBYTtBQUNwRSxjQUFHLGdCQUFlO0FBQ2hCLGlCQUFLLFNBQVMsRUFBRSxRQUFRLEdBQUcsTUFBTTtBQUMvQixtQkFBSyxhQUFhLEVBQUUsUUFBUSxDQUFDLE1BQU0sY0FBYztBQUMvQyx5QkFBUyxHQUFHLE9BQU8sTUFBTSxFQUFFLFFBQVEsV0FBVyxnQkFBZ0I7OztpQkFHN0Q7QUFDTCx3QkFBSSxJQUFJLFVBQVUsSUFBSSxrQkFBa0IsQ0FBQSxPQUFNO0FBQzVDLGtCQUFJLFdBQVcsR0FBRyxhQUFhO0FBQy9CLG1CQUFLLFNBQVMsSUFBSSxHQUFHLE1BQU07QUFDekIscUJBQUssYUFBYSxJQUFJLENBQUMsTUFBTSxjQUFjO0FBQ3pDLDJCQUFTLEdBQUcsT0FBTyxNQUFNLElBQUksV0FBVyxVQUFVOzs7Ozs7OztJQVNoRSxhQUFZO0FBQ1YsV0FBSyxVQUFVLFNBQVMsU0FBUztBQUNqQyxXQUFLLFVBQVUsYUFBYSxpQkFBaUI7O0lBRy9DLFVBQVUsV0FBVyxhQUFhLFNBQVE7QUFDeEMsVUFBSSxRQUFRLEtBQUssUUFBUTtBQUN6QixhQUFPLGlCQUFpQixXQUFXLENBQUEsTUFBSztBQUN0QyxZQUFHLENBQUMsS0FBSyxlQUFjO0FBQUU7O0FBQ3pCLFlBQUksU0FBUztBQUNiLFlBQUcsU0FBUTtBQUNULG1CQUFTLEVBQUUsT0FBTyxRQUFRLElBQUksWUFBWSxFQUFFLFNBQVMsRUFBRSxPQUFPLGNBQWMsSUFBSTtlQUMzRTtBQUNMLG1CQUFTLGtCQUFrQixFQUFFLFFBQVE7O0FBRXZDLFlBQUksV0FBVyxVQUFVLE9BQU8sYUFBYTtBQUM3QyxZQUFHLENBQUMsVUFBUztBQUFFOztBQUNmLFlBQUcsT0FBTyxhQUFhLFlBQVksS0FBSTtBQUFFLFlBQUU7O0FBRTNDLGFBQUssU0FBUyxRQUFRLEdBQUcsTUFBTTtBQUM3QixlQUFLLGFBQWEsUUFBUSxDQUFDLE1BQU0sY0FBYztBQUM3QyxpQkFBSyxVQUFVLFNBQVMsUUFBUSxXQUFXLFVBQVUsS0FBSyxVQUFVLFNBQVMsR0FBRzs7O1NBR25GOztJQUdMLFVBQVM7QUFDUCxVQUFHLENBQUMsZ0JBQVEsZ0JBQWU7QUFBRTs7QUFDN0IsVUFBRyxRQUFRLG1CQUFrQjtBQUFFLGdCQUFRLG9CQUFvQjs7QUFDM0QsVUFBSSxjQUFjO0FBQ2xCLGFBQU8saUJBQWlCLFVBQVUsQ0FBQSxPQUFNO0FBQ3RDLHFCQUFhO0FBQ2Isc0JBQWMsV0FBVyxNQUFNO0FBQzdCLDBCQUFRLG1CQUFtQixDQUFBLFVBQVMsT0FBTyxPQUFPLE9BQU8sRUFBQyxRQUFRLE9BQU87V0FDeEU7O0FBRUwsYUFBTyxpQkFBaUIsWUFBWSxDQUFBLFVBQVM7QUFDM0MsWUFBRyxDQUFDLEtBQUssb0JBQW9CLE9BQU8sV0FBVTtBQUFFOztBQUNoRCxZQUFJLEVBQUMsTUFBTSxJQUFJLE1BQU0sV0FBVSxNQUFNLFNBQVM7QUFDOUMsWUFBSSxPQUFPLE9BQU8sU0FBUztBQUUzQixZQUFHLEtBQUssS0FBSyxpQkFBa0IsVUFBUyxXQUFXLE9BQU8sS0FBSyxLQUFLLEtBQUk7QUFDdEUsZUFBSyxLQUFLLGNBQWMsTUFBTTtlQUN6QjtBQUNMLGVBQUssWUFBWSxNQUFNLE1BQU0sTUFBTTtBQUNqQyxnQkFBRyxNQUFLO0FBQUUsbUJBQUs7O0FBQ2YsZ0JBQUcsT0FBTyxXQUFZLFVBQVM7QUFDN0IseUJBQVcsTUFBTTtBQUNmLHVCQUFPLFNBQVMsR0FBRztpQkFDbEI7Ozs7U0FJUjtBQUNILGFBQU8saUJBQWlCLFNBQVMsQ0FBQSxNQUFLO0FBQ3BDLFlBQUksU0FBUyxrQkFBa0IsRUFBRSxRQUFRO0FBQ3pDLFlBQUksT0FBTyxVQUFVLE9BQU8sYUFBYTtBQUN6QyxZQUFJLGNBQWMsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFdBQVc7QUFDekQsWUFBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLGlCQUFpQixDQUFDLEtBQUssUUFBUSxhQUFZO0FBQUU7O0FBQy9ELFlBQUksT0FBTyxPQUFPO0FBQ2xCLFlBQUksWUFBWSxPQUFPLGFBQWE7QUFDcEMsVUFBRTtBQUNGLFlBQUcsS0FBSyxnQkFBZ0IsTUFBSztBQUFFOztBQUUvQixZQUFHLFNBQVMsU0FBUTtBQUNsQixlQUFLLGlCQUFpQixNQUFNLFdBQVc7bUJBQy9CLFNBQVMsWUFBVztBQUM1QixlQUFLLGdCQUFnQixNQUFNO2VBQ3RCO0FBQ0wsZ0JBQU0sSUFBSSxNQUFNLFlBQVksbURBQW1EOztTQUVoRjs7SUFHTCxnQkFBZ0IsTUFBTSxVQUFTO0FBQzdCLGtCQUFJLGNBQWMsUUFBUSwwQkFBMEI7QUFDcEQsVUFBSSxPQUFPLE1BQU0sWUFBSSxjQUFjLFFBQVEseUJBQXlCO0FBQ3BFLGFBQU8sV0FBVyxTQUFTLFFBQVE7O0lBR3JDLGlCQUFpQixNQUFNLFdBQVcsVUFBUztBQUN6QyxXQUFLLGdCQUFnQixFQUFDLElBQUksTUFBTSxNQUFNLFdBQVUsQ0FBQSxTQUFRO0FBQ3RELGFBQUssS0FBSyxjQUFjLE1BQU0sVUFBVSxDQUFBLFlBQVc7QUFDakQsZUFBSyxhQUFhLE1BQU0sV0FBVztBQUNuQzs7OztJQUtOLGFBQWEsTUFBTSxXQUFXLFVBQVUsS0FBSyxlQUFlLE9BQU07QUFDaEUsVUFBRyxDQUFDLEtBQUssa0JBQWtCLFVBQVM7QUFBRTs7QUFFdEMsc0JBQVEsVUFBVSxXQUFXLEVBQUMsTUFBTSxTQUFTLElBQUksS0FBSyxLQUFLLE1BQUs7QUFDaEUsV0FBSyxvQkFBb0IsT0FBTzs7SUFHbEMsZ0JBQWdCLE1BQU0sV0FBVyxPQUFNO0FBQ3JDLFVBQUksU0FBUyxPQUFPO0FBQ3BCLFdBQUssZ0JBQWdCLEVBQUMsSUFBSSxNQUFNLE1BQU0sY0FBYSxDQUFBLFNBQVE7QUFDekQsYUFBSyxZQUFZLE1BQU0sT0FBTyxNQUFNO0FBQ2xDLDBCQUFRLFVBQVUsV0FBVyxFQUFDLE1BQU0sWUFBWSxJQUFJLEtBQUssS0FBSyxJQUFJLFVBQWlCO0FBQ25GLGVBQUssb0JBQW9CLE9BQU87QUFDaEM7Ozs7SUFLTixxQkFBb0I7QUFDbEIsc0JBQVEsVUFBVSxXQUFXLEVBQUMsTUFBTSxNQUFNLE1BQU0sU0FBUyxJQUFJLEtBQUssS0FBSzs7SUFHekUsb0JBQW9CLGFBQVk7QUFDOUIsVUFBSSxFQUFDLFVBQVUsV0FBVSxLQUFLO0FBQzlCLFVBQUcsV0FBVyxXQUFXLFlBQVksV0FBVyxZQUFZLFFBQU87QUFDakUsZUFBTzthQUNGO0FBQ0wsYUFBSyxrQkFBa0IsTUFBTTtBQUM3QixlQUFPOzs7SUFJWCxZQUFXO0FBQ1QsVUFBSSxhQUFhO0FBQ2pCLFdBQUssR0FBRyxVQUFVLENBQUEsTUFBSztBQUNyQixZQUFJLFdBQVcsRUFBRSxPQUFPLGFBQWEsS0FBSyxRQUFRO0FBQ2xELFlBQUcsQ0FBQyxVQUFTO0FBQUU7O0FBQ2YsVUFBRTtBQUNGLFVBQUUsT0FBTyxXQUFXO0FBQ3BCLGFBQUssYUFBYSxFQUFFLFFBQVEsQ0FBQyxNQUFNLGNBQWMsS0FBSyxXQUFXLEVBQUUsUUFBUSxXQUFXO1NBQ3JGO0FBRUgsZUFBUSxRQUFRLENBQUMsVUFBVSxVQUFTO0FBQ2xDLGFBQUssR0FBRyxNQUFNLENBQUEsTUFBSztBQUNqQixjQUFJLFFBQVEsRUFBRTtBQUNkLGNBQUksV0FBVyxNQUFNLFFBQVEsTUFBTSxLQUFLLGFBQWEsS0FBSyxRQUFRO0FBQ2xFLGNBQUcsQ0FBQyxVQUFTO0FBQUU7O0FBQ2YsY0FBRyxNQUFNLFNBQVMsWUFBWSxNQUFNLFlBQVksTUFBTSxTQUFTLFVBQVM7QUFBRTs7QUFDMUUsY0FBSSxvQkFBb0I7QUFDeEI7QUFDQSxjQUFJLEVBQUMsSUFBUSxNQUFNLGFBQVksWUFBSSxRQUFRLE9BQU8scUJBQXFCO0FBRXZFLGNBQUcsT0FBTyxvQkFBb0IsS0FBSyxTQUFTLFVBQVM7QUFBRTs7QUFFdkQsc0JBQUksV0FBVyxPQUFPLGtCQUFrQixFQUFDLElBQUksbUJBQW1CO0FBRWhFLGVBQUssU0FBUyxPQUFPLEdBQUcsTUFBTTtBQUM1QixpQkFBSyxhQUFhLE1BQU0sTUFBTSxDQUFDLE1BQU0sY0FBYztBQUNqRCwwQkFBSSxXQUFXLE9BQU8saUJBQWlCO0FBQ3ZDLGtCQUFHLENBQUMsWUFBSSxlQUFlLFFBQU87QUFDNUIscUJBQUssaUJBQWlCOztBQUV4QixtQkFBSyxVQUFVLE9BQU8sV0FBVyxNQUFNLFVBQVUsRUFBRTs7O1dBR3REOzs7SUFJUCxTQUFTLElBQUksT0FBTyxVQUFTO0FBQzNCLFVBQUksY0FBYyxLQUFLLFFBQVE7QUFDL0IsVUFBSSxjQUFjLEtBQUssUUFBUTtBQUMvQixVQUFJLGtCQUFrQixLQUFLLFNBQVMsU0FBUztBQUM3QyxVQUFJLGtCQUFrQixLQUFLLFNBQVMsU0FBUztBQUM3QyxrQkFBSSxTQUFTLElBQUksT0FBTyxhQUFhLGlCQUFpQixhQUFhLGlCQUFpQjs7SUFHdEYsY0FBYyxVQUFTO0FBQ3JCLFdBQUssV0FBVztBQUNoQjtBQUNBLFdBQUssV0FBVzs7SUFHbEIsR0FBRyxPQUFPLFVBQVM7QUFDakIsYUFBTyxpQkFBaUIsT0FBTyxDQUFBLE1BQUs7QUFDbEMsWUFBRyxDQUFDLEtBQUssVUFBUztBQUFFLG1CQUFTOzs7Ozs7O0FDbHFCbkMsc0JBQW1CO0FBR25CLE1BQUksWUFBWSxTQUFTLGNBQWMsMkJBQTJCLGFBQWE7QUFHL0UsTUFBSSxTQUFRO0FBQ1osU0FBTSxxQkFBcUI7QUFBQSxJQUN2QixVQUFVO0FBQ04sbUJBQWEsSUFBSSxXQUFXLFdBQVc7QUFBQSxRQUNuQyxRQUFRLEtBQUs7QUFBQSxRQUNiLE9BQU87QUFBQSxRQUNQLFFBQVE7QUFBQSxRQUNSLE1BQU0sS0FBSyxHQUFHLGFBQWE7QUFBQSxRQUMzQixNQUFNLEtBQUssR0FBRyxhQUFhO0FBQUE7QUFFL0IsVUFBSSxVQUFVLFdBQVcsb0JBQW9CO0FBQzdDLGNBQVEsZUFBZTtBQUd2QixpQkFBVyxhQUFhLFNBQVMsSUFBSTtBQUNyQyxpQkFBVyxXQUFXLElBQUksV0FBVztBQUNyQyxpQkFBVyxXQUFXLFFBQVE7QUFBQTtBQUFBO0FBSXRDLFNBQU0sd0JBQXdCO0FBQUEsSUFDMUIsVUFBVTtBQUNOLG1CQUFhLElBQUksV0FBVyxXQUFXO0FBQUEsUUFDbkMsUUFBUSxLQUFLO0FBQUEsUUFDYixPQUFPO0FBQUEsUUFDUCxRQUFRO0FBQUEsUUFDUixNQUFNLEtBQUssR0FBRyxhQUFhO0FBQUEsUUFDM0IsTUFBTSxLQUFLLEdBQUcsYUFBYTtBQUFBO0FBQUE7QUFBQTtBQUt2QyxTQUFNLHVCQUF1QjtBQUFBLElBQ3pCLFVBQVU7QUFDTixtQkFBYSxJQUFJLFdBQVcsV0FBVztBQUFBLFFBQ25DLFFBQVEsS0FBSztBQUFBLFFBQ2IsT0FBTztBQUFBLFFBQ1AsUUFBUTtBQUFBLFFBQ1IsTUFBTSxLQUFLLEdBQUcsYUFBYTtBQUFBLFFBQzNCLE1BQU0sS0FBSyxHQUFHLGFBQWE7QUFBQTtBQUUvQixpQkFBVyxhQUFhLFNBQVMsSUFBSTtBQUFBO0FBQUE7QUFJN0MsU0FBTSxTQUFTO0FBQUEsSUFDWCxVQUFVO0FBQ04sVUFBSSxhQUFhO0FBQUEsUUFDYix3Q0FBVTtBQUFBLFFBQ1YsaUVBQWU7QUFBQSxRQUNmLDZFQUFpQjtBQUFBLFFBQ2pCLDBEQUFhO0FBQUEsUUFDYiw2RUFBaUI7QUFBQSxRQUNqQiwrRkFBb0I7QUFBQSxRQUNwQiw4Q0FBVztBQUFBLFFBQ1gsa0NBQVM7QUFBQSxRQUNULGlFQUFlO0FBQUEsUUFDZixrQ0FBUztBQUFBLFFBQ1QsOENBQVc7QUFBQSxRQUNYLHVFQUFnQjtBQUFBLFFBQ2hCLDhDQUFXO0FBQUEsUUFDWCxnRUFBYztBQUFBLFFBQ2Qsd0NBQVU7QUFBQSxRQUNWLGtDQUFTO0FBQUE7QUFHYixVQUFJLFFBQVE7QUFBQSxRQUNSLEtBQUs7QUFBQSxRQUNMLEtBQUs7QUFBQSxRQUNMLEtBQUs7QUFBQSxRQUNMLEtBQUs7QUFBQSxRQUNMLEtBQUs7QUFBQSxRQUNMLEtBQUs7QUFBQSxRQUNMLEtBQUs7QUFBQSxRQUNMLEtBQUs7QUFBQSxRQUNMLEtBQUs7QUFBQSxRQUNMLEtBQUs7QUFBQSxRQUNMLEtBQUs7QUFBQSxRQUNMLEtBQUs7QUFBQSxRQUNMLEtBQUs7QUFBQSxRQUNMLEtBQUs7QUFBQSxRQUNMLEtBQUs7QUFBQSxRQUNMLEtBQUs7QUFBQTtBQUdULFVBQUksUUFBUSxFQUFFO0FBQ2QsVUFBSSxTQUFTLEVBQUU7QUFDZixVQUFJLFNBQVMsU0FBUyxlQUFlO0FBRXJDLGFBQU8saUJBQWlCLFVBQVUsV0FBWTtBQUMxQyxlQUFPLE1BQU07QUFBQTtBQUdqQixVQUFJO0FBRUosWUFBTSxNQUFNLFdBQVk7QUFDcEIsZUFBTyxFQUFFLE1BQU07QUFBQTtBQUduQixzQkFBZ0IsUUFBUTtBQUNwQixpQkFBUztBQUNULGVBQU8sS0FBSyxVQUFVO0FBQUE7QUFFMUIsK0JBQXlCLFFBQVE7QUFDN0IsbUJBQVcsT0FDTixRQUFRLFFBQVEsSUFDaEIsUUFBUSxRQUFRLElBQ2hCLFFBQVEsUUFBUSxJQUNoQixRQUFRLFFBQVEsSUFDaEIsUUFBUSxRQUFRLElBQ2hCLFFBQVEsUUFBUSxJQUNoQixRQUFRLFNBQVM7QUFDdEIsZUFBTztBQUFBO0FBR1gseUJBQW1CLFFBQVE7QUFDdkIsaUJBQVMsa0JBQXVCLFNBQVMsU0FBUyxXQUFXLE9BQU8sU0FBUyxTQUFTLGVBQWUsVUFBVSxhQUFhLGNBQWM7QUFFMUksbUJBQVcsT0FDTixRQUFRLGlCQUFpQixVQUN6QixRQUFRLFFBQVEsSUFDaEIsUUFBUSxRQUFRLElBQ2hCLFFBQVEsUUFBUSxJQUNoQixRQUFRLFFBQVEsSUFDaEIsUUFBUSxRQUFRLElBQ2hCLFFBQVEsUUFBUSxJQUNoQixRQUFRLFNBQVM7QUFDdEIsZUFBTztBQUFBO0FBR1gsd0JBQWtCLE9BQU87QUFDckIsWUFBSSxRQUFRLE1BQU0sTUFBTSxPQUFPLEdBQUcsTUFBTTtBQUN4QztBQUNBLGVBQU8sa0JBQWtCLFFBQVE7QUFBQTtBQUlyQywwQkFBb0I7QUFDaEIsaUJBQVMsWUFBWTtBQUFBO0FBRXpCLGFBQU8sTUFBTTtBQUFBO0FBQUE7QUFLckIsTUFBSSxhQUFhLElBQUksV0FBVyxTQUFTLFFBQVEsRUFBRSxPQUFPLFFBQU8sUUFBUSxFQUFFLGFBQWEsV0FBVyxPQUFPLE9BQU8sU0FBUztBQUcxSCx3QkFBTyxPQUFPLEVBQUUsV0FBVyxFQUFFLEdBQUcsVUFBVSxhQUFhO0FBRXZELFNBQU8saUJBQWlCLDBCQUEwQixVQUFRO0FBQ3RELDBCQUFPO0FBQUE7QUFFWCxTQUFPLGlCQUFpQix5QkFBeUIsVUFBUSxzQkFBTztBQUdoRSxhQUFXO0FBTVgsU0FBTyxhQUFhOyIsCiAgIm5hbWVzIjogW10KfQo=
