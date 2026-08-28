const SUPABASE_URL = "https://xikxviwdkfccfkebdwye.supabase.co";
const SUPABASE_KEY = "sb_publishable_eZD2D4vPSDcFYZo8es-vWA_3zZEcwC_";

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


    let balance =
        Number(
            localStorage.getItem("sarkaura_balance") || 0
        );


    let orders =
        JSON.parse(
            localStorage.getItem("sarkaura_orders") || "[]"
        );


    let deposits =
        JSON.parse(
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
    // SUPABASE LOGIN ELEMENTS
    // ================================

    const accountBtn =
        document.getElementById("accountBtn");

    const accountEmail =
        document.getElementById("accountEmail");

    const logoutBtn =
        document.getElementById("logoutBtn");

    const authModal =
        document.getElementById("authModal");

    const authClose =
        document.getElementById("authClose");

    const authTitle =
        document.getElementById("authTitle");

    const authSubtitle =
        document.getElementById("authSubtitle");

    const authEmail =
        document.getElementById("authEmail");

    const authPassword =
        document.getElementById("authPassword");

    const authSubmit =
        document.getElementById("authSubmit");

    const authSwitch =
        document.getElementById("authSwitch");

    const authSwitchText =
        document.getElementById("authSwitchText");

    let authMode = "login";


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

    document
        .querySelectorAll(".faq-item")
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


        navLinks
            .querySelectorAll("a")
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

                if (orderModal) {

                    orderModal.classList.remove(
                        "active"
                    );

                }

            }
        );

    }


    // ================================
    // CLOSE FUNDS
    // ================================

    if (closeFunds) {

        closeFunds.addEventListener(
            "click",
            function () {

                if (fundsModal) {

                    fundsModal.classList.remove(
                        "active"
                    );

                }

            }
        );

    }


    // ================================
    // CLOSE PAYMENT
    // ================================

    if (closePayment) {

        closePayment.addEventListener(
            "click",
            function () {

                if (paymentModal) {

                    paymentModal.classList.remove(
                        "active"
                    );

                }

                stopPaymentTimer();

            }
        );

    }


    // ================================
    // CLOSE SUCCESS
    // ================================

    if (successCloseBtn) {

        successCloseBtn.addEventListener(
            "click",
            function () {

                if (successModal) {

                    successModal.classList.remove(
                        "active"
                    );

                }

            }
        );

    }


    // ================================
    // CLICK OUTSIDE MODALS
    // ================================

    document
        .querySelectorAll(".order-modal")
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

        if (
            !serviceSelect ||
            !orderQuantity ||
            !orderPrice
        ) return;


        const service =
            serviceSelect.value;

        const quantity =
            Number(orderQuantity.value);

        const pricePer1K =
            servicePrices[service] || 0;


        if (!quantity || quantity <= 0) {

            orderPrice.textContent = "0.00";

            return;

        }


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
            function () {


                if (!serviceSelect || !orderLink || !orderQuantity) {
                    return;
                }


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


                if (balance < total) {

                    showAlert(
                        "Your balance is too low. Please add funds first.",
                        "Insufficient Balance",
                        "💰"
                    );

                    return;

                }


                balance -= total;


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
                        "Pending",

                    date:
                        new Date().toLocaleString()

                };


                orders.unshift(order);

                saveData();

                updateBalance();

                renderHistory();


                if (orderModal) {

                    orderModal.classList.remove(
                        "active"
                    );

                }


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

        fundsModal.classList.add("active");


        if (depositAmount) {

            depositAmount.value = "";

        }

    }


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


    document
        .querySelectorAll('[data-page="funds"]')
        .forEach(function (button) {

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
            function () {


                const amount =
                    Number(
                        depositAmount
                            ? depositAmount.value
                            : 0
                    );


                if (!amount || amount <= 9) {

                    showAlert(
                        "Please enter a valid amount.",
                        "Invalid Amount",
                        "💰"
                    );

                    return;

                }


                const deposit = {

                    id:
                        "DEP-" +
                        Date.now(),

                    amount:
                        Number(
                            amount.toFixed(2)
                        ),

                    status:
                        "Pending",

                    date:
                        new Date().toLocaleString()

                };


                deposits.unshift(deposit);

                saveData();


                if (fundsModal) {

                    fundsModal.classList.remove(
                        "active"
                    );

                }


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

    function openPayment(
        amount,
        depositId
    ) {

        if (!paymentModal) return;


        paymentModal.classList.add(
            "active"
        );


        if (paymentAmount) {

            paymentAmount.textContent =
                amount.toFixed(2);

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
    // PAYMENT TIMER
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

    function renderHistory() {


        // ORDERS

        if (orderHistory) {

            if (orders.length === 0) {

                orderHistory.innerHTML =
                    '<div class="empty-history">No orders yet.</div>';

            } else {

                orderHistory.innerHTML =
                    orders
                        .map(function (order) {


                            const statusClass =
                                String(
                                    order.status || ""
                                ).toLowerCase();


                            return `
                                <div class="history-item">

                                    <div class="history-top">

                                        <div class="history-service">
                                            ${escapeHTML(order.service)}
                                        </div>

                                        <div class="history-status ${escapeHTML(statusClass)}">
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

                        })
                        .join("");

            }

        }


        // DEPOSITS

        if (depositHistory) {

            if (deposits.length === 0) {

                depositHistory.innerHTML =
                    '<div class="empty-history">No deposits yet.</div>';

            } else {

                depositHistory.innerHTML =
                    deposits
                        .map(function (deposit) {


                            const statusClass =
                                String(
                                    deposit.status || ""
                                ).toLowerCase();


                            return `
                                <div class="history-item">

                                    <div class="history-top">

                                        <div class="history-service">
                                            Deposit
                                        </div>

                                        <div class="history-status ${escapeHTML(statusClass)}">
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

                        })
                        .join("");

            }

        }

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
            async function () {


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


                // HOME

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

                    return;

                }


                // SERVICES

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

                    return;

                }


                // ACCOUNT

                if (page === "account") {


                    try {

                        const {
                            data: { session }
                        } =
                            await supabaseClient.auth.getSession();


                        // NOT LOGGED IN

                        if (!session) {

                            if (accountPage) {

                                accountPage.style.display =
                                    "none";

                            }

                            if (mainWebsite) {

                                mainWebsite.style.display =
                                    "block";

                            }

                            if (authModal) {

                                authModal.classList.add(
                                    "active"
                                );

                            }

                            return;

                        }


                        // LOGGED IN

                        if (mainWebsite) {

                            mainWebsite.style.display =
                                "none";

                        }

                        if (accountPage) {

                            accountPage.style.display =
                                "block";

                        }

                        if (accountEmail) {

                            accountEmail.textContent =
                                session.user.email || "";

                        }


                        updateBalance();
                        renderHistory();


                        window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        });


                    } catch (error) {

                        console.error(
                            "Account error:",
                            error
                        );

                        showAlert(
                            "Account open nahi ho pa raha.",
                            "Error",
                            "❌"
                        );

                    }

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
    // CHECK EXISTING LOGIN
    // ================================

    async function checkLogin() {

        try {

            const {
                data: { session }
            } =
                await supabaseClient.auth.getSession();


            if (session && session.user) {

                if (accountEmail) {

                    accountEmail.textContent =
                        session.user.email || "";

                }

            }

        } catch (error) {

            console.error(
                "Login check error:",
                error
            );

        }

    }


    checkLogin();


    // ================================
    // TOP LOGIN / ACCOUNT BUTTON
    // ================================

    if (accountBtn) {

        accountBtn.addEventListener(
            "click",
            async function () {


                try {

                    const {
                        data: { session }
                    } =
                        await supabaseClient.auth.getSession();


                    // LOGGED IN

                    if (session && session.user) {

                        if (mainWebsite) {

                            mainWebsite.style.display =
                                "none";

                        }

                        if (accountPage) {

                            accountPage.style.display =
                                "block";

                        }

                        if (accountEmail) {

                            accountEmail.textContent =
                                session.user.email || "";

                        }


                        updateBalance();
                        renderHistory();


                        window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        });


                        return;

                    }


                    // LOGGED OUT

                    if (authModal) {

                        authModal.classList.add(
                            "active"
                        );

                    }

                } catch (error) {

                    console.error(
                        "Account button error:",
                        error
                    );

                }

            }
        );

    }


    // ================================
    // CLOSE LOGIN
    // ================================

    if (authClose) {

        authClose.addEventListener(
            "click",
            function () {

                if (authModal) {

                    authModal.classList.remove(
                        "active"
                    );

                }

            }
        );

    }


    // ================================
    // LOGIN / SIGN UP SWITCH
    // ================================

    if (authSwitch) {

        authSwitch.addEventListener(
            "click",
            function () {


                if (authMode === "login") {

                    authMode = "signup";


                    if (authTitle) {

                        authTitle.textContent =
                            "Sign Up";

                    }


                    if (authSubtitle) {

                        authSubtitle.textContent =
                            "Apna SarkAura account banayein.";

                    }


                    if (authSubmit) {

                        authSubmit.textContent =
                            "Create Account";

                    }


                    if (authSwitchText) {

                        authSwitchText.textContent =
                            "Already have an account?";

                    }


                    authSwitch.textContent =
                        "Login";


                } else {

                    authMode = "login";


                    if (authTitle) {

                        authTitle.textContent =
                            "Login";

                    }


                    if (authSubtitle) {

                        authSubtitle.textContent =
                            "Apne SarkAura account mein login karein.";

                    }


                    if (authSubmit) {

                        authSubmit.textContent =
                            "Login";

                    }


                    if (authSwitchText) {

                        authSwitchText.textContent =
                            "Account nahi hai?";

                    }


                    authSwitch.textContent =
                        "Sign Up";

                }

            }
        );

    }


    // ================================
    // LOGIN / SIGN UP
    // ================================

    if (authSubmit) {

        authSubmit.addEventListener(
            "click",
            async function () {


                const email =
                    authEmail
                        ? authEmail.value.trim()
                        : "";


                const password =
                    authPassword
                        ? authPassword.value
                        : "";


                if (!email || !password) {

                    showAlert(
                        "Email aur password dono enter karein.",
                        "Details Required",
                        "⚠️"
                    );

                    return;

                }


                if (password.length < 6) {

                    showAlert(
                        "Password kam se kam 6 characters ka hona chahiye.",
                        "Password Too Short",
                        "🔐"
                    );

                    return;

                }


                authSubmit.disabled = true;

                authSubmit.textContent =
                    "Please wait...";


                try {


                    // ============================
                    // LOGIN
                    // ============================

                    if (authMode === "login") {


                        const {
                            data,
                            error
                        } =
                            await supabaseClient.auth
                                .signInWithPassword({

                                    email:
                                        email,

                                    password:
                                        password

                                });


                        if (error) {

                            throw error;

                        }


                        const user =
                            data &&
                            data.user
                                ? data.user
                                : null;


                        if (accountEmail && user) {

                            accountEmail.textContent =
                                user.email || "";

                        }


                        if (authModal) {

                            authModal.classList.remove(
                                "active"
                            );

                        }


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


                        showAlert(
                            "Login successful!",
                            "Welcome",
                            "✅"
                        );

                    }


                    // ============================
                    // SIGN UP
                    // ============================

                    else {


                        const {
                            data,
                            error
                        } =
                            await supabaseClient.auth
                                .signUp({

                                    email:
                                        email,

                                    password:
                                        password

                                });


                        if (error) {

                            throw error;

                        }


                        if (
                            data &&
                            data.session
                        ) {

                            if (authModal) {

                                authModal.classList.remove(
                                    "active"
                                );

                            }


                            if (mainWebsite) {

                                mainWebsite.style.display =
                                    "none";

                            }


                            if (accountPage) {

                                accountPage.style.display =
                                    "block";

                            }


                            if (
                                accountEmail &&
                                data.user
                            ) {

                                accountEmail.textContent =
                                    data.user.email || "";

                            }


                            updateBalance();
                            renderHistory();

                        }


                        showAlert(
                            "Account create ho gaya. Agar email confirmation enabled hai to email verify karein.",
                            "Sign Up Successful",
                            "✅"
                        );

                    }


                } catch (error) {

                    console.error(
                        "Authentication error:",
                        error
                    );


                    showAlert(
                        error.message ||
                            "Authentication failed.",
                        "Authentication Error",
                        "❌"
                    );

                }


                authSubmit.disabled = false;

                authSubmit.textContent =
                    authMode === "login"
                        ? "Login"
                        : "Create Account";

            }
        );

    }


    // ================================
    // LOGOUT
    // ================================

                           if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            async function () {


                try {

                    const {
                        error
                    } =
                        await supabaseClient.auth
                            .signOut();


                    if (error) {

                        throw error;

                    }


                    if (accountEmail) {

                        accountEmail.textContent =
                            "";

                    }


                    if (accountPage) {

                        accountPage.style.display =
                            "none";

                    }


                    if (mainWebsite) {

                        mainWebsite.style.display =
                            "block";

                    }


                    bottomItems.forEach(
                        function (btn) {

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );


                    const homeBtn =
                        document.querySelector(
                            '.bottom-nav-item[data-page="home"]'
                        );


                    if (homeBtn) {

                        homeBtn.classList.add(
                            "active"
                        );

                    }


                    showAlert(
                        "Aap successfully logout ho gaye.",
                        "Logout Successful",
                        "✅"
                    );


                } catch (error) {

                    console.error(
                        "Logout error:",
                        error
                    );


                    showAlert(
                        error.message ||
                            "Logout failed.",
                        "Logout Error",
                        "❌"
                    );

                }

            }
        );

    }


});
