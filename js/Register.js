// تسجيل البيانات وحفظها في Local Storage
function register() {
    const fullName = document.getElementById("full-name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
  
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    const user = { fullName, email, password };
    localStorage.setItem("user", JSON.stringify(user));
  
    alert("Account created successfully!");
    window.location.href = "login.html";
  }
  
