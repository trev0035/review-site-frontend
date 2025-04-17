<script setup>
import { ref, onMounted, computed } from 'vue';
import { ALL_REVIEWS_API_URL } from '../utils/api.js';
import { useRouter } from 'vue-router';

const router = useRouter();
const featuredReviews = ref([]);
const isLoading = ref(true);

// Get a random subset of reviews to feature on the homepage
const fetchFeaturedReviews = async () => {
  try {
    const response = await fetch(ALL_REVIEWS_API_URL);
    const data = await response.json();
    
    // Get up to 4 reviews with covers if possible
    const withCovers = data.data.filter(review => review.Cover);
    const withoutCovers = data.data.filter(review => !review.Cover);
    
    // Prioritize reviews with covers
    let selectedReviews = [...withCovers];
    
    // If we don't have enough with covers, add some without
    if (selectedReviews.length < 4) {
      selectedReviews = [...selectedReviews, ...withoutCovers.slice(0, 4 - selectedReviews.length)];
    }
    
    // Randomize and limit to 4
    featuredReviews.value = selectedReviews
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
      
  } catch (error) {
    console.error('Error fetching featured reviews:', error);
  } finally {
    isLoading.value = false;
  }
};

const navigateToReviews = () => {
  router.push({ name: 'reviews' });
};

onMounted(() => {
  fetchFeaturedReviews();
});
</script>

<template>
  <div class="home-container">
    <!-- Hero section -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Discover the Best in Cinema</h1>
        <p class="hero-subtitle">
          Explore our collection of positive movie reviews and find your next favorite film
        </p>
        <button @click="navigateToReviews" class="hero-button">
          Browse Reviews
        </button>
      </div>
    </div>
    
    <!-- Welcome section -->
    <div class="welcome-section">
      <div class="welcome-text">
        <h2>Welcome to Sonrisa Film</h2>
        <p>
          At Sonrisa Film, we believe in celebrating the art of cinema with a positive mindset. 
          Our platform features thoughtful reviews that highlight the strengths and unique qualities of each film.
        </p>
        <p>
          We focus on what makes movies special rather than dwelling on flaws, 
          helping you approach each viewing experience with an open mind and appreciation for the filmmaker's vision.
        </p>
      </div>
    </div>
    
    <!-- Featured reviews section -->
    <div class="featured-section">
      <h2 class="section-title">Featured Reviews</h2>
      
      <div v-if="isLoading" class="loading-container">
        <div class="loading-animation">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
        <p>Loading featured reviews...</p>
      </div>
      
      <div v-else class="featured-reviews">
        <router-link 
          v-for="review in featuredReviews" 
          :key="review.id" 
          :to="{ name: 'review-details', params: { id: review.documentId || review.id } }"
          class="featured-card"
        >
          <div v-if="review.Cover" class="featured-cover">
            <img :src="`https://review-site-backend-h459.onrender.com${review.Cover.url}`" 
                 :alt="review.Title" />
          </div>
          <div v-else class="featured-cover no-cover">
            <span>{{ review.Title ? review.Title.charAt(0) : 'M' }}</span>
          </div>
          <div class="featured-info">
            <h3>{{ review.Title }}</h3>
            <div class="featured-rating">
              <div class="stars">
                <span v-for="i in 5" :key="i" 
                      :class="['star', i <= review.Rating ? 'active' : '']">★</span>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      
      <div class="view-all">
        <router-link :to="{ name: 'reviews' }" class="view-all-link">
          View All Reviews <span class="arrow">→</span>
        </router-link>
      </div>
    </div>
    
    <!-- Why choose us section -->
    <div class="why-section">
      <h2 class="section-title">Why Choose Sonrisa Film?</h2>
      
      <div class="features">
        <div class="feature">
          <div class="feature-icon">✨</div>
          <h3>Positive Perspective</h3>
          <p>We focus on what makes each film special, highlighting strengths instead of flaws.</p>
        </div>
        
        <div class="feature">
          <div class="feature-icon">🎭</div>
          <h3>Diverse Selection</h3>
          <p>From indie gems to blockbusters, we cover films across all genres and styles.</p>
        </div>
        
        <div class="feature">
          <div class="feature-icon">🧠</div>
          <h3>Open-Minded Approach</h3>
          <p>We believe every film deserves appreciation for its unique artistic vision.</p>
        </div>
      </div>
    </div>
    
    <!-- CTA section -->
    <div class="cta-section">
      <h2>Ready to Discover Your Next Favorite Film?</h2>
      <button @click="navigateToReviews" class="cta-button">Explore All Reviews</button>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.hero-section {
  height: 500px;
  margin: 0 -24px 60px;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)), 
                    url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  text-align: center;
}

.hero-content {
  max-width: 700px;
}

.hero-title {
  font-size: 3.5rem;
  color: white;
  margin-bottom: 20px;
  font-weight: 700;
  line-height: 1.1;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.hero-subtitle {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 40px;
  line-height: 1.5;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
}

.hero-button {
  background-color: var(--primary);
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 15px 40px;
  border-radius: var(--radius-medium);
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.hero-button:hover {
  background-color: var(--primary-dark);
  transform: translateY(-3px);
}

.welcome-section {
  margin: 80px 0;
  text-align: center;
}

.welcome-text {
  max-width: 800px;
  margin: 0 auto;
}

.welcome-text h2 {
  font-size: 2.2rem;
  color: var(--dark);
  margin-bottom: 24px;
  font-weight: 700;
}

.welcome-text p {
  font-size: 1.1rem;
  color: var(--text);
  line-height: 1.7;
  margin-bottom: 20px;
}

.section-title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 40px;
  color: var(--dark);
  font-weight: 700;
}

.featured-section {
  margin: 80px 0;
}

.loading-container {
  text-align: center;
  padding: 40px 0;
}

.loading-animation {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.dot {
  width: 12px;
  height: 12px;
  margin: 0 6px;
  border-radius: 50%;
  background-color: var(--primary);
  animation: bounce 1.5s infinite ease-in-out;
}

.dot:nth-child(1) { animation-delay: 0s; }
.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes bounce {
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-20px); }
}

.featured-reviews {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.featured-card {
  background-color: white;
  border-radius: var(--radius-medium);
  overflow: hidden;
  box-shadow: 0 10px 25px var(--shadow);
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s, box-shadow 0.3s;
}

.featured-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px var(--shadow-stronger);
}

.featured-cover {
  height: 200px;
  overflow: hidden;
  position: relative;
}

.featured-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.featured-card:hover .featured-cover img {
  transform: scale(1.05);
}

.no-cover {
  background: linear-gradient(135deg, var(--primary), var(--tertiary));
  display: flex;
  align-items: center;
  justify-content: center;
}

.no-cover span {
  font-size: 4rem;
  color: white;
  font-weight: bold;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.featured-info {
  padding: 20px;
}

.featured-info h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: var(--text);
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.featured-rating {
  display: flex;
  align-items: center;
}

.stars {
  display: flex;
}

.star {
  font-size: 1rem;
  color: #E0E0E0;
  margin-right: 2px;
}

.star.active {
  color: var(--secondary);
}

.view-all {
  text-align: center;
  margin-top: 40px;
}

.view-all-link {
  display: inline-flex;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--primary);
  text-decoration: none;
  padding: 10px 20px;
  border-radius: var(--radius-medium);
  transition: background-color 0.2s;
}

.view-all-link:hover {
  background-color: rgba(255, 82, 82, 0.1);
}

.arrow {
  margin-left: 8px;
  transition: transform 0.2s;
}

.view-all-link:hover .arrow {
  transform: translateX(5px);
}

.why-section {
  margin: 80px 0;
  padding: 60px 0;
  background-color: var(--grey-light);
  margin-left: -24px;
  margin-right: -24px;
  padding-left: 24px;
  padding-right: 24px;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.feature {
  background-color: white;
  border-radius: var(--radius-medium);
  padding: 30px;
  text-align: center;
  box-shadow: 0 5px 20px var(--shadow);
  transition: transform 0.3s;
}

.feature:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.feature h3 {
  font-size: 1.4rem;
  margin-bottom: 15px;
  color: var(--text);
}

.feature p {
  color: var(--grey);
  line-height: 1.6;
}

.cta-section {
  margin: 80px 0;
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, var(--primary), var(--tertiary));
  border-radius: var(--radius-large);
  color: white;
}

.cta-section h2 {
  font-size: 2rem;
  margin-bottom: 30px;
  font-weight: 700;
}

.cta-button {
  background-color: white;
  color: var(--primary);
  font-size: 1.1rem;
  font-weight: 600;
  padding: 15px 40px;
  border-radius: var(--radius-medium);
  border: none;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .hero-section {
    height: 450px;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .section-title, .welcome-text h2, .cta-section h2 {
    font-size: 1.8rem;
  }
  
  .features {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    height: 400px;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
    margin-bottom: 30px;
  }
  
  .hero-button, .cta-button {
    padding: 12px 25px;
    font-size: 1rem;
  }
  
  .featured-reviews {
    grid-template-columns: 1fr;
  }
  
  .welcome-text p, .feature p {
    font-size: 1rem;
  }
}
</style> 