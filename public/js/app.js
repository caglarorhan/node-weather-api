window.addEventListener('load',()=>{

    document.getElementById('weatherForm').addEventListener('submit', (event)=>{
        event.preventDefault();
        document.getElementById('locationForeCastInfo').innerHTML='Loading...';
        let locationName = document.getElementById('locationName').value;
        fetch('/weather?address='+locationName).then((response)=>{
            (response.json().then((data)=>{
                if(data.error){
                    document.getElementById('locationForeCastInfo').innerHTML=`<p style="color:red; font-weight: bold">${data.error}</p>`;
                }else{
                    document.getElementById('locationForeCastInfo').innerHTML=`
                            <h4>${data.location.name}</h4>
                            
                            <p><b>Time Zone:</b>${data.location.timezone}
                            <br>
                            <img src="https://darksky.net/images/weather-icons/${data.location.icon}.png" width="32px"  alt="">
                            <br>
                            <p><b>Summary:</b>${data.location.summary}
                            <br>
                            <b>Current Temperature:</b>${data.location.currentTemp} °C
                            <br>
                            <b>Coordinates(lat,lon):</b>${data.location.lat}, ${data.location.lat}
                            <br>
                            <b>Probability:</b>${data.location.curProbability.toString()}%
                            </p>                      
`;
                }

            }));
        })

    });
});
