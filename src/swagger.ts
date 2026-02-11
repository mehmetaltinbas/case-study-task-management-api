import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'API documentation',
        },
        servers: [
            {
                url: process.env.API_URL,
            },
        ],
    },
    apis: ['./src/controllers/*.ts'],
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
