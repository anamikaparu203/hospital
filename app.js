const express = require('express');
const app = express();

const hospitalRoutes = require('./Routes/hospital1Routes');

app.use('/user', hospitalRoutes);

app.listen(4000, () => {
    console.log('Server running on PORT 4000');
});