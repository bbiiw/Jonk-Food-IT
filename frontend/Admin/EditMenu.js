document.addEventListener('DOMContentLoaded', function() {
  // เลือกปุ่ม "confirm"
  const confirmButton1 = document.querySelector('.rectangle-7');
  const confirmButton2 = document.querySelector('.text-wrapper-8');

  // สร้างฟังก์ชันสำหรับการตรวจสอบและแสดงข้อความแจ้งเตือน
  function validateAndAlert() {
    event.preventDefault(); // ป้องกันการส่งแบบฟอร์ม

    // ดึงค่าของช่อง input
    const namefoodInput = document.querySelector('[name="namefood"]').value;
    const priceInput = document.querySelector('[name="price"]').value;

    // ตรวจสอบว่าช่อง input ถูกกรอกครบหรือไม่
    if (namefoodInput.trim() === '' && priceInput.trim() === '') {
      // แสดง SweetAlert2 ในกรณีที่ข้อมูลไม่ถูกกรอกครบ
      Swal.fire({
        title: 'กรุณากรอกข้อมูลให้ครบ',
        icon: 'error',
        confirmButtonText: 'ตกลง'
      });
    } else if (namefoodInput.trim() === '') {
      // แสดง SweetAlert2 ในกรณีที่ชื่ออาหารไม่ถูกกรอก
      Swal.fire({
        title: 'กรุณากรอกข้อมูลให้ครบ',
        icon: 'error',
        confirmButtonText: 'ตกลง'
      });
    } else if (priceInput.trim() === '') {
      // แสดง SweetAlert2 ในกรณีที่ราคาไม่ถูกกรอก
      Swal.fire({
        title: 'กรุณากรอกข้อมูลให้ครบ',
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
  }

  // เพิ่มการตรวจสอบเหตุการณ์คลิกสำหรับทั้งสองปุ่ม "confirm"
  confirmButton1.addEventListener('click', validateAndAlert);
  confirmButton2.addEventListener('click', validateAndAlert);
});


  