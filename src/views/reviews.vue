<script setup>
import { ref, onMounted, computed } from 'vue';
import { ALL_REVIEWS_API_URL } from '../utils/api.js';
import { useRouter } from 'vue-router';

const router = useRouter();
const reviews = ref([]);
const searchQuery = ref('');
const showImages = ref(false); // Default to not showing images

// Toggle images display
const toggleImages = () => {
  showImages.value = !showImages.value;
};

// Computed property for filtered reviews
const filteredReviews = computed(() => {
  if (!searchQuery.value) return reviews.value;
  
  const query = searchQuery.value.toLowerCase();
  return reviews.value.filter(review => 
    (review.Title && review.Title.toLowerCase().includes(query)) ||
    (review.Director && review.Director.toLowerCase().includes(query)) ||
    (review.Genre && review.Genre.toLowerCase().includes(query)) ||
    (review.Critic && review.Critic.toLowerCase().includes(query))
  );
});

const fetchReviews = async () => {
    const response = await fetch(ALL_REVIEWS_API_URL);
    const data = await response.json();
    reviews.value = data.data;
    console.log('Fetched reviews:', data.data);
}

onMounted(() => {
    fetchReviews();
});
</script>

<template>
  <div class="reviews-container">
    <div class="header-section">
      <h1>Discover Movies</h1>
      <p class="subtitle">Find your next favorite film with expert reviews</p>
    </div>
    
    <!-- Search Bar -->
    <div class="search-container">
      <div class="search-wrapper">
        <span class="search-icon">🔍</span>
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search by title, director, genre..." 
          class="search-input"
        />
        <button v-if="searchQuery" @click="searchQuery = ''" class="clear-search">✕</button>
      </div>
      
      <div class="view-options">
        <button @click="toggleImages" class="view-toggle-btn">
          {{ showImages ? 'Hide Images' : 'Show Images' }}
        </button>
      </div>
    </div>
    
    <div v-if="reviews.length === 0" class="loading">
      <div class="loading-animation">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <p>Loading the best reviews for you...</p>
    </div>
    
    <!-- No Results Message -->
    <div v-else-if="filteredReviews.length === 0" class="no-results">
      <div class="no-results-icon">🎬</div>
      <h3>No matches found</h3>
      <p>No reviews found matching "{{ searchQuery }}".</p>
      <button @click="searchQuery = ''" class="try-again-btn">Clear Search</button>
    </div>
    
    <div v-else class="reviews-list">
      <router-link 
        v-for="review in filteredReviews" 
        :key="review.id" 
        :to="{ name: 'review-details', params: { id: review.documentId || review.id } }"
        class="review-card-link"
      >
        <div class="review-card">
          <!-- Cover image if available and enabled -->
          <div v-if="showImages" class="review-cover">
            <div v-if="review.Cover" class="review-image">
              <img :src="`https://review-site-backend-h459.onrender.com${review.Cover.url}`" 
                  :alt="review.Title || 'Review cover'" />
            </div>
            <div v-else class="review-image no-image">
              <div class="placeholder-text">{{ review.Title ? review.Title.charAt(0) : 'M' }}</div>
            </div>
            <div class="review-pill" v-if="review.Genre">{{ review.Genre }}</div>
          </div>
          
          <div class="card-content" :class="{ 'no-image-content': !showImages }">
            <div v-if="!showImages && review.Genre" class="text-pill">{{ review.Genre }}</div>
            
            <h2 class="review-title">{{ review.Title || 'Untitled Review' }}</h2>
            
            <div class="review-rating">
              <div class="stars">
                <span v-for="i in 5" :key="i" 
                    :class="['star', i <= review.Rating ? 'active' : '']">★</span>
              </div>
              <span class="rating-number">{{ review.Rating }}</span>
            </div>
            
            <div class="review-meta">
              <div v-if="review.Director" class="director">
                <span class="director-label">Director:</span>
                <span class="director-name">{{ review.Director }}</span>
              </div>
            </div>
            
            <div class="view-details">
              <span>View Details</span>
              <span class="arrow">→</span>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.reviews-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.header-section {
  text-align: center;
  margin: 40px 0;
}

h1 {
  font-size: 3rem;
  margin-bottom: 16px;
  color: var(--dark);
  font-weight: 700;
}

.subtitle {
  font-size: 1.1rem;
  color: var(--grey);
  max-width: 600px;
  margin: 0 auto;
}

.search-container {
  margin-bottom: 40px;
}

.search-wrapper {
  position: relative;
  max-width: 700px;
  margin: 0 auto;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.1rem;
  color: var(--grey);
}

.search-input {
  width: 100%;
  padding: 16px 16px 16px 48px;
  font-size: 1rem;
  border: none;
  border-radius: var(--radius-large);
  background-color: var(--grey-light);
  transition: all 0.3s;
  outline: none;
  color: var(--dark);
}

.search-input::placeholder {
  color: var(--grey);
  opacity: 0.8;
}

.search-input:focus {
  background-color: white;
  box-shadow: 0 4px 20px var(--shadow);
}

.clear-search {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--grey);
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.clear-search:hover {
  background-color: rgba(0, 0, 0, 0.05);
  color: var(--primary);
}

.loading {
  text-align: center;
  font-size: 1.1rem;
  color: var(--grey);
  margin: 80px 0;
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

.no-results {
  text-align: center;
  margin: 80px 0;
  padding: 40px;
  background-color: white;
  border-radius: var(--radius-medium);
  box-shadow: 0 4px 20px var(--shadow);
}

.no-results-icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.no-results h3 {
  font-size: 1.4rem;
  margin-bottom: 12px;
  color: var(--text);
}

.no-results p {
  color: var(--grey);
  margin-bottom: 24px;
}

.try-again-btn {
  background-color: var(--primary);
  color: white;
  padding: 12px 24px;
  border-radius: var(--radius-medium);
  font-weight: 600;
  transition: background-color 0.2s;
}

.try-again-btn:hover {
  background-color: var(--primary-dark);
}

.reviews-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 24px;
}

.review-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
  border-radius: var(--radius-large);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.review-card-link:hover {
  transform: translateY(-8px);
}

.review-card {
  height: 100%;
  display: flex;
  flex-direction: row;
  background-color: white;
  border-radius: var(--radius-large);
  overflow: hidden;
  box-shadow: 0 10px 30px var(--shadow);
  transition: all 0.3s ease;
}

/* Create 5 different color card variants */
.review-card-link:nth-child(5n+1) .review-card {
  background-color: rgba(255, 82, 82, 0.15); /* Red - increased from 0.07 */
}

.review-card-link:nth-child(5n+2) .review-card {
  background-color: rgba(121, 134, 203, 0.15); /* Blue-purple - increased from 0.07 */
}

.review-card-link:nth-child(5n+3) .review-card {
  background-color: rgba(255, 213, 79, 0.15); /* Gold/amber - increased from 0.07 */
}

.review-card-link:nth-child(5n+4) .review-card {
  background-color: rgba(76, 175, 80, 0.15); /* Green - increased from 0.07 */
}

.review-card-link:nth-child(5n+5) .review-card {
  background-color: rgba(156, 39, 176, 0.15); /* Purple - increased from 0.07 */
}

.review-card-link:hover .review-card {
  box-shadow: 0 20px 40px var(--shadow-stronger);
}

.review-card-link:nth-child(5n+1):hover .review-card {
  background-color: rgba(255, 82, 82, 0.25); /* Increased from 0.12 */
}

.review-card-link:nth-child(5n+2):hover .review-card {
  background-color: rgba(121, 134, 203, 0.25); /* Increased from 0.12 */
}

.review-card-link:nth-child(5n+3):hover .review-card {
  background-color: rgba(255, 213, 79, 0.25); /* Increased from 0.12 */
}

.review-card-link:nth-child(5n+4):hover .review-card {
  background-color: rgba(76, 175, 80, 0.25); /* Increased from 0.12 */
}

.review-card-link:nth-child(5n+5):hover .review-card {
  background-color: rgba(156, 39, 176, 0.25); /* Increased from 0.12 */
}

.review-cover {
  position: relative;
  width: 100px;
  min-width: 100px;
  flex-shrink: 0;
}

.review-image {
  position: relative;
  height: 100%;
  background-color: var(--grey-light);
  overflow: hidden;
}

.review-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.review-card-link:hover .review-image img {
  transform: scale(1.05);
}

.no-image {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary), var(--tertiary));
  height: 100%;
}

.placeholder-text {
  font-size: 2rem;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.review-pill {
  position: absolute;
  top: 8px;
  left: 8px;
  background-color: #9C27B0;
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 20px;
  text-transform: capitalize;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
}

.review-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--text);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

.review-rating {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.stars {
  display: flex;
  margin-right: 10px;
}

.star {
  font-size: 1.1rem;
  color: #E0E0E0;
  margin-right: 2px;
}

.star.active {
  color: var(--secondary);
}

.rating-number {
  font-weight: 600;
  color: var(--text);
}

.review-meta {
  margin-top: 12px;
  font-size: 0.9rem;
  color: var(--grey);
  flex-grow: 1;
}

.director {
  display: flex;
  align-items: center;
}

.director-label {
  font-weight: 500;
  margin-right: 6px;
}

.director-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.view-details {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--grey-light);
  font-weight: 600;
  color: var(--primary);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.arrow {
  transition: transform 0.2s;
}

.review-card-link:hover .arrow {
  transform: translateX(4px);
}

.view-options {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}

.view-toggle-btn {
  background-color: var(--grey-light);
  color: var(--text);
  border: none;
  padding: 8px 16px;
  border-radius: var(--radius-medium);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.view-toggle-btn:hover {
  background-color: var(--grey);
  color: white;
}

.no-image-content {
  padding: 24px;
}

.text-pill {
  display: inline-block;
  background-color: #9C27B0;
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 20px;
  text-transform: capitalize;
  margin-bottom: 12px;
}

@media (max-width: 768px) {
  .reviews-list {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  .card-content {
    padding: 16px;
  }
  
  .review-title {
    font-size: 1.1rem;
  }
  
  .search-input {
    padding: 14px 14px 14px 44px;
  }
}

@media (max-width: 480px) {
  .reviews-list {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .card-content {
    padding: 12px;
  }
  
  .no-image-content {
    padding: 20px;
  }
  
  .review-title {
    font-size: 1rem;
    margin-bottom: 8px;
  }
  
  .view-details {
    margin-top: 12px;
    padding-top: 12px;
    font-size: 0.9rem;
  }
}
</style>