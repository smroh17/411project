import React, { Component } from 'react'
import { Button, Input, Footer, Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact';

class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks:[]
      //companyName: [],
      //companySymbol: []
    }
  }
  render() {
    return (
    <div>
      <h1>Stock Results</h1>
    <div className="col-md-3" style={{ marginTop : '20px' }}>
            <Card>
                <CardBody>
                    <p className=""><img src={blankImg} className={ "flag flag-"+code } alt={country.name} /></p>
                    <CardTitle title={country.name}>{country.name.substring(0, 15)}{ country.name.length > 15 && "..."}</CardTitle>
                </CardBody>
            </Card>
        </div>
    </div>
    )
    }
}


class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            Search: '',
            result: [],
            companyName: '',
            companySymbol: ''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const data = this.state
        console.log(this.fetchData(data.Search));
        this.setState({
          result: this.fetchData(data.Search)
      })
        console.log("Final data is", this.state)

    }

    handleInputChange = (event) => {
        event.preventDefault()
       // console.log(event)
       // console.log(event.target.name)
       // console.log(event.target.value)
       this.setState({
           [event.target.name]: event.target.value
       })
    }

    // componentDidMount(){
    //     this.inputFullNameRef.current.focus()
    // }
  render () {
      const {myFullName} = this.state
    return (
      <div>
        <h1>Forms and Inputs</h1>
        <p>Full name is: {myFullName}</p>
        <form onSubmit={this.handleSubmit}>
            <input type='text' name='Search'  onChange={this.handleInputChange}/>
          <p><button>Search</button></p>
        <Stock>

        </Stock>
        </form>
      </div>
    )
  }
  fetchData(keyword){
    const pointerToThis= this; 
    const API_KEY= process.env.API_KEY;
    //const keywords="tsla";
    let API_Call= `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${API_KEY}`;
    let stocksFunction= [];
    
    fetch(API_Call)
    .then(
      function(response) {
        return response.json();
      }
    )
    // .then(
    //   function(data) {
    //     //console.log(data);
    //     var len= data['bestMatches'].length;
        
    //     for (var i = 0; i < len; i++) {
    //         stocksFunction.push([[data.bestMatches[i]["1. symbol"]],[data.bestMatches[i]["2. name"]]]);
            
    //     }
    //     return stocksFunction;
    //     //console.log(stocksFunction);
    //   //   pointerToThis.setState({
    //   //     // companyName: stocksFunction,
    //   //     // companySymbol: stocksFunction
    //   //     result: stocksFunction

    //   // });
    //   }
    // )
    }

}

export default App
