const messages = {
  alpha: 'The {{ field }} should only contain alphabets',
  boolean: 'Value of {{ field }} can be amoung 0, 1, false, true',
  exists: '{{ field }} does not exist',
  required: 'The {{ field }} is required',
  number: 'The {{ field }} must be a number',
  string: 'The {{ field }} must be a string',
  email: 'The value must be a valid {{ field }} - (like: example@abc.com)',
  maxLength: 'Maximum length of {{ field }} is {{ options.maxLength }} characters',
  minLength: 'Minimum length of {{ field }} is {{ options.minLength }} characters',
  unsigned: 'Mininum value of {{ field }} is 0',
  unique: 'The {{ field }} already exists',
  enum: 'The {{ field }} is an enum and should have values from choices',
};

export default messages;