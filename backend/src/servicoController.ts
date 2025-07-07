import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getServicos = async (req: Request, res: Response) => {
  const servicos = await prisma.servico.findMany();
  res.json(servicos);
};

export const getServicoById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const servico = await prisma.servico.findUnique({ where: { id } });
  if (!servico) return res.status(404).json({ error: 'Serviço não encontrado' });
  res.json(servico);
};

export const createServico = async (req: Request, res: Response) => {
  try {
    const { nome, preco } = req.body;
    const novoServico = await prisma.servico.create({
      data: { nome, preco },
    });
    res.status(201).json(novoServico);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar serviço', details: error });
  }
};

export const updateServico = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { nome, preco } = req.body;
  try {
    const servico = await prisma.servico.update({
      where: { id },
      data: { nome, preco },
    });
    res.json(servico);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar serviço', details: error });
  }
};

export const deleteServico = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await prisma.servico.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar serviço', details: error });
  }
}; 