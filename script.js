// SarkAura - Website Interactions

document.addEventListener("DOMContentLoaded", function () {

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (targetId !== "#") {
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


    // FAQ open / close
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


    // Order button feedback
    document.querySelectorAll(".order-btn").forEach(function (button) {

        button.addEventListener("click", function () {

            console.log("SarkAura order/enquiry button clicked.");

        });

    });

});
// Mobile menu

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
// Order popup

const orderModal = document.getElementById("orderModal");
const closeOrder = document.getElementById("closeOrder");
const serviceSelect = document.getElementById("serviceSelect");
const dmOrderBtn = document.getElementById("dmOrderBtn");

document.querySelectorAll(".order-btn").forEach(function (button) {

    button.addEventListener("click", function (event) {

        event.preventDefault();

        orderModal.classList.add("active");

    });

});

if (closeOrder) {

    closeOrder.addEventListener("click", function () {

        orderModal.classList.remove("active");

    });

}

if (dmOrderBtn) {

    dmOrderBtn.addEventListener("click", function () {

        const service = serviceSelect.value;

        if (!service) {
            alert("Please select a service first.");
            return;
        }

        const message =
            "Hello SarkAura 👋%0A" +
            "I am interested in: " + encodeURIComponent(service);

        window.open(
            "https://ig.me/m/harshyaduvancii",
            "_blank"
        );

    });

                }
