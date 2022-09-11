const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const secreatKey=process.env.secreatKey

const userSchema = new mongoose.Schema({
  fname: {
      type: String,
      required: true,
      trim: true
  },
  email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
          if (!validator.isEmail(value)) {
              throw new Error("not valid email address");
          }
      }
  },
  mobile: {
      type: String,
      required: true,
      unique: true
  },
  password: {
      type: String,
      required: true,
      minlength: 6
  },
  cpassword: {
      type: String,
      required: true,
      minlength: 6
  },
  tokens:[
      {
          token:{
              type:String,
              required:true
          }
      }
  ],
  carts:Array
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});


// userSchema.methods.generatAuthtoken = async function(){
//     try {
//         let token_key = jwt.sign({_id:this._id},secreatKey)
//         this.tokens=this.tokens.concat({token:token_key})
//         await this.save();
//         return this.token
//     } catch (error) {
//         console.log(error);
//     }
// }

userSchema.methods.addtocart = async function(cart){
    try{
        this.carts = this.carts.concat(cart)
        
        await this.save()
        return this.cart
    }catch (error) {
        console.log(error + "vai card e add er somoy error kaise");
    }
}

const User = new mongoose.model("USER", userSchema);

module.exports = User;

