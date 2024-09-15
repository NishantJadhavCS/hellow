const fs = require('fs');

const generateRandomData = (numRecords) => {
    const names = ['John', 'Jane', 'Alex', 'Emily', 'Chris', 'Katie', 'Michael', 'Sarah', 'David', 'Laura'];
    const emails = ['example.com', 'test.com', 'demo.com'];

    const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
    
    return Array.from({ length: numRecords }, (_, index) => ({
        id: index + 1,
        name: `${getRandomElement(names)} ${Math.floor(Math.random() * 1000)}`,
        email: `${getRandomElement(names).toLowerCase()}${index + 1}@${getRandomElement(emails)}`
    }));
};

const data = generateRandomData(10000); // Change 10000 to the number of records you need

fs.writeFileSync('data.json', JSON.stringify(data, null, 2));

console.log('Data generated and saved to data.json');
