import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { getServerStatus } from '@controller/crypto';

const healthCheck = Router();

healthCheck.get('/', asyncHandler(getServerStatus));

export default healthCheck;
