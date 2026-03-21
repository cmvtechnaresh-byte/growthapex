const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyojXK93mQb9YY7NvjN8dyUyFe-Js33Vu9EFV-Ae8vHOqkA0D7fp8vAHqzoWD2Yb4U/exec";

export const syncToGoogleSheets = async (data, type = 'lead') => {
  if (!GOOGLE_SCRIPT_URL) {
    console.warn("Google Sheets Sync: URL not configured.");
    return;
  }

  try {
    const payload = {
      ...data,
      type,
      timestamp: new Date().toISOString(),
      source: 'GrowthApex Web'
    };

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors", // Required for Google Apps Script Web App
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("Synced to Google Sheets");
    return true;
  } catch (error) {
    console.error("Error syncing to Google Sheets:", error);
    return false;
  }
};
