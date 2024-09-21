const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const dataPath = path.join(__dirname, '../hospital.json');

// Helper function to read and write to JSON file
const readData = () => JSON.parse(fs.readFileSync(dataPath));
const writeData = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

// GET all hospitals
router.get('/hospital', (req, res) => {
    const hospital = readData();
    res.send(hospital);
});

// POST a new hospital
router.post('/add', (req, res) => {
    const newHospital = req.body;
    const hospital = readData();
    newHospital.id = hospital.length ? hospital[hospital.length - 1].id + 1 : 1;
    hospital.push(newHospital);
    writeData(hospital);
    res.send('Hospital added');
});

// PUT to update a hospital
router.put('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const updatedHospital = req.body;
    const hospital = readData();
    const index = hospital.findIndex(h => h.id === id);
    hospital[index] = { id, ...updatedHospital };
    writeData(hospital);
    res.send(hospital);
});

// DELETE a hospital
router.delete('/remove/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const hospital = readData();
    const filteredHospital = hospital.filter(hospital => hospital.id !== id);
    writeData(filteredHospital);
    res.send(filteredHospital);
});

module.exports = router;