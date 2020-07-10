<template>
  <div ref="barPlant" class="box"></div>
</template>

<script>
import statisticService from "../../../service/statistic";
import echarts from "echarts";
import moment from "moment";
import _ from "lodash";
export default {
  data() {
    return {
      percent: 0,
      showLoading: true
    };
  },
  async mounted() {
    let { petOrderData } = await statisticService.getPetOrderData();
    let { goodOrderData } = await statisticService.getGoodOrderData();
    let { myseverOrderData } = await statisticService.getMyseverOrderData();
    let allData = [petOrderData, goodOrderData, myseverOrderData];
    allData = allData.map(orders => {
      orders = orders.map(item => ({
        num: item.num,
        time: moment(item.time).toObject().years
      }));
      orders = _.groupBy(orders, "time");
      _.forEach(orders, (val, key) => {
        orders[key] = val.reduce((lastval, curval) => lastval + curval.num, 0);
      });
      return orders;
    });
    const xdata = Object.keys(allData[0]);
    const petData = Object.values(allData[0]);
    const goodData = Object.values(allData[1]);
    const myseverData = Object.values(allData[2]);
    var myChart = echarts.init(this.$refs.barPlant);
    // 指定图表的配置项和数据
    var option = {
      tooltip: {
        trigger: "item"
      },
      legend: {},
      xAxis: {
        data: xdata,
        splitLine: {
          show: true
        },
        boundaryGap: false
      },
      dataZoom: [
        {
          // 这个dataZoom组件，默认控制x轴。
          type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
          start: 0, // 左边在 10% 的位置。
          end: 30 // 右边在 60% 的位置。
        }
      ],
      yAxis: {},
      grid: {
        show: true,
        left: "25",
        bottom: "20",
        right: "15",
        top: "20"
      },
      series: [
        {
          type: "scatter",
          data: petData,
          animationDelay: function(idx) {
            return idx * 20;
          },
          symbolSize: function(val) {
            return val;
          }
        },
        {
          name: "宠物销量",
          type: "line",
          data: petData,
          smooth: true,
          areaStyle: {}
        },
        {
          type: "scatter",
          data: goodData,
          animationDelay: function(idx) {
            return idx * 50;
          },
          symbolSize: function(val) {
            return val;
          }
        },
        {
          name: "商品销量",
          type: "line",
          data: goodData,
          smooth: true,
          areaStyle: {}
        },
        {
          type: "scatter",
          data: myseverData,
          animationDelay: function(idx) {
            return idx * 80;
          },
          symbolSize: function(val) {
            return val;
          }
        },
        {
          name: "服务销量",
          type: "line",
          smooth: true,
          data: myseverData,
          areaStyle: {}
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }
};
</script>

<style scoped>
.box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>