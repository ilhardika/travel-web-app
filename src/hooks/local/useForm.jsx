import { useState } from "react";

// Custom hook untuk mengelola state dan perubahan form
const useForm = (initialState = {}) => {
  // State untuk menyimpan nilai-nilai form
  const [values, setValues] = useState(initialState);

  // Handler untuk mengupdate nilai form saat input berubah
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Fungsi untuk mereset form ke nilai awal
  const resetForm = () => {
    setValues(initialState);
  };

  return {
    values,
    handleChange,
    resetForm,
    setValues,
  };
};

export default useForm;
