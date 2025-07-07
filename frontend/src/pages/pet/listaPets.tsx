import { Component } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

interface Pet {
    id: number;
    nome: string;
    tipo: string;
    raca: string;
    genero: string;
    clienteId: number;
    cliente: {
        nome: string;
    };
}

interface ListaPetsProps {
    seletorView: (novaTela: string, evento: Event, id?: number) => void;
}

interface ListaPetsState {
    pets: Pet[];
}

export default class ListaPets extends Component<ListaPetsProps, ListaPetsState> {
    constructor(props: ListaPetsProps) {
        super(props);
        this.state = {
            pets: [],
        };
        this.fetchPets = this.fetchPets.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.fetchPets();
    }

    async fetchPets() {
        try {
            const response = await axios.get(`${API_URL}/pets`);
            this.setState({ pets: response.data });
        } catch (error) {
            console.error('Erro ao buscar pets:', error);
        }
    }

    async handleDelete(id: number) {
        try {
            await axios.delete(`${API_URL}/pets/${id}`);
            alert('Pet excluído com sucesso!');
            this.fetchPets(); // Refresh the list
        } catch (error) {
            console.error('Erro ao excluir pet:', error);
            alert('Erro ao excluir pet.');
        }
    }

    render() {
        const { seletorView } = this.props;
        const { pets } = this.state;

        return (
            <div className="container">
                <div className="list-group">
                    {pets.map((pet) => (
                        <div key={pet.id} className="list-group-item list-group-item-action">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{pet.nome}</h5>
                                <small>Tipo: {pet.tipo}</small>
                            </div>
                            <p className="mb-1">Raça: {pet.raca}</p>
                            <p className="mb-1">Gênero: {pet.genero}</p>
                            <p className="mb-1">Tutor: {pet.cliente.nome}</p>
                            <div className="d-flex justify-content-end">
                                <button
                                    className="btn btn-primary me-2"
                                    onClick={(e) => seletorView('Edicao Pet', e, pet.id)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => this.handleDelete(pet.id)}
                                >
                                    Excluir
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    className="btn btn-success mt-3"
                    onClick={(e) => seletorView('Cadastro Pet', e)}
                >
                    Cadastrar Pet
                </button>
            </div>
        );
    }
}
