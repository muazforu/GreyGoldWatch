/* ============================================================
   GREY·GOLD — Order form → Google Sheet
   ------------------------------------------------------------
   SETUP (2 minute, sirf ek dafa):

   1. Ye sheet kholo: https://docs.google.com/spreadsheets/d/1WiRAFRLGUyPKntrm7kBYP65jiBwf9wZjiRgbIZAA1vE/edit
   2. Menu: Extensions → Apps Script
   3. Jo code wahan ho usay delete karke YE POORA CODE paste karo
   4. Deploy → New deployment → type: "Web app"
      - Execute as: Me
      - Who has access: Anyone
      - Deploy dabao → authorization allow karo
   5. "Web app URL" copy karo (https://script.google.com/macros/s/.../exec)
   6. Wo URL mujhe bhejo — main website me laga dunga. Bas!
   ============================================================ */

const SHEET_ID = '1WiRAFRLGUyPKntrm7kBYP65jiBwf9wZjiRgbIZAA1vE';

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    const sh = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
    sh.appendRow([
      new Date(),        // Timestamp
      d.name || '',      // Name
      d.phone || '',     // Phone
      d.city || '',      // City
      d.quantity || 1,   // Quantity
      d.address || '',   // Address
      d.total || '',     // Total (Rs.)
      'New'              // Status
    ]);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
