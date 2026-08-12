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