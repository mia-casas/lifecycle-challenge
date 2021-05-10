import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      timer: 10,
      timerRunning: false
    }
    this.timer = this.timer.bind(this);
  }

  fetchPokemon() {
    this.setState(
      {timerRunning: true}
    )
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
        this.timer()
      })
      .catch((err) => console.log(err))
  }

  timer(){
    if(this.state.timer> 0){
      this.setState({timer: this.state.timer -1})
    } if(this.state.timer === 0) {
      clearInterval(this.state.timer)
      this.setState(
        {timer: 10, timerRunning:false}
      )
    }
    console.log(this.state.timer)
  }

  componentDidUpdate(){
    setInterval(() => {this.timer()}, 1000)
  }

  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>
        <h1 className={'timer'} >Timer Display</h1>
        <h3>{this.state.timerRunning ? this.state.timer : null}</h3>
        <div className={'pokeWrap'}>
          <img className={this.state.timerRunning ? 'pokeAltImg' : 'pokeImg'} src={this.state.pokeSprite} />
          <h1 className={'pokeName'}>{this.state.timerRunning ? null : this.state.pokeName}</h1>
        </div>
      </div>
    )
  }
}

export default PokeFetch;