import {View, Text, Pressable, StyleSheet, Platform} from 'react-native';

function PrimaryButton({children}) {
    function pressHandler() {
        console.log('Pressed');
    }

    function buttonPressedHandler(pressed) {
        console.log(`Press Handled: ${pressed}`);
        return pressed && Platform.OS === 'ios' ?
            [styles.buttonInnerContainer, styles.pressed] :
            styles.buttonInnerContainer;
    };

    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable
                style={({pressed}) => buttonPressedHandler(pressed)}
                onPress={pressHandler}
                android_ripple={{color: '#640233'}}>
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    )
}

export default PrimaryButton;

const styles = StyleSheet.create({
    buttonOuterContainer: {
        margin: 4,
        overflow: 'hidden',
    },
    buttonInnerContainer: {
        backgroundColor: '#72064c',
        borderRadius: 28,
        padingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        padding: 5,
    },
    pressed: {
        opacity: 0.75,
    }
});