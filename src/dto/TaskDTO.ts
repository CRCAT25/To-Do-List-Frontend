export interface TaskDTO {
  id?: number;
  title: string;
  userId: number;
  username: string;
  status: string;
  deadline: string; // hoặc Date nếu bạn parse thành đối tượng Date
}
