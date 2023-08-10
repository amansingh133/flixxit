import { allowedUrls } from "./allowed-urls.js";

const corsOptions = {
  origin: allowedUrls,
  credentials: true,
};

export default corsOptions;
