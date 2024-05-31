let password=document.querySelector('#password_login')
let confirmPass=document.querySelector('#confirm_password_login')
let confirmLabel=document.querySelector('#confirmLabel')
password.addEventListener("keyup",(e)=>{
    console.log(password.value)
})
confirmPass.addEventListener("keyup",(e)=>{
    console.log(confirmPass.value)
    if(confirmPass.value!==password.value){
        confirmLabel.innerText="password does not match ";
    }
    else{
        confirmLabel.innerText="";
    }
})