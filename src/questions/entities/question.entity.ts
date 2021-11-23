import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { v4 as uuidv4 } from 'uuid';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  question: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @BeforeInsert()
  generatedId() {
    if (this.id) {
      return;
    }

    this.id = uuidv4();
  }

  constructor(todo?: Partial<Question>) {
    this.id = todo?.id;
    this.question = todo?.question;
    this.created_at = todo?.created_at;
  }
}
