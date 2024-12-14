// filepath: /c:/Users/91700/OneDrive/Desktop/MINOR PROJECT 2024/RaktaMitra/sms-notification/server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const sendSms = require('./sms-notification/sendSms');
const Donor = require('./models/Donor');
const donorsRouter = require('./routes/donors');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://harshitasalvi236:3Zoe4ihET862xgBm@raktamitra.nvwkw.mongodb.net/RaktamitraData?retryWrites=true&w=majority&appName=Raktamitra', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.use('/donors', donorsRouter);

app.post('/request-blood', async (req, res) => {
    const { recipientName, bloodType, location, urgency } = req.body;

    const message = `URGENT: ${recipientName} in your location is in need of blood! Blood type: ${bloodType}, Location: ${location}, Urgency: ${urgency}`;

    try {
        // Fetch donors from the database
        const donors = await Donor.find({ bloodType });

        donors.forEach(donor => {
            sendSms(donor.contact, message);
        });

        res.status(200).send('SMS notifications sent to nearby donors');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching donors from the database');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});