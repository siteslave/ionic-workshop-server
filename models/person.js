var Q = require('q');

module.exports = {
  detail: function (db, hospcode, pid) {
    var q = Q.defer();
    var sql = `select p.HOSPCODE, p.PID, p.NAME, p.LNAME, p.BIRTH, p.SEX,
      h.HOUSE, h.VILLAGE, chw.changwatname as CHANGWAT_NAME, cam.ampurname as AMPUR_NAME, ctb.tambonname as TAMBON_NAME
      from person as p
      inner join home as h on h.HOSPCODE=p.HOSPCODE and h.HID=p.HID
      left join cchangwat as chw on chw.changwatcode=h.CHANGWAT
      left join campur as cam on cam.ampurcode=h.AMPUR and cam.changwatcode=h.CHANGWAT
      left join ctambon as ctb on ctb.tamboncodefull=concat(h.CHANGWAT, h.AMPUR, h.TAMBON)
      where p.HOSPCODE=? and p.PID=?`;

    db.raw(sql, [hospcode, pid])
      .then(function (rows) {
        q.resolve(rows[0]);
      })
      .catch(function (err) {
        q.reject(err);
      });

    return q.promise;
  },
  getPerson: function (db) {
    var q = Q.defer();
    db('person')
      .select()
      .whereIn('TYPEAREA', ['1', '3'])
      .orderBy('NAME')
      .limit(20)
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
      .limit(20)
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
      .limit(20)
      .then(function (rows) {
        q.resolve(rows);
      })
      .catch(function (err) {
        q.reject(err);
      });

    return q.promise;
  }
};