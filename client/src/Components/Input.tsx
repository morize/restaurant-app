import { InputHTMLAttributes } from 'react';

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label: String;
}

const Input = ({ label, ...rest }: IInput) => {
  return (
    <div className="mb-[24px] last-of-type:mb-[0] py-2">
      <label>{label}</label>
      <input
        className="block w-full h-[40px] py-2 px-3 border-[1px] text-black bg-white border-slate-600 rounded-sm"
        {...rest}
      />
    </div>
  );
};

export default Input;
