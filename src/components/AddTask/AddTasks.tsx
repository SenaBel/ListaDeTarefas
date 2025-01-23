import { useRef } from "react";
import useAddTask from "../AddTask/useAddTask";
import { CustomInput } from "../CustomInput/CustomInput";
import NotificationTask from "../Notification/NotificationTask";
import { Plus } from "lucide-react";

function AddTasks() {
  const {
    handleSumit,
    titleError,
    descriptionError,
    setDescriptionError,
    setTitleError,
    notification,
    setNotification,
  } = useAddTask();

  const inputDescriptionTask = useRef<HTMLInputElement>(null);
  return (
    <form
      onSubmit={(e) => {
        handleSumit(e);
      }}
    >
      <div className="p-6 space-y-4 bg-slate-200 rounded-md shadow flex flex-col">
        <div className="flex flex-col ">
          <CustomInput
            name={"title"}
            type={"text"}
            placeholder={"Titulo da Tarefa"}
            error={titleError}
            onInput={(e) => {
              if ((e.target as HTMLFormElement).value.length > 0)
                setTitleError(null);
            }}
            onPressEnter={() => inputDescriptionTask.current?.focus()}
          />

          {titleError && (
            <span className=" text-red-500 text-sm mt-1">{titleError}</span>
          )}
        </div>

        <div className="flex flex-col ">
          <CustomInput
            name={"description"}
            type={"text"}
            placeholder={"Descrição da Tarefa"}
            error={descriptionError}
            ref={inputDescriptionTask}
            onInput={(e) => {
              if ((e.target as HTMLFormElement).value.length > 0)
                setDescriptionError(null);
            }}
          />

          {descriptionError && (
            <span className=" text-red-500 text-sm mt-1">
              {descriptionError}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="
        bg-slate-500 text-violet-50 px-4 py-2 
        rounded-md font-medium flex justify-center items-center gap-2 hover:bg-slate-600"
        >
          <Plus className="size-4" />
          Adicionar Tarefas
        </button>
      </div>
      {notification && (
        <NotificationTask
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </form>
  );
}
export default AddTasks;
