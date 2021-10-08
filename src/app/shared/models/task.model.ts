export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  remaining: number;
  estimate: number;
  complete: number;
}
