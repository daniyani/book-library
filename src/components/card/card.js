import { DivComponent } from "../../common/divComponent";
import './card.css'

export class Card extends DivComponent {
    constructor(appState, cardItem) {
        super()
        this.appState = appState
        this.cardItem = cardItem
    }

    render() {
        const isFavorite = this.appState.favorites.find(book => book.key === this.cardItem.key)
        this.el.classList.add('card')
        this.el.innerHTML = `
            <div class="card__img">
                <img src="https://covers.openlibrary.org/b/olid/${this.cardItem.cover_edition_key}-M.jpg" alt="Book cover"/>
            </div>
            <div class="card__info">
                <div class="card__tag">
                    ${this.cardItem.subject  ? this.cardItem.subject[0] : "Not found"}
                </div>
                <div class="card__title">
                    ${this.cardItem.title}
                </div>
                <div class="card__author">
                    ${this.cardItem.author_name ? this.cardItem.author_name[0] : "Not found"}
                </div>
                <div class="card__footer">
                    <button class="button__add ${isFavorite ? "button__active" : ""}"> 
                        ${isFavorite ? "<img src='/static/fav.svg'/>" :  "<img src='/static/notfav.svg'/>"}
                    </button>
                </div>
            </div>
        `

        return this.el
    }
}