const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const crypto =  require('crypto')


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please Enter your name.'],
        maxLength:[30,'Name con\'t exceed 30 character.'],
        minLength:[4,'Name should have more than 4 character.']
    },
    email:{
        type:String,
        required:[true,'Please Enter your email.'],
        unique:true,
        validate:[validator.isEmail,'Please Enter your valid email.']
    },
    password:{
        type:String,
        required:[true,'Please Enter your password.'],
        minLength:[8,'password should be greater than 8 characters.'],
        select:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:'user'
    },
    resetPasswordExpire:Date,
    resetPasswordToken:String,

})

//password hashing...
userSchema.pre('save', async function(next){

    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password,10)
})

//jwt sign user
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}

//password compere
userSchema.methods.comparePassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password)
}

//generating password reset token..
userSchema.methods.getRestPasswordToken = function(){

    //generate token
    const restToken = crypto.randomBytes(20).toString('hex')

    //hashing and adding restPassword
    this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(restToken)
    .digest('hex')

    this.resetPasswordExpire = Date.now() +15*60*1000;
    return restToken

}

module.exports = mongoose.model('user',userSchema)