import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

interface ProdutoData {
    id: number;
    nome: string;
    preco: number | string;
}

interface FormularioEdicaoProdutoProps {
    produtoId: number;
}

export default function FormularioEdicaoProduto({ produtoId }: FormularioEdicaoProdutoProps) {
    const [produto, setProduto] = useState<ProdutoData | null>(null);

    useEffect(() => {
        const fetchProduto = async () => {
            try {
                const response = await axios.get(`${API_URL}/produtos/${produtoId}`);
                setProduto(response.data);
            } catch (error) {
                console.error('Erro ao buscar produto para edição:', error);
                alert('Erro ao carregar dados do produto.');
            }
        };
        fetchProduto();
    }, [produtoId]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!produto) return;
        const { name, value } = e.target;
        setProduto({ ...produto, [name]: value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!produto) return;
        try {
            await axios.put(`${API_URL}/produtos/${produto.id}`, { ...produto, preco: parseFloat(produto.preco as string) });
            alert('Produto atualizado com sucesso!');
            // Optionally redirect or show success message
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            alert('Erro ao atualizar produto.');
        }
    };

    if (!produto) {
        return <div>Carregando...</div>;
    }

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
                        Atualizar Produto
                    </button>
                </div>
            </form>
        </div>
    );
}