import { unlink } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Deletes a file from the public/uploads directory
 * @param filename - The name of the file to delete (e.g., "image.jpg")
 * @param subfolder - Optional subfolder within public/uploads (e.g., "products")
 * @returns Promise<boolean> - true if deleted successfully, false if file didn't exist
 * @throws Error if deletion fails for other reasons
 */
export async function deleteServerFile(
  filename: string,
  subfolder: string = ""
): Promise<boolean> {
  try {
    // Get the root directory of the project
    const __dirname = fileURLToPath(new URL(".", import.meta.url));

    // Construct the full path to the file
    // const basePath = join(__dirname, "../../../../public/");
    const basePath = join(__dirname, "../../public/");
    const filePath = join(basePath, subfolder, filename);

    // Delete the file
    await unlink(filePath);
    return true;
  } catch (error: any) {
    if (error.code === "ENOENT") {
      throw new Error(`File not found: ${error.message}`);
    }
    throw new Error(`Failed to delete file: ${error.message}`);
  }
}
