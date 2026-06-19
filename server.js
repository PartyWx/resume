const express = require('express');
const fs = require('fs');
const path = require('path')

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)))

app.post('/add-gig', (req, res) => {
    const newGig = req.body;

    const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    newGig.id = data.experience.length + 1;
    data.experience.push(newGig);

    fs.writeFileSync('data.json', JSON.stringify(data, null, 4));
    res.json({ success: true })
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

app.get('/gigs', (req, res) => {
    const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    res.json(data.experience);
});

app.put('/update-gig/:id', (req, res) => {
    const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    const id = parseInt(req.params.id);
    const index = data.experience.findIndex(gig => gig.id === id);
    if (index === -1) {
        return res.json({ success: false, message: 'Gig not found' });
    }
    data.experience[index] = { ...req.body, id: id };
    fs.writeFileSync('data.json', JSON.stringify(data, null, 4));
    res.json({ success: true });
});

app.delete('/delete-gig/:id', (req, res) => {
    const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    const id = parseInt(req.params.id);
    data.experience = data.experience.filter(gig => gig.id !== id);
    fs.writeFileSync('data.json', JSON.stringify(data, null, 4));
    res.json({ success: true });
});