import React, {Component} from "react";
import { ScrollView, StyleSheet, Text, View, Button, Image, Pressable } from "react-native";
import logo from './assets/logo.png'; 



class Cr extends Component{
  constructor(props){
    super(props);

    this.state= {
      horas: 0,
      minutos: 0,
      segundos: 0,
      ativo: false,
      voltas: []
    }

    this.pulsoDeClock = this.pulsoDeClock.bind(this);
    this.iniciarCronometro = this.iniciarCronometro.bind(this);
    this.pararCronometro = this.pararCronometro.bind(this);
    this.marcarTempo = this.marcarTempo.bind(this);
    this.zerarCronometro = this.zerarCronometro.bind(this); 






  }
  iniciarCronometro(){
    if(!this.state.ativo){
      this.setState({clock : setInterval(this.pulsoDeClock, 1000)});
      this.setState({ativo: true})
    }
  }

  pulsoDeClock(){
    var h = this.state.horas;
    var m = this.state.minutos;
    var s = this.state.segundos;
    
    if(s<59){
      s++;
    }else{
      s=0;
      if(m<59){
        m++;
      }else{
        m= 0;
        h++;
      }
    }

    this.setState({segundos: s, minutos: m, horas: h})
  }


  pararCronometro(){
    if(this.state.ativo){
      clearInterval(this.state.clock);
      this.setState({ativo:false});
    }
  }

  marcarTempo(){
    var txtCronometro = this.formatar(this.state.horas) + ":" + this.formatar(this.state.minutos) + ":" + this.formatar(this.state.segundos) + "\n";
    this.state.voltas.push(txtCronometro);
    this.forceUpdate();
  }

  formatar(t){
    return(t<10) ? "0" + t.toString() : t.toString();
  }


  zerarCronometro(){
    this.pararCronometro();
    this.setState({segundos:0, minutos:0, horas:0});

    if(this.state.voltas.length>0){
      this.state.voltas.push(' ------------------------ \n ');
    }
  }

  render()
  {
    var txtH = this.formatar(this.state.horas);
    var txtM = this.formatar(this.state.minutos);
    var txtS = this.formatar(this.state.segundos);

    return(
      <ScrollView>
        <View style={styles.container}>
          <Image source={logo} style={{ width: 305, height: 159, ImageAlign: 'center' }} />
          <Text style={styles.title}>Mountain Sports</Text>
          <Text style={styles.tempo}>{txtH}:{txtM}:{txtS} </Text>
        </View>

        <View style={styles.container}>
           <Pressable style={styles.button} onPress= {(this.state.ativo ? this.pararCronometro: this.iniciarCronometro)}>
            <Text style={styles.text}>{(this.state.ativo ? 'Pausar': 'Iniciar')}</Text>
            </Pressable>

            <Pressable style={styles.button} onPress ={this.marcarTempo}> 
            <Text style={styles.text}>Marcar Tempo</Text>
            </Pressable>
         
            <Pressable style={styles.button} onPress={this.zerarCronometro}>
            <Text style={styles.text}>Zerar</Text>
            </Pressable>
         
        </View>
      
        <View style={styles.container}>
          <Text style={styles.marcarvolta}>
            {this.state.voltas}
          </Text>
        </View>
      
      </ScrollView>

    )

   

  }
        
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  button: {
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
    elevation: 5,
    backgroundColor: '#1F8EF1',
    marginBottom: 10,
    width:150,
    height:70,
    position: "center"
  },

  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },

  tempo:{
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 25,
  },

  marcarvolta:{
    fontSize:25,
    marginTop: 15,
    textAlign: "center",
    fontWeight: "bold",
    justifyContent: 'center',
  },

  title: {
    marginTop: 16,
    marginBottom:10,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: '#20232a',
    borderRadius: 6,
    backgroundColor: '#ffa739',
    color: '#20232a',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
})


export default Cr;
