import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001';

export default function ConsumoProduto() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [produtos, setProdutos] = useState<any[]>([]);
  const [consumos, setConsumos] = useState<any[]>([]);
  const [clienteId, setClienteId] = useState('');
  const [produtoId, setProdutoId] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [clientesRes, produtosRes, consumosRes] = await Promise.all([
          axios.get(`${API_URL}/clientes`),
          axios.get(`${API_URL}/produtos`),
          axios.get(`${API_URL}/consumos/produtos`),
        ]);
        setClientes(clientesRes.data);
        setProdutos(produtosRes.data);
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
      await axios.post(`${API_URL}/consumos/produtos`, {
        clienteId: Number(clienteId),
        produtoId: Number(produtoId),
        quantidade: Number(quantidade),
      });
      const { data } = await axios.get(`${API_URL}/consumos/produtos`);
      setConsumos(data);
      setClienteId('');
      setProdutoId('');
      setQuantidade(1);
    } catch (error) {
      setErro('Erro ao registrar consumo');
    }
  };

  const excluirConsumo = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este consumo?")) {
      try {
        await axios.delete(`${API_URL}/consumos/produtos/${id}`);
        const { data } = await axios.get(`${API_URL}/consumos/produtos`);
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
      <h2>Registrar Consumo de Produto</h2>
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
          <select className="form-select" value={produtoId} onChange={e => setProdutoId(e.target.value)} required>
            <option value="">Selecione o Produto</option>
            {produtos.map(produto => (
              <option key={produto.id} value={produto.id}>{produto.nome}</option>
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
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {consumos.map((consumo: any, idx: number) => (
            <tr key={idx}>
              <td>{consumo.cliente?.nome}</td>
              <td>{consumo.produto?.nome}</td>
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
