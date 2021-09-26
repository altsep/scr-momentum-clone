const errorMessage = (
  <p style={{ fontStyle: "italic", fontSize: "1rem" }}>Error!1</p>
);

const logError = (str, prop) =>
  console.log(
    `${str} — ${
      prop === true ? "Unknown error." : typeof prop === "string" && prop
    }`
  );

export { errorMessage, logError };
