/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

type Props = {
    botoes: string[];
    seletorView: (novaTela: string, evento: Event, id?: number) => void;
};

export default class BarraNavegacao extends Component<Props>{
    constructor(props: Props | Readonly<Props>) {
        super(props)
        this.gerarListaBotoes = this.gerarListaBotoes.bind(this)
    }


    gerarListaBotoes() {
        if (this.props.botoes.length <= 0) {
            return <></>
        } else {
            let lista = this.props.botoes.map(valor =>
                <li key={valor} className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => this.props.seletorView(valor, e)}>{valor}</a>
                </li>
            )
            return lista
        }
    }

    render() {
        return (
            <>
                <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'var(--primary-color)' }}>
                    <div className="container-fluid">
                        <span className="navbar-brand mb-0 h1" style={{ color: 'var(--secondary-color)', fontWeight: 700, letterSpacing: '1px' }}>
                            PetLovers
                        </span>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" style={{ borderColor: 'var(--secondary-color)' }}>
                            <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {this.gerarListaBotoes()}
                            </ul>
                        </div>
                    </div>
                </nav>
            </>
        )
    }
}