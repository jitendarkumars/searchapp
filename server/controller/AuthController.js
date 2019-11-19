
var UserDAO = require('../dao/UserDAO')

class AuthController {
    async signup(req, res, next) {
        try {
            const { userName, email, password } = req.body;
            const emailExist = await UserDAO.getEmail(email)
            if (emailExist.length > 0) {
                res.send({ error: 'Email Already Exist' });
            }
            const resp = await UserDAO.addUser(req.body);
            res.send(resp)
        } catch (e) {
            res.send({ error: e });
        }
    }
    async login(req, res, next) {
        try {
            const { userNameOrMail, password } = req.body;
            const emailExist = await UserDAO.getEmail(email)
            if (emailExist.length > 0) {
                res.send({ error: 'Email Already Exist' });
            }
            const resp = await UserDAO.addUser(req.body);
            res.send(resp)
        } catch (e) {
            res.send({ error: e });
        }
    }
}

module.exports = new AuthController();