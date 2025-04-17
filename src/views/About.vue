<script setup>
// No reactivity needed for the About page
</script>

<template>
  <div class="about-container">
    <div class="about-header">
      <h1>About Sonrisa Film</h1>
      <div class="subtitle">Celebrating the positive side of cinema</div>
    </div>
    
    <div class="about-content">
      <section class="mission-section">
        <h2>Our Mission</h2>
        <div class="mission-content">
          <div class="mission-text">
            <p>At Sonrisa Film, we believe that every film has something valuable to offer. Our mission is simple: to provide a space where the positive aspects of cinema are celebrated, encouraging viewers to approach each film with an open mind and receptive spirit.</p>
            <p>Unlike traditional review platforms that often focus on criticizing flaws, we highlight what makes each movie special, unique, and worth experiencing. We believe that enjoying films is a deeply personal experience, and our goal is to help you discover movies that might resonate with you.</p>
          </div>
          <div class="mission-image">
            <img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" alt="Cinema experience">
          </div>
        </div>
      </section>
      
      <section class="values-section">
        <h2>Our Values</h2>
        
        <div class="values-grid">
          <div class="value-card">
            <div class="value-icon">💖</div>
            <h3>Positivity</h3>
            <p>We focus on what works in a film rather than dwelling on what doesn't. Every movie has redeeming qualities worth appreciating.</p>
          </div>
          
          <div class="value-card">
            <div class="value-icon">🧠</div>
            <h3>Open-Mindedness</h3>
            <p>We approach each film on its own terms, considering its intentions and the audience it aims to please.</p>
          </div>
          
          <div class="value-card">
            <div class="value-icon">🎭</div>
            <h3>Diversity</h3>
            <p>We celebrate films from all genres, countries, and styles, recognizing that cinema's beauty lies in its incredible variety.</p>
          </div>
          
          <div class="value-card">
            <div class="value-icon">🎬</div>
            <h3>Appreciation</h3>
            <p>We believe in appreciating the enormous effort that goes into filmmaking and honoring the creative vision behind each movie.</p>
          </div>
        </div>
      </section>
      
      <section class="approach-section">
        <h2>Our Approach to Reviews</h2>
        
        <div class="approach-content">
          <p>When our critics review a film, they focus on:</p>
          
          <ul class="approach-list">
            <li>
              <strong>What the film does well</strong> — Whether it's compelling performances, beautiful cinematography, or an engaging story
            </li>
            <li>
              <strong>Who might enjoy it</strong> — Identifying the audience that would appreciate the film's strengths
            </li>
            <li>
              <strong>Standout moments</strong> — Highlighting memorable scenes or elements that make the film unique
            </li>
            <li>
              <strong>Creative achievements</strong> — Recognizing technical innovations, artistic risks, or creative solutions
            </li>
          </ul>
          
          <p>We believe this approach encourages viewers to form their own opinions and discover films they might otherwise overlook based on traditional criticism.</p>
        </div>
      </section>
      
      <section class="team-section">
        <h2>Our Team</h2>
        
        <p class="team-intro">We're a group of film enthusiasts from diverse backgrounds united by our love for cinema and our belief in its power to inspire, entertain, and transform.</p>
        
        <div class="team-cta">
          <p>Interested in joining our team of positive reviewers?</p>
          <router-link :to="{ name: 'reviews' }" class="team-button">Contact Us</router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.about-header {
  text-align: center;
  margin: 40px 0 60px;
}

h1 {
  font-size: 3rem;
  color: var(--dark);
  margin-bottom: 16px;
  font-weight: 700;
}

.subtitle {
  font-size: 1.3rem;
  color: var(--grey);
}

.about-content {
  margin-bottom: 80px;
}

section {
  margin-bottom: 80px;
}

h2 {
  font-size: 2rem;
  color: var(--dark);
  margin-bottom: 30px;
  font-weight: 600;
  position: relative;
  display: inline-block;
}

h2::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, var(--primary), var(--tertiary));
  border-radius: 2px;
}

.mission-content {
  display: flex;
  gap: 40px;
  align-items: center;
}

.mission-text {
  flex: 1;
}

.mission-text p {
  margin-bottom: 20px;
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--text);
}

.mission-image {
  flex: 1;
  max-width: 500px;
}

.mission-image img {
  width: 100%;
  height: auto;
  border-radius: var(--radius-medium);
  box-shadow: 0 10px 30px var(--shadow);
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.value-card {
  background-color: white;
  padding: 30px;
  border-radius: var(--radius-medium);
  box-shadow: 0 5px 20px var(--shadow);
  transition: transform 0.3s;
}

.value-card:hover {
  transform: translateY(-5px);
}

.value-icon {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.value-card h3 {
  font-size: 1.4rem;
  margin-bottom: 15px;
  color: var(--text);
}

.value-card p {
  color: var(--grey);
  line-height: 1.6;
}

.approach-content {
  background-color: white;
  padding: 40px;
  border-radius: var(--radius-medium);
  box-shadow: 0 5px 20px var(--shadow);
}

.approach-content p {
  margin-bottom: 20px;
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--text);
}

.approach-list {
  margin: 30px 0;
  padding-left: 20px;
}

.approach-list li {
  margin-bottom: 20px;
  font-size: 1.1rem;
  line-height: 1.6;
}

.team-section {
  text-align: center;
}

.team-intro {
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto 40px;
  line-height: 1.7;
  color: var(--text);
}

.team-cta {
  background: linear-gradient(135deg, var(--primary), var(--tertiary));
  padding: 50px 30px;
  border-radius: var(--radius-large);
  color: white;
  margin-top: 40px;
}

.team-cta p {
  font-size: 1.3rem;
  margin-bottom: 25px;
}

.team-button {
  display: inline-block;
  background-color: white;
  color: var(--primary);
  padding: 15px 40px;
  border-radius: var(--radius-medium);
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.team-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

@media (max-width: 900px) {
  .mission-content {
    flex-direction: column;
  }
  
  .mission-image {
    order: -1;
    margin-bottom: 30px;
  }
  
  h1 {
    font-size: 2.5rem;
  }
  
  h2 {
    font-size: 1.8rem;
  }
}

@media (max-width: 768px) {
  .values-grid {
    grid-template-columns: 1fr;
  }
  
  .approach-content {
    padding: 30px;
  }
  
  .team-cta {
    padding: 40px 20px;
  }
  
  .team-button {
    padding: 12px 30px;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1.1rem;
  }
  
  .mission-text p, .approach-content p, .approach-list li {
    font-size: 1rem;
  }
  
  .team-intro {
    font-size: 1.1rem;
  }
  
  .team-cta p {
    font-size: 1.1rem;
  }
}
</style> 