const abi = require('ethereumjs-abi');

function encodeRequestCall (parametersType, values) {
    const methodId = abi.methodID('configure', parametersType).toString('hex');
    const params = abi.rawEncode(parametersType, values).toString('hex');
    return '0x' + methodId + params;
}

module.exports = {
    encodeRequestCall,
};