function sendLeaveFeedback() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const header = data[0];

  // Get column indices
  const emailCol = header.indexOf("Email Address");
  const statusCol = header.indexOf("Approval Status");
  const sentCol = header.indexOf("Last Notified Status");
  const nameCol = header.indexOf("Employee Name");
  const leaveCol = header.indexOf("Leave Type");

  // Check if any column is missing
  if ([emailCol, statusCol, sentCol, nameCol, leaveCol].includes(-1)) {
    throw new Error("One or more required column headers are missing.");
  }

  for (let i = 1; i < data.length; i++) {
    const email = data[i][emailCol];
    const status = data[i][statusCol];
    const lastNotified = data[i][sentCol];
    const name = data[i][nameCol];
    const leave = data[i][leaveCol];

    if (email && status && name && leave && status !== lastNotified) {
      let subject = `Leave Request ${status}`;
      let htmlMessage = "";

      if (status === "Approved") {
        htmlMessage = `Dear ${name},<br><br>Your ${leave} leave request has been <b>APPROVED</b>. We wish you a restful and productive time off. Please ensure you have completed any pending handovers before your leave starts.<br><br>Regards,<br>HR Department`;
      } else if (status === "Rejected") {
        htmlMessage = `Dear ${name},<br><br>Unfortunately, your ${leave} leave request has been <b>REJECTED</b>. Please feel free to contact HR if you need further clarification or to discuss alternative dates.<br><br>Regards,<br>HR Department`;
      } else if (status === "Pending") {
        htmlMessage = `Dear ${name},<br><br>Kindly visit the HR office for further discussion and clarification regarding your ${leave} leave request.<br><br>Regards,<br>HR Department`;
      } else {
        continue; // Skip if status is not one of the expected values
      }

      // Send email
      GmailApp.sendEmail(email, subject, "", { htmlBody: htmlMessage });

      // Update the "Feedback Status" column
      sheet.getRange(i + 1, sentCol + 1).setValue(status); // +1 to adjust from 0-indexed array to 1-based sheet
    }
  }
}
