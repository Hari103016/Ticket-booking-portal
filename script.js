const events = [
    { id: 1, title: "Live Concert", date: "2025-06-10", location: "Delhi", available: 20, price: 499 },
    { id: 2, title: "Comedy Show", date: "2025-07-05", location: "Mumbai", available: 15, price: 299 },
    { id: 3, title: "Movie Premiere", date: "2025-06-25", location: "Chennai", available: 10, price: 399 }
  ];
  
  const renderEvents = () => {
    const container = document.getElementById("eventsList");
    container.innerHTML = "";
  
    events.forEach(event => {
      const col = document.createElement("div");
      col.className = "col-md-4";
      col.innerHTML = `
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">${event.title}</h5>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p><strong>Price:</strong> ₹${event.price}</p>
            <p><strong>Available:</strong> ${event.available} tickets</p>
            <input type="number" id="qty-${event.id}" min="1" max="${event.available}" placeholder="Qty" class="form-control mb-2"/>
            <button class="btn btn-primary w-100" onclick="addToCart(${event.id})">Add to Cart</button>
          </div>
        </div>
      `;
      container.appendChild(col);
    });
  };
  
  const addToCart = (eventId) => {
    const qty = parseInt(document.getElementById(`qty-${eventId}`).value);
    if (!qty || qty <= 0) return showToast("❌ Enter a valid quantity!");
  
    const event = events.find(e => e.id === eventId);
    if (!event || event.available < qty) return showToast("❌ Not enough tickets!");
  
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...event, quantity: qty });
    localStorage.setItem("cart", JSON.stringify(cart));
    showToast(`✅ Added ${qty} ticket(s) for ${event.title} to cart`);
  };
  
  const showToast = (msg) => {
    const toastEl = document.createElement("div");
    toastEl.className = "toast align-items-center text-bg-dark border-0 show";
    toastEl.role = "alert";
    toastEl.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">${msg}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" onclick="this.parentElement.parentElement.remove()"></button>
      </div>
    `;
    document.getElementById("toast").appendChild(toastEl);
    setTimeout(() => toastEl.remove(), 3000);
  };
  
  document.addEventListener("DOMContentLoaded", renderEvents);
  