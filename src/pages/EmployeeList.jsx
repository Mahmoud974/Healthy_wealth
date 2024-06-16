import { useState, useEffect, lazy, Suspense } from 'react';
import { listEmployee } from '../data/Employee'; // Assurez-vous que le chemin est correct
import Navbar from '../composants/Navbar';
import localStorageService from '../services/localstorageEmployee';
import { getColumnValue } from '../modules/modules';

const Table = lazy(() => import('../composants/Table'));
const EmployeeList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;
  const [formData, setFormData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortByColumn, setSortByColumn] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    const formDataFromLocalStorage = localStorageService.getData("formData");
    if (formDataFromLocalStorage) {
      const formDataWithAbbrev = formDataFromLocalStorage.map((entry) => ({
        ...entry,
        stateAbbrev: entry.states.substring(0, 2).toUpperCase(),
      }));
      setFormData(formDataWithAbbrev);
    }
  }, []);
  const formDataWithNames = formData.map((data) => ({
    ...data,
    firstName: data.firstname,
    lastName: data.lastname,
  }));
  const mergedEmployeeList = [...listEmployee, ...formDataWithNames];
  const totalPages = Math.ceil(mergedEmployeeList.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const sortData = (column) => {
    if (sortByColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortByColumn(column);
      setSortDirection("asc");
    }
  };

  const sortEntries = (entries) => {
    return entries.sort((a, b) => {
      const columnA = getColumnValue(a, sortByColumn);
      const columnB = getColumnValue(b, sortByColumn);
      let comparison = 0;

      if (columnA > columnB) {
        comparison = 1;
      } else if (columnA < columnB) {
        comparison = -1;
      }
      return sortDirection === "asc" ? comparison : comparison * -1;
    });
  };
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredEntries = mergedEmployeeList.filter((entry) => {
    const searchLower = searchValue.toLowerCase();
    return (
      entry.firstName.toLowerCase().includes(searchLower) ||
      entry.lastName.toLowerCase().includes(searchLower)
    );
  });

  const sortedEntries = sortEntries([...filteredEntries]);
  const currentEntries = sortedEntries.slice(indexOfFirstEntry, indexOfLastEntry);
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const nextPage = () => setCurrentPage(currentPage === totalPages ? currentPage : currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage === 1 ? currentPage : currentPage - 1);
  const totalEmployees = filteredEntries.length;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto flex justify-between my-6">
        <p>{totalEmployees} employés</p>
        <input
          type="text"
          placeholder="Recherche"
          value={searchValue}
          onChange={handleSearchChange}
          className="border rounded p-2"
        />
      </div>
      <div className="container mx-auto relative overflow-x-auto shadow-md sm:rounded-lg">
        <Suspense fallback={<div>Loading...</div>}>
          <Table sortData={sortData} sortedEntries={currentEntries} />
        </Suspense>
      </div>
      <div className="container mx-auto my-6 flex justify-between">
        <p>{currentPage} sur {totalPages}</p>
        <div className="space-x-6">
          <button
            className="border-tropical_light text-tropical border px-4 rounded-md"
            onClick={goToFirstPage}
          >
            Première
          </button>
          <button
            className="border-tropical_light text-tropical border px-4 rounded-md"
            onClick={prevPage}
          >
            Précédente
          </button>
          <button
            className="border-tropical_light text-tropical border px-4 rounded-md"
            onClick={nextPage}
          >
            Suivante
          </button>
          <button
            className="border-tropical_light text-tropical border px-4 rounded-md"
            onClick={goToLastPage}
          >
            Dernière
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
