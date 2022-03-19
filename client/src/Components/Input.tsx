import { InputHTMLAttributes, ReactNode } from 'react';

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label: String;
}

const Input = ({ label, ...rest }: IInput) => {
  return (
    <div className="mb-[24px] last-of-type:mb-[0]">
      <label>{label}</label>
      <input
        className="block w-full h-[40px] p-2 border-[1px] border-slate-600 rounded-sm"
        {...rest}
      />
    </div>
  );
};

export default Input;
