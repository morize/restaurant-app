import { LiHTMLAttributes } from 'react';

interface INavListItem extends LiHTMLAttributes<HTMLLIElement> {
  label: string;
  icon: JSX.Element;
}

const NavListItem = ({ label, icon, ...rest }: INavListItem) => {
  return (
    <li
      className="flex flex-col items-center justify-center w-20 cursor-pointer"
      {...rest}
    >
      {icon}
      <p className="mt-2 text-sm">{label}</p>
    </li>
  );
};

export default NavListItem;
