<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMenu = () => {
  isMobileMenuOpen.value = false;
};
</script>

<template>
  <nav class="navbar">
    <div class="nav-container">
      <router-link :to="{ name: 'home' }" class="logo">
        <span class="logo-icon">🎬</span>
        <span class="logo-text">Sonrisa Film</span>
      </router-link>
      
      <div class="mobile-menu-button" @click="toggleMobileMenu">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>
      
      <ul class="nav-menu" :class="{ 'active': isMobileMenuOpen }">
        <li class="nav-item">
          <router-link :to="{ name: 'home' }" class="nav-link" @click="closeMenu">
            <span class="nav-icon">🏠</span>
            <span>Home</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'reviews' }" class="nav-link" @click="closeMenu">
            <span class="nav-icon">🎭</span>
            <span>Reviews</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'about' }" class="nav-link" @click="closeMenu">
            <span class="nav-icon">ℹ️</span>
            <span>About</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'contact' }" class="nav-link" @click="closeMenu">
            <span class="nav-icon">📧</span>
            <span>Contact</span>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: var(--light);
  box-shadow: 0 2px 20px var(--shadow);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  max-width: 1200px;
  margin: 0 auto;
  height: 70px;
}

.logo {
  display: flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
}

.logo-icon {
  font-size: 1.8rem;
  margin-right: 8px;
}

.logo-text {
  font-size: 1.6rem;
  font-weight: 700;
  background: linear-gradient(90deg, var(--primary), var(--tertiary));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 10px;
}

.nav-item {
  margin-left: 10px;
}

.nav-link {
  color: var(--text);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 10px 16px;
  border-radius: var(--radius-medium);
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
}

.nav-icon {
  margin-right: 6px;
  font-size: 1.2rem;
}

.nav-link:hover {
  background-color: var(--grey-light);
}

.router-link-active {
  color: var(--primary);
  background-color: rgba(255, 82, 82, 0.1);
}

.mobile-menu-button {
  display: none;
  cursor: pointer;
  background: none;
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}

.mobile-menu-button:hover {
  background-color: var(--grey-light);
}

.bar {
  display: block;
  width: 24px;
  height: 2px;
  margin: 3px auto;
  transition: all 0.3s ease;
  background-color: var(--text);
  border-radius: 2px;
}

@media (max-width: 768px) {
  .mobile-menu-button {
    display: flex;
  }
  
  .nav-menu {
    position: fixed;
    left: -100%;
    top: 70px;
    flex-direction: column;
    background-color: var(--light);
    width: 100%;
    text-align: center;
    transition: 0.3s;
    box-shadow: 0 10px 20px var(--shadow-stronger);
    padding: 20px 0;
    z-index: 99;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
  
  .nav-menu.active {
    left: 0;
  }
  
  .nav-item {
    margin: 5px 20px;
  }
  
  .nav-link {
    justify-content: center;
    padding: 12px;
  }
}
</style> 