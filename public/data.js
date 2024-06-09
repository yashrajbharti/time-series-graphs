google.charts.load("current", { packages: ["line", "corechart"] });
google.charts.setOnLoadCallback(drawChart);

async function drawChart() {
  const chartDiv = document.getElementById("chart_div");
  const data = new google.visualization.DataTable();
  data.addColumn("date", "Time");
  data.addColumn("number", "SPI");

  const dbData = await getData();

  data.addRows(dbData);

  const materialOptions = {
    chart: {
      title: "SPI Over Time (2018-2023)",
    },
    width: 900,
    height: 500,
    series: {
      0: { axis: "SPI" },
    },
    axes: {
      y: {
        SPI: { label: "SPI (out of 10)" },
      },
      x: {
        0: { label: "Time" },
      },
    },
  };

  const materialChart = new google.charts.Line(chartDiv);
  materialChart.draw(data, materialOptions);
}

async function getData() {
  return await fetch("/spiData")
    .then((response) => response.json())
    .then((data) => {
      return data.map((item) => [new Date(item.date), item.spi]);
    })
    .catch((err) => {
      console.error(err);
    });
}
