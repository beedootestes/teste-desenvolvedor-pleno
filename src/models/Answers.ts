import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Questions } from "./Questions";

@Index("id_question", ["idQuestion"], {})
@Entity("answers", { schema: "beedoo_challenge" })
export class Answers {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "id_question" })
  idQuestion: number;

  @Column("varchar", { name: "answers", length: 500 })
  answers: string;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", {
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @ManyToOne(() => Questions, (questions) => questions.answers, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_question", referencedColumnName: "id" }])
  idQuestion2: Questions;
}
