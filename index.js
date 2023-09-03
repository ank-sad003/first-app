const express = require("express");
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

const getValue = (lowerLimit, upperLimit) => {
    return Math.floor(Math.random() * (upperLimit - lowerLimit + 1)) + lowerLimit;
};

// Generate random values for the Pie Chart
// Create 3 segments that together form 100%
const generateRandomPieChartValues = () => {
    const totalPercentage = 100;
    const slice1 = Math.floor(Math.random() * totalPercentage);
    const remainingPercentage = totalPercentage - slice1;
    const slice2 = Math.floor(Math.random() * remainingPercentage);
    const slice3 = totalPercentage - slice1 - slice2;
  
    return [slice1, slice2, slice3];
}; 


// Utility function to get a random number
const getRandomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};
 
// Generate values for the line chart
const getChartValues = () => {
    const values = [];
    const rangeMin = 100;
    const rangeMax = 500;
    const numPoints = 4;
  
    // Make sure there is at least one value above 450 & one below 100
    // This will make sure that there is a wave in the line chart at all times, as specified in the design document.
    let valueAbove450 = false;
    let valueBelow100 = false;
  
    for (let i = 0; i < numPoints; i++) {
      let value;
  
      if (i === numPoints - 1 && !valueAbove450) {
        value = getRandomNumber(400, rangeMax); // Random number above 400
        valueAbove450 = true;
      } else if (i === numPoints - 2 && !valueBelow100) {
        value = getRandomNumber(rangeMin, 200); // Random number between 200 and 100
        valueBelow100 = true;
      } else {
        value = getRandomNumber(rangeMin, rangeMax);
      }
  
      values.push(value);
    }
  
    return values;
};

const getPercentageChange = (min1,max1,min2,max2) =>{
    let newValue,oldValue;
    newValue=getValue(min1, max1);
    oldValue=getValue(min2, max2);
    const percentageChange = ((newValue - oldValue) / oldValue) * 100;
    const result=Math.round(percentageChange * 10) / 10
    return result;

};

app.get('/', (req, res) => {
    pieChart = generateRandomPieChartValues();
    // Just wrap everything neatly & return
    res.json({
        cards: [getValue(2100000, 2200000), getValue(1500, 1800), getValue(9000, 9999), getValue(9000, 9999)],
        percentage:[getPercentageChange(2100000, 2200000, 2000000, 2100000),getPercentageChange(1500, 1800, 1300, 1500),getPercentageChange(9000, 9999, 8000, 8999),getPercentageChange(9000, 9999, 8000, 8999)],
        pie: {
            basic_tees: pieChart[0],
            short_pants: pieChart[1],
            super_hoodies: pieChart[2]
        },
        chart: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            data1: getChartValues(),
            data2: getChartValues()
        }
    })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});