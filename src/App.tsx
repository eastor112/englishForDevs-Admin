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
import { productSchema } from './schemas/productSchema';
import { localeSchema } from './schemas/localeSchema';
import { firebaseConfig } from './config/firebase';
import { wordSchema } from './schemas/wordsSchema';
import { phraseSchema } from './schemas/phraseSchema';

export default function App() {
  const navigation: NavigationBuilder = async ({
    user,
    authController,
  }: NavigationBuilderProps) => {
    return {
      collections: [
        buildCollection({
          path: 'products',
          schema: productSchema,
          name: 'Products',
          permissions: ({ authController }) => ({
            edit: true,
            create: true,
            delete: authController.extra.roles.includes('admin'),
          }),
          subcollections: [
            buildCollection({
              name: 'Locales',
              path: 'locales',
              schema: localeSchema,
            }),
          ],
        }),

        buildCollection({
          path: 'words',
          schema: wordSchema,
          name: 'Words',
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
