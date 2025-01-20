import { useState, useCallback, useMemo } from "react";

export const useForm = (
  initialState,
  validator,
  submitHandler,
  navigatePath = null
) => {
  const [formState, setFormState] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Handler Input
  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormState((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Hapus error saat mengetik
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [errors]
  );

  // Validasi Form
  const isFormValid = useMemo(() => {
    return validator.isValid(formState);
  }, [formState]);

  // Handler Submit
  const handleSubmit = async (e, navigate) => {
    e.preventDefault();

    // Validasi
    const newErrors = validator.validate(formState);

    // Set errors jika ada
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const result = await submitHandler(formState);

      // Navigasi otomatis jika disediakan path
      if (navigatePath && navigate) {
        navigate(navigatePath);
      }

      return result;
    } catch (err) {
      setErrors({
        submit: err.response?.data?.message || "Proses gagal",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formState,
    errors,
    isLoading,
    isFormValid,
    handleInputChange,
    handleSubmit,
    setErrors,
  };
};
