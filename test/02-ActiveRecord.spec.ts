import { equal, deepEqual } from 'assert';
import * as uuidv4 from 'uuid/v4';
import { find, pick, filter, uniq } from 'lodash';

import { ActiveQuery, ActiveRecord, ActiveRecordRelation, ModelAttribute } from './../src';

export class TestQuery extends ActiveQuery {
  one() { return Promise.resolve(this.db[0]); }
  async all() {

    let result = this.db
      .filter((item) => {
        if (JSON.stringify(this.params.where) === '{}') {
          return true;
        }

        item = item.attributes;
        let valid = false;
        Object.keys(this.params.where).forEach((key) => {

          if (item[key] !== undefined) {
            if (typeof this.params.where[key] === 'object') {
              Object.keys(this.params.where[key]).forEach((q) => {
                if (q === '$in') {
                  this.params.where[key][q] = uniq(this.params.where[key][q]);
                  valid = this.params.where[key][q].indexOf(item[key]) > -1;
                }
              });
            } else {
              valid = this.params.where[key] === item[key];
            }
          }
        });

        return valid;
      });

    return result;
  }
}

export class TestRecord extends ActiveRecord {
  static _identifier = '__id';
  static _queryClass = TestQuery;
  private static _data: TestRecord[] = [];

  protected static _dbInit(): Promise<boolean> {
    this._db[this.config.tableName] = [];
    return super._dbInit();
  }

  save() {
    if (!this.id) {
      this.id = uuidv4();
      this._class.db.push(this);
    }
    return Promise.resolve(find(this._class.db, { id: this.id }));
  }

  static async save(objects) {
    let result = [];
    for (let object of objects) {
      if (!(object instanceof this)) {
        object = new this(object);
      }
      result.push(await object.save());
    }
    return result;
  }
}

class Boo extends TestRecord {
  static _tableName = 'Boo';
  foos?: Foo[];
  public static _attributes: ModelAttribute[] = [];
  protected static _relations: ActiveRecordRelation[] = []
}
class Bar extends TestRecord {
  static _tableName = 'Bar';
  foos?: Foo[];
  public static _attributes: ModelAttribute[] = [];
  protected static _relations: ActiveRecordRelation[] = []
}
class Foo_Bar extends TestRecord {
  static _tableName = 'Foo_Bar';
  public static _attributes: ModelAttribute[] = [];
}
class FooChild extends TestRecord {
  static _tableName = 'FooChild';
  foo?: Foo;
  public static _attributes: ModelAttribute[] = [];
  protected static _relations: ActiveRecordRelation[] = []
}
class Foo extends TestRecord {
  foo?: string;
  goo?: number;

  bars?: Bar[];
  getBars?: () => Promise<ActiveQuery>;
  addBar?: (object: any | Bar) => Promise<Bar>;
  addBars?: (pbjects: any[] | Bar[]) => Promise<Bar[]>;

  fooChildrens?: FooChild[];
  getFooChildrens?: () => Promise<ActiveQuery>;
  addFooChildren?: (object: any | FooChild) => Promise<FooChild>;
  addFooChildrens?: (objects: any[] | FooChild[]) => Promise<FooChild[]>;

  boo?: Boo;
  boo_id?: string;
  setBoo?: (object: any | Boo) => Promise<Boo>;

  static _tableName = 'Foo';

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

Boo.addRelation(ActiveRecordRelation.hasMany('foo', Foo, 'boo_id'));
Bar.addRelation(ActiveRecordRelation.manyToMany('foos', Foo, Foo_Bar, 'bar_id', 'foo_id'));
FooChild.addRelation(ActiveRecordRelation.hasOne('foo', Foo, 'foo_id'));

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

describe('ActiveRecord', () => {

  it('should be instance of ActiveRecord', async () => {

    // static methods
    equal(typeof Foo.find, 'function');
    equal(typeof Foo.findOne, 'function');
    equal(typeof Foo.findAll, 'function');

    // static getter
    equal(Foo.config.identifier, '__id');
    equal(Foo.config.tableName, 'Foo');
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
    equal(foo.boo_id, null);

    // save
    equal(await foo.save() instanceof Foo, true);
    equal(foo.isNewRecord, false);
    equal((await Foo.findAll()).length, 1);
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

describe('ActiveRecordRelation', () => {

  it('manyToMany', async () => {
    equal(foo.bars instanceof Promise, true);
    equal(foo.getBars() instanceof Promise, true);
    equal(typeof foo.getBars, 'function');
    equal(typeof foo.addBar, 'function');
    equal(typeof foo.addBars, 'function');

    let bar = new Bar({});
    equal(await bar.save() instanceof Bar, true);
    const bars = await foo.addBars([bar, {}, new Bar({})]);
    await foo.addBars(bars);
    equal(bars.length, 3);
    equal(bars[0] instanceof Bar, true);
    equal(bars[1] instanceof Bar, true);
    equal(bars[2] instanceof Bar, true);
    equal(await foo.addBar(bar) instanceof Bar, true);
    equal(await foo.addBar({}) instanceof Bar, true);
    equal(await foo.addBar(new Bar({})) instanceof Bar, true);
    equal((await foo.bars).length, 5); // only 5 because `bar` can only be added once
    equal((await bar.foos).length, 1);
    equal((await bar.foos)[0] instanceof Foo, true);
    equal((await Foo_Bar.findAll()).length, 5);
    const barsQuery = await foo.getBars();
    equal(barsQuery instanceof TestQuery, true);
    equal(barsQuery.params.where[Bar.config.identifier].$in.length, 5);
  });

  it('hasMany', async () => {
    equal(foo.fooChildrens instanceof Promise, true);
    equal(foo.getFooChildrens() instanceof Promise, true);
    equal(typeof foo.getFooChildrens, 'function');
    equal(typeof foo.addFooChildren, 'function');
    equal(typeof foo.addFooChildrens, 'function');
    equal((await foo.fooChildrens).length, 0);

    const goo = await new Foo().save();
    const fooChild = await foo.addFooChildren({});
    equal(fooChild instanceof FooChild, true);
    equal((await foo.addFooChildrens([{}]))[0] instanceof FooChild, true);
    equal((await goo.addFooChildrens([{}]))[0] instanceof FooChild, true);
    equal((await foo.fooChildrens).length, 2);
    equal((await goo.fooChildrens).length, 1);
    equal((await foo.addFooChildren({})).hasOwnProperty('foo_id'), true);
    equal((await fooChild.foo) instanceof Foo, true);
    const fooChildrenQuery = await foo.getFooChildrens();
    equal(fooChildrenQuery instanceof TestQuery, true);
    equal(fooChildrenQuery.params.where.foo_id, foo.id);
  });

  it('hasOne', async () => {
    equal(foo.hasOwnProperty('boo'), true);
    equal(typeof foo.setBoo, 'function');

    const boo = new Boo();
    equal((await foo.setBoo(boo)) instanceof Boo, true);
    equal(foo.getAttribute('boo_id'), boo.id);
    equal(foo.boo_id, boo.id);
    equal((await foo.boo) instanceof Boo, true);
    equal((await foo.boo).id, boo.id);
    equal((await boo.foos).length, 1);
  });

});
