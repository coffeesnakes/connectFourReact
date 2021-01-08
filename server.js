const express = require('express');
const app = express();
const port = 3003;
app.use(express.static("./client/dist"));

app.get("/", (req, res) => res.send("this should go away!"));

app.listen(port, () => console.log(`cool we\'re live on localhost:${port} move on..`))