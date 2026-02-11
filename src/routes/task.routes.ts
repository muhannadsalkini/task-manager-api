import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { validateCreateTask } from '../middleware/validate.middleware';

const router = Router();
const taskController = new TaskController();

router.post('/', validateCreateTask, taskController.createTask);
router.get('/', taskController.getTasks);

export default router;
