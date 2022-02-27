const User = require("@root/db/models").User

const getUserInfo = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByPk(id, {
            attributes: User.profileFields()
        })
        res.status(200).send({
            user
        })
    } catch (e) {
        res.status(400).send({error: "Failed to retrive user info"})
    }
}

export {
    getUserInfo
}