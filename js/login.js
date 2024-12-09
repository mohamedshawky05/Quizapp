  // التحقق من بيانات تسجيل الدخول
  function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const user = JSON.parse(localStorage.getItem("user"));
  
    if (user && user.email === email && user.password === password) {
      alert("Login successful!");
      window.location.href = "home.html";
    } else {
      document.getElementById("error-message").innerText = "Invalid email or password!";
    }
  }
