const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();

//Define paths
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars views and viewslocation
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Caglar'
    })
});
app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'John'
    })
});
app.get('/help', (req,res)=>{
    res.render('help',{
        title: 'Do you need help?',
        name: 'Jenny'
    })
});

app.get('/help/*', (req,res)=>{
    res.render('errors',{
        errMsg:'This help topic is not reachable for now!'
    })
});

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({error: "Address does not provided!"});
    }
    geocode(req.query.address, (err,data)=>{
        if(err){
            return res.send({error:err});
        }

    forecast(err, data,(weatherMessage)=>{
        if(err){
            return res.send({error:err});
        }
        res.send(weatherMessage);

    })


    })

})


app.get('*',(req, res)=>{
    res.render('errors',{
        errMsg: 'The page you requested is not reachable, or not found!'
    })
})


app.listen(3000, ()=>{
    console.log('Server is Up on port 3000!')
});
