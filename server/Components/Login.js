const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Accounts_schema = require('../Schemas/Account');
const Schema_Accounts = Accounts_schema();
const Auth_D = require('../Authentication/index');


const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.API_KEY
});

router.get('/try', async (req, res) => {

    let data = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'assistant', content: 'Say this is a test' }],
    });

    res.json({ data: data.choices });
});


//Login_____________________________________________
router.post('/login', async (req, res) => {
    const { email } = req.body;

    try{
        const emailF = await Schema_Accounts.findOne({ email: email });

        let jwts = '';
        if(emailF != null){
            jwts = jwt.sign({ email: emailF }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5h' });

            res.json({ success: true, token: jwts });
        }else{
            new Schema_Accounts({
                email: email
            }).save().then(async (err, reD) => {
                if(err){
                    res.json({ success: false });
                    return;
                }

                jwts = jwt.sign({ email: emailF }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5h' }); 
                res.json({ success: true, token: jwts });
            })
        }
    }catch(e){
        res.json({ success: false });
    }

});


//Validating________________________________________
router.post('/validate', Auth_D, (req, res) => {
    res.json({ success: true });
})



module.exports = router;