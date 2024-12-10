<template>
  <h1 class="title">Charts</h1>
  <div class="container">
    <highcharts :options="gameAnalysisOptions" v-if="gameAnalysisOptions" />
    <highcharts :options="activePlayersOptions" v-if="activePlayersOptions" />
    <highcharts :options="sumarryOptions" v-if="sumarryOptions" />
    <highcharts :options="topPlayersOptions" v-if="topPlayersOptions" />
  </div>
</template>

<script setup>
import { fetchData } from "~/composables/fetchData";

const activePlayersOptions = ref(null);
const gameAnalysisOptions = ref(null);
const sumarryOptions = ref(null);
const topPlayersOptions = ref(null);

const fetchActivePlayers = async () => {
  const activePlayersJSON = await fetchData("/data/activePlayers.json");

  const dates = activePlayersJSON.data.dayStatisticList.map(
    (item) => item.time
  );
  const newPlayers = activePlayersJSON.data.dayStatisticList.map(
    (item) => item.newPlayers
  );
  const activePlayers = activePlayersJSON.data.dayStatisticList.map(
    (item) => item.activePlayers
  );

  activePlayersOptions.value = {
    chart: {
      type: "line",
      backgroundColor: "#f9f9f9",
    },
    title: {
      text: "Active Players JSON",
    },
    xAxis: {
      categories: dates,
      title: {
        text: "Date",
      },
    },
    yAxis: {
      title: {
        text: "Number of Players",
      },
    },
    series: [
      {
        name: "New Players",
        data: newPlayers,
      },
      {
        name: "Active Players",
        data: activePlayers,
      },
    ],
    tooltip: {
      shared: true,
      pointFormat: "<b>{series.name}:</b> {point.y}<br/>",
    },
  };
};

const fetchGameAnalysis = async () => {
  const gameAnalysisJSON = await fetchData("/data/gameAnalysis.json");

  const gameNames = gameAnalysisJSON.data.map((item) => item.gameName);
  const totalBets = gameAnalysisJSON.data.map((item) => item.totalBet);
  const totalWins = gameAnalysisJSON.data.map((item) => item.totalWin);

  gameAnalysisOptions.value = {
    chart: {
      type: "column",
      backgroundColor: "#f9f9f9",
    },
    title: {
      text: "Game Analysis JSON",
    },
    xAxis: {
      categories: gameNames,
      title: {
        text: "Games",
      },
      labels: {
        style: {
          fontSize: "10px",
        },
      },
    },
    yAxis: {
      title: {
        text: "Amount (USD)",
      },
    },
    series: [
      {
        name: "Total Bet",
        data: totalBets,
      },
      {
        name: "Total Win",
        data: totalWins,
      },
    ],
    tooltip: {
      shared: true,
      pointFormat: "<b>{series.name}:</b> {point.y}<br/>",
    },
  };
};

const fetchSummary = async () => {
  const summaryJSON = await fetchData("/data/summary.json");
  const dates = summaryJSON.data.map((item) => item.time);
  const totalBets = summaryJSON.data.map((item) => item.totalBet);
  const totalWins = summaryJSON.data.map((item) => item.totalWin);
  const totalPlayers = summaryJSON.data.map((item) => item.players);

  sumarryOptions.value = {
    chart: {
      type: "area",
      backgroundColor: "#f9f9f9",
    },
    title: {
      text: "Summary JSON",
    },
    xAxis: {
      categories: dates,
      title: {
        text: "Dates",
      },
      labels: {
        style: {
          fontSize: "10px",
        },
      },
    },
    yAxis: {
      title: {
        text: "Amount (USD)",
      },
    },
    series: [
      {
        name: "Total Bet",
        data: totalBets,
      },
      {
        name: "Total Win",
        data: totalWins,
      },
      {
        name: "Total Players",
        data: totalPlayers,
      },
    ],
    tooltip: {
      shared: true,
      pointFormat: "<b>{series.name}:</b> {point.y}<br/>",
    },
  };
};

const fetchTopPlayers = async () => {
  const topPlayersJSON = await fetchData("/data/topPlayers.json");

  const seriesData = topPlayersJSON.data.map((item) => ({
    name: item.brandName,
    data: [item.totalBet, item.totalWin, item.income],
  }));

  topPlayersOptions.value = {
    chart: {
      type: "column",
      backgroundColor: "#f9f9f9",
    },
    title: {
      text: "Top Players JSON",
    },
    xAxis: {
      categories: ["Total Bet", "Total Win", "Income"],
      title: {
        text: "Metrics",
      },
    },
    yAxis: {
      title: {
        text: "Amount (USD)",
      },
    },
    tooltip: {
      shared: true,
      valuePrefix: "$",
    },
    series: seriesData,
  };
};

onMounted(() => {
  fetchGameAnalysis();
  fetchActivePlayers();
  fetchSummary();
  fetchTopPlayers();
});
</script>
<style scoped>
.container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.title {
  text-align: center;
}
</style>
