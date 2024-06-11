import { Prisma, User } from '@prisma/client'

import { db } from '../../lib/prisma'
import { UserRepository } from '../users.repository'

export class PrismaUserRepository implements UserRepository {
  async create(data: Prisma.UserUncheckedCreateInput): Promise<User> {
    const user = await db.user.create({
      data,
    })

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await db.user.findUnique({
      where: { email },
    })

    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = await db.user.findUnique({
      where: { id },
    })

    return user
  }
}
