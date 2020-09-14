import React, {Component} from 'react';


export default class GameStatus extends Component{
    render() {

        return(
        <span id='messageStatus'>{this.props.message}</span>
        )
    }
}