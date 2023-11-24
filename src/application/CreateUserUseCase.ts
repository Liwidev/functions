import "reflect-metadata";
import { injectable, inject } from "inversify";
import { TYPES } from "../../types";
import { IUserRepository } from "../shared/IUserRepository";
import { IUseCase } from "../shared/IUseCase";
import { ICreateUserDTO, ICreateUserResult } from "./interfaces/ICreateUser";



/**
 * Create User Use case Implementation
 */
@injectable()
export class CreateUserUseCase implements IUseCase<ICreateUserDTO, ICreateUserResult> {

  private _UserRepository: IUserRepository;

  /**
   * @param {IUserRepository} userRepository Repository used to create User
   */
  public constructor(
    @inject(TYPES.repositories.firebase) userRepository: IUserRepository
  ) {
    this._UserRepository = userRepository;
  }

  /**
   * Execute the Use Case
   * @param {User} input User Object
   * @return {Promise<ICreateUserResult>} The User object created
   */
  public async execute(input: ICreateUserDTO): Promise<ICreateUserResult> {
    const result = await this._UserRepository.save(input);

    if (!result) throw new Error("Could not save User");

    const payload: ICreateUserResult = {
      data: input,
      timestamp: new Date(),
    };

    return payload

  }
}
