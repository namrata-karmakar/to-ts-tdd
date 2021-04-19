/* eslint-disable consistent-return */
import { Request, Response, Router } from 'express';
import { validationResult, Result, ValidationError } from 'express-validator';
import { Database, InsertParams } from '../database';
import { SignUpSchema } from '../validations/signup-validations/signup-schema-validations';
import { SchemaMiddleware } from '../validations/schema-middleware';
import { UserAuthentication } from '../authentication/user-authentication';
import { JWTMiddleware } from '../middlewares/jwt-middleware';

class UserRouter {
  static getUserRouter(): Router {
    const router = Router();

    router.post(
      '/signUp',
      SchemaMiddleware.validate(SignUpSchema),
      async (req: Request, res: Response) => {
        const errors: Result<ValidationError> = validationResult(req);
        if (errors.isEmpty() === false) {
          return res.status(400).json({ errors: errors.array() });
        }
        let response = '';
        let status = 0;
        try {
          const insertOneParams: InsertParams = {
            data: req.body,
            collection: 'userData',
          };
          const db: Database = new Database();
          response = await db.insertOne(insertOneParams);
          status = 201;
        } catch (e) {
          console.error(`[ERROR] ${e.message}-${e.stack}`);
          response = e.message;
          status = 500;
        } finally {
          res.status(status).send(response);
        }
      },
    );

    router.post('/login', async (req, res) => {
      let response = '';
      let status = 0;
      try {
        const { username } = req.body;
        const { password } = req.body;
        const checkCredentials = await UserAuthentication.authenticateUser(
          username,
          password,
        );
        if (checkCredentials === 1) {
          response = JWTMiddleware.createToken();
          status = 202;
        } else {
          response = 'Invalid Credentials';
          status = 401;
        }
      } catch (e) {
        console.error(`[ERROR] ${e.message}-${e.stack}`);
        response = e.message;
        status = 500;
      } finally {
        res.status(status).send(response);
      }
    });

    return router;
  }
}

export { UserRouter };
