//importando as dependencias
import { fromSeed } from 'bip32'
import { generateMnemonic, mnemonicToSeedSync } from 'bip39'
import { networks, payments } from 'bitcoinjs-lib'

//define a rede 
//bitcoin - rede principal mainnet
//testnet - rede de teste testnet
const network = networks.testnet

//derivacao de carteiras HD
//m/49 /1 /0 /0 testnet
//m/49 /0 /0 /0 mainnet
const path = `m/49'/1'/0'/0`

//criando o mnemonic para a seed (palavras de senha)
let mnemonic = generateMnemonic()
const seed = mnemonicToSeedSync(mnemonic)

//criando a raiz da carteira HD
let root = fromSeed(seed, network)

//criando uma conta - par pvt-pub keys
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

//cria a carteira
let btcAddress = payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

//printa as informacoes
console.log("carteira gerada")
console.log("endereco: ", btcAddress)
console.log("chave privada: ", node.toWIF())
console.log("seed: ", mnemonic)