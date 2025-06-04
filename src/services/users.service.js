import { UserRepository } from '../repositories/users.repository.js'; 

export const UserService = {
    
    // Lógica para obtener todos los usuarios
    async getAllUsers() {
        const users = await UserRepository.findAll();
        // Aquí podrías añadir lógica de negocio adicional si la hubiera (ej. filtrar, transformar, etc.)
        return users;
    },

    // Lógica para obtener un usuario por ID
    async getUserById(userId) {
        const user = await UserRepository.findById(userId);
        if (!user) {
            // Aquí puedes lanzar un error personalizado si el usuario no se encuentra
            // O simplemente devolver null/undefined y dejar que el controlador lo maneje
            return null; // O throw new Error('UserNotFound');
        }
        // Lógica de negocio adicional si fuera necesaria
        return user;
    },

    // Lógica para crear un usuario
    async createUser(userData) {
        const { name, email, password } = userData;
        // Aquí podrías añadir validaciones de negocio más complejas que Express no maneje
        // Ej: verificar si el email ya existe en un sistema externo, aplicar reglas de contraseñas, etc.
        // if (!name || !email || !password) {
        //     throw new Error('Missing user data');
        // }

        const newUser = await UserRepository.create(name, email, password);
        return newUser;
    },

    // Lógica para actualizar un usuario
    async updateUser(userId, userData) {
        const { name, email } = userData;
        // Primero, verificar si el usuario existe antes de intentar actualizar
        const existingUser = await UserRepository.findById(userId);
        if (!existingUser) {
            return null; // Usuario no encontrado para actualizar
        }

        const updatedUser = await UserRepository.update(userId, name, email);
        return updatedUser;
    },

    // Lógica para eliminar un usuario
    async deleteUser(userId) {
        // Podrías añadir lógica para verificar dependencias antes de eliminar
        const deleted = await UserRepository.delete(userId);
        return deleted; // true si se eliminó, false si no existía
    }
};