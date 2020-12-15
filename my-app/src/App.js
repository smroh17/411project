import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/home";
import StockGraph from "./components/stockGraph";

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            Search: '',
            result: [],
            //These are the choosen name and symbol changes
            companyName: '',
            companySymbol: '',
            username: ''
        }
    }

    updateUsername = (newName) => {
        this.setState({
            username: newName
        })
    }

    updateCN = (newCompanyName) => {
        this.setState({
            companyName: newCompanyName
        });
    }

    updateCS = (newCompanySymbol) => {
        this.setState({
          companySymbol: newCompanySymbol
        });
    }

    updateSearch = (newSearch) => {
        this.setState({
          Search: newSearch
        });
    }

    updateResult = (newResult) => {
        this.setState({
            result: newResult
        });
    }


    render() {
        return (
            <Router>
                <div>
                    <Route
                        exact path="/"
                        render = {(props) => (
                            <Home {...props} companyName={this.state.companyName} companySymbol = {this.state.companySymbol} Search={this.state.Search}
                            updateCN = {this.updateCN} updateCS = {this.updateCS} updateSearch = {this.updateSearch} updateResult = {this.updateResult}
                            result = {this.state.result} isAuthed={true} username = {this.state.username} updateUsername = {this.updateUsername} />
                        )}
                    />
                    <Route
                        exact path="/stockgraph"
                        render = {(props) => (
                            <StockGraph {...props} companyName={this.state.companyName} companySymbol = {this.state.companySymbol} isAuthed = {true} />
                        )} />
                </div>
          </Router>
         );
    }
}

export default App;
