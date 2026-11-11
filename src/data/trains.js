// Sample data. t = scheduled minutes from midnight of the start day (>1440 = next day).
const S = (c, n, km, t, p) => ({ c, n, km, t, p });
export const TRAINS = [
  { no: '12301', name: 'Howrah Rajdhani Express', delay: 14, stations: [
    S('HWH', 'Howrah Jn', 0, 1015, 9), S('DHN', 'Dhanbad Jn', 259, 1210, 2), S('GAYA', 'Gaya Jn', 458, 1370, 1),
    S('DDU', 'Pt DD Upadhyaya Jn', 526, 1470, 3), S('PRYJ', 'Prayagraj Jn', 677, 1560, 6),
    S('CNB', 'Kanpur Central', 972, 1700, 4), S('NDLS', 'New Delhi', 1449, 2045, 16)] },
  { no: '12019', name: 'Howrah - Ranchi Shatabdi', delay: 0, stations: [
    S('HWH', 'Howrah Jn', 0, 360, 24), S('KGP', 'Kharagpur Jn', 116, 435, 1),
    S('TATA', 'Tatanagar Jn', 250, 515, 2), S('RNC', 'Ranchi Jn', 420, 645, 3)] },
  { no: '12951', name: 'Mumbai Rajdhani Express', delay: 32, stations: [
    S('MMCT', 'Mumbai Central', 0, 1700, 2), S('ST', 'Surat', 263, 1880, 4), S('BRC', 'Vadodara Jn', 392, 1975, 1),
    S('RTM', 'Ratlam Jn', 696, 2200, 3), S('KOTA', 'Kota Jn', 920, 2380, 1), S('NZM', 'Hazrat Nizamuddin', 1384, 2800, 5)] },
];
