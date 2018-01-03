import { equal } from 'assert';

import { TestRecord, TestQuery } from '../ActiveRecord/ActiveRecord.spec';

describe('ActiveQuery', () => {

  it('should be instance of ActiveQuery', () => {
    let query = TestRecord.find();
    equal(query instanceof TestQuery, true);
    equal(typeof query.fields, 'function');
    equal(typeof query.sort, 'function');
    equal(typeof query.limit, 'function');
    equal(typeof query.where, 'function');
    equal(typeof query.one, 'function');
    equal(typeof query.all, 'function');
  });

});
