import { AbstractView } from "../../common/view.js";
import onChange from "on-change";
import { Header } from "../../components/header/header.js";
import { CardList } from "../../components/cardList/cardList.js";

export class FavoritesView extends AbstractView {

    constructor(appState) {
        super();
        this.appState = appState
        this.appState = onChange(this.appState, this.appStateHook.bind(this));
        this.setTitle('Favorites books'); 
    }

    appStateHook(path) {
        if(path === 'favorites') {
            this.render()
        }
    }

    destroy() {
        onChange.unsubscribe(this.appState)
    }

    render() {
        const favorite = document.createElement('div');
        favorite.innerHTML = ` <h2>Favorite books</h2>`
        this.appState.favorites.length 
            ? favorite.append(new CardList({ list: this.appState.favorites, isLoading: false }, this.appState).render())
            : favorite.append(this.emptyList())
        
        this.app.innerHTML = '';
        this.renderHeader();
        this.app.append(favorite);
    }

    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }   

    emptyList() {
        const element = document.createElement('div');
        element.style.textAlign = 'center';
        element.innerHTML = "No favorite books";
        
        return element
    }
}
