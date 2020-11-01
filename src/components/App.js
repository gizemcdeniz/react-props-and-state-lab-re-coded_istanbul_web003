import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  changeType = (e) => {
    this.setState({
      filters: {
        type: e.taget.value
      }
    })
  }

  fetchData = async () => {
    if(this.state.filters.type === "all"){
      let response = await fetch("/api/pets")
      let data = await response.json()
      this.setState({
        pets : data
      },()=> console.log(this.state))
    }else{
      let response = await fetch("/api/pets?type=" + this.state.filters.type)
      let data = await response.json()
      this.setState({
        pets : data
      },()=> console.log(this.state))

    }
  }

  adoptPet  = (id) => {
    const p = this.state.pets.findIndex((pet) => pet.id == id);
    this.state.pets[p].isAdopted = true;
  }

   render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.changeType}
              onFindPetsClick={this.fetchData}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.adoptPet} pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
