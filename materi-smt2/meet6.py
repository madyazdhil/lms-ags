# ============================================================
# 🖥️ CLOUD CITY DATA CENTER — EMERGENCY OVERRIDE TERMINAL
# ============================================================

# 1. Terminal Boot & Incident Banner
print("""
+------------------------------------------------------------+
| [!] SYSTEM ALERT: CLOUD CITY MAINFRAME LOCKED OUT         |
| STATUS  : CRITICAL FAILSAFE ACTIVATED                      |
| REASON  : Root Hardware Security Key missing from slot     |
+------------------------------------------------------------+
       [===]       [===]       [===]       [===]
       |:::|       |:::|       |:::|       |:::|
       |===|       |===|       |===|       |===|
  =====[RACK-01]---[RACK-02]---[RACK-03]---[RACK-04]=====
""")

print("Sistem Cloud City mengalami emergency blackout dan terkunci otomatis.")
print("Hanya root admin yang memegang 'Cloud Key' (Hardware Token) yang bisa unlock.")

# 2. Setup Operator & State
name = input("\n[AUTH] Masukkan username / callsign admin: ")
has_key = False

print(f"\n[OK] Sesi darurat dimulai untuk operator: @{name}")
print("Kamu harus melacak keberadaan Cloud Key di salah satu sektor:")
print("  > [forest] : Bio-Dome Eco Server Farm (Sektor Luar)")
print("  > [tunnel] : Subterranean Fiber Conduit (Bawah Tanah)")

# 3. Keputusan Pertama: Memilih Sektor
route = input("\n[NAV] Pilih sektor investigasi (forest/tunnel): ")

# 4. Percabangan Sektor & Investigasi
if route == "forest":
    print(f"\nOperator @{name} masuk ke area Bio-Dome Server Farm...")
    print("""
            /\\  /\\       [SOLAR RACK]
           /  \\/  \\      +----------+
          / /\\  /\\ \\     | [||||||] |
         /_/  \\/  \\_\\    | [||||||] |
             ||||        +----------+
    """)
    print("Pendingin alami bekerja, tapi jaringan sensor terputus.")
    print("Ada dua titik yang memancarkan sinyal radio:")
    print("  > [door]   : Server Rack Vault di dalam kabin kayu pelindung.")
    print("  > [bridge] : Maintenance Cable Bridge di atas jurang ventilasi.")
    
    choice = input("\n[SCAN] Pilih titik pemeriksaan (door/bridge): ")
    
    if choice == "door":
        print("\n[*] Membuka Server Rack Vault...")
        print("""
          +-----------------------+
          | [KEY-FOUND]           |
          |  [====USB-TOKEN====]  |==[#]
          +-----------------------+
        """)
        print("[SUCCESS] Cloud Key (Master Hardware Token) ditemukan tertinggal di port!")
        has_key = True
    else:
        print("\n[!] Cable Bridge mengalami korsleting dan bergoyang hebat.")
        print("[WARNING] Sistem darurat memotong daya jalur. Kamu terpaksa mundur ke base.")

elif route == "tunnel":
    print(f"\nOperator @{name} menuruni lift maintenance ke terowongan kabel optik...")
    print("""
             .--------------------.
             | [ SENTRY AI DAEMON] |
             |    [o]      [o]    |
             |       <====>       |
             '--------------------'
    """)
    print("AI Security Daemon memblokir koridor server bawah tanah.")
    print("'Akses fisik ditolak. Masukkan verifikasi checksum keamanan.'")
    
    answer = int(input("[INPUT] Verifikasi kuantum: Berapa 6 x 7? "))
    
    if answer == 42:
        print("\n[*] CHECKSUM VALID. STATUS: AUTHORIZED.")
        print("""
             .--------------------.
             | [ ACCESS GRANTED ] |==[# MASTER KEY]
             '--------------------'
        """)
        print("[SUCCESS] Sentry Daemon membuka kompartemen brankas dan menyerahkan Cloud Key.")
        has_key = True
    else:
        print(f"\n[DENIED] Checksum '{answer}' TIDAK VALID. Sentry mengaktifkan lockdown.")
        print("[ALARM] Sinyal penyusup berbunyi! Kamu dipaksa keluar dari terowongan.")

else:
    print(f"\n[ERR-404] Sektor '{route}' tidak valid atau di luar perimeter jaringan.")

# 5. Eksekusi Reboot & Status Akhir
print("\n" + "="*60)
if has_key:
    print(f"""
  [✓] MAINFRAME RESTORED 100%
  
  Operator @{name} berhasil memasang Cloud Key ke root console!
  Semua server, database, dan smart grid Cloud City kembali ONLINE.
  Mission status: COMPLETED.
    """)
else:
    print(f"""
  [X] LOCKDOWN GAGAL DIBATALKAN (SYSTEM SHUTDOWN)
  
  Operator @{name}, Cloud Key gagal diamankan.
  Server cluster beralih ke mode dormant untuk mencegah data corrupt.
  Ketik 'python3 main.py' untuk mencoba ulang prosedur recovery.
    """)
print("="*60)
