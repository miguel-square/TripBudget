import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

async function getAllUsers(req: Request, res: Response) {
  const users = await prisma.user.findMany({
    select: { email: true, id: true },
  });
  if (users && users.length > 0) {
    res.status(200).json(users);
  } else {
    res.sendStatus(204);
  }
}

const usersController = {
  getAllUsers,
};

export { usersController };
