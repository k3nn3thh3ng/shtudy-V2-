const express       = require("express");

const Question     = require("../models/question");

const router        = express.Router();


//routes(Questions)
router.get('/', function(req,res){
	Question.find({}, function(err, allquestions){
		if(err){
			console.log(err)
		} else {
			res.json(allquestions)
		}
	})
});


router.get('/paginate',(req,res) => {
	var pageNo = parseInt(req.query.pageNo)
	var size = parseInt(req.query.size)
	var option = {}
	if(pageNo < 0 || pageNo === 0) {
		response = {"error" : true,"message" : "invalid page number, should start with 1"};
		return res.json(response)
	}
	option.skip = size * (pageNo - 1)
	option.limit = size
	   Question.find({},{},option,function(err,data) {
		// First argument here is model.find(query, field, option, callback)
			if(err) {
				response = {"error" : true,"message" : "Error fetching data"};
			} else {
				response = {"error" : false,"message" : data};
			}
			res.json(response);
		});
})



// //////////////////////////////////////////////////////////////


router.post('/', function(req,res){
	console.log(req.body);
	Question.create(
		req.body.question
	, function (err, question){
		if(err){
			console.log(err)
		} else {
            res.json({
				success: true,
				message: 'question successfully added'
			})
		}
	})
})

router.get('/:id', function(req, res){
	Question.findById((req.params.id), function(err, foundQuestion){
		if(err){
			console.log(err)
		} else {
			res.json(foundQuestion)
		}
	})
});

	
router.put('/:id', function(req, res){
	Question.findOneAndUpdate((req.params.id), req.body.question, function(err, question){
		if(err){
			console.log(err)
		} else {
			res.json(question)
		}
	})
})



router.delete('/:id', function(req, res){
	Question.findOneAndDelete((req.params.id), function(err, question){
		if(err){
			console.log(err)
		} else {
			res.redirect('/')
		}
	})
})




module.exports = router;