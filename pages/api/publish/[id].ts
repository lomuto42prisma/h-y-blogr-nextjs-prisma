
// pages/api/publish/[id].ts

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

// PUT /api/publish/:id
export default async function handle(req, res: NextApiResponse) {
  const postId = req.query.id;
  const post = await prisma.post.update({
    where: { id: postId },
    data: { published: true },
  });
  res.json(post);
}




