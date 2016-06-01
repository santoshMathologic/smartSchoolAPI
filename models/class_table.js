var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;
var classSchema = new mongoose.Schema({
    class_Name: { type: String, default: '' },
    Other_class: { type: String, default: '' },
    section_1: { type: String, default: 'Section1' },
    section_2: { type: String, default: 'Section1' },
    section_3: { type: String, default: 'Section3' },
    section_4: { type: String, default: 'Section4' },
    section_5: { type: String, default: 'Section5' },
    section_6: { type: String, default: 'Section6' },
    section_7: { type: String, default: 'Section7' },
    section_8: { type: String, default: 'Section8' },
    section_9: { type: String, default: 'Section9' },
    section_10: { type: String, default: 'Section10' },
    markDelete: { type: Boolean, default: false },
    year_fees: { double : SchemaTypes.Double},
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    createdTime: { type: Date, default: Date.now }
})
module.exports = mongoose.model('class_table', classSchema);