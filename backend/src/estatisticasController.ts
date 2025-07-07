import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// 1. Top 10 clientes que mais consumiram produtos ou serviços (em quantidade)
export const top10ClientesMaisConsumiram = async (req: Request, res: Response) => {
  const clientes = await prisma.cliente.findMany({
    include: {
      produtosConsumidos: true,
      servicosConsumidos: true,
    },
  });
  const ranking = clientes.map(cliente => ({
    id: cliente.id,
    nome: cliente.nome,
    total: cliente.produtosConsumidos.length + cliente.servicosConsumidos.length,
  }));
  ranking.sort((a, b) => b.total - a.total);
  res.json(ranking.slice(0, 10));
};

// 2. Top 5 clientes que mais consumiram em valor
export const top5ClientesMaisGastaram = async (req: Request, res: Response) => {
  const clientes = await prisma.cliente.findMany({
    include: {
      produtosConsumidos: { include: { produto: true } },
      servicosConsumidos: { include: { servico: true } },
    },
  });
  const ranking = clientes.map(cliente => {
    const totalProdutos = cliente.produtosConsumidos.reduce((acc, c) => acc + (c.produto?.preco || 0) * c.quantidade, 0);
    const totalServicos = cliente.servicosConsumidos.reduce((acc, c) => acc + (c.servico?.preco || 0) * c.quantidade, 0);
    return {
      id: cliente.id,
      nome: cliente.nome,
      total: totalProdutos + totalServicos,
    };
  });
  ranking.sort((a, b) => b.total - a.total);
  res.json(ranking.slice(0, 5));
};

// 3. Listagem geral dos serviços ou produtos mais consumidos
export const maisConsumidos = async (req: Request, res: Response) => {
  // Produtos
  const produtos = await prisma.consumoProduto.groupBy({
    by: ['produtoId'],
    _sum: { quantidade: true },
  });
  // Serviços
  const servicos = await prisma.consumoServico.groupBy({
    by: ['servicoId'],
    _sum: { quantidade: true },
  });
  // Buscar nomes
  const produtosDetalhes = await Promise.all(produtos.map(async p => {
    const prod = await prisma.produto.findUnique({ where: { id: p.produtoId } });
    return { nome: prod?.nome, quantidade: p._sum.quantidade };
  }));
  const servicosDetalhes = await Promise.all(servicos.map(async s => {
    const serv = await prisma.servico.findUnique({ where: { id: s.servicoId } });
    return { nome: serv?.nome, quantidade: s._sum.quantidade };
  }));
  res.json({ produtos: produtosDetalhes, servicos: servicosDetalhes });
};

// 4. Listagem dos serviços ou produtos mais consumidos por tipo e raça de pets
export const maisConsumidosPorTipoRaca = async (req: Request, res: Response) => {
  // Busca todos os clientes com pets, produtosConsumidos e servicosConsumidos
  const clientes = await prisma.cliente.findMany({
    include: {
      pets: true,
      produtosConsumidos: { include: { produto: true } },
      servicosConsumidos: { include: { servico: true } },
    },
  });
  const resultado: any = {};
  clientes.forEach(cliente => {
    cliente.pets.forEach(pet => {
      const chave = `${pet.tipo} | ${pet.raca}`;
      if (!resultado[chave]) resultado[chave] = {};
      cliente.produtosConsumidos.forEach(consumo => {
        const nome = consumo.produto?.nome;
        if (nome) resultado[chave][nome] = (resultado[chave][nome] || 0) + consumo.quantidade;
      });
      cliente.servicosConsumidos.forEach(consumo => {
        const nome = consumo.servico?.nome;
        if (nome) resultado[chave][nome] = (resultado[chave][nome] || 0) + consumo.quantidade;
      });
    });
  });
  res.json(resultado);
}; 