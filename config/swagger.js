const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

//Metadata info abot the API
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de proyecto de Convocatoria",
      version: "1.0.0",
      description:
        "Documentación de la API para gestionar convocatorias, proyectos, usuarios y más.",
    },
  },
  apis: ["routes/*.js"], // Rutas donde se encuentran las anotaciones de Swagger
};
//Docs en formato JSON
const swaggerSpec = swaggerJSDoc(swaggerOptions);

const swaggerDocs = (app, port) =>{
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get("/api-docs.json",(req,res)=>{
        res.setHeader("Content-Type","application/json");
        res.send(swaggerSpec);
    });

    //console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
    //console.log("SwaggerSpec:", swaggerSpec); // Verificar que Swagger esté generando el spec.

}

module.exports = {swaggerDocs};
