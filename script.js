// Handle form submission
document.getElementById('quote-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get form values
  const origin = document.getElementById('origin').value;
  const destination = document.getElementById('destination').value;
  const hotelAmenities = document.getElementById('hotel-amenities').value;
  const carType = document.getElementById('car-type').value;
  const userEmail = document.getElementById('email').value;

  // Create a summary string
  const summary = `
    <strong>Flight Details:</strong> From ${origin} to ${destination} <br>
    <strong>Hotel Amenities:</strong> ${hotelAmenities} <br>
    <strong>Car Type:</strong> ${carType}
  `;

  // Display the quote summary
  document.getElementById('quote-summary').style.display = 'block';
  document.getElementById('summary-text').innerHTML = summary;

  // Save the quote to local storage
  localStorage.setItem('quoteSummary', summary);

  // Show buttons for saving and sending email
  document.getElementById('save-to-local').style.display = 'inline-block';
  document.getElementById('send-to-email').style.display = 'inline-block';

  // Store the user's email for sending the quote
  localStorage.setItem('userEmail', userEmail);
});

// Event listener for saving quote to local storage
document.getElementById('save-to-local').addEventListener('click', function() {
  alert("Quote saved to local storage!");
});

// Event listener for sending quote to email via EmailJS
document.getElementById('send-to-email').addEventListener('click', function() {
  const quoteSummary = document.getElementById('summary-text').innerHTML;
  const userEmail = localStorage.getItem('userEmail');

  // Prepare the email data
  const emailData = {
    origin: document.getElementById('origin').value,
    destination: document.getElementById('destination').value,
    hotel_amenities: document.getElementById('hotel-amenities').value,
    car_type: document.getElementById('car-type').value,
    user_email: userEmail,
  };

  // Send the email using EmailJS
  emailjs
    .send("service_jloeltm", "template_c6qjadb", emailData)
    .then(function(response) {
      alert("Quote sent to your email successfully!");
    })
    .catch(function(error) {
      alert("Failed to send email. Please check your EmailJS configuration.");
      console.error("EmailJS Error:", error);
    });
});
