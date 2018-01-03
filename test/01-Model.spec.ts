import { equal, deepEqual } from 'assert';

import { Model, ModelAttribute } from './../src/';

describe('Model', () => {

  let model2;

  it('should be instance of Model', () => {
    let model = new Model();
    equal(model instanceof Model, true);

    // static methods
    equal(typeof Model.defineAttributes, 'function');

    // static getter
    equal(Model.className, 'Model');

    // non-static methods
    equal(typeof model.setAttribute, 'function');
    equal(typeof model.setAttributes, 'function');
    equal(typeof model.getAttribute, 'function');

    // non-static getter
    deepEqual(model.attributes, {});
    equal(model.className, 'Model');
  });

  it('should define attributes', () => {
    Model.defineAttributes([
      new ModelAttribute('foo')
    ]);

    let values = { foo: 'bar' };
    model2 = new Model(values);
    deepEqual(model2.attributes, values);
  });

  it('should set attribute', () => {
    model2.setAttribute('foo', 'baz');
    deepEqual(model2.attributes, { foo: 'baz' });
    equal(model2.foo, 'baz');
    equal(model2.getAttribute('foo'), 'baz');
  });

});
