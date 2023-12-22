import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default {
  first_name: schema.string({ trim: true }, [rules.required()]),
  last_name: schema.string({ trim: true }, [rules.required()]),
  email: schema.string({ trim: true }, [rules.required(), rules.email()]),
  title: schema.string({ trim: true }, [rules.required()]),
  text: schema.string({ trim: true }, [rules.required()]),
};
