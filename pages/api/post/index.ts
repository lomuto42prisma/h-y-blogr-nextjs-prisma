

//

import { getServerSession } from "next-auth/next";
import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { title, content } = req.body;

  // console.log("req:", req);
  // console.log("getSession", getSession);

  const session = await getServerSession(req, res, authOptions);

  console.log("the session:", session);

  if (!session) {
    res.status(401).json({ message: "You must be logged in to create a post." });
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    res.status(404).json({ message: "User not found." });
    return;
  }

  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      authorId: user.id,
    },
  });

  res.json(result);
}



