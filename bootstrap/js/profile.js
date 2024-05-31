let profpic=document.querySelector('#user_img');
let profile=document.querySelector('#user_details');
profpic.addEventListener('click',()=>{
     profile.classList.toggle('disappear_profile');
})