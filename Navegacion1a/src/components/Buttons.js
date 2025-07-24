import { Text, TouchableOpacity, StyleSheet} from "react-native";

const Buttons = ({text, action}) => {
    return (
        <TouchableOpacity
        onPress={action} style={styles.boton}>
            <Text style={styles.texto}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    boton: {
        padding: 10,
        backgroundColor:"#074d68ff",
        borderRadius: 15
    },
    texto: {
        fontSize: 15,
        textAlign: "center",
        color: "#FFFFFF",
        fontWeight: "bold"
    }    
})

export default Buttons;