/**
 * ============================================================================
 * TRAVEL TRIBES — AUTOMATED GOOGLE APPS SCRIPT WEBHOOK
 * ============================================================================
 * Sheet: https://docs.google.com/spreadsheets/d/1Up6p6IhT3Qd7kBM6iOihVOFKUUVxP-rs9KJ6_V-GgPI/edit
 * 
 * Ye script website ke sabhi types ke data ko automatically categorized sheets
 * me organise karta hai:
 *  1. 📋 Leads & Inquiries (Itinerary Downloads, Contact Forms, Custom Trips)
 *  2. 💳 Bookings & Payments (Razorpay Online Bookings & Booking Forms)
 *  3. 📧 Newsletter Subscribers
 *  4. 🗂️ All Master Log (Complete historical backup)
 * ============================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000); // Wait up to 30s to prevent concurrent write collisions

    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: "No post data received"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var timestamp = data.timestamp || Utilities.formatDate(new Date(), "Asia/Kolkata", "dd/MM/yyyy hh:mm:ss a");
    var dataType = (data.type || "lead").toLowerCase();
    var source = data.source || data.formSource || "Website";

    // 1. Log to Master All Activity Log
    logToMaster(ss, timestamp, dataType, source, data);

    // 2. Route to Specific Sheet
    if (dataType === "booking") {
      logBooking(ss, timestamp, source, data);
    } else if (dataType === "newsletter") {
      logNewsletter(ss, timestamp, source, data);
    } else {
      // lead, contact, custom_trip, etc.
      logLeadOrInquiry(ss, timestamp, source, data);
    }

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "Data successfully synced to Travel Tribes Google Sheet"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    service: "Travel Tribes Google Sheets Sync Webhook",
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

// -------------------------------------------------------------
// 1. LEADS & INQUIRIES SHEET
// -------------------------------------------------------------
function logLeadOrInquiry(ss, timestamp, source, data) {
  var sheetName = "📋 Leads & Inquiries";
  var sheet = ss.getSheetByName(sheetName);
  var headers = [
    "Date & Time (IST)",
    "Source (Kaha Se Aaya)",
    "Customer Name",
    "Phone / WhatsApp",
    "WhatsApp Click",
    "Email",
    "Trip / Destination",
    "Travel Dates",
    "Group Size / Budget",
    "Message / Notes"
  ];

  if (!sheet) {
    sheet = ss.insertSheet(sheetName, 0);
    setupHeaders(sheet, headers, "#0B2940"); // Dark navy
  }

  var phone = String(data.phone || "").trim();
  var cleanDigits = phone.replace(/[^\d]/g, "");
  if (cleanDigits.length === 10) cleanDigits = "91" + cleanDigits;
  var waFormula = cleanDigits ? '=HYPERLINK("https://wa.me/' + cleanDigits + '", "💬 Open WhatsApp")' : "";

  var row = [
    timestamp,
    source,
    data.fullName || data.firstName || data.name || "N/A",
    phone || "N/A",
    waFormula,
    data.email || "N/A",
    data.tripTitle || data.trip || data.tripSlug || "General",
    data.travelDates || "Flexible",
    (data.groupSize || "") + (data.budget ? " | Budget: " + data.budget : ""),
    data.message || data.notes || ""
  ];

  sheet.appendRow(row);
  formatLastRow(sheet);
}

// -------------------------------------------------------------
// 2. BOOKINGS & PAYMENTS SHEET
// -------------------------------------------------------------
function logBooking(ss, timestamp, source, data) {
  var sheetName = "💳 Bookings & Payments";
  var sheet = ss.getSheetByName(sheetName);
  var headers = [
    "Date & Time (IST)",
    "Source",
    "Booking ID",
    "Payment ID (Razorpay)",
    "Payment Status",
    "Customer Name",
    "Phone",
    "WhatsApp Click",
    "Email",
    "City / Age",
    "Trip Destination",
    "Travel Batch Date",
    "Package",
    "Guests",
    "Payment Type",
    "Amount Paid Today",
    "Remaining Balance",
    "Grand Total",
    "Special Request",
    "All Travellers Roster"
  ];

  if (!sheet) {
    sheet = ss.insertSheet(sheetName, 1);
    setupHeaders(sheet, headers, "#0F5132"); // Dark forest green
  }

  var phone = String(data.phone || "").trim();
  var cleanDigits = phone.replace(/[^\d]/g, "");
  if (cleanDigits.length === 10) cleanDigits = "91" + cleanDigits;
  var waFormula = cleanDigits ? '=HYPERLINK("https://wa.me/' + cleanDigits + '", "💬 Open WhatsApp")' : "";

  var cityAge = (data.city || "") + (data.age ? " (Age: " + data.age + ")" : "");

  var row = [
    timestamp,
    source,
    data.bookingId || "N/A",
    data.paymentId || "N/A",
    data.paymentStatus || data.status || "Pending",
    data.fullName || data.name || "N/A",
    phone || "N/A",
    waFormula,
    data.email || "N/A",
    cityAge || "N/A",
    data.tripTitle || "N/A",
    data.travelDates || data.date || "N/A",
    data.packageLabel || "Standard",
    data.guests || 1,
    data.paymentType || "N/A",
    data.amountPaid || data.amountToPayToday || 0,
    data.remainingBalance || 0,
    data.grandTotal || 0,
    data.message || data.specialRequest || "",
    data.travellersRoster || ""
  ];

  sheet.appendRow(row);
  formatLastRow(sheet);
}

// -------------------------------------------------------------
// 3. NEWSLETTER SUBSCRIBERS SHEET
// -------------------------------------------------------------
function logNewsletter(ss, timestamp, source, data) {
  var sheetName = "📧 Newsletter Subscribers";
  var sheet = ss.getSheetByName(sheetName);
  var headers = [
    "Date & Time (IST)",
    "Email Address",
    "Source",
    "Status"
  ];

  if (!sheet) {
    sheet = ss.insertSheet(sheetName, 2);
    setupHeaders(sheet, headers, "#4C1D95"); // Deep purple
  }

  var row = [
    timestamp,
    data.email || "N/A",
    source,
    "ACTIVE"
  ];

  sheet.appendRow(row);
  formatLastRow(sheet);
}

// -------------------------------------------------------------
// 4. MASTER BACKUP LOG SHEET
// -------------------------------------------------------------
function logMaster(ss, timestamp, dataType, source, data) {
  var sheetName = "🗂️ All Master Log";
  var sheet = ss.getSheetByName(sheetName);
  var headers = [
    "Date & Time (IST)",
    "Category",
    "Source",
    "Name",
    "Phone",
    "Email",
    "Trip / Context",
    "Summary / Data JSON"
  ];

  if (!sheet) {
    sheet = ss.insertSheet(sheetName, 3);
    setupHeaders(sheet, headers, "#1E293B"); // Slate dark
  }

  var row = [
    timestamp,
    dataType.toUpperCase(),
    source,
    data.fullName || data.name || data.firstName || "N/A",
    data.phone || "N/A",
    data.email || "N/A",
    data.tripTitle || data.trip || "N/A",
    JSON.stringify(data)
  ];

  sheet.appendRow(row);
  formatLastRow(sheet);
}

// -------------------------------------------------------------
// HELPER: SETUP HEADERS & STYLING
// -------------------------------------------------------------
function setupHeaders(sheet, headers, bgHex) {
  sheet.clear();
  sheet.appendRow(headers);
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground(bgHex);
  headerRange.setFontColor("#FFFFFF");
  headerRange.setFontWeight("bold");
  headerRange.setFontSize(11);
  headerRange.setFontFamily("Segoe UI");
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");
  sheet.setRowHeight(1, 38);
  sheet.setFrozenRows(1);

  // Initial column widths
  for (var col = 1; col <= headers.length; col++) {
    sheet.setColumnWidth(col, 180);
  }
}

function formatLastRow(sheet) {
  var lastRow = sheet.getLastRow();
  var numCols = sheet.getLastColumn();
  if (lastRow > 1) {
    var range = sheet.getRange(lastRow, 1, 1, numCols);
    range.setFontFamily("Segoe UI");
    range.setFontSize(10);
    range.setVerticalAlignment("middle");
    sheet.setRowHeight(lastRow, 28);
  }
}
