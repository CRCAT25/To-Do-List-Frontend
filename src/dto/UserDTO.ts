import { TaskDTO } from './TaskDTO';

export interface UserDTO {
  id: number;
  username: string;
  fullName: string;
  email: string;
  role: string;
  tasks: TaskDTO[];
}
