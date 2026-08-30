// ================================
// SarkAura - Main Script
// ================================

document.addEventListener("DOMContentLoaded", function () {

    // ================================
    // CUSTOM ALERT POPUP
    // ================================

    const customAlert =
        document.getElementById("customAlert");

    const customAlertTitle =
        document.getElementById("customAlertTitle");

    const customAlertMessage =
        document.getElementById("customAlertMessage");

    const customAlertIcon =
        document.getElementById("customAlertIcon");

    const customAlertBtn =
        document.getElementById("customAlertBtn");


    window.showAlert = function (
        message,
        title = "Notice",
        icon = "⚠️"
    ) {

        if (!customAlert) return;

        customAlertTitle.textContent = title;

        customAlertMessage.textContent = message;

        customAlertIcon.textContent = icon;

        customAlert.classList.add("active");

    };


    if (customAlertBtn) {

        customAlertBtn.addEventListener(
            "click",
            function () {

                customAlert.classList.remove("active");

            }
        );

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

    let balance = 0;

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

    const orderModal =
        document.getElementById("orderModal");

    const fundsModal =
        document.getElementById("fundsModal");

    const paymentModal =
        document.getElementById("paymentModal");

    const successModal =
        document.getElementById("successModal");

    const closeOrder =
        document.getElementById("closeOrder");

    const closeFunds =
        document.getElementById("closeFunds");

    const closePayment =
        document.getElementById("closePayment");

    const successCloseBtn =
        document.getElementById("successCloseBtn");

    const serviceSelect =
        document.getElementById("serviceSelect");

    const orderLink =
        document.getElementById("orderLink");

    const orderQuantity =
        document.getElementById("orderQuantity");

    const orderPrice =
        document.getElementById("orderPrice");

    const orderBalance =
        document.getElementById("orderBalance");

    const placeOrderBtn =
        document.getElementById("placeOrderBtn");

    const depositAmount =
        document.getElementById("depositAmount");

    const proceedPayBtn =
        document.getElementById("proceedPayBtn");

    const paymentAmount =
        document.getElementById("paymentAmount");

    const paymentTimer =
        document.getElementById("paymentTimer");

    const paymentExpired =
        document.getElementById("paymentExpired");

    const accountBalance =
        document.getElementById("accountBalance");

    const orderHistory =
        document.getElementById("orderHistory");

    const depositHistory =
        document.getElementById("depositHistory");

    const mainWebsite =
        document.getElementById("mainWebsite");

    const accountPage =
        document.getElementById("accountPage");


    // ================================
    // SAVE DATA
    // ================================

    function saveData() {

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

    // ================================
// UPDATE BALANCE FROM SUPABASE
// ================================

async function updateBalance() {

    const { data: sessionData, error: sessionError } =
        await supabaseClient.auth.getSession();

    if (sessionError || !sessionData.session) {
        return;
    }

    const userId =
        sessionData.session.user.id;

    const { data: profile, error } =
        await supabaseClient
            .from("profiles")
            .select("balance")
            .eq("id", userId)
            .single();

    if (error || !profile) {

        console.error(
            "Balance load error:",
            error
        );

        return;
    }

    balance =
        Number(profile.balance || 0);

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

    document.querySelectorAll(".faq-item")
        .forEach(function (item) {

            const question =
                item.querySelector("h3");

            const answer =
                item.querySelector("p");

            if (question && answer) {

                answer.style.display = "none";

                question.addEventListener(
                    "click",
                    function () {

                        answer.style.display =
                            answer.style.display === "none"
                                ? "block"
                                : "none";

                    }
                );
            }

        });


    // ================================
    // MOBILE MENU
    // ================================

    const menuBtn =
        document.getElementById("menuBtn");

    const navLinks =
        document.querySelector(".nav-links");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener(
            "click",
            function () {

                navLinks.classList.toggle("active");

            }
        );

        navLinks.querySelectorAll("a")
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        navLinks.classList.remove(
                            "active"
                        );

                    }
                );

            });
    }


    // ================================
    // OPEN ORDER
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


    // ================================
    // CLOSE ORDER
    // ================================

    if (closeOrder) {

        closeOrder.addEventListener(
            "click",
            function () {

                orderModal.classList.remove(
                    "active"
                );

            }
        );
    }


    // ================================
    // CLOSE MODALS
    // ================================

    if (closeFunds) {

        closeFunds.addEventListener(
            "click",
            function () {

                fundsModal.classList.remove(
                    "active"
                );

            }
        );
    }


    if (closePayment) {

        closePayment.addEventListener(
            "click",
            function () {

                paymentModal.classList.remove(
                    "active"
                );

                stopPaymentTimer();

            }
        );
    }


    if (successCloseBtn) {

        successCloseBtn.addEventListener(
            "click",
            function () {

                successModal.classList.remove(
                    "active"
                );

            }
        );
    }


    // ================================
    // CLICK OUTSIDE MODAL
    // ================================

    document.querySelectorAll(".order-modal")
        .forEach(function (modal) {

            modal.addEventListener(
                "click",
                function (event) {

                    if (event.target === modal) {

                        modal.classList.remove(
                            "active"
                        );

                    }

                }
            );

        });


    // ================================
    // PRICE CALCULATION
    // ================================

    function updatePrice() {

        if (!serviceSelect ||
            !orderQuantity ||
            !orderPrice) return;

        const service =
            serviceSelect.value;

        const quantity =
            Number(orderQuantity.value);

        const pricePer1K =
            servicePrices[service] || 0;

        if (!quantity || quantity <= 0) {

            orderPrice.textContent =
                "0.00";

            return;
        }

        /*
          Quantity is treated as actual quantity.

          Example:
          1000 = 1K
          5000 = 5K
        */

        const total =
            (quantity / 1000) *
            pricePer1K;

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
        async function () {

            const service =
                serviceSelect.value;

            const link =
                orderLink.value.trim();

            const quantity =
                Number(orderQuantity.value);

            const pricePer1K =
                servicePrices[service] || 0;

            const total =
                (quantity / 1000) *
                pricePer1K;


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


            // Get current logged-in user

            const { data: sessionData, error: sessionError } =
                await supabaseClient.auth.getSession();

            if (
                sessionError ||
                !sessionData.session
            ) {

                showAlert(
                    "Please login first.",
                    "Login Required",
                    "🔐"
                );

                return;
            }


            // Place order through secure database function

            const { data, error } =
                await supabaseClient.rpc(
                    "place_order",
                    {
                        p_service_name: service,
                        p_link: link,
                        p_quantity: quantity,
                        p_amount: Number(total.toFixed(2))
                    }
                );


            if (error) {

                console.error(
                    "Order error:",
                    error
                );

                showAlert(
                    error.message,
                    "Order Failed",
                    "⚠️"
                );

                return;
            }


            if (!data || !data.success) {

                showAlert(
                    "Unable to place the order.",
                    "Order Failed",
                    "⚠️"
                );

                return;
            }


            // Update displayed balance

            balance =
                Number(data.balance || 0);

            updateBalance();


            // Refresh history

            renderHistory();


            // Close modal

            orderModal.classList.remove(
                "active"
            );


            showSuccess(
                "Order Successful",
                "Your service order has been placed successfully. Your service will be delivered within 24 hours."
            );

        }
    );

        }

    // ================================
    // ADD FUNDS
    // ================================

    function openFunds() {

        if (!fundsModal) return;

        fundsModal.classList.add(
            "active"
        );

        if (depositAmount) {

            depositAmount.value = "";

        }

    }


    // Account Add Funds

    const accountAddFunds =
        document.getElementById(
            "accountAddFunds"
        );

    if (accountAddFunds) {

        accountAddFunds.addEventListener(
            "click",
            openFunds
        );

    }


    // Bottom Add Funds

    document.querySelectorAll(
        '[data-page="funds"]'
    ).forEach(function (button) {

        button.addEventListener(
            "click",
            openFunds
        );

    });


    // ================================
    // PROCEED TO PAYMENT
    // ================================

    if (proceedPayBtn) {

        proceedPayBtn.addEventListener(
            "click",
            async function () {

                const amount =
                    Number(
                        depositAmount.value
                    );


                if (!amount ||
    amount <= 9) {

    showAlert(
        "Please enter a valid amount.",
        "Invalid Amount",
        "💰"
    );

    return;
                }


                /*
                  Deposit is initially Pending.

                  IMPORTANT:
                  Real bank/payment verification
                  must happen on a secure backend.
                */

                const deposit = {

                    id:
                        "DEP-" +
                        Date.now(),

                    amount:
                        Number(
                            amount.toFixed(2)
                        ),

                    status:
                        "pending",

                    date:
                        new Date().toLocaleString()

                };

  if (typeof supabaseClient !== "undefined") {

    const { data: sessionData } =
        await supabaseClient.auth.getSession();

    if (sessionData.session) {

        const { error: depositError } =
    await supabaseClient
        .from("deposits")
        .insert({
                user_id: sessionData.session.user.id,
                amount: deposit.amount,
                status: "pending",
                payment_reference: deposit.id,
                payment_method: "QR"
            });
        if (depositError) {
    showAlert(
        depositError.message,
        "Deposit Error",
        "❌"
    );
    console.error("Deposit save error:", depositError);
        }

    }
  }
                
                deposits.unshift(
                    deposit
                );

                saveData();

                fundsModal.classList.remove(
                    "active"
                );


                openPayment(
                    amount,
                    deposit.id
                );

            }
        );
    }


    // ================================
    // PAYMENT SCREEN
    // ================================

    let currentPaymentDepositId = null;

    function openPayment(
        amount,
        depositId
    ) {

        if (!paymentModal) return
            
            currentPaymentDepositId = depositId;

        paymentModal.classList.add(
            "active"
        );

        if (paymentAmount) {

            paymentAmount.textContent =
                amount.toFixed(2);

        }
        
const paymentQR =
    document.getElementById("paymentQR");

if (paymentQR) {

    const upiId = "6300807984@ybl";

    const upiUrl =
        "upi://pay?pa=" +
        encodeURIComponent(upiId) +
        "&pn=" +
        encodeURIComponent("SarkAura") +
        "&am=" +
        amount.toFixed(2) +
        "&cu=INR";

    paymentQR.src =
        "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" +
        encodeURIComponent(upiUrl);
}

        if (paymentExpired) {

            paymentExpired.style.display =
                "none";

        }


        startPaymentTimer(
            depositId
        );

    }


    // ================================
    // 5 MINUTE TIMER
    // ================================

    function startPaymentTimer(
        depositId
    ) {

        stopPaymentTimer();

        let remaining =
            5 * 60;


        if (paymentTimer) {

            paymentTimer.textContent =
                "05:00";

        }


        paymentTimerInterval =
            setInterval(
                function () {

                    remaining--;


                    const minutes =
                        Math.floor(
                            remaining / 60
                        );

                    const seconds =
                        remaining % 60;


                    if (paymentTimer) {

                        paymentTimer.textContent =
                            String(minutes)
                                .padStart(2, "0")
                            + ":" +
                            String(seconds)
                                .padStart(2, "0");

                    }


                    if (remaining <= 0) {

                        stopPaymentTimer();

                        if (paymentExpired) {

                            paymentExpired.style.display =
                                "block";

                        }

                    }

                },
                1000
            );
    }


    function stopPaymentTimer() {

        if (paymentTimerInterval) {

            clearInterval(
                paymentTimerInterval
            );

            paymentTimerInterval = null;

        }

    }


    // ================================
    // SUCCESS MESSAGE
    // ================================

    function showSuccess(
        title,
        message
    ) {

        const successTitle =
            document.getElementById(
                "successTitle"
            );

        const successMessage =
            document.getElementById(
                "successMessage"
            );


        if (successTitle) {

            successTitle.textContent =
                title;

        }


        if (successMessage) {

            successMessage.textContent =
                message;

        }


        if (successModal) {

            successModal.classList.add(
                "active"
            );

        }

    }


    // ================================
    // HISTORY
    // ================================

    async function renderHistory() {

    // Current logged-in user
    const { data: sessionData, error: sessionError } =
        await supabaseClient.auth.getSession();

    if (sessionError || !sessionData.session) {
        return;
    }

    const userId = sessionData.session.user.id;


    // ================================
    // ORDERS
    // ================================

    if (orderHistory) {

        const { data: userOrders, error: orderError } =
            await supabaseClient
                .from("orders")
                .select("*")
                .eq("user_id", userId)
                .order("created_at", {
                    ascending: false
                });

        if (orderError) {

    console.error("ORDER HISTORY ERROR:", orderError);

    orderHistory.innerHTML =
        '<div class="empty-history">' +
        'Unable to load orders: ' +
        escapeHTML(orderError.message || "Unknown error") +
        '</div>';

        }

         else if (!userOrders || userOrders.length === 0) {

            orderHistory.innerHTML =
                '<div class="empty-history">No orders yet.</div>';

        } else {

            orderHistory.innerHTML =
                userOrders.map(function (order) {

                    const statusClass =
                        String(order.status || "")
                            .toLowerCase();

                    return `
                        <div class="history-item">

                            <div class="history-top">

                                <div class="history-service">
                                    ${escapeHTML(order.service || "")}
                                </div>

                                <div class="history-status ${statusClass}">
                                    ${escapeHTML(order.status || "")}
                                </div>

                            </div>

                            <div class="history-details">

                                Quantity:
                                ${Number(order.quantity || 0).toLocaleString()}

                                <br>

                                Amount:
                                ₹${Number(order.amount || 0).toFixed(2)}

                                <br>

                                Link:
                                ${escapeHTML(order.link || "-")}

                                <br>

                                ${escapeHTML(order.created_at || order.date || "")}

                            </div>

                        </div>
                    `;

                }).join("");

        }
    }


    // ================================
    // DEPOSITS - ONLY CURRENT USER
    // ================================

    if (depositHistory) {

        const { data: userDeposits, error: depositError } =
            await supabaseClient
                .from("deposits")
                .select("*")
                .eq("user_id", userId)
                .order("created_at", {
                    ascending: false
                });

        if (depositError) {

            depositHistory.innerHTML =
                '<div class="empty-history">Unable to load deposits.</div>';

            console.error(
                "Deposit history error:",
                depositError
            );

        } else if (!userDeposits || userDeposits.length === 0) {

            depositHistory.innerHTML =
                '<div class="empty-history">No deposits yet.</div>';

        } else {

            depositHistory.innerHTML =
                userDeposits.map(function (deposit) {

                    const statusClass =
                        String(deposit.status || "")
                            .toLowerCase();

                    return `
                        <div class="history-item">

                            <div class="history-top">

                                <div class="history-service">
                                    Deposit
                                </div>

                                <div class="history-status ${statusClass}">
                                    ${escapeHTML(deposit.status || "")}
                                </div>

                            </div>

                            <div class="history-details">

                                Amount:
                                ₹${Number(deposit.amount || 0).toFixed(2)}

                                <br>

                                ${escapeHTML(
                                    deposit.created_at ||
                                    deposit.date ||
                                    ""
                                )}

                            </div>

                        </div>
                    `;

                }).join("");

        }
    }

    }


    // ================================
    // BASIC HTML ESCAPE
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
        document.querySelectorAll(
            ".bottom-nav-item"
        );


    bottomItems.forEach(function (item) {

        item.addEventListener(
            "click",
            function () {

                bottomItems.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                item.classList.add(
                    "active"
                );


                const page =
                    item.dataset.page;


                if (page === "home") {

                    if (mainWebsite) {

                        mainWebsite.style.display =
                            "block";

                    }

                    if (accountPage) {

                        accountPage.style.display =
                            "none";

                    }

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                }


                if (page === "services") {

                    if (mainWebsite) {

                        mainWebsite.style.display =
                            "block";

                    }

                    if (accountPage) {

                        accountPage.style.display =
                            "none";

                    }

                    const services =
                        document.getElementById(
                            "services"
                        );

                    if (services) {

                        services.scrollIntoView({
                            behavior: "smooth"
                        });

                    }

                }


                if (page === "account") {

                    if (mainWebsite) {

                        mainWebsite.style.display =
                            "none";

                    }

                    if (accountPage) {

                        accountPage.style.display =
                            "block";

                    }

                    updateBalance();

                    renderHistory();

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                }

            }
        );

    });
    
    // ================================
    // INITIAL LOAD
    // ================================

    updateBalance();

    renderHistory();

    // ================================
// LOGOUT
// ================================

const logoutBtn =
    document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        async function () {

            const { error } =
                await supabaseClient.auth.signOut();

            if (error) {
                alert(error.message);
                return;
            }

            window.location.href = "login.html";

        }
    );

}

});
