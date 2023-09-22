document.querySelector('.text-5').addEventListener('click', function () {
    Swal.fire({
      icon: 'success',
      title: 'จองสำเร็จแล้ว',
      text: 'ขอบคุณที่ใช้บริการ!',
      confirmButtonText: 'ตกลง'
    });
  });