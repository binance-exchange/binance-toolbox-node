const { Spot } = require('binance-connector-node')

const apiKey = process.env.APIKEY || ''
const apiSecret = process.env.APISECRET || ''

const client = new Spot(apiKey, apiSecret)
client.klines('btcusdt', '1m').then(data => console.log(data))
