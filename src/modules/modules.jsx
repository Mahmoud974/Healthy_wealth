/**
   * Valide le champ d'entrée.
   * @param {Event} e - L'événement d'entrée.
   * @returns {boolean} - Renvoie true si l'entrée est valide, sinon false.
   */
  export const inputValidate = (e) => {
    const regex = /^[a-zA-ZÀ-ÿ\s]*$/;
    if (!regex.test(e.target.value) || e.target.value.length < 2) {
      e.currentTarget.style.border = "1px solid red";
      return false;
    } else {
      e.currentTarget.style.border = "1px solid #d1d5db";
      return true;
    }
  };

/**
 * Formate les dates de naissance et de début.
 * @param {Object} data - Les données du formulaire.
 */
export const formatDates = (data) => {
  const birthDate = new Date(data.dateOfBirth);
  const formattedBirthDate = `${("0" + birthDate.getDate()).slice(-2)}/${("0" + (birthDate.getMonth() + 1)).slice(-2)}/${birthDate.getFullYear()}`;
  data.dateOfBirth = formattedBirthDate;

  const startDate = new Date(data.startDate);
  const formattedStartDate = `${("0" + startDate.getDate()).slice(-2)}/${("0" + (startDate.getMonth() + 1)).slice(-2)}/${startDate.getFullYear()}`;
  data.startDate = formattedStartDate;
};

/**
 * Calcule l'âge en fonction de la date de naissance.
 * @param {Date} birthDate - La date de naissance.
 * @returns {number} - L'âge calculé.
 */
export const calculateAge = (birthDate) => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};


/************************************************************************************************ */

//La page EmployeeList.jsx

  /**
   * Récupère la valeur d'une colonne spécifiée pour une entrée donnée.
   * @param {Object} entry - L'entrée de l'employé.
   * @param {string} column - La colonne dont on veut récupérer la valeur.
   * @returns {*} - La valeur de la colonne spécifiée.
   */
  export const getColumnValue = (entry, column) => {
    switch (column) {
      case "id":
      case "zipCode":
        return entry[column];
      case "firstName":
        return entry.firstName;
      case "lastName":
        return entry.lastName;
      case "startDate":
        return entry.startDate;
      case "department":
        return entry.department;
      case "dateOfBirth":
        return entry.dateOfBirth;
      case "street":
        return entry.street;
      case "city":
        return entry.city;
      case "stateAbbrev":
        return entry.stateAbbrev;
      default:
        return null;
    }
  };
