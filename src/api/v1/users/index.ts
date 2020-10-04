import { Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import usersService from './../../../services/users';
import { path } from './../index';

/**
 * @swagger
 *
 * definition:
 *    users:
 *      properties:
 *        users:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *            name:
 *              type: string
 *            username:
 *              type: string
 *            email:
 *              type: string
 *            address:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  street:
 *                     type: string
 *                  suite:
 *                     type: string
 *                  city:
 *                     type: string
 *                  zipcode:
 *                     type: string
 *                  geo:
 *                     type: array
 *                     items:
 *                        type: object
 *                        properties:
 *                            lat:
 *                                type: string
 *                            lng:
 *                                type: string
 *            phone:
 *              type: string
 *            website:
 *              type: string
 *            company:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  name:
 *                     type: string
 *                  catchPhrase:
 *                     type: string
 *                  bs:
 *                     type: string
 *
 * /users:
 *    get:
 *      tags:
 *       - "users"
 *      summary: "return all API users "
 *      consumes:
 *        - "application/json"
 *      produces:
 *        - "application/json"
 *      responses:
 *        200:
 *          description: "Successful operation"
 *          schema:
 *            $ref: '#/definitions/users'
 *        500:
 *          description: "Error getting all the resources"
 *    post:
 *      tags:
 *       - "users"
 *      summary: "store all API users "
 *      consumes:
 *        - "application/json"
 *      produces:
 *        - "application/json"
 *      responses:
 *        201:
 *          description: "Successful operation"
 *        500:
 *          description: "Error storing all the users"
 */

export default [
  {
    path: `${path}/users`,
    method: 'get',
    handler: [
      async (Req: Request, res: Response, next: NextFunction) => {
        try {
          let usersServiceInstance = Container.get(usersService);
          let users = await usersServiceInstance.getUsers();
          res.api.status = 200;
          res.status(res.api.status);
          res.api.data.push(users);
          res.send(res.api);
        } catch (error) {
          next(error);
        }
      },
    ],
  },
  {
    path: `${path}/users`,
    method: 'post',
    handler: [
      async (Req: Request, res: Response, next: NextFunction) => {
        try {
          let usersServiceInstance = Container.get(usersService);
          let users = await usersServiceInstance.storeUsers();
          res.api.status = 201;
          res.status(res.api.status);
          res.api.data.push(users);
          res.send(res.api);
        } catch (error) {
          next(error);
        }
      },
    ],
  },
];
