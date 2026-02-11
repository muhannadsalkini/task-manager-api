import request from 'supertest';
import app from '../src/app';

describe('Task API Integration Tests', () => {
  let createdTaskId: string;

  describe('POST /tasks', () => {
    it('should create a new task with valid data', async () => {
      const res = await request(app)
        .post('/tasks')
        .send({ title: 'Finish the code challenge' });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.title).toBe('Finish the code challenge');
      expect(res.body.completed).toBe(false);
      expect(res.body).toHaveProperty('createdAt');

      createdTaskId = res.body.id;
    });

    it('should return 400 if title is missing', async () => {
      const res = await request(app)
        .post('/tasks')
        .send({});

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toContain('Title is required');
    });

    it('should return 400 if title is empty', async () => {
      const res = await request(app)
        .post('/tasks')
        .send({ title: '   ' });

      expect(res.status).toBe(400);
      expect(res.body.message).toContain('Title is required');
    });
  });

  describe('GET /tasks', () => {
    it('should return a list of tasks', async () => {
      const res = await request(app).get('/tasks');

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThanOrEqual(1); // At least the one we created
      
      const foundTask = res.body.find((task: any) => task.id === createdTaskId);
      expect(foundTask).toBeDefined();
      expect(foundTask.title).toBe('Finish the code challenge');
    });
    
    it('should return tasks with correct structure', async () => {
        const res = await request(app).get('/tasks');
        const task = res.body[0];
        
        expect(task).toHaveProperty('id');
        expect(task).toHaveProperty('title');
        expect(task).toHaveProperty('completed');
        expect(task).toHaveProperty('createdAt');
    });
  });
});
