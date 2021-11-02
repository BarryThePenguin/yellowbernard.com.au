import { defineSchema } from "@tinacms/cli";

export default defineSchema({
  collections: [
    {
      label: "Pages",
      name: "pages",
      path: "content/pages",
      fields: [
    		{
    			name: 'description',
    			label: 'Description',
          type: "string",
          ui: {
            component: 'textarea',
          }
    		},
    		{
    			name: 'openingTimes',
    			label: 'Opening Times',
          type: "string",
          ui: {
            component: 'text',
          }
    		},
    		{
    			name: 'address',
    			label: 'Address',
          type: "string",
          ui: {
            component: 'text',
          }
    		},
    		{
    			name: 'phone',
    			label: 'Phone Number',
          type: "string",
          ui: {
            component: 'text',
          }
    		},
    		{
    			label: 'Background Image',
    			name: 'background',
          type: 'image',
          ui: {
            component: 'image',
          },
    		},
    		{
    			label: 'Map Image',
    			name: 'map',
          type: 'image',
          ui: {
            component: 'image',
          },
    		}
    	]
    },
    {
      label: "Global",
      name: "global",
      path: "content/global",
      format: "json",
      fields: [
        {
    			name: 'title',
    			label: 'Title',
          type: "string",
          ui: {
            component: 'text',
          }
    		},
        {
    			label: 'Logo Image',
    			name: 'logo',
          type: 'image',
          ui: {
            component: 'image',
          },
    		},
        {
          label: 'Background Image',
          name: 'background',
          type: 'image',
          ui: {
            component: 'image',
          },
        },
        {
          name: 'seoDefaultTitle',
          label: 'SEO Default Title',
          type: "string",
          ui: {
            component: 'text',
          }
        },
        {
          name: 'siteUrl',
          label: 'Site Url',
          type: "string",
          ui: {
            component: 'text',
          }
        },
        {
          name: 'keywords',
          label: 'Keywords',
          type: "string",
          ui: {
            component: 'text',
          }
        },
        {
          type: "object",
          label: "Social Links",
          name: "social",
          fields: [
            {
              type: "string",
              label: "Facebook",
              name: "facebook",
            },
            {
              type: "string",
              label: "Twitter",
              name: "twitter",
            },
            {
              type: "string",
              label: "Instagram",
              name: "instagram",
            }
          ],
        },
      ]
    }
  ],
});