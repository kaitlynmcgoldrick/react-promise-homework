import React, { Component } from 'react';
import './App.css';
import { Recipe } from './Components/recipe';
import Form from './Components/form';


const APP_ID = '98b85fc1'; // your app id here, provided to you when you sign up
const APP_KEY = '2c5003e74a8b2a0bf2bba59d0a7b31f4'; // your app key here, provided to you when you sign up

// this would be what I would make for the final URL
// https://api.edamam.com/search?app_id=98b85fc1&app_key=2c5003e74a8b2a0bf2bba59d0a7b31f4&q=cake
const BASE_ENDPOINT = `https://api.edamam.com/search?app_id=${APP_ID}&app_key=${APP_KEY}`;
// an example API request with a cake query would be
// `${BASE_ENDPOINT}&q=cake`

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeList: [],
      error: ""
    };
  }

  componentDidMount()  {

  }

  handleFormSubmit = (item) => {
    this.fetchRecipes(item);
  }

  fetchRecipes = (item) => {
    fetch(`${BASE_ENDPOINT}&q=${item}`)
    .then(res => res.json())
    .then(res => {
      res.hits.length === 0 
      ? this.setState({ 
        error: "No recipes found 😞",
        recipeList: [] })
      : this.setState({ 
        error: '',
        recipeList:  [...res.hits]  })
    })
    .catch(err => {
      this.setState({ error: err.message });
    });
  }

  render() {
    return (
      <div className="App">
        <div className="recipe-list">
          <Form handleFormSubmit={this.handleFormSubmit}/>
          <Recipe recipeList={this.state.recipeList} />
          <div className="error-text">
            {this.state.error}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
