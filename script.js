document.addEventListener('DOMContentLoaded', () => {
  let availBtn = document.querySelector('.form-btn')

  let totalRooms = 10;
  let avail =true;
  availBtn.addEventListener('click',()=>{
  
    const adults = document.querySelector('.adults')
    const checkIn = document.querySelector('.checkindate').value
    const checkOut = document.querySelector('.checkioutdate')
    const userRooms = parseInt(document.querySelector('.numberofrooms').value);
    console.log(adults.value,checkIn,checkOut,userRooms);
  })
});