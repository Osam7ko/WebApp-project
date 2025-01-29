function loadHeader() {
    fetch('/HeaderComponent/header.html')
        .then((response) => response.text())
        .then((data) => {
            document.body.insertAdjacentHTML('afterbegin', data);

            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Check login status
            const username = localStorage.getItem('username');
            const loginLink = document.querySelector('a[href="/auth/login.html"]');
            const signupLink = document.querySelector('a[href="/auth/regester.html"]');
            const nav = document.querySelector('.navigation');
            const welcomeUser = document.querySelector('#welcome-user');

            // Clear previous content for safety
            const existingLogout = document.querySelector('.logout-link');
            if (existingLogout) {
                existingLogout.remove();
            }

            if (isLoggedIn && username) {
                // Update welcome message
                if (welcomeUser) {
                    welcomeUser.textContent = `Welcome, ${username}`;
                }

                // Hide login and signup links
                if (loginLink) loginLink.style.display = 'none';
                if (signupLink) signupLink.style.display = 'none';

                // Create and add the logout link
                const logoutLink = document.createElement('a');
                logoutLink.textContent = 'Logout';
                logoutLink.className = 'logout-link'; // Add a class for easier targeting
                logoutLink.style.cursor = 'pointer';
                logoutLink.style.marginLeft = '20px';
                logoutLink.style.color = 'red';
                nav.appendChild(logoutLink);

                // Add event listener for logout
                logoutLink.addEventListener('click', () => {
                    localStorage.removeItem('username');
                    localStorage.setItem('isLoggedIn', 'false');
                    alert('Logged out successfully!');
                    window.location.href = '/auth/login.html'; // Redirect to login page
                });
            } else {
                // Ensure login and signup links are visible for guests
                if (welcomeUser) welcomeUser.textContent = '';

                if (loginLink) loginLink.style.display = 'block';
                if (signupLink) signupLink.style.display = 'block';
            }
        })
        .catch((error) => console.error('Error loading header:', error));
}

// Call the function when the page loads
window.onload = loadHeader;
