import React from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";
import { differenceInYears } from "date-fns";

const InputDates = ({ methods }) => {
  const { control, setError, clearErrors, getValues, formState: { errors } } = methods;

  const handleChange = (field, otherFieldName) => (date) => {
    field.onChange(date);
    if (otherFieldName) {
      const otherDate = getValues(otherFieldName);
      validateDates(date, otherDate, field.name, otherFieldName);
    }
  };

  const validateDates = (date1, date2, fieldName1, fieldName2) => {
    if (fieldName1 === "dateOfBirth" && date2) {
      const age = differenceInYears(date2, date1);
      if (age < 18) {
        setError(fieldName2, { type: "manual", message: "La date de début doit être au moins 18 ans après la date de naissance" });
      } else {
        clearErrors(fieldName2);
      }
    } else if (fieldName1 === "startDate" && date2) {
      const age = differenceInYears(date1, date2);
      if (age < 18) {
        setError(fieldName1, { type: "manual", message: "La date de début doit être au moins 18 ans après la date de naissance" });
      } else {
        clearErrors(fieldName1);
      }
    }
  };

  return (
    <div className="flex lg:flex-row flex-col lg:space-x-5 space-x-0">
      <div className="mt-3 flex flex-col relative h-11 w-full min-w-[200px]">
        <Controller
          name="dateOfBirth"
          control={control}
          rules={{ 
            required: "Ce champ est obligatoire"
          }}
          render={({ field }) => (
            <DatePicker
              {...field}
              selected={field.value}
              onChange={handleChange(field, "startDate")}
              dateFormat="dd/MM/yyyy"
              className={`peer h-full w-full border-b ${
                errors.dateOfBirth ? "border-red-500" : "border-tropical"
              } bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border-tropical focus:border-tropical`}
              placeholderText="Date of Birth"
            />
          )}
        />
        <label className="mt-2 pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none truncate text-sm leading-tight text-black font-bold transition-all peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900">
          Date of Birth
        </label>
        {errors.dateOfBirth && <span className="error-message mt-2 text-red-500">{errors.dateOfBirth.message}</span>}
      </div>

      <div className="mt-3 flex flex-col relative h-11 w-full min-w-[200px]">
        <Controller
          name="startDate"
          control={control}
          rules={{ 
            required: "Ce champ est obligatoire"
          }}
          render={({ field }) => (
            <DatePicker
              {...field}
              selected={field.value}
              onChange={handleChange(field, "dateOfBirth")}
              dateFormat="dd/MM/yyyy"
              className={`peer h-full w-full border-b ${
                errors.startDate ? "border-red-500" : "border-tropical"
              } bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border-tropical focus:border-tropical`}
              placeholderText="Start Date"
            />
          )}
        />
        <label className="mt-2 pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none truncate text-sm leading-tight text-black font-bold transition-all peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900">
          Start Date
        </label>
        {errors.startDate && <span className="error-message mt-2 text-red-500">{errors.startDate.message}</span>}
      </div>
    </div>
  );
};

InputDates.propTypes = {
  methods: PropTypes.object.isRequired,
};

export default InputDates;
