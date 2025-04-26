import fs from "fs";
import path from "path";
import db from "~/utils/db";
export default defineEventHandler(async (event) => {
  const files = await readMultipartFormData(event);
  if (!files) {
    return createError({
      statusCode: 400,
      data: "File(s) Ivalid",
    });
  }
  const uplaodedFilePath: string[] = [];
  files.forEach((file) => {
    if (file.filename) {
      const filePath = path.join(
        process.cwd(),
        "public/products",
        file.filename
      );
      fs.writeFileSync(filePath, file.data);
      uplaodedFilePath.push(file.filename);
    }
  });
  const productId = event.context.params?.productId;
  if (!productId) {
    throw createError({ statusCode: 404, statusMessage: "Product not found" });
  }
  const product = await db.product.update({
    where: { id: productId },
    data: {
      images: {
        createMany: {
          data: uplaodedFilePath.map((path) => ({ url: path })),
        },
      },
    },
    include: {
      category: true,
      color: true,
      size: true,
      images: true,
    },
  });
  return product;
});
