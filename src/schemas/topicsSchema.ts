import { buildSchema, EntityReference } from '@camberi/firecms';

type Topics = {
  topicNumber: number;
  title: string;
  duration: number;
  difficulty: string;
  image: string;
  words: EntityReference[];
  phrases: EntityReference[];
  status: string;
  publish: boolean;
}

export const topicsSchema = buildSchema<Topics>({
  name: 'Topics',
  properties: {
    topicNumber: {
      title: 'Topic Number',
      validation: {
        required: true,
        requiredMessage: 'You must set a topic number between 0 and 10',
        min: 0,
        max: 10,
      },
      dataType: 'number',
    },
    title: {
      title: 'Title',
      validation: { required: true },
      dataType: 'string',
    },
    duration: {
      title: 'Duration',
      validation: {
        required: true,
        requiredMessage: 'You must set a duration between 0 and 60 minutes',
        min: 0,
        max: 60,
      },
      dataType: 'number',
    },
    difficulty: {
      title: 'Difficult',
      validation: { required: true },
      dataType: 'string',
      config: {
        enumValues: {
          easy: 'Easy',
          medium: 'Medium',
          hard: 'Hard',
        },
    },
  },
  image: {
    title: 'Image',
    dataType: 'string',
    validation: { required: false },
    config: {
      storageMeta: {
        mediaType: 'image',
        storagePath: 'images/topics',
        acceptedFiles: ['image/*'],
      },
    },
  },
  words: {
    title: 'Words',
    dataType: 'array',
    validation: { required: false },
    description: 'Words that are associated with this topic',
    of :{
      dataType: 'reference',
      path: 'words',
    },
  },
  phrases: {
    title: 'Phrases',
    dataType: 'array',
    validation: { required: false },
    description: 'Reference to phrases',
    of: {
      dataType: 'reference',
      path: 'phrases',
    },
  },
  status: {
    title: 'Status',
    validation: { required: true },
    dataType: 'string',
    config: {
      enumValues: {
        draft: 'Draft',
        published: 'Published',
      },
    },
  },
  publish: {
    title: 'Publish',
    dataType: 'boolean',
  },

},
});
