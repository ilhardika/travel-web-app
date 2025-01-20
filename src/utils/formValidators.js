export const loginValidator = {
  validate: (formState) => {
    const newErrors = {};

    if (!formState.email) {
      newErrors.email = "Email harus diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!formState.password) {
      newErrors.password = "Password harus diisi";
    } else if (formState.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    }

    return newErrors;
  },
  isValid: (formState) => {
    return formState.email.length > 0 && formState.password.length >= 6;
  },
};

export const registerValidator = {
  validate: (formState) => {
    const newErrors = {};

    if (!formState.name) {
      newErrors.name = "Nama harus diisi";
    }

    if (!formState.email) {
      newErrors.email = "Email harus diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!formState.password) {
      newErrors.password = "Password harus diisi";
    } else if (formState.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    }

    if (formState.password !== formState.passwordRepeat) {
      newErrors.passwordRepeat = "Konfirmasi password tidak cocok";
    }

    return newErrors;
  },
  isValid: (formState) => {
    return (
      formState.name.length > 0 &&
      formState.email.length > 0 &&
      formState.password.length >= 6 &&
      formState.password === formState.passwordRepeat
    );
  },
};
