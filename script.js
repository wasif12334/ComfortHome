
let btn =document.querySelectorAll('.BookNow-btn');

btn.forEach((btn)=>{
  btn.addEventListener('click',()=>{
    let roomId = btn.getAttribute("data-id");
  
  
    window.location.href = `room-details.html?roomId=${roomId}`;
  })
  
})
