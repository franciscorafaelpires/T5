import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface ClienteData {
    nome: string;
    nomeSocial: string;
    cpf: string;
    dataEmissaoCpf: string;
    rgs: { valor: string; dataEmissao: string }[];
    telefones: { ddd: string; numero: string }[];
}

export default function FormularioCadastroCliente() {
    const [cliente, setCliente] = useState<ClienteData>({
        nome: '',
        nomeSocial: '',
        cpf: '',
        dataEmissaoCpf: '',
        rgs: [{ valor: '', dataEmissao: '' }],
        telefones: [{ ddd: '', numero: '' }],
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number, type?: 'rg' | 'telefone') => {
        const { name, value } = e.target;
        if (type === 'rg' && index !== undefined) {
            const newRgs = [...cliente.rgs];
            newRgs[index] = { ...newRgs[index], [name]: value };
            setCliente({ ...cliente, rgs: newRgs });
        } else if (type === 'telefone' && index !== undefined) {
            const newTelefones = [...cliente.telefones];
            newTelefones[index] = { ...newTelefones[index], [name]: value };
            setCliente({ ...cliente, telefones: newTelefones });
        } else {
            setCliente({ ...cliente, [name]: value });
        }
    };

    const addRg = () => {
        setCliente({ ...cliente, rgs: [...cliente.rgs, { valor: '', dataEmissao: '' }] });
    };

    const addTelefone = () => {
        setCliente({ ...cliente, telefones: [...cliente.telefones, { ddd: '', numero: '' }] });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const dataToSend = {
                nome: cliente.nome,
                nomeSocial: cliente.nomeSocial,
                cpf: {
                    valor: cliente.cpf,
                    dataEmissao: cliente.dataEmissaoCpf,
                },
                rgs: cliente.rgs.map(rg => ({
                    valor: rg.valor,
                    dataEmissao: rg.dataEmissao,
                })),
                telefones: cliente.telefones.map(tel => ({
                    ddd: tel.ddd,
                    numero: tel.numero,
                })),
            };
            await axios.post('http://localhost:3001/clientes', dataToSend);
            alert('Cliente cadastrado com sucesso!');
            // Optionally clear form or redirect
        } catch (error) {
            console.error('Erro ao cadastrar cliente:', error);
            alert('Erro ao cadastrar cliente.');
        }
    };

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
                        value={cliente.cpf}
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
                        Cadastrar Cliente
                    </button>
                </div>
            </form>
        </div>
    );
}
