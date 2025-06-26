import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailService } from './mail.service';

@Processor('mail')
export class MailProcessor {
  constructor(private mailService: MailService) {}

  @Process('send-email')
  async handleSendEmail(job: Job) {
    try {
      const { to, subject, template, context, attachment } = job.data;
      await this.mailService.sendEmail(
        to,
        subject,
        template,
        context,
        attachment,
      );
    } catch (error) {
      console.error('Error al enviar correo:', error);
    }
  }
}
