// filepath: /c:/Users/91700/OneDrive/Desktop/MINOR PROJECT 2024/RaktaMitra/sms-notification/sendSms.js
const twilio = require('twilio');
const accountSid = 'AC234f8537613dd9044f21e06556e9cbb1'; // Your Account SID from www.twilio.com/console
const authToken = '373dc8eb62223047c979ba927066ee81';   // Your Auth Token from www.twilio.com/console

const client = new twilio(accountSid, authToken);

function sendSms(to, message) {
    client.messages.create({
        body: message,
        to: to,  // Text this number
        from: '+12766008605' // From a valid Twilio number
    })
    .then((message) => console.log(message.sid))
    .catch((error) => console.error(error));
}

module.exports = sendSms;