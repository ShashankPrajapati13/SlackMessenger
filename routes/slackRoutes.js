const express = require('express');
const router = express.Router();
const { WebClient } = require('@slack/web-api');

require('dotenv').config();
const web = new WebClient(process.env.SLACK_TOKEN);

router.get('/', (req, res) => {
    res.render('index', { query: req.query });
});


  router.post('/send', async (req, res) => {
    const { channel, message } = req.body;
    try {
        const result = await web.chat.postMessage({
            channel: channel,
            text: message,
        });
        console.log('Message sent:', result.ts);  
        res.redirect('/?success=true');
    } catch (error) {
        console.error('Error sending message:', error);
        res.redirect('/?success=false&error=' + encodeURIComponent(error.message));
    }
});


module.exports = router;
