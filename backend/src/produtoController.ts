import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getProdutos = async (req: Request, res: Response) => {
  const produtos = await prisma.produto.findMany();
  res.json(produtos);
};

export const getProdutoById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const produto = await prisma.produto.findUnique({ where: { id } });
  if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });
  res.json(produto);
};

export const createProduto = async (req: Request, res: Response) => {
  try {
    const { nome, preco } = req.body;
    const novoProduto = await prisma.produto.create({
      data: { nome, preco },
    });
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar produto', details: error });
  }
};

export const updateProduto = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { nome, preco } = req.body;
  try {
    const produto = await prisma.produto.update({
      where: { id },
      data: { nome, preco },
    });
    res.json(produto);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar produto', details: error });
  }
};

export const deleteProduto = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await prisma.produto.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar produto', details: error });
  }
}; 