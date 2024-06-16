import  { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import PropTypes from 'prop-types';

const employeeList = [
  { Header: "Id⮃", accessor: "id" },
  { Header: "FirstName⮃", accessor: "firstName" },
  { Header: "LastName⮃", accessor: "lastName" },
  { Header: "Start Date⮃", accessor: "startDate" },
  { Header: "Department", accessor: "department" },
  { Header: "Date of Birth⮃", accessor: "dateOfBirth" },
  { Header: "Street", accessor: "street" },
  { Header: "City", accessor: "city" },
  { Header: "State", accessor: "stateAbbrev" },
  { Header: "Zip Code", accessor: "zipCode" },
];

const Table = ({ sortedEntries }) => {
  const data = useMemo(() => sortedEntries, [sortedEntries]);
  const columns = useMemo(() => employeeList, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  return (
    <table {...getTableProps()} className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        {headerGroups.map((headerGroup, headerGroupIndex) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroupIndex} className="bg-tropical text-tropical_light">
            {headerGroup.headers.map((column, columnIndex) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                key={columnIndex}
                className="px-6 py-3 text-center cursor-pointer"
              >
                {column.render('Header')}
               
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, rowIndex) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              key={rowIndex}
              className={`${rowIndex % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'} text-center`}
            >
              {row.cells.map((cell, cellIndex) => (
                <td {...cell.getCellProps()} key={cellIndex} className="px-6 py-4">
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  
  sortedEntries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
      department: PropTypes.string.isRequired,
      dateOfBirth: PropTypes.string.isRequired,
      street: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      stateAbbrev: PropTypes.string.isRequired,
      zipCode: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Table;
