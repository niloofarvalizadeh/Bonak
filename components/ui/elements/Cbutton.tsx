import { FC } from "react";
interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost'; 
  size?: 'small' | 'medium' | 'large'; 
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const CButton: FC<ButtonProps> = ({ children , ...props}) => {
  return (
    <button {...props}>
      {children}
    </button>
  );
};

export default CButton;