import { buildSchema } from "@camberi/firecms";

export type User = {
  wordsResponses : WordResponse[];
  phraseResponses : PhraseResponse[];
  lessonsCompleted : LessonsCompleted[];
  topicsCompleted : TopicsCompleted[];
}

export type WordResponse= {
  topicId: string,
  lessonId: string,
  wordId : string,
  response : 'know' | 'dontKnow',
  date: string,
}

export type PhraseResponse ={
  topicId: string,
  lessonId: string,
  phraseId : string,
  response : 'know' | 'dontKnow',
  date: string,
}

export type LessonsCompleted = {
  lessonId: string,
  date: string,
}

export type TopicsCompleted = {
  topicId: string,
  date: string,
}

export const usersSchema = buildSchema<User>({
  name: 'users',
  properties: {
    wordsResponses: {
      title: 'Words Responses',
      dataType: 'array',
      of: {
        dataType: 'map',
        properties: {
          topicId: {
            title: 'Topic Id',
            dataType: 'string',
          },
          lessonId: {
            title: 'Lesson Id',
            dataType: 'string',
          },
          wordId : {
            title: 'Word Id',
            dataType: 'string',
          },
          response : {
            title: 'Response',
            dataType: 'string',
          },
          date: {
            title: 'Date',
            dataType: 'string',
          },
        },
      },
    },
    phraseResponses: {
      title: 'Phrase Responses',
      dataType: 'array',
      of: {
        dataType: 'map',
        properties: {
          topicId: {
            title: 'Topic Id',
            dataType: 'string',
          },
          lessonId: {
            title: 'Lesson Id',
            dataType: 'string',
          },
          phraseId : {
            title: 'Phrase Id',
            dataType: 'string',
          },
          response : {
            title: 'Response',
            dataType: 'string',
          },
          date: {
            title: 'Date',
            dataType: 'string',
          },
        },
      },
    },
    lessonsCompleted: {
      title: 'Lessons Completed',
      dataType: 'array',
      of: {

        dataType: 'map',
        properties: {
          lessonId: {
            title: 'Lesson Id',
            dataType: 'string',
          },
          date: {
            title: 'Date',
            dataType: 'string',
          },
        },
      },
    },
    topicsCompleted: {
      title: 'Topics Completed',
      dataType: 'array',
      of: {
        dataType: 'map',
        properties: {
          topicId: {
            title: 'Topic Id',
            dataType: 'string',
          },
          date: {
            title: 'Date',
            dataType: 'string',
          },
        },
      },
    },
  }
})
