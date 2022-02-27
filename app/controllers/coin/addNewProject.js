const Token = require("@root/db/models").Token
 

const addNewProject = async (req, res) => {
  const params = req.fields;
  const user = req.user
  try {
      const {
        tokenName,
        tokenSymbol,
        decimal,
        network,
        website,
        whitepaper,
        description,
        logo,
        email,
        developers,
        audit,
        telegram,
        twitter,
        facebook,
        instagram,
        linkedin,
        coinmarketcap,
        coingecko,
        subscription,
        paymentTx,
      } = params;
      const token = await Token.create({
        userid: user.id,
        tokenName,
        tokenSymbol,
        decimal,
        network,
        website,
        whitepaper,
        description,
        logo,
        email,
        developers,
        audit,
        telegram,
        twitter,
        facebook,
        instagram,
        linkedin,
        coinmarketcap,
        coingecko,
        subscription,
        paymentTx,
        verified: false,
        featured: false,
        socialChannel: false,
        endDate: new Date(),
        thumbUp: 0,
        thumbDown: 0,
      });      
      res.send(token)
  } catch(e) {
      console.log(e);
      res.status(400).send({error: 'Failed to submit new project'})
  }
}

export {
    addNewProject
}