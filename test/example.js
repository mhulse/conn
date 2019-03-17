console = require('../index')(true);

console.log('This is a test', {
  foo: 'bar',
  baz: {
    deep: [
      'Hello world!',
      {
        more: 'Yeahhhh!',
      },
    ],
  },
});
