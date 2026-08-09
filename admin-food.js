// ==============================
// Royal Stay Hotel Admin Food
// ==============================

const foodForm = document.getElementById("foodForm");
let editFoodId = null;

// ==============================
// Add / Update Food
// ==============================

foodForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const food = {

        name: document.getElementById("foodName").value,
        category: document.getElementById("foodCategory").value,
        price: document.getElementById("foodPrice").value,
        image: document.getElementById("foodImage").value,
        description: document.getElementById("foodDescription").value

    };

    try {

        const url = editFoodId
            ? `http://localhost:5000/api/foods/update/${editFoodId}`
            : "http://localhost:5000/api/foods/add";

        const method = editFoodId ? "PUT" : "POST";

        const response = await fetch(url, {

            method,

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(food)

        });

        const data = await response.json();

        if (data.success) {

            alert(editFoodId ? "✅ Food Updated Successfully" : "✅ Food Added Successfully");

            foodForm.reset();

            editFoodId = null;

            document.getElementById("submitBtn").innerText = "Add Food";

            loadFoods();

        } else {

            alert(data.message);

        }

    } catch (err) {

        console.log(err);

        alert("Server Error");

    }

});

// ==============================
// Load Foods
// ==============================

async function loadFoods() {

    try {

        const response = await fetch("http://localhost:5000/api/foods");

        const data = await response.json();

        if (data.success) {

            displayFoods(data.foods);

        }

    } catch (err) {

        console.log(err);

    }

}

// ==============================
// Display Foods
// ==============================

function displayFoods(foods) {

    const container = document.getElementById("foodContainer");

    container.innerHTML = "";

    foods.forEach(food => {

        container.innerHTML += `

        <div class="food-card">

            <img src="${food.image}" alt="${food.name}">

            <div class="food-info">

                <h3>${food.name}</h3>

                <p><b>Category:</b> ${food.category}</p>

                <p><b>Price:</b> ₹${food.price}</p>

                <p>${food.description}</p>

                <div class="food-actions">

                    <button class="edit-btn"
                    onclick="editFood('${food._id}')">

                    Edit

                    </button>

                    <button class="delete-btn"
                    onclick="deleteFood('${food._id}')">

                    Delete

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

// ==============================
// Delete Food
// ==============================

async function deleteFood(id) {

    if (!confirm("Delete this food?")) return;

    try {

        const response = await fetch(

            `http://localhost:5000/api/foods/delete/${id}`,

            {
                method: "DELETE"
            }

        );

        const data = await response.json();

        if (data.success) {

            alert("Food Deleted Successfully");

            loadFoods();

        }

    } catch (err) {

        console.log(err);

    }

}

// ==============================
// Edit Food
// ==============================

async function editFood(id) {

    try {

        const response = await fetch("http://localhost:5000/api/foods");

        const data = await response.json();

        const food = data.foods.find(item => item._id === id);

        if (!food) return;

        document.getElementById("foodName").value = food.name;
        document.getElementById("foodCategory").value = food.category;
        document.getElementById("foodPrice").value = food.price;
        document.getElementById("foodImage").value = food.image;
        document.getElementById("foodDescription").value = food.description;

        editFoodId = id;

        document.getElementById("submitBtn").innerHTML =
        '<i class="fa-solid fa-pen"></i> Update Food';

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } catch (err) {

        console.log(err);

    }

}

// ==============================
// Logout
// ==============================

function logout() {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "login.html";

}

// ==============================
// Load All Foods
// ==============================

loadFoods();