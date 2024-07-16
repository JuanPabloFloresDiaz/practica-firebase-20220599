import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import {
  TextInput,
  Button,
  PaperProvider,
  Card,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { auth } from '../config/firebase'; // Ajusta el path según tu estructura de proyecto
import { createUserWithEmailAndPassword } from "firebase/auth";

// Constante para manejar el alto de la pantalla
const windowHeight = Dimensions.get("window").height;

const SignUp = () => {
  // Constantes para el manejo de datos
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");

  // Constante de navegación entre pantallas
  const navigation = useNavigation();

  // Método para manejar el registro de usuarios
  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, correo, clave);
      const user = userCredential.user;
      console.log("User registered: ", user);
      // Puedes redirigir al usuario a otra pantalla después del registro
      navigation.navigate("Home"); // Ajusta "Home" a la pantalla a la que quieres navegar
    } catch (error) {
      if (error.code === 'auth/network-request-failed') {
        alert("Error de red. Por favor, verifica tu conexión a Internet.");
      } else {
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Card style={styles.profileCard}>
            <Card.Content>
              <View style={styles.inputContainer}>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Correo electrónico:</Text>
                  <View style={styles.rowContent}>
                    <AntDesign name="mail" size={24} />
                    <TextInput
                      style={styles.infoText}
                      value={correo}
                      onChangeText={setCorreo}
                      keyboardType="email-address"
                    />
                  </View>
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Clave del cliente:</Text>
                  <View style={styles.rowContent}>
                    <Entypo name="lock" size={24} />
                    <TextInput
                      style={styles.infoText}
                      value={clave}
                      onChangeText={setClave}
                      secureTextEntry={true}
                    />
                  </View>
                </View>
              </View>
              <Button
                style={styles.button}
                mode="contained"
                onPress={handleRegister}
              >
                Registrarse
              </Button>
              <TouchableOpacity
                onPress={() => navigation.navigate("LogIn")} // Ajusta el nombre de la pantalla de inicio de sesión
              >
                <Text style={styles.loginText}>
                  ¿Ya tienes cuenta? Inicia sesión aquí
                </Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </PaperProvider>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: windowHeight * 0.15,
    paddingTop: 50,
  },
  profileCard: {
    width: "100%",
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#B7DABE",
    paddingTop: 20,
    paddingBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
  },
  infoRow: {
    padding: 12,
    margin: 2,
    borderRadius: 10,
    backgroundColor: "white",
    width: "100%",
    elevation: 2,
  },
  rowContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    backgroundColor: "transparent",
    height: 40,
    borderWidth: 0,
    flex: 1,
  },
  pickerText: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: "black",
    flex: 1,
  },
  fila: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    width: "100%",
    paddingVertical: 10,
    marginTop: 10,
    backgroundColor: "#38A34C",
  },
  loginText: {
    marginTop: 20,
    color: "black",
  },
  avatarContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});