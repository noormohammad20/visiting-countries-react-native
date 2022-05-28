import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import Country from './Country'


export default function Countries() {
    const [countries, setCountries] = useState([])
    const [searched, setSearched] = useState([])
    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then(res => res.json())
            .then(data => {
                setCountries(data)
                setSearched(data)
            })
    }, [])
    const handleSearched = text => {
        const filtered = countries.filter(country => country.name.common.includes(text))
        setSearched(filtered)
    }
    return (
        <View>
            <Text style={style.header}>Countries: {countries.length}</Text>

            <TextInput
                onChangeText={handleSearched}
                style={style.input}
            ></TextInput>

            <ScrollView>
                {
                    searched.map(country => <Country
                        key={country.id}
                        country={country}
                    ></Country>)
                }
            </ScrollView>
        </View>
    )
}

const style = StyleSheet.create({
    header: {
        marginTop: 50,
        fontSize: 40,
        color: 'red',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
})