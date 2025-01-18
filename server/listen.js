const app = require("./app");

// allows the hosting provider to start up the servers
const { PORT = 9090 } = process.env;
app.listen(PORT, () => console.log(`Listening on ${PORT}...`));

app.listen(9090, () => {
  console.log("now listening on port 9090!");
});
