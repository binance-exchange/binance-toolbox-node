const { Spot } = require('binance-connector-node')
const bunyan = require('bunyan')

const apiKey = process.env.APIKEY || ''
const apiSecret = process.env.APISECRET || ''

const logger = bunyan.createLogger({
  name: 'binance connector',
  stream: process.stdout,
  level: 'debug'
})

const client = new Spot(apiKey, apiSecret, {
  logger: logger,
  baseURL: 'https://testnet.binance.vision',
  wsURL: 'wss://testnet.binance.vision'
})


function listenToKey(listenKey) {
   
  const callbacks = {
    open: () => console.log('open'),
    close: () => console.log('closed'),
    message: function (data) {
      const jsonData = JSON.parse(data)
      const now = new Date()
      if (jsonData.e == "executionReport") {
        console.log(`Time Diff: ${now - jsonData.E}`)
      }
    }
  }
  client.userData(listenKey, callbacks)
}

function placeOrders(){
  
  for (let step = 0; step < 100; step++) {
    client.newOrder('BNBUSDT', 'BUY', 'LIMIT', {
      price: 10.01,
      quantity: 1,
      timeInForce: 'GTC'
    })
    .then(response => {
      client.cancelOrder('BNBUSDT', {
        orderId: response.data.orderId
      }).catch(error => console.log(error.message))
    })
    .catch(error => {
      console.error(error);
      process.exit(1);
    })
  }
}


async function main() {

  // get listen key
  const response = await client.createListenKey() 

  // clear current open orders
  await client.cancelOpenOrders('BNBUSDT').catch(error => console.log(error.message))

  listenToKey(response.data.listenKey)

  // wait a while to get ws connected
  setTimeout(function() {
      placeOrders()
  }, 2000);

}

main()
