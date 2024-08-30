import { useState } from "react";
import AddTasks from "./components/AddTasks";
import Tasks from "./components/Tasks";

function App() {
  const [tasks, setTasks] = useState([
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
      <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
        <div className="w-[500px]">
          <h1 className="text-3xl text-slate-100 font-bold text-center">
            Gerenciador de Tarefas
          </h1>
          <Tasks
            tasks={tasks}
            onChangeStatus={onChangeStatus}
            onRemoveTask={onRemoveTask}
          />
          {/* <AddTasks /> */}
        </div>
      </div>
    </>
  );
}

export default App;
