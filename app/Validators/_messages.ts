const messages = {
  alpha: 'The {{ field }} should only contain alphabets',
  required: 'The {{ field }} is required',
  number: 'The {{ field }} must be a number',
  string: 'The {{ field }} must be a string',
  email: 'The value must be a valid {{ field }} - (like: example@abc.com)',
  maxLength: 'Maximum length of {{ field }} can be {{ options.maxLength }} characters',
  minLength: 'Minimum length of {{ field }} can be {{ options.minLength }} characters',
  unique: 'The {{ field }} already exists',
  enum: 'The {{ field }} is an enum and should have values from choices',
};

export default messages;