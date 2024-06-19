export default {
  name: 'providers',
  type: 'document',
  title: 'Providers',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title of provider article',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug of your provider article',
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
