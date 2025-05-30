document
  .getElementById("adminForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const errorMessage = document.getElementById("errorMessage");
    const API_URL = "http://localhost:5000";

    if (!email || !password) {
      errorMessage.textContent = "Email dan password wajib diisi!";
      errorMessage.style.display = "block";
      return;
    }
    console.log("email : ", email, "password :", password);
    try {
      const response = await fetch(`${API_URL}/api/v1/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // Redirect ke halaman admin dashboard
        window.location.href = "/dashboard/admin";
      } else {
        errorMessage.textContent = result.message || "Login gagal!";

        // Clear the message after 3 seconds
        setTimeout(() => {
          errorMessage.textContent = "";
        }, 1000);
        errorMessage.style.display = "block";
      }
    } catch (err) {
      errorMessage.textContent = "Terjadi kesalahan. Coba lagi.";
      errorMessage.style.display = "block";
      console.error(err);
    }
  });
