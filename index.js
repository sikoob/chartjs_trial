"use strict";

//definition of variables

let dataSet = [670000000, 660000000, 650000000, 655000000, 650000000];     //dataset to be used

let maxVal = Math.max(...dataSet);                              //max. value in dataset to define height of y-axes and way of chart setup

let labelYears = ['2016','2017','2018', '2019', '2020'];        //variable for years to be displayed for easier modification

let stepSizeLower = "";                                         //variable for step size for lower axis, empty because defined later in if-statement dependent on chart setup

let stepSizeUpper = "";                                         //variable for step size for upper axis in broken setup, empty because defined later in if-statement dependent on chart setup

let maxValCeil = "";                                            //variable to format max. Val to fit stepsize, empty because defined later in if-statement dependent on chart setup

let lowerAxesMax = "";                                          //variable max. value for the bottom y-axis if used, empty because defined later in if-statement dependent on chart setup

let upperAxesMin = "";                                          //variable for starting point for upper y-axis if used, empty because defined later in if-statement dependent on chart setup

let data = "";                                                  // variable for data setup, defined in if-statement dependent on chart setup

let dataFiller = [];                                            //variable for filler component in broken scale setup, empty array to be filled later

let lowerData = [];                                             //variable for data for lower axis component in broken scale setup, empty array to be filled later

let config = "";                                                //variable for chart configuration, defined in if-statement dependent on chart setup


//chart setup dependent on size of maxVal

if (maxVal > 100000000) {                                       //chooses chart setup dependent on max. Val; broken scale with max. Val higher 100 Mio.

    //setup for broken scale when maxVal > 100 Mio.

    stepSizeLower = 50000000;                                        //define step size for lower axis

    stepSizeUpper = 25000000;                                       //define step size for upper axis

    maxValCeil = Math.ceil(maxVal/stepSizeUpper)*stepSizeUpper;           //format max. Val to fit stepsize for upper axis

    lowerAxesMax = Math.ceil((maxVal/10)/stepSizeLower)*stepSizeLower;    //define max. value for the lower y-axis

    upperAxesMin = Math.floor((maxVal-maxVal/15)/stepSizeUpper)*stepSizeUpper; //define starting point for upper y-axis

    //looping through labelYears to add data to filler and lower axis data setup, consistend data for both variables
    for (let i = 0; i < labelYears.length; i++) {
        dataFiller[i] = 1;
        lowerData[i] = lowerAxesMax;
    };

    //data setup for chart

    data = {
        labels: labelYears,                                     //labeling for years to be displayed
        datasets: [{
            //expense data to be displayed, changes dependent on data input
            label: 'yearly expense',
            yAxisID: 'upper',
            data: dataSet,                                      //data to be used
            backgroundColor: [
                'rgba(18, 50, 80, 0.2)'

            ],
            borderColor: [
                'rgba(18, 50, 80, 0.5)'
            ],
            borderWidth: 1,
            fill: true
        }, {
            //filler for the area between the lower and upper axes
            label: 'filler',
            yAxisID: 'filler',
            data: dataFiller,                               //easier setup for categorical axis to be functioning as a filler by using looped variable
            pointRadius: 0,                                 //not displaying a datapoint for interaction
            backgroundColor: [
                pattern.draw('diagonal','rgb(18, 50, 80, 0.2)') //using the Patternomaly JS package to show area that is used as a 'breaker'
            ],
            borderColor: [
                'rgba(18, 50, 80, 0)'                       //not displaying a border
            ],
            borderWidth: 1,
            fill: true
        }, {
            //data to fill area for lower axis
            label: 'lower',
            yAxisID: 'lower',
            data: lowerData,                                //data dependent on lower Axes max. value; used to fill whole area by using looped variable
            pointRadius: 0,                                 //not displaying a datapoint for interaction
            backgroundColor: [
                'rgba(18, 50, 80, 0.2)'

            ],
            borderColor: [
                'rgba(18, 50, 80, 0)'                       //not displaying a border
            ],
            borderWidth: 1,
            fill: true
        }]
    };

    //config of chart display

    config = {                 
        type: 'line',
        data,
        options: {
            scales: {
                //lower axis to display bottom part
                lower: {
                    type: 'linear',
                    position: 'left',
                    stacked: true,
                    stack: 'broken',
                    stackWeight: 0.5,                       //used to display lower axis area smaller than upper axis area
                    beginAtZero: true,                      //beginning with 0
                    max: lowerAxesMax,                      //dependent on data input and step size
                    ticks: {
                        callback: function(value, index, values) {
                            return '€ ' + value / 1000000 + " Mio.";    //display formatting on numbers to be display on axis
                        },
                        stepSize: stepSizeLower,
                        font: {
                            size: 11
                        }
                    }
                },
                //filler axis to act as a buffer between upper and lower axes
                filler: {
                    type: 'category',                   //used for easier access to display a 'breaker' area
                    position: 'left',
                    stacked: true,
                    stack: 'broken',
                    stackWeight: 0.3,                   //used to display 'break' axis area smallest
                    labels: [1, 0],                     //necessary to define, otherwise strange behaviour for area
                    grid: {
                        display: false
                    },
                    ticks: {
                        display: false                  //no need for tick labels for 'breaker' area
                    }
                },
                //upper axis to display the changing values
                upper: {
                    type: 'linear',
                    position: 'left',
                    stacked: true,
                    stack: 'broken',
                    stackWeight: 1.4,                   //used to display upper axis area the largest
                    max: maxValCeil,                    //dependent on data input and step size
                    min: upperAxesMin,                  //dependent on data input and step size
                    ticks: {
                        callback: function(value, index, values) {
                            return '€ ' + value/ 1000000 + ' Mio.'; //display formatting on numbers to be display on axis
                        },
                        stepSize: stepSizeUpper,
                        font: {
                            size: 11
                        }
                    }
                }

            },
            plugins: {
                legend: {
                    display: false                     //to not display data labels in chart
                }
            }
        }
    };
} else {
    //define chart setup when maxVal is smaller than 100 Mio.
    stepSizeLower = 20000000;                                   //smaller step size to better display data, only using lower axis

    maxValCeil = Math.ceil(maxVal/stepSizeLower)*stepSizeLower; //format max. Val to fit stepsize

    //data setup for chart

    data = {
        labels: labelYears,                                     //labeling for years to be displayed
        datasets: [{
            //expense data to be displayed
            label: 'yearly expense',
            yAxisID: 'upper',
            data: dataSet,
            backgroundColor: [
                'rgba(18, 50, 80, 0.2)'

            ],
            borderColor: [
                'rgba(18, 50, 80, 0.5)'
            ],
            borderWidth: 1,
            fill: true
        }]
    };

    //config of chart display

    config = {                 
        type: 'line',
        data,
        options: {
            scales: {
                //axis to display the changing values
                upper: {
                    type: 'linear',
                    position: 'left',
                    beginAtZero: true,
                    max: maxValCeil,
                    ticks: {
                        callback: function(value, index, values) {
                            return '€ ' + value/ 1000000 + ' Mio.'; //display formatting on numbers to be display on axis
                        },
                        stepSize: stepSizeLower,
                        font: {
                            size: 11
                        }
                    }
                }

            },
            plugins: {
                legend: {
                    display: false                      //to not display data labels in chart
                }
            }
        }
    };
};


//rendering of chart
const myChart = new Chart(
    document.getElementById('myChart'), 
    config
);