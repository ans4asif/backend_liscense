const mongoose = require('mongoose');

const ATTENDENCE =   new mongoose.Schema(
  {
    students: {
      type: Array,
      required: true,
    },
    course_number: {
      type: String,
      required: true,
    },
    session_number: {
        type: String,
        default: '',
    },
    session_date: {
        type: String,
        default: '',
    },
    session_start_time: {
        type: String,
    },
    session_end_time: {
        type: String,
    },
    inst_name: {
        type: String,
    },
    instr_driving_lisence: {
        type: String,
    },
    inst_expiry_date: {
        type: String,
        default: '',
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

module.exports = mongoose.model('Attendence', ATTENDENCE);
