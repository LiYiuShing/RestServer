const User = require('./user.model');

const getAllUsers = (req, res) => {
    User.find({})
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).send(err)
        })
};

const getOneUser = (req, res) => {
    User.findOne({ _id: req.params.id })
        .populate("trips")
        .exec()
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).send(err)
        })
};


const createUser = (req, res) => {
    const newUser = new User(req.body)
    User.findOne({ email: req.body.email })
        .then(user => {
            if(user) return res.status(400).send("User already exists");
            newUser.save()
                .then(user => {
                    res.status(200).json(user)
                })
                .catch(err => {
                    res.status(500).send(err.message)
                })
        })
        .catch(err => {
            res.status(500).send(err)
        })
};

const updateUser = (req, res) => {
    const id = req.params.id
    const update = req.body

    if (Object.keys(update).length === 0) return res.status(400).send("Bad Request");
    User.findOneAndUpdate({ _id: id}, update)
        .then(oldUser => {
            User.findOne({ _id: oldUser.id })
                .populate("trips")
                .exec()
                .then(newUser => {
                    res.status(200).json(newUser)
                })
                .catch(() => {
                    res.status(404).json("Not found")
                })
        })
        .catch(() => {
            res.status(404).json("Not found")
        })
};


const deleteUser = (req, res) => {
    User.findOneAndDelete({ _id: req.params.id })
        .then(user => {
            if (!user) return res.status(404).json("User Not found")
            const payload = {
                user,
                msg: "User was deleted"
            }
            res.status(202).json(payload)
        })
        .catch(err => {
            res.status(500).send(err)
        })
};

module.exports = userController = {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser
}
