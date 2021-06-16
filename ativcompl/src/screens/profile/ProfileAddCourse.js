import React, { Component } from 'react'
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
    Platform,
} from 'react-native'

import axios from 'axios'
import { Picker } from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'

import { server, showError } from '../../common'
import commonStyles from '../../commonStyles'

const initialState = {
    userId: '',
    courseId: '',
    startCourse: new Date(),
    usertypeId: 1,
    campus: [],
    campusSelected: 1,
    courses: [],
    courseSelected: '',
    showDatePicker: false,
}
export default class ProfileAddCourse extends Component {

    state = { 
        ...initialState 
    }

    // componentDidMount = () => {
    //     try {
    //         const res = axios.get(`${server}/campus`)
    //         this.setState({ campus: res.data })
    //     } catch (e) {
    //         showError(e)
    //     }
    // }

    getCampus = (campus) => {
        const campusComp = <View>
            <Picker
                style={styles.picker}
                selectedValue={this.state.campusSelected}
                onValueChange={(itemValue) =>
                    this.setState({ campusSelected: itemValue })
                }>
                {
                    campus.map(cam => {
                        return <Picker.Item label={cam.name} value={cam.id} key={cam.id} />
                    })
                }
            </Picker>
        </View>

        this.loadCourses(this.state.campusSelected)
        return campusComp
    }

    loadCourses = (campusId) => {
        try {
            const res = axios.get(`${server}/courses/campus/${campusId}`)
            this.setState({ courses: res.data })
        } catch (e) {
            showError(e)
        }
    }

    getCourses = () => {
        return (
            <View>
                <Picker
                    style={styles.picker}
                    selectedValue={this.state.courseSelected}
                    onValueChange={(itemValue) =>
                        this.setState({ courseSelected: itemValue })
                    }>
                    {
                        this.state.courses.map(course => {
                            return <Picker.Item label={course.name} value={course.id} key={course.id} />
                        })
                    }
                </Picker>
            </View>
        )
    }

    // getDatePicker = () => {
    //     let datePiker = <DateTimePicker value={this.state.startCourse}
    //         onChange={(_, startCourse) => this.setState({ startCourse, showDatePicker: false })}
    //         mode='date'
    //     />

    //     const dateString = moment(this.state.startCourse).format('ddd, D [de] MMMM [de] YYYY')

    //     if (Platform.OS === 'android') {
    //         datePiker = (
    //             <View>
    //                 <TouchableOpacity onPress={() => this.setState({ showDatePicker: true })}>
    //                     <Text style={styles.date}>
    //                         {dateString}
    //                     </Text>
    //                 </TouchableOpacity>
    //                 {this.state.showDatePicker && datePiker}
    //             </View>
    //         )
    //     }
    //     return datePiker
    // }

    save = () => {
        const campusCurse = {
            userI: this.state.userId,
            courseId: this.state.courseId,
            startCourse: this.state.startCourse,
            usertypeId: this.state.usertypeId
        }

        this.props.onSave && this.props.onSave(campusCurse)

    }

    render() {

        return (
            <Modal transparent={true}
                visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType="slide">
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Cursos</Text>
                    <Text style={styles.label}>Campus</Text>
                    {this.getCampus(this.props.campus)}
                    <Text style={styles.divider}/>
                    <Text style={styles.label}>Cursos</Text>
                    {this.getCourses()}
                    <Text style={styles.divider}/>
                    <Text style={styles.label}>Iniciou o curso em:</Text>
                    {this.getDatePicker()}
                    <Text style={styles.divider}/>
                    <View style={styles.buttons} >
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.save}>
                            <Text style={styles.button}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0, 0.6)',

    },
    container: {
        backgroundColor: '#FFF',
        borderWidth: 18,
        borderColor: 'rgba(0,0,0, 0.6)',
    },
    header: {
        fontFamily: commonStyles.fontFamily,
        backgroundColor: '#009bd9',
        color: commonStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 18,
        marginBottom: 20,
    },
    label: {
        fontFamily: commonStyles.fontFamily,
        height: 20,
        marginHorizontal: 18,
        color: '#708090',
        borderColor: '#A9A9A9',
        backgroundColor: '#FFF',
        fontSize: 12,
        fontWeight: 'bold',

    },
    input: {
        fontFamily: commonStyles.fontFamily,
        height: 40,
        marginHorizontal: 18,
        color: '#000',
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderColor: '#A9A9A9',
        marginBottom: 12,

    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: '#009bd9',
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 16,
        marginBottom: 10,
        marginLeft: 15
    },
    picker: {
        fontFamily: commonStyles.fontFamily,
        // marginBottom: 10,
    },
    divider: {
        marginHorizontal: 12,
        marginBottom: 12,
        borderBottomWidth: 1,
        borderColor: '#A9A9A9',

    }

})