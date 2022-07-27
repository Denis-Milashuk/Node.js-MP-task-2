import customPassport from "passport";
import LocalStrategy from "passport-local";
import BearerStrategy from "passport-http-bearer-base64";
import userService from "../../service/UserService";
import { UserEntity } from "../../model/entity/UserEntity";
import jwt from "jsonwebtoken";

customPassport.use(
  new LocalStrategy.Strategy({ session: false }, async (username, password, done) => {
    let user: UserEntity | null = null;
    try {
      user = await userService.getByLogin(username);
    } catch (error) {
      done(error);
    }
    if (!user || user.password !== password) {
      return done(null, false);
    } else {
      done(null, user);
    }
  })
);

customPassport.use(
  new BearerStrategy.Strategy((token, done) => {
    if (!token) {
      return done(null, false);
    }
    jwt.verify(token, process.env.JWT_SECRET || "secret", (error) => {
      if (error) {
        return done(null, false);
      } else {
        return done(null, true, { scope: "all" });
      }
    });
  })
);

export default customPassport;
