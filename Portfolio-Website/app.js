var tablinks=document.getElementsByClassName("tab-links");
var tabcontents=document.getElementsByClassName("tab-contents");

function openTab(tabname){
    for( let tablink of tablinks){
        tablink.classList.remove("active-links");

    }
    for( let tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab");

    }
   
    
     
event.currentTarget.classList.add("active-links");

document.getElementById(tabname).classList.add("active-tab");
  
    

}
var sidemenu=document.getElementById("sidemenu");

function openMenu(){
    sidemenu.style.right ='0';

}
function closeMenu(){
    sidemenu.style.right ='-200px';

}


        const scriptURL = 'https://script.google.com/macros/s/AKfycbzP1dKsVmgRaKy410AIdUqkBACZBtq4isGYdlnyEyl4Gg0a7iuW2RuyKFrilPakeuavtA/exec'
        const form = document.forms['submit-to-google-sheet']
        const msg= document.getElementById("msg");
      
        form.addEventListener('submit', e => {
          e.preventDefault()
          fetch(scriptURL, { method: 'POST', body: new FormData(form)})
            .then(response => {
                msg.innerHTML="Message sent successfully"
                setTimeout(function(){
                    msg.innerHTML = "";
                },5000)
                form.reset()
            })
            .catch(error => console.error('Error!', error.message))
        })
      

