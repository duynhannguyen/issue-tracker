-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "authorId" VARCHAR(255) NOT NULL DEFAULT 'admin';

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
