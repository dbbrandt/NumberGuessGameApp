import {View, Text, Image, StyleSheet, Dimensions, ScrollView, useWindowDimensions} from "react-native";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";
import Card from "../components/ui/Card";
import PrimaryButton from "../components/ui/PrimaryButton";

function GameOverScreen({userNumber, guessLog, handleNewGame}) {
    const {width, height} = useWindowDimensions();

    const imageSizing = {
        width: (height > 500 && width > 400) ? 300 : 150,
        height: (height > 500 && width > 400) ? 300 : 150,
        borderRadius: (height > 500 && width > 400) ? 150 : 75
    }

    return (
        <ScrollView style={styles.screen}>
            <View style={styles.rootContainer}>
                <Title style={styles.title}>Game Over!</Title>
                <View style={[styles.imageContainer, imageSizing]}>
                    <Image style={styles.image} source={require('../assets/images/success.png')}/>
                </View>
                <Card title={height > 500 ? 'Game Results' : ''} style={styles.card}>
                    <View style={styles.resultsContainer}>
                        <Text style={styles.results}>Your phone needed
                            <Text style={styles.resultsBold}> {guessLog.length} </Text>
                            rounds to guess the number
                            <Text style={styles.resultsBold}> {userNumber} </Text>.
                        </Text>
                        {height > 500 &&
                        <>
                            <Text style={styles.results}>Guesses:</Text>

                            <View style={styles.guessList}>
                                {guessLog.map((log, index) => {
                                    return <Text key={index} style={styles.guessText}>{index + 1}) {log}</Text>
                                })}
                            </View>
                        </>
                        }
                    </View>
                    <PrimaryButton style={styles.button} onPress={handleNewGame}>
                        Start new game
                    </PrimaryButton>
                </Card>
            </View>
        </ScrollView>
    )
}

export default GameOverScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    rootContainer: {
        flex: 1,
        padding: 24,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imageContainer: {
        borderWidth: 3,
        borderColor: Colors.primary800,
        overflow: 'hidden',
        margin: 30,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    title: {
        paddingHorizontal: 20,
    },
    card: {
        marginTop: 0,
    },
    resultsContainer: {
        margin: 10,
    },
    results: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: Colors.accent500,
        padding: 4,
    },
    resultsBold: {
        fontFamily: 'open-sans-bold',
        color: Colors.accent500,
    },
    guessList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 10,
    },
    guessText: {
        fontFamily: 'open-sans',
        color: Colors.accent500,
        padding: 5,
    },
    button: {
        flex: 0,
    }
});