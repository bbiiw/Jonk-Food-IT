// ฟังก์ชันสำหรับแสดงข้อมูลเมนูในหน้า HTML
function displayMenuData(menuData) {
    const menuContainer = document.getElementById('menu-container');
  
    // วนลูปเพื่อแสดงข้อมูลเมนูใน HTML
    menuData.forEach((menuItem) => {
      const menuCard = document.createElement('div');
      menuCard.className = 'menu-card';
  
      const image = document.createElement('img');
      image.src = menuItem.image_url;
      image.alt = menuItem.menu_name;
  
      const name = document.createElement('h2');
      name.textContent = menuItem.menu_name;
  
      const cost = document.createElement('p');
      cost.textContent = menuItem.cost + ' บาท';
  
      menuCard.appendChild(image);
      menuCard.appendChild(name);
      menuCard.appendChild(cost);
  
      menuContainer.appendChild(menuCard);
    });
  }
  
  // ใช้ Axios เพื่อรับข้อมูลจาก Express.js
  axios.get('http://localhost:5000/shop/menu')
  .then((response) => {
    const menuData = response.data;
    displayMenuData(menuData);
  }).catch((error) => {
    console.error('เกิดข้อผิดพลาดในการรับข้อมูล: ' + error);
  });
  