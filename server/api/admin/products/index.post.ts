import fs from "fs";
import path from "path";
import db from "~/utils/db";
import { productSchema } from "~/utils/validation";

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  if (session?.user && session?.user?.role != "ADMIN") {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized, You don't have ADMIN access",
    });
  }

  const parts = await readMultipartFormData(event);
  if (!parts) {
    throw createError({
      statusCode: 400,
      statusMessage: "No form data received",
    });
  }
  const uplaodedFilePath: string[] = [];
  const formData: { [key: string]: any } = {};

  for (const part of parts) {
    if (part.filename) {
      const filePath = path.join(
        process.cwd(),
        "public/products",
        part.filename
      );
      fs.writeFileSync(filePath, part.data);
      uplaodedFilePath.push(part.filename);
    } else {
      if (part.name) formData[part.name] = part.data.toString("utf-8");
    }
  }

  // const validated = await readValidatedBody(event, (body) =>
  //   productSchema.parse(body)
  // );
  const validated = productSchema.parse({
    name: formData.name,
    categoryId: formData.categoryId,
    colorId: formData.colorId,
    price: Number(formData.price),
    sizeId: formData.sizeId,
    isFeatured: Boolean(formData.isFeatured),
    isArchived: Boolean(formData.isArchived),
    images: undefined,
  });
  const product = await db.product.create({
    // @ts-ignore
    data: {
      ...validated,
      images: {
        createMany: { data: uplaodedFilePath.map((path) => ({ url: path })) },
      },
      userId: session.user.id,
    },
  });
  return { product };
});
