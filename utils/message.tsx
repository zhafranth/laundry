import { ITransaction } from "@/actions/actions/transaction/Transaction.interface";
import { formatToCurrency } from "./format";
import { capitalize } from "lodash";

export const textContent = (data: ITransaction) => {
  const {
    status,
    layanan,
    harga,
    status_pembayaran,
    point_lipat,
    point_setrika,
    customer,
  } = data;
  const { nama: namaLayanan } = layanan ?? {};
  const { nama, alamat } = customer ?? {};
  if (status === "selesai") {
    return `    
👕👚 Laundry Anda Telah Selesai! 👕👚
-------
*Halo ${nama}*, kami ingin memberitahu Anda bahwa laundry Anda sudah bisa diambil atau diantarkan (infokan waktu untuk pengantaran)
Berikut detail laundry anda :
-------
Layanan : 
• ${namaLayanan}
Total : *${formatToCurrency(harga || 0)}*
Status Laundry : Selesai
Status Bayar : ${status_pembayaran ? "Lunas" : "Belum Lunas"}
Point Setrika : ${point_setrika}
Point Lipat : ${point_lipat}
-------
Jam Operasional Water Seven Laundry :
Senin - Sabtu Jam 08:00 - 19:00
------
Terima kasih atas kepercayaan Anda pada Water 7 Laundry!
    `;
  }

  return `
Water 7 Laundry
Berikut detail laundry dan point stamp Anda :
Nama : *${nama}*
Alamat : ${alamat}
      
Layanan : 
• ${namaLayanan}
Total : *${formatToCurrency(harga || 0)}*
Status Laundry : ${capitalize(status)}
Status Bayar : ${status_pembayaran ? "Lunas" : "Belum Lunas"}
Point Setrika : ${point_setrika}
Point Lipat : ${point_lipat}
==================
KETENTUAN :
1. Mohon diperiksa dahulu, kami hanya melayani komplain 1x24 jam setelah laundry diterima 
2. Kami tidak bertanggung jawab atas kerusakan yang terjadi pada cucian disebabkan pelanggan itu sendiri (luntur, sobek, atau susut) 
3. Laundry yang tidak diambil jangka waktu 30 hari, jika terjadi kerusakan menjadi tanggung jawab pemilik
4. Bila terjadi kehilangan harap memberikan bukti video ketika meletakkan laundry di awal, bisa meminta bantuan karyawan kami untuk menggunakan keranjang laundry pada saat merekam dan bukti membuka laundry. bila terbukti hilang maka kami bertanggung jawab mengganti kerugian maksimal 2x biaya laundry.
  `;
};
