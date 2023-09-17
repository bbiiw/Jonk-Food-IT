document.addEventListener('DOMContentLoaded', () => {
    const submitLoginUser = document.getElementById('submit-login-user');
  
    submitLoginUser.addEventListener('click', async (e) => {
      e.preventDefault();
  
      const loginUserForm = document.getElementById('login-user-form');
      const formData = new FormData(loginUserForm);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
  
      try {
        const response = await axios.post('http://localhost:5000/user/login', data);
        if (response.data === 'เข้าสู่ระบบสำเร็จ') {
          Swal.fire({
            icon: 'success',
            title: 'เข้าสู่ระบบสำเร็จ',
            text: 'ยินดีต้อนรับ!',
          }).then(() => {
            window.location.href = 'http://localhost:5000/User/Main.html';
          });
          loginUserForm.reset();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'เข้าสู่ระบบไม่สำเร็จ',
            text: 'กรุณาตรวจสอบชื่อผู้ใช้และรหัสผ่าน',
          });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ',
          text: 'กรุณาลองใหม่ภายหลัง',
        });
      }
    });
  });
  