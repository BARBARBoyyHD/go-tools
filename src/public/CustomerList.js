document.addEventListener("DOMContentLoaded", async () => {
  const API_URL = "http://localhost:5000";

  try {
    const response = await fetch(`${API_URL}/api/v1/customer/list`);
    const customers = await response.json();
    const customerList = customers.data;

    const tbody = document.querySelector("#customerTable tbody");

    customerList.forEach((cust, index) => {
      const row = document.createElement("tr");
      const createdDate = moment(cust.created_at).format("LL");

      row.innerHTML = `
        <td>${cust.id || index + 1}</td>
        <td>${cust.name}</td>
        <td>${cust.email}</td>
        <td>${cust.role || "-"}</td>
        <td>${cust.phone || "-"}</td>
        <td>${cust.address || "-"}</td>
        <td>${createdDate}</td>
      `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading customer data", error);
  }
});
