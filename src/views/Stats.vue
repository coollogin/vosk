<template>
  <div class="stats">
    <h1>Статистика запросов</h1>
    <line-chart></line-chart>

  </div>
</template>

<script>
// @ is an alias to /src
// import Chart from '@/components/Chart.vue'
import lineChart from '@/components/Chart.vue'

export default {
  name: 'StatsView',
  components: { lineChart }
}
</script>
<style media="screen">
  .stats{
    padding: 30px 40px 25px 25px;
  }
</style>
