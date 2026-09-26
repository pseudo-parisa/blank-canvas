import { Controller, Get } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service.js";

@Controller()
export class AppController {
    constructor(private readonly prisma: PrismaService) {}

    @Get()
    getHealth() {
        return {
            message: "Blank Canvas API is running!",
        };
    }

    @Get("health/database")
    async databaseHealth() {
        await this.prisma.$queryRaw`SELECT 1`;

        return {
            database: "connected",
        };
    }
}