var express =require('express');
var port=3000;
var app=express();
var mongojs=require('mongojs');
var db=mongojs('contactlist',['contacts']);
var bodyParser=require('body-parser');

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());

app.get('/contacts',function (req,res){
	db.contacts.find().sort({name:1},function (err,docs){
		res.json(docs);
	});
});
app.post('/contacts',function (req,res){
	db.contacts.insert(req.body,function (err,docs){
		res.json(docs);
	});
});
app.delete('/contacts/:id',function (req,res){
		var id=req.params.id;
		db.contacts.remove({_id:mongojs.ObjectId(id)},function (err,docs){
			res.json(docs);
		});
});
app.get('/contacts/:id',function (req,res){
	var id=req.params.id;
	db.contacts.findOne({_id:mongojs.ObjectId(id)},function (err,docs){
		res.json(docs);
	});
});
app.put('/contacts/:id',function (req,res){
	var id=req.params.id;
	db.contacts.update(
		{_id:mongojs.ObjectId(id)},
		{$set: {name:req.body.name,email:req.body.email,mob:req.body.mob}},
		function (err,doc){
			res.json(doc);
		}
	);
});
app.listen(port);
console.log('Welcome at Contact List App');
console.log('Server listening to client at '+port);