import { createWebHistory, createRouter } from 'vue-router';
import Reviews from '@/views/reviews.vue';
import ReviewDetails from '@/views/ReviewDetails.vue';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Contact from '@/views/Contact.vue';

const routes = [ 
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/reviews',
        name: 'reviews',
        component: Reviews
    },
    {
        path: '/review/:id',
        name: 'review-details',
        component: ReviewDetails
    },
    {
        path: '/about',
        name: 'about',
        component: About
    },
    {
        path: '/contact',
        name: 'contact',
        component: Contact
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Providing both named and default export for compatibility
export default router;