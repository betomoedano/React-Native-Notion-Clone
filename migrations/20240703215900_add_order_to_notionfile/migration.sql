-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_NotionFile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "coverPhoto" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "parentFileId" INTEGER,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "NotionFile_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "NotionFile_parentFileId_fkey" FOREIGN KEY ("parentFileId") REFERENCES "NotionFile" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_NotionFile" ("authorId", "content", "coverPhoto", "createdAt", "description", "icon", "id", "parentFileId", "title", "type", "updatedAt") SELECT "authorId", "content", "coverPhoto", "createdAt", "description", "icon", "id", "parentFileId", "title", "type", "updatedAt" FROM "NotionFile";
DROP TABLE "NotionFile";
ALTER TABLE "new_NotionFile" RENAME TO "NotionFile";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
