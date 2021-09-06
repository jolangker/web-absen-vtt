const getVariables = () => {
  const urlSiswa = "https://absenvttv3.herokuapp.com/api/siswa/";
  const urlAbsensi = "https://absenvttv3.herokuapp.com/api/absensi/";
  const urlKelas = "https://absenvttv3.herokuapp.com/api/kelas/";
  const urlJurusan = "https://absenvttv3.herokuapp.com/api/jurusan/";
  const urlDaily = "https://absenvttv3.herokuapp.com/api/daily/";
  const cors = "https://proxyabsenvtt.herokuapp.com/";
  const retToken = sessionStorage.getItem("token");
  const nisn = sessionStorage.getItem("nisn");

  return {
    urlSiswa,
    urlAbsensi,
    urlKelas,
    urlJurusan,
    urlDaily,
    cors,
    retToken,
    nisn,
  };
};

export default getVariables;
