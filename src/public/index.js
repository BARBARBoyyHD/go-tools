document.addEventListener("DOMContentLoaded", async function () {
  // Base URL API
  const API_URL = "http://localhost:5000";

  // Fungsi untuk register user
  async function registerUser(userData) {
    try {
      const response = await fetch(`${API_URL}/api/v2/register/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Register gagal");
      }
      window.location.href="/"

      return data.user;
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  }

  document
    .getElementById("registerForm")
    .addEventListener("submit", async function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      const address = document.getElementById("address").value;
      const phone = document.getElementById("phone").value;
      const agreeTerms = document.getElementById("agreeTerms").checked;
      console.log(name,email,password,confirmPassword,address,phone,agreeTerms)
      // Validation
      if (password !== confirmPassword) {
        alert("Password dan konfirmasi password tidak cocok.");
        return;
      }

      if (!agreeTerms) {
        alert("Anda harus menyetujui syarat dan ketentuan.");
        return;
      }

      const userData = {
        name,
        email,
        password,
        address,
        phone,
      };

      try {
        const user = await registerUser(userData);
        alert("Registrasi berhasil!");
        window.location.href="/"
        console.log("User terdaftar:", user);
        // Optionally redirect or reset form
        document.getElementById("registerForm").reset();
      } catch (error) {
        alert("Registrasi gagal: " + error.message);
      }
    });
  // Fungsi untuk login user
  async function loginUser(credentials) {
    try {
      const response = await fetch(`${API_URL}/api/v2/login/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important for cookies
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      console.log(data);

      // Check for success based on HTTP status
      if (!response.ok) {
        throw new Error(data.message || "Login gagal");
      }

      return data.user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  // Fungsi untuk update profile user
  async function updateUserProfile(userId, userData) {
    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Gagal update profile");
      }

      // Update data user di localStorage
      localStorage.setItem("userName", data.data.name);

      return data.data;
    } catch (error) {
      console.error("Update profile error:", error);
      throw error;
    }
  }

  // Fungsi untuk logout
  function logoutUser() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");

    // Refresh halaman
    location.reload();
  }
  // DOM Elements
  const openLoginModalBtn = document.getElementById("openLoginModal");
  const loginModal = document.getElementById("loginModal");
  const closeLoginModalBtn = document.getElementById("closeLoginModal");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");
  const mainContent = document.querySelector(".main-content");
  const dashboard = document.getElementById("dashboard");
  const userNameDisplay = document.getElementById("userNameDisplay");
  const dashboardName = document.getElementById("dashboardName");
  const dashboardEmail = document.getElementById("dashboardEmail");
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");
  const openCartModalBtn = document.getElementById("openCartModal");
  const cartModal = document.getElementById("cartModal");
  const closeCartModalBtn = document.getElementById("closeCartModal");
  const cartCount = document.getElementById("cartCount");
  const cartItems = document.getElementById("cartItems");
  const cartEmpty = document.getElementById("cartEmpty");
  const cartSummary = document.getElementById("cartSummary");
  const cartSubtotal = document.getElementById("cartSubtotal");
  const cartDiscount = document.getElementById("cartDiscount");
  const cartTotal = document.getElementById("cartTotal");
  const productsGrid = document.getElementById("productsGrid");
  const sortProducts = document.getElementById("sortProducts");
  const shopNowBtn = document.getElementById("shopNowBtn");

  // Contoh kredensial statis (dalam aplikasi nyata, ini akan diambil dari database)
  const validCredentials = {
    "user@example.com": "password123",
  };

  // Data produk

  // Keranjang belanja
  let cart = [];
  const response = await fetch(`${API_URL}/api/v2/all/product`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resProduct = await response.json();
  const products = resProduct.product;
  console.log(Array.isArray(products));
  console.log(products);
  // Render produk ke halaman
  async function renderProducts(products) {
    productsGrid.innerHTML = "";

    products.map((product) => {
      const productElement = document.createElement("div");
      productElement.className = "product-card";
      productElement.innerHTML = `
                        <div class="product-image">
                            <img src="/asset/${product.image}" alt="${
        product.name
      }">
                            <div class="discount-badge">-${
                              product.discount
                            }</div>
                        </div>
                        <div class="product-info">
                            <div style="display: flex; align-items: center; margin-bottom: 5px;">
                                <div class="star-badge"><i class="fas fa-star"></i> ${
                                  product.rating
                                }</div>
                                <strong>${product.brand}</strong>
                            </div>
                            <div class="product-name">${product.name}</div>
                            <div class="product-price">
                                Rp${product.price.toLocaleString("id-ID")}
                                <span class="original-price">Rp${product.originalPrice.toLocaleString(
                                  "id-ID"
                                )}</span>
                            </div>
                            <div class="product-stock">Stok: ${
                              product.stock
                            }</div>
                            <div class="product-badges">
                                ${
                                  product.badges.discount
                                    ? `<div class="product-badge badge-discount">${product.badges.discount}</div>`
                                    : ""
                                }
                                ${
                                  product.badges.gift
                                    ? `<div class="product-badge badge-gift">${product.badges.gift}</div>`
                                    : ""
                                }
                                ${
                                  product.badges.promo
                                    ? `<div class="product-badge badge-promo">${product.badges.promo}</div>`
                                    : ""
                                }
                            </div>
                            <div class="product-location">
                                <i class="fas fa-map-marker-alt"></i> ${
                                  product.location
                                }
                            </div>
                            <div class="product-actions">
                                <button class="btn btn-add-cart" data-id="${
                                  product.id
                                }">
                                    <i class="fas fa-cart-plus"></i> Tambah ke Keranjang
                                </button>
                            </div>
                        </div>
                    `;

      productsGrid.appendChild(productElement);
    });

    // Tambahkan event listener untuk tombol "Tambah ke Keranjang"
    document.querySelectorAll(".btn-add-cart").forEach((button) => {
      button.addEventListener("click", function () {
        const productId = parseInt(this.getAttribute("data-id"));
        addToCart(productId);
      });
    });
  }

  // Fungsi untuk mengurutkan produk
  function sortProductList(sortBy) {
    let sortedProducts = [...products];

    switch (sortBy) {
      case "price-low":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Default sorting (no change)
        break;
    }

    renderProducts(sortedProducts);
  }

  // Event listener untuk pengurutan produk
  sortProducts.addEventListener("change", function () {
    sortProductList(this.value);
  });

  // Fungsi untuk menambah produk ke keranjang
  function addToCart(productId) {
    const product = products.find((p) => p.id === productId);

    if (!product) return;

    // Cek apakah produk sudah ada di keranjang
    const existingItem = cart.find((item) => item.product.id === productId);

    if (existingItem) {
      // Jika sudah ada, tambahkan jumlahnya
      existingItem.quantity += 1;
    } else {
      // Jika belum ada, tambahkan produk baru ke keranjang
      cart.push({
        product: product,
        quantity: 1,
      });
    }

    // Update tampilan keranjang
    updateCart();

    // Tampilkan notifikasi
    showNotification(`${product.name} telah ditambahkan ke keranjang!`);
  }

  // Fungsi untuk update tampilan keranjang
  function updateCart() {
    // Update jumlah item di ikon keranjang
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update isi keranjang modal
    renderCartItems();

    // Simpan ke localStorage untuk persistensi
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Fungsi untuk menampilkan notifikasi
  function showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.innerHTML = `
                    <div class="notification-content">
                        <i class="fas fa-check-circle"></i>
                        <span>${message}</span>
                    </div>
                `;

    document.body.appendChild(notification);

    // Tambahkan style untuk notifikasi jika belum ada
    if (!document.querySelector("style#notification-style")) {
      const style = document.createElement("style");
      style.id = "notification-style";
      style.textContent = `
                        .notification {
                            position: fixed;
                            bottom: 20px;
                            right: 20px;
                            z-index: 9999;
                            animation: slide-in 0.3s ease, fade-out 0.5s ease 2.5s forwards;
                        }
                        
                        .notification-content {
                            background-color: #4CAF50;
                            color: white;
                            padding: 12px 20px;
                            border-radius: 4px;
                            display: flex;
                            align-items: center;
                            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                        }
                        
                        .notification-content i {
                            margin-right: 10px;
                        }
                        
                        @keyframes slide-in {
                            from {
                                transform: translateX(100%);
                                opacity: 0;
                            }
                            to {
                                transform: translateX(0);
                                opacity: 1;
                            }
                        }
                        
                        @keyframes fade-out {
                            from {
                                opacity: 1;
                            }
                            to {
                                opacity: 0;
                            }
                        }
                    `;
      document.head.appendChild(style);
    }

    // Hapus notifikasi setelah 3 detik
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  // Fungsi untuk menampilkan item keranjang dalam modal
  function renderCartItems() {
    // Jika keranjang kosong
    if (cart.length === 0) {
      cartItems.style.display = "none";
      cartSummary.style.display = "none";
      cartEmpty.style.display = "block";
      return;
    }

    // Jika keranjang memiliki item
    cartItems.style.display = "block";
    cartSummary.style.display = "block";
    cartEmpty.style.display = "none";

    // Render item keranjang
    cartItems.innerHTML = "";

    let subtotal = 0;
    let totalDiscount = 0;

    cart.forEach((item) => {
      const product = item.product;
      const itemTotal = product.price * item.quantity;
      const itemDiscount =
        (product.originalPrice - product.price) * item.quantity;

      subtotal += itemTotal;
      totalDiscount += itemDiscount;

      const cartItemElement = document.createElement("div");
      cartItemElement.className = "cart-item";
      cartItemElement.innerHTML = `
                        <div class="cart-item-img">
                            <img src="${product.image}" alt="${product.name}">
                        </div>
                        <div class="cart-item-details">
                            <div class="cart-item-title">${product.name}</div>
                            <div class="cart-item-price">
                                Rp${product.price.toLocaleString("id-ID")}
                                <span class="cart-item-original">Rp${product.originalPrice.toLocaleString(
                                  "id-ID"
                                )}</span>
                                <span class="cart-item-discount">-${
                                  product.discount
                                }</span>
                            </div>
                        </div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn decrease-btn" data-id="${
                              product.id
                            }">-</button>
                            <input type="number" class="quantity-input" value="${
                              item.quantity
                            }" min="1" max="${product.stock}" data-id="${
        product.id
      }">
                            <button class="quantity-btn increase-btn" data-id="${
                              product.id
                            }">+</button>
                        </div>
                        <div class="cart-item-remove" data-id="${product.id}">
                            <i class="fas fa-trash"></i>
                        </div>
                    `;

      cartItems.appendChild(cartItemElement);
    });

    // Update ringkasan keranjang
    cartSubtotal.textContent = `Rp${subtotal.toLocaleString("id-ID")}`;
    cartDiscount.textContent = `-Rp${totalDiscount.toLocaleString("id-ID")}`;
    cartTotal.textContent = `Rp${subtotal.toLocaleString("id-ID")}`;

    // Event listener untuk ubah kuantitas dan hapus item
    document.querySelectorAll(".decrease-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const productId = parseInt(this.getAttribute("data-id"));
        decreaseQuantity(productId);
      });
    });

    document.querySelectorAll(".increase-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const productId = parseInt(this.getAttribute("data-id"));
        increaseQuantity(productId);
      });
    });

    document.querySelectorAll(".quantity-input").forEach((input) => {
      input.addEventListener("change", function () {
        const productId = parseInt(this.getAttribute("data-id"));
        const newQuantity = parseInt(this.value);
        updateItemQuantity(productId, newQuantity);
      });
    });

    document.querySelectorAll(".cart-item-remove").forEach((button) => {
      button.addEventListener("click", function () {
        const productId = parseInt(this.getAttribute("data-id"));
        removeFromCart(productId);
      });
    });
  }

  // Fungsi untuk mengurangi kuantitas item
  function decreaseQuantity(productId) {
    const itemIndex = cart.findIndex((item) => item.product.id === productId);

    if (itemIndex === -1) return;

    if (cart[itemIndex].quantity > 1) {
      cart[itemIndex].quantity -= 1;
    } else {
      // Jika kuantitas menjadi 0, hapus item dari keranjang
      cart.splice(itemIndex, 1);
    }

    updateCart();
  }

  // Fungsi untuk menambah kuantitas item
  function increaseQuantity(productId) {
    const itemIndex = cart.findIndex((item) => item.product.id === productId);

    if (itemIndex === -1) return;

    const product = products.find((p) => p.id === productId);

    // Pastikan kuantitas tidak melebihi stok yang tersedia
    if (cart[itemIndex].quantity < product.stock) {
      cart[itemIndex].quantity += 1;
      updateCart();
    } else {
      showNotification(
        `Maaf, stok ${product.name} hanya tersisa ${product.stock} item.`
      );
    }
  }

  // Fungsi untuk update kuantitas item secara langsung
  function updateItemQuantity(productId, newQuantity) {
    const itemIndex = cart.findIndex((item) => item.product.id === productId);

    if (itemIndex === -1) return;

    const product = products.find((p) => p.id === productId);

    // Validasi kuantitas
    if (newQuantity < 1) {
      newQuantity = 1;
    } else if (newQuantity > product.stock) {
      newQuantity = product.stock;
      showNotification(
        `Maaf, stok ${product.name} hanya tersisa ${product.stock} item.`
      );
    }

    cart[itemIndex].quantity = newQuantity;
    updateCart();
  }

  // Fungsi untuk menghapus item dari keranjang
  function removeFromCart(productId) {
    const itemIndex = cart.findIndex((item) => item.product.id === productId);

    if (itemIndex === -1) return;

    const product = cart[itemIndex].product;

    // Hapus item dari keranjang
    cart.splice(itemIndex, 1);

    // Update tampilan keranjang
    updateCart();

    // Tampilkan notifikasi
    showNotification(`${product.name} telah dihapus dari keranjang.`);
  }

  // Event untuk membuka modal login
  openLoginModalBtn.addEventListener("click", function () {
    loginModal.style.display = "flex";
  });

  // Event untuk menutup modal login
  closeLoginModalBtn.addEventListener("click", function () {
    loginModal.style.display = "none";
  });

  // Event untuk membuka modal keranjang
  openCartModalBtn.addEventListener("click", function () {
    renderCartItems();
    cartModal.style.display = "flex";
  });

  // Event untuk menutup modal keranjang
  closeCartModalBtn.addEventListener("click", function () {
    cartModal.style.display = "none";
  });

  // Menutup modal saat klik di luar modal
  window.addEventListener("click", function (event) {
    if (event.target === loginModal) {
      loginModal.style.display = "none";
    }
    if (event.target === cartModal) {
      cartModal.style.display = "none";
    }
  });

  // Event untuk tombol "Belanja Sekarang" di keranjang kosong
  shopNowBtn.addEventListener("click", function () {
    cartModal.style.display = "none";
  });

  // Tab switching
  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Hapus kelas active dari semua tab
      tabs.forEach((t) => t.classList.remove("active"));
      // Tambahkan kelas active ke tab yang diklik
      this.classList.add("active");

      // Dapatkan ID tab yang akan ditampilkan
      const tabId = this.getAttribute("data-tab") + "Tab";

      // Sembunyikan semua tab content
      tabContents.forEach((content) => content.classList.remove("active"));

      // Tampilkan tab content yang sesuai
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Login form submission
  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      // Panggil API login
      const userData = await loginUser({ email, password });

      // Tampilkan pesan sukses
      showNotification("Login berhasil!");

      // Sembunyikan modal login
      loginModal.style.display = "none";

      // Tampilkan dashboard
      updateUIAfterLogin();
    } catch (error) {
      // Login gagal
      alert(`Login gagal: ${error.message}`);
    }
  });

  // Register form submission
  registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Validasi password
    if (password !== confirmPassword) {
      alert("Password dan konfirmasi password tidak cocok!");
      return;
    }

    try {
      // Panggil API register
      await registerUser({ name, email, password });

      showNotification(
        "Registrasi berhasil! Silakan login dengan akun baru Anda."
      );

      // Reset form
      registerForm.reset();

      // Alihkan ke tab login
      tabs[0].click();
    } catch (error) {
      alert(`Registrasi gagal: ${error.message}`);
    }
  });

  // Fungsi untuk update UI setelah login
  function updateUIAfterLogin() {
    // Tampilkan nama pengguna
    const userName = localStorage.getItem("userName") || "Pengguna";
    userNameDisplay.textContent = userName;
    dashboardName.value = userName;
    dashboardEmail.value =
      localStorage.getItem("loginEmail") || "user@example.com";

    // Update ikon user
    openLoginModalBtn.innerHTML = '<i class="fas fa-user-check"></i>';
    openLoginModalBtn.title = "Lihat Profil";

    // Ubah event listener untuk ikon user
    openLoginModalBtn.removeEventListener("click", function () {
      loginModal.style.display = "flex";
    });

    openLoginModalBtn.addEventListener("click", function () {
      // Toggle dashboard visibility
      if (dashboard.style.display === "none") {
        mainContent.style.display = "none";
        dashboard.style.display = "block";
      } else {
        mainContent.style.display = "block";
        dashboard.style.display = "none";
      }
    });

    // Tambahkan tombol logout ke header
    const logoutBtn = document.createElement("div");
    logoutBtn.className = "user-icon";
    logoutBtn.style.marginLeft = "15px";
    logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i>';
    logoutBtn.title = "Logout";
    logoutBtn.addEventListener("click", function () {
      logout();
    });

    // Tambahkan tombol logout setelah ikon user
    if (!document.querySelector(".header-actions .fa-sign-out-alt")) {
      openLoginModalBtn.parentNode.insertBefore(
        logoutBtn,
        openLoginModalBtn.nextSibling
      );
    }
  }

  // Fungsi logout
  function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");

    // Refresh halaman untuk reset UI
    location.reload();
  }
  let selectedPaymentMethod = null;

  document.querySelectorAll(".payment-option").forEach((option) => {
    option.addEventListener("click", () => {
      // Remove 'selected' class from all
      document.querySelectorAll(".payment-option").forEach((el) => {
        el.classList.remove("selected");
      });

      // Add to clicked one
      option.classList.add("selected");

      // Store selected method
      selectedPaymentMethod = option.getAttribute("data-method");
    });
  });

  document
    .getElementById("checkoutBtn")
    .addEventListener("click", async function () {
      if (cart.length === 0) {
        showNotification("Keranjang belanja Anda kosong!");
        return;
      }

      let isAuthenticated = false;

      try {
        const response = await fetch(`${API_URL}/api/v2/user/check`, {
          method: "GET",
          credentials: "include", // Send cookies with the request
        });

        const userCheck = await response.json();

        // ✅ Use message check to determine auth
        if (response.ok && userCheck.message === "Access Passed") {
          isAuthenticated = true;
        } else {
          console.warn("User check failed:", userCheck.message);
        }
      } catch (err) {
        console.error("Error checking login status:", err);
      }

      // ❌ Not authenticated
      if (!isAuthenticated) {
        showNotification(
          "Silakan login terlebih dahulu untuk melanjutkan pembayaran."
        );
        cartModal.style.display = "none";

        setTimeout(() => {
          loginModal.style.display = "flex";
        }, 1000);

        return;
      }

      // ✅ Authenticated - Proses checkout
      const totalBelanja = cart.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );

      // ⛔ No payment selected
      if (!selectedPaymentMethod) {
        showNotification("Pilih metode pembayaran terlebih dahulu.");
        return;
      }

      alert(
        `Checkout berhasil!\n\nTotal Belanja: Rp${totalBelanja.toLocaleString(
          "id-ID"
        )}\nMetode Pembayaran: ${selectedPaymentMethod}\n\nTerima kasih telah berbelanja di GO TOOLS!`
      );

      // Clear cart
      cart = [];
      updateCart();

      // Hide cart modal
      cartModal.style.display = "none";

      // Show notification
      showNotification("Pesanan Anda sedang diproses!");
    });

  // Cek apakah pengguna sudah login sebelumnya
  if (localStorage.getItem("isLoggedIn") === "true") {
    updateUIAfterLogin();
  }

  // Load keranjang dari localStorage jika ada
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    try {
      cart = JSON.parse(savedCart);
      updateCart();
    } catch (e) {
      console.error("Error loading cart from localStorage:", e);
      cart = [];
    }
  }

  // Inisialisasi - render produk
  renderProducts(products);
});
