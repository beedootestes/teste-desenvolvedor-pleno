import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Exclude } from 'class-transformer';

@Index('sentence_pkey', ['id'], { unique: true })
@Entity('sentence', { schema: 'public' })
class Sentence {
  @PrimaryGeneratedColumn({ name: 'id', type: 'smallint' })
  id: number;

  @Column('smallint', { name: 'question', nullable: true })
  question: number;

  @Column('character varying', { name: 'text', length: 256 })
  text: string;

  @Column('character varying', { name: 'type', length: 12 })
  type: 'QUESTION' | 'ANSWER';

  @Exclude()
  @Column('boolean', { name: 'enabled', nullable: true, default: true })
  enabled: boolean | null;

  @Exclude()
  @CreateDateColumn({ type: 'time with time zone' })
  issuedAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'time with time zone' })
  updatedAt: Date;

  @ManyToOne(() => Sentence, (sentence) => sentence.answer)
  @JoinColumn([{ name: 'question' }])
  question_: Sentence;

  @OneToMany(() => Sentence, (sentence) => sentence.question_)
  answer: Sentence[];
}

export default Sentence;
