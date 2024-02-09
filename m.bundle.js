// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

function initEmscriptenModule(moduleFactory, wasmModule) {
    let instantiateWasm;
    if (wasmModule) {
        instantiateWasm = (imports, callback)=>{
            const instance = new WebAssembly.Instance(wasmModule, imports);
            callback(instance);
            return instance.exports;
        };
    }
    return moduleFactory({
        noInitialRun: true,
        instantiateWasm
    });
}
const importMeta = {
    url: "https://unpkg.com/@jsquash/webp@1.2.0/codec/dec/webp_dec.js?module",
    main: false
};
var Module = (()=>{
    var _scriptDir = importMeta.url;
    return function(Module = {}) {
        var Module = typeof Module != "undefined" ? Module : {};
        var readyPromiseResolve, readyPromiseReject;
        Module["ready"] = new Promise(function(resolve, reject) {
            readyPromiseResolve = resolve;
            readyPromiseReject = reject;
        });
        const isServiceWorker = globalThis.ServiceWorkerGlobalScope !== undefined;
        const isRunningInCloudFlareWorkers = isServiceWorker && typeof self !== "undefined" && caches.default !== undefined;
        if (isRunningInCloudFlareWorkers) {
            if (!globalThis.ImageData) {
                globalThis.ImageData = class ImageData {
                    constructor(data, width, height){
                        this.data = data;
                        this.width = width;
                        this.height = height;
                    }
                };
            }
            if (importMeta.url === undefined) {
                importMeta.url = "https://localhost";
            }
            if (self.location === undefined) {
                self.location = {
                    href: ""
                };
            }
        }
        var moduleOverrides = Object.assign({}, Module);
        var arguments_ = [];
        var thisProgram = "./this.program";
        var quit_ = (status, toThrow)=>{
            throw toThrow;
        };
        var ENVIRONMENT_IS_WEB = typeof window == "object";
        var ENVIRONMENT_IS_WORKER = typeof importScripts == "function";
        typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string";
        var scriptDirectory = "";
        function locateFile(path) {
            if (Module["locateFile"]) {
                return Module["locateFile"](path, scriptDirectory);
            }
            return scriptDirectory + path;
        }
        var readBinary;
        if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
            if (ENVIRONMENT_IS_WORKER) {
                scriptDirectory = self.location.href;
            } else if (typeof document != "undefined" && document.currentScript) {
                scriptDirectory = document.currentScript.src;
            }
            if (_scriptDir) {
                scriptDirectory = _scriptDir;
            }
            if (scriptDirectory.indexOf("blob:") !== 0) {
                scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1);
            } else {
                scriptDirectory = "";
            }
            {
                (url)=>{
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", url, false);
                    xhr.send(null);
                    return xhr.responseText;
                };
                if (ENVIRONMENT_IS_WORKER) {
                    readBinary = (url)=>{
                        var xhr = new XMLHttpRequest();
                        xhr.open("GET", url, false);
                        xhr.responseType = "arraybuffer";
                        xhr.send(null);
                        return new Uint8Array(xhr.response);
                    };
                }
                (url, onload, onerror)=>{
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", url, true);
                    xhr.responseType = "arraybuffer";
                    xhr.onload = ()=>{
                        if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
                            onload(xhr.response);
                            return;
                        }
                        onerror();
                    };
                    xhr.onerror = onerror;
                    xhr.send(null);
                };
            }
            (title)=>document.title = title;
        } else {}
        Module["print"] || console.log.bind(console);
        var err = Module["printErr"] || console.warn.bind(console);
        Object.assign(Module, moduleOverrides);
        moduleOverrides = null;
        if (Module["arguments"]) arguments_ = Module["arguments"];
        if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
        if (Module["quit"]) quit_ = Module["quit"];
        var wasmBinary;
        if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];
        Module["noExitRuntime"] || true;
        if (typeof WebAssembly != "object") {
            abort("no native wasm support detected");
        }
        var wasmMemory;
        var ABORT = false;
        function UTF8ArrayToString(heapOrArray, idx, maxBytesToRead) {
            var endIdx = idx + maxBytesToRead;
            var str = "";
            while(!(idx >= endIdx)){
                var u0 = heapOrArray[idx++];
                if (!u0) return str;
                if (!(u0 & 128)) {
                    str += String.fromCharCode(u0);
                    continue;
                }
                var u1 = heapOrArray[idx++] & 63;
                if ((u0 & 224) == 192) {
                    str += String.fromCharCode((u0 & 31) << 6 | u1);
                    continue;
                }
                var u2 = heapOrArray[idx++] & 63;
                if ((u0 & 240) == 224) {
                    u0 = (u0 & 15) << 12 | u1 << 6 | u2;
                } else {
                    u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63;
                }
                if (u0 < 65536) {
                    str += String.fromCharCode(u0);
                } else {
                    var ch = u0 - 65536;
                    str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
                }
            }
            return str;
        }
        function UTF8ToString(ptr, maxBytesToRead) {
            return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
        }
        function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
            if (!(maxBytesToWrite > 0)) return 0;
            var startIdx = outIdx;
            var endIdx = outIdx + maxBytesToWrite - 1;
            for(var i = 0; i < str.length; ++i){
                var u = str.charCodeAt(i);
                if (u >= 55296 && u <= 57343) {
                    var u1 = str.charCodeAt(++i);
                    u = 65536 + ((u & 1023) << 10) | u1 & 1023;
                }
                if (u <= 127) {
                    if (outIdx >= endIdx) break;
                    heap[outIdx++] = u;
                } else if (u <= 2047) {
                    if (outIdx + 1 >= endIdx) break;
                    heap[outIdx++] = 192 | u >> 6;
                    heap[outIdx++] = 128 | u & 63;
                } else if (u <= 65535) {
                    if (outIdx + 2 >= endIdx) break;
                    heap[outIdx++] = 224 | u >> 12;
                    heap[outIdx++] = 128 | u >> 6 & 63;
                    heap[outIdx++] = 128 | u & 63;
                } else {
                    if (outIdx + 3 >= endIdx) break;
                    heap[outIdx++] = 240 | u >> 18;
                    heap[outIdx++] = 128 | u >> 12 & 63;
                    heap[outIdx++] = 128 | u >> 6 & 63;
                    heap[outIdx++] = 128 | u & 63;
                }
            }
            heap[outIdx] = 0;
            return outIdx - startIdx;
        }
        function stringToUTF8(str, outPtr, maxBytesToWrite) {
            return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
        }
        function lengthBytesUTF8(str) {
            var len = 0;
            for(var i = 0; i < str.length; ++i){
                var c = str.charCodeAt(i);
                if (c <= 127) {
                    len++;
                } else if (c <= 2047) {
                    len += 2;
                } else if (c >= 55296 && c <= 57343) {
                    len += 4;
                    ++i;
                } else {
                    len += 3;
                }
            }
            return len;
        }
        var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
        function updateMemoryViews() {
            var b = wasmMemory.buffer;
            Module["HEAP8"] = HEAP8 = new Int8Array(b);
            Module["HEAP16"] = HEAP16 = new Int16Array(b);
            Module["HEAP32"] = HEAP32 = new Int32Array(b);
            Module["HEAPU8"] = HEAPU8 = new Uint8Array(b);
            Module["HEAPU16"] = HEAPU16 = new Uint16Array(b);
            Module["HEAPU32"] = HEAPU32 = new Uint32Array(b);
            Module["HEAPF32"] = HEAPF32 = new Float32Array(b);
            Module["HEAPF64"] = HEAPF64 = new Float64Array(b);
        }
        var wasmTable;
        var __ATPRERUN__ = [];
        var __ATINIT__ = [];
        var __ATPOSTRUN__ = [];
        function preRun() {
            if (Module["preRun"]) {
                if (typeof Module["preRun"] == "function") Module["preRun"] = [
                    Module["preRun"]
                ];
                while(Module["preRun"].length){
                    addOnPreRun(Module["preRun"].shift());
                }
            }
            callRuntimeCallbacks(__ATPRERUN__);
        }
        function initRuntime() {
            true;
            callRuntimeCallbacks(__ATINIT__);
        }
        function postRun() {
            if (Module["postRun"]) {
                if (typeof Module["postRun"] == "function") Module["postRun"] = [
                    Module["postRun"]
                ];
                while(Module["postRun"].length){
                    addOnPostRun(Module["postRun"].shift());
                }
            }
            callRuntimeCallbacks(__ATPOSTRUN__);
        }
        function addOnPreRun(cb) {
            __ATPRERUN__.unshift(cb);
        }
        function addOnInit(cb) {
            __ATINIT__.unshift(cb);
        }
        function addOnPostRun(cb) {
            __ATPOSTRUN__.unshift(cb);
        }
        var runDependencies = 0;
        var runDependencyWatcher = null;
        var dependenciesFulfilled = null;
        function addRunDependency(id) {
            runDependencies++;
            if (Module["monitorRunDependencies"]) {
                Module["monitorRunDependencies"](runDependencies);
            }
        }
        function removeRunDependency(id) {
            runDependencies--;
            if (Module["monitorRunDependencies"]) {
                Module["monitorRunDependencies"](runDependencies);
            }
            if (runDependencies == 0) {
                if (runDependencyWatcher !== null) {
                    clearInterval(runDependencyWatcher);
                    runDependencyWatcher = null;
                }
                if (dependenciesFulfilled) {
                    var callback = dependenciesFulfilled;
                    dependenciesFulfilled = null;
                    callback();
                }
            }
        }
        function abort(what) {
            if (Module["onAbort"]) {
                Module["onAbort"](what);
            }
            what = "Aborted(" + what + ")";
            err(what);
            ABORT = true;
            1;
            what += ". Build with -sASSERTIONS for more info.";
            var e = new WebAssembly.RuntimeError(what);
            readyPromiseReject(e);
            throw e;
        }
        var dataURIPrefix = "data:application/octet-stream;base64,";
        function isDataURI(filename) {
            return filename.startsWith(dataURIPrefix);
        }
        var wasmBinaryFile;
        if (Module["locateFile"]) {
            wasmBinaryFile = "webp_dec.wasm";
            if (!isDataURI(wasmBinaryFile)) {
                wasmBinaryFile = locateFile(wasmBinaryFile);
            }
        } else {
            wasmBinaryFile = new URL("webp_dec.wasm", importMeta.url).href;
        }
        function getBinary(file) {
            try {
                if (file == wasmBinaryFile && wasmBinary) {
                    return new Uint8Array(wasmBinary);
                }
                if (readBinary) {
                    return readBinary(file);
                }
                throw "both async and sync fetching of the wasm failed";
            } catch (err) {
                abort(err);
            }
        }
        function getBinaryPromise(binaryFile) {
            if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
                if (typeof fetch == "function") {
                    return fetch(binaryFile, {
                        credentials: "same-origin"
                    }).then(function(response) {
                        if (!response["ok"]) {
                            throw "failed to load wasm binary file at '" + binaryFile + "'";
                        }
                        return response["arrayBuffer"]();
                    }).catch(function() {
                        return getBinary(binaryFile);
                    });
                }
            }
            return Promise.resolve().then(function() {
                return getBinary(binaryFile);
            });
        }
        function instantiateArrayBuffer(binaryFile, imports, receiver) {
            return getBinaryPromise(binaryFile).then(function(binary) {
                return WebAssembly.instantiate(binary, imports);
            }).then(function(instance) {
                return instance;
            }).then(receiver, function(reason) {
                err("failed to asynchronously prepare wasm: " + reason);
                abort(reason);
            });
        }
        function instantiateAsync(binary, binaryFile, imports, callback) {
            if (!binary && typeof WebAssembly.instantiateStreaming == "function" && !isDataURI(binaryFile) && typeof fetch == "function") {
                return fetch(binaryFile, {
                    credentials: "same-origin"
                }).then(function(response) {
                    var result = WebAssembly.instantiateStreaming(response, imports);
                    return result.then(callback, function(reason) {
                        err("wasm streaming compile failed: " + reason);
                        err("falling back to ArrayBuffer instantiation");
                        return instantiateArrayBuffer(binaryFile, imports, callback);
                    });
                });
            } else {
                return instantiateArrayBuffer(binaryFile, imports, callback);
            }
        }
        function createWasm() {
            var info = {
                "a": wasmImports
            };
            function receiveInstance(instance, module) {
                var exports = instance.exports;
                Module["asm"] = exports;
                wasmMemory = Module["asm"]["s"];
                updateMemoryViews();
                wasmTable = Module["asm"]["y"];
                addOnInit(Module["asm"]["t"]);
                removeRunDependency("wasm-instantiate");
                return exports;
            }
            addRunDependency("wasm-instantiate");
            function receiveInstantiationResult(result) {
                receiveInstance(result["instance"]);
            }
            if (Module["instantiateWasm"]) {
                try {
                    return Module["instantiateWasm"](info, receiveInstance);
                } catch (e) {
                    err("Module.instantiateWasm callback failed with error: " + e);
                    readyPromiseReject(e);
                }
            }
            instantiateAsync(wasmBinary, wasmBinaryFile, info, receiveInstantiationResult).catch(readyPromiseReject);
            return {};
        }
        function callRuntimeCallbacks(callbacks) {
            while(callbacks.length > 0){
                callbacks.shift()(Module);
            }
        }
        function ExceptionInfo(excPtr) {
            this.excPtr = excPtr;
            this.ptr = excPtr - 24;
            this.set_type = function(type) {
                HEAPU32[this.ptr + 4 >> 2] = type;
            };
            this.get_type = function() {
                return HEAPU32[this.ptr + 4 >> 2];
            };
            this.set_destructor = function(destructor) {
                HEAPU32[this.ptr + 8 >> 2] = destructor;
            };
            this.get_destructor = function() {
                return HEAPU32[this.ptr + 8 >> 2];
            };
            this.set_refcount = function(refcount) {
                HEAP32[this.ptr >> 2] = refcount;
            };
            this.set_caught = function(caught) {
                caught = caught ? 1 : 0;
                HEAP8[this.ptr + 12 >> 0] = caught;
            };
            this.get_caught = function() {
                return HEAP8[this.ptr + 12 >> 0] != 0;
            };
            this.set_rethrown = function(rethrown) {
                rethrown = rethrown ? 1 : 0;
                HEAP8[this.ptr + 13 >> 0] = rethrown;
            };
            this.get_rethrown = function() {
                return HEAP8[this.ptr + 13 >> 0] != 0;
            };
            this.init = function(type, destructor) {
                this.set_adjusted_ptr(0);
                this.set_type(type);
                this.set_destructor(destructor);
                this.set_refcount(0);
                this.set_caught(false);
                this.set_rethrown(false);
            };
            this.add_ref = function() {
                var value = HEAP32[this.ptr >> 2];
                HEAP32[this.ptr >> 2] = value + 1;
            };
            this.release_ref = function() {
                var prev = HEAP32[this.ptr >> 2];
                HEAP32[this.ptr >> 2] = prev - 1;
                return prev === 1;
            };
            this.set_adjusted_ptr = function(adjustedPtr) {
                HEAPU32[this.ptr + 16 >> 2] = adjustedPtr;
            };
            this.get_adjusted_ptr = function() {
                return HEAPU32[this.ptr + 16 >> 2];
            };
            this.get_exception_ptr = function() {
                var isPointer = ___cxa_is_pointer_type(this.get_type());
                if (isPointer) {
                    return HEAPU32[this.excPtr >> 2];
                }
                var adjusted = this.get_adjusted_ptr();
                if (adjusted !== 0) return adjusted;
                return this.excPtr;
            };
        }
        var uncaughtExceptionCount = 0;
        function ___cxa_throw(ptr, type, destructor) {
            var info = new ExceptionInfo(ptr);
            info.init(type, destructor);
            ptr;
            uncaughtExceptionCount++;
            throw ptr;
        }
        function __embind_register_bigint(primitiveType, name, size, minRange, maxRange) {}
        function getShiftFromSize(size) {
            switch(size){
                case 1:
                    return 0;
                case 2:
                    return 1;
                case 4:
                    return 2;
                case 8:
                    return 3;
                default:
                    throw new TypeError("Unknown type size: " + size);
            }
        }
        function embind_init_charCodes() {
            var codes = new Array(256);
            for(var i = 0; i < 256; ++i){
                codes[i] = String.fromCharCode(i);
            }
            embind_charCodes = codes;
        }
        var embind_charCodes = undefined;
        function readLatin1String(ptr) {
            var ret = "";
            var c = ptr;
            while(HEAPU8[c]){
                ret += embind_charCodes[HEAPU8[c++]];
            }
            return ret;
        }
        var awaitingDependencies = {};
        var registeredTypes = {};
        var typeDependencies = {};
        var char_0 = 48;
        var char_9 = 57;
        function makeLegalFunctionName(name) {
            if (undefined === name) {
                return "_unknown";
            }
            name = name.replace(/[^a-zA-Z0-9_]/g, "$");
            var f = name.charCodeAt(0);
            if (f >= char_0 && f <= char_9) {
                return "_" + name;
            }
            return name;
        }
        function createNamedFunction(name, body) {
            name = makeLegalFunctionName(name);
            return ({
                [name]: function() {
                    return body.apply(this, arguments);
                }
            })[name];
        }
        function extendError(baseErrorType, errorName) {
            var errorClass = createNamedFunction(errorName, function(message) {
                this.name = errorName;
                this.message = message;
                var stack = new Error(message).stack;
                if (stack !== undefined) {
                    this.stack = this.toString() + "\n" + stack.replace(/^Error(:[^\n]*)?\n/, "");
                }
            });
            errorClass.prototype = Object.create(baseErrorType.prototype);
            errorClass.prototype.constructor = errorClass;
            errorClass.prototype.toString = function() {
                if (this.message === undefined) {
                    return this.name;
                } else {
                    return this.name + ": " + this.message;
                }
            };
            return errorClass;
        }
        var BindingError = undefined;
        function throwBindingError(message) {
            throw new BindingError(message);
        }
        var InternalError = undefined;
        function throwInternalError(message) {
            throw new InternalError(message);
        }
        function whenDependentTypesAreResolved(myTypes, dependentTypes, getTypeConverters) {
            myTypes.forEach(function(type) {
                typeDependencies[type] = dependentTypes;
            });
            function onComplete(typeConverters) {
                var myTypeConverters = getTypeConverters(typeConverters);
                if (myTypeConverters.length !== myTypes.length) {
                    throwInternalError("Mismatched type converter count");
                }
                for(var i = 0; i < myTypes.length; ++i){
                    registerType(myTypes[i], myTypeConverters[i]);
                }
            }
            var typeConverters = new Array(dependentTypes.length);
            var unregisteredTypes = [];
            var registered = 0;
            dependentTypes.forEach((dt, i)=>{
                if (registeredTypes.hasOwnProperty(dt)) {
                    typeConverters[i] = registeredTypes[dt];
                } else {
                    unregisteredTypes.push(dt);
                    if (!awaitingDependencies.hasOwnProperty(dt)) {
                        awaitingDependencies[dt] = [];
                    }
                    awaitingDependencies[dt].push(()=>{
                        typeConverters[i] = registeredTypes[dt];
                        ++registered;
                        if (registered === unregisteredTypes.length) {
                            onComplete(typeConverters);
                        }
                    });
                }
            });
            if (0 === unregisteredTypes.length) {
                onComplete(typeConverters);
            }
        }
        function registerType(rawType, registeredInstance, options = {}) {
            if (!("argPackAdvance" in registeredInstance)) {
                throw new TypeError("registerType registeredInstance requires argPackAdvance");
            }
            var name = registeredInstance.name;
            if (!rawType) {
                throwBindingError('type "' + name + '" must have a positive integer typeid pointer');
            }
            if (registeredTypes.hasOwnProperty(rawType)) {
                if (options.ignoreDuplicateRegistrations) {
                    return;
                } else {
                    throwBindingError("Cannot register type '" + name + "' twice");
                }
            }
            registeredTypes[rawType] = registeredInstance;
            delete typeDependencies[rawType];
            if (awaitingDependencies.hasOwnProperty(rawType)) {
                var callbacks = awaitingDependencies[rawType];
                delete awaitingDependencies[rawType];
                callbacks.forEach((cb)=>cb());
            }
        }
        function __embind_register_bool(rawType, name, size, trueValue, falseValue) {
            var shift = getShiftFromSize(size);
            name = readLatin1String(name);
            registerType(rawType, {
                name: name,
                "fromWireType": function(wt) {
                    return !!wt;
                },
                "toWireType": function(destructors, o) {
                    return o ? trueValue : falseValue;
                },
                "argPackAdvance": 8,
                "readValueFromPointer": function(pointer) {
                    var heap;
                    if (size === 1) {
                        heap = HEAP8;
                    } else if (size === 2) {
                        heap = HEAP16;
                    } else if (size === 4) {
                        heap = HEAP32;
                    } else {
                        throw new TypeError("Unknown boolean type size: " + name);
                    }
                    return this["fromWireType"](heap[pointer >> shift]);
                },
                destructorFunction: null
            });
        }
        var emval_free_list = [];
        var emval_handle_array = [
            {},
            {
                value: undefined
            },
            {
                value: null
            },
            {
                value: true
            },
            {
                value: false
            }
        ];
        function __emval_decref(handle) {
            if (handle > 4 && 0 === --emval_handle_array[handle].refcount) {
                emval_handle_array[handle] = undefined;
                emval_free_list.push(handle);
            }
        }
        function count_emval_handles() {
            var count = 0;
            for(var i = 5; i < emval_handle_array.length; ++i){
                if (emval_handle_array[i] !== undefined) {
                    ++count;
                }
            }
            return count;
        }
        function get_first_emval() {
            for(var i = 5; i < emval_handle_array.length; ++i){
                if (emval_handle_array[i] !== undefined) {
                    return emval_handle_array[i];
                }
            }
            return null;
        }
        function init_emval() {
            Module["count_emval_handles"] = count_emval_handles;
            Module["get_first_emval"] = get_first_emval;
        }
        var Emval = {
            toValue: (handle)=>{
                if (!handle) {
                    throwBindingError("Cannot use deleted val. handle = " + handle);
                }
                return emval_handle_array[handle].value;
            },
            toHandle: (value)=>{
                switch(value){
                    case undefined:
                        return 1;
                    case null:
                        return 2;
                    case true:
                        return 3;
                    case false:
                        return 4;
                    default:
                        {
                            var handle = emval_free_list.length ? emval_free_list.pop() : emval_handle_array.length;
                            emval_handle_array[handle] = {
                                refcount: 1,
                                value: value
                            };
                            return handle;
                        }
                }
            }
        };
        function simpleReadValueFromPointer(pointer) {
            return this["fromWireType"](HEAP32[pointer >> 2]);
        }
        function __embind_register_emval(rawType, name) {
            name = readLatin1String(name);
            registerType(rawType, {
                name: name,
                "fromWireType": function(handle) {
                    var rv = Emval.toValue(handle);
                    __emval_decref(handle);
                    return rv;
                },
                "toWireType": function(destructors, value) {
                    return Emval.toHandle(value);
                },
                "argPackAdvance": 8,
                "readValueFromPointer": simpleReadValueFromPointer,
                destructorFunction: null
            });
        }
        function floatReadValueFromPointer(name, shift) {
            switch(shift){
                case 2:
                    return function(pointer) {
                        return this["fromWireType"](HEAPF32[pointer >> 2]);
                    };
                case 3:
                    return function(pointer) {
                        return this["fromWireType"](HEAPF64[pointer >> 3]);
                    };
                default:
                    throw new TypeError("Unknown float type: " + name);
            }
        }
        function __embind_register_float(rawType, name, size) {
            var shift = getShiftFromSize(size);
            name = readLatin1String(name);
            registerType(rawType, {
                name: name,
                "fromWireType": function(value) {
                    return value;
                },
                "toWireType": function(destructors, value) {
                    return value;
                },
                "argPackAdvance": 8,
                "readValueFromPointer": floatReadValueFromPointer(name, shift),
                destructorFunction: null
            });
        }
        function runDestructors(destructors) {
            while(destructors.length){
                var ptr = destructors.pop();
                var del = destructors.pop();
                del(ptr);
            }
        }
        function craftInvokerFunction(humanName, argTypes, classType, cppInvokerFunc, cppTargetFunc, isAsync) {
            var argCount = argTypes.length;
            if (argCount < 2) {
                throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!");
            }
            var isClassMethodFunc = argTypes[1] !== null && classType !== null;
            var needsDestructorStack = false;
            for(var i = 1; i < argTypes.length; ++i){
                if (argTypes[i] !== null && argTypes[i].destructorFunction === undefined) {
                    needsDestructorStack = true;
                    break;
                }
            }
            var returns = argTypes[0].name !== "void";
            var expectedArgCount = argCount - 2;
            var argsWired = new Array(expectedArgCount);
            var invokerFuncArgs = [];
            var destructors = [];
            return function() {
                if (arguments.length !== expectedArgCount) {
                    throwBindingError("function " + humanName + " called with " + arguments.length + " arguments, expected " + expectedArgCount + " args!");
                }
                destructors.length = 0;
                var thisWired;
                invokerFuncArgs.length = isClassMethodFunc ? 2 : 1;
                invokerFuncArgs[0] = cppTargetFunc;
                if (isClassMethodFunc) {
                    thisWired = argTypes[1]["toWireType"](destructors, this);
                    invokerFuncArgs[1] = thisWired;
                }
                for(var i = 0; i < expectedArgCount; ++i){
                    argsWired[i] = argTypes[i + 2]["toWireType"](destructors, arguments[i]);
                    invokerFuncArgs.push(argsWired[i]);
                }
                var rv = cppInvokerFunc.apply(null, invokerFuncArgs);
                function onDone(rv) {
                    if (needsDestructorStack) {
                        runDestructors(destructors);
                    } else {
                        for(var i = isClassMethodFunc ? 1 : 2; i < argTypes.length; i++){
                            var param = i === 1 ? thisWired : argsWired[i - 2];
                            if (argTypes[i].destructorFunction !== null) {
                                argTypes[i].destructorFunction(param);
                            }
                        }
                    }
                    if (returns) {
                        return argTypes[0]["fromWireType"](rv);
                    }
                }
                return onDone(rv);
            };
        }
        function ensureOverloadTable(proto, methodName, humanName) {
            if (undefined === proto[methodName].overloadTable) {
                var prevFunc = proto[methodName];
                proto[methodName] = function() {
                    if (!proto[methodName].overloadTable.hasOwnProperty(arguments.length)) {
                        throwBindingError("Function '" + humanName + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + proto[methodName].overloadTable + ")!");
                    }
                    return proto[methodName].overloadTable[arguments.length].apply(this, arguments);
                };
                proto[methodName].overloadTable = [];
                proto[methodName].overloadTable[prevFunc.argCount] = prevFunc;
            }
        }
        function exposePublicSymbol(name, value, numArguments) {
            if (Module.hasOwnProperty(name)) {
                if (undefined === numArguments || undefined !== Module[name].overloadTable && undefined !== Module[name].overloadTable[numArguments]) {
                    throwBindingError("Cannot register public name '" + name + "' twice");
                }
                ensureOverloadTable(Module, name, name);
                if (Module.hasOwnProperty(numArguments)) {
                    throwBindingError("Cannot register multiple overloads of a function with the same number of arguments (" + numArguments + ")!");
                }
                Module[name].overloadTable[numArguments] = value;
            } else {
                Module[name] = value;
                if (undefined !== numArguments) {
                    Module[name].numArguments = numArguments;
                }
            }
        }
        function heap32VectorToArray(count, firstElement) {
            var array = [];
            for(var i = 0; i < count; i++){
                array.push(HEAPU32[firstElement + i * 4 >> 2]);
            }
            return array;
        }
        function replacePublicSymbol(name, value, numArguments) {
            if (!Module.hasOwnProperty(name)) {
                throwInternalError("Replacing nonexistant public symbol");
            }
            if (undefined !== Module[name].overloadTable && undefined !== numArguments) {
                Module[name].overloadTable[numArguments] = value;
            } else {
                Module[name] = value;
                Module[name].argCount = numArguments;
            }
        }
        function dynCallLegacy(sig, ptr, args) {
            var f = Module["dynCall_" + sig];
            return args && args.length ? f.apply(null, [
                ptr
            ].concat(args)) : f.call(null, ptr);
        }
        var wasmTableMirror = [];
        function getWasmTableEntry(funcPtr) {
            var func = wasmTableMirror[funcPtr];
            if (!func) {
                if (funcPtr >= wasmTableMirror.length) wasmTableMirror.length = funcPtr + 1;
                wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
            }
            return func;
        }
        function dynCall(sig, ptr, args) {
            if (sig.includes("j")) {
                return dynCallLegacy(sig, ptr, args);
            }
            var rtn = getWasmTableEntry(ptr).apply(null, args);
            return rtn;
        }
        function getDynCaller(sig, ptr) {
            var argCache = [];
            return function() {
                argCache.length = 0;
                Object.assign(argCache, arguments);
                return dynCall(sig, ptr, argCache);
            };
        }
        function embind__requireFunction(signature, rawFunction) {
            signature = readLatin1String(signature);
            function makeDynCaller() {
                if (signature.includes("j")) {
                    return getDynCaller(signature, rawFunction);
                }
                return getWasmTableEntry(rawFunction);
            }
            var fp = makeDynCaller();
            if (typeof fp != "function") {
                throwBindingError("unknown function pointer with signature " + signature + ": " + rawFunction);
            }
            return fp;
        }
        var UnboundTypeError = undefined;
        function getTypeName(type) {
            var ptr = ___getTypeName(type);
            var rv = readLatin1String(ptr);
            _free(ptr);
            return rv;
        }
        function throwUnboundTypeError(message, types) {
            var unboundTypes = [];
            var seen = {};
            function visit(type) {
                if (seen[type]) {
                    return;
                }
                if (registeredTypes[type]) {
                    return;
                }
                if (typeDependencies[type]) {
                    typeDependencies[type].forEach(visit);
                    return;
                }
                unboundTypes.push(type);
                seen[type] = true;
            }
            types.forEach(visit);
            throw new UnboundTypeError(message + ": " + unboundTypes.map(getTypeName).join([
                ", "
            ]));
        }
        function __embind_register_function(name, argCount, rawArgTypesAddr, signature, rawInvoker, fn, isAsync) {
            var argTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
            name = readLatin1String(name);
            rawInvoker = embind__requireFunction(signature, rawInvoker);
            exposePublicSymbol(name, function() {
                throwUnboundTypeError("Cannot call " + name + " due to unbound types", argTypes);
            }, argCount - 1);
            whenDependentTypesAreResolved([], argTypes, function(argTypes) {
                var invokerArgsArray = [
                    argTypes[0],
                    null
                ].concat(argTypes.slice(1));
                replacePublicSymbol(name, craftInvokerFunction(name, invokerArgsArray, null, rawInvoker, fn, isAsync), argCount - 1);
                return [];
            });
        }
        function integerReadValueFromPointer(name, shift, signed) {
            switch(shift){
                case 0:
                    return signed ? function readS8FromPointer(pointer) {
                        return HEAP8[pointer];
                    } : function readU8FromPointer(pointer) {
                        return HEAPU8[pointer];
                    };
                case 1:
                    return signed ? function readS16FromPointer(pointer) {
                        return HEAP16[pointer >> 1];
                    } : function readU16FromPointer(pointer) {
                        return HEAPU16[pointer >> 1];
                    };
                case 2:
                    return signed ? function readS32FromPointer(pointer) {
                        return HEAP32[pointer >> 2];
                    } : function readU32FromPointer(pointer) {
                        return HEAPU32[pointer >> 2];
                    };
                default:
                    throw new TypeError("Unknown integer type: " + name);
            }
        }
        function __embind_register_integer(primitiveType, name, size, minRange, maxRange) {
            name = readLatin1String(name);
            if (maxRange === -1) {
                maxRange = 4294967295;
            }
            var shift = getShiftFromSize(size);
            var fromWireType = (value)=>value;
            if (minRange === 0) {
                var bitshift = 32 - 8 * size;
                fromWireType = (value)=>value << bitshift >>> bitshift;
            }
            var isUnsignedType = name.includes("unsigned");
            var checkAssertions = (value, toTypeName)=>{};
            var toWireType;
            if (isUnsignedType) {
                toWireType = function(destructors, value) {
                    checkAssertions(value, this.name);
                    return value >>> 0;
                };
            } else {
                toWireType = function(destructors, value) {
                    checkAssertions(value, this.name);
                    return value;
                };
            }
            registerType(primitiveType, {
                name: name,
                "fromWireType": fromWireType,
                "toWireType": toWireType,
                "argPackAdvance": 8,
                "readValueFromPointer": integerReadValueFromPointer(name, shift, minRange !== 0),
                destructorFunction: null
            });
        }
        function __embind_register_memory_view(rawType, dataTypeIndex, name) {
            var typeMapping = [
                Int8Array,
                Uint8Array,
                Int16Array,
                Uint16Array,
                Int32Array,
                Uint32Array,
                Float32Array,
                Float64Array
            ];
            var TA = typeMapping[dataTypeIndex];
            function decodeMemoryView(handle) {
                handle = handle >> 2;
                var heap = HEAPU32;
                var size = heap[handle];
                var data = heap[handle + 1];
                return new TA(heap.buffer, data, size);
            }
            name = readLatin1String(name);
            registerType(rawType, {
                name: name,
                "fromWireType": decodeMemoryView,
                "argPackAdvance": 8,
                "readValueFromPointer": decodeMemoryView
            }, {
                ignoreDuplicateRegistrations: true
            });
        }
        function __embind_register_std_string(rawType, name) {
            name = readLatin1String(name);
            var stdStringIsUTF8 = name === "std::string";
            registerType(rawType, {
                name: name,
                "fromWireType": function(value) {
                    var length = HEAPU32[value >> 2];
                    var payload = value + 4;
                    var str;
                    if (stdStringIsUTF8) {
                        var decodeStartPtr = payload;
                        for(var i = 0; i <= length; ++i){
                            var currentBytePtr = payload + i;
                            if (i == length || HEAPU8[currentBytePtr] == 0) {
                                var maxRead = currentBytePtr - decodeStartPtr;
                                var stringSegment = UTF8ToString(decodeStartPtr, maxRead);
                                if (str === undefined) {
                                    str = stringSegment;
                                } else {
                                    str += String.fromCharCode(0);
                                    str += stringSegment;
                                }
                                decodeStartPtr = currentBytePtr + 1;
                            }
                        }
                    } else {
                        var a = new Array(length);
                        for(var i = 0; i < length; ++i){
                            a[i] = String.fromCharCode(HEAPU8[payload + i]);
                        }
                        str = a.join("");
                    }
                    _free(value);
                    return str;
                },
                "toWireType": function(destructors, value) {
                    if (value instanceof ArrayBuffer) {
                        value = new Uint8Array(value);
                    }
                    var length;
                    var valueIsOfTypeString = typeof value == "string";
                    if (!(valueIsOfTypeString || value instanceof Uint8Array || value instanceof Uint8ClampedArray || value instanceof Int8Array)) {
                        throwBindingError("Cannot pass non-string to std::string");
                    }
                    if (stdStringIsUTF8 && valueIsOfTypeString) {
                        length = lengthBytesUTF8(value);
                    } else {
                        length = value.length;
                    }
                    var base = _malloc(4 + length + 1);
                    var ptr = base + 4;
                    HEAPU32[base >> 2] = length;
                    if (stdStringIsUTF8 && valueIsOfTypeString) {
                        stringToUTF8(value, ptr, length + 1);
                    } else {
                        if (valueIsOfTypeString) {
                            for(var i = 0; i < length; ++i){
                                var charCode = value.charCodeAt(i);
                                if (charCode > 255) {
                                    _free(ptr);
                                    throwBindingError("String has UTF-16 code units that do not fit in 8 bits");
                                }
                                HEAPU8[ptr + i] = charCode;
                            }
                        } else {
                            for(var i = 0; i < length; ++i){
                                HEAPU8[ptr + i] = value[i];
                            }
                        }
                    }
                    if (destructors !== null) {
                        destructors.push(_free, base);
                    }
                    return base;
                },
                "argPackAdvance": 8,
                "readValueFromPointer": simpleReadValueFromPointer,
                destructorFunction: function(ptr) {
                    _free(ptr);
                }
            });
        }
        function UTF16ToString(ptr, maxBytesToRead) {
            var str = "";
            for(var i = 0; !(i >= maxBytesToRead / 2); ++i){
                var codeUnit = HEAP16[ptr + i * 2 >> 1];
                if (codeUnit == 0) break;
                str += String.fromCharCode(codeUnit);
            }
            return str;
        }
        function stringToUTF16(str, outPtr, maxBytesToWrite) {
            if (maxBytesToWrite === undefined) {
                maxBytesToWrite = 2147483647;
            }
            if (maxBytesToWrite < 2) return 0;
            maxBytesToWrite -= 2;
            var startPtr = outPtr;
            var numCharsToWrite = maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;
            for(var i = 0; i < numCharsToWrite; ++i){
                var codeUnit = str.charCodeAt(i);
                HEAP16[outPtr >> 1] = codeUnit;
                outPtr += 2;
            }
            HEAP16[outPtr >> 1] = 0;
            return outPtr - startPtr;
        }
        function lengthBytesUTF16(str) {
            return str.length * 2;
        }
        function UTF32ToString(ptr, maxBytesToRead) {
            var i = 0;
            var str = "";
            while(!(i >= maxBytesToRead / 4)){
                var utf32 = HEAP32[ptr + i * 4 >> 2];
                if (utf32 == 0) break;
                ++i;
                if (utf32 >= 65536) {
                    var ch = utf32 - 65536;
                    str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
                } else {
                    str += String.fromCharCode(utf32);
                }
            }
            return str;
        }
        function stringToUTF32(str, outPtr, maxBytesToWrite) {
            if (maxBytesToWrite === undefined) {
                maxBytesToWrite = 2147483647;
            }
            if (maxBytesToWrite < 4) return 0;
            var startPtr = outPtr;
            var endPtr = startPtr + maxBytesToWrite - 4;
            for(var i = 0; i < str.length; ++i){
                var codeUnit = str.charCodeAt(i);
                if (codeUnit >= 55296 && codeUnit <= 57343) {
                    var trailSurrogate = str.charCodeAt(++i);
                    codeUnit = 65536 + ((codeUnit & 1023) << 10) | trailSurrogate & 1023;
                }
                HEAP32[outPtr >> 2] = codeUnit;
                outPtr += 4;
                if (outPtr + 4 > endPtr) break;
            }
            HEAP32[outPtr >> 2] = 0;
            return outPtr - startPtr;
        }
        function lengthBytesUTF32(str) {
            var len = 0;
            for(var i = 0; i < str.length; ++i){
                var codeUnit = str.charCodeAt(i);
                if (codeUnit >= 55296 && codeUnit <= 57343) ++i;
                len += 4;
            }
            return len;
        }
        function __embind_register_std_wstring(rawType, charSize, name) {
            name = readLatin1String(name);
            var decodeString, encodeString, getHeap, lengthBytesUTF, shift;
            if (charSize === 2) {
                decodeString = UTF16ToString;
                encodeString = stringToUTF16;
                lengthBytesUTF = lengthBytesUTF16;
                getHeap = ()=>HEAPU16;
                shift = 1;
            } else if (charSize === 4) {
                decodeString = UTF32ToString;
                encodeString = stringToUTF32;
                lengthBytesUTF = lengthBytesUTF32;
                getHeap = ()=>HEAPU32;
                shift = 2;
            }
            registerType(rawType, {
                name: name,
                "fromWireType": function(value) {
                    var length = HEAPU32[value >> 2];
                    var HEAP = getHeap();
                    var str;
                    var decodeStartPtr = value + 4;
                    for(var i = 0; i <= length; ++i){
                        var currentBytePtr = value + 4 + i * charSize;
                        if (i == length || HEAP[currentBytePtr >> shift] == 0) {
                            var maxReadBytes = currentBytePtr - decodeStartPtr;
                            var stringSegment = decodeString(decodeStartPtr, maxReadBytes);
                            if (str === undefined) {
                                str = stringSegment;
                            } else {
                                str += String.fromCharCode(0);
                                str += stringSegment;
                            }
                            decodeStartPtr = currentBytePtr + charSize;
                        }
                    }
                    _free(value);
                    return str;
                },
                "toWireType": function(destructors, value) {
                    if (!(typeof value == "string")) {
                        throwBindingError("Cannot pass non-string to C++ string type " + name);
                    }
                    var length = lengthBytesUTF(value);
                    var ptr = _malloc(4 + length + charSize);
                    HEAPU32[ptr >> 2] = length >> shift;
                    encodeString(value, ptr + 4, length + charSize);
                    if (destructors !== null) {
                        destructors.push(_free, ptr);
                    }
                    return ptr;
                },
                "argPackAdvance": 8,
                "readValueFromPointer": simpleReadValueFromPointer,
                destructorFunction: function(ptr) {
                    _free(ptr);
                }
            });
        }
        function __embind_register_void(rawType, name) {
            name = readLatin1String(name);
            registerType(rawType, {
                isVoid: true,
                name: name,
                "argPackAdvance": 0,
                "fromWireType": function() {
                    return undefined;
                },
                "toWireType": function(destructors, o) {
                    return undefined;
                }
            });
        }
        var emval_symbols = {};
        function getStringOrSymbol(address) {
            var symbol = emval_symbols[address];
            if (symbol === undefined) {
                return readLatin1String(address);
            }
            return symbol;
        }
        function emval_get_global() {
            if (typeof globalThis == "object") {
                return globalThis;
            }
            function testGlobal(obj) {
                obj["$$$embind_global$$$"] = obj;
                var success = typeof $$$embind_global$$$ == "object" && obj["$$$embind_global$$$"] == obj;
                if (!success) {
                    delete obj["$$$embind_global$$$"];
                }
                return success;
            }
            if (typeof $$$embind_global$$$ == "object") {
                return $$$embind_global$$$;
            }
            if (typeof global == "object" && testGlobal(global)) {
                $$$embind_global$$$ = global;
            } else if (typeof self == "object" && testGlobal(self)) {
                $$$embind_global$$$ = self;
            }
            if (typeof $$$embind_global$$$ == "object") {
                return $$$embind_global$$$;
            }
            throw Error("unable to get global object.");
        }
        function __emval_get_global(name) {
            if (name === 0) {
                return Emval.toHandle(emval_get_global());
            } else {
                name = getStringOrSymbol(name);
                return Emval.toHandle(emval_get_global()[name]);
            }
        }
        function __emval_incref(handle) {
            if (handle > 4) {
                emval_handle_array[handle].refcount += 1;
            }
        }
        function requireRegisteredType(rawType, humanName) {
            var impl = registeredTypes[rawType];
            if (undefined === impl) {
                throwBindingError(humanName + " has unknown type " + getTypeName(rawType));
            }
            return impl;
        }
        function craftEmvalAllocator(argCount) {
            var argsList = new Array(argCount + 1);
            return function(constructor, argTypes, args) {
                argsList[0] = constructor;
                for(var i = 0; i < argCount; ++i){
                    var argType = requireRegisteredType(HEAPU32[argTypes + i * 4 >> 2], "parameter " + i);
                    argsList[i + 1] = argType["readValueFromPointer"](args);
                    args += argType["argPackAdvance"];
                }
                var obj = new (constructor.bind.apply(constructor, argsList))();
                return Emval.toHandle(obj);
            };
        }
        var emval_newers = {};
        function __emval_new(handle, argCount, argTypes, args) {
            handle = Emval.toValue(handle);
            var newer = emval_newers[argCount];
            if (!newer) {
                newer = craftEmvalAllocator(argCount);
                emval_newers[argCount] = newer;
            }
            return newer(handle, argTypes, args);
        }
        function _abort() {
            abort("");
        }
        function _emscripten_memcpy_big(dest, src, num) {
            HEAPU8.copyWithin(dest, src, src + num);
        }
        function getHeapMax() {
            return 2147483648;
        }
        function emscripten_realloc_buffer(size) {
            var b = wasmMemory.buffer;
            try {
                wasmMemory.grow(size - b.byteLength + 65535 >>> 16);
                updateMemoryViews();
                return 1;
            } catch (e) {}
        }
        function _emscripten_resize_heap(requestedSize) {
            var oldSize = HEAPU8.length;
            requestedSize = requestedSize >>> 0;
            var maxHeapSize = getHeapMax();
            if (requestedSize > maxHeapSize) {
                return false;
            }
            let alignUp = (x, multiple)=>x + (multiple - x % multiple) % multiple;
            for(var cutDown = 1; cutDown <= 4; cutDown *= 2){
                var overGrownHeapSize = oldSize * (1 + .2 / cutDown);
                overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
                var newSize = Math.min(maxHeapSize, alignUp(Math.max(requestedSize, overGrownHeapSize), 65536));
                var replacement = emscripten_realloc_buffer(newSize);
                if (replacement) {
                    return true;
                }
            }
            return false;
        }
        embind_init_charCodes();
        BindingError = Module["BindingError"] = extendError(Error, "BindingError");
        InternalError = Module["InternalError"] = extendError(Error, "InternalError");
        init_emval();
        UnboundTypeError = Module["UnboundTypeError"] = extendError(Error, "UnboundTypeError");
        var wasmImports = {
            "n": ___cxa_throw,
            "o": __embind_register_bigint,
            "l": __embind_register_bool,
            "r": __embind_register_emval,
            "k": __embind_register_float,
            "c": __embind_register_function,
            "b": __embind_register_integer,
            "a": __embind_register_memory_view,
            "g": __embind_register_std_string,
            "f": __embind_register_std_wstring,
            "m": __embind_register_void,
            "d": __emval_decref,
            "e": __emval_get_global,
            "i": __emval_incref,
            "h": __emval_new,
            "j": _abort,
            "q": _emscripten_memcpy_big,
            "p": _emscripten_resize_heap
        };
        createWasm();
        var ___wasm_call_ctors = function() {
            return (___wasm_call_ctors = Module["asm"]["t"]).apply(null, arguments);
        };
        var _malloc = function() {
            return (_malloc = Module["asm"]["u"]).apply(null, arguments);
        };
        var _free = function() {
            return (_free = Module["asm"]["v"]).apply(null, arguments);
        };
        var ___getTypeName = Module["___getTypeName"] = function() {
            return (___getTypeName = Module["___getTypeName"] = Module["asm"]["w"]).apply(null, arguments);
        };
        var __embind_initialize_bindings = Module["__embind_initialize_bindings"] = function() {
            return (__embind_initialize_bindings = Module["__embind_initialize_bindings"] = Module["asm"]["x"]).apply(null, arguments);
        };
        var ___errno_location = function() {
            return (___errno_location = Module["asm"]["__errno_location"]).apply(null, arguments);
        };
        var ___cxa_is_pointer_type = function() {
            return (___cxa_is_pointer_type = Module["asm"]["z"]).apply(null, arguments);
        };
        var calledRun;
        dependenciesFulfilled = function runCaller() {
            if (!calledRun) run();
            if (!calledRun) dependenciesFulfilled = runCaller;
        };
        function run() {
            if (runDependencies > 0) {
                return;
            }
            preRun();
            if (runDependencies > 0) {
                return;
            }
            function doRun() {
                if (calledRun) return;
                calledRun = true;
                Module["calledRun"] = true;
                if (ABORT) return;
                initRuntime();
                readyPromiseResolve(Module);
                if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
                postRun();
            }
            if (Module["setStatus"]) {
                Module["setStatus"]("Running...");
                setTimeout(function() {
                    setTimeout(function() {
                        Module["setStatus"]("");
                    }, 1);
                    doRun();
                }, 1);
            } else {
                doRun();
            }
        }
        if (Module["preInit"]) {
            if (typeof Module["preInit"] == "function") Module["preInit"] = [
                Module["preInit"]
            ];
            while(Module["preInit"].length > 0){
                Module["preInit"].pop()();
            }
        }
        run();
        return Module.ready;
    };
})();
let emscriptenModule;
async function init(module) {
    emscriptenModule = initEmscriptenModule(Module, module);
}
async function decode(buffer) {
    if (!emscriptenModule) init();
    const module = await emscriptenModule;
    const result = module.decode(buffer);
    if (!result) throw new Error('Decoding error');
    return result;
}
export { decode as decode };
