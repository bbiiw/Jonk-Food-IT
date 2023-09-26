document.addEventListener('DOMContentLoaded', () => {
    const submitUserForm = document.getElementById('submit-user-form');
    const registerUserForm = document.getElementById('user-register');

    submitUserForm.addEventListener('click', async (e) => {
      e.preventDefault();
  
      const registerUserForm = document.getElementById('user-register');
      const formData = new FormData(registerUserForm);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
  
      try {
        const response = await axios.post('http://localhost:5000/user/register', data);
        if (response.data === 'ลงทะเบียนสำเร็จ') {
          Swal.fire({
            icon: 'success',
            title: 'ลงทะเบียนสำเร็จ',
            text: 'คุณได้ลงทะเบียนสมาชิกเรียบร้อยแล้ว',
          }).then(() => {
            window.location.href = 'http://localhost:5000/User/LoginUser.html';
          });
          registerUserForm.reset();
        } else if (response.data === 'รหัสผ่านไม่ตรงกัน') {
            Swal.fire({
                icon: 'error',
                title: 'รหัสผ่านไม่ตรงกัน',
                text: 'กรุณาลองใหม่อีกครั้ง',
            });
        } else if (response.data === 'มีชื่อผู้ใช้(Username)นี้แล้ว') {
            Swal.fire({
                icon: 'error',
                title: 'มีชื่อผู้ใช้ Username นี้แล้ว',
                text: 'กรุณาลองใหม่อีกครั้ง',
            });
        } else if (response.data === 'กรุณากรอกข้อมูลให้ครบถ้วน'){
          Swal.fire({
            icon: 'error',
            title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
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
    
    registerUserForm.addEventListener('keydown', async (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        submitUserForm.click(); // คลิกที่ปุ่ม submit เมื่อกด Enter
      }
    });
  });
  