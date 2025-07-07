import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';

interface ClienteData {
    id: number;
    nome: string;
    nomeSocial: string;
    cpf: { id: number; valor: string; dataEmissao: string };
    dataEmissaoCpf: string;
    rgs: { valor: string; dataEmissao: string }[];
    telefones: { ddd: string; numero: string }[];
}

interface FormularioEdicaoClienteProps {
    clienteId: number;
}

export default function FormularioEdicaoCliente({ clienteId }: FormularioEdicaoClienteProps) {
    const [cliente, setCliente] = useState<ClienteData | null>(null);

    useEffect(() => {
        const fetchCliente = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/clientes/${clienteId}`);
                setCliente({
                    ...response.data,
                    dataEmissaoCpf: response.data.cpf.dataEmissao ? new Date(response.data.cpf.dataEmissao).toISOString().split('T')[0] : '',
                    rgs: response.data.rgs.map((rg: any) => ({
                        ...rg,
                        dataEmissao: rg.dataEmissao ? new Date(rg.dataEmissao).toISOString().split('T')[0] : '',
                    })),
                });
            } catch (error) {
                console.error('Erro ao buscar cliente para edição:', error);
                alert('Erro ao carregar dados do cliente.');
            }
        };
        fetchCliente();
    }, [clienteId]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number, type?: 'rg' | 'telefone') => {
        if (!cliente) return;
        const { name, value } = e.target;
        if (type === 'rg' && index !== undefined) {
            const newRgs = [...cliente.rgs];
            newRgs[index] = { ...newRgs[index], [name]: value };
            setCliente({ ...cliente, rgs: newRgs });
        } else if (type === 'telefone' && index !== undefined) {
            const newTelefones = [...cliente.telefones];
            newTelefones[index] = { ...newTelefones[index], [name]: value };
            setCliente({ ...cliente, telefones: newTelefones });
        } else if (name === 'cpf') {
            setCliente({ ...cliente, cpf: { ...cliente.cpf, valor: value } });
        } else if (name === 'dataEmissaoCpf') {
            setCliente({ ...cliente, dataEmissaoCpf: value });
        } else {
            setCliente({ ...cliente, [name]: value });
        }
    };

    const addRg = () => {
        if (!cliente) return;
        setCliente({ ...cliente, rgs: [...cliente.rgs, { valor: '', dataEmissao: '' }] });
    };

    const addTelefone = () => {
        if (!cliente) return;
        setCliente({ ...cliente, telefones: [...cliente.telefones, { ddd: '', numero: '' }] });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!cliente) return;
        try {
            await axios.put(`http://localhost:3001/clientes/${cliente.id}`, cliente);
            alert('Cliente atualizado com sucesso!');
            // Optionally redirect or show success message
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
            alert('Erro ao atualizar cliente.');
        }
    };

    if (!cliente) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nome"
                        aria-label="Nome"
                        name="nome"
                        value={cliente.nome}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nome Social"
                        aria-label="Nome Social"
                        name="nomeSocial"
                        value={cliente.nomeSocial}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="CPF"
                        aria-label="CPF"
                        name="cpf"
                        value={cliente.cpf.valor}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-group mb-3">
                    <input
                        type="date"
                        className="form-control"
                        placeholder="Data de Emissão do CPF"
                        aria-label="Data de Emissão do CPF"
                        name="dataEmissaoCpf"
                        value={cliente.dataEmissaoCpf}
                        onChange={handleChange}
                    />
                </div>
                {cliente.rgs.map((rg, index) => (
                    <div key={index} className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder={`RG ${index + 1}`}
                            aria-label={`RG ${index + 1}`}
                            name="valor"
                            value={rg.valor}
                            onChange={(e) => handleChange(e, index, 'rg')}
                        />
                        <input
                            type="date"
                            className="form-control"
                            placeholder={`Data de Emissão do RG ${index + 1}`}
                            aria-label={`Data de Emissão do RG ${index + 1}`}
                            name="dataEmissao"
                            value={rg.dataEmissao}
                            onChange={(e) => handleChange(e, index, 'rg')}
                        />
                    </div>
                ))}
                <div className="input-group mb-3">
                    <button className="btn btn-outline-secondary" type="button" onClick={addRg}>
                        Adicionar RG
                    </button>
                </div>
                {cliente.telefones.map((telefone, index) => (
                    <div key={index} className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder={`DDD ${index + 1}`}
                            aria-label={`DDD ${index + 1}`}
                            name="ddd"
                            value={telefone.ddd}
                            onChange={(e) => handleChange(e, index, 'telefone')}
                        />
                        <input
                            type="text"
                            className="form-control"
                            placeholder={`Telefone ${index + 1}`}
                            aria-label={`Telefone ${index + 1}`}
                            name="numero"
                            value={telefone.numero}
                            onChange={(e) => handleChange(e, index, 'telefone')}
                        />
                    </div>
                ))}
                <div className="input-group mb-3">
                    <button className="btn btn-outline-secondary" type="button" onClick={addTelefone}>
                        Adicionar Telefone
                    </button>
                </div>
                <div className="input-group mb-3">
                    <button className="btn btn-outline-secondary" type="submit">
                        Atualizar Cliente
                    </button>
                </div>
            </form>
        </div>
    );
}
