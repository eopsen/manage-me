export interface Task {
  id: number,
  name: string,
  description: string,
  expectedEnd: string,
  state: string,
  projectId: number,
  functionalityId: number,
  startTime: string,
  endTime: string,
  createdDate: string,
}