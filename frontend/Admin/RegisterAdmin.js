document.addEventListener('DOMContentLoaded', () => {
  const submitShopForm = document.getElementById('submit-shop-form');
  const registerShopForm = document.getElementById('shop-register');

  submitShopForm.addEventListener('click', async (e) => {
    e.preventDefault();

    const formData = new FormData(registerShopForm);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    try {
      const response = await axios.post('http://localhost:5000/shop/register', data);
      if (response.data === 'ลงทะเบียนสำเร็จ') {
        Swal.fire({
          icon: 'success',
          title: 'ลงทะเบียนสำเร็จ',
          text: 'คุณได้ลงทะเบียนสมาชิกเรียบร้อยแล้ว',
        }).then(() => {
          window.location.href = 'http://localhost:5000/Admin/LoginAdmin.html';
        });
        registerShopForm.reset();
      } else if (response.data === 'รหัสผ่านไม่ตรงกัน') {
        Swal.fire({
          icon: 'error',
          title: 'รหัสผ่านไม่ตรงกัน',
          text: 'กรุณาลองใหม่อีกครั้ง',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาดในการลงทะเบียน',
          text: 'กรุณาลองใหม่อีกครั้ง',
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาดในการลงทะเบียน',
        text: 'กรุณาลองใหม่อีกครั้ง',
      });
    }
  });

  registerShopForm.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submitShopForm.click(); // คลิกที่ปุ่ม submit เมื่อกด Enter
    }
  });
});
