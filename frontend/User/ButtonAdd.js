// main.js

// เริ่มต้นค่าปริมาณที่ 0
let quantityValue = 0;

// รับค่าของ element ที่มี ID เป็น "quantity"
const quantityElement = document.getElementById("quantity");

// สร้างอาร์เรย์ของปุ่ม
const addButtonList = [
    // document.getElementById("addButton1"),
    document.getElementById("addButton2"),
    // document.getElementById("addButton3"),
    // document.getElementById("addButton4"),
    // document.getElementById("addButton5"),
    // document.getElementById("addButton6"),
    // document.getElementById("addButton7"),
    // document.getElementById("addButton8")
  ];

addButtonList.forEach(function (button) {
    button.addEventListener("click", function () {
      // เพิ่มค่าปริมาณ
      quantityValue++;
      // แสดงค่าปริมาณใน element
      quantityElement.textContent = quantityValue;
    });
  });