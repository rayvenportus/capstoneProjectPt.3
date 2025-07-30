 var map = L.map("map").setView(
        [14.580582699308387, 120.98510384559633],
        17
      );

      var redIcon = new L.Icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [35, 55],       
  iconAnchor: [17, 55],     
  popupAnchor: [1, -45],    
  shadowSize: [55, 55], 
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      // Navbar scroll effect
      window.addEventListener("scroll", function () {
        const navbar = document.querySelector(".navbar");
        if (window.scrollY > 20) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      });

      // Mobile navigation toggle
      const hamburger = document.getElementById("hamburger");
      const mobileNav = document.getElementById("mobileNav");

      hamburger.addEventListener("click", function () {
        hamburger.classList.toggle("active");
        mobileNav.classList.toggle("active");
      });

      // Close mobile menu when clicking outside
      document.addEventListener("click", function (event) {
        if (
          !hamburger.contains(event.target) &&
          !mobileNav.contains(event.target)
        ) {
          hamburger.classList.remove("active");
          mobileNav.classList.remove("active");
        }
      });

  function showPanel(title, address, phone, availability, imageUrl) {
    document.getElementById('panelTitle').innerText = title;
    document.getElementById('panelAddress').innerHTML = address;
    document.getElementById('panelPhone').innerHTML = phone;
    document.getElementById('panelAvailability').innerHTML = availability;
    document.getElementById('panelImage').src = imageUrl;
    document.getElementById('sidePanel').classList.add('panel-visible');
  }

  // Hide panel when clicking outside
  document.addEventListener('click', e => {
    const panel = document.getElementById('sidePanel');
    if (
      panel.classList.contains('panel-visible') &&
      !panel.contains(e.target) &&
      !e.target.closest('.leaflet-marker-icon')
    ) {
      panel.classList.remove('panel-visible');
    }
  });

    //Donate Modal
    const donorBtn = document.getElementById('donorBtn');
    const donorModal = document.getElementById('donorModal');
    const closeDonorModal = document.getElementById('closeDonorModal');
    const requestBtn = document.getElementById('requestBtn');
    const requestModal = document.getElementById('requestModal');
    const closeRequestModal = document.getElementById('closeRequestModal');
    const donateNowBtn = document.getElementById('donateNowBtn');
    const requestNowBtn = document.getElementById('requestNowBtn');

    
    donorBtn.addEventListener('click', () => {
      donorBtn.classList.add('active');
      requestBtn.classList.remove('active');
      
      // Show donate content
      donateInfo.classList.add('active');
      requestInfo.classList.remove('active');
      
      // Show donate now button
      donateNowBtn.classList.add('active');
    });
    
    closeDonorModal.addEventListener('click', () => {
      donorModal.style.display = 'none';
    });

    closeRequestModal.addEventListener('click', () => {
      requestModal.style.display = 'none';
    });

    requestBtn.addEventListener('click', () => {
      donorBtn.classList.remove('active');
      requestBtn.classList.add('active');
      
      // Show donate content
      donateInfo.classList.remove('active');
      requestInfo.classList.add('active');
      
      // Show donate now button
      requestNowBtn.classList.add('active');
    });
    
    closeDonorModal.addEventListener('click', () => {
      donorModal.style.display = 'none';
    });
    
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
      if (e.target === donorModal) {
        donorModal.style.display = 'none';
      }
      if (e.target === requestModal) {
        requestModal.style.display = 'none';
      }
    });

    // Show Donation Modal
    donateNowBtn.addEventListener('click', () => {
      donorModal.style.display = 'flex';
    });

    //Show Request Modal
    requestNowBtn.addEventListener('click', () => {
      requestModal.style.display = 'flex';
    });

  //Donor Form
  const donorForm = document.getElementById('donorForm');
  const submitBtn = donorForm.querySelector('.submit-btn');

  const donorName = document.getElementById('donorName');
  const donorContact = document.getElementById('donorContact');
  const donorEmail = document.getElementById('donorEmail');

  const donorNameError = document.getElementById('donorNameError');
  const donorContactError = document.getElementById('donorContactError');
  const donorEmailError = document.getElementById('donorEmailError');

  // Allow only numbers in contact
donorContact.addEventListener('input', function () {
  // Keep + for +639 format and digits only
  this.value = this.value.replace(/(?!^\+)[^\d]/g, '');
  validateField('contact');
});

  // Real-time validation events
  donorName.addEventListener('input', () => validateField('name'));
  donorEmail.addEventListener('input', () => validateField('email'));

  function validateField(field) {
    switch (field) {
      case 'name':
        if (donorName.value.trim() === '') {
          donorNameError.textContent = 'Full Name is required';
          donorNameError.style.display = 'block';
        } else {
          donorNameError.style.display = 'none';
        }
        break;

    case 'contact':
      const phonePattern = /^(09|\+639)\d{9}$/;   /^(09|\+639)\d{9}$/

      if (donorContact.value.trim() === '') {
        donorContactError.textContent = 'Contact Number is required';
        donorContactError.style.display = 'block';
        isValid = false;
      } else if (!phonePattern.test(donorContact.value)) {
        donorContactError.textContent = 'Please enter a valid contact number (Ex.09xxxxxxxxx)';
        donorContactError.style.display = 'block';
        
      } else {
        donorContactError.style.display = 'none';
      }
      break;

      case 'email':
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (donorEmail.value.trim() === '') {
          donorEmailError.textContent = 'Email is required';
          donorEmailError.style.display = 'block';
        } else if (!emailPattern.test(donorEmail.value)) {
          donorEmailError.textContent = 'Enter a valid email address';
          donorEmailError.style.display = 'block';
        } else {
          donorEmailError.style.display = 'none';
        }
        break;
    }
    toggleButton();
  }

  function toggleButton() {
    const allValid = (
      donorNameError.style.display === 'none' &&
      donorContactError.style.display === 'none' &&
      donorEmailError.style.display === 'none' &&
      donorName.value.trim() !== '' &&
      donorContact.value.trim() !== '' &&
      donorEmail.value.trim() !== ''
    );
    submitBtn.disabled = !allValid;
  }

  donorForm.addEventListener('submit', function(e) {
    e.preventDefault();
    toggleButton();
    if (!submitBtn.disabled) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Thank you! Your donor registration has been successfully submitted. Please remember to bring a valid ID when you visit the hospital.',
        confirmButtonColor: '#1f2a37',
        timer: 15000,
        timerProgressBar: true
      });

      donorForm.reset();
      submitBtn.disabled = true;
    }
  });

// Request Form Validation
const requestForm = document.getElementById('requestForm');
const requestSubmitBtn = requestForm.querySelector('.submit-btn');

// Form Fields
const patientName = document.getElementById('patientName');
const requesterContact = document.getElementById('requesterContact');
const requesterEmail = document.getElementById('requesterEmail');
const bloodTypeNeeded = document.getElementById('bloodTypeNeeded');
const unitsNeeded = document.getElementById('unitsNeeded');
const urgency = document.getElementById('urgency');


// Error Elements
const patientNameError = document.getElementById('patientNameError');
const requesterContactError = document.getElementById('requesterContactError');
const requesterEmailError=document.getElementById('requesterEmailError');
const bloodTypeError = document.getElementById('bloodTypeError');
const unitsNeededError = document.getElementById('unitsNeededError');
const urgencyLevelError = document.getElementById('urgencyLevelError');

// Initialize all error messages as hidden
[patientNameError, requesterContactError, requesterEmailError, bloodTypeError, unitsNeededError, urgencyLevelError ].forEach(el => {
  el.style.display = 'none';
});

// Validation functions
function validateName() {
  if (patientName.value.trim() === '') {
    patientNameError.textContent = 'Patient Name is required';
    patientNameError.style.display = 'block';
    return false;
  }
  patientNameError.style.display = 'none';
  return true;
}

function validateContact() {
  const phonePattern = /^(09|\+639)\d{9}$/;
  if (requesterContact.value.trim() === '') {
    requesterContactError.textContent = 'Contact Number is required';
    requesterContactError.style.display = 'block';
    return false;
  } else if (!phonePattern.test(requesterContact.value)) {
    requesterContactError.textContent = 'Please enter a valid contact number (Ex: 09xxxxxxxxx)';
    requesterContactError.style.display = 'block';
    return false;
  }
  requesterContactError.style.display = 'none';
  return true;
}
function validateEmail(){
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (requesterEmail.value.trim() === '') {
          requesterEmailError.textContent = 'Email is required';
          requesterEmailError.style.display = 'block';
        } else if (!emailPattern.test(requesterEmail.value)) {
          requesterEmailError.textContent = 'Enter a valid email address';
          requesterEmailError.style.display = 'block';
        } else {
          requesterEmailError.style.display = 'none';
        }
}
        

function validateBloodType() {
  if (bloodTypeNeeded.value === '') {
    bloodTypeError.textContent = 'Blood Type is required';
    bloodTypeError.style.display = 'block';
    return false;
  }
  bloodTypeError.style.display = 'none';
  return true;
}

function validateUnits() {
  if (unitsNeeded.value === '' || unitsNeeded.value < 1) {
    unitsNeededError.textContent = 'Please enter at least 1 unit';
    unitsNeededError.style.display = 'block';
    return false;
  }
  unitsNeededError.style.display = 'none';
  return true;
}

function validateUrgency() {
  if (urgency.value === '') {
    urgencyLevelError.textContent = 'Urgency Level is required';
    urgencyLevelError.style.display = 'block';
    return false;
  }
  urgencyLevelError.style.display = 'none';
  return true;
}

// Toggle button state based on validation
function togglesButton() {
  const allValid = (
    patientNameError.style.display === 'none' &&
    requesterContactError.style.display === 'none' &&
    requesterEmailError.style.display === 'none'&&
    bloodTypeError.style.display === 'none' &&
    unitsNeededError.style.display === 'none' &&
    urgencyLevelError.style.display === 'none' &&
    patientName.value.trim() !== '' &&
    requesterContact.value.trim() !== '' &&
    requesterEmail.value.trim() !== '' &&
    bloodTypeNeeded.value !== '' &&
    unitsNeeded.value !== '' && unitsNeeded.value >= 1 &&
    urgency.value !== ''
  );
  requestSubmitBtn.disabled = !allValid;
}

// Event listeners for real-time validation
patientName.addEventListener('input', () => {
  validateName();
  togglesutton();
});

requesterContact.addEventListener('input', function() {
  // Keep + for +63 format and digits only
  this.value = this.value.replace(/(?!^\+)[^\d]/g, '');
  validateContact();
  togglesButton();
});

requesterEmail.addEventListener('input', () => {
  validateEmail();
  togglesButton();
});

bloodTypeNeeded.addEventListener('change', () => {
  validateBloodType();
  togglesButton();
});

unitsNeeded.addEventListener('input', () => {
  validateUnits();
  togglesButton();
});

urgency.addEventListener('change', () => {
  validateUrgency();
  togglesButton();
});

// Form submission
requestForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Validate all fields before submission
  const isNameValid = validateName();
  const isContactValid = validateContact();
  const isEmailValid = validateEmail();
  const isBloodTypeValid = validateBloodType();
  const isUnitsValid = validateUnits();
  const isUrgencyValid = validateUrgency();
  
  togglesButton();
  
  if (!requestSubmitBtn.disabled) {
    // Show success message
    Swal.fire({
      icon: 'success',
      title: 'Request Submitted!',
      html: `
        <div style="text-align: left;">
          <p><strong>Patient:</strong> ${patientName.value}</p>
          <p><strong>Blood Type:</strong> ${bloodTypeNeeded.value}</p>
          <p><strong>Units Needed:</strong> ${unitsNeeded.value}</p>
          <p><strong>Urgency:</strong> ${urgency.options[urgency.selectedIndex].text}</p>
        </div>
      `,
        timer: 15000,
                confirmButtonColor: '#1f2a37',

        timerProgressBar: true

    });

    // Reset form
    requestForm.reset();
    requestSubmitBtn.disabled = true;
    
    // Clear error messages
    [patientNameError, requesterContactError, requesterEmailError, bloodTypeError, unitsNeededError, urgencyLevelError, ].forEach(el => {
      el.style.display = 'none';
    });
  }
});

  // Your existing marker setup, now passing image URLs:
  L.marker([14.5780314,120.9862462], { icon: redIcon })
    .addTo(map)
    .on('click', () => {
      showPanel(
        'Philippine General Hospital',
        '<b>Address:</b> HXGP+R2H, Taft Ave, Ermita, Manila, 1000 Metro Manila',
        '<b>Phone:</b> (02) 8554 8400',
        '<b>Open:</b> Open 24 Hours',
        'images/PGH.jpg'
      );
    });

  L.marker([14.5825235,120.9855086], { icon: redIcon })
    .addTo(map)
    .on('click', () => {
      showPanel(
        'ManilaMed',
        '<b>Address:</b> 850 United Nations Ave, Paco, Manila, Metro Manila',
        '<b>Phone:</b> (02) 8523 8131',
        '<b>Open:</b> Open 24 Hours',
        'images/manilamed.jpg'
      );
    });

  L.marker([14.5819604,120.9829936], { icon: redIcon })
    .addTo(map)
    .on('click', () => {
      showPanel(
        'Manila Doctors Hospital',
        '<b>Address:</b> 667 United Nations Ave, Ermita, Manila, 1000 Metro Manila',
        '<b>Phone:</b> (02) 8558 0888',
        '<b>Open:</b> Open 24 Hours',
        'images/madocs.png'
      );
    });