 var express = require('express');
 var app = express();
 var mongojs = require('mongojs');
 var db = mongojs('contactlist', ['contactlist']);
 var bodyParser = require('body-parser');

 


 app.use(express.static(__dirname + "/app"));
 app.use(bodyParser.json());

 app.get('/contactlist', function(req, res){
 	console.log("I recived a get Request");

 	// person1 = {
 	// 	name: "Tim",
 	// 	email: "Tim@mail.com",
 	// 	number: '(444) 11-22-22'
 	// };

 	// person2 = {
 	// 	name: "Emily",
 	// 	email: "Emily@mail.com",
 	// 	number: '(423) 14-45-22'
 	// };
 	// person3 = {
 	// 	name: "Chan",
 	// 	email: "Chan@mail.com",
 	// 	number: '(133) 12-49-22'
 	// };

 	// var contactList = [person1, person2, person3];
 	// res.json(contactList);


 	db.contactlist.find(function (err, docs) {
 		console.log(docs);
 		res.json(docs); 
 	});
 });

 app.post('/contactlist', function(req, res) {
 	console.log(req.body);
 	db.contactlist.insert(req.body, function(err, doc) {
 		res.json(doc);
 	});
 });


 app.delete('/contactlist/:id', function(req, res) {
 	var id = req.params.id;
 	console.log(id);
 	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
 		res.json(doc);
 	});
 });


 app.get('/contactlist/:id', function(req, res) {
 	var id = req.params.id;
 	console.log(id);
 	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
 		res.json(doc);
 	});
 });


 app.put('/contactlist/:id', function (req, res) {
 	var id = req.params.id;
 	console.log(req.body.name);
 	db.contactlist.findAndModify({
 		query: {_id: mongojs.ObjectId(id)},
 		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
 		new: true}, function (err, doc) {
 			res.json(doc);
 		}
 		);
 });





 app.listen(3000);
 console.log("Server listening on port 3000"); 