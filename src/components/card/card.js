import { DivComponent } from "../../common/divComponent";
import './card.css'

export class Card extends DivComponent {
    constructor(appState, cardItem) {
        super()
        this.appState = appState
        this.cardItem = cardItem
    }

    #addToFavorites(e) {
        if(e.target.closest('.button__add')) {
            this.appState.favorites.push(this.cardItem)
        }
    }

    #deleteFromFavorites(e) {
        if(e.target.closest('.button__add')) {
            this.appState.favorites = this.appState.favorites.filter(book => book.key !== this.cardItem.key)
        }
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

        if(isFavorite) {
            this.el.addEventListener('click', this.#deleteFromFavorites.bind(this)) 
        } else {
            this.el.addEventListener('click', this.#addToFavorites.bind(this)) 
        }


        return this.el
    }
}