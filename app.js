const temp=document.querySelector("#temprature");
const currentWeather=document.querySelector("#cities");
const humid=document.querySelector("#humid");
const speed=document.querySelector("#speed");
document.getElementById("searchBtn").addEventListener("click",()=>{
    const city=document.getElementById("cityInput").value.trim();

    if(city===""){
        alert("enter the city name please");
    }
    weatherData(city);

});
async function weatherData(city){
    const BASE_URL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    try{
        const respone=await fetch(BASE_URL);
        const data=await respone.json();
        if(respone.ok){
            const description = data.weather[0].description.toLowerCase();  // e.g., "clear sky"

            let imageSrc = "assets/default.png"; // fallback if nothing matches

            if (description.includes("clear sky")) {
                imageSrc = "assets/clear.png";
            } else if (description.includes("scattered clouds")) {
                imageSrc = "assets/clouds.png";
            } else if (description.includes("broken clouds")) {
                imageSrc = "assets/drizzle.png";
            } else if (description.includes("overcast clouds")) {
                imageSrc = "assets/clouds.png";
            } else if (description.includes("rain")) {
                imageSrc = "assets/rain.png";
            } else if (description.includes("thunderstorm")) {
                imageSrc = "assets/thunder.png";
            } else if (description.includes("snow")) {
                imageSrc = "assets/snow.png";
            }
           document.querySelector("#weather").src=imageSrc;
            
            temp.textContent=data.main.temp+`° C`;
            currentWeather.textContent=description;
            humid.textContent=data.main.humidity;
            speed.textContent=data.wind.speed;
            localStorage.setItem("lastCity",city);

            window.onload=()=>{
                
                const savedCity=localStorage.getItem("lastCity") || "London";
                weatherData(city);
            };
            
            
        }else{
            alert("not found");
            
        }
    }catch(error){
        console.log(error);
        
    }

}
