import useAddTask from "../AddTask/useAddTask";
import NotificationTask from "../Notification/NotificationTask";
import { Plus } from "lucide-react";

function AddTasks() {
  const {
    description,
    setDescription,
    title,
    settitle,
    onAddTask,
    titleError,
    descriptionError,
    setDescriptionError,
    setTitleError,
    notification,
    setNotification,
  } = useAddTask();

  return (
    <div className="p-6 space-y-4 bg-slate-200 rounded-md shadow flex flex-col">
      <div className="flex flex-col ">
        <input
          type="text"
          placeholder="Titulo da Tarefa"
          className={`border ${
            titleError
              ? "border-red-500 outline-red-500 focus:outline-0"
              : "border-slate-300"
          } outline-slate-400 px-4 py-2 rounded-md`}
          value={title}
          onChange={(e) => {
            settitle(e.target.value);
            if (e.target.value.length > 1) setTitleError(null);
          }}
        />
        {titleError && (
          <span className=" text-red-500 text-sm mt-1">{titleError}</span>
        )}
      </div>
      <div className="flex flex-col ">
        <input
          type="text"
          placeholder="Descrição da tarefa"
          className={`border ${
            descriptionError
              ? "border-red-500 outline-red-500 focus:outline-0"
              : "border-slate-300"
          } outline-slate-400 px-4 py-2 rounded-md`}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (e.target.value.length > 0) setDescriptionError(null);
          }}
        />
        {descriptionError && (
          <span className=" text-red-500 text-sm mt-1">{descriptionError}</span>
        )}
      </div>

      <button
        onClick={onAddTask}
        className="
        bg-slate-500 text-violet-50 px-4 py-2 
        rounded-md font-medium flex justify-center items-center gap-2 hover:bg-slate-600"
      >
        <Plus className="size-4" />
        Adicionar Tarefas
      </button>
      {notification && (
        <NotificationTask
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}
export default AddTasks;
