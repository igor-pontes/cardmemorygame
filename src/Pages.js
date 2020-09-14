import React, {useState, useEffect, useRef} from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css.css';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faCheck, faTimes, faRedo } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import shuffle from './shuffle.js';
import GameBoard from './GameBoard';
import GameStatus from './GameStatus';
import { pair } from './Card';

const HomePage = (props) => {
    
    let time = 80; /* seconds */
    let nPairs = 8; 

    /*------------------*/
    let cards = []
    for (let i = 0; i < nPairs*2; i++) {
      if(cards.length === (nPairs*2)){
        break;
      }else{
        if (i === nPairs && nPairs !== 1){
          i = 0;
        }
      }
      cards.push(i);
    }
    /*------------------*/
    let constCol = ((nPairs/2)/2)*2;
    let rows = [];
    let cols = [];

    for (let i=0; i<nPairs/2;i++){
      rows.push(i);
    } 
    for (let i=0; i<(nPairs/2)*(4/constCol);i++){
      cols.push(i);
    }
    /*-------------------*/
    const timeOver = new Event('timeover');

    const [game, setGame] = useState(false);
    const [seconds, setSeconds] = useState(()=>time);
    const [fails, setFails] = useState(0);
    const [counter, setCounter] = useState(0);
    const [shuffleArray, setShuffleArray] = useState(()=>shuffle(cards));
    const [reloadGame, setReloadGame] = useState(()=>false);
    const [statusContent, setStatusContent] = useState(<span onClick={()=>{startGame()}} style={{cursor: 'pointer'}}>Play</span>);

    const canReload = useRef(false);

    const onTimeUpdate = ()=>{
      document.dispatchEvent(timeOver);
    }
    const updateCounter = ()=>{
      setCounter(n=>n+1);
    }
    const updateFails = ()=>{
      setFails(f=>f+1);
    }
    const startGame = ()=>{
      setGame(()=>true);
    }

    const updateStatus = (msg)=>{
      setStatusContent(msg);
    }

    useEffect(()=>{
      if(canReload.current === true){
        setShuffleArray(shuffle(cards));
        setReloadGame(false);
        canReload.current = false;
        setCounter(0);
        setSeconds(time);
        setFails(0);
        updateStatus(<span onClick={()=>{startGame()}} style={{cursor: 'pointer'}}>Play</span>);
        document.getElementById('reloadbutton').style.display = 'none';
      }
    }, [reloadGame])

    useEffect(()=>{
    
      document.addEventListener('timeover', event => {
        if(counter !== nPairs){
          updateStatus("Game Over");
          document.getElementsByClassName('board')[0].style.opacity = 0.2;
          document.getElementById('reloadbutton').style.display = 'block';
        }else if(counter === nPairs){
          updateStatus("Congratulations!");
          document.getElementsByClassName('board')[0].style.opacity = 0.2;
          document.getElementById('reloadbutton').style.display = 'block';
        }
        for(let i=0;i<(nPairs*2);i++){
          document.querySelector("div[data-card='"+i+"']").className = "card";
        }
        setGame(false);
        setSeconds(0);
        canReload.current = true;
      })
      if(seconds === 0 && game === true){
        pair.splice(0,2);
        document.dispatchEvent(timeOver); /* cool! */
      }
    }, [timeOver, seconds, counter, game])

    useEffect(()=>{
      if(game === true){
        setStatusContent("");
        document.getElementsByClassName('board')[0].style.opacity = 1;
      }
      
      var timeinterval = setInterval(()=>{ 
        if(game === true){
          setSeconds(s=>s-1);
        }
      }, 1000);  
      
      document.addEventListener('timeover', event => {   
        clearInterval(timeinterval);
      })

    }, [game]);
    
    return(
    <Container>
      <div className='boardinfo'>
      <Row>
        <Col><div className='info'> <FontAwesomeIcon icon={faClock} /> {seconds}s <div onClick={()=>{setReloadGame(true)}} className='info' id='reloadbutton' style={{float: 'right', cursor:'pointer'}}><FontAwesomeIcon icon={faRedo} /></div></div></Col>
        <Col><div className='buttondiv' style={{textAlign:'center'}}><GameStatus startGame={startGame} message={statusContent} game={game} /></div></Col>
        <Col><div className='info' style={{float:'right'}}><FontAwesomeIcon icon={faCheck} /> {counter}   <FontAwesomeIcon icon={faTimes} /> {fails}</div></Col>
      </Row>
      </div>
      <div className='board'>
        <GameBoard onTimeUpdate={onTimeUpdate} onFailsUpdate={updateFails} onCounterUpdate={updateCounter} counter={counter} canFlip={game} rows={rows} cols={cols} pairs={nPairs} shuffleArray={shuffleArray} />
      </div>
      <center><div className='copy'>Made with ❤ by Igor Pontes.</div></center>
      
    </Container>
    );
};

export { HomePage };