import Axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Cotizacion } from "./components/Cotizacion";
import { Formulario } from "./components/Formulario";
import { Header } from "./components/Header";
export const App = () => {
  const [moneda, setMoneda] = useState("");
  const [criptomoneda, setCriptomoneda] = useState("");
  const [consultarApi, setConsultarApi] = useState(false);
  const [resultado, setResultado] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (consultarApi) {
      const cotizar = async () => {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const {
          data: { DISPLAY },
        } = await Axios.get(url);

        setLoading(true);

        setTimeout(() => {
          const resultApi = DISPLAY[criptomoneda][moneda];
          setResultado(resultApi);
          setConsultarApi(false);
          setLoading(false);
        }, 3000);
      };
      cotizar();
    }
  }, [consultarApi]);

  return (
    <ScrollView>
      <Header />
      <Image
        style={styles.img}
        source={require("./assets/img/cryptomonedas.png")}
      />
      <View style={styles.contenido}>
        <Formulario
          moneda={moneda}
          criptomoneda={criptomoneda}
          setCriptomoneda={setCriptomoneda}
          setMoneda={setMoneda}
          setConsultarApi={setConsultarApi}
        />
      </View>
      <View style={{ marginTop: 40 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#5E49E2" />
        ) : (
          <Cotizacion resultado={resultado} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: 150,
    marginHorizontal: "2.5%",
  },
  contenido: {
    marginHorizontal: "2.5%",
  },
});
