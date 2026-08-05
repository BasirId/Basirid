async function loadData() {
  try {
    const [barangRes, lokasiRes, unitRes] = await Promise.all([
      fetch('barang.json'),
      fetch('lokasi.json'),
      fetch('unit.json')
    ]);

    const barang = await barangRes.json();
    const lokasi = await lokasiRes.json();
    const unit = await unitRes.json();

    const dataGabung = barang.map(item => {
      return {
        ...item,
        lokasi_detail: lokasi.find(l => l.kode === item.kode),
        unit_detail: unit.filter(u => u.kode_barang === item.kode)
      };
    });

    renderData(dataGabung);

  } catch (err) {
    document.getElementById('feed').innerHTML = "<p>Gagal load data</p>";
    console.error(err);
  }
}

function renderData(data) {
  const feed = document.getElementById('feed');
  feed.innerHTML = "";

  data.forEach(item => {
    const div = document.createElement('div');
    div.className = 'post';

    div.innerHTML = `
      <img src="${item.gambar || 'https://via.placeholder.com/400x200'}" class="post-img">
      <div class="post-body">
        <h3>${item.nama}</h3>
        <p>${item.brand} • ${item.part_number}</p>
      </div>
    `;

    div.onclick = () => {
      window.location.href = "detail.html?kode=" + item.kode;
    };

    feed.appendChild(div);
  });
}

loadData();