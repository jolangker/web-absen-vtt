const getVariables = (nisn) => {
  const urlSiswa = "https://absenvttv2.herokuapp.com/api/siswa";
  const urlNisn = "https://absenvttv2.herokuapp.com/api/siswa/" + nisn;
  const cors = "https://cors-anywhere.herokuapp.com/";
  const retToken = sessionStorage.getItem("token");

  return {
    urlSiswa,
    urlNisn,
    cors,
    retToken,
  };
};

export default getVariables;
