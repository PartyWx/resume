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