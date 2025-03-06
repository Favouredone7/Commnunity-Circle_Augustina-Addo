// Time-based Greeting
function setGreeting() {
    const greeting = document.getElementById('greeting');
    if (!greeting) return;
    
    const hour = new Date().getHours();
    let greetingText = '';
    
    if (hour < 12) {
        greetingText = 'Good Morning!';
    } else if (hour < 18) {
        greetingText = 'Good Afternoon!';
    } else {
        greetingText = 'Good Evening!';
    }
    
    greeting.textContent = greetingText;
}

// Run greeting on page load
document.addEventListener('DOMContentLoaded', setGreeting);

// Image Slider
function setupSlider() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Auto slide
    setInterval(nextSlide, 5000);
}

// Random Business Tips
const businessTips = [
    'Always listen to your customers.',
        'Consistency is key in business.',
        'Invest in your team’s growth.',
        'Stay updated with industry trends.',
        'Networking opens new opportunities.'
];

function setupTipButton() {
    const tipButton = document.getElementById('tip-button');
    const tipText = document.getElementById('random-tip');
    
    if (!tipButton || !tipText) return;
    
    tipButton.addEventListener('click', function() {
        const randomIndex = Math.floor(Math.random() * businessTips.length);
        tipText.textContent = businessTips[randomIndex];
        
        // Change the background color
        document.querySelector('.business-tip').style.backgroundColor = getRandomColor();
    });
}

function getRandomColor() {
    const colors = ['#3b6064', '#8e9b97', '#c9a66b', '#5b8a72', '#6a5b6e'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Product Filters
function setupProductFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const products = document.querySelectorAll('.product-card');
    
    if (filterBtns.length === 0 || products.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Show/hide products based on filter
            products.forEach(product => {
                if (filter === 'all' || product.getAttribute('data-category') === filter) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });
}

// Form Validation
function setupFormValidation() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form fields
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const subjectInput = document.getElementById('subject');
        
        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        
        // Validate fields
        let isValid = true;
        
        if (!nameInput.value.trim()) {
            document.getElementById('name-error').textContent = 'Name is required';
            isValid = false;
        }
        
        if (!emailInput.value.trim()) {
            document.getElementById('email-error').textContent = 'Email is required';
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            document.getElementById('email-error').textContent = 'Please enter a valid email';
            isValid = false;
        }
        
        if (!messageInput.value.trim()) {
            document.getElementById('message-error').textContent = 'Message is required';
            isValid = false;
        }
        
        if (isValid) {
            // Store in local storage
            const submission = {
                name: nameInput.value,
                email: emailInput.value,
                subject: subjectInput.value,
                message: messageInput.value,
                date: new Date().toLocaleString()
            };
            
            // Get existing submissions or initialize empty array
            const existingSubmissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
            existingSubmissions.push(submission);
            localStorage.setItem('contactSubmissions', JSON.stringify(existingSubmissions));
            
            // Show success message
            const formStatus = document.getElementById('form-status');
            formStatus.textContent = 'Your message has been sent successfully!';
            formStatus.className = 'form-status success';
            
            // Reset form
            contactForm.reset();
            
            // Update previous messages display
            displayPreviousMessages();
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Display Previous Contact Form Submissions
function displayPreviousMessages() {
    const previousMessagesContainer = document.getElementById('previous-messages-container');
    const noMessagesElement = document.getElementById('no-messages');
    
    if (!previousMessagesContainer) return;
    
    // Get submissions from local storage
    const submissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
    
    // Clear container
    previousMessagesContainer.innerHTML = '';
    
    if (submissions.length === 0) {
        if (!noMessagesElement) {
            const noMessagesElement = document.createElement('p');
            noMessagesElement.textContent = 'No previous messages found.';
            previousMessagesContainer.appendChild(noMessagesElement);
        } else {
            previousMessagesContainer.appendChild(noMessagesElement);
        }
        return;
    }
    
    // Add each submission to the container
    submissions.forEach((submission, index) => {
        const messageCard = document.createElement('div');
        messageCard.className = 'previous-message-card';
        
        const messageHeader = document.createElement('div');
        messageHeader.className = 'previous-message-header';
        
        const subjectElement = document.createElement('strong');
        subjectElement.textContent = submission.subject;
        
        const dateElement = document.createElement('span');
        dateElement.textContent = submission.date;
        
        messageHeader.appendChild(subjectElement);
        messageHeader.appendChild(dateElement);
        
        const messageContent = document.createElement('p');
        messageContent.textContent = submission.message;
        
        const messageFooter = document.createElement('div');
        messageFooter.className = 'previous-message-footer';
        messageFooter.textContent = `From: ${submission.name} (${submission.email})`;
        
        messageCard.appendChild(messageHeader);
        messageCard.appendChild(messageContent);
        messageCard.appendChild(messageFooter);
        
        previousMessagesContainer.appendChild(messageCard);
    });
}

// Chatbot functionality
function setupChatbot() {
    const chatIcon = document.getElementById('chat-icon');
    const chatbot = document.getElementById('chatbot');
    const closeChat = document.getElementById('close-chat');
    const sendMessage = document.getElementById('send-message');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chatbot-messages');
    
    if (!chatIcon || !chatbot) return;
    
    // Toggle chatbot display
    chatIcon.addEventListener('click', function() {
        chatbot.style.display = 'flex';
    });
    
    if (closeChat) {
        closeChat.addEventListener('click', function() {
            chatbot.style.display = 'none';
        });
    }
    
    if (sendMessage && userInput && chatMessages) {
        sendMessage.addEventListener('click', sendChatMessage);
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }
    
    function sendChatMessage() {
        const message = userInput.value.trim();
        if (!message) return;
        
        // Add user message
        const userMessageElement = document.createElement('div');
        userMessageElement.className = 'user-message';
        userMessageElement.textContent = message;
        chatMessages.appendChild(userMessageElement);
        
        // Clear input
        userInput.value = '';
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simulate bot response (after slight delay)
        setTimeout(() => {
            const botResponse = getBotResponse(message.toLowerCase());
            const botMessageElement = document.createElement('div');
            botMessageElement.className = 'bot-message';
            botMessageElement.textContent = botResponse;
            chatMessages.appendChild(botMessageElement);
            
            // Scroll to bottom again
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 800);
    }
    
    function getBotResponse(message) {
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return "Hello there! How can I assist you today?";
        } else if (message.includes('service') && (message.includes('') || message.includes('recommend'))) {
            return "Our services include Mother Care, Counselling, and a Daily Life App.";
        } else if (message.includes('price') || message.includes('cost') || message.includes('how much')) {
            return "Our community prices range from GHC1,500 to GHC10,000";
        } else if (message.includes('contact') || message.includes('location')) {
            return "Contact us at (233) 309474836 Sakumono Estate, Tema";
        } else if (message.includes('App') || message.includes('') || message.includes('where')) {
            return "Our Daily Life App is available on Google Play Store and Apple App Store.";
        } else if (message.includes('thanks') || message.includes('thank you')) {
            return "You're welcome! Let me know if you have any other questions.";
        } else {
            return "I'm not sure I understand. Could you ask about our coffee offerings, shipping, or location?";
        }
    }
}

// Initialize all functions
document.addEventListener('DOMContentLoaded', function() {
    setGreeting();
    setupSlider();
    setupTipButton();
    setupProductFilters();
    setupFormValidation();
    displayPreviousMessages();
    setupChatbot();
});