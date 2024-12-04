document.getElementById('sign-in-btn').addEventListener('click', () => {
    openModal('sign-in-modal');
  });
  
  document.getElementById('sign-in-submit').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    if (username === 'admin' && password === '1234') {
      alert('Welcome, Admin!');
      closeModal('sign-in-modal');
    } else {
      alert('Invalid credentials. Try again.');
    }
  });



  