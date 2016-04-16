var mongoose = require('mongoose');

var beerSchema = mongoose.Schema({
  name: { type: String },
  brewery: { type: String },
  taste: {
    crisp: { type: Number },
    hop: { type:Number },
    nut: { type: Number },
    fruit: { type: Number },
    cream: { type: Number },
    dry: { type: Number },
    sweet: { type: Number },
    bitter: { type: Number },
    spicy: { type: Number },
    sour: { type: Number }
  },
  nutritional_value: {
    abv: { type: Number },
    ibu: { type: Number },
    calories: { type: Number }
  }
}, {
  timestamps: true
  }
});

module.exports = mongoose.model('Beer', beerSchema);
