import { app } from "./app";
import logger from "./log/logger";

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  logger.info(`🚀 Server is Running on Port ${PORT}`);
});
