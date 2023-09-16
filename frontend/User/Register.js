document.addEventListener('DOMContentLoaded', () => {
    const submitForm = document.getElementById('submit-form');
  
    submitForm.addEventListener('click', async (e) => {
      e.preventDefault();
  
      const registerForm = document.getElementById('user-register');
      const formData = new FormData(registerForm);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      console.log(formData)
  
      try {
        const response = await axios.post('http://localhost:5000/user/register', data);
        if (response.data === 'ลงทะเบียนสำเร็จ') {
          Swal.fire({
            icon: 'success',
            title: 'ลงทะเบียนสำเร็จ',
            text: 'คุณได้ลงทะเบียนสมาชิกเรียบร้อยแล้ว',
          });
          registerForm.reset();
        } else if (response.data === 'รหัสผ่านไม่ตรงกัน') {
            Swal.fire({
                icon: 'error',
                title: 'รหัสผ่านไม่ตรงกัน',
                text: 'กรุณาลองใหม่อีกครั้ง',
            })
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
  });
  