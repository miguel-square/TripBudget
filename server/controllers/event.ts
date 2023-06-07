import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

async function createEvent(req: Request, res: Response) {
  const { name, start_date, end_date, type_id } = req.body;
  const event = await prisma.event.create({
    data: {
      name,
      start_date,
      end_date,
      type_id,
    },
  });
  res.status(201).json(event);
}

async function getAllEvents(req: Request, res: Response) {
  const events = await prisma.event.findMany({});
  if (events && events.length > 0) {
    res.status(200).json(events);
  } else {
    res.sendStatus(204);
  }
}

async function updateEvent(req: Request, res: Response) {
  const { eventId } = req.params;
  const { name, start_date, end_date, type_id } = req.body;
  await prisma.event.update({
    where: {
      id: parseInt(eventId),
    },
    data: {
      name,
      start_date,
      end_date,
      type_id,
    },
  });
  res.sendStatus(204);
}

async function getEventById(req: Request, res: Response) {
  const eventId = parseInt(req.params["id"]);
  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });
  if (event) {
    res.status(200).json(event);
  } else {
    res.status(404).json("Cannot find event by id");
  }
}

async function deleteEventById(req: Request, res: Response) {
  try {
    const eventId = parseInt(req.params["id"]);
    await prisma.event.delete({
      where: {
        id: eventId,
      },
    });
    return res.status(204);
  } catch (err) {
    return res.status(500).json("Cannot delete event by id");
  }
}

const eventController = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEventById,
};

export { eventController };
