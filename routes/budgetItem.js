var express = require('express');
var router = express.Router();
var budgetItem = require('../models/budgetItem');
var middleware = require('../middleware');

router.get('/', function(req, res){
        budgetItem.find({}, function(err, allBudgetItem){
        if(err){
            console.log(err);
        } else {
            res.render("budgetItem", {budgetItem: allBudgetItem});      
        }
    });
});

router.post('/', middleware.isLoggedIn, function(req, res){
    var itemLabel = req.body.itemLabel;
    var type = req.body.type;
    var category = req.body.category;
    var planned = req.body.planned;
    var actual = req.body.actual;
    var dueDate = req.body.dueDate;
     var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newBudgetItem = {itemLabel: itemLabel, planned: planned, actual: actual, dueDate: dueDate, type: type, category: category, author: author};
    budgetItem.create(newBudgetItem, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect("/budget");
        }
    });
});

router.get('/new', function(req, res){
   res.render('budgetItem/new');
});

router.get('/:id/edit', function(req, res){
    budgetItem.findById(req.params.id, function(err, foundBudgetItem){
        if(err) {
            console.log(err);
        } else {
        res.render('budgetItem/edit', {budgetItem: foundBudgetItem});
        }
    });
});

router.put('/:id', function(req, res){
    budgetItem.findByIdAndUpdate(req.params.id, req.body, function(err, updatedItem){
        if(err){
            res.redirect('/budget');
        } else {
            res.redirect('/budget');
        }
    });    
});

router.delete('/:id',function(req, res){
   budgetItem.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/budget');
        } else {
            res.redirect('/budget');
        }
    });    
}); 

module.exports = router;