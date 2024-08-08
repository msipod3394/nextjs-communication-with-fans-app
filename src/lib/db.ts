import { PrismaClient } from "@prisma/client";

// グローバルオブジェクトにcachePrismaを宣言
declare global {
  var cachePrisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

// 本番環境
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // 開発環境
  // キャッシュされていなければ、インスタンス作成
  if (!global.cachePrisma) {
    global.cachePrisma = new PrismaClient();
  }
  // キャッシュされているインスタンスを使用
  prisma = global.cachePrisma;
}

export const db = prisma;
