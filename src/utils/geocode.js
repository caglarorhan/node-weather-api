const request = require("request");
const geocode = (locationName,callback)=>{

// Geocoding
    const geoURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(locationName)+".json?access_token=pk.eyJ1IjoiY2FnbGFyb3IiLCJhIjoiY2s0eXpydXhzMDY3aTNqcWc5ZDZ3MnoxaCJ9.vzsZ1GfO84jUa17mrMWA2Q";

    const reqGeo = request(
        geoURL,
        {json:true},
        (error, response)=>{
            if(error){
                callback("Network error!"+error, undefined)
            }else if(response.body.features.length<1){
                callback("Location could not retrieved.",undefined)
            }else{
                const lon = response.body.features[0].center[0].toString();
                const lat = response.body.features[0].center[1].toString();
                const locationName = response.body.features[0].place_name.toString();
                const data = {lat,lon, locationName};
                callback(undefined, data)
            }

        });

};

module.exports = geocode;
