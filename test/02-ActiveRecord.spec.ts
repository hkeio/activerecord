import { equal, deepEqual } from 'assert';

import { ActiveQuery, ActiveRecord, ActiveRecordRelation, ModelAttribute } from './../src';

export class TestQuery extends ActiveQuery {
  one() { }
  all() { return []; }
}

export class TestRecord extends ActiveRecord {
  save() {
    this.id = Math.random();
  }
}

class Boo extends TestRecord { }
class Bar extends TestRecord {
  boo: string;

  public static _attributes: ModelAttribute[] = [
    new ModelAttribute('boo')
  ];
}
class Foo_Bar extends TestRecord { save() { } }
class FooChild extends TestRecord { save() { } }
class Foo extends TestRecord {
  foo?: string;
  goo?: number;

  bars?: Bar[];
  getBars?: () => Promise<ActiveQuery>;
  addBar?: (object: any | Bar) => Promise<void>;
  addBars?: (pbjects: any[] | Bar[]) => Promise<void>;

  fooChildrens?: FooChild[];
  getFooChildrens?: () => Promise<ActiveQuery>;
  addFooChildren?: (object: any | FooChild) => Promise<void>;
  addFooChildrens?: (objects: any[] | FooChild[]) => Promise<void>;

  boo?: Boo;
  boo_id?: string;
  setBoo?: (object: any | Boo) => Promise<void>;

  static _tableName = 'test';
  static _queryClass = TestQuery;

  public static _attributes: ModelAttribute[] = [
    new ModelAttribute('foo'),
    new ModelAttribute('goo'),
  ];

  protected static _relations: ActiveRecordRelation[] = [
    ActiveRecordRelation.manyToMany('bars', Bar, Foo_Bar, 'foo_id', 'bar_id'),
    ActiveRecordRelation.hasMany('fooChildren', FooChild, 'foo_id'),
    ActiveRecordRelation.hasOne('boo', Boo, 'boo_id')
  ];
}

describe('ActiveRecord', () => {

  let values = {
    foo: "bar",
    goo: 1
  };
  let attributes = {
    foo: "bar",
    goo: 1,
    boo_id: null
  }
  let foo = new Foo(values);

  it('should be instance of ActiveRecord', () => {

    // static methods
    equal(typeof Foo.find, 'function');
    equal(typeof Foo.findOne, 'function');
    equal(typeof Foo.findAll, 'function');

    // static getter
    equal(Foo.config.identifier, 'id');
    equal(Foo.config.tableName, 'test');
    equal(Foo.config.queryClass.prototype.constructor.name, TestQuery.prototype.constructor.name);
    // check for existance of db
    equal(Foo.db !== undefined, true);

    // instance
    equal(foo instanceof Foo, true);
    equal(foo.isNewRecord, true);
    deepEqual(foo.attributes, attributes);

    // methods
    equal(typeof foo.save, 'function');

    // attributes
    equal(foo.hasOwnProperty('foo'), true);
    equal(foo.hasOwnProperty('goo'), true);

    // many to many relation
    equal(foo.bars instanceof Promise, true);
    equal(foo.getBars() instanceof Promise, true);
    equal(typeof foo.getBars, 'function');
    equal(typeof foo.addBar, 'function');
    equal(typeof foo.addBars, 'function');

    // has many relation
    equal(foo.fooChildrens instanceof Promise, true);
    equal(foo.getFooChildrens() instanceof Promise, true);
    equal(typeof foo.getFooChildrens, 'function');
    equal(typeof foo.addFooChildren, 'function');
    equal(typeof foo.addFooChildrens, 'function');

    // has one relations
    equal(foo.hasOwnProperty('boo'), true);
    equal(typeof foo.setBoo, 'function');
  });
});

describe('ActiveQuery', () => {

  it('should be instance of ActiveQuery', () => {
    let query = Foo.find()
      .fields(['goo'])
      .sort(['goo'])
      .limit(1, 1)
      .where({ $gt: { goo: 1 } });
    equal(query instanceof TestQuery, true);
    equal(typeof query.fields, 'function');
    equal(typeof query.sort, 'function');
    equal(typeof query.limit, 'function');
    equal(typeof query.where, 'function');
    equal(typeof query.one, 'function');
    equal(typeof query.all, 'function');

    deepEqual(query.params, {
      fields: ['goo'],
      limit: { start: 1, end: 1 },
      sort: ['goo'],
      where: { '$gt': { goo: 1 } }
    });
  });

});
