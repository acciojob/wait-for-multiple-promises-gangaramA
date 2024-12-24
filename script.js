const output = document.getElementById('output');

// Add a loading row with an ID for Cypress test compatibility
output.innerHTML = `<tr id="loading"><td colspan="2" class="text-center">Loading...</td></tr>`;

// Function to create a promise that resolves after a random time between 1 and 3 seconds
const createPromise = (i) => 
  new Promise((res) => {
    const time = Math.random() * 2 + 1; // Random number between 1 and 3
    setTimeout(() => res({ name: `Promise ${i}`, time: time.toFixed(3) }), time * 1000);
  });

// Start time recording
const start = performance.now();

// Create and wait for all promises
Promise.all([1, 2, 3].map(createPromise)).then((results) => {
  const totalTime = ((performance.now() - start) / 1000).toFixed(3);

  // Clear the loading row
  output.innerHTML = '';

  // Populate results
  results.forEach(({ name, time }) => {
    output.innerHTML += `<tr><td>${name}</td><td>${time}</td></tr>`;
  });

  // Add total time row
  output.innerHTML += `<tr><td><strong>Total</strong></td><td><strong>${totalTime}</strong></td></tr>`;
});
