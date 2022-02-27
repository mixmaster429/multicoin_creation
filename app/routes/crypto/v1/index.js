import { Router } from 'express';
import healthCheck from './healthCheck';
import receiveAddress from './receiveAddress';

const cryptoV1Route = Router();

cryptoV1Route.use('/healthCheck', healthCheck)
cryptoV1Route.use('/receiveAddress', receiveAddress)

export default cryptoV1Route;
