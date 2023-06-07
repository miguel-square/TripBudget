import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

async function createExpense(req: Request, res: Response) {
  const { description, value, date, event_id, currency_id } = req.body;
  const expense = await prisma.expense.create({
    data: {
      description,
      value,
      date,
      currency_id,
      event_id,
    },
  });
  res.status(201).json(expense);
}

async function getAllExpenses(req: Request, res: Response) {
  const expenses = await prisma.expense.findMany({});
  if (expenses && expenses.length > 0) {
    res.status(200).json(expenses);
  } else {
    res.sendStatus(204);
  }
}

async function updateExpense(req: Request, res: Response) {
  const { expenseId } = req.params;
  const { description, value, date, event_id, currency_id } = req.body;
  await prisma.expense.update({
    where: {
      id: parseInt(expenseId),
    },
    data: {
      description,
      value,
      date,
      event_id,
      currency_id,
    },
  });
  res.sendStatus(204);
}

async function getExpenseById(req: Request, res: Response) {
  const expenseId = parseInt(req.params["id"]);
  const expense = await prisma.expense.findUnique({
    where: { id: expenseId },
  });
  if (expense) {
    res.status(200).json(expense);
  } else {
    res.status(404).json("Cannot find expense by id");
  }
}

// TODO: make soft remove
async function deleteExpenseById(req: Request, res: Response) {
  try {
    const expenseId = parseInt(req.params["id"]);
    await prisma.expense.delete({
      where: {
        id: expenseId,
      },
    });
    return res.status(204);
  } catch (err) {
    return res.status(500).json("Cannot delete expense by id");
  }
}

const expenseController = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpenseById,
};

export { expenseController };
