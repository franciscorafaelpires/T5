import { Component } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001';

export default class Estatisticas extends Component<{}, any> {
    state = {
        top5Clientes: [],
        top10Clientes: [],
        maisConsumidos: { produtos: [], servicos: [] },
        consumoPorPet: {},
        loading: true,
        erro: null,
    };

    async componentDidMount() {
        try {
            const [top5, top10, mais, porPet] = await Promise.all([
                axios.get(`${API_URL}/estatisticas/top5-clientes-valor`),
                axios.get(`${API_URL}/estatisticas/top10-clientes-quantidade`),
                axios.get(`${API_URL}/estatisticas/mais-consumidos`),
                axios.get(`${API_URL}/estatisticas/mais-consumidos-por-tipo-raca`),
            ]);
            this.setState({
                top5Clientes: top5.data,
                top10Clientes: top10.data,
                maisConsumidos: mais.data,
                consumoPorPet: porPet.data,
                loading: false,
            });
        } catch (error) {
            this.setState({ erro: 'Erro ao buscar estatísticas', loading: false });
        }
    }

    render() {
        if (this.state.loading) return <div>Carregando estatísticas...</div>;
        if (this.state.erro) return <div>{this.state.erro}</div>;
        const { top5Clientes, top10Clientes, maisConsumidos, consumoPorPet } = this.state;
        return (
            <div>
                <h2>Estatísticas</h2>
                <div>
                    <h3>Top 5 Clientes que Mais Gastaram</h3>
                    <ol>
                        {top5Clientes.map((entry: any, index: number) => (
                            <li key={index}>{entry.nome} - R$ {entry.total.toFixed(2)}</li>
                        ))}
                    </ol>
                </div>
                <div>
                    <h3>Top 10 Clientes que Mais Consumiram</h3>
                    <ol>
                        {top10Clientes.map((entry: any, index: number) => (
                            <li key={index}>{entry.nome} - Total consumido: {entry.total}</li>
                        ))}
                    </ol>
                </div>
                <div>
                    <h3>Produtos Mais Consumidos</h3>
                    <ol>
                        {maisConsumidos.produtos.map((item: any, index: number) => (
                            <li key={index}>{item.nome} - consumido {item.quantidade}x</li>
                        ))}
                    </ol>
                    <h3>Serviços Mais Consumidos</h3>
                    <ol>
                        {maisConsumidos.servicos.map((item: any, index: number) => (
                            <li key={index}>{item.nome} - consumido {item.quantidade}x</li>
                        ))}
                    </ol>
                </div>
                <div>
                    <h3>Consumo por Tipo e Raça de Pet</h3>
                    {Object.entries(consumoPorPet).map(([chave, itens]: any, index) => (
                        <div key={index}>
                            <h4>{chave}</h4>
                            <ul>
                                {Object.entries(itens).map(([nome, qtd]: any, i) => (
                                    <li key={i}>{nome}: {qtd}x</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
