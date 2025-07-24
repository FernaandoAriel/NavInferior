import { useState, useEffect } from "react";
import { Alert } from "react-native";

const useFetchUser = () => {
  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [correo, setCorreo] = useState("");

  // Estados para la lista de usuarios
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener usuarios desde la API
  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://retoolapi.dev/zZhXYF/movil");
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  // Guardar nuevo usuario en la API
  const handleGuardar = async () => {
    if (!nombre || !edad || !correo) {
      Alert.alert("Error", "Por favor, completa todos los campos");
      return;
    }

    try {
      const response = await fetch("https://retoolapi.dev/zZhXYF/movil", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          edad: parseInt(edad),
          correo,
        }),
      });

      if (response.ok) {
        Alert.alert("Éxito", "Usuario guardado correctamente");
        setNombre("");
        setEdad("");
        setCorreo("");
        fetchUsuarios(); // Actualizar lista
      } else {
        Alert.alert("Error", "No se pudo guardar el usuario");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al enviar los datos");
    }
  };

  // Editar usuario existente
  const handleEditarUsuario = async (userId) => {
    if (!nombre || !edad || !correo) {
      Alert.alert("Error", "Por favor, completa todos los campos");
      return false;
    }

    try {
      const response = await fetch(`https://retoolapi.dev/zZhXYF/movil/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          edad: parseInt(edad),
          correo,
        }),
      });

      if (response.ok) {
        Alert.alert("Éxito", "Usuario editado correctamente");
        setNombre("");
        setEdad("");
        setCorreo("");
        fetchUsuarios(); // Actualizar lista
        return true;
      } else {
        Alert.alert("Error", "No se pudo editar el usuario");
        return false;
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al editar el usuario");
      return false;
    }
  };

  // Eliminar usuario
  const handleEliminarUsuario = async (userId) => {
    try {
      const response = await fetch(`https://retoolapi.dev/zZhXYF/movil/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        Alert.alert("Éxito", "Usuario eliminado correctamente");
        fetchUsuarios(); // Actualizar lista
        return true;
      } else {
        Alert.alert("Error", "No se pudo eliminar el usuario");
        return false;
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al eliminar el usuario");
      return false;
    }
  };

  // Ejecutar al cargar componente
  useEffect(() => {
    fetchUsuarios();
    console.log("actualizando en useEffect");
  }, []);

  return {
    nombre,
    setNombre,
    edad,
    setEdad,
    correo,
    setCorreo,
    handleGuardar,
    handleEditarUsuario,
    handleEliminarUsuario,
    usuarios,
    loading,
    fetchUsuarios,
  };
};

export default useFetchUser;