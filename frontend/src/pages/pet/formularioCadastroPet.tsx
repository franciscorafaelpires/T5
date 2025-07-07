import { Component } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

type Props = {
    navegarParaListaPets: () => void;
};

type State = {
    nome: string;
    tipo: string;
    raca: string;
    genero: string;
    clienteId: string;
    clientes: any[];
    erro: string | null;
};

export default class FormularioCadastroPet extends Component<Props, State> {
    state: State = {
        nome: "",
        tipo: "",
        raca: "",
        genero: "",
        clienteId: "",
        clientes: [],
        erro: null,
    };

    async componentDidMount() {
        try {
            const response = await axios.get(`${API_URL}/clientes`);
            this.setState({ clientes: response.data });
        } catch (error) {
            this.setState({ erro: "Erro ao carregar clientes" });
        }
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        this.setState({ [name]: value } as Pick<State, keyof State>);
    };

    handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        this.setState({ erro: null });
        const { nome, tipo, raca, genero, clienteId } = this.state;

        try {
            await axios.post(`${API_URL}/pets`, {
                nome,
                tipo,
                raca,
                genero,
                clienteId: Number(clienteId),
            });
            this.props.navegarParaListaPets();
        } catch (error) {
            this.setState({ erro: "Erro ao cadastrar pet" });
            console.error("Erro ao cadastrar pet:", error);
        }
    };

    render() {
        const { nome, tipo, raca, genero, clienteId, clientes, erro } = this.state;
        return (
            <div className="container">
                <h2>Cadastro de Pet</h2>
                {erro && <div className="alert alert-danger">{erro}</div>}
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="nome" className="form-label">Nome</label>
                        <input type="text" className="form-control" id="nome" name="nome" value={nome} onChange={this.handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tipo" className="form-label">Tipo</label>
                        <input type="text" className="form-control" id="tipo" name="tipo" value={tipo} onChange={this.handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="raca" className="form-label">Raça</label>
                        <input type="text" className="form-control" id="raca" name="raca" value={raca} onChange={this.handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="genero" className="form-label">Gênero</label>
                        <input type="text" className="form-control" id="genero" name="genero" value={genero} onChange={this.handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="clienteId" className="form-label">Dono (Cliente)</label>
                        <select className="form-select" id="clienteId" name="clienteId" value={clienteId} onChange={this.handleChange} required>
                            <option value="">Selecione um cliente</option>
                            {clientes.map(cliente => (
                                <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-success">Cadastrar Pet</button>
                    <button type="button" className="btn btn-secondary ms-2" onClick={this.props.navegarParaListaPets}>Cancelar</button>
                </form>
            </div>
        );
    }
}
