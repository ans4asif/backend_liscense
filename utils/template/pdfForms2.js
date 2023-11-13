const moment = require('moment');

module.exports = data =>`
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
        padding: 0;
        background: #fff;
      }
      .container {
        max-width: 1100px;
        margin: 0 auto;
      }
      #wrapper {
        padding: 10px 0;
      }
      .page-header {
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

      .page-header2 {
        width: 100%;
        font-weight: bold;
        text-align: center;
        margin: 0 auto 10px;
      }
      .page-header2 h1 {
        font-size: 40px;
        line-height: 45px;
        margin: 0 0 15px;
      }

      .student-number {
        width: 100%;
        padding: 10px 0;
        font-weight: bold;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        gap: 5px;
      }
      .student-number .text {
        min-width: 150px;
        border-bottom: 1px solid #000;
      }

      .heading {
        display: block;
        font-size: 28px;
        line-height: 32px;
        font-weight: bold;
        text-transform: uppercase;
        margin: 0 0 10px;
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
        border-bottom: 1px solid #000;
      }
      .field-box2 .label {
        display: block;
      }
      .field-box2 .field-text {
        flex-grow: 1;
        border-bottom: 1px solid #000;
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
        width: 200px;
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
      .term-condition {
        overflow: hidden;
        padding-top: 15px;
      }
      .term-condition .title {
        display: block;
        font-size: 22px;
        line-height: 25px;
        font-weight: bold;
        margin: 0 0 10px;
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
        margin: 0 0 3px;
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
      }
      
      .img-wraper img {
        display: flex;
        margin: 0 auto;
        max-width: 500px;
        max-height: 250px;
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
        font-weight: normal;
        margin: 0;
      }
      .paragraph p strong {
        font-weight: 700;
      }
      
    </style>
  </head>
<body>
 <div id="wrapper">
      <div class="container">
<div class="breakable-div">
          <div class="page-header2">
            <h1>LICENCE 2 DRIVE</h1>
            <div class="flex-wrap">
              <div class="field-box2">
                <span class="label">Student #:</span>
                <span class="field-text">${data.student_number}</span>
              </div>
              <div class="field-box2">
                <span class="label">Student Name:</span>
                <span class="field-text">${data.full_name}</span>
              </div>
            </div>
          </div>

          <div class="flex-wrap">
            <img
              src="${data.license_image}"
              alt="form1"
            />
          </div>
          <div class="flex-wrap">
            <div class="field-box">
              <span class="label">Student Sign:</span>
              <span class="field-text"></span>
            </div>
            <div class="field-box">
              <span class="label">Instr. Sign:</span>
              <span class="field-text"></span>
            </div>
          </div>
        </div>
</div>
</div>
</body>
<html>
`