import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { v4 as uuidv4 } from 'uuid';
import { Question } from './question.entity';

@Entity('question_answers')
export class QuestionAnswer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  answer: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Column()
  question_id: string;

  @ManyToOne(() => Question, (question) => question.answers)
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @BeforeInsert()
  generatedId() {
    if (this.id) {
      return;
    }

    this.id = uuidv4();
  }

  constructor(todo?: Partial<QuestionAnswer>) {
    this.id = todo?.id;
    this.answer = todo?.answer;
    this.question_id = todo?.question_id;
    this.created_at = todo?.created_at;
  }
}
