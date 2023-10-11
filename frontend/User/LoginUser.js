document.addEventListener('DOMContentLoaded', () => {
    const submitLoginUser = document.getElementById('submit-login-user');
    const loginUserForm = document.getElementById('login-user-form');
    
    submitLoginUser.addEventListener('click', async (e) => {
      e.preventDefault();
  
      const loginUserForm = document.getElementById('login-user-form');
      const formData = new FormData(loginUserForm);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      // ตรวจสอบว่าชื่อผู้ใช้และรหัสผ่านถูกกรอกหรือไม่
      if (!data.username && !data.password) {
        Swal.fire({
          icon: 'error',
          title: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน',
          text: 'โปรดกรอกข้อมูลให้ครบถ้วน',
        });
        return;
      } else if (!data.username) {
        Swal.fire({
          icon: 'error',
          title: 'กรุณากรอกชื่อผู้ใช้',
          text: 'โปรดกรอกข้อมูลให้ครบถ้วน',
        });
        return;
      } else if (!data.password) {
        Swal.fire({
          icon: 'error',
          title: 'กรุณากรอกรหัสผ่าน',
          text: 'โปรดกรอกข้อมูลให้ครบถ้วน',
        });
        return;
      }

      try {
        const response = await axios.post('http://localhost:5000/user/login', data);
        const customer_id = response.data.result.customer_id
        if (response.data.success) {
          Swal.fire({
            icon: 'success',
            title: 'เข้าสู่ระบบสำเร็จ',
            text: 'ยินดีต้อนรับ!',
          }).then(() => {
            window.location.href = `http://localhost:5000/User/ShopUser.html`;
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
    loginUserForm.addEventListener('keydown', async (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        submitLoginUser.click(); // ทำการคลิกที่ปุ่มเข้าสู่ระบบ
      }
    });
  });
  