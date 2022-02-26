import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import passport from 'passport';
import morgan from 'morgan';
import helmet from 'helmet';

import jwtVerifi from './middleware/passport';
import './config/database';
import routes from './routes/index.routes';

const server=express();
server.set('port',process.env.PORT || 3000);

server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(passport.initialize());
server.use(morgan('dev'));
server.use(helmet());
passport.use(jwtVerifi);
server.use(routes);

export default server;