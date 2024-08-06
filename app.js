// app.js
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const router = require('./routes');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');



const app = express();

// Connect Database
connectDB();

// Init Middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    handler: function (req, res, /*next*/) {
        return res.status(429).json({
            success: false,
            error: 'You sent too many requests. Please wait a while then try again'
        })
    },
})
app.use(limiter)


app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({ extends: true, limit: '50mb' }));
app.use(bodyParser.text({ type: 'application/xml' }));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(helmet());
app.use(helmet.frameguard({ action: "deny" }));


// const options = {
//     swaggerDefinition: {description:"Socumentation of"}, // OpenAPI definition goes here
//     apis: ['src/routes/*.js',"src/routes/*/*.jss" ], // Files containing annotations for the API documentation
//   };
 const swaggerSpecs = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Rewards API",
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:5000"
            }
        ],
    },
    apis: ["/home/roop/Desktop/Desktop/roop/Roop/projects/own/taskManagment/routes/**/*.js"],
};
  
  const swaggerDocs = swaggerJsdoc(swaggerSpecs);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// const swaggerSpec = swaggerJsdoc(options);

//   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/",(req, res)=>{
    res.send("working fine")
} )
// Define Routes
app.use('/api', router);

// app.use('/api', taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.on("error", (err) => {
    logger.error(`Server running on port ${err}`);
    process.exit();
  });