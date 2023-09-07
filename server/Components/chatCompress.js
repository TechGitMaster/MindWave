const express = require('express');
const router = express.Router();

const Auth_D = require('../Authentication/index');
const DbOwn_schema = require('../Schemas/DbOwn');

const ChatGPTAPIs = import('chatgpt');


//Chat API setup_____________________________________________________
const apiOpen = async () => {
    const { ChatGPTAPI } = await ChatGPTAPIs;

    const openai = new ChatGPTAPI({
        apiKey: process.env.API_KEY,
        completionParams: {
            model: 'gpt-3.5-turbo',
            temperature: 0.5,
            top_p: 0.8
        }
    });
    
    return openai;
}
apiOpen();


//ChatGPT API call for generating response_______________________________________________________
async function chatGPTFunc(content, idChatAi){
    
    const apiOpens = await apiOpen();
    const { text, id } = await apiOpens.sendMessage(content, {
        parentMessageId: idChatAi
    });

    return { text: text, id: id };
}


router.post('/chatSend', Auth_D, async (req, res) => {
    const { chatUser, IdDB, idChatAi } = req.body;
    const { email } = req.token;

    try{
        const schema_DbOwn = DbOwn_schema(email);
        const { text, id } = await chatGPTFunc(chatUser, idChatAi);


        if(IdDB.length === 0){

            new schema_DbOwn({
                name: chatUser.slice(0, 15),
                idApi: id,
                chat: [{
                    role: 'user', //User_____________________
                    chat: chatUser
                }, {
                    role: 'assistant', //Assistant_____________________
                    chat: text
                }]
            }).save().then(({ _id }) => {
                res.json({ success: true, id: _id, chat: text, idChatAi: id });
            })
        }else{
            const finding = await schema_DbOwn.findOne({ _id: IdDB });
            let chatUpdate = finding.chat;

            //User_____________________
            chatUpdate.push({
                role: 'user',
                chat: chatUser
            })
            
            //Assistant_________________
            chatUpdate.push({
                role: 'assistant',
                chat: text
            })

            schema_DbOwn.updateOne({ _id: IdDB }, { $set: { chat: chatUpdate } }).then(err => {
                res.json({ success: true, id: IdDB, chat: text, idChatAi: id });
            })

        }


    }catch(e){
        console.log(e);
        res.json({ success: false });
    }

});



//Get the chat by ID____________________________________________________
router.post('/byIDs', Auth_D, async (req, res) => {
    const { IdDB } = req.body;
    const { email } = req.token;

    try{
        const schema_DbOwn = DbOwn_schema(email);
        const data = await schema_DbOwn.findOne({ _id: IdDB }, { name: 0, _id: 0 });
        res.json({ success: true, chat: data.chat, idChatAi: data.idApi });
    }catch(e){
        res.json({ success: false });
    }

});



//Get All the chat___________________________________________________________
router.post('/getAll', Auth_D, async (req, res) => {
    const { email } = req.token;

    try{

        const schema_DbOwn = DbOwn_schema(email);

        const data = await schema_DbOwn.find({}, { chat: 0 });

        res.json({ success: true, data: data });

    }catch(e){
        res.json({ success: false });
    }
});



//Delete Chat by Id____________________________________________________________
router.delete('/delete', Auth_D, async (req, res) => {
    const { id } = req.body;
    const { email } = req.token;

    try{
        const schema_DbOwn = DbOwn_schema(email);

        await schema_DbOwn.deleteOne({ _id: id });

        res.json({ success: true });
    }catch(e){
        console.log(e);
        res.json({ success: false });
    }

});




module.exports = router;