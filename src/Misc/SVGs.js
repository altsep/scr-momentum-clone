const SwitchSVG = (props) => (
  <svg
    height="30px"
    xmlns="http://www.w3.org/2000/svg"
    className={"h-6 w-6 " + props.hoverClass}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
    />
  </svg>
);

const RefreshSVG = (props) => (
  <svg
    height="30px"
    xmlns="http://www.w3.org/2000/svg"
    className={"h-6 w-6 " + props.hoverClass}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  </svg>
);

export { SwitchSVG, RefreshSVG };
