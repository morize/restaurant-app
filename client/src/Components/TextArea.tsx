import { TextareaHTMLAttributes } from 'react';

interface ITextArea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const TextArea = ({ label, ...rest }: ITextArea) => {
  return (
    <div className="w-full mb-[24px] last-of-type:mb-[0]">
      <label>{label}</label>
      <textarea className="w-full h-28 px-3 py-2 text-black" {...rest} />
    </div>
  );
};

export default TextArea;
