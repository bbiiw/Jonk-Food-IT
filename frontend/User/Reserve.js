const urlParams = new URLSearchParams(window.location.search);
const reserve_id = urlParams.get('reserve_id');

function displayReserveData(reserveItem) {
    const reserveWindow = document.getElementById('window-reserve');
    reserveWindow.innerHTML = ''; // ล้างข้อมูลเมนูเดิม
  
    // วนลูปเพื่อแสดงข้อมูลเมนูใน HTML
    reserveItem.forEach((reserve) => {
      const menu_name = reserve.menu_name;
      console.log(menu_name)
      const items = reserve.items;
      const cost = reserve.cost.toFixed(2);
      const total = reserve.total.toFixed(2);
      const date = reserve.date;
      const time = reserve.time;
      const status_name = reserve.status_name;
      const image_path = reserve.image_path;

      const reserveCard = document.createElement('div');
      reserveCard.className = 'reserve-item';
      reserveCard.innerHTML = `
            <div class="circle">
                <img class="menu-image" src="/picture/${image_path}" alt="${menu_name}" width="100"/>
            </div>
            <div class="Menu">${menu_name}</div>
            <div class="amount">${items}</div>
            <div class="price">${cost} บาท</div>`;
      
      const datetime = document.getElementById('datetime');
      datetime.innerHTML =`วันที่ ${date} เวลา ${time}`;
      datetime.style.fontSize = '30px';

      const status = document.getElementById('status');
      status.innerHTML = `Status : ${status_name}`
      status.style.fontSize = '30px';

      const totalText = document.getElementById('total');
      totalText.innerHTML = `ยอดรวม : ${total} บาท`
      totalText.style.fontSize = '30px';

      reserveWindow.appendChild(reserveCard);
    });
  }

axios.get(`/user/reserve`)
.then((response) => {
    const reserveItem = response.data;
    displayReserveData(reserveItem)
    console.log(reserveItem);

})
.catch((error) => {
    console.error('เกิดข้อผิดพลาดในการรับข้อมูล: ' + error);
});