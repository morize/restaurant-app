import { LiHTMLAttributes } from 'react';

interface INavListItem extends LiHTMLAttributes<HTMLLIElement> {
  label: string;
  icon: JSX.Element;
}

const NavListItem = ({ label, icon, children, ...rest }: INavListItem) => {
  return (
    <li
      className="relative flex flex-col items-center justify-center w-20 cursor-pointer"
      {...rest}
    >
      {icon}
      <p className="mt-2 text-sm">{label}</p>
      {children}
    </li>
  );
};

export default NavListItem;
