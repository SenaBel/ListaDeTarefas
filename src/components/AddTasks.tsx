import { useState } from "react";
import ITasks from "../interfaces/ITasks";

interface IAddTasksProps {
  setNewTask: React.Dispatch<React.SetStateAction<ITasks | null>>;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddTasks({ setNewTask, setIsOpenModal }: IAddTasksProps) {
  const [title, settitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [titleError, setTitleError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);

  function onAddTask() {
    let hasError: boolean = false;

    if (!title) {
      setTitleError("Campo obrigatório");
      hasError = true;
    } else {
      setTitleError(null);
    }

    if (!description) {
      setDescriptionError("Campo obrigatório");
      hasError = true;
    } else {
      setDescriptionError(null);
    }

    if (hasError) return;

    setIsOpenModal(true);
    setNewTask({ id: 0, title, description, isCompleted: false });
    setIsOpenModal(true);
    settitle("");
    setDescription("");
  }

  return (
    <div className="p-6 space-y-4 bg-slate-200 rounded-md shadow flex flex-col">
      <div className="flex ">
        <input
          type="text"
          placeholder="Titulo da Tarefa"
          className="border border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />
        {titleError && (
          <span className="absolute text-red-500 text-sm mt-1">
            {titleError}
          </span>
        )}
      </div>
      <input
        type="text"
        placeholder="Descrição da tarefa"
        className="border border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        onClick={onAddTask}
        className=" bg-slate-500 text-white px-4 py-2 rounded-md font-medium"
      >
        Adicionar Tarefas
      </button>
    </div>
  );
}
export default AddTasks;
