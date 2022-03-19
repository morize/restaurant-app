import { ButtonHTMLAttributes } from 'react';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: String;
  variant: 'primary' | 'secondary' | 'google';
}

const getColorFromVariant = (variant: string) => {
  switch (variant) {
    case 'primary':
      return 'bg-blue-900';
    case 'secondary':
      return 'bg-green-900';
    case 'google':
      return 'bg-blue-600';
    default:
      return 'bg-black';
  }
};

const Button = ({ label, variant, ...rest }: IButton) => {
  const color = getColorFromVariant(variant);

  return (
    <button
      className={`w-full p-5 ${color} mb-[24px] rounded-md text-white cursor-pointer last-of-type:mb-[0px]`}
      {...rest}
    >
      {label}
    </button>
  );
};

export default Button;
