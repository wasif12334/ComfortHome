const cards = document.querySelectorAll('.property-item');

    cards.forEach(card => {
     const button = card.querySelector('button');
      
      button.addEventListener('click', () => {
        // Collect product 
        
        const name = card.getAttribute('data-name');
        const price = card.getAttribute('data-price');
        const description = card.getAttribute('data-description');
        const image = card.getAttribute('data-image');
        const location = card.getAttribute('data-location');
        const checkIn = card.getAttribute('data-checkin');
        const checkOut = card.getAttribute('data-checkout');
        const rooms = card.getAttribute('data-rooms');

        

        // Create query parameters
        const queryParams = new URLSearchParams({
          name,
          price,
          description,
          image,
          checkIn,
          checkOut,
          rooms,
          location
        }).toString();

        // Open the details page in a new tab with query parameters
        window.open(`propertys.html?${queryParams}`, '_blank');
      });
    });