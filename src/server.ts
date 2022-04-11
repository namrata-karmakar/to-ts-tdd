import { app } from "./app";
import express from "express";
import path from "path";
const port = process.env.PORT || 3012

app.use(express.static(`${__dirname}/dist` ));

app.get('/', async (req, res) =>  {
  res.sendFile(path.join(`${__dirname}/dist/index.html`));
})

app.listen(port, () => {
  console.log(`listening at port ${port}`);
  console.log(`environment is ${process.env.NODE_ENV}`);
});
