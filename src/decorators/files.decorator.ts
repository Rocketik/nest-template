import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import * as sharp from "sharp";
import * as fs from "fs/promises";

export const Files = createParamDecorator(
  async (payload: { optimize: boolean; optimizable_files?: string[] }, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest() as Request;
    const mimetypes: Record<string, string | string[]> = {};
    const result: Record<string, string[] | string> = {};

    // multer single
    if (req.file) {
      result[req.file.fieldname] = req.file.filename;
      mimetypes[req.file.fieldname] = req.file.mimetype.split("/")[0];
    } else if (req.files) {
      // multer array
      if (Array.isArray(req.files)) {
        result[req.files[0].fieldname] = req.files.map(file => file.filename);
        mimetypes[req.files[0].fieldname] = req.files.map(file => file.mimetype.split("/")[0]);
      } else {
        // multer fields
        for (const fieldname in req.files) {
          result[fieldname] =
            req.files[fieldname].length == 1 ? req.files[fieldname][0].filename : req.files[fieldname].map(file => file.filename);
          mimetypes[fieldname] =
            req.files[fieldname].length == 1
              ? req.files[fieldname][0].mimetype.split("/")[0]
              : req.files[fieldname].map(file => file.mimetype.split("/")[0]);
        }
      }
    }

    if (payload.optimize) {
      function optimizeFile(fileName: string) {
        const originalPath = `public/protected_files/${fileName}`;
        const destionation = originalPath.replace(/\.\w+$/, ".webp");
        return sharp(originalPath)
          .rotate()
          .resize(1000)
          .withMetadata()
          .webp({ quality: 80 })
          .toFile(destionation)
          .then(() => fs.unlink(originalPath))
          .catch(err => console.log(err));
      }

      try {
        const optimizations = [];

        for (const key in result) {
          if (!payload.optimizable_files?.length || payload.optimizable_files.includes(key)) {
            if (Array.isArray(result[key])) {
              const optimazable_files = (result[key] as string[]).filter((el, i) => mimetypes[key][i] == "image");
              optimizations.push(Promise.all(optimazable_files.map(value => optimizeFile(value))));
            } else if (mimetypes[key] == "image") optimizations.push(optimizeFile(result[key] as string));
          }
        }
        await Promise.all(optimizations);
      } catch (err) {
        console.error(err);
      }
      for (const key in result) {
        if (!payload.optimizable_files?.length || payload.optimizable_files.includes(key))
          if (Array.isArray(result[key])) {
            result[key] = (result[key] as string[]).map((el, i) =>
              mimetypes[key][i] == "image" ? el.replace(/\.\w+$/, ".webp") : el
            );
          } else if (mimetypes[key] == "image") result[key] = (result[key] as string).replace(/\.\w+$/, ".webp");
      }
    }

    return result;
  }
);
