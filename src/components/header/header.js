import { DivComponent } from "../../common/divComponent";
import './header.css'

export class Header extends DivComponent {
    constructor(appState) {
        super()
        this.appState = appState
    }

    render() {
        this.el.classList.add('header')
        this.el.innerHTML = `
        <div>
          <a href="#">
            <img src="/static/logo.svg" alt="logo"/>
          </a>
        </div>
        <div class="menu"> 
          <a class="menu__item" href="#favorites">
            <img src="/static/fav.svg" alt="favorites"/>
            Favorites
            <div class="menu__counter">
                ${this.appState.favorites.length}
            </div>
          </a> 
        </div>
        `;

        return this.el
    }
}