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
@Entity("questions_delected", { schema: "beedoo_challenge" })
export class QuestionsDelected {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "id_question" })
  idQuestion: number;

  @Column("datetime", {
    name: "delected_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  delectedAt: Date;

  @ManyToOne(() => Questions, (questions) => questions.questionsDelecteds, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_question", referencedColumnName: "id" }])
  idQuestion2: Questions;
}
