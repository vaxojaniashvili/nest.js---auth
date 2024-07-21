import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://vaxojaniashvili:vaxojaniashvili@mongo-auth.2senoh7.mongodb.net/?retryWrites=true&w=majority&appName=Mongo-auth',
    ),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
