export default {
  name: "featured",
  title: "Featured Menu categories",
  type: "document",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Featured Menu categories Name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "short_description",
      type: "string",
      title: "Short Description",
      validation: (Rule) => Rule.max(200),
    },
    {
      name: "restaurant",
      type: "array",
      title: "Restaurant",
      of: [{ type: "reference", to: [{ type: "restaurant" }] }],
    },
  ],
};
