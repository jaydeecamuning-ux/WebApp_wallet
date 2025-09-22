// script.js
const API_URL = "http://localhost:3000";
const tabLogin = document.getElementById('tab-login');
const tabReg = document.getElementById('tab-register');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const element = document.getElementById('error');


document.getElementById("otp_sent").addEventListener('click', sendOTP);
document.getElementById("btn_register").addEventListener('submit', verifyOTP);


tabLogin.addEventListener('click', () => {
  tabLogin.classList.add('active'); tabLogin.classList.remove('inactive');
  tabReg.classList.remove('active'); tabReg.classList.add('inactive');
  loginForm.style.display = 'block';
  registerForm.style.display = 'none';
});


tabReg.addEventListener('click', () => {
  tabReg.classList.add('active'); tabReg.classList.remove('inactive');
  tabLogin.classList.remove('active'); tabLogin.classList.add('inactive');
  loginForm.style.display = 'none';
  registerForm.style.display = 'block';
});


document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const key = document.getElementById('key').value.trim();
  if (!email || !key) {
    alert('Please enter both email and login key.');
    return;
  }
  alert('Submitted Login:\nEmail ' + email.value);
});


document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const pass = document.getElementById('regPassword').value.trim();
  const rePass = document.getElementById('rePass').value.trim();
  if (pass !== rePass) {
    document.getElementById("error").innerText = "Passwords do not match";
    return false;
  } else {
    document.getElementById("error").innerText = "";
  }
  alert('Registration Submitted:\Email' + email.value);
});


document.getElementById('showPass').addEventListener('change', function () {
  const pass = document.getElementById('regPassword');
  const rePass = document.getElementById('rePass');
  if (this.checked) {
    pass.type = 'text';
    rePass.type = 'text';
  } else {
    pass.type = 'password';
    rePass.type = 'password';
  }
});

function sendOTP() {
  const email = document.getElementById('reg_email').value;

  fetch(`${API_URL}/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert("OTP sent to " + email);
    } else {
      alert("Error: " + data.error);
    }
  })
  .catch(err => console.error(err));
}

function verifyOTP() {
  const email = document.getElementById("email").value;
  const otp = document.getElementById("otp").value;

  fetch(`${API_URL}/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert("Email verified successfully!");
    } else {
      alert("Error" + data.message);
    }
  })
  .catch(err => console.error(err));
}