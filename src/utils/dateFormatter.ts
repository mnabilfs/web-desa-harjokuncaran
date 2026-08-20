const indonesianMonths = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

/**
 * Format dari YYYY-MM-DD ke "18 Agustus 2026"
 */
export const formatToIndonesianDate = (ymd: string) => {
  if (!ymd) return "";
  const [yyyy, mm, dd] = ymd.split("-");
  if (!yyyy || !mm || !dd) return ymd; // Return original if not in YYYY-MM-DD format
  const monthName = indonesianMonths[parseInt(mm, 10) - 1];
  return `${parseInt(dd, 10)} ${monthName} ${yyyy}`;
};
