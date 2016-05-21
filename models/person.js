var Q = require('q');

module.exports = {
  getPerson: function (db) {
    var q = Q.defer();
    db('person')
      .select()
      .orderBy('NAME')
      .limit(10)
      .then(function (rows) {
        q.resolve(rows);
      })
      .catch(function (err) {
        q.reject(err);
      });

    return q.promise;
  },
  searchByName: function (db, name) {
    var q = Q.defer();
    var _name = name + '%';

    db('person')
      .select()
      .where('NAME', 'like', _name)
      .orderBy('NAME')
      .limit(10)
      .then(function (rows) {
        q.resolve(rows);
      })
      .catch(function (err) {
        q.reject(err);
      });

    return q.promise;
  },

  searchByCid: function (db, cid) {
    var q = Q.defer();
    db('person')
      .select()
      .where('CID', cid)
      .orderBy('NAME')
      .limit(10)
      .then(function (rows) {
        q.resolve(rows);
      })
      .catch(function (err) {
        q.reject(err);
      });

    return q.promise;
  }
};