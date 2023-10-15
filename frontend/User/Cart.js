const urlParams = new URLSearchParams(window.location.search);
const customer_id = urlParams.get('customer_id'); // ดึงค่า customer_id จาก URL
total = 0;
// ฟังก์ชันสำหรับแสดงข้อมูลเมนูในหน้า HTML
function displayMenuData(cartItems) {
  const menuContainer = document.getElementById('menu-container');
  menuContainer.innerHTML = ''; // ล้างข้อมูลเมนูเดิม

  // วนลูปเพื่อแสดงข้อมูลเมนูใน HTML
  cartItems.forEach((menuItem) => {
    const menuId = menuItem.menuId;
    const menu_name = menuItem.menuName;
    const quantity = menuItem.quantity;
    const menu_cost = menuItem.cost;
    const image_path = menuItem.image_path;
    total += parseFloat(menu_cost)*parseInt(quantity)
    // const image = menuItem.image_path;

    const menuCard = document.createElement('div');
    menuCard.className = 'menu-card';
    menuCard.innerHTML = `
    <div class="card-detail">
      <div class="circle">
      <img class="menu-image" src="/picture/${image_path}" alt="${menu_name}" width="100"/>
      </div>
      <div class="menu-name">${menu_name}</div>
      <button class="minus-button" onclick="decrementQuantity(this)">-</button> 
      <span class="quantity" data-quantity="${quantity}" data-menu-cost="${menu_cost}" data-menu-id="${menuId}" data-menu-name="${menu_name}">${quantity}</span> 
      <button class="add-button" onclick="incrementQuantity(this)">+</button> 
      </div>`;
      
      // <div class="menu-cost">${cost} บาท</div>
    // เพิ่ม quantity และ total ให้กับแต่ละรายการเมนู
    // quantity = 0;
    // total = 0;
    menuContainer.appendChild(menuCard);
    updateTotal();
  });
}

// ใช้ Axios เพื่อรับข้อมูลลูกค้าจาก Express.js
axios.get(`http://localhost:5000/User/cart.html/${customer_id}`)
.then((response) => {
    const cartItems = response.data;
    console.log(cartItems);
    displayMenuData(cartItems);
})
.catch((error) => {
    console.error('เกิดข้อผิดพลาดในการรับข้อมูล: ' + error);
});

function incrementQuantity(button) {
  const quantitySpan = button.previousElementSibling;
  let quantity = parseInt(quantitySpan.getAttribute('data-quantity'));
  let cost = parseInt(quantitySpan.getAttribute('data-menu-cost'))
  quantity++;
  quantitySpan.textContent = quantity;
  quantitySpan.setAttribute('data-quantity', quantity);
  total += cost
  updateTotal();
}

function decrementQuantity(button) {
  const quantitySpan = button.nextElementSibling;
  let quantity = parseInt(quantitySpan.getAttribute('data-quantity'));
  let cost = parseInt(quantitySpan.getAttribute('data-menu-cost'))
  quantity--;
  quantitySpan.textContent = quantity;
  quantitySpan.setAttribute('data-quantity', quantity);
  total -= cost
  updateTotal();
  if(quantity < 0){
    quantitySpan.textContent = 0;
    quantitySpan.setAttribute('data-quantity', 0);
    total = 0;
    updateTotal();
  }
  
}

function updateTotal(){
  const showTotal = document.getElementById('cost');
  showTotal.innerHTML = total.toFixed(2) + " บาท";
}

document.querySelector('.text-5').addEventListener('click', function () {
  Swal.fire({
    icon: 'success',
    title: 'จองสำเร็จแล้ว',
    text: 'ขอบคุณที่ใช้บริการ!',
    confirmButtonText: 'ตกลง'
  }).then(() => {
    window.location.href = "http://localhost:5000/User/UserProfile.html"
  })
  const cardDetails = document.querySelectorAll('.card-detail'); // เลือกทุก <div class="card-detail">
  const menuItems = [];
  cardDetails.forEach((card) => {
    const menuQuantity = parseInt(card.querySelector('.quantity').getAttribute('data-quantity'));
    const menuId = parseInt(card.querySelector('.quantity').getAttribute('data-menu-id'));
    const cost = parseInt(card.querySelector('.quantity').getAttribute('data-menu-cost'))
    const menuData = {
      menuId: menuId,
      quantity: menuQuantity,
      cost: cost*menuQuantity
    };
    menuItems.push(menuData); // เพิ่มข้อมูลของรายการเมนูลงในอาร์เรย์ menuItems
    console.log(menuItems)
  });
  axios.post(`/user/cart.html`, menuItems)
      .then((response) => {
        console.log(response.data); // ข้อมูลที่ส่งกลับมาจากเซิร์ฟเวอร์
      })
      .catch((error) => {
        console.error('เกิดข้อผิดพลาด:', error);
      });
});
