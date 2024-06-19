export default {
    name: 'slots',
    type: 'document',
    title: 'Slots',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Title of Slots article',
      },
      {
        name: 'slug',
        type: 'slug',
        title: 'Slug of your Slots article',
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
  