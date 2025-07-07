import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

interface ProdutoData {
    nome: string;
    preco: number | string;
}

export default function FormularioCadastroProduto() {
    const [produto, setProduto] = useState<ProdutoData>({
        nome: '',
        preco: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduto({ ...produto, [name]: value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/produtos`, { ...produto, preco: parseFloat(produto.preco as string) });
            alert('Produto cadastrado com sucesso!');
            // Optionally clear form or redirect
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            alert('Erro ao cadastrar produto.');
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nome do Produto"
                        aria-label="Nome do Produto"
                        name="nome"
                        value={produto.nome}
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
                        value={produto.preco}
                        onChange={handleChange}
                        step="0.01"
                    />
                </div>
                <div className="input-group mb-3">
                    <button className="btn btn-outline-secondary" type="submit">
                        Cadastrar Produto
                    </button>
                </div>
            </form>
        </div>
    );
}