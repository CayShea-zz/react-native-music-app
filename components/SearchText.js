import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button  } from 'react-native-elements';


export default class SearchText extends React.Component {
    constructor(){
        super();

        this.state={
            value: ''
        }
    }

    componentDidMount(){
        this.input.focus();
    }

    onChange(value){
        this.setState({value});
    }

    onSubmitInput(){
        const { searchArtists } = this.props;
        
        searchArtists(this.state.value);
    }

  render() {
    return (
        <React.Fragment>
            <FormLabel containerStyle={styles.center}>Search an artist</FormLabel>
            <FormInput 
                ref={input => this.input = input}
                inputStyle={styles.input} 
                onChangeText={ event => this.onChange(event) }
            />
            <FormValidationMessage></FormValidationMessage>
            <Button 
                title="Searchh"
                onPress={() => this.onSubmitInput() }
            />
        </React.Fragment>
    )
  }
}


const styles = StyleSheet.create({
    center: {
        alignItems: 'center'
    },
    input: {
        borderBottomWidth: 1,
        margin: 1,
        borderColor: 'grey'
    }
})