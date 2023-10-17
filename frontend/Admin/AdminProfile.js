let isEditing = false;
const urlParams = new URLSearchParams(window.location.search);
const shop_id = urlParams.get('shop_id');
// ฟังก์ชันสำหรับแสดงข้อมูลโปรไฟล์ผู้ใช้
function displayUserProfile() {
  axios.get(`http://localhost:5000/shop/profile/${shop_id}`) // สร้างเส้นทางใหม่สำหรับการดึงข้อมูลโปรไฟล์
  .then((response) => {
    const { shop_name, username, tel, email } = response.data.adminProfile;

    // แสดงข้อมูลบนหน้าเว็บ
    document.getElementById('shop_name').value = shop_name;
    document.getElementById('username').value = username;
    document.getElementById('tel').value = tel;
    document.getElementById('email').value = email;

    // // ตั้งค่าฟิลด์แบบแก้ไขให้เป็นค่าเดียวกับข้อมูลแบบอ่าน
    document.getElementById('edit_shop_name').value = shop_name;
    document.getElementById('edit_username').value = username;
    document.getElementById('edit_tel').value = tel;
    document.getElementById('edit_email').value = email;
    
    // เรียก API รายงาน
    toggleEditProfile(false);
  })
  .catch((error) => {
    console.error(error);
  });
}


// ฟังก์ชันสำหรับเปิด/ปิดการแสดงฟอร์มแก้ไข
function toggleEditProfile(show) {
  const editProfileForm = document.getElementById('editProfile');
  isEditing = show;

  if (show) {
    editProfileForm.style.display = 'block';
  } else {
    editProfileForm.style.display = 'none';
  }
}

// ฟังก์ชันสำหรับอัปเดตโปรไฟล์ผู้ใช้
function updateProfile() {
  const shop_name = document.getElementById('edit_shop_name').value;
  const username = document.getElementById('edit_username').value;
  const tel = document.getElementById('edit_tel').value;
  const email = document.getElementById('edit_email').value;

  axios.post('http://localhost:5000/shop/editprofile', { shop_name, username, tel, email })
    .then((response) => {
      if (response.data === 'แก้ไขโปรไฟล์') {
        Swal.fire('เสร็จสิ้น!', 'อัปเดตโปรไฟล์สำเร็จ', 'success');
        displayUserProfile();
        toggleEditProfile(false);
      } else {
        Swal.fire('เกิดข้อผิดพลาด!', 'อัปเดตโปรไฟล์ไม่สำเร็จ', 'error');
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function displayReserveHistory() {
  axios.get(`http://localhost:5000/shop/profile/${shop_id}`) // สร้างเส้นทางใหม่สำหรับการดึงข้อมูลโปรไฟล์
  .then((response) => {
    const reserve_list = response.data.reserve_list;
    console.log(reserve_list)
    const reserveContainer = document.getElementById('window-reserve');
    reserveContainer.innerHTML = `<div class="reserve_title">
                                    <div class="text-wrapper-9">ประวัติการจอง</div>
                                  </div>`; // ล้างข้อมูลเมนูเดิม

    // วนลูปเพื่อแสดงข้อมูลเมนูใน HTML
    reserve_list.forEach((reserveItem) => {
      const reserve_id = reserveItem.reserve_id;
      const status_id = reserveItem.status_id;
      const status_name = reserveItem.status_name;
      const date = reserveItem.date;
      const time = reserveItem.time;

      const reserveCard = document.createElement('div');
      reserveCard.className = 'reserve';
      reserveCard.setAttribute('id','reserve');
      reserveCard.innerHTML = `<a href = "http://localhost:5000/User/Reserve.html">
                              <div class="rectangle-7"></div>
                              <span class="password-2" reserve_id = "${reserve_id}"status_id = "${status_id}">id = ${reserve_id}</span>
                              <div class="password-3">${date}</div>
                              <div class="password-4">${time}</div>
                              <div class="password">${status_name}</div>`;
                              
      reserveContainer.appendChild(reserveCard);
    });

    const reserves = document.querySelectorAll('.reserve');
    reserves.forEach((reserve) => {
      console.log(reserve)
      reserve.addEventListener('click', function () {
        // ดึงค่า reserve_id จาก element ที่ถูกคลิก
        const reserve_id = parseInt(reserve.querySelector('.password-2').getAttribute('reserve_id')); 

        // ส่งข้อมูล reserve_id ไปที่เซิร์ฟเวอร์
        axios.post(`http://localhost:5000/User/Reserve.html/${reserve_id}`, [reserve_id])
          .then((response) => {
            // หลังจากที่ส่งข้อมูลเสร็จสิ้น สามารถทำการเปลี่ยนหน้าไปที่ URL ที่คุณต้องการ
            window.location.href = `http://localhost:5000/User/Reserve.html`;
          })
          .catch((error) => {
            console.error(error);
          });
      });
    });
  })
  .catch((error) => {
    console.error(error);
  });
}

// โหลดข้อมูลโปรไฟล์เมื่อหน้าเว็บโหลด
window.onload = () => {
  displayUserProfile();
  displayReserveHistory();

  const editProfileBtn = document.getElementById('editButton');
  const updateProfileBtn = document.getElementById('updateButton');

  editProfileBtn.addEventListener('click', () => {
    if (!isEditing) {
      toggleEditProfile(true);
    } else {
      toggleEditProfile(false);
    }
  });

  updateProfileBtn.addEventListener('click', () => {
    updateProfile();
  });
};

