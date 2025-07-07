import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getPets = async (req: Request, res: Response) => {
  const pets = await prisma.pet.findMany({
    include: {
      cliente: true,
    },
  });
  res.json(pets);
};

export const getPetById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const pet = await prisma.pet.findUnique({
    where: { id },
    include: {
      cliente: true,
    },
  });
  if (!pet) return res.status(404).json({ error: 'Pet não encontrado' });
  res.json(pet);
};

export const createPet = async (req: Request, res: Response) => {
  try {
    const { nome, tipo, raca, genero, clienteId } = req.body;
    const novoPet = await prisma.pet.create({
      data: {
        nome,
        tipo,
        raca,
        genero,
        clienteId,
      },
      include: {
        cliente: true,
      },
    });
    res.status(201).json(novoPet);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar pet', details: error });
  }
};

export const updatePet = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { nome, tipo, raca, genero } = req.body;
  try {
    const pet = await prisma.pet.update({
      where: { id },
      data: { nome, tipo, raca, genero },
    });
    res.json(pet);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar pet', details: error });
  }
};

export const deletePet = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await prisma.pet.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar pet', details: error });
  }
}; 