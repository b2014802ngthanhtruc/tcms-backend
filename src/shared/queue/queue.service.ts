// Inject queue name and add job or get job

import { BadRequestException, Injectable } from "@nestjs/common";

import { JobOptions, Queue } from "bull";
import { QUEUE_NAMES } from "./constants";
import { InjectQueue } from "@nestjs/bull";

export const DEFAULT_OPTS: JobOptions = {
  attempts: 3, // The total number of attempts to try the job until it completes.
  removeOnComplete: false, // If true, removes the job when it successfully completes. A number specifies the amount of jobs to keep.
  // Default behavior is to keep the job in the completed set.
};

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue(QUEUE_NAMES.AUTH_QUEUE) private readonly _authQueue: Queue,
    @InjectQueue(QUEUE_NAMES.OWNER_QUEUE) private readonly _ownerQueue: Queue,
    @InjectQueue(QUEUE_NAMES.PATIENT_QUEUE)
    private readonly _patientQueue: Queue,
    @InjectQueue(QUEUE_NAMES.NURSE_QUEUE) private readonly _nurseQueue: Queue,
    @InjectQueue(QUEUE_NAMES.DOCTOR_QUEUE) private readonly _doctorQueue: Queue
  ) {} //

  async addJob(job: any) {
    const { queueName, proccessName, payload, opts } = job;
    switch (queueName) {
      case QUEUE_NAMES.AUTH_QUEUE:
        try {
          const result = await this._authQueue.add(proccessName, payload, opts);
        } catch (error) {
          console.log(error);
        }
        break;
      case QUEUE_NAMES.OWNER_QUEUE:
        try {
          const result = await this._ownerQueue.add(
            proccessName,
            payload,
            opts
          );
        } catch (error) {
          console.log(error);
        }
        break;
      case QUEUE_NAMES.PATIENT_QUEUE:
        try {
          const result = await this._patientQueue.add(
            proccessName,
            payload,
            opts
          );
        } catch (error) {
          console.log(error);
        }
        break;
      case QUEUE_NAMES.NURSE_QUEUE:
        try {
          const result = await this._nurseQueue.add(
            proccessName,
            payload,
            opts
          );
        } catch (error) {
          console.log(error);
        }
        break;
      case QUEUE_NAMES.DOCTOR_QUEUE:
        try {
          const result = await this._doctorQueue.add(
            proccessName,
            payload,
            opts
          );
        } catch (error) {
          console.log(error);
        }
        break;
      default:
        throw new BadRequestException(
          "Queue name not match because can not add job"
        );
    }
  }
}
