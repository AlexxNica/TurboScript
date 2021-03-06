function TurboWrapper(exports, buffer) {

    var HEAP8 = new Int8Array(buffer);
    var HEAP16 = new Int16Array(buffer);
    var HEAP32 = new Int32Array(buffer);
    var HEAPU8 = new Uint8Array(buffer);
    var HEAPU16 = new Uint16Array(buffer);
    var HEAPU32 = new Uint32Array(buffer);
    var HEAPF32 = new Float32Array(buffer);
    var HEAPF64 = new Float64Array(buffer);

    return {
        exports: exports,
        RAW_MEMORY: buffer,

        getMemoryUsage: function () {
            const top = Atomics.load(HEAP32, 2);
            // top -= freeMemory;
            return Math.fround(top / (1024 * 1024));
        }
    }
}
function initTurbo(MB) {
    var buffer = new SharedArrayBuffer(MB * 1024 * 1024);

    if (buffer.byteLength < 16) {
        throw new Error("The memory is too small even for metadata");
    }

    return TurboWrapper(TurboModule(
        typeof global !== 'undefined' ? global : window,
        typeof env !== 'undefined' ? env : {
            STACKTOP: 8,
            STACK_MAX: 8
        },
        buffer
    ), buffer);
}