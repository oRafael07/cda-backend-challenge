import { hash } from 'bcrypt'

import { Either, left, right } from '../../lib/either'
import { UserRepository } from '../../repositories/users.repository'

interface CreateUserUseCaseRequest {
  username: string
  email: string
  password: string
}

type CreateUserUseCaseResponse = Either<
  { message: string },
  {
    user: {
      id: string
      username: string
      email: string
      createdAt: Date
    }
  }
>

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(
    data: CreateUserUseCaseRequest
  ): Promise<CreateUserUseCaseResponse> {
    const userExists = await this.userRepository.findByEmail(data.email)

    if (userExists)
      return left({
        message: 'Este usuário já possui registro.',
      })

    const passwordHash = await hash(data.password, 8)

    const user = await this.userRepository.create({
      email: data.email,
      password: passwordHash,
      username: data.username,
    })

    return right({
      user: {
        ...user,
        password: undefined,
      },
    })
  }
}
