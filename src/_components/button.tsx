import * as elements from "typed-html";

export default ({ label, onclick }) => (
  <button class="btn btn-blue" onclick={onclick}>
    {label}
  </button>
);
