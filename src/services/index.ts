import { MockLawyerService } from './mock/lawyer.mock.service';
import { MockBookingService } from './mock/booking.mock.service';
import { MockMatterService } from './mock/matter.mock.service';
import { MockHearingService } from './mock/hearing.mock.service';
import { MockDocumentService } from './mock/document.mock.service';
import { MockMessageService } from './mock/message.mock.service';
import { MockPaymentService } from './mock/payment.mock.service';
import { MockNotificationService } from './mock/notification.mock.service';

import { ILawyerService } from './interfaces/lawyer.service.interface';
import { IBookingService } from './interfaces/booking.service.interface';
import { IMatterService } from './interfaces/matter.service.interface';
import { IHearingService } from './interfaces/hearing.service.interface';
import { IDocumentService } from './interfaces/document.service.interface';
import { IMessageService } from './interfaces/message.service.interface';
import { IPaymentService } from './interfaces/payment.service.interface';
import { INotificationService } from './interfaces/notification.service.interface';

// Service Factory / Singletons
export const lawyerService: ILawyerService = new MockLawyerService();
export const bookingService: IBookingService = new MockBookingService();
export const matterService: IMatterService = new MockMatterService();
export const hearingService: IHearingService = new MockHearingService();
export const documentService: IDocumentService = new MockDocumentService();
export const messageService: IMessageService = new MockMessageService();
export const paymentService: IPaymentService = new MockPaymentService();
export const notificationService: INotificationService = new MockNotificationService();
export { threadService } from './mock/thread.mock.service';

export * from './interfaces/lawyer.service.interface';
export * from './interfaces/booking.service.interface';
export * from './interfaces/matter.service.interface';
export * from './interfaces/hearing.service.interface';
export * from './interfaces/document.service.interface';
export * from './interfaces/message.service.interface';
export * from './interfaces/payment.service.interface';
export * from './interfaces/notification.service.interface';

