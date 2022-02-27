import { Router } from 'express';
import apiRoute from './api';
import serviceRoute from './service';
import cryptoRoute from './crypto';

const appRoute = Router();

appRoute.use('/api', apiRoute);
appRoute.use('/services', serviceRoute);
appRoute.use('/crypto', cryptoRoute);

export default appRoute;
