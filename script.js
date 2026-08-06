const listBarang = document.getElementById("listBarang");
const searchInput = document.getElementById("searchInput");
const filterKategori = document.getElementById("filterKategori");
const filterLokasi = document.getElementById("filterLokasi");
const jumlahBarang = document.getElementById("jumlahBarang");
const notFound = document.getElementById("notFound");

// ==============================
// Isi Filter
// ==============================

const kategoriSet = [...new Set(dataBarang.map(i => i.kategori))].sort();

kategoriSet.forEach(k => {
    if (k) {
        filterKategori.innerHTML += `
            <option value="${k}">${k}</option>
        `;
    }
});

const lokasiSet = [...new Set(dataBarang.map(i => i.lokasi))].sort();

lokasiSet.forEach(l => {
    if (l) {
        filterLokasi.innerHTML += `
            <option value="${l}">${l}</option>
        `;
    }
});

// ==============================
// Render Card
// ==============================

function renderBarang(data){

    listBarang.innerHTML="";

    if(data.length===0){

        notFound.style.display="block";
        jumlahBarang.innerHTML="0 Barang";

        return;
    }

    notFound.style.display="none";

    jumlahBarang.innerHTML=data.length+" Barang";

    data.forEach(item=>{

        const gambar=item.gambar && item.gambar!=""
            ? item.gambar
            : "images/no-image.png";

        const status=item.status==="aktif"
            ? "aktif"
            : "nonaktif";

        listBarang.innerHTML+=`

<div class="card">

<img src="${gambar}"
onerror="this.src='images/no-image.png'">

<div class="content">

<div class="kode">
${item.kode}
</div>

<div class="nama">
${item.nama}
</div>

<div class="part">
Part Number :
${item.part_number || "-"}
</div>

<div class="brand">
Brand :
${item.brand || "-"}
</div>

<div class="lokasi">
📍 ${item.lokasi || "-"}
</div>

<span class="status ${status}">
${item.status}
</span>

<a
class="btn"
href="detail.html?kode=${item.kode}">
Lihat Detail
</a>

</div>

</div>

`;

    });

}

// ==============================
// Filter
// ==============================

function filterData(){

    const cari=searchInput.value.toLowerCase();

    const kategori=filterKategori.value;

    const lokasi=filterLokasi.value;

    const hasil=dataBarang.filter(item=>{

        const cocokCari=

(item.kode||"").toLowerCase().includes(cari)

||

(item.nama||"").toLowerCase().includes(cari)

||

(item.part_number||"").toLowerCase().includes(cari)

||

(item.brand||"").toLowerCase().includes(cari);

        const cocokKategori=

kategori==="" || item.kategori===kategori;

        const cocokLokasi=

lokasi==="" || item.lokasi===lokasi;

        return cocokCari
        && cocokKategori
        && cocokLokasi;

    });

    renderBarang(hasil);

}

// ==============================

searchInput.addEventListener("keyup",filterData);

filterKategori.addEventListener("change",filterData);

filterLokasi.addEventListener("change",filterData);

// ==============================

renderBarang(dataBarang);
