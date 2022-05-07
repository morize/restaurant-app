import { TextareaHTMLAttributes } from 'react';

interface ITextArea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const TextArea = ({ label, ...rest }: ITextArea) => {
  return (
    <div className="my-[24px]">
      <label className="block">{label}</label>
      <textarea {...rest} className="w-full h-28 px-3 py-2 text-black" />
    </div>
  );
};

export default TextArea;
