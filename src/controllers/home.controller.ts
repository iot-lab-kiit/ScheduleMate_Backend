import { Request, Response } from "express";
import {getAuth} from "firebase-admin/auth";
import firebaseApp from "../../server";

export async function welcome(req: Request, res: Response): Promise<Response> {
  console.log(req.body);
  const userInfo = await getAuth(firebaseApp).verifyIdToken(req.body.token);
  return res.send(userInfo);
}
