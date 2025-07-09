import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseApp: admin.app.App,
  ) {}

  async sendToTopic(
    topic: string,
    payload: {
      notification: {
        title: string;
        body: string;
      };
      data?: { [key: string]: string };
    },
  ) {
    return await this.firebaseApp.messaging().send({
      topic,
      notification: payload.notification,
      data: payload.data,
    });
  }
}
