import React from "react";  
import { View, Text, Image } from "react-native";
import styles from "./styles";

function formatPrice(value) { //função para formatar o valor da cotação com no maximo 4 casas decimais
  return parseFloat(value.toFixed(4));
}

export default function QuotationsItems(props) {
    return (
        <View style={styles.mainContent}>
            <View style={styles.contextLeft}>
                <View style={styles.boxLogo}>
                    <Image style={styles.logoBitcoin} source={require("../../../img/bitcoinred.png")} />
                    <Text style={styles.dayCotation}>{props.data}</Text>
                </View>
            </View>

            <View style={styles.contextRight}>
                <Text style={styles.price}>$ {formatPrice(props.valor)}</Text>
            </View>            

        </View>
    )
}