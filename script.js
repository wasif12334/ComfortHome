// Room booking functionality
let btn = document.querySelectorAll('.BookNow-btn');

btn.forEach((btn) => {
    btn.addEventListener('click', () => {
        let roomId = btn.getAttribute("data-id");
        window.location.href = `room-details.html?roomId=${roomId}`;
    });
});

// Booking form functionality
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    const checkInInput = document.getElementById('check-in');
    const checkOutInput = document.getElementById('check-out');

    // Set minimum dates for check-in and check-out
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Format dates as YYYY-MM-DD
    const todayStr = today.toISOString().split('T')[0];
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    checkInInput.min = todayStr;
    checkOutInput.min = tomorrowStr;

    // Update check-out minimum date when check-in date changes
    checkInInput.addEventListener('change', function() {
        const checkInDate = new Date(this.value);
        const nextDay = new Date(checkInDate);
        nextDay.setDate(nextDay.getDate() + 1);
        const formattedNextDay = nextDay.toISOString().split('T')[0];
        checkOutInput.min = formattedNextDay;

        // If check-out date is before check-in date, update it
        if (checkOutInput.value && new Date(checkOutInput.value) <= checkInDate) {
            checkOutInput.value = formattedNextDay;
        }
    });

    // Form submission handler
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            checkIn: checkInInput.value,
            checkOut: checkOutInput.value,
            guests: document.getElementById('guests').value,
            rooms: document.getElementById('rooms').value
        };

        // Store booking data in sessionStorage
        sessionStorage.setItem('bookingData', JSON.stringify(formData));

        // Redirect to rooms page
        window.location.href = '#rooms';
    });

    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Update minimum check-out date when check-in date changes
function updateCheckoutMin() {
    const checkInInput = document.getElementById('check-in');
    const checkOutInput = document.getElementById('check-out');
    
    if (checkInInput.value) {
        const checkInDate = new Date(checkInInput.value);
        const nextDay = new Date(checkInDate);
        nextDay.setDate(nextDay.getDate() + 1);
        
        checkOutInput.min = nextDay.toISOString().split('T')[0];
        
        // If current check-out date is before new minimum, update it
        if (checkOutInput.value && new Date(checkOutInput.value) < nextDay) {
            checkOutInput.value = nextDay.toISOString().split('T')[0];
        }
    }
}

// Handle form submission
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const checkIn = document.getElementById('check-in').value;
    const checkOut = document.getElementById('check-out').value;
    const guests = document.getElementById('guests').value;
    const rooms = document.getElementById('rooms').value;
    const roomType = document.getElementById('room-type').value;

    // Validate form
    if (!checkIn || !checkOut || !guests || !rooms || !roomType) {
        alert('Please fill in all fields');
        return;
    }

    // Check if check-out date is after check-in date
    if (new Date(checkOut) <= new Date(checkIn)) {
        alert('Check-out date must be after check-in date');
        return;
    }

    // Simulate availability check (replace with actual API call)
    checkAvailability(checkIn, checkOut, guests, rooms, roomType);
});

// Function to check room availability
function checkAvailability(checkIn, checkOut, guests, rooms, roomType) {
    // Show loading state
    const searchBtn = document.getElementById('searchAvailabilityBtn');
    searchBtn.disabled = true;
    searchBtn.textContent = 'Checking Availability...';

    // Simulate API call delay
    setTimeout(() => {
        // Mock availability data (replace with actual API response)
        const isAvailable = Math.random() > 0.5; // 50% chance of availability

        const resultsDiv = document.getElementById('availabilityResults');
        const availableRoomsDiv = document.getElementById('availableRooms');
        const unavailableMessage = document.getElementById('unavailableMessage');

        resultsDiv.style.display = 'block';

        if (isAvailable) {
            unavailableMessage.style.display = 'none';
            availableRoomsDiv.innerHTML = `
                <div class="available-room">
                    <h4>${roomType}</h4>
                    <p>Check-in: ${checkIn}</p>
                    <p>Check-out: ${checkOut}</p>
                    <p>Guests: ${guests}</p>
                    <p>Rooms: ${rooms}</p>
                    <button class="booking-search-btn" onclick="proceedToBooking()">Proceed to Booking</button>
                </div>
            `;
        } else {
            availableRoomsDiv.innerHTML = '';
            unavailableMessage.style.display = 'block';
        }

        // Reset button state
        searchBtn.disabled = false;
        searchBtn.textContent = 'Check Availability';
    }, 1500);
}

// Function to proceed to booking
function proceedToBooking() {
    // Add your booking logic here
    alert('Proceeding to booking...');
}

// Room Details Modal
const roomDetailsModal = document.createElement('div');
roomDetailsModal.className = 'room-modal';
roomDetailsModal.innerHTML = `
    <div class="modal-content">
        <span class="close-modal">&times;</span>
        <div class="modal-body">
            <div class="room-modal-image"></div>
            <div class="room-modal-info">
                <h2 class="room-modal-title"></h2>
                <div class="room-modal-features"></div>
                <p class="room-modal-description"></p>
                <div class="room-modal-price"></div>
                <div class="room-amenities"></div>
                <button class="proceed-booking-btn">Proceed to Booking</button>
            </div>
        </div>
    </div>
`;
document.body.appendChild(roomDetailsModal);

// Room data
const rooms = [
    {
        id: 1,
        title: 'Deluxe Family Suite',
        image: '/Images/rooms-images/room-1.jpeg',
        features: [
            { icon: 'fas fa-bed', text: '2 King Beds' },
            { icon: 'fas fa-user-friends', text: '4 Guests' },
            { icon: 'fas fa-vector-square', text: '45m²' }
        ],
        description: 'Spacious suite with city view, perfect for families. Features a separate living area, modern amenities, and premium comfort.',
        price: '$180',
        amenities: [
            'Free WiFi',
            'Air Conditioning',
            'Mini Bar',
            'Smart TV',
            'Room Service',
            'Safe Deposit Box'
        ]
    },
    {
        id: 2,
        title: 'Executive Room',
        image: '/Images/rooms-images/room-2.jpeg',
        features: [
            { icon: 'fas fa-bed', text: '1 King Bed' },
            { icon: 'fas fa-user-friends', text: '2 Guests' },
            { icon: 'fas fa-vector-square', text: '35m²' }
        ],
        description: 'Modern room with work desk and premium amenities. Perfect for business travelers seeking comfort and functionality.',
        price: '$150',
        amenities: [
            'Free WiFi',
            'Air Conditioning',
            'Work Desk',
            'Smart TV',
            'Coffee Maker',
            'Safe Deposit Box'
        ]
    },
    {
        id: 3,
        title: 'Premium Suite',
        image: '/Images/rooms-images/room-3.jpeg',
        features: [
            { icon: 'fas fa-bed', text: '1 King Bed' },
            { icon: 'fas fa-user-friends', text: '2 Guests' },
            { icon: 'fas fa-vector-square', text: '50m²' }
        ],
        description: 'Luxury suite with separate living area and balcony. Experience ultimate comfort with premium amenities and stunning views.',
        price: '$220',
        amenities: [
            'Free WiFi',
            'Air Conditioning',
            'Private Balcony',
            'Smart TV',
            'Mini Bar',
            'Room Service',
            'Safe Deposit Box'
        ]
    }
];

// Function to open room modal
function openRoomModal(roomId) {
    const room = rooms.find(r => r.id === roomId);
    if (!room) return;

    const modal = document.querySelector('.room-modal');
    const modalImage = modal.querySelector('.room-modal-image');
    const modalTitle = modal.querySelector('.room-modal-title');
    const modalFeatures = modal.querySelector('.room-modal-features');
    const modalDescription = modal.querySelector('.room-modal-description');
    const modalPrice = modal.querySelector('.room-modal-price');
    const modalAmenities = modal.querySelector('.room-amenities');

    // Set room image
    modalImage.style.backgroundImage = `url(${room.image})`;

    // Set room title
    modalTitle.textContent = room.title;

    // Set room features
    modalFeatures.innerHTML = room.features.map(feature => `
        <div class="feature-item">
            <i class="${feature.icon}"></i>
            <span>${feature.text}</span>
        </div>
    `).join('');

    // Set room description
    modalDescription.textContent = room.description;

    // Set room price
    modalPrice.innerHTML = `
        <span class="price">${room.price}</span>
        <span class="per-night">per night</span>
    `;

    // Set room amenities
    modalAmenities.innerHTML = `
        <h3>Room Amenities</h3>
        <div class="amenities-grid">
            ${room.amenities.map(amenity => `
                <div class="amenity-item">
                    <i class="fas fa-check"></i>
                    <span>${amenity}</span>
                </div>
            `).join('')}
        </div>
    `;

    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Function to close modal
function closeRoomModal() {
    const modal = document.querySelector('.room-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Add event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners to Book Now buttons
    const bookNowButtons = document.querySelectorAll('.BookNow-btn');
    bookNowButtons.forEach(button => {
        button.addEventListener('click', () => {
            const roomId = parseInt(button.getAttribute('data-id'));
            openRoomModal(roomId);
        });
    });

    // Close modal when clicking the close button
    const closeButton = document.querySelector('.close-modal');
    closeButton.addEventListener('click', closeRoomModal);

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        const modal = document.querySelector('.room-modal');
        if (event.target === modal) {
            closeRoomModal();
        }
    });

    // Close modal when pressing Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeRoomModal();
        }
    });
});

// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.booking-nav-links');
    const navOverlay = document.querySelector('.nav-overlay');
    const body = document.body;

    function toggleMenu() {
        navLinks.classList.toggle('active');
        navOverlay.classList.toggle('active');
        body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);
    navOverlay.addEventListener('click', toggleMenu);

    // Close menu when clicking on a link
    const navItems = document.querySelectorAll('.booking-nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});
