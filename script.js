let availBtn = document.querySelector('.form-btn')

let totalRooms = 10;
let avail =true;
availBtn.addEventListener('click',()=>{
  const adults = document.querySelector('.adults').value;
  const checkIn = document.querySelector('.checkindate').value;
  const checkOut = document.querySelector('.checkioutdate').value;
  const userRooms = document.querySelector('.numberofrooms').value;
  console.log(adults,checkIn,checkOut,userRooms);
})
