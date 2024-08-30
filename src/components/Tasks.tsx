import { Check, ChevronRightIcon, Trash2 } from "lucide-react";
import ITasks from "../interfaces/ITasks";

interface ITasksProps {
  tasks: ITasks[];
  onChangeStatus: (id: number) => void;
  onRemoveTask: (id: number) => void;
}

function Tasks({ tasks, onChangeStatus, onRemoveTask }: ITasksProps) {
  console.log("tasks", tasks);

  return (
    <ul className=" space-y-4 p-6 bg-slate-200 rounded-md shadow">
      {tasks.map((task) => (
        <li key={task.id} className="flex gap-2">
          <button
            onClick={() => onChangeStatus(task.id)}
            className={`w-full  bg-slate-400 text-white p-2 rounded-md ${
              task.isCompleted && "line-through"
            }`}
          >
            <div className="flex items-center gap-5">
              {task.isCompleted && <Check className="text-green-500 mr-2" />}
              {task.title}
            </div>
          </button>

          <button
            onClick={() => onRemoveTask(task.id)}
            className=" bg-slate-400 text-white p-2 rounded-md"
          >
            <Trash2 />
          </button>

          <button className=" bg-slate-400 text-white p-2 rounded-md">
            <ChevronRightIcon />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Tasks;
