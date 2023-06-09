import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';
import { TeachersModule } from './teachers/teachers.module';
import { UploadModule } from './upload/upload.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { NewsModule } from './news/news.module';
import { ScheduleModule } from './schedule/schedule.module';
import { CoursesModule } from './courses/courses.module';
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UsersModule,
    TeachersModule,
    UploadModule,
    MulterModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'files'),
    }),
    NewsModule,
    ScheduleModule,
    CoursesModule,
    GroupsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
