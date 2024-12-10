

import styles from "./Button.module.css"

const Button = ({isOutline,icon,text,...rest}) => {
// const Button = (props) => {
  
  return (
    <button 

    {...rest}
    
    className={isOutline?styles.outlineBtn:styles.primaryBtn}>
        {icon}
        {text}

      
    </button>
  )
}

export default Button;
