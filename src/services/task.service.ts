import { randomUUID } from 'crypto';
import { Task, CreateTaskDto } from '../models/task.model';

export class TaskService {
  private tasks: Task[] = [];

  public createTask(createTaskDto: CreateTaskDto): Task {
    console.log(createTaskDto);
    const newTask: Task = {
      id: randomUUID(),
      title: createTaskDto.title,
      completed: false,
      createdAt: new Date(),
    };

    this.tasks.push(newTask);
    return newTask;
  }

  public getAllTasks(): Task[] {
    return this.tasks;
  }
}
