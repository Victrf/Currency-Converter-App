const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const convertBtn = document.getElementById("convert-btn");
const amountInput = document.getElementById("amount");
const result = document.getElementById("result");

const API_URL = "https://api.exchangerate-api.com/v4/latest/";

const currencyList = ["USD", "EUR", "GBP", "JPY", "GHS", "INR", "CAD", "AUD", "NGN"];
const currencyMap = {
    USD: "US",
    EUR: "EU",  // We'll treat 'EU' as 🇪🇺
    GBP: "GB",
    JPY: "JP",
    GHS: "GH",
    INR: "IN",
    CAD: "CA",
    AUD: "AU",
    NGN: "NG"
};

currencyList.forEach(currency => {
    const option1 = document.createElement("option");
    option1.value = currency;
    option1.text = currency;

    const option2 = option1.cloneNode(true);

    fromCurrency.add(option1);
    toCurrency.add(option2);
});

fromCurrency.value = "USD";
toCurrency.value = "EUR";

convertBtn.addEventListener("click", () => {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amount = parseFloat(amountInput.value);

    if (!amount || amount <= 0) {
        result.textContent = "Enter a valid amount";
        return;
    }

    fetch(`${API_URL}${from}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.rates[to];
            const converted = (amount * rate).toFixed(2);
            result.textContent = `${amount} ${from} = ${converted} ${to}`;
        })
        .catch(() => {
            result.textContent = "Conversion failed. Try again.";
        });
});



function getFlagEmoji(countryCode) {
    if (!countryCode) return "";
    return countryCode
        .toUpperCase()
        .replace(/./g, char =>
            String.fromCodePoint(127397 + char.charCodeAt()));
}

Object.entries(currencyMap).forEach(([currency, countryCode]) => {
    const flag = getFlagEmoji(countryCode);

    const option1 = document.createElement("option");
    option1.value = currency;
    option1.text = `${flag} ${currency}`;

    const option2 = option1.cloneNode(true);

    fromCurrency.add(option1);
    toCurrency.add(option2);
});


document.getElementById("swap-btn").addEventListener("click", () => {
    // Swap selected values
    const fromValue = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = fromValue;

    // Optional: Trigger conversion again
    convertBtn.click();
});



// document.addEventListener("DOMContentLoaded", () => {
//     // ⏳ Hide page loader after content is ready
//     const pageLoader = document.getElementById("page-loader");
//     pageLoader.style.display = "none";

//     // Your existing init logic here
// });

// document.addEventListener("DOMContentLoaded", () => {
//     // ✅ Hide the page loader once the DOM is ready
//     const pageLoader = document.getElementById("page-loader");
//     if (pageLoader) {
//         pageLoader.style.display = "none";
//     }

//     // ✅ Grab elements safely
//     const convertBtn = document.getElementById("convert-btn");
//     const swapBtn = document.getElementById("swap-btn");
//     const conversionLoader = document.getElementById("conversion-loader");
//     const resultText = document.getElementById("result");

//     const amountInput = document.getElementById("amount");
//     const fromCurrency = document.getElementById("from-currency");
//     const toCurrency = document.getElementById("to-currency");

//     // 🔄 Swap currencies
//     swapBtn.addEventListener("click", () => {
//         const temp = fromCurrency.value;
//         fromCurrency.value = toCurrency.value;
//         toCurrency.value = temp;
//     });

//     // 💱 Convert button logic
//     convertBtn.addEventListener("click", async () => {
//         conversionLoader.classList.remove("hidden");
//         resultText.textContent = "";

//         try {
//             const amount = parseFloat(amountInput.value);
//             const from = fromCurrency.value;
//             const to = toCurrency.value;

//             if (!amount || amount <= 0) {
//                 resultText.textContent = "Please enter a valid amount.";
//                 conversionLoader.classList.add("hidden");
//                 return;
//             }

//             // 🕒 Simulate async fetch delay
//             await new Promise(resolve => setTimeout(resolve, 1000));

//             // 🧪 Mock conversion logic — replace with real API later
//             const rate = Math.random() * (1.5 - 0.5) + 0.5;
//             const converted = (amount * rate).toFixed(2);

//             resultText.textContent = `${amount} ${from} = ${converted} ${to}`;
//         } catch (error) {
//             console.error("Conversion error:", error);
//             resultText.textContent = "Error converting currency.";
//         } finally {
//             conversionLoader.classList.add("hidden");
//         }
//     });
// });
