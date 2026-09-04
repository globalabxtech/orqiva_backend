import express from 'express';
import {
  requestMeeting,
  getAllMeetings,
  getMeetingById,
  startMeeting,
  endMeeting,
} from '../controllers/meetingController.js';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware.js';
import { meetingLimiter } from '../middlewares/rateLimiter.js';
import { meetingValidator } from '../validators/index.js';
import { validate } from '../middlewares/validateMiddleware.js';

const router = express.Router();

// Public: Request Google Meeting (rate-limited and validated)
router.post('/request', meetingLimiter, meetingValidator, validate, requestMeeting);

// Protected: Admin meeting management
router.get('/', authMiddleware, getAllMeetings);
router.get('/:id', authMiddleware, getMeetingById);
router.patch('/:id/start', authMiddleware, adminMiddleware(['super_admin', 'admin']), startMeeting);
router.patch('/:id/end', authMiddleware, adminMiddleware(['super_admin', 'admin']), endMeeting);

export default router;
