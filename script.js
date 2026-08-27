// SarkAura - Website Interactions
document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       BASIC ELEMENTS
    ========================= */

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.querySelector(".nav-links");

    const orderModal = document.getElementById("orderModal");
    const closeOrder = document.getElementById("closeOrder");

    const serviceSelect = document.getElementById("serviceSelect");
    const orderLink = document.getElementById("orderLink");
    const orderQuantity = document.getElementById("orderQuantity");
    const orderPrice = document.getElementById("orderPrice");
    const orderBalance = document.getElementById("orderBalance");

    const placeOrderBtn = document.getElementById("placeOrderBtn");

    const fundsModal = document.getElementById("fundsModal");
    const closeFunds = document.getElementById("closeFunds");

    const depositAmount = document.getElementById("depositAmount");
    const proceedPayBtn = document.getElementById("proceedPayBtn");

    const paymentModal = document.getElementById("paymentModal");
    const closePayment = document.getElementById("closePayment");

    const paymentAmount = document.getElementById("paymentAmount");
    const paymentTimer = document.getElementById("paymentTimer");
    const paymentExpired = document.getElementById("paymentExpired");

    const successModal = document.getElementById("successModal");
    const successTitle = document.getElementById("successTitle");
    const successMessage = document.getElementById("successMessage");
    const successCloseBtn = document.getElementById("successCloseBtn");

    const accountPage = document.getElementById("accountPage");
    const accountBalance = document.getElementById("accountBalance");
    const accountAddFunds = document.getElementById("accountAddFunds");

    const orderHistory = document.getElementById("orderHistory");
    const depositHistory = document.getElementById("depositHistory");

    const bottomNavItems =
        document.querySelectorAll(".bottom-nav-item");

    const serviceCards =
        document.querySelectorAll(".service-card");


    /* =========================
       DEMO LOCAL DATA
       =========================
       IMPORTANT:
       This is temporary frontend storage.
       Real payment + balance will later
       be moved to secure backend/database.
    */

    let balance =
        Number(localStorage.getItem("sarkaura_balance")) || 0;

    let orders =
        JSON.parse(
            localStorage.getItem("sarkaura_orders") || "[]"
        );

    let deposits =
        JSON.parse(
            localStorage.getItem("sarkaura_deposits") || "[]"
        );

    let selectedDepositAmount = 0;

    let paymentCountdown = null;


    /* =========================
       SAVE DATA
    ========================= */

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


    /* =========================
       FORMAT MONEY
    ========================= */

    function money(amount) {

        return "₹" + Number(amount).toFixed(2);

    }


    /* =========================
       UPDATE BALANCE UI
    ========================= */

    function updateBalance() {

        if (accountBalance) {

            accountBalance.textContent =
                money(balance);

        }

        if (orderBalance) {

            orderBalance.textContent =
                money(balance);

        }

    }


    /* =========================
       MOBILE MENU
    ========================= */

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


    /* =========================
       SMOOTH SCROLL
    ========================= */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            if (
                targetId &&
                targetId !== "#"
            ) {

                const target =
                    document.querySelector(targetId);

                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }

        });

    });


    /* =========================
       FAQ
    ========================= */

    document.querySelectorAll(".faq-item").forEach(function (item) {

        const question =
            item.querySelector("h3");

        const answer =
            item.querySelector("p");

        if (question && answer) {

            answer.style.display = "none";

            question.addEventListener("click", function () {

                if (
                    answer.style.display === "none"
                ) {

                    answer.style.display = "block";

                } else {

                    answer.style.display = "none";

                }

            });

        }

    });


    /* =========================
       OPEN ORDER FORM
    ========================= */

    function openOrder(serviceName = "") {

        if (!orderModal) return;

        orderModal.classList.add("active");

        if (serviceSelect && serviceName) {

            serviceSelect.value =
                serviceName;

        }

        updateOrderPrice();

        updateBalance();

    }


    /* =========================
       SERVICE CARD BUTTONS
    ========================= */

    serviceCards.forEach(function (card) {

        const button =
            card.querySelector(".order-btn");

        if (!button) return;

        button.addEventListener("click", function () {

            const service =
                card.dataset.service || "";

            openOrder(service);

        });

    });


    /* =========================
       MAIN ORDER BUTTON
    ========================= */

    const mainOrderBtn =
        document.getElementById("mainOrderBtn");

    if (mainOrderBtn) {

        mainOrderBtn.addEventListener("click", function () {

            openOrder();

        });

    }


    /* =========================
       CLOSE ORDER
    ========================= */

    if (closeOrder) {

        closeOrder.addEventListener("click", function () {

            orderModal.classList.remove("active");

        });

    }


    if (orderModal) {

        orderModal.addEventListener("click", function (event) {

            if (event.target === orderModal) {

                orderModal.classList.remove("active");

            }

        });

    }


    /* =========================
       PRICE CALCULATION
       PRICE IS PER 1000
    ========================= */

    function updateOrderPrice() {

        if (
            !serviceSelect ||
            !orderQuantity ||
            !orderPrice
        ) return;


        const selectedOption =
            serviceSelect.options[
                serviceSelect.selectedIndex
            ];


        if (!selectedOption) {

            orderPrice.textContent =
                "0.00";

            return;

        }


        const pricePer1000 =
            Number(
                selectedOption.dataset.price
            ) || 0;


        const quantity =
            Number(orderQuantity.value) || 0;


        const total =
            (quantity / 1000) *
            pricePer1000;


        orderPrice.textContent =
            total.toFixed(2);

    }


    if (serviceSelect) {

        serviceSelect.addEventListener(
            "change",
            updateOrderPrice
        );

    }


    if (orderQuantity) {

        orderQuantity.addEventListener(
            "input",
            updateOrderPrice
        );

    }


    /* =========================
       ADD FUNDS
    ========================= */

    function openFunds() {

        if (!fundsModal) return;

        fundsModal.classList.add("active");

    }


    bottomNavItems.forEach(function (item) {

        item.addEventListener("click", function () {

            const page =
                this.dataset.page;


            bottomNavItems.forEach(function (nav) {

                nav.classList.remove("active");

            });

            this.classList.add("active");


            if (page === "home") {

                if (accountPage) {

                    accountPage.style.display =
                        "none";

                }

                document
                    .getElementById("home")
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });

            }


            if (page === "services") {

                if (accountPage) {

                    accountPage.style.display =
                        "none";

                }

                document
                    .getElementById("services")
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });

            }


            if (page === "funds") {

                openFunds();

            }


            if (page === "account") {

                if (accountPage) {

                    accountPage.style.display =
                        "block";

                    accountPage.scrollIntoView({
                        behavior: "smooth"
                    });

                }

                renderOrderHistory();

                renderDepositHistory();

            }

        });

    });


    /* =========================
       CLOSE FUNDS
    ========================= */

    if (closeFunds) {

        closeFunds.addEventListener("click", function () {

            fundsModal.classList.remove("active");

        });

    }


    if (fundsModal) {

        fundsModal.addEventListener("click", function (event) {

            if (event.target === fundsModal) {

                fundsModal.classList.remove("active");

            }

        });

    }


    /* =========================
       ACCOUNT ADD FUNDS
    ========================= */

    if (accountAddFunds) {

        accountAddFunds.addEventListener(
            "click",
            openFunds
        );

    }


    /* =========================
       PROCEED TO PAYMENT
    ========================= */

    if (proceedPayBtn) {

        proceedPayBtn.addEventListener("click", function () {

            const amount =
                Number(depositAmount.value);


            if (
                !amount ||
                amount <= 0
            ) {

                alert(
                    "Please enter a valid amount."
                );

                return;

            }


            selectedDepositAmount =
                Number(amount.toFixed(2));


            fundsModal.classList.remove(
                "active"
            );


            openPaymentPage(
                selectedDepositAmount
            );

        });

    }


    /* =========================
       PAYMENT PAGE
    ========================= */

    function openPaymentPage(amount) {

        if (!paymentModal) return;


        paymentModal.classList.add(
            "active"
        );


        if (paymentAmount) {

            paymentAmount.textContent =
                money(amount);

        }


        if (paymentExpired) {

            paymentExpired.style.display =
                "none";

        }


        startPaymentTimer();

    }


    /* =========================
       5 MINUTE TIMER
    ========================= */

    function startPaymentTimer() {

        clearInterval(
            paymentCountdown
        );


        let seconds = 5 * 60;


        if (paymentTimer) {

            paymentTimer.textContent =
                "05:00";

        }


        paymentCountdown =
            setInterval(function () {

                seconds--;


                const minutes =
                    Math.floor(
                        seconds / 60
                    );


                const remainingSeconds =
                    seconds % 60;


                if (paymentTimer) {

                    paymentTimer.textContent =
                        String(minutes).padStart(2, "0")
                        + ":" +
                        String(
                            remainingSeconds
                        ).padStart(2, "0");

                }


                if (seconds <= 0) {

                    clearInterval(
                        paymentCountdown
                    );


                    if (paymentTimer) {

                        paymentTimer.textContent =
                            "00:00";

                    }


                    if (paymentExpired) {

                        paymentExpired.style.display =
                            "block";

                    }

                }

            }, 1000);

    }


    /* =========================
       CLOSE PAYMENT
    ========================= */

    if (closePayment) {

        closePayment.addEventListener("click", function () {

            clearInterval(
                paymentCountdown
            );

            paymentModal.classList.remove(
                "active"
            );

        });

    }


    /* =========================
       DEMO PAYMENT SUCCESS
       =========================

       Temporary only.

       Real payment verification
       will replace this section.
    */

    function depositSuccess(amount) {

        balance += amount;


        const deposit = {

            id:
                "DEP-" +
                Date.now(),

            amount:
                amount,

            status:
                "success",

            date:
                new Date().toLocaleString()

        };


        deposits.unshift(
            deposit
        );


        saveData();

        updateBalance();

        renderDepositHistory();


        showSuccess(
            "Deposit Successful",
            "Your balance has been updated successfully."
        );

    }


    /* =========================
       TEMPORARY PAYMENT TEST
    =========================

       Double-click on payment amount
       to test success during development.

       This MUST NOT be used as real
       payment verification.
    */

    if (paymentAmount) {

        paymentAmount.addEventListener(
            "dblclick",
            function () {

                if (
                    selectedDepositAmount > 0
                ) {

                    clearInterval(
                        paymentCountdown
                    );

                    paymentModal.classList.remove(
                        "active"
                    );

                    depositSuccess(
                        selectedDepositAmount
                    );

                }

            }
        );

    }


    /* =========================
       PLACE ORDER
    ========================= */

    if (placeOrderBtn) {

        placeOrderBtn.addEventListener("click", function () {

            const service =
                serviceSelect.value.trim();


            const link =
                orderLink.value.trim();


            const quantity =
                Number(
                    orderQuantity.value
                );


            const selectedOption =
                serviceSelect.options[
                    serviceSelect.selectedIndex
                ];


            const pricePer1000 =
                Number(
                    selectedOption?.dataset.price
                ) || 0;


            const total =
                (quantity / 1000) *
                pricePer1000;


            if (!service) {

                alert(
                    "Please select a service."
                );

                return;

            }


            if (!link) {

                alert(
                    "Please enter your Instagram link."
                );

                return;

            }


            if (
                !quantity ||
                quantity <= 0
            ) {

                alert(
                    "Please enter a valid quantity."
                );

                return;

            }


            if (total <= 0) {

                alert(
                    "Invalid order amount."
                );

                return;

            }


            if (balance < total) {

                alert(
                    "Insufficient balance. Please add funds first."
                );

                return;

            }


            const order = {

                id:
                    "ORD-" +
                    Date.now(),

                service:
                    service,

                link:
                    link,

                quantity:
                    quantity,

                amount:
                    Number(
                        total.toFixed(2)
                    ),

                status:
                    "pending",

                date:
                    new Date().toLocaleString()

            };


            balance -= total;


            orders.unshift(
                order
            );


            saveData();

            updateBalance();

            renderOrderHistory();


            orderModal.classList.remove(
                "active"
            );


            showSuccess(
                "Order Successful",
                "Your service will be delivered within 24 hours."
            );


            /*
                Later:
                Secure backend will send
                the order details to your
                WhatsApp automatically.
            */

        });

    }


    /* =========================
       SUCCESS MESSAGE
    ========================= */

    function showSuccess(title, message) {

        if (!successModal) return;


        if (successTitle) {

            successTitle.textContent =
                title;

        }


        if (successMessage) {

            successMessage.textContent =
                message;

        }


        successModal.classList.add(
            "active"
        );

    }


    if (successCloseBtn) {

        successCloseBtn.addEventListener(
            "click",
            function () {

                successModal.classList.remove(
                    "active"
                );

                renderOrderHistory();

                renderDepositHistory();

            }
        );

    }


    /* =========================
       ORDER HISTORY
    ========================= */

    function renderOrderHistory() {

        if (!orderHistory) return;


        if (!orders.length) {

            orderHistory.innerHTML =
                '<div class="empty-history">No orders yet.</div>';

            return;

        }


        orderHistory.innerHTML =
            orders.map(function (order) {

                return `

                <div class="history-item">

                    <h4>
                        ${escapeHtml(order.service)}
                    </h4>

                    <p>
                        Quantity:
                        ${Number(order.quantity).toLocaleString()}
                    </p>

                    <p>
                        Amount:
                        ${money(order.amount)}
                    </p>

                    <
