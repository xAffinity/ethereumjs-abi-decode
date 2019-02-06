const abi = require('ethereumjs-abi');

function decodeRequestBytes (parameterTypes, data) {
    if (Buffer.isBuffer(data)) {
        data = data.toString('utf8')
    }

    if (typeof data !== 'string') {
        data = ''
    }

    data = data.trim();

    const dataBuf = Buffer.from(data.replace(/^0x/, ''), 'hex');
    const methodId = dataBuf.subarray(0, 4).toString('hex');
    var inputsBuf = dataBuf.subarray(4)

    inputsBuf = normalizeAddresses(parameterTypes, inputsBuf);
    var inputs = abi.rawDecode(parameterTypes, inputsBuf);

    return inputs;
}

function normalizeAddresses(parameterTypes, input) {
    var offset = 0;
    for (var i = 0; i < parameterTypes.length; i++) {
      var type = parameterTypes[i];
      if (type === 'address') {
        input.set(new Buffer(12), offset);
      }
  
      if (isArray(type)) {
        var size = parseTypeArray(type);
        if (size && size !== 'dynamic') {
          offset += 32 * size;
        } else {
          offset += 32;
        }
      } else {
        offset += 32;
      }
    }
  
    return input;
}

function parseTypeArray(type) {
    var tmp = type.match(/(.*)\[(.*?)\]$/);
    if (tmp) {
      return tmp[2] === '' ? 'dynamic' : parseInt(tmp[2], 10);
    }
    return null;
}
  
function isArray(type) {
    return type.lastIndexOf(']') === type.length - 1;
}

module.exports = {
    decodeRequestBytes,
};