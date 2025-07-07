import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// Consumo de Produto
export const getConsumosProduto = async (req: Request, res: Response) => {
  const consumos = await prisma.consumoProduto.findMany({
    include: {
      cliente: true,
      produto: true,
    },
  });
  res.json(consumos);
};

export const createConsumoProduto = async (req: Request, res: Response) => {
  try {
    const { clienteId, produtoId, quantidade } = req.body;
    const consumo = await prisma.consumoProduto.create({
      data: {
        clienteId,
        produtoId,
        quantidade,
      },
      include: {
        cliente: true,
        produto: true,
      },
    });
    res.status(201).json(consumo);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao registrar consumo de produto', details: error });
  }
};

// Consumo de Serviço
export const getConsumosServico = async (req: Request, res: Response) => {
  const consumos = await prisma.consumoServico.findMany({
    include: {
      cliente: true,
      servico: true,
    },
  });
  res.json(consumos);
};

export const createConsumoServico = async (req: Request, res: Response) => {
  try {
    const { clienteId, servicoId, quantidade } = req.body;
    const consumo = await prisma.consumoServico.create({
      data: {
        clienteId,
        servicoId,
        quantidade,
      },
      include: {
        cliente: true,
        servico: true,
      },
    });
    res.status(201).json(consumo);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao registrar consumo de serviço', details: error });
  }
};

export const updateConsumoProduto = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { quantidade } = req.body;
  try {
    const consumo = await prisma.consumoProduto.update({
      where: { id },
      data: { quantidade },
    });
    res.json(consumo);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar consumo de produto', details: error });
  }
};

export const deleteConsumoProduto = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await prisma.consumoProduto.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar consumo de produto', details: error });
  }
};

export const updateConsumoServico = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { quantidade } = req.body;
  try {
    const consumo = await prisma.consumoServico.update({
      where: { id },
      data: { quantidade },
    });
    res.json(consumo);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar consumo de serviço', details: error });
  }
};

export const deleteConsumoServico = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await prisma.consumoServico.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar consumo de serviço', details: error });
  }
}; 