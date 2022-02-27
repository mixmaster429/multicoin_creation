const { CoinType } = require('@trustwallet/wallet-core');
const bitcoin = require('bitcoinjs-lib');
const bip39 = require('bip39');
const ethUtil = require('ethereumjs-util');
const bchaddr = require('bchaddrjs');

const network = bitcoin.networks.bitcoin;

const calcBip32ExtendedKey = (rootKey, path) => {
  if (!rootKey) {
    return rootKey;
  }
  let extendedKey = rootKey;
  const pathBits = path.split('/');
  for (let i = 0; i < pathBits.length - 1; i++) {
    const bit = pathBits[i];
    const index = parseInt(bit);
    if (isNaN(index)) {
      continue;
    }
    const hardened = bit[bit.length - 1] == "'";
    const isPriv = !extendedKey.isNeutered();
    const invalidDerivationPath = hardened && !isPriv;
    if (invalidDerivationPath) {
      extendedKey = null;
    } else if (hardened) {
      extendedKey = extendedKey.deriveHardened(index);
    } else {
      extendedKey = extendedKey.derive(index);
    }
  }
  return extendedKey;
};

const getReceiveAddress = async (req, res) => {
  const { mnemonics, coin } = req.fields;
  const seed = bip39.mnemonicToSeedSync(mnemonics).toString('hex');
  const bip32RootKey = bitcoin.HDNode.fromSeedHex(seed, network);
  const bip32ExtendedKey = calcBip32ExtendedKey(
    bip32RootKey,
    CoinType.derivationPath(CoinType[coin])
  );
  const key = bip32ExtendedKey.derive(0);
  const keyPair = key.keyPair;
  let address = keyPair.getAddress().toString();

  switch (coin) {
    case 'bitcoin':
      address = getBitcoinAddress(key);
      break;

    case 'ethereum':
    case 'smartchain':
      address = getEthereumAddress(keyPair);
      break;

    case 'bitcoincash':
      address = bchaddr.toCashAddress(address).split(':')[1];
      break;

    case 'tron':
      address = getTronAddress(keyPair);
      break;

    default:
      break;
  }

  res.status(200).send({
    status: true,
    address,
  });
};

const getBitcoinAddress = (key) => {
  const keyHash = bitcoin.crypto.hash160(key.getPublicKeyBuffer());
  const scriptPubKey = bitcoin.script.witnessPubKeyHash.output.encode(keyHash);
  const address = bitcoin.address.fromOutputScript(scriptPubKey, network);

  return address;
};

const getEthereumAddress = (keyPair) => {
  const pubkeyBuffer = keyPair.getPublicKeyBuffer();
  const ethPubkey = ethUtil.importPublic(pubkeyBuffer);
  const addressBuffer = ethUtil.publicToAddress(ethPubkey);
  const hexAddress = addressBuffer.toString('hex');
  const checksumAddress = ethUtil.toChecksumAddress(hexAddress);
  const address = ethUtil.addHexPrefix(checksumAddress);

  return address;
};

const getTronAddress = (keyPair) => {
  const newKeyPair = new bitcoin.ECPair(keyPair.d, null, { network: network, compressed: false });
  const pubkeyBuffer = newKeyPair.getPublicKeyBuffer();
  const ethPubkey = ethUtil.importPublic(pubkeyBuffer);
  const addressBuffer = ethUtil.publicToAddress(ethPubkey);
  const address = bitcoin.address.toBase58Check(addressBuffer, 0x41);

  return address;
};

export { getReceiveAddress };
