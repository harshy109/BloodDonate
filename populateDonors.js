const mongoose = require('mongoose');
const Donor = require('./models/Donor');

mongoose.connect('mongodb+srv://harshitasalvi236:3Zoe4ihET862xgBm@raktamitra.nvwkw.mongodb.net/RaktamitraData?retryWrites=true&w=majority&appName=Raktamitra')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

const donors = [
    {
        name: "Satyam Sharma",
        bloodType: "A+",
        availability: true,
        location: [28.7041, 77.1025], // New Delhi
        contact: "1234567890",
        email: "john@example.com",
        profileImage: "path/to/profile1.jpg",
        address: "123 Main St, New Delhi"
    },
    {
        name: "Priyesh Yadav",
        bloodType: "B+",
        availability: true,
        location: [28.5355, 77.3910], // Noida
        contact: "0987654321",
        email: "jane@example.com",
        profileImage: "path/to/profile2.jpg",
        address: "456 Elm St, Noida"
    },
    {
        name: "Neeta Mishra",
        bloodType: "B+",
        availability: false,
        location: [28.4595, 77.0266], // Gurgaon
        contact: "456-789-1234",
        email: "robert@example.com",
        profileImage: "path/to/profile3.jpg",
        address: "789 Oak St, Gurgaon"
    },
    {
        name: "Ayaan Zubair",
        bloodType: "O-",
        availability: true,
        location: [28.7041, 77.1025], // New Delhi
        contact: "9876543210",
        email: "ayaan@example.com",
        profileImage: "path/to/profile4.jpg",
        address: "321 Pine St, New Delhi"
    }
];

Donor.insertMany(donors)
    .then(() => {
        console.log('Donors added');
        mongoose.connection.close();
    })
    .catch(err => console.error(err));