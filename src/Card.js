import React from 'react';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCarrot, faBomb, faBowlingBall, faCarSide, faAppleAlt, faBaseballBall, faBell, faBicycle } from '@fortawesome/free-solid-svg-icons';
import './css.css'

var pair = [];

var counter = 0;

class Card extends React.Component{
    render() {
        
        const icons = [
            faCarrot,
            faBomb,
            faBowlingBall,
            faCarSide,
            faAppleAlt,
            faBaseballBall,
            faBell,
            faBicycle
        ]
        let icon_pairs = [];
        for (let i=0; i<(this.props.pairs);i++){
            icon_pairs.push(icons[i]);
        }

        const cardClicked = (e)=>{
            
            if(this.props.canFlip === true){
                if(e.target.children[0].className === "card"){
                    e.target.children[0].className = "card is-flipped";
                    
                    if(pair.length < 2){
                      pair.push({id: e.target.children[0].id, card: e.target.children[0].dataset.card})   
                    }
                    if(pair.length === 2 && pair[0].id === pair[1].id){
                        this.props.onCounterUpdate();
                        pair.splice(0,2);
                        counter++;
                        if(counter === this.props.pairs){
                            counter = 0;
                            setTimeout(()=>{
                                this.props.onTimeUpdate();
                            }, 300)
                        }
                    }else if(pair.length === 2 && pair[0].id !== pair[1].id){
                        var temp = [pair[0].card, pair[1].card]; 
                        pair.splice(0,2);
                        setTimeout(()=>{
                            document.querySelector("div[data-card='"+temp[0]+"']").className = "card";
                            document.querySelector("div[data-card='"+temp[1]+"']").className = "card";
                        }, 800);
                        this.props.onFailsUpdate();
                    }
                }
                
            }
        }

        return(
            <div onClick={(event)=>{cardClicked(event)}} className='carddiv'><div className='card' id={this.props.cardId} data-card={this.props.cardKey} ><div className='card-face front'><span  className='cardicon'><FontAwesomeIcon icon={faQuestionCircle} /></span></div><div className='card-face back'><span className='cardicon'><FontAwesomeIcon icon={icon_pairs[this.props.cardId]} /></span></div></div></div>
        )
    }
}

export { Card, pair };