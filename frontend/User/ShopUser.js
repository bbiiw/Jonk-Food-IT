// ฟังก์ชันสำหรับแสดงข้อมูลร้านค้าใน HTML

function displayShopData(shopData) {
    const shopContainer = document.getElementById('shop-container');
    shopContainer.innerHTML = ''; // ล้างข้อมูลร้านค้าเดิม
  
    // วนลูปเพื่อแสดงข้อมูลร้านค้าใน HTML
    shopData.forEach((shop) => {
      const shopName = shop.shop_name;
  
      const shopItem = document.createElement('div');
      shopItem.className = 'shop-item';
      shopItem.innerHTML = `
      <div class="rectangle">
        <a href="Main.html?shop_id=${shop.shop_id}">
            <div class="content">
                <img class="element" src="https://c.animaapp.com/CT0AxP0b/img/-----------------2@2x.png" />
                <h2 class="shop-text">${shopName}</h2>
            </div>
        </a>
      </div>
      `;
  
      shopContainer.appendChild(shopItem);
    });
}
  
  // ใช้ Axios เพื่อรับข้อมูลร้านค้าจาก Express.js
axios.get(`http://localhost:5000/user/shoplist`)
.then((response) => {
    const shopData = response.data;
    displayShopData(shopData);
})
.catch((error) => {
    console.error('เกิดข้อผิดพลาดในการรับข้อมูลร้านค้า: ' + error);
});
