let productImg=document.querySelectorAll(".product_img");
for( img of productImg){
    img.src='coverpage3.jpg'
}
let login= document.querySelector('#login');
let signin= document.querySelector('#signin');

// let loginScreen= document.querySelector('#login_screen_container')
// login.addEventListener('click',()=>{
//     loginScreen.classList.remove('disappear_profile')
//     loginScreen.classList.add('ui')
//     login.classList.add('disappear_profile')
// })


let categories=document.querySelector("#categories");
let dropDownContainer=document.querySelector(".drop_down_container");
categories.addEventListener('click',function(){dropDownContainer.classList.toggle('appear');})
// above 3 lines are for the dropdown to appear when we click on the category option in the navbar

