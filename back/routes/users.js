const router = require("express").Router();
const User = require("../models/user");
const CryptoJS = require("crypto-js")
const verify = require('../Verification')


// Update
router.put("/:id",verify, async (req, res) => { 
    if(req.user.id === req.params.id || req.user.isAdmin){
        if(req.body.password){
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.SECRET)
                .toString()
        }

        try{
            const updatedUser=  await User.findByIdAndUpdate(req.params.id,
                {
                    $set:req.body
                },
                { new:true }
                );

                res.status(200).json(updatedUser)
        }catch(err){
            res.status(500).json(err)
        }

    }else{
        res.status(403).json("you can update only your account")
    }
})

// DELETE
router.delete("/:id",verify, async (req, res) => { 
    if(req.user.id === req.params.id || req.user.isAdmin){
        try{
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("user has been deleted")
        }catch(err){
            res.status(500).json(err)
        }

    }else{
        res.status(403).json("you can Delete only your account")
    }
})
// GET
router.get("/find/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...info } = user._doc;
      res.status(200).json(info);
    } catch (err) {
      res.status(500).json(err);
    }
  });
// GET ALL
router.get("/",verify, async (req, res) => { 
    const query = req.query.now;
    if(req.user.isAdmin){
        try{
            const users= query ? await User.find().sort({_id:-1}).limit(10) : await User.find();
            res.status(200).json(users)
        }catch(err){
            res.status(500).json(err)
        }

    }else{
        res.status(403).json("you are allowed to see all users")
    }
})
// GET USER STATS


module.exports = router;