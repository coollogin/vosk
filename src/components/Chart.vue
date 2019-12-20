<script>
// import chartist from 'vue-chartist'
// import '//cdn.jsdelivr.net/chartist.js/latest/chartist.min.js'
import { Line } from 'vue-chartjs'
import { mapGetters } from 'vuex'
export default {
  name: 'Stats',
  extends: Line,
  props: {
    // chartdata: {
    //   type: Object,
    //   default: null
    // },
    // options: {
    //   type: Object,
    //   default: null
    // }
  },
  data () {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          fontColor: '#aaa',
          color: '#fff'
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: '',
              fontColor: '#000000',
              fontSize: 10
            },
            ticks: {
              fontColor: '#999',
              fontSize: 14
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: '',
              fontColor: '#000000',
              fontSize: 10
            },
            ticks: {
              fontColor: '#999',
              fontSize: 14
            }
          }]
        },
        legend: {
          display: true,
          labels: {
            fontColor: '#aaa',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;'
          }
        }
      }
    }
  },
  methods: {},
  computed: {
    ...mapGetters([ 'getStats' ]),
    getChartData () {
      function niceDate (ts) {
        let d = new Date()
        d.setTime(ts * 1000)
        return ('0' + d.getDate()).slice(-2) + '.' + ('0' + (d.getMonth() + 1)).slice(-2) + '.' + d.getFullYear()
      }

      let colors = ['rgba(255,0,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(0,255,0,0.3)', '#539aa8', '#99a752', '#f76c06', '#6152a7', 'red', 'green', 'blue', 'yellow', 'grey']
      let tmp = this.getStats.map(item => niceDate(item.date))
      // console.log(tmp)
      let dates = Array.from(new Set(tmp))
      tmp = this.getStats.map(item => item.user)
      let users = Array.from(new Set(tmp))
      let datasets = []

      users.forEach((user, index) => {
        let data = this.getStats.filter(item => item.user === user).map(el => el.requests)
        let newData = []
        if (index > 0) {
          newData = data
          // newData = data.map((value, i) => value + datasets[index - 1].data[i])
        } else {
          newData = data
        }

        let arr = { label: user, backgroundColor: colors[index], data: newData }

        arr.pointBackgroundColor = '#888'
        arr.pointBorderColor = '#888'
        datasets.push(arr)
      })

      let chartdata = {
        labels: dates,
        datasets: datasets
      }

      return chartdata
    }
  },
  async mounted () {
    await this.$store.dispatch('fetchStatsfromBD')
    // console.log(this.getChartData)
    await this.renderChart(this.getChartData, this.options)
    // new Chartist.Line('.ct-chart', this.statItems, options)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
