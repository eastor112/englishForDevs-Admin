import { buildSchema } from '@camberi/firecms';


type Lesson = {
  lessonNumber: number;
  name: string;
  description: string;
  publish: boolean;
  image: string;
}


export const lessonSchema = buildSchema<Lesson>({
  name: 'Lesson',
  properties: {
    lessonNumber: {
      title: 'Lesson Number',
      validation: {
        required: true,
        requiredMessage: 'You must set a lesson number between 0 and 10',
        min: 0,
        max: 10,
      },
      dataType: 'number',
    },
    name: {
      title: 'Name',
      validation: { required: true },
      dataType: 'string',
    },
    description: {
      title: 'Description',
      validation: { required: true },
      dataType: 'string',
    },
    publish: {
      title: 'Publish',
      dataType: 'boolean',
    },
    image: {
      title: 'Image',
      dataType: 'string',
      validation: { required: false },
      config: {
        storageMeta: {
          mediaType: 'image',
          storagePath: 'images/lessons',
          acceptedFiles: ['image/*'],
        },
      },
    },
  },
});
