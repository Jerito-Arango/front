const express = require('express');
const cors = require('cors');
const amqp = require('amqplib');

const app = express();
app.use(cors());
app.use(express.json());

let channel, connection;

async function connectRabbitMQ() {
  try {
    connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();
    await channel.assertExchange('mesacerca-events', 'topic', { durable: true });
    console.log("Restaurant Service conectado a RabbitMQ");
  } catch (error) {
    console.error("Error al conectar a RabbitMQ:", error);
    setTimeout(connectRabbitMQ, 5000);
  }
}

connectRabbitMQ();

app.post('/api/restaurants', async (req, res) => {
  const restaurantData = req.body;
  try {
    console.log("Guardando restaurante...", restaurantData);
    
    const evento = {
      eventName: "RestauranteCreado",
      version: "1.0",
      timestamp: new Date(),
      payload: restaurantData
    };

    if (channel) {
      channel.publish(
        'mesacerca-events', 
        'restaurant.created', 
        Buffer.from(JSON.stringify(evento))
      );
      console.log("Evento 'RestauranteCreado' emitido");
    }

    res.status(202).json({ message: "Restaurante guardado y evento emitido" });
  } catch (error) {
    res.status(500).json({ error: "Error al guardar restaurante" });
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Restaurant Service ejecutándose en el puerto ${PORT}`);
});