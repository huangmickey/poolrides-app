import { View, Text, StyleSheet } from 'react-native';
import { AppStyles } from '../utils/styles';

export default function MusicInterests() {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>Music Interests Page</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppStyles.color.black,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: AppStyles.color.white,
    },
})