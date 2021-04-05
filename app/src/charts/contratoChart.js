import { Line } from './baseChart'

export default {
  name: 'ContratoChart',
  extends: Line,
  mounted () {
    this.renderChart({
      labels: [2010, 2012, 2014, 2018, 2020],
      datasets: [
        {
          label: 'Contratos',
          backgroundColor: '#23a8d878',
          borderColor: '#23a8d878',
          pointHoverBackgroundColor: '#fff',
          data: [1, 2.3, 4, 5, 7],
          pointRadius: 5,
          lineTension: 0
        },
        {
          label: 'Parceiros',
          backgroundColor: 'rgba(215,216,35,0.47)',
          borderColor: 'rgba(216,205,25,0.47)',
          pointHoverBackgroundColor: '#fff',
          data: [0, 1, 7, 10, 7],
          pointRadius: 5,
          lineTension: 0
        }
      ]
    },
    {
      maintainAspectRatio: false,
      legend: {
        display: true
      },
      scales: {
        xAxes: [{
          gridLines: {
            drawOnChartArea: false
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 5,
            stepSize: 5,
            max: 20 / 2
          },
          gridLines: {
            display: true
          }
        }]
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3
        }
      }
    }
    )
  },
  methods: {

  }
}
