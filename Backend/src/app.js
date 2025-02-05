// Importacion de los modulos
const express = require('express')
const cors = require("cors")
const bodyParser=require('body-parser');
const app = express();
const PORT= process.env.PORT || 3000;

const patientRoutes = require('./routes/patientRoutes')
const scheleRoutes = require('./routes/scheduleRoutes')


const appointmentRoutes = require('./routes/appointmentRoutes')


const doctorRoutes = require('./routes/doctorRoutes')
const citaRoutes = require('./routes/appointmentRoutes')
const perfilDrRoutes = require('./routes/perfilDrRoutes')
// const userRoutes = require('./routes/userRoutes')




app.use(cors({
    origin: '*', // Permitir cualquier origen
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
}));


app.use(express.json())//body en formato JSONrs
app.use(bodyParser.json());

app.use('/MediCare',doctorRoutes);
app.use('/MediCare',citaRoutes);
app.use('/MediCare',perfilDrRoutes);
app.use('/MediCare',appointmentRoutes);
app.use('/MediCare',scheleRoutes);
app.use('/MediCare',patientRoutes);
app.use(bodyParser.json({limit: '15mb'}));

//app.use(cors());

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
  });

module.exports= app;