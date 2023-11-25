import "reflect-metadata";
import { injectable, inject } from "inversify";
import * as logger from "firebase-functions/logger";
import { Response, Request } from "express";
import { UseCase } from "../../../shared/domain/interface/UseCase";
import { TYPES } from "../../../config/ioc/types";
import { Controller } from "../../../shared/domain/interface/Controller";
import { CreateUserDTO, CreateUserResult } from "../domain/ICreateUser";
import { UserSchema } from "../../../shared";

/**
 * Controller in charge of handle User Creation
 */
@injectable()
export class CreateUserController implements Controller {

  private _UseCase: UseCase<CreateUserDTO, CreateUserResult>;

  /**
   * @param {CreateUserUseCase} _UseCase Use Case mapped to this controller
   */
  public constructor(
    @inject(TYPES.UseCases.creatUser) UseCase: UseCase<CreateUserDTO, CreateUserResult>
  ) {
    this._UseCase = UseCase;
  }

  /**
   * @param {Request} request Request with paylod of user to create
   * @param {Response} response Callback function that will handle response
   * @return {CreateUserResult} Result Payload
   */
  public async handler(request: Request, response: Response): Promise<void> {
    try {
      logger.info("Controller - Create User Controller", { structuredData: true });
      
      const query: CreateUserDTO = UserSchema.parse(request.body);
      const queryResponse: CreateUserResult = await this._UseCase.execute(query);

      response.send(queryResponse);
    } catch (error: unknown) {
      logger.error("Controller - Get all Users Controller", { structuredData: true });

      if (error instanceof Error) {
        response.status(500).send(error)
      } else {
        throw new Error("Unindentified Error")
      }

    }
  }
}
