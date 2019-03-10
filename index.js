const _console = console;

// https://stackoverflow.com/a/48566862/922323
module.exports = ((debug = false) => {

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
