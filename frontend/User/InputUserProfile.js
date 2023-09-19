// UserProfile.html

// updateProfile.js

function openImageInput() {
    var picInput = document.getElementById("picInput");
    picInput.click(); // คลิกที่ input รูปภาพ (picInput) โดยใช้การเรียก .click()
}
// ใช้ JavaScript เพื่อเปิดหรือปิด input fields
function toggleInputs() {
    var nameInput = document.getElementById("nameInput");
    var usernameInput = document.getElementById("usernameInput");
    var telephoneInput = document.getElementById("telephoneInput");
    var emailInput = document.getElementById("emailInput");
    var picInput = document.getElementById("picInput");
  
    // ตรวจสอบสถานะของ input fields
    if (nameInput.disabled) {
      nameInput.disabled = false;
      usernameInput.disabled = false;
      telephoneInput.disabled = false;
      emailInput.disabled = false;
      picInput.disabled = false;
    //   updateButton.textContent = "Save Profile"; // เปลี่ยนข้อความบนปุ่ม
    } else {
      nameInput.disabled = true;
      usernameInput.disabled = true;
      telephoneInput.disabled = true;
      emailInput.disabled = true;
      picInput.disabled = true;
    //   updateButton.textContent = "Update Profile"; // เปลี่ยนข้อความบนปุ่ม
    }
  }
  
  // เมื่อคลิกที่ปุ่ม "Update Profile" ให้เรียกใช้ฟังก์ชัน toggleInputs
  var updateButton = document.getElementById("updateButton");
  updateButton.addEventListener("click", toggleInputs);
  
  // เพิ่ม event listener สำหรับ input รูปภาพ
  var picInput = document.getElementById("picInput");
  picInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      // ตรวจสอบขนาดของรูปภาพ
      if (file.size <= 250 * 250) { // 250x250 พิกเซล
        const reader = new FileReader();
  
        reader.onload = function (e) {
          var imgPreview = document.getElementById("imgPreview");
          imgPreview.src = e.target.result;
        };
  
        reader.readAsDataURL(file);
      } else {
        alert("ขนาดรูปภาพเกินขนาดที่กำหนด (250x250 พิกเซล)");
      }
    }
  });

    // เมื่อคลิกที่ปุ่ม "Update Profile" ให้เรียกใช้ฟังก์ชัน toggleInputs
var updateButton = document.getElementById("updateButton");
updateButton.addEventListener("click", toggleInputs);
    
  