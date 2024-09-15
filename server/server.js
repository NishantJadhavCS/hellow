const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Path to the data.json file
const dataFilePath = path.join(__dirname, 'data.json');

// Read data from JSON file
const readData = () => {
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data);
};

app.get('/api/data', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 12; // Number of items per page
    const data = readData();

    // Calculate pagination
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const items = data.slice(startIndex, endIndex);

    // Calculate total pages
    const total = data.length;
    const totalPages = Math.ceil(total / pageSize);

    // Ensure we handle the case where `page` exceeds the number of pages
    if (page > totalPages || page < 1) {
        return res.status(404).json({ error: 'Page not found' });
    }

    res.json({
        items,
        total,
        totalPages,
        currentPage: page,
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
