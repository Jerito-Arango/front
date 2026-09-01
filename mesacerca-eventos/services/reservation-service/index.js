const express = require('express');
const cors = require('cors');
const amqp = require('amqplib');

const app = express();
app.use(cors());
app.use(express.json());

let channel, connection;

// Función para conectar a RabbitMQ
async function connectRabbitMQ() {
  try {
    connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();
    
    // Creamos un Exchange de tipo 'topic' llamado 'mesacerca-events'
    await channel.assertExchange('mesacerca-events', 'topic', { durable: true });
    console.log("Conectado exitosamente a RabbitMQ");
  } catch (error) {
    console.error("Error al conectar a RabbitMQ:", error);
    setTimeout(connectRabbitMQ, 5000); // Reintenta si RabbitMQ está iniciando
  }
}

connectRabbitMQ();

// Endpoint que simula la creación de una reserva
app.post('/api/reservations', async (req, res) => {
  const datosReserva = req.body;
  
  try {
    console.log("Creando reserva...", datosReserva);
    
    // Estructura basada en el contrato que definiste (reserva-creada.v1.json)
    const evento = {
      eventName: "ReservaCreada",
      version: "1.0",
      timestamp: new Date(),
      payload: datosReserva
    };

    // Emitimos el evento a RabbitMQ
    if (channel) {
      channel.publish(
        'mesacerca-events', 
        'reservation.created', 
        Buffer.from(JSON.stringify(evento))
      );
      console.log("Evento 'ReservaCreada' emitido a RabbitMQ con éxito");
    }

    res.status(202).json({ message: "Reserva recibida y evento emitido correctamente" });
  } catch (error) {
    console.error("Error procesando la reserva:", error);
    res.status(500).json({ error: "Error al procesar la reserva" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Reservation Service ejecutándose en el puerto ${PORT}`);
});