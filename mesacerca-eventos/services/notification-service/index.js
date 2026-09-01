const express = require('express');
const cors = require('cors');
const amqp = require('amqplib');

const app = express();
app.use(cors());
app.use(express.json());

// Función para conectar a RabbitMQ y escuchar eventos
async function listenToEvents() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    
    // 1. Asegurarnos de que el exchange existe
    await channel.assertExchange('mesacerca-events', 'topic', { durable: true });
    
    // 2. Crear una cola exclusiva para este servicio de notificaciones
    const q = await channel.assertQueue('notification-queue', { durable: true });
    
    // 3. Vincular la cola al exchange usando un filtro (routing key)
    // Aquí escuchamos todo lo relacionado con reservaciones (* o reservation.created)
    await channel.bindQueue(q.queue, 'mesacerca-events', 'reservation.*');

    console.log("Notification Service esperando eventos en RabbitMQ...");

    // 4. Consumir los mensajes que lleguen a la cola
    channel.consume(q.queue, (msg) => {
      if (msg !== null) {
        const evento = JSON.parse(msg.content.toString());
        console.log("¡Evento recibido en Notificaciones!", evento);
        
        // Aquí agregarías la lógica para enviar el correo (ej. Nodemailer, SendGrid)
        console.log(`Enviando correo para la reserva: ${evento.payload.reservaId}`);

        // Confirmar a RabbitMQ que el mensaje fue procesado correctamente
        channel.ack(msg);
      }
    });

  } catch (error) {
    console.error("Error al conectar con RabbitMQ en notification-service:", error);
    setTimeout(listenToEvents, 5000); // Reintenta si hay error
  }
}

// Iniciar la escucha de eventos al arrancar el servicio
listenToEvents();

app.get('/health', (req, res) => {
  res.status(200).json({ status: "Notification Service OK & Listening" });
});

const PORT = 3004;
app.listen(PORT, () => {
  console.log(`Notification Service ejecutándose en el puerto ${PORT}`);
});