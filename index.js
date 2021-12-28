"use strict";

//data variables

let stepSize = 50000000;      //define step size in variable

let dataSet = [660000000, 650000000, 610000000, 640000000]; //define dataset to be used

let maxVal = Math.max(...dataSet);      //'...' als arr.reduce; define max. value in dataset to define height of y-axes

let minVal = Math.min(...dataSet);  //min. Val to determine which configuration for axis is needed later on

let maxValCeil = Math.ceil(maxVal/stepSize)*stepSize; //format max. Val to fit stepsize

let lowerAxesMax = Math.ceil((maxVal/10)/stepSize)*stepSize; //define max. value for the bottom y-axis

let upperAxesMin = Math.ceil((maxVal-maxVal/10)/stepSize)*stepSize; //define starting point for upper y-axis

//data setup for chart

const data = {
    labels: ['2017','2018', '2019', '2020'],
    datasets: [{
        //expense data to be displayed
        label: 'yearly expense',
        yAxisID: 'upper',
        data: dataSet,
        backgroundColor: [
            'rgba(18, 50, 80, 0.2)'

        ],
        borderColor: [
            'rgba(18, 50, 80, 0)'
        ],
        borderWidth: 1,
        fill: true
    }, {
        //filler for the area between the lower and upper axes
        label: 'filler',
        yAxisID: 'filler',
        data: [1, 1, 1, 1],
        pointRadius: 0,
        backgroundColor: [
            pattern.draw('diagonal','rgb(18, 50, 80, 0.2)') //using the Patternomaly JS package
        ],
        borderColor: [
            'rgba(18, 50, 80, 0)'
        ],
        borderWidth: 1,
        fill: true
    }, {
        //data to fill area for lower axis
        label: 'lower',
        yAxisID: 'lower',
        data: [lowerAxesMax, lowerAxesMax, lowerAxesMax, lowerAxesMax],
        pointRadius: 0,
        backgroundColor: [
            'rgba(18, 50, 80, 0.2)'

        ],
        borderColor: [
            'rgba(18, 50, 80, 0)'
        ],
        borderWidth: 1,
        fill: true
    }]
};

//config of chart display

const config = {                 
    type: 'line',
    data,
    options: {
        scales: {
            //lower axis to display bottom part
            lower: {
                type: 'linear',
                stacked: true,
                position: 'left',
                stack: 'broken',
                stackWeight: 0.5,
                beginAtZero: true,
                max: lowerAxesMax,
                grid: {
                    display: false
                },
                ticks: {
                    callback: function(value, index, values) {
                        return '€ ' + value / 1000000 + " Mio.";
                    },
                    stepSize: stepSize,
                    font: {
                        size: 11
                    }
                }
            },
            //filler axis to act as a buffer between upper and lower axes
            filler: {
                type: 'category',
                position: 'left',
                stacked: true,
                stack: 'broken',
                stackWeight: 0.3,
                labels: [1, 0],
                grid: {
                    display: false
                },
                ticks: {
                    display: false
                }
            },
            //upper axis to display the changing values
            upper: {
                type: 'linear',
                stacked: true,
                position: 'left',
                stack: 'broken',
                stackWeight: 1.5,
                max: maxValCeil,
                min: upperAxesMin,
                grid: {
                    display: false
                },
                ticks: {
                    callback: function(value, index, values) {
                        return '€ ' + value/ 1000000 + ' Mio.';
                    },
                    stepSize: stepSize,
                    font: {
                        size: 11
                    }
                }
            }

        },
        plugins: {
            legend: {
                display: false
            }
        }
    }
};


//rendering of chart
const myChart = new Chart(
    document.getElementById('myChart'), 
    config
);