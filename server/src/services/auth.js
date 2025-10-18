const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const config = require("../config");
const UsersModel = require("../models/user");
const { createError } = require("./utils");
const { profile } = require("../controllers/auth");

const generateToken = (user) => {
    return jsonwebtoken.sign(user, config.JWT_SECRET, { expiresIn: "1h" });
};

module.exports = {
    signupUser: async ({ email, password, name, role = "buyer" }) => {
        if (!email || !password)
            throw createError("Email and password are required", 400);

        if (password.length < 6)
            throw createError("Password must be at least 6 characters", 400);

        const exists = await UsersModel.findOne({ email });
        if (exists) throw createError("User already exists", 400);

        const newUser = new UsersModel({
            email,
            password,
            name,
            role,
        });

        await newUser.save();

        return {
            id: newUser._id,
            email: newUser.email,
            role: newUser.role,
            name: newUser.name,
            token: generateToken({ id: newUser._id, email: newUser.email, role: newUser.role }),
        };
    },

    loginUser: async ({ email, password }) => {
        if (!email || !password)
            throw createError("Email and password are required", 400);

        const user = await UsersModel.findOne({ email });
        if (!user) throw createError("Invalid credentials", 401);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw createError("Invalid credentials", 401);

        return {
            id: user._id,
            email: user.email,
            role: user.role,
            name: user.name,
            token: generateToken({ id: user._id, email: user.email, role: user.role }),
        };
    },

    changePassword: async (userId, { oldPassword, newPassword }) => {
        if (!oldPassword || !newPassword) throw createError("Old and new passwords are required", 400);
        if (newPassword.length < 6) createError("New password must be at least 6 characters", 400);
        const user = await UsersModel.findById(userId);
        if (!user) createError("User not found", 404);
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) createError("Old password is incorrect", 401);
        user.password = newPassword;
        await user.save();
        return { message: "Password changed successfully" };
    },

    profile: async (userId) => {
        const user = await UsersModel.findById(userId).select("-password");
        if (!user) throw createError("User not found", 404);
        return user;
    }
};
