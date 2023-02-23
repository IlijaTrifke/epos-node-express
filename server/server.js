//express - importovanje express frameworka
const express = require("express");

//importovanje cors-a(cross origin resource sharing)
const cors = require("cors");
require("dotenv").config();

//smeštanje express-a u našu promenljivu preko koje dalje pozivamo express funkcije
const app = express();

//definisanje opcija cors-a koje služe da kontrolišu ko može da post-uje na naš server
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

//errors - importovanje naše funkcije koja će da hendluje errore
const errorHandlerMiddleware = require("./errors/errorHandlerMiddleware");

//routes - importvanje naše rute na koju će sve prijave biti poslate u bazu
const routerPrijave = require("./routes/prijave");

//db - importovanje naše funkcije za konektovanje sa mongoDB bazom
const connectDB = require("./db/connect.js");

//midleware - korišćenje cors-a, pravljenje header-a i respond-a za početnu rutu(/)
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(express.json());
app.get("/", (req, res) => {
  res.send("App is running");
});

//routes - korišćenje naše rute
app.use("/prijave/api", routerPrijave);

//errors - korišćenje našeg error hendlera
app.use(errorHandlerMiddleware);

//definisanje funkcije koja pokreće server
const startServer = async () => {
  try {
    //samo konektovanje s bazom
    await connectDB(process.env.MONGO_URI);
    let PORT = process.env.PORT || 5001;
    //sluašanje servera na određenom portu
    app.listen(PORT, () => {
      console.log("server on port: " + PORT);
    });
  } catch (error) {
    console.log(`There is a problem with a server:${error}`);
  }
};

//pokretanje servera
startServer();

module.exports = app;
