-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ConsumoProduto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 1,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ConsumoProduto_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ConsumoProduto_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ConsumoProduto" ("clienteId", "data", "id", "produtoId", "quantidade") SELECT "clienteId", "data", "id", "produtoId", "quantidade" FROM "ConsumoProduto";
DROP TABLE "ConsumoProduto";
ALTER TABLE "new_ConsumoProduto" RENAME TO "ConsumoProduto";
CREATE TABLE "new_ConsumoServico" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "servicoId" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 1,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ConsumoServico_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ConsumoServico_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "Servico" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ConsumoServico" ("clienteId", "data", "id", "quantidade", "servicoId") SELECT "clienteId", "data", "id", "quantidade", "servicoId" FROM "ConsumoServico";
DROP TABLE "ConsumoServico";
ALTER TABLE "new_ConsumoServico" RENAME TO "ConsumoServico";
CREATE TABLE "new_Pet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "raca" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "clienteId" INTEGER NOT NULL,
    CONSTRAINT "Pet_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Pet" ("clienteId", "genero", "id", "nome", "raca", "tipo") SELECT "clienteId", "genero", "id", "nome", "raca", "tipo" FROM "Pet";
DROP TABLE "Pet";
ALTER TABLE "new_Pet" RENAME TO "Pet";
CREATE TABLE "new_RG" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "valor" TEXT NOT NULL,
    "dataEmissao" DATETIME NOT NULL,
    "clienteId" INTEGER NOT NULL,
    CONSTRAINT "RG_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_RG" ("clienteId", "dataEmissao", "id", "valor") SELECT "clienteId", "dataEmissao", "id", "valor" FROM "RG";
DROP TABLE "RG";
ALTER TABLE "new_RG" RENAME TO "RG";
CREATE TABLE "new_Telefone" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ddd" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "clienteId" INTEGER NOT NULL,
    CONSTRAINT "Telefone_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Telefone" ("clienteId", "ddd", "id", "numero") SELECT "clienteId", "ddd", "id", "numero" FROM "Telefone";
DROP TABLE "Telefone";
ALTER TABLE "new_Telefone" RENAME TO "Telefone";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
