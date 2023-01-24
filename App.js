import {useState, useEffect} from 'react';
import {StyleSheet, ImageBackground, SafeAreaView} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import {useFonts} from "expo-font";
import * as SplashScreen from 'expo-splash-screen';

import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import {StatusBar} from "expo-status-bar";
import Colors from "./constants/colors"

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
    const [userNumber, setUserNumber] = useState();
    const [gameOver, setGameOver] = useState(false);
    const [guessLog, setGuessLog] = useState([]);
    const [screen, setScreen] = useState(<StartGameScreen onPickNumber={pickedNumberHandler}/>);

    const [fontsLoaded] = useFonts({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });

    useEffect(() => {
        console.log(`Is game over? ${gameOver}`);
        console.log(`Is there a userNumber? ${userNumber}`);
        if (userNumber && !gameOver) {
            setScreen(<GameScreen userNumber={userNumber} onGameOver={gameOverHandler}/>);
        } else if (gameOver) {
            setScreen(<GameOverScreen userNumber={userNumber} guessLog={guessLog} handleNewGame={newGameHandler}/>);
        } else {
            setScreen(<StartGameScreen onPickNumber={pickedNumberHandler}/>);
        }
    }, [userNumber, gameOver]);

    if (!fontsLoaded) {
        return null;
    } else {
        SplashScreen.hideAsync();
    }


    function pickedNumberHandler(pickedNumber) {
        setUserNumber(pickedNumber);
    }

    function gameOverHandler(log) {
        setGameOver(true);
        console.log('gameOverSet!');
        setGuessLog(log);
    }

    function newGameHandler() {
        setGameOver(false);
        setUserNumber();
        console.log('NewGame!');
    }


    return (
        <>
            <StatusBar style='light' hidden={false}/>
            <LinearGradient
                colors={[Colors.primary700, Colors.accent500]}
                style={styles.rootScreen}
            >
                <ImageBackground source={require('./assets/images/background.png')}
                                 resizeMode="cover"
                                 style={styles.rootScreen}
                                 imageStyle={styles.backgroundImage}
                >
                    <SafeAreaView style={styles.rootScreen}>
                        {screen}
                    </SafeAreaView>
                </ImageBackground>
            </LinearGradient>
        </>
    )

}

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
    },
    backgroundImage: {
        opacity: 0.15,
    }
});
