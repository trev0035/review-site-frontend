<script setup>
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
</script>

<template>
  <div class="app">
    <NavBar />
    <main class="main-content">
      <RouterView />
    </main>
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-grid">
          <div class="footer-brand">
            <router-link :to="{ name: 'home' }" class="footer-logo">
              <span class="logo-icon">🎬</span>
              <span class="logo-text">Sonrisa Film</span>
            </router-link>
            <p class="footer-tagline">Celebrating the positive side of cinema</p>
          </div>
          
          <div class="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><router-link :to="{ name: 'home' }">Home</router-link></li>
              <li><router-link :to="{ name: 'reviews' }">Reviews</router-link></li>
              <li><router-link :to="{ name: 'about' }">About</router-link></li>
              <li><router-link :to="{ name: 'contact' }">Contact</router-link></li>
            </ul>
          </div>
          
          <div class="footer-social">
            <h3>Connect</h3>
            <div class="social-icons">
              <a href="#" aria-label="Twitter"><span>𝕏</span></a>
              <a href="#" aria-label="Instagram"><span>📸</span></a>
              <a href="#" aria-label="Facebook"><span>👤</span></a>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; {{ new Date().getFullYear() }} Sonrisa Film. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
/* Global styles */
:root {
  --primary: #FF5252; /* Vibrant red */
  --primary-dark: #D32F2F;
  --secondary: #FFD54F; /* Gold/amber */
  --tertiary: #7986CB; /* Blue-purple */
  --dark: #1A1A1A; /* Near black */
  --light: #FAFAFA; /* Off-white */
  --grey-light: #EEEEEE;
  --grey: #9E9E9E;
  --text: #212121;
  --shadow: rgba(0, 0, 0, 0.05);
  --shadow-stronger: rgba(0, 0, 0, 0.12);
  --radius-small: 8px;
  --radius-medium: 12px;
  --radius-large: 20px;
  --font-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-primary);
  line-height: 1.6;
  color: var(--text);
  background-color: var(--light);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  margin-top: 20px;
  padding-bottom: 40px;
}

h1, h2, h3, h4 {
  font-weight: 600;
  line-height: 1.2;
}

a {
  text-decoration: none;
  color: var(--primary);
  transition: all 0.2s ease;
}

button {
  cursor: pointer;
  border: none;
  font-family: var(--font-primary);
  transition: all 0.2s ease;
}

input {
  font-family: var(--font-primary);
}

.footer {
  padding: 50px 0 20px;
  background-color: var(--grey-light);
  color: var(--text);
  margin-top: 40px;
  width: 100%;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

.footer-brand .footer-logo {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  text-decoration: none;
}

.footer-brand .logo-icon {
  font-size: 1.6rem;
  margin-right: 8px;
  color: var(--text);
}

.footer-brand .logo-text {
  font-size: 1.4rem;
  font-weight: 700;
  background: linear-gradient(90deg, var(--primary), var(--tertiary));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.footer-tagline {
  color: var(--grey);
  font-size: 0.9rem;
  margin-bottom: 20px;
}

.footer-links h3, .footer-social h3 {
  color: var(--dark);
  font-size: 1.1rem;
  margin-bottom: 20px;
  font-weight: 600;
}

.footer-links ul {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 12px;
}

.footer-links a {
  color: var(--text);
  text-decoration: none;
  transition: color 0.2s;
  font-size: 0.95rem;
}

.footer-links a:hover {
  color: var(--primary);
}

.social-icons {
  display: flex;
  gap: 15px;
}

.social-icons a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  color: var(--text);
  font-size: 1.2rem;
  transition: all 0.3s;
  text-decoration: none;
}

.social-icons a:hover {
  background: var(--primary);
  color: white;
  transform: translateY(-3px);
}

.footer-bottom {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 0.9rem;
  color: var(--grey);
}

@media (max-width: 768px) {
  .footer {
    padding: 40px 0 20px;
  }
  
  .footer-grid {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 30px;
  }
  
  .footer-brand .footer-logo {
    justify-content: center;
  }
  
  .social-icons {
    justify-content: center;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: var(--light); 
}
 
::-webkit-scrollbar-thumb {
  background: var(--grey); 
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--primary); 
}
</style>
