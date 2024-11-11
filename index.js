const express = require("express");
const cors = require("cors");
const PORT= 3000;

const app = express();
const db=require("./db/index.js");

//Importacion de rutas
const convocatoriaRouter = require("./routes/ConvocatoriaRouter.js");
const rolRouter = require("./routes/RolRouter");
const usuarioRouter = require("./routes/UsuarioRouter");
const proyectoRouter = require("./routes/ProyectoRouter");
const rubricaRouter = require("./routes/RubricaRouter");
const calificacionRouter = require("./routes/CalificacionRouter");
const criterioRouter = require("./routes/CriterioRouter");
const notificacionRouter = require("./routes/NotificacionRouter");
const permisoRouter=require("./routes/PermisoRouter.js")


app.use(
    cors({
        origin: "*",
    })
);

app.use(express.json());

app.get("/api", (_, res) => {
    res.json({ message: "Hello from server!" });
});

app.use("/api/convocatorias", convocatoriaRouter);
app.use("/api/roles", rolRouter);
app.use("/api/usuarios", usuarioRouter);
app.use("/api/proyectos", proyectoRouter);
app.use("/api/rubricas", rubricaRouter);
app.use("/api/calificaciones", calificacionRouter);
app.use("/api/criterios", criterioRouter);
app.use("/api/notificaciones", notificacionRouter);
app.use("/api/permisos", permisoRouter);


app.all('*', (req, res) => {
    res.status(404).send({ message: "ruta invalida" });
})

app.listen(PORT, () => {
    console.log(`Server start with port ${PORT}`);
});
