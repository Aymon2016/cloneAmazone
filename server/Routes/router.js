const express = require("express");
const Products = require("../models/productsSchema");
const USER = require("../models/userSchema");
const bcrypt = require("bcrypt")
const authenicate = require("../middleware/authenticate");
const secreatKey=process.env.secreatKey;
const jwt = require('jsonwebtoken')



const router = new express.Router()


router.get("/getproducts", async (req, res) => {
    try {
        const producstdata = await Products.find();
        
        res.status(201).json(producstdata);
    } catch (error) {
        console.log("error" + error.message);
    }
});
router.get("/getproductsone/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const individualdata = await Products.findOne({id:id});
        
        res.status(201).json(individualdata);
        
    } catch (error) {
        console.log("error" + error.message);
    }
});


router.post("/register", async (req, res) => {
    
    const { fname, email, mobile, password, cpassword } = req.body;

    if (!fname || !email || !mobile || !password || !cpassword) {
        res.status(422).json({ error: "filll the all details" });
        console.log("sob gor poron koro");
    };

    try {

        const preuser = await USER.findOne({ email: email });

        if (preuser) {
            res.status(422).json({ error: "This email is already exist" });
        } else if (password !== cpassword) {
            res.status(422).json({ error: "password are not matching" });;
        } else {

            const finaluser = new USER({
                fname, email, mobile, password, cpassword
            });

            

            const storedata = await finaluser.save();
            // console.log(storedata + "user successfully added");
            res.status(201).json(storedata);
        }

    } catch (error) {
        console.log("request error" + error.message);
        // res.status(422).send(error);
    }

});

// login router
router.post("/login", async (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "fill the details" });
    }

    try {

        const userlogin = await USER.findOne({ email: email });
        
        if (userlogin) {
            const isMatch = await bcrypt.compare(password, userlogin.password);
            

            

            if (! isMatch) {
                res.status(400).json({ error: "pasword not match" });
            } else {
                console.log(userlogin)
                const object = {
                    userName:userlogin.fname,
                    userEmail:userlogin.email,
                    userMobile:userlogin.mobile,
                    userId:userlogin._id
                    
                }
                let token = jwt.sign(object,secreatKey,{
                    expiresIn:'1h'
                  });

                res.cookie("ecomerce", token, {
                    expires: new Date(Date.now() + 258900000000),
                    httpOnly: true,
                    
                    
                });
                
                res.status(201).json(userlogin);
                
                
            }

        } else {
            res.status(400).json({ error: "user not exist" });
        }

    } catch (error) {
        res.status(400).json({ error: "invalid crediential pass" });
        console.log("error the bhai catch ma for login time" + error.message);
    }
});

// adding the data into cart
router.post("/addcart/:id", authenicate, async (req, res) => {

    try {
        
        const { id } = req.params;
        const cart = await Products.findOne({ id: id });
        console.log(cart + "products pawa gese");

        const Usercontact = await USER.findOne({ _id: req.userID });
        console.log(Usercontact + "user pawa gese");


        if (Usercontact) {
            const cartData = await Usercontact.addtocart(cart);
            console.log(cartData + "user er vitor cart save hosse");
            await Usercontact.save();
            
            console.log(Usercontact + "user o db te save hosice");
            res.status(201).json(Usercontact);
        }
    } catch (error) {
        console.log(error);
    }
});
// get data into the cart

router.get("/cartdetails", authenicate, async (req, res) => {
    try {
        const buyuser = await USER.findOne({ _id: req.userID });
        console.log( + "user hain buy pr");
        res.status(201).json(buyuser);
    } catch (error) {
        console.log(error + "error for buy now");
    }
});


router.get("/validuser", authenicate, async (req, res) => {
    try {
        const validuser = await USER.findOne({ _id: req.userID });
        
        res.status(201).json(validuser);
    } catch (error) {
        
    }
});

//remove item from cart

router.delete("/remove/:id",authenicate,(req,res)=>{
    try{
        const {id}=req.params;
        req.rootUser.carts=req.rootUser.carts.filter((cruval)=>{
            return cruval.id !=id;
        })
        req.rootUser.save();
        res.status(201).json(req.rootUser);
        console.log('item romove ')

    }catch (error){
        res.status(400).json(req.rootUser)
        console.log('romove hoi ni beda.baler code koros')
    }
})

router.get("/logout", async (req, res) => {
    try {
            // res.clearCookie("ecomerce");
            // res.status(201).json('clear')
            // res.redirect("/");
            res.clearCookie('ecomerce', {httpOnly: true, path:'/', domain: 'localhost'});
            res.status(201).json('clear cookies')

        

    } catch (error) {
        console.log(error + "jwt provide then logout");
    }
});




module.exports=router