// USER REPORT
const urlParams = new URLSearchParams(window.location.search);
const customer_id = urlParams.get('customer_id');
const ctx = document.getElementById('myChart').getContext('2d');
let chart;
let chartType = 'line'; // Default chart type

// Function to initialize the chart
function initializeChart(money) {
    const { moneyData, dayData } = money;
    const labels = dayData; // Use the date data as labels

    chart = new Chart(ctx, {
        type: chartType, // Use the default chart type
        data: {
            labels: labels,
            datasets: [{
                label: 'การใช้จ่ายต่อวัน', // Updated label
                data: moneyData, // Use moneyData directly
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                    'rgba(255, 205, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(201, 203, 207, 0.5)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 3,
            }],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        font: {
                            size: 24,
                        },
                    },
                },
                x: {
                    ticks: {
                        font: {
                            size: 24,
                        },
                    },
                },
            },
            plugins: {
                title: {
                    display: true,
                    text: 'การใช่จ่ายรายสัปดาห์',
                    font: {
                        size: 32,
                    },
                },
            },
            animation: {
                duration: 1000, // Animation duration in milliseconds
                easing: 'easeOutBounce', // Easing function
            },
        },
    });
}

// Function to update the chart
function updateChart(chartType, moneyData, dayData) {
    // Destroy the current chart
    chart.destroy();

    // Create a new chart with the selected chart type
    const labels = dayData; // Use date data as labels

    chart = new Chart(ctx, {
        type: chartType,
        data: {
            labels: labels,
            datasets: [{
                label: 'การใช้จ่ายต่อวัน', // Updated label
                data: moneyData, // Use moneyData directly
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                    'rgba(255, 205, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(201, 203, 207, 0.5)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 3,
            }],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        font: {
                            size: 24,
                        },
                    },
                },
                x: {
                    ticks: {
                        font: {
                            size: 24,
                        },
                    },
                },
            },
            plugins: {
                title: {
                    display: true,
                    text: 'การใช้จ่ายรายสัปดาห์',
                    font: {
                        size: 32,
                    },
                },
            },
            animation: {
                duration: 1000, // Animation duration in milliseconds
                easing: 'easeOutBounce', // Easing function
            },
        },
    });
}

// Function to fetch and generate data from the server for the selected data type and chart type
function generateData(dataType, chartType) {
    let dataURL;
    if (dataType === 'money') {
        dataURL = `http://localhost:5000/user/reports?chartType=${chartType}`;
    }

    axios.get(dataURL)
        .then((response) => {
            const data = response.data;

            if (dataType === 'money') {
                const { moneyData, dayData } = data;
                updateChart(chartType, moneyData, dayData);
            }
        })
        .catch((error) => {
            console.error('Error fetching data: ' + error);
        });
}



// Fetch initial data to display on the chart when the web page loads
window.onload = () => {
    axios.get(`http://localhost:5000/user/reports`)
        .then((response) => {
            const money = response.data;
            initializeChart(money);
        })
        .catch((error) => {
            console.error('Error fetching data: ' + error);
        });
}

// Event handler for changing the chart type
document.getElementById('chartType').addEventListener('change', function () {
    chartType = this.value;
    generateData('money', chartType);
});




