import { equal, deepEqual } from 'assert';

import { Model, ModelAttribute } from './../src/';

describe('Model', () => {

  let model2;

  it('should be instance of Model', () => {
    let model = new Model();
    equal(model instanceof Model, true);

    // static methods
    equal(typeof Model.defineAttributes, 'function');
    equal(typeof Model.hasAttribute, 'function');
    equal(typeof Model.getAttributeDefinition, 'function');

    // static getter
    equal(Model.className, 'Model');

    // non-static methods
    equal(typeof model.hasAttribute, 'function');
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

    // only adds one
    Model.defineAttributes([new ModelAttribute('foo')]);
    equal(Model.getAttributeDefinition().length, 1);

    let values = { foo: 'bar' };
    model2 = new Model(values);
    deepEqual(model2.attributes, values);
    equal(model2.hasOwnProperty('foo'), true);
    equal(model2.hasAttribute('foo'), true);
    equal(Model.hasAttribute('foo'), true);
    equal(model2.foo, 'bar');
  });

  it('should set attribute', () => {
    model2.setAttribute('foo', 'baz');
    deepEqual(model2.attributes, { foo: 'baz' });
    equal(model2.foo, 'baz');
    equal(model2.getAttribute('foo'), 'baz');
  });

});
