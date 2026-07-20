import { StyleSheet, View, Platform, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import CurrentPrice from './src/components/CurrentPrice';
import HistoryGraphic from './src/components/HistoryGraphic';
import QuotationList from './src/components/QuotationList';
import QuotationsItems from './src/components/QuotationList/QuotationsItems';

function url(qtdDays) {
  return `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${qtdDays}`;
}

async function getCoinsData(url, qtdDays) {
    try {
        let response = await fetch(url);
        let returnApi = await response.json();

        if (!returnApi.prices) {
            console.log("Resposta inesperada da API:", returnApi);
            return { list: [], graphic: [], price: 0 };
        }

        let dailyQuotes = {};
        returnApi.prices.forEach((item) => {
            let date = new Date(item[0]).toLocaleDateString("pt-BR");
            dailyQuotes[date] = item[1];
        });

        let list = Object.keys(dailyQuotes)
            .map((date) => ({ data: date, valor: dailyQuotes[date] }))
            .slice(-qtdDays)
            .reverse();

        let graphic = Object.values(dailyQuotes).slice(-qtdDays);    
        
        let price = graphic[graphic.length - 1]; //pega o último valor do gráfico

        return { list, graphic, price }; 

    } catch(error) {
        console.log("Erro getCoinsData:", error);
        return { list: [], graphic: [], price: 0 };
    }
}

export default function App() {
  const [coinsList, setCoinsList] = useState([]);
  const [coinsGraphicList, setCoinsGraphicList] = useState([]);
  const [days, setDays] = useState(2);
  const [updateData, setUpdateData] = useState(true);
  const [price, setPrice] = useState(0);

  function updateDay(number){
    setDays(number);
    setUpdateData(true);
  }

  useEffect(() => { //executa a função apenas uma vez, quando o componente é montado
    getCoinsData(url(days), days).then(({ list, graphic, price }) => {
        setCoinsList(list);
        setCoinsGraphicList(graphic);
        setPrice(price); //atualiza o estado price com o último valor do gráfico
    });

    if(updateData){ //se o estado updateData for true, atualiza os dados da API
      setUpdateData(false);
    }

  }, [updateData]); //quando o estado updateData mudar, executa a função novamente

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <CurrentPrice lastCotation={price} />    
      <HistoryGraphic infoDataGraphic={coinsGraphicList} />
      <QuotationList filterDay={updateDay} listTransactions={coinsList} />
 
    </SafeAreaView>   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    paddingTop: Platform.OS === "android" ? 40 : 0
  },
});
