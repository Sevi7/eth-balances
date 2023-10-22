const schema = {
  querystring: {
    type: 'object',
    properties: {
      address: {
        type: 'array',
        items: {
          type: 'string',
        },
        maxItems: 20,
      },
    },
    additionalProperties: false,
    required: ['address'],
  },
  response: {
    '200': {
      type: 'object',
      additionalProperties: {
        type: 'string',
      },
    },
    '500': {
      type: 'object',
      properties: {
        statusCode: { const: 500 },
        code: { const: 'INTERNAL_SERVER_ERROR' },
        message: { const: 'Internal Server Error' },
      },
      additionalProperties: false,
      required: ['statusCode', 'code', 'message'],
    },
  },
} as const;

export default schema;
