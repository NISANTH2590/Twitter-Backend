const { Pool, Client } = require("pg");
const {
  DATABASE_USER_NAME,
  DATABASE_NAME,
  DATABASE_HOST,
  DATABASE_PASSWORD,
  DATABASE_PORT,
} = process.env;

const credentials = {
  user: DATABASE_USER_NAME,
  host: DATABASE_HOST,
  database: DATABASE_NAME,
  password: DATABASE_PASSWORD,
  port: DATABASE_PORT,
};

// console.log(
//   DATABASE_USER_NAME,
//   DATABASE_NAME,
//   DATABASE_HOST,
//   DATABASE_PASSWORD,
//   DATABASE_PORT
// );

const client = new Client(credentials);
client.connect((err) => {
  if (err) console.log(err);
  else console.log("Connected to Database");
});

module.exports = client;
