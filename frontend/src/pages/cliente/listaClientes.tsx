import { Component } from 'react';
import axios from 'axios';

interface Cliente {
    id: number;
    nome: string;
    nomeSocial: string;
    cpf: { id: number; valor: string; dataEmissao: string };
    rgs: { valor: string; dataEmissao: string }[];
    telefones: { ddd: string; numero: string }[];
}

interface ListaClienteProps {
    seletorView: (novaTela: string, evento: Event, id?: number) => void;
}

interface ListaClienteState {
    clientes: Cliente[];
}

export default class ListaCliente extends Component<ListaClienteProps, ListaClienteState> {
    constructor(props: ListaClienteProps) {
        super(props);
        this.state = {
            clientes: [],
        };
        this.fetchClientes = this.fetchClientes.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.fetchClientes();
    }

    async fetchClientes() {
        try {
            const response = await axios.get('http://localhost:3001/clientes');
            this.setState({ clientes: response.data });
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
        }
    }

    async handleDelete(id: number) {
        try {
            await axios.delete(`http://localhost:3001/clientes/${id}`);
            alert('Cliente excluído com sucesso!');
            this.fetchClientes(); // Refresh the list
        } catch (error) {
            console.error('Erro ao excluir cliente:', error);
            alert('Erro ao excluir cliente.');
        }
    }

    render() {
        const { seletorView } = this.props;
        const { clientes } = this.state;

        return (
            <div className="container">
                <div className="list-group">
                    {clientes.map((cliente) => (
                        <div key={cliente.id} className="list-group-item list-group-item-action">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{cliente.nome} ({cliente.nomeSocial})</h5>
                                <small>CPF: {cliente.cpf.valor}</small>
                            </div>
                            <p className="mb-1">RGs: {cliente.rgs.map(rg => rg.valor).join(', ')}</p>
                            <p className="mb-1">Telefones: {cliente.telefones.map(tel => `(${tel.ddd}) ${tel.numero}`).join(', ')}</p>
                            <div className="d-flex justify-content-end">
                                <button
                                    className="btn btn-primary me-2"
                                    onClick={(e) => seletorView('Edicao Cliente', e, cliente.id)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => this.handleDelete(cliente.id)}
                                >
                                    Excluir
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    className="btn btn-success mt-3"
                    onClick={(e) => seletorView('Cadastro Cliente', e)}
                >
                    Cadastrar Cliente
                </button>
            </div>
        );
    }
}
