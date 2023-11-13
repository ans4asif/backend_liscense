const mongoose = require('mongoose');

const USERS =   new mongoose.Schema(
  {
    email: {
      type: String,
    },
    full_name: {
      type: String,
      required: true,
    },
    student_number: {
      type: String,
      required: true,
    },
    address: {
        type: String,
        default: '',
    },
    city: {
        type: String,
    },
    province: {
        type: String,
    },
    postal_code: {
        type: String,
    },
    home_phone: {
        type: String,
    },
    cell_phone: {
        type: String,
    },
    emergency_contact: {
        type: String,
    },
    driving_lisence: {
        type: String,
        required: true,
    },
    in_car_driving_lisence: {
        type: String,
    },
    in_class_driving_lisence: {
        type: String,
    },
    gender: {
        type: String,
    },
    course: {
        type: String,
    },
    in_class_instructor: {
        type: String,
    },
    in_car_instructor: {
        type: String,
    },
    licence_type: {
        type: String,
    },
    dob: {
        type: String,
    },
    issue_date: {
        type: String,
    },
    expiry_date: {
        type: String,
    },
    course_start_date: {
        type: String,
    },
    courseEndDate: {
        type: String,
    },
    inst_lic_expiry: {
        type: String,
    },
    in_car_inst_lic_expiry: {
        type: String,
    },
    session_1_date: {
        type: String,
    },
    session_2_date: {
        type: String,
    },
    session_3_date: {
        type: String,
    },
    session_4_date: {
        type: String,
    },
    session_5_date: {
        type: String,
    },
    session_6_date: {
        type: String,
    },
    course_number: {
        type: String,
    },
    license_image: {
        type: String,
        default: '',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
    
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

module.exports = mongoose.model('users', USERS);
