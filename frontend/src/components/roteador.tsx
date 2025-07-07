import { Component } from "react";
import BarraNavegacao from "./barraNavegacao";
import ListaCliente from "../pages/cliente/listaClientes";
import FormularioCadastroCliente from "../pages/cliente/formularioCadastroCliente";
import FormularioEdicaoCliente from "../pages/cliente/formularioEdicaoCliente";
import ListaProdutos from "../pages/produto/listaProdutos";
import FormularioCadastroProduto from "../pages/produto/formularioCadastroProduto";
import FormularioEdicaoProduto from "../pages/produto/formularioEdicaoProduto";
import ListaServicos from "../pages/servico/listaServicos";
import FormularioCadastroServico from "../pages/servico/formularioCadastroServico";
import FormularioEdicaoServico from "../pages/servico/formularioEdicaoServico";
import ListaPets from "../pages/pet/listaPets";
import FormularioCadastroPet from "../pages/pet/formularioCadastroPet";
import FormularioEdicaoPet from "../pages/pet/formularioEdicaoPet";
import Estatisticas from "../pages/estatisticas";
import ConsumoProduto from '../pages/consumoProduto';
import ConsumoServico from '../pages/consumoServico';

type State = {
    tela: string;
    id?: number;
};

export default class Roteador extends Component<{}, State> {
    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            tela: 'Clientes',
        };
        this.selecionarView = this.selecionarView.bind(this);
    }

    selecionarView(novaTela: string, evento: Event, id?: number) {
        evento.preventDefault();
        this.setState({
            tela: novaTela,
            id: id,
        });
    }

    render() {
        let barraNavegacao = <BarraNavegacao seletorView={this.selecionarView} botoes={['Clientes', 'Cadastro Cliente', 'Produtos', 'Cadastro Produto', 'Serviços', 'Cadastro Servico', 'Pets', 'Cadastro Pet', 'Consumo Produto', 'Consumo Serviço', 'Estatísticas']} />;
        let componenteAtual;

        switch (this.state.tela) {
            case 'Clientes':
                componenteAtual = <ListaCliente seletorView={this.selecionarView} />;
                break;
            case 'Cadastro Cliente':
                componenteAtual = <FormularioCadastroCliente />;
                break;
            case 'Edicao Cliente':
                componenteAtual = <FormularioEdicaoCliente clienteId={this.state.id!} />;
                break;
            case 'Produtos':
                componenteAtual = <ListaProdutos seletorView={this.selecionarView} />;
                break;
            case 'Cadastro Produto':
                componenteAtual = <FormularioCadastroProduto />;
                break;
            case 'Edicao Produto':
                componenteAtual = <FormularioEdicaoProduto produtoId={this.state.id!} />;
                break;
            case 'Serviços':
                componenteAtual = <ListaServicos seletorView={this.selecionarView} />;
                break;
            case 'Cadastro Servico':
                componenteAtual = <FormularioCadastroServico />;
                break;
            case 'Edicao Servico':
                componenteAtual = <FormularioEdicaoServico servicoId={this.state.id!} />;
                break;
            case 'Pets':
                componenteAtual = <ListaPets seletorView={this.selecionarView} />;
                break;
            case 'Cadastro Pet':
                componenteAtual = <FormularioCadastroPet navegarParaListaPets={() => this.selecionarView('Pets', new Event('click'))} />;
                break;
            case 'Edicao Pet':
                componenteAtual = <FormularioEdicaoPet petId={this.state.id!} navegarParaListaPets={() => this.selecionarView('Pets', new Event('click'))} />;
            case 'Consumo Produto':
                componenteAtual = <ConsumoProduto />;
                break;
            case 'Consumo Serviço':
                componenteAtual = <ConsumoServico />;
                break;
            case 'Estatísticas':
                componenteAtual = <Estatisticas />;
                break;
            default:
                componenteAtual = <ListaCliente seletorView={this.selecionarView} />;
        }

        return (
            <>
                {barraNavegacao}
                <div className="container mt-4">
                    {componenteAtual}
                </div>
            </>
        );
    }
}
