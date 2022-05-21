import { buildSchema, EntityReference } from '@camberi/firecms';

type Phrase = {
  phrase: string;
  translation: Translation;
  words: EntityReference[];
}

type Translation = {
  spanish: string;
}

export const phraseSchema = buildSchema<Phrase>({
  name: 'Phrase',
  properties: {
    phrase: {
      title: 'Phrase',
      validation: { required: true },
      dataType: 'string',
    },
    translation: {
      title: 'Translation',
      dataType: 'map',
      properties: {
        spanish: {
          title: 'Spanish',
          dataType: 'string',
        },
      },
    },
    words: {
      title: 'Words',
      dataType: 'array',
      of: {
        dataType: 'reference',
        path: 'words',
      },
    },
  }})
