// ==============================
// Royal Stay Hotel Admin Dashboard
// ==============================

async function loadDashboard() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/order/dashboard"
        );

        const data = await response.json();

        if (data.success) {

            document.getElementById("totalFoods").innerText =
                data.stats.totalFoods;

            document.getElementById("totalOrders").innerText =
                data.stats.totalOrders;

            document.getElementById("totalUsers").innerText =
                data.stats.totalUsers;

            document.getElementById("totalRevenue").innerText =
                "₹" + data.stats.totalRevenue;

        } else {

            alert(data.message);

        }

    } catch (err) {

        console.log(err);

        alert("Server Error");

    }

}

// ==============================
// Load Dashboard
// ==============================

loadDashboard();

// ==============================
// Load Recent Orders
// ==============================

async function loadRecentOrders(){

    try{

        const response = await fetch("http://localhost:5000/api/order/all");

        const data = await response.json();

        if(data.success){

            const tbody = document.getElementById("recentOrders");

            tbody.innerHTML = "";

            data.orders.slice(0,5).forEach(order=>{

                tbody.innerHTML += `

                <tr>

                    <td>${order.customerName}</td>

                    <td>${order.phone}</td>

                    <td>₹${order.totalAmount}</td>

                    <td>${order.orderStatus}</td>

                </tr>

                `;

            });

        }

    }catch(err){

        console.log(err);

    }

}

loadRecentOrders();

// ==============================
// Sales Chart
// ==============================

async function loadSalesChart() {

    try {

        const response = await fetch("http://localhost:5000/api/order/dashboard");

        const data = await response.json();

        if (data.success) {

            const revenue = data.stats.totalRevenue;

            const ctx = document.getElementById("salesChart");

            new Chart(ctx, {

                type: "bar",

                data: {

                    labels: ["Revenue"],

                    datasets: [

                        {

                            label: "Total Revenue",

                            data: [revenue],

                            backgroundColor: [

                                "#c62828"

                            ],

                            borderRadius: 10

                        }

                    ]

                },

                options: {

                    responsive: true,

                    plugins: {

                        legend: {

                            display: false

                        }

                    },

                    scales: {

                        y: {

                            beginAtZero: true

                        }

                    }

                }

            });

        }

    } catch (err) {

        console.log(err);

    }

}

loadSalesChart();