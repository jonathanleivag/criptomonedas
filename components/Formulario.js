import { Picker } from "@react-native-community/picker";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";

export const Formulario = ({
  moneda,
  criptomoneda,
  setMoneda,
  setCriptomoneda,
  setConsultarApi,
}) => {
  const [criptomonedas, setCriptomonedas] = useState([]);

  useEffect(() => {
    const resAp = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      try {
        const {
          data: { Data },
        } = await Axios.get(url);
        setCriptomonedas(Data);
      } catch (error) {
        console.error(error);
      }
    };
    resAp();
  }, []);

  const cotizarPrecio = () => {
    if (criptomoneda.trim() === "" || moneda.trim() === "") {
      alert();
      return;
    }
    setConsultarApi(true);
  };

  const alert = () => {
    Alert.alert("Error", "Ambos campos son obligatirio", [
      { text: "confirmar" },
    ]);
  };

  return (
    <View>
      <Text style={styles.label}>Moneda</Text>
      <Picker
        selectedValue={moneda}
        onValueChange={(event) => setMoneda(event)}
        itemStyle={{ height: 120 }}
      >
        <Picker.Item label="- Seleccionar -" value="" />
        <Picker.Item label="Pesos Chileno" value="CLP" />
        <Picker.Item label="Dolar de USA" value="USD" />
        <Picker.Item label="Pesos Mexicano" value="MXN" />
        <Picker.Item label="Euro" value="EUR" />
        <Picker.Item label="Libra Estarlina" value="GBP" />
      </Picker>
      <Text style={styles.label}>Criptomoneda</Text>
      <Picker
        selectedValue={criptomoneda}
        onValueChange={(event) => setCriptomoneda(event)}
        itemStyle={{ height: 120 }}
      >
        <Picker.Item label="- Seleccionar -" value="" />
        {criptomonedas.map(({ CoinInfo: { Id, FullName, Name } }) => (
          <Picker.Item key={Id} label={FullName} value={Name} />
        ))}
      </Picker>
      <TouchableHighlight style={styles.btnCotizar} onPress={cotizarPrecio}>
        <Text style={styles.textoCotizar}>Cotizar</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: "Lato-Black",
    textTransform: "uppercase",
    fontSize: 22,
    marginVertical: 20,
  },
  btnCotizar: {
    backgroundColor: "#5E49E2",
    padding: 10,
    marginTop: 20,
  },
  textoCotizar: {
    color: "#ffffff",
    fontSize: 18,
    fontFamily: "Lato-Black",
    textTransform: "uppercase",
    textAlign: "center",
  },
});
