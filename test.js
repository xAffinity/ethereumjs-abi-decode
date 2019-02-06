const utils = require('web3-utils');
const { encodeRequestCall } =  require('./encoder');
const { decodeRequestBytes } = require('./decoder');

const securityTokenSymbol = 'STO';
const securityTokenName = "ISTOX";

const softCap = utils.toWei(utils.toBN(750000), 'ether');
const hardCap = utils.toWei(utils.toBN(1000000), 'ether');
const minInvestment = utils.toWei(utils.toBN(10000), 'ether');
const maxInvestment = utils.toWei(utils.toBN(100000), 'ether');

const preSaleStart = utils.toBN(1123412312312);
const preSaleEnd = utils.toBN(12312312312312);
const publicSaleStart = utils.toBN(125543213129);
const closingTime = utils.toBN(54443112312);

const _contractAddressesArgs = [
    '0x8fed6d0ad578b7f4beb7aa04de81da9b94244e4f', 
    '0x182b2ad652b11cf6bd03110bfe77d4dc2580285a',
    '0xc257274276a4e539741ca11b590b9447b26a8051'
];

const _accountAddressesArgs = [
    '0xf545111f268da07439550344d668ab272986778f',
    '0xd26114cd6ee289accf82350c8d8487fedb8a0c07'
];

const _stoTimeArgs = [
    preSaleStart,
    preSaleEnd,
    publicSaleStart,
    closingTime
];

const _stoInvestmentArgs = [
    softCap,
    hardCap,
    minInvestment,
    maxInvestment
];

let types = ['address[3]', 'address[2]', 'uint256[4]', 'uint256[4]', 'string', 'string'];
let params = [_contractAddressesArgs, _accountAddressesArgs, _stoTimeArgs, _stoInvestmentArgs, securityTokenName, securityTokenSymbol];
const stoDeployBytes = encodeRequestCall(types, params);

console.log('Encoded bytes:', stoDeployBytes);

const decodedParams = decodeRequestBytes(types, stoDeployBytes);
console.log('Decoded bytes:', decodedParams);


