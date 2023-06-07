import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

async function createEventUser(req: Request, res: Response) {
  const { user_id, event_id, is_admin } = req.body;
  const eventUser = await prisma.event_user.create({
    data: {
      user_id,
      event_id,
      is_admin,
    },
  });
  res.status(201).json(eventUser);
}

async function getAllEventUsers(req: Request, res: Response) {
  const eventUsers = await prisma.event_user.findMany({});
  if (eventUsers && eventUsers.length > 0) {
    res.status(200).json(eventUsers);
  } else {
    res.sendStatus(204);
  }
}

async function updateEventUser(req: Request, res: Response) {
  const { eventUserId } = req.params;
  const { user_id, event_id, is_admin } = req.body;
  await prisma.event_user.update({
    where: {
      id: parseInt(eventUserId),
    },
    data: {
      user_id,
      event_id,
      is_admin,
    },
  });
  res.sendStatus(204);
}

async function getEventUserById(req: Request, res: Response) {
  const eventUserId = parseInt(req.params["id"]);
  const eventUser = await prisma.event_user.findUnique({
    where: { id: eventUserId },
  });
  if (eventUser) {
    res.status(200).json(eventUser);
  } else {
    res.status(404).json("Cannot find event-user relation by id");
  }
}

async function deleteEventUserById(req: Request, res: Response) {
  try {
    const eventUserId = parseInt(req.params["id"]);
    await prisma.event_user.delete({
      where: {
        id: eventUserId,
      },
    });
    return res.status(204);
  } catch (err) {
    return res.status(500).json("Cannot delete event-user relation by id");
  }
}

const eventUserController = {
  createEventUser,
  getAllEventUsers,
  getEventUserById,
  updateEventUser,
  deleteEventUserById,
};

export { eventUserController };
