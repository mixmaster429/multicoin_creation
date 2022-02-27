import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { getReceiveAddress } from '@controller/crypto';

const receiveAddress = Router();

receiveAddress.post('/', asyncHandler(getReceiveAddress));

export default receiveAddress;
