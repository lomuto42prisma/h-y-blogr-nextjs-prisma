

// pages/api/post/[id].ts

import { Post } from '@prisma/client';
import prisma from '../../../lib/prisma';

// DELETE /api/post/:id
export default async function handle(req: { query: { id: any; }; method: string; }, res: { json: (arg0: Post) => void; }) {
  const postId = req.query.id;
  if (req.method === 'DELETE') {
    const post = await prisma.post.delete({
      where: { id: postId },
    });
    res.json(post);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}



