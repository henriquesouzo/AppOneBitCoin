import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

function formatPrice(value) { //função para formatar o valor da cotação com no maximo 4 casas decimais
  return parseFloat(value.toFixed(4));
}

export default function CurrentPrice(props) {
  return (
    <View style={styles.headerPrice}>
      <Text style={styles.currentPrice}>$ {formatPrice(props.lastCotation)}</Text>
      <Text style={styles.textPrice}>Última cotação</Text>
    </View>
  );
}