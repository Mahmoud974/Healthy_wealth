import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Select from "react-dropdown-select";

const Dropdown = ({ register, errors, states, selectedState, selectedDepartment }) => {
  const departments = [
    { value: "sales", label: "Sales" },
    { value: "marketing", label: "Marketing" },
    { value: "engineering", label: "Engineering" },
    { value: "humanResources", label: "Human Resources" },
    { value: "legal", label: "Legal" },
  ];

  const defaultState = states.length > 0 ? { value: states[0].name, label: states[0].name } : null;
  const defaultDepartment = departments[0];

  const [currentSelectedState, setCurrentSelectedState] = useState(selectedState || defaultState);
  const [currentSelectedDepartment, setCurrentSelectedDepartment] = useState(selectedDepartment || defaultDepartment);

  useEffect(() => {
    // Register fields with validation rules
    register("states", { required: "Ce champ est obligatoire" });
    register("department", { required: "Ce champ est obligatoire" });
  }, [register]);

  return (
    <div>
      <div className="relative h-11 w-full min-w-[200px] mt-6">
        <Select
          value={currentSelectedState ? [currentSelectedState] : []}
          options={states.map((state) => ({ value: state.name, label: state.name }))}
          onChange={(selected) => {
            setCurrentSelectedState(selected[0]);
            register("states").onChange({ target: { name: "states", value: selected[0].value } });
          }}
          aria-labelledby="state-label"
          searchable={false} // Empêche la saisie de texte
          className={`peer h-full w-full border-b ${
            errors.states ? "border-red-500" : "border-blue-gray-200"
          } bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border-tropical focus:border-tropical`}
        />
        <label id="state-label" className="pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none truncate text-sm leading-tight text-black font-bold transition-all peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900">
          State
        </label>
        {errors.states && <span className="error-message text-red-500">{errors.states.message}</span>}
      </div>
      <div className="relative h-11 w-full min-w-[200px] mt-6">
        <Select
          value={[currentSelectedDepartment]}
          options={departments}
          onChange={(selected) => {
            setCurrentSelectedDepartment(selected[0]);
            register("department").onChange({ target: { name: "department", value: selected[0].value } });
          }}
          aria-labelledby="department-label"
          searchable={false}
          className={`peer h-full w-full border-b ${
            errors.department ? "border-red-500" : "border-blue-gray-200"
          } bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border-tropical focus:border-tropical`}
        />
        <label id="department-label" className="pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none truncate text-sm leading-tight text-black font-bold transition-all peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900">
          Department
        </label>
        {errors.department && <span className="error-message text-red-500">{errors.department.message}</span>}
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  states: PropTypes.array.isRequired,
  selectedState: PropTypes.object, // Prop for selected state
  selectedDepartment: PropTypes.object, // Prop for selected department
};

export default Dropdown;
