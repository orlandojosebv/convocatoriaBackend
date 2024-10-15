const express = require("express");
const cors = require("cors");
const PORT= 3000;

const app = express();
const db=require("./db/index.js");

app.use(
    cors({
        origin: "*",
    })
);

app.use(express.json());

app.get("/api", (_, res) => {
    res.json({ message: "Hello from server!" });
});


app.all('*', (req, res) => {
    res.status(404).send({ message: "ruta invalida" });
})

app.listen(PORT, () => {
    console.log(`Server start with port ${PORT}`);
});
