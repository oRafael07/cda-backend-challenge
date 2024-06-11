import { compare } from 'bcrypt'

import { Either, left, right } from '../../lib/either'
import { UserRepository } from '../../repositories/users.repository'

interface AuthenticateUserUseCaseRequest {
  email: string
  password: string
}

type AuthenticateUserUseCaseResponse = Either<
  {
    message: string
  },
  {
    user: {
      id: string
      username: string
      email: string
    }
  }
>

export class AuthenticateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    data: AuthenticateUserUseCaseRequest
  ): Promise<AuthenticateUserUseCaseResponse> {
    const userExists = await this.userRepository.findByEmail(data.email)

    if (!userExists)
      return left({
        message: 'Email/Senha incorretos',
      })

    const passwordMatch = await compare(data.password, userExists.password)

    if (!passwordMatch)
      return left({
        message: 'Email/Senha incorretos',
      })

    return right({
      user: {
        ...userExists,
        password: undefined,
      },
    })
  }
}
