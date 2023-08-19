const express = require('express');
const router = express.Router();

const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: "YOUR_API_KEY", // Replace with your actual API key
});

const client = new OpenAIApi(configuration);

router.get('/try', (req, res) => {
    const { data } = req.query;
    res.json({ data: 'asds' });
});


module.exports = router;