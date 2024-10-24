
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [cabangOlahraga, setCabangOlahraga] = useState([]);
  const [newCabang, setNewCabang] = useState({
    nama_peserta: '',
    nama_cabang: '',
    tanggal_event: '',
    nomor_registrasi: '',
    kategori: ''
  });

  const fetchCabangOlahraga = async () => {
    const response = await axios.get('http://localhost/api/cabang-olahraga');
    setCabangOlahraga(response.data.data);
  };

  useEffect(() => {
    fetchCabangOlahraga();
  }, []);

  const addCabang = async () => {
    await axios.post('http://localhost/api/cabang-olahraga', newCabang);
    fetchCabangOlahraga();
    setNewCabang({
      nama_peserta: '',
      nama_cabang: '',
      tanggal_event: '',
      nomor_registrasi: '',
      kategori: ''
    });
  };

  return (
    <div>
      <h1>Registrasi Cabang Olahraga</h1>
      <ul>
        {cabangOlahraga.map(cabang => (
          <li key={cabang.id}>{cabang.nama_peserta} - {cabang.nama_cabang}</li>
        ))}
      </ul>

      <h2>Tambah Cabang</h2>
      <input
        type="text"
        placeholder="Nama Peserta"
        value={newCabang.nama_peserta}
        onChange={(e) => setNewCabang({ ...newCabang, nama_peserta: e.target.value })}
      />
      <input
        type="text"
        placeholder="Nama Cabang"
        value={newCabang.nama_cabang}
        onChange={(e) => setNewCabang({ ...newCabang, nama_cabang: e.target.value })}
      />
      <input
        type="date"
        value={newCabang.tanggal_event}
        onChange={(e) => setNewCabang({ ...newCabang, tanggal_event: e.target.value })}
      />
      <input
        type="text"
        placeholder="Nomor Registrasi"
        value={newCabang.nomor_registrasi}
        onChange={(e) => setNewCabang({ ...newCabang, nomor_registrasi: e.target.value })}
      />
      <input
        type="text"
        placeholder="Kategori"
        value={newCabang.kategori}
        onChange={(e) => setNewCabang({ ...newCabang, kategori: e.target.value })}
      />
      <button onClick={addCabang}>Tambah Cabang</button>
    </div>
  );
};

export default App;
