// SHOP REPORT
const urlParams = new URLSearchParams(window.location.search);
const shop_id = urlParams.get('shop_id');
const ctx = document.getElementById('myChart').getContext('2d');
let chart;

// ฟังก์ชันในการเริ่มต้นแผนภูมิ
function initializeChart(queues) {
    const { queueData, dayData } = queues;
    const labels = dayData; // ใช้ข้อมูลวันที่

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'จำนวนคิวอาหารรายสัปดาห์',
                data: queueData, // ใช้ queueData โดยตรง
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 3,
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
                label: 'จำนวนคิวอาหารรายสัปดาห์',
                data: queueData, // ใช้ queueData โดยตรง
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
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
                },
            },
        },
    });
}

// ฟังก์ชันในการดึงและสร้างข้อมูลจากเซิร์ฟเวอร์สำหรับประเภทแผนภูมิที่เลือก
function generateData(chartType) {
    axios.get(`http://localhost:5000/admin/reports`)
    .then((response) => {
        const { queues, queueData, dayData } = response.data;
        updateChart(chartType, queueData, dayData); // ส่ง queueData และ dayData ไปยังฟังก์ชัน updateChart
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
    const selectedChartType = this.value;
    generateData(selectedChartType);
});


