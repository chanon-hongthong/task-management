import { TaskStatus } from "../tasks.model";

export class GetTasksWithFilterDto{
    status?: TaskStatus;
    search?: string;
}