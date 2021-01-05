const { NUM_CLASSES, NUM_TEACHERS } = require('./constants');

function getMaxBits () {
    return Math.max(NUM_CLASSES, NUM_TEACHERS).toString(2).length;
}

function pad (n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function getSeparateChunks(str, size) {
    const numChunks = Math.ceil(str.length / size)
    const chunks = new Array(numChunks)

    for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
        chunks[i] = str.substr(o, size)
    }

    return chunks
}

module.exports = {
    getMaxBits,
    pad,
    getSeparateChunks,
};