const mongoose = require('mongoose')
const bycrypt = require('bcryptjs')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer'
    }
}, { timestamps: true }

)

// Password Hash middleware

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bycrypt.genSalt(10)
    this.password = await bycrypt.hash(this.password, salt)
    next()
})

// Match Password

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bycrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User', userSchema);