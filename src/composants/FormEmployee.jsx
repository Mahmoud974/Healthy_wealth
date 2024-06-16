import React, { useEffect, useState } from "react";
import InputDates from './InputDates';
import Dropdown from './Dropdown';
import { useForm } from "react-hook-form";
import states from "../data/StateData";
import PropTypes from "prop-types";
import { inputValidate, formatDates, calculateAge } from "../modules/modules";

const FormEmployee = ({ setModalMessage, setIsModalOpen }) => {
  const methods = useForm();
  const { control, register, handleSubmit, setError, clearErrors, formState: { errors } } = methods;
  const [tab, setTab] = useState([]);
  const [lastId, setLastId] = useState(80);

  useEffect(() => {
    const data = localStorage.getItem("formData");
    if (data) {
      setTab(JSON.parse(data));
    }
    const storedLastId = localStorage.getItem("lastId");
    if (storedLastId) {
      setLastId(parseInt(storedLastId, 10));
    }
  }, []);
/**
 * Ouvrir le modal
 * @param {*} message 
 */
  const openModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };
/**
 * Verifier les conditions d'inputs
 * @param {*} data 
 * @returns 
 */
  const checkRequiredFields = (data) => {
    let valid = true;
    ["firstname", "lastname", "dateOfBirth", "startDate", "street", "city", "zipCode", "states", "department"].forEach((field) => {
      if (!data[field]) {
        setError(field, {
          type: "manual",
          message: "Ce champ est obligatoire",
        });
        valid = false;
      } else {
        clearErrors(field);
      }
    });
    return valid;
  };
/**
 * Soumettre le formulaire
 * @param {*} data 
 * @returns 
 */
  const onSubmit = async (data) => {
    const isValidFirstName = /^[a-zA-ZÀ-ÿ\s]{2,}$/.test(data.firstname);
    const isValidLastName = /^[a-zA-ZÀ-ÿ\s]{2,}$/.test(data.lastname);

    if (!isValidFirstName) {
      setError("firstname", {
        type: "manual",
        message: "Pas de chiffres ni de symboles, 2 lettres minimums",
      });
      return;
    }

    if (!isValidLastName) {
      setError("lastname", {
        type: "manual",
        message: "Pas de chiffres ni de symboles, 2 lettres minimums",
      });
      return;
    }

    const selectedState = states.find((state) => state.name === data.states);
    if (selectedState) {
      data.stateAbbreviation = selectedState.abbreviation;
    }
    
    if (!checkRequiredFields(data)) return;
    
    const id = lastId + 1;
    data.id = id;
    formatDates(data);
    const age = calculateAge(new Date(data.dateOfBirth));
    if (age < 18) {
      openModal("L'employé doit avoir au moins 18 ans pour être enregistré. ❌");
      return;
    }
    
    setTab([...tab, data]);
    localStorage.setItem("formData", JSON.stringify([...tab, data]));
    setLastId(id);
    localStorage.setItem("lastId", id.toString());
    openModal("Formulaire soumis avec succès! ✅");
  };

  return (
    <form className="mx-12 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-6 mb-6 md:grid-cols-2 text-black pt-16">
        <div className="relative">
          <input
            {...register("firstname", {
              required: "Ce champ est obligatoire",
              validate: (value) =>
                /^[a-zA-ZÀ-ÿ\s]*$/.test(value) &&
                value.length >= 2 ||
                "Pas de chiffres ni de symboles, 2 lettres minimums"
            })}
            id="firstname"
            placeholder="Parker"
            onChange={(e) => inputValidate(e)}
            className={`peer h-11 w-full border-b ${
              errors.firstname ? "border-red-500" : "border-blue-gray-200"
            } bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border-tropical focus:border-tropical`}
          />
          <label
            className="mt-2 pointer-events-none absolute left-0 -top-2.5 flex w-full truncate text-sm leading-tight text-black font-bold transition-all peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900"
          >
            FirstName
          </label>
          {errors.firstname && <span className="error-message">{errors.firstname.message}</span>}
        </div>
        <div className="relative">
          <input
            {...register("lastname", {
              required: "Ce champ est obligatoire",
              validate: (value) =>
                /^[a-zA-ZÀ-ÿ\s]*$/.test(value) &&
                value.length >= 2 ||
                "Pas de chiffres ni de symboles, 2 lettres minimums"
            })}
            placeholder="John"
            onChange={(e) => inputValidate(e)}
            className={`peer h-11 w-full border-b ${
              errors.lastname ? "border-red-500" : "border-blue-gray-200"
            } bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border-tropical focus:border-tropical`}
          />
          <label
            className="mt-2 pointer-events-none absolute left-0 -top-2.5 flex w-full truncate text-sm leading-tight text-black font-bold transition-all peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900"
          >
            LastName
          </label>
          {errors.lastname && <span className="error-message">{errors.lastname.message}</span>}
        </div>
      </div>

      <InputDates methods={methods} />

      <p className="mt-9  uppercase text-2xl my-4">- Address -</p>
      <div className="relative h-11 w-full min-w-[200px]">
        <input
          {...register("street", { required: "Ce champ est obligatoire" })}
          placeholder="10 rue Algoud"
          className={`peer h-full w-full border-b ${
            errors.street ? "border-red-500" : "border-blue-gray-200"
          } bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border-tropical focus:border-tropical`}
        />
        <label className="pointer-events-none absolute left-0 -top-2.5 flex w-full truncate text-sm leading-tight text-black font-bold transition-all peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900">
          Street
        </label>
        {errors.street && <span className="error-message">{errors.street.message}</span>}
      </div>

      <div className="relative h-11 w-full min-w-[200px] mt-6">
        <input
          {...register("city", { required: "Ce champ est obligatoire" })}
          placeholder="Lyon"
          className={`peer h-full w-full border-b ${
            errors.city ? "border-red-500" : "border-blue-gray-200"
          } bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border-tropical focus:border-tropical`}
        />
        <label className="pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none truncate text-sm leading-tight text-black font-bold transition-all peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900">
          City
        </label>
        {errors.city && <span className="error-message">{errors.city.message}</span>}
      </div>
      <div className="relative h-11 w-full min-w-[200px] mt-6">
        <input
          {...register("zipCode", { required: "Ce champ est obligatoire" })}
          type="number"
          placeholder="70000"
          className={`peer h-full w-full border-b ${
            errors.zipCode ? "border-red-500" : "border-blue-gray-200"
          } bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all placeholder-shown:border-tropical focus:border-tropical`}
        />
        <label className="pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none truncate text-sm leading-tight text-black font-bold transition-all peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900">
          Zip Code
        </label>
        {errors.zipCode && <span className="error-message">{errors.zipCode.message}</span>}
      </div>
      <Dropdown register={register} errors={errors} states={states} />
      <button type="submit" className="text-white bg-tropical px-10 py-1 rounded-md my-10 font-light">
        Register
      </button>
    </form>
  );
};

FormEmployee.propTypes = {
  setModalMessage: PropTypes.func.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
};

export default FormEmployee;
