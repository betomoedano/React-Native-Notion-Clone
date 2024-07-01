-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "NotionFile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "coverPhoto" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "parentFileId" INTEGER,
    CONSTRAINT "NotionFile_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "NotionFile_parentFileId_fkey" FOREIGN KEY ("parentFileId") REFERENCES "NotionFile" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
