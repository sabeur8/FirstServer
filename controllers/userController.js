const User = require('../models/User')
const bcrypt = require('bcrypt')

exports.getAllUsers = (req, res) => {
    User.findAll()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        console.error('Error fetching users:', err);
        res.status(500).send('Database query error');
    });
}

exports.getUserById = (req,res) =>{
    const {id} = req.params
    User.findByPk(id)
    .then((user)=>{
        if(!user){
            return res.status(404).json({message: 'user not found'})
        }
        res.status(200).json(user);
        
    }).catch(error =>{
        res.status(500).json({ error: error.message });
    })
}

exports.createUser =  async (req,res) => {

    const {name, email, id, password} = req.body ;

    try {
        const salt =  bcrypt.genSaltSync(10)
        const hashedPassword =  bcrypt.hashSync(password, salt);
        
        const newUser =  await User.create({ name, email, id, password: hashedPassword });
        res.status(201).json(newUser);

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: error.message });
    }
}

exports.deleteUser = (req,res) => {

    const {id} = req.params
    User.findByPk(id)

    .then((deletedUser)=>{
        if(!deletedUser){
            return res.status(404).json({message: "user not found"})
        }
        deletedUser.destroy();
    })
    .then(()=>{
        res.status(200).json({message: "user deleted successfully"})
    })
    .catch(error =>{
        res.status(500).json({error: error.message})
    })
}

exports.updateUser = (req,res) => {

    const {idU} = req.params
    const {name, email, id} = req.body

    User.findByPk(idU)
    .then((updatedUser)=>{
        if(!updatedUser){
            return res.status(404).json({message: 'user not found'})
        }

        updatedUser.name = name || updatedUser.name
        updatedUser.email = email || updatedUser.email
        updatedUser.id = id || updatedUser.id

        return updatedUser.save()

    }).then((updatedUser)=>{
        res.status(200).json(updatedUser)
    })
    .catch(error =>{
        res.status(500).json({error: error.message})
    })
}
