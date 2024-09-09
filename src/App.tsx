import { useState } from "react";
import AddTasks from "./components/AddTasks";
import Tasks from "./components/Tasks";
import ITasks from "./interfaces/ITasks";
import ModalConfirmation from "./components/ModalConfirmation/ModalConfirmation";

function App() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [newTask, setNewTask] = useState<ITasks | null>(null);
  const [tasks, setTasks] = useState<ITasks[]>([
    {
      id: 1,
      title: "Estudar React",
      description: "Estududar programação e me tornar um programador",
      isCompleted: false,
    },
    {
      id: 2,
      title: "Estudar Angular",
      description: "Estudar Angular  e me tornar um programador",
      isCompleted: false,
    },
    {
      id: 3,
      title: "Estudar Vue",
      description: "Estudar Vue  e me tornar um programador",
      isCompleted: false,
    },
  ]);

  function handleAddTask() {
    if (newTask) {
      const nextId =
        tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;
      setTasks((prevTasks) => [...prevTasks, { ...newTask, id: nextId }]);
      setNewTask(null);
      setIsOpenModal(false);
    }
  }

  function handleCancelAddTask() {
    setNewTask(null);
    setIsOpenModal(false);
  }

  function onChangeStatus(id: number) {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }
      return task;
    });
    setTasks(newTasks);
  }

  function onRemoveTask(id: number) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  return (
    <>
      <div className="  w-screen h-screen bg-slate-500 flex justify-center p-6">
        <div className="space-y-4 w-[500px]">
          <h1 className="text-3xl text-slate-100 font-bold text-center">
            Gerenciador de Tarefas
          </h1>
          <AddTasks setNewTask={setNewTask} setIsOpenModal={setIsOpenModal} />
          <Tasks
            tasks={tasks}
            onChangeStatus={onChangeStatus}
            onRemoveTask={onRemoveTask}
          />
        </div>
        <ModalConfirmation
          isOpen={isOpenModal}
          onClose={handleCancelAddTask}
          onConfirm={handleAddTask}
          title="Confirmar Operação?"
          description="Tem Certeza que Deseja Adicionar Tarefa?"
        />
      </div>
    </>
  );
}

export default App;
