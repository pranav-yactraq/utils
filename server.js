import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors())
const URL = 'http://localhost:8081';


app.get('/check', async (req, res) => {
    try {
        const params = new URLSearchParams();
        params.append('language', 'en-US');
        params.append('text', "Hey Fabrice, I'm Aventus! \n\nThanks for helping us change that. We'll get that order to the right address ASAP. \n\nIf you need anything else at all don't hesitate to reach out! Excited for you to get yo");

        const response = await fetch(`${URL}/v2/check`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });

        const data = await response.json();
        res.json(data); // Send response to client
    } catch (err) {
        console.error('Fetch error:', err);
        res.status(500).send('Error checking language');
    }
});

app.listen(4000, () => { console.log("poc_langtool_server hosted on 3k") })


