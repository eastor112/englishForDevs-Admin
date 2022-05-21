import { buildSchema } from '@camberi/firecms';

type Word = {
  word: string;
  pronuntiation: string;
  definitions: definition[];
  translations: translation[];
}

type definition = {
  order: number;
  english:  string;
  spanish: string;
}

type translation = {
  order: number;
  spanish: string;
  synonyms: string;
}

export const wordSchema = buildSchema<Word>({
  name: 'Word',
  properties: {
    word: {
      title: 'Word',
      validation: { required: true },
      dataType: 'string',
    },
    pronuntiation: {
      title: 'Pronuntiation',
      validation: { required: true },
      dataType: 'string',
    },
    definitions: {
      title: 'Definitions',
      dataType: 'array',
      of: {
        dataType: 'map',
        properties: {
          order: {
            title: 'Order',
            dataType: 'number',
          },
          english: {
            title: 'English',
            dataType: 'string',
          },
          spanish: {
            title: 'Spanish',
            dataType: 'string',
          },
      },
    },
  },
  translations: {
    title: 'Translations',
    dataType: 'array',
    of:{
      dataType: 'map',
      properties: {
        order: {
          title: 'Order',
          dataType: 'number',
        },
        spanish: {
          title: 'Spanish',
          dataType: 'string',
        },
        synonyms: {
          title: 'Synonyms',
          dataType: 'string',
        },
      },
    },
  },
  },
});
