document.addEventListener("DOMContentLoaded", () => {
    // ดึงข้อมูลโปรไฟล์ผู้ใช้จาก API หรือเซิร์ฟเวอร์
    axios.get("/api/user-profile")
        .then((response) => {
            const userData = response.data;
            document.getElementById("first-name").textContent = userData.first_name;
            document.getElementById("last-name").textContent = userData.last_name;
            document.getElementById("telephone").textContent = userData.tel;
            document.getElementById("email").textContent = userData.email;
        })
        .catch((error) => {
            console.error("เกิดข้อผิดพลาดในการดึงข้อมูลโปรไฟล์: " + error.message);
        });
});
