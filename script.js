// script.js

function displayCurrentDateTime() {
    const currentDate = new Date();
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'UTC' };
    const formattedDate = currentDate.toLocaleString('en-US', options).replace(',', '');  // Replaces comma in format
    document.getElementById('current-datetime').innerText = `Current Date and Time (UTC): ${formattedDate}`;
}

window.onload = displayCurrentDateTime;
