const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db');

const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security headers with relaxed CSP for DevTools
app.use(helmet({
    contentSecurityPolicy: {
        useDefaults: true,
        directives: {
            defaultSrc: ["'self'"],
            connectSrc: ["'self'", "http://localhost:5000", "ws://localhost:5000", "https:", "http:"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
            frameSrc: ["'self'"],
            upgradeInsecureRequests: null,
        },
    },
}));

// Suppress common 404s (Favicon, Chrome DevTools paths)
app.get(['/favicon.ico', '/.well-known/*'], (req, res) => res.status(204).end());

// Enable CORS
app.use(cors());

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 100
});
app.use(limiter);

// Swagger Configuration
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Finance Data Backend API',
            version: '1.0.0',
            description: 'API Documentation for Finance Dashboard System',
            contact: {
                name: 'Developer'
            },
            servers: [`http://localhost:${process.env.PORT || 5000}`]
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: ['./src/routes/*.js', './src/models/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Mount routers
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/records', require('./routes/recordRoutes'));
app.use('/api/summary', require('./routes/summaryRoutes'));

// Error handler middleware
app.use(errorHandler);

module.exports = app;
