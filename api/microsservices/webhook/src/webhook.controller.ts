import { Controller, Post, Req, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { TLSSocket } from 'tls';
import * as path from 'path';
import * as fs from 'fs';

@Controller('webhook')
export class WebhookController {
  @Post()
  handleWebhook(@Req() req: Request, @Res() res: Response) {
    const socket = req.socket as TLSSocket;

    if (socket.authorized) {
      res.status(HttpStatus.OK).send();
    } else {
      res.status(HttpStatus.UNAUTHORIZED).send();
    }
  }

  @Post('pix')
  handlePixWebhook(@Req() req: Request, @Res() res: Response) {
    const socket = req.socket as TLSSocket;

    if (socket.authorized) {
      const body = req.body;
      const dirPath = path.join(__dirname, 'data');
      const filePath = path.join(dirPath, 'data.json');

      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
      }

      fs.appendFile(filePath, JSON.stringify(body) + '\n', (err) => {
        if (err) {
          console.error(err);
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
        } else {
          res.status(HttpStatus.OK).send();
        }
      });
    } else {
      res.status(HttpStatus.UNAUTHORIZED).send();
    }
  }
}
