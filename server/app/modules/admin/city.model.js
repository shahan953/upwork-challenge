import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import timestamp from 'mongoose-timestamp';
import { CRUD } from '@util';

const citySchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  name: {
    type: String,
    unique: true
  },
  state_id: {
    type: Number
  },
  country_id: {
    type: Number
  }
});


citySchema.plugin(uniqueValidator);
citySchema.plugin(timestamp);

const cityModel = mongoose.model('city', citySchema);
const cityCrud = new CRUD(cityModel);

export {
  cityModel,
  cityCrud
};
