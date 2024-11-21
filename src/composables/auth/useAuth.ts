import { createError } from 'h3';
import { UserGet } from '../../server/api/auth/user.get';

class UseAuth {
    private userGet = new UserGet();

    async signIn({ email, password }: { email: string; password: string }) {
        const user = await this.userGet.get(email);
        if (!user) {
            throw createError({ statusCode: 401, message: 'User not found' });
        }
        if (user.password !== password) {
            throw createError({ statusCode: 401, message: 'Invalid password' });
        }
        return user;
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