import React from 'react';
import {Container, Form, Row, Col, Button} from 'react-bootstrap';
import Home from '../Home/Home'
import Data from '../Data/Data'
import SearchForm from './SearchForm'
const HOME = <Home />;
const DATA = <Data />;

class Search extends React.Component {
    state = {
        instructor: '',
        quarters: [],
        years: [],
        department: [],
        classNumber: '',
        classCode: '',
        passNoPass: false,
        covid: false,
        lowerDiv: false,
        upperDiv: false,
        page: HOME // what the page will display below the search forms (HOME or DATA)
    }

    handleSubmit = (e) => {
        e.preventDefault(); // prevents page refresh
        let newState = {};

        for(let x of e.target){
            newState[x.name] = x.value;
        }

        this.setState(() => (newState));

        fetch('/search', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newState)
        }).then(res => {this.setState({page: DATA})})
    }

    render() {
        return (
            <Container>
                <SearchForm handleSubmit={this.handleSubmit} />
                {this.state.page}
            </Container>
        );
    }
}


export default Search;