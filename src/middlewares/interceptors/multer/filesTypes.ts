import { MulterField } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
// import { Field } from "multer";

export const possibleFiles: { [key: string]: MulterField[] } = {
  company_register: [{ name: "avatar", maxCount: 1 }, { name: "files" }],
  order: [{ name: "images" }],
  equipment: [{ name: "images" }],
  send_file_in_order_chat: [{ name: "files" }],
  send_file_in_company_chat: [{ name: "files" }],
  send_file_in_customer_chat: [{ name: "files" }]
};
const types: Record<string, Record<string, { mime_type?: string; format?: string }>> = {
  company_register: { avatar: { mime_type: "image" }, files: { mime_type: "image", format: "pdf" } }
};

export default types;
