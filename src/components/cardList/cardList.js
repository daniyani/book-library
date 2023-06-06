import { DivComponent } from "../../common/divComponent";
import { Card } from "../card/card";
import './cardList.css'

export class CardList extends DivComponent {
    constructor(state, appState) {
        super()
        this.state = state
        this.appState = appState
    }

    render() {
        if(this.state.isLoading) {
            this.el.innerHTML = "<div class='cardList__loading'>Please wait...</div>"

            return this.el
        }

        const cardGrid = document.createElement('div')
        cardGrid.classList.add('card__grid')
        this.el.append(cardGrid)
        for (const card of this.state.list) {
            cardGrid.append(new Card(this.appState, card).render())
        }    
    
        return this.el
    }
}