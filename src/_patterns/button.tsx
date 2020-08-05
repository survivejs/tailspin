import * as elements from "typed-html";

// TODO: Use Box for this one
// https://tailwindcss.com/components/buttons
export default ({ onclick }, label) => (
  <button class="btn btn-blue" onclick={onclick}>
    {label}
  </button>
);
