import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";

import clientes from "./routes/clientes.js";
import restaurantes from "./routes/restaurantes.js";
import cupones from "./routes/cupones.js";
import reservas from "./routes/reservas.js";

import Cliente from "./models/cliente.js";
import Restaurante from "./models/restaurante.js";
import Cupon from "./models/cupon.js";
import Reserva from "./models/reserva.js";

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
  res.json({ pong: "true" });
});

//CRUD CLIENTES

// OBTENER TODOS LOS CLIENTES
app.get("/clientes", async (req, res) => {
  try {
    const allClientes = await Cliente.find({});
    // console.log(result);
    res.send(allClientes);
  } catch (err) {
    console.log(err);
    res.status(500).send("pronto volvemos");
  }
});

//OBTENER UN CLIENTE POR ID
app.post("/clientes", async (req, res) => {
  try {
    const clienteByID = await Cliente.findById({});

    res.send(clienteByID);
  } catch (err) {
    console.log(err);
    res.status(500).send("pronto volvemos");
  }
});

// CRUD RESTAURANTES

// OBTENER TODOS LOS RESTAURANTES
app.get("/restaurantes", async (req, res) => {
  try {
    const allRestaurantes = await Restaurante.find({});

    res.send(allRestaurantes);
  } catch (err) {
    console.log(err);
    res.status(500).send("pronto volvemos");
  }
});

// CREAR NUEVO RESTAURANTE
app.post("/restaurantes", async (req, res) => {
  const newRestaurant = await Restaurante.create({
    nombre: "El Asador de Dani Funes",
    tipo_cocina: "Carnes",
    direccion: "Calle Silos 29, Alcala de Guadaira",
    capacidad: 80,
  });

  res.send(newRestaurant);
});

// ACTUALIZAR RESTAURANTE
app.put("/restaurantes", async (req, res) => {
  const newRestaurant = await Restaurante.create({
    nombre: "El Asador de Pollos de Dani Funes",
  });

  res.send(newRestaurant);
});

//CRUD CUPONES

// OBTENER TODOS LOS CUPONES
app.get("/cupones", async (req, res) => {
  try {
    const allCupones = await Cupon.find({});

    res.send(allCupones);
  } catch (err) {
    console.log(err);
    res.status(500).send("pronto volvemos");
  }
});

//CRUD RESERVAS

// OBTENER TODAS LAS RESERVAS
app.get("/reservas", async (req, res) => {
  try {
    const allReservas = await Reserva.find({});

    res.send(allReservas);
  } catch (err) {
    console.log(err);
    res.status(500).send("pronto volvemos");
  }
});

//OBTENER RESERVAS POR RESTAURANTE

//OBTENER RESERVAS POR CLIENTE



// PUERTOS EN ESCUCHA

app.listen(port, () =>
  console.log("Servidor andando http://localhost:" + port)
);
