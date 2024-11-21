-- AddForeignKey
ALTER TABLE "AdminAction" ADD CONSTRAINT "AdminAction_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;
