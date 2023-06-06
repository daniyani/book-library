import { AbstractView } from "../../common/view.js";
import onChange from "on-change";
import { Header } from "../../components/header/header.js";
import { Search } from "../../components/search/search.js";
import { CardList } from "../../components/cardList/cardList.js";

export class MainView extends AbstractView {

    state = {
        list: [],
        numFound: 0,
        isLoading: false,
        searchQuery: undefined,
        offset: 0
    }
     
    constructor(appState) {
        super();
        this.appState = appState;
        this.appState = onChange(this.appState, this.appStateHook.bind(this));
        this.state = onChange(this.state, this.stateHook.bind(this));
        this.setTitle('Поиск книг');
    }

    appStateHook(path) {
        if(path === 'favorites') {
            this.render()
        }
    }

    async loadList(value, offset) {
        const response = await fetch(`https://openlibrary.org/search.json?q=${value}&offset=${offset}`);
        return response.json()
    }

    async stateHook(path) {
        if(path === 'searchQuery') {
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
        main.append(new Search(this.state).render())
        main.append(new CardList(this.state, this.appState).render())
        this.app.innerHTML = '';
        this.renderHeader();
        this.app.append(main);
    }

    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }
}