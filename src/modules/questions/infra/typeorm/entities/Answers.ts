import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  
  @Entity('answers')
  class Answer {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    title: string;

    @Column()
    question_id: string;
  
    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
  }
  export { Answer };
  