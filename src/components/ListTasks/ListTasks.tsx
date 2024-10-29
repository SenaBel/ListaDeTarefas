import { Check, ChevronRightIcon, Trash2 } from "lucide-react";
import useListTasks from "./useListTasks";
import NotificationTask from "../Notification/NotificationTask";
import ModalConfirmation from "../ModalConfirmation/ModalConfirmation";
import { useState } from "react";
import Loading from "../Loading/Loading";

function ListTasks() {
  const {
    tasks,
    isLoading,
    error,
    onChangeStatus,
    onRemoveTask,
    notification,
    setNotification,
    openModal,
    setOpenModal,
    onSeeDetailsClick,
  } = useListTasks();

  const [taskToDelete, setTaskToDelete] = useState<string | null>("");

  if (isLoading) return <Loading />;
  if (error)
    return <p className="text-slate-200 font-bold text-2xl">{error}</p>;

  console.log("tasks", tasks);

  return (
    <>
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
              onClick={() => {
                setTaskToDelete(task.id ?? null);
                setOpenModal(true);
              }}
              className=" bg-slate-400 text-white p-2 rounded-md  hover:bg-slate-500"
            >
              <Trash2 />
            </button>

            <button
              onClick={() => onSeeDetailsClick(task.id)}
              className=" bg-slate-400 text-white p-2 rounded-md  hover:bg-slate-500"
            >
              <ChevronRightIcon />
            </button>
          </li>
        ))}

        {notification && (
          <NotificationTask
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
        {openModal && (
          <ModalConfirmation
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
            onConfirm={() => {
              if (taskToDelete !== null) {
                onRemoveTask(taskToDelete); // Executar a exclusão
                setTaskToDelete(null); // Resetar o estado
                setOpenModal(false); // Fechar o modal
              }
            }}
            title="Excluir Tarefa"
            description="Tem certeza que deseja excluir essa tarefa?"
          />
        )}
      </ul>
    </>
  );
}

export default ListTasks;
