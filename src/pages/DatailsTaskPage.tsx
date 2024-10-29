import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TaskService from "../services/TaskService";
import ITasks from "../interfaces/ITasks";
import { ChevronLeftIcon } from "lucide-react";
import Loading from "../components/Loading/Loading";

function DatailsTaskPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [task, setTask] = useState<ITasks | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTask() {
      if (!id) return; // Verifica se o ID está presente
      try {
        const taskData = await TaskService.getTaskById(id);
        setTask(taskData); // Define a tarefa no estado
      } catch (error) {
        console.error("Erro ao buscar a tarefa:", error);
      } finally {
        setLoading(false); // Atualiza o estado de carregamento
      }
    }
    fetchTask();
  }, [id]);

  if (loading) {
    return <Loading hScreen={true} />;
  }

  if (!task) {
    return <p>Tarefa não encontrada.</p>;
  }

  console.log("task", task);

  return (
    <div className="w-screen h-screen flex justify-center bg-slate-500 p-6">
      <div className="w-[500px] space-y-4">
        <div className="flex justify-center relative mb-6">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 top-0 bottom-0 text-slate-100"
          >
            <ChevronLeftIcon />
          </button>

          <h1 className="text-3xl text-slate-100 font-bold text-center">
            Detalhes da Tarefa
          </h1>
        </div>
        <div className="bg-slate-200 p-4 rounded-md">
          <h2 className="text-xl font-bold  text-slate-600">{task.title}</h2>
          <p className="text-slate-600">{task.description}</p>
        </div>
      </div>
    </div>
  );
}

export default DatailsTaskPage;
