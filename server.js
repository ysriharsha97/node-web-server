const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;

    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to write into logs')
        }
    });
    console.log(log)

    next();
});

// app.use((req,res, next) => {
//     res.render('maintainance.hbs')
// });


app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!</h1>');
    res.render('welcome.hbs',{
        pageTitle: 'Welcome Page',
        message: 'Welcome to DUMMY site'
    })
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs',{
        pageTitle: 'Projects Page'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req,res) => {
    res.send({
        Error: 'You have given a bad request',
        Solution: 'Contact .... NO ONE! Close the app and leave :P'
    })
})
app.listen(port, ()=> {
    console.log(`Server is up on port ${port}`);
});