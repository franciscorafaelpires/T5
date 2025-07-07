import { Component } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

interface Produto {
    id: number;
    nome: string;
    preco: number;
}

interface ListaProdutosProps {
    seletorView: (novaTela: string, evento: Event, id?: number) => void;
}

interface ListaProdutosState {
    produtos: Produto[];
}

export default class ListaProdutos extends Component<ListaProdutosProps, ListaProdutosState> {
    constructor(props: ListaProdutosProps) {
        super(props);
        this.state = {
            produtos: [],
        };
        this.fetchProdutos = this.fetchProdutos.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.fetchProdutos();
    }

    async fetchProdutos() {
        try {
            const response = await axios.get(`${API_URL}/produtos`);
            this.setState({ produtos: response.data });
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    }

    async handleDelete(id: number) {
        try {
            await axios.delete(`${API_URL}/produtos/${id}`);
            alert('Produto excluído com sucesso!');
            this.fetchProdutos(); // Refresh the list
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
            alert('Erro ao excluir produto.');
        }
    }

    render() {
        const { seletorView } = this.props;
        const { produtos } = this.state;

        return (
            <div className="container">
                <div className="list-group">
                    {produtos.map((produto) => (
                        <div key={produto.id} className="list-group-item list-group-item-action">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{produto.nome}</h5>
                                <small>Preço: R$ {produto.preco.toFixed(2)}</small>
                            </div>
                            <div className="d-flex justify-content-end">
                                <button
                                    className="btn btn-primary me-2"
                                    onClick={(e) => seletorView('Edicao Produto', e, produto.id)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => this.handleDelete(produto.id)}
                                >
                                    Excluir
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    className="btn btn-success mt-3"
                    onClick={(e) => seletorView('Cadastro Produto', e)}
                >
                    Cadastrar Produto
                </button>
            </div>
        );
    }
}
