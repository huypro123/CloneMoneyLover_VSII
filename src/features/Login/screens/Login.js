import React, { useState } from "react"
import { Text, View, Image, TouchableOpacity, ScrollView, useWindowDimensions, TextInput, Keyboard } from "react-native"
import { images, icons, colors, fontSizes } from '../../../constants'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { isValidEmail, isValidPassword } from '../../../utilies/Validations'
import {
    auth,
    signInWithEmailAndPassword,
    GoogleSignin,
    GoogleAuthProvider,
    signInWithCredential
} from '../../../firebase/firebase'


const Login = (props) => {

    const { width } = useWindowDimensions()
    //Email&Pass - Validate...
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const isValidtionOk = () => email.length > 0
        && password.length > 0
        && isValidEmail(email) == true
        && isValidPassword(password) == true
    const [isSecureEntry, setIsSecureEntry] = useState(true)
    //function of navigation to/back
    const { navigate, goBack } = props.navigation

    const signInWithGoogleAsync = async () => {
        const { idToken } = await GoogleSignin.signIn();
        console.log('id: ' + idToken)
        const googleCredential = GoogleAuthProvider.credential(idToken)
        console.log('id: ' + googleCredential)
        const user_sign_in = signInWithCredential(auth, googleCredential)
        console.log(user_sign_in)
        user_sign_in.then((users) => {
            navigate('UITabView')
            console.log(users)
        }).catch((error) => {
            console.log(error)
        })
    }

    return <View style={{
        backgroundColor: 'white',
        flex: 1,
    }}>
        <ScrollView>
            <TouchableOpacity
                onPress={() => {
                    goBack()
                }}
                style={{
                    padding: 15
                }}><Icon name={'arrow-left'} size={18} color={'black'} />
            </TouchableOpacity>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{
                    fontSize: fontSizes.h1,
                    color: 'black'
                }}>Đăng nhập</Text>
                <TouchableOpacity
                    onPress={() => {
                        signInWithGoogleAsync()
                    }}
                    style={{
                        flexDirection: 'row',
                        borderWidth: 1,
                        padding: 5,
                        borderColor: 'red',
                        width: '67%',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        borderRadius: 5,
                        marginTop: 20,
                    }}>
                    <Icon style={{
                        paddingStart: 2
                    }}
                        name={'google'}
                        size={20}
                        color={colors.google} />
                    <Text style={{
                        color: 'red',
                        fontSize: fontSizes.h5,
                        marginLeft: '10%'
                    }}>Kết nối với Google</Text>
                </TouchableOpacity>
                <Text style={{
                    color: colors.inactive,
                    fontSize: fontSizes.h6, width: '67%',
                    textAlign: 'center',
                    marginTop: 12
                }}>Chúng tôi sẽ không đăng thông tin mà không có sự cho phép của bạn</Text>
                <View style={{
                    height: 40,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 15
                }}>
                    <View style={{
                        backgroundColor: colors.inactive,
                        height: 1,
                        flex: 1
                    }}></View>
                    <Text style={{
                        color: colors.inactive,
                        alignItems: 'center',
                        padding: 8,
                        fontSize: fontSizes.h5
                    }}>HOẶC</Text>
                    <View style={{
                        backgroundColor: colors.inactive,
                        height: 1,
                        flex: 1
                    }}></View>
                </View>
                <View style={{
                    width: '72%',
                    marginTop: 14
                }}>
                    <TextInput
                        value={email}
                        onChangeText={(text) => {
                            setErrorEmail(isValidEmail(text) == true ? '' : 'Email không đúng định dạng')
                            setEmail(text)
                        }}
                        style={{
                            backgroundColor: colors.btnLR,
                            height: 40,
                            margin: 12,
                            borderWidth: 0,
                            padding: 10,
                            marginBottom: -13,
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                        }}
                        placeholder='Email'
                        keyboardType='email-address'
                    />

                    <TextInput
                        value={password}
                        onChangeText={(text) => {
                            setErrorPassword(isValidPassword(text) == true ? '' : 'Mật khẩu phải trên 6 kí tự')
                            setPassword(text)
                        }}
                        style={{
                            backgroundColor: colors.btnLR,
                            height: 40,
                            margin: 12,
                            borderWidth: 0,
                            padding: 10,
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                        }}
                        placeholder='Mật khẩu'
                        // keyboardType='password'
                        secureTextEntry={isSecureEntry}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            setIsSecureEntry(!isSecureEntry)
                        }}
                        style={{
                            position: 'absolute',
                            bottom: 23,
                            right: 25
                        }}>
                        <Icon
                            name={isSecureEntry ? 'eye' : 'eye-slash'}
                            size={18}
                        />
                    </TouchableOpacity>
                </View>
                {email.length > 0 ? (errorEmail ?
                    <Text style={{ color: 'red', fontSize: fontSizes.h6, marginBottom: 10 }}>{errorEmail}</Text>
                    : <View></View>) : <View></View>
                }
                {password.length > 0 ? (errorPassword ? <Text style={{ color: 'red', fontSize: fontSizes.h6, marginBottom: 10 }}>{errorPassword}</Text>
                    : <View></View>) : <View></View>
                }
                <View style={{
                    width: '65%',
                }}>
                    <TouchableOpacity
                        disabled={!isValidtionOk() == true}
                        onPress={() => {
                            signInWithEmailAndPassword(auth, email, password)
                                .then((re) => {
                                    // debugger
                                    console.log(re)
                                    navigate('UITabView')
                                    // debugger
                                }).catch((error) => {
                                    console.log(error)
                                    alert(`Cannot sign in, error: ${error.message}`)
                                })
                        }}
                        style={{
                            backgroundColor: isValidtionOk() == true ? colors.primary : colors.inactive,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10,
                            height: 35,
                        }}>
                        <Text style={{
                            padding: 8,
                            fontSize: fontSizes.h5,
                            color: 'white'
                        }}>ĐĂNG NHẬP</Text>
                    </TouchableOpacity>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigate('Register')
                            }}
                            style={{ padding: 5 }}>
                            <Text style={{
                                paddingVertical: 10,
                                fontSize: fontSizes.h5,
                                color: colors.primary,
                            }}>Đăng ký</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {

                            }}
                            style={{ padding: 5 }}>
                            <Text style={{
                                paddingVertical: 10,
                                fontSize: fontSizes.h5,
                                color: colors.primary,
                            }}>Quên mật khẩu?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    </View>
}

export default Login