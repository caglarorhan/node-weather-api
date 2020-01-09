const request = require("request");
const fullData = {location:{}};
const forecast = (error, koordObj, callback)=>{
    if(error){
        fullData.error="Error occured:" + error;
    }else{
        const url ="https://api.darksky.net/forecast/75937258a18acceb7624eb430a7c9896/"+koordObj.lat+","+koordObj.lon+"?units=si";

        const req = request(
            url,
            {json:true},
            (error, response)=>{
                if(error){
                    fullData.error="Error occured:" + error;
                }else{
                    fullData.location.name = koordObj.locationName;
                    fullData.location.lat = koordObj.lat;
                    fullData.location.lon = koordObj.lon;
                    fullData.location.currentTemp = response.body.currently.temperature;
                    fullData.location.curProbability = response.body.currently.precipProbability;
                    fullData.location.summary = response.body.daily.data[0].summary;
                   callback(fullData);
                }
            }
        );
    }


};

module.exports = forecast;
