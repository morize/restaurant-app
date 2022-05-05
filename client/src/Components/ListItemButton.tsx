import { LiHTMLAttributes } from 'react';

interface IListItemButton extends LiHTMLAttributes<HTMLLIElement> {
  label: string;
  active?: boolean;
}

const ListItemButton = ({ label, active, ...rest }: IListItemButton) => {
  const customCssProperties = `${active ? 'bg-[#402200] cursor-default' : 'bg-[#643600] cursor-pointer'}`;
  const finalCssProperties = `flex h-12 items-center justify-center text-sm ${customCssProperties} rounded-sm bg-opacity-80`;
  return (
    <li className={finalCssProperties} {...rest}>
      {label}
    </li>
  );
};

export default ListItemButton;
