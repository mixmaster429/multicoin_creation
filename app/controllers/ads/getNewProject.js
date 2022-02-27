const Banner = require("@root/db/models").Banner

const getNewProject = async (req, res) => {
    const q = req.query;
    try {
        const {rows, count} = await Banner.findAndCountAll({
            where: {
                deactivated: false
            },
        })
        res.status(200).send(rows)
    } catch (e) {
        res.status(400).send({error: "Failed to retrive ads"})
    }
}

export {
  getNewProject
}