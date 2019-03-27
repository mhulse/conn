const util = require('util');
const _console = console;

// https://stackoverflow.com/a/48566862/922323
module.exports = ((debug = false) => {

  // https://stackoverflow.com/a/41882441/922323
  util.inspect.defaultOptions.depth = null;
  // https://stackoverflow.com/a/48231698/922323
  util.inspect.defaultOptions.maxArrayLength = null;

  const log = (name, args) => {

    if ( ! debug) return;

    try {
      throw new Error();
    } catch (error) {
      _console[name].apply(
        _console,
        [
          [
            '[',
            error
              .stack
              .split('\n')[3]
              .split('/')
              .pop()
              .replace(/\)/, '')
              .trim(),
            ']',
          ].join(''),
          ...args
        ]
      );
    }
  };

  return [
    'log',
    'warn',
    'error',
  ].reduce((obj, name) => {
    obj[name] = ((... args) => {
      return log(name, args)
    });
    return obj;
  }, {});

});
