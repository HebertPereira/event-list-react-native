import { View, Text, TouchableOpacity } from "react-native";

import { ParticipantProps } from "../../screens/home";

import { styles } from "./styles"

interface PartipantComponentProps {
    data: ParticipantProps;
    onDelete(data: ParticipantProps): void;
}

const Partipant = ({data, onDelete}: PartipantComponentProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>
                {data.name}
            </Text>
            <TouchableOpacity style={styles.button} onPress={()=> onDelete(data)}>
                <Text style={styles.buttonText}>
                    -
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default Partipant;
