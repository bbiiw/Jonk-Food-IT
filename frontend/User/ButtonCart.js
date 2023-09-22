// Cart.Html

let quantityValue = 0; // Initialize the quantity value

function updateQuantityDisplay(id, value) {
  document.getElementById(id).textContent = value;
}

function incrementQuantity(id) {
  let quantityValue = parseInt(document.getElementById(id).textContent);
  quantityValue++;
  updateQuantityDisplay(id, quantityValue);
}

function decrementQuantity(id) {
  let quantityValue = parseInt(document.getElementById(id).textContent);
  if (quantityValue > 0) {
    quantityValue--;
    updateQuantityDisplay(id, quantityValue);
  }
}

// Attach event listeners to the buttons
document.getElementById("decrementButton").addEventListener("click", decrementQuantity);
document.getElementById("incrementButton").addEventListener("click", incrementQuantity);

// Initialize the quantity display
updateQuantityDisplay();

