function syncLeaveCalendar() {
  const calendarName = "Leave Tracker";
  const calendar = CalendarApp.getCalendarsByName(calendarName)[0];

  if (!calendar) {
    Logger.log("Calendar not found: " + calendarName);
    return;
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const header = data[0];

  const nameCol = header.indexOf("Employee Name");
  const statusCol = header.indexOf("Approval Status");
  const startCol = header.indexOf("Start Date");
  const endCol = header.indexOf("End Date");
  const calendarStatusCol = header.indexOf("Calendar Status");
  const leaveCol = header.indexOf("Leave Type");

  if ([nameCol, statusCol, startCol, endCol, calendarStatusCol, leaveCol].includes(-1)) {
    Logger.log("One or more required columns not found.");
    return;
  }

  const timeZone = Session.getScriptTimeZone();

  // Step 1: Add events for "Approved"
  for (let i = 1; i < data.length; i++) {
    const name = data[i][nameCol];
    const status = data[i][statusCol];
    const startDate = new Date(data[i][startCol]);
    const endDate = new Date(data[i][endCol]);
    const calendarStatus = data[i][calendarStatusCol];
    const leave = data[i][leaveCol];

    const title = `${leave} Leave - ${name}`;

    if (status === "Approved" && name && startDate && endDate && calendarStatus !== "Event Created") {
      const existingEvents = calendar.getEvents(startDate, new Date(endDate.getTime() + 24 * 60 * 60 * 1000), { search: title });
      const alreadyExists = existingEvents.some(event => event.getTitle() === title);

      if (!alreadyExists) {
        calendar.createAllDayEvent(
          title,
          startDate,
          new Date(endDate.getTime() + 24 * 60 * 60 * 1000) // end date is inclusive
        );
        sheet.getRange(i + 1, calendarStatusCol + 1).setValue("Event Created");
      }
    }
  }

  // Step 2: Remove events no longer approved and clear "Calendar Status"
  const futureEvents = calendar.getEvents(new Date(), new Date("2100-01-01"));

  for (let i = 1; i < data.length; i++) {
    const name = data[i][nameCol];
    const status = data[i][statusCol];
    const startDate = new Date(data[i][startCol]);
    const calendarStatus = data[i][calendarStatusCol];
    const leave = data[i][leaveCol];
    const title = `${leave} Leave - ${name}`;

    if (calendarStatus === "Event Created" && status !== "Approved") {
      const matchingEvents = futureEvents.filter(event =>
        event.getTitle() === title &&
        Utilities.formatDate(event.getStartTime(), timeZone, "yyyy-MM-dd") ===
        Utilities.formatDate(startDate, timeZone, "yyyy-MM-dd")
      );

      for (const event of matchingEvents) {
        event.deleteEvent();
      }

      sheet.getRange(i + 1, calendarStatusCol + 1).clearContent();
    }
  }
}
