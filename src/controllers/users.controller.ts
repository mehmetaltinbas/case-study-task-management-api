import { UserService } from '@/services/user.service';
import express from 'express';

const router = express.Router();

router.get('/sign-up', async (req, res) => {
    const response = await UserService.signUp();
    res.json(response);
});

export default router;
