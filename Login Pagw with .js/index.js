// if user is already login

window.onload = function(){
    
    const user = localStorage.getItem('user');

    user ? showProfilePage() : showLoginPage();
}

// login page

function showLoginPage(){
    document.getElementById("login-page").style.display="block";
    document.getElementById("login-form").style.display="block";
    document.getElementById("profile-page").style.display="none";


}


// login form submission

document.getElementById('login-form').addEventListener("submit",async function(e){
    e.preventDefault();
    document.getElementById('login-error').innerText=" ";
   const email= document.getElementById("email").value;
   const password=document.getElementById("password").value;

   await loginUser(email,password);


})

// login user function API login 

 async function loginUser(email,password){

    // validation

    if(!email|| !password){
        document.getElementById("login-error").innerText="Email and password are required!";

        return;
    }

    // API check

    try{
      const response= await fetch('https://reqres.in/api/login',{
        method:'POST',

        headers : {
            'Content-Type': 'application/json',
        
        },

        body: JSON.stringify({
            email:email,
            password:password
        })

        

     })

     const data = await response.json();

     if(response.ok && data.token){
        const user = {email,token:data.token};
        localStorage.setItem('user',JSON.stringify(user));
    

        showProfilePage();

     } else{
        document.getElementById('login-error').innerText="Invalid email or password!";
     }
    } catch(err){
        document.getElementById('login-error').innerText = "Something went wrong! Please try again.";
    }



}


//for logout btn

function handleLogout(){
    localStorage.removeItem("user");
    showLoginPage();
}
// for user profile

function showProfilePage() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        document.getElementById("login-page").style.display = "none";
        document.getElementById("profile-page").style.display = "block";
        document.getElementById("profile-email").innerText = user.email;

        //  Ensure logout button exists before attaching event listener
        const logoutBtn = document.getElementById("logout-btn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", handleLogout);
        }
    }
}


    


