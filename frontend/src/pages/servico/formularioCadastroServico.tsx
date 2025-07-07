import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

interface ServicoData {
    nome: string;
    preco: number | string;
}

export default function FormularioCadastroServico() {
    const [servico, setServico] = useState<ServicoData>({
        nome: '',
        preco: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setServico({ ...servico, [name]: value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/servicos`, { ...servico, preco: parseFloat(servico.preco as string) });
            alert('Serviço cadastrado com sucesso!');
            // Optionally clear form or redirect
        } catch (error) {
            console.error('Erro ao cadastrar serviço:', error);
            alert('Erro ao cadastrar serviço.');
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nome do Serviço"
                        aria-label="Nome do Serviço"
                        name="nome"
                        value={servico.nome}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-group mb-3">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Preço"
                        aria-label="Preço"
                        name="preco"
                        value={servico.preco}
                        onChange={handleChange}
                        step="0.01"
                    />
                </div>
                <div className="input-group mb-3">
                    <button className="btn btn-outline-secondary" type="submit">
                        Cadastrar Serviço
                    </button>
                </div>
            </form>
        </div>
    );
}