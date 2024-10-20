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


