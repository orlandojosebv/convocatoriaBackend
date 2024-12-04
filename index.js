const express = require("express");
const cors = require("cors");
const { swaggerDocs } = require("./config/swagger.js");
const PORT = 3000;
const app = express();
/*app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));*/
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://convocatoria-proyectos-ufps.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(express.json());

const convocatoriaRouter = require("./routes/ConvocatoriaRouter.js");
const rolRouter = require("./routes/RolRouter");
const usuarioRouter = require("./routes/UsuarioRouter");
const proyectoRouter = require("./routes/ProyectoRouter");
const rubricaRouter = require("./routes/RubricaRouter");
const calificacionRouter = require("./routes/CalificacionRouter");
const criterioRouter = require("./routes/CriterioRouter");
const notificacionRouter = require("./routes/NotificacionRouter");
const permisoRouter = require("./routes/PermisoRouter.js");
const categoriaConvocatoriaRouter = require("./routes/CategoriaConvocatoriaRouter");
const loginRouter = require("./routes/LoginRouter");

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
app.use("/api/categorias", categoriaConvocatoriaRouter);
app.use("/api/auth", loginRouter);

swaggerDocs(app, PORT);

app.all("*", (req, res) => {
  res.status(404).send({ message: "ruta invalida" });
});

app.listen(PORT, () => {
  console.log(`Server start with port ${PORT}`);
});
