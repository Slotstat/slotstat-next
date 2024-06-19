export default {
    name: 'casinos',
    type: 'document',
    title: 'Casinos',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Title of casino article',
      },
      {
        name: 'slug',
        type: 'slug',
        title: 'Slug of your casino article',
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
  