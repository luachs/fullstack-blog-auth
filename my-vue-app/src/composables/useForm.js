import { ref } from "vue";

export function useForm(initialValues = {}) {
  const form = ref({ ...initialValues });

  const updateField = (key, value) => {
    form.value[key] = value;
  };

  const resetForm = () => {
    form.value = { ...initialValues };
  };

  return {
    form,
    updateField,
    resetForm,
  };
}
