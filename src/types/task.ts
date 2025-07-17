import { Project } from "./project";

export type Task = Project & {
    project_id: number;
    status: string;
}