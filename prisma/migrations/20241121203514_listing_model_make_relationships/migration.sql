-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_makeId_fkey" FOREIGN KEY ("makeId") REFERENCES "Make"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
