import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import Buttons from "../components/Buttons";
import useFetchUser from "../hooks/useFetchUser";

const DeleteUser = ({ route, navigation }) => {
  const user = route.params?.user;
  const { handleEliminarUsuario } = useFetchUser();

  // Verificar si hay un usuario seleccionado
  if (!user) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Eliminar Usuario</Text>
        <Text style={styles.errorText}>
          No hay usuario seleccionado para eliminar
        </Text>
        <Text style={styles.instructionText}>
          Para eliminar un usuario, ve a la lista de usuarios y selecciona el botón "Eliminar" de algún usuario.
        </Text>
        <Buttons text="Ver Usuarios" action={() => navigation.navigate("ShowUser")} />
      </ScrollView>
    );
  }

  const confirmarEliminacion = () => {
    Alert.alert(
      "Confirmar eliminación",
      `¿Estás seguro de que deseas eliminar a ${user.nombre}?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            const success = await handleEliminarUsuario(user.id);
            if (success) {
              navigation.goBack();
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Eliminar Usuario</Text>
      <Text style={styles.subtitle}>
        ¿Estás seguro de que deseas eliminar este usuario?
      </Text>

      <View style={styles.userInfo}>
        <Text style={styles.infoTitle}>Información del usuario:</Text>
        <Text style={styles.infoText}>Nombre: {user.nombre}</Text>
        <Text style={styles.infoText}>Edad: {user.edad}</Text>
        <Text style={styles.infoText}>Correo: {user.correo}</Text>
      </View>

      <Text style={styles.warning}>
        Esta acción no se puede deshacer
      </Text>

      <View style={styles.buttonContainer}>
        <Buttons text="Eliminar Usuario" action={confirmarEliminacion} />
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
  userInfo: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
    marginVertical: 20,
    width: "100%",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5C3D2E",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#3B2C24",
    marginBottom: 5,
  },
  warning: {
    fontSize: 16,
    color: "#D32F2F",
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 20,
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

export default DeleteUser;