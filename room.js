    // Fetch room data from URL parameters
    const params = new URLSearchParams(window.location.search);
    const roomId = params.get('roomId');

    const rooms = {
      1: {
        name: "Room-1",
        description: "A luxurious room with a king-sized bed.",
        price: "$150 per night",
        image: "/Images/rooms-images/room-1.jpeg"
      },
      2: {
        name: "Room-2",
        description: "A cozy room with a queen-sized bed.",
        price: "$80 per night",
        image: "/Images/rooms-images/room-2.jpeg"
      },
       3: {
        name: "Room-3",
        description: "A luxurious room with a king-sized bed.",
        price: "$150 per night",
        image: "/Images/rooms-images/room-3.jpg"
      },
     4: {
        name: "Room-4",
        description: "A cozy room with a queen-sized bed.",
        price: "$80 per night",
        image: "/Images/rooms-images/room-4.jpeg"
      }, 
      5: {
        name: "Room-5",
        description: "A luxurious room with a king-sized bed.",
        price: "$150 per night",
        image: "/Images/rooms-images/room-5.jpeg"
      },
      6: {
        name: "Room-6",
        description: "A cozy room with a queen-sized bed.",
        price: "$80 per night",
        image: "/Images/rooms-images/room-6.jpeg"
      }
    };

    const selectedRoom = rooms[roomId];

    if (selectedRoom) {
      document.getElementById('room-name').textContent = selectedRoom.name;
      document.getElementById('room-description').textContent = selectedRoom.description;
      document.getElementById('room-price').textContent = selectedRoom.price;
      document.getElementById('room-image').src = selectedRoom.image;
    } else {
      alert("Room details not found!");
    }
