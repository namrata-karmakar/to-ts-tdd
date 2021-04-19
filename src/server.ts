import { config } from "./config/config";
import { app } from "./app";
app.listen(config.get("port"), () =>
  console.log(`listening at port ${config.get("port")}`)
);
