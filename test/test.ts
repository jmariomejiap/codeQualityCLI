import babelPolyfill from 'babel-polyfill'; // tslint:disable-line no-unused-variable
import ava from 'ava';

ava.before(async () => {
});


ava.serial('true should be true', (t) => {
  t.is(true, true);
});
