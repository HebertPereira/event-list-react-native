import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from "react-native"
import uuid from 'react-native-uuid';
import { Toast } from 'toastify-react-native';
import { format, setDefaultOptions } from "date-fns"
import { ptBR } from "date-fns/locale"

import Partipant from "../../components/Participant";

import { styles } from "./styles";

export interface ParticipantProps {
    id: string | number[],
    name: string
}

function Home() {
    const [participants, setParticipants] = useState<ParticipantProps[]>([
        {id: uuid.v4(), name: "Lucas"},
        { id: uuid.v4(), name: "Marcio"}
    ]);
    const [partcipantName, setParticipantName] = useState("");

    // format date
    setDefaultOptions({ locale: ptBR })
    const ActualDate = format(new Date(), 'PPPP');

    function handleParticipantAdd(name: string) {
        if(name === "") {
            return Toast.warn('O nome não pode estar vázio!');
        }

        if(participants.find(item => item.name === name)) {
            return Toast.error('Ops, o nome já está na lista! 🥲');
        }

        setParticipants(prev => [...prev, {id: uuid.v4(), name: name}]);
        setParticipantName("")
        return Toast.success('Adicionado com sucesso! 😊');
    }

    function handleParticipantDelete(participant: ParticipantProps) {
        Alert.alert("Remover", `Remover o participante ${participant.name} da lista?`,
            [
                {
                    text: "Sim",
                    onPress: () => {
                        setParticipants(prev => prev.filter(partcipantData => partcipantData.id !== participant.id))

                        return Toast.success('Removido com sucesso! 😊');
                    }
                },
                {
                    text: "Não",
                    style: "cancel"
                }
            ]
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.eventName}>Nome do evento</Text>
            <Text style={styles.evenDate}>{ActualDate}</Text>
        
            <View style={styles.form}>
                <TextInput
                style={styles.input}
                placeholder="Nome do participante"
                value={partcipantName}
                onChangeText={value=> setParticipantName(value)}
                />
                <TouchableOpacity style={styles.button} onPress={()=> handleParticipantAdd(partcipantName)}>
                    <Text style={styles.buttonText}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={participants}
                keyExtractor={({id}) => `${id}`}
                renderItem={({item})=> (
                    <Partipant data={item} onDelete={handleParticipantDelete}/>
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style={styles.listEmptyText}>
                        Ninguém chegou no evento ainda? Adicione participants a sua lista de presença.
                    </Text>
                )}
            />
        </View>
    )
}

export default Home;