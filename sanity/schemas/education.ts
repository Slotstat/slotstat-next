export default {
    name: 'education',
    type: 'document',
    title: 'Education',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Title of education article',
      },
      {
        name: 'slug',
        type: 'slug',
        title: 'Slug of your education article',
        options: {
          source: 'title',
        },
      },
      {
        name: 'titleImage',
        type: 'image',
        title: 'Title Image',
      },
      {
        name: 'smallDescription',
        type: 'text',
        title: 'Small Description',
      },
      {
        name: 'content',
        type: 'array',
        title: 'Content',
        of: [
          {
            type: 'block',
          },
        ],
      },
    ],
  }
  