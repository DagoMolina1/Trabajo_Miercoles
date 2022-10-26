import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Ionicons } from "@expo/vector-icons"
import { SectionList } from 'react-native-web'

const principalColor = 'red'
const subColor = '#9E9E9E'
const estilos = StyleSheet.create({
        textBienvenida: {
            color: `black`,
            fontSize: 20,
            fontWeight: 'bold',
            backgroundColor: `${principalColor}`,
            height: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        icon: {
            color: `${principalColor}`,
            fontSize: 45,
            fontWeight: 'bold'
        },
        containerSaldo: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center'
        },
        textSaldo: {
            color: `${principalColor}`,
            textShadow: `2px 2px 2xp black`,
            fontSize: 16,
            fontWeight: '600'
        },
        inputs: {
            color: `white`,
            width: '',
            textAlign: 'center',
            marginBottom: 25,
            fontSize: 16
        },
        containerInputs: {
            borderRadius: 15,
            padding: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: `${principalColor}`
        },
        Touchable: {
            backgroundColor: 'white',
        },
        comprobante: {
            color: 'white',
            fontSize: 17,
            textAlign: 'center'
        },
        view: {
            display: 'flex',
            justifyContent: 'flex-end'
        }
    }
)

export default function Cuentas({route}) {
    const {control, handleSubmit, reset, formState: {errors}} = useForm({
        defaultValues: {
            numeroCuenta: '',
            identificacion: '',
            titular: '',
            fecha: '',
            saldo: ''
        }
    })

    const [indentificacion, setIndentificacion] = useState('')
    const [destinatario, setDestinatario] = useState('')
    const [saldoEviado, setSaldoEviado] = useState('')

    const onSubmit = data => {
        console.log(data)
        setIndentificacion(data.identificacion)
        setDestinatario(data.titular)
        setSaldoEviado(data.saldo)
    }

    return(
        <View>
            <View>
                <Text style = {estilos.textBienvenida}>Hola bienvenido {route.params.nombre}</Text>
                <View style = {estilos.containerSaldo}/>
                <View style = {estilos.containerInputs}>
                    <Controller
                        control = {control}
                        rules = {{
                            required: true,
                            pattern: /^[0-9]*(\.?)[ 0-9]+$/,
                            minLength: 10
                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style = {estilos.inputs}
                                onBlur = {onBlur}
                                onChangeText = {onChange}
                                value = {value}
                                placeholder = {'Digitar Numero de cuenta'}
                            />
                        )}
                        name = "numeroCuenta"
                    />
                    {errors.numeroCuenta?.type == 'required' && <Text style = {{fontSize: 12, color: 'grey', marginBottom: 5}}>Se require este dato</Text>}
                    {errors.numeroCuenta?.type == 'minLength' && <Text style = {{fontSize: 12, color: 'grey', marginBottom: 5}}>Minimo 10 numeros</Text>}
                    {errors.numeroCuenta?.type == 'pattern' && <Text style = {{fontSize: 12, color: 'grey', marginBottom: 5}}>Solo numeros</Text>}

                    <Controller
                        control = {control}
                        rules = {{
                            required: true,
                            pattern: /^[0-9]*(\.?)[ 0-9]+$/,
                            minLength: 10,
                            maxLength: 10,
                        }}
                        render = {({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style = {estilos.inputs}
                                onBlur = {onBlur}
                                onChangeText = {onChange}
                                value = {value}
                                placeholder = {'Digitar identificacion'}
                            />
                        )}
                        name = "identificacion"
                    />
                    {errors.identificacion?.type == 'required' && <Text style = {{fontSize: 12, color: 'grey', marginBottom: 15}}>Se requiere el dato</Text>}
                    {errors.identificacion?.type == 'pattern' && <Text style = {{fontSize: 12, color: 'grey', marginBottom: 15}}>Solo numeros</Text>}
                    {errors.identificacion?.type == 'minLength' && <Text style = {{fontSize: 12, color: 'grey', marginBottom: 15}}>Minimo 10 numeros</Text>}
                    {errors.identificacion?.type == 'maxLength' && <Text style = {{fontSize: 12, color: 'grey', marginBottom: 15}}>Usuario la identificacion no supera los 8 numeros</Text>}

                    <Controller
                        control = {control}
                        rules = {{ 
                            required: true,
                            pattern: /^[A-Za-z\s]+$/g
                        }}
                        render = {({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style = {estilos.inputs}
                                onBlur = {onBlur}
                                onChangeText = {onChange}
                                value = {value}
                                placeholder = {'Digitar nombre de la cuenta a enviar '}
                            />
                        )}
                        name = "titular"
                    />
                    {errors.titular?.type == 'required' && <Text style = {{fontSize: 12, color: 'grey', marginBottom: 5}}>Se require este dato</Text>}
                    {errors.titular?.type == 'pattern' && <Text style = {{fontSize: 12, color: 'grey', marginBottom: 5}}>Solo letras</Text>}

                    <Controller
                        control = {control}
                        rules = {{
                            required: true,
                            pattern: /^(0[1-9]|[1-2]\d|3[01])(\/)(0[1-9]|1[012])\2(\d{4})$/
                        }}
                        render = {({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style = {estilos.inputs}
                                onBlur = {onBlur}
                                onChangeText = {onChange}
                                value = {value}
                                placeholder = {'Digitar Fecha'}
                            />
                        )}
                        name = "fecha"
                    />
                    {errors.fecha?.type == 'required' && <Text style = {{fontSize: 12, color: 'grey', marginBottom: 5}}>Se require este dato</Text>}
                    {errors.fecha?.type == 'pattern' && <Text style = {{fontSize: 12, color: 'grey', marginBottom: 5}}>Solo fechas ejemplo 09/10/1999</Text>}

                    <Controller
                        control = {control}
                        rules = {{
                            required: true,
                            pattern: /^[0-9]+$/,
                            minLength: 7,
                        }}
                        render = {({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style = {estilos.inputs}
                                onBlur = {onBlur}
                                onChangeText = {onChange}
                                value = {value}
                                placeholder = {'Digitar saldo a enviar'}
                            />
                        )}
                        name = "saldo"
                    />
                    {errors.saldo?.type == 'required' && <Text style = {{fontSize: 12, color: 'grey', marginBottom: 5}}>Se solicita el saldo a enviar</Text>}
                    {errors.saldo?.type == 'minLength' && <Text style = {{fontSize: 12, color: 'grey', marginBottom: 5}}>El minimo a enviar es de 1.000.000</Text>}
                    {errors.saldo?.type == 'pattern' && <Text style = {{fontSize: 12, color: 'grey', marginBottom: 5}}>Solo se permiten numeros</Text>}

                    <TouchableOpacity style = {estilos.Touchable} onPress = {handleSubmit(onSubmit)}>
                        <Text style = {{
                            color: `${principalColor}`,
                            fontWeight: 'bold',
                            borderRadius: 20,
                            padding: 10
                        }}> Enviar dinero </Text>
                    </TouchableOpacity>

                    <View style = {{
                            marginTop: 20, color: 'white',
                            height: "140px", width: '100%', textAlign: 'center', fontWeight: 'bold',
                        }}>
                        <View style = {estilos.view}>
                            <Text style = {estilos.comprobante}>Datos de la transacion</Text>
                            <Text style = {estilos.comprobante}>Identificacion : {indentificacion}</Text>
                            <Text style = {estilos.comprobante}>Destinatario : {destinatario}</Text>
                            <Text style = {estilos.comprobante}>saldo Enviado : {saldoEviado}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}