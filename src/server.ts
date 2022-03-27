import { config } from "./config/config";
import { app } from "./app";
app.listen(process.env.PORT || config.get("port"), () => {
  if(process.env.PORT) console.log(`${process.env.PORT}`);
  else console.log(`listening at port ${config.get("port")}`);  
});
