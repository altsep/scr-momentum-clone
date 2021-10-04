import { useState } from "react";

export const useErrorMessage = () => {
  const [errorText, setErrorText] = useState("Error!!!");
  const ErrorMessage = (props) => (
    <p style={{ fontStyle: "italic", fontSize: props.size || "0.7em" }}>
      {props.text || errorText}
    </p>
  );
  return { ErrorMessage, setErrorText };
};
