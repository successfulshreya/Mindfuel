const API_BASE_URL = "https://backend-git-main-shreya-sahus-projects-6949e5da.vercel.app";
fetch('navbar.html')
    .then(res=>res.text())
    .then(data=>{
      document.getElementById('navbar-container').innerHTML =data;
    });
// Go to Greeting page with username
function goToGreeting() {
  const name = document.getElementById("username").value.trim();

  if (name !== "") {
      localStorage.setItem("username", name);
      window.location.href = "greeting.html"; 
  } else {
      alert("Please enter your name!");
  }
}

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', function () {
  // Clear localStorage items
  localStorage.removeItem('token');
  localStorage.removeItem('username'); // This was missing in your code

  // Redirect to login page
  window.location.href = 'login.html';
});

// Login functionality
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
          // const res = await fetch('http://localhost:3000/api/auth/login', {   
            // const res = await fetch ('https://mindfuel-backend.onrender.com',{
              const res = await fetch('https://mindfuel-backend.onrender.com/api/auth/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ email, password })
          });

          const data = await res.json();

          if (res.ok) {
              localStorage.setItem('token', data.token);
              localStorage.setItem('user', JSON.stringify(data.user));
              alert('Login successful!');
              window.location.href = 'greeting.html';
          } else {
              alert(data.message || data.error || 'Invalid email or password');
          }
      } catch (err) {
          alert('Error logging in');
      }
  });
}

// Signup functionality (added)
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
          // const res = await fetch('http://localhost:3000/api/auth/signup', {
            // const res =await fetch('https://mindfuel-backend.onrender.com',{
              const res =await fetch('https://mindfuel-backend.onrender.com/api/auth/signup',{
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ name, email, password })
          });

          const data = await res.json();

          if (res.ok) {
              alert('Signup successful!');
              window.location.href = 'login.html';  // Redirect to login page after successful signup
          } else {
              alert(data.message || data.error || 'Signup failed');
          }
      } catch (err) {
          alert('Server error');
      }
  });
}

// Protected route to fetch profile (testing token)
// fetch('http://localhost:3000/api/protected/profile', {
  fetch('https://mindfuel-backend.onrender.com', {
  method: 'GET',
  headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
})
.then(res => res.json())
.then(data => {
  console.log(data);
})
.catch(err => {
  console.error('Error fetching profile:', err);
});




app.post("/api/detect-mood", (req, res) => {
    const { thought } = req.body;
  
    if (!thought) {
      return res.status(400).json({ error: "Thought is required!" });
    }
  
    // Simple sentiment analysis logic
    const lower = thought.toLowerCase();
    let mood = "neutral";
  
    if (lower.includes("happy") || lower.includes("excited") || lower.includes("great")) {
      mood = "happy";
    } else if (lower.includes("sad") || lower.includes("cry") || lower.includes("depressed")) {
      mood = "sad";
    } else if (lower.includes("angry") || lower.includes("frustrated") || lower.includes("mad")) {
      mood = "angry";
    } else if (lower.includes("anxious") || lower.includes("nervous") || lower.includes("worried")) {
      mood = "anxious";
    }
  
    const moodResponses = {
      happy: "Great to hear you're happy! Keep it up!",
      sad: "It's okay to feel sad. Take a deep breath.",
      angry: "Anger can be overwhelming. Try to find your peace.",
      anxious: "Anxiety is tough. Focus on your breath.",
      neutral: "You seem calm. Stay balanced and take it easy."
    };
  
    res.json({ mood, message: moodResponses[mood] });
  });
