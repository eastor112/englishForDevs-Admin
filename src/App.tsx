import React from 'react';

import { User as FirebaseUser } from 'firebase/auth';
import {
  Authenticator,
  buildCollection,
  FirebaseCMSApp,
  NavigationBuilder,
  NavigationBuilderProps,
} from '@camberi/firecms';

import 'typeface-rubik';
import 'typeface-space-mono';
import { firebaseConfig } from './config/firebase';
import { wordSchema } from './schemas/wordsSchema';
import { phraseSchema } from './schemas/phraseSchema';
import { lessonSchema } from './schemas/lessonSchema';
import { topicsSchema } from './schemas/topicsSchema';

export default function App() {
  const navigation: NavigationBuilder = async ({
    user,
    authController,
  }: NavigationBuilderProps) => {
    return {
      collections: [
        buildCollection({
          path: 'words',
          schema: wordSchema,
          name: 'Words',
          description: 'Individual words present in all lessons',
          permissions: ({ authController }) => ({
            edit: true,
            create: true,
            delete: authController.extra.roles.includes('admin'),
          }),
        }),

        buildCollection({
          path: 'phrases',
          schema: phraseSchema,
          name: 'Phrases',
          permissions: ({ authController }) => ({
            edit: true,
            create: true,
            delete: authController.extra.roles.includes('admin'),
          }),
        }),

        buildCollection({
          path: 'lessons',
          schema: lessonSchema,
          name: 'Lessons',
          permissions: ({ authController }) => ({
            edit: true,
            create: true,
            delete: authController.extra.roles.includes('admin'),
          }),
          subcollections: [
            buildCollection({
              name: 'Topics',
              path: 'topics',
              schema: topicsSchema,
            }),
          ],
        }),
      ],
    };
  };

  const myAuthenticator: Authenticator<FirebaseUser> = async ({
    user,
    authController,
  }) => {
    if (!user?.email?.includes('emerar.mct@gmail.com')) {
      throw Error('You are not allowed to access this app');
    }

    console.log('Allowing access to', user?.email);

    const sampleUserData = await Promise.resolve({
      roles: ['admin'],
    });

    authController.setExtra(sampleUserData);
    return true;
  };

  return (
    <FirebaseCMSApp
      name={'EnglishForDevs'}
      authentication={myAuthenticator}
      navigation={navigation}
      firebaseConfig={firebaseConfig}
      logo={require('./assets/logo.png')}
    />
  );
}
