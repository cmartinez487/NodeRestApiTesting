import { UserService } from '../../services/users.service.js'; 

export const userController ={

    async getUsersList (req, res) {
        try {
            const users = await UserService.getAllUsers();
            if (!users || users.length === 0) {
                return res.status(404).json({ message: 'No se encontraron usuarios.' });
            }
            res.status(200).json(users);
        } catch (error) {
            console.error('Error al obtener la lista de usuarios:', error);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    },

    async getUserById (req, res){
        try {
            const { userId } = req.params;
            const user = await UserService.getUserById(userId);

            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado.' });
            }

            res.status(200).json(user);
        } catch (error) {
            console.error('Error al obtener usuario por ID:', error);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    },

    async insertUser (req, res) {
        try {
            const userData = req.body; // Recibe el body directamente
            // Aquí podrías añadir validaciones de entrada de Express (ej. con Joi/express-validator)
            // antes de pasar los datos al servicio.

            const newUser = await UserService.createUser(userData);
            res.status(201).json(newUser); // 201 Created
        } catch (error) {
            console.error('Error al insertar usuario:', error);
            // Podrías manejar errores específicos aquí (ej. si el email ya existe)
            // if (error.message === 'DuplicateEmail') {
            //     return res.status(409).json({ message: 'El email ya está registrado.' });
            // }
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    },

    async deleteUser (req, res) {
        try {
            const { userId } = req.params;
            const deleted = await UserService.deleteUser(userId);

            if (!deleted) {
                return res.status(404).json({ message: 'Usuario no encontrado para eliminar.' });
            }

            res.status(200).json({ message: 'Usuario eliminado correctamente.' });
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    },

    async updateUser (req, res) {
        try {
            const { userId } = req.params;
            const userData = req.body;

            const updatedUser = await UserService.updateUser(userId, userData);

            if (!updatedUser) {
                return res.status(404).json({ message: 'Usuario no encontrado para actualizar.' });
            }

            res.status(200).json(updatedUser);
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    }
};