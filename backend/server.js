const express = require('express');
const cors = require('cors');

const employeeRoutes = require('./routes/employees');
const attendanceRoutes = require('./routes/attendance');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/employees', employeeRoutes);
app.use('/attendance', attendanceRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});