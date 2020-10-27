const express=require('express');
const bodyParser=require('body-parser');
const axios=require('axios');
const ejs=require('ejs');

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", ejs);

app.get('/', function(req, res){
    let url =`https://api.thevirustracker.com/free-api?countryTimeline=EE`;

    let countryObject;
    let countrytime;

    axios.get(url)
    .then(function(response){
        
        countryObject = response.data.countrytimelinedata[0];
        coutrytime=response.data.timelineitems[0];
        let first_ky =  Object.keys(coutrytime)[0];//get first object
        console.log(first_ky);
        let first_vl =  Object.values(coutrytime)[0];
        console.log(first_vl);//get first date values
        console.log(first_vl.new_daily_cases);//get first date values
        console.log(first_vl.total_cases);
        console.log(first_vl.total_recoveries);

        let last_ky =  Object.keys(coutrytime)[Object.keys(coutrytime).length - 1-1];
        console.log(last_ky);//got last object
        let last_vl =  Object.values(coutrytime)[Object.values(coutrytime).length - 1-1];
        console.log(last_vl);
        console.log(last_vl.new_daily_cases);
        console.log(last_vl.total_cases);
        console.log(last_vl.total_recoveries);
        console.log(countryObject);//got it in console
        console.log(countryObject.info.title);//got it in console'Estonia'
        
        console.log(coutrytime["2/27/20"]);
        

        res.render("index.ejs", {countryEJS: countryObject, ct: last_ky, v: last_vl.new_daily_cases, e:last_vl.total_cases, r: last_vl.total_recoveries, f:first_ky, fc: first_vl.new_daily_cases, ft: first_vl.total_cases, fr:first_vl.total_recoveries });
    })
    .catch(function(error){
        console.log(error);
    });

});
//your server will start on both localhost and the heroku servers
app.listen(process.env.PORT || 3400,()=>{
    console.log('Server is running on port 3400.');
});
