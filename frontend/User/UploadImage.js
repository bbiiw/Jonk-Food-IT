// UserProfileEdit.html

document.addEventListener("DOMContentLoaded", function () {
    const imageInput = document.getElementById("imageInput");
    const imgPreview = document.querySelector(".img");
  
    imageInput.addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file) {
        // ตรวจสอบขนาดของรูปภาพ
        if (file.size <= 250 * 250) { // 250x250 พิกเซล
          const reader = new FileReader();
  
          reader.onload = function (e) {
            imgPreview.src = e.target.result;
          };
  
          reader.readAsDataURL(file);
        } else {
          alert("ขนาดรูปภาพเกินขนาดที่กำหนด (250x250 พิกเซล)");
        }
      }
    });
  });
  