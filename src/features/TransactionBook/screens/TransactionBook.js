import React, { useState, useEffect } from "react"
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    useWindowDimensions,
    Alert,
    BackHandler
} from 'react-native'
import { images, icons, colors, fontSizes } from '../../../constants'
import Icon from 'react-native-vector-icons/FontAwesome5'
import UITabTopTransactionBook from '../navigations/UITabTopTransactionBook'
import {
    auth,
    firebaseDatabase,
    collection,
    getDocs,
    query,
    onSnapshot,
    where,
    updateDoc,
    doc
} from '../../../firebase/firebase'

const TransactionBook = (props) => {

    const { navigate, goBack } = props.navigation
    const [adu2, setAdu2] = useState('')
    const [adu3, setAdu3] = useState('')
    useEffect(() => {
        const q = query(collection(firebaseDatabase, 'users'), where('email', '==', auth.currentUser.email))
        onSnapshot(q, (querySnapshot) =>
            setAdu2(querySnapshot.docs.map((details) => {
                return details.data().nameWallet 
            })))
    }, [])

    useEffect(() => {
        const q = query(collection(firebaseDatabase, 'users'), where('email', '==', auth.currentUser.email))
        onSnapshot(q, (querySnapshot) =>
            setAdu3(querySnapshot.docs.map((details) => {
                return details.data().numberMoneyWallet 
            })))
    }, [])


    const backAction = () => {
        if (props.navigation.isFocused()) {
            Alert.alert('Chú ý!', 'Bạn muốn thoát app chứ?', [
                {
                    text: 'Không',
                    onPress: () => null,
                    style: 'cancel',
                },
                {
                    text: 'Có',
                    onPress: () => BackHandler.exitApp()
                },
            ])
            return true
        }
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction)

        return () =>
            BackHandler.removeEventListener('hardwareBackPress', backAction)
    }, [])

    return <View style={{
        flex: 1,
    }}>
        <View style={{
            height: 50,
            backgroundColor: 'white',
            flexDirection: 'row'
        }}>
            <TouchableOpacity
                onPress={() => {
                    navigate('AddWalletTransaction')
                }}
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginStart: 20,
                    marginTop: 9
                }}>
                <Image source={images.wallet}
                    style={{
                        width: 28,
                        height: 28
                    }} />
                <Icon name={'caret-down'}
                    size={14}
                    style={{
                        marginLeft: 7
                    }}
                    color={colors.text} />
            </TouchableOpacity>
            <View style={{
                marginTop: 9,
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{
                    color: colors.text,
                    textAlign: 'center',
                    fontSize: fontSizes.h6
                }}>{adu2}</Text>
                <Text style={{
                    textAlign: 'center',
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: 'black'
                }}>{adu3} ₫</Text>
            </View>
            <TouchableOpacity
                onPress={() => {
                    alert('ok')
                }}
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 9
                }}>
                <Icon name={'bell'}
                    color={'black'}
                    size={23}
                    style={{
                        marginLeft: 7,
                    }} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    alert('OKK')
                }}
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginStart: 20,
                    marginTop: 9,
                    marginEnd: 10
                }}>
                <Icon name={'ellipsis-v'}
                    color={'black'}
                    size={23}
                    style={{
                        marginLeft: 7,
                    }} />
            </TouchableOpacity>
        </View>
        <UITabTopTransactionBook />
    </View >
}

export default TransactionBook