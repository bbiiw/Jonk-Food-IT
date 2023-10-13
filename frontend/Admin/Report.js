const urlParams = new URLSearchParams(window.location.search);
const shop_id = urlParams.get('shop_id');
const ctx = document.getElementById('myChart').getContext('2d');
let chart;

// Function to initialize the chart
function initializeChart(data) {
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['วัน 1', 'วัน 2', 'วัน 3', 'วัน 4', 'วัน 5', 'วัน 6', 'วัน 7'],
            datasets: [{
                label: 'ข้อมูลอาหารรายสัปดาห์',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}

// Function to update the chart
function updateChart(chartType, data) {
    // Destroy the current chart
    chart.destroy();
    
    // Create a new chart with the selected chart type
    chart = new Chart(ctx, {
        type: chartType,
        data: {
            labels: ['วัน 1', 'วัน 2', 'วัน 3', 'วัน 4', 'วัน 5', 'วัน 6', 'วัน 7'],
            datasets: [{
                label: 'ข้อมูลอาหารรายสัปดาห์',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}

// Function to fetch and generate data from the server
window.onload = () => {
    axios.get(`http://localhost:5000/admin/reports`)
    .then((response) => {
        const queueData = response.data.queue;
        initializeChart(queueData);
        })
    .catch((error) => {
          console.error('เกิดข้อผิดพลาดในการรับข้อมูล: ' + error);
        });
    }


// Event listener for chart type selection
document.getElementById('chartType').addEventListener('change', function () {
    const selectedChartType = this.value;
    generateData(); // Fetch new data for the selected chart type and update the chart
});