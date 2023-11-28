import express from "express";
import { router as productsRT } from "./src/routes/productsRt.js";
import { connectToDatabase } from "./db_config.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.get("/", (req, res) => {
  res.json({ message: "hola mundo" });
});

const connection = await connectToDatabase();

app.get("/products", async (req, res) => {
  try {
    const [products, _info] = await connection.query("SELECT * FROM products");
    const prettyProducts = JSON.stringify(products, null, 2);
    res.type("json").send(prettyProducts);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

app.use("/products", productsRT);

app.listen(PORT, (err) => {
  console.log(
    err
      ? `Ocurrió un error: ${err}`
      : `Servidor corre en http://localhost:${PORT}`
  );
});

