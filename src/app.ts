import express from 'express'
import {router} from "./Routers"
import { logger } from './middlewares/log';
const http = require('http');
import cors from 'cors';
const port = 666

const app: express.Application = express()
const server = http.createServer(app);

app.use(cors({credentials: true, origin: 'http://localhost:5173,"https://meta.ethci.org/'}));
const pm2Id = `thread-${process.env.pm_id}: `

app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({ extended: false }))
app.use('/assets', express.static('/home/ethci/projects/R3f-editor-back/ETHCI-r3f-editor/dist/assets'));


for (const route of router) {
  app.use(route.getRouter())
}

server.listen(port, () => {
  logger.info(pm2Id+'listening on *:'+port);
});


