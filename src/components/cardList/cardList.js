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
        this.el.innerHTML = this.state.isLoading ? `
            <div class="cardList__loading">Please wait...</div>` 
            : `<h2 class="cardList__title">Найдено книг - ${this.state.numFound}</h2>`;

        const cardGrid = document.createElement('div')
        cardGrid.classList.add('card__grid')
        this.el.append(cardGrid)
        for (const card of this.state.list) {
            cardGrid.append(new Card(this.appState, card).render())
        }    
    
        return this.el
    }
}