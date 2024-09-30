import React from "react";
import {
  Inpusts,
  Labels,
  Selects,
  Checkboxes,
  RadiosButtons,
  DataInput,
  EditInput,
} from "../atoms/FormularyItems";

export function FormsImputs({value, type, label, text, onChange, id, options, validate, errors, navigate }) {
  
  return (
    <div className="w-full flex flex-col mt-2">
      <Labels text={label} to={id} />
      {type === "select" ? (
        <Selects id={id} text={text} onChange={onChange} options={options} validate={validate}  />
      ) : type === "checkbox" ? (
        <Checkboxes id={id} text={text} navigate={navigate}  />
      ) : type === "radiosButtons" ? (
        <RadiosButtons options={options} id={id} text={text}  />
      ) : type === "date"
      ? (
        <DataInput type={type} text={text} onChange={onChange} id={id} validate={validate} />
      ) :
      (
        <Inpusts value={value} type={type} text={text} onChange={onChange} id={id} validate={validate} />
      )}
    </div>
  );
}

export const EditFormsImputs = ({value, type, label, text, onChange, id}) => {

  return (
    <div className="w-full flex flex-col ">
      <Labels text={label} to={id} />
      <EditInput value={value} type={type} text={text} onChange={onChange} id={id} />
    </div>
  )
}
