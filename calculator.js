// Capture elements
const nameInput = document.getElementById("name");
const startingBidInput = document.getElementById("startingBid");
const education = document.getElementById("education");
const netWorth = document.getElementById("netWorth");
const caste = document.getElementById("caste");
const skills = document.querySelectorAll(".skill");
const ageOptions = document.getElementsByName("age");
const reputation = document.querySelectorAll(".reputation");
const loveLetterInput = document.getElementById("loveLetter");
const resultDiv = document.getElementById("result");
const calculateBtn = document.getElementById("calculateBtn");

// Calculate function using ES6 arrow function
const calculate = () => {
    let name = nameInput.value;
    let price = Number(startingBidInput.value);

    if (!name || !price) {
        resultDiv.innerHTML = "<p class='text-danger'>Please enter both name and starting bid!</p>";
        return;
    }

    // Multiply price by education coefficient
    price *= Number(education.value);

    // Multiply by family net worth coefficient
    price *= Number(netWorth.value);

    // Add caste value to price
    price += Number(caste.value);

    // Add skill values
    const skillsSum = Array.from(skills)
        .filter(skill => skill.checked)
        .reduce((sum, skill) => sum + Number(skill.value), 0);
    price += skillsSum;

    // Multiply by age coefficient
    ageOptions.forEach(option => {
        if (option.checked) price *= Number(option.value);
    });

    // Apply reputation adjustments
    reputation.forEach(rep => {
        if (rep.checked) {
            if (rep.value > 0) {
                price *= Number(rep.value);
            } else {
                price += Number(rep.value);
            }
        }
    });

    const loveLetter = loveLetterInput.value;

    // Create and display result object
    let person = {
        bride_name: name,
        bride_price: price.toFixed(3),
        letter_to_bride: loveLetter
    };

    resultDiv.innerHTML = `
        <h5>Calculation Result</h5>
        <p>Your price for <strong>${person.bride_name}</strong> is <strong>$${person.bride_price}</strong></p>
        <p><strong>Love Letter:</strong> ${person.letter_to_bride}</p>
    `;
};

// Add event listener to button
calculateBtn.addEventListener("click", calculate);
