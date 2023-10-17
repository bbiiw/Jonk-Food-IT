// SHOP REPORT
const urlParams = new URLSearchParams(window.location.search);
const shop_id = urlParams.get('shop_id');
const ctx = document.getElementById('myChart').getContext('2d');
let chart;
let chartType = 'line'; // Default chart type

// ฟังก์ชันในการเริ่มต้นแผนภูมิ
function initializeChart(queues) {
    const { queueData, dayData } = queues;
    const labels = dayData; // ใช้ข้อมูลวันที่

    chart = new Chart(ctx, {
        type: chartType, // Use the default chart type
        data: {
            labels: labels,
            datasets: [{
                label: 'ยอดขาย',
                data: queueData, // ใช้ queueData โดยตรง
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
                    text: 'กราฟแสดงข้อมูลร้านค้ารายสัปดาห์',
                    font: {
                        size: 32,
                    }
                },
            },
            animation: {
                duration: 1000, // Animation duration in milliseconds
                easing: 'easeOutBounce', // Easing function (e.g., 'linear', 'easeInOutSine', 'easeOutBounce', etc.)
            },
        },
    });
}

// ฟังก์ชันในการอัปเดตแผนภูมิ
function updateChart(chartType, queueData, dayData) {
    // ทำลายแผนภูมิปัจจุบัน
    chart.destroy();

    // สร้างแผนภูมิใหม่ด้วยประเภทแผนภูมิที่เลือก
    const labels = dayData; // ใช้ข้อมูลวันที่

    chart = new Chart(ctx, {
        type: chartType,
        data: {
            labels: labels,
            datasets: [{
                label: 'ยอดขาย',
                data: queueData, // ใช้ queueData โดยตรง
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
                    text: 'กราฟแสดงข้อมูลร้านค้ารายสัปดาห์',
                    font: {
                        size: 32,
                    },
                },
            },
            animation: {
                duration: 1000, // Animation duration in milliseconds
                easing: 'easeOutBounce', // Easing function (e.g., 'linear', 'easeInOutSine', 'easeOutBounce', etc.)
            },
        },

    });
}

// ฟังก์ชันในการดึงและสร้างข้อมูลจากเซิร์ฟเวอร์สำหรับประเภทข้อมูลที่เลือก
function generateData(dataType) {
    let dataURL;
    if (dataType === 'queues') {
        dataURL = 'http://localhost:5000/admin/reports'; // URL สำหรับข้อมูลคิว
    } else if (dataType === 'menuItems') {
        dataURL = 'http://localhost:5000/admin/reports/menu'; // URL สำหรับข้อมูลเมนูอาหาร
    }

    axios.get(dataURL)
        .then((response) => {
            const data = response.data;

            if (dataType === 'queues') {
                const { queueData, dayData } = data;
                updateChart(chartType, queueData, dayData); // ส่งข้อมูลคิวไปยังฟังก์ชัน updateChart
            } else if (dataType === 'menuItems') {
                const { menuData, menuNames } = data;
                updateChart(chartType, menuData, menuNames); // ส่งข้อมูลเมนูไปยังฟังก์ชัน updateChart
            }

        })
        .catch((error) => {
            console.error('เกิดข้อผิดพลาดในการรับข้อมูล: ' + error);
        });
}

// ฟังก์ชันในการดึงข้อมูลเริ่มต้นที่ถูกแสดงในแผนภูมิเมื่อหน้าเว็บโหลดเสร็จ
window.onload = () => {
    axios.get(`http://localhost:5000/admin/reports`)
        .then((response) => {
            const queues = response.data; // ใช้ queues ในการเริ่มต้นแผนภูมิ
            initializeChart(queues);
        })
        .catch((error) => {
            console.error('เกิดข้อผิดพลาดในการรับข้อมูล: ' + error);
        });
}

// ตัวจัดการเหตุการณ์สำหรับการเลือกประเภทแผนภูมิ
document.getElementById('chartType').addEventListener('change', function () {
    chartType = this.value; // Update the selected chart type
    generateData(chartType);
});

// ตัวจัดการเหตุการณ์สำหรับการเลือกประเภทข้อมูล
document.getElementById('dataType').addEventListener('change', function () {
    const selectedDataType = this.value;
    generateData(selectedDataType);
});


