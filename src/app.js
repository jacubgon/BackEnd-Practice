import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";

import clientes from "./routes/clientes.js";
import restaurantes from "./routes/restaurantes.js";
import cupones from "./routes/cupones.js";
import reservas from "./routes/reservas.js";

import Cliente from "./models/cliente.js";
import Restaurante from './models/restaurante.js'
import Cupon from './models/cupon.js'
import Reserva from './models/reserva.js'


//conecto con mongoDB
// mongoose.connect("mongodb://localhost:27017/restaurantes");

//otra forma de conectar con MongoDB
const url = "mongodb://127.0.0.1:27017/restaurantes";

// conexion a la base de datos
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((error) => console.error("Error al conectar a MongoDB:", error));

const port = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/clientes", clientes);
app.use("/restaurantes", restaurantes);
app.use("/cupones", cupones);
app.use("/api/reservas", reservas);

app.get("/ping", async (req, res) => {
 res.json({pong:"true"})
});

app.get("/clientes", async (req, res) => {
  try {
    const allClientes = await Cliente.find({})
  // console.log(result);
  res.send(allClientes);
  } catch (err) {
    console.log(err);
    res.status(500).send("pronto volvemos");
  }
});

app.get("/restaurantes", async (req, res) => { try {
  const allRestaurantes = await Restaurante.find({})

res.send(allRestaurantes);
} catch (err) {
  console.log(err);
  res.status(500).send("pronto volvemos");
}

});

app.get("/cupones", async (req, res) => { try {
  const allCupones = await Cupon.find({})

res.send(allCupones);
} catch (err) {
  console.log(err);
  res.status(500).send("pronto volvemos");
}

});

app.get("/reservas", async (req, res) => { try {
  const allReservas = await Reserva.find({})

res.send(allReservas);
} catch (err) {
  console.log(err);
  res.status(500).send("pronto volvemos");
}

});


app.listen(port, () =>
  console.log("Servidor andando http://localhost:" + port)
);
