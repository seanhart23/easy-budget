var methodOverride   = require('method-override'),
    LocalStrategy    = require('passport-local'),
    bodyParser       = require('body-parser'),
    passport         = require('passport'),
    mongoose         = require('mongoose'),
    express          = require('express'),
    request          = require("express"),
    router           = express.Router(),
    budgetItem       = require('./models/budgetItem'),
    User             = require('./models/user'),
    middleware       = require('./middleware'),
    app              = express();
    
var request          = require('request');

//CONNECT PACKAGES
// mongoose.connect("mongodb://localhost/budget", {useMongoClient: true});    
mongoose.connect(process.env.DATABASEURL);    


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: 'I am cool',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});


var  budgetItemRoutes = require('./routes/budgetItem');

app.use('/budgetItem', budgetItemRoutes);

//ROUTES 
app.get('/', function(req, res){
    res.render('landing');
});

app.get('/budget',  middleware.isLoggedIn, function(req, res){
budgetItem.find({}, function(err, allBudgetItems){
        if(err){
            console.log(err);
        } else {
            res.render("budget", {budgetItem: allBudgetItems});      
        }
    });
});     

app.get('/register', function(req, res){
    res.render('register');
});

app.post('/register', function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('/budget');
        });
    });
});

app.get('/login', function(req, res){
    res.render('login');
});

app.post('/login', passport.authenticate('local', 
    {
        successRedirect: 'budget', 
        failureRedirect: 'login'
    }), function(req, res){
});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

//TELL APP TO LISTEN TO PORT AND IP
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("================================");
    console.log("The Budget server has started!");
    console.log("================================");
});