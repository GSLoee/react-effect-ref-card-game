import React, {useState, useEffect, useRef} from "react";
import axios from 'axios';

function Deck(){
    const [deck, setDeck] = useState(null)
    const [card, setCard] = useState(null)
    // const [shuffled, setSuffled] = useState(false)

    useEffect(() =>{
        async function getDeckId(){
           try{
            const res = await axios.get('https://deckofcardsapi.com/api/deck/new/')
           setDeck(res.data.deck_id); 
           }catch(e){
            console.error('Error fetching deck ID:', e)
           }
        }
        getDeckId()
    }, [])

    async function drawCard(){
        try{
            const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`)
            if (res.data.remaining === 0) throw new Error('No more cards')
            const card = res.data.cards[0]
            setCard(card)
        } catch(e){
            console.log(e)
        }
    }

    async function shuffleCard(){
        await axios.get(`https://deckofcardsapi.com/api/deck/${deck}/shuffle/?remaining=true`)
    }
    return (
        <div>
            <button onClick={drawCard}>Draw Card (not shuffled)</button>
            <div>
            <button onClick={shuffleCard}>Shuffle Cards</button>
            </div>
            {card && (
                <div>
                    <p>Card: {card.value} of {card.suit}</p>
                    <img src={card.images.png} alt={`${card.value} of ${card.suit}`} />
                </div> 
            )}
             {deck && deck.remaining === 1 && <p>No more cards left</p>}    
            
        </div>
    );
}   
export default Deck