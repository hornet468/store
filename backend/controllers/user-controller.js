import jwt from "jsonwebtoken"
import { validationResult } from "express-validator";
import bcrypt from "bcrypt"

import UserModel from "../models/user.js"

export const register = async (req, res) => {
    try {
        const error = validationResult(req);
    if (!error.isEmpty()) {
       return  res.status(400).json(error.array());
    };

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
        email: req.body.email,
        passwordHash: hash,
        fullName: req.body.fullName,
    });

    const user = await doc.save();
    const token = jwt.sign({
        _id: user._id
    }, "secret1234", 
    {
        expiresIn: "30d",
    });

    const {passwordHash, ...userData} = user._doc;

    res.json({
        ...userData,
        token
    }) ;

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "register failed",
        })
    }
};

export const login =  async (req, res) => {
    try {
        const user = await UserModel.findOne({
            email: req.body.email
        })
        if(!user) {
            return res.status(400).json({
                message: "error login or password"
            });
        };

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)
        if (!isValidPass) {
            return res.status(400).json({
                message: "error login or password"
            });
        };

        const token = jwt.sign({
            _id: user._id
        },
         "secret1234", 
        {
            expiresIn: "30d",
        });

        const {passwordHash, ...userData} = user._doc;

         res.json({
             ...userData,
             token
    }) ;
    
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "register failed",
        })
    }
};

export const authMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const {passwordHash, ...userData} = user._doc;

        res.json({userData});
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Not success",
        })
    }
};