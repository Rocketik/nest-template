import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { createTransport, Transporter } from "nodemailer";
import { MailOptions } from "nodemailer/lib/smtp-pool";
import { CANT_SEND_EMAIL } from "./error-codes";

@Injectable()
export class LibService {
  constructor(private jwt: JwtService, private configService: ConfigService) {}
  private secret: string = this.configService.get("JWT_SECRET");
  async signToken(payload: Record<string, any>, expire_time: number = 365 * 24 * 60 * 60) {
    return this.jwt.sign(payload, {
      secret: this.secret,
      expiresIn: expire_time
    });
  }
  async verifyToken<t extends object>(token: string, secret?: string) {
    return this.jwt.verify<t>(token, {
      secret: secret || this.secret
    });
  }

  async sendMail(subject: string, content: string, reciever: string | string[], isContentHtml = false): Promise<void> {
    const email = this.configService.get("EMAIL_USER");

    const transporter: Transporter = createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: this.configService.get("EMAIL_PASS")
      }
    });
    const mailOptions: MailOptions = {
      from: email,
      to: reciever,
      subject,
      [isContentHtml ? "html" : "text"]: content
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (err) {
      throw new HttpException(
        CANT_SEND_EMAIL(Array.isArray(reciever) ? reciever.join(",") : reciever),
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
