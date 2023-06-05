import { DivComponent } from "../../common/divComponent";
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
        <div class="cardList__loading">Please wait...</div>
        ` : `<h2 class="cardList__title">Найдено книг - ${this.state.list.length}</h2>`;

        return this.el
    }
}