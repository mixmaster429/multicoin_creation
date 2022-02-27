import * as pug from 'pug';
import { sendMailService, getSourcePath } from "@common"
import moment from "moment"
import { Op } from "sequelize";
import jwt_decode from 'jwt-decode';
const path = require('path');
const User = require("@root/db/models").User

const handleErrorPage = (res, message) => {         
    const htmlPath = path.resolve(getSourcePath(), 'views', 'web', 'verifyEmailFailed.html.pug');
    const compiledFunction = pug.compileFile(htmlPath);
    const html = compiledFunction({
        error: message
    });
    return res.send(html); 

}
const verifyEmail = async (req, res) => {    
    console.log("verification")
    try {
        const { token } = req.params
        res.set({
            'Content-Type': 'text/html'
        });

        const decoded = jwt_decode(token);
        if (!decoded || !decoded.exp || !decoded.subToken || !decoded.id) {
          return handleErrorPage(res, "Token invalid");
        }
    
        const _expired = moment.unix(decoded.exp).utc();
        if (!moment().isBefore(_expired)) {            
            return handleErrorPage(res, "Token expried");
        }
        //Check token
        const users = await User.findAll({ where: { id: decoded.id } })
        if (users.length == 0) {             
            return handleErrorPage(res, "Failed verification.");
        }

        const user = users[0]
    
        //verify successfully
        await User.update(
            { emailVerified: true },
            {
                where: { id: decoded.id},
            }
        )
        let message = 'Thanks. Verify email successfully!'
        const htmlPath = path.resolve(getSourcePath(), 'views', 'web', 'verifyEmailSuccessfully.html.pug');
        const compiledFunction = pug.compileFile(htmlPath);
        const data = {
            name: `${user.firstName} ${user.lastName}`,
        }    
        const html = compiledFunction(data);
        res.send(html);
    } catch (error) {
        console.log(error)
        handleErrorPage(res, error.toString())
    }
}

export {
    verifyEmail
}