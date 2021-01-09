function probability(n){
    return Math.random() < n;
}

function getSeparateChunks(str, size) {
    const numChunks = Math.ceil(str.length / size)
    const chunks = new Array(numChunks)

    for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
        chunks[i] = str.substr(o, size)
    }

    return chunks
}

function hasKeyValuePair(object, key, value) {
    const allElementsWithSameKey = object.filter(el => el.key === key);
    if (allElementsWithSameKey.length > 0) {
        const found = allElementsWithSameKey.filter(el => el.value === value);
        if (found && found.length > 0) {
            return true;
        }
    }
    return false;
}


function create32BitBinaryString (nMask) {
    for (var nFlag = 0, nShifted = nMask, sMask = ""; nFlag < 32;
        nFlag++, sMask += String(nShifted >>> 31), nShifted <<= 1);
    return sMask;
}

module.exports = {
    getSeparateChunks,
    hasKeyValuePair,
    create32BitBinaryString,
    probability,
};