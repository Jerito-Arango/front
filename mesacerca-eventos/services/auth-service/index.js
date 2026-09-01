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
    console.log("Auth Service conectado a RabbitMQ");
  } catch (error) {
    console.error("Error al conectar a RabbitMQ:", error);
    setTimeout(connectRabbitMQ, 5000);
  }
}

connectRabbitMQ();

app.post('/api/auth/register', async (req, res) => {
  const userData = req.body;
  try {
    console.log("Registrando usuario...", userData);
    
    const evento = {
      eventName: "UsuarioRegistrado",
      version: "1.0",
      timestamp: new Date(),
      payload: userData
    };

    if (channel) {
      channel.publish(
        'mesacerca-events', 
        'user.registered', 
        Buffer.from(JSON.stringify(evento))
      );
      console.log("Evento 'UsuarioRegistrado' emitido");
    }

    res.status(202).json({ message: "Usuario registrado y evento emitido" });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar usuario" });
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Auth Service ejecutándose en el puerto ${PORT}`);
});