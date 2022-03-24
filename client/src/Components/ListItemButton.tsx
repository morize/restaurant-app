import { LiHTMLAttributes } from 'react';

interface IListItemButton extends LiHTMLAttributes<HTMLLIElement> {
  label: string;
  active?: boolean;
}

const ListItemButton = ({ label, active, ...rest }: IListItemButton) => {
  const customCssProperties = `${active ? 'bg-[#402200] cursor-default' : 'bg-[#643600] cursor-pointer'}`;
  const finalCssProperties = `flex w-52 h-14 items-center justify-center text-sm ${customCssProperties}`;
  return (
    <li className={finalCssProperties} {...rest}>
      {label}
    </li>
  );
};

export default ListItemButton;
