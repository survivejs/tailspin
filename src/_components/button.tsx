import * as elements from "typed-html";

// https://tailwindcss.com/components/buttons
export default ({ onclick }, label) => (
  <button class="btn btn-blue" onclick={onclick}>
    {label}
  </button>
);
