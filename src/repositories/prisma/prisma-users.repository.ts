import { Prisma, User } from '@prisma/client'

import { db } from '../../lib/prisma'
import { Pagination, PaginationReponse } from '../badges.repository'
import { UserRepository } from '../users.repository'

interface FetchUser {
  query?: string
}

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

  async fetch(
    { query }: FetchUser,
    pagination?: Pagination
  ): Promise<{
    users: Prisma.UserGetPayload<{
      select: { id: true; username: true; email: true; createdAt: true }
    }>[]
    pagination?: PaginationReponse
  }> {
    const [users, usersCount] = await db.$transaction([
      db.user.findMany({
        skip: pagination && pagination.limit * (pagination.page - 1),
        take: pagination && pagination.limit,
        where: {
          OR: query
            ? [
                {
                  username: {
                    contains: query,
                    mode: 'insensitive',
                  },
                },
                {
                  email: {
                    contains: query,
                    mode: 'insensitive',
                  },
                },
              ]
            : undefined,
        },
        select: {
          id: true,
          username: true,
          email: true,
          createdAt: true,
        },
      }),
      db.user.count({
        skip: pagination && pagination.limit * (pagination.page - 1),
        take: pagination && pagination.limit,
        where: {
          OR: query
            ? [
                {
                  username: {
                    contains: query,
                    mode: 'insensitive',
                  },
                },
                {
                  email: {
                    contains: query,
                    mode: 'insensitive',
                  },
                },
              ]
            : undefined,
        },
      }),
    ])

    const paginationBody = pagination && {
      total: usersCount,
      pageCount: Math.ceil(usersCount / pagination.limit),
      currentPage: pagination.page,
      perPage: pagination.limit,
      from: Math.min((pagination.page - 1) * pagination.limit + 1, usersCount),
      to: (pagination.page - 1) * pagination.limit + users.length,
    }

    return {
      users,
      pagination: paginationBody,
    }
  }
}
