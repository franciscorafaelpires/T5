import { Component } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

interface Servico {
    id: number;
    nome: string;
    preco: number;
}

interface ListaServicosProps {
    seletorView: (novaTela: string, evento: Event, id?: number) => void;
}

interface ListaServicosState {
    servicos: Servico[];
}

export default class ListaServicos extends Component<ListaServicosProps, ListaServicosState> {
    constructor(props: ListaServicosProps) {
        super(props);
        this.state = {
            servicos: [],
        };
        this.fetchServicos = this.fetchServicos.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.fetchServicos();
    }

    async fetchServicos() {
        try {
            const response = await axios.get(`${API_URL}/servicos`);
            this.setState({ servicos: response.data });
        } catch (error) {
            console.error('Erro ao buscar serviços:', error);
        }
    }

    async handleDelete(id: number) {
        try {
            await axios.delete(`${API_URL}/servicos/${id}`);
            alert('Serviço excluído com sucesso!');
            this.fetchServicos(); // Refresh the list
        } catch (error) {
            console.error('Erro ao excluir serviço:', error);
            alert('Erro ao excluir serviço.');
        }
    }

    render() {
        const { seletorView } = this.props;
        const { servicos } = this.state;

        return (
            <div className="container">
                <div className="list-group">
                    {servicos.map((servico) => (
                        <div key={servico.id} className="list-group-item list-group-item-action">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{servico.nome}</h5>
                                <small>Preço: R$ {servico.preco.toFixed(2)}</small>
                            </div>
                            <div className="d-flex justify-content-end">
                                <button
                                    className="btn btn-primary me-2"
                                    onClick={(e) => seletorView('Edicao Servico', e, servico.id)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => this.handleDelete(servico.id)}
                                >
                                    Excluir
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    className="btn btn-success mt-3"
                    onClick={(e) => seletorView('Cadastro Servico', e)}
                >
                    Cadastrar Serviço
                </button>
            </div>
        );
    }
}
