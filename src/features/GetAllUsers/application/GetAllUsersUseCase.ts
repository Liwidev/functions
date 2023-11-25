import { IUserRepository } from "../../../shared/domain/interface/IUserRepository";
import { IUseCase } from "../../../shared/domain/interface/IUseCase";
import { IGetAllUsersDTO, IGetAllUsersResult } from "../domain/IGetAllUsers";

/**
 * Get all Users Use case Implementation
 */
export class GetAllUsersUseCase implements IUseCase<any, any> {
  /**
   * @param {IUserRepository} _UserRepository Repository used to get all Users
   */
  public constructor(private readonly _UserRepository: IUserRepository) { }

  /**
   * Execute the Use Case
   * @param {User} input User Object
   * @return {Promise<ICreateUserResult>} List with all users found && Timestamp of execution
   */
  public async execute(input: IGetAllUsersDTO): Promise<IGetAllUsersResult> {
    const result = await this._UserRepository.getAll();

    if (!result) throw new Error("Could not get Users");

    const payload: IGetAllUsersResult = {
      users: result,
      timestamp: new Date(),
    };

    return payload;
  }
}