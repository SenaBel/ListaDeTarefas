import AddTasks from "./components/AddTask/AddTasks";
import ListTasks from "./components/ListTasks/ListTasks";
import Navbar from "./components/navBar/NavBar";
import { TaskProvider } from "./contexts/TaskContext";

function App() {
  return (
    <>
      <Navbar />
      <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
        <div className="space-y-4 w-[500px]">
          <h1 className="text-3xl text-slate-100 font-bold text-center">
            Gerenciador de Tarefas
          </h1>
          <TaskProvider>
            <AddTasks />
            <ListTasks />
          </TaskProvider>
        </div>
      </div>
    </>
  );
}

export default App;
