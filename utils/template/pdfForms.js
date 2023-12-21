const moment = require('moment');

module.exports = data => `
<html>
  <head>
    <title>PDF Template</title>
    <meta charset="utf-8" />
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      *,
      html {
        margin: 0;
        padding: 0;
      }

      * {
        box-sizing: border-box;
      }

      p {
        margin: 0 0 5px;
      }

      body {
        color: #000;
        font: bold 18px/24px "Times New Roman", Times, serif;
        margin: 0;
        padding: 2px;
        background: #fff;
      }
      .container {
        max-width: 1100px;
        margin: 0 auto;
      }
      #wrapper {
        padding: 25px;
      }
      .page-header {
        margin-top: 20px !important;
        max-width: 600px;
        font-weight: bold;
        text-align: center;
        margin: 0 auto 20px;
      }
      .page-header h1 {
        font-size: 40px;
        line-height: 45px;
        margin: 0 0 5px;
      }
      .page-header p {
        margin: 0;
      }

      .page-header2 {
        width: 100%;
        font-weight: bold;
        text-align: center;
        margin: 0 auto 20px;
      }
      .page-header2 h1 {
        font-size: 40px;
        line-height: 45px;
        margin: 0 0 15px;
      }

      .student-number {
        width: 100%;
        padding: 6px 0;
        font-weight: bold;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        gap: 5px;
      }
      .student-number .text {
        min-width: 150px;
        font-size: 22px;
        font-weight: normal;
        border-bottom: 1px solid #000;
      }

      .bottom_fields {
        margin-bottom: 20px;
      }

      .heading {
        display: block;
        font-size: 28px;
        line-height: 32px;
        font-weight: bold;
        text-transform: uppercase;
        margin: 0 0 5px;
        letter-spacing: 0.5px;
        text-shadow: 4px 1px rgba(0, 0, 0, 0.3);
      }
      .field-box {
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        flex-grow: 1;
        gap: 5px;
        margin: 0 0 25px;
      }
      .field-box-st-num {
        width: 40%;
        position: relative;
        display: flex;
        align-items: center;
        flex-grow: 1;
        gap: 5px;
        margin: 0 0 25px;
      }
      .field-box-st-num .field-num-text {
        flex-grow: 1;
        font-weight: normal;
        font-size: 22px;
        border-bottom: 1px solid #000;
        text-transform: capitalize;
      }
      .field-box2 {
        width: 100%;
        position: relative;
        display: flex;
        flex-grow: 1;
        gap: 5px;
        margin: -12 0 2px 0;
      }
      .field-box .gender-box {
        flex-shrink: 0;
        width: 185px;
      }
      .field-box .abs-text {
        font-size: 14px;
        line-height: 16px;
        position: absolute;
        left: 50%;
        bottom: -17px;
        transform: translateX(-50%);
      }
      .field-box .label {
        display: block;
      }
      .field-box .field-text {
        flex-grow: 1;
        margin-left: 3px;
        font-weight: normal;
        font-size: 22px;
        border-bottom: 1px solid #000;
        text-transform: capitalize;
      }
      .field-box2 .label {
        display: block;
      }
      .field-box2 .field-text {
        flex-grow: 1;
        margin-left: 3px;
        font-weight: normal;
        font-size: 22px;
        border-bottom: 1px solid #000;
        text-transform: capitalize;
      }
      .flex-wrap {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .flex-wrap2 {
        display: flex;
        justify-content: space-around;
      }
      .flex-wrap2 .field-box{
      font-size: 15px;
      margin: 0 0 6px;
      }

      .flex-wrap2 .test {
        width: 250px;
        font-size: 14px;
      }

      .gender-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
      }
      .gender-list li {
        border: 1px solid #000;
        padding: 3px 5px;
        margin: 0 0 0 -1px;
      }
      .licence-type {
        align-self: flex-start;
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
      }
      .licence-type {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
      }
      .licence-type li {
        border: 1px solid #000;
        padding: 3px 5px;
        margin: 0 0 0 -1px;
      }
      .checkbox-wrap {
        display: flex;
        justify-content: space-between;
        gap: 5px;
      }
      .check-box {
        display: flex;
        align-items: center;
        gap: 5px;
      }
      .check-box .label {
        font-size: 14px;
        line-height: 17px;
        text-transform: capitalize;
      }
      .check-box .checkbox {
        width: 20px;
        height: 20px;
        border: 1px solid #000;
      }
      .tick {
        position: absolute;
      margin-left: 2px;
      font-size: 18px;
       }
      .term-condition {
        overflow: hidden;
        padding-top: 15px;
      }
      text-box-p p{
        font-size: 14px,
        line-height: 18px,
        margin-bottom: 2px
      }
      .term-condition .title {
        display: block;
        font-size: 22px;
        line-height: 25px;
        font-weight: bold;
        margin: 0 0 5px;
        text-transform: capitalize;
      }
      .order-list {
        font-size: 14px;
        list-style: 16px;
        margin: 0 0 10px;
        padding: 0 0 0 20px;
        font-weight: normal;
        font-family: Arial, Helvetica, sans-serif;
      }
      .order-list li {
        margin: 0 0 1px;
      }
      .breakable-div {
        page-break-inside: avoid;
        page-break-after: always;
        page-break-before: always;
      }
      .grey-line {
        display: block;
        height: 12px;
        margin-bottom: 2px;
        border-top: 10px solid #c7bbbb;
      }
      table.unstyledTable.styled2.tdSize td,
      table.unstyledTable.styled2.tdSize th {
        height: 50px;
      }
      table.unstyledTable {
        width: 100%;
        border-spacing: 0;
        border-width: 1px 1px 0 0;
        border-style: solid;
        font-weight: bold;
        border-color: #000000;
      }
      table.unstyledTable.styled2 td,
      table.unstyledTable.styled2 th {
        height: 35px;
      }

      table.unstyledTable td,
      table.unstyledTable th {
        height: 25px;
        border-width: 0 0 1px 1px;
        border-style: solid;
        border-color: #000000;
        /* border: 1px solid #000000; */
      }
      table.unstyledTable thead th {
        font-weight: bolder;
        text-align: center;
      }
      table.unstyledTable tfoot {
        font-weight: bold;
      }
      .container-table-form {
        display: flex;
        gap: 10px;
        margin-bottom: 10px;
      }
      .column-table {
        flex: 1;
      }

      .column-form {
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      .form-sub {
        display: flex;
        flex-direction: column;
      }

      .student-box {
        padding: 5px 80px 5px 5px;
        border: 2px solid #000000;
      }
      .flex-wrap img {
        width: 260mm;
        margin-bottom: 20px;
      }
      
      .img-wraper img {
        display: flex;
        margin: 0 auto;
        width: 600px;
        height: 400px;
        padding: 25px
      }
      .col-wrap {
        display: flex;
        justify-content: space-between;
        margin: 0;
      }
      .col-wrap .box {
        width: 45%;
      }
      .col-wrap .box .field-box {
        margin-bottom: 5px;
      }
      .input-box {
        width: 100px;
        padding: 5px 8px;
        height: 35px;
        border: 1px solid #000;
      }
      .paragraph {
        width: 100%;
        font-size: 10px
        font-weight: normal;
        margin: -2px !important;
      }
      .paragraph p strong {
        margin: 0;
        font-weight: 200;
      }
      
    </style>
  </head>
  <body>
    <div id="wrapper">
      <div class="container">
        <div class="breakable-div">
          <div class="page-header" style="margin-top: -15px  !important;">
            <h1>LICENCE 2 DRIVE</h1>
            <div >
              <p>
                Approved by Ministry of Transportation. Ontario 
              </p>
              <p>
                213-1425 Dundas Street East, MISSISSAUGA, Ontario. L4X 2W5  
              </p>
              <p>PH #:416 939 8696. <u>licence2driver@gmail.com</u></p>
              <p><u>www.licence2drive.ca</u></p>
            </div>
          </div>
          <div class="student-number">
            Student Number: <span class="text">${data.student_number}</span>
          </div>
          <span class="heading">Registration From</span>
          <div class="field-box">
            <span class="label">Mr./Ms./Miss:</span>
            <span class="field-text">${data.full_name}</span>
            <span class="abs-text">Full Name</span>
          </div>
          <div class="field-box">
            <span class="label">Address:</span>
            <span class="field-text">${data.address}</span>
            <span class="abs-text">Complete</span>
          </div>
          <div class="flex-wrap">
            <div class="field-box">
              <span class="label">City:</span>
              <span class="field-text">${data.city}</span>
            </div>
            <div class="field-box">
              <span class="label">Province:</span>
              <span class="field-text">${data.province}</span>
            </div>
            <div class="field-box">
              <span class="label">Postal Code:</span>
              <span class="field-text">${data.postal_code}</span>
            </div>
          </div>
          <div class="flex-wrap">
            <div class="field-box">
              <span class="label">Home Phone #:</span>
              <span class="field-text">${data.home_phone}</span>
            </div>
            <div class="field-box">
              <span class="label">Cellular #:</span>
              <span class="field-text">${data.cell_phone}</span>
            </div>
          </div>
          <div class="flex-wrap">
            <div class="field-box">
              <span class="label">Email:</span>
              <span class="field-text">${data.email ? data.email : '&nbsp;'}</span>
            </div>
            <div class="field-box">
              <span class="label">Emergency Contact #</span>
              <span class="field-text">${data.emergency_contact ? data.emergency_contact : '&nbsp;'}</span>
            </div>
          </div>
          <div class="flex-wrap">
            <div class="field-box">
              <span class="label">Driving Licence #:</span>
              <span class="field-text">${data.driving_lisence}</span>
            </div>
            <ul class="licence-type">
            ${data.licence_type === 'G1' ? `<li>G1</li>` : data.licence_type === 'G2' ? `<li>G2</li>` : `<li>G</li>`}
            </ul>
            <div class="field-box gender-box">
              <span class="label">Gender:</span>
              <ul class="gender-list">
                ${data.gender === 'Male'
    ? `<li>Male</li>`
    : data.gender === 'Female'
      ? `<li>Female</li>`
      : `<li>Other</li>`
  }
              </ul>
            </div>
          </div>
          <div class="flex-wrap">
            <div class="field-box">
              <span class="label">Issue Date:</span>
              <span class="field-text">${data.issue_date ? moment(data.issue_date).format('YYYY-MMM-DD') : ' '}</span>
            </div>
            <div class="field-box">
              <span class="label">Expiry Date:</span>
              <span class="field-text">${data.expiry_date ? moment(data.expiry_date).format('YYYY-MMM-DD') : ''}</span>
            </div>
            <div class="field-box">
              <span class="label">Date of Birth:</span>
              <span class="field-text">${moment(data.dob).format('YYYY-MMM-DD')}</span>
            </div>
          </div>
          <div class="checkbox-wrap">
            <span class="title">Course (Please check one)</span>
            <div class="check-box">
             <span class="tick">${data?.course === 'Individual Lessons' ? `&#10004` : ``}</span>
              <span class="checkbox"></span>
              <span class="label">Individual lessons </span>
            </div>
            <div class="check-box">
            <span class="tick">${data?.course === 'Others' ? `&#10004` : ``}</span>
              <span class="checkbox"></span>
              <span class="label">Others</span>
            </div>
            <div class="check-box">
            <span class="tick">${data?.course === 'Full Course' ? `&#10004` : ``}</span>
              <span class="checkbox"></span>
              <span class="label">Full Course</span>
            </div>
            <div class="check-box">
            <span class="tick">${data?.course === 'Full Course With Car Road Test' ? `&#10004` : ``}</span>
              <span class="checkbox"></span>
              <span class="label">Full course with car road test</span>
            </div>
          </div>
          <div class="term-condition">
            <strong class="title">Terms and Conditions</strong>
            <ol class="order-list">
              <li>
                Students registered for full course must attend 20 hours of
                lessons in- class lessons along with 10 hrs. of homework. There
                will also be 10 hours in-car lessons. Full attendance is
                mandatory. A quiz will be held at the end of each in-class
                session. A final test will be conducted at the end of the entire
                course. In-car test will be conducted after 10 in-car lessons.
              </li>
              <li>
                The certificate will be issued when the course is completed in
                full and the student achieves a passing grade of 70% in-class
                and 75% in-car
              </li>
              <li>Extra lessons OR individual lessons must be paid by cash.</li>
              <li>
                After the course is completed, we will send all of the student’s
                information to the Ministry of Transportation online. They will
                process everything and then Service Ontario will issue a driving
                certificate.
              </li>
              <li>
                All payments must be made one week before the last day of the
                course. Administration fee ($80.00 +GST) plus any service
                charges will apply if the student does not want to continue
                course after 10 days of registration.
              </li>
              <li>A $35.00 fee will be applied for each bounced cheque.</li>
              <li>
                24-hour notice is required in order to cancel an in-car
                appointment. Otherwise, $40 will be charged.
              </li>
              <li>
                We will provide ministry approved workbooks for homework to
                students. This is in accordance to the curriculum set out by the
                Ministry of Transportation. A non-refundable deposit of $20.00
                will be required.
              </li>
              <li>
                Student must bring driver’s handbook to the driving school.
              </li>
              <li>
                The student must finish full course successfully within one year
                from the starting date unless a valid reason is provided in
                writing
              </li>
              <li>
                Students must read the Terms and Conditions before signing.
                (Required by M.T.O)
              </li>
            </ol>
            <p class='bottom_fields'>
              <strong
                >“I certify that the statements in this document are accurate
                and consent to the release of any information contained herein
                to the Ministry of Transportation, Insurance Bureau of Canada
                and the MTO Inspector.”</strong
              >
            </p>
          </div>
          <div class="flex-wrap">
            <div class="field-box" style={margin-top: 3px !important}>
              <span class="label">Date:</span>
              <span class="field-text">&nbsp;</span>
            </div>
            <div class="field-box" style={margin-top: 3px !important}>
              <span class="label">Signature of Student:</span>
              <span class="field-text">&nbsp;</span>
            </div>
          </div>
        </div>
        <div class="breakable-div">
            <div class="page-header" style="margin-top: 20px !important">
              <h1>LICENCE 2 DRIVE</h1>
              <div class="text-box">
                <p>
                  213-1425 DUNDAS STREET EAST, MISSISSAUGA , ONTARIO. L4X 2W4 PH #: 416 605 5254. <u>licence2driver@gmail.com</u>
                </p>
                <p><u>www.licence2drive.ca</u></p>
              </div>
            </div>
            <div class="field-box">
                  <h3><u>IN_CLASS RECORD</u></h3>
                </div>
    <div class="flex-wrap">
              <div class="field-box">
                <span class="label">COURSE #:</span>
                <span class="field-text">${data.course_number ? data.course_number : '&nbsp;'}</span>
              </div>
              <div class="field-box"></div>
            </div>
    
    <div class="field-box">
              <span class="label">STUDENT'S NAME:</span>
              <span class="field-text">${data.full_name}</span>
            
            </div>
    <div class="flex-wrap">
              <div class="field-box">
                <span class="label">COURSE START DATE:</span>
                <span class="field-text">${data.course_start_date ? moment(data.course_start_date).format('YYYY-MMM-DD') : '&nbsp;'}</span>
              </div>
              <div class="field-box">
    <span class="label">COURSE END DATE:</span>
                <span class="field-text">${data.courseEndDate ? moment(data.courseEndDate).format('YYYY-MMM-DD') : '&nbsp;'}</span>
    </div>
            </div>
    <div class="flex-wrap">
              <div class="field-box">
                <span class="label">CLASS START TIME:</span>
                <span class="field-text">${data.session_start_time ? data.session_start_time : '&nbsp;'}</span>
              </div>
              <div class="field-box">
    <span class="label">CLASS END TIME:</span>
                <span class="field-text">${data.session_end_time ? data.session_end_time : '&nbsp;'}</span>
    </div>
            </div>
            <div class="flex-wrap">
              <table class="unstyledTable styled2 tdSize" style="margin: 30px 0">
                <thead>
                  <tr>
                    <th>&nbsp;SESSION #</th>
                    <th>&nbsp;DATE FOR SESSION &nbsp;</th>
                    <th>&nbsp;STUDENT SIGNATURE &nbsp;</th>
                    <th>&nbsp;INSTRUCTOR SIGNATURE&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>&nbsp;SESSION # 1</td>
                    <td style="font-weight: normal !important; font-size: 22px !important;">&nbsp; ${data.session_1_date ? moment(data.session_1_date).format('YYYY-MMM-DD') : '&nbsp;'}</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>&nbsp;SESSION # 2</td>
                    <td style="font-weight: normal !important; font-size: 22px !important;">&nbsp; ${data.session_2_date ? moment(data.session_2_date).format('YYYY-MMM-DD') : '&nbsp;'}</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>&nbsp;SESSION # 3</td>
                    <td style="font-weight: normal !important; font-size: 22px !important;">&nbsp; ${data.session_3_date ? moment(data.session_3_date).format('YYYY-MMM-DD') : '&nbsp;'}</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>&nbsp;SESSION # 4</td>
                    <td style="font-weight: normal !important; font-size: 22px !important;">&nbsp; ${data.session_4_date ? moment(data.session_4_date).format('YYYY-MMM-DD') : '&nbsp;'}</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>&nbsp;SESSION # 5</td>
                    <td style="font-weight: normal !important; font-size: 22px !important;">&nbsp; ${data.session_5_date ? moment(data.session_5_date).format('YYYY-MMM-DD') : '&nbsp;'}</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>&nbsp;SESSION # 6</td>
                    <td style="font-weight: normal !important; font-size: 22px !important;">&nbsp; ${data.session_6_date ? moment(data.session_6_date).format('YYYY-MMM-DD') : '&nbsp;'}</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
            </div>
    <div class="field-box">
              <span class="label">NAME OF IN CLASS TEACHER:</span>
              <span class="field-text">${data?.in_class_instructor ? data?.in_class_instructor : `&nbsp;`}</span>
              
            </div>
    
    <div class="flex-wrap">
              <div class="field-box">
    <span class="label">INSTR LICENCE NO:</span>
                <span class="field-text">${data?.in_class_driving_lisence ? data?.in_class_driving_lisence : `&nbsp;`}</span>
    </div>
    <div class="field-box">
                <span class="label">INSTR LICENCE EXPIRY:</span>
                <span class="field-text"> ${data.inst_lic_expiry ? moment(data.inst_lic_expiry).format('YYYY-MMM-DD') : '&nbsp;'}</span>
              </div>
            </div>
            <div class="flex-wrap">
            <div class="field-box">
                <span class="label">IN CLASS INSTR:</span>
                <span class="field-text">&nbsp;</span>
    <span class="abs-text" style="left: 60% !important">SIGNATURE</span>
              </div>
              
            </div>
            
    </div>
        <div class="breakable-div">
          <div class="page-header">
            <h1>LICENCE 2 DRIVE</h1>
            <div class="text-box-p">
              <p>
                213-1425 DUNDAS STREET EAST, MISSISSAUGA , ONTARIO. L4X 2W4 PH:
                416 605 5254
              </p>
            </div>
          </div>
          <div class="flex-wrap">
            <div class="field-box">
              <span class="student-box">Student # ${data.student_number}</span>
            </div>
            <div class="field-box" style="margin-left: -300px">
              <h2><u> In-Car Record And Progress Report. </u></h2>
            </div>
          </div>
          <div class="flex-wrap">
            <div class="column-table">
              <table class="unstyledTable">
                <thead>
                  <tr>
                    <th>&nbsp;Course Description</th>
                    <th>&nbsp;1&nbsp;</th>
                    <th>&nbsp;2&nbsp;</th>
                    <th>&nbsp;3&nbsp;</th>
                    <th>&nbsp;4&nbsp;</th>
                    <th>&nbsp;5&nbsp;</th>
                    <th>&nbsp;6&nbsp;</th>
                    <th>&nbsp;7&nbsp;</th>
                    <th>&nbsp;8&nbsp;</th>
                    <th>&nbsp;9&nbsp;</th>
                    <th>&nbsp;10&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>&nbsp;Steering manuvers</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>&nbsp;Acceleration</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>&nbsp;Maintaining Speed</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>&nbsp;Slowing / Stoping</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>&nbsp;Signaling</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>&nbsp;Saning / Mirrors</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>&nbsp;Insersetions / Stop</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>&nbsp;Insersetions / Light</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>&nbsp;Right Turns</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>&nbsp;Left Turns</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>&nbsp;Lane Change</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>&nbsp;3 Point Turn</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>&nbsp;Grade Park</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>&nbsp;Parallel Park</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>&nbsp;Front & R. Parking</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>&nbsp;Freeway Entr, Exit</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>&nbsp;F Way Lane Change</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td style="text-align: center" colspan="11">
                      &nbsp;Keys:&nbsp;&nbsp;Acceptable = &#10004;
                      &nbsp;&nbsp;Need to Improve = O
                    </td>
                  </tr>
                  <tr>
                    <td style="text-align: center" colspan="11">
                      &nbsp;Need to Learn = X
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="column-form">
              <div class="field-box">
                <span class="label">Name:</span>
                <span class="field-text">${data.full_name}</span>
              </div>
              <div class="field-box">
                <span class="label">Lic #:</span>
                <span class="field-text">${data.driving_lisence}</span>
              </div>
              <div class="flex-wrap">
                <div class="field-box">
                  <span class="label">Iss Date:</span>
                  <span class="field-text" style='font-size: 20px;'>${moment(data.issue_date).format('YYYY-MMM-DD')}</span>
                </div>
                <div class="field-box">
                  <span class="label">Exp Date:</span>
                  <span class="field-text" style='font-size: 20px;'>${moment(data.expiry_date).format('YYYY-MMM-DD')}</span>
                </div>
              </div>
              <div class="field-box">
                <span class="label">Address:</span>
                <span class="field-text" style='font-size: 18px;'>${data.address + ', ' + data.city}</span>
              </div>
              <div class="field-box">
                <span class="label">H:Phone #:</span>
                <span class="field-text">${data.home_phone ? data.home_phone : `&nbsp;`}</span>
              </div>
              <div class="field-box">
                <span class="label">Rd Test Loc/Dt/Time:</span>
                <span class="field-text">&nbsp;</span>
              </div>
              <div class="field-box">
                <span class="label">Instr.Name:</span>
                <span class="field-text">${data?.in_car_instructor ? data?.in_car_instructor : `&nbsp;`}</span>
              </div>
              <div class="field-box">
                <span class="label">Instr.Lic #:</span>
                <span class="field-text">${data?.in_car_driving_lisence ? data?.in_car_driving_lisence : `&nbsp;`}</span>
              </div>
              <div class="field-box">
                <span class="label">Instr.Lic Exp:</span>
                <span class="field-text">${data?.in_car_inst_lic_expiry ? moment(data?.in_car_inst_lic_expiry).format('YYYY-MMM-DD') : `&nbsp;`}</span>
              </div>
            </div>
          </div>

          <div class="flex-wrap">
            <table class="unstyledTable styled2" style="margin: 10px 0">
              <thead>
                <tr>
                  <th>&nbsp;Date: DD/MM/YY</th>
                  <th>&nbsp;Time In &nbsp;</th>
                  <th>&nbsp;Time Out &nbsp;</th>
                  <th>&nbsp;Total Time&nbsp;</th>
                  <th>&nbsp;Student Signature&nbsp;</th>
                  <th>&nbsp;Instructor Signature&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex-wrap" style="margin-top: 20px">
            <div class="field-box">
              <span class="label">Instructor Sign:</span>
              <span class="field-text">&nbsp;</span>
            </div>
            <div class="field-box"></div>
          </div>
        </div>
        
      <div class="breakable-div">
          <div class="page-header2" style="margin-top: 20px !important">
            <h1>LICENCE 2 DRIVE</h1>
            <div class="flex-wrap">
              <div class="field-box-st-num">
                <span class="label">Student #:</span>
                <span class="field-num-text" style="text-align:left">${data.student_number}</span>
              </div>
              <div class="field-box">
                <span class="label">Student Name:</span>
                <span class="field-text" style="text-align:left">${data.full_name}</span>
              </div>
            </div>
          </div>

          <div class="flex-wrap">
           <img
           src="https://vaistat.s3.us-east-2.amazonaws.com/64534509d1c68dc6b4cf2dd45mfc8nswi8gynybfi27k2"
           alt="form"
           >
          </div>
          <div class="flex-wrap">
            <div class="field-box">
              <span class="label">Student Sign:</span>
              <span class="field-text">&nbsp;</span>
            </div>
            <div class="field-box">
              <span class="label">Instr. Sign:</span>
              <span class="field-text">&nbsp;</span>
            </div>
          </div>
        </div>
        <div class="breakable-div">
          <div class="page-header" style="margin-bottom: 0; margin-top: 20px  !important;">
            <h1>LICENCE 2 DRIVE</h1>
            <div class="text-box" style="margin-bottom: 0; margin-top: -10px  !important;">
              <p>ANSWER SHEET</p>
            </div>
          </div>
          
          <span class="grey-line"></span>
          <div class="flex-wrap" style="margin-bottom: -11px !important;">
            <div class="field-box">
              <span class="label">Name:</span>
              <span class="field-text">${data.full_name}</span>
            </div>
            <div class="field-box">
              <span class="label">Course No:</span>
              <span class="field-text">${data.course_number ? data.course_number : '&nbsp;'}</span>
            </div>
          </div>
          <div class="flex-wrap" style="margin-bottom: -11px !important;">
            <div class="field-box">
              <span class="label">Address:</span>
              <span class="field-text">${data.address + ', ' + data.city + ', ' + data.province + ', ' + data.postal_code}</span>
            </div>
          </div>
          <div class="flex-wrap" style="margin-bottom: -20px !important;">
            <div class="field-box">
              <span class="label">Telephone:</span>
              <span class="field-text">${data.cell_phone}</span>
            </div>
            <div class="field-box">
              <span class="label">Driver's License:</span>
              <span class="field-text">${data.driving_lisence}</span>
            </div>
          </div>
          <span class="grey-line"></span>
        
          <div class="flex-wrap2 flex-wrap">
            <div class="test">
              <h2 style="margin-bottom: 5px">Test 1</h2>
              <div class="field-box">
                <span class="label">1)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">2)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">3)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">4)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">5)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">6)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">7)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">8)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">9)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">10)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">11)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">12)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">13)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">14)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">15)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">16)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">17)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">18)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">19)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">20)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">21)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">22)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">23)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">24)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">25)</span>
                <span class="field-text"></span>
              </div>
            </div>
            <div class="test">
              <h2 style="margin-bottom: 5px">Test 2</h2>
              <div class="field-box">
                <span class="label">1)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">2)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">3)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">4)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">5)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">6)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">7)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">8)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">9)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">10)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">11)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">12)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">13)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">14)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">15)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">16)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">17)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">18)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">19)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">20)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">21)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">22)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">23)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">24)</span>
                <span class="field-text"></span>
              </div>
              <div class="field-box">
                <span class="label">25)</span>
                <span class="field-text"></span>
              </div>
            </div>
          </div>
        
        <div class="col-wrap">
          <div class="box" style="margin-bottom: -2px;">
            <div class="field-box">
              <span class="label">Sign:</span>
              <span class="field-text">&nbsp;</span>
            </div>
            <div class="field-box">
              <span class="label">Date:</span>
              <span class="field-text">&nbsp;</span>
            </div>
            <div class="field-box">
              <span class="label">Correct:</span>
              <span class="field-text">&nbsp;</span>
            </div>
          </div>
          <div class="box" style="margin-bottom: -2px;">
            <div class="field-box">
              <span class="label">Sign:</span>
              <span class="field-text">&nbsp;</span>
            </div>
            <div class="field-box">
              <span class="label">Date:</span>
              <span class="field-text">&nbsp;</span>
            </div>
            <div class="field-box">
              <span class="label">Correct:</span>
              <span class="field-text">&nbsp;</span>
            </div>
          </div>
        </div>
        <span class="grey-line"></span>
        <div class="col-wrap">
          <div class="box">
            <div class="field-box">
              <span class="label">Instructor's Signature:</span>
              <span class="field-text">&nbsp;</span>
            </div>
          </div>
          <div class="box">
            <div class="field-box">
              <span class="label">Total Score:</span>
              <span class="input-box"></span>
            </div>
          </div>
        </div>
        <div class="paragraph" style="margin-top: -5px !important;">
          <p>
            I hereby give Licence 2 Drive permission to release
            any information given to the course provider to the Ministry of Transportation or Drive Test Centers.
          </p>
        </div>
        <div class="field-box" style="max-width: 300px;">
          <span class="label">Signature:</span>
          <span class="field-text">&nbsp;</span>
        </div>
      </div>
       
        ${data.license_image && data.license_image !== null && data.license_image !== ''
    ? `
          <div class="breakable-div"> 
            <div class="img-wraper">
             <img src="${data.license_image}" />
            </div>
        </div>`
    : ''
  }
      </div>
    </div>
  </body>
</html>
`;
