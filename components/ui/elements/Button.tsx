import { FC } from "react";
import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";

const Button: FC<ButtonProps> = ({ bg, children, ...props }) => {
  const hoverBg = `${bg}Hover`;

  return (
    <ChakraButton bg={bg} _hover={{ bg: hoverBg }} {...props}>
      {children}
    </ChakraButton>
  );
};

export default Button;
