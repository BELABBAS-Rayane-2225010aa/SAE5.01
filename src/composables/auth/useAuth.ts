import { createError } from 'h3';

class UseAuth {
  async signIn({ email, password }: { email: string; password: string }) {
    try {
      console.log('Sending request to API with:', { email, password }); // Log the request data
      const response = await fetch('https://api-magasinconnecte.alwaysdata.net/src/endpoint/auth/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw createError({ statusCode: response.status, message: 'Une erreur est survenue lors de la connexion' });
      }
    } catch (error) {
      throw createError({ statusCode: 500, message: 'Une erreur est survenue lors de la connexion' });
    }
  }

  async getSession() {
    const session = localStorage.getItem('session');
    return session ? JSON.parse(session) : {};
  }

  async isAdmin() {
    const session = await this.getSession();
    return session.role === 'admin';
  }
}

export const useAuth = new UseAuth();