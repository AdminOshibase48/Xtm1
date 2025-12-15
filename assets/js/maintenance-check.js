// maintenance-check.js
// SIMPLE MAINTENANCE REDIRECT

// Cek apakah hari ini tanggal maintenance?
const maintenanceDates = [
    '2025-12-15',  // Contoh: hari ini maintenance
    '2025-12-15'   // Contoh: tanggal lain
];

const today = new Date().toISOString().split('T')[0];

if (maintenanceDates.includes(today)) {
    // Jika hari ini tanggal maintenance, redirect!
    if (!window.location.pathname.includes('maintenance.html')) {
        window.location.href = '/maintenance.html';
    }
}
