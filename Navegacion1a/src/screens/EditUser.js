import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import Buttons from "../components/Buttons";
import useFetchUser from "../hooks/useFetchUser";

const EditUser = ({ route, navigation }) => {
  const user = route.params?.user;
  const { 
    nombre, 
    edad, 
    correo, 
    setNombre, 
    setEdad, 
    setCorreo, 
    handleEditarUsuario 
  } = useFetchUser();

  // Verificar si hay un usuario seleccionado
  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Editar Usuario</Text>
        <Text style={styles.errorText}>
          No hay usuario seleccionado para editar
        </Text>
        <Text style={styles.instructionText}>
          Para editar un usuario, ve a la lista de usuarios y selecciona el botón "Editar" de algún usuario.
        </Text>
        <Buttons text="Ver Usuarios" action={() => navigation.navigate("ShowUser")} />
      </View>
    );
  }

  // Cargar datos del usuario al inicializar
  useEffect(() => {
    if (user) {
      setNombre(user.nombre);
      setEdad(user.edad.toString());
      setCorreo(user.correo);
    }
  }, [user]);

  const handleGuardarCambios = async () => {
    const success = await handleEditarUsuario(user.id);
    if (success) {
      navigation.goBack();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Usuario</Text>
      <Text style={styles.subtitle}>
        Modifica la información del usuario
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        placeholderTextColor="#A1866F"
      />
      <TextInput
        style={styles.input}
        placeholder="Edad"
        value={edad}
        onChangeText={setEdad}
        keyboardType="numeric"
        placeholderTextColor="#A1866F"
      />
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        placeholderTextColor="#A1866F"
      />

      <View style={styles.buttonContainer}>
        <Buttons text="Guardar Cambios" action={handleGuardarCambios} />
        <View style={styles.buttonSeparator} />
        <Buttons text="Cancelar" action={() => navigation.goBack()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#EAD8C0",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#5C3D2E",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: "#5C3D2E",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#5C3D2E",
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    backgroundColor: "#FFF",
    color: "#000",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 20,
  },
  buttonSeparator: {
    height: 10,
  },
  errorText: {
    fontSize: 18,
    color: "#D32F2F",
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "600",
  },
  instructionText: {
    fontSize: 16,
    color: "#5C3D2E",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
});

export default EditUser;