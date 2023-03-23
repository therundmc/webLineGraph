const xValues = [];
const yValues = [];
var ts = 0;

let isDragging = false;
let lastX = 0;
let lastY = 0;

const ctx = document.getElementById('myChart').getContext('2d');
const canvas = document.getElementById('myChart');


const scales = {
    x: {
        type: 'linear',
        position: 'bottom',
        max: 60,
        min: 0,
        ticks : {
            maxTicksLimit: 6,
            color: '#FBFFF1'
        },
        grid: {
            display: false,
            color: '#0e1319'
          }
      },
      y: {
        type: 'linear',
        position: 'bottom',
        max: 200,
        min: 0,
        ticks : {
            maxTicksLimit: 5,
            color: '#FBFFF1'
        },
        grid: {
            display: true,
            color: '#0e1319'
          }
      },
}

const plugins = {
    zoom: {
        limits: {
            x: {min: 0},
            y: {min: 0, max: 2000}
        },
        pan: {
        enabled: true,
        mode: 'xy',
        speed: 10,
        },
        zoom: {
        wheel: {
            enabled: true,
        },
        pinch: {
            enabled: true,
        },
        mode: 'x'
        },
    },
    legend: {
        display: false
    }
}

const transitions = {
    zoom: {
        animation: {
        duration: 1000,
        easing: 'easeOutCubic'
        }
    }
}

const elements = {
  line: {
    cubicInterpolationMode: 'monotone'
  }
}

const options = {
    pointRadius: 0,
    responsive: true,
    elements: elements,
    maintainAspectRatio: false,
    scales: scales,
    backgroundColor: '#04d1ff',
    borderColor: '#04d1ff',
    borderWidth: 2,
    plugins: plugins,
    animation: false,
    transitions : transitions,
}


const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: xValues,
    datasets: [
      {
        label: 'Données Y',
        data: yValues,
        fill: false,
        borderColor: '#FBFFF1',
        tension: 0.1
      }
    ]
  },
  options: options,
});

function addData(x, y) {
    var offset = (options.scales.x.max * 0.2);
    if (xValues.length >= options.scales.x.max - offset) {
      options.scales.x.min = xValues[0];
      options.scales.x.max = xValues[xValues.length - 1] + offset;
    //   xValues.shift();
    //   yValues.shift();
    }
  
    xValues.push(x);
    yValues.push(y);
    chart.update();
  }

refresh = setInterval(() => {
    console.log("ts")
    ts = ts + 1;
    addData(ts, Math.random() * 100);
  }, 100);


