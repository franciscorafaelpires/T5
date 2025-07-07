import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getClientes = async (req: Request, res: Response) => {
  const clientes = await prisma.cliente.findMany({
    include: {
      cpf: true,
      rgs: true,
      telefones: true,
      pets: true,
      produtosConsumidos: true,
      servicosConsumidos: true,
    },
  });
  res.json(clientes);
};

export const getClienteById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const cliente = await prisma.cliente.findUnique({
    where: { id },
    include: {
      cpf: true,
      rgs: true,
      telefones: true,
      pets: true,
      produtosConsumidos: true,
      servicosConsumidos: true,
    },
  });
  if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
  res.json(cliente);
};

export const createCliente = async (req: Request, res: Response) => {
  try {
    const { nome, nomeSocial, cpf, rgs, telefones, pets } = req.body;
    const novoCliente = await prisma.cliente.create({
      data: {
        nome,
        nomeSocial,
        cpf: {
          create: {
            valor: cpf.valor,
            dataEmissao: new Date(cpf.dataEmissao),
          },
        },
        rgs: {
          create: rgs?.map((rg: any) => ({ valor: rg.valor, dataEmissao: new Date(rg.dataEmissao) })) || [],
        },
        telefones: {
          create: telefones?.map((tel: any) => ({ ddd: tel.ddd, numero: tel.numero })) || [],
        },
        pets: {
          create: pets?.map((pet: any) => ({ nome: pet.nome, tipo: pet.tipo, raca: pet.raca, genero: pet.genero })) || [],
        },
      },
      include: {
        cpf: true,
        rgs: true,
        telefones: true,
        pets: true,
      },
    });
    res.status(201).json(novoCliente);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar cliente', details: error });
  }
};

export const updateCliente = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { nome, nomeSocial } = req.body;
  try {
    const cliente = await prisma.cliente.update({
      where: { id },
      data: { nome, nomeSocial },
    });
    res.json(cliente);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar cliente', details: error });
  }
};

export const deleteCliente = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await prisma.cliente.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar cliente', details: error });
  }
}; 