import './Button.css';

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  text: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button = ({ type = "button", text, onClick, className = "", disabled = false }: ButtonProps) => {
  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={`button ${className}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
