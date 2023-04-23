const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION!💥 Shutting Down... ');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

//====Connecting To MONGOdb==========================================================
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  // .connect(process.env.DATABASE_LOCAL, {
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connection Successfull'));
//==========================================================

const port = process.env.PORT || 3000;
const server = app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`App Running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION!💥 Shutting Down... ');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// console.log(x);
//Test
