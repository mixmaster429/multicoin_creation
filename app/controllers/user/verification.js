const User = require("@root/db/models").User

const changeUserVerification = async (req, res) => {
    const id = req.params.id;
    const {status} = req.query;
    try {        
        await User.update(
            { verified: status },
            {
                where: { id: id},                
                attributes: User.profileFields()
            }
        )
        res.status(200).send({status: 1})
    } catch (e) {
        res.status(400).send({error: "Failed to update verification."})
    }
}

export {
    changeUserVerification
}