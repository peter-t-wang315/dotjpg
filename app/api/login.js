import { serialize } from 'cookie';
import { prisma } from '@/lib/prisma';

export default async function handler(req, res) {
  const {email, password} = await req.json();
  // TODO: Use bcrypt and hash passwords?
  const user = await prisma.Users.findUnique({
    where: {
      email: email,
      password: password
    }
  });

  if(user == undefined || user === null) {
    return res.status(401).json({ message: 'Invalid Credentials'});
  }

  const encryptedSessionData = encrypt(user.email);
 
  const cookie = serialize('session', encryptedSessionData, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 7, // One week
    path: '/',
  })
  res.setHeader('Set-Cookie', cookie)
  res.status(200).json({ message: 'Successfully set cookie!' })
}