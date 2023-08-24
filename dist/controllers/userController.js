"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.createNewUser = void 0;
const user_1 = require("../models/user");
const hash_1 = require("../utils/hash");
const createNewUser = async (req, res, next) => {
    try {
        const { firstName, lastName, phoneNumber, email, password } = req.body;
        const user = await user_1.User.findOne({ email: email });
        if (user) {
            return res.status(403).json({ "message": "user with this email alread exists" });
        }
        const hashedPassword = await (0, hash_1.hashPassword)(password);
        const newUser = new user_1.User({
            firstName,
            lastName,
            phoneNumber,
            email,
            password: hashedPassword
        });
        const validationError = newUser.validateSync();
        if (validationError) {
            return res.status(404).json({ error: 'missing required fields' });
        }
        const savedUser = await newUser.save();
        return res.status(201).json(savedUser);
    }
    catch (error) {
        console.error('Error saving this user', error);
        return res.status(500).json({ error: "something went wrong" });
    }
};
exports.createNewUser = createNewUser;
const getAllUsers = async (req, res, next) => {
    try {
        const users = await user_1.User.find();
        if (users.length === 0) {
            res.json({ 'message': 'No users yet.' });
        }
        return res.status(200).json(users);
    }
    catch (_a) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getAllUsers = getAllUsers;
//# sourceMappingURL=userController.js.map