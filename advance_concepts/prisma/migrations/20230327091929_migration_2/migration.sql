/*
  Warnings:

  - A unique constraint covering the columns `[tweetid]` on the table `bookmarks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "bookmarks_tweetid_key" ON "bookmarks"("tweetid");
