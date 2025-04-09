const express = require('express');

const app = express();
const studentRoutes = require('./routes/studentRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use(express.json());
app.use('/student', studentRoutes);
app.use('/admin', adminRoutes); // 

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//makes sure the app works we can use ongoing servers 