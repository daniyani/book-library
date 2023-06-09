import { AbstractView } from "../../common/view.js";
import onChange from "on-change";
import { Header } from "../../components/header/header.js";
import { Search } from "../../components/search/search.js";
import { CardList } from "../../components/cardList/cardList.js";
import { Pagination } from "../../components/pagination/pagination.js";

export class MainView extends AbstractView {

    #limit = 12;

    state = {
        list: [],
        numFound: 0,
        isLoading: false,
        searchQuery: undefined,
        offset: 0,
    }
     
    constructor(appState) {
        super();
        this.appState = appState;
        this.appState = onChange(this.appState, this.appStateHook.bind(this));
        this.state = onChange(this.state, this.stateHook.bind(this));
        this.setTitle('Search books');
    }

    destroy() {
        onChange.unsubscribe(this.appState)
        onChange.unsubscribe(this.state)
    }

    appStateHook(path) {
        if(path === 'favorites') {
            this.render()
        }
    }

    async loadList(value, offset) {
        const response = await fetch(`https://openlibrary.org/search.json?q=${value}&offset=${offset}&limit=12`);
        return response.json()
    }

    async stateHook(path) {
        if(path === 'searchQuery' || path === 'offset') {
            this.state.isLoading = true;
            this.render()
            const data = await this.loadList(this.state.searchQuery, this.state.offset)
            this.state.isLoading = false;
            this.state.numFound = data.numFound;
            this.state.list = data.docs;
            this.render()
        }
    }

    render() {
        const main = document.createElement('div');
        main.innerHTML = ` <h2>Books found - ${this.state.numFound}</h2>`
        main.append(new Search(this.state).render())
        main.append(new CardList(this.state, this.appState).render())

        if(this.state.numFound > this.#limit && !this.state.isLoading) {
            main.append(new Pagination(this.state).render())
        }
        
        this.app.innerHTML = '';
        this.renderHeader();
        this.app.append(main);
    }

    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }
}