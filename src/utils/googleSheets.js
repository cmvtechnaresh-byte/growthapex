const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw8aF9EzL0CpKWecVYytjld-rjv6BI0D_HhqqzJeCWJrixmq2_7FIv59Q_vtSJoE5E/exec";

export const syncToGoogleSheets = async (data, type = 'lead') => {
  if (!GOOGLE_SCRIPT_URL) {
    console.error("Google Sheets Sync: URL not found.");
    return;
  }

  try {
    const params = new URLSearchParams();
    params.append('type', type);
    params.append('email', data.email || '');
    params.append('phone', data.phone || '');
    params.append('niche', data.niche || '');
    params.append('adSpend', data.adSpend || '');
    params.append('socials', data.socials || '');
    params.append('revenueGoal', Array.isArray(data.revenueGoal) ? data.revenueGoal.join(', ') : (data.revenueGoal || ''));

    // We use no-cors because Google doesn't return CORS headers for redirects
    // This will ALWAYS return an opaque response (status 0), but the request DOES land on Google's server.
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });

    console.log("Lead successfully beamed to Google Hub!");
    return true;
  } catch (err) {
    console.error("Critical: Google Sheets beam failed", err);
  }
};
