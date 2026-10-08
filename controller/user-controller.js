const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
const registerUser = async (req, res) => {
    try {

        // geting user information from body
        const { username, email, password, role } = req.body;

        //cheacking the existing of the user
        const checkExistingUser = await User.findOne({ email });
        if (checkExistingUser) {
            return res.status(400).json({
                success: false,
                message: 'User is already exists with this email or username'
            })
        }

        //hash user password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        //create User 
        const newUser = new User({
            username,
            email,
            password: hashPassword,
            role: role || 'user'

        })

        await newUser.save();

        if (newUser) {

            // await tranporter.sendMail({
            //     from: 'IfJ Organization',
            //     to: email,
            //     subject: 'welocome to my organization',
            //     html: `<h2>welcome ${username}</h2>
            //              <p> your email have beeb varify</p>`
            // })
             
            res.status(201).json({
                success: true,
                message: 'user is register succesfully',
                data: newUser

            })
        } else {
            res.status(201).json({
                success: false,
                message: 'unable to register user'
            })

        }




    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            massege: 'something went wrong in register',
        })


    }

}

// LOGIN
const loginUser = async (req, res) => {
    try {
        /*<======== GETING USER INFORMATION ========> */
        const { username, password } = req.body

        // Find Existing user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                success: false,
                massege: 'Invalide Username'
            })
        }

        // Pasword Cheack
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
            return res.status(400).json({
                success: false,
                massege: 'Invalide Username'
            })

        }

        // create user tokon
        const accesToken = jwt.sign({
            userId: user._id,
            username: user.username,
            role: user.role
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '15m'
        })

        res.status(201).json({
            success: true,
            massege: 'Login scucessfull',
            accesToken
        })



    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            massege: 'something went wrong',
        })


    }
}

const getAllUsers = async (req,res)=>{

    const search = parseInt(req.query.search);
    const currentPage = parseInt(req.query.currentPage) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const skip = (currentPage -1)* limit;

    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers/limit);
     const users = await User.find().sort({updatedAt:-1}).limit(limit).skip(skip);

     if(users){
        res.json({
            success: true,
            users,
            totalPages,
            currentPage
        })
     }
}

const changePassword = async (req,res)=>{
    const userId = req.userInfo.userId;

    const {oldPassword, newPassword} = req.body;

    const findUser = await User.findById(userId);

    if(!findUser){
        return res.status(400).json({
            success: false,
            message: 'User not found'
        })
    }

    const checkPassword = await bcrypt.compare(oldPassword,findUser.password);
    if(!checkPassword){
        return res.status(400).json({
            success: false,
            message: 'invalid password'
        })
    }
     const salt = await bcrypt.genSalt(10)
    const newUserPassword = await bcrypt.hash(newPassword,salt);

    findUser.password = newUserPassword;

    await findUser.save()

    res.status(200).json({
        success: true,
        massege: 'password is change succesfully'
    })
}




module.exports = { registerUser, loginUser,changePassword,getAllUsers }