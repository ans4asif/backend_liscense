const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const { PORT } = require('./config');
const indexRouter = require('./routes/index');
const { connectDatabase } = require('./utils/helpers');
const path = require('path');

const app = express();

connectDatabase();
app.use(logger('dev'));
app.use(cookieParser());
app.use(cors());

app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));

app.use('/api', indexRouter);
app.get('/health', (req, res) => {
  res.status(200).send({
    code: 200,
    success: true,
    message: 'Server Is OK',
  });
});

app.listen(PORT, () => {
  console.log(`------------------------------------------------------`);
  console.log(`Server started on port: ${PORT}`);
  console.log(`------------------------------------------------------`);
});

