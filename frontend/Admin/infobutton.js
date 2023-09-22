document.addEventListener('DOMContentLoaded', function() {
    // เลือกปุ่ม "รับออเดอร์"
    const receiveOrderButton = document.querySelector('.ordered');
  
    // เพิ่มการตรวจสอบเหตุการณ์คลิก
    receiveOrderButton.addEventListener('click', function() {
      // สร้างหน้าต่าง SweetAlert2
      Swal.fire({
        title: 'รับออเดอร์แล้ว',
        text: 'คำสั่งซื้อของคุณได้รับการยืนยันแล้ว',
        icon: 'success',
        confirmButtonText: 'ตกลง'
      });
    });
  });
  
document.addEventListener('DOMContentLoaded', function() {
    // เลือกปุ่ม "ทำเสร็จแล้ว"
    const receiveOrderButton = document.querySelector('.finish');
  
    // เพิ่มการตรวจสอบเหตุการณ์คลิก
    receiveOrderButton.addEventListener('click', function() {
      // สร้างหน้าต่าง SweetAlert2
      Swal.fire({
        title: 'ทำอาหารเสร็จแล้ว',
        text: 'โปรดรอลูกค้าของคุณมารับอาหาร',
        icon: 'success',
        confirmButtonText: 'ตกลง'
      });
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    // เลือกปุ่ม "รับสินค้า"
    const receiveOrderButton = document.querySelector('.accept');
  
    // เพิ่มการตรวจสอบเหตุการณ์คลิก
    receiveOrderButton.addEventListener('click', function() {
      // สร้างหน้าต่าง SweetAlert2
      Swal.fire({
        title: 'ลูกค้ามารับอาหารแล้ว',
        icon: 'success',
        confirmButtonText: 'ตกลง'
      });
    });
  });