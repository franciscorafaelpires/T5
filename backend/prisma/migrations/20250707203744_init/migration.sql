-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "nomeSocial" TEXT NOT NULL,
    "cpfId" INTEGER NOT NULL,
    "dataCadastro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Cliente_cpfId_fkey" FOREIGN KEY ("cpfId") REFERENCES "CPF" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Cliente" ("cpfId", "dataCadastro", "id", "nome", "nomeSocial") SELECT "cpfId", "dataCadastro", "id", "nome", "nomeSocial" FROM "Cliente";
DROP TABLE "Cliente";
ALTER TABLE "new_Cliente" RENAME TO "Cliente";
CREATE UNIQUE INDEX "Cliente_cpfId_key" ON "Cliente"("cpfId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
