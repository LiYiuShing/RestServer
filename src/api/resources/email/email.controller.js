const jwt = require('jsonwebtoken');
const bcypt = require('bcryptjs');
const User = require('../user/user.model');
const {transporter, resetURL, template} = require('../../modules/resetPasswordEmail');

const oneTimeUseToken = ({
    password: password,
    _id: userId,
    date: dateCreate
}) =>  {
    const secret = password + "-" + dateCreate
    const token = jwt.sign({ userId }, secret, {
        expiresIn: 3600
    })
    return token
};

const sendEmail = async(req, res) => {
    const { email } = req.params
    console.log({email})
    User.findOne({ email })
        .exec()
        .then(user => {
            if (!user) {
                res.status(404).json("Email not found.")
            }
            const token = oneTimeUseToken(user)
            const url = resetURL(user, token)
            const emailTemplate = template(user, url)

            const sendEmail = () => {
                transporter.sendMail(emailTemplate, (err, info) => {
                    if (err) {
                        res.status(500).json(err.message)
                    }
                    console.log(info)
                })
            }
            sendEmail()
        })
        .catch(err => {
        res.status(404).json(err.message)
    })
};

const setNewPassword = (req, res) => {
    const { userId, token } = req.params
    const { password } = req.body

    User.findOne({ _id: userId })
        .then(user => {
            const secret = user.password + "-" + user.dateCreate
            const payload = jwt.decode(token, secret)
            if(payload.userId === user.id ) {
                bcypt.genSalt(10, (err, salt) => {
                    if (err) { res.status(500).json(err.message) } 
                    bcypt.hash(password, salt, (err, hashpassword) => {
                        if (err) { res.status(500).json(err.message) }
                        User.findOneAndUpdate({_id: userId}, {password: hashpassword})
                            .then(() => res.status(202).send('Sucessful'))
                            .catch(err => res.status(500).json(err.message))
                    })
                })
            }
        })
        .catch(err => {
            res.status(404).json(err.message)
        })
}

module.exports = email = { sendEmail, setNewPassword }
