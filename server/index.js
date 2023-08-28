import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import bodyParser from "body-parser";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "./config/passport.js";
import connectToDb from "./config/db.js";
import apiRoutes from "./routes/api/index.js";
import { limiter } from "./utils/protect-route.js";
import "./models/user.js";
import "./models/consumption.js";
import "./models/preferences.js";
import home from "./routes/home/index.js";
import corsOptions from "./config/cors-options.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
// const PORT = process.env.PORT || 8080;

const PORT = 8080;

app.use(helmet());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: [
        "'self'",
        "https://api.themoviedb.org",
        "https://drive.google.com",
        "https://vimeo.com",
        "https://www.googleapis.com",
        "https://rr2---sn-qxaelner.c.drive.google.com",
      ],
      imgSrc: [
        "'self'",
        "https://drive.google.com",
        "https://image.tmdb.org",
        "https://lh3.googleusercontent.com",
      ],
      mediaSrc: ["'self'", "https://drive.google.com"],
      styleSrcElem: ["'self'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      frameSrc: ["self", "https://drive.google.com"],
    },
  })
);

app.use(compression());

app.use(cors(corsOptions));

app.use("/assets", express.static(join(__dirname, "public")));
app.use(express.static(join(__dirname, "public", "client")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", 1);

app.use(passport.initialize());
app.use(limiter);

app.use("/api", apiRoutes);
app.use("/", home);

connectToDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
