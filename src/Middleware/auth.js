const jwt = require('jsonwebtoken')

const auth1= async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
       if (!token) return res.status(403).send({ status: false, msg: "[x-api-key] Manadatory" })
        let authenticate = jwt.verify(token, 'Blog')
        if (!authenticate)
         return res.status(400).send({ status: false, msg: "Invalid token" })
        next()
    }
    catch (err) {
        res.status(500).send({ msg: "Error", error: err.message })
    }
}
const auth= function (req, res, next) {
    try {
        let authorId = req.params.authorId
        let validator = req.headers["x-api-key"]
        let Token = jwt.verify(validator, 'Blog')
        let decodedToken = Token.authorId
        if (decodedToken !== authorId)
            return res.status(403).send({ status: false, msg: 'User logged is not allowed to modify the requested users data' })
        next()
        }
    catch (error) {
        res.send(500).send({ error: error.message })
    }
}



module.exports.auth1 = auth1

module.exports.auth=auth
