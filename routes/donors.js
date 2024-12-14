const express = require('express');
const router = express.Router();
const Donor = require('../models/Donor');

// Get all donors
router.get('/', async (req, res) => {
    try {
        const donors = await Donor.find();
        res.json(donors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new donor
router.post('/', async (req, res) => {
    const donor = new Donor(req.body);
    try {
        const newDonor = await donor.save();
        res.status(201).json(newDonor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Function to check if a donor can donate to the requested blood group
function canDonate(donorBloodType, requestedBloodType) {
    const compatibleBloodTypes = {
        "A+": ["A+", "AB+"],
        "A-": ["A+", "A-", "AB+", "AB-"],
        "B+": ["B+", "AB+"],
        "B-": ["B+", "B-", "AB+", "AB-"],
        "AB+": ["AB+"],
        "AB-": ["AB+", "AB-"],
        "O+": ["O+", "A+", "B+", "AB+"],
        "O-": ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"]
    };
    return compatibleBloodTypes[donorBloodType].includes(requestedBloodType);
}

// Search for donors by compatible blood type and nearby location
router.get('/search', async (req, res) => {
    const { bloodType, latitude, longitude, maxDistance } = req.query;

    try {
        const donors = await Donor.find({
            bloodType: { $in: Object.keys(compatibleBloodTypes).filter(donorBloodType => canDonate(donorBloodType, bloodType)) },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [parseFloat(longitude), parseFloat(latitude)]
                    },
                    $maxDistance: parseFloat(maxDistance) || 5000 // Default to 5km if not specified
                }
            }
        });

        res.json(donors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;