const Token = require("@root/db/models").Token
const Banner = require("@root/db/models").Banner
import moment from "moment"

const tokens = {
    "version": 13,
    "coins": [
      {
        "title": "Bitcoin",
        "code": "BTC",
        "decimal": 8,
        "type": "bitcoin"
      },
      {
        "title": "Litecoin",
        "code": "LTC",
        "decimal": 8,
        "type": "litecoin"
      },
      {
        "title": "Ethereum",
        "code": "ETH",
        "decimal": 18,
        "type": "ethereum"
      },
      {
        "title": "Bitcoin Cash",
        "code": "BCH",
        "decimal": 8,
        "type": "bitcoinCash"
      },
      {
        "title": "Dash",
        "code": "DASH",
        "decimal": 8,
        "type": "dash"
      },
      {
        "title": "Binance Smart Chain",
        "code": "BNB",
        "decimal": 18,
        "type": "binanceSmartChain"
      },
      {
        "title": "Binance Coin",
        "code": "BNB",
        "decimal": 8,
        "type": "bep2",
        "symbol": "BNB"
      },
      {
        "title": "Zcash",
        "code": "ZEC",
        "decimal": 8,
        "type": "zcash"
      },
      {
        "id": "exzocoin",
        "title": "ExzoCoin 2.0",
        "code": "exzo",
        "decimal": 9,
        "type": "bep20",
        "address": "0xf8fc63200e181439823251020d691312fdcf5090"
      },
      {
        "title": "1INCH Token",
        "code": "1INCH",
        "decimal": 18,
        "type": "erc20",
        "address": "0x111111111117dc0aa78b770fa6a738034120c302"
      },
      {
        "title": "Aave",
        "code": "AAVE",
        "decimal": 18,
        "type": "erc20",
        "address": "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9"
      },
      {
        "title": "Balancer",
        "code": "BAL",
        "decimal": 18,
        "type": "erc20",
        "address": "0xba100000625a3754423978a60c9317c58a424e3d"
      },
      {
        "title": "Chainlink",
        "code": "LINK",
        "decimal": 18,
        "type": "erc20",
        "address": "0x514910771af9ca656af840dff83e8264ecf986ca"
      },
      {
        "title": "Compound",
        "code": "COMP",
        "decimal": 18,
        "type": "erc20",
        "address": "0xc00e94cb662c3520282e6f5717214004a7f26888"
      },
      {
        "title": "Curve DAO Token",
        "code": "CRV",
        "decimal": 18,
        "type": "erc20",
        "address": "0xd533a949740bb3306d119cc777fa900ba034cd52"
      },
      {
        "title": "Maker",
        "code": "MKR",
        "decimal": 18,
        "type": "erc20",
        "address": "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2"
      },
      {
        "title": "Synthetix",
        "code": "SNX",
        "decimal": 18,
        "type": "erc20",
        "address": "0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f"
      },
      {
        "title": "Tether USD",
        "code": "USDT",
        "decimal": 6,
        "type": "erc20",
        "address": "0xdac17f958d2ee523a2206206994597c13d831ec7"
      },
      {
        "title": "Uniswap",
        "code": "UNI",
        "decimal": 18,
        "type": "erc20",
        "address": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"
      },
      {
        "title": "USD Coin",
        "code": "USDC",
        "decimal": 6,
        "type": "erc20",
        "address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
      },
      {
        "title": "yearn.finance",
        "code": "YFI",
        "decimal": 18,
        "type": "erc20",
        "address": "0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e"
      },
      {
        "title": "Crypto.com Coin",
        "code": "CRO",
        "decimal": 8,
        "type": "erc20",
        "address": "0xa0b73e1ff0b80914ab6fe0444e65848c4c34450b"
      },
      {
        "title": "Sushi",
        "code": "SUSHI",
        "decimal": 18,
        "type": "erc20",
        "address": "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2"
      },
      {
        "title": "PancakeSwap",
        "code": "CAKE",
        "decimal": 18,
        "type": "bep20",
        "address": "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82"
      },
      {
        "title": "FTX Token",
        "code": "FTT",
        "decimal": 18,
        "type": "erc20",
        "address": "0x50d1c9771902476076ecfc8b2a83ad6b9355a4c9"
      },
      {
        "title": "Huobi Token",
        "code": "HT",
        "decimal": 18,
        "type": "erc20",
        "address": "0x6f259637dcd74c767781e37bc6133cd6a68aa161"
      },
      {
        "title": "KuCoin Token",
        "code": "KCS",
        "decimal": 18,
        "type": "erc20",
        "address": "0xf34960d9d60be18cc1d5afc1a6f012a723a28811"
      },
      {
        "title": "sUSD",
        "code": "SUSD",
        "decimal": 18,
        "type": "erc20",
        "address": "0x57ab1ec28d129707052df4df418d58a2d46d5f51"
      },
      {
        "title": "Dai",
        "code": "DAI",
        "decimal": 18,
        "type": "erc20",
        "address": "0x6b175474e89094c44da98b954eedeac495271d0f"
      },
      {
        "title": "Wrapped Bitcoin",
        "code": "WBTC",
        "decimal": 8,
        "type": "erc20",
        "address": "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599"
      },
      {
        "title": "renBTC",
        "code": "renBTC",
        "decimal": 8,
        "type": "erc20",
        "address": "0xeb4c2781e4eba804ce9a9803c67d0893436bb27d"
      },
      {
        "title": "sBTC",
        "code": "sBTC",
        "decimal": 18,
        "type": "erc20",
        "address": "0xfe18be6b3bd88a2d2a7f928d00292e7a9963cfc6"
      },
      {
        "title": "Mirror Protocol",
        "code": "MIR",
        "decimal": 18,
        "type": "erc20",
        "address": "0x09a3ecafa817268f77be1283176b946c4ff2e608"
      }
    ]
  }
  
const getFeaturedProject = async (req, res) => {  
  const q = req.query;
  const w = {};
  try {
    const {rows, count} = await Token.findAndCountAll({
        where: {
          featured: true
        },
    })
    const ids = rows.map(item => item.coingeckoApiID);
    if (ids.length == 0)
      return res.send([]);
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join()}&vs_currencies=USD&include_market_cap=false&include_24hr_vol=false&include_24hr_change=true&include_last_updated_at=false`
    const coingeckoRes = await fetch(url);
    if (coingeckoRes.status != 200) {
      console.log("coingecko api error");
      return res.send([]);
    }    
    const market = await coingeckoRes.json();
    console.log(market)
    const result = rows.map(item => ({
      name: item.tokenName,
      symbol: item.tokenSymbol,
      logo: item.logo,
      price: market[item.coingeckoApiID]["usd"],
      price_change: market[item.coingeckoApiID]["usd_24h_change"],
    }))
    res.status(200).send(result)
  } catch (e) {
    console.log(e)
    res.status(400).send({error: "Failed to retrive featured tokens"})
  }
}

const filterTokens = async (req, res) => {
  const q = req.query;
  const {
      network,
      tokenName,
      verified,
      startNo = 0,
      pageSize = 10
  } = q;
  const w = {};
  if (network != undefined) 
      w.network = network;
  if (tokenName)
      w.tokenName = tokenName;
  if (verified != undefined)
      w.verified = verified
  try {
      const {rows, count} = await Token.findAndCountAll({
          where: w,
          offset: Number(startNo),
          limit: Number(pageSize),
      })
      res.status(200).send({
          tokens: rows,
          count: count
      })
  } catch (e) {
      console.log(e)
      res.status(400).send({error: "Failed to retrive tokens"})
  }
}

const acceptToken = async (req, res) => {
  const params = req.fields;
  const {
      tokenId,
      apiId,
      title,
      description,
      buttonTitle,
      buttonLink
  } = params;
  try{
      const token = await Token.findByPk(tokenId)
      const user = req.user;
      if (token == null)
        return res.status(400).send({error: "Token not found"})
      if (token.featured == true)
        return res.status(400).send({error: "Token already featured"})
      switch (token.subscription) {
        case "1 Day":
          token.endDate = moment().add(1, 'd').toDate()
          break;
        case "7 Days":
          token.endDate = moment().add(7, 'd').toDate()
          token.socialChannel = true
          break;
        case "14 Days":
          token.endDate = moment().add(14, 'd').toDate()
          token.socialChannel = true
          break;
        case "30 Days":
          token.endDate = moment().add(30, 'd').toDate()
          token.socialChannel = true
          break;
        case "1 Year":
          token.endDate = moment().add(1, 'y')
          token.socialChannel = true
          break;
      }
      token.featured = true
      token.coingeckoApiID = apiId
      token.save()
      if ( token.subscription != "1 Day") {
        const banner = await Banner.create({
          tokenid: token.id,
          title: title ?? "Welcome,",
          description: description ?? `Buy ${token.tokenName} Today for Extended Charts`,
          buttonTitle: buttonTitle ?? "Buy Now",
          buttonLink: buttonLink ?? token.website,
          endDate: token.endDate,
          deactivated: false,
        })
      }
      res.status(200).send({
        'success': true
      })
  } catch (e) {
      console.log(e)
      res.status(400).send({error: "Failed to accept token"})
  }
}

export {
  getFeaturedProject,
  filterTokens,
  acceptToken
}