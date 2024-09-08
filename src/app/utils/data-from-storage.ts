import { environment } from '../../environments/environment';
import { decryptData } from './datahelper';

export const getDataFromLocalStorage = () => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('throw_data_running', 'dS@%Rwey)hCd5DZKP87jkVdm');
    const dataStorage = localStorage.getItem('token');
    let decryptedData: any = {};
    if (dataStorage) {
      decryptedData = decryptData(
        JSON.parse(dataStorage),
        environment.secretKey
      );
    }
    return decryptedData;
  } else {
    console.error('localStorage no está disponible en este entorno.');
    return {};
  }
};

export const getDataFromSessionStorage = (key: string) => {
  return JSON.parse(sessionStorage.getItem(key)!);
};

export const getActualDate = () => {
  const fechaActual = new Date();

  const año = fechaActual.getFullYear();
  const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Se suma 1 porque los meses van de 0 a 11
  const dia = fechaActual.getDate().toString().padStart(2, '0');

  const fechaFormateada = `${año}-${mes}-${dia}`;

  return fechaFormateada;
};
