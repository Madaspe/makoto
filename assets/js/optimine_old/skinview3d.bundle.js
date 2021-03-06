/* @preserve skinview3d / MIT License / https://github.com/bs-community/skinview3d */
!(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t(((e = "undefined" != typeof globalThis ? globalThis : e || self).skinview3d = {}));
})(this, function (e) {
    "use strict";
    const t = 0,
        n = 1,
        i = 2,
        r = 0,
        a = 1,
        o = 2,
        s = 3,
        l = 100,
        c = 1e3,
        h = 1001,
        d = 1002,
        u = 1003,
        f = 1006,
        p = 1008,
        m = 1009,
        g = 1012,
        x = 1014,
        v = 1015,
        _ = 1016,
        y = 1020,
        M = 1022,
        b = 1023,
        w = 1026,
        A = 1027,
        S = 3e3,
        T = 7680,
        L = "300 es";
    function E() {}
    Object.assign(E.prototype, {
        addEventListener: function (e, t) {
            void 0 === this._listeners && (this._listeners = {});
            const n = this._listeners;
            void 0 === n[e] && (n[e] = []), -1 === n[e].indexOf(t) && n[e].push(t);
        },
        hasEventListener: function (e, t) {
            if (void 0 === this._listeners) return !1;
            const n = this._listeners;
            return void 0 !== n[e] && -1 !== n[e].indexOf(t);
        },
        removeEventListener: function (e, t) {
            if (void 0 === this._listeners) return;
            const n = this._listeners[e];
            if (void 0 !== n) {
                const e = n.indexOf(t);
                -1 !== e && n.splice(e, 1);
            }
        },
        dispatchEvent: function (e) {
            if (void 0 === this._listeners) return;
            const t = this._listeners[e.type];
            if (void 0 !== t) {
                e.target = this;
                const n = t.slice(0);
                for (let t = 0, i = n.length; t < i; t++) n[t].call(this, e);
            }
        },
    });
    const P = [];
    for (let e = 0; e < 256; e++) P[e] = (e < 16 ? "0" : "") + e.toString(16);
    let F = 1234567;
    const N = {
        DEG2RAD: Math.PI / 180,
        RAD2DEG: 180 / Math.PI,
        generateUUID: function () {
            const e = (4294967295 * Math.random()) | 0,
                t = (4294967295 * Math.random()) | 0,
                n = (4294967295 * Math.random()) | 0,
                i = (4294967295 * Math.random()) | 0;
            return (
                P[255 & e] +
                P[(e >> 8) & 255] +
                P[(e >> 16) & 255] +
                P[(e >> 24) & 255] +
                "-" +
                P[255 & t] +
                P[(t >> 8) & 255] +
                "-" +
                P[((t >> 16) & 15) | 64] +
                P[(t >> 24) & 255] +
                "-" +
                P[(63 & n) | 128] +
                P[(n >> 8) & 255] +
                "-" +
                P[(n >> 16) & 255] +
                P[(n >> 24) & 255] +
                P[255 & i] +
                P[(i >> 8) & 255] +
                P[(i >> 16) & 255] +
                P[(i >> 24) & 255]
            ).toUpperCase();
        },
        clamp: function (e, t, n) {
            return Math.max(t, Math.min(n, e));
        },
        euclideanModulo: function (e, t) {
            return ((e % t) + t) % t;
        },
        mapLinear: function (e, t, n, i, r) {
            return i + ((e - t) * (r - i)) / (n - t);
        },
        lerp: function (e, t, n) {
            return (1 - n) * e + n * t;
        },
        smoothstep: function (e, t, n) {
            return e <= t ? 0 : e >= n ? 1 : (e = (e - t) / (n - t)) * e * (3 - 2 * e);
        },
        smootherstep: function (e, t, n) {
            return e <= t ? 0 : e >= n ? 1 : (e = (e - t) / (n - t)) * e * e * (e * (6 * e - 15) + 10);
        },
        randInt: function (e, t) {
            return e + Math.floor(Math.random() * (t - e + 1));
        },
        randFloat: function (e, t) {
            return e + Math.random() * (t - e);
        },
        randFloatSpread: function (e) {
            return e * (0.5 - Math.random());
        },
        seededRandom: function (e) {
            return void 0 !== e && (F = e % 2147483647), (F = (16807 * F) % 2147483647), (F - 1) / 2147483646;
        },
        degToRad: function (e) {
            return e * N.DEG2RAD;
        },
        radToDeg: function (e) {
            return e * N.RAD2DEG;
        },
        isPowerOfTwo: function (e) {
            return 0 == (e & (e - 1)) && 0 !== e;
        },
        ceilPowerOfTwo: function (e) {
            return Math.pow(2, Math.ceil(Math.log(e) / Math.LN2));
        },
        floorPowerOfTwo: function (e) {
            return Math.pow(2, Math.floor(Math.log(e) / Math.LN2));
        },
        setQuaternionFromProperEuler: function (e, t, n, i, r) {
            const a = Math.cos,
                o = Math.sin,
                s = a(n / 2),
                l = o(n / 2),
                c = a((t + i) / 2),
                h = o((t + i) / 2),
                d = a((t - i) / 2),
                u = o((t - i) / 2),
                f = a((i - t) / 2),
                p = o((i - t) / 2);
            switch (r) {
                case "XYX":
                    e.set(s * h, l * d, l * u, s * c);
                    break;
                case "YZY":
                    e.set(l * u, s * h, l * d, s * c);
                    break;
                case "ZXZ":
                    e.set(l * d, l * u, s * h, s * c);
                    break;
                case "XZX":
                    e.set(s * h, l * p, l * f, s * c);
                    break;
                case "YXY":
                    e.set(l * f, s * h, l * p, s * c);
                    break;
                case "ZYZ":
                    e.set(l * p, l * f, s * h, s * c);
                    break;
                default:
                    console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + r);
            }
        },
    };
    class C {
        constructor(e = 0, t = 0) {
            Object.defineProperty(this, "isVector2", { value: !0 }), (this.x = e), (this.y = t);
        }
        get width() {
            return this.x;
        }
        set width(e) {
            this.x = e;
        }
        get height() {
            return this.y;
        }
        set height(e) {
            this.y = e;
        }
        set(e, t) {
            return (this.x = e), (this.y = t), this;
        }
        setScalar(e) {
            return (this.x = e), (this.y = e), this;
        }
        setX(e) {
            return (this.x = e), this;
        }
        setY(e) {
            return (this.y = e), this;
        }
        setComponent(e, t) {
            switch (e) {
                case 0:
                    this.x = t;
                    break;
                case 1:
                    this.y = t;
                    break;
                default:
                    throw new Error("index is out of range: " + e);
            }
            return this;
        }
        getComponent(e) {
            switch (e) {
                case 0:
                    return this.x;
                case 1:
                    return this.y;
                default:
                    throw new Error("index is out of range: " + e);
            }
        }
        clone() {
            return new this.constructor(this.x, this.y);
        }
        copy(e) {
            return (this.x = e.x), (this.y = e.y), this;
        }
        add(e, t) {
            return void 0 !== t ? (console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(e, t)) : ((this.x += e.x), (this.y += e.y), this);
        }
        addScalar(e) {
            return (this.x += e), (this.y += e), this;
        }
        addVectors(e, t) {
            return (this.x = e.x + t.x), (this.y = e.y + t.y), this;
        }
        addScaledVector(e, t) {
            return (this.x += e.x * t), (this.y += e.y * t), this;
        }
        sub(e, t) {
            return void 0 !== t ? (console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(e, t)) : ((this.x -= e.x), (this.y -= e.y), this);
        }
        subScalar(e) {
            return (this.x -= e), (this.y -= e), this;
        }
        subVectors(e, t) {
            return (this.x = e.x - t.x), (this.y = e.y - t.y), this;
        }
        multiply(e) {
            return (this.x *= e.x), (this.y *= e.y), this;
        }
        multiplyScalar(e) {
            return (this.x *= e), (this.y *= e), this;
        }
        divide(e) {
            return (this.x /= e.x), (this.y /= e.y), this;
        }
        divideScalar(e) {
            return this.multiplyScalar(1 / e);
        }
        applyMatrix3(e) {
            const t = this.x,
                n = this.y,
                i = e.elements;
            return (this.x = i[0] * t + i[3] * n + i[6]), (this.y = i[1] * t + i[4] * n + i[7]), this;
        }
        min(e) {
            return (this.x = Math.min(this.x, e.x)), (this.y = Math.min(this.y, e.y)), this;
        }
        max(e) {
            return (this.x = Math.max(this.x, e.x)), (this.y = Math.max(this.y, e.y)), this;
        }
        clamp(e, t) {
            return (this.x = Math.max(e.x, Math.min(t.x, this.x))), (this.y = Math.max(e.y, Math.min(t.y, this.y))), this;
        }
        clampScalar(e, t) {
            return (this.x = Math.max(e, Math.min(t, this.x))), (this.y = Math.max(e, Math.min(t, this.y))), this;
        }
        clampLength(e, t) {
            const n = this.length();
            return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n)));
        }
        floor() {
            return (this.x = Math.floor(this.x)), (this.y = Math.floor(this.y)), this;
        }
        ceil() {
            return (this.x = Math.ceil(this.x)), (this.y = Math.ceil(this.y)), this;
        }
        round() {
            return (this.x = Math.round(this.x)), (this.y = Math.round(this.y)), this;
        }
        roundToZero() {
            return (this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x)), (this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y)), this;
        }
        negate() {
            return (this.x = -this.x), (this.y = -this.y), this;
        }
        dot(e) {
            return this.x * e.x + this.y * e.y;
        }
        cross(e) {
            return this.x * e.y - this.y * e.x;
        }
        lengthSq() {
            return this.x * this.x + this.y * this.y;
        }
        length() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
        manhattanLength() {
            return Math.abs(this.x) + Math.abs(this.y);
        }
        normalize() {
            return this.divideScalar(this.length() || 1);
        }
        angle() {
            return Math.atan2(-this.y, -this.x) + Math.PI;
        }
        distanceTo(e) {
            return Math.sqrt(this.distanceToSquared(e));
        }
        distanceToSquared(e) {
            const t = this.x - e.x,
                n = this.y - e.y;
            return t * t + n * n;
        }
        manhattanDistanceTo(e) {
            return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
        }
        setLength(e) {
            return this.normalize().multiplyScalar(e);
        }
        lerp(e, t) {
            return (this.x += (e.x - this.x) * t), (this.y += (e.y - this.y) * t), this;
        }
        lerpVectors(e, t, n) {
            return (this.x = e.x + (t.x - e.x) * n), (this.y = e.y + (t.y - e.y) * n), this;
        }
        equals(e) {
            return e.x === this.x && e.y === this.y;
        }
        fromArray(e, t = 0) {
            return (this.x = e[t]), (this.y = e[t + 1]), this;
        }
        toArray(e = [], t = 0) {
            return (e[t] = this.x), (e[t + 1] = this.y), e;
        }
        fromBufferAttribute(e, t, n) {
            return void 0 !== n && console.warn("THREE.Vector2: offset has been removed from .fromBufferAttribute()."), (this.x = e.getX(t)), (this.y = e.getY(t)), this;
        }
        rotateAround(e, t) {
            const n = Math.cos(t),
                i = Math.sin(t),
                r = this.x - e.x,
                a = this.y - e.y;
            return (this.x = r * n - a * i + e.x), (this.y = r * i + a * n + e.y), this;
        }
        random() {
            return (this.x = Math.random()), (this.y = Math.random()), this;
        }
    }
    class I {
        constructor() {
            Object.defineProperty(this, "isMatrix3", { value: !0 }), (this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1]), arguments.length > 0 && console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.");
        }
        set(e, t, n, i, r, a, o, s, l) {
            const c = this.elements;
            return (c[0] = e), (c[1] = i), (c[2] = o), (c[3] = t), (c[4] = r), (c[5] = s), (c[6] = n), (c[7] = a), (c[8] = l), this;
        }
        identity() {
            return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
        }
        clone() {
            return new this.constructor().fromArray(this.elements);
        }
        copy(e) {
            const t = this.elements,
                n = e.elements;
            return (t[0] = n[0]), (t[1] = n[1]), (t[2] = n[2]), (t[3] = n[3]), (t[4] = n[4]), (t[5] = n[5]), (t[6] = n[6]), (t[7] = n[7]), (t[8] = n[8]), this;
        }
        extractBasis(e, t, n) {
            return e.setFromMatrix3Column(this, 0), t.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this;
        }
        setFromMatrix4(e) {
            const t = e.elements;
            return this.set(t[0], t[4], t[8], t[1], t[5], t[9], t[2], t[6], t[10]), this;
        }
        multiply(e) {
            return this.multiplyMatrices(this, e);
        }
        premultiply(e) {
            return this.multiplyMatrices(e, this);
        }
        multiplyMatrices(e, t) {
            const n = e.elements,
                i = t.elements,
                r = this.elements,
                a = n[0],
                o = n[3],
                s = n[6],
                l = n[1],
                c = n[4],
                h = n[7],
                d = n[2],
                u = n[5],
                f = n[8],
                p = i[0],
                m = i[3],
                g = i[6],
                x = i[1],
                v = i[4],
                _ = i[7],
                y = i[2],
                M = i[5],
                b = i[8];
            return (
                (r[0] = a * p + o * x + s * y),
                (r[3] = a * m + o * v + s * M),
                (r[6] = a * g + o * _ + s * b),
                (r[1] = l * p + c * x + h * y),
                (r[4] = l * m + c * v + h * M),
                (r[7] = l * g + c * _ + h * b),
                (r[2] = d * p + u * x + f * y),
                (r[5] = d * m + u * v + f * M),
                (r[8] = d * g + u * _ + f * b),
                this
            );
        }
        multiplyScalar(e) {
            const t = this.elements;
            return (t[0] *= e), (t[3] *= e), (t[6] *= e), (t[1] *= e), (t[4] *= e), (t[7] *= e), (t[2] *= e), (t[5] *= e), (t[8] *= e), this;
        }
        determinant() {
            const e = this.elements,
                t = e[0],
                n = e[1],
                i = e[2],
                r = e[3],
                a = e[4],
                o = e[5],
                s = e[6],
                l = e[7],
                c = e[8];
            return t * a * c - t * o * l - n * r * c + n * o * s + i * r * l - i * a * s;
        }
        getInverse(e, t) {
            void 0 !== t && console.warn("THREE.Matrix3: .getInverse() can no longer be configured to throw on degenerate.");
            const n = e.elements,
                i = this.elements,
                r = n[0],
                a = n[1],
                o = n[2],
                s = n[3],
                l = n[4],
                c = n[5],
                h = n[6],
                d = n[7],
                u = n[8],
                f = u * l - c * d,
                p = c * h - u * s,
                m = d * s - l * h,
                g = r * f + a * p + o * m;
            if (0 === g) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
            const x = 1 / g;
            return (
                (i[0] = f * x),
                (i[1] = (o * d - u * a) * x),
                (i[2] = (c * a - o * l) * x),
                (i[3] = p * x),
                (i[4] = (u * r - o * h) * x),
                (i[5] = (o * s - c * r) * x),
                (i[6] = m * x),
                (i[7] = (a * h - d * r) * x),
                (i[8] = (l * r - a * s) * x),
                this
            );
        }
        transpose() {
            let e;
            const t = this.elements;
            return (e = t[1]), (t[1] = t[3]), (t[3] = e), (e = t[2]), (t[2] = t[6]), (t[6] = e), (e = t[5]), (t[5] = t[7]), (t[7] = e), this;
        }
        getNormalMatrix(e) {
            return this.setFromMatrix4(e).getInverse(this).transpose();
        }
        transposeIntoArray(e) {
            const t = this.elements;
            return (e[0] = t[0]), (e[1] = t[3]), (e[2] = t[6]), (e[3] = t[1]), (e[4] = t[4]), (e[5] = t[7]), (e[6] = t[2]), (e[7] = t[5]), (e[8] = t[8]), this;
        }
        setUvTransform(e, t, n, i, r, a, o) {
            const s = Math.cos(r),
                l = Math.sin(r);
            this.set(n * s, n * l, -n * (s * a + l * o) + a + e, -i * l, i * s, -i * (-l * a + s * o) + o + t, 0, 0, 1);
        }
        scale(e, t) {
            const n = this.elements;
            return (n[0] *= e), (n[3] *= e), (n[6] *= e), (n[1] *= t), (n[4] *= t), (n[7] *= t), this;
        }
        rotate(e) {
            const t = Math.cos(e),
                n = Math.sin(e),
                i = this.elements,
                r = i[0],
                a = i[3],
                o = i[6],
                s = i[1],
                l = i[4],
                c = i[7];
            return (i[0] = t * r + n * s), (i[3] = t * a + n * l), (i[6] = t * o + n * c), (i[1] = -n * r + t * s), (i[4] = -n * a + t * l), (i[7] = -n * o + t * c), this;
        }
        translate(e, t) {
            const n = this.elements;
            return (n[0] += e * n[2]), (n[3] += e * n[5]), (n[6] += e * n[8]), (n[1] += t * n[2]), (n[4] += t * n[5]), (n[7] += t * n[8]), this;
        }
        equals(e) {
            const t = this.elements,
                n = e.elements;
            for (let e = 0; e < 9; e++) if (t[e] !== n[e]) return !1;
            return !0;
        }
        fromArray(e, t = 0) {
            for (let n = 0; n < 9; n++) this.elements[n] = e[n + t];
            return this;
        }
        toArray(e = [], t = 0) {
            const n = this.elements;
            return (e[t] = n[0]), (e[t + 1] = n[1]), (e[t + 2] = n[2]), (e[t + 3] = n[3]), (e[t + 4] = n[4]), (e[t + 5] = n[5]), (e[t + 6] = n[6]), (e[t + 7] = n[7]), (e[t + 8] = n[8]), e;
        }
    }
    let R;
    const D = function (e) {
        if (/^data:/i.test(e.src)) return e.src;
        if ("undefined" == typeof HTMLCanvasElement) return e.src;
        let t;
        if (e instanceof HTMLCanvasElement) t = e;
        else {
            void 0 === R && (R = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas")), (R.width = e.width), (R.height = e.height);
            const n = R.getContext("2d");
            e instanceof ImageData ? n.putImageData(e, 0, 0) : n.drawImage(e, 0, 0, e.width, e.height), (t = R);
        }
        return t.width > 2048 || t.height > 2048 ? t.toDataURL("image/jpeg", 0.6) : t.toDataURL("image/png");
    };
    let U = 0;
    function O(e, t, n, i, r, a, o, s, l, c) {
        Object.defineProperty(this, "id", { value: U++ }),
            (this.uuid = N.generateUUID()),
            (this.name = ""),
            (this.image = void 0 !== e ? e : O.DEFAULT_IMAGE),
            (this.mipmaps = []),
            (this.mapping = void 0 !== t ? t : O.DEFAULT_MAPPING),
            (this.wrapS = void 0 !== n ? n : h),
            (this.wrapT = void 0 !== i ? i : h),
            (this.magFilter = void 0 !== r ? r : f),
            (this.minFilter = void 0 !== a ? a : p),
            (this.anisotropy = void 0 !== l ? l : 1),
            (this.format = void 0 !== o ? o : b),
            (this.internalFormat = null),
            (this.type = void 0 !== s ? s : m),
            (this.offset = new C(0, 0)),
            (this.repeat = new C(1, 1)),
            (this.center = new C(0, 0)),
            (this.rotation = 0),
            (this.matrixAutoUpdate = !0),
            (this.matrix = new I()),
            (this.generateMipmaps = !0),
            (this.premultiplyAlpha = !1),
            (this.flipY = !0),
            (this.unpackAlignment = 4),
            (this.encoding = void 0 !== c ? c : S),
            (this.version = 0),
            (this.onUpdate = null);
    }
    (O.DEFAULT_IMAGE = void 0),
        (O.DEFAULT_MAPPING = 300),
        (O.prototype = Object.assign(Object.create(E.prototype), {
            constructor: O,
            isTexture: !0,
            updateMatrix: function () {
                this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
            },
            clone: function () {
                return new this.constructor().copy(this);
            },
            copy: function (e) {
                return (
                    (this.name = e.name),
                    (this.image = e.image),
                    (this.mipmaps = e.mipmaps.slice(0)),
                    (this.mapping = e.mapping),
                    (this.wrapS = e.wrapS),
                    (this.wrapT = e.wrapT),
                    (this.magFilter = e.magFilter),
                    (this.minFilter = e.minFilter),
                    (this.anisotropy = e.anisotropy),
                    (this.format = e.format),
                    (this.internalFormat = e.internalFormat),
                    (this.type = e.type),
                    this.offset.copy(e.offset),
                    this.repeat.copy(e.repeat),
                    this.center.copy(e.center),
                    (this.rotation = e.rotation),
                    (this.matrixAutoUpdate = e.matrixAutoUpdate),
                    this.matrix.copy(e.matrix),
                    (this.generateMipmaps = e.generateMipmaps),
                    (this.premultiplyAlpha = e.premultiplyAlpha),
                    (this.flipY = e.flipY),
                    (this.unpackAlignment = e.unpackAlignment),
                    (this.encoding = e.encoding),
                    this
                );
            },
            toJSON: function (e) {
                const t = void 0 === e || "string" == typeof e;
                if (!t && void 0 !== e.textures[this.uuid]) return e.textures[this.uuid];
                const n = {
                    metadata: { version: 4.5, type: "Texture", generator: "Texture.toJSON" },
                    uuid: this.uuid,
                    name: this.name,
                    mapping: this.mapping,
                    repeat: [this.repeat.x, this.repeat.y],
                    offset: [this.offset.x, this.offset.y],
                    center: [this.center.x, this.center.y],
                    rotation: this.rotation,
                    wrap: [this.wrapS, this.wrapT],
                    format: this.format,
                    type: this.type,
                    encoding: this.encoding,
                    minFilter: this.minFilter,
                    magFilter: this.magFilter,
                    anisotropy: this.anisotropy,
                    flipY: this.flipY,
                    premultiplyAlpha: this.premultiplyAlpha,
                    unpackAlignment: this.unpackAlignment,
                };
                if (void 0 !== this.image) {
                    const i = this.image;
                    if ((void 0 === i.uuid && (i.uuid = N.generateUUID()), !t && void 0 === e.images[i.uuid])) {
                        let t;
                        if (Array.isArray(i)) {
                            t = [];
                            for (let e = 0, n = i.length; e < n; e++) t.push(D(i[e]));
                        } else t = D(i);
                        e.images[i.uuid] = { uuid: i.uuid, url: t };
                    }
                    n.image = i.uuid;
                }
                return t || (e.textures[this.uuid] = n), n;
            },
            dispose: function () {
                this.dispatchEvent({ type: "dispose" });
            },
            transformUv: function (e) {
                if (300 !== this.mapping) return e;
                if ((e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1))
                    switch (this.wrapS) {
                        case c:
                            e.x = e.x - Math.floor(e.x);
                            break;
                        case h:
                            e.x = e.x < 0 ? 0 : 1;
                            break;
                        case d:
                            1 === Math.abs(Math.floor(e.x) % 2) ? (e.x = Math.ceil(e.x) - e.x) : (e.x = e.x - Math.floor(e.x));
                    }
                if (e.y < 0 || e.y > 1)
                    switch (this.wrapT) {
                        case c:
                            e.y = e.y - Math.floor(e.y);
                            break;
                        case h:
                            e.y = e.y < 0 ? 0 : 1;
                            break;
                        case d:
                            1 === Math.abs(Math.floor(e.y) % 2) ? (e.y = Math.ceil(e.y) - e.y) : (e.y = e.y - Math.floor(e.y));
                    }
                return this.flipY && (e.y = 1 - e.y), e;
            },
        })),
        Object.defineProperty(O.prototype, "needsUpdate", {
            set: function (e) {
                !0 === e && this.version++;
            },
        });
    class z {
        constructor(e = 0, t = 0, n = 0, i = 1) {
            Object.defineProperty(this, "isVector4", { value: !0 }), (this.x = e), (this.y = t), (this.z = n), (this.w = i);
        }
        get width() {
            return this.z;
        }
        set width(e) {
            this.z = e;
        }
        get height() {
            return this.w;
        }
        set height(e) {
            this.w = e;
        }
        set(e, t, n, i) {
            return (this.x = e), (this.y = t), (this.z = n), (this.w = i), this;
        }
        setScalar(e) {
            return (this.x = e), (this.y = e), (this.z = e), (this.w = e), this;
        }
        setX(e) {
            return (this.x = e), this;
        }
        setY(e) {
            return (this.y = e), this;
        }
        setZ(e) {
            return (this.z = e), this;
        }
        setW(e) {
            return (this.w = e), this;
        }
        setComponent(e, t) {
            switch (e) {
                case 0:
                    this.x = t;
                    break;
                case 1:
                    this.y = t;
                    break;
                case 2:
                    this.z = t;
                    break;
                case 3:
                    this.w = t;
                    break;
                default:
                    throw new Error("index is out of range: " + e);
            }
            return this;
        }
        getComponent(e) {
            switch (e) {
                case 0:
                    return this.x;
                case 1:
                    return this.y;
                case 2:
                    return this.z;
                case 3:
                    return this.w;
                default:
                    throw new Error("index is out of range: " + e);
            }
        }
        clone() {
            return new this.constructor(this.x, this.y, this.z, this.w);
        }
        copy(e) {
            return (this.x = e.x), (this.y = e.y), (this.z = e.z), (this.w = void 0 !== e.w ? e.w : 1), this;
        }
        add(e, t) {
            return void 0 !== t ? (console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(e, t)) : ((this.x += e.x), (this.y += e.y), (this.z += e.z), (this.w += e.w), this);
        }
        addScalar(e) {
            return (this.x += e), (this.y += e), (this.z += e), (this.w += e), this;
        }
        addVectors(e, t) {
            return (this.x = e.x + t.x), (this.y = e.y + t.y), (this.z = e.z + t.z), (this.w = e.w + t.w), this;
        }
        addScaledVector(e, t) {
            return (this.x += e.x * t), (this.y += e.y * t), (this.z += e.z * t), (this.w += e.w * t), this;
        }
        sub(e, t) {
            return void 0 !== t ? (console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(e, t)) : ((this.x -= e.x), (this.y -= e.y), (this.z -= e.z), (this.w -= e.w), this);
        }
        subScalar(e) {
            return (this.x -= e), (this.y -= e), (this.z -= e), (this.w -= e), this;
        }
        subVectors(e, t) {
            return (this.x = e.x - t.x), (this.y = e.y - t.y), (this.z = e.z - t.z), (this.w = e.w - t.w), this;
        }
        multiplyScalar(e) {
            return (this.x *= e), (this.y *= e), (this.z *= e), (this.w *= e), this;
        }
        applyMatrix4(e) {
            const t = this.x,
                n = this.y,
                i = this.z,
                r = this.w,
                a = e.elements;
            return (
                (this.x = a[0] * t + a[4] * n + a[8] * i + a[12] * r),
                (this.y = a[1] * t + a[5] * n + a[9] * i + a[13] * r),
                (this.z = a[2] * t + a[6] * n + a[10] * i + a[14] * r),
                (this.w = a[3] * t + a[7] * n + a[11] * i + a[15] * r),
                this
            );
        }
        divideScalar(e) {
            return this.multiplyScalar(1 / e);
        }
        setAxisAngleFromQuaternion(e) {
            this.w = 2 * Math.acos(e.w);
            const t = Math.sqrt(1 - e.w * e.w);
            return t < 1e-4 ? ((this.x = 1), (this.y = 0), (this.z = 0)) : ((this.x = e.x / t), (this.y = e.y / t), (this.z = e.z / t)), this;
        }
        setAxisAngleFromRotationMatrix(e) {
            let t, n, i, r;
            const a = 0.01,
                o = 0.1,
                s = e.elements,
                l = s[0],
                c = s[4],
                h = s[8],
                d = s[1],
                u = s[5],
                f = s[9],
                p = s[2],
                m = s[6],
                g = s[10];
            if (Math.abs(c - d) < a && Math.abs(h - p) < a && Math.abs(f - m) < a) {
                if (Math.abs(c + d) < o && Math.abs(h + p) < o && Math.abs(f + m) < o && Math.abs(l + u + g - 3) < o) return this.set(1, 0, 0, 0), this;
                t = Math.PI;
                const e = (l + 1) / 2,
                    s = (u + 1) / 2,
                    x = (g + 1) / 2,
                    v = (c + d) / 4,
                    _ = (h + p) / 4,
                    y = (f + m) / 4;
                return (
                    e > s && e > x
                        ? e < a
                            ? ((n = 0), (i = 0.707106781), (r = 0.707106781))
                            : ((n = Math.sqrt(e)), (i = v / n), (r = _ / n))
                        : s > x
                        ? s < a
                            ? ((n = 0.707106781), (i = 0), (r = 0.707106781))
                            : ((i = Math.sqrt(s)), (n = v / i), (r = y / i))
                        : x < a
                        ? ((n = 0.707106781), (i = 0.707106781), (r = 0))
                        : ((r = Math.sqrt(x)), (n = _ / r), (i = y / r)),
                    this.set(n, i, r, t),
                    this
                );
            }
            let x = Math.sqrt((m - f) * (m - f) + (h - p) * (h - p) + (d - c) * (d - c));
            return Math.abs(x) < 0.001 && (x = 1), (this.x = (m - f) / x), (this.y = (h - p) / x), (this.z = (d - c) / x), (this.w = Math.acos((l + u + g - 1) / 2)), this;
        }
        min(e) {
            return (this.x = Math.min(this.x, e.x)), (this.y = Math.min(this.y, e.y)), (this.z = Math.min(this.z, e.z)), (this.w = Math.min(this.w, e.w)), this;
        }
        max(e) {
            return (this.x = Math.max(this.x, e.x)), (this.y = Math.max(this.y, e.y)), (this.z = Math.max(this.z, e.z)), (this.w = Math.max(this.w, e.w)), this;
        }
        clamp(e, t) {
            return (this.x = Math.max(e.x, Math.min(t.x, this.x))), (this.y = Math.max(e.y, Math.min(t.y, this.y))), (this.z = Math.max(e.z, Math.min(t.z, this.z))), (this.w = Math.max(e.w, Math.min(t.w, this.w))), this;
        }
        clampScalar(e, t) {
            return (this.x = Math.max(e, Math.min(t, this.x))), (this.y = Math.max(e, Math.min(t, this.y))), (this.z = Math.max(e, Math.min(t, this.z))), (this.w = Math.max(e, Math.min(t, this.w))), this;
        }
        clampLength(e, t) {
            const n = this.length();
            return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n)));
        }
        floor() {
            return (this.x = Math.floor(this.x)), (this.y = Math.floor(this.y)), (this.z = Math.floor(this.z)), (this.w = Math.floor(this.w)), this;
        }
        ceil() {
            return (this.x = Math.ceil(this.x)), (this.y = Math.ceil(this.y)), (this.z = Math.ceil(this.z)), (this.w = Math.ceil(this.w)), this;
        }
        round() {
            return (this.x = Math.round(this.x)), (this.y = Math.round(this.y)), (this.z = Math.round(this.z)), (this.w = Math.round(this.w)), this;
        }
        roundToZero() {
            return (
                (this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x)),
                (this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y)),
                (this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z)),
                (this.w = this.w < 0 ? Math.ceil(this.w) : Math.floor(this.w)),
                this
            );
        }
        negate() {
            return (this.x = -this.x), (this.y = -this.y), (this.z = -this.z), (this.w = -this.w), this;
        }
        dot(e) {
            return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
        }
        lengthSq() {
            return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
        }
        length() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
        }
        manhattanLength() {
            return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
        }
        normalize() {
            return this.divideScalar(this.length() || 1);
        }
        setLength(e) {
            return this.normalize().multiplyScalar(e);
        }
        lerp(e, t) {
            return (this.x += (e.x - this.x) * t), (this.y += (e.y - this.y) * t), (this.z += (e.z - this.z) * t), (this.w += (e.w - this.w) * t), this;
        }
        lerpVectors(e, t, n) {
            return (this.x = e.x + (t.x - e.x) * n), (this.y = e.y + (t.y - e.y) * n), (this.z = e.z + (t.z - e.z) * n), (this.w = e.w + (t.w - e.w) * n), this;
        }
        equals(e) {
            return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w;
        }
        fromArray(e, t = 0) {
            return (this.x = e[t]), (this.y = e[t + 1]), (this.z = e[t + 2]), (this.w = e[t + 3]), this;
        }
        toArray(e = [], t = 0) {
            return (e[t] = this.x), (e[t + 1] = this.y), (e[t + 2] = this.z), (e[t + 3] = this.w), e;
        }
        fromBufferAttribute(e, t, n) {
            return void 0 !== n && console.warn("THREE.Vector4: offset has been removed from .fromBufferAttribute()."), (this.x = e.getX(t)), (this.y = e.getY(t)), (this.z = e.getZ(t)), (this.w = e.getW(t)), this;
        }
        random() {
            return (this.x = Math.random()), (this.y = Math.random()), (this.z = Math.random()), (this.w = Math.random()), this;
        }
    }
    function G(e, t, n) {
        (this.width = e),
            (this.height = t),
            (this.scissor = new z(0, 0, e, t)),
            (this.scissorTest = !1),
            (this.viewport = new z(0, 0, e, t)),
            (n = n || {}),
            (this.texture = new O(void 0, n.mapping, n.wrapS, n.wrapT, n.magFilter, n.minFilter, n.format, n.type, n.anisotropy, n.encoding)),
            (this.texture.image = {}),
            (this.texture.image.width = e),
            (this.texture.image.height = t),
            (this.texture.generateMipmaps = void 0 !== n.generateMipmaps && n.generateMipmaps),
            (this.texture.minFilter = void 0 !== n.minFilter ? n.minFilter : f),
            (this.depthBuffer = void 0 === n.depthBuffer || n.depthBuffer),
            (this.stencilBuffer = void 0 !== n.stencilBuffer && n.stencilBuffer),
            (this.depthTexture = void 0 !== n.depthTexture ? n.depthTexture : null);
    }
    G.prototype = Object.assign(Object.create(E.prototype), {
        constructor: G,
        isWebGLRenderTarget: !0,
        setSize: function (e, t) {
            (this.width === e && this.height === t) || ((this.width = e), (this.height = t), (this.texture.image.width = e), (this.texture.image.height = t), this.dispose()), this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t);
        },
        clone: function () {
            return new this.constructor().copy(this);
        },
        copy: function (e) {
            return (
                (this.width = e.width),
                (this.height = e.height),
                this.viewport.copy(e.viewport),
                (this.texture = e.texture.clone()),
                (this.depthBuffer = e.depthBuffer),
                (this.stencilBuffer = e.stencilBuffer),
                (this.depthTexture = e.depthTexture),
                this
            );
        },
        dispose: function () {
            this.dispatchEvent({ type: "dispose" });
        },
    });
    class B {
        constructor(e = 0, t = 0, n = 0, i = 1) {
            Object.defineProperty(this, "isQuaternion", { value: !0 }), (this._x = e), (this._y = t), (this._z = n), (this._w = i);
        }
        static slerp(e, t, n, i) {
            return n.copy(e).slerp(t, i);
        }
        static slerpFlat(e, t, n, i, r, a, o) {
            let s = n[i + 0],
                l = n[i + 1],
                c = n[i + 2],
                h = n[i + 3];
            const d = r[a + 0],
                u = r[a + 1],
                f = r[a + 2],
                p = r[a + 3];
            if (h !== p || s !== d || l !== u || c !== f) {
                let e = 1 - o;
                const t = s * d + l * u + c * f + h * p,
                    n = t >= 0 ? 1 : -1,
                    i = 1 - t * t;
                if (i > Number.EPSILON) {
                    const r = Math.sqrt(i),
                        a = Math.atan2(r, t * n);
                    (e = Math.sin(e * a) / r), (o = Math.sin(o * a) / r);
                }
                const r = o * n;
                if (((s = s * e + d * r), (l = l * e + u * r), (c = c * e + f * r), (h = h * e + p * r), e === 1 - o)) {
                    const e = 1 / Math.sqrt(s * s + l * l + c * c + h * h);
                    (s *= e), (l *= e), (c *= e), (h *= e);
                }
            }
            (e[t] = s), (e[t + 1] = l), (e[t + 2] = c), (e[t + 3] = h);
        }
        static multiplyQuaternionsFlat(e, t, n, i, r, a) {
            const o = n[i],
                s = n[i + 1],
                l = n[i + 2],
                c = n[i + 3],
                h = r[a],
                d = r[a + 1],
                u = r[a + 2],
                f = r[a + 3];
            return (e[t] = o * f + c * h + s * u - l * d), (e[t + 1] = s * f + c * d + l * h - o * u), (e[t + 2] = l * f + c * u + o * d - s * h), (e[t + 3] = c * f - o * h - s * d - l * u), e;
        }
        get x() {
            return this._x;
        }
        set x(e) {
            (this._x = e), this._onChangeCallback();
        }
        get y() {
            return this._y;
        }
        set y(e) {
            (this._y = e), this._onChangeCallback();
        }
        get z() {
            return this._z;
        }
        set z(e) {
            (this._z = e), this._onChangeCallback();
        }
        get w() {
            return this._w;
        }
        set w(e) {
            (this._w = e), this._onChangeCallback();
        }
        set(e, t, n, i) {
            return (this._x = e), (this._y = t), (this._z = n), (this._w = i), this._onChangeCallback(), this;
        }
        clone() {
            return new this.constructor(this._x, this._y, this._z, this._w);
        }
        copy(e) {
            return (this._x = e.x), (this._y = e.y), (this._z = e.z), (this._w = e.w), this._onChangeCallback(), this;
        }
        setFromEuler(e, t) {
            if (!e || !e.isEuler) throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");
            const n = e._x,
                i = e._y,
                r = e._z,
                a = e._order,
                o = Math.cos,
                s = Math.sin,
                l = o(n / 2),
                c = o(i / 2),
                h = o(r / 2),
                d = s(n / 2),
                u = s(i / 2),
                f = s(r / 2);
            switch (a) {
                case "XYZ":
                    (this._x = d * c * h + l * u * f), (this._y = l * u * h - d * c * f), (this._z = l * c * f + d * u * h), (this._w = l * c * h - d * u * f);
                    break;
                case "YXZ":
                    (this._x = d * c * h + l * u * f), (this._y = l * u * h - d * c * f), (this._z = l * c * f - d * u * h), (this._w = l * c * h + d * u * f);
                    break;
                case "ZXY":
                    (this._x = d * c * h - l * u * f), (this._y = l * u * h + d * c * f), (this._z = l * c * f + d * u * h), (this._w = l * c * h - d * u * f);
                    break;
                case "ZYX":
                    (this._x = d * c * h - l * u * f), (this._y = l * u * h + d * c * f), (this._z = l * c * f - d * u * h), (this._w = l * c * h + d * u * f);
                    break;
                case "YZX":
                    (this._x = d * c * h + l * u * f), (this._y = l * u * h + d * c * f), (this._z = l * c * f - d * u * h), (this._w = l * c * h - d * u * f);
                    break;
                case "XZY":
                    (this._x = d * c * h - l * u * f), (this._y = l * u * h - d * c * f), (this._z = l * c * f + d * u * h), (this._w = l * c * h + d * u * f);
                    break;
                default:
                    console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + a);
            }
            return !1 !== t && this._onChangeCallback(), this;
        }
        setFromAxisAngle(e, t) {
            const n = t / 2,
                i = Math.sin(n);
            return (this._x = e.x * i), (this._y = e.y * i), (this._z = e.z * i), (this._w = Math.cos(n)), this._onChangeCallback(), this;
        }
        setFromRotationMatrix(e) {
            const t = e.elements,
                n = t[0],
                i = t[4],
                r = t[8],
                a = t[1],
                o = t[5],
                s = t[9],
                l = t[2],
                c = t[6],
                h = t[10],
                d = n + o + h;
            if (d > 0) {
                const e = 0.5 / Math.sqrt(d + 1);
                (this._w = 0.25 / e), (this._x = (c - s) * e), (this._y = (r - l) * e), (this._z = (a - i) * e);
            } else if (n > o && n > h) {
                const e = 2 * Math.sqrt(1 + n - o - h);
                (this._w = (c - s) / e), (this._x = 0.25 * e), (this._y = (i + a) / e), (this._z = (r + l) / e);
            } else if (o > h) {
                const e = 2 * Math.sqrt(1 + o - n - h);
                (this._w = (r - l) / e), (this._x = (i + a) / e), (this._y = 0.25 * e), (this._z = (s + c) / e);
            } else {
                const e = 2 * Math.sqrt(1 + h - n - o);
                (this._w = (a - i) / e), (this._x = (r + l) / e), (this._y = (s + c) / e), (this._z = 0.25 * e);
            }
            return this._onChangeCallback(), this;
        }
        setFromUnitVectors(e, t) {
            let n = e.dot(t) + 1;
            return (
                n < 1e-6
                    ? ((n = 0), Math.abs(e.x) > Math.abs(e.z) ? ((this._x = -e.y), (this._y = e.x), (this._z = 0), (this._w = n)) : ((this._x = 0), (this._y = -e.z), (this._z = e.y), (this._w = n)))
                    : ((this._x = e.y * t.z - e.z * t.y), (this._y = e.z * t.x - e.x * t.z), (this._z = e.x * t.y - e.y * t.x), (this._w = n)),
                this.normalize()
            );
        }
        angleTo(e) {
            return 2 * Math.acos(Math.abs(N.clamp(this.dot(e), -1, 1)));
        }
        rotateTowards(e, t) {
            const n = this.angleTo(e);
            if (0 === n) return this;
            const i = Math.min(1, t / n);
            return this.slerp(e, i), this;
        }
        identity() {
            return this.set(0, 0, 0, 1);
        }
        inverse() {
            return this.conjugate();
        }
        conjugate() {
            return (this._x *= -1), (this._y *= -1), (this._z *= -1), this._onChangeCallback(), this;
        }
        dot(e) {
            return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
        }
        lengthSq() {
            return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
        }
        length() {
            return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
        }
        normalize() {
            let e = this.length();
            return 0 === e ? ((this._x = 0), (this._y = 0), (this._z = 0), (this._w = 1)) : ((e = 1 / e), (this._x = this._x * e), (this._y = this._y * e), (this._z = this._z * e), (this._w = this._w * e)), this._onChangeCallback(), this;
        }
        multiply(e, t) {
            return void 0 !== t ? (console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."), this.multiplyQuaternions(e, t)) : this.multiplyQuaternions(this, e);
        }
        premultiply(e) {
            return this.multiplyQuaternions(e, this);
        }
        multiplyQuaternions(e, t) {
            const n = e._x,
                i = e._y,
                r = e._z,
                a = e._w,
                o = t._x,
                s = t._y,
                l = t._z,
                c = t._w;
            return (this._x = n * c + a * o + i * l - r * s), (this._y = i * c + a * s + r * o - n * l), (this._z = r * c + a * l + n * s - i * o), (this._w = a * c - n * o - i * s - r * l), this._onChangeCallback(), this;
        }
        slerp(e, t) {
            if (0 === t) return this;
            if (1 === t) return this.copy(e);
            const n = this._x,
                i = this._y,
                r = this._z,
                a = this._w;
            let o = a * e._w + n * e._x + i * e._y + r * e._z;
            if ((o < 0 ? ((this._w = -e._w), (this._x = -e._x), (this._y = -e._y), (this._z = -e._z), (o = -o)) : this.copy(e), o >= 1)) return (this._w = a), (this._x = n), (this._y = i), (this._z = r), this;
            const s = 1 - o * o;
            if (s <= Number.EPSILON) {
                const e = 1 - t;
                return (this._w = e * a + t * this._w), (this._x = e * n + t * this._x), (this._y = e * i + t * this._y), (this._z = e * r + t * this._z), this.normalize(), this._onChangeCallback(), this;
            }
            const l = Math.sqrt(s),
                c = Math.atan2(l, o),
                h = Math.sin((1 - t) * c) / l,
                d = Math.sin(t * c) / l;
            return (this._w = a * h + this._w * d), (this._x = n * h + this._x * d), (this._y = i * h + this._y * d), (this._z = r * h + this._z * d), this._onChangeCallback(), this;
        }
        equals(e) {
            return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w;
        }
        fromArray(e, t = 0) {
            return (this._x = e[t]), (this._y = e[t + 1]), (this._z = e[t + 2]), (this._w = e[t + 3]), this._onChangeCallback(), this;
        }
        toArray(e = [], t = 0) {
            return (e[t] = this._x), (e[t + 1] = this._y), (e[t + 2] = this._z), (e[t + 3] = this._w), e;
        }
        fromBufferAttribute(e, t) {
            return (this._x = e.getX(t)), (this._y = e.getY(t)), (this._z = e.getZ(t)), (this._w = e.getW(t)), this;
        }
        _onChange(e) {
            return (this._onChangeCallback = e), this;
        }
        _onChangeCallback() {}
    }
    class H {
        constructor(e = 0, t = 0, n = 0) {
            Object.defineProperty(this, "isVector3", { value: !0 }), (this.x = e), (this.y = t), (this.z = n);
        }
        set(e, t, n) {
            return void 0 === n && (n = this.z), (this.x = e), (this.y = t), (this.z = n), this;
        }
        setScalar(e) {
            return (this.x = e), (this.y = e), (this.z = e), this;
        }
        setX(e) {
            return (this.x = e), this;
        }
        setY(e) {
            return (this.y = e), this;
        }
        setZ(e) {
            return (this.z = e), this;
        }
        setComponent(e, t) {
            switch (e) {
                case 0:
                    this.x = t;
                    break;
                case 1:
                    this.y = t;
                    break;
                case 2:
                    this.z = t;
                    break;
                default:
                    throw new Error("index is out of range: " + e);
            }
            return this;
        }
        getComponent(e) {
            switch (e) {
                case 0:
                    return this.x;
                case 1:
                    return this.y;
                case 2:
                    return this.z;
                default:
                    throw new Error("index is out of range: " + e);
            }
        }
        clone() {
            return new this.constructor(this.x, this.y, this.z);
        }
        copy(e) {
            return (this.x = e.x), (this.y = e.y), (this.z = e.z), this;
        }
        add(e, t) {
            return void 0 !== t ? (console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(e, t)) : ((this.x += e.x), (this.y += e.y), (this.z += e.z), this);
        }
        addScalar(e) {
            return (this.x += e), (this.y += e), (this.z += e), this;
        }
        addVectors(e, t) {
            return (this.x = e.x + t.x), (this.y = e.y + t.y), (this.z = e.z + t.z), this;
        }
        addScaledVector(e, t) {
            return (this.x += e.x * t), (this.y += e.y * t), (this.z += e.z * t), this;
        }
        sub(e, t) {
            return void 0 !== t ? (console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(e, t)) : ((this.x -= e.x), (this.y -= e.y), (this.z -= e.z), this);
        }
        subScalar(e) {
            return (this.x -= e), (this.y -= e), (this.z -= e), this;
        }
        subVectors(e, t) {
            return (this.x = e.x - t.x), (this.y = e.y - t.y), (this.z = e.z - t.z), this;
        }
        multiply(e, t) {
            return void 0 !== t ? (console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."), this.multiplyVectors(e, t)) : ((this.x *= e.x), (this.y *= e.y), (this.z *= e.z), this);
        }
        multiplyScalar(e) {
            return (this.x *= e), (this.y *= e), (this.z *= e), this;
        }
        multiplyVectors(e, t) {
            return (this.x = e.x * t.x), (this.y = e.y * t.y), (this.z = e.z * t.z), this;
        }
        applyEuler(e) {
            return (e && e.isEuler) || console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."), this.applyQuaternion(V.setFromEuler(e));
        }
        applyAxisAngle(e, t) {
            return this.applyQuaternion(V.setFromAxisAngle(e, t));
        }
        applyMatrix3(e) {
            const t = this.x,
                n = this.y,
                i = this.z,
                r = e.elements;
            return (this.x = r[0] * t + r[3] * n + r[6] * i), (this.y = r[1] * t + r[4] * n + r[7] * i), (this.z = r[2] * t + r[5] * n + r[8] * i), this;
        }
        applyNormalMatrix(e) {
            return this.applyMatrix3(e).normalize();
        }
        applyMatrix4(e) {
            const t = this.x,
                n = this.y,
                i = this.z,
                r = e.elements,
                a = 1 / (r[3] * t + r[7] * n + r[11] * i + r[15]);
            return (this.x = (r[0] * t + r[4] * n + r[8] * i + r[12]) * a), (this.y = (r[1] * t + r[5] * n + r[9] * i + r[13]) * a), (this.z = (r[2] * t + r[6] * n + r[10] * i + r[14]) * a), this;
        }
        applyQuaternion(e) {
            const t = this.x,
                n = this.y,
                i = this.z,
                r = e.x,
                a = e.y,
                o = e.z,
                s = e.w,
                l = s * t + a * i - o * n,
                c = s * n + o * t - r * i,
                h = s * i + r * n - a * t,
                d = -r * t - a * n - o * i;
            return (this.x = l * s + d * -r + c * -o - h * -a), (this.y = c * s + d * -a + h * -r - l * -o), (this.z = h * s + d * -o + l * -a - c * -r), this;
        }
        project(e) {
            return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix);
        }
        unproject(e) {
            return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld);
        }
        transformDirection(e) {
            const t = this.x,
                n = this.y,
                i = this.z,
                r = e.elements;
            return (this.x = r[0] * t + r[4] * n + r[8] * i), (this.y = r[1] * t + r[5] * n + r[9] * i), (this.z = r[2] * t + r[6] * n + r[10] * i), this.normalize();
        }
        divide(e) {
            return (this.x /= e.x), (this.y /= e.y), (this.z /= e.z), this;
        }
        divideScalar(e) {
            return this.multiplyScalar(1 / e);
        }
        min(e) {
            return (this.x = Math.min(this.x, e.x)), (this.y = Math.min(this.y, e.y)), (this.z = Math.min(this.z, e.z)), this;
        }
        max(e) {
            return (this.x = Math.max(this.x, e.x)), (this.y = Math.max(this.y, e.y)), (this.z = Math.max(this.z, e.z)), this;
        }
        clamp(e, t) {
            return (this.x = Math.max(e.x, Math.min(t.x, this.x))), (this.y = Math.max(e.y, Math.min(t.y, this.y))), (this.z = Math.max(e.z, Math.min(t.z, this.z))), this;
        }
        clampScalar(e, t) {
            return (this.x = Math.max(e, Math.min(t, this.x))), (this.y = Math.max(e, Math.min(t, this.y))), (this.z = Math.max(e, Math.min(t, this.z))), this;
        }
        clampLength(e, t) {
            const n = this.length();
            return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n)));
        }
        floor() {
            return (this.x = Math.floor(this.x)), (this.y = Math.floor(this.y)), (this.z = Math.floor(this.z)), this;
        }
        ceil() {
            return (this.x = Math.ceil(this.x)), (this.y = Math.ceil(this.y)), (this.z = Math.ceil(this.z)), this;
        }
        round() {
            return (this.x = Math.round(this.x)), (this.y = Math.round(this.y)), (this.z = Math.round(this.z)), this;
        }
        roundToZero() {
            return (this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x)), (this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y)), (this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z)), this;
        }
        negate() {
            return (this.x = -this.x), (this.y = -this.y), (this.z = -this.z), this;
        }
        dot(e) {
            return this.x * e.x + this.y * e.y + this.z * e.z;
        }
        lengthSq() {
            return this.x * this.x + this.y * this.y + this.z * this.z;
        }
        length() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        }
        manhattanLength() {
            return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
        }
        normalize() {
            return this.divideScalar(this.length() || 1);
        }
        setLength(e) {
            return this.normalize().multiplyScalar(e);
        }
        lerp(e, t) {
            return (this.x += (e.x - this.x) * t), (this.y += (e.y - this.y) * t), (this.z += (e.z - this.z) * t), this;
        }
        lerpVectors(e, t, n) {
            return (this.x = e.x + (t.x - e.x) * n), (this.y = e.y + (t.y - e.y) * n), (this.z = e.z + (t.z - e.z) * n), this;
        }
        cross(e, t) {
            return void 0 !== t ? (console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."), this.crossVectors(e, t)) : this.crossVectors(this, e);
        }
        crossVectors(e, t) {
            const n = e.x,
                i = e.y,
                r = e.z,
                a = t.x,
                o = t.y,
                s = t.z;
            return (this.x = i * s - r * o), (this.y = r * a - n * s), (this.z = n * o - i * a), this;
        }
        projectOnVector(e) {
            const t = e.lengthSq();
            if (0 === t) return this.set(0, 0, 0);
            const n = e.dot(this) / t;
            return this.copy(e).multiplyScalar(n);
        }
        projectOnPlane(e) {
            return k.copy(this).projectOnVector(e), this.sub(k);
        }
        reflect(e) {
            return this.sub(k.copy(e).multiplyScalar(2 * this.dot(e)));
        }
        angleTo(e) {
            const t = Math.sqrt(this.lengthSq() * e.lengthSq());
            if (0 === t) return Math.PI / 2;
            const n = this.dot(e) / t;
            return Math.acos(N.clamp(n, -1, 1));
        }
        distanceTo(e) {
            return Math.sqrt(this.distanceToSquared(e));
        }
        distanceToSquared(e) {
            const t = this.x - e.x,
                n = this.y - e.y,
                i = this.z - e.z;
            return t * t + n * n + i * i;
        }
        manhattanDistanceTo(e) {
            return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z);
        }
        setFromSpherical(e) {
            return this.setFromSphericalCoords(e.radius, e.phi, e.theta);
        }
        setFromSphericalCoords(e, t, n) {
            const i = Math.sin(t) * e;
            return (this.x = i * Math.sin(n)), (this.y = Math.cos(t) * e), (this.z = i * Math.cos(n)), this;
        }
        setFromCylindrical(e) {
            return this.setFromCylindricalCoords(e.radius, e.theta, e.y);
        }
        setFromCylindricalCoords(e, t, n) {
            return (this.x = e * Math.sin(t)), (this.y = n), (this.z = e * Math.cos(t)), this;
        }
        setFromMatrixPosition(e) {
            const t = e.elements;
            return (this.x = t[12]), (this.y = t[13]), (this.z = t[14]), this;
        }
        setFromMatrixScale(e) {
            const t = this.setFromMatrixColumn(e, 0).length(),
                n = this.setFromMatrixColumn(e, 1).length(),
                i = this.setFromMatrixColumn(e, 2).length();
            return (this.x = t), (this.y = n), (this.z = i), this;
        }
        setFromMatrixColumn(e, t) {
            return this.fromArray(e.elements, 4 * t);
        }
        setFromMatrix3Column(e, t) {
            return this.fromArray(e.elements, 3 * t);
        }
        equals(e) {
            return e.x === this.x && e.y === this.y && e.z === this.z;
        }
        fromArray(e, t = 0) {
            return (this.x = e[t]), (this.y = e[t + 1]), (this.z = e[t + 2]), this;
        }
        toArray(e = [], t = 0) {
            return (e[t] = this.x), (e[t + 1] = this.y), (e[t + 2] = this.z), e;
        }
        fromBufferAttribute(e, t, n) {
            return void 0 !== n && console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute()."), (this.x = e.getX(t)), (this.y = e.getY(t)), (this.z = e.getZ(t)), this;
        }
        random() {
            return (this.x = Math.random()), (this.y = Math.random()), (this.z = Math.random()), this;
        }
    }
    const k = new H(),
        V = new B();
    class W {
        constructor(e, t) {
            Object.defineProperty(this, "isBox3", { value: !0 }), (this.min = void 0 !== e ? e : new H(1 / 0, 1 / 0, 1 / 0)), (this.max = void 0 !== t ? t : new H(-1 / 0, -1 / 0, -1 / 0));
        }
        set(e, t) {
            return this.min.copy(e), this.max.copy(t), this;
        }
        setFromArray(e) {
            let t = 1 / 0,
                n = 1 / 0,
                i = 1 / 0,
                r = -1 / 0,
                a = -1 / 0,
                o = -1 / 0;
            for (let s = 0, l = e.length; s < l; s += 3) {
                const l = e[s],
                    c = e[s + 1],
                    h = e[s + 2];
                l < t && (t = l), c < n && (n = c), h < i && (i = h), l > r && (r = l), c > a && (a = c), h > o && (o = h);
            }
            return this.min.set(t, n, i), this.max.set(r, a, o), this;
        }
        setFromBufferAttribute(e) {
            let t = 1 / 0,
                n = 1 / 0,
                i = 1 / 0,
                r = -1 / 0,
                a = -1 / 0,
                o = -1 / 0;
            for (let s = 0, l = e.count; s < l; s++) {
                const l = e.getX(s),
                    c = e.getY(s),
                    h = e.getZ(s);
                l < t && (t = l), c < n && (n = c), h < i && (i = h), l > r && (r = l), c > a && (a = c), h > o && (o = h);
            }
            return this.min.set(t, n, i), this.max.set(r, a, o), this;
        }
        setFromPoints(e) {
            this.makeEmpty();
            for (let t = 0, n = e.length; t < n; t++) this.expandByPoint(e[t]);
            return this;
        }
        setFromCenterAndSize(e, t) {
            const n = j.copy(t).multiplyScalar(0.5);
            return this.min.copy(e).sub(n), this.max.copy(e).add(n), this;
        }
        setFromObject(e) {
            return this.makeEmpty(), this.expandByObject(e);
        }
        clone() {
            return new this.constructor().copy(this);
        }
        copy(e) {
            return this.min.copy(e.min), this.max.copy(e.max), this;
        }
        makeEmpty() {
            return (this.min.x = this.min.y = this.min.z = 1 / 0), (this.max.x = this.max.y = this.max.z = -1 / 0), this;
        }
        isEmpty() {
            return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
        }
        getCenter(e) {
            return void 0 === e && (console.warn("THREE.Box3: .getCenter() target is now required"), (e = new H())), this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(0.5);
        }
        getSize(e) {
            return void 0 === e && (console.warn("THREE.Box3: .getSize() target is now required"), (e = new H())), this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min);
        }
        expandByPoint(e) {
            return this.min.min(e), this.max.max(e), this;
        }
        expandByVector(e) {
            return this.min.sub(e), this.max.add(e), this;
        }
        expandByScalar(e) {
            return this.min.addScalar(-e), this.max.addScalar(e), this;
        }
        expandByObject(e) {
            e.updateWorldMatrix(!1, !1);
            const t = e.geometry;
            void 0 !== t && (null === t.boundingBox && t.computeBoundingBox(), Q.copy(t.boundingBox), Q.applyMatrix4(e.matrixWorld), this.union(Q));
            const n = e.children;
            for (let e = 0, t = n.length; e < t; e++) this.expandByObject(n[e]);
            return this;
        }
        containsPoint(e) {
            return !(e.x < this.min.x || e.x > this.max.x || e.y < this.min.y || e.y > this.max.y || e.z < this.min.z || e.z > this.max.z);
        }
        containsBox(e) {
            return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z;
        }
        getParameter(e, t) {
            return (
                void 0 === t && (console.warn("THREE.Box3: .getParameter() target is now required"), (t = new H())),
                t.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y), (e.z - this.min.z) / (this.max.z - this.min.z))
            );
        }
        intersectsBox(e) {
            return !(e.max.x < this.min.x || e.min.x > this.max.x || e.max.y < this.min.y || e.min.y > this.max.y || e.max.z < this.min.z || e.min.z > this.max.z);
        }
        intersectsSphere(e) {
            return this.clampPoint(e.center, j), j.distanceToSquared(e.center) <= e.radius * e.radius;
        }
        intersectsPlane(e) {
            let t, n;
            return (
                e.normal.x > 0 ? ((t = e.normal.x * this.min.x), (n = e.normal.x * this.max.x)) : ((t = e.normal.x * this.max.x), (n = e.normal.x * this.min.x)),
                e.normal.y > 0 ? ((t += e.normal.y * this.min.y), (n += e.normal.y * this.max.y)) : ((t += e.normal.y * this.max.y), (n += e.normal.y * this.min.y)),
                e.normal.z > 0 ? ((t += e.normal.z * this.min.z), (n += e.normal.z * this.max.z)) : ((t += e.normal.z * this.max.z), (n += e.normal.z * this.min.z)),
                t <= -e.constant && n >= -e.constant
            );
        }
        intersectsTriangle(e) {
            if (this.isEmpty()) return !1;
            this.getCenter(te), ne.subVectors(this.max, te), q.subVectors(e.a, te), Z.subVectors(e.b, te), J.subVectors(e.c, te), K.subVectors(Z, q), $.subVectors(J, Z), ee.subVectors(q, J);
            let t = [0, -K.z, K.y, 0, -$.z, $.y, 0, -ee.z, ee.y, K.z, 0, -K.x, $.z, 0, -$.x, ee.z, 0, -ee.x, -K.y, K.x, 0, -$.y, $.x, 0, -ee.y, ee.x, 0];
            return !!X(t, q, Z, J, ne) && ((t = [1, 0, 0, 0, 1, 0, 0, 0, 1]), !!X(t, q, Z, J, ne) && (ie.crossVectors(K, $), (t = [ie.x, ie.y, ie.z]), X(t, q, Z, J, ne)));
        }
        clampPoint(e, t) {
            return void 0 === t && (console.warn("THREE.Box3: .clampPoint() target is now required"), (t = new H())), t.copy(e).clamp(this.min, this.max);
        }
        distanceToPoint(e) {
            return j.copy(e).clamp(this.min, this.max).sub(e).length();
        }
        getBoundingSphere(e) {
            return void 0 === e && console.error("THREE.Box3: .getBoundingSphere() target is now required"), this.getCenter(e.center), (e.radius = 0.5 * this.getSize(j).length()), e;
        }
        intersect(e) {
            return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
        }
        union(e) {
            return this.min.min(e.min), this.max.max(e.max), this;
        }
        applyMatrix4(e) {
            return (
                this.isEmpty() ||
                    (Y[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e),
                    Y[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e),
                    Y[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e),
                    Y[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e),
                    Y[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e),
                    Y[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e),
                    Y[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e),
                    Y[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e),
                    this.setFromPoints(Y)),
                this
            );
        }
        translate(e) {
            return this.min.add(e), this.max.add(e), this;
        }
        equals(e) {
            return e.min.equals(this.min) && e.max.equals(this.max);
        }
    }
    function X(e, t, n, i, r) {
        for (let a = 0, o = e.length - 3; a <= o; a += 3) {
            re.fromArray(e, a);
            const o = r.x * Math.abs(re.x) + r.y * Math.abs(re.y) + r.z * Math.abs(re.z),
                s = t.dot(re),
                l = n.dot(re),
                c = i.dot(re);
            if (Math.max(-Math.max(s, l, c), Math.min(s, l, c)) > o) return !1;
        }
        return !0;
    }
    const Y = [new H(), new H(), new H(), new H(), new H(), new H(), new H(), new H()],
        j = new H(),
        Q = new W(),
        q = new H(),
        Z = new H(),
        J = new H(),
        K = new H(),
        $ = new H(),
        ee = new H(),
        te = new H(),
        ne = new H(),
        ie = new H(),
        re = new H(),
        ae = new W();
    class oe {
        constructor(e, t) {
            (this.center = void 0 !== e ? e : new H()), (this.radius = void 0 !== t ? t : -1);
        }
        set(e, t) {
            return this.center.copy(e), (this.radius = t), this;
        }
        setFromPoints(e, t) {
            const n = this.center;
            void 0 !== t ? n.copy(t) : ae.setFromPoints(e).getCenter(n);
            let i = 0;
            for (let t = 0, r = e.length; t < r; t++) i = Math.max(i, n.distanceToSquared(e[t]));
            return (this.radius = Math.sqrt(i)), this;
        }
        clone() {
            return new this.constructor().copy(this);
        }
        copy(e) {
            return this.center.copy(e.center), (this.radius = e.radius), this;
        }
        isEmpty() {
            return this.radius < 0;
        }
        makeEmpty() {
            return this.center.set(0, 0, 0), (this.radius = -1), this;
        }
        containsPoint(e) {
            return e.distanceToSquared(this.center) <= this.radius * this.radius;
        }
        distanceToPoint(e) {
            return e.distanceTo(this.center) - this.radius;
        }
        intersectsSphere(e) {
            const t = this.radius + e.radius;
            return e.center.distanceToSquared(this.center) <= t * t;
        }
        intersectsBox(e) {
            return e.intersectsSphere(this);
        }
        intersectsPlane(e) {
            return Math.abs(e.distanceToPoint(this.center)) <= this.radius;
        }
        clampPoint(e, t) {
            const n = this.center.distanceToSquared(e);
            return (
                void 0 === t && (console.warn("THREE.Sphere: .clampPoint() target is now required"), (t = new H())),
                t.copy(e),
                n > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)),
                t
            );
        }
        getBoundingBox(e) {
            return void 0 === e && (console.warn("THREE.Sphere: .getBoundingBox() target is now required"), (e = new W())), this.isEmpty() ? (e.makeEmpty(), e) : (e.set(this.center, this.center), e.expandByScalar(this.radius), e);
        }
        applyMatrix4(e) {
            return this.center.applyMatrix4(e), (this.radius = this.radius * e.getMaxScaleOnAxis()), this;
        }
        translate(e) {
            return this.center.add(e), this;
        }
        equals(e) {
            return e.center.equals(this.center) && e.radius === this.radius;
        }
    }
    const se = new H(),
        le = new H(),
        ce = new H(),
        he = new H(),
        de = new H(),
        ue = new H(),
        fe = new H();
    class pe {
        constructor() {
            Object.defineProperty(this, "isMatrix4", { value: !0 }),
                (this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
                arguments.length > 0 && console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.");
        }
        set(e, t, n, i, r, a, o, s, l, c, h, d, u, f, p, m) {
            const g = this.elements;
            return (g[0] = e), (g[4] = t), (g[8] = n), (g[12] = i), (g[1] = r), (g[5] = a), (g[9] = o), (g[13] = s), (g[2] = l), (g[6] = c), (g[10] = h), (g[14] = d), (g[3] = u), (g[7] = f), (g[11] = p), (g[15] = m), this;
        }
        identity() {
            return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
        }
        clone() {
            return new pe().fromArray(this.elements);
        }
        copy(e) {
            const t = this.elements,
                n = e.elements;
            return (
                (t[0] = n[0]),
                (t[1] = n[1]),
                (t[2] = n[2]),
                (t[3] = n[3]),
                (t[4] = n[4]),
                (t[5] = n[5]),
                (t[6] = n[6]),
                (t[7] = n[7]),
                (t[8] = n[8]),
                (t[9] = n[9]),
                (t[10] = n[10]),
                (t[11] = n[11]),
                (t[12] = n[12]),
                (t[13] = n[13]),
                (t[14] = n[14]),
                (t[15] = n[15]),
                this
            );
        }
        copyPosition(e) {
            const t = this.elements,
                n = e.elements;
            return (t[12] = n[12]), (t[13] = n[13]), (t[14] = n[14]), this;
        }
        extractBasis(e, t, n) {
            return e.setFromMatrixColumn(this, 0), t.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this;
        }
        makeBasis(e, t, n) {
            return this.set(e.x, t.x, n.x, 0, e.y, t.y, n.y, 0, e.z, t.z, n.z, 0, 0, 0, 0, 1), this;
        }
        extractRotation(e) {
            const t = this.elements,
                n = e.elements,
                i = 1 / me.setFromMatrixColumn(e, 0).length(),
                r = 1 / me.setFromMatrixColumn(e, 1).length(),
                a = 1 / me.setFromMatrixColumn(e, 2).length();
            return (
                (t[0] = n[0] * i),
                (t[1] = n[1] * i),
                (t[2] = n[2] * i),
                (t[3] = 0),
                (t[4] = n[4] * r),
                (t[5] = n[5] * r),
                (t[6] = n[6] * r),
                (t[7] = 0),
                (t[8] = n[8] * a),
                (t[9] = n[9] * a),
                (t[10] = n[10] * a),
                (t[11] = 0),
                (t[12] = 0),
                (t[13] = 0),
                (t[14] = 0),
                (t[15] = 1),
                this
            );
        }
        makeRotationFromEuler(e) {
            (e && e.isEuler) || console.error("THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
            const t = this.elements,
                n = e.x,
                i = e.y,
                r = e.z,
                a = Math.cos(n),
                o = Math.sin(n),
                s = Math.cos(i),
                l = Math.sin(i),
                c = Math.cos(r),
                h = Math.sin(r);
            if ("XYZ" === e.order) {
                const e = a * c,
                    n = a * h,
                    i = o * c,
                    r = o * h;
                (t[0] = s * c), (t[4] = -s * h), (t[8] = l), (t[1] = n + i * l), (t[5] = e - r * l), (t[9] = -o * s), (t[2] = r - e * l), (t[6] = i + n * l), (t[10] = a * s);
            } else if ("YXZ" === e.order) {
                const e = s * c,
                    n = s * h,
                    i = l * c,
                    r = l * h;
                (t[0] = e + r * o), (t[4] = i * o - n), (t[8] = a * l), (t[1] = a * h), (t[5] = a * c), (t[9] = -o), (t[2] = n * o - i), (t[6] = r + e * o), (t[10] = a * s);
            } else if ("ZXY" === e.order) {
                const e = s * c,
                    n = s * h,
                    i = l * c,
                    r = l * h;
                (t[0] = e - r * o), (t[4] = -a * h), (t[8] = i + n * o), (t[1] = n + i * o), (t[5] = a * c), (t[9] = r - e * o), (t[2] = -a * l), (t[6] = o), (t[10] = a * s);
            } else if ("ZYX" === e.order) {
                const e = a * c,
                    n = a * h,
                    i = o * c,
                    r = o * h;
                (t[0] = s * c), (t[4] = i * l - n), (t[8] = e * l + r), (t[1] = s * h), (t[5] = r * l + e), (t[9] = n * l - i), (t[2] = -l), (t[6] = o * s), (t[10] = a * s);
            } else if ("YZX" === e.order) {
                const e = a * s,
                    n = a * l,
                    i = o * s,
                    r = o * l;
                (t[0] = s * c), (t[4] = r - e * h), (t[8] = i * h + n), (t[1] = h), (t[5] = a * c), (t[9] = -o * c), (t[2] = -l * c), (t[6] = n * h + i), (t[10] = e - r * h);
            } else if ("XZY" === e.order) {
                const e = a * s,
                    n = a * l,
                    i = o * s,
                    r = o * l;
                (t[0] = s * c), (t[4] = -h), (t[8] = l * c), (t[1] = e * h + r), (t[5] = a * c), (t[9] = n * h - i), (t[2] = i * h - n), (t[6] = o * c), (t[10] = r * h + e);
            }
            return (t[3] = 0), (t[7] = 0), (t[11] = 0), (t[12] = 0), (t[13] = 0), (t[14] = 0), (t[15] = 1), this;
        }
        makeRotationFromQuaternion(e) {
            return this.compose(xe, e, ve);
        }
        lookAt(e, t, n) {
            const i = this.elements;
            return (
                Me.subVectors(e, t),
                0 === Me.lengthSq() && (Me.z = 1),
                Me.normalize(),
                _e.crossVectors(n, Me),
                0 === _e.lengthSq() && (1 === Math.abs(n.z) ? (Me.x += 1e-4) : (Me.z += 1e-4), Me.normalize(), _e.crossVectors(n, Me)),
                _e.normalize(),
                ye.crossVectors(Me, _e),
                (i[0] = _e.x),
                (i[4] = ye.x),
                (i[8] = Me.x),
                (i[1] = _e.y),
                (i[5] = ye.y),
                (i[9] = Me.y),
                (i[2] = _e.z),
                (i[6] = ye.z),
                (i[10] = Me.z),
                this
            );
        }
        multiply(e, t) {
            return void 0 !== t ? (console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."), this.multiplyMatrices(e, t)) : this.multiplyMatrices(this, e);
        }
        premultiply(e) {
            return this.multiplyMatrices(e, this);
        }
        multiplyMatrices(e, t) {
            const n = e.elements,
                i = t.elements,
                r = this.elements,
                a = n[0],
                o = n[4],
                s = n[8],
                l = n[12],
                c = n[1],
                h = n[5],
                d = n[9],
                u = n[13],
                f = n[2],
                p = n[6],
                m = n[10],
                g = n[14],
                x = n[3],
                v = n[7],
                _ = n[11],
                y = n[15],
                M = i[0],
                b = i[4],
                w = i[8],
                A = i[12],
                S = i[1],
                T = i[5],
                L = i[9],
                E = i[13],
                P = i[2],
                F = i[6],
                N = i[10],
                C = i[14],
                I = i[3],
                R = i[7],
                D = i[11],
                U = i[15];
            return (
                (r[0] = a * M + o * S + s * P + l * I),
                (r[4] = a * b + o * T + s * F + l * R),
                (r[8] = a * w + o * L + s * N + l * D),
                (r[12] = a * A + o * E + s * C + l * U),
                (r[1] = c * M + h * S + d * P + u * I),
                (r[5] = c * b + h * T + d * F + u * R),
                (r[9] = c * w + h * L + d * N + u * D),
                (r[13] = c * A + h * E + d * C + u * U),
                (r[2] = f * M + p * S + m * P + g * I),
                (r[6] = f * b + p * T + m * F + g * R),
                (r[10] = f * w + p * L + m * N + g * D),
                (r[14] = f * A + p * E + m * C + g * U),
                (r[3] = x * M + v * S + _ * P + y * I),
                (r[7] = x * b + v * T + _ * F + y * R),
                (r[11] = x * w + v * L + _ * N + y * D),
                (r[15] = x * A + v * E + _ * C + y * U),
                this
            );
        }
        multiplyScalar(e) {
            const t = this.elements;
            return (t[0] *= e), (t[4] *= e), (t[8] *= e), (t[12] *= e), (t[1] *= e), (t[5] *= e), (t[9] *= e), (t[13] *= e), (t[2] *= e), (t[6] *= e), (t[10] *= e), (t[14] *= e), (t[3] *= e), (t[7] *= e), (t[11] *= e), (t[15] *= e), this;
        }
        determinant() {
            const e = this.elements,
                t = e[0],
                n = e[4],
                i = e[8],
                r = e[12],
                a = e[1],
                o = e[5],
                s = e[9],
                l = e[13],
                c = e[2],
                h = e[6],
                d = e[10],
                u = e[14];
            return (
                e[3] * (+r * s * h - i * l * h - r * o * d + n * l * d + i * o * u - n * s * u) +
                e[7] * (+t * s * u - t * l * d + r * a * d - i * a * u + i * l * c - r * s * c) +
                e[11] * (+t * l * h - t * o * u - r * a * h + n * a * u + r * o * c - n * l * c) +
                e[15] * (-i * o * c - t * s * h + t * o * d + i * a * h - n * a * d + n * s * c)
            );
        }
        transpose() {
            const e = this.elements;
            let t;
            return (
                (t = e[1]),
                (e[1] = e[4]),
                (e[4] = t),
                (t = e[2]),
                (e[2] = e[8]),
                (e[8] = t),
                (t = e[6]),
                (e[6] = e[9]),
                (e[9] = t),
                (t = e[3]),
                (e[3] = e[12]),
                (e[12] = t),
                (t = e[7]),
                (e[7] = e[13]),
                (e[13] = t),
                (t = e[11]),
                (e[11] = e[14]),
                (e[14] = t),
                this
            );
        }
        setPosition(e, t, n) {
            const i = this.elements;
            return e.isVector3 ? ((i[12] = e.x), (i[13] = e.y), (i[14] = e.z)) : ((i[12] = e), (i[13] = t), (i[14] = n)), this;
        }
        getInverse(e, t) {
            void 0 !== t && console.warn("THREE.Matrix4: .getInverse() can no longer be configured to throw on degenerate.");
            const n = this.elements,
                i = e.elements,
                r = i[0],
                a = i[1],
                o = i[2],
                s = i[3],
                l = i[4],
                c = i[5],
                h = i[6],
                d = i[7],
                u = i[8],
                f = i[9],
                p = i[10],
                m = i[11],
                g = i[12],
                x = i[13],
                v = i[14],
                _ = i[15],
                y = f * v * d - x * p * d + x * h * m - c * v * m - f * h * _ + c * p * _,
                M = g * p * d - u * v * d - g * h * m + l * v * m + u * h * _ - l * p * _,
                b = u * x * d - g * f * d + g * c * m - l * x * m - u * c * _ + l * f * _,
                w = g * f * h - u * x * h - g * c * p + l * x * p + u * c * v - l * f * v,
                A = r * y + a * M + o * b + s * w;
            if (0 === A) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
            const S = 1 / A;
            return (
                (n[0] = y * S),
                (n[1] = (x * p * s - f * v * s - x * o * m + a * v * m + f * o * _ - a * p * _) * S),
                (n[2] = (c * v * s - x * h * s + x * o * d - a * v * d - c * o * _ + a * h * _) * S),
                (n[3] = (f * h * s - c * p * s - f * o * d + a * p * d + c * o * m - a * h * m) * S),
                (n[4] = M * S),
                (n[5] = (u * v * s - g * p * s + g * o * m - r * v * m - u * o * _ + r * p * _) * S),
                (n[6] = (g * h * s - l * v * s - g * o * d + r * v * d + l * o * _ - r * h * _) * S),
                (n[7] = (l * p * s - u * h * s + u * o * d - r * p * d - l * o * m + r * h * m) * S),
                (n[8] = b * S),
                (n[9] = (g * f * s - u * x * s - g * a * m + r * x * m + u * a * _ - r * f * _) * S),
                (n[10] = (l * x * s - g * c * s + g * a * d - r * x * d - l * a * _ + r * c * _) * S),
                (n[11] = (u * c * s - l * f * s - u * a * d + r * f * d + l * a * m - r * c * m) * S),
                (n[12] = w * S),
                (n[13] = (u * x * o - g * f * o + g * a * p - r * x * p - u * a * v + r * f * v) * S),
                (n[14] = (g * c * o - l * x * o - g * a * h + r * x * h + l * a * v - r * c * v) * S),
                (n[15] = (l * f * o - u * c * o + u * a * h - r * f * h - l * a * p + r * c * p) * S),
                this
            );
        }
        scale(e) {
            const t = this.elements,
                n = e.x,
                i = e.y,
                r = e.z;
            return (t[0] *= n), (t[4] *= i), (t[8] *= r), (t[1] *= n), (t[5] *= i), (t[9] *= r), (t[2] *= n), (t[6] *= i), (t[10] *= r), (t[3] *= n), (t[7] *= i), (t[11] *= r), this;
        }
        getMaxScaleOnAxis() {
            const e = this.elements,
                t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2],
                n = e[4] * e[4] + e[5] * e[5] + e[6] * e[6],
                i = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
            return Math.sqrt(Math.max(t, n, i));
        }
        makeTranslation(e, t, n) {
            return this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, n, 0, 0, 0, 1), this;
        }
        makeRotationX(e) {
            const t = Math.cos(e),
                n = Math.sin(e);
            return this.set(1, 0, 0, 0, 0, t, -n, 0, 0, n, t, 0, 0, 0, 0, 1), this;
        }
        makeRotationY(e) {
            const t = Math.cos(e),
                n = Math.sin(e);
            return this.set(t, 0, n, 0, 0, 1, 0, 0, -n, 0, t, 0, 0, 0, 0, 1), this;
        }
        makeRotationZ(e) {
            const t = Math.cos(e),
                n = Math.sin(e);
            return this.set(t, -n, 0, 0, n, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
        }
        makeRotationAxis(e, t) {
            const n = Math.cos(t),
                i = Math.sin(t),
                r = 1 - n,
                a = e.x,
                o = e.y,
                s = e.z,
                l = r * a,
                c = r * o;
            return this.set(l * a + n, l * o - i * s, l * s + i * o, 0, l * o + i * s, c * o + n, c * s - i * a, 0, l * s - i * o, c * s + i * a, r * s * s + n, 0, 0, 0, 0, 1), this;
        }
        makeScale(e, t, n) {
            return this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, n, 0, 0, 0, 0, 1), this;
        }
        makeShear(e, t, n) {
            return this.set(1, t, n, 0, e, 1, n, 0, e, t, 1, 0, 0, 0, 0, 1), this;
        }
        compose(e, t, n) {
            const i = this.elements,
                r = t._x,
                a = t._y,
                o = t._z,
                s = t._w,
                l = r + r,
                c = a + a,
                h = o + o,
                d = r * l,
                u = r * c,
                f = r * h,
                p = a * c,
                m = a * h,
                g = o * h,
                x = s * l,
                v = s * c,
                _ = s * h,
                y = n.x,
                M = n.y,
                b = n.z;
            return (
                (i[0] = (1 - (p + g)) * y),
                (i[1] = (u + _) * y),
                (i[2] = (f - v) * y),
                (i[3] = 0),
                (i[4] = (u - _) * M),
                (i[5] = (1 - (d + g)) * M),
                (i[6] = (m + x) * M),
                (i[7] = 0),
                (i[8] = (f + v) * b),
                (i[9] = (m - x) * b),
                (i[10] = (1 - (d + p)) * b),
                (i[11] = 0),
                (i[12] = e.x),
                (i[13] = e.y),
                (i[14] = e.z),
                (i[15] = 1),
                this
            );
        }
        decompose(e, t, n) {
            const i = this.elements;
            let r = me.set(i[0], i[1], i[2]).length();
            const a = me.set(i[4], i[5], i[6]).length(),
                o = me.set(i[8], i[9], i[10]).length();
            this.determinant() < 0 && (r = -r), (e.x = i[12]), (e.y = i[13]), (e.z = i[14]), ge.copy(this);
            const s = 1 / r,
                l = 1 / a,
                c = 1 / o;
            return (
                (ge.elements[0] *= s),
                (ge.elements[1] *= s),
                (ge.elements[2] *= s),
                (ge.elements[4] *= l),
                (ge.elements[5] *= l),
                (ge.elements[6] *= l),
                (ge.elements[8] *= c),
                (ge.elements[9] *= c),
                (ge.elements[10] *= c),
                t.setFromRotationMatrix(ge),
                (n.x = r),
                (n.y = a),
                (n.z = o),
                this
            );
        }
        makePerspective(e, t, n, i, r, a) {
            void 0 === a && console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");
            const o = this.elements,
                s = (2 * r) / (t - e),
                l = (2 * r) / (n - i),
                c = (t + e) / (t - e),
                h = (n + i) / (n - i),
                d = -(a + r) / (a - r),
                u = (-2 * a * r) / (a - r);
            return (o[0] = s), (o[4] = 0), (o[8] = c), (o[12] = 0), (o[1] = 0), (o[5] = l), (o[9] = h), (o[13] = 0), (o[2] = 0), (o[6] = 0), (o[10] = d), (o[14] = u), (o[3] = 0), (o[7] = 0), (o[11] = -1), (o[15] = 0), this;
        }
        makeOrthographic(e, t, n, i, r, a) {
            const o = this.elements,
                s = 1 / (t - e),
                l = 1 / (n - i),
                c = 1 / (a - r),
                h = (t + e) * s,
                d = (n + i) * l,
                u = (a + r) * c;
            return (o[0] = 2 * s), (o[4] = 0), (o[8] = 0), (o[12] = -h), (o[1] = 0), (o[5] = 2 * l), (o[9] = 0), (o[13] = -d), (o[2] = 0), (o[6] = 0), (o[10] = -2 * c), (o[14] = -u), (o[3] = 0), (o[7] = 0), (o[11] = 0), (o[15] = 1), this;
        }
        equals(e) {
            const t = this.elements,
                n = e.elements;
            for (let e = 0; e < 16; e++) if (t[e] !== n[e]) return !1;
            return !0;
        }
        fromArray(e, t = 0) {
            for (let n = 0; n < 16; n++) this.elements[n] = e[n + t];
            return this;
        }
        toArray(e = [], t = 0) {
            const n = this.elements;
            return (
                (e[t] = n[0]),
                (e[t + 1] = n[1]),
                (e[t + 2] = n[2]),
                (e[t + 3] = n[3]),
                (e[t + 4] = n[4]),
                (e[t + 5] = n[5]),
                (e[t + 6] = n[6]),
                (e[t + 7] = n[7]),
                (e[t + 8] = n[8]),
                (e[t + 9] = n[9]),
                (e[t + 10] = n[10]),
                (e[t + 11] = n[11]),
                (e[t + 12] = n[12]),
                (e[t + 13] = n[13]),
                (e[t + 14] = n[14]),
                (e[t + 15] = n[15]),
                e
            );
        }
    }
    const me = new H(),
        ge = new pe(),
        xe = new H(0, 0, 0),
        ve = new H(1, 1, 1),
        _e = new H(),
        ye = new H(),
        Me = new H();
    class be {
        constructor(e = 0, t = 0, n = 0, i = be.DefaultOrder) {
            Object.defineProperty(this, "isEuler", { value: !0 }), (this._x = e), (this._y = t), (this._z = n), (this._order = i);
        }
        get x() {
            return this._x;
        }
        set x(e) {
            (this._x = e), this._onChangeCallback();
        }
        get y() {
            return this._y;
        }
        set y(e) {
            (this._y = e), this._onChangeCallback();
        }
        get z() {
            return this._z;
        }
        set z(e) {
            (this._z = e), this._onChangeCallback();
        }
        get order() {
            return this._order;
        }
        set order(e) {
            (this._order = e), this._onChangeCallback();
        }
        set(e, t, n, i) {
            return (this._x = e), (this._y = t), (this._z = n), (this._order = i || this._order), this._onChangeCallback(), this;
        }
        clone() {
            return new this.constructor(this._x, this._y, this._z, this._order);
        }
        copy(e) {
            return (this._x = e._x), (this._y = e._y), (this._z = e._z), (this._order = e._order), this._onChangeCallback(), this;
        }
        setFromRotationMatrix(e, t, n) {
            const i = N.clamp,
                r = e.elements,
                a = r[0],
                o = r[4],
                s = r[8],
                l = r[1],
                c = r[5],
                h = r[9],
                d = r[2],
                u = r[6],
                f = r[10];
            switch ((t = t || this._order)) {
                case "XYZ":
                    (this._y = Math.asin(i(s, -1, 1))), Math.abs(s) < 0.9999999 ? ((this._x = Math.atan2(-h, f)), (this._z = Math.atan2(-o, a))) : ((this._x = Math.atan2(u, c)), (this._z = 0));
                    break;
                case "YXZ":
                    (this._x = Math.asin(-i(h, -1, 1))), Math.abs(h) < 0.9999999 ? ((this._y = Math.atan2(s, f)), (this._z = Math.atan2(l, c))) : ((this._y = Math.atan2(-d, a)), (this._z = 0));
                    break;
                case "ZXY":
                    (this._x = Math.asin(i(u, -1, 1))), Math.abs(u) < 0.9999999 ? ((this._y = Math.atan2(-d, f)), (this._z = Math.atan2(-o, c))) : ((this._y = 0), (this._z = Math.atan2(l, a)));
                    break;
                case "ZYX":
                    (this._y = Math.asin(-i(d, -1, 1))), Math.abs(d) < 0.9999999 ? ((this._x = Math.atan2(u, f)), (this._z = Math.atan2(l, a))) : ((this._x = 0), (this._z = Math.atan2(-o, c)));
                    break;
                case "YZX":
                    (this._z = Math.asin(i(l, -1, 1))), Math.abs(l) < 0.9999999 ? ((this._x = Math.atan2(-h, c)), (this._y = Math.atan2(-d, a))) : ((this._x = 0), (this._y = Math.atan2(s, f)));
                    break;
                case "XZY":
                    (this._z = Math.asin(-i(o, -1, 1))), Math.abs(o) < 0.9999999 ? ((this._x = Math.atan2(u, c)), (this._y = Math.atan2(s, a))) : ((this._x = Math.atan2(-h, f)), (this._y = 0));
                    break;
                default:
                    console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + t);
            }
            return (this._order = t), !1 !== n && this._onChangeCallback(), this;
        }
        setFromQuaternion(e, t, n) {
            return we.makeRotationFromQuaternion(e), this.setFromRotationMatrix(we, t, n);
        }
        setFromVector3(e, t) {
            return this.set(e.x, e.y, e.z, t || this._order);
        }
        reorder(e) {
            return Ae.setFromEuler(this), this.setFromQuaternion(Ae, e);
        }
        equals(e) {
            return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order;
        }
        fromArray(e) {
            return (this._x = e[0]), (this._y = e[1]), (this._z = e[2]), void 0 !== e[3] && (this._order = e[3]), this._onChangeCallback(), this;
        }
        toArray(e = [], t = 0) {
            return (e[t] = this._x), (e[t + 1] = this._y), (e[t + 2] = this._z), (e[t + 3] = this._order), e;
        }
        toVector3(e) {
            return e ? e.set(this._x, this._y, this._z) : new H(this._x, this._y, this._z);
        }
        _onChange(e) {
            return (this._onChangeCallback = e), this;
        }
        _onChangeCallback() {}
    }
    (be.DefaultOrder = "XYZ"), (be.RotationOrders = ["XYZ", "YZX", "ZXY", "XZY", "YXZ", "ZYX"]);
    const we = new pe(),
        Ae = new B();
    class Se {
        constructor() {
            this.mask = 1;
        }
        set(e) {
            this.mask = (1 << e) | 0;
        }
        enable(e) {
            this.mask |= (1 << e) | 0;
        }
        enableAll() {
            this.mask = -1;
        }
        toggle(e) {
            this.mask ^= (1 << e) | 0;
        }
        disable(e) {
            this.mask &= ~((1 << e) | 0);
        }
        disableAll() {
            this.mask = 0;
        }
        test(e) {
            return 0 != (this.mask & e.mask);
        }
    }
    let Te = 0;
    const Le = new H(),
        Ee = new B(),
        Pe = new pe(),
        Fe = new H(),
        Ne = new H(),
        Ce = new H(),
        Ie = new B(),
        Re = new H(1, 0, 0),
        De = new H(0, 1, 0),
        Ue = new H(0, 0, 1),
        Oe = { type: "added" },
        ze = { type: "removed" };
    function Ge() {
        Object.defineProperty(this, "id", { value: Te++ }), (this.uuid = N.generateUUID()), (this.name = ""), (this.type = "Object3D"), (this.parent = null), (this.children = []), (this.up = Ge.DefaultUp.clone());
        const e = new H(),
            t = new be(),
            n = new B(),
            i = new H(1, 1, 1);
        t._onChange(function () {
            n.setFromEuler(t, !1);
        }),
            n._onChange(function () {
                t.setFromQuaternion(n, void 0, !1);
            }),
            Object.defineProperties(this, {
                position: { configurable: !0, enumerable: !0, value: e },
                rotation: { configurable: !0, enumerable: !0, value: t },
                quaternion: { configurable: !0, enumerable: !0, value: n },
                scale: { configurable: !0, enumerable: !0, value: i },
                modelViewMatrix: { value: new pe() },
                normalMatrix: { value: new I() },
            }),
            (this.matrix = new pe()),
            (this.matrixWorld = new pe()),
            (this.matrixAutoUpdate = Ge.DefaultMatrixAutoUpdate),
            (this.matrixWorldNeedsUpdate = !1),
            (this.layers = new Se()),
            (this.visible = !0),
            (this.castShadow = !1),
            (this.receiveShadow = !1),
            (this.frustumCulled = !0),
            (this.renderOrder = 0),
            (this.userData = {});
    }
    (Ge.DefaultUp = new H(0, 1, 0)),
        (Ge.DefaultMatrixAutoUpdate = !0),
        (Ge.prototype = Object.assign(Object.create(E.prototype), {
            constructor: Ge,
            isObject3D: !0,
            onBeforeRender: function () {},
            onAfterRender: function () {},
            applyMatrix4: function (e) {
                this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(e), this.matrix.decompose(this.position, this.quaternion, this.scale);
            },
            applyQuaternion: function (e) {
                return this.quaternion.premultiply(e), this;
            },
            setRotationFromAxisAngle: function (e, t) {
                this.quaternion.setFromAxisAngle(e, t);
            },
            setRotationFromEuler: function (e) {
                this.quaternion.setFromEuler(e, !0);
            },
            setRotationFromMatrix: function (e) {
                this.quaternion.setFromRotationMatrix(e);
            },
            setRotationFromQuaternion: function (e) {
                this.quaternion.copy(e);
            },
            rotateOnAxis: function (e, t) {
                return Ee.setFromAxisAngle(e, t), this.quaternion.multiply(Ee), this;
            },
            rotateOnWorldAxis: function (e, t) {
                return Ee.setFromAxisAngle(e, t), this.quaternion.premultiply(Ee), this;
            },
            rotateX: function (e) {
                return this.rotateOnAxis(Re, e);
            },
            rotateY: function (e) {
                return this.rotateOnAxis(De, e);
            },
            rotateZ: function (e) {
                return this.rotateOnAxis(Ue, e);
            },
            translateOnAxis: function (e, t) {
                return Le.copy(e).applyQuaternion(this.quaternion), this.position.add(Le.multiplyScalar(t)), this;
            },
            translateX: function (e) {
                return this.translateOnAxis(Re, e);
            },
            translateY: function (e) {
                return this.translateOnAxis(De, e);
            },
            translateZ: function (e) {
                return this.translateOnAxis(Ue, e);
            },
            localToWorld: function (e) {
                return e.applyMatrix4(this.matrixWorld);
            },
            worldToLocal: function (e) {
                return e.applyMatrix4(Pe.getInverse(this.matrixWorld));
            },
            lookAt: function (e, t, n) {
                e.isVector3 ? Fe.copy(e) : Fe.set(e, t, n);
                const i = this.parent;
                this.updateWorldMatrix(!0, !1),
                    Ne.setFromMatrixPosition(this.matrixWorld),
                    this.isCamera || this.isLight ? Pe.lookAt(Ne, Fe, this.up) : Pe.lookAt(Fe, Ne, this.up),
                    this.quaternion.setFromRotationMatrix(Pe),
                    i && (Pe.extractRotation(i.matrixWorld), Ee.setFromRotationMatrix(Pe), this.quaternion.premultiply(Ee.inverse()));
            },
            add: function (e) {
                if (arguments.length > 1) {
                    for (let e = 0; e < arguments.length; e++) this.add(arguments[e]);
                    return this;
                }
                return e === this
                    ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", e), this)
                    : (e && e.isObject3D ? (null !== e.parent && e.parent.remove(e), (e.parent = this), this.children.push(e), e.dispatchEvent(Oe)) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", e), this);
            },
            remove: function (e) {
                if (arguments.length > 1) {
                    for (let e = 0; e < arguments.length; e++) this.remove(arguments[e]);
                    return this;
                }
                const t = this.children.indexOf(e);
                return -1 !== t && ((e.parent = null), this.children.splice(t, 1), e.dispatchEvent(ze)), this;
            },
            clear: function () {
                for (let e = 0; e < this.children.length; e++) {
                    const t = this.children[e];
                    (t.parent = null), t.dispatchEvent(ze);
                }
                return (this.children.length = 0), this;
            },
            attach: function (e) {
                return (
                    this.updateWorldMatrix(!0, !1),
                    Pe.getInverse(this.matrixWorld),
                    null !== e.parent && (e.parent.updateWorldMatrix(!0, !1), Pe.multiply(e.parent.matrixWorld)),
                    e.applyMatrix4(Pe),
                    e.updateWorldMatrix(!1, !1),
                    this.add(e),
                    this
                );
            },
            getObjectById: function (e) {
                return this.getObjectByProperty("id", e);
            },
            getObjectByName: function (e) {
                return this.getObjectByProperty("name", e);
            },
            getObjectByProperty: function (e, t) {
                if (this[e] === t) return this;
                for (let n = 0, i = this.children.length; n < i; n++) {
                    const i = this.children[n].getObjectByProperty(e, t);
                    if (void 0 !== i) return i;
                }
            },
            getWorldPosition: function (e) {
                return void 0 === e && (console.warn("THREE.Object3D: .getWorldPosition() target is now required"), (e = new H())), this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld);
            },
            getWorldQuaternion: function (e) {
                return void 0 === e && (console.warn("THREE.Object3D: .getWorldQuaternion() target is now required"), (e = new B())), this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Ne, e, Ce), e;
            },
            getWorldScale: function (e) {
                return void 0 === e && (console.warn("THREE.Object3D: .getWorldScale() target is now required"), (e = new H())), this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Ne, Ie, e), e;
            },
            getWorldDirection: function (e) {
                void 0 === e && (console.warn("THREE.Object3D: .getWorldDirection() target is now required"), (e = new H())), this.updateWorldMatrix(!0, !1);
                const t = this.matrixWorld.elements;
                return e.set(t[8], t[9], t[10]).normalize();
            },
            raycast: function () {},
            traverse: function (e) {
                e(this);
                const t = this.children;
                for (let n = 0, i = t.length; n < i; n++) t[n].traverse(e);
            },
            traverseVisible: function (e) {
                if (!1 === this.visible) return;
                e(this);
                const t = this.children;
                for (let n = 0, i = t.length; n < i; n++) t[n].traverseVisible(e);
            },
            traverseAncestors: function (e) {
                const t = this.parent;
                null !== t && (e(t), t.traverseAncestors(e));
            },
            updateMatrix: function () {
                this.matrix.compose(this.position, this.quaternion, this.scale), (this.matrixWorldNeedsUpdate = !0);
            },
            updateMatrixWorld: function (e) {
                this.matrixAutoUpdate && this.updateMatrix(),
                    (this.matrixWorldNeedsUpdate || e) && (null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), (this.matrixWorldNeedsUpdate = !1), (e = !0));
                const t = this.children;
                for (let n = 0, i = t.length; n < i; n++) t[n].updateMatrixWorld(e);
            },
            updateWorldMatrix: function (e, t) {
                const n = this.parent;
                if (
                    (!0 === e && null !== n && n.updateWorldMatrix(!0, !1),
                    this.matrixAutoUpdate && this.updateMatrix(),
                    null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix),
                    !0 === t)
                ) {
                    const e = this.children;
                    for (let t = 0, n = e.length; t < n; t++) e[t].updateWorldMatrix(!1, !0);
                }
            },
            toJSON: function (e) {
                const t = void 0 === e || "string" == typeof e,
                    n = {};
                t && ((e = { geometries: {}, materials: {}, textures: {}, images: {}, shapes: {} }), (n.metadata = { version: 4.5, type: "Object", generator: "Object3D.toJSON" }));
                const i = {};
                function r(t, n) {
                    return void 0 === t[n.uuid] && (t[n.uuid] = n.toJSON(e)), n.uuid;
                }
                if (
                    ((i.uuid = this.uuid),
                    (i.type = this.type),
                    "" !== this.name && (i.name = this.name),
                    !0 === this.castShadow && (i.castShadow = !0),
                    !0 === this.receiveShadow && (i.receiveShadow = !0),
                    !1 === this.visible && (i.visible = !1),
                    !1 === this.frustumCulled && (i.frustumCulled = !1),
                    0 !== this.renderOrder && (i.renderOrder = this.renderOrder),
                    "{}" !== JSON.stringify(this.userData) && (i.userData = this.userData),
                    (i.layers = this.layers.mask),
                    (i.matrix = this.matrix.toArray()),
                    !1 === this.matrixAutoUpdate && (i.matrixAutoUpdate = !1),
                    this.isInstancedMesh && ((i.type = "InstancedMesh"), (i.count = this.count), (i.instanceMatrix = this.instanceMatrix.toJSON())),
                    this.isMesh || this.isLine || this.isPoints)
                ) {
                    i.geometry = r(e.geometries, this.geometry);
                    const t = this.geometry.parameters;
                    if (void 0 !== t && void 0 !== t.shapes) {
                        const n = t.shapes;
                        if (Array.isArray(n))
                            for (let t = 0, i = n.length; t < i; t++) {
                                const i = n[t];
                                r(e.shapes, i);
                            }
                        else r(e.shapes, n);
                    }
                }
                if (void 0 !== this.material)
                    if (Array.isArray(this.material)) {
                        const t = [];
                        for (let n = 0, i = this.material.length; n < i; n++) t.push(r(e.materials, this.material[n]));
                        i.material = t;
                    } else i.material = r(e.materials, this.material);
                if (this.children.length > 0) {
                    i.children = [];
                    for (let t = 0; t < this.children.length; t++) i.children.push(this.children[t].toJSON(e).object);
                }
                if (t) {
                    const t = a(e.geometries),
                        i = a(e.materials),
                        r = a(e.textures),
                        o = a(e.images),
                        s = a(e.shapes);
                    t.length > 0 && (n.geometries = t), i.length > 0 && (n.materials = i), r.length > 0 && (n.textures = r), o.length > 0 && (n.images = o), s.length > 0 && (n.shapes = s);
                }
                return (n.object = i), n;
                function a(e) {
                    const t = [];
                    for (const n in e) {
                        const i = e[n];
                        delete i.metadata, t.push(i);
                    }
                    return t;
                }
            },
            clone: function (e) {
                return new this.constructor().copy(this, e);
            },
            copy: function (e, t) {
                if (
                    (void 0 === t && (t = !0),
                    (this.name = e.name),
                    this.up.copy(e.up),
                    this.position.copy(e.position),
                    (this.rotation.order = e.rotation.order),
                    this.quaternion.copy(e.quaternion),
                    this.scale.copy(e.scale),
                    this.matrix.copy(e.matrix),
                    this.matrixWorld.copy(e.matrixWorld),
                    (this.matrixAutoUpdate = e.matrixAutoUpdate),
                    (this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate),
                    (this.layers.mask = e.layers.mask),
                    (this.visible = e.visible),
                    (this.castShadow = e.castShadow),
                    (this.receiveShadow = e.receiveShadow),
                    (this.frustumCulled = e.frustumCulled),
                    (this.renderOrder = e.renderOrder),
                    (this.userData = JSON.parse(JSON.stringify(e.userData))),
                    !0 === t)
                )
                    for (let t = 0; t < e.children.length; t++) {
                        const n = e.children[t];
                        this.add(n.clone());
                    }
                return this;
            },
        }));
    const Be = new H(),
        He = new H(),
        ke = new I();
    class Ve {
        constructor(e, t) {
            Object.defineProperty(this, "isPlane", { value: !0 }), (this.normal = void 0 !== e ? e : new H(1, 0, 0)), (this.constant = void 0 !== t ? t : 0);
        }
        set(e, t) {
            return this.normal.copy(e), (this.constant = t), this;
        }
        setComponents(e, t, n, i) {
            return this.normal.set(e, t, n), (this.constant = i), this;
        }
        setFromNormalAndCoplanarPoint(e, t) {
            return this.normal.copy(e), (this.constant = -t.dot(this.normal)), this;
        }
        setFromCoplanarPoints(e, t, n) {
            const i = Be.subVectors(n, t).cross(He.subVectors(e, t)).normalize();
            return this.setFromNormalAndCoplanarPoint(i, e), this;
        }
        clone() {
            return new this.constructor().copy(this);
        }
        copy(e) {
            return this.normal.copy(e.normal), (this.constant = e.constant), this;
        }
        normalize() {
            const e = 1 / this.normal.length();
            return this.normal.multiplyScalar(e), (this.constant *= e), this;
        }
        negate() {
            return (this.constant *= -1), this.normal.negate(), this;
        }
        distanceToPoint(e) {
            return this.normal.dot(e) + this.constant;
        }
        distanceToSphere(e) {
            return this.distanceToPoint(e.center) - e.radius;
        }
        projectPoint(e, t) {
            return void 0 === t && (console.warn("THREE.Plane: .projectPoint() target is now required"), (t = new H())), t.copy(this.normal).multiplyScalar(-this.distanceToPoint(e)).add(e);
        }
        intersectLine(e, t) {
            void 0 === t && (console.warn("THREE.Plane: .intersectLine() target is now required"), (t = new H()));
            const n = e.delta(Be),
                i = this.normal.dot(n);
            if (0 === i) return 0 === this.distanceToPoint(e.start) ? t.copy(e.start) : void 0;
            const r = -(e.start.dot(this.normal) + this.constant) / i;
            return r < 0 || r > 1 ? void 0 : t.copy(n).multiplyScalar(r).add(e.start);
        }
        intersectsLine(e) {
            const t = this.distanceToPoint(e.start),
                n = this.distanceToPoint(e.end);
            return (t < 0 && n > 0) || (n < 0 && t > 0);
        }
        intersectsBox(e) {
            return e.intersectsPlane(this);
        }
        intersectsSphere(e) {
            return e.intersectsPlane(this);
        }
        coplanarPoint(e) {
            return void 0 === e && (console.warn("THREE.Plane: .coplanarPoint() target is now required"), (e = new H())), e.copy(this.normal).multiplyScalar(-this.constant);
        }
        applyMatrix4(e, t) {
            const n = t || ke.getNormalMatrix(e),
                i = this.coplanarPoint(Be).applyMatrix4(e),
                r = this.normal.applyMatrix3(n).normalize();
            return (this.constant = -i.dot(r)), this;
        }
        translate(e) {
            return (this.constant -= e.dot(this.normal)), this;
        }
        equals(e) {
            return e.normal.equals(this.normal) && e.constant === this.constant;
        }
    }
    const We = new H(),
        Xe = new H(),
        Ye = new H(),
        je = new H(),
        Qe = new H(),
        qe = new H(),
        Ze = new H(),
        Je = new H(),
        Ke = new H(),
        $e = new H();
    class et {
        constructor(e, t, n) {
            (this.a = void 0 !== e ? e : new H()), (this.b = void 0 !== t ? t : new H()), (this.c = void 0 !== n ? n : new H());
        }
        static getNormal(e, t, n, i) {
            void 0 === i && (console.warn("THREE.Triangle: .getNormal() target is now required"), (i = new H())), i.subVectors(n, t), We.subVectors(e, t), i.cross(We);
            const r = i.lengthSq();
            return r > 0 ? i.multiplyScalar(1 / Math.sqrt(r)) : i.set(0, 0, 0);
        }
        static getBarycoord(e, t, n, i, r) {
            We.subVectors(i, t), Xe.subVectors(n, t), Ye.subVectors(e, t);
            const a = We.dot(We),
                o = We.dot(Xe),
                s = We.dot(Ye),
                l = Xe.dot(Xe),
                c = Xe.dot(Ye),
                h = a * l - o * o;
            if ((void 0 === r && (console.warn("THREE.Triangle: .getBarycoord() target is now required"), (r = new H())), 0 === h)) return r.set(-2, -1, -1);
            const d = 1 / h,
                u = (l * s - o * c) * d,
                f = (a * c - o * s) * d;
            return r.set(1 - u - f, f, u);
        }
        static containsPoint(e, t, n, i) {
            return this.getBarycoord(e, t, n, i, je), je.x >= 0 && je.y >= 0 && je.x + je.y <= 1;
        }
        static getUV(e, t, n, i, r, a, o, s) {
            return this.getBarycoord(e, t, n, i, je), s.set(0, 0), s.addScaledVector(r, je.x), s.addScaledVector(a, je.y), s.addScaledVector(o, je.z), s;
        }
        static isFrontFacing(e, t, n, i) {
            return We.subVectors(n, t), Xe.subVectors(e, t), We.cross(Xe).dot(i) < 0;
        }
        set(e, t, n) {
            return this.a.copy(e), this.b.copy(t), this.c.copy(n), this;
        }
        setFromPointsAndIndices(e, t, n, i) {
            return this.a.copy(e[t]), this.b.copy(e[n]), this.c.copy(e[i]), this;
        }
        clone() {
            return new this.constructor().copy(this);
        }
        copy(e) {
            return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this;
        }
        getArea() {
            return We.subVectors(this.c, this.b), Xe.subVectors(this.a, this.b), 0.5 * We.cross(Xe).length();
        }
        getMidpoint(e) {
            return (
                void 0 === e && (console.warn("THREE.Triangle: .getMidpoint() target is now required"), (e = new H())),
                e
                    .addVectors(this.a, this.b)
                    .add(this.c)
                    .multiplyScalar(1 / 3)
            );
        }
        getNormal(e) {
            return et.getNormal(this.a, this.b, this.c, e);
        }
        getPlane(e) {
            return void 0 === e && (console.warn("THREE.Triangle: .getPlane() target is now required"), (e = new Ve())), e.setFromCoplanarPoints(this.a, this.b, this.c);
        }
        getBarycoord(e, t) {
            return et.getBarycoord(e, this.a, this.b, this.c, t);
        }
        getUV(e, t, n, i, r) {
            return et.getUV(e, this.a, this.b, this.c, t, n, i, r);
        }
        containsPoint(e) {
            return et.containsPoint(e, this.a, this.b, this.c);
        }
        isFrontFacing(e) {
            return et.isFrontFacing(this.a, this.b, this.c, e);
        }
        intersectsBox(e) {
            return e.intersectsTriangle(this);
        }
        closestPointToPoint(e, t) {
            void 0 === t && (console.warn("THREE.Triangle: .closestPointToPoint() target is now required"), (t = new H()));
            const n = this.a,
                i = this.b,
                r = this.c;
            let a, o;
            Qe.subVectors(i, n), qe.subVectors(r, n), Je.subVectors(e, n);
            const s = Qe.dot(Je),
                l = qe.dot(Je);
            if (s <= 0 && l <= 0) return t.copy(n);
            Ke.subVectors(e, i);
            const c = Qe.dot(Ke),
                h = qe.dot(Ke);
            if (c >= 0 && h <= c) return t.copy(i);
            const d = s * h - c * l;
            if (d <= 0 && s >= 0 && c <= 0) return (a = s / (s - c)), t.copy(n).addScaledVector(Qe, a);
            $e.subVectors(e, r);
            const u = Qe.dot($e),
                f = qe.dot($e);
            if (f >= 0 && u <= f) return t.copy(r);
            const p = u * l - s * f;
            if (p <= 0 && l >= 0 && f <= 0) return (o = l / (l - f)), t.copy(n).addScaledVector(qe, o);
            const m = c * f - u * h;
            if (m <= 0 && h - c >= 0 && u - f >= 0) return Ze.subVectors(r, i), (o = (h - c) / (h - c + (u - f))), t.copy(i).addScaledVector(Ze, o);
            const g = 1 / (m + p + d);
            return (a = p * g), (o = d * g), t.copy(n).addScaledVector(Qe, a).addScaledVector(qe, o);
        }
        equals(e) {
            return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c);
        }
    }
    const tt = {
            aliceblue: 15792383,
            antiquewhite: 16444375,
            aqua: 65535,
            aquamarine: 8388564,
            azure: 15794175,
            beige: 16119260,
            bisque: 16770244,
            black: 0,
            blanchedalmond: 16772045,
            blue: 255,
            blueviolet: 9055202,
            brown: 10824234,
            burlywood: 14596231,
            cadetblue: 6266528,
            chartreuse: 8388352,
            chocolate: 13789470,
            coral: 16744272,
            cornflowerblue: 6591981,
            cornsilk: 16775388,
            crimson: 14423100,
            cyan: 65535,
            darkblue: 139,
            darkcyan: 35723,
            darkgoldenrod: 12092939,
            darkgray: 11119017,
            darkgreen: 25600,
            darkgrey: 11119017,
            darkkhaki: 12433259,
            darkmagenta: 9109643,
            darkolivegreen: 5597999,
            darkorange: 16747520,
            darkorchid: 10040012,
            darkred: 9109504,
            darksalmon: 15308410,
            darkseagreen: 9419919,
            darkslateblue: 4734347,
            darkslategray: 3100495,
            darkslategrey: 3100495,
            darkturquoise: 52945,
            darkviolet: 9699539,
            deeppink: 16716947,
            deepskyblue: 49151,
            dimgray: 6908265,
            dimgrey: 6908265,
            dodgerblue: 2003199,
            firebrick: 11674146,
            floralwhite: 16775920,
            forestgreen: 2263842,
            fuchsia: 16711935,
            gainsboro: 14474460,
            ghostwhite: 16316671,
            gold: 16766720,
            goldenrod: 14329120,
            gray: 8421504,
            green: 32768,
            greenyellow: 11403055,
            grey: 8421504,
            honeydew: 15794160,
            hotpink: 16738740,
            indianred: 13458524,
            indigo: 4915330,
            ivory: 16777200,
            khaki: 15787660,
            lavender: 15132410,
            lavenderblush: 16773365,
            lawngreen: 8190976,
            lemonchiffon: 16775885,
            lightblue: 11393254,
            lightcoral: 15761536,
            lightcyan: 14745599,
            lightgoldenrodyellow: 16448210,
            lightgray: 13882323,
            lightgreen: 9498256,
            lightgrey: 13882323,
            lightpink: 16758465,
            lightsalmon: 16752762,
            lightseagreen: 2142890,
            lightskyblue: 8900346,
            lightslategray: 7833753,
            lightslategrey: 7833753,
            lightsteelblue: 11584734,
            lightyellow: 16777184,
            lime: 65280,
            limegreen: 3329330,
            linen: 16445670,
            magenta: 16711935,
            maroon: 8388608,
            mediumaquamarine: 6737322,
            mediumblue: 205,
            mediumorchid: 12211667,
            mediumpurple: 9662683,
            mediumseagreen: 3978097,
            mediumslateblue: 8087790,
            mediumspringgreen: 64154,
            mediumturquoise: 4772300,
            mediumvioletred: 13047173,
            midnightblue: 1644912,
            mintcream: 16121850,
            mistyrose: 16770273,
            moccasin: 16770229,
            navajowhite: 16768685,
            navy: 128,
            oldlace: 16643558,
            olive: 8421376,
            olivedrab: 7048739,
            orange: 16753920,
            orangered: 16729344,
            orchid: 14315734,
            palegoldenrod: 15657130,
            palegreen: 10025880,
            paleturquoise: 11529966,
            palevioletred: 14381203,
            papayawhip: 16773077,
            peachpuff: 16767673,
            peru: 13468991,
            pink: 16761035,
            plum: 14524637,
            powderblue: 11591910,
            purple: 8388736,
            rebeccapurple: 6697881,
            red: 16711680,
            rosybrown: 12357519,
            royalblue: 4286945,
            saddlebrown: 9127187,
            salmon: 16416882,
            sandybrown: 16032864,
            seagreen: 3050327,
            seashell: 16774638,
            sienna: 10506797,
            silver: 12632256,
            skyblue: 8900331,
            slateblue: 6970061,
            slategray: 7372944,
            slategrey: 7372944,
            snow: 16775930,
            springgreen: 65407,
            steelblue: 4620980,
            tan: 13808780,
            teal: 32896,
            thistle: 14204888,
            tomato: 16737095,
            turquoise: 4251856,
            violet: 15631086,
            wheat: 16113331,
            white: 16777215,
            whitesmoke: 16119285,
            yellow: 16776960,
            yellowgreen: 10145074,
        },
        nt = { h: 0, s: 0, l: 0 },
        it = { h: 0, s: 0, l: 0 };
    function rt(e, t, n) {
        return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + 6 * (t - e) * n : n < 0.5 ? t : n < 2 / 3 ? e + 6 * (t - e) * (2 / 3 - n) : e;
    }
    function at(e) {
        return e < 0.04045 ? 0.0773993808 * e : Math.pow(0.9478672986 * e + 0.0521327014, 2.4);
    }
    function ot(e) {
        return e < 0.0031308 ? 12.92 * e : 1.055 * Math.pow(e, 0.41666) - 0.055;
    }
    class st {
        constructor(e, t, n) {
            return Object.defineProperty(this, "isColor", { value: !0 }), void 0 === t && void 0 === n ? this.set(e) : this.setRGB(e, t, n);
        }
        set(e) {
            return e && e.isColor ? this.copy(e) : "number" == typeof e ? this.setHex(e) : "string" == typeof e && this.setStyle(e), this;
        }
        setScalar(e) {
            return (this.r = e), (this.g = e), (this.b = e), this;
        }
        setHex(e) {
            return (e = Math.floor(e)), (this.r = ((e >> 16) & 255) / 255), (this.g = ((e >> 8) & 255) / 255), (this.b = (255 & e) / 255), this;
        }
        setRGB(e, t, n) {
            return (this.r = e), (this.g = t), (this.b = n), this;
        }
        setHSL(e, t, n) {
            if (((e = N.euclideanModulo(e, 1)), (t = N.clamp(t, 0, 1)), (n = N.clamp(n, 0, 1)), 0 === t)) this.r = this.g = this.b = n;
            else {
                const i = n <= 0.5 ? n * (1 + t) : n + t - n * t,
                    r = 2 * n - i;
                (this.r = rt(r, i, e + 1 / 3)), (this.g = rt(r, i, e)), (this.b = rt(r, i, e - 1 / 3));
            }
            return this;
        }
        setStyle(e) {
            function t(t) {
                void 0 !== t && parseFloat(t) < 1 && console.warn("THREE.Color: Alpha component of " + e + " will be ignored.");
            }
            let n;
            if ((n = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(e))) {
                let e;
                const i = n[1],
                    r = n[2];
                switch (i) {
                    case "rgb":
                    case "rgba":
                        if ((e = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(r)))
                            return (this.r = Math.min(255, parseInt(e[1], 10)) / 255), (this.g = Math.min(255, parseInt(e[2], 10)) / 255), (this.b = Math.min(255, parseInt(e[3], 10)) / 255), t(e[5]), this;
                        if ((e = /^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(r)))
                            return (this.r = Math.min(100, parseInt(e[1], 10)) / 100), (this.g = Math.min(100, parseInt(e[2], 10)) / 100), (this.b = Math.min(100, parseInt(e[3], 10)) / 100), t(e[5]), this;
                        break;
                    case "hsl":
                    case "hsla":
                        if ((e = /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(r))) {
                            const n = parseFloat(e[1]) / 360,
                                i = parseInt(e[2], 10) / 100,
                                r = parseInt(e[3], 10) / 100;
                            return t(e[5]), this.setHSL(n, i, r);
                        }
                }
            } else if ((n = /^\#([A-Fa-f0-9]+)$/.exec(e))) {
                const e = n[1],
                    t = e.length;
                if (3 === t) return (this.r = parseInt(e.charAt(0) + e.charAt(0), 16) / 255), (this.g = parseInt(e.charAt(1) + e.charAt(1), 16) / 255), (this.b = parseInt(e.charAt(2) + e.charAt(2), 16) / 255), this;
                if (6 === t) return (this.r = parseInt(e.charAt(0) + e.charAt(1), 16) / 255), (this.g = parseInt(e.charAt(2) + e.charAt(3), 16) / 255), (this.b = parseInt(e.charAt(4) + e.charAt(5), 16) / 255), this;
            }
            return e && e.length > 0 ? this.setColorName(e) : this;
        }
        setColorName(e) {
            const t = tt[e];
            return void 0 !== t ? this.setHex(t) : console.warn("THREE.Color: Unknown color " + e), this;
        }
        clone() {
            return new this.constructor(this.r, this.g, this.b);
        }
        copy(e) {
            return (this.r = e.r), (this.g = e.g), (this.b = e.b), this;
        }
        copyGammaToLinear(e, t) {
            return void 0 === t && (t = 2), (this.r = Math.pow(e.r, t)), (this.g = Math.pow(e.g, t)), (this.b = Math.pow(e.b, t)), this;
        }
        copyLinearToGamma(e, t) {
            void 0 === t && (t = 2);
            const n = t > 0 ? 1 / t : 1;
            return (this.r = Math.pow(e.r, n)), (this.g = Math.pow(e.g, n)), (this.b = Math.pow(e.b, n)), this;
        }
        convertGammaToLinear(e) {
            return this.copyGammaToLinear(this, e), this;
        }
        convertLinearToGamma(e) {
            return this.copyLinearToGamma(this, e), this;
        }
        copySRGBToLinear(e) {
            return (this.r = at(e.r)), (this.g = at(e.g)), (this.b = at(e.b)), this;
        }
        copyLinearToSRGB(e) {
            return (this.r = ot(e.r)), (this.g = ot(e.g)), (this.b = ot(e.b)), this;
        }
        convertSRGBToLinear() {
            return this.copySRGBToLinear(this), this;
        }
        convertLinearToSRGB() {
            return this.copyLinearToSRGB(this), this;
        }
        getHex() {
            return ((255 * this.r) << 16) ^ ((255 * this.g) << 8) ^ ((255 * this.b) << 0);
        }
        getHexString() {
            return ("000000" + this.getHex().toString(16)).slice(-6);
        }
        getHSL(e) {
            void 0 === e && (console.warn("THREE.Color: .getHSL() target is now required"), (e = { h: 0, s: 0, l: 0 }));
            const t = this.r,
                n = this.g,
                i = this.b,
                r = Math.max(t, n, i),
                a = Math.min(t, n, i);
            let o, s;
            const l = (a + r) / 2;
            if (a === r) (o = 0), (s = 0);
            else {
                const e = r - a;
                switch (((s = l <= 0.5 ? e / (r + a) : e / (2 - r - a)), r)) {
                    case t:
                        o = (n - i) / e + (n < i ? 6 : 0);
                        break;
                    case n:
                        o = (i - t) / e + 2;
                        break;
                    case i:
                        o = (t - n) / e + 4;
                }
                o /= 6;
            }
            return (e.h = o), (e.s = s), (e.l = l), e;
        }
        getStyle() {
            return "rgb(" + ((255 * this.r) | 0) + "," + ((255 * this.g) | 0) + "," + ((255 * this.b) | 0) + ")";
        }
        offsetHSL(e, t, n) {
            return this.getHSL(nt), (nt.h += e), (nt.s += t), (nt.l += n), this.setHSL(nt.h, nt.s, nt.l), this;
        }
        add(e) {
            return (this.r += e.r), (this.g += e.g), (this.b += e.b), this;
        }
        addColors(e, t) {
            return (this.r = e.r + t.r), (this.g = e.g + t.g), (this.b = e.b + t.b), this;
        }
        addScalar(e) {
            return (this.r += e), (this.g += e), (this.b += e), this;
        }
        sub(e) {
            return (this.r = Math.max(0, this.r - e.r)), (this.g = Math.max(0, this.g - e.g)), (this.b = Math.max(0, this.b - e.b)), this;
        }
        multiply(e) {
            return (this.r *= e.r), (this.g *= e.g), (this.b *= e.b), this;
        }
        multiplyScalar(e) {
            return (this.r *= e), (this.g *= e), (this.b *= e), this;
        }
        lerp(e, t) {
            return (this.r += (e.r - this.r) * t), (this.g += (e.g - this.g) * t), (this.b += (e.b - this.b) * t), this;
        }
        lerpHSL(e, t) {
            this.getHSL(nt), e.getHSL(it);
            const n = N.lerp(nt.h, it.h, t),
                i = N.lerp(nt.s, it.s, t),
                r = N.lerp(nt.l, it.l, t);
            return this.setHSL(n, i, r), this;
        }
        equals(e) {
            return e.r === this.r && e.g === this.g && e.b === this.b;
        }
        fromArray(e, t = 0) {
            return (this.r = e[t]), (this.g = e[t + 1]), (this.b = e[t + 2]), this;
        }
        toArray(e = [], t = 0) {
            return (e[t] = this.r), (e[t + 1] = this.g), (e[t + 2] = this.b), e;
        }
        fromBufferAttribute(e, t) {
            return (this.r = e.getX(t)), (this.g = e.getY(t)), (this.b = e.getZ(t)), !0 === e.normalized && ((this.r /= 255), (this.g /= 255), (this.b /= 255)), this;
        }
        toJSON() {
            return this.getHex();
        }
    }
    (st.NAMES = tt), (st.prototype.r = 1), (st.prototype.g = 1), (st.prototype.b = 1);
    class lt {
        constructor(e, t, n, i, r, a) {
            (this.a = e),
                (this.b = t),
                (this.c = n),
                (this.normal = i && i.isVector3 ? i : new H()),
                (this.vertexNormals = Array.isArray(i) ? i : []),
                (this.color = r && r.isColor ? r : new st()),
                (this.vertexColors = Array.isArray(r) ? r : []),
                (this.materialIndex = void 0 !== a ? a : 0);
        }
        clone() {
            return new this.constructor().copy(this);
        }
        copy(e) {
            (this.a = e.a), (this.b = e.b), (this.c = e.c), this.normal.copy(e.normal), this.color.copy(e.color), (this.materialIndex = e.materialIndex);
            for (let t = 0, n = e.vertexNormals.length; t < n; t++) this.vertexNormals[t] = e.vertexNormals[t].clone();
            for (let t = 0, n = e.vertexColors.length; t < n; t++) this.vertexColors[t] = e.vertexColors[t].clone();
            return this;
        }
    }
    let ct = 0;
    function ht() {
        Object.defineProperty(this, "id", { value: ct++ }),
            (this.uuid = N.generateUUID()),
            (this.name = ""),
            (this.type = "Material"),
            (this.fog = !0),
            (this.blending = 1),
            (this.side = 0),
            (this.flatShading = !1),
            (this.vertexColors = !1),
            (this.opacity = 1),
            (this.transparent = !1),
            (this.blendSrc = 204),
            (this.blendDst = 205),
            (this.blendEquation = l),
            (this.blendSrcAlpha = null),
            (this.blendDstAlpha = null),
            (this.blendEquationAlpha = null),
            (this.depthFunc = 3),
            (this.depthTest = !0),
            (this.depthWrite = !0),
            (this.stencilWriteMask = 255),
            (this.stencilFunc = 519),
            (this.stencilRef = 0),
            (this.stencilFuncMask = 255),
            (this.stencilFail = T),
            (this.stencilZFail = T),
            (this.stencilZPass = T),
            (this.stencilWrite = !1),
            (this.clippingPlanes = null),
            (this.clipIntersection = !1),
            (this.clipShadows = !1),
            (this.shadowSide = null),
            (this.colorWrite = !0),
            (this.precision = null),
            (this.polygonOffset = !1),
            (this.polygonOffsetFactor = 0),
            (this.polygonOffsetUnits = 0),
            (this.dithering = !1),
            (this.alphaTest = 0),
            (this.premultipliedAlpha = !1),
            (this.visible = !0),
            (this.toneMapped = !0),
            (this.userData = {}),
            (this.version = 0);
    }
    function dt(e) {
        ht.call(this),
            (this.type = "MeshBasicMaterial"),
            (this.color = new st(16777215)),
            (this.map = null),
            (this.lightMap = null),
            (this.lightMapIntensity = 1),
            (this.aoMap = null),
            (this.aoMapIntensity = 1),
            (this.specularMap = null),
            (this.alphaMap = null),
            (this.envMap = null),
            (this.combine = 0),
            (this.reflectivity = 1),
            (this.refractionRatio = 0.98),
            (this.wireframe = !1),
            (this.wireframeLinewidth = 1),
            (this.wireframeLinecap = "round"),
            (this.wireframeLinejoin = "round"),
            (this.skinning = !1),
            (this.morphTargets = !1),
            this.setValues(e);
    }
    (ht.prototype = Object.assign(Object.create(E.prototype), {
        constructor: ht,
        isMaterial: !0,
        onBeforeCompile: function () {},
        customProgramCacheKey: function () {
            return this.onBeforeCompile.toString();
        },
        setValues: function (e) {
            if (void 0 !== e)
                for (const t in e) {
                    const n = e[t];
                    if (void 0 === n) {
                        console.warn("THREE.Material: '" + t + "' parameter is undefined.");
                        continue;
                    }
                    if ("shading" === t) {
                        console.warn("THREE." + this.type + ": .shading has been removed. Use the boolean .flatShading instead."), (this.flatShading = 1 === n);
                        continue;
                    }
                    const i = this[t];
                    void 0 !== i ? (i && i.isColor ? i.set(n) : i && i.isVector3 && n && n.isVector3 ? i.copy(n) : (this[t] = n)) : console.warn("THREE." + this.type + ": '" + t + "' is not a property of this material.");
                }
        },
        toJSON: function (e) {
            const t = void 0 === e || "string" == typeof e;
            t && (e = { textures: {}, images: {} });
            const n = { metadata: { version: 4.5, type: "Material", generator: "Material.toJSON" } };
            function i(e) {
                const t = [];
                for (const n in e) {
                    const i = e[n];
                    delete i.metadata, t.push(i);
                }
                return t;
            }
            if (
                ((n.uuid = this.uuid),
                (n.type = this.type),
                "" !== this.name && (n.name = this.name),
                this.color && this.color.isColor && (n.color = this.color.getHex()),
                void 0 !== this.roughness && (n.roughness = this.roughness),
                void 0 !== this.metalness && (n.metalness = this.metalness),
                this.sheen && this.sheen.isColor && (n.sheen = this.sheen.getHex()),
                this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()),
                this.emissiveIntensity && 1 !== this.emissiveIntensity && (n.emissiveIntensity = this.emissiveIntensity),
                this.specular && this.specular.isColor && (n.specular = this.specular.getHex()),
                void 0 !== this.shininess && (n.shininess = this.shininess),
                void 0 !== this.clearcoat && (n.clearcoat = this.clearcoat),
                void 0 !== this.clearcoatRoughness && (n.clearcoatRoughness = this.clearcoatRoughness),
                this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(e).uuid),
                this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid),
                this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && ((n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid), (n.clearcoatNormalScale = this.clearcoatNormalScale.toArray())),
                this.map && this.map.isTexture && (n.map = this.map.toJSON(e).uuid),
                this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(e).uuid),
                this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(e).uuid),
                this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(e).uuid),
                this.aoMap && this.aoMap.isTexture && ((n.aoMap = this.aoMap.toJSON(e).uuid), (n.aoMapIntensity = this.aoMapIntensity)),
                this.bumpMap && this.bumpMap.isTexture && ((n.bumpMap = this.bumpMap.toJSON(e).uuid), (n.bumpScale = this.bumpScale)),
                this.normalMap && this.normalMap.isTexture && ((n.normalMap = this.normalMap.toJSON(e).uuid), (n.normalMapType = this.normalMapType), (n.normalScale = this.normalScale.toArray())),
                this.displacementMap && this.displacementMap.isTexture && ((n.displacementMap = this.displacementMap.toJSON(e).uuid), (n.displacementScale = this.displacementScale), (n.displacementBias = this.displacementBias)),
                this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(e).uuid),
                this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(e).uuid),
                this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(e).uuid),
                this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(e).uuid),
                this.envMap &&
                    this.envMap.isTexture &&
                    ((n.envMap = this.envMap.toJSON(e).uuid),
                    (n.reflectivity = this.reflectivity),
                    (n.refractionRatio = this.refractionRatio),
                    void 0 !== this.combine && (n.combine = this.combine),
                    void 0 !== this.envMapIntensity && (n.envMapIntensity = this.envMapIntensity)),
                this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(e).uuid),
                void 0 !== this.size && (n.size = this.size),
                void 0 !== this.sizeAttenuation && (n.sizeAttenuation = this.sizeAttenuation),
                1 !== this.blending && (n.blending = this.blending),
                !0 === this.flatShading && (n.flatShading = this.flatShading),
                0 !== this.side && (n.side = this.side),
                this.vertexColors && (n.vertexColors = !0),
                this.opacity < 1 && (n.opacity = this.opacity),
                !0 === this.transparent && (n.transparent = this.transparent),
                (n.depthFunc = this.depthFunc),
                (n.depthTest = this.depthTest),
                (n.depthWrite = this.depthWrite),
                (n.stencilWrite = this.stencilWrite),
                (n.stencilWriteMask = this.stencilWriteMask),
                (n.stencilFunc = this.stencilFunc),
                (n.stencilRef = this.stencilRef),
                (n.stencilFuncMask = this.stencilFuncMask),
                (n.stencilFail = this.stencilFail),
                (n.stencilZFail = this.stencilZFail),
                (n.stencilZPass = this.stencilZPass),
                this.rotation && 0 !== this.rotation && (n.rotation = this.rotation),
                !0 === this.polygonOffset && (n.polygonOffset = !0),
                0 !== this.polygonOffsetFactor && (n.polygonOffsetFactor = this.polygonOffsetFactor),
                0 !== this.polygonOffsetUnits && (n.polygonOffsetUnits = this.polygonOffsetUnits),
                this.linewidth && 1 !== this.linewidth && (n.linewidth = this.linewidth),
                void 0 !== this.dashSize && (n.dashSize = this.dashSize),
                void 0 !== this.gapSize && (n.gapSize = this.gapSize),
                void 0 !== this.scale && (n.scale = this.scale),
                !0 === this.dithering && (n.dithering = !0),
                this.alphaTest > 0 && (n.alphaTest = this.alphaTest),
                !0 === this.premultipliedAlpha && (n.premultipliedAlpha = this.premultipliedAlpha),
                !0 === this.wireframe && (n.wireframe = this.wireframe),
                this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth),
                "round" !== this.wireframeLinecap && (n.wireframeLinecap = this.wireframeLinecap),
                "round" !== this.wireframeLinejoin && (n.wireframeLinejoin = this.wireframeLinejoin),
                !0 === this.morphTargets && (n.morphTargets = !0),
                !0 === this.morphNormals && (n.morphNormals = !0),
                !0 === this.skinning && (n.skinning = !0),
                !1 === this.visible && (n.visible = !1),
                !1 === this.toneMapped && (n.toneMapped = !1),
                "{}" !== JSON.stringify(this.userData) && (n.userData = this.userData),
                t)
            ) {
                const t = i(e.textures),
                    r = i(e.images);
                t.length > 0 && (n.textures = t), r.length > 0 && (n.images = r);
            }
            return n;
        },
        clone: function () {
            return new this.constructor().copy(this);
        },
        copy: function (e) {
            (this.name = e.name),
                (this.fog = e.fog),
                (this.blending = e.blending),
                (this.side = e.side),
                (this.flatShading = e.flatShading),
                (this.vertexColors = e.vertexColors),
                (this.opacity = e.opacity),
                (this.transparent = e.transparent),
                (this.blendSrc = e.blendSrc),
                (this.blendDst = e.blendDst),
                (this.blendEquation = e.blendEquation),
                (this.blendSrcAlpha = e.blendSrcAlpha),
                (this.blendDstAlpha = e.blendDstAlpha),
                (this.blendEquationAlpha = e.blendEquationAlpha),
                (this.depthFunc = e.depthFunc),
                (this.depthTest = e.depthTest),
                (this.depthWrite = e.depthWrite),
                (this.stencilWriteMask = e.stencilWriteMask),
                (this.stencilFunc = e.stencilFunc),
                (this.stencilRef = e.stencilRef),
                (this.stencilFuncMask = e.stencilFuncMask),
                (this.stencilFail = e.stencilFail),
                (this.stencilZFail = e.stencilZFail),
                (this.stencilZPass = e.stencilZPass),
                (this.stencilWrite = e.stencilWrite);
            const t = e.clippingPlanes;
            let n = null;
            if (null !== t) {
                const e = t.length;
                n = new Array(e);
                for (let i = 0; i !== e; ++i) n[i] = t[i].clone();
            }
            return (
                (this.clippingPlanes = n),
                (this.clipIntersection = e.clipIntersection),
                (this.clipShadows = e.clipShadows),
                (this.shadowSide = e.shadowSide),
                (this.colorWrite = e.colorWrite),
                (this.precision = e.precision),
                (this.polygonOffset = e.polygonOffset),
                (this.polygonOffsetFactor = e.polygonOffsetFactor),
                (this.polygonOffsetUnits = e.polygonOffsetUnits),
                (this.dithering = e.dithering),
                (this.alphaTest = e.alphaTest),
                (this.premultipliedAlpha = e.premultipliedAlpha),
                (this.visible = e.visible),
                (this.toneMapped = e.toneMapped),
                (this.userData = JSON.parse(JSON.stringify(e.userData))),
                this
            );
        },
        dispose: function () {
            this.dispatchEvent({ type: "dispose" });
        },
    })),
        Object.defineProperty(ht.prototype, "needsUpdate", {
            set: function (e) {
                !0 === e && this.version++;
            },
        }),
        (dt.prototype = Object.create(ht.prototype)),
        (dt.prototype.constructor = dt),
        (dt.prototype.isMeshBasicMaterial = !0),
        (dt.prototype.copy = function (e) {
            return (
                ht.prototype.copy.call(this, e),
                this.color.copy(e.color),
                (this.map = e.map),
                (this.lightMap = e.lightMap),
                (this.lightMapIntensity = e.lightMapIntensity),
                (this.aoMap = e.aoMap),
                (this.aoMapIntensity = e.aoMapIntensity),
                (this.specularMap = e.specularMap),
                (this.alphaMap = e.alphaMap),
                (this.envMap = e.envMap),
                (this.combine = e.combine),
                (this.reflectivity = e.reflectivity),
                (this.refractionRatio = e.refractionRatio),
                (this.wireframe = e.wireframe),
                (this.wireframeLinewidth = e.wireframeLinewidth),
                (this.wireframeLinecap = e.wireframeLinecap),
                (this.wireframeLinejoin = e.wireframeLinejoin),
                (this.skinning = e.skinning),
                (this.morphTargets = e.morphTargets),
                this
            );
        });
    const ut = new H(),
        ft = new C();
    function pt(e, t, n) {
        if (Array.isArray(e)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
        (this.name = ""), (this.array = e), (this.itemSize = t), (this.count = void 0 !== e ? e.length / t : 0), (this.normalized = !0 === n), (this.usage = 35044), (this.updateRange = { offset: 0, count: -1 }), (this.version = 0);
    }
    function mt(e, t, n) {
        pt.call(this, new Int8Array(e), t, n);
    }
    function gt(e, t, n) {
        pt.call(this, new Uint8Array(e), t, n);
    }
    function xt(e, t, n) {
        pt.call(this, new Uint8ClampedArray(e), t, n);
    }
    function vt(e, t, n) {
        pt.call(this, new Int16Array(e), t, n);
    }
    function _t(e, t, n) {
        pt.call(this, new Uint16Array(e), t, n);
    }
    function yt(e, t, n) {
        pt.call(this, new Int32Array(e), t, n);
    }
    function Mt(e, t, n) {
        pt.call(this, new Uint32Array(e), t, n);
    }
    function bt(e, t, n) {
        pt.call(this, new Float32Array(e), t, n);
    }
    function wt(e, t, n) {
        pt.call(this, new Float64Array(e), t, n);
    }
    Object.defineProperty(pt.prototype, "needsUpdate", {
        set: function (e) {
            !0 === e && this.version++;
        },
    }),
        Object.assign(pt.prototype, {
            isBufferAttribute: !0,
            onUploadCallback: function () {},
            setUsage: function (e) {
                return (this.usage = e), this;
            },
            copy: function (e) {
                return (this.name = e.name), (this.array = new e.array.constructor(e.array)), (this.itemSize = e.itemSize), (this.count = e.count), (this.normalized = e.normalized), (this.usage = e.usage), this;
            },
            copyAt: function (e, t, n) {
                (e *= this.itemSize), (n *= t.itemSize);
                for (let i = 0, r = this.itemSize; i < r; i++) this.array[e + i] = t.array[n + i];
                return this;
            },
            copyArray: function (e) {
                return this.array.set(e), this;
            },
            copyColorsArray: function (e) {
                const t = this.array;
                let n = 0;
                for (let i = 0, r = e.length; i < r; i++) {
                    let r = e[i];
                    void 0 === r && (console.warn("THREE.BufferAttribute.copyColorsArray(): color is undefined", i), (r = new st())), (t[n++] = r.r), (t[n++] = r.g), (t[n++] = r.b);
                }
                return this;
            },
            copyVector2sArray: function (e) {
                const t = this.array;
                let n = 0;
                for (let i = 0, r = e.length; i < r; i++) {
                    let r = e[i];
                    void 0 === r && (console.warn("THREE.BufferAttribute.copyVector2sArray(): vector is undefined", i), (r = new C())), (t[n++] = r.x), (t[n++] = r.y);
                }
                return this;
            },
            copyVector3sArray: function (e) {
                const t = this.array;
                let n = 0;
                for (let i = 0, r = e.length; i < r; i++) {
                    let r = e[i];
                    void 0 === r && (console.warn("THREE.BufferAttribute.copyVector3sArray(): vector is undefined", i), (r = new H())), (t[n++] = r.x), (t[n++] = r.y), (t[n++] = r.z);
                }
                return this;
            },
            copyVector4sArray: function (e) {
                const t = this.array;
                let n = 0;
                for (let i = 0, r = e.length; i < r; i++) {
                    let r = e[i];
                    void 0 === r && (console.warn("THREE.BufferAttribute.copyVector4sArray(): vector is undefined", i), (r = new z())), (t[n++] = r.x), (t[n++] = r.y), (t[n++] = r.z), (t[n++] = r.w);
                }
                return this;
            },
            applyMatrix3: function (e) {
                if (2 === this.itemSize) for (let t = 0, n = this.count; t < n; t++) ft.fromBufferAttribute(this, t), ft.applyMatrix3(e), this.setXY(t, ft.x, ft.y);
                else if (3 === this.itemSize) for (let t = 0, n = this.count; t < n; t++) ut.fromBufferAttribute(this, t), ut.applyMatrix3(e), this.setXYZ(t, ut.x, ut.y, ut.z);
                return this;
            },
            applyMatrix4: function (e) {
                for (let t = 0, n = this.count; t < n; t++) (ut.x = this.getX(t)), (ut.y = this.getY(t)), (ut.z = this.getZ(t)), ut.applyMatrix4(e), this.setXYZ(t, ut.x, ut.y, ut.z);
                return this;
            },
            applyNormalMatrix: function (e) {
                for (let t = 0, n = this.count; t < n; t++) (ut.x = this.getX(t)), (ut.y = this.getY(t)), (ut.z = this.getZ(t)), ut.applyNormalMatrix(e), this.setXYZ(t, ut.x, ut.y, ut.z);
                return this;
            },
            transformDirection: function (e) {
                for (let t = 0, n = this.count; t < n; t++) (ut.x = this.getX(t)), (ut.y = this.getY(t)), (ut.z = this.getZ(t)), ut.transformDirection(e), this.setXYZ(t, ut.x, ut.y, ut.z);
                return this;
            },
            set: function (e, t) {
                return void 0 === t && (t = 0), this.array.set(e, t), this;
            },
            getX: function (e) {
                return this.array[e * this.itemSize];
            },
            setX: function (e, t) {
                return (this.array[e * this.itemSize] = t), this;
            },
            getY: function (e) {
                return this.array[e * this.itemSize + 1];
            },
            setY: function (e, t) {
                return (this.array[e * this.itemSize + 1] = t), this;
            },
            getZ: function (e) {
                return this.array[e * this.itemSize + 2];
            },
            setZ: function (e, t) {
                return (this.array[e * this.itemSize + 2] = t), this;
            },
            getW: function (e) {
                return this.array[e * this.itemSize + 3];
            },
            setW: function (e, t) {
                return (this.array[e * this.itemSize + 3] = t), this;
            },
            setXY: function (e, t, n) {
                return (e *= this.itemSize), (this.array[e + 0] = t), (this.array[e + 1] = n), this;
            },
            setXYZ: function (e, t, n, i) {
                return (e *= this.itemSize), (this.array[e + 0] = t), (this.array[e + 1] = n), (this.array[e + 2] = i), this;
            },
            setXYZW: function (e, t, n, i, r) {
                return (e *= this.itemSize), (this.array[e + 0] = t), (this.array[e + 1] = n), (this.array[e + 2] = i), (this.array[e + 3] = r), this;
            },
            onUpload: function (e) {
                return (this.onUploadCallback = e), this;
            },
            clone: function () {
                return new this.constructor(this.array, this.itemSize).copy(this);
            },
            toJSON: function () {
                return { itemSize: this.itemSize, type: this.array.constructor.name, array: Array.prototype.slice.call(this.array), normalized: this.normalized };
            },
        }),
        (mt.prototype = Object.create(pt.prototype)),
        (mt.prototype.constructor = mt),
        (gt.prototype = Object.create(pt.prototype)),
        (gt.prototype.constructor = gt),
        (xt.prototype = Object.create(pt.prototype)),
        (xt.prototype.constructor = xt),
        (vt.prototype = Object.create(pt.prototype)),
        (vt.prototype.constructor = vt),
        (_t.prototype = Object.create(pt.prototype)),
        (_t.prototype.constructor = _t),
        (yt.prototype = Object.create(pt.prototype)),
        (yt.prototype.constructor = yt),
        (Mt.prototype = Object.create(pt.prototype)),
        (Mt.prototype.constructor = Mt),
        (bt.prototype = Object.create(pt.prototype)),
        (bt.prototype.constructor = bt),
        (wt.prototype = Object.create(pt.prototype)),
        (wt.prototype.constructor = wt);
    class At {
        constructor() {
            (this.vertices = []),
                (this.normals = []),
                (this.colors = []),
                (this.uvs = []),
                (this.uvs2 = []),
                (this.groups = []),
                (this.morphTargets = {}),
                (this.skinWeights = []),
                (this.skinIndices = []),
                (this.boundingBox = null),
                (this.boundingSphere = null),
                (this.verticesNeedUpdate = !1),
                (this.normalsNeedUpdate = !1),
                (this.colorsNeedUpdate = !1),
                (this.uvsNeedUpdate = !1),
                (this.groupsNeedUpdate = !1);
        }
        computeGroups(e) {
            const t = [];
            let n,
                i,
                r = void 0;
            const a = e.faces;
            for (i = 0; i < a.length; i++) {
                const e = a[i];
                e.materialIndex !== r && ((r = e.materialIndex), void 0 !== n && ((n.count = 3 * i - n.start), t.push(n)), (n = { start: 3 * i, materialIndex: r }));
            }
            void 0 !== n && ((n.count = 3 * i - n.start), t.push(n)), (this.groups = t);
        }
        fromGeometry(e) {
            const t = e.faces,
                n = e.vertices,
                i = e.faceVertexUvs,
                r = i[0] && i[0].length > 0,
                a = i[1] && i[1].length > 0,
                o = e.morphTargets,
                s = o.length;
            let l;
            if (s > 0) {
                l = [];
                for (let e = 0; e < s; e++) l[e] = { name: o[e].name, data: [] };
                this.morphTargets.position = l;
            }
            const c = e.morphNormals,
                h = c.length;
            let d;
            if (h > 0) {
                d = [];
                for (let e = 0; e < h; e++) d[e] = { name: c[e].name, data: [] };
                this.morphTargets.normal = d;
            }
            const u = e.skinIndices,
                f = e.skinWeights,
                p = u.length === n.length,
                m = f.length === n.length;
            n.length > 0 && 0 === t.length && console.error("THREE.DirectGeometry: Faceless geometries are not supported.");
            for (let e = 0; e < t.length; e++) {
                const g = t[e];
                this.vertices.push(n[g.a], n[g.b], n[g.c]);
                const x = g.vertexNormals;
                if (3 === x.length) this.normals.push(x[0], x[1], x[2]);
                else {
                    const e = g.normal;
                    this.normals.push(e, e, e);
                }
                const v = g.vertexColors;
                if (3 === v.length) this.colors.push(v[0], v[1], v[2]);
                else {
                    const e = g.color;
                    this.colors.push(e, e, e);
                }
                if (!0 === r) {
                    const t = i[0][e];
                    void 0 !== t ? this.uvs.push(t[0], t[1], t[2]) : (console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv ", e), this.uvs.push(new C(), new C(), new C()));
                }
                if (!0 === a) {
                    const t = i[1][e];
                    void 0 !== t ? this.uvs2.push(t[0], t[1], t[2]) : (console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv2 ", e), this.uvs2.push(new C(), new C(), new C()));
                }
                for (let e = 0; e < s; e++) {
                    const t = o[e].vertices;
                    l[e].data.push(t[g.a], t[g.b], t[g.c]);
                }
                for (let t = 0; t < h; t++) {
                    const n = c[t].vertexNormals[e];
                    d[t].data.push(n.a, n.b, n.c);
                }
                p && this.skinIndices.push(u[g.a], u[g.b], u[g.c]), m && this.skinWeights.push(f[g.a], f[g.b], f[g.c]);
            }
            return (
                this.computeGroups(e),
                (this.verticesNeedUpdate = e.verticesNeedUpdate),
                (this.normalsNeedUpdate = e.normalsNeedUpdate),
                (this.colorsNeedUpdate = e.colorsNeedUpdate),
                (this.uvsNeedUpdate = e.uvsNeedUpdate),
                (this.groupsNeedUpdate = e.groupsNeedUpdate),
                null !== e.boundingSphere && (this.boundingSphere = e.boundingSphere.clone()),
                null !== e.boundingBox && (this.boundingBox = e.boundingBox.clone()),
                this
            );
        }
    }
    function St(e) {
        if (0 === e.length) return -1 / 0;
        let t = e[0];
        for (let n = 1, i = e.length; n < i; ++n) e[n] > t && (t = e[n]);
        return t;
    }
    let Tt = 1;
    const Lt = new pe(),
        Et = new Ge(),
        Pt = new H(),
        Ft = new W(),
        Nt = new W(),
        Ct = new H();
    function It() {
        Object.defineProperty(this, "id", { value: (Tt += 2) }),
            (this.uuid = N.generateUUID()),
            (this.name = ""),
            (this.type = "BufferGeometry"),
            (this.index = null),
            (this.attributes = {}),
            (this.morphAttributes = {}),
            (this.morphTargetsRelative = !1),
            (this.groups = []),
            (this.boundingBox = null),
            (this.boundingSphere = null),
            (this.drawRange = { start: 0, count: 1 / 0 }),
            (this.userData = {});
    }
    It.prototype = Object.assign(Object.create(E.prototype), {
        constructor: It,
        isBufferGeometry: !0,
        getIndex: function () {
            return this.index;
        },
        setIndex: function (e) {
            return Array.isArray(e) ? (this.index = new (St(e) > 65535 ? Mt : _t)(e, 1)) : (this.index = e), this;
        },
        getAttribute: function (e) {
            return this.attributes[e];
        },
        setAttribute: function (e, t) {
            return (this.attributes[e] = t), this;
        },
        deleteAttribute: function (e) {
            return delete this.attributes[e], this;
        },
        addGroup: function (e, t, n) {
            this.groups.push({ start: e, count: t, materialIndex: void 0 !== n ? n : 0 });
        },
        clearGroups: function () {
            this.groups = [];
        },
        setDrawRange: function (e, t) {
            (this.drawRange.start = e), (this.drawRange.count = t);
        },
        applyMatrix4: function (e) {
            const t = this.attributes.position;
            void 0 !== t && (t.applyMatrix4(e), (t.needsUpdate = !0));
            const n = this.attributes.normal;
            if (void 0 !== n) {
                const t = new I().getNormalMatrix(e);
                n.applyNormalMatrix(t), (n.needsUpdate = !0);
            }
            const i = this.attributes.tangent;
            return void 0 !== i && (i.transformDirection(e), (i.needsUpdate = !0)), null !== this.boundingBox && this.computeBoundingBox(), null !== this.boundingSphere && this.computeBoundingSphere(), this;
        },
        rotateX: function (e) {
            return Lt.makeRotationX(e), this.applyMatrix4(Lt), this;
        },
        rotateY: function (e) {
            return Lt.makeRotationY(e), this.applyMatrix4(Lt), this;
        },
        rotateZ: function (e) {
            return Lt.makeRotationZ(e), this.applyMatrix4(Lt), this;
        },
        translate: function (e, t, n) {
            return Lt.makeTranslation(e, t, n), this.applyMatrix4(Lt), this;
        },
        scale: function (e, t, n) {
            return Lt.makeScale(e, t, n), this.applyMatrix4(Lt), this;
        },
        lookAt: function (e) {
            return Et.lookAt(e), Et.updateMatrix(), this.applyMatrix4(Et.matrix), this;
        },
        center: function () {
            return this.computeBoundingBox(), this.boundingBox.getCenter(Pt).negate(), this.translate(Pt.x, Pt.y, Pt.z), this;
        },
        setFromObject: function (e) {
            const t = e.geometry;
            if (e.isPoints || e.isLine) {
                const e = new bt(3 * t.vertices.length, 3),
                    n = new bt(3 * t.colors.length, 3);
                if ((this.setAttribute("position", e.copyVector3sArray(t.vertices)), this.setAttribute("color", n.copyColorsArray(t.colors)), t.lineDistances && t.lineDistances.length === t.vertices.length)) {
                    const e = new bt(t.lineDistances.length, 1);
                    this.setAttribute("lineDistance", e.copyArray(t.lineDistances));
                }
                null !== t.boundingSphere && (this.boundingSphere = t.boundingSphere.clone()), null !== t.boundingBox && (this.boundingBox = t.boundingBox.clone());
            } else e.isMesh && t && t.isGeometry && this.fromGeometry(t);
            return this;
        },
        setFromPoints: function (e) {
            const t = [];
            for (let n = 0, i = e.length; n < i; n++) {
                const i = e[n];
                t.push(i.x, i.y, i.z || 0);
            }
            return this.setAttribute("position", new bt(t, 3)), this;
        },
        updateFromObject: function (e) {
            let t = e.geometry;
            if (e.isMesh) {
                let e = t.__directGeometry;
                if ((!0 === t.elementsNeedUpdate && ((e = void 0), (t.elementsNeedUpdate = !1)), void 0 === e)) return this.fromGeometry(t);
                (e.verticesNeedUpdate = t.verticesNeedUpdate),
                    (e.normalsNeedUpdate = t.normalsNeedUpdate),
                    (e.colorsNeedUpdate = t.colorsNeedUpdate),
                    (e.uvsNeedUpdate = t.uvsNeedUpdate),
                    (e.groupsNeedUpdate = t.groupsNeedUpdate),
                    (t.verticesNeedUpdate = !1),
                    (t.normalsNeedUpdate = !1),
                    (t.colorsNeedUpdate = !1),
                    (t.uvsNeedUpdate = !1),
                    (t.groupsNeedUpdate = !1),
                    (t = e);
            }
            if (!0 === t.verticesNeedUpdate) {
                const e = this.attributes.position;
                void 0 !== e && (e.copyVector3sArray(t.vertices), (e.needsUpdate = !0)), (t.verticesNeedUpdate = !1);
            }
            if (!0 === t.normalsNeedUpdate) {
                const e = this.attributes.normal;
                void 0 !== e && (e.copyVector3sArray(t.normals), (e.needsUpdate = !0)), (t.normalsNeedUpdate = !1);
            }
            if (!0 === t.colorsNeedUpdate) {
                const e = this.attributes.color;
                void 0 !== e && (e.copyColorsArray(t.colors), (e.needsUpdate = !0)), (t.colorsNeedUpdate = !1);
            }
            if (t.uvsNeedUpdate) {
                const e = this.attributes.uv;
                void 0 !== e && (e.copyVector2sArray(t.uvs), (e.needsUpdate = !0)), (t.uvsNeedUpdate = !1);
            }
            if (t.lineDistancesNeedUpdate) {
                const e = this.attributes.lineDistance;
                void 0 !== e && (e.copyArray(t.lineDistances), (e.needsUpdate = !0)), (t.lineDistancesNeedUpdate = !1);
            }
            return t.groupsNeedUpdate && (t.computeGroups(e.geometry), (this.groups = t.groups), (t.groupsNeedUpdate = !1)), this;
        },
        fromGeometry: function (e) {
            return (e.__directGeometry = new At().fromGeometry(e)), this.fromDirectGeometry(e.__directGeometry);
        },
        fromDirectGeometry: function (e) {
            const t = new Float32Array(3 * e.vertices.length);
            if ((this.setAttribute("position", new pt(t, 3).copyVector3sArray(e.vertices)), e.normals.length > 0)) {
                const t = new Float32Array(3 * e.normals.length);
                this.setAttribute("normal", new pt(t, 3).copyVector3sArray(e.normals));
            }
            if (e.colors.length > 0) {
                const t = new Float32Array(3 * e.colors.length);
                this.setAttribute("color", new pt(t, 3).copyColorsArray(e.colors));
            }
            if (e.uvs.length > 0) {
                const t = new Float32Array(2 * e.uvs.length);
                this.setAttribute("uv", new pt(t, 2).copyVector2sArray(e.uvs));
            }
            if (e.uvs2.length > 0) {
                const t = new Float32Array(2 * e.uvs2.length);
                this.setAttribute("uv2", new pt(t, 2).copyVector2sArray(e.uvs2));
            }
            this.groups = e.groups;
            for (const t in e.morphTargets) {
                const n = [],
                    i = e.morphTargets[t];
                for (let e = 0, t = i.length; e < t; e++) {
                    const t = i[e],
                        r = new bt(3 * t.data.length, 3);
                    (r.name = t.name), n.push(r.copyVector3sArray(t.data));
                }
                this.morphAttributes[t] = n;
            }
            if (e.skinIndices.length > 0) {
                const t = new bt(4 * e.skinIndices.length, 4);
                this.setAttribute("skinIndex", t.copyVector4sArray(e.skinIndices));
            }
            if (e.skinWeights.length > 0) {
                const t = new bt(4 * e.skinWeights.length, 4);
                this.setAttribute("skinWeight", t.copyVector4sArray(e.skinWeights));
            }
            return null !== e.boundingSphere && (this.boundingSphere = e.boundingSphere.clone()), null !== e.boundingBox && (this.boundingBox = e.boundingBox.clone()), this;
        },
        computeBoundingBox: function () {
            null === this.boundingBox && (this.boundingBox = new W());
            const e = this.attributes.position,
                t = this.morphAttributes.position;
            if (e && e.isGLBufferAttribute)
                return (
                    console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".', this),
                    void this.boundingBox.set(new H(-1 / 0, -1 / 0, -1 / 0), new H(1 / 0, 1 / 0, 1 / 0))
                );
            if (void 0 !== e) {
                if ((this.boundingBox.setFromBufferAttribute(e), t))
                    for (let e = 0, n = t.length; e < n; e++) {
                        const n = t[e];
                        Ft.setFromBufferAttribute(n),
                            this.morphTargetsRelative
                                ? (Ct.addVectors(this.boundingBox.min, Ft.min), this.boundingBox.expandByPoint(Ct), Ct.addVectors(this.boundingBox.max, Ft.max), this.boundingBox.expandByPoint(Ct))
                                : (this.boundingBox.expandByPoint(Ft.min), this.boundingBox.expandByPoint(Ft.max));
                    }
            } else this.boundingBox.makeEmpty();
            (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) &&
                console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
        },
        computeBoundingSphere: function () {
            null === this.boundingSphere && (this.boundingSphere = new oe());
            const e = this.attributes.position,
                t = this.morphAttributes.position;
            if (e && e.isGLBufferAttribute)
                return (
                    console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".', this), void this.boundingSphere.set(new H(), 1 / 0)
                );
            if (e) {
                const n = this.boundingSphere.center;
                if ((Ft.setFromBufferAttribute(e), t))
                    for (let e = 0, n = t.length; e < n; e++) {
                        const n = t[e];
                        Nt.setFromBufferAttribute(n),
                            this.morphTargetsRelative ? (Ct.addVectors(Ft.min, Nt.min), Ft.expandByPoint(Ct), Ct.addVectors(Ft.max, Nt.max), Ft.expandByPoint(Ct)) : (Ft.expandByPoint(Nt.min), Ft.expandByPoint(Nt.max));
                    }
                Ft.getCenter(n);
                let i = 0;
                for (let t = 0, r = e.count; t < r; t++) Ct.fromBufferAttribute(e, t), (i = Math.max(i, n.distanceToSquared(Ct)));
                if (t)
                    for (let r = 0, a = t.length; r < a; r++) {
                        const a = t[r],
                            o = this.morphTargetsRelative;
                        for (let t = 0, r = a.count; t < r; t++) Ct.fromBufferAttribute(a, t), o && (Pt.fromBufferAttribute(e, t), Ct.add(Pt)), (i = Math.max(i, n.distanceToSquared(Ct)));
                    }
                (this.boundingSphere.radius = Math.sqrt(i)),
                    isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
            }
        },
        computeFaceNormals: function () {},
        computeVertexNormals: function () {
            const e = this.index,
                t = this.getAttribute("position");
            if (void 0 !== t) {
                let n = this.getAttribute("normal");
                if (void 0 === n) (n = new pt(new Float32Array(3 * t.count), 3)), this.setAttribute("normal", n);
                else for (let e = 0, t = n.count; e < t; e++) n.setXYZ(e, 0, 0, 0);
                const i = new H(),
                    r = new H(),
                    a = new H(),
                    o = new H(),
                    s = new H(),
                    l = new H(),
                    c = new H(),
                    h = new H();
                if (e)
                    for (let d = 0, u = e.count; d < u; d += 3) {
                        const u = e.getX(d + 0),
                            f = e.getX(d + 1),
                            p = e.getX(d + 2);
                        i.fromBufferAttribute(t, u),
                            r.fromBufferAttribute(t, f),
                            a.fromBufferAttribute(t, p),
                            c.subVectors(a, r),
                            h.subVectors(i, r),
                            c.cross(h),
                            o.fromBufferAttribute(n, u),
                            s.fromBufferAttribute(n, f),
                            l.fromBufferAttribute(n, p),
                            o.add(c),
                            s.add(c),
                            l.add(c),
                            n.setXYZ(u, o.x, o.y, o.z),
                            n.setXYZ(f, s.x, s.y, s.z),
                            n.setXYZ(p, l.x, l.y, l.z);
                    }
                else
                    for (let e = 0, o = t.count; e < o; e += 3)
                        i.fromBufferAttribute(t, e + 0),
                            r.fromBufferAttribute(t, e + 1),
                            a.fromBufferAttribute(t, e + 2),
                            c.subVectors(a, r),
                            h.subVectors(i, r),
                            c.cross(h),
                            n.setXYZ(e + 0, c.x, c.y, c.z),
                            n.setXYZ(e + 1, c.x, c.y, c.z),
                            n.setXYZ(e + 2, c.x, c.y, c.z);
                this.normalizeNormals(), (n.needsUpdate = !0);
            }
        },
        merge: function (e, t) {
            if (!e || !e.isBufferGeometry) return void console.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.", e);
            void 0 === t && ((t = 0), console.warn("THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge."));
            const n = this.attributes;
            for (const i in n) {
                if (void 0 === e.attributes[i]) continue;
                const r = n[i].array,
                    a = e.attributes[i],
                    o = a.array,
                    s = a.itemSize * t,
                    l = Math.min(o.length, r.length - s);
                for (let e = 0, t = s; e < l; e++, t++) r[t] = o[e];
            }
            return this;
        },
        normalizeNormals: function () {
            const e = this.attributes.normal;
            for (let t = 0, n = e.count; t < n; t++) Ct.fromBufferAttribute(e, t), Ct.normalize(), e.setXYZ(t, Ct.x, Ct.y, Ct.z);
        },
        toNonIndexed: function () {
            function e(e, t) {
                const n = e.array,
                    i = e.itemSize,
                    r = e.normalized,
                    a = new n.constructor(t.length * i);
                let o = 0,
                    s = 0;
                for (let e = 0, r = t.length; e < r; e++) {
                    o = t[e] * i;
                    for (let e = 0; e < i; e++) a[s++] = n[o++];
                }
                return new pt(a, i, r);
            }
            if (null === this.index) return console.warn("THREE.BufferGeometry.toNonIndexed(): Geometry is already non-indexed."), this;
            const t = new It(),
                n = this.index.array,
                i = this.attributes;
            for (const r in i) {
                const a = e(i[r], n);
                t.setAttribute(r, a);
            }
            const r = this.morphAttributes;
            for (const i in r) {
                const a = [],
                    o = r[i];
                for (let t = 0, i = o.length; t < i; t++) {
                    const i = e(o[t], n);
                    a.push(i);
                }
                t.morphAttributes[i] = a;
            }
            t.morphTargetsRelative = this.morphTargetsRelative;
            const a = this.groups;
            for (let e = 0, n = a.length; e < n; e++) {
                const n = a[e];
                t.addGroup(n.start, n.count, n.materialIndex);
            }
            return t;
        },
        toJSON: function () {
            const e = { metadata: { version: 4.5, type: "BufferGeometry", generator: "BufferGeometry.toJSON" } };
            if (((e.uuid = this.uuid), (e.type = this.type), "" !== this.name && (e.name = this.name), Object.keys(this.userData).length > 0 && (e.userData = this.userData), void 0 !== this.parameters)) {
                const t = this.parameters;
                for (const n in t) void 0 !== t[n] && (e[n] = t[n]);
                return e;
            }
            e.data = { attributes: {} };
            const t = this.index;
            null !== t && (e.data.index = { type: t.array.constructor.name, array: Array.prototype.slice.call(t.array) });
            const n = this.attributes;
            for (const t in n) {
                const i = n[t],
                    r = i.toJSON(e.data);
                "" !== i.name && (r.name = i.name), (e.data.attributes[t] = r);
            }
            const i = {};
            let r = !1;
            for (const t in this.morphAttributes) {
                const n = this.morphAttributes[t],
                    a = [];
                for (let t = 0, i = n.length; t < i; t++) {
                    const i = n[t],
                        r = i.toJSON(e.data);
                    "" !== i.name && (r.name = i.name), a.push(r);
                }
                a.length > 0 && ((i[t] = a), (r = !0));
            }
            r && ((e.data.morphAttributes = i), (e.data.morphTargetsRelative = this.morphTargetsRelative));
            const a = this.groups;
            a.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(a)));
            const o = this.boundingSphere;
            return null !== o && (e.data.boundingSphere = { center: o.center.toArray(), radius: o.radius }), e;
        },
        clone: function () {
            return new It().copy(this);
        },
        copy: function (e) {
            (this.index = null), (this.attributes = {}), (this.morphAttributes = {}), (this.groups = []), (this.boundingBox = null), (this.boundingSphere = null);
            const t = {};
            this.name = e.name;
            const n = e.index;
            null !== n && this.setIndex(n.clone(t));
            const i = e.attributes;
            for (const e in i) {
                const n = i[e];
                this.setAttribute(e, n.clone(t));
            }
            const r = e.morphAttributes;
            for (const e in r) {
                const n = [],
                    i = r[e];
                for (let e = 0, r = i.length; e < r; e++) n.push(i[e].clone(t));
                this.morphAttributes[e] = n;
            }
            this.morphTargetsRelative = e.morphTargetsRelative;
            const a = e.groups;
            for (let e = 0, t = a.length; e < t; e++) {
                const t = a[e];
                this.addGroup(t.start, t.count, t.materialIndex);
            }
            const o = e.boundingBox;
            null !== o && (this.boundingBox = o.clone());
            const s = e.boundingSphere;
            return null !== s && (this.boundingSphere = s.clone()), (this.drawRange.start = e.drawRange.start), (this.drawRange.count = e.drawRange.count), (this.userData = e.userData), this;
        },
        dispose: function () {
            this.dispatchEvent({ type: "dispose" });
        },
    });
    const Rt = new pe(),
        Dt = new (class {
            constructor(e, t) {
                (this.origin = void 0 !== e ? e : new H()), (this.direction = void 0 !== t ? t : new H(0, 0, -1));
            }
            set(e, t) {
                return this.origin.copy(e), this.direction.copy(t), this;
            }
            clone() {
                return new this.constructor().copy(this);
            }
            copy(e) {
                return this.origin.copy(e.origin), this.direction.copy(e.direction), this;
            }
            at(e, t) {
                return void 0 === t && (console.warn("THREE.Ray: .at() target is now required"), (t = new H())), t.copy(this.direction).multiplyScalar(e).add(this.origin);
            }
            lookAt(e) {
                return this.direction.copy(e).sub(this.origin).normalize(), this;
            }
            recast(e) {
                return this.origin.copy(this.at(e, se)), this;
            }
            closestPointToPoint(e, t) {
                void 0 === t && (console.warn("THREE.Ray: .closestPointToPoint() target is now required"), (t = new H())), t.subVectors(e, this.origin);
                const n = t.dot(this.direction);
                return n < 0 ? t.copy(this.origin) : t.copy(this.direction).multiplyScalar(n).add(this.origin);
            }
            distanceToPoint(e) {
                return Math.sqrt(this.distanceSqToPoint(e));
            }
            distanceSqToPoint(e) {
                const t = se.subVectors(e, this.origin).dot(this.direction);
                return t < 0 ? this.origin.distanceToSquared(e) : (se.copy(this.direction).multiplyScalar(t).add(this.origin), se.distanceToSquared(e));
            }
            distanceSqToSegment(e, t, n, i) {
                le.copy(e).add(t).multiplyScalar(0.5), ce.copy(t).sub(e).normalize(), he.copy(this.origin).sub(le);
                const r = 0.5 * e.distanceTo(t),
                    a = -this.direction.dot(ce),
                    o = he.dot(this.direction),
                    s = -he.dot(ce),
                    l = he.lengthSq(),
                    c = Math.abs(1 - a * a);
                let h, d, u, f;
                if (c > 0)
                    if (((h = a * s - o), (d = a * o - s), (f = r * c), h >= 0))
                        if (d >= -f)
                            if (d <= f) {
                                const e = 1 / c;
                                (h *= e), (d *= e), (u = h * (h + a * d + 2 * o) + d * (a * h + d + 2 * s) + l);
                            } else (d = r), (h = Math.max(0, -(a * d + o))), (u = -h * h + d * (d + 2 * s) + l);
                        else (d = -r), (h = Math.max(0, -(a * d + o))), (u = -h * h + d * (d + 2 * s) + l);
                    else
                        d <= -f
                            ? ((h = Math.max(0, -(-a * r + o))), (d = h > 0 ? -r : Math.min(Math.max(-r, -s), r)), (u = -h * h + d * (d + 2 * s) + l))
                            : d <= f
                            ? ((h = 0), (d = Math.min(Math.max(-r, -s), r)), (u = d * (d + 2 * s) + l))
                            : ((h = Math.max(0, -(a * r + o))), (d = h > 0 ? r : Math.min(Math.max(-r, -s), r)), (u = -h * h + d * (d + 2 * s) + l));
                else (d = a > 0 ? -r : r), (h = Math.max(0, -(a * d + o))), (u = -h * h + d * (d + 2 * s) + l);
                return n && n.copy(this.direction).multiplyScalar(h).add(this.origin), i && i.copy(ce).multiplyScalar(d).add(le), u;
            }
            intersectSphere(e, t) {
                se.subVectors(e.center, this.origin);
                const n = se.dot(this.direction),
                    i = se.dot(se) - n * n,
                    r = e.radius * e.radius;
                if (i > r) return null;
                const a = Math.sqrt(r - i),
                    o = n - a,
                    s = n + a;
                return o < 0 && s < 0 ? null : o < 0 ? this.at(s, t) : this.at(o, t);
            }
            intersectsSphere(e) {
                return this.distanceSqToPoint(e.center) <= e.radius * e.radius;
            }
            distanceToPlane(e) {
                const t = e.normal.dot(this.direction);
                if (0 === t) return 0 === e.distanceToPoint(this.origin) ? 0 : null;
                const n = -(this.origin.dot(e.normal) + e.constant) / t;
                return n >= 0 ? n : null;
            }
            intersectPlane(e, t) {
                const n = this.distanceToPlane(e);
                return null === n ? null : this.at(n, t);
            }
            intersectsPlane(e) {
                const t = e.distanceToPoint(this.origin);
                if (0 === t) return !0;
                return e.normal.dot(this.direction) * t < 0;
            }
            intersectBox(e, t) {
                let n, i, r, a, o, s;
                const l = 1 / this.direction.x,
                    c = 1 / this.direction.y,
                    h = 1 / this.direction.z,
                    d = this.origin;
                return (
                    l >= 0 ? ((n = (e.min.x - d.x) * l), (i = (e.max.x - d.x) * l)) : ((n = (e.max.x - d.x) * l), (i = (e.min.x - d.x) * l)),
                    c >= 0 ? ((r = (e.min.y - d.y) * c), (a = (e.max.y - d.y) * c)) : ((r = (e.max.y - d.y) * c), (a = (e.min.y - d.y) * c)),
                    n > a || r > i
                        ? null
                        : ((r > n || n != n) && (n = r),
                          (a < i || i != i) && (i = a),
                          h >= 0 ? ((o = (e.min.z - d.z) * h), (s = (e.max.z - d.z) * h)) : ((o = (e.max.z - d.z) * h), (s = (e.min.z - d.z) * h)),
                          n > s || o > i ? null : ((o > n || n != n) && (n = o), (s < i || i != i) && (i = s), i < 0 ? null : this.at(n >= 0 ? n : i, t)))
                );
            }
            intersectsBox(e) {
                return null !== this.intersectBox(e, se);
            }
            intersectTriangle(e, t, n, i, r) {
                de.subVectors(t, e), ue.subVectors(n, e), fe.crossVectors(de, ue);
                let a,
                    o = this.direction.dot(fe);
                if (o > 0) {
                    if (i) return null;
                    a = 1;
                } else {
                    if (!(o < 0)) return null;
                    (a = -1), (o = -o);
                }
                he.subVectors(this.origin, e);
                const s = a * this.direction.dot(ue.crossVectors(he, ue));
                if (s < 0) return null;
                const l = a * this.direction.dot(de.cross(he));
                if (l < 0) return null;
                if (s + l > o) return null;
                const c = -a * he.dot(fe);
                return c < 0 ? null : this.at(c / o, r);
            }
            applyMatrix4(e) {
                return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this;
            }
            equals(e) {
                return e.origin.equals(this.origin) && e.direction.equals(this.direction);
            }
        })(),
        Ut = new oe(),
        Ot = new H(),
        zt = new H(),
        Gt = new H(),
        Bt = new H(),
        Ht = new H(),
        kt = new H(),
        Vt = new H(),
        Wt = new H(),
        Xt = new H(),
        Yt = new C(),
        jt = new C(),
        Qt = new C(),
        qt = new H(),
        Zt = new H();
    function Jt(e, t) {
        Ge.call(this), (this.type = "Mesh"), (this.geometry = void 0 !== e ? e : new It()), (this.material = void 0 !== t ? t : new dt()), this.updateMorphTargets();
    }
    function Kt(e, t, n, i, r, a, o, s) {
        let l;
        if (((l = 1 === t.side ? i.intersectTriangle(o, a, r, !0, s) : i.intersectTriangle(r, a, o, 2 !== t.side, s)), null === l)) return null;
        Zt.copy(s), Zt.applyMatrix4(e.matrixWorld);
        const c = n.ray.origin.distanceTo(Zt);
        return c < n.near || c > n.far ? null : { distance: c, point: Zt.clone(), object: e };
    }
    function $t(e, t, n, i, r, a, o, s, l, c, h, d) {
        Ot.fromBufferAttribute(r, c), zt.fromBufferAttribute(r, h), Gt.fromBufferAttribute(r, d);
        const u = e.morphTargetInfluences;
        if (t.morphTargets && a && u) {
            Vt.set(0, 0, 0), Wt.set(0, 0, 0), Xt.set(0, 0, 0);
            for (let e = 0, t = a.length; e < t; e++) {
                const t = u[e],
                    n = a[e];
                0 !== t &&
                    (Bt.fromBufferAttribute(n, c),
                    Ht.fromBufferAttribute(n, h),
                    kt.fromBufferAttribute(n, d),
                    o ? (Vt.addScaledVector(Bt, t), Wt.addScaledVector(Ht, t), Xt.addScaledVector(kt, t)) : (Vt.addScaledVector(Bt.sub(Ot), t), Wt.addScaledVector(Ht.sub(zt), t), Xt.addScaledVector(kt.sub(Gt), t)));
            }
            Ot.add(Vt), zt.add(Wt), Gt.add(Xt);
        }
        e.isSkinnedMesh && (e.boneTransform(c, Ot), e.boneTransform(h, zt), e.boneTransform(d, Gt));
        const f = Kt(e, t, n, i, Ot, zt, Gt, qt);
        if (f) {
            s && (Yt.fromBufferAttribute(s, c), jt.fromBufferAttribute(s, h), Qt.fromBufferAttribute(s, d), (f.uv = et.getUV(qt, Ot, zt, Gt, Yt, jt, Qt, new C()))),
                l && (Yt.fromBufferAttribute(l, c), jt.fromBufferAttribute(l, h), Qt.fromBufferAttribute(l, d), (f.uv2 = et.getUV(qt, Ot, zt, Gt, Yt, jt, Qt, new C())));
            const e = new lt(c, h, d);
            et.getNormal(Ot, zt, Gt, e.normal), (f.face = e);
        }
        return f;
    }
    Jt.prototype = Object.assign(Object.create(Ge.prototype), {
        constructor: Jt,
        isMesh: !0,
        copy: function (e) {
            return (
                Ge.prototype.copy.call(this, e),
                void 0 !== e.morphTargetInfluences && (this.morphTargetInfluences = e.morphTargetInfluences.slice()),
                void 0 !== e.morphTargetDictionary && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)),
                (this.material = e.material),
                (this.geometry = e.geometry),
                this
            );
        },
        updateMorphTargets: function () {
            const e = this.geometry;
            if (e.isBufferGeometry) {
                const t = e.morphAttributes,
                    n = Object.keys(t);
                if (n.length > 0) {
                    const e = t[n[0]];
                    if (void 0 !== e) {
                        (this.morphTargetInfluences = []), (this.morphTargetDictionary = {});
                        for (let t = 0, n = e.length; t < n; t++) {
                            const n = e[t].name || String(t);
                            this.morphTargetInfluences.push(0), (this.morphTargetDictionary[n] = t);
                        }
                    }
                }
            } else {
                const t = e.morphTargets;
                void 0 !== t && t.length > 0 && console.error("THREE.Mesh.updateMorphTargets() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.");
            }
        },
        raycast: function (e, t) {
            const n = this.geometry,
                i = this.material,
                r = this.matrixWorld;
            if (void 0 === i) return;
            if ((null === n.boundingSphere && n.computeBoundingSphere(), Ut.copy(n.boundingSphere), Ut.applyMatrix4(r), !1 === e.ray.intersectsSphere(Ut))) return;
            if ((Rt.getInverse(r), Dt.copy(e.ray).applyMatrix4(Rt), null !== n.boundingBox && !1 === Dt.intersectsBox(n.boundingBox))) return;
            let a;
            if (n.isBufferGeometry) {
                const r = n.index,
                    o = n.attributes.position,
                    s = n.morphAttributes.position,
                    l = n.morphTargetsRelative,
                    c = n.attributes.uv,
                    h = n.attributes.uv2,
                    d = n.groups,
                    u = n.drawRange;
                if (null !== r)
                    if (Array.isArray(i))
                        for (let n = 0, f = d.length; n < f; n++) {
                            const f = d[n],
                                p = i[f.materialIndex];
                            for (let n = Math.max(f.start, u.start), i = Math.min(f.start + f.count, u.start + u.count); n < i; n += 3) {
                                const i = r.getX(n),
                                    d = r.getX(n + 1),
                                    u = r.getX(n + 2);
                                (a = $t(this, p, e, Dt, o, s, l, c, h, i, d, u)), a && ((a.faceIndex = Math.floor(n / 3)), (a.face.materialIndex = f.materialIndex), t.push(a));
                            }
                        }
                    else {
                        for (let n = Math.max(0, u.start), d = Math.min(r.count, u.start + u.count); n < d; n += 3) {
                            const d = r.getX(n),
                                u = r.getX(n + 1),
                                f = r.getX(n + 2);
                            (a = $t(this, i, e, Dt, o, s, l, c, h, d, u, f)), a && ((a.faceIndex = Math.floor(n / 3)), t.push(a));
                        }
                    }
                else if (void 0 !== o)
                    if (Array.isArray(i))
                        for (let n = 0, r = d.length; n < r; n++) {
                            const r = d[n],
                                f = i[r.materialIndex];
                            for (let n = Math.max(r.start, u.start), i = Math.min(r.start + r.count, u.start + u.count); n < i; n += 3) {
                                (a = $t(this, f, e, Dt, o, s, l, c, h, n, n + 1, n + 2)), a && ((a.faceIndex = Math.floor(n / 3)), (a.face.materialIndex = r.materialIndex), t.push(a));
                            }
                        }
                    else {
                        for (let n = Math.max(0, u.start), r = Math.min(o.count, u.start + u.count); n < r; n += 3) {
                            (a = $t(this, i, e, Dt, o, s, l, c, h, n, n + 1, n + 2)), a && ((a.faceIndex = Math.floor(n / 3)), t.push(a));
                        }
                    }
            } else if (n.isGeometry) {
                const r = Array.isArray(i),
                    o = n.vertices,
                    s = n.faces;
                let l;
                const c = n.faceVertexUvs[0];
                c.length > 0 && (l = c);
                for (let n = 0, c = s.length; n < c; n++) {
                    const c = s[n],
                        h = r ? i[c.materialIndex] : i;
                    if (void 0 === h) continue;
                    const d = o[c.a],
                        u = o[c.b],
                        f = o[c.c];
                    if (((a = Kt(this, h, e, Dt, d, u, f, qt)), a)) {
                        if (l && l[n]) {
                            const e = l[n];
                            Yt.copy(e[0]), jt.copy(e[1]), Qt.copy(e[2]), (a.uv = et.getUV(qt, d, u, f, Yt, jt, Qt, new C()));
                        }
                        (a.face = c), (a.faceIndex = n), t.push(a);
                    }
                }
            }
        },
    });
    class en extends It {
        constructor(e = 1, t = 1, n = 1, i = 1, r = 1, a = 1) {
            super(), (this.type = "BoxBufferGeometry"), (this.parameters = { width: e, height: t, depth: n, widthSegments: i, heightSegments: r, depthSegments: a });
            const o = this;
            (i = Math.floor(i)), (r = Math.floor(r)), (a = Math.floor(a));
            const s = [],
                l = [],
                c = [],
                h = [];
            let d = 0,
                u = 0;
            function f(e, t, n, i, r, a, f, p, m, g, x) {
                const v = a / m,
                    _ = f / g,
                    y = a / 2,
                    M = f / 2,
                    b = p / 2,
                    w = m + 1,
                    A = g + 1;
                let S = 0,
                    T = 0;
                const L = new H();
                for (let a = 0; a < A; a++) {
                    const o = a * _ - M;
                    for (let s = 0; s < w; s++) {
                        const d = s * v - y;
                        (L[e] = d * i), (L[t] = o * r), (L[n] = b), l.push(L.x, L.y, L.z), (L[e] = 0), (L[t] = 0), (L[n] = p > 0 ? 1 : -1), c.push(L.x, L.y, L.z), h.push(s / m), h.push(1 - a / g), (S += 1);
                    }
                }
                for (let e = 0; e < g; e++)
                    for (let t = 0; t < m; t++) {
                        const n = d + t + w * e,
                            i = d + t + w * (e + 1),
                            r = d + (t + 1) + w * (e + 1),
                            a = d + (t + 1) + w * e;
                        s.push(n, i, a), s.push(i, r, a), (T += 6);
                    }
                o.addGroup(u, T, x), (u += T), (d += S);
            }
            f("z", "y", "x", -1, -1, n, t, e, a, r, 0),
                f("z", "y", "x", 1, -1, n, t, -e, a, r, 1),
                f("x", "z", "y", 1, 1, e, n, t, i, a, 2),
                f("x", "z", "y", 1, -1, e, n, -t, i, a, 3),
                f("x", "y", "z", 1, -1, e, t, n, i, r, 4),
                f("x", "y", "z", -1, -1, e, t, -n, i, r, 5),
                this.setIndex(s),
                this.setAttribute("position", new bt(l, 3)),
                this.setAttribute("normal", new bt(c, 3)),
                this.setAttribute("uv", new bt(h, 2));
        }
    }
    function tn(e) {
        const t = {};
        for (const n in e) {
            t[n] = {};
            for (const i in e[n]) {
                const r = e[n][i];
                r && (r.isColor || r.isMatrix3 || r.isMatrix4 || r.isVector2 || r.isVector3 || r.isVector4 || r.isTexture) ? (t[n][i] = r.clone()) : Array.isArray(r) ? (t[n][i] = r.slice()) : (t[n][i] = r);
            }
        }
        return t;
    }
    function nn(e) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const i = tn(e[n]);
            for (const e in i) t[e] = i[e];
        }
        return t;
    }
    const rn = { clone: tn, merge: nn };
    function an(e) {
        ht.call(this),
            (this.type = "ShaderMaterial"),
            (this.defines = {}),
            (this.uniforms = {}),
            (this.vertexShader = "void main(){gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}"),
            (this.fragmentShader = "void main(){gl_FragColor=vec4(1.0,0.0,0.0,1.0);}"),
            (this.linewidth = 1),
            (this.wireframe = !1),
            (this.wireframeLinewidth = 1),
            (this.fog = !1),
            (this.lights = !1),
            (this.clipping = !1),
            (this.skinning = !1),
            (this.morphTargets = !1),
            (this.morphNormals = !1),
            (this.extensions = { derivatives: !1, fragDepth: !1, drawBuffers: !1, shaderTextureLOD: !1 }),
            (this.defaultAttributeValues = { color: [1, 1, 1], uv: [0, 0], uv2: [0, 0] }),
            (this.index0AttributeName = void 0),
            (this.uniformsNeedUpdate = !1),
            (this.glslVersion = null),
            void 0 !== e && (void 0 !== e.attributes && console.error("THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."), this.setValues(e));
    }
    function on() {
        Ge.call(this), (this.type = "Camera"), (this.matrixWorldInverse = new pe()), (this.projectionMatrix = new pe()), (this.projectionMatrixInverse = new pe());
    }
    function sn(e, t, n, i) {
        on.call(this),
            (this.type = "PerspectiveCamera"),
            (this.fov = void 0 !== e ? e : 50),
            (this.zoom = 1),
            (this.near = void 0 !== n ? n : 0.1),
            (this.far = void 0 !== i ? i : 2e3),
            (this.focus = 10),
            (this.aspect = void 0 !== t ? t : 1),
            (this.view = null),
            (this.filmGauge = 35),
            (this.filmOffset = 0),
            this.updateProjectionMatrix();
    }
    (an.prototype = Object.create(ht.prototype)),
        (an.prototype.constructor = an),
        (an.prototype.isShaderMaterial = !0),
        (an.prototype.copy = function (e) {
            return (
                ht.prototype.copy.call(this, e),
                (this.fragmentShader = e.fragmentShader),
                (this.vertexShader = e.vertexShader),
                (this.uniforms = tn(e.uniforms)),
                (this.defines = Object.assign({}, e.defines)),
                (this.wireframe = e.wireframe),
                (this.wireframeLinewidth = e.wireframeLinewidth),
                (this.lights = e.lights),
                (this.clipping = e.clipping),
                (this.skinning = e.skinning),
                (this.morphTargets = e.morphTargets),
                (this.morphNormals = e.morphNormals),
                (this.extensions = Object.assign({}, e.extensions)),
                (this.glslVersion = e.glslVersion),
                this
            );
        }),
        (an.prototype.toJSON = function (e) {
            const t = ht.prototype.toJSON.call(this, e);
            (t.glslVersion = this.glslVersion), (t.uniforms = {});
            for (const n in this.uniforms) {
                const i = this.uniforms[n].value;
                i && i.isTexture
                    ? (t.uniforms[n] = { type: "t", value: i.toJSON(e).uuid })
                    : i && i.isColor
                    ? (t.uniforms[n] = { type: "c", value: i.getHex() })
                    : i && i.isVector2
                    ? (t.uniforms[n] = { type: "v2", value: i.toArray() })
                    : i && i.isVector3
                    ? (t.uniforms[n] = { type: "v3", value: i.toArray() })
                    : i && i.isVector4
                    ? (t.uniforms[n] = { type: "v4", value: i.toArray() })
                    : i && i.isMatrix3
                    ? (t.uniforms[n] = { type: "m3", value: i.toArray() })
                    : i && i.isMatrix4
                    ? (t.uniforms[n] = { type: "m4", value: i.toArray() })
                    : (t.uniforms[n] = { value: i });
            }
            Object.keys(this.defines).length > 0 && (t.defines = this.defines), (t.vertexShader = this.vertexShader), (t.fragmentShader = this.fragmentShader);
            const n = {};
            for (const e in this.extensions) !0 === this.extensions[e] && (n[e] = !0);
            return Object.keys(n).length > 0 && (t.extensions = n), t;
        }),
        (on.prototype = Object.assign(Object.create(Ge.prototype), {
            constructor: on,
            isCamera: !0,
            copy: function (e, t) {
                return Ge.prototype.copy.call(this, e, t), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this;
            },
            getWorldDirection: function (e) {
                void 0 === e && (console.warn("THREE.Camera: .getWorldDirection() target is now required"), (e = new H())), this.updateWorldMatrix(!0, !1);
                const t = this.matrixWorld.elements;
                return e.set(-t[8], -t[9], -t[10]).normalize();
            },
            updateMatrixWorld: function (e) {
                Ge.prototype.updateMatrixWorld.call(this, e), this.matrixWorldInverse.getInverse(this.matrixWorld);
            },
            updateWorldMatrix: function (e, t) {
                Ge.prototype.updateWorldMatrix.call(this, e, t), this.matrixWorldInverse.getInverse(this.matrixWorld);
            },
            clone: function () {
                return new this.constructor().copy(this);
            },
        })),
        (sn.prototype = Object.assign(Object.create(on.prototype), {
            constructor: sn,
            isPerspectiveCamera: !0,
            copy: function (e, t) {
                return (
                    on.prototype.copy.call(this, e, t),
                    (this.fov = e.fov),
                    (this.zoom = e.zoom),
                    (this.near = e.near),
                    (this.far = e.far),
                    (this.focus = e.focus),
                    (this.aspect = e.aspect),
                    (this.view = null === e.view ? null : Object.assign({}, e.view)),
                    (this.filmGauge = e.filmGauge),
                    (this.filmOffset = e.filmOffset),
                    this
                );
            },
            setFocalLength: function (e) {
                const t = (0.5 * this.getFilmHeight()) / e;
                (this.fov = 2 * N.RAD2DEG * Math.atan(t)), this.updateProjectionMatrix();
            },
            getFocalLength: function () {
                const e = Math.tan(0.5 * N.DEG2RAD * this.fov);
                return (0.5 * this.getFilmHeight()) / e;
            },
            getEffectiveFOV: function () {
                return 2 * N.RAD2DEG * Math.atan(Math.tan(0.5 * N.DEG2RAD * this.fov) / this.zoom);
            },
            getFilmWidth: function () {
                return this.filmGauge * Math.min(this.aspect, 1);
            },
            getFilmHeight: function () {
                return this.filmGauge / Math.max(this.aspect, 1);
            },
            setViewOffset: function (e, t, n, i, r, a) {
                (this.aspect = e / t),
                    null === this.view && (this.view = { enabled: !0, fullWidth: 1, fullHeight: 1, offsetX: 0, offsetY: 0, width: 1, height: 1 }),
                    (this.view.enabled = !0),
                    (this.view.fullWidth = e),
                    (this.view.fullHeight = t),
                    (this.view.offsetX = n),
                    (this.view.offsetY = i),
                    (this.view.width = r),
                    (this.view.height = a),
                    this.updateProjectionMatrix();
            },
            clearViewOffset: function () {
                null !== this.view && (this.view.enabled = !1), this.updateProjectionMatrix();
            },
            updateProjectionMatrix: function () {
                const e = this.near;
                let t = (e * Math.tan(0.5 * N.DEG2RAD * this.fov)) / this.zoom,
                    n = 2 * t,
                    i = this.aspect * n,
                    r = -0.5 * i;
                const a = this.view;
                if (null !== this.view && this.view.enabled) {
                    const e = a.fullWidth,
                        o = a.fullHeight;
                    (r += (a.offsetX * i) / e), (t -= (a.offsetY * n) / o), (i *= a.width / e), (n *= a.height / o);
                }
                const o = this.filmOffset;
                0 !== o && (r += (e * o) / this.getFilmWidth()), this.projectionMatrix.makePerspective(r, r + i, t, t - n, e, this.far), this.projectionMatrixInverse.getInverse(this.projectionMatrix);
            },
            toJSON: function (e) {
                const t = Ge.prototype.toJSON.call(this, e);
                return (
                    (t.object.fov = this.fov),
                    (t.object.zoom = this.zoom),
                    (t.object.near = this.near),
                    (t.object.far = this.far),
                    (t.object.focus = this.focus),
                    (t.object.aspect = this.aspect),
                    null !== this.view && (t.object.view = Object.assign({}, this.view)),
                    (t.object.filmGauge = this.filmGauge),
                    (t.object.filmOffset = this.filmOffset),
                    t
                );
            },
        }));
    const ln = 90;
    function cn(e, t, n) {
        if ((Ge.call(this), (this.type = "CubeCamera"), !0 !== n.isWebGLCubeRenderTarget)) return void console.error("THREE.CubeCamera: The constructor now expects an instance of WebGLCubeRenderTarget as third parameter.");
        this.renderTarget = n;
        const i = new sn(ln, 1, e, t);
        (i.layers = this.layers), i.up.set(0, -1, 0), i.lookAt(new H(1, 0, 0)), this.add(i);
        const r = new sn(ln, 1, e, t);
        (r.layers = this.layers), r.up.set(0, -1, 0), r.lookAt(new H(-1, 0, 0)), this.add(r);
        const a = new sn(ln, 1, e, t);
        (a.layers = this.layers), a.up.set(0, 0, 1), a.lookAt(new H(0, 1, 0)), this.add(a);
        const o = new sn(ln, 1, e, t);
        (o.layers = this.layers), o.up.set(0, 0, -1), o.lookAt(new H(0, -1, 0)), this.add(o);
        const s = new sn(ln, 1, e, t);
        (s.layers = this.layers), s.up.set(0, -1, 0), s.lookAt(new H(0, 0, 1)), this.add(s);
        const l = new sn(ln, 1, e, t);
        (l.layers = this.layers),
            l.up.set(0, -1, 0),
            l.lookAt(new H(0, 0, -1)),
            this.add(l),
            (this.update = function (e, t) {
                null === this.parent && this.updateMatrixWorld();
                const c = e.xr.enabled,
                    h = e.getRenderTarget();
                e.xr.enabled = !1;
                const d = n.texture.generateMipmaps;
                (n.texture.generateMipmaps = !1),
                    e.setRenderTarget(n, 0),
                    e.render(t, i),
                    e.setRenderTarget(n, 1),
                    e.render(t, r),
                    e.setRenderTarget(n, 2),
                    e.render(t, a),
                    e.setRenderTarget(n, 3),
                    e.render(t, o),
                    e.setRenderTarget(n, 4),
                    e.render(t, s),
                    (n.texture.generateMipmaps = d),
                    e.setRenderTarget(n, 5),
                    e.render(t, l),
                    e.setRenderTarget(h),
                    (e.xr.enabled = c);
            });
    }
    function hn(e, t, n, i, r, a, o, s, l, c) {
        (e = void 0 !== e ? e : []), (t = void 0 !== t ? t : 301), (o = void 0 !== o ? o : M), O.call(this, e, t, n, i, r, a, o, s, l, c), (this.flipY = !1), (this._needsFlipEnvMap = !0);
    }
    function dn(e, t, n) {
        Number.isInteger(t) && (console.warn("THREE.WebGLCubeRenderTarget: constructor signature is now WebGLCubeRenderTarget( size, options )"), (t = n)),
            G.call(this, e, e, t),
            (t = t || {}),
            (this.texture = new hn(void 0, t.mapping, t.wrapS, t.wrapT, t.magFilter, t.minFilter, t.format, t.type, t.anisotropy, t.encoding)),
            (this.texture._needsFlipEnvMap = !1);
    }
    function un(e, t, n, i, r, a, o, s, l, c, h, d) {
        O.call(this, null, a, o, s, l, c, i, r, h, d),
            (this.image = { data: e || null, width: t || 1, height: n || 1 }),
            (this.magFilter = void 0 !== l ? l : u),
            (this.minFilter = void 0 !== c ? c : u),
            (this.generateMipmaps = !1),
            (this.flipY = !1),
            (this.unpackAlignment = 1),
            (this.needsUpdate = !0);
    }
    (cn.prototype = Object.create(Ge.prototype)),
        (cn.prototype.constructor = cn),
        (hn.prototype = Object.create(O.prototype)),
        (hn.prototype.constructor = hn),
        (hn.prototype.isCubeTexture = !0),
        Object.defineProperty(hn.prototype, "images", {
            get: function () {
                return this.image;
            },
            set: function (e) {
                this.image = e;
            },
        }),
        (dn.prototype = Object.create(G.prototype)),
        (dn.prototype.constructor = dn),
        (dn.prototype.isWebGLCubeRenderTarget = !0),
        (dn.prototype.fromEquirectangularTexture = function (e, t) {
            (this.texture.type = t.type), (this.texture.format = b), (this.texture.encoding = t.encoding), (this.texture.generateMipmaps = t.generateMipmaps), (this.texture.minFilter = t.minFilter), (this.texture.magFilter = t.magFilter);
            const n = {
                    uniforms: { tEquirect: { value: null } },
                    vertexShader:
                        "varying vec3 vWorldDirection;vec3 transformDirection(in vec3 dir,in mat4 matrix){return normalize((matrix*vec4(dir,0.0)).xyz);}void main(){vWorldDirection=transformDirection(position,modelMatrix);\n#include <begin_vertex>\n#include <project_vertex>\n}",
                    fragmentShader:
                        "uniform sampler2D tEquirect;varying vec3 vWorldDirection;\n#include <common>\nvoid main(){vec3 direction=normalize(vWorldDirection);vec2 sampleUV=equirectUv(direction);gl_FragColor=texture2D(tEquirect,sampleUV);}",
                },
                i = new en(5, 5, 5),
                r = new an({ name: "CubemapFromEquirect", uniforms: tn(n.uniforms), vertexShader: n.vertexShader, fragmentShader: n.fragmentShader, side: 1, blending: 0 });
            r.uniforms.tEquirect.value = t;
            const a = new Jt(i, r),
                o = t.minFilter;
            t.minFilter === p && (t.minFilter = f);
            return new cn(1, 10, this).update(e, a), (t.minFilter = o), a.geometry.dispose(), a.material.dispose(), this;
        }),
        (dn.prototype.clear = function (e, t, n, i) {
            const r = e.getRenderTarget();
            for (let r = 0; r < 6; r++) e.setRenderTarget(this, r), e.clear(t, n, i);
            e.setRenderTarget(r);
        }),
        (un.prototype = Object.create(O.prototype)),
        (un.prototype.constructor = un),
        (un.prototype.isDataTexture = !0);
    const fn = new oe(),
        pn = new H();
    class mn {
        constructor(e, t, n, i, r, a) {
            this.planes = [void 0 !== e ? e : new Ve(), void 0 !== t ? t : new Ve(), void 0 !== n ? n : new Ve(), void 0 !== i ? i : new Ve(), void 0 !== r ? r : new Ve(), void 0 !== a ? a : new Ve()];
        }
        set(e, t, n, i, r, a) {
            const o = this.planes;
            return o[0].copy(e), o[1].copy(t), o[2].copy(n), o[3].copy(i), o[4].copy(r), o[5].copy(a), this;
        }
        clone() {
            return new this.constructor().copy(this);
        }
        copy(e) {
            const t = this.planes;
            for (let n = 0; n < 6; n++) t[n].copy(e.planes[n]);
            return this;
        }
        setFromProjectionMatrix(e) {
            const t = this.planes,
                n = e.elements,
                i = n[0],
                r = n[1],
                a = n[2],
                o = n[3],
                s = n[4],
                l = n[5],
                c = n[6],
                h = n[7],
                d = n[8],
                u = n[9],
                f = n[10],
                p = n[11],
                m = n[12],
                g = n[13],
                x = n[14],
                v = n[15];
            return (
                t[0].setComponents(o - i, h - s, p - d, v - m).normalize(),
                t[1].setComponents(o + i, h + s, p + d, v + m).normalize(),
                t[2].setComponents(o + r, h + l, p + u, v + g).normalize(),
                t[3].setComponents(o - r, h - l, p - u, v - g).normalize(),
                t[4].setComponents(o - a, h - c, p - f, v - x).normalize(),
                t[5].setComponents(o + a, h + c, p + f, v + x).normalize(),
                this
            );
        }
        intersectsObject(e) {
            const t = e.geometry;
            return null === t.boundingSphere && t.computeBoundingSphere(), fn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld), this.intersectsSphere(fn);
        }
        intersectsSprite(e) {
            return fn.center.set(0, 0, 0), (fn.radius = 0.7071067811865476), fn.applyMatrix4(e.matrixWorld), this.intersectsSphere(fn);
        }
        intersectsSphere(e) {
            const t = this.planes,
                n = e.center,
                i = -e.radius;
            for (let e = 0; e < 6; e++) {
                if (t[e].distanceToPoint(n) < i) return !1;
            }
            return !0;
        }
        intersectsBox(e) {
            const t = this.planes;
            for (let n = 0; n < 6; n++) {
                const i = t[n];
                if (((pn.x = i.normal.x > 0 ? e.max.x : e.min.x), (pn.y = i.normal.y > 0 ? e.max.y : e.min.y), (pn.z = i.normal.z > 0 ? e.max.z : e.min.z), i.distanceToPoint(pn) < 0)) return !1;
            }
            return !0;
        }
        containsPoint(e) {
            const t = this.planes;
            for (let n = 0; n < 6; n++) if (t[n].distanceToPoint(e) < 0) return !1;
            return !0;
        }
    }
    function gn() {
        let e = null,
            t = !1,
            n = null,
            i = null;
        function r(t, a) {
            n(t, a), (i = e.requestAnimationFrame(r));
        }
        return {
            start: function () {
                !0 !== t && null !== n && ((i = e.requestAnimationFrame(r)), (t = !0));
            },
            stop: function () {
                e.cancelAnimationFrame(i), (t = !1);
            },
            setAnimationLoop: function (e) {
                n = e;
            },
            setContext: function (t) {
                e = t;
            },
        };
    }
    function xn(e, t) {
        const n = t.isWebGL2,
            i = new WeakMap();
        return {
            get: function (e) {
                return e.isInterleavedBufferAttribute && (e = e.data), i.get(e);
            },
            remove: function (t) {
                t.isInterleavedBufferAttribute && (t = t.data);
                const n = i.get(t);
                n && (e.deleteBuffer(n.buffer), i.delete(t));
            },
            update: function (t, r) {
                if (t.isGLBufferAttribute) {
                    var a = i.get(t);
                    return void ((!a || a.version < t.version) && i.set(t, { buffer: t.buffer, type: t.type, bytesPerElement: t.elementSize, version: t.version }));
                }
                t.isInterleavedBufferAttribute && (t = t.data);
                const o = i.get(t);
                void 0 === o
                    ? i.set(
                          t,
                          (function (t, n) {
                              const i = t.array,
                                  r = t.usage,
                                  a = e.createBuffer();
                              e.bindBuffer(n, a), e.bufferData(n, i, r), t.onUploadCallback();
                              let o = 5126;
                              return (
                                  i instanceof Float32Array
                                      ? (o = 5126)
                                      : i instanceof Float64Array
                                      ? console.warn("THREE.WebGLAttributes: Unsupported data buffer format: Float64Array.")
                                      : i instanceof Uint16Array
                                      ? (o = 5123)
                                      : i instanceof Int16Array
                                      ? (o = 5122)
                                      : i instanceof Uint32Array
                                      ? (o = 5125)
                                      : i instanceof Int32Array
                                      ? (o = 5124)
                                      : i instanceof Int8Array
                                      ? (o = 5120)
                                      : i instanceof Uint8Array && (o = 5121),
                                  { buffer: a, type: o, bytesPerElement: i.BYTES_PER_ELEMENT, version: t.version }
                              );
                          })(t, r)
                      )
                    : o.version < t.version &&
                      (!(function (t, i, r) {
                          const a = i.array,
                              o = i.updateRange;
                          e.bindBuffer(r, t),
                              -1 === o.count
                                  ? e.bufferSubData(r, 0, a)
                                  : (n ? e.bufferSubData(r, o.offset * a.BYTES_PER_ELEMENT, a, o.offset, o.count) : e.bufferSubData(r, o.offset * a.BYTES_PER_ELEMENT, a.subarray(o.offset, o.offset + o.count)), (o.count = -1));
                      })(o.buffer, t, r),
                      (o.version = t.version));
            },
        };
    }
    class vn extends It {
        constructor(e, t, n, i) {
            super(), (this.type = "PlaneBufferGeometry"), (this.parameters = { width: e, height: t, widthSegments: n, heightSegments: i });
            const r = (e = e || 1) / 2,
                a = (t = t || 1) / 2,
                o = Math.floor(n) || 1,
                s = Math.floor(i) || 1,
                l = o + 1,
                c = s + 1,
                h = e / o,
                d = t / s,
                u = [],
                f = [],
                p = [],
                m = [];
            for (let e = 0; e < c; e++) {
                const t = e * d - a;
                for (let n = 0; n < l; n++) {
                    const i = n * h - r;
                    f.push(i, -t, 0), p.push(0, 0, 1), m.push(n / o), m.push(1 - e / s);
                }
            }
            for (let e = 0; e < s; e++)
                for (let t = 0; t < o; t++) {
                    const n = t + l * e,
                        i = t + l * (e + 1),
                        r = t + 1 + l * (e + 1),
                        a = t + 1 + l * e;
                    u.push(n, i, a), u.push(i, r, a);
                }
            this.setIndex(u), this.setAttribute("position", new bt(f, 3)), this.setAttribute("normal", new bt(p, 3)), this.setAttribute("uv", new bt(m, 2));
        }
    }
    const _n = {
            alphamap_fragment: "#ifdef USE_ALPHAMAP\ndiffuseColor.a*=texture2D(alphaMap,vUv).g;\n#endif",
            alphamap_pars_fragment: "#ifdef USE_ALPHAMAP\nuniform sampler2D alphaMap;\n#endif",
            alphatest_fragment: "#ifdef ALPHATEST\nif(diffuseColor.a<ALPHATEST)discard;\n#endif",
            aomap_fragment:
                "#ifdef USE_AOMAP\nfloat ambientOcclusion=(texture2D(aoMap,vUv2).r-1.0)*aoMapIntensity+1.0;reflectedLight.indirectDiffuse*=ambientOcclusion;\n#if defined(USE_ENVMAP)&&defined(STANDARD)\nfloat dotNV=saturate(dot(geometry.normal,geometry.viewDir));reflectedLight.indirectSpecular*=computeSpecularOcclusion(dotNV,ambientOcclusion,material.specularRoughness);\n#endif\n#endif",
            aomap_pars_fragment: "#ifdef USE_AOMAP\nuniform sampler2D aoMap;uniform float aoMapIntensity;\n#endif",
            begin_vertex: "vec3 transformed=vec3(position);",
            beginnormal_vertex: "vec3 objectNormal=vec3(normal);\n#ifdef USE_TANGENT\nvec3 objectTangent=vec3(tangent.xyz);\n#endif",
            bsdfs:
                "vec2 integrateSpecularBRDF(const in float dotNV,const in float roughness){const vec4 c0=vec4(-1,-0.0275,-0.572,0.022);const vec4 c1=vec4(1,0.0425,1.04,-0.04);vec4 r=roughness*c0+c1;float a004=min(r.x*r.x,exp2(-9.28*dotNV))*r.x+r.y;return vec2(-1.04,1.04)*a004+r.zw;}float punctualLightIntensityToIrradianceFactor(const in float lightDistance,const in float cutoffDistance,const in float decayExponent){\n#if defined(PHYSICALLY_CORRECT_LIGHTS)\nfloat distanceFalloff=1.0/max(pow(lightDistance,decayExponent),0.01);if(cutoffDistance>0.0){distanceFalloff*=pow2(saturate(1.0-pow4(lightDistance/cutoffDistance)));}return distanceFalloff;\n#else\nif(cutoffDistance>0.0&&decayExponent>0.0){return pow(saturate(-lightDistance/cutoffDistance+1.0),decayExponent);}return 1.0;\n#endif\n}vec3 BRDF_Diffuse_Lambert(const in vec3 diffuseColor){return RECIPROCAL_PI*diffuseColor;}vec3 F_Schlick(const in vec3 specularColor,const in float dotLH){float fresnel=exp2((-5.55473*dotLH-6.98316)*dotLH);return(1.0-specularColor)*fresnel+specularColor;}vec3 F_Schlick_RoughnessDependent(const in vec3 F0,const in float dotNV,const in float roughness){float fresnel=exp2((-5.55473*dotNV-6.98316)*dotNV);vec3 Fr=max(vec3(1.0-roughness),F0)-F0;return Fr*fresnel+F0;}float G_GGX_Smith(const in float alpha,const in float dotNL,const in float dotNV){float a2=pow2(alpha);float gl=dotNL+sqrt(a2+(1.0-a2)*pow2(dotNL));float gv=dotNV+sqrt(a2+(1.0-a2)*pow2(dotNV));return 1.0/(gl*gv);}float G_GGX_SmithCorrelated(const in float alpha,const in float dotNL,const in float dotNV){float a2=pow2(alpha);float gv=dotNL*sqrt(a2+(1.0-a2)*pow2(dotNV));float gl=dotNV*sqrt(a2+(1.0-a2)*pow2(dotNL));return 0.5/max(gv+gl,EPSILON);}float D_GGX(const in float alpha,const in float dotNH){float a2=pow2(alpha);float denom=pow2(dotNH)*(a2-1.0)+1.0;return RECIPROCAL_PI*a2/pow2(denom);}vec3 BRDF_Specular_GGX(const in IncidentLight incidentLight,const in vec3 viewDir,const in vec3 normal,const in vec3 specularColor,const in float roughness){float alpha=pow2(roughness);vec3 halfDir=normalize(incidentLight.direction+viewDir);float dotNL=saturate(dot(normal,incidentLight.direction));float dotNV=saturate(dot(normal,viewDir));float dotNH=saturate(dot(normal,halfDir));float dotLH=saturate(dot(incidentLight.direction,halfDir));vec3 F=F_Schlick(specularColor,dotLH);float G=G_GGX_SmithCorrelated(alpha,dotNL,dotNV);float D=D_GGX(alpha,dotNH);return F*(G*D);}vec2 LTC_Uv(const in vec3 N,const in vec3 V,const in float roughness){const float LUT_SIZE=64.0;const float LUT_SCALE=(LUT_SIZE-1.0)/LUT_SIZE;const float LUT_BIAS=0.5/LUT_SIZE;float dotNV=saturate(dot(N,V));vec2 uv=vec2(roughness,sqrt(1.0-dotNV));uv=uv*LUT_SCALE+LUT_BIAS;return uv;}float LTC_ClippedSphereFormFactor(const in vec3 f){float l=length(f);return max((l*l+f.z)/(l+1.0),0.0);}vec3 LTC_EdgeVectorFormFactor(const in vec3 v1,const in vec3 v2){float x=dot(v1,v2);float y=abs(x);float a=0.8543985+(0.4965155+0.0145206*y)*y;float b=3.4175940+(4.1616724+y)*y;float v=a/b;float theta_sintheta=(x>0.0)?v:0.5*inversesqrt(max(1.0-x*x,1e-7))-v;return cross(v1,v2)*theta_sintheta;}vec3 LTC_Evaluate(const in vec3 N,const in vec3 V,const in vec3 P,const in mat3 mInv,const in vec3 rectCoords[4]){vec3 v1=rectCoords[1]-rectCoords[0];vec3 v2=rectCoords[3]-rectCoords[0];vec3 lightNormal=cross(v1,v2);if(dot(lightNormal,P-rectCoords[0])<0.0)return vec3(0.0);vec3 T1,T2;T1=normalize(V-N*dot(V,N));T2=-cross(N,T1);mat3 mat=mInv*transposeMat3(mat3(T1,T2,N));vec3 coords[4];coords[0]=mat*(rectCoords[0]-P);coords[1]=mat*(rectCoords[1]-P);coords[2]=mat*(rectCoords[2]-P);coords[3]=mat*(rectCoords[3]-P);coords[0]=normalize(coords[0]);coords[1]=normalize(coords[1]);coords[2]=normalize(coords[2]);coords[3]=normalize(coords[3]);vec3 vectorFormFactor=vec3(0.0);vectorFormFactor+=LTC_EdgeVectorFormFactor(coords[0],coords[1]);vectorFormFactor+=LTC_EdgeVectorFormFactor(coords[1],coords[2]);vectorFormFactor+=LTC_EdgeVectorFormFactor(coords[2],coords[3]);vectorFormFactor+=LTC_EdgeVectorFormFactor(coords[3],coords[0]);float result=LTC_ClippedSphereFormFactor(vectorFormFactor);return vec3(result);}vec3 BRDF_Specular_GGX_Environment(const in vec3 viewDir,const in vec3 normal,const in vec3 specularColor,const in float roughness){float dotNV=saturate(dot(normal,viewDir));vec2 brdf=integrateSpecularBRDF(dotNV,roughness);return specularColor*brdf.x+brdf.y;}void BRDF_Specular_Multiscattering_Environment(const in GeometricContext geometry,const in vec3 specularColor,const in float roughness,inout vec3 singleScatter,inout vec3 multiScatter){float dotNV=saturate(dot(geometry.normal,geometry.viewDir));vec3 F=F_Schlick_RoughnessDependent(specularColor,dotNV,roughness);vec2 brdf=integrateSpecularBRDF(dotNV,roughness);vec3 FssEss=F*brdf.x+brdf.y;float Ess=brdf.x+brdf.y;float Ems=1.0-Ess;vec3 Favg=specularColor+(1.0-specularColor)*0.047619;vec3 Fms=FssEss*Favg/(1.0-Ems*Favg);singleScatter+=FssEss;multiScatter+=Fms*Ems;}float G_BlinnPhong_Implicit(){return 0.25;}float D_BlinnPhong(const in float shininess,const in float dotNH){return RECIPROCAL_PI*(shininess*0.5+1.0)*pow(dotNH,shininess);}vec3 BRDF_Specular_BlinnPhong(const in IncidentLight incidentLight,const in GeometricContext geometry,const in vec3 specularColor,const in float shininess){vec3 halfDir=normalize(incidentLight.direction+geometry.viewDir);float dotNH=saturate(dot(geometry.normal,halfDir));float dotLH=saturate(dot(incidentLight.direction,halfDir));vec3 F=F_Schlick(specularColor,dotLH);float G=G_BlinnPhong_Implicit();float D=D_BlinnPhong(shininess,dotNH);return F*(G*D);}float GGXRoughnessToBlinnExponent(const in float ggxRoughness){return(2.0/pow2(ggxRoughness+0.0001)-2.0);}float BlinnExponentToGGXRoughness(const in float blinnExponent){return sqrt(2.0/(blinnExponent+2.0));}\n#if defined(USE_SHEEN)\nfloat D_Charlie(float roughness,float NoH){float invAlpha=1.0/roughness;float cos2h=NoH*NoH;float sin2h=max(1.0-cos2h,0.0078125);return(2.0+invAlpha)*pow(sin2h,invAlpha*0.5)/(2.0*PI);}float V_Neubelt(float NoV,float NoL){return saturate(1.0/(4.0*(NoL+NoV-NoL*NoV)));}vec3 BRDF_Specular_Sheen(const in float roughness,const in vec3 L,const in GeometricContext geometry,vec3 specularColor){vec3 N=geometry.normal;vec3 V=geometry.viewDir;vec3 H=normalize(V+L);float dotNH=saturate(dot(N,H));return specularColor*D_Charlie(roughness,dotNH)*V_Neubelt(dot(N,V),dot(N,L));}\n#endif",
            bumpmap_pars_fragment:
                "#ifdef USE_BUMPMAP\nuniform sampler2D bumpMap;uniform float bumpScale;vec2 dHdxy_fwd(){vec2 dSTdx=dFdx(vUv);vec2 dSTdy=dFdy(vUv);float Hll=bumpScale*texture2D(bumpMap,vUv).x;float dBx=bumpScale*texture2D(bumpMap,vUv+dSTdx).x-Hll;float dBy=bumpScale*texture2D(bumpMap,vUv+dSTdy).x-Hll;return vec2(dBx,dBy);}vec3 perturbNormalArb(vec3 surf_pos,vec3 surf_norm,vec2 dHdxy){vec3 vSigmaX=vec3(dFdx(surf_pos.x),dFdx(surf_pos.y),dFdx(surf_pos.z));vec3 vSigmaY=vec3(dFdy(surf_pos.x),dFdy(surf_pos.y),dFdy(surf_pos.z));vec3 vN=surf_norm;vec3 R1=cross(vSigmaY,vN);vec3 R2=cross(vN,vSigmaX);float fDet=dot(vSigmaX,R1);fDet*=(float(gl_FrontFacing)*2.0-1.0);vec3 vGrad=sign(fDet)*(dHdxy.x*R1+dHdxy.y*R2);return normalize(abs(fDet)*surf_norm-vGrad);}\n#endif",
            clipping_planes_fragment:
                "#if NUM_CLIPPING_PLANES>0\nvec4 plane;\n#pragma unroll_loop_start\nfor(int i=0;i<UNION_CLIPPING_PLANES;i++){plane=clippingPlanes[i];if(dot(vClipPosition,plane.xyz)>plane.w)discard;}\n#pragma unroll_loop_end\n#if UNION_CLIPPING_PLANES<NUM_CLIPPING_PLANES\nbool clipped=true;\n#pragma unroll_loop_start\nfor(int i=UNION_CLIPPING_PLANES;i<NUM_CLIPPING_PLANES;i++){plane=clippingPlanes[i];clipped=(dot(vClipPosition,plane.xyz)>plane.w)&&clipped;}\n#pragma unroll_loop_end\nif(clipped)discard;\n#endif\n#endif",
            clipping_planes_pars_fragment: "#if NUM_CLIPPING_PLANES>0\nvarying vec3 vClipPosition;uniform vec4 clippingPlanes[NUM_CLIPPING_PLANES];\n#endif",
            clipping_planes_pars_vertex: "#if NUM_CLIPPING_PLANES>0\nvarying vec3 vClipPosition;\n#endif",
            clipping_planes_vertex: "#if NUM_CLIPPING_PLANES>0\nvClipPosition=-mvPosition.xyz;\n#endif",
            color_fragment: "#ifdef USE_COLOR\ndiffuseColor.rgb*=vColor;\n#endif",
            color_pars_fragment: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
            color_pars_vertex: "#if defined(USE_COLOR)||defined(USE_INSTANCING_COLOR)\nvarying vec3 vColor;\n#endif",
            color_vertex: "#if defined(USE_COLOR)||defined(USE_INSTANCING_COLOR)\nvColor=vec3(1.0);\n#endif\n#ifdef USE_COLOR\nvColor.xyz*=color.xyz;\n#endif\n#ifdef USE_INSTANCING_COLOR\nvColor.xyz*=instanceColor.xyz;\n#endif",
            common:
                "#define PI 3.141592653589793\n#define PI2 6.283185307179586\n#define PI_HALF 1.5707963267948966\n#define RECIPROCAL_PI 0.3183098861837907\n#define RECIPROCAL_PI2 0.15915494309189535\n#define EPSILON 1e-6\n#ifndef saturate\n#define saturate(a)clamp(a,0.0,1.0)\n#endif\n#define whiteComplement(a)(1.0-saturate(a))\nfloat pow2(const in float x){return x*x;}float pow3(const in float x){return x*x*x;}float pow4(const in float x){float x2=x*x;return x2*x2;}float average(const in vec3 color){return dot(color,vec3(0.3333));}highp float rand(const in vec2 uv){const highp float a=12.9898,b=78.233,c=43758.5453;highp float dt=dot(uv.xy,vec2(a,b)),sn=mod(dt,PI);return fract(sin(sn)*c);}\n#ifdef HIGH_PRECISION\nfloat precisionSafeLength(vec3 v){return length(v);}\n#else\nfloat max3(vec3 v){return max(max(v.x,v.y),v.z);}float precisionSafeLength(vec3 v){float maxComponent=max3(abs(v));return length(v/maxComponent)*maxComponent;}\n#endif\nstruct IncidentLight{vec3 color;vec3 direction;bool visible;};struct ReflectedLight{vec3 directDiffuse;vec3 directSpecular;vec3 indirectDiffuse;vec3 indirectSpecular;};struct GeometricContext{vec3 position;vec3 normal;vec3 viewDir;\n#ifdef CLEARCOAT\nvec3 clearcoatNormal;\n#endif\n};vec3 transformDirection(in vec3 dir,in mat4 matrix){return normalize((matrix*vec4(dir,0.0)).xyz);}vec3 inverseTransformDirection(in vec3 dir,in mat4 matrix){return normalize((vec4(dir,0.0)*matrix).xyz);}vec3 projectOnPlane(in vec3 point,in vec3 pointOnPlane,in vec3 planeNormal){float distance=dot(planeNormal,point-pointOnPlane);return-distance*planeNormal+point;}float sideOfPlane(in vec3 point,in vec3 pointOnPlane,in vec3 planeNormal){return sign(dot(point-pointOnPlane,planeNormal));}vec3 linePlaneIntersect(in vec3 pointOnLine,in vec3 lineDirection,in vec3 pointOnPlane,in vec3 planeNormal){return lineDirection*(dot(planeNormal,pointOnPlane-pointOnLine)/dot(planeNormal,lineDirection))+pointOnLine;}mat3 transposeMat3(const in mat3 m){mat3 tmp;tmp[0]=vec3(m[0].x,m[1].x,m[2].x);tmp[1]=vec3(m[0].y,m[1].y,m[2].y);tmp[2]=vec3(m[0].z,m[1].z,m[2].z);return tmp;}float linearToRelativeLuminance(const in vec3 color){vec3 weights=vec3(0.2126,0.7152,0.0722);return dot(weights,color.rgb);}bool isPerspectiveMatrix(mat4 m){return m[2][3]==-1.0;}vec2 equirectUv(in vec3 dir){float u=atan(dir.z,dir.x)*RECIPROCAL_PI2+0.5;float v=asin(clamp(dir.y,-1.0,1.0))*RECIPROCAL_PI+0.5;return vec2(u,v);}",
            cube_uv_reflection_fragment:
                "#ifdef ENVMAP_TYPE_CUBE_UV\n#define cubeUV_maxMipLevel 8.0\n#define cubeUV_minMipLevel 4.0\n#define cubeUV_maxTileSize 256.0\n#define cubeUV_minTileSize 16.0\nfloat getFace(vec3 direction){vec3 absDirection=abs(direction);float face=-1.0;if(absDirection.x>absDirection.z){if(absDirection.x>absDirection.y)face=direction.x>0.0?0.0:3.0;else face=direction.y>0.0?1.0:4.0;}else{if(absDirection.z>absDirection.y)face=direction.z>0.0?2.0:5.0;else face=direction.y>0.0?1.0:4.0;}return face;}vec2 getUV(vec3 direction,float face){vec2 uv;if(face==0.0){uv=vec2(direction.z,direction.y)/abs(direction.x);}else if(face==1.0){uv=vec2(-direction.x,-direction.z)/abs(direction.y);}else if(face==2.0){uv=vec2(-direction.x,direction.y)/abs(direction.z);}else if(face==3.0){uv=vec2(-direction.z,direction.y)/abs(direction.x);}else if(face==4.0){uv=vec2(-direction.x,direction.z)/abs(direction.y);}else{uv=vec2(direction.x,direction.y)/abs(direction.z);}return 0.5*(uv+1.0);}vec3 bilinearCubeUV(sampler2D envMap,vec3 direction,float mipInt){float face=getFace(direction);float filterInt=max(cubeUV_minMipLevel-mipInt,0.0);mipInt=max(mipInt,cubeUV_minMipLevel);float faceSize=exp2(mipInt);float texelSize=1.0/(3.0*cubeUV_maxTileSize);vec2 uv=getUV(direction,face)*(faceSize-1.0);vec2 f=fract(uv);uv+=0.5-f;if(face>2.0){uv.y+=faceSize;face-=3.0;}uv.x+=face*faceSize;if(mipInt<cubeUV_maxMipLevel){uv.y+=2.0*cubeUV_maxTileSize;}uv.y+=filterInt*2.0*cubeUV_minTileSize;uv.x+=3.0*max(0.0,cubeUV_maxTileSize-2.0*faceSize);uv*=texelSize;vec3 tl=envMapTexelToLinear(texture2D(envMap,uv)).rgb;uv.x+=texelSize;vec3 tr=envMapTexelToLinear(texture2D(envMap,uv)).rgb;uv.y+=texelSize;vec3 br=envMapTexelToLinear(texture2D(envMap,uv)).rgb;uv.x-=texelSize;vec3 bl=envMapTexelToLinear(texture2D(envMap,uv)).rgb;vec3 tm=mix(tl,tr,f.x);vec3 bm=mix(bl,br,f.x);return mix(tm,bm,f.y);}\n#define r0 1.0\n#define v0 0.339\n#define m0-2.0\n#define r1 0.8\n#define v1 0.276\n#define m1-1.0\n#define r4 0.4\n#define v4 0.046\n#define m4 2.0\n#define r5 0.305\n#define v5 0.016\n#define m5 3.0\n#define r6 0.21\n#define v6 0.0038\n#define m6 4.0\nfloat roughnessToMip(float roughness){float mip=0.0;if(roughness>=r1){mip=(r0-roughness)*(m1-m0)/(r0-r1)+m0;}else if(roughness>=r4){mip=(r1-roughness)*(m4-m1)/(r1-r4)+m1;}else if(roughness>=r5){mip=(r4-roughness)*(m5-m4)/(r4-r5)+m4;}else if(roughness>=r6){mip=(r5-roughness)*(m6-m5)/(r5-r6)+m5;}else{mip=-2.0*log2(1.16*roughness);}return mip;}vec4 textureCubeUV(sampler2D envMap,vec3 sampleDir,float roughness){float mip=clamp(roughnessToMip(roughness),m0,cubeUV_maxMipLevel);float mipF=fract(mip);float mipInt=floor(mip);vec3 color0=bilinearCubeUV(envMap,sampleDir,mipInt);if(mipF==0.0){return vec4(color0,1.0);}else{vec3 color1=bilinearCubeUV(envMap,sampleDir,mipInt+1.0);return vec4(mix(color0,color1,mipF),1.0);}}\n#endif",
            defaultnormal_vertex:
                "vec3 transformedNormal=objectNormal;\n#ifdef USE_INSTANCING\nmat3 m=mat3(instanceMatrix);transformedNormal/=vec3(dot(m[0],m[0]),dot(m[1],m[1]),dot(m[2],m[2]));transformedNormal=m*transformedNormal;\n#endif\ntransformedNormal=normalMatrix*transformedNormal;\n#ifdef FLIP_SIDED\ntransformedNormal=-transformedNormal;\n#endif\n#ifdef USE_TANGENT\nvec3 transformedTangent=(modelViewMatrix*vec4(objectTangent,0.0)).xyz;\n#ifdef FLIP_SIDED\ntransformedTangent=-transformedTangent;\n#endif\n#endif",
            displacementmap_pars_vertex: "#ifdef USE_DISPLACEMENTMAP\nuniform sampler2D displacementMap;uniform float displacementScale;uniform float displacementBias;\n#endif",
            displacementmap_vertex: "#ifdef USE_DISPLACEMENTMAP\ntransformed+=normalize(objectNormal)*(texture2D(displacementMap,vUv).x*displacementScale+displacementBias);\n#endif",
            emissivemap_fragment: "#ifdef USE_EMISSIVEMAP\nvec4 emissiveColor=texture2D(emissiveMap,vUv);emissiveColor.rgb=emissiveMapTexelToLinear(emissiveColor).rgb;totalEmissiveRadiance*=emissiveColor.rgb;\n#endif",
            emissivemap_pars_fragment: "#ifdef USE_EMISSIVEMAP\nuniform sampler2D emissiveMap;\n#endif",
            encodings_fragment: "gl_FragColor=linearToOutputTexel(gl_FragColor);",
            encodings_pars_fragment:
                "vec4 LinearToLinear(in vec4 value){return value;}vec4 GammaToLinear(in vec4 value,in float gammaFactor){return vec4(pow(value.rgb,vec3(gammaFactor)),value.a);}vec4 LinearToGamma(in vec4 value,in float gammaFactor){return vec4(pow(value.rgb,vec3(1.0/gammaFactor)),value.a);}vec4 sRGBToLinear(in vec4 value){return vec4(mix(pow(value.rgb*0.9478672986+vec3(0.0521327014),vec3(2.4)),value.rgb*0.0773993808,vec3(lessThanEqual(value.rgb,vec3(0.04045)))),value.a);}vec4 LinearTosRGB(in vec4 value){return vec4(mix(pow(value.rgb,vec3(0.41666))*1.055-vec3(0.055),value.rgb*12.92,vec3(lessThanEqual(value.rgb,vec3(0.0031308)))),value.a);}vec4 RGBEToLinear(in vec4 value){return vec4(value.rgb*exp2(value.a*255.0-128.0),1.0);}vec4 LinearToRGBE(in vec4 value){float maxComponent=max(max(value.r,value.g),value.b);float fExp=clamp(ceil(log2(maxComponent)),-128.0,127.0);return vec4(value.rgb/exp2(fExp),(fExp+128.0)/255.0);}vec4 RGBMToLinear(in vec4 value,in float maxRange){return vec4(value.rgb*value.a*maxRange,1.0);}vec4 LinearToRGBM(in vec4 value,in float maxRange){float maxRGB=max(value.r,max(value.g,value.b));float M=clamp(maxRGB/maxRange,0.0,1.0);M=ceil(M*255.0)/255.0;return vec4(value.rgb/(M*maxRange),M);}vec4 RGBDToLinear(in vec4 value,in float maxRange){return vec4(value.rgb*((maxRange/255.0)/value.a),1.0);}vec4 LinearToRGBD(in vec4 value,in float maxRange){float maxRGB=max(value.r,max(value.g,value.b));float D=max(maxRange/maxRGB,1.0);D=clamp(floor(D)/255.0,0.0,1.0);return vec4(value.rgb*(D*(255.0/maxRange)),D);}const mat3 cLogLuvM=mat3(0.2209,0.3390,0.4184,0.1138,0.6780,0.7319,0.0102,0.1130,0.2969);vec4 LinearToLogLuv(in vec4 value){vec3 Xp_Y_XYZp=cLogLuvM*value.rgb;Xp_Y_XYZp=max(Xp_Y_XYZp,vec3(1e-6,1e-6,1e-6));vec4 vResult;vResult.xy=Xp_Y_XYZp.xy/Xp_Y_XYZp.z;float Le=2.0*log2(Xp_Y_XYZp.y)+127.0;vResult.w=fract(Le);vResult.z=(Le-(floor(vResult.w*255.0))/255.0)/255.0;return vResult;}const mat3 cLogLuvInverseM=mat3(6.0014,-2.7008,-1.7996,-1.3320,3.1029,-5.7721,0.3008,-1.0882,5.6268);vec4 LogLuvToLinear(in vec4 value){float Le=value.z*255.0+value.w;vec3 Xp_Y_XYZp;Xp_Y_XYZp.y=exp2((Le-127.0)/2.0);Xp_Y_XYZp.z=Xp_Y_XYZp.y/value.y;Xp_Y_XYZp.x=value.x*Xp_Y_XYZp.z;vec3 vRGB=cLogLuvInverseM*Xp_Y_XYZp.rgb;return vec4(max(vRGB,0.0),1.0);}",
            envmap_fragment:
                "#ifdef USE_ENVMAP\n#ifdef ENV_WORLDPOS\nvec3 cameraToFrag;if(isOrthographic){cameraToFrag=normalize(vec3(-viewMatrix[0][2],-viewMatrix[1][2],-viewMatrix[2][2]));}else{cameraToFrag=normalize(vWorldPosition-cameraPosition);}vec3 worldNormal=inverseTransformDirection(normal,viewMatrix);\n#ifdef ENVMAP_MODE_REFLECTION\nvec3 reflectVec=reflect(cameraToFrag,worldNormal);\n#else\nvec3 reflectVec=refract(cameraToFrag,worldNormal,refractionRatio);\n#endif\n#else\nvec3 reflectVec=vReflect;\n#endif\n#ifdef ENVMAP_TYPE_CUBE\nvec4 envColor=textureCube(envMap,vec3(flipEnvMap*reflectVec.x,reflectVec.yz));\n#elif defined(ENVMAP_TYPE_CUBE_UV)\nvec4 envColor=textureCubeUV(envMap,reflectVec,0.0);\n#else\nvec4 envColor=vec4(0.0);\n#endif\n#ifndef ENVMAP_TYPE_CUBE_UV\nenvColor=envMapTexelToLinear(envColor);\n#endif\n#ifdef ENVMAP_BLENDING_MULTIPLY\noutgoingLight=mix(outgoingLight,outgoingLight*envColor.xyz,specularStrength*reflectivity);\n#elif defined(ENVMAP_BLENDING_MIX)\noutgoingLight=mix(outgoingLight,envColor.xyz,specularStrength*reflectivity);\n#elif defined(ENVMAP_BLENDING_ADD)\noutgoingLight+=envColor.xyz*specularStrength*reflectivity;\n#endif\n#endif",
            envmap_common_pars_fragment:
                "#ifdef USE_ENVMAP\nuniform float envMapIntensity;uniform float flipEnvMap;uniform int maxMipLevel;\n#ifdef ENVMAP_TYPE_CUBE\nuniform samplerCube envMap;\n#else\nuniform sampler2D envMap;\n#endif\n#endif",
            envmap_pars_fragment:
                "#ifdef USE_ENVMAP\nuniform float reflectivity;\n#if defined(USE_BUMPMAP)||defined(USE_NORMALMAP)||defined(PHONG)\n#define ENV_WORLDPOS\n#endif\n#ifdef ENV_WORLDPOS\nvarying vec3 vWorldPosition;uniform float refractionRatio;\n#else\nvarying vec3 vReflect;\n#endif\n#endif",
            envmap_pars_vertex:
                "#ifdef USE_ENVMAP\n#if defined(USE_BUMPMAP)||defined(USE_NORMALMAP)||defined(PHONG)\n#define ENV_WORLDPOS\n#endif\n#ifdef ENV_WORLDPOS\nvarying vec3 vWorldPosition;\n#else\nvarying vec3 vReflect;uniform float refractionRatio;\n#endif\n#endif",
            envmap_physical_pars_fragment:
                "#if defined(USE_ENVMAP)\n#ifdef ENVMAP_MODE_REFRACTION\nuniform float refractionRatio;\n#endif\nvec3 getLightProbeIndirectIrradiance(const in GeometricContext geometry,const in int maxMIPLevel){vec3 worldNormal=inverseTransformDirection(geometry.normal,viewMatrix);\n#ifdef ENVMAP_TYPE_CUBE\nvec3 queryVec=vec3(flipEnvMap*worldNormal.x,worldNormal.yz);\n#ifdef TEXTURE_LOD_EXT\nvec4 envMapColor=textureCubeLodEXT(envMap,queryVec,float(maxMIPLevel));\n#else\nvec4 envMapColor=textureCube(envMap,queryVec,float(maxMIPLevel));\n#endif\nenvMapColor.rgb=envMapTexelToLinear(envMapColor).rgb;\n#elif defined(ENVMAP_TYPE_CUBE_UV)\nvec4 envMapColor=textureCubeUV(envMap,worldNormal,1.0);\n#else\nvec4 envMapColor=vec4(0.0);\n#endif\nreturn PI*envMapColor.rgb*envMapIntensity;}float getSpecularMIPLevel(const in float roughness,const in int maxMIPLevel){float maxMIPLevelScalar=float(maxMIPLevel);float sigma=PI*roughness*roughness/(1.0+roughness);float desiredMIPLevel=maxMIPLevelScalar+log2(sigma);return clamp(desiredMIPLevel,0.0,maxMIPLevelScalar);}vec3 getLightProbeIndirectRadiance(const in vec3 viewDir,const in vec3 normal,const in float roughness,const in int maxMIPLevel){\n#ifdef ENVMAP_MODE_REFLECTION\nvec3 reflectVec=reflect(-viewDir,normal);reflectVec=normalize(mix(reflectVec,normal,roughness*roughness));\n#else\nvec3 reflectVec=refract(-viewDir,normal,refractionRatio);\n#endif\nreflectVec=inverseTransformDirection(reflectVec,viewMatrix);float specularMIPLevel=getSpecularMIPLevel(roughness,maxMIPLevel);\n#ifdef ENVMAP_TYPE_CUBE\nvec3 queryReflectVec=vec3(flipEnvMap*reflectVec.x,reflectVec.yz);\n#ifdef TEXTURE_LOD_EXT\nvec4 envMapColor=textureCubeLodEXT(envMap,queryReflectVec,specularMIPLevel);\n#else\nvec4 envMapColor=textureCube(envMap,queryReflectVec,specularMIPLevel);\n#endif\nenvMapColor.rgb=envMapTexelToLinear(envMapColor).rgb;\n#elif defined(ENVMAP_TYPE_CUBE_UV)\nvec4 envMapColor=textureCubeUV(envMap,reflectVec,roughness);\n#endif\nreturn envMapColor.rgb*envMapIntensity;}\n#endif",
            envmap_vertex:
                "#ifdef USE_ENVMAP\n#ifdef ENV_WORLDPOS\nvWorldPosition=worldPosition.xyz;\n#else\nvec3 cameraToVertex;if(isOrthographic){cameraToVertex=normalize(vec3(-viewMatrix[0][2],-viewMatrix[1][2],-viewMatrix[2][2]));}else{cameraToVertex=normalize(worldPosition.xyz-cameraPosition);}vec3 worldNormal=inverseTransformDirection(transformedNormal,viewMatrix);\n#ifdef ENVMAP_MODE_REFLECTION\nvReflect=reflect(cameraToVertex,worldNormal);\n#else\nvReflect=refract(cameraToVertex,worldNormal,refractionRatio);\n#endif\n#endif\n#endif",
            fog_vertex: "#ifdef USE_FOG\nfogDepth=-mvPosition.z;\n#endif",
            fog_pars_vertex: "#ifdef USE_FOG\nvarying float fogDepth;\n#endif",
            fog_fragment:
                "#ifdef USE_FOG\n#ifdef FOG_EXP2\nfloat fogFactor=1.0-exp(-fogDensity*fogDensity*fogDepth*fogDepth);\n#else\nfloat fogFactor=smoothstep(fogNear,fogFar,fogDepth);\n#endif\ngl_FragColor.rgb=mix(gl_FragColor.rgb,fogColor,fogFactor);\n#endif",
            fog_pars_fragment: "#ifdef USE_FOG\nuniform vec3 fogColor;varying float fogDepth;\n#ifdef FOG_EXP2\nuniform float fogDensity;\n#else\nuniform float fogNear;uniform float fogFar;\n#endif\n#endif",
            gradientmap_pars_fragment:
                "#ifdef USE_GRADIENTMAP\nuniform sampler2D gradientMap;\n#endif\nvec3 getGradientIrradiance(vec3 normal,vec3 lightDirection){float dotNL=dot(normal,lightDirection);vec2 coord=vec2(dotNL*0.5+0.5,0.0);\n#ifdef USE_GRADIENTMAP\nreturn texture2D(gradientMap,coord).rgb;\n#else\nreturn(coord.x<0.7)?vec3(0.7):vec3(1.0);\n#endif\n}",
            lightmap_fragment: "#ifdef USE_LIGHTMAP\nvec4 lightMapTexel=texture2D(lightMap,vUv2);reflectedLight.indirectDiffuse+=PI*lightMapTexelToLinear(lightMapTexel).rgb*lightMapIntensity;\n#endif",
            lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\nuniform sampler2D lightMap;uniform float lightMapIntensity;\n#endif",
            lights_lambert_vertex:
                "vec3 diffuse=vec3(1.0);GeometricContext geometry;geometry.position=mvPosition.xyz;geometry.normal=normalize(transformedNormal);geometry.viewDir=(isOrthographic)?vec3(0,0,1):normalize(-mvPosition.xyz);GeometricContext backGeometry;backGeometry.position=geometry.position;backGeometry.normal=-geometry.normal;backGeometry.viewDir=geometry.viewDir;vLightFront=vec3(0.0);vIndirectFront=vec3(0.0);\n#ifdef DOUBLE_SIDED\nvLightBack=vec3(0.0);vIndirectBack=vec3(0.0);\n#endif\nIncidentLight directLight;float dotNL;vec3 directLightColor_Diffuse;vIndirectFront+=getAmbientLightIrradiance(ambientLightColor);vIndirectFront+=getLightProbeIrradiance(lightProbe,geometry);\n#ifdef DOUBLE_SIDED\nvIndirectBack+=getAmbientLightIrradiance(ambientLightColor);vIndirectBack+=getLightProbeIrradiance(lightProbe,backGeometry);\n#endif\n#if NUM_POINT_LIGHTS>0\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_POINT_LIGHTS;i++){getPointDirectLightIrradiance(pointLights[i],geometry,directLight);dotNL=dot(geometry.normal,directLight.direction);directLightColor_Diffuse=PI*directLight.color;vLightFront+=saturate(dotNL)*directLightColor_Diffuse;\n#ifdef DOUBLE_SIDED\nvLightBack+=saturate(-dotNL)*directLightColor_Diffuse;\n#endif\n}\n#pragma unroll_loop_end\n#endif\n#if NUM_SPOT_LIGHTS>0\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_SPOT_LIGHTS;i++){getSpotDirectLightIrradiance(spotLights[i],geometry,directLight);dotNL=dot(geometry.normal,directLight.direction);directLightColor_Diffuse=PI*directLight.color;vLightFront+=saturate(dotNL)*directLightColor_Diffuse;\n#ifdef DOUBLE_SIDED\nvLightBack+=saturate(-dotNL)*directLightColor_Diffuse;\n#endif\n}\n#pragma unroll_loop_end\n#endif\n#if NUM_DIR_LIGHTS>0\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_DIR_LIGHTS;i++){getDirectionalDirectLightIrradiance(directionalLights[i],geometry,directLight);dotNL=dot(geometry.normal,directLight.direction);directLightColor_Diffuse=PI*directLight.color;vLightFront+=saturate(dotNL)*directLightColor_Diffuse;\n#ifdef DOUBLE_SIDED\nvLightBack+=saturate(-dotNL)*directLightColor_Diffuse;\n#endif\n}\n#pragma unroll_loop_end\n#endif\n#if NUM_HEMI_LIGHTS>0\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_HEMI_LIGHTS;i++){vIndirectFront+=getHemisphereLightIrradiance(hemisphereLights[i],geometry);\n#ifdef DOUBLE_SIDED\nvIndirectBack+=getHemisphereLightIrradiance(hemisphereLights[i],backGeometry);\n#endif\n}\n#pragma unroll_loop_end\n#endif",
            lights_pars_begin:
                "uniform bool receiveShadow;uniform vec3 ambientLightColor;uniform vec3 lightProbe[9];vec3 shGetIrradianceAt(in vec3 normal,in vec3 shCoefficients[9]){float x=normal.x,y=normal.y,z=normal.z;vec3 result=shCoefficients[0]*0.886227;result+=shCoefficients[1]*2.0*0.511664*y;result+=shCoefficients[2]*2.0*0.511664*z;result+=shCoefficients[3]*2.0*0.511664*x;result+=shCoefficients[4]*2.0*0.429043*x*y;result+=shCoefficients[5]*2.0*0.429043*y*z;result+=shCoefficients[6]*(0.743125*z*z-0.247708);result+=shCoefficients[7]*2.0*0.429043*x*z;result+=shCoefficients[8]*0.429043*(x*x-y*y);return result;}vec3 getLightProbeIrradiance(const in vec3 lightProbe[9],const in GeometricContext geometry){vec3 worldNormal=inverseTransformDirection(geometry.normal,viewMatrix);vec3 irradiance=shGetIrradianceAt(worldNormal,lightProbe);return irradiance;}vec3 getAmbientLightIrradiance(const in vec3 ambientLightColor){vec3 irradiance=ambientLightColor;\n#ifndef PHYSICALLY_CORRECT_LIGHTS\nirradiance*=PI;\n#endif\nreturn irradiance;}\n#if NUM_DIR_LIGHTS>0\nstruct DirectionalLight{vec3 direction;vec3 color;};uniform DirectionalLight directionalLights[NUM_DIR_LIGHTS];void getDirectionalDirectLightIrradiance(const in DirectionalLight directionalLight,const in GeometricContext geometry,out IncidentLight directLight){directLight.color=directionalLight.color;directLight.direction=directionalLight.direction;directLight.visible=true;}\n#endif\n#if NUM_POINT_LIGHTS>0\nstruct PointLight{vec3 position;vec3 color;float distance;float decay;};uniform PointLight pointLights[NUM_POINT_LIGHTS];void getPointDirectLightIrradiance(const in PointLight pointLight,const in GeometricContext geometry,out IncidentLight directLight){vec3 lVector=pointLight.position-geometry.position;directLight.direction=normalize(lVector);float lightDistance=length(lVector);directLight.color=pointLight.color;directLight.color*=punctualLightIntensityToIrradianceFactor(lightDistance,pointLight.distance,pointLight.decay);directLight.visible=(directLight.color!=vec3(0.0));}\n#endif\n#if NUM_SPOT_LIGHTS>0\nstruct SpotLight{vec3 position;vec3 direction;vec3 color;float distance;float decay;float coneCos;float penumbraCos;};uniform SpotLight spotLights[NUM_SPOT_LIGHTS];void getSpotDirectLightIrradiance(const in SpotLight spotLight,const in GeometricContext geometry,out IncidentLight directLight){vec3 lVector=spotLight.position-geometry.position;directLight.direction=normalize(lVector);float lightDistance=length(lVector);float angleCos=dot(directLight.direction,spotLight.direction);if(angleCos>spotLight.coneCos){float spotEffect=smoothstep(spotLight.coneCos,spotLight.penumbraCos,angleCos);directLight.color=spotLight.color;directLight.color*=spotEffect*punctualLightIntensityToIrradianceFactor(lightDistance,spotLight.distance,spotLight.decay);directLight.visible=true;}else{directLight.color=vec3(0.0);directLight.visible=false;}}\n#endif\n#if NUM_RECT_AREA_LIGHTS>0\nstruct RectAreaLight{vec3 color;vec3 position;vec3 halfWidth;vec3 halfHeight;};uniform sampler2D ltc_1;uniform sampler2D ltc_2;uniform RectAreaLight rectAreaLights[NUM_RECT_AREA_LIGHTS];\n#endif\n#if NUM_HEMI_LIGHTS>0\nstruct HemisphereLight{vec3 direction;vec3 skyColor;vec3 groundColor;};uniform HemisphereLight hemisphereLights[NUM_HEMI_LIGHTS];vec3 getHemisphereLightIrradiance(const in HemisphereLight hemiLight,const in GeometricContext geometry){float dotNL=dot(geometry.normal,hemiLight.direction);float hemiDiffuseWeight=0.5*dotNL+0.5;vec3 irradiance=mix(hemiLight.groundColor,hemiLight.skyColor,hemiDiffuseWeight);\n#ifndef PHYSICALLY_CORRECT_LIGHTS\nirradiance*=PI;\n#endif\nreturn irradiance;}\n#endif",
            lights_toon_fragment: "ToonMaterial material;material.diffuseColor=diffuseColor.rgb;",
            lights_toon_pars_fragment:
                "varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\nvarying vec3 vNormal;\n#endif\nstruct ToonMaterial{vec3 diffuseColor;};void RE_Direct_Toon(const in IncidentLight directLight,const in GeometricContext geometry,const in ToonMaterial material,inout ReflectedLight reflectedLight){vec3 irradiance=getGradientIrradiance(geometry.normal,directLight.direction)*directLight.color;\n#ifndef PHYSICALLY_CORRECT_LIGHTS\nirradiance*=PI;\n#endif\nreflectedLight.directDiffuse+=irradiance*BRDF_Diffuse_Lambert(material.diffuseColor);}void RE_IndirectDiffuse_Toon(const in vec3 irradiance,const in GeometricContext geometry,const in ToonMaterial material,inout ReflectedLight reflectedLight){reflectedLight.indirectDiffuse+=irradiance*BRDF_Diffuse_Lambert(material.diffuseColor);}\n#define RE_Direct RE_Direct_Toon\n#define RE_IndirectDiffuse RE_IndirectDiffuse_Toon\n#define Material_LightProbeLOD(material)(0)",
            lights_phong_fragment: "BlinnPhongMaterial material;material.diffuseColor=diffuseColor.rgb;material.specularColor=specular;material.specularShininess=shininess;material.specularStrength=specularStrength;",
            lights_phong_pars_fragment:
                "varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\nvarying vec3 vNormal;\n#endif\nstruct BlinnPhongMaterial{vec3 diffuseColor;vec3 specularColor;float specularShininess;float specularStrength;};void RE_Direct_BlinnPhong(const in IncidentLight directLight,const in GeometricContext geometry,const in BlinnPhongMaterial material,inout ReflectedLight reflectedLight){float dotNL=saturate(dot(geometry.normal,directLight.direction));vec3 irradiance=dotNL*directLight.color;\n#ifndef PHYSICALLY_CORRECT_LIGHTS\nirradiance*=PI;\n#endif\nreflectedLight.directDiffuse+=irradiance*BRDF_Diffuse_Lambert(material.diffuseColor);reflectedLight.directSpecular+=irradiance*BRDF_Specular_BlinnPhong(directLight,geometry,material.specularColor,material.specularShininess)*material.specularStrength;}void RE_IndirectDiffuse_BlinnPhong(const in vec3 irradiance,const in GeometricContext geometry,const in BlinnPhongMaterial material,inout ReflectedLight reflectedLight){reflectedLight.indirectDiffuse+=irradiance*BRDF_Diffuse_Lambert(material.diffuseColor);}\n#define RE_Direct RE_Direct_BlinnPhong\n#define RE_IndirectDiffuse RE_IndirectDiffuse_BlinnPhong\n#define Material_LightProbeLOD(material)(0)",
            lights_physical_fragment:
                "PhysicalMaterial material;material.diffuseColor=diffuseColor.rgb*(1.0-metalnessFactor);vec3 dxy=max(abs(dFdx(geometryNormal)),abs(dFdy(geometryNormal)));float geometryRoughness=max(max(dxy.x,dxy.y),dxy.z);material.specularRoughness=max(roughnessFactor,0.0525);material.specularRoughness+=geometryRoughness;material.specularRoughness=min(material.specularRoughness,1.0);\n#ifdef REFLECTIVITY\nmaterial.specularColor=mix(vec3(MAXIMUM_SPECULAR_COEFFICIENT*pow2(reflectivity)),diffuseColor.rgb,metalnessFactor);\n#else\nmaterial.specularColor=mix(vec3(DEFAULT_SPECULAR_COEFFICIENT),diffuseColor.rgb,metalnessFactor);\n#endif\n#ifdef CLEARCOAT\nmaterial.clearcoat=clearcoat;material.clearcoatRoughness=clearcoatRoughness;\n#ifdef USE_CLEARCOATMAP\nmaterial.clearcoat*=texture2D(clearcoatMap,vUv).x;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\nmaterial.clearcoatRoughness*=texture2D(clearcoatRoughnessMap,vUv).y;\n#endif\nmaterial.clearcoat=saturate(material.clearcoat);material.clearcoatRoughness=max(material.clearcoatRoughness,0.0525);material.clearcoatRoughness+=geometryRoughness;material.clearcoatRoughness=min(material.clearcoatRoughness,1.0);\n#endif\n#ifdef USE_SHEEN\nmaterial.sheenColor=sheen;\n#endif",
            lights_physical_pars_fragment:
                "struct PhysicalMaterial{vec3 diffuseColor;float specularRoughness;vec3 specularColor;\n#ifdef CLEARCOAT\nfloat clearcoat;float clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\nvec3 sheenColor;\n#endif\n};\n#define MAXIMUM_SPECULAR_COEFFICIENT 0.16\n#define DEFAULT_SPECULAR_COEFFICIENT 0.04\nfloat clearcoatDHRApprox(const in float roughness,const in float dotNL){return DEFAULT_SPECULAR_COEFFICIENT+(1.0-DEFAULT_SPECULAR_COEFFICIENT)*(pow(1.0-dotNL,5.0)*pow(1.0-roughness,2.0));}\n#if NUM_RECT_AREA_LIGHTS>0\nvoid RE_Direct_RectArea_Physical(const in RectAreaLight rectAreaLight,const in GeometricContext geometry,const in PhysicalMaterial material,inout ReflectedLight reflectedLight){vec3 normal=geometry.normal;vec3 viewDir=geometry.viewDir;vec3 position=geometry.position;vec3 lightPos=rectAreaLight.position;vec3 halfWidth=rectAreaLight.halfWidth;vec3 halfHeight=rectAreaLight.halfHeight;vec3 lightColor=rectAreaLight.color;float roughness=material.specularRoughness;vec3 rectCoords[4];rectCoords[0]=lightPos+halfWidth-halfHeight;rectCoords[1]=lightPos-halfWidth-halfHeight;rectCoords[2]=lightPos-halfWidth+halfHeight;rectCoords[3]=lightPos+halfWidth+halfHeight;vec2 uv=LTC_Uv(normal,viewDir,roughness);vec4 t1=texture2D(ltc_1,uv);vec4 t2=texture2D(ltc_2,uv);mat3 mInv=mat3(vec3(t1.x,0,t1.y),vec3(0,1,0),vec3(t1.z,0,t1.w));vec3 fresnel=(material.specularColor*t2.x+(vec3(1.0)-material.specularColor)*t2.y);reflectedLight.directSpecular+=lightColor*fresnel*LTC_Evaluate(normal,viewDir,position,mInv,rectCoords);reflectedLight.directDiffuse+=lightColor*material.diffuseColor*LTC_Evaluate(normal,viewDir,position,mat3(1.0),rectCoords);}\n#endif\nvoid RE_Direct_Physical(const in IncidentLight directLight,const in GeometricContext geometry,const in PhysicalMaterial material,inout ReflectedLight reflectedLight){float dotNL=saturate(dot(geometry.normal,directLight.direction));vec3 irradiance=dotNL*directLight.color;\n#ifndef PHYSICALLY_CORRECT_LIGHTS\nirradiance*=PI;\n#endif\n#ifdef CLEARCOAT\nfloat ccDotNL=saturate(dot(geometry.clearcoatNormal,directLight.direction));vec3 ccIrradiance=ccDotNL*directLight.color;\n#ifndef PHYSICALLY_CORRECT_LIGHTS\nccIrradiance*=PI;\n#endif\nfloat clearcoatDHR=material.clearcoat*clearcoatDHRApprox(material.clearcoatRoughness,ccDotNL);reflectedLight.directSpecular+=ccIrradiance*material.clearcoat*BRDF_Specular_GGX(directLight,geometry.viewDir,geometry.clearcoatNormal,vec3(DEFAULT_SPECULAR_COEFFICIENT),material.clearcoatRoughness);\n#else\nfloat clearcoatDHR=0.0;\n#endif\n#ifdef USE_SHEEN\nreflectedLight.directSpecular+=(1.0-clearcoatDHR)*irradiance*BRDF_Specular_Sheen(material.specularRoughness,directLight.direction,geometry,material.sheenColor);\n#else\nreflectedLight.directSpecular+=(1.0-clearcoatDHR)*irradiance*BRDF_Specular_GGX(directLight,geometry.viewDir,geometry.normal,material.specularColor,material.specularRoughness);\n#endif\nreflectedLight.directDiffuse+=(1.0-clearcoatDHR)*irradiance*BRDF_Diffuse_Lambert(material.diffuseColor);}void RE_IndirectDiffuse_Physical(const in vec3 irradiance,const in GeometricContext geometry,const in PhysicalMaterial material,inout ReflectedLight reflectedLight){reflectedLight.indirectDiffuse+=irradiance*BRDF_Diffuse_Lambert(material.diffuseColor);}void RE_IndirectSpecular_Physical(const in vec3 radiance,const in vec3 irradiance,const in vec3 clearcoatRadiance,const in GeometricContext geometry,const in PhysicalMaterial material,inout ReflectedLight reflectedLight){\n#ifdef CLEARCOAT\nfloat ccDotNV=saturate(dot(geometry.clearcoatNormal,geometry.viewDir));reflectedLight.indirectSpecular+=clearcoatRadiance*material.clearcoat*BRDF_Specular_GGX_Environment(geometry.viewDir,geometry.clearcoatNormal,vec3(DEFAULT_SPECULAR_COEFFICIENT),material.clearcoatRoughness);float ccDotNL=ccDotNV;float clearcoatDHR=material.clearcoat*clearcoatDHRApprox(material.clearcoatRoughness,ccDotNL);\n#else\nfloat clearcoatDHR=0.0;\n#endif\nfloat clearcoatInv=1.0-clearcoatDHR;vec3 singleScattering=vec3(0.0);vec3 multiScattering=vec3(0.0);vec3 cosineWeightedIrradiance=irradiance*RECIPROCAL_PI;BRDF_Specular_Multiscattering_Environment(geometry,material.specularColor,material.specularRoughness,singleScattering,multiScattering);vec3 diffuse=material.diffuseColor*(1.0-(singleScattering+multiScattering));reflectedLight.indirectSpecular+=clearcoatInv*radiance*singleScattering;reflectedLight.indirectSpecular+=multiScattering*cosineWeightedIrradiance;reflectedLight.indirectDiffuse+=diffuse*cosineWeightedIrradiance;}\n#define RE_Direct RE_Direct_Physical\n#define RE_Direct_RectArea RE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse RE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular RE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion(const in float dotNV,const in float ambientOcclusion,const in float roughness){return saturate(pow(dotNV+ambientOcclusion,exp2(-16.0*roughness-1.0))-1.0+ambientOcclusion);}",
            lights_fragment_begin:
                "GeometricContext geometry;geometry.position=-vViewPosition;geometry.normal=normal;geometry.viewDir=(isOrthographic)?vec3(0,0,1):normalize(vViewPosition);\n#ifdef CLEARCOAT\ngeometry.clearcoatNormal=clearcoatNormal;\n#endif\nIncidentLight directLight;\n#if (NUM_POINT_LIGHTS>0)&&defined(RE_Direct)\nPointLight pointLight;\n#if defined(USE_SHADOWMAP)&&NUM_POINT_LIGHT_SHADOWS>0\nPointLightShadow pointLightShadow;\n#endif\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_POINT_LIGHTS;i++){pointLight=pointLights[i];getPointDirectLightIrradiance(pointLight,geometry,directLight);\n#if defined(USE_SHADOWMAP)&&(UNROLLED_LOOP_INDEX<NUM_POINT_LIGHT_SHADOWS)\npointLightShadow=pointLightShadows[i];directLight.color*=all(bvec2(directLight.visible,receiveShadow))?getPointShadow(pointShadowMap[i],pointLightShadow.shadowMapSize,pointLightShadow.shadowBias,pointLightShadow.shadowRadius,vPointShadowCoord[i],pointLightShadow.shadowCameraNear,pointLightShadow.shadowCameraFar):1.0;\n#endif\nRE_Direct(directLight,geometry,material,reflectedLight);}\n#pragma unroll_loop_end\n#endif\n#if (NUM_SPOT_LIGHTS>0)&&defined(RE_Direct)\nSpotLight spotLight;\n#if defined(USE_SHADOWMAP)&&NUM_SPOT_LIGHT_SHADOWS>0\nSpotLightShadow spotLightShadow;\n#endif\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_SPOT_LIGHTS;i++){spotLight=spotLights[i];getSpotDirectLightIrradiance(spotLight,geometry,directLight);\n#if defined(USE_SHADOWMAP)&&(UNROLLED_LOOP_INDEX<NUM_SPOT_LIGHT_SHADOWS)\nspotLightShadow=spotLightShadows[i];directLight.color*=all(bvec2(directLight.visible,receiveShadow))?getShadow(spotShadowMap[i],spotLightShadow.shadowMapSize,spotLightShadow.shadowBias,spotLightShadow.shadowRadius,vSpotShadowCoord[i]):1.0;\n#endif\nRE_Direct(directLight,geometry,material,reflectedLight);}\n#pragma unroll_loop_end\n#endif\n#if (NUM_DIR_LIGHTS>0)&&defined(RE_Direct)\nDirectionalLight directionalLight;\n#if defined(USE_SHADOWMAP)&&NUM_DIR_LIGHT_SHADOWS>0\nDirectionalLightShadow directionalLightShadow;\n#endif\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_DIR_LIGHTS;i++){directionalLight=directionalLights[i];getDirectionalDirectLightIrradiance(directionalLight,geometry,directLight);\n#if defined(USE_SHADOWMAP)&&(UNROLLED_LOOP_INDEX<NUM_DIR_LIGHT_SHADOWS)\ndirectionalLightShadow=directionalLightShadows[i];directLight.color*=all(bvec2(directLight.visible,receiveShadow))?getShadow(directionalShadowMap[i],directionalLightShadow.shadowMapSize,directionalLightShadow.shadowBias,directionalLightShadow.shadowRadius,vDirectionalShadowCoord[i]):1.0;\n#endif\nRE_Direct(directLight,geometry,material,reflectedLight);}\n#pragma unroll_loop_end\n#endif\n#if (NUM_RECT_AREA_LIGHTS>0)&&defined(RE_Direct_RectArea)\nRectAreaLight rectAreaLight;\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_RECT_AREA_LIGHTS;i++){rectAreaLight=rectAreaLights[i];RE_Direct_RectArea(rectAreaLight,geometry,material,reflectedLight);}\n#pragma unroll_loop_end\n#endif\n#if defined(RE_IndirectDiffuse)\nvec3 iblIrradiance=vec3(0.0);vec3 irradiance=getAmbientLightIrradiance(ambientLightColor);irradiance+=getLightProbeIrradiance(lightProbe,geometry);\n#if (NUM_HEMI_LIGHTS>0)\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_HEMI_LIGHTS;i++){irradiance+=getHemisphereLightIrradiance(hemisphereLights[i],geometry);}\n#pragma unroll_loop_end\n#endif\n#endif\n#if defined(RE_IndirectSpecular)\nvec3 radiance=vec3(0.0);vec3 clearcoatRadiance=vec3(0.0);\n#endif",
            lights_fragment_maps:
                "#if defined(RE_IndirectDiffuse)\n#ifdef USE_LIGHTMAP\nvec4 lightMapTexel=texture2D(lightMap,vUv2);vec3 lightMapIrradiance=lightMapTexelToLinear(lightMapTexel).rgb*lightMapIntensity;\n#ifndef PHYSICALLY_CORRECT_LIGHTS\nlightMapIrradiance*=PI;\n#endif\nirradiance+=lightMapIrradiance;\n#endif\n#if defined(USE_ENVMAP)&&defined(STANDARD)&&defined(ENVMAP_TYPE_CUBE_UV)\niblIrradiance+=getLightProbeIndirectIrradiance(geometry,maxMipLevel);\n#endif\n#endif\n#if defined(USE_ENVMAP)&&defined(RE_IndirectSpecular)\nradiance+=getLightProbeIndirectRadiance(geometry.viewDir,geometry.normal,material.specularRoughness,maxMipLevel);\n#ifdef CLEARCOAT\nclearcoatRadiance+=getLightProbeIndirectRadiance(geometry.viewDir,geometry.clearcoatNormal,material.clearcoatRoughness,maxMipLevel);\n#endif\n#endif",
            lights_fragment_end:
                "#if defined(RE_IndirectDiffuse)\nRE_IndirectDiffuse(irradiance,geometry,material,reflectedLight);\n#endif\n#if defined(RE_IndirectSpecular)\nRE_IndirectSpecular(radiance,iblIrradiance,clearcoatRadiance,geometry,material,reflectedLight);\n#endif",
            logdepthbuf_fragment: "#if defined(USE_LOGDEPTHBUF)&&defined(USE_LOGDEPTHBUF_EXT)\ngl_FragDepthEXT=vIsPerspective==0.0?gl_FragCoord.z:log2(vFragDepth)*logDepthBufFC*0.5;\n#endif",
            logdepthbuf_pars_fragment: "#if defined(USE_LOGDEPTHBUF)&&defined(USE_LOGDEPTHBUF_EXT)\nuniform float logDepthBufFC;varying float vFragDepth;varying float vIsPerspective;\n#endif",
            logdepthbuf_pars_vertex: "#ifdef USE_LOGDEPTHBUF\n#ifdef USE_LOGDEPTHBUF_EXT\nvarying float vFragDepth;varying float vIsPerspective;\n#else\nuniform float logDepthBufFC;\n#endif\n#endif",
            logdepthbuf_vertex:
                "#ifdef USE_LOGDEPTHBUF\n#ifdef USE_LOGDEPTHBUF_EXT\nvFragDepth=1.0+gl_Position.w;vIsPerspective=float(isPerspectiveMatrix(projectionMatrix));\n#else\nif(isPerspectiveMatrix(projectionMatrix)){gl_Position.z=log2(max(EPSILON,gl_Position.w+1.0))*logDepthBufFC-1.0;gl_Position.z*=gl_Position.w;}\n#endif\n#endif",
            map_fragment: "#ifdef USE_MAP\nvec4 texelColor=texture2D(map,vUv);texelColor=mapTexelToLinear(texelColor);diffuseColor*=texelColor;\n#endif",
            map_pars_fragment: "#ifdef USE_MAP\nuniform sampler2D map;\n#endif",
            map_particle_fragment:
                "#if defined(USE_MAP)||defined(USE_ALPHAMAP)\nvec2 uv=(uvTransform*vec3(gl_PointCoord.x,1.0-gl_PointCoord.y,1)).xy;\n#endif\n#ifdef USE_MAP\nvec4 mapTexel=texture2D(map,uv);diffuseColor*=mapTexelToLinear(mapTexel);\n#endif\n#ifdef USE_ALPHAMAP\ndiffuseColor.a*=texture2D(alphaMap,uv).g;\n#endif",
            map_particle_pars_fragment: "#if defined(USE_MAP)||defined(USE_ALPHAMAP)\nuniform mat3 uvTransform;\n#endif\n#ifdef USE_MAP\nuniform sampler2D map;\n#endif\n#ifdef USE_ALPHAMAP\nuniform sampler2D alphaMap;\n#endif",
            metalnessmap_fragment: "float metalnessFactor=metalness;\n#ifdef USE_METALNESSMAP\nvec4 texelMetalness=texture2D(metalnessMap,vUv);metalnessFactor*=texelMetalness.b;\n#endif",
            metalnessmap_pars_fragment: "#ifdef USE_METALNESSMAP\nuniform sampler2D metalnessMap;\n#endif",
            morphnormal_vertex:
                "#ifdef USE_MORPHNORMALS\nobjectNormal*=morphTargetBaseInfluence;objectNormal+=morphNormal0*morphTargetInfluences[0];objectNormal+=morphNormal1*morphTargetInfluences[1];objectNormal+=morphNormal2*morphTargetInfluences[2];objectNormal+=morphNormal3*morphTargetInfluences[3];\n#endif",
            morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\nuniform float morphTargetBaseInfluence;\n#ifndef USE_MORPHNORMALS\nuniform float morphTargetInfluences[8];\n#else\nuniform float morphTargetInfluences[4];\n#endif\n#endif",
            morphtarget_vertex:
                "#ifdef USE_MORPHTARGETS\ntransformed*=morphTargetBaseInfluence;transformed+=morphTarget0*morphTargetInfluences[0];transformed+=morphTarget1*morphTargetInfluences[1];transformed+=morphTarget2*morphTargetInfluences[2];transformed+=morphTarget3*morphTargetInfluences[3];\n#ifndef USE_MORPHNORMALS\ntransformed+=morphTarget4*morphTargetInfluences[4];transformed+=morphTarget5*morphTargetInfluences[5];transformed+=morphTarget6*morphTargetInfluences[6];transformed+=morphTarget7*morphTargetInfluences[7];\n#endif\n#endif",
            normal_fragment_begin:
                "#ifdef FLAT_SHADED\nvec3 fdx=vec3(dFdx(vViewPosition.x),dFdx(vViewPosition.y),dFdx(vViewPosition.z));vec3 fdy=vec3(dFdy(vViewPosition.x),dFdy(vViewPosition.y),dFdy(vViewPosition.z));vec3 normal=normalize(cross(fdx,fdy));\n#else\nvec3 normal=normalize(vNormal);\n#ifdef DOUBLE_SIDED\nnormal=normal*(float(gl_FrontFacing)*2.0-1.0);\n#endif\n#ifdef USE_TANGENT\nvec3 tangent=normalize(vTangent);vec3 bitangent=normalize(vBitangent);\n#ifdef DOUBLE_SIDED\ntangent=tangent*(float(gl_FrontFacing)*2.0-1.0);bitangent=bitangent*(float(gl_FrontFacing)*2.0-1.0);\n#endif\n#if defined(TANGENTSPACE_NORMALMAP)||defined(USE_CLEARCOAT_NORMALMAP)\nmat3 vTBN=mat3(tangent,bitangent,normal);\n#endif\n#endif\n#endif\nvec3 geometryNormal=normal;",
            normal_fragment_maps:
                "#ifdef OBJECTSPACE_NORMALMAP\nnormal=texture2D(normalMap,vUv).xyz*2.0-1.0;\n#ifdef FLIP_SIDED\nnormal=-normal;\n#endif\n#ifdef DOUBLE_SIDED\nnormal=normal*(float(gl_FrontFacing)*2.0-1.0);\n#endif\nnormal=normalize(normalMatrix*normal);\n#elif defined(TANGENTSPACE_NORMALMAP)\nvec3 mapN=texture2D(normalMap,vUv).xyz*2.0-1.0;mapN.xy*=normalScale;\n#ifdef USE_TANGENT\nnormal=normalize(vTBN*mapN);\n#else\nnormal=perturbNormal2Arb(-vViewPosition,normal,mapN);\n#endif\n#elif defined(USE_BUMPMAP)\nnormal=perturbNormalArb(-vViewPosition,normal,dHdxy_fwd());\n#endif",
            normalmap_pars_fragment:
                "#ifdef USE_NORMALMAP\nuniform sampler2D normalMap;uniform vec2 normalScale;\n#endif\n#ifdef OBJECTSPACE_NORMALMAP\nuniform mat3 normalMatrix;\n#endif\n#if !defined(USE_TANGENT)&&(defined(TANGENTSPACE_NORMALMAP)||defined(USE_CLEARCOAT_NORMALMAP))\nvec3 perturbNormal2Arb(vec3 eye_pos,vec3 surf_norm,vec3 mapN){vec3 q0=vec3(dFdx(eye_pos.x),dFdx(eye_pos.y),dFdx(eye_pos.z));vec3 q1=vec3(dFdy(eye_pos.x),dFdy(eye_pos.y),dFdy(eye_pos.z));vec2 st0=dFdx(vUv.st);vec2 st1=dFdy(vUv.st);float scale=sign(st1.t*st0.s-st0.t*st1.s);vec3 S=normalize((q0*st1.t-q1*st0.t)*scale);vec3 T=normalize((-q0*st1.s+q1*st0.s)*scale);vec3 N=normalize(surf_norm);mat3 tsn=mat3(S,T,N);mapN.xy*=(float(gl_FrontFacing)*2.0-1.0);return normalize(tsn*mapN);}\n#endif",
            clearcoat_normal_fragment_begin: "#ifdef CLEARCOAT\nvec3 clearcoatNormal=geometryNormal;\n#endif",
            clearcoat_normal_fragment_maps:
                "#ifdef USE_CLEARCOAT_NORMALMAP\nvec3 clearcoatMapN=texture2D(clearcoatNormalMap,vUv).xyz*2.0-1.0;clearcoatMapN.xy*=clearcoatNormalScale;\n#ifdef USE_TANGENT\nclearcoatNormal=normalize(vTBN*clearcoatMapN);\n#else\nclearcoatNormal=perturbNormal2Arb(-vViewPosition,clearcoatNormal,clearcoatMapN);\n#endif\n#endif",
            clearcoat_pars_fragment:
                "#ifdef USE_CLEARCOATMAP\nuniform sampler2D clearcoatMap;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\nuniform sampler2D clearcoatRoughnessMap;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\nuniform sampler2D clearcoatNormalMap;uniform vec2 clearcoatNormalScale;\n#endif",
            packing:
                "vec3 packNormalToRGB(const in vec3 normal){return normalize(normal)*0.5+0.5;}vec3 unpackRGBToNormal(const in vec3 rgb){return 2.0*rgb.xyz-1.0;}const float PackUpscale=256./255.;const float UnpackDownscale=255./256.;const vec3 PackFactors=vec3(256.*256.*256.,256.*256.,256.);const vec4 UnpackFactors=UnpackDownscale/vec4(PackFactors,1.);const float ShiftRight8=1./256.;vec4 packDepthToRGBA(const in float v){vec4 r=vec4(fract(v*PackFactors),v);r.yzw-=r.xyz*ShiftRight8;return r*PackUpscale;}float unpackRGBAToDepth(const in vec4 v){return dot(v,UnpackFactors);}vec4 pack2HalfToRGBA(vec2 v){vec4 r=vec4(v.x,fract(v.x*255.0),v.y,fract(v.y*255.0));return vec4(r.x-r.y/255.0,r.y,r.z-r.w/255.0,r.w);}vec2 unpackRGBATo2Half(vec4 v){return vec2(v.x+(v.y/255.0),v.z+(v.w/255.0));}float viewZToOrthographicDepth(const in float viewZ,const in float near,const in float far){return(viewZ+near)/(near-far);}float orthographicDepthToViewZ(const in float linearClipZ,const in float near,const in float far){return linearClipZ*(near-far)-near;}float viewZToPerspectiveDepth(const in float viewZ,const in float near,const in float far){return((near+viewZ)*far)/((far-near)*viewZ);}float perspectiveDepthToViewZ(const in float invClipZ,const in float near,const in float far){return(near*far)/((far-near)*invClipZ-far);}",
            premultiplied_alpha_fragment: "#ifdef PREMULTIPLIED_ALPHA\ngl_FragColor.rgb*=gl_FragColor.a;\n#endif",
            project_vertex: "vec4 mvPosition=vec4(transformed,1.0);\n#ifdef USE_INSTANCING\nmvPosition=instanceMatrix*mvPosition;\n#endif\nmvPosition=modelViewMatrix*mvPosition;gl_Position=projectionMatrix*mvPosition;",
            dithering_fragment: "#ifdef DITHERING\ngl_FragColor.rgb=dithering(gl_FragColor.rgb);\n#endif",
            dithering_pars_fragment:
                "#ifdef DITHERING\nvec3 dithering(vec3 color){float grid_position=rand(gl_FragCoord.xy);vec3 dither_shift_RGB=vec3(0.25/255.0,-0.25/255.0,0.25/255.0);dither_shift_RGB=mix(2.0*dither_shift_RGB,-2.0*dither_shift_RGB,grid_position);return color+dither_shift_RGB;}\n#endif",
            roughnessmap_fragment: "float roughnessFactor=roughness;\n#ifdef USE_ROUGHNESSMAP\nvec4 texelRoughness=texture2D(roughnessMap,vUv);roughnessFactor*=texelRoughness.g;\n#endif",
            roughnessmap_pars_fragment: "#ifdef USE_ROUGHNESSMAP\nuniform sampler2D roughnessMap;\n#endif",
            shadowmap_pars_fragment:
                "#ifdef USE_SHADOWMAP\n#if NUM_DIR_LIGHT_SHADOWS>0\nuniform sampler2D directionalShadowMap[NUM_DIR_LIGHT_SHADOWS];varying vec4 vDirectionalShadowCoord[NUM_DIR_LIGHT_SHADOWS];struct DirectionalLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;};uniform DirectionalLightShadow directionalLightShadows[NUM_DIR_LIGHT_SHADOWS];\n#endif\n#if NUM_SPOT_LIGHT_SHADOWS>0\nuniform sampler2D spotShadowMap[NUM_SPOT_LIGHT_SHADOWS];varying vec4 vSpotShadowCoord[NUM_SPOT_LIGHT_SHADOWS];struct SpotLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;};uniform SpotLightShadow spotLightShadows[NUM_SPOT_LIGHT_SHADOWS];\n#endif\n#if NUM_POINT_LIGHT_SHADOWS>0\nuniform sampler2D pointShadowMap[NUM_POINT_LIGHT_SHADOWS];varying vec4 vPointShadowCoord[NUM_POINT_LIGHT_SHADOWS];struct PointLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;float shadowCameraNear;float shadowCameraFar;};uniform PointLightShadow pointLightShadows[NUM_POINT_LIGHT_SHADOWS];\n#endif\nfloat texture2DCompare(sampler2D depths,vec2 uv,float compare){return step(compare,unpackRGBAToDepth(texture2D(depths,uv)));}vec2 texture2DDistribution(sampler2D shadow,vec2 uv){return unpackRGBATo2Half(texture2D(shadow,uv));}float VSMShadow(sampler2D shadow,vec2 uv,float compare){float occlusion=1.0;vec2 distribution=texture2DDistribution(shadow,uv);float hard_shadow=step(compare,distribution.x);if(hard_shadow!=1.0){float distance=compare-distribution.x;float variance=max(0.00000,distribution.y*distribution.y);float softness_probability=variance/(variance+distance*distance);softness_probability=clamp((softness_probability-0.3)/(0.95-0.3),0.0,1.0);occlusion=clamp(max(hard_shadow,softness_probability),0.0,1.0);}return occlusion;}float getShadow(sampler2D shadowMap,vec2 shadowMapSize,float shadowBias,float shadowRadius,vec4 shadowCoord){float shadow=1.0;shadowCoord.xyz/=shadowCoord.w;shadowCoord.z+=shadowBias;bvec4 inFrustumVec=bvec4(shadowCoord.x>=0.0,shadowCoord.x<=1.0,shadowCoord.y>=0.0,shadowCoord.y<=1.0);bool inFrustum=all(inFrustumVec);bvec2 frustumTestVec=bvec2(inFrustum,shadowCoord.z<=1.0);bool frustumTest=all(frustumTestVec);if(frustumTest){\n#if defined(SHADOWMAP_TYPE_PCF)\nvec2 texelSize=vec2(1.0)/shadowMapSize;float dx0=-texelSize.x*shadowRadius;float dy0=-texelSize.y*shadowRadius;float dx1=+texelSize.x*shadowRadius;float dy1=+texelSize.y*shadowRadius;float dx2=dx0/2.0;float dy2=dy0/2.0;float dx3=dx1/2.0;float dy3=dy1/2.0;shadow=(texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx0,dy0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(0.0,dy0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx1,dy0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx2,dy2),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(0.0,dy2),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx3,dy2),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx0,0.0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx2,0.0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy,shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx3,0.0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx1,0.0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx2,dy3),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(0.0,dy3),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx3,dy3),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx0,dy1),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(0.0,dy1),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx1,dy1),shadowCoord.z))*(1.0/17.0);\n#elif defined(SHADOWMAP_TYPE_PCF_SOFT)\nvec2 texelSize=vec2(1.0)/shadowMapSize;float dx=texelSize.x;float dy=texelSize.y;vec2 uv=shadowCoord.xy;vec2 f=fract(uv*shadowMapSize+0.5);uv-=f*texelSize;shadow=(texture2DCompare(shadowMap,uv,shadowCoord.z)+texture2DCompare(shadowMap,uv+vec2(dx,0.0),shadowCoord.z)+texture2DCompare(shadowMap,uv+vec2(0.0,dy),shadowCoord.z)+texture2DCompare(shadowMap,uv+texelSize,shadowCoord.z)+mix(texture2DCompare(shadowMap,uv+vec2(-dx,0.0),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(2.0*dx,0.0),shadowCoord.z),f.x)+mix(texture2DCompare(shadowMap,uv+vec2(-dx,dy),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(2.0*dx,dy),shadowCoord.z),f.x)+mix(texture2DCompare(shadowMap,uv+vec2(0.0,-dy),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(0.0,2.0*dy),shadowCoord.z),f.y)+mix(texture2DCompare(shadowMap,uv+vec2(dx,-dy),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(dx,2.0*dy),shadowCoord.z),f.y)+mix(mix(texture2DCompare(shadowMap,uv+vec2(-dx,-dy),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(2.0*dx,-dy),shadowCoord.z),f.x),mix(texture2DCompare(shadowMap,uv+vec2(-dx,2.0*dy),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(2.0*dx,2.0*dy),shadowCoord.z),f.x),f.y))*(1.0/9.0);\n#elif defined(SHADOWMAP_TYPE_VSM)\nshadow=VSMShadow(shadowMap,shadowCoord.xy,shadowCoord.z);\n#else\nshadow=texture2DCompare(shadowMap,shadowCoord.xy,shadowCoord.z);\n#endif\n}return shadow;}vec2 cubeToUV(vec3 v,float texelSizeY){vec3 absV=abs(v);float scaleToCube=1.0/max(absV.x,max(absV.y,absV.z));absV*=scaleToCube;v*=scaleToCube*(1.0-2.0*texelSizeY);vec2 planar=v.xy;float almostATexel=1.5*texelSizeY;float almostOne=1.0-almostATexel;if(absV.z>=almostOne){if(v.z>0.0)planar.x=4.0-v.x;}else if(absV.x>=almostOne){float signX=sign(v.x);planar.x=v.z*signX+2.0*signX;}else if(absV.y>=almostOne){float signY=sign(v.y);planar.x=v.x+2.0*signY+2.0;planar.y=v.z*signY-2.0;}return vec2(0.125,0.25)*planar+vec2(0.375,0.75);}float getPointShadow(sampler2D shadowMap,vec2 shadowMapSize,float shadowBias,float shadowRadius,vec4 shadowCoord,float shadowCameraNear,float shadowCameraFar){vec2 texelSize=vec2(1.0)/(shadowMapSize*vec2(4.0,2.0));vec3 lightToPosition=shadowCoord.xyz;float dp=(length(lightToPosition)-shadowCameraNear)/(shadowCameraFar-shadowCameraNear);dp+=shadowBias;vec3 bd3D=normalize(lightToPosition);\n#if defined(SHADOWMAP_TYPE_PCF)||defined(SHADOWMAP_TYPE_PCF_SOFT)||defined(SHADOWMAP_TYPE_VSM)\nvec2 offset=vec2(-1,1)*shadowRadius*texelSize.y;return(texture2DCompare(shadowMap,cubeToUV(bd3D+offset.xyy,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.yyy,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.xyx,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.yyx,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.xxy,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.yxy,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.xxx,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.yxx,texelSize.y),dp))*(1.0/9.0);\n#else\nreturn texture2DCompare(shadowMap,cubeToUV(bd3D,texelSize.y),dp);\n#endif\n}\n#endif",
            shadowmap_pars_vertex:
                "#ifdef USE_SHADOWMAP\n#if NUM_DIR_LIGHT_SHADOWS>0\nuniform mat4 directionalShadowMatrix[NUM_DIR_LIGHT_SHADOWS];varying vec4 vDirectionalShadowCoord[NUM_DIR_LIGHT_SHADOWS];struct DirectionalLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;};uniform DirectionalLightShadow directionalLightShadows[NUM_DIR_LIGHT_SHADOWS];\n#endif\n#if NUM_SPOT_LIGHT_SHADOWS>0\nuniform mat4 spotShadowMatrix[NUM_SPOT_LIGHT_SHADOWS];varying vec4 vSpotShadowCoord[NUM_SPOT_LIGHT_SHADOWS];struct SpotLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;};uniform SpotLightShadow spotLightShadows[NUM_SPOT_LIGHT_SHADOWS];\n#endif\n#if NUM_POINT_LIGHT_SHADOWS>0\nuniform mat4 pointShadowMatrix[NUM_POINT_LIGHT_SHADOWS];varying vec4 vPointShadowCoord[NUM_POINT_LIGHT_SHADOWS];struct PointLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;float shadowCameraNear;float shadowCameraFar;};uniform PointLightShadow pointLightShadows[NUM_POINT_LIGHT_SHADOWS];\n#endif\n#endif",
            shadowmap_vertex:
                "#ifdef USE_SHADOWMAP\n#if NUM_DIR_LIGHT_SHADOWS>0||NUM_SPOT_LIGHT_SHADOWS>0||NUM_POINT_LIGHT_SHADOWS>0\nvec3 shadowWorldNormal=inverseTransformDirection(transformedNormal,viewMatrix);vec4 shadowWorldPosition;\n#endif\n#if NUM_DIR_LIGHT_SHADOWS>0\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_DIR_LIGHT_SHADOWS;i++){shadowWorldPosition=worldPosition+vec4(shadowWorldNormal*directionalLightShadows[i].shadowNormalBias,0);vDirectionalShadowCoord[i]=directionalShadowMatrix[i]*shadowWorldPosition;}\n#pragma unroll_loop_end\n#endif\n#if NUM_SPOT_LIGHT_SHADOWS>0\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_SPOT_LIGHT_SHADOWS;i++){shadowWorldPosition=worldPosition+vec4(shadowWorldNormal*spotLightShadows[i].shadowNormalBias,0);vSpotShadowCoord[i]=spotShadowMatrix[i]*shadowWorldPosition;}\n#pragma unroll_loop_end\n#endif\n#if NUM_POINT_LIGHT_SHADOWS>0\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_POINT_LIGHT_SHADOWS;i++){shadowWorldPosition=worldPosition+vec4(shadowWorldNormal*pointLightShadows[i].shadowNormalBias,0);vPointShadowCoord[i]=pointShadowMatrix[i]*shadowWorldPosition;}\n#pragma unroll_loop_end\n#endif\n#endif",
            shadowmask_pars_fragment:
                "float getShadowMask(){float shadow=1.0;\n#ifdef USE_SHADOWMAP\n#if NUM_DIR_LIGHT_SHADOWS>0\nDirectionalLightShadow directionalLight;\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_DIR_LIGHT_SHADOWS;i++){directionalLight=directionalLightShadows[i];shadow*=receiveShadow?getShadow(directionalShadowMap[i],directionalLight.shadowMapSize,directionalLight.shadowBias,directionalLight.shadowRadius,vDirectionalShadowCoord[i]):1.0;}\n#pragma unroll_loop_end\n#endif\n#if NUM_SPOT_LIGHT_SHADOWS>0\nSpotLightShadow spotLight;\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_SPOT_LIGHT_SHADOWS;i++){spotLight=spotLightShadows[i];shadow*=receiveShadow?getShadow(spotShadowMap[i],spotLight.shadowMapSize,spotLight.shadowBias,spotLight.shadowRadius,vSpotShadowCoord[i]):1.0;}\n#pragma unroll_loop_end\n#endif\n#if NUM_POINT_LIGHT_SHADOWS>0\nPointLightShadow pointLight;\n#pragma unroll_loop_start\nfor(int i=0;i<NUM_POINT_LIGHT_SHADOWS;i++){pointLight=pointLightShadows[i];shadow*=receiveShadow?getPointShadow(pointShadowMap[i],pointLight.shadowMapSize,pointLight.shadowBias,pointLight.shadowRadius,vPointShadowCoord[i],pointLight.shadowCameraNear,pointLight.shadowCameraFar):1.0;}\n#pragma unroll_loop_end\n#endif\n#endif\nreturn shadow;}",
            skinbase_vertex: "#ifdef USE_SKINNING\nmat4 boneMatX=getBoneMatrix(skinIndex.x);mat4 boneMatY=getBoneMatrix(skinIndex.y);mat4 boneMatZ=getBoneMatrix(skinIndex.z);mat4 boneMatW=getBoneMatrix(skinIndex.w);\n#endif",
            skinning_pars_vertex:
                "#ifdef USE_SKINNING\nuniform mat4 bindMatrix;uniform mat4 bindMatrixInverse;\n#ifdef BONE_TEXTURE\nuniform highp sampler2D boneTexture;uniform int boneTextureSize;mat4 getBoneMatrix(const in float i){float j=i*4.0;float x=mod(j,float(boneTextureSize));float y=floor(j/float(boneTextureSize));float dx=1.0/float(boneTextureSize);float dy=1.0/float(boneTextureSize);y=dy*(y+0.5);vec4 v1=texture2D(boneTexture,vec2(dx*(x+0.5),y));vec4 v2=texture2D(boneTexture,vec2(dx*(x+1.5),y));vec4 v3=texture2D(boneTexture,vec2(dx*(x+2.5),y));vec4 v4=texture2D(boneTexture,vec2(dx*(x+3.5),y));mat4 bone=mat4(v1,v2,v3,v4);return bone;}\n#else\nuniform mat4 boneMatrices[MAX_BONES];mat4 getBoneMatrix(const in float i){mat4 bone=boneMatrices[int(i)];return bone;}\n#endif\n#endif",
            skinning_vertex:
                "#ifdef USE_SKINNING\nvec4 skinVertex=bindMatrix*vec4(transformed,1.0);vec4 skinned=vec4(0.0);skinned+=boneMatX*skinVertex*skinWeight.x;skinned+=boneMatY*skinVertex*skinWeight.y;skinned+=boneMatZ*skinVertex*skinWeight.z;skinned+=boneMatW*skinVertex*skinWeight.w;transformed=(bindMatrixInverse*skinned).xyz;\n#endif",
            skinnormal_vertex:
                "#ifdef USE_SKINNING\nmat4 skinMatrix=mat4(0.0);skinMatrix+=skinWeight.x*boneMatX;skinMatrix+=skinWeight.y*boneMatY;skinMatrix+=skinWeight.z*boneMatZ;skinMatrix+=skinWeight.w*boneMatW;skinMatrix=bindMatrixInverse*skinMatrix*bindMatrix;objectNormal=vec4(skinMatrix*vec4(objectNormal,0.0)).xyz;\n#ifdef USE_TANGENT\nobjectTangent=vec4(skinMatrix*vec4(objectTangent,0.0)).xyz;\n#endif\n#endif",
            specularmap_fragment: "float specularStrength;\n#ifdef USE_SPECULARMAP\nvec4 texelSpecular=texture2D(specularMap,vUv);specularStrength=texelSpecular.r;\n#else\nspecularStrength=1.0;\n#endif",
            specularmap_pars_fragment: "#ifdef USE_SPECULARMAP\nuniform sampler2D specularMap;\n#endif",
            tonemapping_fragment: "#if defined(TONE_MAPPING)\ngl_FragColor.rgb=toneMapping(gl_FragColor.rgb);\n#endif",
            tonemapping_pars_fragment:
                "#ifndef saturate\n#define saturate(a)clamp(a,0.0,1.0)\n#endif\nuniform float toneMappingExposure;vec3 LinearToneMapping(vec3 color){return toneMappingExposure*color;}vec3 ReinhardToneMapping(vec3 color){color*=toneMappingExposure;return saturate(color/(vec3(1.0)+color));}vec3 OptimizedCineonToneMapping(vec3 color){color*=toneMappingExposure;color=max(vec3(0.0),color-0.004);return pow((color*(6.2*color+0.5))/(color*(6.2*color+1.7)+0.06),vec3(2.2));}vec3 RRTAndODTFit(vec3 v){vec3 a=v*(v+0.0245786)-0.000090537;vec3 b=v*(0.983729*v+0.4329510)+0.238081;return a/b;}vec3 ACESFilmicToneMapping(vec3 color){const mat3 ACESInputMat=mat3(vec3(0.59719,0.07600,0.02840),vec3(0.35458,0.90834,0.13383),vec3(0.04823,0.01566,0.83777));const mat3 ACESOutputMat=mat3(vec3(1.60475,-0.10208,-0.00327),vec3(-0.53108,1.10813,-0.07276),vec3(-0.07367,-0.00605,1.07602));color*=toneMappingExposure/0.6;color=ACESInputMat*color;color=RRTAndODTFit(color);color=ACESOutputMat*color;return saturate(color);}vec3 CustomToneMapping(vec3 color){return color;}",
            transmissionmap_fragment: "#ifdef USE_TRANSMISSIONMAP\ntotalTransmission*=texture2D(transmissionMap,vUv).r;\n#endif",
            transmissionmap_pars_fragment: "#ifdef USE_TRANSMISSIONMAP\nuniform sampler2D transmissionMap;\n#endif",
            uv_pars_fragment: "#if (defined(USE_UV)&&!defined(UVS_VERTEX_ONLY))\nvarying vec2 vUv;\n#endif",
            uv_pars_vertex: "#ifdef USE_UV\n#ifdef UVS_VERTEX_ONLY\nvec2 vUv;\n#else\nvarying vec2 vUv;\n#endif\nuniform mat3 uvTransform;\n#endif",
            uv_vertex: "#ifdef USE_UV\nvUv=(uvTransform*vec3(uv,1)).xy;\n#endif",
            uv2_pars_fragment: "#if defined(USE_LIGHTMAP)||defined(USE_AOMAP)\nvarying vec2 vUv2;\n#endif",
            uv2_pars_vertex: "#if defined(USE_LIGHTMAP)||defined(USE_AOMAP)\nattribute vec2 uv2;varying vec2 vUv2;uniform mat3 uv2Transform;\n#endif",
            uv2_vertex: "#if defined(USE_LIGHTMAP)||defined(USE_AOMAP)\nvUv2=(uv2Transform*vec3(uv2,1)).xy;\n#endif",
            worldpos_vertex:
                "#if defined(USE_ENVMAP)||defined(DISTANCE)||defined(USE_SHADOWMAP)\nvec4 worldPosition=vec4(transformed,1.0);\n#ifdef USE_INSTANCING\nworldPosition=instanceMatrix*worldPosition;\n#endif\nworldPosition=modelMatrix*worldPosition;\n#endif",
            background_frag: "uniform sampler2D t2D;varying vec2 vUv;void main(){vec4 texColor=texture2D(t2D,vUv);gl_FragColor=mapTexelToLinear(texColor);\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n}",
            background_vert: "varying vec2 vUv;uniform mat3 uvTransform;void main(){vUv=(uvTransform*vec3(uv,1)).xy;gl_Position=vec4(position.xy,1.0,1.0);}",
            cube_frag:
                "#include <envmap_common_pars_fragment>\nuniform float opacity;varying vec3 vWorldDirection;\n#include <cube_uv_reflection_fragment>\nvoid main(){vec3 vReflect=vWorldDirection;\n#include <envmap_fragment>\ngl_FragColor=envColor;gl_FragColor.a*=opacity;\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n}",
            cube_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main(){vWorldDirection=transformDirection(position,modelMatrix);\n#include <begin_vertex>\n#include <project_vertex>\ngl_Position.z=gl_Position.w;}",
            depth_frag:
                "#if DEPTH_PACKING==3200\nuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvarying vec2 vHighPrecisionZW;void main(){\n#include <clipping_planes_fragment>\nvec4 diffuseColor=vec4(1.0);\n#if DEPTH_PACKING==3200\ndiffuseColor.a=opacity;\n#endif\n#include <map_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\n#include <logdepthbuf_fragment>\nfloat fragCoordZ=0.5*vHighPrecisionZW[0]/vHighPrecisionZW[1]+0.5;\n#if DEPTH_PACKING==3200\ngl_FragColor=vec4(vec3(1.0-fragCoordZ),opacity);\n#elif DEPTH_PACKING==3201\ngl_FragColor=packDepthToRGBA(fragCoordZ);\n#endif\n}",
            depth_vert:
                "#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvarying vec2 vHighPrecisionZW;void main(){\n#include <uv_vertex>\n#include <skinbase_vertex>\n#ifdef USE_DISPLACEMENTMAP\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinnormal_vertex>\n#endif\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <displacementmap_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\nvHighPrecisionZW=gl_Position.zw;}",
            distanceRGBA_frag:
                "#define DISTANCE\nuniform vec3 referencePosition;uniform float nearDistance;uniform float farDistance;varying vec3 vWorldPosition;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\nvec4 diffuseColor=vec4(1.0);\n#include <map_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\nfloat dist=length(vWorldPosition-referencePosition);dist=(dist-nearDistance)/(farDistance-nearDistance);dist=saturate(dist);gl_FragColor=packDepthToRGBA(dist);}",
            distanceRGBA_vert:
                "#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){\n#include <uv_vertex>\n#include <skinbase_vertex>\n#ifdef USE_DISPLACEMENTMAP\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinnormal_vertex>\n#endif\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <displacementmap_vertex>\n#include <project_vertex>\n#include <worldpos_vertex>\n#include <clipping_planes_vertex>\nvWorldPosition=worldPosition.xyz;}",
            equirect_frag:
                "uniform sampler2D tEquirect;varying vec3 vWorldDirection;\n#include <common>\nvoid main(){vec3 direction=normalize(vWorldDirection);vec2 sampleUV=equirectUv(direction);vec4 texColor=texture2D(tEquirect,sampleUV);gl_FragColor=mapTexelToLinear(texColor);\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n}",
            equirect_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main(){vWorldDirection=transformDirection(position,modelMatrix);\n#include <begin_vertex>\n#include <project_vertex>\n}",
            linedashed_frag:
                "uniform vec3 diffuse;uniform float opacity;uniform float dashSize;uniform float totalSize;varying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\nif(mod(vLineDistance,totalSize)>dashSize){discard;}vec3 outgoingLight=vec3(0.0);vec4 diffuseColor=vec4(diffuse,opacity);\n#include <logdepthbuf_fragment>\n#include <color_fragment>\noutgoingLight=diffuseColor.rgb;gl_FragColor=vec4(outgoingLight,diffuseColor.a);\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n#include <premultiplied_alpha_fragment>\n}",
            linedashed_vert:
                "uniform float scale;attribute float lineDistance;varying float vLineDistance;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){vLineDistance=scale*lineDistance;\n#include <color_vertex>\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\n#include <fog_vertex>\n}",
            meshbasic_frag:
                "uniform vec3 diffuse;uniform float opacity;\n#ifndef FLAT_SHADED\nvarying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\nvec4 diffuseColor=vec4(diffuse,opacity);\n#include <logdepthbuf_fragment>\n#include <map_fragment>\n#include <color_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\n#include <specularmap_fragment>\nReflectedLight reflectedLight=ReflectedLight(vec3(0.0),vec3(0.0),vec3(0.0),vec3(0.0));\n#ifdef USE_LIGHTMAP\nvec4 lightMapTexel=texture2D(lightMap,vUv2);reflectedLight.indirectDiffuse+=lightMapTexelToLinear(lightMapTexel).rgb*lightMapIntensity;\n#else\nreflectedLight.indirectDiffuse+=vec3(1.0);\n#endif\n#include <aomap_fragment>\nreflectedLight.indirectDiffuse*=diffuseColor.rgb;vec3 outgoingLight=reflectedLight.indirectDiffuse;\n#include <envmap_fragment>\ngl_FragColor=vec4(outgoingLight,diffuseColor.a);\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n#include <premultiplied_alpha_fragment>\n#include <dithering_fragment>\n}",
            meshbasic_vert:
                "#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){\n#include <uv_vertex>\n#include <uv2_vertex>\n#include <color_vertex>\n#include <skinbase_vertex>\n#ifdef USE_ENVMAP\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinnormal_vertex>\n#include <defaultnormal_vertex>\n#endif\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <worldpos_vertex>\n#include <clipping_planes_vertex>\n#include <envmap_vertex>\n#include <fog_vertex>\n}",
            meshlambert_frag:
                "uniform vec3 diffuse;uniform vec3 emissive;uniform float opacity;varying vec3 vLightFront;varying vec3 vIndirectFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;varying vec3 vIndirectBack;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\nvec4 diffuseColor=vec4(diffuse,opacity);ReflectedLight reflectedLight=ReflectedLight(vec3(0.0),vec3(0.0),vec3(0.0),vec3(0.0));vec3 totalEmissiveRadiance=emissive;\n#include <logdepthbuf_fragment>\n#include <map_fragment>\n#include <color_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\n#include <specularmap_fragment>\n#include <emissivemap_fragment>\n#ifdef DOUBLE_SIDED\nreflectedLight.indirectDiffuse+=(gl_FrontFacing)?vIndirectFront:vIndirectBack;\n#else\nreflectedLight.indirectDiffuse+=vIndirectFront;\n#endif\n#include <lightmap_fragment>\nreflectedLight.indirectDiffuse*=BRDF_Diffuse_Lambert(diffuseColor.rgb);\n#ifdef DOUBLE_SIDED\nreflectedLight.directDiffuse=(gl_FrontFacing)?vLightFront:vLightBack;\n#else\nreflectedLight.directDiffuse=vLightFront;\n#endif\nreflectedLight.directDiffuse*=BRDF_Diffuse_Lambert(diffuseColor.rgb)*getShadowMask();\n#include <aomap_fragment>\nvec3 outgoingLight=reflectedLight.directDiffuse+reflectedLight.indirectDiffuse+totalEmissiveRadiance;\n#include <envmap_fragment>\ngl_FragColor=vec4(outgoingLight,diffuseColor.a);\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n#include <premultiplied_alpha_fragment>\n#include <dithering_fragment>\n}",
            meshlambert_vert:
                "#define LAMBERT\nvarying vec3 vLightFront;varying vec3 vIndirectFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;varying vec3 vIndirectBack;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){\n#include <uv_vertex>\n#include <uv2_vertex>\n#include <color_vertex>\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinbase_vertex>\n#include <skinnormal_vertex>\n#include <defaultnormal_vertex>\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\n#include <worldpos_vertex>\n#include <envmap_vertex>\n#include <lights_lambert_vertex>\n#include <shadowmap_vertex>\n#include <fog_vertex>\n}",
            meshmatcap_frag:
                "#define MATCAP\nuniform vec3 diffuse;uniform float opacity;uniform sampler2D matcap;varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\nvarying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\nvec4 diffuseColor=vec4(diffuse,opacity);\n#include <logdepthbuf_fragment>\n#include <map_fragment>\n#include <color_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\n#include <normal_fragment_begin>\n#include <normal_fragment_maps>\nvec3 viewDir=normalize(vViewPosition);vec3 x=normalize(vec3(viewDir.z,0.0,-viewDir.x));vec3 y=cross(viewDir,x);vec2 uv=vec2(dot(x,normal),dot(y,normal))*0.495+0.5;\n#ifdef USE_MATCAP\nvec4 matcapColor=texture2D(matcap,uv);matcapColor=matcapTexelToLinear(matcapColor);\n#else\nvec4 matcapColor=vec4(1.0);\n#endif\nvec3 outgoingLight=diffuseColor.rgb*matcapColor.rgb;gl_FragColor=vec4(outgoingLight,diffuseColor.a);\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n#include <premultiplied_alpha_fragment>\n#include <dithering_fragment>\n}",
            meshmatcap_vert:
                "#define MATCAP\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\nvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){\n#include <uv_vertex>\n#include <color_vertex>\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinbase_vertex>\n#include <skinnormal_vertex>\n#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\nvNormal=normalize(transformedNormal);\n#endif\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <displacementmap_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\n#include <fog_vertex>\nvViewPosition=-mvPosition.xyz;}",
            meshtoon_frag:
                "#define TOON\nuniform vec3 diffuse;uniform vec3 emissive;uniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\nvec4 diffuseColor=vec4(diffuse,opacity);ReflectedLight reflectedLight=ReflectedLight(vec3(0.0),vec3(0.0),vec3(0.0),vec3(0.0));vec3 totalEmissiveRadiance=emissive;\n#include <logdepthbuf_fragment>\n#include <map_fragment>\n#include <color_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\n#include <normal_fragment_begin>\n#include <normal_fragment_maps>\n#include <emissivemap_fragment>\n#include <lights_toon_fragment>\n#include <lights_fragment_begin>\n#include <lights_fragment_maps>\n#include <lights_fragment_end>\n#include <aomap_fragment>\nvec3 outgoingLight=reflectedLight.directDiffuse+reflectedLight.indirectDiffuse+totalEmissiveRadiance;gl_FragColor=vec4(outgoingLight,diffuseColor.a);\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n#include <premultiplied_alpha_fragment>\n#include <dithering_fragment>\n}",
            meshtoon_vert:
                "#define TOON\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\nvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){\n#include <uv_vertex>\n#include <uv2_vertex>\n#include <color_vertex>\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinbase_vertex>\n#include <skinnormal_vertex>\n#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\nvNormal=normalize(transformedNormal);\n#endif\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <displacementmap_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\nvViewPosition=-mvPosition.xyz;\n#include <worldpos_vertex>\n#include <shadowmap_vertex>\n#include <fog_vertex>\n}",
            meshphong_frag:
                "#define PHONG\nuniform vec3 diffuse;uniform vec3 emissive;uniform vec3 specular;uniform float shininess;uniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\nvec4 diffuseColor=vec4(diffuse,opacity);ReflectedLight reflectedLight=ReflectedLight(vec3(0.0),vec3(0.0),vec3(0.0),vec3(0.0));vec3 totalEmissiveRadiance=emissive;\n#include <logdepthbuf_fragment>\n#include <map_fragment>\n#include <color_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\n#include <specularmap_fragment>\n#include <normal_fragment_begin>\n#include <normal_fragment_maps>\n#include <emissivemap_fragment>\n#include <lights_phong_fragment>\n#include <lights_fragment_begin>\n#include <lights_fragment_maps>\n#include <lights_fragment_end>\n#include <aomap_fragment>\nvec3 outgoingLight=reflectedLight.directDiffuse+reflectedLight.indirectDiffuse+reflectedLight.directSpecular+reflectedLight.indirectSpecular+totalEmissiveRadiance;\n#include <envmap_fragment>\ngl_FragColor=vec4(outgoingLight,diffuseColor.a);\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n#include <premultiplied_alpha_fragment>\n#include <dithering_fragment>\n}",
            meshphong_vert:
                "#define PHONG\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\nvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){\n#include <uv_vertex>\n#include <uv2_vertex>\n#include <color_vertex>\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinbase_vertex>\n#include <skinnormal_vertex>\n#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\nvNormal=normalize(transformedNormal);\n#endif\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <displacementmap_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\nvViewPosition=-mvPosition.xyz;\n#include <worldpos_vertex>\n#include <envmap_vertex>\n#include <shadowmap_vertex>\n#include <fog_vertex>\n}",
            meshphysical_frag:
                "#define STANDARD\n#ifdef PHYSICAL\n#define REFLECTIVITY\n#define CLEARCOAT\n#define TRANSMISSION\n#endif\nuniform vec3 diffuse;uniform vec3 emissive;uniform float roughness;uniform float metalness;uniform float opacity;\n#ifdef TRANSMISSION\nuniform float transmission;\n#endif\n#ifdef REFLECTIVITY\nuniform float reflectivity;\n#endif\n#ifdef CLEARCOAT\nuniform float clearcoat;uniform float clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\nuniform vec3 sheen;\n#endif\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\nvarying vec3 vNormal;\n#ifdef USE_TANGENT\nvarying vec3 vTangent;varying vec3 vBitangent;\n#endif\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <transmissionmap_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <lights_physical_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\nvec4 diffuseColor=vec4(diffuse,opacity);ReflectedLight reflectedLight=ReflectedLight(vec3(0.0),vec3(0.0),vec3(0.0),vec3(0.0));vec3 totalEmissiveRadiance=emissive;\n#ifdef TRANSMISSION\nfloat totalTransmission=transmission;\n#endif\n#include <logdepthbuf_fragment>\n#include <map_fragment>\n#include <color_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\n#include <roughnessmap_fragment>\n#include <metalnessmap_fragment>\n#include <normal_fragment_begin>\n#include <normal_fragment_maps>\n#include <clearcoat_normal_fragment_begin>\n#include <clearcoat_normal_fragment_maps>\n#include <emissivemap_fragment>\n#include <transmissionmap_fragment>\n#include <lights_physical_fragment>\n#include <lights_fragment_begin>\n#include <lights_fragment_maps>\n#include <lights_fragment_end>\n#include <aomap_fragment>\nvec3 outgoingLight=reflectedLight.directDiffuse+reflectedLight.indirectDiffuse+reflectedLight.directSpecular+reflectedLight.indirectSpecular+totalEmissiveRadiance;\n#ifdef TRANSMISSION\ndiffuseColor.a*=mix(saturate(1.-totalTransmission+linearToRelativeLuminance(reflectedLight.directSpecular+reflectedLight.indirectSpecular)),1.0,metalness);\n#endif\ngl_FragColor=vec4(outgoingLight,diffuseColor.a);\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n#include <premultiplied_alpha_fragment>\n#include <dithering_fragment>\n}",
            meshphysical_vert:
                "#define STANDARD\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\nvarying vec3 vNormal;\n#ifdef USE_TANGENT\nvarying vec3 vTangent;varying vec3 vBitangent;\n#endif\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){\n#include <uv_vertex>\n#include <uv2_vertex>\n#include <color_vertex>\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinbase_vertex>\n#include <skinnormal_vertex>\n#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\nvNormal=normalize(transformedNormal);\n#ifdef USE_TANGENT\nvTangent=normalize(transformedTangent);vBitangent=normalize(cross(vNormal,vTangent)*tangent.w);\n#endif\n#endif\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <displacementmap_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\nvViewPosition=-mvPosition.xyz;\n#include <worldpos_vertex>\n#include <shadowmap_vertex>\n#include <fog_vertex>\n}",
            normal_frag:
                "#define NORMAL\nuniform float opacity;\n#if defined(FLAT_SHADED)||defined(USE_BUMPMAP)||defined(TANGENTSPACE_NORMALMAP)\nvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\nvarying vec3 vNormal;\n#ifdef USE_TANGENT\nvarying vec3 vTangent;varying vec3 vBitangent;\n#endif\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\n#include <logdepthbuf_fragment>\n#include <normal_fragment_begin>\n#include <normal_fragment_maps>\ngl_FragColor=vec4(packNormalToRGB(normal),opacity);}",
            normal_vert:
                "#define NORMAL\n#if defined(FLAT_SHADED)||defined(USE_BUMPMAP)||defined(TANGENTSPACE_NORMALMAP)\nvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\nvarying vec3 vNormal;\n#ifdef USE_TANGENT\nvarying vec3 vTangent;varying vec3 vBitangent;\n#endif\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){\n#include <uv_vertex>\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinbase_vertex>\n#include <skinnormal_vertex>\n#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\nvNormal=normalize(transformedNormal);\n#ifdef USE_TANGENT\nvTangent=normalize(transformedTangent);vBitangent=normalize(cross(vNormal,vTangent)*tangent.w);\n#endif\n#endif\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <skinning_vertex>\n#include <displacementmap_vertex>\n#include <project_vertex>\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\n#if defined(FLAT_SHADED)||defined(USE_BUMPMAP)||defined(TANGENTSPACE_NORMALMAP)\nvViewPosition=-mvPosition.xyz;\n#endif\n}",
            points_frag:
                "uniform vec3 diffuse;uniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\nvec3 outgoingLight=vec3(0.0);vec4 diffuseColor=vec4(diffuse,opacity);\n#include <logdepthbuf_fragment>\n#include <map_particle_fragment>\n#include <color_fragment>\n#include <alphatest_fragment>\noutgoingLight=diffuseColor.rgb;gl_FragColor=vec4(outgoingLight,diffuseColor.a);\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n#include <premultiplied_alpha_fragment>\n}",
            points_vert:
                "uniform float size;uniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){\n#include <color_vertex>\n#include <begin_vertex>\n#include <morphtarget_vertex>\n#include <project_vertex>\ngl_PointSize=size;\n#ifdef USE_SIZEATTENUATION\nbool isPerspective=isPerspectiveMatrix(projectionMatrix);if(isPerspective)gl_PointSize*=(scale/-mvPosition.z);\n#endif\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\n#include <worldpos_vertex>\n#include <fog_vertex>\n}",
            shadow_frag:
                "uniform vec3 color;uniform float opacity;\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main(){gl_FragColor=vec4(color,opacity*(1.0-getShadowMask()));\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n}",
            shadow_vert:
                "#include <common>\n#include <fog_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main(){\n#include <begin_vertex>\n#include <project_vertex>\n#include <worldpos_vertex>\n#include <beginnormal_vertex>\n#include <morphnormal_vertex>\n#include <skinbase_vertex>\n#include <skinnormal_vertex>\n#include <defaultnormal_vertex>\n#include <shadowmap_vertex>\n#include <fog_vertex>\n}",
            sprite_frag:
                "uniform vec3 diffuse;uniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main(){\n#include <clipping_planes_fragment>\nvec3 outgoingLight=vec3(0.0);vec4 diffuseColor=vec4(diffuse,opacity);\n#include <logdepthbuf_fragment>\n#include <map_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\noutgoingLight=diffuseColor.rgb;gl_FragColor=vec4(outgoingLight,diffuseColor.a);\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n}",
            sprite_vert:
                "uniform float rotation;uniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main(){\n#include <uv_vertex>\nvec4 mvPosition=modelViewMatrix*vec4(0.0,0.0,0.0,1.0);vec2 scale;scale.x=length(vec3(modelMatrix[0].x,modelMatrix[0].y,modelMatrix[0].z));scale.y=length(vec3(modelMatrix[1].x,modelMatrix[1].y,modelMatrix[1].z));\n#ifndef USE_SIZEATTENUATION\nbool isPerspective=isPerspectiveMatrix(projectionMatrix);if(isPerspective)scale*=-mvPosition.z;\n#endif\nvec2 alignedPosition=(position.xy-(center-vec2(0.5)))*scale;vec2 rotatedPosition;rotatedPosition.x=cos(rotation)*alignedPosition.x-sin(rotation)*alignedPosition.y;rotatedPosition.y=sin(rotation)*alignedPosition.x+cos(rotation)*alignedPosition.y;mvPosition.xy+=rotatedPosition;gl_Position=projectionMatrix*mvPosition;\n#include <logdepthbuf_vertex>\n#include <clipping_planes_vertex>\n#include <fog_vertex>\n}",
        },
        yn = {
            common: { diffuse: { value: new st(15658734) }, opacity: { value: 1 }, map: { value: null }, uvTransform: { value: new I() }, uv2Transform: { value: new I() }, alphaMap: { value: null } },
            specularmap: { specularMap: { value: null } },
            envmap: { envMap: { value: null }, flipEnvMap: { value: -1 }, reflectivity: { value: 1 }, refractionRatio: { value: 0.98 }, maxMipLevel: { value: 0 } },
            aomap: { aoMap: { value: null }, aoMapIntensity: { value: 1 } },
            lightmap: { lightMap: { value: null }, lightMapIntensity: { value: 1 } },
            emissivemap: { emissiveMap: { value: null } },
            bumpmap: { bumpMap: { value: null }, bumpScale: { value: 1 } },
            normalmap: { normalMap: { value: null }, normalScale: { value: new C(1, 1) } },
            displacementmap: { displacementMap: { value: null }, displacementScale: { value: 1 }, displacementBias: { value: 0 } },
            roughnessmap: { roughnessMap: { value: null } },
            metalnessmap: { metalnessMap: { value: null } },
            gradientmap: { gradientMap: { value: null } },
            fog: { fogDensity: { value: 25e-5 }, fogNear: { value: 1 }, fogFar: { value: 2e3 }, fogColor: { value: new st(16777215) } },
            lights: {
                ambientLightColor: { value: [] },
                lightProbe: { value: [] },
                directionalLights: { value: [], properties: { direction: {}, color: {} } },
                directionalLightShadows: { value: [], properties: { shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {} } },
                directionalShadowMap: { value: [] },
                directionalShadowMatrix: { value: [] },
                spotLights: { value: [], properties: { color: {}, position: {}, direction: {}, distance: {}, coneCos: {}, penumbraCos: {}, decay: {} } },
                spotLightShadows: { value: [], properties: { shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {} } },
                spotShadowMap: { value: [] },
                spotShadowMatrix: { value: [] },
                pointLights: { value: [], properties: { color: {}, position: {}, decay: {}, distance: {} } },
                pointLightShadows: { value: [], properties: { shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {}, shadowCameraNear: {}, shadowCameraFar: {} } },
                pointShadowMap: { value: [] },
                pointShadowMatrix: { value: [] },
                hemisphereLights: { value: [], properties: { direction: {}, skyColor: {}, groundColor: {} } },
                rectAreaLights: { value: [], properties: { color: {}, position: {}, width: {}, height: {} } },
                ltc_1: { value: null },
                ltc_2: { value: null },
            },
            points: { diffuse: { value: new st(15658734) }, opacity: { value: 1 }, size: { value: 1 }, scale: { value: 1 }, map: { value: null }, alphaMap: { value: null }, uvTransform: { value: new I() } },
            sprite: { diffuse: { value: new st(15658734) }, opacity: { value: 1 }, center: { value: new C(0.5, 0.5) }, rotation: { value: 0 }, map: { value: null }, alphaMap: { value: null }, uvTransform: { value: new I() } },
        },
        Mn = {
            basic: { uniforms: nn([yn.common, yn.specularmap, yn.envmap, yn.aomap, yn.lightmap, yn.fog]), vertexShader: _n.meshbasic_vert, fragmentShader: _n.meshbasic_frag },
            lambert: {
                uniforms: nn([yn.common, yn.specularmap, yn.envmap, yn.aomap, yn.lightmap, yn.emissivemap, yn.fog, yn.lights, { emissive: { value: new st(0) } }]),
                vertexShader: _n.meshlambert_vert,
                fragmentShader: _n.meshlambert_frag,
            },
            phong: {
                uniforms: nn([
                    yn.common,
                    yn.specularmap,
                    yn.envmap,
                    yn.aomap,
                    yn.lightmap,
                    yn.emissivemap,
                    yn.bumpmap,
                    yn.normalmap,
                    yn.displacementmap,
                    yn.fog,
                    yn.lights,
                    { emissive: { value: new st(0) }, specular: { value: new st(1118481) }, shininess: { value: 30 } },
                ]),
                vertexShader: _n.meshphong_vert,
                fragmentShader: _n.meshphong_frag,
            },
            standard: {
                uniforms: nn([
                    yn.common,
                    yn.envmap,
                    yn.aomap,
                    yn.lightmap,
                    yn.emissivemap,
                    yn.bumpmap,
                    yn.normalmap,
                    yn.displacementmap,
                    yn.roughnessmap,
                    yn.metalnessmap,
                    yn.fog,
                    yn.lights,
                    { emissive: { value: new st(0) }, roughness: { value: 1 }, metalness: { value: 0 }, envMapIntensity: { value: 1 } },
                ]),
                vertexShader: _n.meshphysical_vert,
                fragmentShader: _n.meshphysical_frag,
            },
            toon: {
                uniforms: nn([yn.common, yn.aomap, yn.lightmap, yn.emissivemap, yn.bumpmap, yn.normalmap, yn.displacementmap, yn.gradientmap, yn.fog, yn.lights, { emissive: { value: new st(0) } }]),
                vertexShader: _n.meshtoon_vert,
                fragmentShader: _n.meshtoon_frag,
            },
            matcap: { uniforms: nn([yn.common, yn.bumpmap, yn.normalmap, yn.displacementmap, yn.fog, { matcap: { value: null } }]), vertexShader: _n.meshmatcap_vert, fragmentShader: _n.meshmatcap_frag },
            points: { uniforms: nn([yn.points, yn.fog]), vertexShader: _n.points_vert, fragmentShader: _n.points_frag },
            dashed: { uniforms: nn([yn.common, yn.fog, { scale: { value: 1 }, dashSize: { value: 1 }, totalSize: { value: 2 } }]), vertexShader: _n.linedashed_vert, fragmentShader: _n.linedashed_frag },
            depth: { uniforms: nn([yn.common, yn.displacementmap]), vertexShader: _n.depth_vert, fragmentShader: _n.depth_frag },
            normal: { uniforms: nn([yn.common, yn.bumpmap, yn.normalmap, yn.displacementmap, { opacity: { value: 1 } }]), vertexShader: _n.normal_vert, fragmentShader: _n.normal_frag },
            sprite: { uniforms: nn([yn.sprite, yn.fog]), vertexShader: _n.sprite_vert, fragmentShader: _n.sprite_frag },
            background: { uniforms: { uvTransform: { value: new I() }, t2D: { value: null } }, vertexShader: _n.background_vert, fragmentShader: _n.background_frag },
            cube: { uniforms: nn([yn.envmap, { opacity: { value: 1 } }]), vertexShader: _n.cube_vert, fragmentShader: _n.cube_frag },
            equirect: { uniforms: { tEquirect: { value: null } }, vertexShader: _n.equirect_vert, fragmentShader: _n.equirect_frag },
            distanceRGBA: {
                uniforms: nn([yn.common, yn.displacementmap, { referencePosition: { value: new H() }, nearDistance: { value: 1 }, farDistance: { value: 1e3 } }]),
                vertexShader: _n.distanceRGBA_vert,
                fragmentShader: _n.distanceRGBA_frag,
            },
            shadow: { uniforms: nn([yn.lights, yn.fog, { color: { value: new st(0) }, opacity: { value: 1 } }]), vertexShader: _n.shadow_vert, fragmentShader: _n.shadow_frag },
        };
    function bn(e, t, n, i, r) {
        const a = new st(0);
        let o,
            s,
            l = 0,
            c = null,
            h = 0,
            d = null;
        function u(e, t) {
            n.buffers.color.setClear(e.r, e.g, e.b, t, r);
        }
        return {
            getClearColor: function () {
                return a;
            },
            setClearColor: function (e, t) {
                a.set(e), (l = void 0 !== t ? t : 1), u(a, l);
            },
            getClearAlpha: function () {
                return l;
            },
            setClearAlpha: function (e) {
                (l = e), u(a, l);
            },
            render: function (n, r, f, p) {
                let m = !0 === r.isScene ? r.background : null;
                m && m.isTexture && (m = t.get(m));
                const g = e.xr,
                    x = g.getSession && g.getSession();
                x && "additive" === x.environmentBlendMode && (m = null),
                    null === m ? u(a, l) : m && m.isColor && (u(m, 1), (p = !0)),
                    (e.autoClear || p) && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil),
                    m && (m.isCubeTexture || m.isWebGLCubeRenderTarget || 306 === m.mapping)
                        ? (void 0 === s &&
                              ((s = new Jt(
                                  new en(1, 1, 1),
                                  new an({ name: "BackgroundCubeMaterial", uniforms: tn(Mn.cube.uniforms), vertexShader: Mn.cube.vertexShader, fragmentShader: Mn.cube.fragmentShader, side: 1, depthTest: !1, depthWrite: !1, fog: !1 })
                              )),
                              s.geometry.deleteAttribute("normal"),
                              s.geometry.deleteAttribute("uv"),
                              (s.onBeforeRender = function (e, t, n) {
                                  this.matrixWorld.copyPosition(n.matrixWorld);
                              }),
                              Object.defineProperty(s.material, "envMap", {
                                  get: function () {
                                      return this.uniforms.envMap.value;
                                  },
                              }),
                              i.update(s)),
                          m.isWebGLCubeRenderTarget && (m = m.texture),
                          (s.material.uniforms.envMap.value = m),
                          (s.material.uniforms.flipEnvMap.value = m.isCubeTexture && m._needsFlipEnvMap ? -1 : 1),
                          (c === m && h === m.version && d === e.toneMapping) || ((s.material.needsUpdate = !0), (c = m), (h = m.version), (d = e.toneMapping)),
                          n.unshift(s, s.geometry, s.material, 0, 0, null))
                        : m &&
                          m.isTexture &&
                          (void 0 === o &&
                              ((o = new Jt(
                                  new vn(2, 2),
                                  new an({
                                      name: "BackgroundMaterial",
                                      uniforms: tn(Mn.background.uniforms),
                                      vertexShader: Mn.background.vertexShader,
                                      fragmentShader: Mn.background.fragmentShader,
                                      side: 0,
                                      depthTest: !1,
                                      depthWrite: !1,
                                      fog: !1,
                                  })
                              )),
                              o.geometry.deleteAttribute("normal"),
                              Object.defineProperty(o.material, "map", {
                                  get: function () {
                                      return this.uniforms.t2D.value;
                                  },
                              }),
                              i.update(o)),
                          (o.material.uniforms.t2D.value = m),
                          !0 === m.matrixAutoUpdate && m.updateMatrix(),
                          o.material.uniforms.uvTransform.value.copy(m.matrix),
                          (c === m && h === m.version && d === e.toneMapping) || ((o.material.needsUpdate = !0), (c = m), (h = m.version), (d = e.toneMapping)),
                          n.unshift(o, o.geometry, o.material, 0, 0, null));
            },
        };
    }
    function wn(e, t, n, i) {
        const r = e.getParameter(34921),
            a = i.isWebGL2 ? null : t.get("OES_vertex_array_object"),
            o = i.isWebGL2 || null !== a,
            s = {},
            l = u(null);
        let c = l;
        function h(t) {
            return i.isWebGL2 ? e.bindVertexArray(t) : a.bindVertexArrayOES(t);
        }
        function d(t) {
            return i.isWebGL2 ? e.deleteVertexArray(t) : a.deleteVertexArrayOES(t);
        }
        function u(e) {
            const t = [],
                n = [],
                i = [];
            for (let e = 0; e < r; e++) (t[e] = 0), (n[e] = 0), (i[e] = 0);
            return { geometry: null, program: null, wireframe: !1, newAttributes: t, enabledAttributes: n, attributeDivisors: i, object: e, attributes: {}, index: null };
        }
        function f() {
            const e = c.newAttributes;
            for (let t = 0, n = e.length; t < n; t++) e[t] = 0;
        }
        function p(e) {
            m(e, 0);
        }
        function m(n, r) {
            const a = c.newAttributes,
                o = c.enabledAttributes,
                s = c.attributeDivisors;
            if (((a[n] = 1), 0 === o[n] && (e.enableVertexAttribArray(n), (o[n] = 1)), s[n] !== r)) {
                (i.isWebGL2 ? e : t.get("ANGLE_instanced_arrays"))[i.isWebGL2 ? "vertexAttribDivisor" : "vertexAttribDivisorANGLE"](n, r), (s[n] = r);
            }
        }
        function g() {
            const t = c.newAttributes,
                n = c.enabledAttributes;
            for (let i = 0, r = n.length; i < r; i++) n[i] !== t[i] && (e.disableVertexAttribArray(i), (n[i] = 0));
        }
        function x(t, n, r, a, o, s) {
            !0 !== i.isWebGL2 || (5124 !== r && 5125 !== r) ? e.vertexAttribPointer(t, n, r, a, o, s) : e.vertexAttribIPointer(t, n, r, o, s);
        }
        function v() {
            _(), c !== l && ((c = l), h(c.object));
        }
        function _() {
            (l.geometry = null), (l.program = null), (l.wireframe = !1);
        }
        return {
            setup: function (r, l, d, v, _) {
                let y = !1;
                if (o) {
                    const t = (function (t, n, r) {
                        const o = !0 === r.wireframe;
                        let l = s[t.id];
                        void 0 === l && ((l = {}), (s[t.id] = l));
                        let c = l[n.id];
                        void 0 === c && ((c = {}), (l[n.id] = c));
                        let h = c[o];
                        void 0 === h && ((h = u(i.isWebGL2 ? e.createVertexArray() : a.createVertexArrayOES())), (c[o] = h));
                        return h;
                    })(v, d, l);
                    c !== t && ((c = t), h(c.object)),
                        (y = (function (e, t) {
                            const n = c.attributes,
                                i = e.attributes;
                            if (Object.keys(n).length !== Object.keys(i).length) return !0;
                            for (const e in i) {
                                const t = n[e],
                                    r = i[e];
                                if (void 0 === t) return !0;
                                if (t.attribute !== r) return !0;
                                if (t.data !== r.data) return !0;
                            }
                            return c.index !== t;
                        })(v, _)),
                        y &&
                            (function (e, t) {
                                const n = {},
                                    i = e.attributes;
                                for (const e in i) {
                                    const t = i[e],
                                        r = {};
                                    (r.attribute = t), t.data && (r.data = t.data), (n[e] = r);
                                }
                                (c.attributes = n), (c.index = t);
                            })(v, _);
                } else {
                    const e = !0 === l.wireframe;
                    (c.geometry === v.id && c.program === d.id && c.wireframe === e) || ((c.geometry = v.id), (c.program = d.id), (c.wireframe = e), (y = !0));
                }
                !0 === r.isInstancedMesh && (y = !0),
                    null !== _ && n.update(_, 34963),
                    y &&
                        (!(function (r, a, o, s) {
                            if (!1 === i.isWebGL2 && (r.isInstancedMesh || s.isInstancedBufferGeometry) && null === t.get("ANGLE_instanced_arrays")) return;
                            f();
                            const l = s.attributes,
                                c = o.getAttributes(),
                                h = a.defaultAttributeValues;
                            for (const t in c) {
                                const i = c[t];
                                if (i >= 0) {
                                    const a = l[t];
                                    if (void 0 !== a) {
                                        const t = a.normalized,
                                            r = a.itemSize,
                                            o = n.get(a);
                                        if (void 0 === o) continue;
                                        const l = o.buffer,
                                            c = o.type,
                                            h = o.bytesPerElement;
                                        if (a.isInterleavedBufferAttribute) {
                                            const n = a.data,
                                                o = n.stride,
                                                d = a.offset;
                                            n && n.isInstancedInterleavedBuffer ? (m(i, n.meshPerAttribute), void 0 === s._maxInstanceCount && (s._maxInstanceCount = n.meshPerAttribute * n.count)) : p(i),
                                                e.bindBuffer(34962, l),
                                                x(i, r, c, t, o * h, d * h);
                                        } else
                                            a.isInstancedBufferAttribute ? (m(i, a.meshPerAttribute), void 0 === s._maxInstanceCount && (s._maxInstanceCount = a.meshPerAttribute * a.count)) : p(i),
                                                e.bindBuffer(34962, l),
                                                x(i, r, c, t, 0, 0);
                                    } else if ("instanceMatrix" === t) {
                                        const t = n.get(r.instanceMatrix);
                                        if (void 0 === t) continue;
                                        const a = t.buffer,
                                            o = t.type;
                                        m(i + 0, 1),
                                            m(i + 1, 1),
                                            m(i + 2, 1),
                                            m(i + 3, 1),
                                            e.bindBuffer(34962, a),
                                            e.vertexAttribPointer(i + 0, 4, o, !1, 64, 0),
                                            e.vertexAttribPointer(i + 1, 4, o, !1, 64, 16),
                                            e.vertexAttribPointer(i + 2, 4, o, !1, 64, 32),
                                            e.vertexAttribPointer(i + 3, 4, o, !1, 64, 48);
                                    } else if ("instanceColor" === t) {
                                        const t = n.get(r.instanceColor);
                                        if (void 0 === t) continue;
                                        const a = t.buffer,
                                            o = t.type;
                                        m(i, 1), e.bindBuffer(34962, a), e.vertexAttribPointer(i, 3, o, !1, 12, 0);
                                    } else if (void 0 !== h) {
                                        const n = h[t];
                                        if (void 0 !== n)
                                            switch (n.length) {
                                                case 2:
                                                    e.vertexAttrib2fv(i, n);
                                                    break;
                                                case 3:
                                                    e.vertexAttrib3fv(i, n);
                                                    break;
                                                case 4:
                                                    e.vertexAttrib4fv(i, n);
                                                    break;
                                                default:
                                                    e.vertexAttrib1fv(i, n);
                                            }
                                    }
                                }
                            }
                            g();
                        })(r, l, d, v),
                        null !== _ && e.bindBuffer(34963, n.get(_).buffer));
            },
            reset: v,
            resetDefaultState: _,
            dispose: function () {
                v();
                for (const e in s) {
                    const t = s[e];
                    for (const e in t) {
                        const n = t[e];
                        for (const e in n) d(n[e].object), delete n[e];
                        delete t[e];
                    }
                    delete s[e];
                }
            },
            releaseStatesOfGeometry: function (e) {
                if (void 0 === s[e.id]) return;
                const t = s[e.id];
                for (const e in t) {
                    const n = t[e];
                    for (const e in n) d(n[e].object), delete n[e];
                    delete t[e];
                }
                delete s[e.id];
            },
            releaseStatesOfProgram: function (e) {
                for (const t in s) {
                    const n = s[t];
                    if (void 0 === n[e.id]) continue;
                    const i = n[e.id];
                    for (const e in i) d(i[e].object), delete i[e];
                    delete n[e.id];
                }
            },
            initAttributes: f,
            enableAttribute: p,
            disableUnusedAttributes: g,
        };
    }
    function An(e, t, n, i) {
        const r = i.isWebGL2;
        let a;
        (this.setMode = function (e) {
            a = e;
        }),
            (this.render = function (t, i) {
                e.drawArrays(a, t, i), n.update(i, a, 1);
            }),
            (this.renderInstances = function (i, o, s) {
                if (0 === s) return;
                let l, c;
                if (r) (l = e), (c = "drawArraysInstanced");
                else if (((l = t.get("ANGLE_instanced_arrays")), (c = "drawArraysInstancedANGLE"), null === l))
                    return void console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
                l[c](a, i, o, s), n.update(o, a, s);
            });
    }
    function Sn(e, t, n) {
        let i;
        function r(t) {
            if ("highp" === t) {
                if (e.getShaderPrecisionFormat(35633, 36338).precision > 0 && e.getShaderPrecisionFormat(35632, 36338).precision > 0) return "highp";
                t = "mediump";
            }
            return "mediump" === t && e.getShaderPrecisionFormat(35633, 36337).precision > 0 && e.getShaderPrecisionFormat(35632, 36337).precision > 0 ? "mediump" : "lowp";
        }
        const a = ("undefined" != typeof WebGL2RenderingContext && e instanceof WebGL2RenderingContext) || ("undefined" != typeof WebGL2ComputeRenderingContext && e instanceof WebGL2ComputeRenderingContext);
        let o = void 0 !== n.precision ? n.precision : "highp";
        const s = r(o);
        s !== o && (console.warn("THREE.WebGLRenderer:", o, "not supported, using", s, "instead."), (o = s));
        const l = !0 === n.logarithmicDepthBuffer,
            c = e.getParameter(34930),
            h = e.getParameter(35660),
            d = e.getParameter(3379),
            u = e.getParameter(34076),
            f = e.getParameter(34921),
            p = e.getParameter(36347),
            m = e.getParameter(36348),
            g = e.getParameter(36349),
            x = h > 0,
            v = a || !!t.get("OES_texture_float");
        return {
            isWebGL2: a,
            getMaxAnisotropy: function () {
                if (void 0 !== i) return i;
                const n = t.get("EXT_texture_filter_anisotropic");
                return (i = null !== n ? e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0), i;
            },
            getMaxPrecision: r,
            precision: o,
            logarithmicDepthBuffer: l,
            maxTextures: c,
            maxVertexTextures: h,
            maxTextureSize: d,
            maxCubemapSize: u,
            maxAttributes: f,
            maxVertexUniforms: p,
            maxVaryings: m,
            maxFragmentUniforms: g,
            vertexTextures: x,
            floatFragmentTextures: v,
            floatVertexTextures: x && v,
            maxSamples: a ? e.getParameter(36183) : 0,
        };
    }
    function Tn(e) {
        const t = this;
        let n = null,
            i = 0,
            r = !1,
            a = !1;
        const o = new Ve(),
            s = new I(),
            l = { value: null, needsUpdate: !1 };
        function c() {
            l.value !== n && ((l.value = n), (l.needsUpdate = i > 0)), (t.numPlanes = i), (t.numIntersection = 0);
        }
        function h(e, n, i, r) {
            const a = null !== e ? e.length : 0;
            let c = null;
            if (0 !== a) {
                if (((c = l.value), !0 !== r || null === c)) {
                    const t = i + 4 * a,
                        r = n.matrixWorldInverse;
                    s.getNormalMatrix(r), (null === c || c.length < t) && (c = new Float32Array(t));
                    for (let t = 0, n = i; t !== a; ++t, n += 4) o.copy(e[t]).applyMatrix4(r, s), o.normal.toArray(c, n), (c[n + 3] = o.constant);
                }
                (l.value = c), (l.needsUpdate = !0);
            }
            return (t.numPlanes = a), (t.numIntersection = 0), c;
        }
        (this.uniform = l),
            (this.numPlanes = 0),
            (this.numIntersection = 0),
            (this.init = function (e, t, a) {
                const o = 0 !== e.length || t || 0 !== i || r;
                return (r = t), (n = h(e, a, 0)), (i = e.length), o;
            }),
            (this.beginShadows = function () {
                (a = !0), h(null);
            }),
            (this.endShadows = function () {
                (a = !1), c();
            }),
            (this.setState = function (t, o, s) {
                const d = t.clippingPlanes,
                    u = t.clipIntersection,
                    f = t.clipShadows,
                    p = e.get(t);
                if (!r || null === d || 0 === d.length || (a && !f)) a ? h(null) : c();
                else {
                    const e = a ? 0 : i,
                        t = 4 * e;
                    let r = p.clippingState || null;
                    (l.value = r), (r = h(d, o, t, s));
                    for (let e = 0; e !== t; ++e) r[e] = n[e];
                    (p.clippingState = r), (this.numIntersection = u ? this.numPlanes : 0), (this.numPlanes += e);
                }
            });
    }
    function Ln(e) {
        let t = new WeakMap();
        function n(e, t) {
            return 303 === t ? (e.mapping = 301) : 304 === t && (e.mapping = 302), e;
        }
        function i(e) {
            const n = e.target;
            n.removeEventListener("dispose", i);
            const r = t.get(n);
            void 0 !== r && (t.delete(n), r.dispose());
        }
        return {
            get: function (r) {
                if (r && r.isTexture) {
                    const a = r.mapping;
                    if (303 === a || 304 === a) {
                        if (t.has(r)) {
                            return n(t.get(r).texture, r.mapping);
                        }
                        {
                            const a = r.image;
                            if (a && a.height > 0) {
                                const o = e.getRenderList(),
                                    s = e.getRenderTarget(),
                                    l = e.getRenderState(),
                                    c = new dn(a.height / 2);
                                return c.fromEquirectangularTexture(e, r), t.set(r, c), e.setRenderTarget(s), e.setRenderList(o), e.setRenderState(l), r.addEventListener("dispose", i), n(c.texture, r.mapping);
                            }
                            return null;
                        }
                    }
                }
                return r;
            },
            dispose: function () {
                t = new WeakMap();
            },
        };
    }
    function En(e) {
        const t = {};
        return {
            has: function (n) {
                if (void 0 !== t[n]) return null !== t[n];
                let i;
                switch (n) {
                    case "WEBGL_depth_texture":
                        i = e.getExtension("WEBGL_depth_texture") || e.getExtension("MOZ_WEBGL_depth_texture") || e.getExtension("WEBKIT_WEBGL_depth_texture");
                        break;
                    case "EXT_texture_filter_anisotropic":
                        i = e.getExtension("EXT_texture_filter_anisotropic") || e.getExtension("MOZ_EXT_texture_filter_anisotropic") || e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
                        break;
                    case "WEBGL_compressed_texture_s3tc":
                        i = e.getExtension("WEBGL_compressed_texture_s3tc") || e.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
                        break;
                    case "WEBGL_compressed_texture_pvrtc":
                        i = e.getExtension("WEBGL_compressed_texture_pvrtc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
                        break;
                    default:
                        i = e.getExtension(n);
                }
                return (t[n] = i), null !== i;
            },
            get: function (e) {
                return this.has(e) || console.warn("THREE.WebGLRenderer: " + e + " extension not supported."), t[e];
            },
        };
    }
    function Pn(e, t, n, i) {
        const r = new WeakMap(),
            a = new WeakMap();
        function o(e) {
            const s = e.target,
                l = r.get(s);
            null !== l.index && t.remove(l.index);
            for (const e in l.attributes) t.remove(l.attributes[e]);
            s.removeEventListener("dispose", o), r.delete(s);
            const c = a.get(l);
            c && (t.remove(c), a.delete(l)), i.releaseStatesOfGeometry(l), !0 === s.isInstancedBufferGeometry && delete s._maxInstanceCount, n.memory.geometries--;
        }
        function s(e) {
            const n = [],
                i = e.index,
                r = e.attributes.position;
            let o = 0;
            if (null !== i) {
                const e = i.array;
                o = i.version;
                for (let t = 0, i = e.length; t < i; t += 3) {
                    const i = e[t + 0],
                        r = e[t + 1],
                        a = e[t + 2];
                    n.push(i, r, r, a, a, i);
                }
            } else {
                const e = r.array;
                o = r.version;
                for (let t = 0, i = e.length / 3 - 1; t < i; t += 3) {
                    const e = t + 0,
                        i = t + 1,
                        r = t + 2;
                    n.push(e, i, i, r, r, e);
                }
            }
            const s = new (St(n) > 65535 ? Mt : _t)(n, 1);
            s.version = o;
            const l = a.get(e);
            l && t.remove(l), a.set(e, s);
        }
        return {
            get: function (e, t) {
                let i = r.get(t);
                return (
                    i ||
                    (t.addEventListener("dispose", o),
                    t.isBufferGeometry ? (i = t) : t.isGeometry && (void 0 === t._bufferGeometry && (t._bufferGeometry = new It().setFromObject(e)), (i = t._bufferGeometry)),
                    r.set(t, i),
                    n.memory.geometries++,
                    i)
                );
            },
            update: function (e) {
                const n = e.attributes;
                for (const e in n) t.update(n[e], 34962);
                const i = e.morphAttributes;
                for (const e in i) {
                    const n = i[e];
                    for (let e = 0, i = n.length; e < i; e++) t.update(n[e], 34962);
                }
            },
            getWireframeAttribute: function (e) {
                const t = a.get(e);
                if (t) {
                    const n = e.index;
                    null !== n && t.version < n.version && s(e);
                } else s(e);
                return a.get(e);
            },
        };
    }
    function Fn(e, t, n, i) {
        const r = i.isWebGL2;
        let a, o, s;
        (this.setMode = function (e) {
            a = e;
        }),
            (this.setIndex = function (e) {
                (o = e.type), (s = e.bytesPerElement);
            }),
            (this.render = function (t, i) {
                e.drawElements(a, i, o, t * s), n.update(i, a, 1);
            }),
            (this.renderInstances = function (i, l, c) {
                if (0 === c) return;
                let h, d;
                if (r) (h = e), (d = "drawElementsInstanced");
                else if (((h = t.get("ANGLE_instanced_arrays")), (d = "drawElementsInstancedANGLE"), null === h))
                    return void console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
                h[d](a, l, o, i * s, c), n.update(l, a, c);
            });
    }
    function Nn(e) {
        const t = { frame: 0, calls: 0, triangles: 0, points: 0, lines: 0 };
        return {
            memory: { geometries: 0, textures: 0 },
            render: t,
            programs: null,
            autoReset: !0,
            reset: function () {
                t.frame++, (t.calls = 0), (t.triangles = 0), (t.points = 0), (t.lines = 0);
            },
            update: function (e, n, i) {
                switch ((t.calls++, n)) {
                    case 4:
                        t.triangles += i * (e / 3);
                        break;
                    case 1:
                        t.lines += i * (e / 2);
                        break;
                    case 3:
                        t.lines += i * (e - 1);
                        break;
                    case 2:
                        t.lines += i * e;
                        break;
                    case 0:
                        t.points += i * e;
                        break;
                    default:
                        console.error("THREE.WebGLInfo: Unknown draw mode:", n);
                }
            },
        };
    }
    function Cn(e, t) {
        return e[0] - t[0];
    }
    function In(e, t) {
        return Math.abs(t[1]) - Math.abs(e[1]);
    }
    function Rn(e) {
        const t = {},
            n = new Float32Array(8),
            i = [];
        for (let e = 0; e < 8; e++) i[e] = [e, 0];
        return {
            update: function (r, a, o, s) {
                const l = r.morphTargetInfluences,
                    c = void 0 === l ? 0 : l.length;
                let h = t[a.id];
                if (void 0 === h) {
                    h = [];
                    for (let e = 0; e < c; e++) h[e] = [e, 0];
                    t[a.id] = h;
                }
                for (let e = 0; e < c; e++) {
                    const t = h[e];
                    (t[0] = e), (t[1] = l[e]);
                }
                h.sort(In);
                for (let e = 0; e < 8; e++) e < c && h[e][1] ? ((i[e][0] = h[e][0]), (i[e][1] = h[e][1])) : ((i[e][0] = Number.MAX_SAFE_INTEGER), (i[e][1] = 0));
                i.sort(Cn);
                const d = o.morphTargets && a.morphAttributes.position,
                    u = o.morphNormals && a.morphAttributes.normal;
                let f = 0;
                for (let e = 0; e < 8; e++) {
                    const t = i[e],
                        r = t[0],
                        o = t[1];
                    r !== Number.MAX_SAFE_INTEGER && o
                        ? (d && a.getAttribute("morphTarget" + e) !== d[r] && a.setAttribute("morphTarget" + e, d[r]), u && a.getAttribute("morphNormal" + e) !== u[r] && a.setAttribute("morphNormal" + e, u[r]), (n[e] = o), (f += o))
                        : (d && void 0 !== a.getAttribute("morphTarget" + e) && a.deleteAttribute("morphTarget" + e), u && void 0 !== a.getAttribute("morphNormal" + e) && a.deleteAttribute("morphNormal" + e), (n[e] = 0));
                }
                const p = a.morphTargetsRelative ? 1 : 1 - f;
                s.getUniforms().setValue(e, "morphTargetBaseInfluence", p), s.getUniforms().setValue(e, "morphTargetInfluences", n);
            },
        };
    }
    function Dn(e, t, n, i) {
        let r = new WeakMap();
        return {
            update: function (e) {
                const a = i.render.frame,
                    o = e.geometry,
                    s = t.get(e, o);
                return r.get(s) !== a && (o.isGeometry && s.updateFromObject(e), t.update(s), r.set(s, a)), e.isInstancedMesh && (n.update(e.instanceMatrix, 34962), null !== e.instanceColor && n.update(e.instanceColor, 34962)), s;
            },
            dispose: function () {
                r = new WeakMap();
            },
        };
    }
    function Un(e, t, n, i) {
        O.call(this, null),
            (this.image = { data: e || null, width: t || 1, height: n || 1, depth: i || 1 }),
            (this.magFilter = u),
            (this.minFilter = u),
            (this.wrapR = h),
            (this.generateMipmaps = !1),
            (this.flipY = !1),
            (this.needsUpdate = !0);
    }
    function On(e, t, n, i) {
        O.call(this, null),
            (this.image = { data: e || null, width: t || 1, height: n || 1, depth: i || 1 }),
            (this.magFilter = u),
            (this.minFilter = u),
            (this.wrapR = h),
            (this.generateMipmaps = !1),
            (this.flipY = !1),
            (this.needsUpdate = !0);
    }
    (Mn.physical = {
        uniforms: nn([
            Mn.standard.uniforms,
            {
                clearcoat: { value: 0 },
                clearcoatMap: { value: null },
                clearcoatRoughness: { value: 0 },
                clearcoatRoughnessMap: { value: null },
                clearcoatNormalScale: { value: new C(1, 1) },
                clearcoatNormalMap: { value: null },
                sheen: { value: new st(0) },
                transmission: { value: 0 },
                transmissionMap: { value: null },
            },
        ]),
        vertexShader: _n.meshphysical_vert,
        fragmentShader: _n.meshphysical_frag,
    }),
        (Un.prototype = Object.create(O.prototype)),
        (Un.prototype.constructor = Un),
        (Un.prototype.isDataTexture2DArray = !0),
        (On.prototype = Object.create(O.prototype)),
        (On.prototype.constructor = On),
        (On.prototype.isDataTexture3D = !0);
    const zn = new O(),
        Gn = new Un(),
        Bn = new On(),
        Hn = new hn(),
        kn = [],
        Vn = [],
        Wn = new Float32Array(16),
        Xn = new Float32Array(9),
        Yn = new Float32Array(4);
    function jn(e, t, n) {
        const i = e[0];
        if (i <= 0 || i > 0) return e;
        const r = t * n;
        let a = kn[r];
        if ((void 0 === a && ((a = new Float32Array(r)), (kn[r] = a)), 0 !== t)) {
            i.toArray(a, 0);
            for (let i = 1, r = 0; i !== t; ++i) (r += n), e[i].toArray(a, r);
        }
        return a;
    }
    function Qn(e, t) {
        if (e.length !== t.length) return !1;
        for (let n = 0, i = e.length; n < i; n++) if (e[n] !== t[n]) return !1;
        return !0;
    }
    function qn(e, t) {
        for (let n = 0, i = t.length; n < i; n++) e[n] = t[n];
    }
    function Zn(e, t) {
        let n = Vn[t];
        void 0 === n && ((n = new Int32Array(t)), (Vn[t] = n));
        for (let i = 0; i !== t; ++i) n[i] = e.allocateTextureUnit();
        return n;
    }
    function Jn(e, t) {
        const n = this.cache;
        n[0] !== t && (e.uniform1f(this.addr, t), (n[0] = t));
    }
    function Kn(e, t) {
        const n = this.cache;
        if (void 0 !== t.x) (n[0] === t.x && n[1] === t.y) || (e.uniform2f(this.addr, t.x, t.y), (n[0] = t.x), (n[1] = t.y));
        else {
            if (Qn(n, t)) return;
            e.uniform2fv(this.addr, t), qn(n, t);
        }
    }
    function $n(e, t) {
        const n = this.cache;
        if (void 0 !== t.x) (n[0] === t.x && n[1] === t.y && n[2] === t.z) || (e.uniform3f(this.addr, t.x, t.y, t.z), (n[0] = t.x), (n[1] = t.y), (n[2] = t.z));
        else if (void 0 !== t.r) (n[0] === t.r && n[1] === t.g && n[2] === t.b) || (e.uniform3f(this.addr, t.r, t.g, t.b), (n[0] = t.r), (n[1] = t.g), (n[2] = t.b));
        else {
            if (Qn(n, t)) return;
            e.uniform3fv(this.addr, t), qn(n, t);
        }
    }
    function ei(e, t) {
        const n = this.cache;
        if (void 0 !== t.x) (n[0] === t.x && n[1] === t.y && n[2] === t.z && n[3] === t.w) || (e.uniform4f(this.addr, t.x, t.y, t.z, t.w), (n[0] = t.x), (n[1] = t.y), (n[2] = t.z), (n[3] = t.w));
        else {
            if (Qn(n, t)) return;
            e.uniform4fv(this.addr, t), qn(n, t);
        }
    }
    function ti(e, t) {
        const n = this.cache,
            i = t.elements;
        if (void 0 === i) {
            if (Qn(n, t)) return;
            e.uniformMatrix2fv(this.addr, !1, t), qn(n, t);
        } else {
            if (Qn(n, i)) return;
            Yn.set(i), e.uniformMatrix2fv(this.addr, !1, Yn), qn(n, i);
        }
    }
    function ni(e, t) {
        const n = this.cache,
            i = t.elements;
        if (void 0 === i) {
            if (Qn(n, t)) return;
            e.uniformMatrix3fv(this.addr, !1, t), qn(n, t);
        } else {
            if (Qn(n, i)) return;
            Xn.set(i), e.uniformMatrix3fv(this.addr, !1, Xn), qn(n, i);
        }
    }
    function ii(e, t) {
        const n = this.cache,
            i = t.elements;
        if (void 0 === i) {
            if (Qn(n, t)) return;
            e.uniformMatrix4fv(this.addr, !1, t), qn(n, t);
        } else {
            if (Qn(n, i)) return;
            Wn.set(i), e.uniformMatrix4fv(this.addr, !1, Wn), qn(n, i);
        }
    }
    function ri(e, t, n) {
        const i = this.cache,
            r = n.allocateTextureUnit();
        i[0] !== r && (e.uniform1i(this.addr, r), (i[0] = r)), n.safeSetTexture2D(t || zn, r);
    }
    function ai(e, t, n) {
        const i = this.cache,
            r = n.allocateTextureUnit();
        i[0] !== r && (e.uniform1i(this.addr, r), (i[0] = r)), n.setTexture2DArray(t || Gn, r);
    }
    function oi(e, t, n) {
        const i = this.cache,
            r = n.allocateTextureUnit();
        i[0] !== r && (e.uniform1i(this.addr, r), (i[0] = r)), n.setTexture3D(t || Bn, r);
    }
    function si(e, t, n) {
        const i = this.cache,
            r = n.allocateTextureUnit();
        i[0] !== r && (e.uniform1i(this.addr, r), (i[0] = r)), n.safeSetTextureCube(t || Hn, r);
    }
    function li(e, t) {
        const n = this.cache;
        n[0] !== t && (e.uniform1i(this.addr, t), (n[0] = t));
    }
    function ci(e, t) {
        const n = this.cache;
        Qn(n, t) || (e.uniform2iv(this.addr, t), qn(n, t));
    }
    function hi(e, t) {
        const n = this.cache;
        Qn(n, t) || (e.uniform3iv(this.addr, t), qn(n, t));
    }
    function di(e, t) {
        const n = this.cache;
        Qn(n, t) || (e.uniform4iv(this.addr, t), qn(n, t));
    }
    function ui(e, t) {
        const n = this.cache;
        n[0] !== t && (e.uniform1ui(this.addr, t), (n[0] = t));
    }
    function fi(e, t) {
        e.uniform1fv(this.addr, t);
    }
    function pi(e, t) {
        e.uniform1iv(this.addr, t);
    }
    function mi(e, t) {
        e.uniform2iv(this.addr, t);
    }
    function gi(e, t) {
        e.uniform3iv(this.addr, t);
    }
    function xi(e, t) {
        e.uniform4iv(this.addr, t);
    }
    function vi(e, t) {
        const n = jn(t, this.size, 2);
        e.uniform2fv(this.addr, n);
    }
    function _i(e, t) {
        const n = jn(t, this.size, 3);
        e.uniform3fv(this.addr, n);
    }
    function yi(e, t) {
        const n = jn(t, this.size, 4);
        e.uniform4fv(this.addr, n);
    }
    function Mi(e, t) {
        const n = jn(t, this.size, 4);
        e.uniformMatrix2fv(this.addr, !1, n);
    }
    function bi(e, t) {
        const n = jn(t, this.size, 9);
        e.uniformMatrix3fv(this.addr, !1, n);
    }
    function wi(e, t) {
        const n = jn(t, this.size, 16);
        e.uniformMatrix4fv(this.addr, !1, n);
    }
    function Ai(e, t, n) {
        const i = t.length,
            r = Zn(n, i);
        e.uniform1iv(this.addr, r);
        for (let e = 0; e !== i; ++e) n.safeSetTexture2D(t[e] || zn, r[e]);
    }
    function Si(e, t, n) {
        const i = t.length,
            r = Zn(n, i);
        e.uniform1iv(this.addr, r);
        for (let e = 0; e !== i; ++e) n.safeSetTextureCube(t[e] || Hn, r[e]);
    }
    function Ti(e, t, n) {
        (this.id = e),
            (this.addr = n),
            (this.cache = []),
            (this.setValue = (function (e) {
                switch (e) {
                    case 5126:
                        return Jn;
                    case 35664:
                        return Kn;
                    case 35665:
                        return $n;
                    case 35666:
                        return ei;
                    case 35674:
                        return ti;
                    case 35675:
                        return ni;
                    case 35676:
                        return ii;
                    case 5124:
                    case 35670:
                        return li;
                    case 35667:
                    case 35671:
                        return ci;
                    case 35668:
                    case 35672:
                        return hi;
                    case 35669:
                    case 35673:
                        return di;
                    case 5125:
                        return ui;
                    case 35678:
                    case 36198:
                    case 36298:
                    case 36306:
                    case 35682:
                        return ri;
                    case 35679:
                    case 36299:
                    case 36307:
                        return oi;
                    case 35680:
                    case 36300:
                    case 36308:
                    case 36293:
                        return si;
                    case 36289:
                    case 36303:
                    case 36311:
                    case 36292:
                        return ai;
                }
            })(t.type));
    }
    function Li(e, t, n) {
        (this.id = e),
            (this.addr = n),
            (this.cache = []),
            (this.size = t.size),
            (this.setValue = (function (e) {
                switch (e) {
                    case 5126:
                        return fi;
                    case 35664:
                        return vi;
                    case 35665:
                        return _i;
                    case 35666:
                        return yi;
                    case 35674:
                        return Mi;
                    case 35675:
                        return bi;
                    case 35676:
                        return wi;
                    case 5124:
                    case 35670:
                        return pi;
                    case 35667:
                    case 35671:
                        return mi;
                    case 35668:
                    case 35672:
                        return gi;
                    case 35669:
                    case 35673:
                        return xi;
                    case 35678:
                    case 36198:
                    case 36298:
                    case 36306:
                    case 35682:
                        return Ai;
                    case 35680:
                    case 36300:
                    case 36308:
                    case 36293:
                        return Si;
                }
            })(t.type));
    }
    function Ei(e) {
        (this.id = e), (this.seq = []), (this.map = {});
    }
    (Li.prototype.updateCache = function (e) {
        const t = this.cache;
        e instanceof Float32Array && t.length !== e.length && (this.cache = new Float32Array(e.length)), qn(t, e);
    }),
        (Ei.prototype.setValue = function (e, t, n) {
            const i = this.seq;
            for (let r = 0, a = i.length; r !== a; ++r) {
                const a = i[r];
                a.setValue(e, t[a.id], n);
            }
        });
    const Pi = /([\w\d_]+)(\])?(\[|\.)?/g;
    function Fi(e, t) {
        e.seq.push(t), (e.map[t.id] = t);
    }
    function Ni(e, t, n) {
        const i = e.name,
            r = i.length;
        for (Pi.lastIndex = 0; ; ) {
            const a = Pi.exec(i),
                o = Pi.lastIndex;
            let s = a[1];
            const l = "]" === a[2],
                c = a[3];
            if ((l && (s |= 0), void 0 === c || ("[" === c && o + 2 === r))) {
                Fi(n, void 0 === c ? new Ti(s, e, t) : new Li(s, e, t));
                break;
            }
            {
                let e = n.map[s];
                void 0 === e && ((e = new Ei(s)), Fi(n, e)), (n = e);
            }
        }
    }
    function Ci(e, t) {
        (this.seq = []), (this.map = {});
        const n = e.getProgramParameter(t, 35718);
        for (let i = 0; i < n; ++i) {
            const n = e.getActiveUniform(t, i);
            Ni(n, e.getUniformLocation(t, n.name), this);
        }
    }
    function Ii(e, t, n) {
        const i = e.createShader(t);
        return e.shaderSource(i, n), e.compileShader(i), i;
    }
    (Ci.prototype.setValue = function (e, t, n, i) {
        const r = this.map[t];
        void 0 !== r && r.setValue(e, n, i);
    }),
        (Ci.prototype.setOptional = function (e, t, n) {
            const i = t[n];
            void 0 !== i && this.setValue(e, n, i);
        }),
        (Ci.upload = function (e, t, n, i) {
            for (let r = 0, a = t.length; r !== a; ++r) {
                const a = t[r],
                    o = n[a.id];
                !1 !== o.needsUpdate && a.setValue(e, o.value, i);
            }
        }),
        (Ci.seqWithValue = function (e, t) {
            const n = [];
            for (let i = 0, r = e.length; i !== r; ++i) {
                const r = e[i];
                r.id in t && n.push(r);
            }
            return n;
        });
    let Ri = 0;
    function Di(e) {
        switch (e) {
            case S:
                return ["Linear", "( value )"];
            case 3001:
                return ["sRGB", "( value )"];
            case 3002:
                return ["RGBE", "( value )"];
            case 3004:
                return ["RGBM", "( value, 7.0 )"];
            case 3005:
                return ["RGBM", "( value, 16.0 )"];
            case 3006:
                return ["RGBD", "( value, 256.0 )"];
            case 3007:
                return ["Gamma", "( value, float( GAMMA_FACTOR ) )"];
            case 3003:
                return ["LogLuv", "( value )"];
            default:
                return console.warn("THREE.WebGLProgram: Unsupported encoding:", e), ["Linear", "( value )"];
        }
    }
    function Ui(e, t, n) {
        const i = e.getShaderParameter(t, 35713),
            r = e.getShaderInfoLog(t).trim();
        if (i && "" === r) return "";
        return (
            "THREE.WebGLShader: gl.getShaderInfoLog() " +
            n +
            "\n" +
            r +
            (function (e) {
                const t = e.split("\n");
                for (let e = 0; e < t.length; e++) t[e] = e + 1 + ": " + t[e];
                return t.join("\n");
            })(e.getShaderSource(t))
        );
    }
    function Oi(e, t) {
        const n = Di(t);
        return "vec4 " + e + "( vec4 value ) { return " + n[0] + "ToLinear" + n[1] + "; }";
    }
    function zi(e, t) {
        const n = Di(t);
        return "vec4 " + e + "( vec4 value ) { return LinearTo" + n[0] + n[1] + "; }";
    }
    function Gi(e, t) {
        let n;
        switch (t) {
            case 1:
                n = "Linear";
                break;
            case 2:
                n = "Reinhard";
                break;
            case 3:
                n = "OptimizedCineon";
                break;
            case 4:
                n = "ACESFilmic";
                break;
            case 5:
                n = "Custom";
                break;
            default:
                console.warn("THREE.WebGLProgram: Unsupported toneMapping:", t), (n = "Linear");
        }
        return "vec3 " + e + "( vec3 color ) { return " + n + "ToneMapping( color ); }";
    }
    function Bi(e) {
        return "" !== e;
    }
    function Hi(e, t) {
        return e
            .replace(/NUM_DIR_LIGHTS/g, t.numDirLights)
            .replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights)
            .replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights)
            .replace(/NUM_POINT_LIGHTS/g, t.numPointLights)
            .replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights)
            .replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows)
            .replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows)
            .replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows);
    }
    function ki(e, t) {
        return e.replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection);
    }
    const Vi = /^[ \t]*#include +<([\w\d./]+)>/gm;
    function Wi(e) {
        return e.replace(Vi, Xi);
    }
    function Xi(e, t) {
        const n = _n[t];
        if (void 0 === n) throw new Error("Can not resolve #include <" + t + ">");
        return Wi(n);
    }
    const Yi = /#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g,
        ji = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
    function Qi(e) {
        return e.replace(ji, Zi).replace(Yi, qi);
    }
    function qi(e, t, n, i) {
        return console.warn("WebGLProgram: #pragma unroll_loop shader syntax is deprecated. Please use #pragma unroll_loop_start syntax instead."), Zi(e, t, n, i);
    }
    function Zi(e, t, n, i) {
        let r = "";
        for (let e = parseInt(t); e < parseInt(n); e++) r += i.replace(/\[\s*i\s*\]/g, "[ " + e + " ]").replace(/UNROLLED_LOOP_INDEX/g, e);
        return r;
    }
    function Ji(e) {
        let t = "precision " + e.precision + " float;\nprecision " + e.precision + " int;";
        return "highp" === e.precision ? (t += "\n#define HIGH_PRECISION") : "mediump" === e.precision ? (t += "\n#define MEDIUM_PRECISION") : "lowp" === e.precision && (t += "\n#define LOW_PRECISION"), t;
    }
    function Ki(e, t, n, i) {
        const r = e.getContext(),
            a = n.defines;
        let o = n.vertexShader,
            s = n.fragmentShader;
        const l = (function (e) {
                let t = "SHADOWMAP_TYPE_BASIC";
                return 1 === e.shadowMapType ? (t = "SHADOWMAP_TYPE_PCF") : 2 === e.shadowMapType ? (t = "SHADOWMAP_TYPE_PCF_SOFT") : 3 === e.shadowMapType && (t = "SHADOWMAP_TYPE_VSM"), t;
            })(n),
            c = (function (e) {
                let t = "ENVMAP_TYPE_CUBE";
                if (e.envMap)
                    switch (e.envMapMode) {
                        case 301:
                        case 302:
                            t = "ENVMAP_TYPE_CUBE";
                            break;
                        case 306:
                        case 307:
                            t = "ENVMAP_TYPE_CUBE_UV";
                    }
                return t;
            })(n),
            h = (function (e) {
                let t = "ENVMAP_MODE_REFLECTION";
                if (e.envMap)
                    switch (e.envMapMode) {
                        case 302:
                        case 307:
                            t = "ENVMAP_MODE_REFRACTION";
                    }
                return t;
            })(n),
            d = (function (e) {
                let t = "ENVMAP_BLENDING_NONE";
                if (e.envMap)
                    switch (e.combine) {
                        case 0:
                            t = "ENVMAP_BLENDING_MULTIPLY";
                            break;
                        case 1:
                            t = "ENVMAP_BLENDING_MIX";
                            break;
                        case 2:
                            t = "ENVMAP_BLENDING_ADD";
                    }
                return t;
            })(n),
            u = e.gammaFactor > 0 ? e.gammaFactor : 1,
            f = n.isWebGL2
                ? ""
                : (function (e) {
                      return [
                          e.extensionDerivatives || e.envMapCubeUV || e.bumpMap || e.tangentSpaceNormalMap || e.clearcoatNormalMap || e.flatShading || "physical" === e.shaderID ? "#extension GL_OES_standard_derivatives : enable" : "",
                          (e.extensionFragDepth || e.logarithmicDepthBuffer) && e.rendererExtensionFragDepth ? "#extension GL_EXT_frag_depth : enable" : "",
                          e.extensionDrawBuffers && e.rendererExtensionDrawBuffers ? "#extension GL_EXT_draw_buffers : require" : "",
                          (e.extensionShaderTextureLOD || e.envMap) && e.rendererExtensionShaderTextureLod ? "#extension GL_EXT_shader_texture_lod : enable" : "",
                      ]
                          .filter(Bi)
                          .join("\n");
                  })(n),
            p = (function (e) {
                const t = [];
                for (const n in e) {
                    const i = e[n];
                    !1 !== i && t.push("#define " + n + " " + i);
                }
                return t.join("\n");
            })(a),
            m = r.createProgram();
        let g,
            x,
            v = n.glslVersion ? "#version " + n.glslVersion + "\n" : "";
        n.isRawShaderMaterial
            ? ((g = [p].filter(Bi).join("\n")), g.length > 0 && (g += "\n"), (x = [f, p].filter(Bi).join("\n")), x.length > 0 && (x += "\n"))
            : ((g = [
                  Ji(n),
                  "#define SHADER_NAME " + n.shaderName,
                  p,
                  n.instancing ? "#define USE_INSTANCING" : "",
                  n.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
                  n.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "",
                  "#define GAMMA_FACTOR " + u,
                  "#define MAX_BONES " + n.maxBones,
                  n.useFog && n.fog ? "#define USE_FOG" : "",
                  n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "",
                  n.map ? "#define USE_MAP" : "",
                  n.envMap ? "#define USE_ENVMAP" : "",
                  n.envMap ? "#define " + h : "",
                  n.lightMap ? "#define USE_LIGHTMAP" : "",
                  n.aoMap ? "#define USE_AOMAP" : "",
                  n.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
                  n.bumpMap ? "#define USE_BUMPMAP" : "",
                  n.normalMap ? "#define USE_NORMALMAP" : "",
                  n.normalMap && n.objectSpaceNormalMap ? "#define OBJECTSPACE_NORMALMAP" : "",
                  n.normalMap && n.tangentSpaceNormalMap ? "#define TANGENTSPACE_NORMALMAP" : "",
                  n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
                  n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
                  n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
                  n.displacementMap && n.supportsVertexTextures ? "#define USE_DISPLACEMENTMAP" : "",
                  n.specularMap ? "#define USE_SPECULARMAP" : "",
                  n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
                  n.metalnessMap ? "#define USE_METALNESSMAP" : "",
                  n.alphaMap ? "#define USE_ALPHAMAP" : "",
                  n.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
                  n.vertexTangents ? "#define USE_TANGENT" : "",
                  n.vertexColors ? "#define USE_COLOR" : "",
                  n.vertexUvs ? "#define USE_UV" : "",
                  n.uvsVertexOnly ? "#define UVS_VERTEX_ONLY" : "",
                  n.flatShading ? "#define FLAT_SHADED" : "",
                  n.skinning ? "#define USE_SKINNING" : "",
                  n.useVertexTexture ? "#define BONE_TEXTURE" : "",
                  n.morphTargets ? "#define USE_MORPHTARGETS" : "",
                  n.morphNormals && !1 === n.flatShading ? "#define USE_MORPHNORMALS" : "",
                  n.doubleSided ? "#define DOUBLE_SIDED" : "",
                  n.flipSided ? "#define FLIP_SIDED" : "",
                  n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
                  n.shadowMapEnabled ? "#define " + l : "",
                  n.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
                  n.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
                  n.logarithmicDepthBuffer && n.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "",
                  "uniform mat4 modelMatrix;",
                  "uniform mat4 modelViewMatrix;",
                  "uniform mat4 projectionMatrix;",
                  "uniform mat4 viewMatrix;",
                  "uniform mat3 normalMatrix;",
                  "uniform vec3 cameraPosition;",
                  "uniform bool isOrthographic;",
                  "#ifdef USE_INSTANCING",
                  "\tattribute mat4 instanceMatrix;",
                  "#endif",
                  "#ifdef USE_INSTANCING_COLOR",
                  "\tattribute vec3 instanceColor;",
                  "#endif",
                  "attribute vec3 position;",
                  "attribute vec3 normal;",
                  "attribute vec2 uv;",
                  "#ifdef USE_TANGENT",
                  "\tattribute vec4 tangent;",
                  "#endif",
                  "#ifdef USE_COLOR",
                  "\tattribute vec3 color;",
                  "#endif",
                  "#ifdef USE_MORPHTARGETS",
                  "\tattribute vec3 morphTarget0;",
                  "\tattribute vec3 morphTarget1;",
                  "\tattribute vec3 morphTarget2;",
                  "\tattribute vec3 morphTarget3;",
                  "\t#ifdef USE_MORPHNORMALS",
                  "\t\tattribute vec3 morphNormal0;",
                  "\t\tattribute vec3 morphNormal1;",
                  "\t\tattribute vec3 morphNormal2;",
                  "\t\tattribute vec3 morphNormal3;",
                  "\t#else",
                  "\t\tattribute vec3 morphTarget4;",
                  "\t\tattribute vec3 morphTarget5;",
                  "\t\tattribute vec3 morphTarget6;",
                  "\t\tattribute vec3 morphTarget7;",
                  "\t#endif",
                  "#endif",
                  "#ifdef USE_SKINNING",
                  "\tattribute vec4 skinIndex;",
                  "\tattribute vec4 skinWeight;",
                  "#endif",
                  "\n",
              ]
                  .filter(Bi)
                  .join("\n")),
              (x = [
                  f,
                  Ji(n),
                  "#define SHADER_NAME " + n.shaderName,
                  p,
                  n.alphaTest ? "#define ALPHATEST " + n.alphaTest + (n.alphaTest % 1 ? "" : ".0") : "",
                  "#define GAMMA_FACTOR " + u,
                  n.useFog && n.fog ? "#define USE_FOG" : "",
                  n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "",
                  n.map ? "#define USE_MAP" : "",
                  n.matcap ? "#define USE_MATCAP" : "",
                  n.envMap ? "#define USE_ENVMAP" : "",
                  n.envMap ? "#define " + c : "",
                  n.envMap ? "#define " + h : "",
                  n.envMap ? "#define " + d : "",
                  n.lightMap ? "#define USE_LIGHTMAP" : "",
                  n.aoMap ? "#define USE_AOMAP" : "",
                  n.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
                  n.bumpMap ? "#define USE_BUMPMAP" : "",
                  n.normalMap ? "#define USE_NORMALMAP" : "",
                  n.normalMap && n.objectSpaceNormalMap ? "#define OBJECTSPACE_NORMALMAP" : "",
                  n.normalMap && n.tangentSpaceNormalMap ? "#define TANGENTSPACE_NORMALMAP" : "",
                  n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
                  n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
                  n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
                  n.specularMap ? "#define USE_SPECULARMAP" : "",
                  n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
                  n.metalnessMap ? "#define USE_METALNESSMAP" : "",
                  n.alphaMap ? "#define USE_ALPHAMAP" : "",
                  n.sheen ? "#define USE_SHEEN" : "",
                  n.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
                  n.vertexTangents ? "#define USE_TANGENT" : "",
                  n.vertexColors || n.instancingColor ? "#define USE_COLOR" : "",
                  n.vertexUvs ? "#define USE_UV" : "",
                  n.uvsVertexOnly ? "#define UVS_VERTEX_ONLY" : "",
                  n.gradientMap ? "#define USE_GRADIENTMAP" : "",
                  n.flatShading ? "#define FLAT_SHADED" : "",
                  n.doubleSided ? "#define DOUBLE_SIDED" : "",
                  n.flipSided ? "#define FLIP_SIDED" : "",
                  n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
                  n.shadowMapEnabled ? "#define " + l : "",
                  n.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
                  n.physicallyCorrectLights ? "#define PHYSICALLY_CORRECT_LIGHTS" : "",
                  n.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
                  n.logarithmicDepthBuffer && n.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "",
                  (n.extensionShaderTextureLOD || n.envMap) && n.rendererExtensionShaderTextureLod ? "#define TEXTURE_LOD_EXT" : "",
                  "uniform mat4 viewMatrix;",
                  "uniform vec3 cameraPosition;",
                  "uniform bool isOrthographic;",
                  0 !== n.toneMapping ? "#define TONE_MAPPING" : "",
                  0 !== n.toneMapping ? _n.tonemapping_pars_fragment : "",
                  0 !== n.toneMapping ? Gi("toneMapping", n.toneMapping) : "",
                  n.dithering ? "#define DITHERING" : "",
                  _n.encodings_pars_fragment,
                  n.map ? Oi("mapTexelToLinear", n.mapEncoding) : "",
                  n.matcap ? Oi("matcapTexelToLinear", n.matcapEncoding) : "",
                  n.envMap ? Oi("envMapTexelToLinear", n.envMapEncoding) : "",
                  n.emissiveMap ? Oi("emissiveMapTexelToLinear", n.emissiveMapEncoding) : "",
                  n.lightMap ? Oi("lightMapTexelToLinear", n.lightMapEncoding) : "",
                  zi("linearToOutputTexel", n.outputEncoding),
                  n.depthPacking ? "#define DEPTH_PACKING " + n.depthPacking : "",
                  "\n",
              ]
                  .filter(Bi)
                  .join("\n"))),
            (o = Wi(o)),
            (o = Hi(o, n)),
            (o = ki(o, n)),
            (s = Wi(s)),
            (s = Hi(s, n)),
            (s = ki(s, n)),
            (o = Qi(o)),
            (s = Qi(s)),
            n.isWebGL2 &&
                !0 !== n.isRawShaderMaterial &&
                ((v = "#version 300 es\n"),
                (g = ["#define attribute in", "#define varying out", "#define texture2D texture"].join("\n") + "\n" + g),
                (x =
                    [
                        "#define varying in",
                        n.glslVersion === L ? "" : "out highp vec4 pc_fragColor;",
                        n.glslVersion === L ? "" : "#define gl_FragColor pc_fragColor",
                        "#define gl_FragDepthEXT gl_FragDepth",
                        "#define texture2D texture",
                        "#define textureCube texture",
                        "#define texture2DProj textureProj",
                        "#define texture2DLodEXT textureLod",
                        "#define texture2DProjLodEXT textureProjLod",
                        "#define textureCubeLodEXT textureLod",
                        "#define texture2DGradEXT textureGrad",
                        "#define texture2DProjGradEXT textureProjGrad",
                        "#define textureCubeGradEXT textureGrad",
                    ].join("\n") +
                    "\n" +
                    x));
        const _ = v + x + s,
            y = Ii(r, 35633, v + g + o),
            M = Ii(r, 35632, _);
        if (
            (r.attachShader(m, y),
            r.attachShader(m, M),
            void 0 !== n.index0AttributeName ? r.bindAttribLocation(m, 0, n.index0AttributeName) : !0 === n.morphTargets && r.bindAttribLocation(m, 0, "position"),
            r.linkProgram(m),
            e.debug.checkShaderErrors)
        ) {
            const e = r.getProgramInfoLog(m).trim(),
                t = r.getShaderInfoLog(y).trim(),
                n = r.getShaderInfoLog(M).trim();
            let i = !0,
                a = !0;
            if (!1 === r.getProgramParameter(m, 35714)) {
                i = !1;
                const t = Ui(r, y, "vertex"),
                    n = Ui(r, M, "fragment");
                console.error("THREE.WebGLProgram: shader error: ", r.getError(), "gl.VALIDATE_STATUS", r.getProgramParameter(m, 35715), "gl.getProgramInfoLog", e, t, n);
            } else "" !== e ? console.warn("THREE.WebGLProgram: gl.getProgramInfoLog()", e) : ("" !== t && "" !== n) || (a = !1);
            a && (this.diagnostics = { runnable: i, programLog: e, vertexShader: { log: t, prefix: g }, fragmentShader: { log: n, prefix: x } });
        }
        let b, w;
        return (
            r.deleteShader(y),
            r.deleteShader(M),
            (this.getUniforms = function () {
                return void 0 === b && (b = new Ci(r, m)), b;
            }),
            (this.getAttributes = function () {
                return (
                    void 0 === w &&
                        (w = (function (e, t) {
                            const n = {},
                                i = e.getProgramParameter(t, 35721);
                            for (let r = 0; r < i; r++) {
                                const i = e.getActiveAttrib(t, r).name;
                                n[i] = e.getAttribLocation(t, i);
                            }
                            return n;
                        })(r, m)),
                    w
                );
            }),
            (this.destroy = function () {
                i.releaseStatesOfProgram(this), r.deleteProgram(m), (this.program = void 0);
            }),
            (this.name = n.shaderName),
            (this.id = Ri++),
            (this.cacheKey = t),
            (this.usedTimes = 1),
            (this.program = m),
            (this.vertexShader = y),
            (this.fragmentShader = M),
            this
        );
    }
    function $i(e, t, n, i, r, a) {
        const o = [],
            s = i.isWebGL2,
            l = i.logarithmicDepthBuffer,
            c = i.floatVertexTextures,
            h = i.maxVertexUniforms,
            d = i.vertexTextures;
        let u = i.precision;
        const f = {
                MeshDepthMaterial: "depth",
                MeshDistanceMaterial: "distanceRGBA",
                MeshNormalMaterial: "normal",
                MeshBasicMaterial: "basic",
                MeshLambertMaterial: "lambert",
                MeshPhongMaterial: "phong",
                MeshToonMaterial: "toon",
                MeshStandardMaterial: "physical",
                MeshPhysicalMaterial: "physical",
                MeshMatcapMaterial: "matcap",
                LineBasicMaterial: "basic",
                LineDashedMaterial: "dashed",
                PointsMaterial: "points",
                ShadowMaterial: "shadow",
                SpriteMaterial: "sprite",
            },
            p = [
                "precision",
                "isWebGL2",
                "supportsVertexTextures",
                "outputEncoding",
                "instancing",
                "instancingColor",
                "map",
                "mapEncoding",
                "matcap",
                "matcapEncoding",
                "envMap",
                "envMapMode",
                "envMapEncoding",
                "envMapCubeUV",
                "lightMap",
                "lightMapEncoding",
                "aoMap",
                "emissiveMap",
                "emissiveMapEncoding",
                "bumpMap",
                "normalMap",
                "objectSpaceNormalMap",
                "tangentSpaceNormalMap",
                "clearcoatMap",
                "clearcoatRoughnessMap",
                "clearcoatNormalMap",
                "displacementMap",
                "specularMap",
                "roughnessMap",
                "metalnessMap",
                "gradientMap",
                "alphaMap",
                "combine",
                "vertexColors",
                "vertexTangents",
                "vertexUvs",
                "uvsVertexOnly",
                "fog",
                "useFog",
                "fogExp2",
                "flatShading",
                "sizeAttenuation",
                "logarithmicDepthBuffer",
                "skinning",
                "maxBones",
                "useVertexTexture",
                "morphTargets",
                "morphNormals",
                "maxMorphTargets",
                "maxMorphNormals",
                "premultipliedAlpha",
                "numDirLights",
                "numPointLights",
                "numSpotLights",
                "numHemiLights",
                "numRectAreaLights",
                "numDirLightShadows",
                "numPointLightShadows",
                "numSpotLightShadows",
                "shadowMapEnabled",
                "shadowMapType",
                "toneMapping",
                "physicallyCorrectLights",
                "alphaTest",
                "doubleSided",
                "flipSided",
                "numClippingPlanes",
                "numClipIntersection",
                "depthPacking",
                "dithering",
                "sheen",
                "transmissionMap",
            ];
        function m(e) {
            let t;
            return (
                e
                    ? e.isTexture
                        ? (t = e.encoding)
                        : e.isWebGLRenderTarget && (console.warn("THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead."), (t = e.texture.encoding))
                    : (t = S),
                t
            );
        }
        return {
            getParameters: function (r, o, p, g, x) {
                const v = g.fog,
                    _ = r.isMeshStandardMaterial ? g.environment : null,
                    y = t.get(r.envMap || _),
                    M = f[r.type],
                    b = x.isSkinnedMesh
                        ? (function (e) {
                              const t = e.skeleton.bones;
                              if (c) return 1024;
                              {
                                  const e = h,
                                      n = Math.floor((e - 20) / 4),
                                      i = Math.min(n, t.length);
                                  return i < t.length ? (console.warn("THREE.WebGLRenderer: Skeleton has " + t.length + " bones. This GPU supports " + i + "."), 0) : i;
                              }
                          })(x)
                        : 0;
                let w, A;
                if ((null !== r.precision && ((u = i.getMaxPrecision(r.precision)), u !== r.precision && console.warn("THREE.WebGLProgram.getParameters:", r.precision, "not supported, using", u, "instead.")), M)) {
                    const e = Mn[M];
                    (w = e.vertexShader), (A = e.fragmentShader);
                } else (w = r.vertexShader), (A = r.fragmentShader);
                const S = e.getRenderTarget();
                return {
                    isWebGL2: s,
                    shaderID: M,
                    shaderName: r.type,
                    vertexShader: w,
                    fragmentShader: A,
                    defines: r.defines,
                    isRawShaderMaterial: !0 === r.isRawShaderMaterial,
                    glslVersion: r.glslVersion,
                    precision: u,
                    instancing: !0 === x.isInstancedMesh,
                    instancingColor: !0 === x.isInstancedMesh && null !== x.instanceColor,
                    supportsVertexTextures: d,
                    outputEncoding: null !== S ? m(S.texture) : e.outputEncoding,
                    map: !!r.map,
                    mapEncoding: m(r.map),
                    matcap: !!r.matcap,
                    matcapEncoding: m(r.matcap),
                    envMap: !!y,
                    envMapMode: y && y.mapping,
                    envMapEncoding: m(y),
                    envMapCubeUV: !!y && (306 === y.mapping || 307 === y.mapping),
                    lightMap: !!r.lightMap,
                    lightMapEncoding: m(r.lightMap),
                    aoMap: !!r.aoMap,
                    emissiveMap: !!r.emissiveMap,
                    emissiveMapEncoding: m(r.emissiveMap),
                    bumpMap: !!r.bumpMap,
                    normalMap: !!r.normalMap,
                    objectSpaceNormalMap: 1 === r.normalMapType,
                    tangentSpaceNormalMap: 0 === r.normalMapType,
                    clearcoatMap: !!r.clearcoatMap,
                    clearcoatRoughnessMap: !!r.clearcoatRoughnessMap,
                    clearcoatNormalMap: !!r.clearcoatNormalMap,
                    displacementMap: !!r.displacementMap,
                    roughnessMap: !!r.roughnessMap,
                    metalnessMap: !!r.metalnessMap,
                    specularMap: !!r.specularMap,
                    alphaMap: !!r.alphaMap,
                    gradientMap: !!r.gradientMap,
                    sheen: !!r.sheen,
                    transmissionMap: !!r.transmissionMap,
                    combine: r.combine,
                    vertexTangents: r.normalMap && r.vertexTangents,
                    vertexColors: r.vertexColors,
                    vertexUvs: !!(
                        r.map ||
                        r.bumpMap ||
                        r.normalMap ||
                        r.specularMap ||
                        r.alphaMap ||
                        r.emissiveMap ||
                        r.roughnessMap ||
                        r.metalnessMap ||
                        r.clearcoatMap ||
                        r.clearcoatRoughnessMap ||
                        r.clearcoatNormalMap ||
                        r.displacementMap ||
                        r.transmissionMap
                    ),
                    uvsVertexOnly: !(r.map || r.bumpMap || r.normalMap || r.specularMap || r.alphaMap || r.emissiveMap || r.roughnessMap || r.metalnessMap || r.clearcoatNormalMap || r.transmissionMap || !r.displacementMap),
                    fog: !!v,
                    useFog: r.fog,
                    fogExp2: v && v.isFogExp2,
                    flatShading: r.flatShading,
                    sizeAttenuation: r.sizeAttenuation,
                    logarithmicDepthBuffer: l,
                    skinning: r.skinning && b > 0,
                    maxBones: b,
                    useVertexTexture: c,
                    morphTargets: r.morphTargets,
                    morphNormals: r.morphNormals,
                    maxMorphTargets: e.maxMorphTargets,
                    maxMorphNormals: e.maxMorphNormals,
                    numDirLights: o.directional.length,
                    numPointLights: o.point.length,
                    numSpotLights: o.spot.length,
                    numRectAreaLights: o.rectArea.length,
                    numHemiLights: o.hemi.length,
                    numDirLightShadows: o.directionalShadowMap.length,
                    numPointLightShadows: o.pointShadowMap.length,
                    numSpotLightShadows: o.spotShadowMap.length,
                    numClippingPlanes: a.numPlanes,
                    numClipIntersection: a.numIntersection,
                    dithering: r.dithering,
                    shadowMapEnabled: e.shadowMap.enabled && p.length > 0,
                    shadowMapType: e.shadowMap.type,
                    toneMapping: r.toneMapped ? e.toneMapping : 0,
                    physicallyCorrectLights: e.physicallyCorrectLights,
                    premultipliedAlpha: r.premultipliedAlpha,
                    alphaTest: r.alphaTest,
                    doubleSided: 2 === r.side,
                    flipSided: 1 === r.side,
                    depthPacking: void 0 !== r.depthPacking && r.depthPacking,
                    index0AttributeName: r.index0AttributeName,
                    extensionDerivatives: r.extensions && r.extensions.derivatives,
                    extensionFragDepth: r.extensions && r.extensions.fragDepth,
                    extensionDrawBuffers: r.extensions && r.extensions.drawBuffers,
                    extensionShaderTextureLOD: r.extensions && r.extensions.shaderTextureLOD,
                    rendererExtensionFragDepth: s || n.has("EXT_frag_depth"),
                    rendererExtensionDrawBuffers: s || n.has("WEBGL_draw_buffers"),
                    rendererExtensionShaderTextureLod: s || n.has("EXT_shader_texture_lod"),
                    customProgramCacheKey: r.customProgramCacheKey(),
                };
            },
            getProgramCacheKey: function (t) {
                const n = [];
                if ((t.shaderID ? n.push(t.shaderID) : (n.push(t.fragmentShader), n.push(t.vertexShader)), void 0 !== t.defines)) for (const e in t.defines) n.push(e), n.push(t.defines[e]);
                if (!1 === t.isRawShaderMaterial) {
                    for (let e = 0; e < p.length; e++) n.push(t[p[e]]);
                    n.push(e.outputEncoding), n.push(e.gammaFactor);
                }
                return n.push(t.customProgramCacheKey), n.join();
            },
            getUniforms: function (e) {
                const t = f[e.type];
                let n;
                if (t) {
                    const e = Mn[t];
                    n = rn.clone(e.uniforms);
                } else n = e.uniforms;
                return n;
            },
            acquireProgram: function (t, n) {
                let i;
                for (let e = 0, t = o.length; e < t; e++) {
                    const t = o[e];
                    if (t.cacheKey === n) {
                        (i = t), ++i.usedTimes;
                        break;
                    }
                }
                return void 0 === i && ((i = new Ki(e, n, t, r)), o.push(i)), i;
            },
            releaseProgram: function (e) {
                if (0 == --e.usedTimes) {
                    const t = o.indexOf(e);
                    (o[t] = o[o.length - 1]), o.pop(), e.destroy();
                }
            },
            programs: o,
        };
    }
    function er() {
        let e = new WeakMap();
        return {
            get: function (t) {
                let n = e.get(t);
                return void 0 === n && ((n = {}), e.set(t, n)), n;
            },
            remove: function (t) {
                e.delete(t);
            },
            update: function (t, n, i) {
                e.get(t)[n] = i;
            },
            dispose: function () {
                e = new WeakMap();
            },
        };
    }
    function tr(e, t) {
        return e.groupOrder !== t.groupOrder
            ? e.groupOrder - t.groupOrder
            : e.renderOrder !== t.renderOrder
            ? e.renderOrder - t.renderOrder
            : e.program !== t.program
            ? e.program.id - t.program.id
            : e.material.id !== t.material.id
            ? e.material.id - t.material.id
            : e.z !== t.z
            ? e.z - t.z
            : e.id - t.id;
    }
    function nr(e, t) {
        return e.groupOrder !== t.groupOrder ? e.groupOrder - t.groupOrder : e.renderOrder !== t.renderOrder ? e.renderOrder - t.renderOrder : e.z !== t.z ? t.z - e.z : e.id - t.id;
    }
    function ir(e) {
        const t = [];
        let n = 0;
        const i = [],
            r = [],
            a = { id: -1 };
        function o(i, r, o, s, l, c) {
            let h = t[n];
            const d = e.get(o);
            return (
                void 0 === h
                    ? ((h = { id: i.id, object: i, geometry: r, material: o, program: d.program || a, groupOrder: s, renderOrder: i.renderOrder, z: l, group: c }), (t[n] = h))
                    : ((h.id = i.id), (h.object = i), (h.geometry = r), (h.material = o), (h.program = d.program || a), (h.groupOrder = s), (h.renderOrder = i.renderOrder), (h.z = l), (h.group = c)),
                n++,
                h
            );
        }
        return {
            opaque: i,
            transparent: r,
            init: function () {
                (n = 0), (i.length = 0), (r.length = 0);
            },
            push: function (e, t, n, a, s, l) {
                const c = o(e, t, n, a, s, l);
                (!0 === n.transparent ? r : i).push(c);
            },
            unshift: function (e, t, n, a, s, l) {
                const c = o(e, t, n, a, s, l);
                (!0 === n.transparent ? r : i).unshift(c);
            },
            finish: function () {
                for (let e = n, i = t.length; e < i; e++) {
                    const n = t[e];
                    if (null === n.id) break;
                    (n.id = null), (n.object = null), (n.geometry = null), (n.material = null), (n.program = null), (n.group = null);
                }
            },
            sort: function (e, t) {
                i.length > 1 && i.sort(e || tr), r.length > 1 && r.sort(t || nr);
            },
        };
    }
    function rr(e) {
        let t = new WeakMap();
        return {
            get: function (n, i) {
                const r = t.get(n);
                let a;
                return void 0 === r ? ((a = new ir(e)), t.set(n, new WeakMap()), t.get(n).set(i, a)) : ((a = r.get(i)), void 0 === a && ((a = new ir(e)), r.set(i, a))), a;
            },
            dispose: function () {
                t = new WeakMap();
            },
        };
    }
    function ar() {
        const e = {};
        return {
            get: function (t) {
                if (void 0 !== e[t.id]) return e[t.id];
                let n;
                switch (t.type) {
                    case "DirectionalLight":
                        n = { direction: new H(), color: new st() };
                        break;
                    case "SpotLight":
                        n = { position: new H(), direction: new H(), color: new st(), distance: 0, coneCos: 0, penumbraCos: 0, decay: 0 };
                        break;
                    case "PointLight":
                        n = { position: new H(), color: new st(), distance: 0, decay: 0 };
                        break;
                    case "HemisphereLight":
                        n = { direction: new H(), skyColor: new st(), groundColor: new st() };
                        break;
                    case "RectAreaLight":
                        n = { color: new st(), position: new H(), halfWidth: new H(), halfHeight: new H() };
                }
                return (e[t.id] = n), n;
            },
        };
    }
    let or = 0;
    function sr(e, t) {
        return (t.castShadow ? 1 : 0) - (e.castShadow ? 1 : 0);
    }
    function lr(e, t) {
        const n = new ar(),
            i = (function () {
                const e = {};
                return {
                    get: function (t) {
                        if (void 0 !== e[t.id]) return e[t.id];
                        let n;
                        switch (t.type) {
                            case "DirectionalLight":
                            case "SpotLight":
                                n = { shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new C() };
                                break;
                            case "PointLight":
                                n = { shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new C(), shadowCameraNear: 1, shadowCameraFar: 1e3 };
                        }
                        return (e[t.id] = n), n;
                    },
                };
            })(),
            r = {
                version: 0,
                hash: { directionalLength: -1, pointLength: -1, spotLength: -1, rectAreaLength: -1, hemiLength: -1, numDirectionalShadows: -1, numPointShadows: -1, numSpotShadows: -1 },
                ambient: [0, 0, 0],
                probe: [],
                directional: [],
                directionalShadow: [],
                directionalShadowMap: [],
                directionalShadowMatrix: [],
                spot: [],
                spotShadow: [],
                spotShadowMap: [],
                spotShadowMatrix: [],
                rectArea: [],
                rectAreaLTC1: null,
                rectAreaLTC2: null,
                point: [],
                pointShadow: [],
                pointShadowMap: [],
                pointShadowMatrix: [],
                hemi: [],
            };
        for (let e = 0; e < 9; e++) r.probe.push(new H());
        const a = new H(),
            o = new pe(),
            s = new pe();
        return {
            setup: function (l, c, h) {
                let d = 0,
                    u = 0,
                    f = 0;
                for (let e = 0; e < 9; e++) r.probe[e].set(0, 0, 0);
                let p = 0,
                    m = 0,
                    g = 0,
                    x = 0,
                    v = 0,
                    _ = 0,
                    y = 0,
                    M = 0;
                const b = h.matrixWorldInverse;
                l.sort(sr);
                for (let e = 0, t = l.length; e < t; e++) {
                    const t = l[e],
                        c = t.color,
                        h = t.intensity,
                        w = t.distance,
                        A = t.shadow && t.shadow.map ? t.shadow.map.texture : null;
                    if (t.isAmbientLight) (d += c.r * h), (u += c.g * h), (f += c.b * h);
                    else if (t.isLightProbe) for (let e = 0; e < 9; e++) r.probe[e].addScaledVector(t.sh.coefficients[e], h);
                    else if (t.isDirectionalLight) {
                        const e = n.get(t);
                        if (
                            (e.color.copy(t.color).multiplyScalar(t.intensity),
                            e.direction.setFromMatrixPosition(t.matrixWorld),
                            a.setFromMatrixPosition(t.target.matrixWorld),
                            e.direction.sub(a),
                            e.direction.transformDirection(b),
                            t.castShadow)
                        ) {
                            const e = t.shadow,
                                n = i.get(t);
                            (n.shadowBias = e.bias),
                                (n.shadowNormalBias = e.normalBias),
                                (n.shadowRadius = e.radius),
                                (n.shadowMapSize = e.mapSize),
                                (r.directionalShadow[p] = n),
                                (r.directionalShadowMap[p] = A),
                                (r.directionalShadowMatrix[p] = t.shadow.matrix),
                                _++;
                        }
                        (r.directional[p] = e), p++;
                    } else if (t.isSpotLight) {
                        const e = n.get(t);
                        if (
                            (e.position.setFromMatrixPosition(t.matrixWorld),
                            e.position.applyMatrix4(b),
                            e.color.copy(c).multiplyScalar(h),
                            (e.distance = w),
                            e.direction.setFromMatrixPosition(t.matrixWorld),
                            a.setFromMatrixPosition(t.target.matrixWorld),
                            e.direction.sub(a),
                            e.direction.transformDirection(b),
                            (e.coneCos = Math.cos(t.angle)),
                            (e.penumbraCos = Math.cos(t.angle * (1 - t.penumbra))),
                            (e.decay = t.decay),
                            t.castShadow)
                        ) {
                            const e = t.shadow,
                                n = i.get(t);
                            (n.shadowBias = e.bias),
                                (n.shadowNormalBias = e.normalBias),
                                (n.shadowRadius = e.radius),
                                (n.shadowMapSize = e.mapSize),
                                (r.spotShadow[g] = n),
                                (r.spotShadowMap[g] = A),
                                (r.spotShadowMatrix[g] = t.shadow.matrix),
                                M++;
                        }
                        (r.spot[g] = e), g++;
                    } else if (t.isRectAreaLight) {
                        const e = n.get(t);
                        e.color.copy(c).multiplyScalar(h),
                            e.position.setFromMatrixPosition(t.matrixWorld),
                            e.position.applyMatrix4(b),
                            s.identity(),
                            o.copy(t.matrixWorld),
                            o.premultiply(b),
                            s.extractRotation(o),
                            e.halfWidth.set(0.5 * t.width, 0, 0),
                            e.halfHeight.set(0, 0.5 * t.height, 0),
                            e.halfWidth.applyMatrix4(s),
                            e.halfHeight.applyMatrix4(s),
                            (r.rectArea[x] = e),
                            x++;
                    } else if (t.isPointLight) {
                        const e = n.get(t);
                        if ((e.position.setFromMatrixPosition(t.matrixWorld), e.position.applyMatrix4(b), e.color.copy(t.color).multiplyScalar(t.intensity), (e.distance = t.distance), (e.decay = t.decay), t.castShadow)) {
                            const e = t.shadow,
                                n = i.get(t);
                            (n.shadowBias = e.bias),
                                (n.shadowNormalBias = e.normalBias),
                                (n.shadowRadius = e.radius),
                                (n.shadowMapSize = e.mapSize),
                                (n.shadowCameraNear = e.camera.near),
                                (n.shadowCameraFar = e.camera.far),
                                (r.pointShadow[m] = n),
                                (r.pointShadowMap[m] = A),
                                (r.pointShadowMatrix[m] = t.shadow.matrix),
                                y++;
                        }
                        (r.point[m] = e), m++;
                    } else if (t.isHemisphereLight) {
                        const e = n.get(t);
                        e.direction.setFromMatrixPosition(t.matrixWorld),
                            e.direction.transformDirection(b),
                            e.direction.normalize(),
                            e.skyColor.copy(t.color).multiplyScalar(h),
                            e.groundColor.copy(t.groundColor).multiplyScalar(h),
                            (r.hemi[v] = e),
                            v++;
                    }
                }
                x > 0 &&
                    (t.isWebGL2 || !0 === e.has("OES_texture_float_linear")
                        ? ((r.rectAreaLTC1 = yn.LTC_FLOAT_1), (r.rectAreaLTC2 = yn.LTC_FLOAT_2))
                        : !0 === e.has("OES_texture_half_float_linear")
                        ? ((r.rectAreaLTC1 = yn.LTC_HALF_1), (r.rectAreaLTC2 = yn.LTC_HALF_2))
                        : console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),
                    (r.ambient[0] = d),
                    (r.ambient[1] = u),
                    (r.ambient[2] = f);
                const w = r.hash;
                (w.directionalLength === p && w.pointLength === m && w.spotLength === g && w.rectAreaLength === x && w.hemiLength === v && w.numDirectionalShadows === _ && w.numPointShadows === y && w.numSpotShadows === M) ||
                    ((r.directional.length = p),
                    (r.spot.length = g),
                    (r.rectArea.length = x),
                    (r.point.length = m),
                    (r.hemi.length = v),
                    (r.directionalShadow.length = _),
                    (r.directionalShadowMap.length = _),
                    (r.pointShadow.length = y),
                    (r.pointShadowMap.length = y),
                    (r.spotShadow.length = M),
                    (r.spotShadowMap.length = M),
                    (r.directionalShadowMatrix.length = _),
                    (r.pointShadowMatrix.length = y),
                    (r.spotShadowMatrix.length = M),
                    (w.directionalLength = p),
                    (w.pointLength = m),
                    (w.spotLength = g),
                    (w.rectAreaLength = x),
                    (w.hemiLength = v),
                    (w.numDirectionalShadows = _),
                    (w.numPointShadows = y),
                    (w.numSpotShadows = M),
                    (r.version = or++));
            },
            state: r,
        };
    }
    function cr(e, t) {
        const n = new lr(e, t),
            i = [],
            r = [];
        return {
            init: function () {
                (i.length = 0), (r.length = 0);
            },
            state: { lightsArray: i, shadowsArray: r, lights: n },
            setupLights: function (e) {
                n.setup(i, r, e);
            },
            pushLight: function (e) {
                i.push(e);
            },
            pushShadow: function (e) {
                r.push(e);
            },
        };
    }
    function hr(e, t) {
        let n = new WeakMap();
        return {
            get: function (i, r) {
                let a;
                return !1 === n.has(i) ? ((a = new cr(e, t)), n.set(i, new WeakMap()), n.get(i).set(r, a)) : !1 === n.get(i).has(r) ? ((a = new cr(e, t)), n.get(i).set(r, a)) : (a = n.get(i).get(r)), a;
            },
            dispose: function () {
                n = new WeakMap();
            },
        };
    }
    function dr(e) {
        ht.call(this),
            (this.type = "MeshDepthMaterial"),
            (this.depthPacking = 3200),
            (this.skinning = !1),
            (this.morphTargets = !1),
            (this.map = null),
            (this.alphaMap = null),
            (this.displacementMap = null),
            (this.displacementScale = 1),
            (this.displacementBias = 0),
            (this.wireframe = !1),
            (this.wireframeLinewidth = 1),
            (this.fog = !1),
            this.setValues(e);
    }
    function ur(e) {
        ht.call(this),
            (this.type = "MeshDistanceMaterial"),
            (this.referencePosition = new H()),
            (this.nearDistance = 1),
            (this.farDistance = 1e3),
            (this.skinning = !1),
            (this.morphTargets = !1),
            (this.map = null),
            (this.alphaMap = null),
            (this.displacementMap = null),
            (this.displacementScale = 1),
            (this.displacementBias = 0),
            (this.fog = !1),
            this.setValues(e);
    }
    (dr.prototype = Object.create(ht.prototype)),
        (dr.prototype.constructor = dr),
        (dr.prototype.isMeshDepthMaterial = !0),
        (dr.prototype.copy = function (e) {
            return (
                ht.prototype.copy.call(this, e),
                (this.depthPacking = e.depthPacking),
                (this.skinning = e.skinning),
                (this.morphTargets = e.morphTargets),
                (this.map = e.map),
                (this.alphaMap = e.alphaMap),
                (this.displacementMap = e.displacementMap),
                (this.displacementScale = e.displacementScale),
                (this.displacementBias = e.displacementBias),
                (this.wireframe = e.wireframe),
                (this.wireframeLinewidth = e.wireframeLinewidth),
                this
            );
        }),
        (ur.prototype = Object.create(ht.prototype)),
        (ur.prototype.constructor = ur),
        (ur.prototype.isMeshDistanceMaterial = !0),
        (ur.prototype.copy = function (e) {
            return (
                ht.prototype.copy.call(this, e),
                this.referencePosition.copy(e.referencePosition),
                (this.nearDistance = e.nearDistance),
                (this.farDistance = e.farDistance),
                (this.skinning = e.skinning),
                (this.morphTargets = e.morphTargets),
                (this.map = e.map),
                (this.alphaMap = e.alphaMap),
                (this.displacementMap = e.displacementMap),
                (this.displacementScale = e.displacementScale),
                (this.displacementBias = e.displacementBias),
                this
            );
        });
    function fr(e, t, n) {
        let i = new mn();
        const r = new C(),
            a = new C(),
            o = new z(),
            s = [],
            l = [],
            c = {},
            h = { 0: 1, 1: 0, 2: 2 },
            d = new an({
                defines: { SAMPLE_RATE: 2 / 8, HALF_SAMPLE_RATE: 1 / 8 },
                uniforms: { shadow_pass: { value: null }, resolution: { value: new C() }, radius: { value: 4 } },
                vertexShader: "void main(){gl_Position=vec4(position,1.0);}",
                fragmentShader:
                    "uniform sampler2D shadow_pass;uniform vec2 resolution;uniform float radius;\n#include <packing>\nvoid main(){float mean=0.0;float squared_mean=0.0;float depth=unpackRGBAToDepth(texture2D(shadow_pass,(gl_FragCoord.xy)/resolution));for(float i=-1.0;i<1.0;i+=SAMPLE_RATE){\n#ifdef HORIZONAL_PASS\nvec2 distribution=unpackRGBATo2Half(texture2D(shadow_pass,(gl_FragCoord.xy+vec2(i,0.0)*radius)/resolution));mean+=distribution.x;squared_mean+=distribution.y*distribution.y+distribution.x*distribution.x;\n#else\nfloat depth=unpackRGBAToDepth(texture2D(shadow_pass,(gl_FragCoord.xy+vec2(0.0,i)*radius)/resolution));mean+=depth;squared_mean+=depth*depth;\n#endif\n}mean=mean*HALF_SAMPLE_RATE;squared_mean=squared_mean*HALF_SAMPLE_RATE;float std_dev=sqrt(squared_mean-mean*mean);gl_FragColor=pack2HalfToRGBA(vec2(mean,std_dev));}",
            }),
            p = d.clone();
        p.defines.HORIZONAL_PASS = 1;
        const m = new It();
        m.setAttribute("position", new pt(new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]), 3));
        const g = new Jt(m, d),
            x = this;
        function v(n, i) {
            const r = t.update(g);
            (d.uniforms.shadow_pass.value = n.map.texture),
                (d.uniforms.resolution.value = n.mapSize),
                (d.uniforms.radius.value = n.radius),
                e.setRenderTarget(n.mapPass),
                e.clear(),
                e.renderBufferDirect(i, null, r, d, g, null),
                (p.uniforms.shadow_pass.value = n.mapPass.texture),
                (p.uniforms.resolution.value = n.mapSize),
                (p.uniforms.radius.value = n.radius),
                e.setRenderTarget(n.map),
                e.clear(),
                e.renderBufferDirect(i, null, r, p, g, null);
        }
        function _(e, t, n) {
            const i = (e << 0) | (t << 1) | (n << 2);
            let r = s[i];
            return void 0 === r && ((r = new dr({ depthPacking: 3201, morphTargets: e, skinning: t })), (s[i] = r)), r;
        }
        function y(e, t, n) {
            const i = (e << 0) | (t << 1) | (n << 2);
            let r = l[i];
            return void 0 === r && ((r = new ur({ morphTargets: e, skinning: t })), (l[i] = r)), r;
        }
        function M(t, n, i, r, a, o, s) {
            let l = null,
                d = _,
                u = t.customDepthMaterial;
            if ((!0 === r.isPointLight && ((d = y), (u = t.customDistanceMaterial)), void 0 === u)) {
                let e = !1;
                !0 === i.morphTargets && (e = n.morphAttributes && n.morphAttributes.position && n.morphAttributes.position.length > 0);
                let r = !1;
                !0 === t.isSkinnedMesh && (!0 === i.skinning ? (r = !0) : console.warn("THREE.WebGLShadowMap: THREE.SkinnedMesh with material.skinning set to false:", t));
                l = d(e, r, !0 === t.isInstancedMesh);
            } else l = u;
            if (e.localClippingEnabled && !0 === i.clipShadows && 0 !== i.clippingPlanes.length) {
                const e = l.uuid,
                    t = i.uuid;
                let n = c[e];
                void 0 === n && ((n = {}), (c[e] = n));
                let r = n[t];
                void 0 === r && ((r = l.clone()), (n[t] = r)), (l = r);
            }
            return (
                (l.visible = i.visible),
                (l.wireframe = i.wireframe),
                (l.side = 3 === s ? (null !== i.shadowSide ? i.shadowSide : i.side) : null !== i.shadowSide ? i.shadowSide : h[i.side]),
                (l.clipShadows = i.clipShadows),
                (l.clippingPlanes = i.clippingPlanes),
                (l.clipIntersection = i.clipIntersection),
                (l.wireframeLinewidth = i.wireframeLinewidth),
                (l.linewidth = i.linewidth),
                !0 === r.isPointLight && !0 === l.isMeshDistanceMaterial && (l.referencePosition.setFromMatrixPosition(r.matrixWorld), (l.nearDistance = a), (l.farDistance = o)),
                l
            );
        }
        function w(n, r, a, o, s) {
            if (!1 === n.visible) return;
            if (n.layers.test(r.layers) && (n.isMesh || n.isLine || n.isPoints) && (n.castShadow || (n.receiveShadow && 3 === s)) && (!n.frustumCulled || i.intersectsObject(n))) {
                n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse, n.matrixWorld);
                const i = t.update(n),
                    r = n.material;
                if (Array.isArray(r)) {
                    const t = i.groups;
                    for (let l = 0, c = t.length; l < c; l++) {
                        const c = t[l],
                            h = r[c.materialIndex];
                        if (h && h.visible) {
                            const t = M(n, i, h, o, a.near, a.far, s);
                            e.renderBufferDirect(a, null, i, t, n, c);
                        }
                    }
                } else if (r.visible) {
                    const t = M(n, i, r, o, a.near, a.far, s);
                    e.renderBufferDirect(a, null, i, t, n, null);
                }
            }
            const l = n.children;
            for (let e = 0, t = l.length; e < t; e++) w(l[e], r, a, o, s);
        }
        (this.enabled = !1),
            (this.autoUpdate = !0),
            (this.needsUpdate = !1),
            (this.type = 1),
            (this.render = function (t, s, l) {
                if (!1 === x.enabled) return;
                if (!1 === x.autoUpdate && !1 === x.needsUpdate) return;
                if (0 === t.length) return;
                const c = e.getRenderTarget(),
                    h = e.getActiveCubeFace(),
                    d = e.getActiveMipmapLevel(),
                    p = e.state;
                p.setBlending(0), p.buffers.color.setClear(1, 1, 1, 1), p.buffers.depth.setTest(!0), p.setScissorTest(!1);
                for (let c = 0, h = t.length; c < h; c++) {
                    const h = t[c],
                        d = h.shadow;
                    if (void 0 === d) {
                        console.warn("THREE.WebGLShadowMap:", h, "has no shadow.");
                        continue;
                    }
                    if (!1 === d.autoUpdate && !1 === d.needsUpdate) continue;
                    r.copy(d.mapSize);
                    const m = d.getFrameExtents();
                    if (
                        (r.multiply(m),
                        a.copy(d.mapSize),
                        (r.x > n || r.y > n) && (r.x > n && ((a.x = Math.floor(n / m.x)), (r.x = a.x * m.x), (d.mapSize.x = a.x)), r.y > n && ((a.y = Math.floor(n / m.y)), (r.y = a.y * m.y), (d.mapSize.y = a.y))),
                        null === d.map && !d.isPointLightShadow && 3 === this.type)
                    ) {
                        const e = { minFilter: f, magFilter: f, format: b };
                        (d.map = new G(r.x, r.y, e)), (d.map.texture.name = h.name + ".shadowMap"), (d.mapPass = new G(r.x, r.y, e)), d.camera.updateProjectionMatrix();
                    }
                    if (null === d.map) {
                        const e = { minFilter: u, magFilter: u, format: b };
                        (d.map = new G(r.x, r.y, e)), (d.map.texture.name = h.name + ".shadowMap"), d.camera.updateProjectionMatrix();
                    }
                    e.setRenderTarget(d.map), e.clear();
                    const g = d.getViewportCount();
                    for (let e = 0; e < g; e++) {
                        const t = d.getViewport(e);
                        o.set(a.x * t.x, a.y * t.y, a.x * t.z, a.y * t.w), p.viewport(o), d.updateMatrices(h, e), (i = d.getFrustum()), w(s, l, d.camera, h, this.type);
                    }
                    d.isPointLightShadow || 3 !== this.type || v(d, l), (d.needsUpdate = !1);
                }
                (x.needsUpdate = !1), e.setRenderTarget(c, h, d);
            });
    }
    function pr(e, t, n) {
        const i = n.isWebGL2;
        const r = new (function () {
                let t = !1;
                const n = new z();
                let i = null;
                const r = new z(0, 0, 0, 0);
                return {
                    setMask: function (n) {
                        i === n || t || (e.colorMask(n, n, n, n), (i = n));
                    },
                    setLocked: function (e) {
                        t = e;
                    },
                    setClear: function (t, i, a, o, s) {
                        !0 === s && ((t *= o), (i *= o), (a *= o)), n.set(t, i, a, o), !1 === r.equals(n) && (e.clearColor(t, i, a, o), r.copy(n));
                    },
                    reset: function () {
                        (t = !1), (i = null), r.set(-1, 0, 0, 0);
                    },
                };
            })(),
            a = new (function () {
                let t = !1,
                    n = null,
                    i = null,
                    r = null;
                return {
                    setTest: function (e) {
                        e ? R(2929) : D(2929);
                    },
                    setMask: function (i) {
                        n === i || t || (e.depthMask(i), (n = i));
                    },
                    setFunc: function (t) {
                        if (i !== t) {
                            if (t)
                                switch (t) {
                                    case 0:
                                        e.depthFunc(512);
                                        break;
                                    case 1:
                                        e.depthFunc(519);
                                        break;
                                    case 2:
                                        e.depthFunc(513);
                                        break;
                                    case 3:
                                        e.depthFunc(515);
                                        break;
                                    case 4:
                                        e.depthFunc(514);
                                        break;
                                    case 5:
                                        e.depthFunc(518);
                                        break;
                                    case 6:
                                        e.depthFunc(516);
                                        break;
                                    case 7:
                                        e.depthFunc(517);
                                        break;
                                    default:
                                        e.depthFunc(515);
                                }
                            else e.depthFunc(515);
                            i = t;
                        }
                    },
                    setLocked: function (e) {
                        t = e;
                    },
                    setClear: function (t) {
                        r !== t && (e.clearDepth(t), (r = t));
                    },
                    reset: function () {
                        (t = !1), (n = null), (i = null), (r = null);
                    },
                };
            })(),
            o = new (function () {
                let t = !1,
                    n = null,
                    i = null,
                    r = null,
                    a = null,
                    o = null,
                    s = null,
                    l = null,
                    c = null;
                return {
                    setTest: function (e) {
                        t || (e ? R(2960) : D(2960));
                    },
                    setMask: function (i) {
                        n === i || t || (e.stencilMask(i), (n = i));
                    },
                    setFunc: function (t, n, o) {
                        (i === t && r === n && a === o) || (e.stencilFunc(t, n, o), (i = t), (r = n), (a = o));
                    },
                    setOp: function (t, n, i) {
                        (o === t && s === n && l === i) || (e.stencilOp(t, n, i), (o = t), (s = n), (l = i));
                    },
                    setLocked: function (e) {
                        t = e;
                    },
                    setClear: function (t) {
                        c !== t && (e.clearStencil(t), (c = t));
                    },
                    reset: function () {
                        (t = !1), (n = null), (i = null), (r = null), (a = null), (o = null), (s = null), (l = null), (c = null);
                    },
                };
            })();
        let s = {},
            c = null,
            h = null,
            d = null,
            u = null,
            f = null,
            p = null,
            m = null,
            g = null,
            x = null,
            v = !1,
            _ = null,
            y = null,
            M = null,
            b = null,
            w = null;
        const A = e.getParameter(35661);
        let S = !1,
            T = 0;
        const L = e.getParameter(7938);
        -1 !== L.indexOf("WebGL") ? ((T = parseFloat(/^WebGL\ ([0-9])/.exec(L)[1])), (S = T >= 1)) : -1 !== L.indexOf("OpenGL ES") && ((T = parseFloat(/^OpenGL\ ES\ ([0-9])/.exec(L)[1])), (S = T >= 2));
        let E = null,
            P = {};
        const F = new z(),
            N = new z();
        function C(t, n, i) {
            const r = new Uint8Array(4),
                a = e.createTexture();
            e.bindTexture(t, a), e.texParameteri(t, 10241, 9728), e.texParameteri(t, 10240, 9728);
            for (let t = 0; t < i; t++) e.texImage2D(n + t, 0, 6408, 1, 1, 0, 6408, 5121, r);
            return a;
        }
        const I = {};
        function R(t) {
            !0 !== s[t] && (e.enable(t), (s[t] = !0));
        }
        function D(t) {
            !1 !== s[t] && (e.disable(t), (s[t] = !1));
        }
        (I[3553] = C(3553, 3553, 1)), (I[34067] = C(34067, 34069, 6)), r.setClear(0, 0, 0, 1), a.setClear(1), o.setClear(0), R(2929), a.setFunc(3), B(!1), H(1), R(2884), G(0);
        const U = { [l]: 32774, 101: 32778, 102: 32779 };
        if (i) (U[103] = 32775), (U[104] = 32776);
        else {
            const e = t.get("EXT_blend_minmax");
            null !== e && ((U[103] = e.MIN_EXT), (U[104] = e.MAX_EXT));
        }
        const O = { 200: 0, 201: 1, 202: 768, 204: 770, 210: 776, 208: 774, 206: 772, 203: 769, 205: 771, 209: 775, 207: 773 };
        function G(t, n, i, r, a, o, s, c) {
            if (0 !== t) {
                if ((h || (R(3042), (h = !0)), 5 === t))
                    (a = a || n),
                        (o = o || i),
                        (s = s || r),
                        (n === u && a === m) || (e.blendEquationSeparate(U[n], U[a]), (u = n), (m = a)),
                        (i === f && r === p && o === g && s === x) || (e.blendFuncSeparate(O[i], O[r], O[o], O[s]), (f = i), (p = r), (g = o), (x = s)),
                        (d = t),
                        (v = null);
                else if (t !== d || c !== v) {
                    if (((u === l && m === l) || (e.blendEquation(32774), (u = l), (m = l)), c))
                        switch (t) {
                            case 1:
                                e.blendFuncSeparate(1, 771, 1, 771);
                                break;
                            case 2:
                                e.blendFunc(1, 1);
                                break;
                            case 3:
                                e.blendFuncSeparate(0, 0, 769, 771);
                                break;
                            case 4:
                                e.blendFuncSeparate(0, 768, 0, 770);
                                break;
                            default:
                                console.error("THREE.WebGLState: Invalid blending: ", t);
                        }
                    else
                        switch (t) {
                            case 1:
                                e.blendFuncSeparate(770, 771, 1, 771);
                                break;
                            case 2:
                                e.blendFunc(770, 1);
                                break;
                            case 3:
                                e.blendFunc(0, 769);
                                break;
                            case 4:
                                e.blendFunc(0, 768);
                                break;
                            default:
                                console.error("THREE.WebGLState: Invalid blending: ", t);
                        }
                    (f = null), (p = null), (g = null), (x = null), (d = t), (v = c);
                }
            } else h && (D(3042), (h = !1));
        }
        function B(t) {
            _ !== t && (t ? e.frontFace(2304) : e.frontFace(2305), (_ = t));
        }
        function H(t) {
            0 !== t ? (R(2884), t !== y && (1 === t ? e.cullFace(1029) : 2 === t ? e.cullFace(1028) : e.cullFace(1032))) : D(2884), (y = t);
        }
        function k(t, n, i) {
            t ? (R(32823), (b === n && w === i) || (e.polygonOffset(n, i), (b = n), (w = i))) : D(32823);
        }
        function V(t) {
            void 0 === t && (t = 33984 + A - 1), E !== t && (e.activeTexture(t), (E = t));
        }
        return {
            buffers: { color: r, depth: a, stencil: o },
            enable: R,
            disable: D,
            useProgram: function (t) {
                return c !== t && (e.useProgram(t), (c = t), !0);
            },
            setBlending: G,
            setMaterial: function (e, t) {
                2 === e.side ? D(2884) : R(2884);
                let n = 1 === e.side;
                t && (n = !n),
                    B(n),
                    1 === e.blending && !1 === e.transparent ? G(0) : G(e.blending, e.blendEquation, e.blendSrc, e.blendDst, e.blendEquationAlpha, e.blendSrcAlpha, e.blendDstAlpha, e.premultipliedAlpha),
                    a.setFunc(e.depthFunc),
                    a.setTest(e.depthTest),
                    a.setMask(e.depthWrite),
                    r.setMask(e.colorWrite);
                const i = e.stencilWrite;
                o.setTest(i),
                    i && (o.setMask(e.stencilWriteMask), o.setFunc(e.stencilFunc, e.stencilRef, e.stencilFuncMask), o.setOp(e.stencilFail, e.stencilZFail, e.stencilZPass)),
                    k(e.polygonOffset, e.polygonOffsetFactor, e.polygonOffsetUnits);
            },
            setFlipSided: B,
            setCullFace: H,
            setLineWidth: function (t) {
                t !== M && (S && e.lineWidth(t), (M = t));
            },
            setPolygonOffset: k,
            setScissorTest: function (e) {
                e ? R(3089) : D(3089);
            },
            activeTexture: V,
            bindTexture: function (t, n) {
                null === E && V();
                let i = P[E];
                void 0 === i && ((i = { type: void 0, texture: void 0 }), (P[E] = i)), (i.type === t && i.texture === n) || (e.bindTexture(t, n || I[t]), (i.type = t), (i.texture = n));
            },
            unbindTexture: function () {
                const t = P[E];
                void 0 !== t && void 0 !== t.type && (e.bindTexture(t.type, null), (t.type = void 0), (t.texture = void 0));
            },
            compressedTexImage2D: function () {
                try {
                    e.compressedTexImage2D.apply(e, arguments);
                } catch (e) {
                    console.error("THREE.WebGLState:", e);
                }
            },
            texImage2D: function () {
                try {
                    e.texImage2D.apply(e, arguments);
                } catch (e) {
                    console.error("THREE.WebGLState:", e);
                }
            },
            texImage3D: function () {
                try {
                    e.texImage3D.apply(e, arguments);
                } catch (e) {
                    console.error("THREE.WebGLState:", e);
                }
            },
            scissor: function (t) {
                !1 === F.equals(t) && (e.scissor(t.x, t.y, t.z, t.w), F.copy(t));
            },
            viewport: function (t) {
                !1 === N.equals(t) && (e.viewport(t.x, t.y, t.z, t.w), N.copy(t));
            },
            reset: function () {
                (s = {}), (E = null), (P = {}), (c = null), (d = null), (_ = null), (y = null), r.reset(), a.reset(), o.reset();
            },
        };
    }
    function mr(e, t, n, i, r, a, o) {
        const s = r.isWebGL2,
            l = r.maxTextures,
            m = r.maxCubemapSize,
            S = r.maxTextureSize,
            T = r.maxSamples,
            L = new WeakMap();
        let E,
            P = !1;
        try {
            P = "undefined" != typeof OffscreenCanvas && null !== new OffscreenCanvas(1, 1).getContext("2d");
        } catch (e) {}
        function F(e, t) {
            return P ? new OffscreenCanvas(e, t) : document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
        }
        function C(e, t, n, i) {
            let r = 1;
            if (((e.width > i || e.height > i) && (r = i / Math.max(e.width, e.height)), r < 1 || !0 === t)) {
                if (
                    ("undefined" != typeof HTMLImageElement && e instanceof HTMLImageElement) ||
                    ("undefined" != typeof HTMLCanvasElement && e instanceof HTMLCanvasElement) ||
                    ("undefined" != typeof ImageBitmap && e instanceof ImageBitmap)
                ) {
                    const i = t ? N.floorPowerOfTwo : Math.floor,
                        a = i(r * e.width),
                        o = i(r * e.height);
                    void 0 === E && (E = F(a, o));
                    const s = n ? F(a, o) : E;
                    (s.width = a), (s.height = o);
                    return s.getContext("2d").drawImage(e, 0, 0, a, o), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + e.width + "x" + e.height + ") to (" + a + "x" + o + ")."), s;
                }
                return "data" in e && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + e.width + "x" + e.height + ")."), e;
            }
            return e;
        }
        function I(e) {
            return N.isPowerOfTwo(e.width) && N.isPowerOfTwo(e.height);
        }
        function R(e, t) {
            return e.generateMipmaps && t && e.minFilter !== u && e.minFilter !== f;
        }
        function D(t, n, r, a) {
            e.generateMipmap(t);
            i.get(n).__maxMipLevel = Math.log(Math.max(r, a)) * Math.LOG2E;
        }
        function U(n, i, r) {
            if (!1 === s) return i;
            if (null !== n) {
                if (void 0 !== e[n]) return e[n];
                console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + n + "'");
            }
            let a = i;
            return (
                6403 === i && (5126 === r && (a = 33326), 5131 === r && (a = 33325), 5121 === r && (a = 33321)),
                6407 === i && (5126 === r && (a = 34837), 5131 === r && (a = 34843), 5121 === r && (a = 32849)),
                6408 === i && (5126 === r && (a = 34836), 5131 === r && (a = 34842), 5121 === r && (a = 32856)),
                (33325 !== a && 33326 !== a && 34842 !== a && 34836 !== a) || t.get("EXT_color_buffer_float"),
                a
            );
        }
        function O(e) {
            return e === u || 1004 === e || 1005 === e ? 9728 : 9729;
        }
        function z(t) {
            const n = t.target;
            n.removeEventListener("dispose", z),
                (function (t) {
                    const n = i.get(t);
                    if (void 0 === n.__webglInit) return;
                    e.deleteTexture(n.__webglTexture), i.remove(t);
                })(n),
                n.isVideoTexture && L.delete(n),
                o.memory.textures--;
        }
        function G(t) {
            const n = t.target;
            n.removeEventListener("dispose", G),
                (function (t) {
                    const n = i.get(t),
                        r = i.get(t.texture);
                    if (!t) return;
                    void 0 !== r.__webglTexture && e.deleteTexture(r.__webglTexture);
                    t.depthTexture && t.depthTexture.dispose();
                    if (t.isWebGLCubeRenderTarget) for (let t = 0; t < 6; t++) e.deleteFramebuffer(n.__webglFramebuffer[t]), n.__webglDepthbuffer && e.deleteRenderbuffer(n.__webglDepthbuffer[t]);
                    else
                        e.deleteFramebuffer(n.__webglFramebuffer),
                            n.__webglDepthbuffer && e.deleteRenderbuffer(n.__webglDepthbuffer),
                            n.__webglMultisampledFramebuffer && e.deleteFramebuffer(n.__webglMultisampledFramebuffer),
                            n.__webglColorRenderbuffer && e.deleteRenderbuffer(n.__webglColorRenderbuffer),
                            n.__webglDepthRenderbuffer && e.deleteRenderbuffer(n.__webglDepthRenderbuffer);
                    i.remove(t.texture), i.remove(t);
                })(n),
                o.memory.textures--;
        }
        let B = 0;
        function H(e, t) {
            const r = i.get(e);
            if (
                (e.isVideoTexture &&
                    (function (e) {
                        const t = o.render.frame;
                        L.get(e) !== t && (L.set(e, t), e.update());
                    })(e),
                e.version > 0 && r.__version !== e.version)
            ) {
                const n = e.image;
                if (void 0 === n) console.warn("THREE.WebGLRenderer: Texture marked for update but image is undefined");
                else {
                    if (!1 !== n.complete) return void j(r, e, t);
                    console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
                }
            }
            n.activeTexture(33984 + t), n.bindTexture(3553, r.__webglTexture);
        }
        function k(t, r) {
            const o = i.get(t);
            t.version > 0 && o.__version !== t.version
                ? (function (t, i, r) {
                      if (6 !== i.image.length) return;
                      Y(t, i), n.activeTexture(33984 + r), n.bindTexture(34067, t.__webglTexture), e.pixelStorei(37440, i.flipY);
                      const o = i && (i.isCompressedTexture || i.image[0].isCompressedTexture),
                          l = i.image[0] && i.image[0].isDataTexture,
                          c = [];
                      for (let e = 0; e < 6; e++) c[e] = o || l ? (l ? i.image[e].image : i.image[e]) : C(i.image[e], !1, !0, m);
                      const h = c[0],
                          d = I(h) || s,
                          u = a.convert(i.format),
                          f = a.convert(i.type),
                          p = U(i.internalFormat, u, f);
                      let g;
                      if ((X(34067, i, d), o)) {
                          for (let e = 0; e < 6; e++) {
                              g = c[e].mipmaps;
                              for (let t = 0; t < g.length; t++) {
                                  const r = g[t];
                                  i.format !== b && i.format !== M
                                      ? null !== u
                                          ? n.compressedTexImage2D(34069 + e, t, p, r.width, r.height, 0, r.data)
                                          : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()")
                                      : n.texImage2D(34069 + e, t, p, r.width, r.height, 0, u, f, r.data);
                              }
                          }
                          t.__maxMipLevel = g.length - 1;
                      } else {
                          g = i.mipmaps;
                          for (let e = 0; e < 6; e++)
                              if (l) {
                                  n.texImage2D(34069 + e, 0, p, c[e].width, c[e].height, 0, u, f, c[e].data);
                                  for (let t = 0; t < g.length; t++) {
                                      const i = g[t].image[e].image;
                                      n.texImage2D(34069 + e, t + 1, p, i.width, i.height, 0, u, f, i.data);
                                  }
                              } else {
                                  n.texImage2D(34069 + e, 0, p, u, f, c[e]);
                                  for (let t = 0; t < g.length; t++) {
                                      const i = g[t];
                                      n.texImage2D(34069 + e, t + 1, p, u, f, i.image[e]);
                                  }
                              }
                          t.__maxMipLevel = g.length;
                      }
                      R(i, d) && D(34067, i, h.width, h.height);
                      (t.__version = i.version), i.onUpdate && i.onUpdate(i);
                  })(o, t, r)
                : (n.activeTexture(33984 + r), n.bindTexture(34067, o.__webglTexture));
        }
        const V = { [c]: 10497, [h]: 33071, [d]: 33648 },
            W = { [u]: 9728, 1004: 9984, 1005: 9986, [f]: 9729, 1007: 9985, [p]: 9987 };
        function X(n, a, o) {
            o
                ? (e.texParameteri(n, 10242, V[a.wrapS]),
                  e.texParameteri(n, 10243, V[a.wrapT]),
                  (32879 !== n && 35866 !== n) || e.texParameteri(n, 32882, V[a.wrapR]),
                  e.texParameteri(n, 10240, W[a.magFilter]),
                  e.texParameteri(n, 10241, W[a.minFilter]))
                : (e.texParameteri(n, 10242, 33071),
                  e.texParameteri(n, 10243, 33071),
                  (32879 !== n && 35866 !== n) || e.texParameteri(n, 32882, 33071),
                  (a.wrapS === h && a.wrapT === h) || console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),
                  e.texParameteri(n, 10240, O(a.magFilter)),
                  e.texParameteri(n, 10241, O(a.minFilter)),
                  a.minFilter !== u && a.minFilter !== f && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter."));
            const l = t.get("EXT_texture_filter_anisotropic");
            if (l) {
                if (a.type === v && null === t.get("OES_texture_float_linear")) return;
                if (a.type === _ && null === (s || t.get("OES_texture_half_float_linear"))) return;
                (a.anisotropy > 1 || i.get(a).__currentAnisotropy) && (e.texParameterf(n, l.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(a.anisotropy, r.getMaxAnisotropy())), (i.get(a).__currentAnisotropy = a.anisotropy));
            }
        }
        function Y(t, n) {
            void 0 === t.__webglInit && ((t.__webglInit = !0), n.addEventListener("dispose", z), (t.__webglTexture = e.createTexture()), o.memory.textures++);
        }
        function j(t, i, r) {
            let o = 3553;
            i.isDataTexture2DArray && (o = 35866),
                i.isDataTexture3D && (o = 32879),
                Y(t, i),
                n.activeTexture(33984 + r),
                n.bindTexture(o, t.__webglTexture),
                e.pixelStorei(37440, i.flipY),
                e.pixelStorei(37441, i.premultiplyAlpha),
                e.pixelStorei(3317, i.unpackAlignment);
            const l =
                    (function (e) {
                        return !s && (e.wrapS !== h || e.wrapT !== h || (e.minFilter !== u && e.minFilter !== f));
                    })(i) && !1 === I(i.image),
                c = C(i.image, l, !1, S),
                d = I(c) || s,
                p = a.convert(i.format);
            let m,
                _ = a.convert(i.type),
                T = U(i.internalFormat, p, _);
            X(o, i, d);
            const L = i.mipmaps;
            if (i.isDepthTexture)
                (T = 6402),
                    s ? (T = i.type === v ? 36012 : i.type === x ? 33190 : i.type === y ? 35056 : 33189) : i.type === v && console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),
                    i.format === w && 6402 === T && i.type !== g && i.type !== x && (console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."), (i.type = g), (_ = a.convert(i.type))),
                    i.format === A && 6402 === T && ((T = 34041), i.type !== y && (console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."), (i.type = y), (_ = a.convert(i.type)))),
                    n.texImage2D(3553, 0, T, c.width, c.height, 0, p, _, null);
            else if (i.isDataTexture)
                if (L.length > 0 && d) {
                    for (let e = 0, t = L.length; e < t; e++) (m = L[e]), n.texImage2D(3553, e, T, m.width, m.height, 0, p, _, m.data);
                    (i.generateMipmaps = !1), (t.__maxMipLevel = L.length - 1);
                } else n.texImage2D(3553, 0, T, c.width, c.height, 0, p, _, c.data), (t.__maxMipLevel = 0);
            else if (i.isCompressedTexture) {
                for (let e = 0, t = L.length; e < t; e++)
                    (m = L[e]),
                        i.format !== b && i.format !== M
                            ? null !== p
                                ? n.compressedTexImage2D(3553, e, T, m.width, m.height, 0, m.data)
                                : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()")
                            : n.texImage2D(3553, e, T, m.width, m.height, 0, p, _, m.data);
                t.__maxMipLevel = L.length - 1;
            } else if (i.isDataTexture2DArray) n.texImage3D(35866, 0, T, c.width, c.height, c.depth, 0, p, _, c.data), (t.__maxMipLevel = 0);
            else if (i.isDataTexture3D) n.texImage3D(32879, 0, T, c.width, c.height, c.depth, 0, p, _, c.data), (t.__maxMipLevel = 0);
            else if (L.length > 0 && d) {
                for (let e = 0, t = L.length; e < t; e++) (m = L[e]), n.texImage2D(3553, e, T, p, _, m);
                (i.generateMipmaps = !1), (t.__maxMipLevel = L.length - 1);
            } else n.texImage2D(3553, 0, T, p, _, c), (t.__maxMipLevel = 0);
            R(i, d) && D(o, i, c.width, c.height), (t.__version = i.version), i.onUpdate && i.onUpdate(i);
        }
        function Q(t, r, o, s) {
            const l = a.convert(r.texture.format),
                c = a.convert(r.texture.type),
                h = U(r.texture.internalFormat, l, c);
            n.texImage2D(s, 0, h, r.width, r.height, 0, l, c, null), e.bindFramebuffer(36160, t), e.framebufferTexture2D(36160, o, s, i.get(r.texture).__webglTexture, 0), e.bindFramebuffer(36160, null);
        }
        function q(t, n, i) {
            if ((e.bindRenderbuffer(36161, t), n.depthBuffer && !n.stencilBuffer)) {
                let r = 33189;
                if (i) {
                    const t = n.depthTexture;
                    t && t.isDepthTexture && (t.type === v ? (r = 36012) : t.type === x && (r = 33190));
                    const i = J(n);
                    e.renderbufferStorageMultisample(36161, i, r, n.width, n.height);
                } else e.renderbufferStorage(36161, r, n.width, n.height);
                e.framebufferRenderbuffer(36160, 36096, 36161, t);
            } else if (n.depthBuffer && n.stencilBuffer) {
                if (i) {
                    const t = J(n);
                    e.renderbufferStorageMultisample(36161, t, 35056, n.width, n.height);
                } else e.renderbufferStorage(36161, 34041, n.width, n.height);
                e.framebufferRenderbuffer(36160, 33306, 36161, t);
            } else {
                const t = a.convert(n.texture.format),
                    r = a.convert(n.texture.type),
                    o = U(n.texture.internalFormat, t, r);
                if (i) {
                    const t = J(n);
                    e.renderbufferStorageMultisample(36161, t, o, n.width, n.height);
                } else e.renderbufferStorage(36161, o, n.width, n.height);
            }
            e.bindRenderbuffer(36161, null);
        }
        function Z(t) {
            const n = i.get(t),
                r = !0 === t.isWebGLCubeRenderTarget;
            if (t.depthTexture) {
                if (r) throw new Error("target.depthTexture not supported in Cube render targets");
                !(function (t, n) {
                    if (n && n.isWebGLCubeRenderTarget) throw new Error("Depth Texture with cube render targets is not supported");
                    if ((e.bindFramebuffer(36160, t), !n.depthTexture || !n.depthTexture.isDepthTexture)) throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
                    (i.get(n.depthTexture).__webglTexture && n.depthTexture.image.width === n.width && n.depthTexture.image.height === n.height) ||
                        ((n.depthTexture.image.width = n.width), (n.depthTexture.image.height = n.height), (n.depthTexture.needsUpdate = !0)),
                        H(n.depthTexture, 0);
                    const r = i.get(n.depthTexture).__webglTexture;
                    if (n.depthTexture.format === w) e.framebufferTexture2D(36160, 36096, 3553, r, 0);
                    else {
                        if (n.depthTexture.format !== A) throw new Error("Unknown depthTexture format");
                        e.framebufferTexture2D(36160, 33306, 3553, r, 0);
                    }
                })(n.__webglFramebuffer, t);
            } else if (r) {
                n.__webglDepthbuffer = [];
                for (let i = 0; i < 6; i++) e.bindFramebuffer(36160, n.__webglFramebuffer[i]), (n.__webglDepthbuffer[i] = e.createRenderbuffer()), q(n.__webglDepthbuffer[i], t, !1);
            } else e.bindFramebuffer(36160, n.__webglFramebuffer), (n.__webglDepthbuffer = e.createRenderbuffer()), q(n.__webglDepthbuffer, t, !1);
            e.bindFramebuffer(36160, null);
        }
        function J(e) {
            return s && e.isWebGLMultisampleRenderTarget ? Math.min(T, e.samples) : 0;
        }
        let K = !1,
            $ = !1;
        (this.allocateTextureUnit = function () {
            const e = B;
            return e >= l && console.warn("THREE.WebGLTextures: Trying to use " + e + " texture units while this GPU supports only " + l), (B += 1), e;
        }),
            (this.resetTextureUnits = function () {
                B = 0;
            }),
            (this.setTexture2D = H),
            (this.setTexture2DArray = function (e, t) {
                const r = i.get(e);
                e.version > 0 && r.__version !== e.version ? j(r, e, t) : (n.activeTexture(33984 + t), n.bindTexture(35866, r.__webglTexture));
            }),
            (this.setTexture3D = function (e, t) {
                const r = i.get(e);
                e.version > 0 && r.__version !== e.version ? j(r, e, t) : (n.activeTexture(33984 + t), n.bindTexture(32879, r.__webglTexture));
            }),
            (this.setTextureCube = k),
            (this.setupRenderTarget = function (t) {
                const r = i.get(t),
                    l = i.get(t.texture);
                t.addEventListener("dispose", G), (l.__webglTexture = e.createTexture()), o.memory.textures++;
                const c = !0 === t.isWebGLCubeRenderTarget,
                    h = !0 === t.isWebGLMultisampleRenderTarget,
                    d = I(t) || s;
                if (
                    (!s ||
                        t.texture.format !== M ||
                        (t.texture.type !== v && t.texture.type !== _) ||
                        ((t.texture.format = b), console.warn("THREE.WebGLRenderer: Rendering to textures with RGB format is not supported. Using RGBA format instead.")),
                    c)
                ) {
                    r.__webglFramebuffer = [];
                    for (let t = 0; t < 6; t++) r.__webglFramebuffer[t] = e.createFramebuffer();
                } else if (((r.__webglFramebuffer = e.createFramebuffer()), h))
                    if (s) {
                        (r.__webglMultisampledFramebuffer = e.createFramebuffer()), (r.__webglColorRenderbuffer = e.createRenderbuffer()), e.bindRenderbuffer(36161, r.__webglColorRenderbuffer);
                        const n = a.convert(t.texture.format),
                            i = a.convert(t.texture.type),
                            o = U(t.texture.internalFormat, n, i),
                            s = J(t);
                        e.renderbufferStorageMultisample(36161, s, o, t.width, t.height),
                            e.bindFramebuffer(36160, r.__webglMultisampledFramebuffer),
                            e.framebufferRenderbuffer(36160, 36064, 36161, r.__webglColorRenderbuffer),
                            e.bindRenderbuffer(36161, null),
                            t.depthBuffer && ((r.__webglDepthRenderbuffer = e.createRenderbuffer()), q(r.__webglDepthRenderbuffer, t, !0)),
                            e.bindFramebuffer(36160, null);
                    } else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.");
                if (c) {
                    n.bindTexture(34067, l.__webglTexture), X(34067, t.texture, d);
                    for (let e = 0; e < 6; e++) Q(r.__webglFramebuffer[e], t, 36064, 34069 + e);
                    R(t.texture, d) && D(34067, t.texture, t.width, t.height), n.bindTexture(34067, null);
                } else n.bindTexture(3553, l.__webglTexture), X(3553, t.texture, d), Q(r.__webglFramebuffer, t, 36064, 3553), R(t.texture, d) && D(3553, t.texture, t.width, t.height), n.bindTexture(3553, null);
                t.depthBuffer && Z(t);
            }),
            (this.updateRenderTargetMipmap = function (e) {
                const t = e.texture;
                if (R(t, I(e) || s)) {
                    const r = e.isWebGLCubeRenderTarget ? 34067 : 3553,
                        a = i.get(t).__webglTexture;
                    n.bindTexture(r, a), D(r, t, e.width, e.height), n.bindTexture(r, null);
                }
            }),
            (this.updateMultisampleRenderTarget = function (t) {
                if (t.isWebGLMultisampleRenderTarget)
                    if (s) {
                        const n = i.get(t);
                        e.bindFramebuffer(36008, n.__webglMultisampledFramebuffer), e.bindFramebuffer(36009, n.__webglFramebuffer);
                        const r = t.width,
                            a = t.height;
                        let o = 16384;
                        t.depthBuffer && (o |= 256), t.stencilBuffer && (o |= 1024), e.blitFramebuffer(0, 0, r, a, 0, 0, r, a, o, 9728), e.bindFramebuffer(36160, n.__webglMultisampledFramebuffer);
                    } else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.");
            }),
            (this.safeSetTexture2D = function (e, t) {
                e && e.isWebGLRenderTarget && (!1 === K && (console.warn("THREE.WebGLTextures.safeSetTexture2D: don't use render targets as textures. Use their .texture property instead."), (K = !0)), (e = e.texture)), H(e, t);
            }),
            (this.safeSetTextureCube = function (e, t) {
                e && e.isWebGLCubeRenderTarget && (!1 === $ && (console.warn("THREE.WebGLTextures.safeSetTextureCube: don't use cube render targets as textures. Use their .texture property instead."), ($ = !0)), (e = e.texture)), k(e, t);
            });
    }
    function gr(e, t, n) {
        const i = n.isWebGL2;
        return {
            convert: function (e) {
                let n;
                if (e === m) return 5121;
                if (1017 === e) return 32819;
                if (1018 === e) return 32820;
                if (1019 === e) return 33635;
                if (1010 === e) return 5120;
                if (1011 === e) return 5122;
                if (e === g) return 5123;
                if (1013 === e) return 5124;
                if (e === x) return 5125;
                if (e === v) return 5126;
                if (e === _) return i ? 5131 : ((n = t.get("OES_texture_half_float")), null !== n ? n.HALF_FLOAT_OES : null);
                if (1021 === e) return 6406;
                if (e === M) return 6407;
                if (e === b) return 6408;
                if (1024 === e) return 6409;
                if (1025 === e) return 6410;
                if (e === w) return 6402;
                if (e === A) return 34041;
                if (1028 === e) return 6403;
                if (1029 === e) return 36244;
                if (1030 === e) return 33319;
                if (1031 === e) return 33320;
                if (1032 === e) return 36248;
                if (1033 === e) return 36249;
                if (33776 === e || 33777 === e || 33778 === e || 33779 === e) {
                    if (((n = t.get("WEBGL_compressed_texture_s3tc")), null === n)) return null;
                    if (33776 === e) return n.COMPRESSED_RGB_S3TC_DXT1_EXT;
                    if (33777 === e) return n.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                    if (33778 === e) return n.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                    if (33779 === e) return n.COMPRESSED_RGBA_S3TC_DXT5_EXT;
                }
                if (35840 === e || 35841 === e || 35842 === e || 35843 === e) {
                    if (((n = t.get("WEBGL_compressed_texture_pvrtc")), null === n)) return null;
                    if (35840 === e) return n.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
                    if (35841 === e) return n.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
                    if (35842 === e) return n.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
                    if (35843 === e) return n.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
                }
                if (36196 === e) return (n = t.get("WEBGL_compressed_texture_etc1")), null !== n ? n.COMPRESSED_RGB_ETC1_WEBGL : null;
                if ((37492 === e || 37496 === e) && ((n = t.get("WEBGL_compressed_texture_etc")), null !== n)) {
                    if (37492 === e) return n.COMPRESSED_RGB8_ETC2;
                    if (37496 === e) return n.COMPRESSED_RGBA8_ETC2_EAC;
                }
                return 37808 === e ||
                    37809 === e ||
                    37810 === e ||
                    37811 === e ||
                    37812 === e ||
                    37813 === e ||
                    37814 === e ||
                    37815 === e ||
                    37816 === e ||
                    37817 === e ||
                    37818 === e ||
                    37819 === e ||
                    37820 === e ||
                    37821 === e ||
                    37840 === e ||
                    37841 === e ||
                    37842 === e ||
                    37843 === e ||
                    37844 === e ||
                    37845 === e ||
                    37846 === e ||
                    37847 === e ||
                    37848 === e ||
                    37849 === e ||
                    37850 === e ||
                    37851 === e ||
                    37852 === e ||
                    37853 === e
                    ? ((n = t.get("WEBGL_compressed_texture_astc")), null !== n ? e : null)
                    : 36492 === e
                    ? ((n = t.get("EXT_texture_compression_bptc")), null !== n ? e : null)
                    : e === y
                    ? i
                        ? 34042
                        : ((n = t.get("WEBGL_depth_texture")), null !== n ? n.UNSIGNED_INT_24_8_WEBGL : null)
                    : void 0;
            },
        };
    }
    function xr(e) {
        sn.call(this), (this.cameras = e || []);
    }
    function vr() {
        Ge.call(this), (this.type = "Group");
    }
    function _r() {
        (this._targetRay = null), (this._grip = null), (this._hand = null);
    }
    function yr(e, t) {
        const n = this;
        let i = null,
            r = 1,
            a = null,
            o = "local-floor",
            s = null;
        const l = [],
            c = new Map(),
            h = new sn();
        h.layers.enable(1), (h.viewport = new z());
        const d = new sn();
        d.layers.enable(2), (d.viewport = new z());
        const u = [h, d],
            f = new xr();
        f.layers.enable(1), f.layers.enable(2);
        let p = null,
            m = null;
        function g(e) {
            const t = c.get(e.inputSource);
            t && t.dispatchEvent({ type: e.type, data: e.inputSource });
        }
        function x() {
            c.forEach(function (e, t) {
                e.disconnect(t);
            }),
                c.clear(),
                e.setFramebuffer(null),
                e.setRenderTarget(e.getRenderTarget()),
                A.stop(),
                (n.isPresenting = !1),
                n.dispatchEvent({ type: "sessionend" });
        }
        function v(e) {
            (a = e), A.setContext(i), A.start(), (n.isPresenting = !0), n.dispatchEvent({ type: "sessionstart" });
        }
        function _(e) {
            const t = i.inputSources;
            for (let e = 0; e < l.length; e++) c.set(t[e], l[e]);
            for (let t = 0; t < e.removed.length; t++) {
                const n = e.removed[t],
                    i = c.get(n);
                i && (i.dispatchEvent({ type: "disconnected", data: n }), c.delete(n));
            }
            for (let t = 0; t < e.added.length; t++) {
                const n = e.added[t],
                    i = c.get(n);
                i && i.dispatchEvent({ type: "connected", data: n });
            }
        }
        (this.enabled = !1),
            (this.isPresenting = !1),
            (this.getController = function (e) {
                let t = l[e];
                return void 0 === t && ((t = new _r()), (l[e] = t)), t.getTargetRaySpace();
            }),
            (this.getControllerGrip = function (e) {
                let t = l[e];
                return void 0 === t && ((t = new _r()), (l[e] = t)), t.getGripSpace();
            }),
            (this.getHand = function (e) {
                let t = l[e];
                return void 0 === t && ((t = new _r()), (l[e] = t)), t.getHandSpace();
            }),
            (this.setFramebufferScaleFactor = function (e) {
                (r = e), !0 === n.isPresenting && console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.");
            }),
            (this.setReferenceSpaceType = function (e) {
                (o = e), !0 === n.isPresenting && console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.");
            }),
            (this.getReferenceSpace = function () {
                return a;
            }),
            (this.getSession = function () {
                return i;
            }),
            (this.setSession = function (e) {
                if (((i = e), null !== i)) {
                    i.addEventListener("select", g),
                        i.addEventListener("selectstart", g),
                        i.addEventListener("selectend", g),
                        i.addEventListener("squeeze", g),
                        i.addEventListener("squeezestart", g),
                        i.addEventListener("squeezeend", g),
                        i.addEventListener("end", x);
                    const e = t.getContextAttributes();
                    !0 !== e.xrCompatible && t.makeXRCompatible();
                    const n = { antialias: e.antialias, alpha: e.alpha, depth: e.depth, stencil: e.stencil, framebufferScaleFactor: r },
                        a = new XRWebGLLayer(i, t, n);
                    i.updateRenderState({ baseLayer: a }), i.requestReferenceSpace(o).then(v), i.addEventListener("inputsourceschange", _);
                }
            });
        const y = new H(),
            M = new H();
        function b(e, t) {
            null === t ? e.matrixWorld.copy(e.matrix) : e.matrixWorld.multiplyMatrices(t.matrixWorld, e.matrix), e.matrixWorldInverse.getInverse(e.matrixWorld);
        }
        this.getCamera = function (e) {
            (f.near = d.near = h.near = e.near), (f.far = d.far = h.far = e.far), (p === f.near && m === f.far) || (i.updateRenderState({ depthNear: f.near, depthFar: f.far }), (p = f.near), (m = f.far));
            const t = e.parent,
                n = f.cameras;
            b(f, t);
            for (let e = 0; e < n.length; e++) b(n[e], t);
            e.matrixWorld.copy(f.matrixWorld);
            const r = e.children;
            for (let e = 0, t = r.length; e < t; e++) r[e].updateMatrixWorld(!0);
            return (
                2 === n.length
                    ? (function (e, t, n) {
                          y.setFromMatrixPosition(t.matrixWorld), M.setFromMatrixPosition(n.matrixWorld);
                          const i = y.distanceTo(M),
                              r = t.projectionMatrix.elements,
                              a = n.projectionMatrix.elements,
                              o = r[14] / (r[10] - 1),
                              s = r[14] / (r[10] + 1),
                              l = (r[9] + 1) / r[5],
                              c = (r[9] - 1) / r[5],
                              h = (r[8] - 1) / r[0],
                              d = (a[8] + 1) / a[0],
                              u = o * h,
                              f = o * d,
                              p = i / (-h + d),
                              m = p * -h;
                          t.matrixWorld.decompose(e.position, e.quaternion, e.scale), e.translateX(m), e.translateZ(p), e.matrixWorld.compose(e.position, e.quaternion, e.scale), e.matrixWorldInverse.getInverse(e.matrixWorld);
                          const g = o + p,
                              x = s + p,
                              v = u - m,
                              _ = f + (i - m),
                              b = ((l * s) / x) * g,
                              w = ((c * s) / x) * g;
                          e.projectionMatrix.makePerspective(v, _, b, w, g, x);
                      })(f, h, d)
                    : f.projectionMatrix.copy(h.projectionMatrix),
                f
            );
        };
        let w = null;
        const A = new gn();
        A.setAnimationLoop(function (t, n) {
            if (((s = n.getViewerPose(a)), null !== s)) {
                const t = s.views,
                    n = i.renderState.baseLayer;
                e.setFramebuffer(n.framebuffer);
                let r = !1;
                t.length !== f.cameras.length && ((f.cameras.length = 0), (r = !0));
                for (let e = 0; e < t.length; e++) {
                    const i = t[e],
                        a = n.getViewport(i),
                        o = u[e];
                    o.matrix.fromArray(i.transform.matrix), o.projectionMatrix.fromArray(i.projectionMatrix), o.viewport.set(a.x, a.y, a.width, a.height), 0 === e && f.matrix.copy(o.matrix), !0 === r && f.cameras.push(o);
                }
            }
            const r = i.inputSources;
            for (let e = 0; e < l.length; e++) {
                const t = l[e],
                    i = r[e];
                t.update(i, n, a);
            }
            w && w(t, n);
        }),
            (this.setAnimationLoop = function (e) {
                w = e;
            }),
            (this.dispose = function () {});
    }
    function Mr(e) {
        function t(t, n) {
            (t.opacity.value = n.opacity),
                n.color && t.diffuse.value.copy(n.color),
                n.emissive && t.emissive.value.copy(n.emissive).multiplyScalar(n.emissiveIntensity),
                n.map && (t.map.value = n.map),
                n.alphaMap && (t.alphaMap.value = n.alphaMap),
                n.specularMap && (t.specularMap.value = n.specularMap);
            const i = e.get(n).envMap;
            if (i) {
                (t.envMap.value = i), (t.flipEnvMap.value = i.isCubeTexture && i._needsFlipEnvMap ? -1 : 1), (t.reflectivity.value = n.reflectivity), (t.refractionRatio.value = n.refractionRatio);
                const r = e.get(i).__maxMipLevel;
                void 0 !== r && (t.maxMipLevel.value = r);
            }
            let r, a;
            n.lightMap && ((t.lightMap.value = n.lightMap), (t.lightMapIntensity.value = n.lightMapIntensity)),
                n.aoMap && ((t.aoMap.value = n.aoMap), (t.aoMapIntensity.value = n.aoMapIntensity)),
                n.map
                    ? (r = n.map)
                    : n.specularMap
                    ? (r = n.specularMap)
                    : n.displacementMap
                    ? (r = n.displacementMap)
                    : n.normalMap
                    ? (r = n.normalMap)
                    : n.bumpMap
                    ? (r = n.bumpMap)
                    : n.roughnessMap
                    ? (r = n.roughnessMap)
                    : n.metalnessMap
                    ? (r = n.metalnessMap)
                    : n.alphaMap
                    ? (r = n.alphaMap)
                    : n.emissiveMap
                    ? (r = n.emissiveMap)
                    : n.clearcoatMap
                    ? (r = n.clearcoatMap)
                    : n.clearcoatNormalMap
                    ? (r = n.clearcoatNormalMap)
                    : n.clearcoatRoughnessMap && (r = n.clearcoatRoughnessMap),
                void 0 !== r && (r.isWebGLRenderTarget && (r = r.texture), !0 === r.matrixAutoUpdate && r.updateMatrix(), t.uvTransform.value.copy(r.matrix)),
                n.aoMap ? (a = n.aoMap) : n.lightMap && (a = n.lightMap),
                void 0 !== a && (a.isWebGLRenderTarget && (a = a.texture), !0 === a.matrixAutoUpdate && a.updateMatrix(), t.uv2Transform.value.copy(a.matrix));
        }
        function n(t, n) {
            (t.roughness.value = n.roughness),
                (t.metalness.value = n.metalness),
                n.roughnessMap && (t.roughnessMap.value = n.roughnessMap),
                n.metalnessMap && (t.metalnessMap.value = n.metalnessMap),
                n.emissiveMap && (t.emissiveMap.value = n.emissiveMap),
                n.bumpMap && ((t.bumpMap.value = n.bumpMap), (t.bumpScale.value = n.bumpScale), 1 === n.side && (t.bumpScale.value *= -1)),
                n.normalMap && ((t.normalMap.value = n.normalMap), t.normalScale.value.copy(n.normalScale), 1 === n.side && t.normalScale.value.negate()),
                n.displacementMap && ((t.displacementMap.value = n.displacementMap), (t.displacementScale.value = n.displacementScale), (t.displacementBias.value = n.displacementBias));
            e.get(n).envMap && (t.envMapIntensity.value = n.envMapIntensity);
        }
        return {
            refreshFogUniforms: function (e, t) {
                e.fogColor.value.copy(t.color), t.isFog ? ((e.fogNear.value = t.near), (e.fogFar.value = t.far)) : t.isFogExp2 && (e.fogDensity.value = t.density);
            },
            refreshMaterialUniforms: function (e, i, r, a) {
                i.isMeshBasicMaterial
                    ? t(e, i)
                    : i.isMeshLambertMaterial
                    ? (t(e, i),
                      (function (e, t) {
                          t.emissiveMap && (e.emissiveMap.value = t.emissiveMap);
                      })(e, i))
                    : i.isMeshToonMaterial
                    ? (t(e, i),
                      (function (e, t) {
                          t.gradientMap && (e.gradientMap.value = t.gradientMap);
                          t.emissiveMap && (e.emissiveMap.value = t.emissiveMap);
                          t.bumpMap && ((e.bumpMap.value = t.bumpMap), (e.bumpScale.value = t.bumpScale), 1 === t.side && (e.bumpScale.value *= -1));
                          t.normalMap && ((e.normalMap.value = t.normalMap), e.normalScale.value.copy(t.normalScale), 1 === t.side && e.normalScale.value.negate());
                          t.displacementMap && ((e.displacementMap.value = t.displacementMap), (e.displacementScale.value = t.displacementScale), (e.displacementBias.value = t.displacementBias));
                      })(e, i))
                    : i.isMeshPhongMaterial
                    ? (t(e, i),
                      (function (e, t) {
                          e.specular.value.copy(t.specular), (e.shininess.value = Math.max(t.shininess, 1e-4)), t.emissiveMap && (e.emissiveMap.value = t.emissiveMap);
                          t.bumpMap && ((e.bumpMap.value = t.bumpMap), (e.bumpScale.value = t.bumpScale), 1 === t.side && (e.bumpScale.value *= -1));
                          t.normalMap && ((e.normalMap.value = t.normalMap), e.normalScale.value.copy(t.normalScale), 1 === t.side && e.normalScale.value.negate());
                          t.displacementMap && ((e.displacementMap.value = t.displacementMap), (e.displacementScale.value = t.displacementScale), (e.displacementBias.value = t.displacementBias));
                      })(e, i))
                    : i.isMeshStandardMaterial
                    ? (t(e, i),
                      i.isMeshPhysicalMaterial
                          ? (function (e, t) {
                                n(e, t), (e.reflectivity.value = t.reflectivity), (e.clearcoat.value = t.clearcoat), (e.clearcoatRoughness.value = t.clearcoatRoughness), t.sheen && e.sheen.value.copy(t.sheen);
                                t.clearcoatMap && (e.clearcoatMap.value = t.clearcoatMap);
                                t.clearcoatRoughnessMap && (e.clearcoatRoughnessMap.value = t.clearcoatRoughnessMap);
                                t.clearcoatNormalMap && (e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale), (e.clearcoatNormalMap.value = t.clearcoatNormalMap), 1 === t.side && e.clearcoatNormalScale.value.negate());
                                (e.transmission.value = t.transmission), t.transmissionMap && (e.transmissionMap.value = t.transmissionMap);
                            })(e, i)
                          : n(e, i))
                    : i.isMeshMatcapMaterial
                    ? (t(e, i),
                      (function (e, t) {
                          t.matcap && (e.matcap.value = t.matcap);
                          t.bumpMap && ((e.bumpMap.value = t.bumpMap), (e.bumpScale.value = t.bumpScale), 1 === t.side && (e.bumpScale.value *= -1));
                          t.normalMap && ((e.normalMap.value = t.normalMap), e.normalScale.value.copy(t.normalScale), 1 === t.side && e.normalScale.value.negate());
                          t.displacementMap && ((e.displacementMap.value = t.displacementMap), (e.displacementScale.value = t.displacementScale), (e.displacementBias.value = t.displacementBias));
                      })(e, i))
                    : i.isMeshDepthMaterial
                    ? (t(e, i),
                      (function (e, t) {
                          t.displacementMap && ((e.displacementMap.value = t.displacementMap), (e.displacementScale.value = t.displacementScale), (e.displacementBias.value = t.displacementBias));
                      })(e, i))
                    : i.isMeshDistanceMaterial
                    ? (t(e, i),
                      (function (e, t) {
                          t.displacementMap && ((e.displacementMap.value = t.displacementMap), (e.displacementScale.value = t.displacementScale), (e.displacementBias.value = t.displacementBias));
                          e.referencePosition.value.copy(t.referencePosition), (e.nearDistance.value = t.nearDistance), (e.farDistance.value = t.farDistance);
                      })(e, i))
                    : i.isMeshNormalMaterial
                    ? (t(e, i),
                      (function (e, t) {
                          t.bumpMap && ((e.bumpMap.value = t.bumpMap), (e.bumpScale.value = t.bumpScale), 1 === t.side && (e.bumpScale.value *= -1));
                          t.normalMap && ((e.normalMap.value = t.normalMap), e.normalScale.value.copy(t.normalScale), 1 === t.side && e.normalScale.value.negate());
                          t.displacementMap && ((e.displacementMap.value = t.displacementMap), (e.displacementScale.value = t.displacementScale), (e.displacementBias.value = t.displacementBias));
                      })(e, i))
                    : i.isLineBasicMaterial
                    ? ((function (e, t) {
                          e.diffuse.value.copy(t.color), (e.opacity.value = t.opacity);
                      })(e, i),
                      i.isLineDashedMaterial &&
                          (function (e, t) {
                              (e.dashSize.value = t.dashSize), (e.totalSize.value = t.dashSize + t.gapSize), (e.scale.value = t.scale);
                          })(e, i))
                    : i.isPointsMaterial
                    ? (function (e, t, n, i) {
                          e.diffuse.value.copy(t.color), (e.opacity.value = t.opacity), (e.size.value = t.size * n), (e.scale.value = 0.5 * i), t.map && (e.map.value = t.map);
                          t.alphaMap && (e.alphaMap.value = t.alphaMap);
                          let r;
                          t.map ? (r = t.map) : t.alphaMap && (r = t.alphaMap);
                          void 0 !== r && (!0 === r.matrixAutoUpdate && r.updateMatrix(), e.uvTransform.value.copy(r.matrix));
                      })(e, i, r, a)
                    : i.isSpriteMaterial
                    ? (function (e, t) {
                          e.diffuse.value.copy(t.color), (e.opacity.value = t.opacity), (e.rotation.value = t.rotation), t.map && (e.map.value = t.map);
                          t.alphaMap && (e.alphaMap.value = t.alphaMap);
                          let n;
                          t.map ? (n = t.map) : t.alphaMap && (n = t.alphaMap);
                          void 0 !== n && (!0 === n.matrixAutoUpdate && n.updateMatrix(), e.uvTransform.value.copy(n.matrix));
                      })(e, i)
                    : i.isShadowMaterial
                    ? (e.color.value.copy(i.color), (e.opacity.value = i.opacity))
                    : i.isShaderMaterial && (i.uniformsNeedUpdate = !1);
            },
        };
    }
    function br(e) {
        const t = void 0 !== (e = e || {}).canvas ? e.canvas : document.createElementNS("http://www.w3.org/1999/xhtml", "canvas"),
            n = void 0 !== e.context ? e.context : null,
            i = void 0 !== e.alpha && e.alpha,
            r = void 0 === e.depth || e.depth,
            a = void 0 === e.stencil || e.stencil,
            o = void 0 !== e.antialias && e.antialias,
            s = void 0 === e.premultipliedAlpha || e.premultipliedAlpha,
            l = void 0 !== e.preserveDrawingBuffer && e.preserveDrawingBuffer,
            c = void 0 !== e.powerPreference ? e.powerPreference : "default",
            h = void 0 !== e.failIfMajorPerformanceCaveat && e.failIfMajorPerformanceCaveat;
        let d = null,
            u = null;
        (this.domElement = t),
            (this.debug = { checkShaderErrors: !0 }),
            (this.autoClear = !0),
            (this.autoClearColor = !0),
            (this.autoClearDepth = !0),
            (this.autoClearStencil = !0),
            (this.sortObjects = !0),
            (this.clippingPlanes = []),
            (this.localClippingEnabled = !1),
            (this.gammaFactor = 2),
            (this.outputEncoding = S),
            (this.physicallyCorrectLights = !1),
            (this.toneMapping = 0),
            (this.toneMappingExposure = 1),
            (this.maxMorphTargets = 8),
            (this.maxMorphNormals = 4);
        const f = this;
        let p = !1,
            g = null,
            x = 0,
            y = 0,
            M = null,
            w = null,
            A = -1,
            T = null,
            L = null;
        const E = new z(),
            P = new z();
        let F = null,
            I = t.width,
            R = t.height,
            D = 1,
            U = null,
            O = null;
        const G = new z(0, 0, I, R),
            B = new z(0, 0, I, R);
        let k = !1;
        const V = new mn();
        let W = !1,
            X = !1;
        const Y = new pe(),
            j = new H(),
            Q = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 };
        function q() {
            return null === M ? D : 1;
        }
        let Z,
            J,
            K,
            $,
            ee,
            te,
            ne,
            ie,
            re,
            ae,
            oe,
            se,
            le,
            ce,
            he,
            de,
            ue,
            fe,
            me,
            ge,
            xe,
            ve = n;
        function _e(e, n) {
            for (let i = 0; i < e.length; i++) {
                const r = e[i],
                    a = t.getContext(r, n);
                if (null !== a) return a;
            }
            return null;
        }
        try {
            const e = { alpha: i, depth: r, stencil: a, antialias: o, premultipliedAlpha: s, preserveDrawingBuffer: l, powerPreference: c, failIfMajorPerformanceCaveat: h };
            if ((t.addEventListener("webglcontextlost", we, !1), t.addEventListener("webglcontextrestored", Ae, !1), null === ve)) {
                const t = ["webgl2", "webgl", "experimental-webgl"];
                if ((!0 === f.isWebGL1Renderer && t.shift(), (ve = _e(t, e)), null === ve)) throw _e(t) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
            }
            void 0 === ve.getShaderPrecisionFormat &&
                (ve.getShaderPrecisionFormat = function () {
                    return { rangeMin: 1, rangeMax: 1, precision: 1 };
                });
        } catch (e) {
            throw (console.error("THREE.WebGLRenderer: " + e.message), e);
        }
        function ye() {
            (Z = new En(ve)),
                (J = new Sn(ve, Z, e)),
                !1 === J.isWebGL2 &&
                    (Z.get("WEBGL_depth_texture"),
                    Z.get("OES_texture_float"),
                    Z.get("OES_texture_half_float"),
                    Z.get("OES_texture_half_float_linear"),
                    Z.get("OES_standard_derivatives"),
                    Z.get("OES_element_index_uint"),
                    Z.get("OES_vertex_array_object"),
                    Z.get("ANGLE_instanced_arrays")),
                Z.get("OES_texture_float_linear"),
                (ge = new gr(ve, Z, J)),
                (K = new pr(ve, Z, J)),
                K.scissor(P.copy(B).multiplyScalar(D).floor()),
                K.viewport(E.copy(G).multiplyScalar(D).floor()),
                ($ = new Nn(ve)),
                (ee = new er()),
                (te = new mr(ve, Z, K, ee, J, ge, $)),
                (ne = new Ln(f)),
                (ie = new xn(ve, J)),
                (xe = new wn(ve, Z, ie, J)),
                (re = new Pn(ve, ie, $, xe)),
                (ae = new Dn(ve, re, ie, $)),
                (ue = new Rn(ve)),
                (he = new Tn(ee)),
                (oe = new $i(f, ne, Z, J, xe, he)),
                (se = new Mr(ee)),
                (le = new rr(ee)),
                (ce = new hr(Z, J)),
                (de = new bn(f, ne, K, ae, s)),
                (fe = new An(ve, Z, $, J)),
                (me = new Fn(ve, Z, $, J)),
                ($.programs = oe.programs),
                (f.capabilities = J),
                (f.extensions = Z),
                (f.properties = ee),
                (f.renderLists = le),
                (f.state = K),
                (f.info = $);
        }
        ye();
        const Me = new yr(f, ve);
        this.xr = Me;
        const be = new fr(f, ae, J.maxTextureSize);
        function we(e) {
            e.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), (p = !0);
        }
        function Ae() {
            console.log("THREE.WebGLRenderer: Context Restored."), (p = !1), ye();
        }
        function Se(e) {
            const t = e.target;
            t.removeEventListener("dispose", Se),
                (function (e) {
                    Te(e), ee.remove(e);
                })(t);
        }
        function Te(e) {
            const t = ee.get(e).program;
            void 0 !== t && oe.releaseProgram(t);
        }
        (this.shadowMap = be),
            (this.getContext = function () {
                return ve;
            }),
            (this.getContextAttributes = function () {
                return ve.getContextAttributes();
            }),
            (this.forceContextLoss = function () {
                const e = Z.get("WEBGL_lose_context");
                e && e.loseContext();
            }),
            (this.forceContextRestore = function () {
                const e = Z.get("WEBGL_lose_context");
                e && e.restoreContext();
            }),
            (this.getPixelRatio = function () {
                return D;
            }),
            (this.setPixelRatio = function (e) {
                void 0 !== e && ((D = e), this.setSize(I, R, !1));
            }),
            (this.getSize = function (e) {
                return void 0 === e && (console.warn("WebGLRenderer: .getsize() now requires a Vector2 as an argument"), (e = new C())), e.set(I, R);
            }),
            (this.setSize = function (e, n, i) {
                Me.isPresenting
                    ? console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.")
                    : ((I = e), (R = n), (t.width = Math.floor(e * D)), (t.height = Math.floor(n * D)), !1 !== i && ((t.style.width = e + "px"), (t.style.height = n + "px")), this.setViewport(0, 0, e, n));
            }),
            (this.getDrawingBufferSize = function (e) {
                return void 0 === e && (console.warn("WebGLRenderer: .getdrawingBufferSize() now requires a Vector2 as an argument"), (e = new C())), e.set(I * D, R * D).floor();
            }),
            (this.setDrawingBufferSize = function (e, n, i) {
                (I = e), (R = n), (D = i), (t.width = Math.floor(e * i)), (t.height = Math.floor(n * i)), this.setViewport(0, 0, e, n);
            }),
            (this.getCurrentViewport = function (e) {
                return void 0 === e && (console.warn("WebGLRenderer: .getCurrentViewport() now requires a Vector4 as an argument"), (e = new z())), e.copy(E);
            }),
            (this.getViewport = function (e) {
                return e.copy(G);
            }),
            (this.setViewport = function (e, t, n, i) {
                e.isVector4 ? G.set(e.x, e.y, e.z, e.w) : G.set(e, t, n, i), K.viewport(E.copy(G).multiplyScalar(D).floor());
            }),
            (this.getScissor = function (e) {
                return e.copy(B);
            }),
            (this.setScissor = function (e, t, n, i) {
                e.isVector4 ? B.set(e.x, e.y, e.z, e.w) : B.set(e, t, n, i), K.scissor(P.copy(B).multiplyScalar(D).floor());
            }),
            (this.getScissorTest = function () {
                return k;
            }),
            (this.setScissorTest = function (e) {
                K.setScissorTest((k = e));
            }),
            (this.setOpaqueSort = function (e) {
                U = e;
            }),
            (this.setTransparentSort = function (e) {
                O = e;
            }),
            (this.getClearColor = function () {
                return de.getClearColor();
            }),
            (this.setClearColor = function () {
                de.setClearColor.apply(de, arguments);
            }),
            (this.getClearAlpha = function () {
                return de.getClearAlpha();
            }),
            (this.setClearAlpha = function () {
                de.setClearAlpha.apply(de, arguments);
            }),
            (this.clear = function (e, t, n) {
                let i = 0;
                (void 0 === e || e) && (i |= 16384), (void 0 === t || t) && (i |= 256), (void 0 === n || n) && (i |= 1024), ve.clear(i);
            }),
            (this.clearColor = function () {
                this.clear(!0, !1, !1);
            }),
            (this.clearDepth = function () {
                this.clear(!1, !0, !1);
            }),
            (this.clearStencil = function () {
                this.clear(!1, !1, !0);
            }),
            (this.dispose = function () {
                t.removeEventListener("webglcontextlost", we, !1), t.removeEventListener("webglcontextrestored", Ae, !1), le.dispose(), ce.dispose(), ee.dispose(), ne.dispose(), ae.dispose(), xe.dispose(), Me.dispose(), Ee.stop();
            }),
            (this.renderBufferImmediate = function (e, t) {
                xe.initAttributes();
                const n = ee.get(e);
                e.hasPositions && !n.position && (n.position = ve.createBuffer()),
                    e.hasNormals && !n.normal && (n.normal = ve.createBuffer()),
                    e.hasUvs && !n.uv && (n.uv = ve.createBuffer()),
                    e.hasColors && !n.color && (n.color = ve.createBuffer());
                const i = t.getAttributes();
                e.hasPositions && (ve.bindBuffer(34962, n.position), ve.bufferData(34962, e.positionArray, 35048), xe.enableAttribute(i.position), ve.vertexAttribPointer(i.position, 3, 5126, !1, 0, 0)),
                    e.hasNormals && (ve.bindBuffer(34962, n.normal), ve.bufferData(34962, e.normalArray, 35048), xe.enableAttribute(i.normal), ve.vertexAttribPointer(i.normal, 3, 5126, !1, 0, 0)),
                    e.hasUvs && (ve.bindBuffer(34962, n.uv), ve.bufferData(34962, e.uvArray, 35048), xe.enableAttribute(i.uv), ve.vertexAttribPointer(i.uv, 2, 5126, !1, 0, 0)),
                    e.hasColors && (ve.bindBuffer(34962, n.color), ve.bufferData(34962, e.colorArray, 35048), xe.enableAttribute(i.color), ve.vertexAttribPointer(i.color, 3, 5126, !1, 0, 0)),
                    xe.disableUnusedAttributes(),
                    ve.drawArrays(4, 0, e.count),
                    (e.count = 0);
            }),
            (this.renderBufferDirect = function (e, t, n, i, r, a) {
                null === t && (t = Q);
                const o = r.isMesh && r.matrixWorld.determinant() < 0,
                    s = Ie(e, t, i, r);
                K.setMaterial(i, o);
                let l = n.index;
                const c = n.attributes.position;
                if (null === l) {
                    if (void 0 === c || 0 === c.count) return;
                } else if (0 === l.count) return;
                let h,
                    d = 1;
                !0 === i.wireframe && ((l = re.getWireframeAttribute(n)), (d = 2)), (i.morphTargets || i.morphNormals) && ue.update(r, n, i, s), xe.setup(r, i, s, n, l);
                let u = fe;
                null !== l && ((h = ie.get(l)), (u = me), u.setIndex(h));
                const f = null !== l ? l.count : c.count,
                    p = n.drawRange.start * d,
                    m = n.drawRange.count * d,
                    g = null !== a ? a.start * d : 0,
                    x = null !== a ? a.count * d : 1 / 0,
                    v = Math.max(p, g),
                    _ = Math.min(f, p + m, g + x) - 1,
                    y = Math.max(0, _ - v + 1);
                if (0 !== y) {
                    if (r.isMesh) !0 === i.wireframe ? (K.setLineWidth(i.wireframeLinewidth * q()), u.setMode(1)) : u.setMode(4);
                    else if (r.isLine) {
                        let e = i.linewidth;
                        void 0 === e && (e = 1), K.setLineWidth(e * q()), r.isLineSegments ? u.setMode(1) : r.isLineLoop ? u.setMode(2) : u.setMode(3);
                    } else r.isPoints ? u.setMode(0) : r.isSprite && u.setMode(4);
                    if (r.isInstancedMesh) u.renderInstances(v, y, r.count);
                    else if (n.isInstancedBufferGeometry) {
                        const e = Math.min(n.instanceCount, n._maxInstanceCount);
                        u.renderInstances(v, y, e);
                    } else u.render(v, y);
                }
            }),
            (this.compile = function (e, t) {
                (u = ce.get(e, t)),
                    u.init(),
                    e.traverseVisible(function (e) {
                        e.isLight && e.layers.test(t.layers) && (u.pushLight(e), e.castShadow && u.pushShadow(e));
                    }),
                    u.setupLights(t);
                const n = new WeakMap();
                e.traverse(function (t) {
                    const i = t.material;
                    if (i)
                        if (Array.isArray(i))
                            for (let r = 0; r < i.length; r++) {
                                const a = i[r];
                                !1 === n.has(a) && (Ce(a, e, t), n.set(a));
                            }
                        else !1 === n.has(i) && (Ce(i, e, t), n.set(i));
                });
            });
        let Le = null;
        const Ee = new gn();
        function Pe(e, t, n, i) {
            if (!1 === e.visible) return;
            if (e.layers.test(t.layers))
                if (e.isGroup) n = e.renderOrder;
                else if (e.isLOD) !0 === e.autoUpdate && e.update(t);
                else if (e.isLight) u.pushLight(e), e.castShadow && u.pushShadow(e);
                else if (e.isSprite) {
                    if (!e.frustumCulled || V.intersectsSprite(e)) {
                        i && j.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Y);
                        const t = ae.update(e),
                            r = e.material;
                        r.visible && d.push(e, t, r, n, j.z, null);
                    }
                } else if (e.isImmediateRenderObject) i && j.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Y), d.push(e, null, e.material, n, j.z, null);
                else if ((e.isMesh || e.isLine || e.isPoints) && (e.isSkinnedMesh && e.skeleton.frame !== $.render.frame && (e.skeleton.update(), (e.skeleton.frame = $.render.frame)), !e.frustumCulled || V.intersectsObject(e))) {
                    i && j.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Y);
                    const t = ae.update(e),
                        r = e.material;
                    if (Array.isArray(r)) {
                        const i = t.groups;
                        for (let a = 0, o = i.length; a < o; a++) {
                            const o = i[a],
                                s = r[o.materialIndex];
                            s && s.visible && d.push(e, t, s, n, j.z, o);
                        }
                    } else r.visible && d.push(e, t, r, n, j.z, null);
                }
            const r = e.children;
            for (let e = 0, a = r.length; e < a; e++) Pe(r[e], t, n, i);
        }
        function Fe(e, t, n) {
            const i = !0 === t.isScene ? t.overrideMaterial : null;
            for (let r = 0, a = e.length; r < a; r++) {
                const a = e[r],
                    o = a.object,
                    s = a.geometry,
                    l = null === i ? a.material : i,
                    c = a.group;
                if (n.isArrayCamera) {
                    L = n;
                    const e = n.cameras;
                    for (let n = 0, i = e.length; n < i; n++) {
                        const i = e[n];
                        o.layers.test(i.layers) && (K.viewport(E.copy(i.viewport)), u.setupLights(i), Ne(o, t, i, s, l, c));
                    }
                } else (L = null), Ne(o, t, n, s, l, c);
            }
        }
        function Ne(e, t, n, i, r, a) {
            if ((e.onBeforeRender(f, t, n, i, r, a), (u = ce.get(t, L || n)), e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse, e.matrixWorld), e.normalMatrix.getNormalMatrix(e.modelViewMatrix), e.isImmediateRenderObject)) {
                const i = Ie(n, t, r, e);
                K.setMaterial(r),
                    xe.reset(),
                    (function (e, t) {
                        e.render(function (e) {
                            f.renderBufferImmediate(e, t);
                        });
                    })(e, i);
            } else f.renderBufferDirect(n, t, i, r, e, a);
            e.onAfterRender(f, t, n, i, r, a), (u = ce.get(t, L || n));
        }
        function Ce(e, t, n) {
            !0 !== t.isScene && (t = Q);
            const i = ee.get(e),
                r = u.state.lights,
                a = u.state.shadowsArray,
                o = r.state.version,
                s = oe.getParameters(e, r.state, a, t, n),
                l = oe.getProgramCacheKey(s);
            let c = i.program,
                h = !0;
            if (void 0 === c) e.addEventListener("dispose", Se);
            else if (c.cacheKey !== l) Te(e);
            else if (i.lightsStateVersion !== o) h = !1;
            else {
                if (void 0 !== s.shaderID) {
                    const n = e.isMeshStandardMaterial ? t.environment : null;
                    return void (i.envMap = ne.get(e.envMap || n));
                }
                h = !1;
            }
            h && ((s.uniforms = oe.getUniforms(e)), e.onBeforeCompile(s, f), (c = oe.acquireProgram(s, l)), (i.program = c), (i.uniforms = s.uniforms), (i.outputEncoding = s.outputEncoding));
            const d = i.uniforms;
            ((e.isShaderMaterial || e.isRawShaderMaterial) && !0 !== e.clipping) || ((i.numClippingPlanes = he.numPlanes), (i.numIntersection = he.numIntersection), (d.clippingPlanes = he.uniform)),
                (i.environment = e.isMeshStandardMaterial ? t.environment : null),
                (i.fog = t.fog),
                (i.envMap = ne.get(e.envMap || i.environment)),
                (i.needsLights = (function (e) {
                    return e.isMeshLambertMaterial || e.isMeshToonMaterial || e.isMeshPhongMaterial || e.isMeshStandardMaterial || e.isShadowMaterial || (e.isShaderMaterial && !0 === e.lights);
                })(e)),
                (i.lightsStateVersion = o),
                i.needsLights &&
                    ((d.ambientLightColor.value = r.state.ambient),
                    (d.lightProbe.value = r.state.probe),
                    (d.directionalLights.value = r.state.directional),
                    (d.directionalLightShadows.value = r.state.directionalShadow),
                    (d.spotLights.value = r.state.spot),
                    (d.spotLightShadows.value = r.state.spotShadow),
                    (d.rectAreaLights.value = r.state.rectArea),
                    (d.ltc_1.value = r.state.rectAreaLTC1),
                    (d.ltc_2.value = r.state.rectAreaLTC2),
                    (d.pointLights.value = r.state.point),
                    (d.pointLightShadows.value = r.state.pointShadow),
                    (d.hemisphereLights.value = r.state.hemi),
                    (d.directionalShadowMap.value = r.state.directionalShadowMap),
                    (d.directionalShadowMatrix.value = r.state.directionalShadowMatrix),
                    (d.spotShadowMap.value = r.state.spotShadowMap),
                    (d.spotShadowMatrix.value = r.state.spotShadowMatrix),
                    (d.pointShadowMap.value = r.state.pointShadowMap),
                    (d.pointShadowMatrix.value = r.state.pointShadowMatrix));
            const p = i.program.getUniforms(),
                m = Ci.seqWithValue(p.seq, d);
            i.uniformsList = m;
        }
        function Ie(e, t, n, i) {
            !0 !== t.isScene && (t = Q), te.resetTextureUnits();
            const r = t.fog,
                a = n.isMeshStandardMaterial ? t.environment : null,
                o = null === M ? f.outputEncoding : M.texture.encoding,
                s = ne.get(n.envMap || a),
                l = ee.get(n),
                c = u.state.lights;
            if (!0 === W && (!0 === X || e !== T)) {
                const t = e === T && n.id === A;
                he.setState(n, e, t);
            }
            n.version === l.__version
                ? (n.fog && l.fog !== r) || l.environment !== a || (l.needsLights && l.lightsStateVersion !== c.state.version)
                    ? Ce(n, t, i)
                    : void 0 === l.numClippingPlanes || (l.numClippingPlanes === he.numPlanes && l.numIntersection === he.numIntersection)
                    ? (l.outputEncoding !== o || l.envMap !== s) && Ce(n, t, i)
                    : Ce(n, t, i)
                : (Ce(n, t, i), (l.__version = n.version));
            let h = !1,
                d = !1,
                p = !1;
            const m = l.program,
                g = m.getUniforms(),
                x = l.uniforms;
            if ((K.useProgram(m.program) && ((h = !0), (d = !0), (p = !0)), n.id !== A && ((A = n.id), (d = !0)), h || T !== e)) {
                if (
                    (g.setValue(ve, "projectionMatrix", e.projectionMatrix),
                    J.logarithmicDepthBuffer && g.setValue(ve, "logDepthBufFC", 2 / (Math.log(e.far + 1) / Math.LN2)),
                    T !== e && ((T = e), (d = !0), (p = !0)),
                    n.isShaderMaterial || n.isMeshPhongMaterial || n.isMeshToonMaterial || n.isMeshStandardMaterial || n.envMap)
                ) {
                    const t = g.map.cameraPosition;
                    void 0 !== t && t.setValue(ve, j.setFromMatrixPosition(e.matrixWorld));
                }
                (n.isMeshPhongMaterial || n.isMeshToonMaterial || n.isMeshLambertMaterial || n.isMeshBasicMaterial || n.isMeshStandardMaterial || n.isShaderMaterial) && g.setValue(ve, "isOrthographic", !0 === e.isOrthographicCamera),
                    (n.isMeshPhongMaterial || n.isMeshToonMaterial || n.isMeshLambertMaterial || n.isMeshBasicMaterial || n.isMeshStandardMaterial || n.isShaderMaterial || n.isShadowMaterial || n.skinning) &&
                        g.setValue(ve, "viewMatrix", e.matrixWorldInverse);
            }
            if (n.skinning) {
                g.setOptional(ve, i, "bindMatrix"), g.setOptional(ve, i, "bindMatrixInverse");
                const e = i.skeleton;
                if (e) {
                    const t = e.bones;
                    if (J.floatVertexTextures) {
                        if (void 0 === e.boneTexture) {
                            let n = Math.sqrt(4 * t.length);
                            (n = N.ceilPowerOfTwo(n)), (n = Math.max(n, 4));
                            const i = new Float32Array(n * n * 4);
                            i.set(e.boneMatrices);
                            const r = new un(i, n, n, b, v);
                            (e.boneMatrices = i), (e.boneTexture = r), (e.boneTextureSize = n);
                        }
                        g.setValue(ve, "boneTexture", e.boneTexture, te), g.setValue(ve, "boneTextureSize", e.boneTextureSize);
                    } else g.setOptional(ve, e, "boneMatrices");
                }
            }
            var _, y;
            return (
                (d || l.receiveShadow !== i.receiveShadow) && ((l.receiveShadow = i.receiveShadow), g.setValue(ve, "receiveShadow", i.receiveShadow)),
                d &&
                    (g.setValue(ve, "toneMappingExposure", f.toneMappingExposure),
                    l.needsLights &&
                        ((y = p),
                        ((_ = x).ambientLightColor.needsUpdate = y),
                        (_.lightProbe.needsUpdate = y),
                        (_.directionalLights.needsUpdate = y),
                        (_.directionalLightShadows.needsUpdate = y),
                        (_.pointLights.needsUpdate = y),
                        (_.pointLightShadows.needsUpdate = y),
                        (_.spotLights.needsUpdate = y),
                        (_.spotLightShadows.needsUpdate = y),
                        (_.rectAreaLights.needsUpdate = y),
                        (_.hemisphereLights.needsUpdate = y)),
                    r && n.fog && se.refreshFogUniforms(x, r),
                    se.refreshMaterialUniforms(x, n, D, R),
                    Ci.upload(ve, l.uniformsList, x, te)),
                n.isShaderMaterial && !0 === n.uniformsNeedUpdate && (Ci.upload(ve, l.uniformsList, x, te), (n.uniformsNeedUpdate = !1)),
                n.isSpriteMaterial && g.setValue(ve, "center", i.center),
                g.setValue(ve, "modelViewMatrix", i.modelViewMatrix),
                g.setValue(ve, "normalMatrix", i.normalMatrix),
                g.setValue(ve, "modelMatrix", i.matrixWorld),
                m
            );
        }
        Ee.setAnimationLoop(function (e) {
            Me.isPresenting || (Le && Le(e));
        }),
            "undefined" != typeof window && Ee.setContext(window),
            (this.setAnimationLoop = function (e) {
                (Le = e), Me.setAnimationLoop(e), null === e ? Ee.stop() : Ee.start();
            }),
            (this.render = function (e, t) {
                let n, i;
                if (
                    (void 0 !== arguments[2] && (console.warn("THREE.WebGLRenderer.render(): the renderTarget argument has been removed. Use .setRenderTarget() instead."), (n = arguments[2])),
                    void 0 !== arguments[3] && (console.warn("THREE.WebGLRenderer.render(): the forceClear argument has been removed. Use .clear() instead."), (i = arguments[3])),
                    void 0 !== t && !0 !== t.isCamera)
                )
                    return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
                if (!0 === p) return;
                xe.resetDefaultState(),
                    (A = -1),
                    (T = null),
                    !0 === e.autoUpdate && e.updateMatrixWorld(),
                    null === t.parent && t.updateMatrixWorld(),
                    !0 === Me.enabled && !0 === Me.isPresenting && (t = Me.getCamera(t)),
                    !0 === e.isScene && e.onBeforeRender(f, e, t, n || M),
                    (u = ce.get(e, t)),
                    u.init(),
                    Y.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse),
                    V.setFromProjectionMatrix(Y),
                    (X = this.localClippingEnabled),
                    (W = he.init(this.clippingPlanes, X, t)),
                    (d = le.get(e, t)),
                    d.init(),
                    Pe(e, t, 0, f.sortObjects),
                    d.finish(),
                    !0 === f.sortObjects && d.sort(U, O),
                    !0 === W && he.beginShadows();
                const r = u.state.shadowsArray;
                be.render(r, e, t), u.setupLights(t), !0 === W && he.endShadows(), !0 === this.info.autoReset && this.info.reset(), void 0 !== n && this.setRenderTarget(n), de.render(d, e, t, i);
                const a = d.opaque,
                    o = d.transparent;
                a.length > 0 && Fe(a, e, t),
                    o.length > 0 && Fe(o, e, t),
                    !0 === e.isScene && e.onAfterRender(f, e, t),
                    null !== M && (te.updateRenderTargetMipmap(M), te.updateMultisampleRenderTarget(M)),
                    K.buffers.depth.setTest(!0),
                    K.buffers.depth.setMask(!0),
                    K.buffers.color.setMask(!0),
                    K.setPolygonOffset(!1),
                    (d = null),
                    (u = null);
            }),
            (this.setFramebuffer = function (e) {
                g !== e && null === M && ve.bindFramebuffer(36160, e), (g = e);
            }),
            (this.getActiveCubeFace = function () {
                return x;
            }),
            (this.getActiveMipmapLevel = function () {
                return y;
            }),
            (this.getRenderList = function () {
                return d;
            }),
            (this.setRenderList = function (e) {
                d = e;
            }),
            (this.getRenderState = function () {
                return u;
            }),
            (this.setRenderState = function (e) {
                u = e;
            }),
            (this.getRenderTarget = function () {
                return M;
            }),
            (this.setRenderTarget = function (e, t = 0, n = 0) {
                (M = e), (x = t), (y = n), e && void 0 === ee.get(e).__webglFramebuffer && te.setupRenderTarget(e);
                let i = g,
                    r = !1;
                if (e) {
                    const n = ee.get(e).__webglFramebuffer;
                    e.isWebGLCubeRenderTarget ? ((i = n[t]), (r = !0)) : (i = e.isWebGLMultisampleRenderTarget ? ee.get(e).__webglMultisampledFramebuffer : n), E.copy(e.viewport), P.copy(e.scissor), (F = e.scissorTest);
                } else E.copy(G).multiplyScalar(D).floor(), P.copy(B).multiplyScalar(D).floor(), (F = k);
                if ((w !== i && (ve.bindFramebuffer(36160, i), (w = i)), K.viewport(E), K.scissor(P), K.setScissorTest(F), r)) {
                    const i = ee.get(e.texture);
                    ve.framebufferTexture2D(36160, 36064, 34069 + t, i.__webglTexture, n);
                }
            }),
            (this.readRenderTargetPixels = function (e, t, n, i, r, a, o) {
                if (!e || !e.isWebGLRenderTarget) return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
                let s = ee.get(e).__webglFramebuffer;
                if ((e.isWebGLCubeRenderTarget && void 0 !== o && (s = s[o]), s)) {
                    let o = !1;
                    s !== w && (ve.bindFramebuffer(36160, s), (o = !0));
                    try {
                        const s = e.texture,
                            l = s.format,
                            c = s.type;
                        if (l !== b && ge.convert(l) !== ve.getParameter(35739)) return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
                        if (
                            !(
                                c === m ||
                                ge.convert(c) === ve.getParameter(35738) ||
                                (c === v && (J.isWebGL2 || Z.get("OES_texture_float") || Z.get("WEBGL_color_buffer_float"))) ||
                                (c === _ && (J.isWebGL2 ? Z.get("EXT_color_buffer_float") : Z.get("EXT_color_buffer_half_float")))
                            )
                        )
                            return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
                        36053 === ve.checkFramebufferStatus(36160)
                            ? t >= 0 && t <= e.width - i && n >= 0 && n <= e.height - r && ve.readPixels(t, n, i, r, ge.convert(l), ge.convert(c), a)
                            : console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.");
                    } finally {
                        o && ve.bindFramebuffer(36160, w);
                    }
                }
            }),
            (this.copyFramebufferToTexture = function (e, t, n) {
                void 0 === n && (n = 0);
                const i = Math.pow(2, -n),
                    r = Math.floor(t.image.width * i),
                    a = Math.floor(t.image.height * i),
                    o = ge.convert(t.format);
                te.setTexture2D(t, 0), ve.copyTexImage2D(3553, n, o, e.x, e.y, r, a, 0), K.unbindTexture();
            }),
            (this.copyTextureToTexture = function (e, t, n, i) {
                void 0 === i && (i = 0);
                const r = t.image.width,
                    a = t.image.height,
                    o = ge.convert(n.format),
                    s = ge.convert(n.type);
                te.setTexture2D(n, 0),
                    ve.pixelStorei(37440, n.flipY),
                    ve.pixelStorei(37441, n.premultiplyAlpha),
                    ve.pixelStorei(3317, n.unpackAlignment),
                    t.isDataTexture
                        ? ve.texSubImage2D(3553, i, e.x, e.y, r, a, o, s, t.image.data)
                        : t.isCompressedTexture
                        ? ve.compressedTexSubImage2D(3553, i, e.x, e.y, t.mipmaps[0].width, t.mipmaps[0].height, o, t.mipmaps[0].data)
                        : ve.texSubImage2D(3553, i, e.x, e.y, o, s, t.image),
                    0 === i && n.generateMipmaps && ve.generateMipmap(3553),
                    K.unbindTexture();
            }),
            (this.initTexture = function (e) {
                te.setTexture2D(e, 0), K.unbindTexture();
            }),
            "undefined" != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
    }
    (xr.prototype = Object.assign(Object.create(sn.prototype), { constructor: xr, isArrayCamera: !0 })),
        (vr.prototype = Object.assign(Object.create(Ge.prototype), { constructor: vr, isGroup: !0 })),
        Object.assign(_r.prototype, {
            constructor: _r,
            getHandSpace: function () {
                if (null === this._hand && ((this._hand = new vr()), (this._hand.matrixAutoUpdate = !1), (this._hand.visible = !1), (this._hand.joints = []), (this._hand.inputState = { pinching: !1 }), window.XRHand))
                    for (let e = 0; e <= window.XRHand.LITTLE_PHALANX_TIP; e++) {
                        const e = new vr();
                        (e.matrixAutoUpdate = !1), (e.visible = !1), this._hand.joints.push(e), this._hand.add(e);
                    }
                return this._hand;
            },
            getTargetRaySpace: function () {
                return null === this._targetRay && ((this._targetRay = new vr()), (this._targetRay.matrixAutoUpdate = !1), (this._targetRay.visible = !1)), this._targetRay;
            },
            getGripSpace: function () {
                return null === this._grip && ((this._grip = new vr()), (this._grip.matrixAutoUpdate = !1), (this._grip.visible = !1)), this._grip;
            },
            dispatchEvent: function (e) {
                return null !== this._targetRay && this._targetRay.dispatchEvent(e), null !== this._grip && this._grip.dispatchEvent(e), null !== this._hand && this._hand.dispatchEvent(e), this;
            },
            disconnect: function (e) {
                return (
                    this.dispatchEvent({ type: "disconnected", data: e }), null !== this._targetRay && (this._targetRay.visible = !1), null !== this._grip && (this._grip.visible = !1), null !== this._hand && (this._hand.visible = !1), this
                );
            },
            update: function (e, t, n) {
                let i = null,
                    r = null,
                    a = null;
                const o = this._targetRay,
                    s = this._grip,
                    l = this._hand;
                if (e)
                    if (l && e.hand) {
                        a = !0;
                        for (let i = 0; i <= window.XRHand.LITTLE_PHALANX_TIP; i++)
                            if (e.hand[i]) {
                                const r = t.getJointPose(e.hand[i], n),
                                    a = l.joints[i];
                                null !== r && (a.matrix.fromArray(r.transform.matrix), a.matrix.decompose(a.position, a.rotation, a.scale), (a.jointRadius = r.radius)), (a.visible = null !== r);
                                const o = l.joints[window.XRHand.INDEX_PHALANX_TIP],
                                    s = l.joints[window.XRHand.THUMB_PHALANX_TIP],
                                    c = o.position.distanceTo(s.position),
                                    h = 0.02,
                                    d = 0.005;
                                l.inputState.pinching && c > h + d
                                    ? ((l.inputState.pinching = !1), this.dispatchEvent({ type: "pinchend", handedness: e.handedness, target: this }))
                                    : !l.inputState.pinching && c <= h - d && ((l.inputState.pinching = !0), this.dispatchEvent({ type: "pinchstart", handedness: e.handedness, target: this }));
                            }
                    } else
                        null !== o && ((i = t.getPose(e.targetRaySpace, n)), null !== i && (o.matrix.fromArray(i.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale))),
                            null !== s && e.gripSpace && ((r = t.getPose(e.gripSpace, n)), null !== r && (s.matrix.fromArray(r.transform.matrix), s.matrix.decompose(s.position, s.rotation, s.scale)));
                return null !== o && (o.visible = null !== i), null !== s && (s.visible = null !== r), null !== l && (l.visible = null !== a), this;
            },
        }),
        Object.assign(yr.prototype, E.prototype);
    class wr extends Ge {
        constructor() {
            super(),
                Object.defineProperty(this, "isScene", { value: !0 }),
                (this.type = "Scene"),
                (this.background = null),
                (this.environment = null),
                (this.fog = null),
                (this.overrideMaterial = null),
                (this.autoUpdate = !0),
                "undefined" != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
        }
        copy(e, t) {
            return (
                super.copy(e, t),
                null !== e.background && (this.background = e.background.clone()),
                null !== e.environment && (this.environment = e.environment.clone()),
                null !== e.fog && (this.fog = e.fog.clone()),
                null !== e.overrideMaterial && (this.overrideMaterial = e.overrideMaterial.clone()),
                (this.autoUpdate = e.autoUpdate),
                (this.matrixAutoUpdate = e.matrixAutoUpdate),
                this
            );
        }
        toJSON(e) {
            const t = super.toJSON(e);
            return null !== this.background && (t.object.background = this.background.toJSON(e)), null !== this.environment && (t.object.environment = this.environment.toJSON(e)), null !== this.fog && (t.object.fog = this.fog.toJSON()), t;
        }
    }
    let Ar = 0;
    const Sr = new pe(),
        Tr = new Ge(),
        Lr = new H();
    function Er() {
        Object.defineProperty(this, "id", { value: (Ar += 2) }),
            (this.uuid = N.generateUUID()),
            (this.name = ""),
            (this.type = "Geometry"),
            (this.vertices = []),
            (this.colors = []),
            (this.faces = []),
            (this.faceVertexUvs = [[]]),
            (this.morphTargets = []),
            (this.morphNormals = []),
            (this.skinWeights = []),
            (this.skinIndices = []),
            (this.lineDistances = []),
            (this.boundingBox = null),
            (this.boundingSphere = null),
            (this.elementsNeedUpdate = !1),
            (this.verticesNeedUpdate = !1),
            (this.uvsNeedUpdate = !1),
            (this.normalsNeedUpdate = !1),
            (this.colorsNeedUpdate = !1),
            (this.lineDistancesNeedUpdate = !1),
            (this.groupsNeedUpdate = !1);
    }
    Er.prototype = Object.assign(Object.create(E.prototype), {
        constructor: Er,
        isGeometry: !0,
        applyMatrix4: function (e) {
            const t = new I().getNormalMatrix(e);
            for (let t = 0, n = this.vertices.length; t < n; t++) {
                this.vertices[t].applyMatrix4(e);
            }
            for (let e = 0, n = this.faces.length; e < n; e++) {
                const n = this.faces[e];
                n.normal.applyMatrix3(t).normalize();
                for (let e = 0, i = n.vertexNormals.length; e < i; e++) n.vertexNormals[e].applyMatrix3(t).normalize();
            }
            return null !== this.boundingBox && this.computeBoundingBox(), null !== this.boundingSphere && this.computeBoundingSphere(), (this.verticesNeedUpdate = !0), (this.normalsNeedUpdate = !0), this;
        },
        rotateX: function (e) {
            return Sr.makeRotationX(e), this.applyMatrix4(Sr), this;
        },
        rotateY: function (e) {
            return Sr.makeRotationY(e), this.applyMatrix4(Sr), this;
        },
        rotateZ: function (e) {
            return Sr.makeRotationZ(e), this.applyMatrix4(Sr), this;
        },
        translate: function (e, t, n) {
            return Sr.makeTranslation(e, t, n), this.applyMatrix4(Sr), this;
        },
        scale: function (e, t, n) {
            return Sr.makeScale(e, t, n), this.applyMatrix4(Sr), this;
        },
        lookAt: function (e) {
            return Tr.lookAt(e), Tr.updateMatrix(), this.applyMatrix4(Tr.matrix), this;
        },
        fromBufferGeometry: function (e) {
            const t = this,
                n = null !== e.index ? e.index : void 0,
                i = e.attributes;
            if (void 0 === i.position) return console.error("THREE.Geometry.fromBufferGeometry(): Position attribute required for conversion."), this;
            const r = i.position,
                a = i.normal,
                o = i.color,
                s = i.uv,
                l = i.uv2;
            void 0 !== l && (this.faceVertexUvs[1] = []);
            for (let e = 0; e < r.count; e++) t.vertices.push(new H().fromBufferAttribute(r, e)), void 0 !== o && t.colors.push(new st().fromBufferAttribute(o, e));
            function c(e, n, i, r) {
                const c = void 0 === o ? [] : [t.colors[e].clone(), t.colors[n].clone(), t.colors[i].clone()],
                    h = void 0 === a ? [] : [new H().fromBufferAttribute(a, e), new H().fromBufferAttribute(a, n), new H().fromBufferAttribute(a, i)],
                    d = new lt(e, n, i, h, c, r);
                t.faces.push(d),
                    void 0 !== s && t.faceVertexUvs[0].push([new C().fromBufferAttribute(s, e), new C().fromBufferAttribute(s, n), new C().fromBufferAttribute(s, i)]),
                    void 0 !== l && t.faceVertexUvs[1].push([new C().fromBufferAttribute(l, e), new C().fromBufferAttribute(l, n), new C().fromBufferAttribute(l, i)]);
            }
            const h = e.groups;
            if (h.length > 0)
                for (let e = 0; e < h.length; e++) {
                    const t = h[e],
                        i = t.start;
                    for (let e = i, r = i + t.count; e < r; e += 3) void 0 !== n ? c(n.getX(e), n.getX(e + 1), n.getX(e + 2), t.materialIndex) : c(e, e + 1, e + 2, t.materialIndex);
                }
            else if (void 0 !== n) for (let e = 0; e < n.count; e += 3) c(n.getX(e), n.getX(e + 1), n.getX(e + 2));
            else for (let e = 0; e < r.count; e += 3) c(e, e + 1, e + 2);
            return this.computeFaceNormals(), null !== e.boundingBox && (this.boundingBox = e.boundingBox.clone()), null !== e.boundingSphere && (this.boundingSphere = e.boundingSphere.clone()), this;
        },
        center: function () {
            return this.computeBoundingBox(), this.boundingBox.getCenter(Lr).negate(), this.translate(Lr.x, Lr.y, Lr.z), this;
        },
        normalize: function () {
            this.computeBoundingSphere();
            const e = this.boundingSphere.center,
                t = this.boundingSphere.radius,
                n = 0 === t ? 1 : 1 / t,
                i = new pe();
            return i.set(n, 0, 0, -n * e.x, 0, n, 0, -n * e.y, 0, 0, n, -n * e.z, 0, 0, 0, 1), this.applyMatrix4(i), this;
        },
        computeFaceNormals: function () {
            const e = new H(),
                t = new H();
            for (let n = 0, i = this.faces.length; n < i; n++) {
                const i = this.faces[n],
                    r = this.vertices[i.a],
                    a = this.vertices[i.b],
                    o = this.vertices[i.c];
                e.subVectors(o, a), t.subVectors(r, a), e.cross(t), e.normalize(), i.normal.copy(e);
            }
        },
        computeVertexNormals: function (e) {
            void 0 === e && (e = !0);
            const t = new Array(this.vertices.length);
            for (let e = 0, n = this.vertices.length; e < n; e++) t[e] = new H();
            if (e) {
                const e = new H(),
                    n = new H();
                for (let i = 0, r = this.faces.length; i < r; i++) {
                    const r = this.faces[i],
                        a = this.vertices[r.a],
                        o = this.vertices[r.b],
                        s = this.vertices[r.c];
                    e.subVectors(s, o), n.subVectors(a, o), e.cross(n), t[r.a].add(e), t[r.b].add(e), t[r.c].add(e);
                }
            } else {
                this.computeFaceNormals();
                for (let e = 0, n = this.faces.length; e < n; e++) {
                    const n = this.faces[e];
                    t[n.a].add(n.normal), t[n.b].add(n.normal), t[n.c].add(n.normal);
                }
            }
            for (let e = 0, n = this.vertices.length; e < n; e++) t[e].normalize();
            for (let e = 0, n = this.faces.length; e < n; e++) {
                const n = this.faces[e],
                    i = n.vertexNormals;
                3 === i.length ? (i[0].copy(t[n.a]), i[1].copy(t[n.b]), i[2].copy(t[n.c])) : ((i[0] = t[n.a].clone()), (i[1] = t[n.b].clone()), (i[2] = t[n.c].clone()));
            }
            this.faces.length > 0 && (this.normalsNeedUpdate = !0);
        },
        computeFlatVertexNormals: function () {
            this.computeFaceNormals();
            for (let e = 0, t = this.faces.length; e < t; e++) {
                const t = this.faces[e],
                    n = t.vertexNormals;
                3 === n.length ? (n[0].copy(t.normal), n[1].copy(t.normal), n[2].copy(t.normal)) : ((n[0] = t.normal.clone()), (n[1] = t.normal.clone()), (n[2] = t.normal.clone()));
            }
            this.faces.length > 0 && (this.normalsNeedUpdate = !0);
        },
        computeMorphNormals: function () {
            for (let e = 0, t = this.faces.length; e < t; e++) {
                const t = this.faces[e];
                t.__originalFaceNormal ? t.__originalFaceNormal.copy(t.normal) : (t.__originalFaceNormal = t.normal.clone()), t.__originalVertexNormals || (t.__originalVertexNormals = []);
                for (let e = 0, n = t.vertexNormals.length; e < n; e++) t.__originalVertexNormals[e] ? t.__originalVertexNormals[e].copy(t.vertexNormals[e]) : (t.__originalVertexNormals[e] = t.vertexNormals[e].clone());
            }
            const e = new Er();
            e.faces = this.faces;
            for (let t = 0, n = this.morphTargets.length; t < n; t++) {
                if (!this.morphNormals[t]) {
                    (this.morphNormals[t] = {}), (this.morphNormals[t].faceNormals = []), (this.morphNormals[t].vertexNormals = []);
                    const e = this.morphNormals[t].faceNormals,
                        n = this.morphNormals[t].vertexNormals;
                    for (let t = 0, i = this.faces.length; t < i; t++) {
                        const t = new H(),
                            i = { a: new H(), b: new H(), c: new H() };
                        e.push(t), n.push(i);
                    }
                }
                const n = this.morphNormals[t];
                (e.vertices = this.morphTargets[t].vertices), e.computeFaceNormals(), e.computeVertexNormals();
                for (let e = 0, t = this.faces.length; e < t; e++) {
                    const t = this.faces[e],
                        i = n.faceNormals[e],
                        r = n.vertexNormals[e];
                    i.copy(t.normal), r.a.copy(t.vertexNormals[0]), r.b.copy(t.vertexNormals[1]), r.c.copy(t.vertexNormals[2]);
                }
            }
            for (let e = 0, t = this.faces.length; e < t; e++) {
                const t = this.faces[e];
                (t.normal = t.__originalFaceNormal), (t.vertexNormals = t.__originalVertexNormals);
            }
        },
        computeBoundingBox: function () {
            null === this.boundingBox && (this.boundingBox = new W()), this.boundingBox.setFromPoints(this.vertices);
        },
        computeBoundingSphere: function () {
            null === this.boundingSphere && (this.boundingSphere = new oe()), this.boundingSphere.setFromPoints(this.vertices);
        },
        merge: function (e, t, n) {
            if (!e || !e.isGeometry) return void console.error("THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.", e);
            let i;
            const r = this.vertices.length,
                a = this.vertices,
                o = e.vertices,
                s = this.faces,
                l = e.faces,
                c = this.colors,
                h = e.colors;
            void 0 === n && (n = 0), void 0 !== t && (i = new I().getNormalMatrix(t));
            for (let e = 0, n = o.length; e < n; e++) {
                const n = o[e].clone();
                void 0 !== t && n.applyMatrix4(t), a.push(n);
            }
            for (let e = 0, t = h.length; e < t; e++) c.push(h[e].clone());
            for (let e = 0, t = l.length; e < t; e++) {
                const t = l[e];
                let a, o;
                const c = t.vertexNormals,
                    h = t.vertexColors,
                    d = new lt(t.a + r, t.b + r, t.c + r);
                d.normal.copy(t.normal), void 0 !== i && d.normal.applyMatrix3(i).normalize();
                for (let e = 0, t = c.length; e < t; e++) (a = c[e].clone()), void 0 !== i && a.applyMatrix3(i).normalize(), d.vertexNormals.push(a);
                d.color.copy(t.color);
                for (let e = 0, t = h.length; e < t; e++) (o = h[e]), d.vertexColors.push(o.clone());
                (d.materialIndex = t.materialIndex + n), s.push(d);
            }
            for (let t = 0, n = e.faceVertexUvs.length; t < n; t++) {
                const n = e.faceVertexUvs[t];
                void 0 === this.faceVertexUvs[t] && (this.faceVertexUvs[t] = []);
                for (let e = 0, i = n.length; e < i; e++) {
                    const i = n[e],
                        r = [];
                    for (let e = 0, t = i.length; e < t; e++) r.push(i[e].clone());
                    this.faceVertexUvs[t].push(r);
                }
            }
        },
        mergeMesh: function (e) {
            e && e.isMesh ? (e.matrixAutoUpdate && e.updateMatrix(), this.merge(e.geometry, e.matrix)) : console.error("THREE.Geometry.mergeMesh(): mesh not an instance of THREE.Mesh.", e);
        },
        mergeVertices: function () {
            const e = {},
                t = [],
                n = [],
                i = Math.pow(10, 4);
            for (let r = 0, a = this.vertices.length; r < a; r++) {
                const a = this.vertices[r],
                    o = Math.round(a.x * i) + "_" + Math.round(a.y * i) + "_" + Math.round(a.z * i);
                void 0 === e[o] ? ((e[o] = r), t.push(this.vertices[r]), (n[r] = t.length - 1)) : (n[r] = n[e[o]]);
            }
            const r = [];
            for (let e = 0, t = this.faces.length; e < t; e++) {
                const t = this.faces[e];
                (t.a = n[t.a]), (t.b = n[t.b]), (t.c = n[t.c]);
                const i = [t.a, t.b, t.c];
                for (let t = 0; t < 3; t++)
                    if (i[t] === i[(t + 1) % 3]) {
                        r.push(e);
                        break;
                    }
            }
            for (let e = r.length - 1; e >= 0; e--) {
                const t = r[e];
                this.faces.splice(t, 1);
                for (let e = 0, n = this.faceVertexUvs.length; e < n; e++) this.faceVertexUvs[e].splice(t, 1);
            }
            const a = this.vertices.length - t.length;
            return (this.vertices = t), a;
        },
        setFromPoints: function (e) {
            this.vertices = [];
            for (let t = 0, n = e.length; t < n; t++) {
                const n = e[t];
                this.vertices.push(new H(n.x, n.y, n.z || 0));
            }
            return this;
        },
        sortFacesByMaterialIndex: function () {
            const e = this.faces,
                t = e.length;
            for (let n = 0; n < t; n++) e[n]._id = n;
            e.sort(function (e, t) {
                return e.materialIndex - t.materialIndex;
            });
            const n = this.faceVertexUvs[0],
                i = this.faceVertexUvs[1];
            let r, a;
            n && n.length === t && (r = []), i && i.length === t && (a = []);
            for (let o = 0; o < t; o++) {
                const t = e[o]._id;
                r && r.push(n[t]), a && a.push(i[t]);
            }
            r && (this.faceVertexUvs[0] = r), a && (this.faceVertexUvs[1] = a);
        },
        toJSON: function () {
            const e = { metadata: { version: 4.5, type: "Geometry", generator: "Geometry.toJSON" } };
            if (((e.uuid = this.uuid), (e.type = this.type), "" !== this.name && (e.name = this.name), void 0 !== this.parameters)) {
                const t = this.parameters;
                for (const n in t) void 0 !== t[n] && (e[n] = t[n]);
                return e;
            }
            const t = [];
            for (let e = 0; e < this.vertices.length; e++) {
                const n = this.vertices[e];
                t.push(n.x, n.y, n.z);
            }
            const n = [],
                i = [],
                r = {},
                a = [],
                o = {},
                s = [],
                l = {};
            for (let e = 0; e < this.faces.length; e++) {
                const t = this.faces[e],
                    i = !0,
                    r = !1,
                    a = void 0 !== this.faceVertexUvs[0][e],
                    o = t.normal.length() > 0,
                    s = t.vertexNormals.length > 0,
                    l = 1 !== t.color.r || 1 !== t.color.g || 1 !== t.color.b,
                    f = t.vertexColors.length > 0;
                let p = 0;
                if (((p = c(p, 0, 0)), (p = c(p, 1, i)), (p = c(p, 2, r)), (p = c(p, 3, a)), (p = c(p, 4, o)), (p = c(p, 5, s)), (p = c(p, 6, l)), (p = c(p, 7, f)), n.push(p), n.push(t.a, t.b, t.c), n.push(t.materialIndex), a)) {
                    const t = this.faceVertexUvs[0][e];
                    n.push(u(t[0]), u(t[1]), u(t[2]));
                }
                if ((o && n.push(h(t.normal)), s)) {
                    const e = t.vertexNormals;
                    n.push(h(e[0]), h(e[1]), h(e[2]));
                }
                if ((l && n.push(d(t.color)), f)) {
                    const e = t.vertexColors;
                    n.push(d(e[0]), d(e[1]), d(e[2]));
                }
            }
            function c(e, t, n) {
                return n ? e | (1 << t) : e & ~(1 << t);
            }
            function h(e) {
                const t = e.x.toString() + e.y.toString() + e.z.toString();
                return void 0 !== r[t] || ((r[t] = i.length / 3), i.push(e.x, e.y, e.z)), r[t];
            }
            function d(e) {
                const t = e.r.toString() + e.g.toString() + e.b.toString();
                return void 0 !== o[t] || ((o[t] = a.length), a.push(e.getHex())), o[t];
            }
            function u(e) {
                const t = e.x.toString() + e.y.toString();
                return void 0 !== l[t] || ((l[t] = s.length / 2), s.push(e.x, e.y)), l[t];
            }
            return (e.data = {}), (e.data.vertices = t), (e.data.normals = i), a.length > 0 && (e.data.colors = a), s.length > 0 && (e.data.uvs = [s]), (e.data.faces = n), e;
        },
        clone: function () {
            return new Er().copy(this);
        },
        copy: function (e) {
            (this.vertices = []),
                (this.colors = []),
                (this.faces = []),
                (this.faceVertexUvs = [[]]),
                (this.morphTargets = []),
                (this.morphNormals = []),
                (this.skinWeights = []),
                (this.skinIndices = []),
                (this.lineDistances = []),
                (this.boundingBox = null),
                (this.boundingSphere = null),
                (this.name = e.name);
            const t = e.vertices;
            for (let e = 0, n = t.length; e < n; e++) this.vertices.push(t[e].clone());
            const n = e.colors;
            for (let e = 0, t = n.length; e < t; e++) this.colors.push(n[e].clone());
            const i = e.faces;
            for (let e = 0, t = i.length; e < t; e++) this.faces.push(i[e].clone());
            for (let t = 0, n = e.faceVertexUvs.length; t < n; t++) {
                const n = e.faceVertexUvs[t];
                void 0 === this.faceVertexUvs[t] && (this.faceVertexUvs[t] = []);
                for (let e = 0, i = n.length; e < i; e++) {
                    const i = n[e],
                        r = [];
                    for (let e = 0, t = i.length; e < t; e++) {
                        const t = i[e];
                        r.push(t.clone());
                    }
                    this.faceVertexUvs[t].push(r);
                }
            }
            const r = e.morphTargets;
            for (let e = 0, t = r.length; e < t; e++) {
                const t = {};
                if (((t.name = r[e].name), void 0 !== r[e].vertices)) {
                    t.vertices = [];
                    for (let n = 0, i = r[e].vertices.length; n < i; n++) t.vertices.push(r[e].vertices[n].clone());
                }
                if (void 0 !== r[e].normals) {
                    t.normals = [];
                    for (let n = 0, i = r[e].normals.length; n < i; n++) t.normals.push(r[e].normals[n].clone());
                }
                this.morphTargets.push(t);
            }
            const a = e.morphNormals;
            for (let e = 0, t = a.length; e < t; e++) {
                const t = {};
                if (void 0 !== a[e].vertexNormals) {
                    t.vertexNormals = [];
                    for (let n = 0, i = a[e].vertexNormals.length; n < i; n++) {
                        const i = a[e].vertexNormals[n],
                            r = {};
                        (r.a = i.a.clone()), (r.b = i.b.clone()), (r.c = i.c.clone()), t.vertexNormals.push(r);
                    }
                }
                if (void 0 !== a[e].faceNormals) {
                    t.faceNormals = [];
                    for (let n = 0, i = a[e].faceNormals.length; n < i; n++) t.faceNormals.push(a[e].faceNormals[n].clone());
                }
                this.morphNormals.push(t);
            }
            const o = e.skinWeights;
            for (let e = 0, t = o.length; e < t; e++) this.skinWeights.push(o[e].clone());
            const s = e.skinIndices;
            for (let e = 0, t = s.length; e < t; e++) this.skinIndices.push(s[e].clone());
            const l = e.lineDistances;
            for (let e = 0, t = l.length; e < t; e++) this.lineDistances.push(l[e]);
            const c = e.boundingBox;
            null !== c && (this.boundingBox = c.clone());
            const h = e.boundingSphere;
            return (
                null !== h && (this.boundingSphere = h.clone()),
                (this.elementsNeedUpdate = e.elementsNeedUpdate),
                (this.verticesNeedUpdate = e.verticesNeedUpdate),
                (this.uvsNeedUpdate = e.uvsNeedUpdate),
                (this.normalsNeedUpdate = e.normalsNeedUpdate),
                (this.colorsNeedUpdate = e.colorsNeedUpdate),
                (this.lineDistancesNeedUpdate = e.lineDistancesNeedUpdate),
                (this.groupsNeedUpdate = e.groupsNeedUpdate),
                this
            );
        },
        dispose: function () {
            this.dispatchEvent({ type: "dispose" });
        },
    });
    class Pr extends Er {
        constructor(e, t, n, i, r, a) {
            super(), (this.type = "BoxGeometry"), (this.parameters = { width: e, height: t, depth: n, widthSegments: i, heightSegments: r, depthSegments: a }), this.fromBufferGeometry(new en(e, t, n, i, r, a)), this.mergeVertices();
        }
    }
    function Fr(e, t, n, i, r, a) {
        on.call(this),
            (this.type = "OrthographicCamera"),
            (this.zoom = 1),
            (this.view = null),
            (this.left = void 0 !== e ? e : -1),
            (this.right = void 0 !== t ? t : 1),
            (this.top = void 0 !== n ? n : 1),
            (this.bottom = void 0 !== i ? i : -1),
            (this.near = void 0 !== r ? r : 0.1),
            (this.far = void 0 !== a ? a : 2e3),
            this.updateProjectionMatrix();
    }
    Fr.prototype = Object.assign(Object.create(on.prototype), {
        constructor: Fr,
        isOrthographicCamera: !0,
        copy: function (e, t) {
            return (
                on.prototype.copy.call(this, e, t),
                (this.left = e.left),
                (this.right = e.right),
                (this.top = e.top),
                (this.bottom = e.bottom),
                (this.near = e.near),
                (this.far = e.far),
                (this.zoom = e.zoom),
                (this.view = null === e.view ? null : Object.assign({}, e.view)),
                this
            );
        },
        setViewOffset: function (e, t, n, i, r, a) {
            null === this.view && (this.view = { enabled: !0, fullWidth: 1, fullHeight: 1, offsetX: 0, offsetY: 0, width: 1, height: 1 }),
                (this.view.enabled = !0),
                (this.view.fullWidth = e),
                (this.view.fullHeight = t),
                (this.view.offsetX = n),
                (this.view.offsetY = i),
                (this.view.width = r),
                (this.view.height = a),
                this.updateProjectionMatrix();
        },
        clearViewOffset: function () {
            null !== this.view && (this.view.enabled = !1), this.updateProjectionMatrix();
        },
        updateProjectionMatrix: function () {
            const e = (this.right - this.left) / (2 * this.zoom),
                t = (this.top - this.bottom) / (2 * this.zoom),
                n = (this.right + this.left) / 2,
                i = (this.top + this.bottom) / 2;
            let r = n - e,
                a = n + e,
                o = i + t,
                s = i - t;
            if (null !== this.view && this.view.enabled) {
                const e = (this.right - this.left) / this.view.fullWidth / this.zoom,
                    t = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
                (r += e * this.view.offsetX), (a = r + e * this.view.width), (o -= t * this.view.offsetY), (s = o - t * this.view.height);
            }
            this.projectionMatrix.makeOrthographic(r, a, o, s, this.near, this.far), this.projectionMatrixInverse.getInverse(this.projectionMatrix);
        },
        toJSON: function (e) {
            const t = Ge.prototype.toJSON.call(this, e);
            return (
                (t.object.zoom = this.zoom),
                (t.object.left = this.left),
                (t.object.right = this.right),
                (t.object.top = this.top),
                (t.object.bottom = this.bottom),
                (t.object.near = this.near),
                (t.object.far = this.far),
                null !== this.view && (t.object.view = Object.assign({}, this.view)),
                t
            );
        },
    });
    class Nr {
        constructor(e) {
            (this.autoStart = void 0 === e || e), (this.startTime = 0), (this.oldTime = 0), (this.elapsedTime = 0), (this.running = !1);
        }
        start() {
            (this.startTime = ("undefined" == typeof performance ? Date : performance).now()), (this.oldTime = this.startTime), (this.elapsedTime = 0), (this.running = !0);
        }
        stop() {
            this.getElapsedTime(), (this.running = !1), (this.autoStart = !1);
        }
        getElapsedTime() {
            return this.getDelta(), this.elapsedTime;
        }
        getDelta() {
            let e = 0;
            if (this.autoStart && !this.running) return this.start(), 0;
            if (this.running) {
                const t = ("undefined" == typeof performance ? Date : performance).now();
                (e = (t - this.oldTime) / 1e3), (this.oldTime = t), (this.elapsedTime += e);
            }
            return e;
        }
    }
    class Cr {
        constructor(e = 1, t = 0, n = 0) {
            return (this.radius = e), (this.phi = t), (this.theta = n), this;
        }
        set(e, t, n) {
            return (this.radius = e), (this.phi = t), (this.theta = n), this;
        }
        clone() {
            return new this.constructor().copy(this);
        }
        copy(e) {
            return (this.radius = e.radius), (this.phi = e.phi), (this.theta = e.theta), this;
        }
        makeSafe() {
            const e = 1e-6;
            return (this.phi = Math.max(e, Math.min(Math.PI - e, this.phi))), this;
        }
        setFromVector3(e) {
            return this.setFromCartesianCoords(e.x, e.y, e.z);
        }
        setFromCartesianCoords(e, t, n) {
            return (this.radius = Math.sqrt(e * e + t * t + n * n)), 0 === this.radius ? ((this.theta = 0), (this.phi = 0)) : ((this.theta = Math.atan2(e, n)), (this.phi = Math.acos(N.clamp(t / this.radius, -1, 1)))), this;
        }
    }
    function Ir(e, t, n, i, r, a, o, s) {
        const l = (e, t, n, i) => [new C(e / o, 1 - i / s), new C(n / o, 1 - i / s), new C(n / o, 1 - t / s), new C(e / o, 1 - t / s)],
            c = l(t + a, n, t + i + a, n + a),
            h = l(t + i + a, n, t + 2 * i + a, n + a),
            d = l(t, n + a, t + a, n + a + r),
            u = l(t + a, n + a, t + i + a, n + a + r),
            f = l(t + i + a, n + a, t + i + 2 * a, n + r + a),
            p = l(t + i + 2 * a, n + a, t + 2 * i + 2 * a, n + r + a);
        e.faceVertexUvs[0] = [
            [f[3], f[0], f[2]],
            [f[0], f[1], f[2]],
            [d[3], d[0], d[2]],
            [d[0], d[1], d[2]],
            [c[3], c[0], c[2]],
            [c[0], c[1], c[2]],
            [h[0], h[3], h[1]],
            [h[3], h[2], h[1]],
            [u[3], u[0], u[2]],
            [u[0], u[1], u[2]],
            [p[3], p[0], p[2]],
            [p[0], p[1], p[2]],
        ];
    }
    function Rr(e, t, n, i, r, a) {
        Ir(e, t, n, i, r, a, 64, 64);
    }
    function Dr(e, t, n, i, r, a) {
        Ir(e, t, n, i, r, a, 64, 32);
    }
    class Ur extends vr {
        constructor(e, t) {
            super(), (this.innerLayer = e), (this.outerLayer = t), (e.name = "inner"), (t.name = "outer");
        }
    }
    class Or extends vr {
        constructor(e) {
            super(), (this.modelListeners = []), (this.slim = !1);
            const t = new dt({ map: e, side: 0 }),
                n = new dt({ map: e, side: 2, transparent: !0, alphaTest: 1e-5 }),
                i = t.clone();
            (i.polygonOffset = !0), (i.polygonOffsetFactor = 1), (i.polygonOffsetUnits = 1);
            const r = n.clone();
            (r.polygonOffset = !0), (r.polygonOffsetFactor = 1), (r.polygonOffsetUnits = 1);
            const a = new Pr(8, 8, 8);
            Rr(a, 0, 0, 8, 8, 8);
            const o = new Jt(a, t),
                s = new Pr(9, 9, 9);
            Rr(s, 32, 0, 8, 8, 8);
            const l = new Jt(s, n);
            (this.head = new Ur(o, l)), (this.head.name = "head"), this.head.add(o, l), (this.head.position.y = 4), this.add(this.head);
            const c = new Pr(8, 12, 4);
            Rr(c, 16, 16, 8, 12, 4);
            const h = new Jt(c, t),
                d = new Pr(8.5, 12.5, 4.5);
            Rr(d, 16, 32, 8, 12, 4);
            const u = new Jt(d, n);
            (this.body = new Ur(h, u)), (this.body.name = "body"), this.body.add(h, u), (this.body.position.y = -6), this.add(this.body);
            const f = new Pr(),
                p = new Jt(f, i);
            this.modelListeners.push(() => {
                (p.scale.x = this.slim ? 3 : 4), (p.scale.y = 12), (p.scale.z = 4), Rr(f, 40, 16, this.slim ? 3 : 4, 12, 4), (f.uvsNeedUpdate = !0), (f.elementsNeedUpdate = !0);
            });
            const m = new Pr(),
                g = new Jt(m, r);
            this.modelListeners.push(() => {
                (g.scale.x = this.slim ? 3.5 : 4.5), (g.scale.y = 12.5), (g.scale.z = 4.5), Rr(m, 40, 32, this.slim ? 3 : 4, 12, 4), (m.uvsNeedUpdate = !0), (m.elementsNeedUpdate = !0);
            });
            const x = new vr();
            x.add(p, g),
                this.modelListeners.push(() => {
                    x.position.x = this.slim ? -0.5 : -1;
                }),
                (x.position.y = -4),
                (this.rightArm = new Ur(p, g)),
                (this.rightArm.name = "rightArm"),
                this.rightArm.add(x),
                (this.rightArm.position.x = -5),
                (this.rightArm.position.y = -2),
                this.add(this.rightArm);
            const v = new Pr(),
                _ = new Jt(v, i);
            this.modelListeners.push(() => {
                (_.scale.x = this.slim ? 3 : 4), (_.scale.y = 12), (_.scale.z = 4), Rr(v, 32, 48, this.slim ? 3 : 4, 12, 4), (v.uvsNeedUpdate = !0), (v.elementsNeedUpdate = !0);
            });
            const y = new Pr(),
                M = new Jt(y, r);
            this.modelListeners.push(() => {
                (M.scale.x = this.slim ? 3.5 : 4.5), (M.scale.y = 12.5), (M.scale.z = 4.5), Rr(y, 48, 48, this.slim ? 3 : 4, 12, 4), (y.uvsNeedUpdate = !0), (y.elementsNeedUpdate = !0);
            });
            const b = new vr();
            b.add(_, M),
                this.modelListeners.push(() => {
                    b.position.x = this.slim ? 0.5 : 1;
                }),
                (b.position.y = -4),
                (this.leftArm = new Ur(_, M)),
                (this.leftArm.name = "leftArm"),
                this.leftArm.add(b),
                (this.leftArm.position.x = 5),
                (this.leftArm.position.y = -2),
                this.add(this.leftArm);
            const w = new Pr(4, 12, 4);
            Rr(w, 0, 16, 4, 12, 4);
            const A = new Jt(w, i),
                S = new Pr(4.5, 12.5, 4.5);
            Rr(S, 0, 32, 4, 12, 4);
            const T = new Jt(S, r),
                L = new vr();
            L.add(A, T),
                (L.position.y = -6),
                (this.rightLeg = new Ur(A, T)),
                (this.rightLeg.name = "rightLeg"),
                this.rightLeg.add(L),
                (this.rightLeg.position.x = -1.9),
                (this.rightLeg.position.y = -12),
                (this.rightLeg.position.z = -0.1),
                this.add(this.rightLeg);
            const E = new Pr(4, 12, 4);
            Rr(E, 16, 48, 4, 12, 4);
            const P = new Jt(E, i),
                F = new Pr(4.5, 12.5, 4.5);
            Rr(F, 0, 48, 4, 12, 4);
            const N = new Jt(F, r),
                C = new vr();
            C.add(P, N),
                (C.position.y = -6),
                (this.leftLeg = new Ur(P, N)),
                (this.leftLeg.name = "leftLeg"),
                this.leftLeg.add(C),
                (this.leftLeg.position.x = 1.9),
                (this.leftLeg.position.y = -12),
                (this.leftLeg.position.z = -0.1),
                this.add(this.leftLeg),
                (this.modelType = "default");
        }
        get modelType() {
            return this.slim ? "slim" : "default";
        }
        set modelType(e) {
            (this.slim = "slim" === e), this.modelListeners.forEach((e) => e());
        }
        getBodyParts() {
            return this.children.filter((e) => e instanceof Ur);
        }
        setInnerLayerVisible(e) {
            this.getBodyParts().forEach((t) => (t.innerLayer.visible = e));
        }
        setOuterLayerVisible(e) {
            this.getBodyParts().forEach((t) => (t.outerLayer.visible = e));
        }
    }
    class zr extends vr {
        constructor(e) {
            super();
            const t = new dt({ map: e, side: 2, transparent: !0, alphaTest: 1e-5 }),
                n = new Pr(10, 16, 1);
            Dr(n, 0, 0, 10, 16, 1), (this.cape = new Jt(n, t)), (this.cape.position.y = -8), (this.cape.position.z = 0.5), this.add(this.cape);
        }
    }
    class Gr extends vr {
        constructor(e) {
            super();
            const t = new dt({ map: e, side: 2, transparent: !0, alphaTest: 1e-5 }),
                n = new Pr(12, 22, 4);
            Dr(n, 22, 0, 10, 20, 2);
            const i = new Jt(n, t);
            (i.position.x = -5), (i.position.y = -10), (i.position.z = -1), (this.leftWing = new vr()), this.leftWing.add(i), this.add(this.leftWing);
            const r = new Pr(12, 22, 4);
            Dr(r, 22, 0, 10, 20, 2);
            const a = new Jt(r, t);
            (a.scale.x = -1),
                (a.position.x = 5),
                (a.position.y = -10),
                (a.position.z = -1),
                (this.rightWing = new vr()),
                this.rightWing.add(a),
                this.add(this.rightWing),
                (this.leftWing.position.x = 5),
                (this.leftWing.rotation.x = 0.2617994),
                (this.leftWing.rotation.y = 0.01),
                (this.leftWing.rotation.z = 0.2617994),
                this.updateRightWing();
        }
        updateRightWing() {
            (this.rightWing.position.x = -this.leftWing.position.x),
                (this.rightWing.position.y = this.leftWing.position.y),
                (this.rightWing.rotation.x = this.leftWing.rotation.x),
                (this.rightWing.rotation.y = -this.leftWing.rotation.y),
                (this.rightWing.rotation.z = -this.leftWing.rotation.z);
        }
    }
    class Br extends vr {
        constructor(e, t) {
            super(),
                (this.skin = new Or(e)),
                (this.skin.name = "skin"),
                this.add(this.skin),
                (this.cape = new zr(t)),
                (this.cape.name = "cape"),
                (this.cape.position.z = -2),
                (this.cape.rotation.x = (10.8 * Math.PI) / 180),
                (this.cape.rotation.y = Math.PI),
                this.add(this.cape),
                (this.elytra = new Gr(t)),
                (this.elytra.name = "elytra"),
                (this.elytra.position.z = -2),
                (this.elytra.visible = !1),
                this.add(this.elytra);
        }
        get backEquipment() {
            return this.cape.visible ? "cape" : this.elytra.visible ? "elytra" : null;
        }
        set backEquipment(e) {
            (this.cape.visible = "cape" === e), (this.elytra.visible = "elytra" === e);
        }
    }
    function Hr(e) {
        return (
            e instanceof HTMLImageElement ||
            e instanceof HTMLVideoElement ||
            e instanceof HTMLCanvasElement ||
            ("undefined" != typeof ImageBitmap && e instanceof ImageBitmap) ||
            ("undefined" != typeof OffscreenCanvas && e instanceof OffscreenCanvas)
        );
    }
    function kr(e, t, n, i, r) {
        const a = e.getImageData(t, n, i, r);
        for (let e = 0; e < i; e++)
            for (let t = 0; t < r; t++) {
                const n = 4 * (e + t * i);
                if (255 !== a.data[n + 3]) return !0;
            }
        return !1;
    }
    function Vr(e) {
        return e / 64;
    }
    function Wr(e, t) {
        const n = Vr(t),
            i = (t, i, r, a, o, s, l) =>
                (function (e, t, n, i, r, a, o, s) {
                    const l = e.getImageData(t, n, i, r);
                    if (s)
                        for (let e = 0; e < r; e++)
                            for (let t = 0; t < i / 2; t++) {
                                const n = 4 * (t + e * i),
                                    r = 4 * (i - t - 1 + e * i),
                                    a = l.data[n],
                                    o = l.data[n + 1],
                                    s = l.data[n + 2],
                                    c = l.data[n + 3],
                                    h = l.data[r],
                                    d = l.data[r + 1],
                                    u = l.data[r + 2],
                                    f = l.data[r + 3];
                                (l.data[n] = h), (l.data[n + 1] = d), (l.data[n + 2] = u), (l.data[n + 3] = f), (l.data[r] = a), (l.data[r + 1] = o), (l.data[r + 2] = s), (l.data[r + 3] = c);
                            }
                    e.putImageData(l, a, o);
                })(e, t * n, i * n, r * n, a * n, o * n, s * n, l);
        !(function (e, t) {
            if (!kr(e, 0, 0, t, t / 2)) {
                const n = Vr(t),
                    i = (t, i, r, a) => e.clearRect(t * n, i * n, r * n, a * n);
                i(40, 0, 8, 8), i(48, 0, 8, 8), i(32, 8, 8, 8), i(40, 8, 8, 8), i(48, 8, 8, 8), i(56, 8, 8, 8);
            }
        })(e, t),
            i(4, 16, 4, 4, 20, 48, !0),
            i(8, 16, 4, 4, 24, 48, !0),
            i(0, 20, 4, 12, 24, 52, !0),
            i(4, 20, 4, 12, 20, 52, !0),
            i(8, 20, 4, 12, 16, 52, !0),
            i(12, 20, 4, 12, 28, 52, !0),
            i(44, 16, 4, 4, 36, 48, !0),
            i(48, 16, 4, 4, 40, 48, !0),
            i(40, 20, 4, 12, 40, 52, !0),
            i(44, 20, 4, 12, 36, 52, !0),
            i(48, 20, 4, 12, 32, 52, !0),
            i(52, 20, 4, 12, 44, 52, !0);
    }
    function Xr(e, t) {
        const n = (function (e) {
            if (e.width === 2 * e.height) return e.width / 64;
            if (17 * e.width == 22 * e.height) return e.width / 22;
            if (11 * e.width == 23 * e.height) return e.width / 46;
            throw new Error(`Bad cape size: ${e.width}x${e.height}`);
        })(t);
        (e.width = 64 * n), (e.height = 32 * n);
        const i = e.getContext("2d");
        i.clearRect(0, 0, e.width, e.height), i.drawImage(t, 0, 0, t.width, t.height);
    }
    async function Yr(e) {
        const t = document.createElement("img");
        return new Promise((n, i) => {
            (t.onload = () => n(t)),
                (t.onerror = i),
                (t.crossOrigin = "anonymous"),
                "string" == typeof e ? (t.src = e) : (void 0 !== e.crossOrigin && (t.crossOrigin = e.crossOrigin), void 0 !== e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy), (t.src = e.src));
        });
    }
    function jr(e, t, n) {
        e instanceof Function ? e(t, n) : e.play(t, n);
    }
    class Qr {
        constructor(e) {
            (this.speed = 1), (this.paused = !1), (this.progress = 0), (this.lastTime = 0), (this.started = !1), (this.toResetAndRemove = !1), (this.animation = e);
        }
        play(e, t) {
            if (this.toResetAndRemove) return jr(this.animation, e, 0), void this.remove();
            let n;
            this.started ? (n = t - this.lastTime) : ((n = 0), (this.started = !0)), (this.lastTime = t), this.paused || (this.progress += n * this.speed), jr(this.animation, e, this.progress);
        }
        reset() {
            this.progress = 0;
        }
        remove() {}
        resetAndRemove() {
            this.toResetAndRemove = !0;
        }
    }
    class qr {
        constructor() {
            this.handles = new Set();
        }
        add(e) {
            const t = new Qr(e);
            return (
                (t.remove = () => {
                    this.handles.delete(t);
                }),
                this.handles.add(t),
                t
            );
        }
        play(e, t) {
            this.handles.forEach((n) => n.play(e, t));
        }
    }
    class Zr extends qr {
        constructor() {
            super(...arguments), (this.speed = 1), (this.progress = 0), (this.clock = new Nr(!0));
        }
        get animation() {
            return this;
        }
        get paused() {
            return !this.clock.running;
        }
        set paused(e) {
            e ? this.clock.stop() : this.clock.start();
        }
        runAnimationLoop(e) {
            0 !== this.handles.size && ((this.progress += this.clock.getDelta() * this.speed), this.play(e, this.progress));
        }
        reset() {
            this.progress = 0;
        }
    }
    class Jr {
        constructor(e = {}) {
            (this.animations = new Zr()),
                (this._disposed = !1),
                (this._renderPaused = !1),
                (this.canvas = void 0 === e.canvas ? document.createElement("canvas") : e.canvas),
                (this.skinCanvas = document.createElement("canvas")),
                (this.skinTexture = new O(this.skinCanvas)),
                (this.skinTexture.magFilter = u),
                (this.skinTexture.minFilter = u),
                (this.capeCanvas = document.createElement("canvas")),
                (this.capeTexture = new O(this.capeCanvas)),
                (this.capeTexture.magFilter = u),
                (this.capeTexture.minFilter = u),
                (this.scene = new wr()),
                (this.camera = new sn(40)),
                (this.camera.position.y = -8),
                (this.camera.position.z = 60),
                (this.renderer = new br({ canvas: this.canvas, alpha: !1 !== e.alpha, preserveDrawingBuffer: !0 === e.preserveDrawingBuffer })),
                this.renderer.setPixelRatio(window.devicePixelRatio),
                (this.playerObject = new Br(this.skinTexture, this.capeTexture)),
                (this.playerObject.name = "player"),
                (this.playerObject.skin.visible = !1),
                (this.playerObject.cape.visible = !1),
                this.scene.add(this.playerObject),
                void 0 !== e.skin && this.loadSkin(e.skin),
                void 0 !== e.cape && this.loadCape(e.cape),
                void 0 !== e.width && (this.width = e.width),
                void 0 !== e.height && (this.height = e.height),
                !0 === e.renderPaused ? (this._renderPaused = !0) : window.requestAnimationFrame(() => this.draw());
        }
        loadSkin(e, t = "auto-detect", n = {}) {
            if (null === e) this.resetSkin();
            else {
                if (!Hr(e)) return Yr(e).then((e) => this.loadSkin(e, t, n));
                {
                    !(function (e, t) {
                        let n = !1;
                        if (t.width !== t.height) {
                            if (t.width !== 2 * t.height) throw new Error(`Bad skin size: ${t.width}x${t.height}`);
                            n = !0;
                        }
                        const i = e.getContext("2d");
                        if (n) {
                            const n = t.width;
                            (e.width = n), (e.height = n), i.clearRect(0, 0, n, n), i.drawImage(t, 0, 0, n, n / 2), Wr(i, n);
                        } else (e.width = t.width), (e.height = t.height), i.clearRect(0, 0, t.width, t.height), i.drawImage(t, 0, 0, e.width, e.height);
                    })(this.skinCanvas, e);
                    const i =
                        "auto-detect" === t
                            ? (function (e) {
                                  const t = Vr(e.width),
                                      n = e.getContext("2d"),
                                      i = (e, i, r, a) => kr(n, e * t, i * t, r * t, a * t),
                                      r = (e, i, r, a) =>
                                          (function (e, t, n, i, r) {
                                              const a = e.getImageData(t, n, i, r);
                                              for (let e = 0; e < i; e++)
                                                  for (let t = 0; t < r; t++) {
                                                      const n = 4 * (e + t * i);
                                                      if (0 !== a.data[n + 0] || 0 !== a.data[n + 1] || 0 !== a.data[n + 2] || 255 !== a.data[n + 3]) return !1;
                                                  }
                                              return !0;
                                          })(n, e * t, i * t, r * t, a * t);
                                  return i(50, 16, 2, 4) || i(54, 20, 2, 12) || i(42, 48, 2, 4) || i(46, 52, 2, 12) || (r(50, 16, 2, 4) && r(54, 20, 2, 12) && r(42, 48, 2, 4) && r(46, 52, 2, 12)) ? "slim" : "default";
                              })(this.skinCanvas)
                            : t;
                    (this.skinTexture.needsUpdate = !0), (this.playerObject.skin.modelType = i), !1 !== n.makeVisible && (this.playerObject.skin.visible = !0);
                }
            }
        }
        resetSkin() {
            this.playerObject.skin.visible = !1;
        }
        loadCape(e, t = {}) {
            if (null === e) this.resetCape();
            else {
                if (!Hr(e)) return Yr(e).then((e) => this.loadCape(e, t));
                Xr(this.capeCanvas, e), (this.capeTexture.needsUpdate = !0), !1 !== t.makeVisible && (this.playerObject.backEquipment = void 0 === t.backEquipment ? "cape" : t.backEquipment);
            }
        }
        resetCape() {
            this.playerObject.backEquipment = null;
        }
        draw() {
            this.disposed || this._renderPaused || (this.animations.runAnimationLoop(this.playerObject), this.render(), window.requestAnimationFrame(() => this.draw()));
        }
        render() {
            this.renderer.render(this.scene, this.camera);
        }
        setSize(e, t) {
            (this.camera.aspect = e / t), this.camera.updateProjectionMatrix(), this.renderer.setSize(e, t);
        }
        dispose() {
            (this._disposed = !0), this.renderer.dispose(), this.skinTexture.dispose(), this.capeTexture.dispose();
        }
        get disposed() {
            return this._disposed;
        }
        get renderPaused() {
            return this._renderPaused;
        }
        set renderPaused(e) {
            const t = !this.disposed && !e && this._renderPaused;
            (this._renderPaused = e), t && window.requestAnimationFrame(() => this.draw());
        }
        get width() {
            return this.renderer.getSize(new C()).width;
        }
        set width(e) {
            this.setSize(e, this.height);
        }
        get height() {
            return this.renderer.getSize(new C()).height;
        }
        set height(e) {
            this.setSize(this.width, e);
        }
    }
    var Kr = function (e, l) {
        var c, h, d, u, f, p;
        void 0 === l && console.warn('THREE.OrbitControls: The second parameter "domElement" is now mandatory.'),
            l === document && console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'),
            (this.object = e),
            (this.domElement = l),
            (this.enabled = !0),
            (this.target = new H()),
            (this.minDistance = 0),
            (this.maxDistance = 1 / 0),
            (this.minZoom = 0),
            (this.maxZoom = 1 / 0),
            (this.minPolarAngle = 0),
            (this.maxPolarAngle = Math.PI),
            (this.minAzimuthAngle = -1 / 0),
            (this.maxAzimuthAngle = 1 / 0),
            (this.enableDamping = !1),
            (this.dampingFactor = 0.05),
            (this.enableZoom = !0),
            (this.zoomSpeed = 1),
            (this.enableRotate = !0),
            (this.rotateSpeed = 1),
            (this.enablePan = !0),
            (this.panSpeed = 1),
            (this.screenSpacePanning = !0),
            (this.keyPanSpeed = 7),
            (this.autoRotate = !1),
            (this.autoRotateSpeed = 2),
            (this.enableKeys = !0),
            (this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 }),
            (this.mouseButtons = { LEFT: t, MIDDLE: n, RIGHT: i }),
            (this.touches = { ONE: r, TWO: o }),
            (this.target0 = this.target.clone()),
            (this.position0 = this.object.position.clone()),
            (this.zoom0 = this.object.zoom),
            (this.getPolarAngle = function () {
                return b.phi;
            }),
            (this.getAzimuthalAngle = function () {
                return b.theta;
            }),
            (this.saveState = function () {
                m.target0.copy(m.target), m.position0.copy(m.object.position), (m.zoom0 = m.object.zoom);
            }),
            (this.reset = function () {
                m.target.copy(m.target0), m.object.position.copy(m.position0), (m.object.zoom = m.zoom0), m.object.updateProjectionMatrix(), m.dispatchEvent(g), m.update(), (y = _.NONE);
            }),
            (this.update =
                ((c = new H()),
                (h = new B().setFromUnitVectors(e.up, new H(0, 1, 0))),
                (d = h.clone().inverse()),
                (u = new H()),
                (f = new B()),
                (p = 2 * Math.PI),
                function () {
                    var e = m.object.position;
                    c.copy(e).sub(m.target),
                        c.applyQuaternion(h),
                        b.setFromVector3(c),
                        m.autoRotate && y === _.NONE && z(((2 * Math.PI) / 60 / 60) * m.autoRotateSpeed),
                        m.enableDamping ? ((b.theta += w.theta * m.dampingFactor), (b.phi += w.phi * m.dampingFactor)) : ((b.theta += w.theta), (b.phi += w.phi));
                    var t = m.minAzimuthAngle,
                        n = m.maxAzimuthAngle;
                    return (
                        isFinite(t) &&
                            isFinite(n) &&
                            (t < -Math.PI ? (t += p) : t > Math.PI && (t -= p),
                            n < -Math.PI ? (n += p) : n > Math.PI && (n -= p),
                            (b.theta = t < n ? Math.max(t, Math.min(n, b.theta)) : b.theta > (t + n) / 2 ? Math.max(t, b.theta) : Math.min(n, b.theta))),
                        (b.phi = Math.max(m.minPolarAngle, Math.min(m.maxPolarAngle, b.phi))),
                        b.makeSafe(),
                        (b.radius *= A),
                        (b.radius = Math.max(m.minDistance, Math.min(m.maxDistance, b.radius))),
                        !0 === m.enableDamping ? m.target.addScaledVector(S, m.dampingFactor) : m.target.add(S),
                        c.setFromSpherical(b),
                        c.applyQuaternion(d),
                        e.copy(m.target).add(c),
                        m.object.lookAt(m.target),
                        !0 === m.enableDamping ? ((w.theta *= 1 - m.dampingFactor), (w.phi *= 1 - m.dampingFactor), S.multiplyScalar(1 - m.dampingFactor)) : (w.set(0, 0, 0), S.set(0, 0, 0)),
                        (A = 1),
                        !!(T || u.distanceToSquared(m.object.position) > M || 8 * (1 - f.dot(m.object.quaternion)) > M) && (m.dispatchEvent(g), u.copy(m.object.position), f.copy(m.object.quaternion), (T = !1), !0)
                    );
                })),
            (this.dispose = function () {
                m.domElement.removeEventListener("contextmenu", he, !1),
                    m.domElement.removeEventListener("pointerdown", ne, !1),
                    m.domElement.removeEventListener("wheel", ae, !1),
                    m.domElement.removeEventListener("touchstart", se, !1),
                    m.domElement.removeEventListener("touchend", ce, !1),
                    m.domElement.removeEventListener("touchmove", le, !1),
                    m.domElement.ownerDocument.removeEventListener("pointermove", ie, !1),
                    m.domElement.ownerDocument.removeEventListener("pointerup", re, !1),
                    m.domElement.removeEventListener("keydown", oe, !1);
            });
        var m = this,
            g = { type: "change" },
            x = { type: "start" },
            v = { type: "end" },
            _ = { NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_PAN: 4, TOUCH_DOLLY_PAN: 5, TOUCH_DOLLY_ROTATE: 6 },
            y = _.NONE,
            M = 1e-6,
            b = new Cr(),
            w = new Cr(),
            A = 1,
            S = new H(),
            T = !1,
            L = new C(),
            E = new C(),
            P = new C(),
            F = new C(),
            N = new C(),
            I = new C(),
            R = new C(),
            D = new C(),
            U = new C();
        function O() {
            return Math.pow(0.95, m.zoomSpeed);
        }
        function z(e) {
            w.theta -= e;
        }
        function G(e) {
            w.phi -= e;
        }
        var k,
            V =
                ((k = new H()),
                function (e, t) {
                    k.setFromMatrixColumn(t, 0), k.multiplyScalar(-e), S.add(k);
                }),
            W = (function () {
                var e = new H();
                return function (t, n) {
                    !0 === m.screenSpacePanning ? e.setFromMatrixColumn(n, 1) : (e.setFromMatrixColumn(n, 0), e.crossVectors(m.object.up, e)), e.multiplyScalar(t), S.add(e);
                };
            })(),
            X = (function () {
                var e = new H();
                return function (t, n) {
                    var i = m.domElement;
                    if (m.object.isPerspectiveCamera) {
                        var r = m.object.position;
                        e.copy(r).sub(m.target);
                        var a = e.length();
                        (a *= Math.tan(((m.object.fov / 2) * Math.PI) / 180)), V((2 * t * a) / i.clientHeight, m.object.matrix), W((2 * n * a) / i.clientHeight, m.object.matrix);
                    } else
                        m.object.isOrthographicCamera
                            ? (V((t * (m.object.right - m.object.left)) / m.object.zoom / i.clientWidth, m.object.matrix), W((n * (m.object.top - m.object.bottom)) / m.object.zoom / i.clientHeight, m.object.matrix))
                            : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), (m.enablePan = !1));
                };
            })();
        function Y(e) {
            m.object.isPerspectiveCamera
                ? (A /= e)
                : m.object.isOrthographicCamera
                ? ((m.object.zoom = Math.max(m.minZoom, Math.min(m.maxZoom, m.object.zoom * e))), m.object.updateProjectionMatrix(), (T = !0))
                : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), (m.enableZoom = !1));
        }
        function j(e) {
            m.object.isPerspectiveCamera
                ? (A *= e)
                : m.object.isOrthographicCamera
                ? ((m.object.zoom = Math.max(m.minZoom, Math.min(m.maxZoom, m.object.zoom / e))), m.object.updateProjectionMatrix(), (T = !0))
                : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), (m.enableZoom = !1));
        }
        function Q(e) {
            L.set(e.clientX, e.clientY);
        }
        function q(e) {
            F.set(e.clientX, e.clientY);
        }
        function Z(e) {
            if (1 == e.touches.length) L.set(e.touches[0].pageX, e.touches[0].pageY);
            else {
                var t = 0.5 * (e.touches[0].pageX + e.touches[1].pageX),
                    n = 0.5 * (e.touches[0].pageY + e.touches[1].pageY);
                L.set(t, n);
            }
        }
        function J(e) {
            if (1 == e.touches.length) F.set(e.touches[0].pageX, e.touches[0].pageY);
            else {
                var t = 0.5 * (e.touches[0].pageX + e.touches[1].pageX),
                    n = 0.5 * (e.touches[0].pageY + e.touches[1].pageY);
                F.set(t, n);
            }
        }
        function K(e) {
            var t = e.touches[0].pageX - e.touches[1].pageX,
                n = e.touches[0].pageY - e.touches[1].pageY,
                i = Math.sqrt(t * t + n * n);
            R.set(0, i);
        }
        function $(e) {
            if (1 == e.touches.length) E.set(e.touches[0].pageX, e.touches[0].pageY);
            else {
                var t = 0.5 * (e.touches[0].pageX + e.touches[1].pageX),
                    n = 0.5 * (e.touches[0].pageY + e.touches[1].pageY);
                E.set(t, n);
            }
            P.subVectors(E, L).multiplyScalar(m.rotateSpeed);
            var i = m.domElement;
            z((2 * Math.PI * P.x) / i.clientHeight), G((2 * Math.PI * P.y) / i.clientHeight), L.copy(E);
        }
        function ee(e) {
            if (1 == e.touches.length) N.set(e.touches[0].pageX, e.touches[0].pageY);
            else {
                var t = 0.5 * (e.touches[0].pageX + e.touches[1].pageX),
                    n = 0.5 * (e.touches[0].pageY + e.touches[1].pageY);
                N.set(t, n);
            }
            I.subVectors(N, F).multiplyScalar(m.panSpeed), X(I.x, I.y), F.copy(N);
        }
        function te(e) {
            var t = e.touches[0].pageX - e.touches[1].pageX,
                n = e.touches[0].pageY - e.touches[1].pageY,
                i = Math.sqrt(t * t + n * n);
            D.set(0, i), U.set(0, Math.pow(D.y / R.y, m.zoomSpeed)), Y(U.y), R.copy(D);
        }
        function ne(e) {
            if (!1 !== m.enabled)
                switch (e.pointerType) {
                    case "mouse":
                    case "pen":
                        !(function (e) {
                            var r;
                            switch ((e.preventDefault(), m.domElement.focus ? m.domElement.focus() : window.focus(), e.button)) {
                                case 0:
                                    r = m.mouseButtons.LEFT;
                                    break;
                                case 1:
                                    r = m.mouseButtons.MIDDLE;
                                    break;
                                case 2:
                                    r = m.mouseButtons.RIGHT;
                                    break;
                                default:
                                    r = -1;
                            }
                            switch (r) {
                                case n:
                                    if (!1 === m.enableZoom) return;
                                    !(function (e) {
                                        R.set(e.clientX, e.clientY);
                                    })(e),
                                        (y = _.DOLLY);
                                    break;
                                case t:
                                    if (e.ctrlKey || e.metaKey || e.shiftKey) {
                                        if (!1 === m.enablePan) return;
                                        q(e), (y = _.PAN);
                                    } else {
                                        if (!1 === m.enableRotate) return;
                                        Q(e), (y = _.ROTATE);
                                    }
                                    break;
                                case i:
                                    if (e.ctrlKey || e.metaKey || e.shiftKey) {
                                        if (!1 === m.enableRotate) return;
                                        Q(e), (y = _.ROTATE);
                                    } else {
                                        if (!1 === m.enablePan) return;
                                        q(e), (y = _.PAN);
                                    }
                                    break;
                                default:
                                    y = _.NONE;
                            }
                            y !== _.NONE && (m.domElement.ownerDocument.addEventListener("pointermove", ie, !1), m.domElement.ownerDocument.addEventListener("pointerup", re, !1), m.dispatchEvent(x));
                        })(e);
                }
        }
        function ie(e) {
            if (!1 !== m.enabled)
                switch (e.pointerType) {
                    case "mouse":
                    case "pen":
                        !(function (e) {
                            if (!1 === m.enabled) return;
                            switch ((e.preventDefault(), y)) {
                                case _.ROTATE:
                                    if (!1 === m.enableRotate) return;
                                    !(function (e) {
                                        E.set(e.clientX, e.clientY), P.subVectors(E, L).multiplyScalar(m.rotateSpeed);
                                        var t = m.domElement;
                                        z((2 * Math.PI * P.x) / t.clientHeight), G((2 * Math.PI * P.y) / t.clientHeight), L.copy(E), m.update();
                                    })(e);
                                    break;
                                case _.DOLLY:
                                    if (!1 === m.enableZoom) return;
                                    !(function (e) {
                                        D.set(e.clientX, e.clientY), U.subVectors(D, R), U.y > 0 ? Y(O()) : U.y < 0 && j(O()), R.copy(D), m.update();
                                    })(e);
                                    break;
                                case _.PAN:
                                    if (!1 === m.enablePan) return;
                                    !(function (e) {
                                        N.set(e.clientX, e.clientY), I.subVectors(N, F).multiplyScalar(m.panSpeed), X(I.x, I.y), F.copy(N), m.update();
                                    })(e);
                            }
                        })(e);
                }
        }
        function re(e) {
            if (!1 !== m.enabled)
                switch (e.pointerType) {
                    case "mouse":
                    case "pen":
                        !(function (e) {
                            if (!1 === m.enabled) return;
                            m.domElement.ownerDocument.removeEventListener("pointermove", ie, !1), m.domElement.ownerDocument.removeEventListener("pointerup", re, !1), m.dispatchEvent(v), (y = _.NONE);
                        })();
                }
        }
        function ae(e) {
            !1 === m.enabled ||
                !1 === m.enableZoom ||
                (y !== _.NONE && y !== _.ROTATE) ||
                (e.preventDefault(),
                e.stopPropagation(),
                m.dispatchEvent(x),
                (function (e) {
                    e.deltaY < 0 ? j(O()) : e.deltaY > 0 && Y(O()), m.update();
                })(e),
                m.dispatchEvent(v));
        }
        function oe(e) {
            !1 !== m.enabled &&
                !1 !== m.enableKeys &&
                !1 !== m.enablePan &&
                (function (e) {
                    var t = !1;
                    switch (e.keyCode) {
                        case m.keys.UP:
                            X(0, m.keyPanSpeed), (t = !0);
                            break;
                        case m.keys.BOTTOM:
                            X(0, -m.keyPanSpeed), (t = !0);
                            break;
                        case m.keys.LEFT:
                            X(m.keyPanSpeed, 0), (t = !0);
                            break;
                        case m.keys.RIGHT:
                            X(-m.keyPanSpeed, 0), (t = !0);
                    }
                    t && (e.preventDefault(), m.update());
                })(e);
        }
        function se(e) {
            if (!1 !== m.enabled) {
                switch ((e.preventDefault(), e.touches.length)) {
                    case 1:
                        switch (m.touches.ONE) {
                            case r:
                                if (!1 === m.enableRotate) return;
                                Z(e), (y = _.TOUCH_ROTATE);
                                break;
                            case a:
                                if (!1 === m.enablePan) return;
                                J(e), (y = _.TOUCH_PAN);
                                break;
                            default:
                                y = _.NONE;
                        }
                        break;
                    case 2:
                        switch (m.touches.TWO) {
                            case o:
                                if (!1 === m.enableZoom && !1 === m.enablePan) return;
                                !(function (e) {
                                    m.enableZoom && K(e), m.enablePan && J(e);
                                })(e),
                                    (y = _.TOUCH_DOLLY_PAN);
                                break;
                            case s:
                                if (!1 === m.enableZoom && !1 === m.enableRotate) return;
                                !(function (e) {
                                    m.enableZoom && K(e), m.enableRotate && Z(e);
                                })(e),
                                    (y = _.TOUCH_DOLLY_ROTATE);
                                break;
                            default:
                                y = _.NONE;
                        }
                        break;
                    default:
                        y = _.NONE;
                }
                y !== _.NONE && m.dispatchEvent(x);
            }
        }
        function le(e) {
            if (!1 !== m.enabled)
                switch ((e.preventDefault(), e.stopPropagation(), y)) {
                    case _.TOUCH_ROTATE:
                        if (!1 === m.enableRotate) return;
                        $(e), m.update();
                        break;
                    case _.TOUCH_PAN:
                        if (!1 === m.enablePan) return;
                        ee(e), m.update();
                        break;
                    case _.TOUCH_DOLLY_PAN:
                        if (!1 === m.enableZoom && !1 === m.enablePan) return;
                        !(function (e) {
                            m.enableZoom && te(e), m.enablePan && ee(e);
                        })(e),
                            m.update();
                        break;
                    case _.TOUCH_DOLLY_ROTATE:
                        if (!1 === m.enableZoom && !1 === m.enableRotate) return;
                        !(function (e) {
                            m.enableZoom && te(e), m.enableRotate && $(e);
                        })(e),
                            m.update();
                        break;
                    default:
                        y = _.NONE;
                }
        }
        function ce(e) {
            !1 !== m.enabled && (m.dispatchEvent(v), (y = _.NONE));
        }
        function he(e) {
            !1 !== m.enabled && e.preventDefault();
        }
        m.domElement.addEventListener("contextmenu", he, !1),
            m.domElement.addEventListener("pointerdown", ne, !1),
            m.domElement.addEventListener("wheel", ae, !1),
            m.domElement.addEventListener("touchstart", se, !1),
            m.domElement.addEventListener("touchend", ce, !1),
            m.domElement.addEventListener("touchmove", le, !1),
            m.domElement.addEventListener("keydown", oe, !1),
            -1 === m.domElement.tabIndex && (m.domElement.tabIndex = 0),
            this.update();
    };
    (Kr.prototype = Object.create(E.prototype)).constructor = Kr;
    var $r = function (e, n) {
        Kr.call(this, e, n), (this.screenSpacePanning = !1), (this.mouseButtons.LEFT = i), (this.mouseButtons.RIGHT = t), (this.touches.ONE = a), (this.touches.TWO = s);
    };
    ($r.prototype = Object.create(E.prototype)).constructor = $r;
    var ea,
        ta,
        na,
        ia = {
            uniforms: { tDiffuse: { value: null }, opacity: { value: 1 } },
            vertexShader: "varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",
            fragmentShader: "uniform float opacity;uniform sampler2D tDiffuse;varying vec2 vUv;void main(){vec4 texel=texture2D(tDiffuse,vUv);gl_FragColor=opacity*texel;}",
        };
    function ra() {
        (this.enabled = !0), (this.needsSwap = !0), (this.clear = !1), (this.renderToScreen = !1);
    }
    Object.assign(ra.prototype, {
        setSize: function () {},
        render: function () {
            console.error("THREE.Pass: .render() must be implemented in derived pass.");
        },
    }),
        (ra.FullScreenQuad =
            ((ea = new Fr(-1, 1, 1, -1, 0, 1)),
            (ta = new vn(2, 2)),
            (na = function (e) {
                this._mesh = new Jt(ta, e);
            }),
            Object.defineProperty(na.prototype, "material", {
                get: function () {
                    return this._mesh.material;
                },
                set: function (e) {
                    this._mesh.material = e;
                },
            }),
            Object.assign(na.prototype, {
                dispose: function () {
                    this._mesh.geometry.dispose();
                },
                render: function (e) {
                    e.render(this._mesh, ea);
                },
            }),
            na));
    var aa = function (e, t) {
        ra.call(this),
            (this.textureID = void 0 !== t ? t : "tDiffuse"),
            e instanceof an
                ? ((this.uniforms = e.uniforms), (this.material = e))
                : e && ((this.uniforms = rn.clone(e.uniforms)), (this.material = new an({ defines: Object.assign({}, e.defines), uniforms: this.uniforms, vertexShader: e.vertexShader, fragmentShader: e.fragmentShader }))),
            (this.fsQuad = new ra.FullScreenQuad(this.material));
    };
    aa.prototype = Object.assign(Object.create(ra.prototype), {
        constructor: aa,
        render: function (e, t, n) {
            this.uniforms[this.textureID] && (this.uniforms[this.textureID].value = n.texture),
                (this.fsQuad.material = this.material),
                this.renderToScreen ? (e.setRenderTarget(null), this.fsQuad.render(e)) : (e.setRenderTarget(t), this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), this.fsQuad.render(e));
        },
    });
    var oa = function (e, t) {
        ra.call(this), (this.scene = e), (this.camera = t), (this.clear = !0), (this.needsSwap = !1), (this.inverse = !1);
    };
    oa.prototype = Object.assign(Object.create(ra.prototype), {
        constructor: oa,
        render: function (e, t, n) {
            var i,
                r,
                a = e.getContext(),
                o = e.state;
            o.buffers.color.setMask(!1),
                o.buffers.depth.setMask(!1),
                o.buffers.color.setLocked(!0),
                o.buffers.depth.setLocked(!0),
                this.inverse ? ((i = 0), (r = 1)) : ((i = 1), (r = 0)),
                o.buffers.stencil.setTest(!0),
                o.buffers.stencil.setOp(a.REPLACE, a.REPLACE, a.REPLACE),
                o.buffers.stencil.setFunc(a.ALWAYS, i, 4294967295),
                o.buffers.stencil.setClear(r),
                o.buffers.stencil.setLocked(!0),
                e.setRenderTarget(n),
                this.clear && e.clear(),
                e.render(this.scene, this.camera),
                e.setRenderTarget(t),
                this.clear && e.clear(),
                e.render(this.scene, this.camera),
                o.buffers.color.setLocked(!1),
                o.buffers.depth.setLocked(!1),
                o.buffers.stencil.setLocked(!1),
                o.buffers.stencil.setFunc(a.EQUAL, 1, 4294967295),
                o.buffers.stencil.setOp(a.KEEP, a.KEEP, a.KEEP),
                o.buffers.stencil.setLocked(!0);
        },
    });
    var sa = function () {
        ra.call(this), (this.needsSwap = !1);
    };
    (sa.prototype = Object.create(ra.prototype)),
        Object.assign(sa.prototype, {
            render: function (e) {
                e.state.buffers.stencil.setLocked(!1), e.state.buffers.stencil.setTest(!1);
            },
        });
    var la = function (e, t) {
        if (((this.renderer = e), void 0 === t)) {
            var n = { minFilter: f, magFilter: f, format: b },
                i = e.getSize(new C());
            (this._pixelRatio = e.getPixelRatio()), (this._width = i.width), (this._height = i.height), ((t = new G(this._width * this._pixelRatio, this._height * this._pixelRatio, n)).texture.name = "EffectComposer.rt1");
        } else (this._pixelRatio = 1), (this._width = t.width), (this._height = t.height);
        (this.renderTarget1 = t),
            (this.renderTarget2 = t.clone()),
            (this.renderTarget2.texture.name = "EffectComposer.rt2"),
            (this.writeBuffer = this.renderTarget1),
            (this.readBuffer = this.renderTarget2),
            (this.renderToScreen = !0),
            (this.passes = []),
            void 0 === ia && console.error("THREE.EffectComposer relies on CopyShader"),
            void 0 === aa && console.error("THREE.EffectComposer relies on ShaderPass"),
            (this.copyPass = new aa(ia)),
            (this.clock = new Nr());
    };
    Object.assign(la.prototype, {
        swapBuffers: function () {
            var e = this.readBuffer;
            (this.readBuffer = this.writeBuffer), (this.writeBuffer = e);
        },
        addPass: function (e) {
            this.passes.push(e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
        },
        insertPass: function (e, t) {
            this.passes.splice(t, 0, e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
        },
        isLastEnabledPass: function (e) {
            for (var t = e + 1; t < this.passes.length; t++) if (this.passes[t].enabled) return !1;
            return !0;
        },
        render: function (e) {
            void 0 === e && (e = this.clock.getDelta());
            var t,
                n,
                i = this.renderer.getRenderTarget(),
                r = !1,
                a = this.passes.length;
            for (n = 0; n < a; n++)
                if (!1 !== (t = this.passes[n]).enabled) {
                    if (((t.renderToScreen = this.renderToScreen && this.isLastEnabledPass(n)), t.render(this.renderer, this.writeBuffer, this.readBuffer, e, r), t.needsSwap)) {
                        if (r) {
                            var o = this.renderer.getContext(),
                                s = this.renderer.state.buffers.stencil;
                            s.setFunc(o.NOTEQUAL, 1, 4294967295), this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, e), s.setFunc(o.EQUAL, 1, 4294967295);
                        }
                        this.swapBuffers();
                    }
                    void 0 !== oa && (t instanceof oa ? (r = !0) : t instanceof sa && (r = !1));
                }
            this.renderer.setRenderTarget(i);
        },
        reset: function (e) {
            if (void 0 === e) {
                var t = this.renderer.getSize(new C());
                (this._pixelRatio = this.renderer.getPixelRatio()), (this._width = t.width), (this._height = t.height), (e = this.renderTarget1.clone()).setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
            }
            this.renderTarget1.dispose(), this.renderTarget2.dispose(), (this.renderTarget1 = e), (this.renderTarget2 = e.clone()), (this.writeBuffer = this.renderTarget1), (this.readBuffer = this.renderTarget2);
        },
        setSize: function (e, t) {
            (this._width = e), (this._height = t);
            var n = this._width * this._pixelRatio,
                i = this._height * this._pixelRatio;
            this.renderTarget1.setSize(n, i), this.renderTarget2.setSize(n, i);
            for (var r = 0; r < this.passes.length; r++) this.passes[r].setSize(n, i);
        },
        setPixelRatio: function (e) {
            (this._pixelRatio = e), this.setSize(this._width, this._height);
        },
    });
    var ca = function () {
        (this.enabled = !0), (this.needsSwap = !0), (this.clear = !1), (this.renderToScreen = !1);
    };
    Object.assign(ca.prototype, {
        setSize: function () {},
        render: function () {
            console.error("THREE.Pass: .render() must be implemented in derived pass.");
        },
    }),
        (ca.FullScreenQuad = (function () {
            var e = new Fr(-1, 1, 1, -1, 0, 1),
                t = new vn(2, 2),
                n = function (e) {
                    this._mesh = new Jt(t, e);
                };
            return (
                Object.defineProperty(n.prototype, "material", {
                    get: function () {
                        return this._mesh.material;
                    },
                    set: function (e) {
                        this._mesh.material = e;
                    },
                }),
                Object.assign(n.prototype, {
                    dispose: function () {
                        this._mesh.geometry.dispose();
                    },
                    render: function (t) {
                        t.render(this._mesh, e);
                    },
                }),
                n
            );
        })());
    var ha = function (e, t, n, i, r) {
        ra.call(this), (this.scene = e), (this.camera = t), (this.overrideMaterial = n), (this.clearColor = i), (this.clearAlpha = void 0 !== r ? r : 0), (this.clear = !0), (this.clearDepth = !1), (this.needsSwap = !1);
    };
    ha.prototype = Object.assign(Object.create(ra.prototype), {
        constructor: ha,
        render: function (e, t, n) {
            var i,
                r,
                a,
                o = e.autoClear;
            (e.autoClear = !1),
                void 0 !== this.overrideMaterial && ((a = this.scene.overrideMaterial), (this.scene.overrideMaterial = this.overrideMaterial)),
                this.clearColor && ((i = e.getClearColor().getHex()), (r = e.getClearAlpha()), e.setClearColor(this.clearColor, this.clearAlpha)),
                this.clearDepth && e.clearDepth(),
                e.setRenderTarget(this.renderToScreen ? null : n),
                this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil),
                e.render(this.scene, this.camera),
                this.clearColor && e.setClearColor(i, r),
                void 0 !== this.overrideMaterial && (this.scene.overrideMaterial = a),
                (e.autoClear = o);
        },
    });
    var da = {
        uniforms: { tDiffuse: { value: null }, resolution: { value: new C(1 / 1024, 1 / 512) } },
        vertexShader: "varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",
        fragmentShader:
            "precision highp float;uniform sampler2D tDiffuse;uniform vec2 resolution;varying vec2 vUv;\n#define FXAA_PC 1\n#define FXAA_GLSL_100 1\n#define FXAA_QUALITY_PRESET 12\n#define FXAA_GREEN_AS_LUMA 1\n#ifndef FXAA_PC_CONSOLE\n#define FXAA_PC_CONSOLE 0\n#endif\n#ifndef FXAA_GLSL_120\n#define FXAA_GLSL_120 0\n#endif\n#ifndef FXAA_GLSL_130\n#define FXAA_GLSL_130 0\n#endif\n#ifndef FXAA_HLSL_3\n#define FXAA_HLSL_3 0\n#endif\n#ifndef FXAA_HLSL_4\n#define FXAA_HLSL_4 0\n#endif\n#ifndef FXAA_HLSL_5\n#define FXAA_HLSL_5 0\n#endif\n#ifndef FXAA_GREEN_AS_LUMA\n#define FXAA_GREEN_AS_LUMA 0\n#endif\n#ifndef FXAA_EARLY_EXIT\n#define FXAA_EARLY_EXIT 1\n#endif\n#ifndef FXAA_DISCARD\n#define FXAA_DISCARD 0\n#endif\n#ifndef FXAA_FAST_PIXEL_OFFSET\n#ifdef GL_EXT_gpu_shader4\n#define FXAA_FAST_PIXEL_OFFSET 1\n#endif\n#ifdef GL_NV_gpu_shader5\n#define FXAA_FAST_PIXEL_OFFSET 1\n#endif\n#ifdef GL_ARB_gpu_shader5\n#define FXAA_FAST_PIXEL_OFFSET 1\n#endif\n#ifndef FXAA_FAST_PIXEL_OFFSET\n#define FXAA_FAST_PIXEL_OFFSET 0\n#endif\n#endif\n#ifndef FXAA_GATHER4_ALPHA\n#if (FXAA_HLSL_5==1)\n#define FXAA_GATHER4_ALPHA 1\n#endif\n#ifdef GL_ARB_gpu_shader5\n#define FXAA_GATHER4_ALPHA 1\n#endif\n#ifdef GL_NV_gpu_shader5\n#define FXAA_GATHER4_ALPHA 1\n#endif\n#ifndef FXAA_GATHER4_ALPHA\n#define FXAA_GATHER4_ALPHA 0\n#endif\n#endif\n#ifndef FXAA_QUALITY_PRESET\n#define FXAA_QUALITY_PRESET 12\n#endif\n#if (FXAA_QUALITY_PRESET==10)\n#define FXAA_QUALITY_PS 3\n#define FXAA_QUALITY_P0 1.5\n#define FXAA_QUALITY_P1 3.0\n#define FXAA_QUALITY_P2 12.0\n#endif\n#if (FXAA_QUALITY_PRESET==11)\n#define FXAA_QUALITY_PS 4\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 3.0\n#define FXAA_QUALITY_P3 12.0\n#endif\n#if (FXAA_QUALITY_PRESET==12)\n#define FXAA_QUALITY_PS 5\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 2.0\n#define FXAA_QUALITY_P3 4.0\n#define FXAA_QUALITY_P4 12.0\n#endif\n#if (FXAA_QUALITY_PRESET==13)\n#define FXAA_QUALITY_PS 6\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 2.0\n#define FXAA_QUALITY_P3 2.0\n#define FXAA_QUALITY_P4 4.0\n#define FXAA_QUALITY_P5 12.0\n#endif\n#if (FXAA_QUALITY_PRESET==14)\n#define FXAA_QUALITY_PS 7\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 2.0\n#define FXAA_QUALITY_P3 2.0\n#define FXAA_QUALITY_P4 2.0\n#define FXAA_QUALITY_P5 4.0\n#define FXAA_QUALITY_P6 12.0\n#endif\n#if (FXAA_QUALITY_PRESET==15)\n#define FXAA_QUALITY_PS 8\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 2.0\n#define FXAA_QUALITY_P3 2.0\n#define FXAA_QUALITY_P4 2.0\n#define FXAA_QUALITY_P5 2.0\n#define FXAA_QUALITY_P6 4.0\n#define FXAA_QUALITY_P7 12.0\n#endif\n#if (FXAA_QUALITY_PRESET==20)\n#define FXAA_QUALITY_PS 3\n#define FXAA_QUALITY_P0 1.5\n#define FXAA_QUALITY_P1 2.0\n#define FXAA_QUALITY_P2 8.0\n#endif\n#if (FXAA_QUALITY_PRESET==21)\n#define FXAA_QUALITY_PS 4\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 2.0\n#define FXAA_QUALITY_P3 8.0\n#endif\n#if (FXAA_QUALITY_PRESET==22)\n#define FXAA_QUALITY_PS 5\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 2.0\n#define FXAA_QUALITY_P3 2.0\n#define FXAA_QUALITY_P4 8.0\n#endif\n#if (FXAA_QUALITY_PRESET==23)\n#define FXAA_QUALITY_PS 6\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 2.0\n#define FXAA_QUALITY_P3 2.0\n#define FXAA_QUALITY_P4 2.0\n#define FXAA_QUALITY_P5 8.0\n#endif\n#if (FXAA_QUALITY_PRESET==24)\n#define FXAA_QUALITY_PS 7\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 2.0\n#define FXAA_QUALITY_P3 2.0\n#define FXAA_QUALITY_P4 2.0\n#define FXAA_QUALITY_P5 3.0\n#define FXAA_QUALITY_P6 8.0\n#endif\n#if (FXAA_QUALITY_PRESET==25)\n#define FXAA_QUALITY_PS 8\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 2.0\n#define FXAA_QUALITY_P3 2.0\n#define FXAA_QUALITY_P4 2.0\n#define FXAA_QUALITY_P5 2.0\n#define FXAA_QUALITY_P6 4.0\n#define FXAA_QUALITY_P7 8.0\n#endif\n#if (FXAA_QUALITY_PRESET==26)\n#define FXAA_QUALITY_PS 9\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 2.0\n#define FXAA_QUALITY_P3 2.0\n#define FXAA_QUALITY_P4 2.0\n#define FXAA_QUALITY_P5 2.0\n#define FXAA_QUALITY_P6 2.0\n#define FXAA_QUALITY_P7 4.0\n#define FXAA_QUALITY_P8 8.0\n#endif\n#if (FXAA_QUALITY_PRESET==27)\n#define FXAA_QUALITY_PS 10\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 2.0\n#define FXAA_QUALITY_P3 2.0\n#define FXAA_QUALITY_P4 2.0\n#define FXAA_QUALITY_P5 2.0\n#define FXAA_QUALITY_P6 2.0\n#define FXAA_QUALITY_P7 2.0\n#define FXAA_QUALITY_P8 4.0\n#define FXAA_QUALITY_P9 8.0\n#endif\n#if (FXAA_QUALITY_PRESET==28)\n#define FXAA_QUALITY_PS 11\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 2.0\n#define FXAA_QUALITY_P3 2.0\n#define FXAA_QUALITY_P4 2.0\n#define FXAA_QUALITY_P5 2.0\n#define FXAA_QUALITY_P6 2.0\n#define FXAA_QUALITY_P7 2.0\n#define FXAA_QUALITY_P8 2.0\n#define FXAA_QUALITY_P9 4.0\n#define FXAA_QUALITY_P10 8.0\n#endif\n#if (FXAA_QUALITY_PRESET==29)\n#define FXAA_QUALITY_PS 12\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.5\n#define FXAA_QUALITY_P2 2.0\n#define FXAA_QUALITY_P3 2.0\n#define FXAA_QUALITY_P4 2.0\n#define FXAA_QUALITY_P5 2.0\n#define FXAA_QUALITY_P6 2.0\n#define FXAA_QUALITY_P7 2.0\n#define FXAA_QUALITY_P8 2.0\n#define FXAA_QUALITY_P9 2.0\n#define FXAA_QUALITY_P10 4.0\n#define FXAA_QUALITY_P11 8.0\n#endif\n#if (FXAA_QUALITY_PRESET==39)\n#define FXAA_QUALITY_PS 12\n#define FXAA_QUALITY_P0 1.0\n#define FXAA_QUALITY_P1 1.0\n#define FXAA_QUALITY_P2 1.0\n#define FXAA_QUALITY_P3 1.0\n#define FXAA_QUALITY_P4 1.0\n#define FXAA_QUALITY_P5 1.5\n#define FXAA_QUALITY_P6 2.0\n#define FXAA_QUALITY_P7 2.0\n#define FXAA_QUALITY_P8 2.0\n#define FXAA_QUALITY_P9 2.0\n#define FXAA_QUALITY_P10 4.0\n#define FXAA_QUALITY_P11 8.0\n#endif\n#if (FXAA_GLSL_100==1)||(FXAA_GLSL_120==1)||(FXAA_GLSL_130==1)\n#define FxaaBool bool\n#define FxaaDiscard discard\n#define FxaaFloat float\n#define FxaaFloat2 vec2\n#define FxaaFloat3 vec3\n#define FxaaFloat4 vec4\n#define FxaaHalf float\n#define FxaaHalf2 vec2\n#define FxaaHalf3 vec3\n#define FxaaHalf4 vec4\n#define FxaaInt2 ivec2\n#define FxaaSat(x)clamp(x,0.0,1.0)\n#define FxaaTex sampler2D\n#else\n#define FxaaBool bool\n#define FxaaDiscard clip(-1)\n#define FxaaFloat float\n#define FxaaFloat2 float2\n#define FxaaFloat3 float3\n#define FxaaFloat4 float4\n#define FxaaHalf half\n#define FxaaHalf2 half2\n#define FxaaHalf3 half3\n#define FxaaHalf4 half4\n#define FxaaSat(x)saturate(x)\n#endif\n#if (FXAA_GLSL_100==1)\n#define FxaaTexTop(t,p)texture2D(t,p,0.0)\n#define FxaaTexOff(t,p,o,r)texture2D(t,p+(o*r),0.0)\n#endif\n#if (FXAA_GLSL_120==1)\n#define FxaaTexTop(t,p)texture2DLod(t,p,0.0)\n#if (FXAA_FAST_PIXEL_OFFSET==1)\n#define FxaaTexOff(t,p,o,r)texture2DLodOffset(t,p,0.0,o)\n#else\n#define FxaaTexOff(t,p,o,r)texture2DLod(t,p+(o*r),0.0)\n#endif\n#if (FXAA_GATHER4_ALPHA==1)\n#define FxaaTexAlpha4(t,p)textureGather(t,p,3)\n#define FxaaTexOffAlpha4(t,p,o)textureGatherOffset(t,p,o,3)\n#define FxaaTexGreen4(t,p)textureGather(t,p,1)\n#define FxaaTexOffGreen4(t,p,o)textureGatherOffset(t,p,o,1)\n#endif\n#endif\n#if (FXAA_GLSL_130==1)\n#define FxaaTexTop(t,p)textureLod(t,p,0.0)\n#define FxaaTexOff(t,p,o,r)textureLodOffset(t,p,0.0,o)\n#if (FXAA_GATHER4_ALPHA==1)\n#define FxaaTexAlpha4(t,p)textureGather(t,p,3)\n#define FxaaTexOffAlpha4(t,p,o)textureGatherOffset(t,p,o,3)\n#define FxaaTexGreen4(t,p)textureGather(t,p,1)\n#define FxaaTexOffGreen4(t,p,o)textureGatherOffset(t,p,o,1)\n#endif\n#endif\n#if (FXAA_HLSL_3==1)\n#define FxaaInt2 float2\n#define FxaaTex sampler2D\n#define FxaaTexTop(t,p)tex2Dlod(t,float4(p,0.0,0.0))\n#define FxaaTexOff(t,p,o,r)tex2Dlod(t,float4(p+(o*r),0,0))\n#endif\n#if (FXAA_HLSL_4==1)\n#define FxaaInt2 int2\nstruct FxaaTex{SamplerState smpl;Texture2D tex;};\n#define FxaaTexTop(t,p)t.tex.SampleLevel(t.smpl,p,0.0)\n#define FxaaTexOff(t,p,o,r)t.tex.SampleLevel(t.smpl,p,0.0,o)\n#endif\n#if (FXAA_HLSL_5==1)\n#define FxaaInt2 int2\nstruct FxaaTex{SamplerState smpl;Texture2D tex;};\n#define FxaaTexTop(t,p)t.tex.SampleLevel(t.smpl,p,0.0)\n#define FxaaTexOff(t,p,o,r)t.tex.SampleLevel(t.smpl,p,0.0,o)\n#define FxaaTexAlpha4(t,p)t.tex.GatherAlpha(t.smpl,p)\n#define FxaaTexOffAlpha4(t,p,o)t.tex.GatherAlpha(t.smpl,p,o)\n#define FxaaTexGreen4(t,p)t.tex.GatherGreen(t.smpl,p)\n#define FxaaTexOffGreen4(t,p,o)t.tex.GatherGreen(t.smpl,p,o)\n#endif\n#if (FXAA_GREEN_AS_LUMA==0)\nFxaaFloat FxaaLuma(FxaaFloat4 rgba){return rgba.w;}\n#else\nFxaaFloat FxaaLuma(FxaaFloat4 rgba){return rgba.y;}\n#endif\n#if (FXAA_PC==1)\nFxaaFloat4 FxaaPixelShader(FxaaFloat2 pos,FxaaFloat4 fxaaConsolePosPos,FxaaTex tex,FxaaTex fxaaConsole360TexExpBiasNegOne,FxaaTex fxaaConsole360TexExpBiasNegTwo,FxaaFloat2 fxaaQualityRcpFrame,FxaaFloat4 fxaaConsoleRcpFrameOpt,FxaaFloat4 fxaaConsoleRcpFrameOpt2,FxaaFloat4 fxaaConsole360RcpFrameOpt2,FxaaFloat fxaaQualitySubpix,FxaaFloat fxaaQualityEdgeThreshold,FxaaFloat fxaaQualityEdgeThresholdMin,FxaaFloat fxaaConsoleEdgeSharpness,FxaaFloat fxaaConsoleEdgeThreshold,FxaaFloat fxaaConsoleEdgeThresholdMin,FxaaFloat4 fxaaConsole360ConstDir){FxaaFloat2 posM;posM.x=pos.x;posM.y=pos.y;\n#if (FXAA_GATHER4_ALPHA==1)\n#if (FXAA_DISCARD==0)\nFxaaFloat4 rgbyM=FxaaTexTop(tex,posM);\n#if (FXAA_GREEN_AS_LUMA==0)\n#define lumaM rgbyM.w\n#else\n#define lumaM rgbyM.y\n#endif\n#endif\n#if (FXAA_GREEN_AS_LUMA==0)\nFxaaFloat4 luma4A=FxaaTexAlpha4(tex,posM);FxaaFloat4 luma4B=FxaaTexOffAlpha4(tex,posM,FxaaInt2(-1,-1));\n#else\nFxaaFloat4 luma4A=FxaaTexGreen4(tex,posM);FxaaFloat4 luma4B=FxaaTexOffGreen4(tex,posM,FxaaInt2(-1,-1));\n#endif\n#if (FXAA_DISCARD==1)\n#define lumaM luma4A.w\n#endif\n#define lumaE luma4A.z\n#define lumaS luma4A.x\n#define lumaSE luma4A.y\n#define lumaNW luma4B.w\n#define lumaN luma4B.z\n#define lumaW luma4B.x\n#else\nFxaaFloat4 rgbyM=FxaaTexTop(tex,posM);\n#if (FXAA_GREEN_AS_LUMA==0)\n#define lumaM rgbyM.w\n#else\n#define lumaM rgbyM.y\n#endif\n#if (FXAA_GLSL_100==1)\nFxaaFloat lumaS=FxaaLuma(FxaaTexOff(tex,posM,FxaaFloat2(0.0,1.0),fxaaQualityRcpFrame.xy));FxaaFloat lumaE=FxaaLuma(FxaaTexOff(tex,posM,FxaaFloat2(1.0,0.0),fxaaQualityRcpFrame.xy));FxaaFloat lumaN=FxaaLuma(FxaaTexOff(tex,posM,FxaaFloat2(0.0,-1.0),fxaaQualityRcpFrame.xy));FxaaFloat lumaW=FxaaLuma(FxaaTexOff(tex,posM,FxaaFloat2(-1.0,0.0),fxaaQualityRcpFrame.xy));\n#else\nFxaaFloat lumaS=FxaaLuma(FxaaTexOff(tex,posM,FxaaInt2(0,1),fxaaQualityRcpFrame.xy));FxaaFloat lumaE=FxaaLuma(FxaaTexOff(tex,posM,FxaaInt2(1,0),fxaaQualityRcpFrame.xy));FxaaFloat lumaN=FxaaLuma(FxaaTexOff(tex,posM,FxaaInt2(0,-1),fxaaQualityRcpFrame.xy));FxaaFloat lumaW=FxaaLuma(FxaaTexOff(tex,posM,FxaaInt2(-1,0),fxaaQualityRcpFrame.xy));\n#endif\n#endif\nFxaaFloat maxSM=max(lumaS,lumaM);FxaaFloat minSM=min(lumaS,lumaM);FxaaFloat maxESM=max(lumaE,maxSM);FxaaFloat minESM=min(lumaE,minSM);FxaaFloat maxWN=max(lumaN,lumaW);FxaaFloat minWN=min(lumaN,lumaW);FxaaFloat rangeMax=max(maxWN,maxESM);FxaaFloat rangeMin=min(minWN,minESM);FxaaFloat rangeMaxScaled=rangeMax*fxaaQualityEdgeThreshold;FxaaFloat range=rangeMax-rangeMin;FxaaFloat rangeMaxClamped=max(fxaaQualityEdgeThresholdMin,rangeMaxScaled);FxaaBool earlyExit=range<rangeMaxClamped;if(earlyExit)\n#if (FXAA_DISCARD==1)\nFxaaDiscard;\n#else\nreturn rgbyM;\n#endif\n#if (FXAA_GATHER4_ALPHA==0)\n#if (FXAA_GLSL_100==1)\nFxaaFloat lumaNW=FxaaLuma(FxaaTexOff(tex,posM,FxaaFloat2(-1.0,-1.0),fxaaQualityRcpFrame.xy));FxaaFloat lumaSE=FxaaLuma(FxaaTexOff(tex,posM,FxaaFloat2(1.0,1.0),fxaaQualityRcpFrame.xy));FxaaFloat lumaNE=FxaaLuma(FxaaTexOff(tex,posM,FxaaFloat2(1.0,-1.0),fxaaQualityRcpFrame.xy));FxaaFloat lumaSW=FxaaLuma(FxaaTexOff(tex,posM,FxaaFloat2(-1.0,1.0),fxaaQualityRcpFrame.xy));\n#else\nFxaaFloat lumaNW=FxaaLuma(FxaaTexOff(tex,posM,FxaaInt2(-1,-1),fxaaQualityRcpFrame.xy));FxaaFloat lumaSE=FxaaLuma(FxaaTexOff(tex,posM,FxaaInt2(1,1),fxaaQualityRcpFrame.xy));FxaaFloat lumaNE=FxaaLuma(FxaaTexOff(tex,posM,FxaaInt2(1,-1),fxaaQualityRcpFrame.xy));FxaaFloat lumaSW=FxaaLuma(FxaaTexOff(tex,posM,FxaaInt2(-1,1),fxaaQualityRcpFrame.xy));\n#endif\n#else\nFxaaFloat lumaNE=FxaaLuma(FxaaTexOff(tex,posM,FxaaInt2(1,-1),fxaaQualityRcpFrame.xy));FxaaFloat lumaSW=FxaaLuma(FxaaTexOff(tex,posM,FxaaInt2(-1,1),fxaaQualityRcpFrame.xy));\n#endif\nFxaaFloat lumaNS=lumaN+lumaS;FxaaFloat lumaWE=lumaW+lumaE;FxaaFloat subpixRcpRange=1.0/range;FxaaFloat subpixNSWE=lumaNS+lumaWE;FxaaFloat edgeHorz1=(-2.0*lumaM)+lumaNS;FxaaFloat edgeVert1=(-2.0*lumaM)+lumaWE;FxaaFloat lumaNESE=lumaNE+lumaSE;FxaaFloat lumaNWNE=lumaNW+lumaNE;FxaaFloat edgeHorz2=(-2.0*lumaE)+lumaNESE;FxaaFloat edgeVert2=(-2.0*lumaN)+lumaNWNE;FxaaFloat lumaNWSW=lumaNW+lumaSW;FxaaFloat lumaSWSE=lumaSW+lumaSE;FxaaFloat edgeHorz4=(abs(edgeHorz1)*2.0)+abs(edgeHorz2);FxaaFloat edgeVert4=(abs(edgeVert1)*2.0)+abs(edgeVert2);FxaaFloat edgeHorz3=(-2.0*lumaW)+lumaNWSW;FxaaFloat edgeVert3=(-2.0*lumaS)+lumaSWSE;FxaaFloat edgeHorz=abs(edgeHorz3)+edgeHorz4;FxaaFloat edgeVert=abs(edgeVert3)+edgeVert4;FxaaFloat subpixNWSWNESE=lumaNWSW+lumaNESE;FxaaFloat lengthSign=fxaaQualityRcpFrame.x;FxaaBool horzSpan=edgeHorz>=edgeVert;FxaaFloat subpixA=subpixNSWE*2.0+subpixNWSWNESE;if(!horzSpan)lumaN=lumaW;if(!horzSpan)lumaS=lumaE;if(horzSpan)lengthSign=fxaaQualityRcpFrame.y;FxaaFloat subpixB=(subpixA*(1.0/12.0))-lumaM;FxaaFloat gradientN=lumaN-lumaM;FxaaFloat gradientS=lumaS-lumaM;FxaaFloat lumaNN=lumaN+lumaM;FxaaFloat lumaSS=lumaS+lumaM;FxaaBool pairN=abs(gradientN)>=abs(gradientS);FxaaFloat gradient=max(abs(gradientN),abs(gradientS));if(pairN)lengthSign=-lengthSign;FxaaFloat subpixC=FxaaSat(abs(subpixB)*subpixRcpRange);FxaaFloat2 posB;posB.x=posM.x;posB.y=posM.y;FxaaFloat2 offNP;offNP.x=(!horzSpan)?0.0:fxaaQualityRcpFrame.x;offNP.y=(horzSpan)?0.0:fxaaQualityRcpFrame.y;if(!horzSpan)posB.x+=lengthSign*0.5;if(horzSpan)posB.y+=lengthSign*0.5;FxaaFloat2 posN;posN.x=posB.x-offNP.x*FXAA_QUALITY_P0;posN.y=posB.y-offNP.y*FXAA_QUALITY_P0;FxaaFloat2 posP;posP.x=posB.x+offNP.x*FXAA_QUALITY_P0;posP.y=posB.y+offNP.y*FXAA_QUALITY_P0;FxaaFloat subpixD=((-2.0)*subpixC)+3.0;FxaaFloat lumaEndN=FxaaLuma(FxaaTexTop(tex,posN));FxaaFloat subpixE=subpixC*subpixC;FxaaFloat lumaEndP=FxaaLuma(FxaaTexTop(tex,posP));if(!pairN)lumaNN=lumaSS;FxaaFloat gradientScaled=gradient*1.0/4.0;FxaaFloat lumaMM=lumaM-lumaNN*0.5;FxaaFloat subpixF=subpixD*subpixE;FxaaBool lumaMLTZero=lumaMM<0.0;lumaEndN-=lumaNN*0.5;lumaEndP-=lumaNN*0.5;FxaaBool doneN=abs(lumaEndN)>=gradientScaled;FxaaBool doneP=abs(lumaEndP)>=gradientScaled;if(!doneN)posN.x-=offNP.x*FXAA_QUALITY_P1;if(!doneN)posN.y-=offNP.y*FXAA_QUALITY_P1;FxaaBool doneNP=(!doneN)||(!doneP);if(!doneP)posP.x+=offNP.x*FXAA_QUALITY_P1;if(!doneP)posP.y+=offNP.y*FXAA_QUALITY_P1;if(doneNP){if(!doneN)lumaEndN=FxaaLuma(FxaaTexTop(tex,posN.xy));if(!doneP)lumaEndP=FxaaLuma(FxaaTexTop(tex,posP.xy));if(!doneN)lumaEndN=lumaEndN-lumaNN*0.5;if(!doneP)lumaEndP=lumaEndP-lumaNN*0.5;doneN=abs(lumaEndN)>=gradientScaled;doneP=abs(lumaEndP)>=gradientScaled;if(!doneN)posN.x-=offNP.x*FXAA_QUALITY_P2;if(!doneN)posN.y-=offNP.y*FXAA_QUALITY_P2;doneNP=(!doneN)||(!doneP);if(!doneP)posP.x+=offNP.x*FXAA_QUALITY_P2;if(!doneP)posP.y+=offNP.y*FXAA_QUALITY_P2;\n#if (FXAA_QUALITY_PS>3)\nif(doneNP){if(!doneN)lumaEndN=FxaaLuma(FxaaTexTop(tex,posN.xy));if(!doneP)lumaEndP=FxaaLuma(FxaaTexTop(tex,posP.xy));if(!doneN)lumaEndN=lumaEndN-lumaNN*0.5;if(!doneP)lumaEndP=lumaEndP-lumaNN*0.5;doneN=abs(lumaEndN)>=gradientScaled;doneP=abs(lumaEndP)>=gradientScaled;if(!doneN)posN.x-=offNP.x*FXAA_QUALITY_P3;if(!doneN)posN.y-=offNP.y*FXAA_QUALITY_P3;doneNP=(!doneN)||(!doneP);if(!doneP)posP.x+=offNP.x*FXAA_QUALITY_P3;if(!doneP)posP.y+=offNP.y*FXAA_QUALITY_P3;\n#if (FXAA_QUALITY_PS>4)\nif(doneNP){if(!doneN)lumaEndN=FxaaLuma(FxaaTexTop(tex,posN.xy));if(!doneP)lumaEndP=FxaaLuma(FxaaTexTop(tex,posP.xy));if(!doneN)lumaEndN=lumaEndN-lumaNN*0.5;if(!doneP)lumaEndP=lumaEndP-lumaNN*0.5;doneN=abs(lumaEndN)>=gradientScaled;doneP=abs(lumaEndP)>=gradientScaled;if(!doneN)posN.x-=offNP.x*FXAA_QUALITY_P4;if(!doneN)posN.y-=offNP.y*FXAA_QUALITY_P4;doneNP=(!doneN)||(!doneP);if(!doneP)posP.x+=offNP.x*FXAA_QUALITY_P4;if(!doneP)posP.y+=offNP.y*FXAA_QUALITY_P4;\n#if (FXAA_QUALITY_PS>5)\nif(doneNP){if(!doneN)lumaEndN=FxaaLuma(FxaaTexTop(tex,posN.xy));if(!doneP)lumaEndP=FxaaLuma(FxaaTexTop(tex,posP.xy));if(!doneN)lumaEndN=lumaEndN-lumaNN*0.5;if(!doneP)lumaEndP=lumaEndP-lumaNN*0.5;doneN=abs(lumaEndN)>=gradientScaled;doneP=abs(lumaEndP)>=gradientScaled;if(!doneN)posN.x-=offNP.x*FXAA_QUALITY_P5;if(!doneN)posN.y-=offNP.y*FXAA_QUALITY_P5;doneNP=(!doneN)||(!doneP);if(!doneP)posP.x+=offNP.x*FXAA_QUALITY_P5;if(!doneP)posP.y+=offNP.y*FXAA_QUALITY_P5;\n#if (FXAA_QUALITY_PS>6)\nif(doneNP){if(!doneN)lumaEndN=FxaaLuma(FxaaTexTop(tex,posN.xy));if(!doneP)lumaEndP=FxaaLuma(FxaaTexTop(tex,posP.xy));if(!doneN)lumaEndN=lumaEndN-lumaNN*0.5;if(!doneP)lumaEndP=lumaEndP-lumaNN*0.5;doneN=abs(lumaEndN)>=gradientScaled;doneP=abs(lumaEndP)>=gradientScaled;if(!doneN)posN.x-=offNP.x*FXAA_QUALITY_P6;if(!doneN)posN.y-=offNP.y*FXAA_QUALITY_P6;doneNP=(!doneN)||(!doneP);if(!doneP)posP.x+=offNP.x*FXAA_QUALITY_P6;if(!doneP)posP.y+=offNP.y*FXAA_QUALITY_P6;\n#if (FXAA_QUALITY_PS>7)\nif(doneNP){if(!doneN)lumaEndN=FxaaLuma(FxaaTexTop(tex,posN.xy));if(!doneP)lumaEndP=FxaaLuma(FxaaTexTop(tex,posP.xy));if(!doneN)lumaEndN=lumaEndN-lumaNN*0.5;if(!doneP)lumaEndP=lumaEndP-lumaNN*0.5;doneN=abs(lumaEndN)>=gradientScaled;doneP=abs(lumaEndP)>=gradientScaled;if(!doneN)posN.x-=offNP.x*FXAA_QUALITY_P7;if(!doneN)posN.y-=offNP.y*FXAA_QUALITY_P7;doneNP=(!doneN)||(!doneP);if(!doneP)posP.x+=offNP.x*FXAA_QUALITY_P7;if(!doneP)posP.y+=offNP.y*FXAA_QUALITY_P7;\n#if (FXAA_QUALITY_PS>8)\nif(doneNP){if(!doneN)lumaEndN=FxaaLuma(FxaaTexTop(tex,posN.xy));if(!doneP)lumaEndP=FxaaLuma(FxaaTexTop(tex,posP.xy));if(!doneN)lumaEndN=lumaEndN-lumaNN*0.5;if(!doneP)lumaEndP=lumaEndP-lumaNN*0.5;doneN=abs(lumaEndN)>=gradientScaled;doneP=abs(lumaEndP)>=gradientScaled;if(!doneN)posN.x-=offNP.x*FXAA_QUALITY_P8;if(!doneN)posN.y-=offNP.y*FXAA_QUALITY_P8;doneNP=(!doneN)||(!doneP);if(!doneP)posP.x+=offNP.x*FXAA_QUALITY_P8;if(!doneP)posP.y+=offNP.y*FXAA_QUALITY_P8;\n#if (FXAA_QUALITY_PS>9)\nif(doneNP){if(!doneN)lumaEndN=FxaaLuma(FxaaTexTop(tex,posN.xy));if(!doneP)lumaEndP=FxaaLuma(FxaaTexTop(tex,posP.xy));if(!doneN)lumaEndN=lumaEndN-lumaNN*0.5;if(!doneP)lumaEndP=lumaEndP-lumaNN*0.5;doneN=abs(lumaEndN)>=gradientScaled;doneP=abs(lumaEndP)>=gradientScaled;if(!doneN)posN.x-=offNP.x*FXAA_QUALITY_P9;if(!doneN)posN.y-=offNP.y*FXAA_QUALITY_P9;doneNP=(!doneN)||(!doneP);if(!doneP)posP.x+=offNP.x*FXAA_QUALITY_P9;if(!doneP)posP.y+=offNP.y*FXAA_QUALITY_P9;\n#if (FXAA_QUALITY_PS>10)\nif(doneNP){if(!doneN)lumaEndN=FxaaLuma(FxaaTexTop(tex,posN.xy));if(!doneP)lumaEndP=FxaaLuma(FxaaTexTop(tex,posP.xy));if(!doneN)lumaEndN=lumaEndN-lumaNN*0.5;if(!doneP)lumaEndP=lumaEndP-lumaNN*0.5;doneN=abs(lumaEndN)>=gradientScaled;doneP=abs(lumaEndP)>=gradientScaled;if(!doneN)posN.x-=offNP.x*FXAA_QUALITY_P10;if(!doneN)posN.y-=offNP.y*FXAA_QUALITY_P10;doneNP=(!doneN)||(!doneP);if(!doneP)posP.x+=offNP.x*FXAA_QUALITY_P10;if(!doneP)posP.y+=offNP.y*FXAA_QUALITY_P10;\n#if (FXAA_QUALITY_PS>11)\nif(doneNP){if(!doneN)lumaEndN=FxaaLuma(FxaaTexTop(tex,posN.xy));if(!doneP)lumaEndP=FxaaLuma(FxaaTexTop(tex,posP.xy));if(!doneN)lumaEndN=lumaEndN-lumaNN*0.5;if(!doneP)lumaEndP=lumaEndP-lumaNN*0.5;doneN=abs(lumaEndN)>=gradientScaled;doneP=abs(lumaEndP)>=gradientScaled;if(!doneN)posN.x-=offNP.x*FXAA_QUALITY_P11;if(!doneN)posN.y-=offNP.y*FXAA_QUALITY_P11;doneNP=(!doneN)||(!doneP);if(!doneP)posP.x+=offNP.x*FXAA_QUALITY_P11;if(!doneP)posP.y+=offNP.y*FXAA_QUALITY_P11;\n#if (FXAA_QUALITY_PS>12)\nif(doneNP){if(!doneN)lumaEndN=FxaaLuma(FxaaTexTop(tex,posN.xy));if(!doneP)lumaEndP=FxaaLuma(FxaaTexTop(tex,posP.xy));if(!doneN)lumaEndN=lumaEndN-lumaNN*0.5;if(!doneP)lumaEndP=lumaEndP-lumaNN*0.5;doneN=abs(lumaEndN)>=gradientScaled;doneP=abs(lumaEndP)>=gradientScaled;if(!doneN)posN.x-=offNP.x*FXAA_QUALITY_P12;if(!doneN)posN.y-=offNP.y*FXAA_QUALITY_P12;doneNP=(!doneN)||(!doneP);if(!doneP)posP.x+=offNP.x*FXAA_QUALITY_P12;if(!doneP)posP.y+=offNP.y*FXAA_QUALITY_P12;}\n#endif\n}\n#endif\n}\n#endif\n}\n#endif\n}\n#endif\n}\n#endif\n}\n#endif\n}\n#endif\n}\n#endif\n}\n#endif\n}FxaaFloat dstN=posM.x-posN.x;FxaaFloat dstP=posP.x-posM.x;if(!horzSpan)dstN=posM.y-posN.y;if(!horzSpan)dstP=posP.y-posM.y;FxaaBool goodSpanN=(lumaEndN<0.0)!=lumaMLTZero;FxaaFloat spanLength=(dstP+dstN);FxaaBool goodSpanP=(lumaEndP<0.0)!=lumaMLTZero;FxaaFloat spanLengthRcp=1.0/spanLength;FxaaBool directionN=dstN<dstP;FxaaFloat dst=min(dstN,dstP);FxaaBool goodSpan=directionN?goodSpanN:goodSpanP;FxaaFloat subpixG=subpixF*subpixF;FxaaFloat pixelOffset=(dst*(-spanLengthRcp))+0.5;FxaaFloat subpixH=subpixG*fxaaQualitySubpix;FxaaFloat pixelOffsetGood=goodSpan?pixelOffset:0.0;FxaaFloat pixelOffsetSubpix=max(pixelOffsetGood,subpixH);if(!horzSpan)posM.x+=pixelOffsetSubpix*lengthSign;if(horzSpan)posM.y+=pixelOffsetSubpix*lengthSign;\n#if (FXAA_DISCARD==1)\nreturn FxaaTexTop(tex,posM);\n#else\nreturn FxaaFloat4(FxaaTexTop(tex,posM).xyz,lumaM);\n#endif\n}\n#endif\nvoid main(){gl_FragColor=FxaaPixelShader(vUv,vec4(0.0),tDiffuse,tDiffuse,tDiffuse,resolution,vec4(0.0),vec4(0.0),vec4(0.0),0.75,0.166,0.0833,0.0,0.0,0.0,vec4(0.0));gl_FragColor.a=texture2D(tDiffuse,vUv).a;}",
    };
    (e.BodyPart = Ur),
        (e.CapeObject = zr),
        (e.CompositeAnimation = qr),
        (e.ElytraObject = Gr),
        (e.FXAASkinViewer = class extends Jr {
            constructor(e) {
                super(e),
                    (this.composer = new la(this.renderer)),
                    (this.renderPass = new ha(this.scene, this.camera)),
                    (this.fxaaPass = new aa(da)),
                    this.composer.addPass(this.renderPass),
                    this.composer.addPass(this.fxaaPass),
                    this.updateComposerSize();
            }
            setSize(e, t) {
                super.setSize(e, t), void 0 !== this.composer && this.updateComposerSize();
            }
            updateComposerSize() {
                this.composer.setSize(this.width, this.height);
                const e = this.renderer.getPixelRatio();
                this.composer.setPixelRatio(e), (this.fxaaPass.material.uniforms.resolution.value.x = 1 / (this.width * e)), (this.fxaaPass.material.uniforms.resolution.value.y = 1 / (this.height * e));
            }
            render() {
                this.composer.render();
            }
            dispose() {
                super.dispose(), this.fxaaPass.fsQuad.dispose();
            }
        }),
        (e.FlyingAnimation = (e, t) => {
            t < 0 && (t = 0);
            const n = ((a = 1), (i = ((t *= 20) * t) / 100) <= (r = 0) ? r : i >= a ? a : i);
            var i, r, a;
            (e.rotation.x = (n * Math.PI) / 2), (e.skin.head.rotation.x = n > 0.5 ? Math.PI / 4 - e.rotation.x : 0);
            const o = 0.25 * Math.PI * n;
            (e.skin.leftArm.rotation.z = o), (e.skin.rightArm.rotation.z = -o);
            const s = 0.34906584,
                l = Math.PI / 2,
                c = Math.pow(0.9, t);
            (e.elytra.leftWing.rotation.x = s + -0.08726644 * c), (e.elytra.leftWing.rotation.z = l + c * (0.2617994 - l)), e.elytra.updateRightWing();
        }),
        (e.PlayerObject = Br),
        (e.RootAnimation = Zr),
        (e.RotatingAnimation = (e, t) => {
            e.rotation.y = t;
        }),
        (e.RunningAnimation = (e, t) => {
            const n = e.skin;
            (t = 15 * t + 0.5 * Math.PI), (n.leftLeg.rotation.x = 1.3 * Math.cos(t + Math.PI)), (n.rightLeg.rotation.x = 1.3 * Math.cos(t)), (n.leftArm.rotation.x = 1.5 * Math.cos(t)), (n.rightArm.rotation.x = 1.5 * Math.cos(t + Math.PI));
            const i = 0.1 * Math.PI;
            (n.leftArm.rotation.z = 0.1 * Math.cos(t) + i), (n.rightArm.rotation.z = 0.1 * Math.cos(t + Math.PI) - i), (e.position.y = Math.cos(2 * t)), (e.position.x = 0.15 * Math.cos(t)), (e.rotation.z = 0.01 * Math.cos(t + Math.PI));
            const r = 0.3 * Math.PI;
            e.cape.rotation.x = 0.1 * Math.sin(2 * t) + r;
        }),
        (e.SkinObject = Or),
        (e.SkinViewer = Jr),
        (e.WalkingAnimation = (e, t) => {
            const n = e.skin;
            (t *= 8), (n.leftLeg.rotation.x = 0.5 * Math.sin(t)), (n.rightLeg.rotation.x = 0.5 * Math.sin(t + Math.PI)), (n.leftArm.rotation.x = 0.5 * Math.sin(t + Math.PI)), (n.rightArm.rotation.x = 0.5 * Math.sin(t));
            const i = 0.02 * Math.PI;
            (n.leftArm.rotation.z = 0.03 * Math.cos(t) + i), (n.rightArm.rotation.z = 0.03 * Math.cos(t + Math.PI) - i), (n.head.rotation.y = 0.2 * Math.sin(t / 4)), (n.head.rotation.x = 0.1 * Math.sin(t / 5));
            const r = 0.06 * Math.PI;
            e.cape.rotation.x = 0.06 * Math.sin(t / 1.5) + r;
        }),
        (e.createOrbitControls = function (e) {
            const t = new Kr(e.camera, e.renderer.domElement);
            return (t.enablePan = !1), (t.target = new H(0, -8, 0)), (t.minDistance = 10), (t.maxDistance = 256), t.update(), t;
        }),
        (e.invokeAnimation = jr),
        Object.defineProperty(e, "__esModule", { value: !0 });
});
