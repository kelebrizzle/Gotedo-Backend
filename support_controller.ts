import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import SupportRequest from 'App/Models/SupportRequest';
import User from 'App/Models/User';
import Helpers from '@ioc:Adonis/Core/Helpers';

export default class SupportController {
  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['first_name', 'last_name', 'email', 'title', 'text']);
    const file = request.file('file');

    // Validate data
    await request.validate({ schema: request.validate('SupportRequest') });

    // Create or find user
    const user = await User.firstOrCreate({ email: data.email }, { email: data.email, full_name: `${data.first_name} ${data.last_name}` });

    // Save support request
    const supportRequest = new SupportRequest();
    supportRequest.fill(data);
    await user.related('supportRequests').save(supportRequest);

    // Handle file upload
    if (file) {
      await file.move(Helpers.tmpPath('uploads'), {
        name: `${user.id}_${new Date().getTime()}.${file.extname}`,
      });

      if (!file.moved()) {
        return file.error();
      }
    }

    return response.status(201).json({ message: 'Support request submitted successfully' });
  }
}

