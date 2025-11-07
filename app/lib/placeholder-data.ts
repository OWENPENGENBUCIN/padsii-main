const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const pelanggans = [
 
  {
    nama_pelanggan: 'Budi Santoso',
    nohp_pelanggan: '081098765432',
  },
];

const menus = [
  {
    nama_pelanggan: 'Chicken Fillet Nashville',
    harga_pelanggan: 30000,
  },
  {
    nama_menu: 'Nashville Rice Box Original',
    harga_menu: 30000,
  },
  {
    nama_menu: 'Bento Set Nashville',
    harga_menu: 25000,
  },
  {
    nama_menu: 'Air Mineral',
    harga_menu: 6000,
  },
  {
    nama_menu: 'Extra Salad',
    harga_menu: 3000,
  },
  {
    nama_menu: 'Nashville Chicken Spicy',
    harga_menu: 35000,
  },
  {
    nama_menu: 'Nashville Shrimp Roll',
    harga_menu: 45000,
  },
  {
    nama_menu: 'Egg Chicken Roll',
    harga_menu: 20000,
  },
  {
    nama_menu: 'Nashville Baby Katsu',
    harga_menu: 32000,
  },
];

const transaksis = [
  {
    pelanggan_nama:pelanggans[0].nama_pelanggan,
    tanggal_transaksi: '2024-11-01',
    total_harga: 30000,
    pembayaran:40000,
    kembalian:10000,
  },
  
];



export { users, pelanggans, menus, transaksis};