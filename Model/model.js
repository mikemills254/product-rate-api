import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    comments: [{
        type: mongoose.Types.ObjectId,
        ref: 'Comment'
    }],
    body: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
    },
    upvote: {
        type: Number,
    },
    downvote: {
        type: Number
    }
}, { timestamps: true });

const CommentSchema = mongoose.Schema({
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Please provide a username']
    },
    password: {
        type: String,
        minlength: [8, 'Password should be at least 8 characters'],
        required: [true, 'Please provide a password']
    },
    email: {
        type: String,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
        required: [true, 'Please provide an email address']
    }
});


const User = mongoose.model('User', UserSchema);
const Product = mongoose.model('Product', ProductSchema);
const Comment = mongoose.model('Comment', CommentSchema);

export { User, Product, Comment };
