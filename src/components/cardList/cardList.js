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
        this.el.classList.add('cardList')
        this.el.innerHTML = this.state.isLoading ? `
            <div class="cardList__loading">Please wait...</div>` 
            : `<h2 class="cardList__title">Найдено книг - ${this.state.numFound}</h2>`;

        for (const card of this.state.list) {
            console.log(card);
            this.el.append(new Card(this.appState, card).render())
        }    
    
        return this.el
    }
}