import { app } from "./app";

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`listening at port ${port}`);
  console.log(`environment is ${process.env.NODE_ENV}`);
});
