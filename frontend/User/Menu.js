function fetchMenuData() {
    axios.get('http://localhost:5000/user/menu')

    .then((response) => {
        const menuContainer = document.getElementById('menu-container-container')
        let myHTML = ''   
        for(let i=0;i<Object.keys(response.data).length;i++){
            console.log(response.data)
            const { menu_name, cost } = response.data[i];
            console.log(menu_name)

            // document.getElementById('menu-name').innerHTML = menu_name;
            // document.getElementById('menu-cost').innerHTML = cost;}
            myHTML += '<div class="menu-container" id="menu-container"> \
                        <div class="ellipse-wrapper"> \
                            <img class="ellipse-4" src="https://c.animaapp.com/o1y6PJVY/img/ellipse-15@2x.png" /> \
                        </div> \
                        <button class="overlap-5" id="addButton2"> \
                            <div class="text-wrapper-6">เพิ่ม</div> \
                        </button> \
                        <div class="menu-name" id="menu-name">'+ menu_name + '\
                        </div> \
                        <div class="menu-cost" id="menu-cost">'+ cost.toFixed(2) +' บาท</div>\
                        </div>'
        //   console.log(myHTML)
        }
        menuContainer.innerHTML = myHTML;
        // console.log(menuContainer);
        // const main = document.getElementById('main');
        // main.innerHTML = menuContainer;

    })
    .catch(error => {
        console.error('การร้องข้อมูลไม่สำเร็จ:', error);
    });
}

 // เรียกใช้งาน fetchMenuData เมื่อหน้าเว็บโหลดหรือต้องการอัปเดตรายการเมนู
 window.onload = () => {
   fetchMenuData();
 }
  
// เพิ่มฟังก์ชันสำหรับค้นหาเมนู
function searchMenu() {
    const searchInput = document.getElementById('searchInput');
    const searchText = searchInput.value.toLowerCase(); // รับข้อความค้นหาและแปลงเป็นตัวพิมพ์เล็ก
  
    const menuCards = document.querySelectorAll('.menu-card'); // รับรายการเมนูทั้งหมด
    menuCards.forEach((menuCard) => {
      const menuName = menuCard.querySelector('.password').textContent.toLowerCase(); // รับข้อมูลชื่อเมนูและแปลงเป็นตัวพิมพ์เล็ก
      if (menuName.includes(searchText)) {
        menuCard.style.display = 'block'; // แสดงเมนูที่ตรงกับคำค้นหา
      } else {
        menuCard.style.display = 'none'; // ซ่อนเมนูที่ไม่ตรงกับคำค้นหา
      }
    });
  }
  
  
  
  