import mongoose from '../../../config/db/db-connecion'
import {Schema} from 'mongoose'

export const Question = mongoose.model(
  'Question',
  new Schema({
    question: { 
      type: String,
      required: true
    }
  },
  {timeseries: true}
  )
)