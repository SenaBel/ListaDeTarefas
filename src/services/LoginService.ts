import IUser from "../interfaces/IUser";

const API_URL = "http://localhost:3333";

class LoginService {
  async signin(user: IUser) {
    console.log("Chegou no service", user);
    if (!user) return;
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Erro ao fazer o login:", error);
      throw error;
    }
  }

  async validateToken(token: string) {
    try {
      const response = await fetch(`${API_URL}/validate-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Erro ao validar o token:", error);
      throw error;
    }
  }

  async signout() {
    try {
      const response = await fetch(`${API_URL}/signout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }
      return true;
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      throw error;
    }
  }
}

export default new LoginService();
