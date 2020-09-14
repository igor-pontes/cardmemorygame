import React from 'react';
import {Card} from './Card';
import { Col, Row } from 'react-bootstrap';

export default class GameBoard extends React.Component{
    render(){
        let index = 0;
        return(
            <div className='gameboard'>  
                {
                this.props.rows.map(
                    (r)=>{
                    return(
                        <Row key={r}>
                        {
                            this.props.cols.map(
                            (c)=>{
                                    return(
                                        <Col key={c}><Card onTimeUpdate={this.props.onTimeUpdate} onFailsUpdate={this.props.onFailsUpdate} onCounterUpdate={this.props.onCounterUpdate} canFlip={this.props.canFlip} pairs={this.props.pairs} cardKey={index} cardId={this.props.shuffleArray[index++]}/></Col>
                                    )
                                }
                            )
                        }
                        </Row>)
                    }
                )
                }
            
            </div>
        )
    }
}