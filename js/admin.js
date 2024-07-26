document.getElementById('adminForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Basit bir kimlik doğrulama kontrolü (örnek)
    if (username === "admin" && password === "password") {
        window.location.href = "admin-panel.html";
    } else {
        alert("Geçersiz kullanıcı adı veya şifre.");
    }
});
