import user from "../model/user";
import User from "../model/user";
import bcrypt from "bcryptjs";

export const getAllUser = async( req, res , next ) => {
    let users;
    try{
        users = await User.find();
    }catch(err){
        console.log(err);
    }
    if(!users){
        return res.status(404).json({
            message: "No User found ",
        });
    }
    return res.status(200).json({users});
};

export const signup = async (req,res , next) => {
    const {name, email, password,blogs,} = req.body;
    let existingUser ;
    try {
        existingUser = await User.findOne({email});
    }catch(err){
        return console.log(err);
    }
    //if user is already there
    if(existingUser){
        return res.status(400).json({
            message : "User already exist ! Login instead",
        });
    }
    // create a new user
    const hashedPassword = bcrypt.hashSync(password);

    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs: [],
    });
    try{
        await user.save();
    }catch(err){
        return console.log(err);
    }
    return res.status(201).json({
        user,
    });

};
export const login = async (req , res, next) => {
     const {email , password} = req.body;
     let existingUser ;
    try {
        existingUser = await User.findOne({email});
    }catch(err){
        return console.log(err);
    }
    //if user is already there
    if(!existingUser){
        return res.status(404).json({
            message : "User doesn't exist ! ",
        });
    }
    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password);
    if(!isPasswordCorrect ){
        return res.status(400).json({
            message : "Incorrect Password",
        });
    }
    return res.status(200).json({
        message : "Login Successfull",
        user : existingUser,
    });
}