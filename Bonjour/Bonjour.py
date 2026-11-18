import tkinter as tk
from tkinter import messagebox
from datetime import datetime

KASIR = "Bonjour"
PASSWORD = "mieayam"

Item = {
    "Sweatshirt": [477000, 90],
    "Crewneck": [249000, 90],
    "Hoodie": [456000, 90],
    "Tshirt": [477000, 90],
    "Baggy Jeans": [740000, 90],

}

root = tk.Tk()
root.title("Bonjour - Kasir")
root.geometry("850x650")
root.configure(bg="#eef7ee")
root.resizable(False, False)

def rp(n):
    return "Rp" + format(n, ",").replace(",", ".")

def clear():
    for w in root.winfo_children():
        w.destroy()

def login():
    clear()

    box = tk.Frame(root, bg="white", padx=50, pady=35)
    box.place(relx=.5, rely=.5, anchor="center")

    tk.Label(
        box,
        text="BONJOUR",
        font=("Arial",25,"bold"),
        fg="#a08a51",
        bg="white"
    ).pack()

    tk.Label(
        box,
        text="LOGIN KASIR",
        font=("Arial",16,"bold"),
        bg="white"
    ).pack(pady=20)

    tk.Label(box, text="Nama Kasir", bg="white").pack(anchor="w")

    nama = tk.Entry(box, width=30, font=("Arial",12))
    nama.pack(pady=(4,12))

    tk.Label(box, text="Password", bg="white").pack(anchor="w")

    sandi = tk.Entry(
        box,
        width=30,
        show="*",
        font=("Arial",12)
    )
    sandi.pack(pady=4)

    def masuk():
        if nama.get() == KASIR and sandi.get() == PASSWORD:
            kasir()
        else:
            messagebox.showerror(
                "Login Gagal",
                "Nama kasir atau password salah."
            )

    tk.Button(
        box,
        text="LOGIN",
        command=masuk,
        bg="#d1c58b",
        fg="white",
        font=("Arial",11,"bold"),
        width=25,
        pady=8
    ).pack(pady=20)


def kasir():
    clear()

    header = tk.Frame(
        root,
        bg="#a0925e",
        height=65
    )
    header.pack(fill="x")

    tk.Label(
        header,
        text="BONJOUR SHOP",
        font=("Arial",22,"bold"),
        bg="#9f9054",
        fg="white"
    ).pack(side="left", padx=25, pady=15)

    tk.Label(
        header,
        text="Kasir: Bonjour",
        bg="#ac9865",
        fg="white"
    ).pack(side="right", padx=25)

    menu = tk.Frame(
        root,
        bg="#eef7ee"
    )
    menu.pack(fill="x", pady=10)

    tk.Button(
        menu,
        text="TRANSAKSI",
        command=kasir,
        bg="#858340",
        fg="white"
    ).pack(side="left", padx=10)

    tk.Button(
        menu,
        text="LIHAT STOK",
        command=stok,
        bg="#938d54",
        fg="white"
    ).pack(side="left")

    tk.Button(
        menu,
        text="LOGOUT",
        command=login,
        bg="#9e8944",
        fg="white"
    ).pack(side="right", padx=10)

    tk.Label(
        root,
        text="TRANSAKSI PENJUALAN",
        font=("Arial",20,"bold"),
        bg="#eef7ee"
    ).pack()

    tk.Label(
        root,
        text="Masukkan jumlah pembelian dalam kg.",
        bg="#eef7ee",
        fg="#666"
    ).pack(pady=5)

    table = tk.Frame(root, bg="white")
    table.pack()

    for c, t in enumerate(
        ["item","Harga","Stok"]
    ):
        tk.Label(
            table,
            text=t,
            bg="#f0d87a",
            fg="white",
            width=19,
            font=("Arial",10,"bold")
        ).grid(
            row=0,
            column=c,
            padx=1,
            pady=1
        )

    entries = {}

    for r, (nama,data) in enumerate(Item.items(),1):

        tk.Label(
            table,
            text=nama,
            bg="white",
            width=19
        ).grid(
            row=r,
            column=0,
            pady=2
        )

        tk.Label(
            table,
            text=rp(data[0]),
            bg="white",
            width=19
        ).grid(
            row=r,
            column=1
        )

        tk.Label(
            table,
            text=str(data[1])+" Pcs",
            bg="white",
            width=19
        ).grid(
            row=r,
            column=2
        )

        e = tk.Entry(
            table,
            width=19,
            justify="center"
        )
        e.insert(0,"0")

        e.grid(
            row=r,
            column=3,
            pady=2
        )

        entries[nama] = e

    def lanjut():

        pesanan = []
        total = 0

        for nama,e in entries.items():

            try:
                jumlah = int(e.get())

            except ValueError:
                messagebox.showerror(
                    "Input Salah",
                    "Jumlah harus berupa angka."
                )
                return

            if jumlah < 0:
                messagebox.showerror(
                    "Input Salah",
                    "Jumlah tidak boleh minus."
                )
                return

            if jumlah > Item[nama][1]:
                messagebox.showerror(
                    "Stok Tidak Cukup",
                    f"Stok {nama} hanya {Item[nama][1]} Pcs."
                )
                return

            if jumlah:

                sub = Item[nama][0] * jumlah

                pesanan.append(
                    (
                        nama,
                        jumlah,
                        Item[nama][0],
                        sub
                    )
                )

                total += sub

        if not pesanan:
            messagebox.showwarning(
                "Belum Memilih",
                "Masukkan jumlah buah terlebih dahulu."
            )
            return

        cash(pesanan,total)

    tk.Button(
        root,
        text="LANJUT KE PEMBAYARAN CASH",
        command=lanjut,
        bg="#ada063",
        fg="white",
        font=("Arial",11,"bold"),
        width=30,
        pady=9
    ).pack(pady=15)


def cash(pesanan,total):

    clear()

    box = tk.Frame(
        root,
        bg="white",
        padx=50,
        pady=35
    )

    box.place(
        relx=.5,
        rely=.5,
        anchor="center"
    )

    tk.Label(
        box,
        text="PEMBAYARAN CASH",
        font=("Arial",22,"bold"),
        fg="#a5a05c",
        bg="white"
    ).pack()

    tk.Label(
        box,
        text="TOTAL BELANJA",
        bg="white",
        fg="#666"
    ).pack(pady=(15,0))

    tk.Label(
        box,
        text=rp(total),
        font=("Arial",22,"bold"),
        fg="#9a9455",
        bg="white"
    ).pack(pady=5)

    tk.Label(
        box,
        text="Uang dari pelanggan",
        bg="white"
    ).pack(pady=(15,5))

    e = tk.Entry(
        box,
        width=28,
        font=("Arial",14),
        justify="center"
    )
    e.pack()

    def bayar():

        try:
            uang = int(e.get())

        except ValueError:
            messagebox.showerror(
                "Input Salah",
                "Masukkan uang dalam angka."
            )
            return

        if uang < total:
            messagebox.showerror(
                "Uang Kurang",
                "Uang kurang " + rp(total-uang)
            )
            return

        for nama,jumlah,harga,sub in pesanan:
            Item[nama][1] -= jumlah

        struk(
            pesanan,
            total,
            uang,
            uang-total
        )

    tk.Button(
        box,
        text="BAYAR & CETAK STRUK",
        command=bayar,
        bg="#948951",
        fg="white",
        font=("Arial",11,"bold"),
        width=28,
        pady=10
    ).pack(pady=20)

    tk.Button(
        box,
        text="KEMBALI",
        command=kasir,
        bg="#777",
        fg="white",
        width=15
    ).pack()


def struk(pesanan,total,uang,kembalian):

    clear()

    now = datetime.now()

    box = tk.Frame(
        root,
        bg="white",
        padx=35,
        pady=18
    )

    box.place(
        relx=.5,
        rely=.5,
        anchor="center"
    )

    tk.Label(
        box,
        text="BONJOUR",
        font=("Arial",24,"bold"),
        fg="#ad9859",
        bg="white"
    ).pack()

    tk.Label(
        box,
        text="FASHION SHOP",
        bg="white"
    ).pack()

    tk.Label(
        box,
        text="================================",
        bg="white"
    ).pack()

    tk.Label(
        box,
        text="STRUK BELANJA",
        font=("Arial",15,"bold"),
        bg="white"
    ).pack()

    info = (
        f"Tanggal : {now:%d-%m-%Y}\n"
        f"Waktu   : {now:%H:%M:%S}\n"
        f"Kasir   : Bonjour\n"
        f"Bayar   : CASH"
    )

    tk.Label(
        box,
        text=info,
        font=("Courier New",9),
        bg="white",
        justify="left"
    ).pack(
        anchor="w",
        pady=6
    )

    tk.Label(
        box,
        text="--------------------------------",
        bg="white"
    ).pack()

    for nama,jumlah,harga,sub in pesanan:

        tk.Label(
            box,
            text=(
                f"{nama}\n"
                f"{jumlah} kg x {rp(harga)} = {rp(sub)}"
            ),
            font=("Courier New",9),
            bg="white",
            justify="left"
        ).pack(
            anchor="w",
            pady=2
        )

    tk.Label(
        box,
        text="--------------------------------",
        bg="white"
    ).pack()

    tk.Label(
        box,
        text=(
            f"TOTAL     : {rp(total)}\n"
            f"BAYAR     : {rp(uang)}\n"
            f"KEMBALIAN : {rp(kembalian)}"
        ),
        font=("Courier New",10,"bold"),
        bg="white",
        justify="left"
    ).pack(
        anchor="w",
        pady=6
    )

    tk.Label(
        box,
        text="================================",
        bg="white"
    ).pack()

    tk.Label(
        box,
        text=(
            "Terima Kasih Telah Berbelanja\n"
            "di Bonjour Shop\n\n"
            "Instagram : @bonjour.id\n"
            "Alamat    : Jl. Ahmad Yani 9/4\n"
            "           Bogor Barat"
        ),
        font=("Arial",9),
        bg="white",
        justify="center"
    ).pack(pady=7)

    f = tk.Frame(box,bg="white")
    f.pack(pady=8)

    tk.Button(
        f,
        text="TRANSAKSI LAGI",
        command=kasir,
        bg="#a4994e",
        fg="white",
        padx=12,
        pady=7
    ).pack(
        side="left",
        padx=4
    )

    tk.Button(
        f,
        text="LIHAT STOK",
        command=stok,
        bg="#a5a259",
        fg="white",
        padx=12,
        pady=7
    ).pack(
        side="left",
        padx=4
    )


def stok():

    clear()

    tk.Label(
        root,
        text="BONJOUR SHOP",
        font=("Arial",22,"bold"),
        bg="#89844c",
        fg="white",
        height=2
    ).pack(fill="x")

    tk.Label(
        root,
        text="STOK BARANG",
        font=("Arial",21,"bold"),
        bg="#eef7ee"
    ).pack(pady=20)

    table = tk.Frame(
        root,
        bg="white"
    )
    table.pack()

    for c,t in enumerate(
        ["No","Itme","Harga / Pcs","Stok"]
    ):

        tk.Label(
            table,
            text=t,
            bg="#a08c43",
            fg="white",
            width=20,
            font=("Arial",10,"bold")
        ).grid(
            row=0,
            column=c,
            padx=1,
            pady=1
        )

    for r,(nama,data) in enumerate(Item.items(),1):

        for c,t in enumerate(
            [
                r,
                nama,
                rp(data[0]),
                str(data[1])+" Pcs"
            ]
        ):

            tk.Label(
                table,
                text=t,
                bg="white",
                width=20
            ).grid(
                row=r,
                column=c,
                pady=4
            )

    f = tk.Frame(
        root,
        bg="#eef7ee"
    )
    f.pack(pady=25)

    tk.Button(
        f,
        text="KEMBALI KE KASIR",
        command=kasir,
        bg="#7d702e",
        fg="white",
        padx=20,
        pady=8
    ).pack(
        side="left",
        padx=5
    )

    tk.Button(
        f,
        text="LOGOUT",
        command=login,
        bg="#c62828",
        fg="white",
        padx=20,
        pady=8
    ).pack(
        side="left",
        padx=5
    )


login()
root.mainloop()