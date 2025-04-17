<script setup>
import { ref } from 'vue';

const name = ref('');
const email = ref('');
const message = ref('');
const isSubmitting = ref(false);
const submissionStatus = ref(null);

const submitForm = async () => {
  if (!name.value || !email.value || !message.value) {
    return;
  }
  
  isSubmitting.value = true;
  
  try {
    // Here you would typically send the form data to a backend API
    // This is a mock submission for demonstration
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Reset form after successful submission
    name.value = '';
    email.value = '';
    message.value = '';
    submissionStatus.value = 'success';
    
    // Clear status after 5 seconds
    setTimeout(() => {
      submissionStatus.value = null;
    }, 5000);
    
  } catch (error) {
    console.error('Error submitting form:', error);
    submissionStatus.value = 'error';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="contact-container">
    <div class="contact-header">
      <h1>Contact Us</h1>
      <div class="subtitle">We'd love to hear from you</div>
    </div>
    
    <div class="contact-content">
      <div class="contact-info">
        <div class="contact-text">
          <h2>Get In Touch</h2>
          <p>Have a question about a film, want to suggest a movie for review, or interested in joining our team? We're here to help!</p>
          
          <div class="contact-methods">
            <div class="contact-method">
              <div class="method-icon">📧</div>
              <div class="method-details">
                <h3>Email</h3>
                <p>hello@sonrisafilm.com</p>
              </div>
            </div>
            
            <div class="contact-method">
              <div class="method-icon">📱</div>
              <div class="method-details">
                <h3>Social Media</h3>
                <p>@SonrisaFilm</p>
              </div>
            </div>
            
            <div class="contact-method">
              <div class="method-icon">🕒</div>
              <div class="method-details">
                <h3>Response Time</h3>
                <p>We aim to respond within 48 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="contact-form-container">
        <form @submit.prevent="submitForm" class="contact-form">
          <h2>Send Us a Message</h2>
          
          <div class="form-group">
            <label for="name">Your Name</label>
            <input 
              type="text" 
              id="name" 
              v-model="name" 
              placeholder="Enter your name"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              v-model="email" 
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="message">Message</label>
            <textarea 
              id="message" 
              v-model="message" 
              placeholder="What would you like to tell us?"
              rows="5"
              required
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            class="submit-button"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting">
              Sending...
            </span>
            <span v-else>
              Send Message
            </span>
          </button>
          
          <div v-if="submissionStatus === 'success'" class="status-message success">
            Message sent successfully! We'll get back to you soon.
          </div>
          
          <div v-if="submissionStatus === 'error'" class="status-message error">
            There was a problem sending your message. Please try again.
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.contact-header {
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

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  margin-bottom: 80px;
}

.contact-text {
  margin-bottom: 30px;
}

h2 {
  font-size: 2rem;
  color: var(--dark);
  margin-bottom: 20px;
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

.contact-text p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--text);
  margin-bottom: 30px;
}

.contact-methods {
  margin-top: 40px;
}

.contact-method {
  display: flex;
  margin-bottom: 25px;
  align-items: center;
}

.method-icon {
  font-size: 2rem;
  margin-right: 20px;
  min-width: 40px;
  text-align: center;
}

.method-details h3 {
  font-size: 1.2rem;
  margin-bottom: 5px;
  color: var(--dark);
}

.method-details p {
  color: var(--grey);
  margin: 0;
  font-size: 1rem;
}

.contact-form-container {
  background: white;
  border-radius: var(--radius-medium);
  box-shadow: 0 5px 20px var(--shadow);
  overflow: hidden;
}

.contact-form {
  padding: 40px;
}

.contact-form h2 {
  text-align: center;
  margin-bottom: 30px;
}

.contact-form h2::after {
  left: 50%;
  transform: translateX(-50%);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--dark);
}

input, textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid var(--grey-light);
  border-radius: var(--radius-small);
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus, textarea:focus {
  outline: none;
  border-color: var(--primary);
}

.submit-button {
  background: linear-gradient(135deg, var(--primary), var(--tertiary));
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 14px 30px;
  border-radius: var(--radius-medium);
  margin-top: 10px;
  transition: transform 0.3s, box-shadow 0.3s;
  width: 100%;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.status-message {
  margin-top: 20px;
  padding: 12px;
  border-radius: var(--radius-small);
  text-align: center;
}

.success {
  background-color: rgba(76, 175, 80, 0.1);
  color: #388E3C;
}

.error {
  background-color: rgba(244, 67, 54, 0.1);
  color: #D32F2F;
}

@media (max-width: 900px) {
  .contact-content {
    grid-template-columns: 1fr;
  }
  
  h1 {
    font-size: 2.5rem;
  }
  
  h2 {
    font-size: 1.8rem;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1.1rem;
  }
  
  .contact-form {
    padding: 30px 20px;
  }
  
  .contact-text p {
    font-size: 1rem;
  }
}
</style> 