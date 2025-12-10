# Swagger / OpenAPI Setup

This is a stub generated for your project. If you want runtime API docs:

Example with express:
```js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: { openapi: "3.0.0", info: { title: "competency-mapping API", version: "1.0.0" } },
  apis: ["./**/*.js"]
};
const spec = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec));
```

Update `apis` to point to files that contain JSDoc @openapi comments.
