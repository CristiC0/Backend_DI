import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  async create(createNewsDto: CreateNewsDto, request: Request) {
    const userId = (
      JSON.parse(
        Buffer.from(request.cookies.token?.split('.')[1], 'base64').toString(),
      ) as any
    ).id;

    const news = await this.prisma.news.create({
      data: {
        author: { connect: { id: userId } },
        ...createNewsDto,
      },
    });
    return { message: 'News created', news };
  }

  async findAll() {
    const news = await this.prisma.news
      .findMany({
        include: { author: { select: { username: true, id: true } } },
      })
      .then((news) => this.formatNewsList(news));
    return news;
  }

  async findOne(id: string) {
    const news = await this.prisma.news
      .findUnique({
        where: { id: id },
        include: { author: { select: { username: true } } },
      })
      .then((news) => this.formatNews(news));
    return news;
  }

  async update(id: string, updateNewsDto: UpdateNewsDto) {
    await this.prisma.news.update({
      where: { id },
      data: { ...updateNewsDto },
    });

    return { message: 'News updated!' };
  }

  async remove(id: string) {
    await this.prisma.news.delete({ where: { id } });
    return { message: 'News deleted!' };
  }

  formatNews = (news: any) => {
    const newNews = { ...news, author: news.author.username };
    return newNews;
  };

  formatNewsList = (news: any) => {
    return news.map((currentNews) => {
      const newNews = {
        ...currentNews,
        author: currentNews.author.username,
        authorId: currentNews.author.id,
      };
      return newNews;
    });
  };
}
