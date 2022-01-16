import { hourlyWeather } from './types';
const vestaWidth = 21;
const colors = ["black","purple","blue","green","yellow","orange","red","white"];

const formatForVestaboard = (hourlyData:[hourlyWeather]) =>{
    let temperature:number[]=[], humidity=[], wind=[], precipitation = [];
    const now = new Date();
    for(let i=0; i<vestaWidth-1; i++){
        temperature.push(hourlyData[i].temperature);
        humidity.push(hourlyData[i].humidity);
        wind.push(hourlyData[i].windSpeed);
        precipitation.push(hourlyData[i].precipitation);
    }
    let temp = tempToColors(temperature);
}

function tempToColors(data:number[]){
    const min = 15;
    const max = 95;
    const range = (max-min)/(colors.length-2);
    const coloredData = data.map((hour) => {
        if(hour <= min){
            return colors[0];
        } else if (hour>=max){
            return colors[colors.length]
        } 
        return colors[Math.floor((hour-min)/range)];
    });
    console.log('data',coloredData)
    return coloredData;
}


export default formatForVestaboard;