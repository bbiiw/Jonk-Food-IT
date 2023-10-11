const chartTypeSelect = document.getElementById('chartType');
chartTypeSelect.addEventListener('change', () => {
  const selectedChartType = chartTypeSelect.value;
  updateChart(selectedChartType); // เรียกใช้ฟังก์ชัน updateChart
});

// สร้างฟังก์ชันสำหรับอัปเดตกราฟ
function updateChart(selectedChartType) {
  // กำหนดข้อมูลและค่าต่าง ๆ ของกราฟตามประเภทที่เลือก
  let newData, newConfig;
  if (selectedChartType === 'bar') {
    newData = {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: 'Sample Dataset',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    };
    newConfig = {
      type: 'bar',
      data: newData,
      options: {}
    };
  } else if (selectedChartType === 'line') {
    // สร้างข้อมูลและค่าต่าง ๆ สำหรับ Line Chart
    // ...
  } else if (selectedChartType === 'pie') {
    // สร้างข้อมูลและค่าต่าง ๆ สำหรับ Pie Chart
    // ...
  }

  // สร้างและแสดงกราฟใหม่ใน Canvas
  if (newConfig) {
    myChart.destroy(); // ทำลายกราฟเดิม
    const newChart = new Chart(ctx, newConfig);
    myChart = newChart; // เก็บอ้างอิงกราฟใหม่
  }
}