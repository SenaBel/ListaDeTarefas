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

  async getTaskById(id: string | undefined) {
    if (!id) return;
    try {
      const response = await fetch(`${API_URL}/getTasks/${id}`);

      if (!response.ok) {
        throw new Error(`Erro ao buscar a tarefa: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Erro ao buscar a Tarefa pelo ID:", error);
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

  async deleteTask(id: string | undefined) {
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

  async updateTaskStatus(id: string | undefined, taskData: ITasks) {
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
