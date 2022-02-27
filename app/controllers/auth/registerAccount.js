import { hashPassword, getBasicUserInfo } from "@common";

const User = require("@root/db/models").User

const registerNormalUser = async (params, res) => {
    try {
        const {
            username,
            firstName,
            lastName,
            email,
            password,
            seedPhrase,
            type
        } = params;
        const user = await User.create({
            username,
            firstName,
            lastName,
            email,
            password: await hashPassword(password),
            seedPhrase,
            type
        });
        const userInfo = await getBasicUserInfo(user);
        res.status(200).send(userInfo)
    } catch(e) {
        console.log("error", e);
        res.status(400).send({error: 'Failed to register'})
    }
}

const registerTokenCreator = async (params, res) => {
    try {
        const {
            username,
            firstName,
            lastName,
            email,
            password,
            seedPhrase,
            website,
            telegram,
            facebook,
            twitter,
            instagram,
            linkedin,
            whitepaper,
            type
        } = params;
        const user = await User.create({
            username,
            firstName,
            lastName,
            email,
            password: await hashPassword(password),
            seedPhrase,
            website,
            telegram,
            facebook,
            twitter,
            instagram,
            linkedin,
            whitepaper,
            type
        });
        const userInfo = await getBasicUserInfo(user);
        res.status(200).send(userInfo)
    } catch(e) {
        console.log(e);
        res.status(400).send({error: 'Failed to register'})
    }
}

const registerAccount = async (req, res) => {
    const params = req.fields;
    console.log(req.fields)
    
    try {
        const {
            username,
            firstName,
            lastName,
            email,
            type,
        } = params;
        if (type == 'user')
            registerNormalUser(params, res);
        else if(type == 'creator')
            registerTokenCreator(params, res);
        else
            res.status(400).send({error: "Unknow user type"})
    } catch(e) {
        console.log(e);
        res.status(400).send({error: 'Failed to register'})
    }
}

export {
    registerAccount
}