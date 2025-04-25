import fs from "fs";
import path from "path";
export default defineEventHandler(async (event) => {
  //   try {
  const files = await readMultipartFormData(event);
  if (!files) {
    return createError({
      statusCode: 400,
      data: "File(s) Invalid",
    });
  }
  const uplaodedFilePath: string[] = [];
  files.forEach((file) => {
    if (file.filename) {
      const filePath = path.join(process.cwd(), "public/test", file.filename);
      fs.writeFileSync(filePath, file.data);
      uplaodedFilePath.push(file.filename);
    }
  });
  return uplaodedFilePath;
  //   } catch (error) {
  //     return createError({
  //       statusCode: 500,
  //       data: "Something went wrong with the server",
  //     });
  //   }
});
