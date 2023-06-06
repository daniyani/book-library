import { DivComponent } from "../../common/divComponent";
import './pagination.css'

export class Pagination extends DivComponent {
    constructor(state) {
        super()
        this.state = state
    }

    #prevPage() {
        this.state.offset -= 12
        window.scrollTo(0, 0)
    }

    #nextPage() {
        console.log('q');
        this.state.offset += 12
        window.scrollTo(0, 0)
    }

    render() {
        this.el.classList.add('pagination')
        this.el.innerHTML = `
            <div class="pagination__prev ${this.state.offset < 12 ? 'pagination__prev_hidden' : ''}">
                &#8592; Previous page
            </div>
            <div class="pagination__next ${this.state.offset >= this.state.numFound ? 'pagination__next_hidden' : ''}">
                Next page &#8594;
            </div>
        `

        this.el.querySelector('.pagination__prev').addEventListener('click', this.#prevPage.bind(this))
        this.el.querySelector('.pagination__next').addEventListener('click', this.#nextPage.bind(this))
        return this.el
    }
}