import { Injectable } from '@nestjs/common';
import { Books, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(createBookDto: Prisma.BooksCreateInput) {
    return this.prisma.books.create({
      data: createBookDto,
    });
  }

  async findAll() {
    return this.prisma.books.findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.books.findUnique({
      where: { id },
    });
  }

  async update(params: {
    where: Prisma.BooksWhereUniqueInput;
    data: Prisma.BooksUpdateInput;
  }): Promise<Books> {
    const { data, where } = params;
    return this.prisma.books.update({ data, where });
  }

  async delete(where: Prisma.BooksWhereUniqueInput): Promise<Books> {
    return this.prisma.books.delete({ where });
  }
}
