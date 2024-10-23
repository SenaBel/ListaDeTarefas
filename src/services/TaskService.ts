import ITasks from "../interfaces/ITasks";

const API_URL = "http://localhost:3333";

class TaskService {
  async getTasks() {
    try {
      const response = await fetch(`${API_URL}/listTasks`);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Erro ao buscar as Tarefas:", error);
      throw error;
    }
  }

  async addTask(data: ITasks) {
    if (!data) return;
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Erro ao enviar a Tarefa:", error);
      throw error;
    }
  }

  async deleteTask(id: number | undefined) {
    if (id === undefined) return;
    try {
      const response = await fetch(`${API_URL}/deleteTask/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Erro ao deletar a tarefa: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Erro ao deletar a Tarefa:", error);
      throw error;
    }
  }

  async updateTaskStatus(id: number | undefined, taskData: ITasks) {
    if (id === undefined || !taskData) return;
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error(`Erro ao atualizar a tarefa: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Erro ao atualizar a Tarefa:", error);
      throw error;
    }
  }
}

export default new TaskService();
