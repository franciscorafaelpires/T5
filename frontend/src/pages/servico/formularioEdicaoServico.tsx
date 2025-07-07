import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

interface ServicoData {
    id: number;
    nome: string;
    preco: number | string;
}

interface FormularioEdicaoServicoProps {
    servicoId: number;
}

export default function FormularioEdicaoServico({ servicoId }: FormularioEdicaoServicoProps) {
    const [servico, setServico] = useState<ServicoData | null>(null);

    useEffect(() => {
        const fetchServico = async () => {
            try {
                const response = await axios.get(`${API_URL}/servicos/${servicoId}`);
                setServico(response.data);
            } catch (error) {
                console.error('Erro ao buscar serviço para edição:', error);
                alert('Erro ao carregar dados do serviço.');
            }
        };
        fetchServico();
    }, [servicoId]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!servico) return;
        const { name, value } = e.target;
        setServico({ ...servico, [name]: value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!servico) return;
        try {
            await axios.put(`${API_URL}/servicos/${servico.id}`, { ...servico, preco: parseFloat(servico.preco as string) });
            alert('Serviço atualizado com sucesso!');
            // Optionally redirect or show success message
        } catch (error) {
            console.error('Erro ao atualizar serviço:', error);
            alert('Erro ao atualizar serviço.');
        }
    };

    if (!servico) {
        return <div>Carregando...</div>;
    }

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
                        Atualizar Serviço
                    </button>
                </div>
            </form>
        </div>
    );
}