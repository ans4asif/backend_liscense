const { ADMINS, USER, ATTENDENCE, INSTRUCTORS } = require("../models/index");
const {
  encryptText,
  pagination,
  generatePdf,
  generatePdf2,
} = require("../utils/helpers");
const { live } = require("../config");
const pdfForm = require("../utils/template/pdfForms");
const attendenceForm = require("../utils/template/attendenceForm");
const fs = require("fs");

exports.signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const admin = await ADMINS.findOne({ email, password });
    if (admin) {
      res
        .status(200)
        .json({ success: true, message: "Signin successful!", admin });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to signin", error });
  }
};

exports.signUp = async (req, res, next) => {
  const { email, password, secret } = req.body;
  if (secret && secret === "548950") {
    const existingAdmin = await ADMINS.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        message: "Admin with the same email all ready exist",
      });
    }
    const newAdmin = new ADMINS({ email, password, admin_type: "SUPER_ADMIN" });
    const token = encryptText(
      JSON.stringify({ email: newAdmin.email, dateTime: new Date() })
    );
    newAdmin.token = token;
    newAdmin
      .save()
      .then(() => {
        res.status(200).json({ success: true, message: "Signup successful!" });
      })
      .catch((error) => {
        res.status(500).json({ message: "Failed to signup", error });
      });
  } else {
    return res
      .status(400)
      .json({ success: false, message: "Unauthorised User" });
  }
};
exports.deleteAdmin = async (req, res, next) => {
  const { email, secret } = req.body;
  if (secret && secret === "548950") {
    const existingAdmin = await ADMINS.deleteOne({ email })
      .then(() => {
        res
          .status(200)
          .json({ success: true, message: "Admin deleted successful!" });
      })
      .catch((error) => {
        res.status(500).json({ message: "Failed to delete", error });
      });
  } else {
    return res
      .status(400)
      .json({ success: false, message: "Unauthorised User" });
  }
};

exports.getStudentList = async (req, res, next) => {
  try {
    let students = await USER.find({ isDeleted: false })
      .select({ full_name: 1 })
      .sort([["created_at", -1]])
      .lean();
    const studentList = students.map((student) => ({
      value: student._id,
      label: student.full_name,
    }));
    res.status(200).json({ success: true, studentList });
  } catch (error) {
    console.log({ error });
    return next({
      code: 500,
      success: false,
      message: "Internal Server error",
      error,
    });
  }
};
exports.getUsers = async (req, res, next) => {
  try {
    let { page, itemsPerPage, searchText } = req.query;

    let query = {
      $and: [],
      $or: [],
    };
    query.$and = [
      {
        isDeleted: false,
      },
    ];
    if (searchText && searchText !== "") {
      query.$or = [
        {
          email: { $regex: ".*" + searchText + ".*", $options: "i" },
        },
        {
          full_name: { $regex: ".*" + searchText + ".*", $options: "i" },
        },
        {
          driving_lisence: { $regex: ".*" + searchText + ".*", $options: "i" },
        },
      ];
    }
    if (!query.$and.length > 0) {
      delete query.$and;
    }
    if (!query.$or.length > 0) {
      delete query.$or;
    }
    let totalItems = await USER.countDocuments(query);
    let admins = await USER.find(query)
      .sort([["created_at", -1]])
      .skip((+page - 1) * +itemsPerPage)
      .limit(+itemsPerPage)
      .lean();

    let data = pagination(admins, page, totalItems, itemsPerPage);
    res.status(200).json({ success: true, ...data });
  } catch (error) {
    return next({
      code: 500,
      success: false,
      message: "Internal Server error",
      error,
    });
  }
};

exports.downloadPdf = async (req, res, next) => {
  let browser, page;
  try {
    let { id, type } = req.query;
    console.log({ type });
    let hml;

    if (type === "attendence") {
      let attendence = await ATTENDENCE.findById(id);
      const student = attendence?.students;
      const studentList = [];
      for (let i = 1; i <= 20; i++) {
        const name = i <= student.length ? student[i - 1] : " ";
        studentList.push({ index: i, name });
      }
      hml = attendenceForm(attendence, studentList);
    } else {
      let user = await USER.findById(id);
      hml = pdfForm(user);
    }

    const puppeteer = require("puppeteer");
    const options = {
      headless: true,
      // headless: "new",
      executablePath: "/usr/bin/chromium-browser",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--no-first-run",
        "--no-zygote",
        // "--single-process", // <- this one doesn't works in Windows
      ],
      timeout: 90000,
    };
    console.log({ live });
    if (live == "false") {
      delete options.executablePath;
    }
    console.log("launching pupeteer");
    browser = await puppeteer.launch(options);
    console.log("new page");

    page = await browser.newPage();
    console.log("after new page");

    // Set a higher timeout for page operations
    await page.setDefaultNavigationTimeout(120000); // 120 seconds
    await page.setContent(hml, { waitUntil: "networkidle0" });
    await page.emulateMediaType("screen");

    await page.pdf({
      path: "./form.pdf",
      format: "A4",
      scale: 0.9,
      height: "700px",
      width: "700px",
      printBackground: true,
    });
    // await browser.close();

    res.setHeader("Content-disposition", "attachment; filename=orders.pdf");
    res.setHeader("Content-type", "application/pdf");
    fs.createReadStream("./form.pdf").pipe(res);

    setTimeout(() => {
      fs.unlinkSync("./form.pdf");
    }, 100);
  } catch (error) {
    console.log({ error });
    return next({
      code: 500,
      success: false,
      message: error?.message || "Internal Server error",
      error,
    });
  } finally {
    console.log("in finally");
    if (browser) {
      await browser.close();
    }
    // if (page) {
    //   await page.close();
    // }
  }
};

exports.createUser = async (req, res, next) => {
  const {
    email,
    full_name,
    address,
    city,
    postal_code,
    home_phone,
    cell_phone,
    emergency_contact,
    driving_lisence,
    gender,
    dob,
    issue_date,
    expiry_date,
    license_image,
    course,
    licence_type,
    in_class_instructor,
    in_car_instructor,
    in_car_driving_lisence,
    in_class_driving_lisence,
    course_start_date,
    courseEndDate,
    inst_lic_expiry,
    session_start_time,
    session_end_time,
    session_1_date,
    session_2_date,
    session_3_date,
    session_4_date,
    session_5_date,
    session_6_date,
    in_car_inst_lic_expiry,
    course_number,
  } = req.body;
  const existingUser = await USER.findOne({
    driving_lisence,
    isDeleted: false,
  });
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "User with the same Licence Number already exist",
    });
  }
  if ((license_image && license_image === undefined) || license_image === "") {
    license_image = null;
  }
  const lastUser = await USER.findOne().sort([["created_at", -1]]);
  const st_num = lastUser ? +lastUser?.student_number + 1 : 1000;
  const newUser = new USER({
    email,
    full_name,
    address,
    city,
    postal_code,
    province: "Ontario",
    home_phone,
    cell_phone,
    emergency_contact,
    driving_lisence,
    gender: gender?.value,
    dob,
    issue_date,
    expiry_date,
    course_start_date,
    courseEndDate,
    inst_lic_expiry,
    in_car_inst_lic_expiry,
    session_start_time,
    session_end_time,
    session_1_date,
    session_2_date,
    session_3_date,
    session_4_date,
    session_5_date,
    session_6_date,
    course_number,
    license_image,
    in_car_driving_lisence,
    in_class_driving_lisence,
    student_number: st_num,
    course: course?.value,
    licence_type: licence_type?.value,
    in_class_instructor,
    in_car_instructor,
    isDeleted: false,
  });
  newUser
    .save()
    .then(() => {
      res
        .status(200)
        .json({ success: true, message: "User created successful!", newUser });
    })
    .catch((error) => {
      console.log({ error });
      res.status(500).json({ message: "Failed to create User", error });
    });
};

exports.editUser = async (req, res, next) => {
  let id = req.params.id;
  const {
    email,
    full_name,
    address,
    city,
    postal_code,
    home_phone,
    cell_phone,
    emergency_contact,
    driving_lisence,
    gender,
    dob,
    issue_date,
    expiry_date,
    license_image,
    course,
    licence_type,
    in_class_instructor,
    in_car_instructor,
    course_start_date,
    courseEndDate,
    inst_lic_expiry,
    in_car_inst_lic_expiry,
    session_1_date,
    session_2_date,
    session_3_date,
    session_4_date,
    session_5_date,
    session_6_date,
    course_number,
    in_car_driving_lisence,
    in_class_driving_lisence,
  } = req.body;

  let img;
  if (license_image === undefined) {
    img = null;
  } else {
    img = license_image;
  }

  const same_lisence = await USER.findOne({
    driving_lisence,
    isDeleted: false,
    _id: { $ne: id },
  });
  if (same_lisence) {
    return res.status(409).json({
      success: false,
      message: "User with the same Licence Number already exist",
    });
  }

  const existingUser = await USER.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        email,
        full_name,
        address,
        city,
        postal_code,
        home_phone,
        cell_phone,
        province: "Ontario",
        emergency_contact,
        driving_lisence,
        gender: gender?.value,
        dob,
        issue_date,
        expiry_date,
        license_image: img,
        course: course.value,
        licence_type: licence_type?.value,
        in_class_instructor,
        course_start_date,
        courseEndDate,
        inst_lic_expiry,
        in_car_inst_lic_expiry,
        session_1_date,
        session_2_date,
        session_3_date,
        session_4_date,
        session_5_date,
        session_6_date,
        course_number,
        in_car_instructor,
        in_car_driving_lisence,
        in_class_driving_lisence,
        isDeleted: false,
      },
    }
  )
    .then(() => {
      res
        .status(200)
        .json({ success: true, message: "User edited successful!" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed to edit User", error });
    });
};

exports.deleteUser = async (req, res, next) => {
  let id = req.params.id;
  console.log(id);
  try {
    const user = await USER.findById({
      _id: id,
    });
    if (!user) {
      res
        .status(400)
        .json({ success: false, message: "Fail to remove user", err });
    } else {
      user.isDeleted = true;
      await user.save();
      res
        .status(200)
        .json({ success: true, message: "User deleted successful!" });
    }
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Fail to remove user", err });
  }
};
exports.getAttendence = async (req, res, next) => {
  try {
    let { page, itemsPerPage, searchText } = req.query;

    let query = {
      $and: [],
      $or: [],
    };
    if (searchText && searchText !== "" && searchText !== undefined) {
      query.$or = [
        {
          course_number: { $regex: ".*" + searchText + ".*", $options: "i" },
        },
        {
          inst_name: { $regex: ".*" + searchText + ".*", $options: "i" },
        },
        {
          session_date: { $regex: ".*" + searchText + ".*", $options: "i" },
        },
      ];
    }
    if (!query.$and.length > 0) {
      delete query.$and;
    }
    if (!query.$or.length > 0) {
      delete query.$or;
    }
    let totalItems = await ATTENDENCE.countDocuments(query);
    let admins = await ATTENDENCE.find(query)
      .sort([["created_at", -1]])
      .skip((+page - 1) * +itemsPerPage)
      .limit(+itemsPerPage)
      .lean();
    let data = pagination(admins, page, totalItems, itemsPerPage);
    res.status(200).json({ success: true, ...data });
  } catch (error) {
    return next({
      code: 500,
      success: false,
      message: "Internal Server error",
      error,
    });
  }
};
exports.createAttendance = async (req, res, next) => {
  const {
    students,
    course_number,
    session_number,
    session_date,
    session_start_time,
    session_end_time,
    inst_name,
    instr_driving_lisence,
    inst_expiry_date,
  } = req.body;

  const newAttendence = new ATTENDENCE({
    students,
    course_number,
    session_number,
    session_date,
    session_start_time,
    session_end_time,
    inst_name,
    instr_driving_lisence,
    inst_expiry_date,
  });
  newAttendence
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Attendence created successful!",
        newAttendence,
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed to create Attendence", error });
    });
};
exports.updateAttendance = async (req, res, next) => {
  const {
    students,
    course_number,
    session_number,
    session_date,
    session_start_time,
    session_end_time,
    inst_name,
    instr_driving_lisence,
    inst_expiry_date,
  } = req.body;

  //write the code to update the attendence
  try {
    const attendence = await ATTENDENCE.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          students,
          course_number,
          session_number,
          session_date,
          session_start_time,
          session_end_time,
          inst_name,
          instr_driving_lisence,
          inst_expiry_date,
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: "Attendence updated successfully!",
      newAttendence: attendence,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to update Attendence", error });
  }
};

exports.deleteAttendence = async (req, res, next) => {
  let id = req.params.id;
  try {
    console.log(id);
    const attendence = await ATTENDENCE.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Attendence sheeet removed succssfully",
      attendence,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Fail to remove attendence sheet",
      err,
    });
  }
};
exports.getPermissions = async (req, res) => {
  const { id } = req.query;

  if (id) {
    const admin = await ADMINS.findById(id);
    if (admin) {
      res.status(200).json({
        success: true,
        permissions: ["students", "attendence", "instructors"],
      });
    } else {
      res.status(401).json({ message: "Unable To Get Permissions" });
    }
  }
};

exports.createInstructor = async (req, res, next) => {
  try {
    const { driving_lisence, expiry_date, instructor, instructor_name } =
      req.body.payload;
    const existingUser = await INSTRUCTORS.findOne({ driving_lisence });
    if (existingUser) {
      return next({
        code: 409,
        success: false,
        message: "Instructor with the same Licence Number already exist",
      });
    }
    const newInstructor = new INSTRUCTORS({
      driving_lisence,
      expiry_date,
      instructor,
      instructor_name,
    });
    await newInstructor.save();
    return next({
      code: 200,
      success: true,
      message: "Instructor Created Successfully",
    });
  } catch (err) {
    return next({
      code: 500,
      success: false,
      message: "Internal Server error",
    });
  }
};

exports.getInstructors = async (req, res, next) => {
  try {
    let { page, itemsPerPage, searchText } = req.query;

    let query = {
      $and: [],
      $or: [],
    };
    if (searchText && searchText !== "") {
      query.$or = [
        {
          instructor_name: { $regex: ".*" + searchText + ".*", $options: "i" },
        },
      ];
    }
    if (!query.$and.length > 0) {
      delete query.$and;
    }
    if (!query.$or.length > 0) {
      delete query.$or;
    }
    let totalItems = await INSTRUCTORS.countDocuments(query);
    let instructors = await INSTRUCTORS.find(query)
      .sort([["created_at", -1]])
      .skip((+page - 1) * +itemsPerPage)
      .limit(+itemsPerPage)
      .lean();

    let data = pagination(instructors, page, totalItems, itemsPerPage);
    res.status(200).json({ success: true, ...data });
  } catch (error) {
    return next({
      code: 500,
      success: false,
      message: "Internal Server error",
      error,
    });
  }
};

exports.editInstructor = async (req, res, next) => {
  try {
    let id = req.params.id;
    const { driving_lisence, expiry_date, instructor, instructor_name } =
      req.body;

    const same_lisence = await INSTRUCTORS.findOne({
      driving_lisence,
      _id: { $ne: id },
    });
    if (same_lisence) {
      return next({
        code: 409,
        success: false,
        message: "Instructor with the same Licence Number already exist",
      });
    }

    await INSTRUCTORS.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          driving_lisence,
          expiry_date,
          instructor,
          instructor_name,
        },
      }
    );

    return next({
      code: 200,
      success: true,
      message: "Instructor updated Successfully",
    });
  } catch (err) {
    return next({
      code: 500,
      success: false,
      message: "Internal Server error",
      error,
    });
  }
};

exports.deleteInstructor = async (req, res, next) => {
  let id = req.params.id;
  try {
    const instructor = await INSTRUCTORS.findByIdAndDelete({
      _id: id,
    });
    if (!instructor) {
      return next({
        code: 500,
        success: false,
        message: "Internal Server error",
        error,
      });
    } else {
      return next({
        code: 200,
        success: true,
        message: "Instructor deleted Successfully",
      });
    }
  } catch (err) {
    return next({
      code: 500,
      success: false,
      message: "Internal Server error",
      error,
    });
  }
};

exports.getInstructorsList = async (req, res, next) => {
  try {
    const in_car_instructors = await INSTRUCTORS.find({
      instructor: { $in: ["In-Car"] },
    })
      .select({ instructor_name: 1, driving_lisence: 1 })
      .sort([["created_at", -1]])
      .lean();
    const in_class_instructors = await INSTRUCTORS.find({
      instructor: { $in: ["In-Class"] },
    })
      .select({ instructor_name: 1, driving_lisence: 1 })
      .sort([["created_at", -1]])
      .lean();
    res.status(200).json({
      success: true,
      in_car_instructors,
      in_class_instructors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server error",
      error,
    });
  }
};

exports.getSingleInstructor = async (req, res, next) => {
  try {
    let id = req.params.id;
    const singleInstructor = await INSTRUCTORS.findOne({ _id: id })
      .select({ instructor_name: 1, driving_lisence: 1, expiry_date: 1 })
      .lean();
    res.status(200).json({
      success: true,
      singleInstructor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server error",
      error,
    });
  }
};
