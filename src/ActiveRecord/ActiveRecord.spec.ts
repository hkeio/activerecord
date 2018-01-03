import { equal } from 'assert';

import { ActiveRecord } from './ActiveRecord';
import { ActiveQuery } from './../ActiveQuery/ActiveQuery';

export class TestQuery extends ActiveQuery {
  one() { }
  all() { return []; }
}

export class TestRecord extends ActiveRecord {
  static _tableName = 'test';
  static _queryClass = TestQuery;

  save() { };
}

describe('ActiveRecord', () => {

  it('should be instance of ActiveRecord', () => {

    let model = new TestRecord();

    // static methods
    equal(typeof TestRecord.find, 'function');
    equal(typeof TestRecord.findOne, 'function');
    equal(typeof TestRecord.findAll, 'function');

    // static getter
    equal(TestRecord.config.identifier, 'id');
    equal(TestRecord.config.tableName, 'test');
    equal(TestRecord.config.queryClass.prototype.constructor.name, TestQuery.prototype.constructor.name);
    // check for existance of db
    equal(TestRecord.db !== undefined, true);

    // methods
    equal(typeof model.save, 'function');

    equal(model.className, 'TestRecord');
    equal(model.isNewRecord, true);
    equal(JSON.stringify(model.attributes), JSON.stringify({}));
  });

});
