import { createError } from 'h3';

class UseAuth {
  // Method to sign in a user with email and password
  async signIn({ email, password }: { email: string; password: string }) {
    try {
      // Log the request data for debugging purposes
      console.log('Sending request to API with:', { email, password });

      // Send a POST request to the login API endpoint with the provided email and password
      const response = await fetch('https://api-magasinconnecte.alwaysdata.net/src/endpoint/auth/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Check if the response is successful (status code 200-299)
      if (response.ok) {
        // Parse the JSON response data
        const data = await response.json();
        return data;
      } else {
        // If the response is not successful, throw an error with the response status code and message
        throw createError({ statusCode: response.status, message: 'Une erreur est survenue lors de la connexion' });
      }
    } catch (error) {
      // If an error occurs during the fetch request, throw a generic error with status code 500
      throw createError({ statusCode: 500, message: 'Une erreur est survenue lors de la connexion' });
    }
  }

  // Method to get the current session from local storage
  async getSession() {
    const session = localStorage.getItem('session');
    return session ? JSON.parse(session) : {};
  }

  // Method to check if the current user is an admin
  async isAdmin() {
    const session = await this.getSession();
    return session.role === 'admin';
  }
}

// Export an instance of the UseAuth class
export const useAuth = new UseAuth();