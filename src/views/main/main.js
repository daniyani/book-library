import { AbstractView } from "../../common/view.js";
import onChange from "on-change";
import { Header } from "../../components/header/header.js";
import { Search } from "../../components/search/search.js";

export class MainView extends AbstractView {

    state = {
        list: [],
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
        console.log(path);
    }

    async loadList(value, offset) {
        const response = await fetch(`https://openlibrary.org/search.json?q=${value}&offset=${offset}`);
        return response.json()
    }

    async stateHook(path) {
        if(path === 'searchQuery') {
            this.state.isLoading = true;
            const data = await this.loadList(this.state.searchQuery, this.state.offset)
            this.state.isLoading = false;
            console.log(data);
            this.state.list = data
        }
    }

    render() {
        const main = document.createElement('div');
        main.append(new Search(this.state).render())
        this.app.innerHTML = '';
        this.renderHeader();
        this.app.append(main);
        this.appState.favorites.push('qwe');
    }

    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }
}