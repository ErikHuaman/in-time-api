import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import * as admin from 'firebase-admin';
import { firebaseConfig } from './firebase.config';


@Module({
    providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: () => {
        return admin.initializeApp({
          credential: admin.credential.cert(firebaseConfig as admin.ServiceAccount),
        });
      },
    },
    FirebaseService,
  ],
  exports: ['FIREBASE_ADMIN', FirebaseService],
})
export class FirebaseModule {}
