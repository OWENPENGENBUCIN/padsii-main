export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Menu = {
  id: string;
  nama_menu: string;
  harga_menu: number;
};

export type MenuTable = {
  id: string;
  nama_menu: string;
  harga_menu: number;
  jumlah:number;
};

export type Pelanggan = {
  id: string;
  nama_pelanggan: string;
  nohp_pelanggan: string;
  referral_count: number;
};

export type PelangganTable = {
  id: string;
  nama_pelanggan: string;
  nohp_pelanggan: string;
  referral_count: number;
};

export type Transaksi = {
  id: string;
  pelanggan_nama:string;
  tanggal_transaksi: string;
  total_harga: number;
  pembayaran:number;
  kembalian:number;
};

export type TransaksiTable = {
  id: string;
  pelanggan_nama:string;
  tanggal_transaksi: string;
  total_harga: number;
  pembayaran:number;
  kembalian:number;
};

export interface Laporan {
  transaksi_id: number;          
  tanggal_transaksi: string;     
  total_harga: number;           
  pembayaran: number;            
  kembalian: number;             
  jumlah: number;                
  nama_menu: string;             
  total_menu_harga: number;      
  pelanggan_nama: string | null;    
}


