import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Management API',
      version: '1.0.0',
      description: 'A simple Task Management API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      schemas: {
        Task: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'The auto-generated id of the task',
            },
            title: {
              type: 'string',
              description: 'The title of the task',
            },
            completed: {
              type: 'boolean',
              description: 'Whether the task is completed',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date the task was created',
            },
          },
        },
        CreateTaskDto: {
          type: 'object',
          required: ['title'],
          properties: {
            title: {
              type: 'string',
              description: 'The title of the task',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
            },
            message: {
              type: 'string',
            },
          },
        },
      },
    },
    paths: {
      '/tasks': {
        get: {
          summary: 'Returns the list of all tasks',
          tags: ['Tasks'],
          responses: {
            200: {
              description: 'The list of the tasks',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Task',
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: 'Create a new task',
          tags: ['Tasks'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CreateTaskDto',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'The created task',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Task',
                  },
                },
              },
            },
            400: {
              description: 'Validation error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [], 
};

export const swaggerSpec = swaggerJsdoc(options);
