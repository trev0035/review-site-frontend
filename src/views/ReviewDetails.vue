<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { SINGLE_REVIEW_API_URL } from '../utils/api.js';

const route = useRoute();
const review = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchReviewDetails = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    const reviewId = route.params.id;
    const apiUrl = SINGLE_REVIEW_API_URL(reviewId);
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`Error fetching review: ${response.statusText}`);
    }
    
    const data = await response.json();
    review.value = data.data;
    console.log('Fetched review details:', data.data);
  } catch (err) {
    console.error('Error fetching review:', err);
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchReviewDetails();
});
</script>

<template>
  <div class="review-details-container">
    <router-link :to="{ name: 'reviews' }" class="back-button">
      <span class="back-icon">←</span>
      <span>Back to Reviews</span>
    </router-link>
    
    <div v-if="loading" class="loading-container">
      <div class="loading-animation">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <p>Loading review details...</p>
    </div>
    
    <div v-else-if="error" class="error-container">
      <div class="error-icon">⚠️</div>
      <h3>Something went wrong</h3>
      <p>{{ error }}</p>
      <router-link :to="{ name: 'reviews' }" class="button">Return to Reviews</router-link>
    </div>
    
    <div v-else-if="review" class="review-content">
      <div class="review-card">
        <div v-if="review.Cover" class="review-cover">
          <img :src="`https://review-site-backend-h459.onrender.com${review.Cover.url}`" 
               :alt="review.Title || 'Review cover'" />
               
          <div class="review-overlay"></div>
          
          <div class="title-container">
            <h1>{{ review.Title || 'Untitled Review' }}</h1>
            
            <div class="review-rating-large">
              <div class="stars-large">
                <span v-for="i in 5" :key="i" 
                    :class="['star', i <= review.Rating ? 'active' : '']">★</span>
              </div>
              <span class="rating-text">{{ review.Rating }} / 5</span>
            </div>
          </div>
        </div>
        
        <div v-else class="review-cover no-cover">
          <div class="no-cover-gradient"></div>
          <div class="title-container">
            <h1>{{ review.Title || 'Untitled Review' }}</h1>
            
            <div class="review-rating-large">
              <div class="stars-large">
                <span v-for="i in 5" :key="i" 
                    :class="['star', i <= review.Rating ? 'active' : '']">★</span>
              </div>
              <span class="rating-text">{{ review.Rating }} / 5</span>
            </div>
          </div>
        </div>
        
        <div class="review-meta-details">
          <div class="meta-item" v-if="review.Director">
            <div class="meta-icon">🎬</div>
            <div class="meta-content">
              <div class="meta-label">Director</div>
              <div class="meta-value">{{ review.Director }}</div>
            </div>
          </div>
          
          <div class="meta-item" v-if="review.Genre">
            <div class="meta-icon">🎭</div>
            <div class="meta-content">
              <div class="meta-label">Genre</div>
              <div class="meta-value">{{ review.Genre }}</div>
            </div>
          </div>
          
          <div class="meta-item" v-if="review.Critic">
            <div class="meta-icon">👤</div>
            <div class="meta-content">
              <div class="meta-label">Critic</div>
              <div class="meta-value">{{ review.Critic }}</div>
            </div>
          </div>
          
          <div class="meta-item" v-if="review.createdAt">
            <div class="meta-icon">📅</div>
            <div class="meta-content">
              <div class="meta-label">Published</div>
              <div class="meta-value">{{ new Date(review.createdAt).toLocaleDateString() }}</div>
            </div>
          </div>
        </div>
        
        <div class="review-full-content">
          <div v-if="review.content" class="review-text">
            {{ review.content }}
          </div>
          <div v-else class="review-text no-content">
            <p>This review doesn't have a written critique yet.</p>
            <p class="no-content-sub">Check back later for the full review from our critics.</p>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="not-found-container">
      <div class="not-found-icon">🔍</div>
      <h2>Review Not Found</h2>
      <p>We couldn't find the review you're looking for.</p>
      <router-link :to="{ name: 'reviews' }" class="button">Return to Reviews</router-link>
    </div>
  </div>
</template>

<style scoped>
.review-details-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
}

.back-button {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text);
  padding: 12px 0;
  margin-bottom: 24px;
  transition: color 0.2s;
  text-decoration: none;
}

.back-icon {
  margin-right: 8px;
  font-size: 1.2rem;
}

.back-button:hover {
  color: var(--primary);
}

.loading-container, .error-container, .not-found-container {
  text-align: center;
  padding: 60px 0;
  margin: 40px 0;
  background-color: white;
  border-radius: var(--radius-medium);
  box-shadow: 0 4px 20px var(--shadow);
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

.error-icon, .not-found-icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.error-container h3, .not-found-container h2 {
  font-size: 1.6rem;
  margin-bottom: 12px;
  color: var(--text);
}

.error-container p, .not-found-container p {
  color: var(--grey);
  margin-bottom: 24px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.button {
  display: inline-block;
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: var(--radius-medium);
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  text-decoration: none;
}

.button:hover {
  background-color: var(--primary-dark);
}

.review-content {
  margin-bottom: 40px;
}

.review-card {
  background-color: white;
  border-radius: var(--radius-large);
  overflow: hidden;
  box-shadow: 0 10px 30px var(--shadow);
}

.review-cover {
  position: relative;
  height: 400px;
  overflow: hidden;
}

.review-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.review-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
}

.no-cover {
  height: 300px;
  display: flex;
  align-items: flex-end;
}

.no-cover-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--primary), var(--tertiary));
}

.title-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 40px;
  z-index: 2;
}

h1 {
  font-size: 2.5rem;
  margin: 0 0 16px 0;
  color: white;
  line-height: 1.2;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.review-rating-large {
  display: flex;
  align-items: center;
}

.stars-large {
  display: flex;
  margin-right: 12px;
}

.star {
  font-size: 1.6rem;
  color: rgba(255, 255, 255, 0.3);
  margin-right: 4px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.star.active {
  color: var(--secondary);
}

.rating-text {
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.review-meta-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  padding: 32px;
}

.meta-item {
  display: flex;
  align-items: flex-start;
}

.meta-icon {
  font-size: 1.8rem;
  margin-right: 12px;
  opacity: 0.9;
}

.meta-content {
  flex: 1;
}

.meta-label {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--grey);
  margin-bottom: 4px;
}

.meta-value {
  font-size: 1.1rem;
  color: var(--text);
  font-weight: 500;
}

.review-full-content {
  padding: 0 32px 40px;
}

.review-text {
  line-height: 1.8;
  font-size: 1.1rem;
  color: var(--text);
}

.no-content {
  text-align: center;
  color: var(--grey);
  padding: 32px;
  background-color: var(--grey-light);
  border-radius: var(--radius-medium);
}

.no-content p {
  font-size: 1.2rem;
  margin-bottom: 8px;
}

.no-content-sub {
  font-size: 1rem !important;
  opacity: 0.7;
}

@media (max-width: 768px) {
  .review-meta-details {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    padding: 24px;
    gap: 16px;
  }

  .review-cover {
    height: 300px;
  }

  .title-container {
    padding: 30px;
  }

  h1 {
    font-size: 2rem;
  }

  .star {
    font-size: 1.4rem;
  }
  
  .review-full-content {
    padding: 0 24px 32px;
  }
}

@media (max-width: 480px) {
  .review-meta-details {
    grid-template-columns: 1fr;
  }
  
  .review-cover {
    height: 220px;
  }
  
  .title-container {
    padding: 24px;
  }
  
  h1 {
    font-size: 1.6rem;
    margin-bottom: 10px;
  }
  
  .star {
    font-size: 1.2rem;
  }
  
  .rating-text {
    font-size: 1rem;
  }
  
  .meta-icon {
    font-size: 1.5rem;
  }
  
  .review-text {
    font-size: 1rem;
  }
}
</style> 