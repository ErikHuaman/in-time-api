import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(
    to: string,
    subject: string,
    template: string,
    context: any,
    attachment: {
      filename: string;
      content: Buffer;
    },
  ) {
    console.log('Procesando correo para', to);
    await this.mailerService.sendMail({
      to,
      subject,
      template,
      context,
      attachments: [
        {
          filename: attachment.filename,
          content: Buffer.from(attachment.content), // fuerza a ser Buffer plano
          contentType: 'application/pdf',
        },
      ],
    });

    console.log('Correo enviado a', to);
  }
}
