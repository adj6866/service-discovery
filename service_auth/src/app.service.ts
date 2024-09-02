import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    return 'service authenticated';
  }

  async ingressCurl(): Promise<any> {
    try {
      const response = await axios({
        method: 'get',
        url: 'http://localhost/account/account/123',
      });
  
      return { message: 'curl from kubernetes.local', data: response.data }
    } catch (error) {
      this.logger.error('Failed to fetch account details', error.stack);
    }
  }

  async localCurl(): Promise<any> {
    try {
      const response = await axios({
        method: 'get',
        url: 'http://service-account/account/14',
      });
  
      return { message: 'curl from local service', data: response.data }
    } catch (error) {
      this.logger.error('Failed to fetch account details', error.stack);
    }
  }
}
