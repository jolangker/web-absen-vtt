const getVariables = () => {
  const urlSiswa = "https://absenvttv2.herokuapp.com/api/siswa/";
  const urlAbsensi = "https://absenvttv2.herokuapp.com/api/absensi/";
  const cors = "https://cors-anywhere.herokuapp.com/";
  const retToken = sessionStorage.getItem("token");

  return {
    urlSiswa,
    urlAbsensi,
    cors,
    retToken,
  };
};

export default getVariables;
