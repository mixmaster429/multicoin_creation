const User = require("@root/db/models").User

const filterUsers = async (req, res) => {
    const q = req.query;
    const {
        type,
        username,
        firstName,
        lastName,
        startNo,
        pageSize
    } = q;
    const w = {};
    if (type) 
        w.type = type;
    if (username)
        w.username = username;
    if (firstName)
        w.firstName = firstName;
    if (lastName)
        w.lastName = lastName;
    try {
        const {rows, count} = await User.findAndCountAll({
            where: w,
            offset: Number(startNo),
            limit: Number(pageSize),
            attributes: User.profileFields()
        })
        res.status(200).send({
            users: rows,
            count: count
        })
    } catch (e) {
        res.status(400).send({error: "Failed to retrive users"})
    }
}

export {
    filterUsers
}