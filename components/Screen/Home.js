import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react'
import Logo from '../Logo/Logo'
import { useForm, Controller } from 'react-hook-form'

//Styles
const principalColor = 'red'
const subColor = '#9E9E9E'
const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        width: '',
        display: '',
        alignItems: 'center',
        backgroundColor: ''
    },
    BackgroundColorHeader: {
        backgroundColor: `${principalColor}`,
        width: '100%',
        height: 40,
        color: 'transparent',
        shadowColor: "grey",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1.23,
        shadowRadius: 4.62,
        elevation: 5,
    },
    containerLogin: {
        marginTop: '',
        alignItems: 'center'
    },
    textInput: {
        width: '',
        textAlign: 'center',
        color: `${principalColor}`,
        fontWeight: 'bold',
        padding: 15,
        marginBottom: '20px',
        placeholderTextColor: `red`
    },
    Touchable: {
        backgroundColor: 'red',
        width: '270px',
        marginTop: '20px',
        padding: '5px',
        textAlign: 'center',
        marginBottom: '10px'
    },
})

export default function Home({navigation, route}) {
    //const registro = route.params.registros
    //datos quemados
    const datosPredeterminados = [
        {
            usuario: 'DagoMolina',
            typeUser: 'administrador',
        },
        {
            usuario: 'EvelynLondoño',
            typeUser: 'administrador',
        },
        {
            usuario: 'CarlosAugusto',
            typeUser: 'usuario',
        },
        {
            usuario: 'FrancyMaryory',
            typeUser: 'usuario',
        },
        {
            usuario: 'MariaPaula',
            typeUser: 'usuario',
        },
    ]

    const {control, handleSubmit, reset, formState: { errors }} = useForm({
        defaultValues: {
            userName: '',
            rol: '',
            contrasena: ''
        }
    })

    // resultado
    const [result, setResult] = useState('')
    const administradores = datosPredeterminados.filter(dat => dat.typeUser == 'administrador') // objectos que tiene rol admin
    const usuarios = datosPredeterminados.filter(dat => dat.typeUser == 'usuario')

    const onSubmit = data => {
        // filtros admin
        const adminUser = administradores.filter(admin => admin.usuario == data.userName) // si cumple con esta condicion se crea un array con un objecto
        const usuarioUser = usuarios.filter(admin => admin.usuario == data.userName) // si cumple con esta condicion se crea un array con un objecto

        if(adminUser.length > 0 && data.rol === 'administrador'){
            setResult('Exito en la session')
            const nombre = data.userName
            navigation.navigate('Cuentas', {nombre: nombre})
        }else{
            setResult('no se encontro nada en la base de datos')
        }

        if(usuarioUser.length > 0 && data.rol === 'usuario'){
            setResult('Los usuarios no tienen acceso')
        }
        reset()
    }

    return(
        <View style = {styles.container}>
            <Logo
                colorBorder = {`${subColor}`}
                textColor = {`${principalColor}`}
                colorText2 = {`${subColor}`}
                oneTitle = {'banco'}
            />
            <View style = {styles.containerLogin}>
                <Controller
                    control = {control}
                    rules = {{
                        required: true,
                        pattern: /^[A-Z]+$/i,
                        maxLength: 15,
                        minLength: 4
                    }}
                    render = {({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            style = {styles.textInput}
                            onBlur = {onBlur}
                            onChangeText = {onChange}
                            value = {value}
                            placeholder = {'Digitar Username'}
                        />
                    )}
                    name = "userName"
                />
                {errors.userName?.type == 'required' && <Text style = {{fontSize: 11, color: '#7F2D28', marginBottom: 5}}>Se requiere este dato</Text>}
                {errors.userName?.type == 'pattern' && <Text style = {{fontSize: 11, color: '#7F2D28', marginBottom: 5}}>Solo letras</Text>}
                {errors.userName?.type == 'minLength' && <Text style = {{fontSize: 11, color: '#7F2D28', marginBottom: 5}}>Debe tener mas de 5 letras</Text>}

                <Controller
                    control = {control}
                    rules = {{
                        required: true,
                        pattern: /^[A-Z]+$/i,
                        minLength: 4
                    }}
                    render = {({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            style = {styles.textInput}
                            onBlur = {onBlur}
                            onChangeText = {onChange}
                            value = {value}
                            placeholder = {'usuario o administrador?'}
                        />
                    )}
                    name = "rol"
                />
                {errors.rol?.type == 'required' && <Text style = {{fontSize: 11, color: '#7F2D28', marginBottom: 15}}>Se requiere este dato</Text>}
                {errors.rol?.type == 'pattern' && <Text style = {{fontSize: 11, color: '#7F2D28', marginBottom: 15}}>Solo letras</Text>}
                {errors.rol?.type == 'minLength' && <Text style = {{fontSize: 11, color: '#7F2D28', marginBottom: 15}}>Debe tener mas de 4 letras</Text>}

                <Controller
                    control = {control}
                    rules = {{
                        required: true,
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/,
                        minLength: 6
                    }}
                    render = {({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            style = {styles.textInput}
                            onBlur = {onBlur}
                            onChangeText = {onChange}
                            value = {value}
                            placeholder = {'Digitar contra'}
                        />
                    )}
                    name = "contrasena"
                />
                {errors.contrasena?.type == 'required' && <Text style = {{fontSize: 11, color: '#7F2D28', marginBottom: 15}}>La contrasena debe tener minimo 6 caracteres</Text>}
                {errors.contrasena?.type == 'pattern' && <Text style = {{fontSize: 12, color: '#7F2D28', marginBottom: 15, width: '80%'}}>Minimo 8 caracteres,
                    Maximo 15,
                    Al menos una letra mayúscula,
                    Al menos una letra minucula,
                    Al menos un dígito,
                    Al menos 1 caracter especial</Text>}
                {errors.contrasena?.type == 'minLength' && <Text style = {{fontSize: 11, color: '#7F2D28', marginBottom: 15}}>La contrasena debe tener minimo 6 caracteres</Text>}

                <TouchableOpacity style = {styles.Touchable} onPress = {handleSubmit(onSubmit)}>
                    <Text style = {{color: 'white', fontWeight: 'bold'}}>Ingresar</Text>
                </TouchableOpacity>

                <Text style = {{
                        color: 'black', 
                        marginTop: 10,
                        fontSize: 18, 
                        fontWeight: 'bold',
                        textAlign: 'center', 
                        width: '70%',
                        backgroundColor: principalColor,
                        borderRadius: 5
                    }}
                >{result}</Text>
            </View>
        </View>
    )
}
