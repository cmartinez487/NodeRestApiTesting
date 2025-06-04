import {Router} from 'express';
import {userController} from '../controllers/users.controller.js'; 

const router = Router();

router.get('/users', userController.getUsersList);

router.get('/users/:userId', userController.getUserById);

router.post('/users', userController.insertUser);

router.delete('/users/:userId', userController.deleteUser);

router.put('/users/:userId', userController.updateUser);

export default router;