
var UserDAO = require('../dao/UserDAO')

class AuthController {
    async signup(req, res, next) {
        try {
            const { userName, email, password } = req.body;
            const emailExist = await UserDAO.getEmail(email)
            if (emailExist.length > 0) {
                res.status(422).send({ error: 'Email Already Exist' });
            }
            const resp = await UserDAO.addUser(req.body);
            res.send(resp)
        } catch (e) {
            res.send({ error: e });
        }
    }
    async login(req, res, next) {
        try {
            console.log(req)
            const { userNameOrMail, password } = req.query;
            const userExist = await UserDAO.getUserDetails(userNameOrMail,password)
            if (userExist.length > 0) {
                res.send({message:'success',data:{userName:userExist[0].userName}});
            }else{
                res.status(422).send({error:'Please Provide Valid Credentials'})
            }
            const resp = await UserDAO.addUser(req.body);
            res.send(resp)
        } catch (e) {
            res.send({ error: e });
        }
    }
}

module.exports = new AuthController();