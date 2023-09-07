const express = require('express');
const router = express.Router();
const Auth_D = require('../Authentication/index');
const { OpenAI } = require('openai');



const openai = new OpenAI({
    apiKey: process.env.API_KEY
});


router.post('/imageSend', Auth_D, async (req, res) => {
    try{
        const { data } = await openai.createImage({
            prompt: "a white siamese cat",
            n: 1,
            size: "1024x1024",
        });
    
        res.json({ success: true, img: data.data[0].url });
    }catch(e){
        console.log(e);
        res.json({ success: false });
    }
});


module.exports = router;