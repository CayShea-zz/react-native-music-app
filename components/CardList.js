import React from 'react';
import { Card, Text, Button } from 'react-native-elements';
import { View, FlatList } from 'react-native';

class CardList extends React.Component {
    
    renderData(){
        const { data, buttonView } = this.props;


        return (
            <FlatList   data={data}
                        keyExtractor={(item, index) => index.toString()}
                        //destructurize the parameters, so we can iterate over {}
                        renderItem={({item, index}) => {
                            return (
                                <Card 
                                    title={item.title}    
                                    image={{ uri: item.cover_big }}
                                    key={index}>
                                    {buttonView(item)}
                                </Card>
                            );
                        }}>

            </FlatList>
        )
    }

  
    render() {
        const { data } = this.props;

        if(data && data.length){
            return this.renderData();
        } else {
            return <View> </View>
        }}
}

export default CardList;
