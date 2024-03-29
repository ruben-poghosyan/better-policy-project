let data = null
function movingAverage(data, windowSize) {
    let result = [];
    for (let i = 0; i < data.length - windowSize + 1; i++) {
      let sum = 0;
      for (let j = 0; j < windowSize; j++) {
        sum += data[i + j];
      }
      result.push(sum / windowSize);
    }
    return result;
}

function getForecast(param, N = 30) {
    final = []

    
    // extrapolate the initial values
    temp = []
    temp.push(data[0])
    for (let i = 0; i < N; i++) {
        next = param['ias']*param['iss'] + (1-param['ias'])*temp[i].y
        temp.push({x:temp[i].x - 1 , y:next})
    }
    temp.shift()
    temp.reverse()
    final.push(...temp)

    // append the middle values
    final.push(...data)

    // extraploate the final values
    temp = []
    temp.push(data.splice(-1)[0])
    for (let i = 0; i < N; i++) {
        next = param['fas']*param['fss'] + (1-param['fas'])*temp[i].y
        temp.push({x:temp[i].x + 1, y:next})
    }
    temp.shift()
    final.push(...temp)
    
    return final
}

function handleDialog(event) {
        var files = event.target.files;
        var file = files[0];
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(event) {
          var csv = event.target.result;
          var input = $.csv.toArrays(csv);
          names = input.shift();
          data = input.map((e, i) => { return {x:i, y:parseFloat(e[1])} })
          chart.updateSeries([{
            data: data
          }], true);
        }
}

function moving_average_analysis_handler(event) {
    event.preventDefault();
    input = $('#moving_average_analysis_box').serializeArray();
    input_dict = {}
    input.forEach(element => {
        input_dict[element.name] = parseFloat(element.value)
    });
    forecast = getForecast(input_dict)
    start = forecast[0].x
    values = forecast.map(e => e.y)
    ma = movingAverage(values, parseInt(input_dict['ws']))
    newseries = ma.map((e, i) => {return {x: start + i, y:Math.round(e * 100) / 100}})

    chart.updateSeries([data, {data:newseries}], false);
}

var options = {
    series: [{
        data: [{}]
    }],

    chart: {
      stacked: false,

      height:'50%',

      toolbar: {
        show: true
      },

      zoom: {
        type: 'x',

        enabled: true,

        autoScaleYaxis: true
      }
    },

    colors: ['#1f87e6', '#ff5c7c'],

    dataLabels: {
      enabled: false
    },

    grid: {
      yaxis: {
        // set to false to remove horizontal lines through graph

        lines: {
          show: true
        }
      }
    },

    legend: {
      show: true,

      position: 'top',

      horizontalAlign: 'left',

      labels: {}
    },

    stroke: {
      width: 3,

      curve: 'smooth',

      lineCap: 'butt',

      dashArray: [0, 3]
    },

    theme: {},

    xaxis: {
      type: 'number',

      tooltip: {
        enabled: false
      },

      axisTicks: {
        show: false
      },
      labels: {
        show: false,

        showDuplicates: false,
      }
    },

    yaxis: [
      {
        axisBorder: {
          show: true
        },

        axisTicks: {
          show: true
        },

        labels: {
          style: {}
        },

        opposite: false
      }
    ]
}
var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();