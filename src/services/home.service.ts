import { DecodedIdToken, getAuth } from "firebase-admin/auth";
import firebaseApp from "../../app";

export class HomeService {
  async welcome(token: string): Promise<DecodedIdToken> {
    const userInfo = await getAuth(firebaseApp).verifyIdToken(token);
    return userInfo;
  }
}
