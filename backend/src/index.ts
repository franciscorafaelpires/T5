import express from 'express';
import cors from 'cors';
import { getClientes, getClienteById, createCliente, updateCliente, deleteCliente } from './clienteController';
import { getPets, getPetById, createPet, updatePet, deletePet } from './petController';
import { getProdutos, getProdutoById, createProduto, updateProduto, deleteProduto } from './produtoController';
import { getServicos, getServicoById, createServico, updateServico, deleteServico } from './servicoController';
import { getConsumosProduto, createConsumoProduto, updateConsumoProduto, deleteConsumoProduto, getConsumosServico, createConsumoServico, updateConsumoServico, deleteConsumoServico } from './consumoController';
import { top10ClientesMaisConsumiram, top5ClientesMaisGastaram, maisConsumidos, maisConsumidosPorTipoRaca } from './estatisticasController';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/clientes', getClientes);
app.get('/clientes/:id', getClienteById);
app.post('/clientes', createCliente);
app.put('/clientes/:id', updateCliente);
app.delete('/clientes/:id', deleteCliente);

app.get('/pets', getPets);
app.get('/pets/:id', getPetById);
app.post('/pets', createPet);
app.put('/pets/:id', updatePet);
app.delete('/pets/:id', deletePet);

app.get('/produtos', getProdutos);
app.get('/produtos/:id', getProdutoById);
app.post('/produtos', createProduto);
app.put('/produtos/:id', updateProduto);
app.delete('/produtos/:id', deleteProduto);

app.get('/servicos', getServicos);
app.get('/servicos/:id', getServicoById);
app.post('/servicos', createServico);
app.put('/servicos/:id', updateServico);
app.delete('/servicos/:id', deleteServico);

app.get('/consumos/produtos', getConsumosProduto);
app.post('/consumos/produtos', createConsumoProduto);
app.get('/consumos/servicos', getConsumosServico);
app.post('/consumos/servicos', createConsumoServico);
app.put('/consumos/produtos/:id', updateConsumoProduto);
app.delete('/consumos/produtos/:id', deleteConsumoProduto);
app.put('/consumos/servicos/:id', updateConsumoServico);
app.delete('/consumos/servicos/:id', deleteConsumoServico);

app.get('/estatisticas/top10-clientes-quantidade', top10ClientesMaisConsumiram);
app.get('/estatisticas/top5-clientes-valor', top5ClientesMaisGastaram);
app.get('/estatisticas/mais-consumidos', maisConsumidos);
app.get('/estatisticas/mais-consumidos-por-tipo-raca', maisConsumidosPorTipoRaca);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
}); 