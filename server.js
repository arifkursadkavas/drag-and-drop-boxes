const express = require('express');
const app = express();
const PORT = 9500;

app.use(express.static('public'));

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));