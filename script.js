// SarkAura - Website Interactions

document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // Smooth Scrolling
    // =========================

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (targetId && targetId !== "#") {

                const target = document.querySelector(targetId);

                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }

        });

    });


    // =========================
    // FAQ
    // =========================

    document.querySelectorAll(".faq-item").forEach(function (item) {

        const question = item.querySelector("h3");
        const answer = item.querySelector("p");

        if (question && answer) {

            answer.style.display = "none";
            question.style.cursor = "pointer";

            question.addEventListener("click", function () {

                if (answer.style.display === "none") {

                    answer.style.display = "block";

                } else {

                    answer.style.display = "none";

                }

            });

        }

    });


    // =========================
    // Mobile Menu
    // =========================

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", function () {

            navLinks.classList.toggle("active");

        });

        navLinks.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("active");

            });

        });

    }

// =========================
// Order Popup
// =========================

const orderModal = document.getElementById("orderModal");
const closeOrder = document.getElementById("closeOrder");
const serviceSelect = document.getElementById("serviceSelect");
const dmOrderBtn = document.getElementById("dmOrderBtn");
const mainOrderBtn = document.getElementById("mainOrderBtn");


// Open Order Popup

if (mainOrderBtn && orderModal) {

    mainOrderBtn.addEventListener("click", function () {

        orderModal.classList.add("active");

    });

}


// Close button

if (closeOrder && orderModal) {

    closeOrder.addEventListener("click", function () {

        orderModal.classList.remove("active");

    });

}


// Close when clicking outside

if (orderModal) {

    orderModal.addEventListener("click", function (event) {

        if (event.target === orderModal) {

            orderModal.classList.remove("active");

        }

    });

}


// Continue to Instagram

if (dmOrderBtn && serviceSelect) {

    dmOrderBtn.addEventListener("click", function () {

        const service = serviceSelect.value;

        if (!service) {

            alert("Please select a service first.");

            return;

        }

        window.open(
            "https://ig.me/m/harshyaduvancii",
            "_blank"
        );

    });

}

});
