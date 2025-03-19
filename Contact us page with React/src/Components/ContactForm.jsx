import styles from './ContactForm.module.css';
import Button from './Button';
import { LuMessageSquareMore } from "react-icons/lu";
import { IoMdCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { useState } from 'react';


const ContactForm = () => {

  const [name,setName] = useState("Rishabh");
  const [email,setEmail] = useState("risdndo@Button.com");
  const [text,setText] = useState("Subscribe to watch");

  const onSubmit = (event)=>{
    event.preventDefault();

    setName(event.target[0].value);
    setEmail(event.target[1].value)
    setText(event.target[2].value);
    console.log("name",event.target[0].value);
    console.log("email",event.target[1].value);
    console.log("text",event.target[2].value);
    
  }

  return (

    <section className={styles.container} >

        <div className={styles.contactForm}>
          <div className={styles.topBtn}>
          <Button text="VIA SUPPORT CHAT" icon={<LuMessageSquareMore/>} /> 
       
       <Button 

       
       
       
       text="VIA CALL" icon={<IoMdCall/>}/> 

       

          </div>
          <Button  
          isOutline={true} 
          text="VIA EMAIL FORM" 
          icon={<MdEmail/>}/> 


          <form 

          onSubmit={onSubmit}>
          
            <div className={styles.formControl}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name"/>
            </div>

            <div className={styles.formControl}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email"/>
            </div>


            <div className={styles.formControl}>
            <label htmlFor="text">Text</label>
            <textarea  name="text" rows="14"/>
            </div>

          <div 
          style={{
              display: "flex",
              justifyContent:"end",
              }}
              >
              
            
            <Button
          text="SUBMIT BUTTON" 
         /> 
         </div>
         <div>
          {
            name + " " + email +  " " + text 
          }
         </div>

          </form>
        



        </div>

        <div className='{styles.contactImage}'>
        <img src="./images/contact.svg" alt="contact image" />  

        </div>
      

    </section>
  )
}

export default ContactForm
