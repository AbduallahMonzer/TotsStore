// src/hooks/useOrderOpnForm.js
export function useOrderOpnForm() {
  const orderWithOpnForm = (fields = {}) => {
    function openForm() {
      if (window.OpnForm && typeof window.OpnForm.setFields === "function") {
        window.OpnForm.setFields(fields);
        setTimeout(() => window.OpnForm.open(), 250);
      } else {
        setTimeout(openForm, 300);
      }
    }
    openForm();
  };
  return orderWithOpnForm;
}
