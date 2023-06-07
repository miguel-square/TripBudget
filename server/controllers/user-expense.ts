import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

async function createUserExpense(req: Request, res: Response) {
  const { user_id, expense_id, is_owner, ratio, paid } = req.body;
  const userExpense = await prisma.user_expense.create({
    data: {
      user_id,
      expense_id,
      is_owner,
      ratio,
      paid,
    },
  });
  res.status(201).json(userExpense);
}

async function getAllUserExpenses(req: Request, res: Response) {
  const userExpenses = await prisma.user_expense.findMany({});
  if (userExpenses && userExpenses.length > 0) {
    res.status(200).json(userExpenses);
  } else {
    res.sendStatus(204);
  }
}

async function updateUserExpense(req: Request, res: Response) {
  const { userExpenseId } = req.params;
  const { user_id, expense_id, is_owner, ratio, paid } = req.body;
  await prisma.user_expense.update({
    where: {
      id: parseInt(userExpenseId),
    },
    data: {
      user_id,
      expense_id,
      is_owner,
      ratio,
      paid,
    },
  });
  res.sendStatus(204);
}

async function getUserExpenseById(req: Request, res: Response) {
  const userExpenseId = parseInt(req.params["id"]);
  const userExpense = await prisma.user_expense.findUnique({
    where: { id: userExpenseId },
  });
  if (userExpense) {
    res.status(200).json(userExpense);
  } else {
    res.status(404).json("Cannot find userExpense by id");
  }
}

// TODO: make soft remove
async function deleteUserExpenseById(req: Request, res: Response) {
  try {
    const userExpenseId = parseInt(req.params["id"]);
    await prisma.user_expense.delete({
      where: {
        id: userExpenseId,
      },
    });
    return res.status(204);
  } catch (err) {
    return res.status(500).json("Cannot delete userExpense by id");
  }
}

const userExpenseController = {
  createUserExpense,
  getAllUserExpenses,
  getUserExpenseById,
  updateUserExpense,
  deleteUserExpenseById,
};

export { userExpenseController };
