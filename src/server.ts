import { config } from "./config/config";
import { app } from "./app";

const port = process.env.PORT || config.get("port")
app.listen(port, () => {
  console.log(`listening at port ${port}`);  
});
