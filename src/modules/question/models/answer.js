import mongoose from '../../../config/db/db-connecion'
import {Schema} from 'mongoose'

export const Answer = mongoose.model(
  'Answer',
  new Schema({
    answer: { 
      type: String,
      required: true
    },
    questionId: { 
      type: Schema.Types.ObjectId,
      ref:'Answer',
      required: true
    },
  })
)