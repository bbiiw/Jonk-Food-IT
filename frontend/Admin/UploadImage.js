function handleFileSelect() {
  const fileInput = document.getElementById("imageInput");
  const imagePreview = document.getElementById("imagePreview");

  fileInput.addEventListener("change", function () {
    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const image = new Image();
        image.src = e.target.result;

        image.onload = function () {
          if (image.width <= 250 && image.height <= 250) {
            imagePreview.innerHTML = `<img src="${e.target.result}" />`;
          } else {
            alert("กรุณาเลือกรูปภาพที่มีขนาดไม่เกิน 250x250 พิกเซล");
            fileInput.value = "";
            imagePreview.innerHTML = "";
          }
        };
      };

      reader.readAsDataURL(file);
    }
  });
}

handleFileSelect();
