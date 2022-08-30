import classes from './Button.module.scss';
const Button = (props:any) =>{
   return <button type={props.type || 'button'}
   className={`${classes.button} ${props.className} text-center m-2 p-2 px-5`}
   onClick={props.onClick}
   disabled={props.disabled}>
      {props.children}
   </button>
}

export default Button;