function sumOfEvenNumbers(n) {
    let sum = 0; // Initialize the sum to 0
    // Loop through all even numbers from 2 to n
    for (let i = 2; i <= n; i += 2) {
        sum += i; // Add the even number to the sum
    }
    return sum; // Return the final sum
}

function calculateSum() {
    // Get the value from the input field
    const input = document.getElementById('numberInput').value;
    // Convert the input value to an integer
    const n = parseInt(input);

    // Check if the input is a valid positive integer
    if (isNaN(n) || n < 1) {
        document.getElementById('result').innerText = 'Please enter a valid positive integer.';
    } else {
        // Calculate the sum of even numbers up to n
        const result = sumOfEvenNumbers(n);
        // Display the result in the result div
        document.getElementById('result').innerText = `The sum of all even numbers from 1 to ${n} is: ${result}`;
    }
}
