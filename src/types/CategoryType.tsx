import { TaskType } from "./TaskType";

export interface CategoryType {
    id: string;
    titulo_categoria: string;
    data_criacao: string;
    tarefas: TaskType[];
}