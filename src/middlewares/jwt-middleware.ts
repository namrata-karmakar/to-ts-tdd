import jsonwebtoken from 'jsonwebtoken';
import { config } from '../config/config';

class JWTMiddleware {
  static createToken(): string {
    return jsonwebtoken.sign({}, config.get('secretString'), {
      expiresIn: '999h',
    });
  }

  static verifyToken(req, res, next): void {
    const jwt: string = req.headers['x-token-header'];
    if (!jwt) {
      res.status(403).send({ message: 'No token provided!' });
    } else {
      jsonwebtoken.verify(jwt, config.get('secretString'), (err) => {
        if (err) {
          res.status(403).send(err);
        } else {
          next();
        }
      });
    }
  }
}

export { JWTMiddleware };
