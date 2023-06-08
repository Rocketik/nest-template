import { HttpException, HttpStatus } from "@nestjs/common";
import { diskStorage, Options } from "multer";
import { VALIDATION_ERROR, WRONG_PARAMS } from "src/lib/error-codes";
import files_types from "./filesTypes";

export const NO_FILTER = "no-filter";

const multerOptions: (files_type_key?: string) => Options = files_type_key => ({
  storage: diskStorage({
    destination(req, file, cb) {
      cb(null, `public/protected_files`);
    },
    filename(req, file, cb) {
      const fileName = Date.now() + `--` + file.originalname.replace(/ +/g, "_");

      cb(null, fileName);
    }
  }),
  fileFilter(req, file, cb) {
    const [fileType, fileFormat] = file.mimetype.split(`/`);

    if (!files_type_key) {
      if (fileType != `image`) cb(new HttpException(WRONG_PARAMS, HttpStatus.NOT_ACCEPTABLE));
    } else if (files_type_key != NO_FILTER) {
      const currentType = files_types[files_type_key];
      if (currentType) {
        const validMimeTypes = currentType[file.fieldname]?.mime_type ? currentType[file.fieldname].mime_type.split(`/`) : [];
        const checkMimeType = validMimeTypes.length && !validMimeTypes.includes(fileType);

        const validFormats = currentType[file.fieldname]?.format ? currentType[file.fieldname].format.split(`/`) : [];
        const checkFormat = validFormats.length && !validFormats.includes(fileFormat);
        if (checkFormat && checkMimeType)
          cb(new HttpException(VALIDATION_ERROR(`'${file.fieldname}' must be in incorrect format`), HttpStatus.NOT_ACCEPTABLE));
      }
    }
    cb(null, true);
  }
});

export default multerOptions;
