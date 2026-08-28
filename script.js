const SUPABASE_URL = "https://xikxviwdkfccfkebdwye.supabase.co";
const SUPABASE_KEY = "sb_publishable_eZD2D4vPSDcFYZo8es-vWA_3zZEcwCw_";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

console.log("Supabase connected:", supabaseClient);


// ================================
// SarkAura - Main Script
// ================================

document.addEventListener("DOMContentLoaded", function () {

    // ================================
    // CUSTOM ALERT
    // ================================

    const customAlert = document.getElementById("customAlert");
    const customAlertTitle = document.getElementById("customAlertTitle");
    const customAlertMessage = document.getElementById("customAlertMessage");
    const customAlertIcon = document.getElementById("customAlertIcon");
    const customAlertBtn = document.getElementById("customAlertBtn");

    window.showAlert = function (
        message,
        title = "Notice",
        icon = "⚠️"
    ) {

        if (!customAlert) return;

        if (customAlertTitle) {
            customAlertTitle.textContent = title;
        }

        if (customAlertMessage) {
            customAlertMessage.textContent = message;
        }

        if (customAlertIcon) {
            customAlertIcon.textContent = icon;
        }

        customAlert.classList.add("active");
    };


    if (customAlertBtn) {

        customAlertBtn.addEventListener("click", function () {

            customAlert.classList.remove("active");

        });

    }


    // ================================
    // DATA
    // ================================

    const servicePrices = {
        "Reels Views": 1,
        "Photo / Carousel Views": 4,
        "Indian Followers - Low Drop": 70,
        "Indian Followers - Real Accounts": 100,
        "Instagram Shares": 5,
        "Instagram Repost": 100,
        "Reach + Impressions": 6,
        "Instagram Likes": 15,
        "Trending Indian Comments": 64,
        "Custom Comments": 125,
        "Instagram Saves": 25,
        "Views Only": 4
    };


    let balance = Number(
        localStorage.getItem("sarkaura_balance") || 0
    );

    let orders = JSON.parse(
        localStorage.getItem("sarkaura_orders") || "[]"
    );

    let deposits = JSON.parse(
        localStorage.getItem("sarkaura_deposits") || "[]"
    );

    let paymentTimerInterval = null;


    // ================================
    // ELEMENTS
    // ================================

    const orderModal = document.getElementById("orderModal");
    const fundsModal = document.getElementById("fundsModal");
    const paymentModal = document.getElementById("paymentModal");
    const successModal = document.getElementById("successModal");

    const closeOrder = document.getElementById("closeOrder");
    const closeFunds = document.getElementById("closeFunds");
    const closePayment = document.getElementById("closePayment");
    const successCloseBtn = document.getElementById("successCloseBtn");

    const serviceSelect = document.getElementById("serviceSelect");
    const orderLink = document.getElementById("orderLink");
    const orderQuantity = document.getElementById("orderQuantity");
    const orderPrice = document.getElementById("orderPrice");
    const orderBalance = document.getElementById("orderBalance");
    const placeOrderBtn = document.getElementById("placeOrderBtn");

    const depositAmount = document.getElementById("depositAmount");
    const proceedPayBtn = document.getElementById("proceedPayBtn");

    const paymentAmount = document.getElementById("paymentAmount");
    const paymentTimer = document.getElementById("paymentTimer");
    const paymentExpired = document.getElementById("paymentExpired");

    const accountBalance = document.getElementById("accountBalance");
    const orderHistory = document.getElementById("orderHistory");
    const depositHistory = document.getElementById("depositHistory");

    const mainWebsite = document.getElementById("mainWebsite");
    const accountPage = document.getElementById("accountPage");


    // ================================
    // AUTH ELEMENTS
    // ================================

    const accountBtn = document.getElementById("accountBtn");
    const accountEmail = document.getElementById("accountEmail");
    const logoutBtn = document.getElementById("logoutBtn");

    const authModal = document.getElementById("authModal");
    const authClose = document.getElementById("authClose");

    const authTitle = document.getElementById("authTitle");
    const authSubtitle = document.getElementById("authSubtitle");

    const authEmail = document.getElementById("authEmail");
    const authPassword = document.getElementById("authPassword");

    const authSubmit = document.getElementById("authSubmit");

    const authSwitch = document.getElementById("authSwitch");
    const authSwitchText = document.getElementById("authSwitchText");

    let authMode = "login";


    // ================================
    // SAVE DATA
    // ================================

    function saveData() {

        localStorage.setItem(
            "sarkaura_balance",
            balance.toFixed(2)
        );

        localStorage.setItem(
            "sarkaura_orders",
            JSON.stringify(orders)
        );

        localStorage.setItem(
            "sarkaura_deposits",
            JSON.stringify(deposits)
        );

    }


    // ================================
    // UPDATE BALANCE
    // ================================

    function updateBalance() {

        if (accountBalance) {
            accountBalance.textContent =
                balance.toFixed(2);
        }

        if (orderBalance) {
            orderBalance.textContent =
                balance.toFixed(2);
        }

    }


    // ================================
    // FAQ
    // ================================

    document.querySelectorAll(".faq-item").forEach(function (item) {

        const question = item.querySelector("h3");
        const answer = item.querySelector("p");

        if (question && answer) {

            answer.style.display = "none";

            question.addEventListener("click", function () {

                answer.style.display =
                    answer.style.display === "none"
                        ? "block"
                        : "none";

            });

        }

    });


    // ================================
    // MOBILE MENU
    // ================================

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


    // ================================
    // ORDER
    // ================================

    window.openOrder = function (service = "") {

        if (!orderModal) return;

        orderModal.classList.add("active");

        if (serviceSelect && service) {
            serviceSelect.value = service;
        }

        updatePrice();
        updateBalance();

    };


    if (closeOrder) {

        closeOrder.addEventListener("click", function () {

            orderModal.classList.remove("active");

        });

    }


    // ================================
    // PRICE
    // ================================

    function updatePrice() {

        if (!serviceSelect ||
            !orderQuantity ||
            !orderPrice) return;

        const service = serviceSelect.value;
        const quantity = Number(orderQuantity.value);

        const pricePer1K =
            servicePrices[service] || 0;

        if (!quantity || quantity <= 0) {

            orderPrice.textContent = "0.00";
            return;

        }

        const total =
            (quantity / 1000) * pricePer1K;

        orderPrice.textContent =
            total.toFixed(2);

    }


    if (serviceSelect) {
        serviceSelect.addEventListener(
            "change",
            updatePrice
        );
    }


    if (orderQuantity) {
        orderQuantity.addEventListener(
            "input",
            updatePrice
        );
    }


    // ================================
    // PLACE ORDER
    // ================================

    if (placeOrderBtn) {

        placeOrderBtn.addEventListener(
            "click",
            function () {

                const service =
                    serviceSelect ? serviceSelect.value : "";

                const link =
                    orderLink ? orderLink.value.trim() : "";

                const quantity =
                    orderQuantity ? Number(orderQuantity.value) : 0;

                const pricePer1K =
                    servicePrices[service] || 0;

                const total =
                    (quantity / 1000) * pricePer1K;


                if (!service) {

                    showAlert(
                        "Please select a service.",
                        "Select Service",
                        "🛒"
                    );

                    return;
                }


                if (!link) {

                    showAlert(
                        "Please enter the Instagram link.",
                        "Link Required",
                        "🔗"
                    );

                    return;
                }


                if (!quantity || quantity <= 0) {

                    showAlert(
                        "Please enter a valid quantity.",
                        "Invalid Quantity",
                        "🔢"
                    );

                    return;
                }


                if (total <= 0) {

                    showAlert(
                        "The order amount is invalid.",
                        "Invalid Amount",
                        "⚠️"
                    );

                    return;
                }


                if (balance < total) {

                    showAlert(
                        "Your balance is too low. Please add funds first.",
                        "Insufficient Balance",
                        "💰"
                    );

                    return;
                }


                balance -= total;


                orders.unshift({

                    id: "ORD-" + Date.now(),

                    service: service,

                    link: link,

                    quantity: quantity,

                    amount: Number(total.toFixed(2)),

                    status: "Pending",

                    date: new Date().toLocaleString()

                });


                saveData();
                updateBalance();
                renderHistory();


                if (orderModal) {
                    orderModal.classList.remove("active");
                }


                showSuccess(
                    "Order Successful",
                    "Your service order has been placed successfully. Your service will be delivered within 24 hours."
                );

            }
        );

    }


    // ================================
    // FUNDS
    // ================================

    function openFunds() {

        if (!fundsModal) return;

        fundsModal.classList.add("active");

        if (depositAmount) {
            depositAmount.value = "";
        }

    }


    const accountAddFunds =
        document.getElementById("accountAddFunds");


    if (accountAddFunds) {

        accountAddFunds.addEventListener(
            "click",
            openFunds
        );

    }


    document.querySelectorAll(
        '[data-page="funds"]'
    ).forEach(function (button) {

        button.addEventListener(
            "click",
            openFunds
        );

    });


    if (closeFunds) {

        closeFunds.addEventListener(
            "click",
            function () {

                fundsModal.classList.remove("active");

            }
        );

    }


    // ================================
    // PAYMENT
    // ================================

    if (proceedPayBtn) {

        proceedPayBtn.addEventListener(
            "click",
            function () {

                const amount =
                    depositAmount
                        ? Number(depositAmount.value)
                        : 0;


                if (!amount || amount <= 9) {

                    showAlert(
                        "Please enter a valid amount.",
                        "Invalid Amount",
                        "💰"
                    );

                    return;
                }


                const deposit = {

                    id: "DEP-" + Date.now(),

                    amount: Number(
                        amount.toFixed(2)
                    ),

                    status: "Pending",

                    date: new Date().toLocaleString()

                };


                deposits.unshift(deposit);

                saveData();

                if (fundsModal) {
                    fundsModal.classList.remove("active");
                }

                openPayment(
                    amount,
                    deposit.id
                );

            }
        );

    }


    function openPayment(amount, depositId) {

        if (!paymentModal) return;

        paymentModal.classList.add("active");

        if (paymentAmount) {
            paymentAmount.textContent =
                amount.toFixed(2);
        }

        if (paymentExpired) {
            paymentExpired.style.display = "none";
        }

        startPaymentTimer(depositId);

    }


    function startPaymentTimer(depositId) {

        stopPaymentTimer();

        let remaining = 5 * 60;

        if (paymentTimer) {
            paymentTimer.textContent = "05:00";
        }

        paymentTimerInterval =
            setInterval(function () {

                remaining--;

                const minutes =
                    Math.floor(remaining / 60);

                const seconds =
                    remaining % 60;


                if (paymentTimer) {

                    paymentTimer.textContent =
                        String(minutes).padStart(2, "0")
                        + ":" +
                        String(seconds).padStart(2, "0");

                }


                if (remaining <= 0) {

                    stopPaymentTimer();

                    if (paymentExpired) {
                        paymentExpired.style.display = "block";
                    }

                }

            }, 1000);

    }


    function stopPaymentTimer() {

        if (paymentTimerInterval) {

            clearInterval(paymentTimerInterval);

            paymentTimerInterval = null;

        }

    }


    if (closePayment) {

        closePayment.addEventListener(
            "click",
            function () {

                paymentModal.classList.remove("active");

                stopPaymentTimer();

            }
        );

    }


    // ================================
    // SUCCESS
    // ================================

    function showSuccess(title, message) {

        const successTitle =
            document.getElementById("successTitle");

        const successMessage =
            document.getElementById("successMessage");


        if (successTitle) {
            successTitle.textContent = title;
        }

        if (successMessage) {
            successMessage.textContent = message;
        }

        if (successModal) {
            successModal.classList.add("active");
        }

    }


    if (successCloseBtn) {

        successCloseBtn.addEventListener(
            "click",
            function () {

                successModal.classList.remove("active");

            }
        );

    }


    // ================================
    // HISTORY
    // ================================

    function renderHistory() {

        if (orderHistory) {

            if (orders.length === 0) {

                orderHistory.innerHTML =
                    '<div class="empty-history">No orders yet.</div>';

            } else {

                orderHistory.innerHTML =
                    orders.map(function (order) {

                        const statusClass =
                            String(order.status).toLowerCase();

                        return `
                            <div class="history-item">

                                <div class="history-top">

                                    <div class="history-service">
                                        ${escapeHTML(order.service)}
                                    </div>

                                    <div class="history-status ${statusClass}">
                                        ${escapeHTML(order.status)}
                                    </div>

                                </div>

                                <div class="history-details">

                                    Quantity:
                                    ${Number(order.quantity).toLocaleString()}

                                    <br>

                                    Amount:
                                    ₹${Number(order.amount).toFixed(2)}

                                    <br>

                                    Link:
                                    ${escapeHTML(order.link)}

                                    <br>

                                    ${escapeHTML(order.date)}

                                </div>

                            </div>
                        `;

                    }).join("");

            }

        }


        if (depositHistory) {

            if (deposits.length === 0) {

                depositHistory.innerHTML =
                    '<div class="empty-history">No deposits yet.</div>';

            } else {

                depositHistory.innerHTML =
                    deposits.map(function (deposit) {

                        const statusClass =
                            String(deposit.status).toLowerCase();

                        return `
                            <div class="history-item">

                                <div class="history-top">

                                    <div class="history-service">
                                        Deposit
                                    </div>

                                    <div class="history-status ${statusClass}">
                                        ${escapeHTML(deposit.status)}
                                    </div>

                                </div>

                                <div class="history-details">

                                    Amount:
                                    ₹${Number(deposit.amount).toFixed(2)}

                                    <br>

                                    ${escapeHTML(deposit.date)}

                                </div>

                            </div>
                        `;

                    }).join("");

            }

        }

    }


    // ================================
    // ESCAPE HTML
    // ================================

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    // ================================
    // BOTTOM NAVIGATION
    // ================================

    const bottomItems =
        document.querySelectorAll(".bottom-nav-item");


    bottomItems.forEach(function (item) {

        item.addEventListener(
            "click",
            async function () {

                
