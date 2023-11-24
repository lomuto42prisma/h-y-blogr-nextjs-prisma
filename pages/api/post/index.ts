

// pages/api/post/index.ts

import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';
import { Post } from '@prisma/client';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: { body: { title: any; content: any; }; }, res: { json: (arg0: Post) => void; }) {
  const { title, content } = req.body;

  const session = await getSession({ req });
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}




