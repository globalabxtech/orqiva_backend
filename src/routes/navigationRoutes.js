import express from 'express';
import {
  getNavItems,
  createNavItem,
  updateNavItem,
  deleteNavItem,
} from '../controllers/navigationController.js';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getNavItems);
router.post('/', adminMiddleware(['super_admin', 'admin']), createNavItem);
router.put('/:id', adminMiddleware(['super_admin', 'admin']), updateNavItem);
router.delete('/:id', adminMiddleware(['super_admin', 'admin']), deleteNavItem);

export default router;
