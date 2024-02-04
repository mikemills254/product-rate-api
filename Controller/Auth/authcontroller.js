import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User } from '../../Model/model.js'
dotenv.config()

console.log('jwt token', process.env.JWT_TOKEN)

export const register = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({ error: 'Username, password, and email are required.' });
        }

        const [existingUsername, existingEmail] = await Promise.all([
            User.findOne({ username }),
            User.findOne({ email })
        ]);

        if (existingUsername) {
            return res.status(400).json({ error: "Username already in use." });
        }

        if (existingEmail) {
            return res.status(400).json({ error: "Email Address already in use." });
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new User({
                username,
                password: hashedPassword,
                email,
            });

            await user.save();

            return res.status(201).json({ 
                msg: "User registered successfully.",
                data: user
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({
            userId: user._id,
            username: user.username,
        }, process.env.JWT_TOKEN, { expiresIn: '24h' });

        res.cookie('access_token', token, { httpOnly: true, path: '/api/v1' });

        return res.status(200).json({
            msg: 'Login Successful....!',
            username: user.username ?? user.username,
            token
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error during login',
            error: error,
        });
    }
}

export const logout = (req, res) => {
    res.cookie('access_token', '', { expires: new Date(0), httpOnly: true, path: '/api/v1' });

    res.status(201).json({
        message: 'User has been logged out'
    });
};


