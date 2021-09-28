const errorMessage = (
  <p style={{ fontStyle: "italic", fontSize: "0.7em" }}>Error!1</p>
);

const logError = (str, prop) =>
  console.log(
    `${str.replace(/^\w/, (a) => a.toUpperCase())}: ${
      prop === true ? "Unknown error." : typeof prop === "string" && prop
    }`
  );

export { errorMessage, logError };
