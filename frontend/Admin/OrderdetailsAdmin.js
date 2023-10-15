// Function to display reserve data in the HTML
function displayReserveData(reserveItem) {
  const reserveWindow = document.getElementById('window-reserve');
  reserveWindow.innerHTML = ''; // Clear previous data
  const reservetext = document.getElementById('reserve_id');
  const statustext = document.getElementById('status_name');
  const totaltext = document.getElementById('total');

  reserveItem.forEach((reserve) => {
      const menu_name = reserve.menu_name;
      const items = reserve.items;
      const cost = reserve.cost.toFixed(2);
      const image_path = reserve.image_path;

      const reserveCard = document.createElement('div');
      reserveCard.className = 'reserve';
      reserveCard.innerHTML = `
          <div class="circle">
              <img class="menu-image" src="/picture/${image_path}" alt="${menu_name}" width="100"/>
          </div>
          <div class="Menu">${menu_name}</div>
          <div class="amount">${items}</div>
          <div class="price">${cost} บาท</div>`;

      reserveWindow.appendChild(reserveCard);
  });

  reservetext.innerHTML = `คำสั่งซื้อที่ : ${reserveItem[0].reserve_id}`;
  statustext.innerHTML = `สถานะรายการจอง : ${reserveItem[0].status_name}`;
  totaltext.innerHTML = `ราคารวม : ${reserveItem[0].total.toFixed(2)} บาท`;
}

// Function to update status to 2 (ordered)
function updateStatusToOrdered() {
  axios.post(`/admin/adminorder`, [2])
      .then((response) => {
          console.log("เปลี่ยน status_id เป็น 2 แล้ว");
      })
      .catch((error) => {
          console.error(error);
      });
}

// Function to update status to 3 (finish)
function updateStatusToFinish() {
  axios.post(`/admin/adminorder`, [3])
      .then((response) => {
          console.log("เปลี่ยน status_id เป็น 3 แล้ว");
      })
      .catch((error) => {
          console.error(error);
      });
}

// Function to update status to 4 (accept)
function updateStatusToAccept() {
  axios.post(`/admin/adminorder`, [4])
      .then((response) => {
          console.log("เปลี่ยน status_id เป็น 4 แล้ว");
          window.location.href = `http://localhost:5000/Admin/ReserveAdmin.html`;
      })
      .catch((error) => {
          console.error(error);
      });
}

// Function to update status to 5 (cancel)
function updateStatusToCancel() {
  axios.post(`/admin/adminorder`, [5])
      .then((response) => {
          console.log("เปลี่ยน status_id เป็น 5 แล้ว");
          window.location.href = `http://localhost:5000/Admin/ReserveAdmin.html`;
      })
      .catch((error) => {
          console.error(error);
      });
}

// Event listeners
axios.get(`/admin/adminorder`)
  .then((response) => {
      const reserveItem = response.data;
      displayReserveData(reserveItem);
  })
  .catch((error) => {
      console.error('เกิดข้อผิดพลาดในการรับข้อมูล: ' + error);
  });

document.getElementById('ordered').addEventListener('click', updateStatusToOrdered);
document.getElementById('finish').addEventListener('click', updateStatusToFinish);
document.getElementById('accept').addEventListener('click', updateStatusToAccept);
document.getElementById('cancle').addEventListener('click', updateStatusToCancel);


  