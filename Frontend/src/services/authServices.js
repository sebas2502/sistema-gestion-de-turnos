import api from "../api/api";

export const login = async (usuario, clave) => {
  try {
    const { data } = await api.post('/auth/login', { usuario, clave });
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.rol);
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Usuario o clave incorrectos');
  }
};

export const registerPaciente = async (formData) => {
  try {
    const { data } = await api.post('/pacientes/register', formData);
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Error al registrar paciente');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('rol');
};