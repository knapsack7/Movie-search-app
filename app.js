const express= require('express');
const app=express();
const request=require('request')
const dotenv = require('dotenv');
const process = require('process')
dotenv.config();
app.set("view engine", "ejs");
app.use('/public', express.static('public'));
app.get("/", (req, res)=>{
    res.render("Home");
});
app.get("/result", (req, res)=>{
    const query = req.query.search;
    const key=process.env.API_KEY;
    const url = `http://www.omdbapi.com/?s=${query}&apikey=${key}`;
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body)
            console.log(data);
            if(data.Response==='False'){
                res.send("Movie Not Found");
            }else{
                res.render("Result", {data:data});    
            }
        }else{
            console.log("calling by name ",response.statusCode);
            res.send('Error');
        }
    });
});
app.get("/result/:id", (req, res)=>{
    const url = `http://www.omdbapi.com/?s=${req.params.id}&apikey=${key}`;

    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body)
            //console.log(data);
            if(data.Response==='False'){
                res.send("Movie Not Found");
            }else{
                //res.send(data);
                res.render("Info", {movie: data});    
            }
        }else{
            console.log("calling by ID ",response.statusCode);
            res.send('Error');
        }
    });
});
app.get("*", (req, res)=>{
    res.send("Some Error");
});
app.listen(process.env.PORT, function(){
    console.log(`Server has started at port ${process.env.PORT}`);
});