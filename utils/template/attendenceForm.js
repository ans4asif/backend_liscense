const moment = require('moment');

module.exports = (data, studentList) => `
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
        margin: 0 0 15px;
      }

      body {
        color: #000;
        font: 18px/24px "Arial";
        margin: 0;
        padding: 0;
        background: #fff;
      }
      .container {
        max-width: 1100px;
        margin: 40px 20px;
      }
      #wrapper {
        padding: 10px 0;
      }
      .page-header {
        width: 100%;
        text-align: center;
      }
      .page-header .heading {
        width: 100%;
        display: block;
        border: 2px solid #000;
        margin: 0 0 -2px;
        padding: 5px;
      }
      .page-header h1 {
        font-size: 25px;
        line-height: 30px;
        margin: 0;
        text-transform: uppercase;
      }
      .page-header h2 {
        font-size: 20px;
        line-height: 25px;
        margin: 0;
        text-transform: uppercase;
      }

      .field-box {
        width: 100%;
        position: relative;
        display: flex;
        flex-grow: 1;
        gap: 5px;
        padding: 5px;
      }

      .field-box .label {
        display: block;
      }
      .field-box .field-text {
        flex-grow: 1;
        border-bottom: 1px solid #000;
        text-transform: capitalize;
      }

      .flex-wrap {
        display: flex;
        align-items: center;
        gap: 10px;
        border-width: 1px 2px;
        border-style: solid;
        border-color: #000;
      }

      table.GeneratedTable {
        width: 100%;
        margin-top: -2px;
        background-color: #fff;
        border-collapse: collapse;
        border-width: 2px;
        border-color: #000;
        border-style: solid;
        color: #000;
        text-transform: capitalize;
      }

      table.GeneratedTable td,
      table.GeneratedTable th {
        border-width: 2px;
        border-color: #000000;
        border-style: solid;
        padding: 10px 5px;
      }

      table.GeneratedTable tr td:nth-child(1) {
        width: 6%;
        text-align: right;
      }
      table.GeneratedTable tr td:nth-child(2) {
        width: 46%;
        font-size: 18px;
        padding-left: 10px;  
      }
      table.GeneratedTable tr td:nth-child(3) {
        width: 46%;
      }

      table.GeneratedTable thead {
        background-color: #fff;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div id="wrapper">
      <div class="container">
        <div class="page-header">
          <span class="heading">
            <h1>LICENCE 2 DRIVE</h1>
          </span>
          <span class="heading">
            <h2>IN CLASS ATTENDENT SHEET</h2>
          </span>
        </div>
        <div class="flex-wrap">
          <div class="field-box">
            <span class="label"><strong>Course #:</strong></span>
            <span class="field-text">${data.course_number ? data.course_number : ''}</span>
          </div>
          <div class="field-box">
            <span class="label"><strong>Session #:</strong></span>
            <span class="field-text">${data.session_number ? data.session_number : ''}</span>
          </div>
          <div class="field-box">
            <span class="label"><strong>Session date:</strong></span>
            <span class="field-text">${data.session_date ? moment(data.session_date).format('YYYY-MMM-DD') : ''}</span>
          </div>
        </div>
        <div class="flex-wrap">
          <div class="field-box">
            <span class="label"><strong>Start time:</strong></span>
            <span class="field-text">${data.session_start_time ? data.session_start_time : ''}</span>
          </div>
          <div class="field-box">
            <span class="label"><strong>End time:</strong></span>
            <span class="field-text">${data.session_end_time ? data.session_end_time : ''}</span>
          </div>
          <div class="field-box">
            <span class="label"><strong>Inst: Name:</strong></span>
            <span class="field-text">${data.inst_name ? data.inst_name : ''}</span>
          </div>
        </div>
        <div class="flex-wrap">
          <div class="field-box">
            <span class="label"><strong>Instr: Lic #:</strong></span>
            <span class="field-text" style="font-size: 16px !important">${data.instr_driving_lisence ? data.instr_driving_lisence : ''}</span>
          </div>
          <div class="field-box">
            <span class="label"><strong>Expiry Date:</strong></span>
            <span class="field-text">${data.inst_expiry_date ? moment(data.inst_expiry_date).format('YYYY-MMM-DD') : ''}</span>
          </div>
          <div class="field-box">
            <span class="label"><strong>Sign:</strong></span>
            <span class="field-text">&nbsp;</span>
          </div>
        </div>
        <table class="GeneratedTable">
          <tbody>
            <thead>
              <tr>
                <th><strong>SR.NO</strong></th>
                <th><strong>NAME OF STUDENT</strong></th>
                <th><strong>SIGNATURE OF STUDENT</strong></th>
              </tr>
            </thead>
            ${studentList?.map(student => {
              return`
              <tr>
              <td>${student.index}</td>
              <td><strong>${student.name}</strong></td>
              <td></td>
            </tr>
            `
            }).join('')}
              <td>&nbsp;</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </body>
</html>

`;
