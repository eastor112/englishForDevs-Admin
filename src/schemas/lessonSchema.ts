import { buildSchema } from '@camberi/firecms';


type Lesson = {
  name: string;
  publish: boolean;
  image: string;
}


export const lessonSchema = buildSchema<Lesson>({
  name: 'Lesson',
  properties: {
    name: {
      title: 'Name',
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
