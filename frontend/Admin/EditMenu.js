document.addEventListener('DOMContentLoaded', function() {
  // เลือกปุ่ม "confirm"
  const confirmButton = document.querySelector('.rectangle-7');

  // เพิ่มการตรวจสอบเหตุการณ์คลิก
  confirmButton.addEventListener('click', function(event) {
    event.preventDefault(); // ป้องกันการส่งแบบฟอร์ม

    // ดึงค่าของช่อง input
    const namefoodInput = document.querySelector('[name="namefood"]').value;
    const priceInput = document.querySelector('[name="price"]').value;

    // ตรวจสอบว่าช่อง input ถูกกรอกครบหรือไม่
    if (namefoodInput.trim() === '' && priceInput.trim() === '') {
      // แสดง SweetAlert2 ในกรณีที่ข้อมูลไม่ถูกกรอกครบ
      Swal.fire({
        title: 'กรุณากรอกชื่ออาหารและราคา',
        icon: 'error',
        confirmButtonText: 'ตกลง'
      });
    } else if (namefoodInput.trim() === '') {
      // แสดง SweetAlert2 ในกรณีที่ชื่ออาหารไม่ถูกกรอก
      Swal.fire({
        title: 'กรุณากรอกชื่ออาหาร',
        icon: 'error',
        confirmButtonText: 'ตกลง'
      });
    } else if (priceInput.trim() === '') {
      // แสดง SweetAlert2 ในกรณีที่ราคาไม่ถูกกรอก
      Swal.fire({
        title: 'กรุณากรอกราคา',
        icon: 'error',
        confirmButtonText: 'ตกลง'
      });
    } else {
      // แสดง SweetAlert2 ในกรณีที่ข้อมูลถูกกรอกครบ
      Swal.fire({
        title: 'บันทึกข้อมูลเมนูสำเร็จ',
        icon: 'success',
        confirmButtonText: 'ตกลง'
      });
    }
  });
});

  