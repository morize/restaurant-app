import { TableHTMLAttributes } from 'react';

interface ITable extends TableHTMLAttributes<HTMLTableElement> {
  children: JSX.Element[];
}

interface ITableRow {
  children: JSX.Element[];
}

interface ITableDataCell {
  children: JSX.Element;
}

export const TableHeader = ({ children }: ITableRow) => (
  <thead>
    <tr className="text-left">{children}</tr>
  </thead>
);

export const TableRowCell = ({ children }: ITableRow) => (
  <tr className="break-words">{children}</tr>
);

export const TableDataCell = ({ children }: ITableDataCell) => (
  <td className="py-8 pr-4">{children}</td>
);

export const Table = ({ children, ...rest }: ITable) => (
  <table className="w-full border-collapse" {...rest}>
    {children}
  </table>
);
