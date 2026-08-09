// ==============================
// Logged In User
// ==============================

const user = JSON.parse(localStorage.getItem("user"));

// Customer Name Auto Fill
if (user) {
    document.getElementById("customerName").value = user.name;
}

const checkoutForm = document.getElementById("checkoutForm");

// ==============================
// Checkout Submit
// ==============================

checkoutForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    if (!user) {

        alert("Please Login First!");

        window.location.href = "login.html";

        return;

    }

    // Cart Data
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {

        alert("Your Cart is Empty!");

        return;

    }

    // Form Data
    const address = document.getElementById("address").value.trim();

    const phone = document.getElementById("phone").value.trim();

    const paymentMethod = document.getElementById("paymentMethod").value;

    // Total Amount
    let totalAmount = 0;

    cart.forEach(item => {

        totalAmount += item.price * item.quantity;

    });

    // ==============================
    // PhonePe Demo Payment
    // ==============================

    if (paymentMethod === "PHONEPE") {

        localStorage.setItem("checkoutData", JSON.stringify({

            user: user.id,

            customerName: user.name,

            items: cart,

            totalAmount,

            address,

            phone,

            paymentMethod

        }));

        localStorage.setItem("totalAmount", totalAmount);

        window.location.href = "phonepe.html";

        return;

    }

    // ==============================
    // Cash On Delivery
    // ==============================

    try {

        const response = await fetch(

            "http://localhost:5000/api/orders/place",

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    user: user.id,

                    customerName: user.name,

                    items: cart,

                    totalAmount,

                    address,

                    phone,

                    paymentMethod

                })

            }

        );

        const data = await response.json();

        if (data.success) {

            alert("🎉 Order Placed Successfully!");

            localStorage.removeItem("cart");

            window.location.href = "payment-success.html";

        } else {

            alert(data.message);

        }

    } catch (err) {

        console.log(err);

        alert("Server Error!");

    }

});