// Select the table body
const output = document.getElementById('output');

// Add a loading row initially
output.innerHTML = `<tr><td colspan="2" class="text-center">Loading...</td></tr>`;

// Function to create a promise that resolves after a random time between 1 and 3 seconds
function createRandomPromise(index) {
  const time = Math.random() * 2 + 1; // Random number between 1 and 3
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: `Promise ${index}`, time: time.toFixed(3) });
    }, time * 1000);
  });
}

// Create 3 promises
const promises = [
  createRandomPromise(1),
  createRandomPromise(2),
  createRandomPromise(3),
];

// Record the start time
const startTime = performance.now();

// Wait for all promises to resolve
Promise.all(promises).then((results) => {
  const endTime = performance.now();
  const totalTime = ((endTime - startTime) / 1000).toFixed(3); // Total time in seconds

  // Clear the loading row
  output.innerHTML = '';

  // Add rows for each promise result
  results.forEach((result) => {
    output.innerHTML += `
      <tr>
        <td>${result.name}</td>
        <td>${result.time}</td>
      </tr>
    `;
  });

  // Add the total time row
  output.innerHTML += `
    <tr>
      <td><strong>Total</strong></td>
      <td><strong>${totalTime}</strong></td>
    </tr>
  `;
});

