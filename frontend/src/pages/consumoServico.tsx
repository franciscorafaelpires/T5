import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001';

export default function ConsumoServico() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [servicos, setServicos] = useState<any[]>([]);
  const [consumos, setConsumos] = useState<any[]>([]);
  const [clienteId, setClienteId] = useState('');
  const [servicoId, setServicoId] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [clientesRes, servicosRes, consumosRes] = await Promise.all([
          axios.get(`${API_URL}/clientes`),
          axios.get(`${API_URL}/servicos`),
          axios.get(`${API_URL}/consumos/servicos`),
        ]);
        setClientes(clientesRes.data);
        setServicos(servicosRes.data);
        setConsumos(consumosRes.data);
        setLoading(false);
      } catch (error) {
        setErro('Erro ao carregar dados');
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const registrarConsumo = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    try {
      await axios.post(`${API_URL}/consumos/servicos`, {
        clienteId: Number(clienteId),
        servicoId: Number(servicoId),
        quantidade: Number(quantidade),
      });
      const { data } = await axios.get(`${API_URL}/consumos/servicos`);
      setConsumos(data);
      setClienteId('');
      setServicoId('');
      setQuantidade(1);
    } catch (error) {
      setErro('Erro ao registrar consumo');
    }
  };

  const excluirConsumo = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este consumo?")) {
      try {
        await axios.delete(`${API_URL}/consumos/servicos/${id}`);
        const { data } = await axios.get(`${API_URL}/consumos/servicos`);
        setConsumos(data);
      } catch (error) {
        setErro('Erro ao excluir consumo');
      }
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (erro) return <div>{erro}</div>;

  return (
    <div className="container">
      <h2>Registrar Consumo de Serviço</h2>
      <form onSubmit={registrarConsumo} className="mb-4">
        <div className="input-group mb-2">
          <select className="form-select" value={clienteId} onChange={e => setClienteId(e.target.value)} required>
            <option value="">Selecione o Cliente</option>
            {clientes.map(cliente => (
              <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
            ))}
          </select>
        </div>
        <div className="input-group mb-2">
          <select className="form-select" value={servicoId} onChange={e => setServicoId(e.target.value)} required>
            <option value="">Selecione o Serviço</option>
            {servicos.map(servico => (
              <option key={servico.id} value={servico.id}>{servico.nome}</option>
            ))}
          </select>
        </div>
        <div className="input-group mb-2">
          <input type="number" className="form-control" min={1} value={quantidade} onChange={e => setQuantidade(Number(e.target.value))} required />
        </div>
        <button className="btn btn-primary" type="submit">Registrar Consumo</button>
      </form>
      <h3>Consumos Registrados</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Serviço</th>
            <th>Quantidade</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {consumos.map((consumo: any, idx: number) => (
            <tr key={idx}>
              <td>{consumo.cliente?.nome}</td>
              <td>{consumo.servico?.nome}</td>
              <td>{consumo.quantidade}</td>
              <td>{new Date(consumo.data).toLocaleString()}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => excluirConsumo(consumo.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
