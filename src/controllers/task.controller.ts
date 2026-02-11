import { Request, Response, NextFunction } from 'express';
import { TaskService } from '../services/task.service';
import { CreateTaskDto } from '../models/task.model';

export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  public createTask = (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskData: CreateTaskDto = req.body;
      const newTask = this.taskService.createTask(taskData);
      res.status(201).json(newTask);
    } catch (error) {
      next(error);
    }
  };

  public getTasks = (req: Request, res: Response, next: NextFunction) => {
    try {
      const tasks = this.taskService.getAllTasks();
      res.status(200).json(tasks);
    } catch (error) {
      next(error);
    }
  };
}
