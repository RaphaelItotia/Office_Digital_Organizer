# 📅 Leave & Attendance Management System with Email Automation and Calendar Sync

A smart, automated system using **Google Forms**, **Google Sheets**, and **Google Apps Script** to manage leave requests and attendance. This project also automates email feedback and integrates approved leaves with **Google Calendar**.

---

## 🚀 Features

- 📝 Online Leave Request Form via Google Forms
- 📩 Automated Email Feedback (Approved / Rejected / Pending)
- 📅 Google Calendar Event Sync for Approved Leaves
- ✅ Admin Editable Status Columns in Sheets
- 📌 Daily Attendance Tracker
- 🔄 Time-Triggered Script Automation
- 📊 Dashboard Ready (Google Sheets Charts)

---

## 📂 Project Files

| File/Folder | Description |
|-------------|-------------|
| `Leave_Attendance_System_User_Guide.pdf` | Full user guide for setting up the system |
| `scripts/sendLeaveFeedback.gs` | Script to send leave approval/rejection emails |
| `scripts/syncLeaveCalendar.gs` | Script to create calendar events for approved leaves |
| `assets/screenshots/` | Optional screenshots folder for documentation |

---

## 🧰 Tools Used

- [Google Forms](https://forms.google.com)
- [Google Sheets](https://sheets.google.com)
- [Google Apps Script](https://script.google.com)
- [Google Calendar](https://calendar.google.com)

---

## 🛠️ Setup Instructions

### 1. Clone or Download This Repository
```bash
git clone https://github.com/RaphaelItotia/Office_Digital_Organizer.git
```
### 2. Create the Google Form for Leave Requests
Refer to the steps in the User Guide PDF or:

- Fields: Name, Email, Leave Type, Start/End Date, Reason

- Enable: Collect Email Addresses

- Link form to Google Sheets

### 3. Paste Script into Apps Script
- Open your linked Google Sheet

- Click Extensions > Apps Script

- Paste contents from [sendLeaveFeedback.js](Scripts/sendLeaveFeedback.js) and [syncLeaveCalendar.js](Scripts/syncLeaveCalendar.js)

- Save and authorize permissions

### 4. Set Triggers
- Go to Apps Script > Triggers

- Add triggers for both scripts:

- sendLeaveFeedback → Time-driven (e.g., hourly)

- syncLeaveCalendar → Time-driven (e.g., every 2 hours)

### 5. Test with Sample Data
- Submit a test form

- Update the Approval Status column

- Watch the email & calendar automation in action

## 📷 Screenshots

<table>
  <tr>
    <td style="text-align: center;"> <p>Leave Request Form</p> ![Leave Request Form Screenshot](leave_request_form.png)
    </td>
    <td style="text-align: center;">
      <p>Approval Email</p>
      ![Approval Email Screenshot](approval_email.png)
    </td>
    <td style="text-align: center;">
      <p>Calendar Event</p>
      ![Calendar Event Screenshot](calendar_event.png)
    </td>
  </tr>
</table>

## 📘 Documentation
Download the Full [User Guide PDF](Assets/Leave_Attendance_System_User_Guide.pdf)

## 👨‍💻 Author
Raphael Itotia

Automating business workflows using Google Apps Script, Forms, and low-code tools.

## 🌟 Contributions
Feel free to fork, star, or contribute:

- Add new features

- Improve the UI/UX of the forms

- Add Slack/Email thread integrations
