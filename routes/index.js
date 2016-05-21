var express = require('express');
var router = express.Router();
var moment = require('moment');

var Person = require('../models/person');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/person/list', function (req, res, next) {
  var db = req.db;

  Person.getPerson(db)
    .then(function (rows) {
      var data = [];

      rows.forEach(function (v) {
        var obj = {};
        obj.hospcode = v.HOSPCODE;
        obj.pid = v.PID;
        obj.sex = v.SEX;
        obj.fullname = v.NAME + ' ' + v.LNAME;
        obj.birth = moment(v.BIRTH).format('DD/MM/YYYY');

        data.push(obj);
      });

      res.send({ ok: true, rows: data })
    }, function (err) {
      res.send({ ok: false, msg: err })
    });

});

router.post('/person/search', function (req, res, next) {
  var db = req.db;
  var query = req.body.query;

  if (isNaN(query)) {
    // search by name
    console.log('search by name');
    Person.searchByName(db, query)
      .then(function (rows) {
        var data = [];

        rows.forEach(function (v) {
          var obj = {};
          obj.hospcode = v.HOSPCODE;
          obj.pid = v.PID;
          obj.sex = v.SEX;
          obj.fullname = v.NAME + ' ' + v.LNAME;
          obj.birth = moment(v.BIRTH).format('DD/MM/YYYY');

          data.push(obj);
        });

        res.send({ ok: true, rows: data });
      }, function (err) {
        res.send({ ok: false, msg: err });
      });

  } else {
    // search by CID
    console.log('search by cid');
    Person.searchByCid(db, query)
      .then(function (rows) {
        var data = [];

        rows.forEach(function (v) {
          var obj = {};
          obj.hospcode = v.HOSPCODE;
          obj.pid = v.PID;
          obj.sex = v.SEX;
          obj.fullname = v.NAME + ' ' + v.LNAME;
          obj.birth = moment(v.BIRTH).format('DD/MM/YYYY');

          data.push(obj);
        });

        res.send({ ok: true, rows: data });
      }, function (err) {
        res.send({ ok: false, msg: err });
      });
  }
});

router.post('/person/detail', function (req, res, next) {
  var db = req.db;
  var hospcode = req.body.hospcode;
  var pid = req.body.pid;

  console.log(req.body);

  Person.detail(db, hospcode, pid)
    .then(function (rows) {
      console.log(rows);
      res.send({ ok: true, rows: rows });
    }, function (err) {
      res.send({ ok: false, msg: err });
    });

});

module.exports = router;
