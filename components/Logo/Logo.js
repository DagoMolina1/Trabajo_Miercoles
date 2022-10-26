import { Text, SafeAreaView, StyleSheet, Image } from 'react-native'
import React from 'react'

export default function Logo({oneTitle, twoTitle, colorBorder, textColor, colorText2}) {
    const styles = StyleSheet.create({
        imgHome: {
            marginTop: 10,
            width: 120,
            height: 120,
            marginBottom: 8
        },
        textHome: {
            textAlign: 'center',
            fontSize: 25,
            fontWeight: 'bold',
            color: 'red'
        },
    })

    return(
        <SafeAreaView>
            <Image style = {styles.imgHome} source = {require ('../img/Logo.png')}/>
            <Text style = {styles.textHome}>
                {oneTitle}
                <Text style = {{color: `${colorText2}`}}>
                    {twoTitle}
                </Text>
            </Text>
        </SafeAreaView>
    )
}

