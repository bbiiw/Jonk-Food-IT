function displayReserveData(reserveItem) {
    const reserveWindow = document.getElementById('window-reserve');
    reserveWindow.innerHTML = ''; // ล้างข้อมูลเมนูเดิม

    // วนลูปเพื่อแสดงข้อมูลเมนูใน HTML
    reserveItem.forEach((reserve) => {
        const first_name = reserve.first_name;
        const reserve_id = reserve.reserve_id;
        const date = reserve.date;
        const time = reserve.time;

        const reserveCard = document.createElement('div');
        reserveCard.className = 'reserve';
        reserveCard.innerHTML = `
                                <div class="reserve">
                                    <span class="password-6" reserve_id = "${reserve_id}">${reserve_id}</span>
                                    <div class="password-7">${first_name}</div>
                                    <div class="password-8">${date}</div>
                                    <div class="overlap-5">
                                        <div class="password-5">${time}</div>
                                        <a href="OrderdetailsAdmin.html">
                                            <button class="text-wrapper-3">ดูรายละเอียด</button>
                                        </a>
                                    </div>
                                </div>`;

        reserveWindow.appendChild(reserveCard);
    });
    const reserves = document.querySelectorAll('.reserve');
    reserves.forEach((reserve) => {
      reserve.querySelector('.text-wrapper-3').addEventListener('click', function () {
        // ดึงค่า reserve_id จาก element ที่ถูกคลิก
        const reserve_id = parseInt(reserve.querySelector('.password-6').getAttribute('reserve_id'));

        // ส่งข้อมูล reserve_id ไปที่เซิร์ฟเวอร์
        axios.post(`/admin/reserve`, [reserve_id])
          .then((response) => {
            // หลังจากที่ส่งข้อมูลเสร็จสิ้น สามารถทำการเปลี่ยนหน้าไปที่ URL ที่คุณต้องการ
            window.location.href = `http://localhost:5000/Admin/OrderdetailsAdmin.html`;
          })
          .catch((error) => {
            console.error(error);
          });
      });
    });
}

axios.get(`/admin/reserve`)
.then((response) => {
    const reserveItem = response.data;
    displayReserveData(reserveItem)

})
.catch((error) => {
    console.error('เกิดข้อผิดพลาดในการรับข้อมูล: ' + error);
});