import { TaskType } from "../types/TaskType";
import './Task.css'
import { FaCalendarDays } from "react-icons/fa6";
import { MdCheckCircle } from "react-icons/md";
import { MdDelete } from "react-icons/md";

type TaskProps = {
  tarefa: TaskType;
  titulo_categoria: String;
  removerTarefa: () => void;
  concluirTarefa: () => void;
};

export function Task({ tarefa, titulo_categoria, removerTarefa, concluirTarefa }: TaskProps) {
  return (
    <div className={`task ${tarefa.conclusao ? 'concluida' : ''}`}>
      <div className="taskData">
        <h2>{tarefa.titulo_tarefa}</h2>
        <p>{tarefa.descricao}</p>
        <div>
          <div>{titulo_categoria}</div>
          <div><FaCalendarDays />{new Date(tarefa.data_criacao).toLocaleDateString('pt-BR')}</div>
        </div>
      </div>
      <div className="taskActions">

        <button onClick={concluirTarefa} className="taskActionsCompleteButton"><MdCheckCircle style={{fontSize: "2rem"}}/></button>
        <button onClick={removerTarefa}  className="taskActionsDeleteButton"><MdDelete style={{fontSize: "2rem"}}/></button>
      </div>
    </div>
  );
}

// export default App
