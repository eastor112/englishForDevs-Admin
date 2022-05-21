import { buildSchema } from '@camberi/firecms';

type Topics = {
  difficulty: string;
  duration: number;
  image: string;
  lessonNumber: number;
  publish: boolean;
  status: string;
  title: string;
}

export const topicsSchema = buildSchema<Topics>({
  name: 'Topics',
  properties: {
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
  duration: {
    title: 'Duration',
    validation: {
      required: true,
      requiredMessage: 'You must set a duration between 0 and 1000',
      min: 0,
      max: 1000,
    },
    dataType: 'number',
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
  lessonNumber: {
    title: 'Lesson Number',
    validation: {
      required: true,
      requiredMessage: 'You must set a lesson number between 0 and 1000',
      min: 0,
      max: 1000,
    },
    dataType: 'number',
  },
  publish: {
    title: 'Publish',
    dataType: 'boolean',
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
  title: {
    title: 'Title',
    validation: { required: true },
    dataType: 'string',
  },
},
});
