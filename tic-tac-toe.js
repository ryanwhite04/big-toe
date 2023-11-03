import {
    LitElement,
    html,
    css,
} from './modules.bundle.js';

class BigTicTacToe extends LitElement {

    static get styles() {
        return css`
            .board {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                grid-template-rows: repeat(3, 1fr);
                width: var(--board-size, 600px);
                height: var(--board-size, 600px);
            }
            .complete {
                border: 1px solid black;
                font-size: 9em;
                text-align: center;
                vertical-align: middle;
            }
            tic-tac-toe {
                --board-size: 200px;
                border: 1px solid black;
                /* font-size: 3em; */
                text-align: center;
                vertical-align: middle;
            }`;
    }

    constructor() {
        super();
        this.turn = 'X';
        this.board = new Array(9).fill({
            winner: null,
            disabled: false
        });
    }

    render() {
        return html`
        <div class="board">
            ${this.board.map(this.renderCell.bind(this))}
        </div>
        `
    }

    finished(event, cell, index) {
        console.log("sdlkjvcbsdiubu");
        this.board[index] = {
            winner: event.detail.winner,
            disabled: true,
        };
        this.enableAllCells();
        this.requestUpdate();
    }
    renderCell(cell, index) {
        console.log(cell, index);
        if (cell.winner) {
            return html`<div class="complete">${cell.winner}</div>`;
        } else return html`<tic-tac-toe
            @finished="${event => this.finished(event, cell, index)}"
            @move="${this.onMove}"
            ?disabled=${cell.disabled}
            turn="${this.turn}"
        >
        </tic-tac-toe>`;
    }

    onMove(event) {
        this.disableAllCellsExcept(event.detail.index);
        this.turn = this.turn === 'X' ? 'O' : 'X';
    }

    disableAllCellsExcept(index) {
        this.board = this.board.map((cell, i) => ({
            winner: cell.winner,
            disabled: cell.winner || i !== index,
        }));
        if (this.board.every(cell => cell.disabled)) {
            this.enableAllCells();
        }
        this.requestUpdate();
    }

    enableAllCells() {
        this.board = this.board.map((cell, i) => ({
            winner: cell.winner,
            disabled: cell.winner,
        }));
        this.requestUpdate();
    }

}

class TicTacToe extends LitElement {

    constructor() {
        super();
        this.board = new Array(9).fill(null);
        this.turn = 'X';
        this.winner = null;
    }

    static get properties() {
        return {
            board: { type: Array },
            turn: {
                type: String,
                reflect: true,
            },
            winner: {
                type: String,
                reflect: true,
            },
        };
    }
    
    static get styles() {
        return css`
            .board {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                grid-template-rows: repeat(3, 1fr);
                width: var(--board-size, 300px);
                height: var(--board-size, 300px);
            }
            .cell {
                border: 1px solid black;
                font-size: 3em;
                text-align: center;
                vertical-align: middle;
            }
            :host([disabled]) {
                opacity: 0.5;
            }
            :host([disabled]) .cell {
                cursor: not-allowed;
            }
        `;
    }

    render() {
        return html`
            <div class="board">
                ${this.board.map((cell, index) => this.renderCell(index))}
            </div>
        `;
    }

    renderCell(index) {
        return html`
            <button class="cell" @click="${() => this.makeMove(index)}">
                ${this.board[index]}
            </button>
        `;
    }

    makeMove(index) {
        if (!this.winner && !this.board[index] && !this.hasAttribute('disabled')) {
            this.board[index] = this.turn;
            this.requestUpdate();
            this.checkWinner();
            this.changeTurn();
            this.dispatchEvent(new CustomEvent('move',{
                detail: {
                    index,
                }
            }));
        }
    }

    checkWinner() {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6], // diagonals
        ];
        winningCombos.forEach(combo => {
            const [a, b, c] = combo;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                this.winner = this.board[a];
            }
        });
    }

    changeTurn() {
        this.turn = this.turn === 'X' ? 'O' : 'X';
    }

    updated(changedProperties) {
        if (changedProperties.has('winner') && this.winner !== null) {
            this.dispatchEvent(new CustomEvent('finished', {
                detail: {
                    winner: this.winner,
                },
            }));
        }
    }
}

customElements.define('tic-tac-toe', TicTacToe);
customElements.define('big-tic-tac-toe', BigTicTacToe);